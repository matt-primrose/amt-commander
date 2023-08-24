/*********************************************************************
* Copyright (c) Intel Corporation 2022
* SPDX-License-Identifier: Apache-2.0
**********************************************************************/

import { parse, HttpZResponseModel } from 'http-z';
import { Socket } from 'net';
import { Logger, LogType } from './common';

export class SocketParameters {
  address: string
  port: number
}

export class SocketHandler {
  // Update the type for the socket property to be a Node.js socket
  public socket = new Socket()
  public timeout: number = 6000
  public maxConnectionAttempts: number = 3
  public connectionAttempts: number = 0
  public socketParameters: SocketParameters
  public chunkedData: any
  public data: any

  // In the constructor, update the type for the socket parameter to be a Node.js socket
  constructor(socketParameters: SocketParameters) {
    this.socketParameters = socketParameters
    this.socket.setEncoding('binary')
    this.socket.setTimeout(this.timeout)
  }

  public async connect(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (this.socket == null) {
        this.socket = new Socket()
      }
      this.socket.on('ready', this.onSocketReady.bind(this, resolve))
      this.socket.on('error', this.onSocketError.bind(this, reject))
      this.socket.connect(this.socketParameters.port, this.socketParameters.address)
    })
  }

  public async onSocketReady(resolve): Promise<void> {
    resolve('connected')
  }

  public async onSocketError(reject): Promise<void> {
    reject('error')
  }

  public async write(data: string): Promise<any> {
    if (this.chunkedData !== '') { this.chunkedData = '' }
    return new Promise(async (resolve, reject) => {
      if (this.socket == null || this.socket.readyState === 'closed') {
        Logger(LogType.DEBUG, 'SOCKETHANDLER', 'REOPENING SOCKET')
        const socketState = await this.connect()
        if (socketState === 'connected') {
          Logger(LogType.DEBUG, 'SOCKETHANDLER', 'SOCKET RE-OPENED')
        } else {
          resolve(socketState)
        }
      }
      this.socket.on('data', (data: string) => {
        if (data != null) { this.chunkedData += data }
        if (this.chunkedData.includes('</html>') || this.chunkedData.includes('0\r\n\r\n')) {
          Logger(LogType.DEBUG, 'SOCKETHANDLER', `COMPLETE DATA:\r\n${this.chunkedData}`)
          try {
            const response = parse(this.chunkedData) as HttpZResponseModel
            this.chunkedData = ''
            this.socket.destroy()
            this.socket = null
            Logger(LogType.DEBUG, 'SOCKETHANDLER', `RETURNING RESPONSE:\r\n${JSON.stringify(response)}`)
            resolve(response)
          } catch (err) {
            resolve(err)
          }
        } 
      })
      Logger(LogType.DEBUG, 'SOCKETHANDLER', `WRITING TO SOCKET:\r\n${data}`)
      this.socket.write(data)
    })
  }

  public getConnectionParameters(): SocketParameters {
    return this.socketParameters
  }

  public setConnectionParameters(connectionParameters: SocketParameters): void {
    this.socketParameters.address = connectionParameters.address
    this.socketParameters.port = connectionParameters.port
  }

  public getTimeout(): number {
    return this.timeout
  }

  public setTimeout(timeout: number): void {
    this.timeout = timeout
  }

  public getMaxConnectionAttempts(): number {
    return this.maxConnectionAttempts
  }

  public setMaxConnectionAttempts(connectionsAttempts: number): void {
    this.maxConnectionAttempts = connectionsAttempts
  }
}