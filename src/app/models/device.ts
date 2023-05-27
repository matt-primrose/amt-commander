/*********************************************************************
* Copyright (c) Intel Corporation 2023
* SPDX-License-Identifier: Apache-2.0
**********************************************************************/

export interface Device {
  id: string
  name: string
  hostname: string
  auth: AuthenticationMethod
}

export type AuthenticationMethod = 'digest-none' | 'digest-tls' | 'kerberos-none' | 'kerberos-tls'