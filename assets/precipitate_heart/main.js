electron = require("electron");
remote = electron.remote;
size = remote.screen.getPrimaryDisplay().size;
econsole = remote.require("console");
edir = remote.app.getAppPath();
Store = require("electron-store");
fs = require("fs");
nicoJS = require('nicoJS');
$ = jQuery = require(`${edir}\\jquery\\jquery-3.5.1.min.js`);
nico_settings_path = `${edir}\\nico_settings.json`;

try {
    nico_settings = JSON.parse(fs.readFileSync(nico_settings_path, 'utf8'));
} catch(error) {
    make_json = {"settings_type":"simple","color":"#ffffff","random_color":"true","font_size":"50","random_font_size":"true","speed":"1","speak":"false","show_image":"false","bot_url":"http://localhost:5569","heart_num":"2","present_num":"2","max_layer":"1","now_layer":"0","authors_list":{}}
    fs.writeFileSync(nico_settings_path, JSON.stringify(make_json));
    nico_settings = JSON.parse(fs.readFileSync(nico_settings_path, 'utf8'));
}
if (nico_settings.heart_num === "0") {
    json_heart_num = 0;
} else if (nico_settings.heart_num === "1") {
    json_heart_num = 50;
} else if (nico_settings.heart_num === "2") {
    json_heart_num = 100;
} else if (nico_settings.heart_num === "3") {
    json_heart_num = 150;
} else if (nico_settings.heart_num === "4") {
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