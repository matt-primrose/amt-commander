/*********************************************************************
* Copyright (c) Intel Corporation 2023
* SPDX-License-Identifier: Apache-2.0
**********************************************************************/

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs'
import { Device } from '../models/device'

const DEVICES_API = 'http://localhost:3000/devices'
const HTTP_OPTIONS = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }

@Injectable({
  providedIn: 'root'
})
export class DeviceCacheService {
  constructor(private http: HttpClient) {
    console.log(this.http)
  }

  private devicesSub = new Subject()
  private countSub = new Subject()

  watchDevices(): Observable<any> {
    return this.devicesSub.asObservable()
  }

  watchCount(): Observable<any> {
    return this.countSub.asObservable()
  }

  getDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(DEVICES_API)
  }

  addDevice(device: Device) {
    this.http.post(DEVICES_API, device, HTTP_OPTIONS).subscribe(
      response => {
        console.log('Data added successfully:', response)
        this.devicesSub.next(device)
      },
      error => {
        console.error('Error adding data:', error)
        this.devicesSub.next(error)
      }
    )
  }

  removeDevice(deviceId: string) {
    this.getDevices().subscribe((data: Device[]) => {
      for (let x = 0; x < data.length; x++) {
        if (data[x].id === deviceId)
          this.http.delete(`${DEVICES_API}/${deviceId}`).subscribe(
            response => {
              console.log('Data removed successfully:', response)
              this.devicesSub.next(deviceId)
            },
            error => {
              console.error('Error removing data:', error)
              this.devicesSub.next(error)
            }
          )
      }
    })
  }
}

