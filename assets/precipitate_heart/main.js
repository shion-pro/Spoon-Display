electron = require("electron");
remote = electron.remote;
size = remote.screen.getPrimaryDisplay().size;
econsole = remote.require("console");
edir = remote.app.getAppPath();
Store = require("electron-store");
fs = require("fs");
nicoJS = require('nicoJS');
make_json_file = require(`${edir}\\make_json_file.js`);
$ = jQuery = require(`${edir}\\jquery\\jquery-3.5.1.min.js`);
SD_settings_path = `${edir}\\SD_settings.json`;

try {
    SD_settings = JSON.parse(fs.readFileSync(SD_settings_path, 'utf8'));
} catch(error) {
    make_json_file.SD_settings(SD_settings_path);
}

if (SD_settings.heart_num === "0") {
    json_heart_num = 0;
} else if (SD_settings.heart_num === "1") {
    json_heart_num = 50;
} else if (SD_settings.heart_num === "2") {
    json_heart_num = 100;
} else if (SD_settings.heart_num === "3") {
    json_heart_num = 150;
} else if (SD_settings.heart_num === "4") {
    json_heart_num = 200;
} else {
    json_heart_num = 0;
}

hearts = ["💖", "💝", "💛", "🧡", "💙", "💚", "💜", "🤎"];

function precipitate_heart(size, num, repeat_num) {
    heart = document.createElement("p");
    heart.innerHTML = hearts[(num - 1) % 8];
    heart.style.fontSize = String(size) + "px";

    // set the position
    heart.style.position = 'absolute';
    heart.style.top = document.body.clientHeight * Math.random() + 'px';
    heart.style.left = document.body.clientWidth * Math.random() + 'px';
  
    // document.body.appendChild(heart);
    $(heart).hide().appendTo(document.body).fadeIn(500).delay(1000).fadeOut(500, function(){
        $(heart).remove();
    });
    if (num < repeat_num) {
        setTimeout(function(){precipitate_heart(size, num+1, repeat_num);}, 10);
    } else {
        setTimeout("closeWindow()", 2000);
    }
};

function closeWindow() {
    remote.getCurrentWindow().close();
}

precipitate_heart(10, 1, json_heart_num);