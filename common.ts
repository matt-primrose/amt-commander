/*********************************************************************
* Copyright (c) Intel Corporation 2022
* SPDX-License-Identifier: Apache-2.0
**********************************************************************/

import { AMT, CIM, IPS } from "@open-amt-cloud-toolkit/wsman-messages"
import * as xml2js from 'xml2js'
import { HttpZResponseModel } from 'http-z'

export const ClassMetaData = {
  AMT_AlarmClockService: {
    methods: [AMT.Methods.ENUMERATE, AMT.Methods.GET, AMT.Methods.PULL, AMT.Methods.ADD_ALARM]
  },
  AMT_AuditLog: {
    methods: [AMT.Methods.ENUMERATE, AMT.Methods.GET, AMT.Methods.PULL, AMT.Methods.READ_RECORDS]
  },
  AMT_AuthorizationService: {
    methods: [AMT.Methods.ENUMERATE, AMT.Methods.GET, AMT.Methods.PULL, AMT.Methods.SET_ADMIN_ACL_ENTRY_EX, AMT.Methods.ADD_ADMIN_ACL_ENTRY_EX, AMT.Methods.ENUMERATE_USER_ACL_ENTRIES, AMT.Methods.GET_ACL_ENABLED_STATE, AMT.Methods.GET_ADMIN_ACL_ENTRY, AMT.Methods.GET_ADMIN_ACL_ENTRY_STATUS, AMT.Methods.GET_ADMIN_NET_ACL_ENTRY_STATUS, AMT.Methods.GET_USER_ACL_ENTRY_EX, AMT.Methods.REMOVE_USER_ACL_ENTRY, AMT.Methods.SET_ACL_ENABLED_STATE, AMT.Methods.UPDATE_USER_ACL_ENTRY_EX]
  },
  AMT_BootCapabilities: {
    methods: [AMT.Methods.ENUMERATE, AMT.Methods.GET, AMT.Methods.PULL]
  },
  AMT_BootSettingData: {
    methods: [AMT.Methods.ENUMERATE, AMT.Methods.GET, AMT.Methods.PULL, AMT.Methods.PUT]
  },
  AMT_EnvironmentDetectionSettingData: {
    methods: [AMT.Methods.ENUMERATE, AMT.Methods.GET, AMT.Methods.PULL, AMT.Methods.PUT]
  },
  AMT_EthernetPortSettings: {
    methods: [AMT.Methods.ENUMERATE, AMT.Methods.PULL]
  },
  AMT_GeneralSettings: {
    methods: [AMT.Methods.ENUMERATE, AMT.Methods.GET, AMT.Methods.PULL, AMT.Methods.PUT]
  },
  AMT_IEEE8021xCredentialContext: {
    methods: [AMT.Methods.ENUMERATE, AMT.Methods.GET, AMT.Methods.PULL]
  },
  AMT_IEEE8021xProfile: {
    methods: [AMT.Methods.GET, AMT.Methods.ENUMERATE, AMT.Methods.PULL, AMT.Methods.PUT]
  },
  AMT_ManagementPresenceRemoteSAP: {
    methods: [AMT.Methods.ENUMERATE, AMT.Methods.GET, AMT.Methods.PULL, AMT.Methods.DELETE]
  },
  AMT_MessageLog: {
    methods: [AMT.Methods.ENUMERATE, AMT.Methods.GET, AMT.Methods.GET_RECORDS, AMT.Methods.POSITION_TO_FIRST_RECORD, AMT.Methods.PULL]
  },
  AMT_PublicKeyCertificate: {
    methods: [AMT.Methods.ENUMERATE, AMT.Methods.GET, AMT.Methods.PULL, AMT.Methods.DELETE]
  },
  AMT_PublicKeyManagementService: {
    methods: [AMT.Methods.ENUMERATE, AMT.Methods.GET, AMT.Methods.PULL, AMT.Methods.GENERATE_KEY_PAIR, AMT.Methods.ADD_CERTIFICATE, AMT.Methods.ADD_TRUSTED_ROOT_CERTIFICATE]
  },
  AMT_PublicPrivateKeyPair: {
    methods: [AMT.Methods.ENUMERATE, AMT.Methods.GET, AMT.Methods.PULL]
  },
  AMT_RedirectionService: {
    methods: [AMT.Methods.ENUMERATE, AMT.Methods.GET, AMT.Methods.PULL, AMT.Methods.PUT]
  },
  AMT_RemoteAccessPolicyAppliesToMPS: {
    methods: [AMT.Methods.ENUMERATE, AMT.Methods.GET, AMT.Methods.PULL, AMT.Methods.PUT]
  },
  AMT_RemoteAccessPolicyRule: {
    methods: [AMT.Methods.ENUMERATE, AMT.Methods.GET, AMT.Methods.PULL, AMT.Methods.DELETE]
  },
  AMT_RemoteAccessService: {
    methods: [AMT.Methods.ENUMERATE, AMT.Methods.GET, AMT.Methods.PULL, AMT.Methods.ADD_MPS, AMT.Methods.ADD_REMOTE_ACCESS_POLICY_RULE]
  },
  AMT_SetupAndConfigurationService: {
    methods: [AMT.Methods.COMMIT_CHANGES, AMT.Methods.ENUMERATE, AMT.Methods.GET, AMT.Methods.GET_UUID, AMT.Methods.PULL]
  },
  AMT_TimeSynchronizationService: {
    methods: [AMT.Methods.ENUMERATE, AMT.Methods.GET, AMT.Methods.GET_LOW_ACCURACY_TIME_SYNCH, AMT.Methods.PULL]
  },
  AMT_TLSCredentialContext: {
    methods: [AMT.Methods.ENUMERATE, AMT.Methods.GET, AMT.Methods.PULL]
  },
  AMT_TLSSettingData: {
    methods: [AMT.Methods.ENUMERATE, AMT.Methods.GET, AMT.Methods.PULL]
  },
  AMT_UserInitiatedConnectionService: {
    methods: [AMT.Methods.ENUMERATE, AMT.Methods.GET, AMT.Methods.PULL]
  },
  AMT_WiFiPortConfigurationService: {
    methods: [AMT.Methods.ENUMERATE, AMT.Methods.GET, AMT.Methods.PULL, AMT.Methods.PUT]
  },
  CIM_BIOSElement: {
    methods: [CIM.Methods.ENUMERATE, CIM.Methods.GET, CIM.Methods.PULL]
  },
  CIM_BootService: {
    methods: [CIM.Methods.ENUMERATE, CIM.Methods.GET, CIM.Methods.PULL]
  },
  CIM_Card: {
    methods: [CIM.Methods.ENUMERATE, CIM.Methods.GET, CIM.Methods.PULL]
  },
  CIM_Chassis: {
    methods: [CIM.Methods.ENUMERATE, CIM.Methods.GET, CIM.Methods.PULL]
  },
  CIM_Chip: {
    methods: [CIM.Methods.ENUMERATE, CIM.Methods.GET, CIM.Methods.PULL]
  },
  CIM_ComputerSystemPackage: {
    methods: [CIM.Methods.ENUMERATE, CIM.Methods.GET, CIM.Methods.PULL]
  },
  CIM_IEEE8021xSettings: {
    methods: [CIM.Methods.ENUMERATE, CIM.Methods.GET, CIM.Methods.PULL]
  },
  CIM_KVMRedirectionSAP: {
    methods: [CIM.Methods.ENUMERATE, CIM.Methods.GET, CIM.Methods.PULL]
  },
  CIM_MediaAccessDevice: {
    methods: [CIM.Methods.ENUMERATE, CIM.Methods.GET, CIM.Methods.PULL]
  },
  CIM_PhysicalMemory: {
    methods: [CIM.Methods.ENUMERATE, CIM.Methods.GET, CIM.Methods.PULL]
  },
  CIM_PhysicalPackage: {
    methods: [CIM.Methods.ENUMERATE, CIM.Methods.GET, CIM.Methods.PULL]
  },
  CIM_PowerManagementService: {
    methods: [CIM.Methods.ENUMERATE, CIM.Methods.GET, CIM.Methods.PULL]
  },
  CIM_Processor: {
    methods: [CIM.Methods.ENUMERATE, CIM.Methods.GET, CIM.Methods.PULL]
  },
  CIM_ServiceAvailableToElement: {
    methods: [CIM.Methods.ENUMERATE, CIM.Methods.GET, CIM.Methods.PULL]
  },
  CIM_SoftwareIdentity: {
    methods: [CIM.Methods.ENUMERATE, CIM.Methods.GET, CIM.Methods.PULL]
  },
  CIM_SystemPackaging: {
    methods: [CIM.Methods.ENUMERATE, CIM.Methods.GET, CIM.Methods.PULL]
  },
  CIM_WiFiEndpointSettings: {
    methods: [CIM.Methods.ENUMERATE, CIM.Methods.GET, CIM.Methods.PULL]
  },
  CIM_WiFiPort: {
    methods: [CIM.Methods.ENUMERATE, CIM.Methods.GET, CIM.Methods.PULL]
  },
  IPS_AlarmClockOccurrence: {
    methods: [IPS.Methods.ENUMERATE, IPS.Methods.GET, IPS.Methods.PULL]
  },
  IPS_HostBasedSetupService: {
    methods: [IPS.Methods.ENUMERATE, IPS.Methods.GET, IPS.Methods.PULL]
  },
  IPS_IEEE8021xCredentialContext: {
    methods: [IPS.Methods.ENUMERATE, IPS.Methods.GET, IPS.Methods.PULL]
  },
  IPS_IEEE8021xSettings: {
    methods: [IPS.Methods.ENUMERATE, IPS.Methods.GET, IPS.Methods.PULL, IPS.Methods.PUT, IPS.Methods.SET_CERTIFICATES]
  },
  IPS_OptInService: {
    methods: [IPS.Methods.CANCEL_OPT_IN, IPS.Methods.ENUMERATE, IPS.Methods.GET, IPS.Methods.PULL, IPS.Methods.PUT, IPS.Methods.START_OPT_IN]
  }
}

