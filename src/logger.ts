import { BrowserWindow } from "electron";

let mainWindow: BrowserWindow

export function setLoggerTarget(window: BrowserWindow) {
    mainWindow = window
}

export function log(...args: string[]) {
    const date = new Date()
    const dateString = formatDate(date)
    args = [dateString, ...args]
    mainWindow.webContents.send("log", args.join(" "))
    console.log(args)
}

function formatDate(date: Date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero indexed
    const year = date.getFullYear().toString();
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    const second = date.getSeconds().toString().padStart(2, '0');

    return `[${year}-${month}-${day} ${hour}:${minute}:${second}]`;
}