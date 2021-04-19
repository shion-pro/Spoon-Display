electron = require("electron");
remote = electron.remote;
econsole = remote.require("console");
edir = remote.app.getAppPath();
ipcRenderer = electron.ipcRenderer;
Store = require("electron-store");
fs = require("fs");
make_json_file = require(`${edir}\\make_json_file.js`);
// $ = jQuery = require(`${edir}\\jquery\\jquery-3.5.1.min.js`);
SD_settings_path = `${edir}\\SD_settings.json`;

try {
    SD_settings = JSON.parse(fs.readFileSync(SD_settings_path, 'utf8'));
} catch(error) {
    make_json_file.SD_settings(SD_settings_path);
}

// ===== Toggle =====
if (SD_settings.settings_type === "simple") {
    settings_type_toggle = "simple";
    $(".advanced-settings").addClass("blur");
} else {
    settings_type_toggle = "advanced";
    $(".simple-settings").addClass("blur");
    $("#settings-type-toggle").prop('checked', true);
}
if (SD_settings.random_color === "false") {
    random_color_toggle = false;
} else {
    random_color_toggle = true;
    $(".simple-color-fix").addClass("blur");
    $("#random-color-toggle").prop('checked', true);
}
if (SD_settings.random_font_size === "false") {
    random_font_size_toggle = false;
    $(".simple-font-size-fix").removeClass("blur");
} else {
    random_font_size_toggle = true;
    $(".simple-font-size-fix").addClass("blur");
    $("#random-font-size-toggle").prop('checked', true);
}
if (SD_settings.random_speed === "false") {
    random_speed_toggle = false;
    $(".simple-speed-fix").removeClass("blur");
} else {
    random_speed_toggle = true;
    $(".simple-speed-fix").addClass("blur");
    $("#random-speed-toggle").prop('checked', true);
}
if (SD_settings.send_heart_message === "false") {
    heart_message_toggle = false;
    $("#heart-message-container").addClass("blur");
} else {
    heart_message_toggle = true;
    $("#heart-message-toggle").prop('checked', true);
}
if (SD_settings.send_spoon_message === "false") {
    spoon_message_toggle = false;
    $("#spoon-message-container").addClass("blur");
} else {
    spoon_message_toggle = true;
    $("#spoon-message-toggle").prop('checked', true);
}
if (SD_settings.send_buster_message === "false") {
    buster_message_toggle = false;
    $("#buster-message-container").addClass("blur");
} else {
    buster_message_toggle = true;
    $("#buster-message-toggle").prop('checked', true);
}
// Add
if (SD_settings.speech === "false") {
    speech_toggle = false;
} else {
    speech_toggle = true;
    $("#speech-toggle").prop('checked', true);
}

$('#settings-type-toggle').change(function() {
    if (settings_type_toggle === "simple") {
        settings_type_toggle = "advanced";
        $(".simple-settings").addClass("blur");
        $(".advanced-settings").removeClass("blur");
    } else {
        settings_type_toggle = "simple";
        $(".advanced-settings").addClass("blur");
        $(".simple-settings").removeClass("blur");
    }
});

$('#random-color-toggle').change(function() {
    if (random_color_toggle === false) {
        random_color_toggle = true;
        $(".simple-color-fix").addClass("blur");
    } else {
        random_color_toggle = false;
        $(".simple-color-fix").removeClass("blur");
    }
});

$('#random-font-size-toggle').change(function() {
    if (random_font_size_toggle === false) {
        random_font_size_toggle = true;
        $(".simple-font-size-fix").addClass("blur");
    } else {
        random_font_size_toggle = false;
        $(".simple-font-size-fix").removeClass("blur");
    }
});

$('#random-speed-toggle').change(function() {
    if (random_speed_toggle === false) {
        random_speed_toggle = true;
        $(".simple-speed-fix").addClass("blur");
    } else {
        random_speed_toggle = false;
        $(".simple-speed-fix").removeClass("blur");
    }
});

$('#heart-message-toggle').change(function() {
    if (heart_message_toggle === false) {
        heart_message_toggle = true;
        $("#heart-message-container").removeClass("blur");
    } else {
        heart_message_toggle = false;
        $("#heart-message-container").addClass("blur");
    }
});

$('#spoon-message-toggle').change(function() {
    if (spoon_message_toggle === false) {
        spoon_message_toggle = true;
        $("#spoon-message-container").removeClass("blur");
    } else {
        spoon_message_toggle = false;
        $("#spoon-message-container").addClass("blur");
    }
});

$('#buster-message-toggle').change(function() {
    if (buster_message_toggle === false) {
        buster_message_toggle = true;
        $("#buster-message-container").removeClass("blur");
    } else {
        buster_message_toggle = false;
        $("#buster-message-container").addClass("blur");
    }
});

$('#speech-toggle').change(function() {
    if (speech_toggle === false) {
        speech_toggle = true;
    } else {
        speech_toggle = false;
    }
});