// Properly handles numbers at the beginning of ElementName or InstanceID
export const myParseNumbers = (value: string, name: string): any => {
  if (name === 'ElementName' || name === 'InstanceID') {
    if (value.length > 1 && value.charAt(0) === '0') {
      return value
    }
  }
  return xml2js.processors.parseNumbers(value, name)
}

export const stripPrefix = xml2js.processors.stripPrefix
export const parser = new xml2js.Parser({ ignoreAttrs: true, mergeAttrs: false, explicitArray: false, tagNameProcessors: [stripPrefix], valueProcessors: [myParseNumbers, xml2js.processors.parseBooleans] })
export class error {
  status: number
  error: string
  constructor(status: number, error: string) {
    this.status = status
    this.error = error
  }
}

export const parseBody = (message: HttpZResponseModel): string => {
  let xmlBody: string = ''
  // parse the body until its length is greater than 5, because body ends with '0\r\n\r\n'
  while (message.body.text.length > 5) {
    const chunkLength = message.body.text.indexOf('\r\n')
    if (chunkLength < 0) {
      return ''
    }
    // converts hexadecimal chunk size to integer
    const chunkSize = parseInt(message.body.text.substring(0, chunkLength), 16)
    if (message.body.text.length < chunkLength + 2 + chunkSize + 2) {
      return ''
    }
    const data = message.body.text.substring(chunkLength + 2, chunkLength + 2 + chunkSize)
    message.body.text = message.body.text.substring(chunkLength + 2 + chunkSize + 2)
    xmlBody += data
  }
  return xmlBody
}

