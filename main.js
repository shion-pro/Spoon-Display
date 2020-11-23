express = require('express');
express_app = express();
electron = require('electron');
fs = require('fs');
BrowserWindow = electron.BrowserWindow;
app = electron.app;
Menu = electron.Menu;
Tray = electron.Tray;
nativeImage = electron.nativeImage;
ipcMain = electron.ipcMain;

// ========== CRX ==========

// ====================

// ========== mainWindow ==========
// b u nico_settings
// ====================

// ========== Settings ==========
// send-message(next ver.)
// ====================

// ========== Config ==========

// set URL, Window
splashURL = `${__dirname}\\assets\\splash.html`;
mainURL = `${__dirname}\\assets\\index.html`;
settingsURL = `${__dirname}\\assets\\settings.html`;
paperURL = `${__dirname}\\assets\\precipitate_paper\\index.html`;
heartURL = `${__dirname}\\assets\\precipitate_heart\\index.html`;
splashWindow = null;
mainWindow = null;
settingsWindow = null;
tray = null;

// init now_layer
try {
    nico_settings = JSON.parse(fs.readFileSync('.\\nico_settings.json', 'utf8'));
    nico_settings.now_layer = "0";
    fs.writeFileSync('.\\nico_settings.json', JSON.stringify(nico_settings));
} catch(error) {
    make_json = {"settings_type":"simple","color":"#ffffff","random_color":"true","font_size":"50","random_font_size":"true","speed":"1","speak":"false","show_image":"false","bot_url":"http://localhost:5569","heart_num":"2","present_num":"2","max_layer":"1","now_layer":"0","authors_list":[]}
    fs.writeFileSync('.\\nico_settings.json', JSON.stringify(make_json));
}

// ====================

// ========== ipc ==========
ipcMain.on("close-settings-with-change", (event, TRUE) => {
    app.relaunch();
    app.exit(0);
});

ipcMain.on("close-settings-without-change", (event, TRUE) => {
    settingsWindow?.close();
});

ipcMain.on("pericipitate-paper", (event, spoonNum) => {
    size = electron.screen.getPrimaryDisplay().size;
    nico_settings = JSON.parse(fs.readFileSync('.\\nico_settings.json', 'utf8'));
    if (parseInt(nico_settings.now_layer) < parseInt(nico_settings.max_layer)) {
        nico_settings.now_layer = String(parseInt(nico_settings.now_layer) + 1);
        fs.writeFileSync('.\\nico_settings.json', JSON.stringify(nico_settings));
        var paperWindow = new BrowserWindow({
            x: 0,
            y: 0,
            width: size.width,
            height: size.height,
            frame: false,
            transparent: true,
            alwaysOnTop: true,
            resizable: true,
            hasShadow: false,
            skipTaskbar: true,
            show: true,
            webPreferences: {
                nodeIntegration: true,
                enableRemoteModule: true
            }
        });
        paperWindow.setIgnoreMouseEvents(true);
        paperWindow.loadURL(paperURL);
        // for debug
        // paperWindow.webContents.openDevTools();
        paperWindow.on('closed', function () {
            paperWindow = null;
            nico_settings = JSON.parse(fs.readFileSync('.\\nico_settings.json', 'utf8'));
            nico_settings.now_layer = String(parseInt(nico_settings.now_layer) - 1);
            fs.writeFileSync('.\\nico_settings.json', JSON.stringify(nico_settings));
        });
    }
})

ipcMain.on("pericipitate-heart", (event, spoonNum) => {
    size = electron.screen.getPrimaryDisplay().size;
    nico_settings = JSON.parse(fs.readFileSync('.\\nico_settings.json', 'utf8'));
    if (parseInt(nico_settings.now_layer) < parseInt(nico_settings.max_layer)) {
        nico_settings.now_layer = String(parseInt(nico_settings.now_layer) + 1);
        fs.writeFileSync('.\\nico_settings.json', JSON.stringify(nico_settings));
        var heartWindow = new BrowserWindow({
            x: 0,
            y: 0,
            width: size.width,
            height: size.height,
            frame: false,
            transparent: true,
            alwaysOnTop: true,
            resizable: true,
            hasShadow: false,
            skipTaskbar: true,
            show: true,
            webPreferences: {
                nodeIntegration: true,
                enableRemoteModule: true
            }
        });
        heartWindow.setIgnoreMouseEvents(true);
        heartWindow.loadURL(heartURL);
        // for debug
        // heartWindow.webContents.openDevTools();
        heartWindow.on('closed', function () {
            heartWindow = null;
            nico_settings = JSON.parse(fs.readFileSync('.\\nico_settings.json', 'utf8'));
            nico_settings.now_layer = String(parseInt(nico_settings.now_layer) - 1);
            fs.writeFileSync('.\\nico_settings.json', JSON.stringify(nico_settings));
        });
    }
})

