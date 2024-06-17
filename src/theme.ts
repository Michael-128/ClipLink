import { BrowserWindow, ipcMain, nativeTheme } from "electron";
import Theme from "./types/Themes";

let mainWindow: BrowserWindow

export function setThemeTarget(window: BrowserWindow) {
    mainWindow = window
}

export function getTheme() {
    return nativeTheme.shouldUseDarkColors ? Theme.DARK : Theme.LIGHT
}

nativeTheme.addListener('updated', () => {
    mainWindow.webContents.send("theme-updated", getTheme())
})