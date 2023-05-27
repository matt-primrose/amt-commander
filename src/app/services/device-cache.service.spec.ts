/*********************************************************************
* Copyright (c) Intel Corporation 2023
* SPDX-License-Identifier: Apache-2.0
**********************************************************************/

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { DeviceCacheService } from './device-cache.service';
import { Observable, of } from 'rxjs';
import { Device } from '../models/device';

describe('DeviceCacheService', () => {
  let httpTestingController: HttpTestingController
  let service: DeviceCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DeviceCacheService]
    });
    httpTestingController = TestBed.inject(HttpTestingController)
    service = TestBed.inject(DeviceCacheService);
  })

  afterEach(() => {
    httpTestingController.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('watchDevices', () => {
    it('should return an Observable', () => {
      const watchDevices = service.watchDevices()
      expect(watchDevices instanceof Observable).toBe(true)
    })
  })
  describe('getDevices', () => {
    it('should return an Observable', () => {
      service.getDevices().subscribe((devices: Device[]) => {
        expect(devices instanceof Observable).toBe(true)
      })
      httpTestingController.expectOne('http://localhost:3000/devices')
    })
  })
  describe('addDevice', () => {
    it('should add a device', () => {
      const device: Device = {
        id: '1234',
        name: 'testname',
        hostname: 'localhost',
        auth: 'digest-none'
      }
      service.addDevice(device)
      httpTestingController.expectOne('http://localhost:3000/devices')
    })
  })
  describe('removeDevice', () => {
    it('should remove a device', () => {
      const id = '1234'
      const mockDevices: Device[] = [
        {
          id: '1234',
          auth: 'digest-none',
          hostname: 'localhost',
          name: 'test'
        }
      ]
      const mockValue = of(mockDevices)
      spyOn(service, 'getDevices').and.returnValue(mockValue)
      service.removeDevice(id)
      expect(service.getDevices).toHaveBeenCalled()
      httpTestingController.expectOne('http://localhost:3000/devices/1234')
    })
  })
});