export const parseXML = (xmlBody: string): any => {
  let wsmanResponse: string
  parser.parseString(xmlBody, (err, result) => {
    if (err) {
      wsmanResponse = null
    } else {
      wsmanResponse = result
    }
  })
  return wsmanResponse
}

export enum LogType {
  ERROR = 'ERROR',
  INFO = 'INFO',
  WARNING = 'WARNING',
  DEBUG = 'DEBUG'
}
export const Logger = (type: LogType, module: string, msg: string): void => {
  switch (type.toUpperCase()) {
    case LogType.ERROR:
      console.error(`${module}:${msg}`)
      break
    case LogType.DEBUG:
      if (process.env.LOG_LEVEL === LogType.DEBUG) {
        console.debug(`${module}:${msg}`)
      }
      break
    case LogType.INFO:
      console.info(`${module}:${msg}`)
      break
    case LogType.WARNING:
      console.warn(`${module}:${msg}`)
      break
    default:
      return
  }
}

export enum PeriodicType {
  Interval = 0,
  Daily = 1
}

export enum Trigger {
  UserInitiated = 0,
  Alert = 1,
  Periodic = 2,
  HomeProvisioning = 3
}

export const generateExtendedDataBase64 = (periodicType?: 0 | 1, timePeriodSeconds?: number, hourOfDay?: number, minuteOfHour?: number): string => {
  let extendedData;

  if (periodicType === PeriodicType.Interval) {
    // For periodic type 0, encode the time period in seconds as a uint64 value
    const buffer = Buffer.alloc(8);
    buffer.writeBigUInt64BE(BigInt(timePeriodSeconds));
    extendedData = buffer;
  } else if (periodicType === PeriodicType.Daily) {
    // For periodic type 1, encode the hour of day and minute of hour as two uint32 values
    const buffer = Buffer.alloc(8);
    buffer.writeUInt32BE(hourOfDay, 0);
    buffer.writeUInt32BE(minuteOfHour, 4);
    extendedData = buffer;
  } else {
    // For other trigger types, the extended data should be a byte sequence of length zero
    extendedData = Buffer.alloc(0);
  }

  // Encode the extended data as a base64 string
  const base64 = extendedData.toString('base64')

  return base64;
}

