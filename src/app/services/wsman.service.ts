import { Injectable } from '@angular/core';
import { AMT, CIM, IPS } from '@open-amt-cloud-toolkit/wsman-messages';

@Injectable({
  providedIn: 'root'
})
export class WsmanService {
  private amtMessages = new AMT.Messages()
  private cimMessages = new CIM.Messages()
  private ipsMessages = new IPS.Messages()
  constructor() { }

  
}
