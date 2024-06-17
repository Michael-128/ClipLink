import WebSocket from "ws"
import { copyToClipboard, monitorClipboard } from "./clipboard"

let ws: WebSocket

export async function startWSClient(ip = "localhost", port = "8081") {
    console.log("Starting client...")

    ws = new WebSocket(`ws://${ip}:${port}`)

    ws.on('open', () => {
        monitorClipboard((clipboard: string) => {
            console.log("[C] Outgoing", clipboard)
            ws.send(clipboard)
        })
    })

    ws.on('message', (message) => {
        console.log("[C] Incoming", message.toString())
        copyToClipboard(message.toString())
    })
}

export async function stopWSClient() {
    ws.close()
}