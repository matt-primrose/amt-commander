/*********************************************************************
* Copyright (c) Intel Corporation 2023
* SPDX-License-Identifier: Apache-2.0
**********************************************************************/

import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { createMd5Hash } from '../polyfills/crypto.polyfill';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private username!: string;
  private password!: string;
  private url!: string;
  private port!: number;
  private authHeaders!: AuthHeaders;
  
  constructor() { }

  get getUsername (): string { return this.username }
  set setUsername (username: string) { this.username = username }
  get getPassword (): string { return this.password }
  set setPassword (password: string) { this.password = password }
  get getUrl (): string { return this.url }
  set setUrl (url: string) { this.url = url }
  get getPort (): number { return this.port }
  set setPort (port: number) { this.port = port }
  setDigestAuthHeaders = (authHeaders: AuthHeaders) => { this.authHeaders = authHeaders }

  public parseAuthorizationHeader = (headers: HttpHeaders): AuthHeaders | null => {
    if (this.authHeaders.qop != null) {
      return this.authHeaders
    } else {
      const wwwAuthenticate = headers.get('Www-Authenticate')
      if (wwwAuthenticate) {
        const authHeaders: AuthHeaders = this.parseAuthenticateResponseHeader(wwwAuthenticate)
        return authHeaders
      } else {
        return null
      }
    }
  }

  public createAuthorizationString = async (authHeaders: AuthHeaders) => {
    this.setDigestAuthHeaders(authHeaders)
    let msg = ''
    let responseDigest = null
    const url = '/wsman'
    const action = 'POST'
    // console nonce should be a unique opaque quoted string
    this.authHeaders.consoleNonce = Math.random().toString(36).substring(7)
    const nc = this.createNC()
    const HA1 = this.createDigestPassword(this.username, this.password)
    const HA2 = await this.createHash(`${action}:${url}`)
    responseDigest = await this.createHash(`${HA1}:${this.authHeaders.nonce}:${nc}:${this.authHeaders.consoleNonce}:${this.authHeaders.qop}:${HA2}`)
    const authorizationRequestHeader = this.generateDigest({
      username: this.username,
      realm: this.authHeaders.realm,
      nonce: this.authHeaders.nonce,
      uri: url,
      qop: this.authHeaders.qop,
      response: responseDigest,
      nc,
      cnonce: this.authHeaders.consoleNonce
    })
    msg += `Authorization: ${authorizationRequestHeader}\r\n`
    return msg
  }

  public createDigestPassword = async (username: string, password: string) => {
    return await this.createHash(`${username}:${this.authHeaders.realm}:${password}`)
  }

  public createDigestCredential = async (username: string, password: string) => {
    let data: string = `${username}:${this.authHeaders.realm}:${password}`
    const signPassword = await this.createHash(data)
    const result = signPassword.match(/../g)?.map((v) => String.fromCharCode(parseInt(v, 16))).join('')
    if (result) { 
      const utf8Encoder = new TextEncoder()
      const buffer = new Uint8Array(utf8Encoder.encode(result))
      const bufferArray = Array.from(buffer)
      const bufferString = String.fromCharCode.apply(null, bufferArray)
      const base64String = btoa(bufferString)
      return base64String
    } else {
      return null
    }
  }

  private createNC = (): string => {
    return ('00000000' + (this.authHeaders.nonceCounter++).toString(16)).slice(-8)
  }

  private parseAuthenticateResponseHeader = (value: string): AuthHeaders => {
    const params = value.replace('Digest realm', 'realm').split(/([^=,]*)=("[^"]*"|[^,"]*)/)
    const obj: any = {}
    for (let idx = 0; idx < params.length; idx = idx + 3) {
      if (params[idx + 1] != null) {
        obj[params[idx + 1].trim()] = params[idx + 2].replace(/"/g, '')
      }
    }
    if (obj.qop != null) {
      obj.qop = 'auth'
    }
    const authHeaders: AuthHeaders = new AuthHeaders(obj.realm, obj.nonce, obj.stale, obj.qop, obj.consoleNonce, obj.nc)
    return authHeaders
  }

  private createHash = async (data: string) => {
    const hash = await createMd5Hash(data)
    return hash
  }

  private generateDigest = (params: AuthParameters): string => {
    const paramNames = []
    for (const i in params) {
      paramNames.push(i)
    }
    return `Digest ${paramNames.reduce((s1, ii) => `${s1},${ii}="${params[ii]}"`, '').substring(1)}`
  }
}

interface AuthParameters {
  [key: string]: string
}

export class AuthHeaders {
  realm!: string
  nonce!: string
  stale!: string
  qop!: string
  consoleNonce!: string
  uri!: string
  nonceCounter: number = 1
  nc!: string
  constructor(realm: string, nonce: string, stale: string, qop: string, consoleNonce: string, nc: string) {
    this.realm = realm
    this.nonce = nonce,
    this.stale = stale,
    this.qop = qop,
    this.consoleNonce = consoleNonce,
    this.nonceCounter = 1,
    this.nc = nc
  }
}
