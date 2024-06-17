import { WebSocketServer } from "ws"
import { copyToClipboard, monitorClipboard } from "./clipboard"
import { BrowserWindow, ipcMain, ipcRenderer } from "electron";

let wss: WebSocketServer;

export async function startWSServer(mainWindow: BrowserWindow, port = 8081) {
    console.log("Starting server...")

    wss = new WebSocketServer({port: port})

    wss.on('listening', () => {
        mainWindow.webContents.send("server-status", {"status": "listening"})
    })

    wss.on('connection', (ws) => {
        //ipcMain.emit("server-status", {"status": "connection"})

        ws.on('message', (message) => {
            console.log("[S] Incoming", message.toString())
            copyToClipboard(message.toString())
        })

        monitorClipboard((clipboard) => {
            console.log("[S] Outgoing", clipboard)
            ws.send(clipboard)
        })
    })

    wss.on('close', () => {
        mainWindow.webContents.send("server-status", {"status": "close"})
    })
}

export async function stopWSServer() {
    wss.close()
}
