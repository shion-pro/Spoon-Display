electron = require("electron");
remote = electron.remote;
edir = remote.app.getAppPath();
ipcRenderer = electron.ipcRenderer;
$ = jQuery = require(`${edir}\\jquery\\jquery-3.5.1.min.js`);

function showSplash(src) {
    img = document.createElement("img");
    img.src = src;
    img.width = 500;
    img.height = 300;

    $(img).hide().appendTo("#splash-content").fadeIn(300).delay(1000).fadeOut(300, function(){
        $(img).remove();
        ipcRenderer.send('close-splash', null);
    });
};

showSplash(`./pics/Spoon-Display.png`);