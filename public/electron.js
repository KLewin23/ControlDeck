// @ts-ignore
const { Menu, app, BrowserWindow, Tray, nativeImage, ipcMain, dialog } = require("electron");
const path = require("path");
const url = require("url");
const express = require("express");
const getPort = require("get-port");
const internalIp = require("internal-ip");
const { autoUpdater } = require("electron-updater");
const os = require("os");
const fs = require("fs");

let mainWindow;
let tray;
let currentReq = null;
const expressApp = express();

app.whenReady().then(() => {
    autoUpdater.checkForUpdatesAndNotify();
    mainWindow = new BrowserWindow({
        width: 800,
        height: 550,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            allowRunningInsecureContent: false
        },
        autoHideMenuBar: true,
        title: "Control Deck",
        frame: false
    });

    const contextMenu = Menu.buildFromTemplate([
        { label: "Close" }
    ]);
    contextMenu.items[0].click = () => app.quit();
    tray = new Tray(nativeImage.createFromPath(path.join(__dirname, "/icon.png")));
    tray.on("click", () => mainWindow.show());
    tray.setContextMenu(contextMenu);

    const startUrl =
        process.env.ELECTRON_START_URL ||
        url.format({
            pathname: path.join(__dirname, "/../build/index.html"),
            protocol: "file:",
            slashes: true
        });
    mainWindow.loadURL(startUrl);
    mainWindow.setResizable(false);
    if (JSON.stringify(process.env.MODE) === JSON.stringify("DEV")) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.on("close", (event) => {
        if (process.env.MODE !== "TEST") {
            event.preventDefault();
            mainWindow.hide();
            if (currentReq !== null) {
                //currentReq.send({ appStatus: "cancelled" });
                mainWindow.webContents.send("resetState");
            }
        }
    });
});

//REST API

expressApp.get("/addDevice", (req, res) => {
    try {
        mainWindow.webContents.send("addDevice", {
            name: req.query.name,
            width: req.query.width,
            height: req.query.height
        });
        currentReq = res;
    } catch (err) {
        console.log(err);
    }
});

expressApp.get("/getProfile", (req, res) => {
    try {
        if (req.query.name === undefined) {
            res.send({status: "error", error: "no name parameter in request"})
        } else {
            console.log(req.query.name)
            mainWindow.webContents.send("getProfile", {name: req.query.name });
            currentReq = res;
        }
    } catch (err) {
        console.log(err);
    }
});

const port = (async () => {
    return getPort({ port: 4000 });
})();

port.then((res) => {
    console.log(res);
    expressApp.listen(res);
});

//Electron backend

ipcMain.on("addedDevice", (event) => {
    event.returnValue = "sent";
    return currentReq.send({ appStatus: "success", deviceName: os.hostname() });
});

ipcMain.on("canceledAddDevice", (event) => {
    event.returnValue = "sent";
    return currentReq.send({ appStatus: "cancelled", deviceName: "null" });
});

ipcMain.on("sendProfile", (event,args) => {
    event.returnValue = "sent";
    if (typeof(args) === "string") {
        return currentReq.send({status: "error", error: args})
    } else {
        return currentReq.send({status: "success", profile: args})
    }
})

ipcMain.on("getIp", (event) => {
    port.then((res) => {
        event.returnValue = `${internalIp.v4.sync()}:${res}`;
    });
});

ipcMain.on("getImage", (event, args) => {
    dialog.showOpenDialog(
        null,
        {
            filters: [{ name: "images", extensions: ["jpg", "png", "gif"] }],
            properties: ["openFile"]
        }
    ).then(file => {
        if (!fs.existsSync(path.join(app.getPath("userData").toString(), "Images"))) {
            fs.mkdirSync(path.join(app.getPath("userData").toString(), "Images"));
        }
        fs.copyFile(
            file.filePaths[0],
            path.join(app.getPath("userData").toString(), "Images", path.basename(file.filePaths[0])),
            function(err) {
                if (err) throw err;
            }
        );
        const image = fs.readFileSync(file.filePaths[0]).toString("base64");
        event.sender.send("returnImage", {
            file: image,
            location: path.join(app.getPath("userData").toString(), "Images", path.basename(file.filePaths[0]))
        });
    });
});

ipcMain.on("getImageRaw", (event, args) => {
    event.returnValue = fs.readFileSync(args).toString("base64");
});

ipcMain.on("getUserDataFolder", (event, args) => {
    event.returnValue = app.getPath("userData");
});

ipcMain.on("createFile", (event, { path, contents }) => {
    fs.appendFile(path, contents, (err) => {
        if (err) {
            event.return = `ERROR: ${err}`;
            throw err;
        } else {
            event.returnValue = "SUCCESS";
        }
    });
});

ipcMain.on("checkFileExists", (event, { path }) => {
    if (fs.existsSync(path)) {
        event.returnValue = "EXISTS";
    } else {
        event.returnValue = "NEXISTS";
    }
});

ipcMain.on("overwriteFile", (event, { path, contents }) => {
    fs.writeFile(path, contents, function(err) {
        if (err) throw err;
        event.returnValue = "success";
    });
});

ipcMain.on("readFile", (event, { path }) => {
    fs.readFile(path, "utf8", function(err, data) {
        if (err) throw err;
        event.returnValue = data;
    });
});