// hover
$("#user-data-add-btn").hover(
    function(){
        $(this).children("img").attr("src", "./pics/user-data-add-icon-hover.png");
    },
    function() {
        $(this).children("img").attr("src", "./pics/user-data-add-icon.png");
    }
);
$("#user-data-page-navigation-back-icon").hover(
    function(){
        $(this).children("img").attr("src", "./pics/user-data-page-navigation-back-icon-hover.png");
    },
    function() {
        $(this).children("img").attr("src", "./pics/user-data-page-navigation-back-icon.png");
    }
);
$("#user-data-page-navigation-front-icon").hover(
    function(){
        $(this).children("img").attr("src", "./pics/user-data-page-navigation-front-icon-hover.png");
    },
    function() {
        $(this).children("img").attr("src", "./pics/user-data-page-navigation-front-icon.png");
    }
);
$(".action-edit-icon-div").hover(
    function() {
        $(this).children("img").attr("src", "./pics/user-data-main-edit-icon-hover.png");
    },
    function() {
        $(this).children("img").attr("src", "./pics/user-data-main-edit-icon.png");
    }
);
$(".action-delete-icon-div").hover(
    function() {
        $(this).children("img").attr("src", "./pics/user-data-main-delete-icon-hover.png");
    },
    function() {
        $(this).children("img").attr("src", "./pics/user-data-main-delete-icon.png");
    }
);
$(".action-check-icon-div").hover(
    function() {
        $(this).children("img").attr("src", "./pics/user-data-main-check-icon-hover.png");
    },
    function() {
        $(this).children("img").attr("src", "./pics/user-data-main-check-icon.png");
    }
);
$(".action-cancel-icon-div").hover(
    function() {
        $(this).children("img").attr("src", "./pics/user-data-main-cancel-icon-hover.png");
    },
    function() {
        $(this).children("img").attr("src", "./pics/user-data-main-cancel-icon.png");
    }
);
$(".action-edicheck-icon-div").hover(
    function() {
        $(this).children("img").attr("src", "./pics/user-data-main-check-icon-hover.png");
    },
    function() {
        $(this).children("img").attr("src", "./pics/user-data-main-check-icon.png");
    }
);
$(".action-edicancel-icon-div").hover(
    function() {
        $(this).children("img").attr("src", "./pics/user-data-main-cancel-icon-hover.png");
    },
    function() {
        $(this).children("img").attr("src", "./pics/user-data-main-cancel-icon.png");
    }
);
$(".action-delcheck-icon-div").hover(
    function() {
        $(this).children("img").attr("src", "./pics/user-data-main-check-icon-hover.png");
    },
    function() {
        $(this).children("img").attr("src", "./pics/user-data-main-check-icon.png");
    }
);
$(".action-delcancel-icon-div").hover(
    function() {
        $(this).children("img").attr("src", "./pics/user-data-main-cancel-icon-hover.png");
    },
    function() {
        $(this).children("img").attr("src", "./pics/user-data-main-cancel-icon.png");
    }
);

// ===== Input =====
try {
    $("#fix-color-input").val(SD_settings.color);
    $("#fix-color-input").css("color", SD_settings.color);
} catch {
    $("#fix-color-input").val("#ffffff");
    $("#fix-color-input").css("color", "#ffffff");
}

// ===== Color Picker =====
$('md-color-picker').on('change', function(e){
    color = e.detail[0];
    $(this).val(color);
    $(".color-sample").val(color);
    $(".color-sample").css("color", color);
});

// save last clicked input
$(".color-picker").click(function() {
    last_clicked_color_input = $(this);
});

$(".table-font-size-input").click(function() {
    last_clicked_font_size_input = $(this);
});
$(".table-speed-input").click(function() {
    last_clicked_speed_input = $(this);
});

// Slider
// font-size
// init
$("#fix-font-size-slider").val(SD_settings.font_size);
document.getElementById("fix-font-size-slider").style.background = 'linear-gradient(to right, #962500 0%, #962500 ' + SD_settings.font_size + '%, rgb(27,28,31) ' + SD_settings.font_size + '%, rgb(27,28,31) 100%)';
if (SD_settings.font_size === "0") {
    document.getElementById("fix-font-size-value").innerHTML = "オフ";
} else {
    document.getElementById("fix-font-size-value").innerHTML = SD_settings.font_size;
}
// when slider changed
document.getElementById("fix-font-size-slider").oninput = function() {
    this.style.background = 'linear-gradient(to right, #962500 0%, #962500 ' + this.value + '%, rgb(27,28,31) ' + this.value + '%, rgb(27,28,31) 100%)';
    if (this.value === "0") {
        document.getElementById("fix-font-size-value").innerHTML = "オフ";
    } else {
        document.getElementById("fix-font-size-value").innerHTML = this.value;
    }
};

// when modal-slider changed
document.getElementById("table-font-size-slider").oninput = function() {
    this.style.background = 'linear-gradient(to right, #962500 0%, #962500 ' + this.value + '%, rgb(27,28,31) ' + this.value + '%, rgb(27,28,31) 100%)';
    if (this.value === "0") {
        document.getElementById("table-font-size-value").innerHTML = "オフ";
    } else {
        document.getElementById("table-font-size-value").innerHTML = this.value;
    }
};

// speed
// init
$("#fix-speed-slider").val(SD_settings.speed);
document.getElementById("fix-speed-slider").style.background = 'linear-gradient(to right, #962500 0%, #962500 ' + String(Number(SD_settings.speed)*10) + '%, rgb(27,28,31) ' + String(Number(SD_settings.speed)*10) + '%, rgb(27,28,31) 100%)';
if (SD_settings.speed === "0") {
    document.getElementById("fix-speed-value").innerHTML = "オフ";    
} else {
    document.getElementById("fix-speed-value").innerHTML = SD_settings.speed;
}
// when slider changed
document.getElementById("fix-speed-slider").oninput = function() {
    this.style.background = 'linear-gradient(to right, #962500 0%, #962500 ' + String(Number(this.value)*10) + '%, rgb(27,28,31) ' + String(Number(this.value)*10) + '%, rgb(27,28,31) 100%)';
    if (this.value === "0") {
        document.getElementById("fix-speed-value").innerHTML = "オフ";
    } else {
        document.getElementById("fix-speed-value").innerHTML = this.value;
    }
};

