electron = require("electron");
remote = electron.remote;
econsole = remote.require("console");
edir = remote.app.getAppPath();
ipcRenderer = electron.ipcRenderer;
Store = require("electron-store");
fs = require("fs");
$ = jQuery = require(`${edir}\\jquery\\jquery-3.5.1.min.js`);
nico_settings_path = `${edir}\\nico_settings.json`;


try {
    nico_settings = JSON.parse(fs.readFileSync(nico_settings_path, 'utf8'));
} catch(error) {
    make_json = {"settings_type":"simple","color":"#ffffff","random_color":"true","font_size":"50","random_font_size":"true","speed":"1","speak":"false","show_image":"false","bot_url":"http://localhost:5569","heart_num":"2","present_num":"2","max_layer":"1","now_layer":"0","authors_list":[]};
    fs.writeFileSync(nico_settings_path, JSON.stringify(make_json));
    nico_settings = JSON.parse(fs.readFileSync(nico_settings_path, 'utf8'));
}

// ===== Toggle =====
if (nico_settings.settings_type === "simple") {
    settings_type_toggle = "simple";
    $(".advanced-settings").addClass("blur");
} else {
    settings_type_toggle = "advanced";
    $(".simple-settings").addClass("blur");
    $("#settings-type-toggle").prop('checked', true);
}
if (nico_settings.random_color === "false") {
    random_color_toggle = false;
} else {
    random_color_toggle = true;
    $(".simple-color-fix").addClass("blur");
    $("#random-color-toggle").prop('checked', true);
}
if (nico_settings.random_font_size === "false") {
    random_font_size_toggle = false;
    $(".simple-font-size-fix").removeClass("blur");
} else {
    random_font_size_toggle = true;
    $(".simple-font-size-fix").addClass("blur");
    $("#random-font-size-toggle").prop('checked', true);
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
    $("#fix-color-input").val(nico_settings.color);
    $("#fix-color-input").css("color", nico_settings.color);
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

// Slider
// font-size
// init
$("#fix-font-size-slider").val(nico_settings.font_size);
document.getElementById("fix-font-size-slider").style.background = 'linear-gradient(to right, #962500 0%, #962500 ' + nico_settings.font_size + '%, rgb(27,28,31) ' + nico_settings.font_size + '%, rgb(27,28,31) 100%)';
if (nico_settings.font_size === "0") {
    document.getElementById("fix-font-size-value").innerHTML = "オフ";    
} else {
    document.getElementById("fix-font-size-value").innerHTML = nico_settings.font_size;
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

// heart
// init
$("#heart-slider").val(nico_settings.heart_num);
document.getElementById("heart-slider").style.background = 'linear-gradient(to right, #962500 0%, #962500 ' + String(Number(nico_settings.heart_num)*25) + '%, rgb(27,28,31) ' + String(Number(nico_settings.heart_num)*25) + '%, rgb(27,28,31) 100%)';
if (nico_settings.heart_num === "0") {
    document.getElementById("heart-value").innerHTML = "オフ";
} else if (nico_settings.heart_num === "1") {
    document.getElementById("heart-value").innerHTML = "低";
} else if (nico_settings.heart_num === "2") {
    document.getElementById("heart-value").innerHTML = "中";
} else if (nico_settings.heart_num === "3") {
    document.getElementById("heart-value").innerHTML = "高";
} else if (nico_settings.heart_num === "4") {
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
$("#present-slider").val(nico_settings.present_num);
document.getElementById("present-slider").style.background = 'linear-gradient(to right, #962500 0%, #962500 ' + String(Number(nico_settings.present_num)*25) + '%, rgb(27,28,31) ' + String(Number(nico_settings.present_num)*25) + '%, rgb(27,28,31) 100%)';
if (nico_settings.present_num === "0") {
    document.getElementById("present-value").innerHTML = "オフ";
} else if (nico_settings.present_num === "1") {
    document.getElementById("present-value").innerHTML = "低";
} else if (nico_settings.present_num === "2") {
    document.getElementById("present-value").innerHTML = "中";
} else if (nico_settings.present_num === "3") {
    document.getElementById("present-value").innerHTML = "高";
} else if (nico_settings.present_num === "4") {
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
$("#layer-slider").val(nico_settings.max_layer);
document.getElementById("layer-slider").style.background = 'linear-gradient(to right, #962500 0%, #962500 ' + String(Number(nico_settings.max_layer)*10) + '%, rgb(27,28,31) ' + String(Number(nico_settings.max_layer)*10) + '%, rgb(27,28,31) 100%)';
if (nico_settings.max_layer === "0") {
    document.getElementById("layer-value").innerHTML = "オフ";
} else {
    document.getElementById("layer-value").innerHTML = nico_settings.max_layer;
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
    last_clicked_color_input.css("color", color);
});
// call modal-slider modal
font_size_popup = document.getElementById('font-size-popup');
$(".table-font-size-input").click(function() {
    font_size_popup.classList.toggle('is-show');
    font_size = $(this).val();
    if (font_size === "") {
        font_size = "50";
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

// table
authors_list = nico_settings.authors_list;
function initRows() {
    for(var i = 1; i <= 5; i++) {
        $(`#name-${i} input`).val("");
        $(`#color-${i} input`).val("");
        $(`#font-size-${i} input`).val("");
        $(`#index-${i}`).html("");
        $(`#data-row-${i}`).css("visibility", "hidden");
        $(`#data-row-${i} td`).css("visibility", "hidden");
    };
};
function propRows(row_num, auth) {
    $(`#name-${row_num} input`).val(auth.name);
    $(`#color-${row_num} input`).val(auth.color);
    $(`#font-size-${row_num} input`).val(auth.font_size);
    $(`#index-${row_num}`).html(auth.index);
    $(`#data-row-${row_num}`).css("visibility", "");
    $(`#data-row-${row_num} td`).css("visibility", "");
    $(`#name-${row_num} input`).css('pointer-events', 'none');
    $(`#color-${row_num} input`).css('pointer-events', 'none');
    $(`#font-size-${row_num} input`).css('pointer-events', 'none');
    $(`#color-${row_num} input`).css('color', `${$(`#color-${row_num} input`).val()}`);
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
        $(`#name-${row_num} input`).css('pointer-events', 'none');
        $(`#color-${row_num} input`).css('pointer-events', 'none');
        $(`#font-size-${row_num} input`).css('pointer-events', 'none');
        $(`#color-${row_num} input`).css('color', `${$(`#color-${row_num} input`).val()}`);
    } else if (type === 2) {
        $(`#name-${row_num} input`).prop("readonly", true);
        $(`#color-${row_num} input`).prop("readonly", true);
        $(`#font-size-${row_num} input`).prop("readonly", true);
        $(`#data-row-${row_num}`).css("visibility", "");
        $(`#data-row-${row_num} td`).css("visibility", "");
        $(`#name-${row_num} input`).css('pointer-events', 'none');
        $(`#color-${row_num} input`).css('pointer-events', 'none');
        $(`#font-size-${row_num} input`).css('pointer-events', 'none');
        $(`#color-${row_num} input`).css('color', `${$(`#color-${row_num} input`).val()}`);
    } else if (type === 3) {
        $(`#name-${row_num} input`).prop("readonly", true);
        $(`#color-${row_num} input`).prop("readonly", true);
        $(`#font-size-${row_num} input`).prop("readonly", true);
        $(`#data-row-${row_num}`).css("visibility", "hidden");
        $(`#data-row-${row_num} td`).css("visibility", "hidden");
        $(`#name-${row_num} input`).css('pointer-events', 'none');
        $(`#color-${row_num} input`).css('pointer-events', 'none');
        $(`#font-size-${row_num} input`).css('pointer-events', 'none');
        $(`#color-${row_num} input`).css('color', `${$(`#color-${row_num} input`).val()}`);
    } else if (type === 4) {
        $(`#name-${row_num} input`).prop("readonly", true);
        $(`#color-${row_num} input`).prop("readonly", true);
        $(`#font-size-${row_num} input`).prop("readonly", true);
    } else {

    }
};
function removeReadOnly(row_num, type) {
    if (type === 1) {
        $(`#name-${row_num} input`).prop("readonly", false);
        $(`#color-${row_num} input`).prop("readonly", false);
        $(`#font-size-${row_num} input`).prop("readonly", false);
        $(`#data-row-${row_num}`).css("visibility", "");
        $(`#data-row-${row_num} td`).css("visibility", "");
        $(`#name-${row_num} input`).css('pointer-events', '');
        $(`#color-${row_num} input`).css('pointer-events', '');
        $(`#font-size-${row_num} input`).css('pointer-events', '');
    } else if (type === 2) {
        $(`#name-${row_num} input`).prop("readonly", false);
        $(`#color-${row_num} input`).prop("readonly", false);
        $(`#font-size-${row_num} input`).prop("readonly", false);
        $(`#name-${row_num} input`).css('pointer-events', '');
        $(`#color-${row_num} input`).css('pointer-events', '');
        $(`#font-size-${row_num} input`).css('pointer-events', '');
        $(`#color-${row_num} input`).css('color', `${$(`#color-${row_num} input`).val()}`);
    }
};
function toggleConfirm(row_num, type) {
    if (type === "show") {
        $(`#name-${row_num}`).hide();
        $(`#color-${row_num}`).hide();
        $(`#font-size-${row_num}`).hide();
        $(`#index-${row_num}`).hide();
        $(`#del-confirm-${row_num}`).show();
    } else if (type === "hide") {
        $(`#name-${row_num}`).show();
        $(`#color-${row_num}`).show();
        $(`#font-size-${row_num}`).show();
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
    try {
        generated_index = String(Number(authors_list[authors_list.length - 1].index)+1);
    } catch {
        generated_index = "1";
    }
    authors_list.push({"index":generated_index,"name":inputted_name,"color":inputted_color,"font_size":inputted_font_size});
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
    generated_index = $(`#index-${row_num}`).html();
    edit_ctrl_z = {name:inputted_name,color:inputted_color,font_size:inputted_font_size,index:generated_index};
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
    generated_index = $(`#index-${row_num}`).html();
    authors_list_new = [];
    authors_list.some(function(auth){
        if (auth.index == generated_index) {
            authors_list_new.push({"index":generated_index,"name":inputted_name,"color":inputted_color,"font_size":inputted_font_size});
        } else {
            authors_list_new.push({"index":auth.index,"name":auth.name,"color":auth.color,"font_size":auth.font_size});
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
    $(`#data-row-${row_num}`).append(`<td colspan="3" class="del-confirm-td" id="del-confirm-${row_num}">Are you sure you want to delete this row?</td>`);
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
    generated_index = $(`#index-${row_num}`).html();
    authors_list_new = [];
    authors_list.some(function(auth){
        if (auth.index == generated_index) {
            // pass
        } else {
            authors_list_new.push({"index":auth.index,"name":auth.name,"color":auth.color,"font_size":auth.font_size});
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
    heart_num = $("#heart-value").html();
    present_num = $("#present-value").html();
    max_layer = $("#layer-value").html();
    // authors_list
    authors_list_new = [];
    author_index = 1;
    authors_list.some(function(auth){
        authors_list_new.push({index:author_index,name:auth.name,color:auth.color,font_size:auth.font_size});
        author_index += 1;
    });
    authors_list = authors_list_new;
    econsole.log(color, random_color, font_size, random_font_size, authors_list, heart_num, present_num, max_layer);
    // read & write json
    nico_settings = JSON.parse(fs.readFileSync(nico_settings_path, "utf8"));
    nico_settings.settings_type = settings_type;
    nico_settings.color = color;
    nico_settings.random_color = String(random_color);
    nico_settings.font_size = font_size;
    nico_settings.random_font_size = String(random_font_size);
    nico_settings.authors_list = authors_list;
    // heart_num
    if (heart_num === "オフ") {
        nico_settings.heart_num = "0";    
    } else if (heart_num === "低") {
        nico_settings.heart_num = "1";
    } else if (heart_num === "中") {
        nico_settings.heart_num = "2";
    } else if (heart_num === "高") {
        nico_settings.heart_num = "3";
    } else if (heart_num === "最高") {
        nico_settings.heart_num = "4";
    } else {
        // pass
    }
    // present_num
    if (present_num === "オフ") {
        nico_settings.present_num = "0";
    } else if (present_num === "低") {
        nico_settings.present_num = "1";
    } else if (present_num === "中") {
        nico_settings.present_num = "2";
    } else if (present_num === "高") {
        nico_settings.present_num = "3";
    } else if (present_num === "最高") {
        nico_settings.present_num = "4";
    } else {
        // pass
    }
    nico_settings.max_layer = max_layer;
    // write
    fs.writeFileSync(nico_settings_path, JSON.stringify(nico_settings));
    // close-with-change
    ipcRenderer.send('close-settings-with-change', true);
};

function closeWithoutChange() {
    // close-without-change
    ipcRenderer.send('close-settings-without-change', true);
}