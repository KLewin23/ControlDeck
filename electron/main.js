// @ts-ignore
const {app, BrowserWindow, Tray, nativeImage, ipcMain } = require('electron')
const path = require('path')
const url = require("url");
const express = require('express')
const getPort = require('get-port')
const ip = require('ip')

let mainWindow;
let tray;

app.whenReady().then(() => {
    tray = new Tray(nativeImage.createFromPath(path.join(__dirname, '/icon.png')))
    tray.on('click', () => mainWindow.show())
    mainWindow = new BrowserWindow({
        width: 800,
        height: 550,
        webPreferences: {
            nodeIntegration: true
        },
        autoHideMenuBar: true,
        title: 'Control Deck',
        frame: false
    })

    const startUrl =
        process.env.ELECTRON_START_URL ||
        url.format({
            pathname: path.join(__dirname, "../build/index.html"),
            protocol: "file:",
            slashes: true
        });
    console.log(startUrl)
    mainWindow.loadURL(startUrl)
    mainWindow.setResizable(false)
    mainWindow.webContents.openDevTools();

    mainWindow.on('close', (event) => {
        event.preventDefault();
        mainWindow.hide();
    })
})



const expressApp = express();

expressApp.get('/addDevice', (req, res) => {
    mainWindow.webContents.send('addDevice','name')
    res.send('success')
})


const port = (async () => {
     return getPort({port: 4000});
})();

port.then((res) => {
    console.log(res)
    expressApp.listen(res)
})

ipcMain.on("getIp", (event) => {
    port.then((res) => {
        event.returnValue = `${ip.address()}:${res}`
    })
})

