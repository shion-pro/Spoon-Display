electron = require("electron");
remote = electron.remote;
size = remote.screen.getPrimaryDisplay().size;
econsole = remote.require("console");
edir = remote.app.getAppPath();
ipcRenderer = electron.ipcRenderer;
Store = require("electron-store");
fs = require("fs");
fetch = require('node-fetch');
nicoJS = require('nicoJS');
make_json_file = require(`${edir}\\make_json_file.js`);
$ = jQuery = require(`${edir}\\jquery\\jquery-3.5.1.min.js`);
SD_settings_path = `${edir}\\SD_settings.json`;
snowURL = `${edir}\\assets\\precipitate_snow\\index.html`;
paperURL = `${edir}\\assets\\precipitate_paper\\index.html`;

// SD_settings(if not exsists, generate)
try {
    SD_settings = JSON.parse(fs.readFileSync(SD_settings_path, 'utf8'));
} catch(error) {
    make_json_file.SD_settings(SD_settings_path);
}

// ========== function ==========


function createMessage(message, color, size, speed) {
    if (typeof(message.type) === "string" && typeof(message.author) === "string" && typeof(message.auth_img) === "string" && typeof(message.content) === "string" && typeof(message.present_type) === "string") {
        try {
            if (message.type == "enter") {
                showFixedMessage(message.author + message.content, 50, "#FF4100", 3000);
            } else if (message.type == "message" || message.type == "combo") {
                if (message.content.indexOf("\n") == -1) {
                    add_indent_message = "";
                    for (var i = 0; i < message.content.length; i++) {
                        if ((i % 30) == 0 && i != 0) {
                            add_indent_message += "\n";
                        }
                        add_indent_message += message.content[i];
                    }
                    message.content = add_indent_message;
                }
                original_message = message;
                message = null;
                size_ratio = size/20;
                // create wrap
                $("<div>", {class:"message"}).css("display","flex").css("position", "absolute").css("left", `${$("#contents").width()}px`).css("top", "0px").css("color", color).css("font-size", `${size}px`).css("z-index", `${speed}`).appendTo("#contents");
                message = $(".message:last");
                // create inner
                $("<div>", {class:"message-auth-img"}).css("background-image", `url(${original_message.auth_img})`).css("background-size", `${size_ratio*25}px`).css("width", `${size_ratio*25}px`).css("height", `${size_ratio*25}px`).css("border-radius", "50%").css("border", "5px white").css("margin-top", `${size_ratio*5}px`).css("margin-left", `${size_ratio*10}px`).appendTo(message);
                $("<div>", {class:"message-author"}).appendTo(message);
                $("<div>", {class:"message-content"}).css("background-color", "#13141636").css("border-radius", `${size_ratio*3}px`).appendTo(message);
                author = message.find(".message-author");
                content = message.find(".message-content");
                // create pre
                $("<pre>", {text:original_message.author + " "}).css("font-family", "Noto Sans,sans-serif").css("margin", `${size_ratio*5}px ${size_ratio*0}px ${size_ratio*5}px ${size_ratio*10}px`).appendTo(author);
                $("<pre>", {text:original_message.content}).css("font-family", "Noto Sans,sans-serif").css("margin", `${size_ratio*5}px ${size_ratio*5}px ${size_ratio*5}px ${size_ratio*5}px`).appendTo(content); // .css("white-space",  "pre-wrap")
                message.css("top", `${String(($("#contents").height() - message.height()) * Math.random())}px`);
                if (original_message.content.includes("👏🏻✨👏🏻✨👏🏻✨👏🏻✨👏🏻✨") || original_message.content.includes("ぱちぱち") || original_message.content.includes("👏")) {
                    ipcRenderer.send('pericipitate-paper');
                };
            } else if (message.type == "like") {
                // heart
                ipcRenderer.send('pericipitate-heart');
                showFixedMessage(message.author + message.content, 50, "#FF4100", 3000);
            } else if (message.type == "present") {
                // present
                showFixedMessage(message.author + "が" + message.content + "をくれたよ！", 50, "#FF4100", 3000);
                presentNum = getPresentNum();
                if (presentNum != 0) {
                    try {
                        showSticker(message.present_type, 200, 200, "sticker", 1, presentNum);
                    } catch {
                        // paper
                        ipcRenderer.send('pericipitate-paper');
                    }
                }
            } else if (message.type == "play") {
                // voting
                showFixedMessage(message.content, 50, "#FF4100", 3000);
            } else if (message.type == "follow") {
                // follow
                // pass
            } else {
                // pass
            }
        } catch {

        }
    } else {
        // pass
    };
}

