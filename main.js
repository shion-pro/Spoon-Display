express = require('express');
express_app = express();
net = require('net');
electron = require('electron');
fs = require('fs');
make_json_file = require('.\\make_json_file.js');
BrowserWindow = electron.BrowserWindow;
app = electron.app;
Menu = electron.Menu;
Tray = electron.Tray;
nativeImage = electron.nativeImage;
edir = app.getAppPath();
ipcMain = electron.ipcMain;

// ========== CRX ==========
// 
// ====================

// ========== mainWindow ==========
// 
// ====================

// ========== Settings ==========
// 
// ====================

// ========== Comments ==========
// 
// ====================

// ========== Updated ==========
// mainWindow起動前にメッセージを受信した際生じるエラーを修復
// splash screenの挙動を変更(未だ単なる飾り。今後読み込み短縮を行う)
// send_message機能(ハート、スプーン受け取り時とか)
// コメントゲットをchange感知に(取逃し防止)
// make_jsonを他ファイル関数に変更(main, index, settings)
// msg.authorが枠主じゃないときのみ送信(どうやって自分とるん(それかメッセージの一部とってやる)) <=
// 5569占領時は起動しないように(メッセージはまだ)
// 設定変更時の再起動を不要に
// コメントWindow(半透明)
// messageの文字数制限つけたい(アイフォンで確認)
// speed変更可能
// ====================

// ========== Bugs ==========
// cmdがフォント変わった(npm startの所為だからパッケージングしたら関係ない)
// CRXがエラー吐く(XHRエラーだからどうしようもない)
// ====================

// ========== Config ==========

// set URL, Window
splashURL = `${__dirname}\\assets\\splash.html`;
mainURL = `${__dirname}\\assets\\index.html`;
settingsURL = `${__dirname}\\assets\\settings.html`;
commentsURL = `${__dirname}\\assets\\comments.html`;
paperURL = `${__dirname}\\assets\\precipitate_paper\\index.html`;
heartURL = `${__dirname}\\assets\\precipitate_heart\\index.html`;
splashWindow = null;
mainWindow = null;
settingsWindow = null;
commentsWindow = null;
tray = null;

// init now_layer
try {
    SD_settings = JSON.parse(fs.readFileSync(`${edir}\\SD_settings.json`, 'utf8'));
    SD_settings.now_layer = "0";
    fs.writeFileSync(`${edir}\\SD_settings.json`, JSON.stringify(SD_settings));
} catch(error) {
    make_json_file.SD_settings(`${edir}\\SD_settings.json`);
}

// init messages_log
try {
    messages_log = JSON.parse(fs.readFileSync(`${edir}\\messages_log.json`, 'utf8'));
    messages_log.messages = [];
    fs.writeFileSync(`${edir}\\messages_log.json`, JSON.stringify(messages_log));
} catch(error) {
    fs.writeFileSync(`${edir}\\messages_log.json`, JSON.stringify({"messages":[]}));
}

// ====================

// ========== func ==========

function returnMessage(msg) {
    SD_settings = JSON.parse(fs.readFileSync(`${edir}\\SD_settings.json`, 'utf8'));
    return_message = null;
    if (msg.type == "like" && SD_settings.send_heart_message == "true") {
        return_message = SD_settings.heart_message;
    } else if (msg.type == "present") {
        if (msg.content.indexOf("Spoon") != -1 && SD_settings.send_spoon_message == "true") {
            return_message = SD_settings.spoon_message;
        } else if (msg.content.indexOf("Spoon") == -1 && SD_settings.send_buster_message == "true") {
            return_message = SD_settings.buster_message;
        }
    }
    // replace author name
    if (return_message != null) {
        if (msg.author.length >= 20) {
            return_message = return_message.replace("(a_n)", msg.author.slice(0, 19));    
        } else {
            return_message = return_message.replace("(a_n)", msg.author);
        }
        sio.emit("returnMessage", return_message);
    }
}

function logMessages(msg) {
    messages_log = JSON.parse(fs.readFileSync(`${edir}\\messages_log.json`, 'utf8'));
    author_exist = false;
    messages_log.messages.push(msg);
    fs.writeFileSync(`${edir}\\messages_log.json`, JSON.stringify(messages_log));
}

// ====================

// ========== ipc ==========
ipcMain.on("close-splash", (event, TRUE) => {
    createWindow();
});

ipcMain.on("close-settings-with-change", (event, TRUE) => {
    // app.relaunch();
    // app.exit(0);
    settingsWindow?.close();
});

ipcMain.on("close-settings-without-change", (event, TRUE) => {
    settingsWindow?.close();
});

