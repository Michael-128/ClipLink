import { app, BrowserWindow, ipcMain, nativeImage } from 'electron';
import * as path from 'path';
// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

import { emitServerStatus, startWSServer, stopWSServer } from './server';
import { emitClientStatus, startWSClient, stopWSClient } from './client';
import { getLocalIP } from './localip';
import { setLoggerTarget } from './logger';
import { getTheme, setThemeTarget } from './theme';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 800,
    width: 600,
    resizable: false,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      sandbox: false
    },
  });

  setThemeTarget(mainWindow)
  setLoggerTarget(mainWindow)

  ipcMain.on('startWSServer', (event, ...args) => { startWSServer(mainWindow, args.length > 0 ? args[0] : 8081) })
  ipcMain.on('startWSClient', (event, ...args) => { try { startWSClient(mainWindow, ...args) } catch(e) { console.error(e) } })
  
  ipcMain.on("emitWSServerStatus", () => { emitServerStatus(mainWindow) })
  ipcMain.on("emitWSClientStatus", () => { emitClientStatus(mainWindow) })

  ipcMain.on('stopWSServer', stopWSServer)
  ipcMain.on('stopWSClient', stopWSClient)

  ipcMain.handle('getNativeTheme', () => { return getTheme() })
  ipcMain.handle('getLocalIP', () => {
    return getLocalIP();
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
