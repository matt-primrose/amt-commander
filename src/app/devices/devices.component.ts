import { Component } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { AddDeviceComponent } from './add-device/add-device.component'

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent {
  constructor (public dialog: MatDialog) {

  }

  addDevice (): void {
    this.dialog.open(AddDeviceComponent, {
      height: '400px',
      width: '600px'
    })
  }
}
