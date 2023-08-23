const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  connectDevice: (title) => ipcRenderer.invoke('connectDevice', title)
})