// when modal-slider changed
document.getElementById("table-speed-slider").oninput = function() {
    this.style.background = 'linear-gradient(to right, #962500 0%, #962500 ' + String(Number(this.value)*10) + '%, rgb(27,28,31) ' + String(Number(this.value)*10) + '%, rgb(27,28,31) 100%)';
    if (this.value === "0") {
        document.getElementById("table-speed-value").innerHTML = "オフ";
    } else {
        document.getElementById("table-speed-value").innerHTML = this.value;
    }
};

// heart
// init
$("#heart-slider").val(SD_settings.heart_num);
document.getElementById("heart-slider").style.background = 'linear-gradient(to right, #962500 0%, #962500 ' + String(Number(SD_settings.heart_num)*25) + '%, rgb(27,28,31) ' + String(Number(SD_settings.heart_num)*25) + '%, rgb(27,28,31) 100%)';
if (SD_settings.heart_num === "0") {
    document.getElementById("heart-value").innerHTML = "オフ";
} else if (SD_settings.heart_num === "1") {
    document.getElementById("heart-value").innerHTML = "低";
} else if (SD_settings.heart_num === "2") {
    document.getElementById("heart-value").innerHTML = "中";
} else if (SD_settings.heart_num === "3") {
    document.getElementById("heart-value").innerHTML = "高";
} else if (SD_settings.heart_num === "4") {
    document.getElementById("heart-value").innerHTML = "最高";
} else {

}
// when heart-slider changed
document.getElementById("heart-slider").oninput = function() {
    this.style.background = 'linear-gradient(to right, #962500 0%, #962500 ' + String(Number(this.value)*25) + '%, rgb(27,28,31) ' + String(Number(this.value)*25) + '%, rgb(27,28,31) 100%)';
    if (this.value === "0") {
        document.getElementById("heart-value").innerHTML = "オフ";
    } else if (this.value === "1") {
        document.getElementById("heart-value").innerHTML = "低";
    } else if (this.value === "2") {
        document.getElementById("heart-value").innerHTML = "中";
    } else if (this.value === "3") {
        document.getElementById("heart-value").innerHTML = "高";
    } else if (this.value === "4") {
        document.getElementById("heart-value").innerHTML = "最高";
    } else {

    }
};

// present
// init
$("#present-slider").val(SD_settings.present_num);
document.getElementById("present-slider").style.background = 'linear-gradient(to right, #962500 0%, #962500 ' + String(Number(SD_settings.present_num)*25) + '%, rgb(27,28,31) ' + String(Number(SD_settings.present_num)*25) + '%, rgb(27,28,31) 100%)';
if (SD_settings.present_num === "0") {
    document.getElementById("present-value").innerHTML = "オフ";
} else if (SD_settings.present_num === "1") {
    document.getElementById("present-value").innerHTML = "低";
} else if (SD_settings.present_num === "2") {
    document.getElementById("present-value").innerHTML = "中";
} else if (SD_settings.present_num === "3") {
    document.getElementById("present-value").innerHTML = "高";
} else if (SD_settings.present_num === "4") {
    document.getElementById("present-value").innerHTML = "最高";
} else {

}
// when present slider changed
document.getElementById("present-slider").oninput = function() {
    this.style.background = 'linear-gradient(to right, #962500 0%, #962500 ' + String(Number(this.value)*25) + '%, rgb(27,28,31) ' + String(Number(this.value)*25) + '%, rgb(27,28,31) 100%)';
    if (this.value === "0") {
        document.getElementById("present-value").innerHTML = "オフ";
    } else if (this.value === "1") {
        document.getElementById("present-value").innerHTML = "低";
    } else if (this.value === "2") {
        document.getElementById("present-value").innerHTML = "中";
    } else if (this.value === "3") {
        document.getElementById("present-value").innerHTML = "高";
    } else if (this.value === "4") {
        document.getElementById("present-value").innerHTML = "最高";
    } else {

    }
};

// layer
// init
$("#layer-slider").val(SD_settings.max_layer);
document.getElementById("layer-slider").style.background = 'linear-gradient(to right, #962500 0%, #962500 ' + String(Number(SD_settings.max_layer)*10) + '%, rgb(27,28,31) ' + String(Number(SD_settings.max_layer)*10) + '%, rgb(27,28,31) 100%)';
if (SD_settings.max_layer === "0") {
    document.getElementById("layer-value").innerHTML = "オフ";
} else {
    document.getElementById("layer-value").innerHTML = SD_settings.max_layer;
}
// when layer slider changed
document.getElementById("layer-slider").oninput = function() {
    this.style.background = 'linear-gradient(to right, #962500 0%, #962500 ' + String(Number(this.value)*10) + '%, rgb(27,28,31) ' + String(Number(this.value)*10) + '%, rgb(27,28,31) 100%)';
    if (this.value === "0") {
        document.getElementById("layer-value").innerHTML = "オフ";
    } else {
        document.getElementById("layer-value").innerHTML = this.value;
    }
};

