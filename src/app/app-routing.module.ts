/*********************************************************************
* Copyright (c) Intel Corporation 2023
* SPDX-License-Identifier: Apache-2.0
**********************************************************************/

import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DevicesComponent } from './devices/devices.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { AddDeviceComponent } from './devices/add-device/add-device.component';

const routes: Routes = [
  { path: 'devices', component: DevicesComponent },
  {
    path: 'devices/add-device',
    children: [
      { path: '', component: AddDeviceComponent }
    ]
  },
  { path: 'profiles', component: ProfilesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
