import { Injectable } from '@angular/core';
import { Device } from '../models/device';
import { DeviceCacheService } from './device-cache.service';
import { AMT } from '@open-amt-cloud-toolkit/wsman-messages';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class MessageHandlerService {
  device!: Device
  constructor(private deviceCache: DeviceCacheService, private socketService: SocketService) { }

  public connect(deviceId: string) {
    this.deviceCache.getDevice(deviceId).subscribe((device: Device) => {
      this.device = device
      const port = this.device.auth === 'digest-none' || this.device.auth === 'kerberos-none' ? 16992 : 16993
      this.socketService.connect(this.device.hostname, port)
      this.socketService.sendMessage(this.getGeneralSettings())
    })
  }

  private getGeneralSettings() {
    const amtMessages = new AMT.Messages()
    return amtMessages.GeneralSettings.Get()
  }
}
