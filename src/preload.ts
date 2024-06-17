import { contextBridge, clipboard, ipcRenderer } from "electron";

interface IApi {
    clipboardRead: () => string
    clipboardWrite: (text: string) => void
    send: (channel: string, ...args: any[]) => void
    invoke: (channel: string, ...args: any[]) => Promise<any>
    on: (channel: string, listener: (event: Electron.IpcRendererEvent, ...args: any[]) => void) => void
}

declare global {
    interface Window {
        api: IApi
    }
}

const api: IApi = {
    clipboardRead: () => clipboard.readText(),
    clipboardWrite: (text: string) => clipboard.writeText(text),
    send: (channel, ...args) => ipcRenderer.send(channel, ...args),
    invoke: (channel, ...args) => ipcRenderer.invoke(channel, ...args),
    on: (channel, listener) => ipcRenderer.on(channel, listener)
}

contextBridge.exposeInMainWorld("api", api)