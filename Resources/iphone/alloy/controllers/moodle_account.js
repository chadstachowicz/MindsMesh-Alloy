function Controller() {
    function redirectToWizard() {
        Titanium.App.Properties.setString("moodle-user-" + selectedId, ta1.value);
        Titanium.App.Properties.setString("moodle-pass-" + selectedId, ta2.value);
        if (false == Titanium.App.Properties.getString("moodle-wizard-run")) {
            var win1 = Titanium.UI.createWindow({
                title: " Select Classes",
                url: "moodle_add_classes.js",
                backgroundColor: "#ecfaff",
                navGroup: win.navGroup,
                layout: "absolute",
                barColor: "#46a546"
            });
            win.navGroup.open(win1, {
                animated: false
            });
        } else {
            alert("Your moodle credentials were good, enjoy!");
            ta1.blur();
            ta2.blur();
            null != win.class_id;
        }
        Titanium.App.Properties.setString("moodle-wizard-run", true);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "moodle_account";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.moodle_account = Ti.UI.createWindow({
        backgroundColor: "#FFF",
        id: "moodle_account",
        barColor: "#15B17A",
        navTintColor: "#ffffff",
        translucent: "false"
    });
    $.__views.moodle_account && $.addTopLevelView($.__views.moodle_account);
    $.__views.menuButton = Ti.UI.createButton({
        id: "menuButton",
        image: "/images/Paragraph-Justify.png",
        height: "30dp",
        width: "30dp",
        toggle: "false"
    });
    $.__views.moodle_account.leftNavButton = $.__views.menuButton;
    $.__views.finishButton = Ti.UI.createButton({
        title: "Verify",
        id: "finishButton",
        height: "30dp",
        width: "30dp"
    });
    $.__views.moodle_account.rightNavButton = $.__views.finishButton;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var win = $.moodle_account;
    Ti.App.myCurrentWindow = win;
    win.layout = "vertical";
    var data = [];
    var scrollView = Ti.UI.createScrollView({
        contentWidth: "auto",
        contentHeight: "auto",
        showVerticalScrollIndicator: true,
        showHorizontalScrollIndicator: true
    });
    var orLabel = Ti.UI.createLabel({
        text: "or",
        font: {
            fontSize: 16,
            fontWeight: "bold"
        },
        box: true,
        top: 240
    });
    if ("iphone" == Titanium.Platform.osname) {
        var flexSpace = Titanium.UI.createButton({
            systemButton: Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
        });
        var buttonObjects = [ {
            title: "Previous",
            enabled: false
        }, {
            title: "Next",
            enabled: true
        } ];
        var navButtons = Titanium.UI.createButtonBar({
            labels: buttonObjects,
            backgroundColor: "#000",
            top: 100,
            style: Titanium.UI.iPhone.SystemButtonStyle.BAR,
            height: 25,
            width: "auto"
        });
        navButtons.addEventListener("click", function(e) {
            if (1 == e.index) {
                if (true == ta1.hasFocus) {
                    ta2.hasFocus = true;
                    ta1.hasFocus = false;
                    ta2.focus();
                }
            } else if (0 == e.index && true == ta2.hasFocus) {
                ta2.hasFocus = false;
                ta1.hasFocus = true;
                ta1.focus();
            }
        });
        var label1 = Titanium.UI.createLabel({
            text: "Moodle Username",
            top: "80dp",
            height: 40,
            width: 320
        });
        var ta1 = Titanium.UI.createTextField({
            value: Titanium.App.Properties.getString("moodle-user-" + selectedId),
            hintText: "Moodle Username",
            top: "115dp",
            height: 40,
            width: 320,
            borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
            keyboardToolbar: [ navButtons, flexSpace ],
            keyboardToolbarHeight: 40
        });
        var flexSpace = Titanium.UI.createButton({
            systemButton: Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
        });
        var buttonObjects = [ {
            title: "Previous",
            enabled: true
        }, {
            title: "Next",
            enabled: true
        } ];
        var navButtons = Titanium.UI.createButtonBar({
            labels: buttonObjects,
            backgroundColor: "#000",
            top: 100,
            style: Titanium.UI.iPhone.SystemButtonStyle.BAR,
            height: 25,
            width: "auto"
        });
        navButtons.addEventListener("click", function(e) {
            if (0 == e.index) {
                if (true == ta2.hasFocus) {
                    ta2.hasFocus = false;
                    ta1.hasFocus = true;
                    ta1.focus();
                }
            } else if (1 == e.index && true == ta2.hasFocus) {
                ta3.hasFocus = true;
                ta2.hasFocus = false;
                ta3.focus();
            }
        });
        var label2 = Titanium.UI.createLabel({
            text: "Moodle Password",
            top: "153dp",
            height: 40,
            width: 320
        });
        var ta2 = Titanium.UI.createTextField({
            value: Titanium.App.Properties.getString("moodle-pass-" + selectedId),
            hintText: "Moodle Password",
            passwordMask: true,
            top: 188,
            height: 40,
            width: 320,
            borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
            keyboardToolbar: [ navButtons, flexSpace ],
            keyboardToolbarHeight: 40
        });
        var flexSpace = Titanium.UI.createButton({
            systemButton: Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
        });
        var buttonObjects = [ {
            title: "Previous",
            enabled: true
        }, {
            title: "Next",
            enabled: false
        } ];
        var navButtons = Titanium.UI.createButtonBar({
            labels: buttonObjects,
            backgroundColor: "#000",
            top: 100,
            style: Titanium.UI.iPhone.SystemButtonStyle.BAR,
            height: 25,
            width: "auto"
        });
        navButtons.addEventListener("click", function(e) {
            if (0 == e.index) {
                if (true == ta3.hasFocus) {
                    ta3.hasFocus = false;
                    ta2.hasFocus = true;
                    ta2.focus();
                }
            } else if (1 == e.index && true == ta2.hasFocus) {
                ta2.hasFocus = true;
                ta1.hasFocus = false;
                ta2.focus();
            }
        });
        var labelIcon = Titanium.UI.createImageView({
            image: "/images/question-mark-2.png",
            right: 24,
            top: 260,
            height: 32,
            width: 32
        });
        labelIcon.addEventListener("click", function() {
            alert("You can find your token by logging into Moodle and browsing to 'My profile Settings' -> 'Security keys' and typing in the key for 'Moodle mobile web service'");
        });
        var label3 = Titanium.UI.createLabel({
            text: "Moodle Token",
            top: "263dp",
            height: 40,
            width: 320
        });
        var ta3 = Titanium.UI.createTextField({
            value: Titanium.App.Properties.getString("moodle-token-" + selectedId),
            hintText: "Moodle Token",
            top: "203dp",
            height: 40,
            width: 320,
            borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
            keyboardToolbar: [ navButtons, flexSpace ],
            keyboardToolbarHeight: 40
        });
    } else {
        var flexSpace = Titanium.UI.createButton({
            systemButton: Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
        });
        var buttonObjects = [ {
            title: "Previous",
            enabled: false
        }, {
            title: "Next",
            enabled: true
        } ];
        var navButtons = Titanium.UI.createButtonBar({
            labels: buttonObjects,
            backgroundColor: "#000",
            top: 100,
            style: Titanium.UI.iPhone.SystemButtonStyle.BAR,
            height: 25,
            width: "auto"
        });
        navButtons.addEventListener("click", function(e) {
            if (1 == e.index) {
                if (true == ta1.hasFocus) {
                    ta2.hasFocus = true;
                    ta1.hasFocus = false;
                    ta2.focus();
                }
            } else if (0 == e.index && true == ta2.hasFocus) {
                ta2.hasFocus = false;
                ta1.hasFocus = true;
                ta1.focus();
            }
        });
        var label1 = Titanium.UI.createLabel({
            text: "Moodle Username",
            top: "70dp",
            height: 40,
            width: 320
        });
        var ta1 = Titanium.UI.createTextField({
            value: Titanium.App.Properties.getString("moodle-user-" + selectedId),
            hintText: "Moodle Username",
            top: "115dp",
            height: 40,
            width: 750,
            borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
            keyboardToolbar: [ navButtons, flexSpace ],
            keyboardToolbarHeight: 40
        });
        var flexSpace = Titanium.UI.createButton({
            systemButton: Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
        });
        var buttonObjects = [ {
            title: "Previous",
            enabled: true
        }, {
            title: "Next",
            enabled: true
        } ];
        var navButtons = Titanium.UI.createButtonBar({
            labels: buttonObjects,
            backgroundColor: "#000",
            top: 100,
            style: Titanium.UI.iPhone.SystemButtonStyle.BAR,
            height: 25,
            width: "auto"
        });
        navButtons.addEventListener("click", function(e) {
            if (0 == e.index) {
                if (true == ta2.hasFocus) {
                    ta2.hasFocus = false;
                    ta1.hasFocus = true;
                    ta1.focus();
                }
            } else if (1 == e.index && true == ta2.hasFocus) {
                ta3.hasFocus = true;
                ta2.hasFocus = false;
                ta3.focus();
            }
        });
        var label2 = Titanium.UI.createLabel({
            text: "Moodle Username",
            top: 155,
            height: 40,
            width: 320
        });
        var ta2 = Titanium.UI.createTextField({
            value: Titanium.App.Properties.getString("moodle-pass-" + selectedId),
            hintText: "Moodle Password",
            passwordMask: true,
            top: 205,
            height: 40,
            width: 750,
            borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
            keyboardToolbar: [ navButtons, flexSpace ],
            keyboardToolbarHeight: 40
        });
        var flexSpace = Titanium.UI.createButton({
            systemButton: Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
        });
        var buttonObjects = [ {
            title: "Previous",
            enabled: true
        }, {
            title: "Next",
            enabled: false
        } ];
        var navButtons = Titanium.UI.createButtonBar({
            labels: buttonObjects,
            backgroundColor: "#000",
            top: 100,
            style: Titanium.UI.iPhone.SystemButtonStyle.BAR,
            height: 25,
            width: "auto"
        });
        navButtons.addEventListener("click", function(e) {
            if (0 == e.index) {
                if (true == ta3.hasFocus) {
                    ta3.hasFocus = false;
                    ta2.hasFocus = true;
                    ta2.focus();
                }
            } else if (1 == e.index && true == ta2.hasFocus) {
                ta2.hasFocus = true;
                ta1.hasFocus = false;
                ta2.focus();
            }
        });
        var labelIcon = Titanium.UI.createImageView({
            image: "/images/question-mark-2.png",
            right: 24,
            top: 260,
            height: 32,
            width: 32
        });
        labelIcon.addEventListener("click", function() {
            alert("You can find your token by logging into Moodle and browsing to 'My profile Settings' -> 'Security keys' and typing in the key for 'Moodle mobile web service'");
        });
        var label3 = Titanium.UI.createLabel({
            text: "Moodle Token",
            top: 253,
            height: 40,
            width: 320
        });
        var ta3 = Titanium.UI.createTextField({
            value: Titanium.App.Properties.getString("moodle-token-" + selectedId),
            hintText: "Moodle Token",
            top: 303,
            height: 40,
            width: 750,
            borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
            keyboardToolbar: [ navButtons, flexSpace ],
            keyboardToolbarHeight: 40
        });
    }
    $.menuButton.addEventListener("click", function(e) {
        if (false == $.menuButton.toggle) {
            ta1.touchEnabled = false;
            ta2.touchEnabled = false;
        } else {
            ta1.touchEnabled = true;
            ta2.touchEnabled = true;
        }
        Titanium.App.fireEvent("nav-menu-button", {
            data: e.source.toggle,
            win: win
        });
    });
    Titanium.App.addEventListener("nav-menu-button-toggle", function(e) {
        $.menuButton.toggle = e.toggle;
    });
    Titanium.App.addEventListener("main-win-close", function() {
        Alloy.CFG.navwindow.closeWindow(win);
    });
    var importWiz = Titanium.UI.createButton({
        title: "Start Import Wizard",
        top: 17,
        width: 230,
        height: 30,
        backgroundColor: "#46a546",
        backgroundImage: "none",
        borderRadius: 10,
        font: {
            fontWeight: "bold",
            fontSize: 12,
            color: "#fff"
        }
    });
    importWiz.addEventListener("click", function() {
        if (false == Titanium.App.Properties.hasProperty("moodle-user") || 0 == Titanium.App.Properties.hasProperty("moodle-user") || false == Titanium.App.Properties.hasProperty("moodle-pass") || 0 == Titanium.App.Properties.hasProperty("moodle-pass")) alert("Please fill in moodle credentials and verify them first."); else {
            var win1 = Titanium.UI.createWindow({
                title: "Select Classes",
                url: "moodle_add_classes.js",
                backgroundColor: "#ecfaff",
                navGroup: win.navGroup,
                layout: "absolute",
                barColor: "#46a546"
            });
            win.navGroup.open(win1, {
                animated: false
            });
        }
    });
    importWiz.addEventListener("touchstart", function() {
        this.setBackgroundColor("blue");
    });
    importWiz.addEventListener("touchend", function() {
        this.setBackgroundColor("#46a546");
    });
    var selectedId = 0;
    var pickerSelected = 0;
    var timesfired = 0;
    xhr = getUserWithChildren(Titanium.App.Properties.getString("mmat"), Titanium.App.Properties.getString("userid"));
    xhr.onload = function() {
        var response = this.responseText;
        var user = JSON.parse(response);
        for (c = 0; user.entity_users.length > c; c++) data[c] = Ti.UI.createPickerRow({
            title: user.entity_users[c].entity.name,
            entity_id: user.entity_users[c].entity.id
        });
        var cancel = Titanium.UI.createButton({
            title: "Done",
            style: Titanium.UI.iPhone.SystemButtonStyle.BORDERED
        });
        var spacer = Titanium.UI.createButton({
            systemButton: Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
        });
        var toolbar = Ti.UI.iOS.createToolbar({
            top: 0,
            items: [ cancel, spacer ]
        });
        var picker_view = Titanium.UI.createView({
            height: 260,
            width: Ti.UI.Size,
            bottom: 0
        });
        var picker = Ti.UI.createPicker({
            bottom: 0,
            width: Ti.UI.FILL
        });
        picker.setSelectedRow(0, 0, true);
        selectedId = user.entity_users[0].entity.id;
        picker.selectionIndicator = true;
        picker_view.add(toolbar);
        picker_view.add(picker);
        if ("iphone" == Titanium.Platform.osname) var my_combo = Titanium.UI.createTextField({
            hintText: "Please Select a School",
            height: 40,
            top: "30dp",
            width: 320,
            borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
            rightButtonMode: Titanium.UI.INPUT_BUTTONMODE_ALWAYS
        }); else var my_combo = Titanium.UI.createTextField({
            hintText: "Please Select a School",
            height: 40,
            top: "30dp",
            width: 750,
            borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
            rightButtonMode: Titanium.UI.INPUT_BUTTONMODE_ALWAYS
        });
        var sclLabel = Titanium.UI.createLabel({
            text: "School",
            top: "0dp",
            height: 40,
            width: 320
        });
        scrollView.add(sclLabel);
        scrollView.add(my_combo);
        scrollView.add(label1);
        scrollView.add(ta1);
        scrollView.add(label2);
        scrollView.add(ta2);
        scrollView.add(orLabel);
        scrollView.add(label3);
        scrollView.add(ta3);
        scrollView.add(labelIcon);
        picker.add(data);
        scrollView.add(picker_view);
        win.add(scrollView);
        picker_view.hide();
        cancel.addEventListener("click", function() {
            picker_view.hide();
        });
        picker.addEventListener("change", function(e) {
            pickerSelected = e.row;
            selectedId = picker.getSelectedRow(0).entity_id;
            ta1.value = null != Titanium.App.Properties.getString("moodle-user-" + picker.getSelectedRow(0).entity_id) ? Titanium.App.Properties.getString("moodle-user-" + picker.getSelectedRow(0).entity_id) : "";
            ta2.value = null != Titanium.App.Properties.getString("moodle-pass-" + picker.getSelectedRow(0).entity_id) ? Titanium.App.Properties.getString("moodle-pass-" + picker.getSelectedRow(0).entity_id) : "";
            ta3.value = null != Titanium.App.Properties.getString("moodle-token-" + picker.getSelectedRow(0).entity_id) ? Titanium.App.Properties.getString("moodle-token-" + picker.getSelectedRow(0).entity_id) : "";
            if (true == Titanium.App.Properties.getString("moodle_sso_" + picker.getSelectedRow(0).entity_id)) {
                label1.visible = false;
                label2.visible = false;
                ta1.visible = false;
                ta2.visible = false;
                orLabel.visible = false;
                label3.top = "80dp";
                labelIcon.top = "76dp";
                ta3.top = "115dp";
            } else {
                label1.visible = true;
                label2.visible = true;
                ta1.visible = true;
                ta2.visible = true;
                orLabel.visible = true;
                label3.top = "263dp";
                labelIcon.top = "260dp";
                ta3.top = "303dp";
            }
            my_combo.value = picker.getSelectedRow(0).title;
        });
        ta1.addEventListener("focus", function() {
            ta1.hasFocus = true;
            picker_view.hide();
        });
        ta1.addEventListener("return", function() {
            ta2.blur();
        });
        ta2.addEventListener("focus", function() {
            ta2.hasFocus = true;
            picker_view.hide();
        });
        ta3.addEventListener("focus", function() {
            ta3.hasFocus = true;
            picker_view.hide();
        });
        ta2.addEventListener("return", function() {
            ta2.blur();
        });
        ta1.addEventListener("return", function() {
            ta1.blur();
        });
        my_combo.addEventListener("focus", function() {
            my_combo.blur();
            ta1.blur();
            ta2.blur();
            ta3.blur();
            my_combo.blur();
            picker_view.show();
            if (0 == timesfired) {
                picker.setSelectedRow(0, 0, true);
                selectedId = picker.getSelectedRow(0).entity_id;
            }
            timesfired++;
        });
    };
    xhr.send();
    $.finishButton.addEventListener("click", function() {
        if (ta3.value.length > 0) {
            xhr = getMoodle2SiteRetrieve(Titanium.App.Properties.getString("moodle_url_" + selectedId), ta3.value);
            xhr.onload = function() {
                var response = this.responseText;
                var user = JSON.parse(response);
                if (null != user.errorcode) alert("Your token was no good, please double check it."); else {
                    Titanium.App.Properties.setString("moodle-token-" + selectedId, ta3.value);
                    Titanium.App.Properties.setString("moodle-userid-" + selectedId, user.userid);
                    alert("Your moodle credentials were good, enjoy!");
                }
            };
            xhr.send();
        } else if (4 > ta1.value.length) alert("You must enter a Moodle username."); else if (5 > ta2.value.length) alert("You must enter a Moodle password."); else if (2 == selectedId) {
            var postData = {
                username: ta1.value,
                password: ta2.value
            };
            xhr = postLoginToMoodle(Titanium.App.Properties.getString("moodle_url_" + selectedId), postData);
            xhr.onload = function() {
                var response = this.responseText;
                var regexSess2 = /your\slogin\ssession/;
                var regexLog = /Invalid\slogin/;
                if (response.match(regexSess2)) {
                    xhr = postLoginToMoodle(Titanium.App.Properties.getString("moodle_url_" + selectedId), postData);
                    xhr.onload = function() {
                        this.responseText;
                        redirectToWizard();
                    };
                    xhr.send(postData);
                } else response.match(regexLog) ? alert("These are not valid credentials.  Please correct them.") : redirectToWizard();
            };
            xhr.send(postData);
        } else {
            xhr = getLoginToMoodle2(Titanium.App.Properties.getString("moodle_url_" + selectedId), ta1.value, ta2.value);
            xhr.onload = function() {
                var response = this.responseText;
                var user = JSON.parse(response);
                if (null != user.token) {
                    Titanium.App.Properties.setString("moodle-user-" + selectedId, ta1.value);
                    Titanium.App.Properties.setString("moodle-pass-" + selectedId, ta2.value);
                    Titanium.App.Properties.setString("moodle-token-" + selectedId, user.token);
                    xhr = getMoodle2SiteRetrieve(Titanium.App.Properties.getString("moodle_url_" + selectedId), user.token);
                    xhr.onload = function() {
                        var response = this.responseText;
                        var user = JSON.parse(response);
                        Titanium.App.Properties.setString("moodle-userid-" + selectedId, user.userid);
                        alert("Your moodle credentials were good, enjoy!");
                    };
                    xhr.send();
                } else alert("Your moodle credentials were no good, please re-enter them!");
            };
            xhr.send();
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;