ipcMain.on("pericipitate-paper", (event) => {
    size = electron.screen.getPrimaryDisplay().size;
    SD_settings = JSON.parse(fs.readFileSync(`${edir}\\SD_settings.json`, 'utf8'));
    if (parseInt(SD_settings.now_layer) < parseInt(SD_settings.max_layer)) {
        SD_settings.now_layer = String(parseInt(SD_settings.now_layer) + 1);
        fs.writeFileSync(`${edir}\\SD_settings.json`, JSON.stringify(SD_settings));
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
            SD_settings = JSON.parse(fs.readFileSync(`${edir}\\SD_settings.json`, 'utf8'));
            SD_settings.now_layer = String(parseInt(SD_settings.now_layer) - 1);
            fs.writeFileSync(`${edir}\\SD_settings.json`, JSON.stringify(SD_settings));
        });
    }
})

ipcMain.on("pericipitate-heart", (event) => {
    size = electron.screen.getPrimaryDisplay().size;
    SD_settings = JSON.parse(fs.readFileSync(`${edir}\\SD_settings.json`, 'utf8'));
    if (parseInt(SD_settings.now_layer) < parseInt(SD_settings.max_layer)) {
        SD_settings.now_layer = String(parseInt(SD_settings.now_layer) + 1);
        fs.writeFileSync(`${edir}\\SD_settings.json`, JSON.stringify(SD_settings));
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
            SD_settings = JSON.parse(fs.readFileSync(`${edir}\\SD_settings.json`, 'utf8'));
            SD_settings.now_layer = String(parseInt(SD_settings.now_layer) - 1);
            fs.writeFileSync(`${edir}\\SD_settings.json`, JSON.stringify(SD_settings));
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
    };
};

function createWindow() {
    if (splashWindow != null) {
        splashWindow.hide();
    }
    if (mainWindow === null) {
        size = electron.screen.getPrimaryDisplay().size;
        mainWindow = new BrowserWindow({
            x: 0,
            y: 0,
            width: size.width,
            height: size.height,
            frame: false,
            transparent: true,
            // transparent: false,
            alwaysOnTop: true,
            // alwaysOnTop: false,
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
    };
    if (commentsWindow === null) {
        size = electron.screen.getPrimaryDisplay().size;
        commentsWindow = new BrowserWindow({
            opacity: 0.7, // set opacity
            width: 500,
            height: 350,
            x: size.width - 500,
            y: electron.screen.getPrimaryDisplay().bounds.height - 380,
            frame: false,
            transparent: true,
            alwaysOnTop: true,
            resizable: true,
            show: false,
            webPreferences: {
                nodeIntegration: true,
                enableRemoteModule: true
            },
            icon: `${__dirname}\\config\\icons\\show.png`,
        });
        commentsWindow.setMenu(null);
        commentsWindow.loadURL(commentsURL);
        // for debug
        // commentsWindow.webContents.openDevTools();
        commentsWindow.on('closed', () => {
            commentsWindow = null;
        });
    };
    if (splashWindow != null) {
        splashWindow?.close();
        splashWindow = null;
    };
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
        label: 'Comments',
        click: function () {
          if (commentsWindow === null) {
            createWindow();
          }
          commentsWindow?.show();
          commentsWindow?.focus();
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
function connectingSocket() {
    sio.emit("returnMessage", "connecting");
    setTimeout(function () {
        connectingSocket();
    }, 1000);
}
// build 5569
function buildServer() {
    sio = require("socket.io")(express_app.listen(5569), {'transports':['websocket', 'polling']}, { // socket.io connect with express server
        cors: {
            origin: "https://www.spooncast.net", // allow cors(express need?)
            methods: ["GET", "POST"], // php?
            // allowedHeaders: ["my-custom-header"], // :<
            credentials: true // :<
        }
    });
    sio.on("connection", function(socket) { // when connect to crx
        console.log("connected");
        connectingSocket();
        socket.on('chat', function(msg){ // when get message from crx
            if (msg == "connecting") {
                console.log("connecting...");
            } else {
                console.log(msg);
                // send to mainWindow
                try {
                    mainWindow.webContents.send('message', msg);
                    commentsWindow.webContents.send('message', msg);
                } catch {
                    // error occur when splash screen is on top
                }
                if (msg.type == "like" || msg.type == "present") {
                    returnMessage(msg);
                }
                logMessages(msg);
            }
        });
    })
}

// check if port is busy
test_server = net.createServer();
test_server.once('error', function(err) {
    if (err.code === 'EADDRINUSE') {
        // port is currently in use
        mainWindow?.close();
        settingsWindow?.close();
        app.exit(0);
    }
});
test_server.once('listening', function() {
  // close the server if listening doesn't fail
  test_server.close();
});
test_server.once('close',function() {
    // when server is not busy => buildServer
    buildServer()
});
test_server.listen(5569);
