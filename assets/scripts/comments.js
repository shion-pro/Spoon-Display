electron = require("electron");
remote = electron.remote;
size = remote.screen.getPrimaryDisplay().size;
econsole = remote.require("console");
edir = remote.app.getAppPath();
ipcRenderer = electron.ipcRenderer;
Store = require("electron-store");
fs = require("fs");
nicoJS = require('nicoJS');
make_json_file = require(`${edir}\\make_json_file.js`);
$ = jQuery = require(`${edir}\\jquery\\jquery-3.5.1.min.js`);
SD_settings_path = `${edir}\\SD_settings.json`;
snowURL = `${edir}\\assets\\precipitate_snow\\index.html`;
paperURL = `${edir}\\assets\\precipitate_paper\\index.html`;

function createEnter(message) {
    // create wrap
    $("<div>", {class:"enter-div comment"}).css("margin", "10px 0 10px 0").appendTo("#comments-container");
    comment = $(".comment:last");
    // create inner
    $("<div>", {class:"enter-content"}).appendTo(comment);
    content = comment.find(".enter-content");
    // create pre
    $("<pre>", {text:message.author + message.content}).css("font-family", "Noto Sans,sans-serif").css("margin", "0 0 0 10px").css("color", "#FF4100").appendTo(content);
}

function createMessageCombo(message) {
    // create wrap
    $("<div>", {class:"message-combo-div comment"}).css("margin", "10px 0 10px 0").css("display","flex").appendTo("#comments-container");
    comment = $(".comment:last");
    // create inner
    $("<div>", {class:"message-combo-auth-img"}).css("background-image", `url(${message.auth_img})`).css("background-size", "25px").css("width", "25px").css("height", "25px").css("border-radius", "50%").css("margin-top", "5px").css("margin-left", "10px").appendTo(comment);
    $("<div>", {class:"message-combo-author"}).appendTo(comment);
    $("<div>", {class:"message-combo-content"}).css("background-color", "#282a2e36").css("border-radius", "3px").appendTo(comment);
    author = comment.find(".message-combo-author");
    content = comment.find(".message-combo-content").css("max-width", "330px");
    // create pre
    $("<pre>", {text:message.author + " "}).css("font-family", "Noto Sans,sans-serif").css("margin", "5px 0 5px 10px").appendTo(author);
    $("<pre>", {text:message.content}).css("font-family", "Noto Sans,sans-serif").css("margin", "5px 5px 5px 5px").css("white-space",  "pre-wrap").appendTo(content);
};

function createLike(message) {
    // create wrap
    $("<div>", {class:"like-div comment"}).css("margin", "10px 0 10px 0").appendTo("#comments-container");
    comment = $(".comment:last");
    // create inner
    $("<div>", {class:"like-content"}).appendTo(comment);
    content = comment.find(".like-content");
    // create pre
    $("<pre>", {text:message.author + message.content}).css("font-family", "Noto Sans,sans-serif").css("margin", "0 0 0 10px").css("color", "#FF4100").appendTo(content);
}

function createPresent(message) {
    // create wrap
    $("<div>", {class:"present-div comment"}).css("margin", "10px 0 10px 0").css("display","flex").appendTo("#comments-container");
    comment = $(".comment:last");
    // create inner
    $("<div>", {class:"present-content"}).appendTo(comment);
    $("<div>", {class:"present-img"}).appendTo(comment);
    content = comment.find(".present-content").css("max-width", "500px");
    img = comment.find(".present-img");
    // create pre
    $("<pre>", {text:message.author + "さんが" + message.content + "をくれたよ！"}).css("font-family", "Noto Sans,sans-serif").css("margin", "0 0 0 10px").css("color", "#fff562").appendTo(content);
    $("<img>", {src:message.present_type}).css("height", "50px").appendTo(img);
    // https://static.spooncast.net/jp/stickers/basic/sticker_jp_juice/sticker_jp_juice_web.png
}

function createPlay(message) {
    // create wrap
    $("<div>", {class:"play-div comment"}).css("margin", "10px 0 10px 0").appendTo("#comments-container");
    comment = $(".comment:last");
    // create inner
    $("<div>", {class:"play-content"}).appendTo(comment);
    content = comment.find(".play-content");
    // create pre
    $("<pre>", {text:message.content}).css("font-family", "Noto Sans,sans-serif").css("margin", "0 0 0 10px").css("color", "#2d70ff").appendTo(content);
}

function createFollow(message) {
    // pass
}

function scroll() {
    // if focus => scroll
}

$(function() {
    // generate from log messages
    messages_log = JSON.parse(fs.readFileSync(`${edir}\\messages_log.json`, 'utf8'));
    messages_log.messages.forEach((message) => {
        if (message.type == "enter") {
            createEnter(message);
        } else if (message.type == "message") {
            createMessageCombo(message);
        } else if (message.type == "combo") {
            createMessageCombo(message);
        } else if (message.type == "like") {
            createLike(message);
        } else if (message.type == "present") {
            createPresent(message);
        } else if (message.type == "play") {
            createPlay(message);
        } else if (message.type == "follow") {
            // pass
        } else {
    
        }
    });
    // ipc on
    ipcRenderer.on('message', (event, message) => {
        console.log(message.content);
        if (message.type == "enter") {
            createEnter(message);
        } else if (message.type == "message") {
            createMessageCombo(message);
        } else if (message.type == "combo") {
            createMessageCombo(message);
        } else if (message.type == "like") {
            createLike(message);
        } else if (message.type == "present") {
            createPresent(message);
        } else if (message.type == "play") {
            createPlay(message);
        } else if (message.type == "follow") {
            // pass
        } else {
    
        }
    });
});