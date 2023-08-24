/*********************************************************************
* Copyright (c) Intel Corporation 2023
* SPDX-License-Identifier: Apache-2.0
**********************************************************************/

import { Component, OnInit } from '@angular/core'
import { Device } from '../../models/device'
import { DeviceCacheService } from '../../services/device-cache.service'
import { MessageHandlerService } from 'src/app/services/message-handler.service'

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent implements OnInit {
  devices: Device[] = []
  displayedColumns: string[] = ['name', 'hostname', 'auth', 'actions']

  constructor(
    private deviceCacheService: DeviceCacheService,
    private messageHandlerService: MessageHandlerService
  ) { }

  handleRemove(event: string) {
    this.deviceCacheService.removeDevice(event)
  }

  handleConnect(event: string) {
    this.messageHandlerService.connect(event)
  }

  ngOnInit(): void {
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
