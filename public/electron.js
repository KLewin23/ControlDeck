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
const robot = require("robotjs")

let mainWindow; // the main window for the application
let tray; // the tray for the mainWindow
let currentReq = null; // the current active request, without this request wont send results to the correct request
const expressApp = express(); // express -- REST Api

app.whenReady().then(() => { // when the app is ready
    autoUpdater.checkForUpdatesAndNotify(); //check if any updates can be found and if there are tell the user to update
    mainWindow = new BrowserWindow({ // new window
        width: 800,
        height: 550,
        webPreferences: { // options that over time I had to set due my apps needs, usually worked out by reading issues
            nodeIntegration: true,
            enableRemoteModule: true,
            allowRunningInsecureContent: false
        },
        autoHideMenuBar: true, // removes the default menu bar
        title: "Control Deck", // the title of the window
        frame: false // removes the top bar and its buttons (exit,minimize, maximize)
    });

    const contextMenu = Menu.buildFromTemplate([
        { label: "Close" } // the only option in the tray to close the app
    ]);
    contextMenu.items[0].click = () => app.quit(); // when close is clicked it will kill the app
    tray = new Tray(nativeImage.createFromPath(path.join(__dirname, "/icon.png"))); // the applications tray icon
    tray.on("click", () => mainWindow.show()); // what happens when the tray icon is clicked
    tray.setContextMenu(contextMenu);

    const startUrl =
        process.env.ELECTRON_START_URL ||    // if I am in dev mode I will set the start URL so that I can load my react changes that will be
        url.format({                 // being shown at localhost:3000, when I build the app the files will be loaded instead
            pathname: path.join(__dirname, "/../build/index.html"),
            protocol: "file:",
            slashes: true
        });
    mainWindow.loadURL(startUrl);
    mainWindow.setResizable(false);
    if (JSON.stringify(process.env.MODE) === JSON.stringify("DEV")) { // whilst in dev mode I will open the developer toolds
        mainWindow.webContents.openDevTools();
    }

    mainWindow.on("close", (event) => {
        if (process.env.MODE !== "TEST") {  // make sure im not in test mode, if I am make the app close like normal to keep things simple
            event.preventDefault();
            mainWindow.hide();  /// dont kill the app on close button, just hide it
            if (currentReq !== null) {
                //currentReq.send({ appStatus: "cancelled" });
                mainWindow.webContents.send("resetState");
            }
        }
    });
});

//REST API

const expressApp = express();

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

expressApp.get("/event",(req,res) => {
    console.log(req.query.eventName)
})

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

