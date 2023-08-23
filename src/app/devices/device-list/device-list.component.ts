/*********************************************************************
* Copyright (c) Intel Corporation 2023
* SPDX-License-Identifier: Apache-2.0
**********************************************************************/

import { Component, OnInit } from '@angular/core'
import { Device } from '../../models/device'
import { DeviceCacheService } from '../../services/device-cache.service'

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent implements OnInit {
  devices: Device[] = []
  displayedColumns: string[] = ['name', 'hostname', 'auth', 'actions']

  constructor(
    private deviceCacheService: DeviceCacheService
    ) { }

  handleRemove(event: string) {
    this.deviceCacheService.removeDevice(event)
  }

  ngOnInit(): void {
    this.deviceCacheService.connectDevice().then((res: string[]) => {
      console.log(res)
    })

    this.deviceCacheService.watchDevices().subscribe(() => {
      this.getDevices()
    })
    this.getDevices()
  }

  private getDevices() {
    this.deviceCacheService.getDevices().subscribe((devices: Device[]) => {
      this.devices = devices
    })
  }
}
