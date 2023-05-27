/*********************************************************************
* Copyright (c) Intel Corporation 2023
* SPDX-License-Identifier: Apache-2.0
**********************************************************************/

import { Component, Inject } from '@angular/core'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { DialogData } from '../devices.component'

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.scss']
})
export class AddDeviceComponent {
  options: FormGroup
  formControl: FormControl = new FormControl()

  constructor(fb: FormBuilder, private dialogRef: MatDialogRef<AddDeviceComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
    })
  }

  closeDialog(): void {
    this.dialogRef.close()
  }
}