// ====================

function createSplash() {
    if (splashWindow === null) {
        size = electron.screen.getPrimaryDisplay().size;
        splashWindow = new BrowserWindow({
            x: 0,
            y: 0,
            width: size.width,
            height: size.height,
            frame: false,
            transparent: true,
            alwaysOnTop: true,
            resizable: true,
            hasShadow: false,
            skipTaskbar: true,
            show: true,
            webPreferences: {
                nodeIntegration: true,
                enableRemoteModule: true
            },
            icon: `${__dirname}\\config\\icons\\show.png`,
        });
        splashWindow.setIgnoreMouseEvents(true);
        splashWindow.loadURL(splashURL);
        // for debug
        // splashWindow.webContents.openDevTools();
        splashWindow.on('closed', () => {
            settingsWindow = null;
            mainWindow = null;
        });
    }
    setTimeout(createWindow, 1000);
}

function createWindow() {
    if (splashWindow != null) {
        splashWindow.hide();
        splashWindow = null;
    }
    if (mainWindow === null) {
        size = electron.screen.getPrimaryDisplay().size;
        mainWindow = new BrowserWindow({
            x: 0,
            y: 0,
            width: size.width,
            height: Math.round(size.height*0.95),
            frame: false,
            transparent: true,
            alwaysOnTop: true,
            resizable: true,
            hasShadow: false,
            skipTaskbar: true,
            show: true,
            webPreferences: {
                nodeIntegration: true,
                enableRemoteModule: true
            },
            icon: `${__dirname}\\config\\icons\\show.png`,
        });
        mainWindow.setIgnoreMouseEvents(true);
        mainWindow.loadURL(mainURL);
        // for debug
        // mainWindow.webContents.openDevTools();
        mainWindow.on('closed', () => {
            settingsWindow = null;
            mainWindow = null;
        });
    }
    if (settingsWindow === null) {
        settingsWindow = new BrowserWindow({
            width: 1000,
            height: 700,
            frame: false,
            resizable: false,
            show: false,
            webPreferences: {
                nodeIntegration: true,
                enableRemoteModule: true
            },
            icon: `${__dirname}\\config\\icons\\show.png`,
        });
        settingsWindow.setMenu(null);
        settingsWindow.loadURL(settingsURL);
        // for debug
        // settingsWindow.webContents.openDevTools();
        settingsWindow.on('closed', () => {
            settingsWindow = null;
        });
    }
};

// before display main window, splash
app.on('ready', createSplash);
app.whenReady().then(() => {
    tray = Tray(
      nativeImage.createFromPath(`${__dirname}\\config\\icons\\show.png`)
    );
    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'Show',
        click: function () {
          if (mainWindow === null) {
            createWindow();
          }
          mainWindow?.show();
          mainWindow?.focus();
          tray.setImage(`${__dirname}\\config\\icons\\show.png`);
        },
      },
      {
        label: 'Hide',
        click: function () {
          mainWindow?.hide();
          tray.setImage(`${__dirname}\\config\\icons\\hide.png`);
        },
      },
      {
        label: 'Settings',
        click: function () {
          if (settingsWindow === null) {
            createWindow();
          }
          settingsWindow?.show();
          settingsWindow?.focus();
        },
      },
      {
        label: 'Relaunch',
        click: function () {
          app.relaunch();
          app.exit(0);
        },
      },
      {
        label: 'Close',
        click: function () {
            mainWindow?.close();
            settingsWindow?.close();
            // ipc, socket.io
            app.exit(0);
        },
      },
    ]);
    tray.setToolTip(app.getName());
    tray.setContextMenu(contextMenu);
});
// quit 
app.on('window-all-closed', () => {
    app.quit();
});

// just in case
app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});


// ========== Server PRT 5569 ==========
// allow CORS
express_app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "https://www.spooncast.net"); // allow cors from spoon-port
      res.header('Access-Control-Allow-Credentials', true); // わかんね
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); // :<
      next(); // :<
});
// var server = express_app.listen(5569);
sio = require("socket.io")(express_app.listen(5569), {'transports': ['websocket', 'polling']}, { // socket.io connect with express server
    cors: {
        origin: "https://www.spooncast.net", // allow cors(express need?)
        methods: ["GET", "POST"], // php?
        // allowedHeaders: ["my-custom-header"], // :<
        credentials: true // :<
    }
});

sio.on("connection", function(socket) { // when connect to crx
    console.log("connected");
    socket.on('chat', function(msg){ // when get message from crx
        console.log(msg);
        // send to mainWindow
        mainWindow.webContents.send('message', msg);
    });
})
// ====================