// Modal
// call color-picker modal
color_popup = document.getElementById('color-popup');
$(".color-picker").click(function() {
    color_popup.classList.toggle('is-show');
    color = $(this).val();
    $("md-color-picker").val(color);
    $(".color-sample").val(color);
    $(".color-sample").css("color", color);
});
$(".color-modal-cancel-btn").click(function() {
    color_popup.classList.toggle('is-show');
});
$(".color-modal-ok-btn").click(function() {
    color_popup.classList.toggle('is-show');
    color = $(".color-sample").val();
    last_clicked_color_input.val(color);
    if (color == "#ffffff") {
        last_clicked_color_input.css("color", "#dddddd");    
    } else {
        last_clicked_color_input.css("color", color);
    }
});
// call font-size-slider modal
font_size_popup = document.getElementById('font-size-popup');
$(".table-font-size-input").click(function() {
    font_size_popup.classList.toggle('is-show');
    font_size = $(this).val();
    if (font_size === "") {
        font_size = "50";
    } else if (font_size === "オフ") {
        font_size = "0";
    }
    $("#table-font-size-slider").val(font_size);
    // init
    document.getElementById("table-font-size-slider").style.background = 'linear-gradient(to right, #962500 0%, #962500 ' + font_size + '%, rgb(27,28,31) ' + font_size + '%, rgb(27,28,31) 100%)';
    if (font_size === "0") {
        document.getElementById("table-font-size-value").innerHTML = "オフ";    
    } else {
        document.getElementById("table-font-size-value").innerHTML = font_size;
    }
});
$(".font-size-modal-cancel-btn").click(function() {
    font_size_popup.classList.toggle('is-show');
});
$(".font-size-modal-ok-btn").click(function() {
    font_size_popup.classList.toggle('is-show');
    font_size = $("#table-font-size-value").html();
    last_clicked_font_size_input.val(font_size);
});
// call speed-slider modal
speed_popup = document.getElementById('speed-popup');
$(".table-speed-input").click(function() {
    speed_popup.classList.toggle('is-show');
    speed = $(this).val();
    if (speed === "") {
        speed = "5";
    } else if (speed === "オフ") {
        speed = "0";
    }
    $("#table-speed-slider").val(speed);
    // init
    document.getElementById("table-speed-slider").style.background = 'linear-gradient(to right, #962500 0%, #962500 ' + speed*10 + '%, rgb(27,28,31) ' + speed*10 + '%, rgb(27,28,31) 100%)';
    if (speed === "0") {
        document.getElementById("table-speed-value").innerHTML = "オフ";    
    } else {
        document.getElementById("table-speed-value").innerHTML = speed;
    }
});
$(".speed-modal-cancel-btn").click(function() {
    speed_popup.classList.toggle('is-show');
});
$(".speed-modal-ok-btn").click(function() {
    speed_popup.classList.toggle('is-show');
    speed = $("#table-speed-value").html();
    last_clicked_speed_input.val(speed);
});
// close-with-change
close_with_change_popup = document.getElementById('close-with-change-popup');
$("#close-with-change-btn").click(function() {
    close_with_change_popup.classList.toggle('is-show');
});
$(".close-with-change-yes-modal-close-btn").click(function() {
    close_with_change_popup.classList.toggle('is-show');
    closeWithChange();

});
$(".close-with-change-no-modal-close-btn").click(function() {
    close_with_change_popup.classList.toggle('is-show');
});
// close-without-change
close_without_change_popup = document.getElementById('close-without-change-popup');
$("#close-without-change-btn").click(function() {
    close_without_change_popup.classList.toggle('is-show');
});
$(".close-without-change-yes-modal-close-btn").click(function() {
    close_without_change_popup.classList.toggle('is-show');
    closeWithoutChange();
});
$(".close-without-change-no-modal-close-btn").click(function() {
    close_without_change_popup.classList.toggle('is-show');
});

// textarea
if ($("#heart-message-textarea").outerHeight() > this.scrollHeight){
    $("#heart-message-textarea").height(1);
}
while ($("#heart-message-textarea").outerHeight() < this.scrollHeight){
    $("#heart-message-textarea").height($("#heart-message-textarea").height() + 1);
}

if ($("#spoon-message-textarea").outerHeight() > this.scrollHeight){
    $("#spoon-message-textarea").height(1);
}
while ($("#spoon-message-textarea").outerHeight() < this.scrollHeight){
    $("#spoon-message-textarea").height($("#spoon-message-textarea").height() + 1);
}

if ($("#buster-message-textarea").outerHeight() > this.scrollHeight){
    $("#buster-message-textarea").height(1);
}
while ($("#buster-message-textarea").outerHeight() < this.scrollHeight){
    $("#buster-message-textarea").height($("#buster-message-textarea").height() + 1);
}

$("textarea").on('change keyup keydown paste cut', function(){
    if ($(this).outerHeight() > this.scrollHeight){
        $(this).height(1);
    }
    while ($(this).outerHeight() < this.scrollHeight){
        $(this).height($(this).height() + 1);
    }
});

$("#heart-message-textarea").val(SD_settings.heart_message);
$("#spoon-message-textarea").val(SD_settings.spoon_message);
$("#buster-message-textarea").val(SD_settings.buster_message);
$("#heart-message-textarea").trigger("change");
$("#spoon-message-textarea").trigger("change");
$("#buster-message-textarea").trigger("change");

$('textarea').focusin(function() {
    $(this).animate({
        borderTopColor: "#FF4100",
        borderBottomColor: "#FF4100"
    }, 300);
});

$('textarea').focusout(function() {
    $(this).animate({
        borderTopColor: "rgb(27,28,31)",
        borderBottomColor: "rgb(27,28,31)"
    }, 300);
});

