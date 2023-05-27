import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatListModule } from '@angular/material/list'
import { MatIconModule } from '@angular/material/icon'
import { ToolbarComponent } from './core/toolbar/toolbar.component'
import { NavbarComponent } from './core/navbar/navbar.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatTableModule } from '@angular/material/table'
import { DeviceListComponent } from './devices/device-list/device-list.component'
import { DevicesComponent } from './devices/devices.component'
import { DeviceCacheService } from './services/device-cache.service'
import { HttpClientModule } from '@angular/common/http'
import { MatLineModule, MatOptionModule } from '@angular/material/core'
import { AddDeviceComponent } from './devices/add-device/add-device.component'

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    NavbarComponent,
    ProfilesComponent,
    DeviceListComponent,
    DevicesComponent,
    AddDeviceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    HttpClientModule,
    MatOptionModule,
    MatLineModule
  ],
  providers: [DeviceCacheService],
  bootstrap: [AppComponent]
})
export class AppModule { }
