import { Injectable } from '@angular/core'
import { ipcRenderer } from 'electron'

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor() { }

  public connect(hostname: string, port: number): void {
    ipcRenderer.send('socket-connect', { hostname: hostname, port: port});
  }

  public disconnect(): void {
    ipcRenderer.send('socket-disconnect');
  }

  public sendMessage(message: string): void {
    ipcRenderer.send('socket-send', message);
  }

  public getResponse(): Promise<string> {
    return new Promise((resolve, reject) => {
      ipcRenderer.once('socket-response', (event, data) => {
        resolve(data);
      });
    });
  }
}