// table
authors_list = SD_settings.authors_list;
function initRows() {
    for(var i = 1; i <= 5; i++) {
        $(`#name-${i} input`).val("");
        $(`#color-${i} input`).val("");
        $(`#font-size-${i} input`).val("");
        $(`#speed-${i} input`).val("");
        $(`#index-${i}`).html("");
        $(`#data-row-${i}`).css("visibility", "hidden");
        $(`#data-row-${i} td`).css("visibility", "hidden");
    };
};
function propRows(row_num, auth) {
    $(`#name-${row_num} input`).val(auth.name);
    $(`#color-${row_num} input`).val(auth.color);
    if (auth.font_size == "0") {
        $(`#font-size-${row_num} input`).val("オフ");
    } else {
        $(`#font-size-${row_num} input`).val(auth.font_size);
    }
    if (auth.speed == "0") {
        $(`#speed-${row_num} input`).val("オフ");
    } else {
        $(`#speed-${row_num} input`).val(auth.speed);
    }
    $(`#index-${row_num}`).html(auth.index);
    $(`#data-row-${row_num}`).css("visibility", "");
    $(`#data-row-${row_num} td`).css("visibility", "");
    $(`#name-${row_num} input`).css('pointer-events', 'none');
    $(`#color-${row_num} input`).css('pointer-events', 'none');
    $(`#font-size-${row_num} input`).css('pointer-events', 'none');
    $(`#speed-${row_num} input`).css('pointer-events', 'none');
    if (auth.color == "#ffffff") {
        $(`#color-${row_num} input`).css('color', "#dddddd");
    } else {
        $(`#color-${row_num} input`).css('color', `${$(`#color-${row_num} input`).val()}`);
    }
};
function addBlur(row_num) {
    $('tr').not(`#data-row-${row_num}`).not("#table-header").css('filter', 'blur(3px)');
    $('tr').not(`#data-row-${row_num}`).not("#table-header").css('pointer-events', 'none');
    $('#user-data-header').css('filter', 'blur(3px)');
    $('#user-data-header').css('pointer-events', 'none');
    $('#user-data-footer').css('filter', 'blur(3px)');
    $('#user-data-footer').css('pointer-events', 'none');
};
function removeBlur(row_num) {
    $('tr').not(`#data-row-${row_num}`).not("#table-header").css('filter', '');
    $('tr').not(`#data-row-${row_num}`).not("#table-header").css('pointer-events', '');
    $('#user-data-header').css('filter', '');
    $('#user-data-header').css('pointer-events', '');
    $('#user-data-footer').css('filter', '');
    $('#user-data-footer').css('pointer-events', '');
};
function toggleActions(row_num, show_list, hide_list) {
    show_list.some(function(show){
        $(`#actions-${row_num} .action-${show}-icon-div`).show();
    });
    hide_list.some(function(hide){
        $(`#actions-${row_num} .action-${hide}-icon-div`).hide();
    });
};
function addReadOnly(row_num, type) {
    if (type === 1) {
        $(`#name-${row_num} input`).prop("readonly", true);
        $(`#color-${row_num} input`).prop("readonly", true);
        $(`#font-size-${row_num} input`).prop("readonly", true);
        $(`#speed-${row_num} input`).prop("readonly", true);
        $(`#name-${row_num} input`).css('pointer-events', 'none');
        $(`#color-${row_num} input`).css('pointer-events', 'none');
        $(`#font-size-${row_num} input`).css('pointer-events', 'none');
        $(`#speed-${row_num} input`).css('pointer-events', 'none');
        if ($(`#color-${row_num} input`).val() == "#ffffff") {
            $(`#color-${row_num} input`).css('color', "#dddddd");    
        } else {
            $(`#color-${row_num} input`).css('color', `${$(`#color-${row_num} input`).val()}`);
        }
    } else if (type === 2) {
        $(`#name-${row_num} input`).prop("readonly", true);
        $(`#color-${row_num} input`).prop("readonly", true);
        $(`#font-size-${row_num} input`).prop("readonly", true);
        $(`#speed-${row_num} input`).prop("readonly", true);
        $(`#data-row-${row_num}`).css("visibility", "");
        $(`#data-row-${row_num} td`).css("visibility", "");
        $(`#name-${row_num} input`).css('pointer-events', 'none');
        $(`#color-${row_num} input`).css('pointer-events', 'none');
        $(`#font-size-${row_num} input`).css('pointer-events', 'none');
        $(`#speed-${row_num} input`).css('pointer-events', 'none');
        $(`#color-${row_num} input`).css('color', `${$(`#color-${row_num} input`).val()}`);
    } else if (type === 3) {
        $(`#name-${row_num} input`).prop("readonly", true);
        $(`#color-${row_num} input`).prop("readonly", true);
        $(`#font-size-${row_num} input`).prop("readonly", true);
        $(`#speed-${row_num} input`).prop("readonly", true);
        $(`#data-row-${row_num}`).css("visibility", "hidden");
        $(`#data-row-${row_num} td`).css("visibility", "hidden");
        $(`#name-${row_num} input`).css('pointer-events', 'none');
        $(`#color-${row_num} input`).css('pointer-events', 'none');
        $(`#font-size-${row_num} input`).css('pointer-events', 'none');
        $(`#speed-${row_num} input`).css('pointer-events', 'none');
        $(`#color-${row_num} input`).css('color', `${$(`#color-${row_num} input`).val()}`);
    } else if (type === 4) {
        $(`#name-${row_num} input`).prop("readonly", true);
        $(`#color-${row_num} input`).prop("readonly", true);
        $(`#font-size-${row_num} input`).prop("readonly", true);
        $(`#speed-${row_num} input`).prop("readonly", true);
    } else {

    }
};
function removeReadOnly(row_num, type) {
    if (type === 1) {
        $(`#name-${row_num} input`).prop("readonly", false);
        $(`#color-${row_num} input`).prop("readonly", false);
        $(`#font-size-${row_num} input`).prop("readonly", false);
        $(`#speed-${row_num} input`).prop("readonly", false);
        $(`#data-row-${row_num}`).css("visibility", "");
        $(`#data-row-${row_num} td`).css("visibility", "");
        $(`#name-${row_num} input`).css('pointer-events', '');
        $(`#color-${row_num} input`).css('pointer-events', '');
        $(`#font-size-${row_num} input`).css('pointer-events', '');
        $(`#speed-${row_num} input`).css('pointer-events', '');
    } else if (type === 2) {
        $(`#name-${row_num} input`).prop("readonly", false);
        $(`#color-${row_num} input`).prop("readonly", false);
        $(`#font-size-${row_num} input`).prop("readonly", false);
        $(`#speed-${row_num} input`).prop("readonly", false);
        $(`#name-${row_num} input`).css('pointer-events', '');
        $(`#color-${row_num} input`).css('pointer-events', '');
        $(`#font-size-${row_num} input`).css('pointer-events', '');
        $(`#speed-${row_num} input`).css('pointer-events', '');
        if ($(`#color-${row_num} input`).val() == "#ffffff") {
            $(`#color-${row_num} input`).css('color', "#dddddd");
        } else {
            $(`#color-${row_num} input`).css('color', `${$(`#color-${row_num} input`).val()}`);
        }
    }
};
function toggleConfirm(row_num, type) {
    if (type === "show") {
        $(`#name-${row_num}`).hide();
        $(`#color-${row_num}`).hide();
        $(`#font-size-${row_num}`).hide();
        $(`#speed-${row_num}`).hide();
        $(`#index-${row_num}`).hide();
        $(`#del-confirm-${row_num}`).show();
    } else if (type === "hide") {
        $(`#name-${row_num}`).show();
        $(`#color-${row_num}`).show();
        $(`#font-size-${row_num}`).show();
        $(`#speed-${row_num}`).show();
        $(`#index-${row_num}`).hide();
        $(`#del-confirm-${row_num}`).hide();
    }
};
// first-draw
total_page_num = Math.ceil(authors_list.length / 5);
page_num = 1;
row_num = 1;
input_count = 1;
$("#user-data-page-navigation-page-num").html(`${page_num} of ${total_page_num}`);
initRows();
authors_list.some(function(auth){
    total_page_num = Math.ceil(authors_list.length / 5);
    if ((page_num-1)*5 < input_count && page_num*5 >= input_count) {
        propRows(row_num, auth);
        row_num += 1;
    }
    input_count += 1;
});

// page-navi-back
$("#user-data-page-navigation-back-icon").click(function() {
    total_page_num = Math.ceil(authors_list.length / 5);
    if (page_num >= 2) {
        page_num -= 1;
        row_num = 1;
        input_count = 1;
        $("#user-data-page-navigation-page-num").html(`${page_num} of ${total_page_num}`);
        initRows();
        authors_list.some(function(auth){
            if ((page_num-1)*5 < input_count && page_num*5 >= input_count) {
                propRows(row_num, auth);
                row_num += 1;
            }
            input_count += 1;
        });
    }
});
// page-navi-front
$("#user-data-page-navigation-front-icon").click(function() {
    total_page_num = Math.ceil(authors_list.length / 5);
    if (page_num < total_page_num) {
        page_num += 1;
        row_num = 1;
        input_count = 1;
        $("#user-data-page-navigation-page-num").html(`${page_num} of ${total_page_num}`);
        initRows();
        authors_list.some(function(auth){
            if ((page_num-1)*5 < input_count && page_num*5 >= input_count) {
                propRows(row_num, auth);
                row_num += 1;
            }
            input_count += 1;
        });
    }
});

// add
$("#user-data-add-btn").click(function() {
    total_page_num = Math.ceil(authors_list.length / 5);
    if (authors_list.length % 5 != 0) {
        page_num = total_page_num;
    } else {
        page_num = total_page_num += 1;
    }
    row_num = 1;
    input_count = 1;
    $("#user-data-page-navigation-page-num").html(`${page_num} of ${total_page_num}`);
    initRows();
    authors_list.some(function(auth){
        if ((page_num-1)*5 < input_count && page_num*5 >= input_count) {
            propRows(row_num, auth);
            row_num += 1;
        }
        input_count += 1;
    });
    // display add-row
    removeReadOnly(row_num, 1);
    // blur exclude the row
    addBlur(row_num);
    // toggle
    toggleActions(row_num, ["check", "cancel"], ["edit", "delete", "edicheck", "edicancel", "delcheck", "delcancel"]);
});

// add-check
$(".action-check-icon-div").click(function() {
    row_num= $(this).children("img").attr("id").replace("table-check-icon-", "");
    if ($(`#name-${row_num} input`).val() == "") {
        $(`#name-${row_num} input`).val("名無しさん");
    }
    if ($(`#color-${row_num} input`).val() == "") {
        $(`#color-${row_num} input`).val("#ffffff");
    }
    if ($(`#font-size-${row_num} input`).val() == "") {
        $(`#font-size-${row_num} input`).val("50");
    }
    if ($(`#speed-${row_num} input`).val() == "") {
        $(`#speed-${row_num} input`).val("5");
    }
    // toggle
    toggleActions(row_num, ["edit", "delete"], ["check", "cancel", "edicheck", "edicancel", "delcheck", "delcancel"]);
    // delete blur
    removeBlur(row_num);
    // add readonly
    addReadOnly(row_num, 2);
    // add-process
    inputted_name = $(`#name-${row_num} input`).val();
    inputted_color = $(`#color-${row_num} input`).val();
    inputted_font_size = $(`#font-size-${row_num} input`).val();
    inputted_speed = $(`#speed-${row_num} input`).val();
    try {
        generated_index = String(Number(authors_list[authors_list.length - 1].index)+1);
    } catch {
        generated_index = "1";
    }
    authors_list.push({"index":generated_index,"name":inputted_name,"color":inputted_color,"font_size":inputted_font_size,"speed":inputted_speed});
    // page-navigation
    total_page_num = Math.ceil(authors_list.length / 5);
    if (authors_list.length % 5 != 0) {
        page_num = total_page_num;
    } else {
        page_num = total_page_num += 1;
    }
    row_num = 1;
    input_count = 1;
    $("#user-data-page-navigation-page-num").html(`${page_num} of ${total_page_num}`);
    initRows();
    authors_list.some(function(auth){
        if ((page_num-1)*5 < input_count && page_num*5 >= input_count) {
            propRows(row_num, auth);
            row_num += 1;
        }
        input_count += 1;
    });
});

// add-cancel
$(".action-cancel-icon-div").click(function() {
    row_num= $(this).children("img").attr("id").replace("table-cancel-icon-", "");
    // toggle
    toggleActions(row_num, ["edit", "delete"], ["check", "cancel", "edicheck", "edicancel", "delcheck", "delcancel"]);
    // delete blur
    removeBlur(row_num);
    // add readonly
    addReadOnly(row_num, 3);
});

// edit
edit_ctrl_z = {};
$(".action-edit-icon-div").click(function() {
    row_num= $(this).children("img").attr("id").replace("table-edit-icon-", "");
    // save components in case of canceling
    inputted_name = $(`#name-${row_num} input`).val();
    inputted_color = $(`#color-${row_num} input`).val();
    inputted_font_size = $(`#font-size-${row_num} input`).val();
    inputted_speed = $(`#speed-${row_num} input`).val();
    generated_index = $(`#index-${row_num}`).html();
    edit_ctrl_z = {name:inputted_name,color:inputted_color,font_size:inputted_font_size,speed:inputted_speed,index:generated_index};
    // toggle
    toggleActions(row_num, ["edicheck", "edicancel"], ["edit", "delete", "check", "cancel", "delcheck", "delcancel"]);
    // delete readonly
    removeReadOnly(row_num, 2);
    // blur exclude the row
    addBlur(row_num);
});

$(".action-edicheck-icon-div").click(function() {
    row_num= $(this).children("img").attr("id").replace("table-edicheck-icon-", "");
    // toggle
    toggleActions(row_num, ["edit", "delete"], ["check", "cancel", "edicheck", "edicancel", "delcheck", "delcancel"]);
    // readonly
    addReadOnly(row_num, 1);
    // delete blur
    removeBlur(row_num);
    // add-process
    inputted_name = $(`#name-${row_num} input`).val();
    inputted_color = $(`#color-${row_num} input`).val();
    inputted_font_size = $(`#font-size-${row_num} input`).val();
    inputted_speed = $(`#speed-${row_num} input`).val();
    generated_index = $(`#index-${row_num}`).html();
    authors_list_new = [];
    authors_list.some(function(auth){
        if (auth.index == generated_index) {
            authors_list_new.push({"index":generated_index,"name":inputted_name,"color":inputted_color,"font_size":inputted_font_size,"speed":inputted_speed});
        } else {
            authors_list_new.push({"index":auth.index,"name":auth.name,"color":auth.color,"font_size":auth.font_size,"speed":auth.speed});
        }
    });
    authors_list = authors_list_new;
});

$(".action-edicancel-icon-div").click(function() {
    row_num= $(this).children("img").attr("id").replace("table-edicancel-icon-", "");
    // restore saved components
    $(`#name-${row_num} input`).val(edit_ctrl_z.name);
    $(`#color-${row_num} input`).val(edit_ctrl_z.color);
    $(`#font-size-${row_num} input`).val(edit_ctrl_z.font_size);
    $(`#speed-${row_num} input`).val(edit_ctrl_z.speed);
    $(`#index-${row_num}`).html(edit_ctrl_z.index);
    edit_ctrl_z = {};
    // toggle
    toggleActions(row_num, ["edit", "delete"], ["check", "cancel", "edicheck", "edicancel", "delcheck", "delcancel"]);
    // add readonly
    addReadOnly(row_num, 1);
    // delete blur
    removeBlur(row_num);
});

// delete
del_ctrl_z = null;
$(".action-delete-icon-div").click(function() {
    row_num= $(this).children("img").attr("id").replace("table-delete-icon-", "");
    $(`#data-row-${row_num}`).append(`<td colspan="4" class="del-confirm-td" id="del-confirm-${row_num}">Are you sure you want to delete this row?</td>`);
    // toggle
    toggleActions(row_num, ["delcheck", "delcancel"], ["edit", "delete", "check", "cancel", "edicheck", "edicancel"]);
    // confirmation toggle
    toggleConfirm(row_num, "show");
    // blur exclude the row
    addBlur(row_num);
    // align
    $(".del-confirm-td").css("text-align", "center");
});

$(".action-delcheck-icon-div").click(function() {
    row_num= $(this).children("img").attr("id").replace("table-delcheck-icon-", "");
    // remove confirmation row
    $(`#del-confirm-${row_num}`).remove();
    // toggle
    toggleActions(row_num, ["edit", "delete"], ["check", "cancel", "edicheck", "edicancel", "delcheck", "delcancel"]);
    // confirmation toggle
    toggleConfirm(row_num, "hide");
    // readonly
    addReadOnly(row_num, 4);
    // remove blur
    removeBlur(row_num);
    // delete process
    inputted_name = $(`#name-${row_num} input`).val();
    inputted_color = $(`#color-${row_num} input`).val();
    inputted_font_size = $(`#font-size-${row_num} input`).val();
    inputted_speed = $(`#speed-${row_num} input`).val();
    generated_index = $(`#index-${row_num}`).html();
    authors_list_new = [];
    authors_list.some(function(auth){
        if (auth.index == generated_index) {
            // pass
        } else {
            authors_list_new.push({"index":auth.index,"name":auth.name,"color":auth.color,"font_size":auth.font_size,"speed":auth.speed});
        }
    });
    authors_list = authors_list_new;
    // econsole.log(authors_list);
    // redraw
    total_page_num = Math.ceil(authors_list.length / 5);
    row_num = 1;
    input_count = 1;
    $("#user-data-page-navigation-page-num").html(`${page_num} of ${total_page_num}`);
    initRows();
    authors_list.some(function(auth){
        if ((page_num-1)*5 < input_count && page_num*5 >= input_count) {
            propRows(row_num, auth);
            row_num += 1;
        }
        input_count += 1;
    });
    if (row_num === 1) {
        // re-redraw
        total_page_num = Math.ceil(authors_list.length / 5);
        page_num = 1
        row_num = 1;
        input_count = 1;
        $("#user-data-page-navigation-page-num").html(`${page_num} of ${total_page_num}`);
        initRows();
        authors_list.some(function(auth){
            if ((page_num-1)*5 < input_count && page_num*5 >= input_count) {
                propRows(row_num, auth);
                row_num += 1;
            }
            input_count += 1;
        });
    } else {
        // pass
    }
});

$(".action-delcancel-icon-div").click(function() {
    row_num= $(this).children("img").attr("id").replace("table-delcancel-icon-", "");
    // delete confirmation row
    $(`#del-confirm-${row_num}`).remove();
    // toggle
    toggleActions(row_num, ["edit", "delete"], ["check", "cancel", "edicheck", "edicancel", "delcheck", "delcancel"]);
    // confirmation toggle
    toggleConfirm(row_num, "hide");
    // readonly
    addReadOnly(row_num, 1);
    // remove blur
    removeBlur(row_num);
});

// ===== close function =====
function closeWithChange() {
    settings_type = settings_type_toggle;
    color = $("#fix-color-input").val();
    random_color = random_color_toggle;
    if ($("#fix-font-size-value").html() === "オフ") {
        font_size = "0";
    } else {
        font_size = $("#fix-font-size-value").html();
    }
    random_font_size = random_font_size_toggle;
    if ($("#fix-speed-value").html() === "オフ") {
        speed = "0";
    } else {
        speed = $("#fix-speed-value").html();
    }
    random_speed = random_speed_toggle;
    heart_num = $("#heart-value").html();
    present_num = $("#present-value").html();
    max_layer = $("#layer-value").html();
    send_heart_message = heart_message_toggle;
    send_spoon_message = spoon_message_toggle;
    send_buster_message = buster_message_toggle;
    heart_message = $("#heart-message-textarea").val();
    spoon_message = $("#spoon-message-textarea").val();
    buster_message = $("#buster-message-textarea").val();
    speechUse = speech_toggle;
    // authors_list
    authors_list_new = [];
    author_index = 1;
    authors_list.some(function(auth){
        if (auth.name == "") {
            // pass
        } else {
            if (auth.color == "") {
                auth.color = "#FFFFFF";
            }
            if (auth.font_size == "") {
                auth.font_size = "50";
            } else if (auth.font_size == "オフ") {
                auth.font_size = "0";
            }
            if (auth.speed == "") {
                auth.speed = "5";
            } else if (auth.speed == "オフ") {
                auth.speed = "0";
            }
            authors_list_new.push({index:author_index,name:auth.name,color:auth.color,font_size:auth.font_size,speed:auth.speed});
            author_index += 1;
        }
    });
    authors_list = authors_list_new;
    econsole.log(color, random_color, font_size, random_font_size, speed, random_speed, authors_list, heart_num, present_num, max_layer);
    // read & write json
    SD_settings = JSON.parse(fs.readFileSync(SD_settings_path, "utf8"));
    SD_settings.settings_type = settings_type;
    SD_settings.color = color;
    SD_settings.random_color = String(random_color);
    SD_settings.font_size = font_size;
    SD_settings.random_font_size = String(random_font_size);
    SD_settings.speed = speed;
    SD_settings.random_speed = String(random_speed);
    SD_settings.authors_list = authors_list;
    // heart_num
    if (heart_num === "オフ") {
        SD_settings.heart_num = "0";
    } else if (heart_num === "低") {
        SD_settings.heart_num = "1";
    } else if (heart_num === "中") {
        SD_settings.heart_num = "2";
    } else if (heart_num === "高") {
        SD_settings.heart_num = "3";
    } else if (heart_num === "最高") {
        SD_settings.heart_num = "4";
    } else {
        // pass
    }
    // present_num
    if (present_num === "オフ") {
        SD_settings.present_num = "0";
    } else if (present_num === "低") {
        SD_settings.present_num = "1";
    } else if (present_num === "中") {
        SD_settings.present_num = "2";
    } else if (present_num === "高") {
        SD_settings.present_num = "3";
    } else if (present_num === "最高") {
        SD_settings.present_num = "4";
    } else {
        // pass
    }
    if (max_layer === "オフ") {
        SD_settings.max_layer = "0";
    } else {
        SD_settings.max_layer = max_layer;
    }
    SD_settings.send_heart_message = String(send_heart_message);
    SD_settings.send_spoon_message = String(send_spoon_message);        
    SD_settings.send_buster_message = String(send_buster_message);
    SD_settings.speech = String(speechUse);
    SD_settings.heart_message = heart_message;
    SD_settings.spoon_message = spoon_message;
    SD_settings.buster_message = buster_message;
    // write
    fs.writeFileSync(SD_settings_path, JSON.stringify(SD_settings));
    // close-with-change
    ipcRenderer.send('close-settings-with-change', true);
};

function closeWithoutChange() {
    // close-without-change
    ipcRenderer.send('close-settings-without-change', true);
}