function flowMessage(screen_width) {
    $(".message").each(function(i, message){
        message = $(message);
        left = Number(message.css("left").replace("px", ""));
        right = Number(message.css("right").replace("px", ""));
        speed = Number(message.css("z-index"));
        if (right < screen_width) {
            message.css("left", `${left - speed}px`);
        } else {
            message.remove();
        }
    });
    setTimeout(function(){
        flowMessage(screen_width);
    }, 15);
}

function getPresentNum() {
    SD_settings = JSON.parse(fs.readFileSync(`${edir}\\SD_settings.json`, 'utf8'));
    // from json
    if (SD_settings.present_num === "0") {
        json_present_num = 0;
    } else if (SD_settings.present_num === "1") {
        json_present_num = 50;
    } else if (SD_settings.present_num === "2") {
        json_present_num = 100;
    } else if (SD_settings.present_num === "3") {
        json_present_num = 150;
    } else if (SD_settings.present_num === "4") {
        json_present_num = 200;
    } else {
        json_present_num = 0;
    };
    return json_present_num;
}

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

function getColorFontSizeSpeed(author) {
    SD_settings = JSON.parse(fs.readFileSync(SD_settings_path, 'utf8'));
    author_exist = false;
    if (SD_settings.settings_type === "simple") {
        // simple settings
        if (SD_settings.random_color === "true") {
            color = "#";
            for(var i = 0; i < 6; i++) {
                color += (16*Math.random() | 0).toString(16);
            };
        } else {
            color = SD_settings.color;
        }
        if (SD_settings.random_font_size === "true") {
            font_size = Math.floor(Math.random() * 50) + 40;
        } else {
            font_size = SD_settings.font_size;
        }
        if (SD_settings.random_speed === "true") {
            speed = Math.floor(Math.random() * 7) + 2;
        } else {
            speed = SD_settings.speed;
        }
        SD_settings.authors_list.forEach((auth) => {
            if (author == auth.name) {
                author_exist = true;
            };
        });
        if (!author_exist) {
            try {
                generated_index = String(Number(SD_settings.authors_list[SD_settings.authors_list.length - 1].index)+1);
                SD_settings.authors_list.push({index:generated_index,name:author,color:"#ffffff",font_size:"50",speed:"5"});
                fs.writeFileSync(SD_settings_path, JSON.stringify(SD_settings));
            } catch {
                generated_index = "1";
                SD_settings.authors_list.push({index:generated_index,name:author,color:"#ffffff",font_size:"50",speed:"5"});
                fs.writeFileSync(SD_settings_path, JSON.stringify(SD_settings));
            }
        };
    } else {
        SD_settings.authors_list.forEach((auth) => {
            if (author == auth.name) {
                author_exist = true;
                color = auth.color;
                font_size = auth.font_size;
                speed = auth.speed;
            };
        });
        if (!author_exist) {
            try {
                generated_index = String(Number(SD_settings.authors_list[SD_settings.authors_list.length - 1].index)+1);
                SD_settings.authors_list.push({index:generated_index,name:author,color:"#ffffff",font_size:"50",speed:"5"});
                fs.writeFileSync(SD_settings_path, JSON.stringify(SD_settings));
            } catch {
                generated_index = "1";
                SD_settings.authors_list.push({index:generated_index,name:author,color:"#ffffff",font_size:"50",speed:"5"});
                fs.writeFileSync(SD_settings_path, JSON.stringify(SD_settings));
            }
            color = "#ffffff";
            font_size = "50";
            speed = "5"
        };
    };
    return [color, Number(font_size), Number(speed)];
};

// ====================

// ipcRenderer
ipcRenderer.on('message', (event, message) => {
    // getFontSizeColor
    [color, font_size, speed] = getColorFontSizeSpeed(message.author);
    if (font_size != 0 && speed != 0) {
        createMessage(message, color, font_size, speed);
    }
});

createMessage({"type":"message","author":"Shion-Pro","auth_img":"./pics/SD.png","content":"Spoon-Display!","present_type":"none"}, "#ffffff", 50, 5);

flowMessage($("#contents").width());
