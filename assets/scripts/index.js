electron = require("electron");
remote = electron.remote;
size = remote.screen.getPrimaryDisplay().size;
econsole = remote.require("console");
edir = remote.app.getAppPath();
ipcRenderer = electron.ipcRenderer;
Store = require("electron-store");
fs = require("fs");
nicoJS = require('nicoJS');
$ = jQuery = require(`${edir}\\jquery\\jquery-3.5.1.min.js`);
nico_settings_path = `${edir}\\nico_settings.json`;
snowURL = `${edir}\\assets\\precipitate_snow\\index.html`;
paperURL = `${edir}\\assets\\precipitate_paper\\index.html`;

// nico_settings(if not exsists, generate)
try {
    nico_settings = JSON.parse(fs.readFileSync(nico_settings_path, 'utf8'));
} catch(error) {
    make_json = {"settings_type":"simple","color":"#ffffff","random_color":"true","font_size":"50","random_font_size":"true","speed":"1","speak":"false","show_image":"false","bot_url":"http://localhost:5569","heart_num":"2","present_num":"2","max_layer":"1","now_layer":"0","authors_list":[]}
    fs.writeFileSync(nico_settings_path, JSON.stringify(make_json));
}

// from json
if (nico_settings.present_num === "0") {
    json_present_num = 0;
} else if (nico_settings.present_num === "1") {
    json_present_num = 100;
} else if (nico_settings.present_num === "2") {
    json_present_num = 200;
} else if (nico_settings.present_num === "3") {
    json_present_num = 300;
} else if (nico_settings.present_num === "4") {
    json_present_num = 400;
} else {
    json_present_num = 0;
};

// ========== function ==========

function showSticker(src, width, height, alt, num, repeat_num) {
    img = document.createElement("img");
    img.src = src;
    img.width = width;
    img.height = height;
    img.alt = alt;
    
    // set the position
    img.style.position = 'absolute';
    img.style.top = document.body.clientHeight * Math.random() + 'px';
    img.style.left = document.body.clientWidth * Math.random() + 'px';

    $(img).hide().appendTo("#contents").fadeIn(500).delay(1000).fadeOut(500, function(){
        $(img).remove();
    });
    if (num < repeat_num) {
        setTimeout(function(){showSticker(src, width, height, alt, num+1, repeat_num);}, 10);
    } else {
        // pass
    }
};

function showFixedMessage(message, size, color, show_msc) {
    fixedMessage = document.createElement("p");
    fixedMessage.innerHTML = message;
    // set the font
    fixedMessage.style.fontSize = String(size) + "px";
    fixedMessage.style.fontWeight = "bold";
    // set the color
    fixedMessage.style.color = color;
    // append
    $(fixedMessage).hide().appendTo("#contents").fadeIn(500).delay(show_msc).fadeOut(500, function(){
        $(fixedMessage).remove();
    });
}

function getFontSizeColor(author) {
    nico_settings = JSON.parse(fs.readFileSync(nico_settings_path, 'utf8'));
    author_exist = false;
    if (nico_settings.settings_type === "simple") {
        // simple settings
        if (nico_settings.random_color === "true") {
            color = "#";
            for(var i = 0; i < 6; i++) {
                color += (16*Math.random() | 0).toString(16);
            };
        } else {
            color = nico_settings.color;
        }
        if (nico_settings.random_font_size === "true") {
            font_size = Math.floor(Math.random() * 50) + 40;
        } else {
            font_size = nico_settings.font_size;
        }
        nico_settings.authors_list.forEach((auth) => {
            if (author == auth.name) {
                author_exist = true;
            };
        });
        if (!author_exist) {
            try {
                generated_index = String(Number(nico_settings.authors_list[nico_settings.authors_list.length - 1].index)+1);
                nico_settings.authors_list.push({index:generated_index,name: author, color: "white", font_size: "50"});
                fs.writeFileSync(nico_settings_path, JSON.stringify(nico_settings));
            } catch {
                generated_index = "1";
                nico_settings.authors_list.push({index:generated_index,name: author, color: "white", font_size: "50"});
                fs.writeFileSync(nico_settings_path, JSON.stringify(nico_settings));
            }
        };
    } else {
        nico_settings.authors_list.forEach((auth) => {
            if (author == auth.name) {
                author_exist = true;
                color = auth.color;
                font_size = auth.font_size;
            };
        });
        if (!author_exist) {
            try {
                generated_index = String(Number(nico_settings.authors_list[nico_settings.authors_list.length - 1].index)+1);
                nico_settings.authors_list.push({index:generated_index,name: author, color: "white", font_size: "50"});
                fs.writeFileSync(nico_settings_path, JSON.stringify(nico_settings));
            } catch {
                generated_index = "1";
                nico_settings.authors_list.push({index:generated_index,name: author, color: "white", font_size: "50"});
                fs.writeFileSync(nico_settings_path, JSON.stringify(nico_settings));
            }
            color = "white";
            font_size = "50";
        };
    };
    return [color, Number(font_size)];
};

