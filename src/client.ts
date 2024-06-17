import WebSocket from "ws"
import { copyToClipboard, monitorClipboard, setPreviousText } from "./clipboard"
import { stopWSServer } from "./server"
import ClientStatus from "./types/ClientStatus"
import { BrowserWindow } from "electron"
import { log } from "./logger"

let ws: WebSocket

let clientStatus: ClientStatus = ClientStatus.CLOSE

export function emitClientStatus(mainWindow: BrowserWindow) {
    mainWindow.webContents.send("client-status", {"status": clientStatus})
}

function setClientStatus(mainWindow: BrowserWindow, status: ClientStatus) {
    clientStatus = status
    emitClientStatus(mainWindow)
}

export async function startWSClient(mainWindow: BrowserWindow, ip = "localhost", port = "8081") {
    stopWSServer()

    log("Starting client...")
    
    ws = new WebSocket(`ws://${ip}:${port}`)

    ws.on('open', () => {
        setClientStatus(mainWindow, ClientStatus.OPEN)

        monitorClipboard((clipboard: string) => {
            log("[C] Outgoing", clipboard)
            ws.send(clipboard)
        })
    })

    ws.on('message', (message) => {
        log("[C] Incoming", message.toString())
        setPreviousText(message.toString())
        copyToClipboard(message.toString())
    })

    ws.on('close', () => {
        log("Stopping client...")
        setClientStatus(mainWindow, ClientStatus.CLOSE)
    })

    ws.on('error', (err) => {
        log(err.message)
    })
}

export async function stopWSClient() {
    if(ws) ws.close()
    ws = undefined
}