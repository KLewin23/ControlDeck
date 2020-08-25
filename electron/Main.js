/**
 * @Author Kieran Lewin
 * @Description Entry point for electron to load the React app, will handle rest api and processes
 * @format
 */

/* eslint-disable import/no-extraneous-dependencies */

const { BrowserWindow, app, Menu, Tray } = require('electron');
const url = require('url');
const path = require('path');

app.whenReady().then(() => {
    const mainWindow = new BrowserWindow({
        width: 1000,
        height: 650,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            allowRunningInsecureContent: false,
            devTools:
                JSON.stringify(process.env.MODE) === JSON.stringify('DEV'),
        },
        autoHideMenuBar: true,
        title: 'Control Deck',
        frame: false,
    });
    const startUrl =
        process.env.ELECTRON_START_URL ||
        url.format({
            pathname: path.join(__dirname, '/../build/index.html'),
            protocol: 'file:',
            slashes: true,
        });
    const tray = new Tray(path.join(__dirname, '/icon.png'));
    tray.on('click', () => mainWindow.show());
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Close',
            click() {
                app.quit();
            },
        },
    ]);
    tray.setContextMenu(contextMenu);
    mainWindow.loadURL(startUrl).then(() => {});
    mainWindow.setResizable(false);
    mainWindow.on('close', (event) => {
        if (process.env.MODE !== 'TEST') {
            event.preventDefault();
            mainWindow.hide();
        }
    });
});
