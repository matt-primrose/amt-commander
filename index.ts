/*********************************************************************
* Copyright (c) Intel Corporation 2022
* SPDX-License-Identifier: Apache-2.0
**********************************************************************/

import * as express from 'express'
import * as bodyParser from 'body-parser'
import { ClassMetaData, Logger, LogType } from './common'
import { MessageHandler, MessageObject, MessageRequest } from './messageHandler'
import { DigestAuth } from './digestAuth'
import { SocketHandler, SocketParameters } from './socketHandler'
// import ExpressBrute = require("express-brute")

// const store = new ExpressBrute.MemoryStore()
// const bruteForce = new ExpressBrute(store)
process.env['LOG_LEVEL'] = LogType.DEBUG
const app = express()
const serverPort = process.env['PORT'] ?? 3001
let socketHandler: SocketHandler
let digestAuth: DigestAuth
let socketParameters: SocketParameters
class HttpRequest {
  address!: string
  port!: number
  username!: string
  password!: string
}

class HttpResponse {
  xmlBody!: string | undefined
  jsonBody: any
  error!: string[]
  statusCode!: number | undefined
}

app.use(express.static('public'))
app.use(bodyParser.json({ type: 'application/json' }))

app.route('/').get((req, res) => {
  res.sendFile('index.html')
})

app.route('/classes').get(async (req, res) => { res.status(200).send(ClassMetaData) })

app.route('/connect').post(async (req, res) => {
  const request: HttpRequest = req.body
  if (request.address == null || request.port == null || request.username == null || request.password == null) {
    res.status(404).json({ error: 'invalid request' })
  }
  let port: number
  if (request.port.toString() === '16992') {
    port = 16992
  } else {
    port = 16993
  }
  let address: string = request.address
  // console.log(request.address)
  // if (!(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(request.address)) && !(request.address === 'localhost')) {
  //   res.status(404).json({ error: 'invalid request'} )
  // } else {
  //   address = request.address
  // }
  digestAuth = new DigestAuth(request.username, request.password, address, port)
  socketParameters = { address: address, port: port }
  if (socketHandler == null) { socketHandler = new SocketHandler(socketParameters) }
  const connectResponse = await socketHandler.connect()
  if (connectResponse === 'connected') {
    // Socket is ready for messages
    res.status(200).send(connectResponse)
  }
  if (connectResponse === 'error') {
    // Socket error
    res.status(500).send(connectResponse)
  }
})

app.route('/wsman').post(async (req, res) => {
  if (req.body) {
    const messageHandler = new MessageHandler(socketHandler, digestAuth)
    const messageObject: any = messageHandler.createMessageObject(req.body)
    if (messageObject.error?.length > 0) {
      messageObject.error.forEach((element: string) => {
        Logger(LogType.ERROR, 'INDEX', element)
      });
      res.status(500).send(messageObject)
    } else {
      messageObject.xml = await messageHandler.createMessage(messageObject)
      res.status(200).send(messageObject.xml)
    }
  } else {
    res.status(500).send('Missing body')
  }
})

app.route('/submit').post(async (req, res) => {
  if (digestAuth == null || socketHandler == null) {
    res.status(500).send('Error: not connected')
    Logger(LogType.ERROR, 'INDEX', 'Error: not connected')
    return
  }
  const request: MessageRequest = req.body
  const messageHandler = new MessageHandler(socketHandler, digestAuth)
  const messageObject = messageHandler.createMessageObject(request)
  if (messageObject.error?.length > 0) {
    messageObject.error.forEach(element => {
      Logger(LogType.ERROR, 'INDEX', element)
    })
    res.status(500).send(messageObject)
  } else {
    const response: MessageObject = await messageHandler.sendMessage(messageObject)
    const httpResponse = new HttpResponse()
    httpResponse.xmlBody = response.xmlResponse
    if (response.xmlResponse?.includes('DeleteResponse') && response.jsonResponse.Envelope.Body == '') {
      httpResponse.jsonBody = { Envelope: { Body: 'Success' } }
    } else {
      httpResponse.jsonBody = response.jsonResponse
    }
    httpResponse.error = response.error
    httpResponse.statusCode = response.statusCode ? response.statusCode : 500
    Logger(LogType.INFO, 'INDEX', JSON.stringify(httpResponse))
    res.status(httpResponse.statusCode).send(httpResponse)
  }
})

app.route('/disconnect').delete((req, res) => {
  if (socketHandler?.socket !== null) {
    socketHandler?.socket.destroy()
    // socketHandler = null
  }
  res.status(200).send('disconnected')
})

app.listen(serverPort, () => {
  Logger(LogType.INFO, 'AMT Explorer running at', ` http://localhost:${serverPort}`)
})
