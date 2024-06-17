import AppMode from "./types/AppMode"

enum StorageKeys {
    APP_MODE = "appMode",
    CLIENT_IP = "clientIP",
    CLIENT_PORT = "clientPort",
    SERVER_PORT = "serverPort"
}

export function saveAppMode(mode: string) {
    localStorage.setItem(StorageKeys.APP_MODE, mode)
}

export function getAppMode() {
    const appMode = localStorage.getItem(StorageKeys.APP_MODE)
    if(appMode === AppMode.SERVER) return AppMode.SERVER
    else return AppMode.CLIENT
}

export function saveClientIP(ip: string) {
    localStorage.setItem(StorageKeys.CLIENT_IP, ip)
}

export function getClientIP() {
    return localStorage.getItem(StorageKeys.CLIENT_IP)
}

export function saveClientPort(port: number) {
    localStorage.setItem(StorageKeys.CLIENT_PORT, port.toString())
}

export function getClientPort() {
    const port = parseInt(localStorage.getItem(StorageKeys.CLIENT_PORT))
    if(!port) return 21888 
    return port
}

export function saveClientData(ip: string, port: number) {
    saveClientIP(ip)
    saveClientPort(port)
}

export function getClientData() {
    return {
        ip: getClientIP(),
        port: getClientPort()
    }
}

export function saveServerPort(port: number) {
    localStorage.setItem(StorageKeys.SERVER_PORT, port.toString())
}

export function getServerPort() {
    const port = parseInt(localStorage.getItem(StorageKeys.SERVER_PORT))
    if(!port) return 21888 
    return port
}