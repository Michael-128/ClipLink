import { clipboard } from "electron"

let previousText = ""

export function setPreviousText(text: string) {
    previousText = text
}

export function monitorClipboard(callback: (clipboard: string) => void) {
    setInterval(() => {
        const clipboardContent = clipboard.readText()

        if(clipboardContent == previousText) return

        setPreviousText(clipboardContent)
        callback(clipboardContent)
    }, 500)
}

export function copyToClipboard(text: string) {
    if(text != clipboard.readText()) {
        clipboard.writeText(text)    
        console.log(text)
    } 
}
