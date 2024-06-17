import { WebSocketServer } from "ws"
import { copyToClipboard, monitorClipboard, setPreviousText } from "./clipboard"
import { BrowserWindow, ipcMain, ipcRenderer } from "electron";
import ServerStatus from "./types/ServerStatus";
import { stopWSClient } from "./client";
import { log } from "./logger";

let wss: WebSocketServer;
let serverStatus: ServerStatus = ServerStatus.CLOSE

export function emitServerStatus(mainWindow: BrowserWindow) {
    mainWindow.webContents.send("server-status", {"status": serverStatus})
}

function setServerStatus(mainWindow: BrowserWindow, status: ServerStatus) {
    serverStatus = status
    emitServerStatus(mainWindow)
}

export async function startWSServer(mainWindow: BrowserWindow, port = 8081) {
    stopWSClient()

    log("Starting server...")

    wss = new WebSocketServer({port: port})

    wss.on('listening', () => {
        setServerStatus(mainWindow, ServerStatus.LISTENING)
    })

    wss.on('connection', (ws) => {
        //ipcMain.emit("server-status", {"status": "connection"})

        ws.on('message', (message) => {
            log("[S] Incoming", message.toString())
            setPreviousText(message.toString())
            copyToClipboard(message.toString())
        })

        monitorClipboard((clipboard) => {
            log("[S] Outgoing", clipboard)
            ws.send(clipboard)
        })
    })

    wss.on('close', () => {
        log("Stopping server...")
        setServerStatus(mainWindow, ServerStatus.CLOSE)
    })

    wss.on('error', (err) => {
        log(err.message)
    })
}

export async function stopWSServer() {
    if(wss) wss.close()
    wss = undefined
}
