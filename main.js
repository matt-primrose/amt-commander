/*********************************************************************
* Copyright (c) Intel Corporation 2023
* SPDX-License-Identifier: Apache-2.0
**********************************************************************/

const { app, BrowserWindow } = require('electron')
const { spawn } = require('child_process')
const net = require('net')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win, serverProcess, socket, amtProcess

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1280,
    height: 1024,
    webPreferences: {
      nodeIntegration: true
    }
  })

  serverProcess = spawn('node', ['server.js'], {
    cwd: __dirname,
  })

  amtProcess = spawn('node', ['index.js'], {
    cwd: __dirname,
  })

  // and load the index.html of the app.
  win.loadFile('dist/amtcommander/index.html')

  // Open the DevTools.
  win.webContents.openDevTools()

  // Remove menu bar
  win.removeMenu()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
  ipcMain.on('socket-connect', connectionParams, () => {
    // Create socket connection
    socket = new net.Socket();

    // Connect to Intel AMT device
    socket.connect(connectionParams.port, connectionParams.hostname, () => {
      console.log('Connected to Intel AMT device');
    });
  });

  ipcMain.on('socket-disconnect', () => {
    if (socket) {
      socket.end();
      console.log('Disconnected from Intel AMT device');
    }
  });

  ipcMain.on('socket-send', (event, data) => {
    if (socket) {
      socket.write(data);
      console.log('Sent data to Intel AMT device');
    }
  });
}

app.commandLine.appendSwitch('disable-feature', 'OutOfBlinkCors')

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  app.on('activate', function() {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('before-quit', function() {
  if(serverProcess) {
    serverProcess.kill()
  }
})

// app.on('activate', () => {
//   // On macOS it's common to re-create a window in the app when the
//   // dock icon is clicked and there are no other windows open.
//   if (win === null) {
//     createWindow()
//   }
// })

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.