// ====================

nico = new nicoJS({
    app: document.getElementById("contents"),
    width: size.width,
    height: Math.round(size.height*0.85),
    color: "white",
    font_size: 200,
});

nico.listen();

nico.send("This is Spoon-Display!(Bot URL: " + "5569" + ")", "#ffffff", 50);

// ipcRenderer
ipcRenderer.on('message', (event, message) => {
    if (typeof(message.type) === "string" && typeof(message.author) === "string" && typeof(message.content) === "string" && typeof(message.present_type) === "string") {
        try {
            if (message.type == "enter") {
                // Enter
                nico_message = message.author + message.content;
                showFixedMessage(nico_message, 50, "#FF4100", 3000);
                nico_message = null;
            } else if (message.type == "message") {
                // message
                nico_message = message.author + "：" + message.content;
            } else if (message.type == "combo") {
                // combo message
                nico_message = message.author + "：" + message.content;
            } else if (message.type == "like") {
                // heart
                nico_message = message.author + message.content;
                ipcRenderer.send('pericipitate-heart', 100);
                showFixedMessage(nico_message, 50, "#FF4100", 3000);
                nico_message = null;
            } else if (message.type == "present") {
                // present
                message_content_split = message.content.split("Sp");
                if (message_content_split[1].replace(/[^0-9]/g, "") === "") {
                    nico_message = message.author + "が" + message.content + "をくれたよ！";
                    showFixedMessage(nico_message, 50, "#FF4100", 3000);
                    presentNum = parseInt(message_content_split[0].replace(/[^0-9]/g, ""));
                } else {
                    nico_message = message.author + "が" + message.content + "をくれたよ！";
                    showFixedMessage(nico_message, 50, "#FF4100", 3000);
                    presentNum = parseInt(message_content_split[0].replace(/[^0-9]/g, "")) * parseInt(message_content_split[1].replace(/[^0-9]/g, ""));
                }
                if (presentNum <= 10) {
                    try {
                        presentNum *= (json_present_num/10);
                    } catch {
                        presentNum = 0;
                    }
                } else {
                    presentNum = json_present_num;
                }
                try {
                    showSticker(`${edir}\\stickers\\${message.present_type}`, 200, 200, "sticker", 1, presentNum);
                } catch {
                    // paper
                    ipcRenderer.send('pericipitate-paper', presentNum);
                }
            } else if (message.type == "play") {
                // voting
                nico_message = message.content;
            } else if (message.type == "follow") {
                // follow
                nico_message = null;
            } else {
                // pass
                nico_message = null;
            }
        } catch {
            nico_message = null;
        };
        econsole.log(nico_message);
        if (nico_message !== null) {
            // getFontSizeColor
            [color, font_size] = getFontSizeColor(message.author);
            if (font_size != 0) {
                nico.send(nico_message, color, Number(font_size));
            } else {
                // pass
            };
            if (nico_message.includes("👏🏻✨👏🏻✨👏🏻✨👏🏻✨👏🏻✨") || nico_message.includes("ぱちぱち")) {
                ipcRenderer.send('pericipitate-paper', 100);
            };
        }
    } else {
        // pass
    };
});