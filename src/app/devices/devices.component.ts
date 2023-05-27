/*********************************************************************
* Copyright (c) Intel Corporation 2023
* SPDX-License-Identifier: Apache-2.0
**********************************************************************/

import { Component } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { AddDeviceComponent } from './add-device/add-device.component'
import { DeviceCacheService } from '../services/device-cache.service'
import { Device } from '../models/device'
import { v4 } from 'uuid'

export interface DialogData {
  name: string,
  hostname: string,
  auth: string
}

function createId(): string {
  const uuid = v4()
  return uuid
}

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent {
  name: string = ''
  hostname: string = ''
  auth: string = 'digest-none'
  constructor(private dialog: MatDialog, private deviceCacheService: DeviceCacheService) {
  }

  addDevice(): void {
    const dialogRef = this.dialog.open(AddDeviceComponent, {
      height: 'fit-content',
      width: 'fit-content',
      data: { name: this.name, hostname: this.hostname, auth: this.auth }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result == null) { return }
      if (result.name == '') result.name = result.hostname
      const device: Device = {
        id: createId(),
        name: result.name,
        hostname: result.hostname,
        auth: result.auth
      }
      this.deviceCacheService.addDevice(device)
      console.log(`Device ${device.name} added with hostname: ${device.hostname} and auth method: ${device.auth}`)
    })
  }
}
