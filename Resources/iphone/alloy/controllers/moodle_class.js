function Controller() {
    function reloadNotifications() {
        modalTableView.data = [];
        xhr = getNotificationsGrouped(Titanium.App.Properties.getString("mmat"));
        xhr.onload = function() {
            var response = this.responseText;
            setTimeout(user = JSON.parse(response), 500);
            if (user.unread.length > 0) {
                notificationButton.backgroundImage = "/images/bell-light.png";
                numLabel.text = user.unread.length;
                numLabel.visible = true;
            } else {
                notificationButton.backgroundImage = "/images/bell.png";
                numLabel.visible = false;
            }
            if (null != user.unread.length) for (var i = 0; user.unread.length > i; ++i) {
                var classNumber = Titanium.UI.createLabel({
                    text: user.unread[i].actors_count + " people " + user.unread[i].action + " to",
                    box: true,
                    notification_id: user.unread[i].id,
                    id: user.unread[i].target_id,
                    type: user.unread[i].target_type,
                    font: {
                        fontSize: "16dp",
                        fontWeight: "bold"
                    },
                    color: "#000",
                    width: "auto",
                    textAlign: "left",
                    top: 0,
                    left: 10
                });
                var classTitle = Titanium.UI.createLabel({
                    text: user.unread[i].text,
                    box: true,
                    notification_id: user.unread[i].id,
                    id: user.unread[i].target_id,
                    type: user.unread[i].target_type,
                    font: {
                        fontSize: "14dp"
                    },
                    color: "#000",
                    width: .85 * Titanium.Platform.displayCaps.platformWidth - 45,
                    textAlign: "left",
                    left: 10,
                    top: 18
                });
                var flag = Titanium.UI.createImageView({
                    image: "/images/flag_new_red.png",
                    top: 7,
                    right: 12,
                    notification_id: user.unread[i].id,
                    id: user.unread[i].target_id,
                    type: user.unread[i].target_type,
                    box: true,
                    height: 24,
                    width: 24
                });
                var fbRow = Titanium.UI.createTableViewRow({
                    backgroundColor: "#e2e7ed",
                    box: true,
                    notification_id: user.unread[i].id,
                    id: user.unread[i].target_id,
                    type: user.unread[i].target_type,
                    height: 40
                });
                fbRow.add(classNumber);
                fbRow.add(classTitle);
                fbRow.add(flag);
                modalTableView.appendRow(fbRow);
            }
            for (var i = 0; user.read.length > i; ++i) {
                var classNumber = Titanium.UI.createLabel({
                    text: user.read[i].actors_count + " people " + user.read[i].action + " to",
                    box: true,
                    notification_id: user.read[i].id,
                    id: user.read[i].target_id,
                    type: user.read[i].target_type,
                    font: {
                        fontSize: "16dp",
                        fontWeight: "bold"
                    },
                    color: "#000",
                    width: "auto",
                    textAlign: "left",
                    left: 10,
                    top: 0
                });
                var classTitle = Titanium.UI.createLabel({
                    text: user.read[i].text,
                    box: true,
                    notification_id: user.read[i].id,
                    id: user.read[i].target_id,
                    type: user.read[i].target_type,
                    font: {
                        fontSize: "14dp"
                    },
                    color: "#000",
                    width: .85 * Titanium.Platform.displayCaps.platformWidth - 45,
                    textAlign: "left",
                    left: 10,
                    top: 18
                });
                var fbRow = Titanium.UI.createTableViewRow({
                    backgroundColor: "#e2e7ed",
                    box: true,
                    notification_id: user.read[i].id,
                    id: user.read[i].target_id,
                    type: user.read[i].target_type,
                    height: 40
                });
                fbRow.add(classNumber);
                fbRow.add(classTitle);
                modalTableView.appendRow(fbRow);
            }
        };
        xhr.send();
    }
    function beginReloading() {
        tableview.setData([]);
        if (Titanium.Network.online) if (null != args.class_id) {
            xhr = getMoodle2CourseContents(Titanium.App.Properties.getString("moodle_url_" + args.entity_id), Titanium.App.Properties.getString("moodle-token-" + args.entity_id), args.class_id);
            xhr.onload = function() {
                var response = this.responseText;
                var course = JSON.parse(response);
                for (var i = 0; course.length > i; i++) if (course[i].modules.length > 0) {
                    var section = Ti.UI.createTableViewSection({
                        headerTitle: course[i].name
                    });
                    tableview.appendSection(section);
                    for (var j = 0; course[i].modules.length > j; j++) if ("resource" == course[i].modules[j].modname) {
                        var fileurl = course[i].modules[j].contents[0].fileurl + "&token=" + Titanium.App.Properties.getString("moodle-token-" + args.entity_id);
                        var leftImage = Titanium.UI.createImageView({
                            image: course[i].modules[j].modicon,
                            hiddenTitle: course[i].modules[j].name,
                            FileUrl: fileurl,
                            height: "auto",
                            left: 2
                        });
                        var labelTitle = Titanium.UI.createLabel({
                            text: course[i].modules[j].name,
                            hiddenTitle: course[i].modules[j].name,
                            FileUrl: fileurl,
                            font: {
                                fontSize: 16,
                                fontWeight: "bold"
                            },
                            color: "#000",
                            width: "auto",
                            textAlign: "left",
                            left: 27
                        });
                        if (0 == j) var fbRow = Titanium.UI.createTableViewRow({
                            header: course[i].name,
                            backgroundColor: "#ffffff",
                            hiddenTitle: course[i].modules[j].name,
                            FileUrl: fileurl,
                            height: 40
                        }); else var fbRow = Titanium.UI.createTableViewRow({
                            backgroundColor: "#ffffff",
                            hiddenTitle: course[i].modules[j].name,
                            FileUrl: fileurl,
                            height: 40
                        });
                        fbRow.add(leftImage);
                        fbRow.add(labelTitle);
                        tableview.appendRow(fbRow);
                    } else if ("page" == course[i].modules[j].modname) {
                        var fileurl = course[i].modules[j].contents[0].fileurl + "&token=" + Titanium.App.Properties.getString("moodle-token-" + args.entity_id);
                        var leftImage = Titanium.UI.createImageView({
                            image: course[i].modules[j].modicon,
                            hiddenTitle: course[i].modules[j].name,
                            FileUrl: fileurl,
                            height: "auto",
                            left: 2
                        });
                        var labelTitle = Titanium.UI.createLabel({
                            text: course[i].modules[j].name,
                            hiddenTitle: course[i].modules[j].name,
                            FileUrl: fileurl,
                            font: {
                                fontSize: 16,
                                fontWeight: "bold"
                            },
                            color: "#000",
                            width: "auto",
                            textAlign: "left",
                            left: 27
                        });
                        if (0 == j) var fbRow = Titanium.UI.createTableViewRow({
                            header: course[i].name,
                            backgroundColor: "#ffffff",
                            hiddenTitle: course[i].modules[j].name,
                            FileUrl: fileurl,
                            height: 40
                        }); else var fbRow = Titanium.UI.createTableViewRow({
                            backgroundColor: "#ffffff",
                            hiddenTitle: course[i].modules[j].name,
                            FileUrl: fileurl,
                            height: 40
                        });
                        fbRow.add(leftImage);
                        fbRow.add(labelTitle);
                        tableview.appendRow(fbRow);
                    } else if ("url" == course[i].modules[j].modname) {
                        var fileurl = course[i].modules[j].contents[0].fileurl + "&token=" + Titanium.App.Properties.getString("moodle-token-" + win.entity_id);
                        var leftImage = Titanium.UI.createImageView({
                            image: "/images/www.png",
                            hiddenTitle: course[i].modules[j].name,
                            FileUrl: fileurl,
                            height: "auto",
                            width: "24",
                            left: 2
                        });
                        var labelTitle = Titanium.UI.createLabel({
                            text: course[i].modules[j].name,
                            hiddenTitle: course[i].modules[j].name,
                            FileUrl: fileurl,
                            font: {
                                fontSize: 16,
                                fontWeight: "bold"
                            },
                            color: "#000",
                            width: "auto",
                            textAlign: "left",
                            left: 27
                        });
                        if (0 == j) var fbRow = Titanium.UI.createTableViewRow({
                            header: course[i].name,
                            backgroundColor: "#ffffff",
                            hiddenTitle: course[i].modules[j].name,
                            FileUrl: fileurl,
                            height: 40
                        }); else var fbRow = Titanium.UI.createTableViewRow({
                            backgroundColor: "#ffffff",
                            hiddenTitle: course[i].modules[j].name,
                            FileUrl: fileurl,
                            height: 40
                        });
                        fbRow.add(leftImage);
                        fbRow.add(labelTitle);
                        tableview.appendRow(fbRow);
                    }
                }
            };
            xhr.send();
        } else {
            xhr = getDataFromMoodle(win.Moodurl);
            xhr.onload = function() {
                var response = this.responseText;
                var regex = /href=.+(http.+mod\/resource\/view\.php\?id=\d+).+<img src="(https.+gif)".+<span>(.+)<span/gi;
                var c = 0;
                while (null !== (hits = regex.exec(response))) {
                    var leftImage = Titanium.UI.createImageView({
                        image: hits[2],
                        hiddenTitle: hits[3],
                        FileUrl: hits[1],
                        height: "auto",
                        left: 2
                    });
                    var labelTitle = Titanium.UI.createLabel({
                        text: hits[3],
                        hiddenTitle: hits[3],
                        FileUrl: hits[1],
                        font: {
                            fontSize: 16,
                            fontWeight: "bold"
                        },
                        color: "#000",
                        width: "auto",
                        textAlign: "left",
                        left: 20
                    });
                    if (0 == c) var fbRow = Titanium.UI.createTableViewRow({
                        header: "File Attachments",
                        backgroundColor: "#ffffff",
                        hiddenTitle: hits[3],
                        FileUrl: hits[1],
                        height: 40
                    }); else var fbRow = Titanium.UI.createTableViewRow({
                        backgroundColor: "#ffffff",
                        hiddenTitle: hits[3],
                        FileUrl: hits[1],
                        height: 40
                    });
                    c++;
                    fbRow.add(leftImage);
                    fbRow.add(labelTitle);
                    tableview.appendRow(fbRow);
                }
                var regex = /(http.+quiz\/view\.php\?id=\d+).+<img src="(https.+gif)".+<span>(.+)<span/gi;
                var c = 0;
                while (null !== (hits = regex.exec(response))) {
                    var leftImage = Titanium.UI.createImageView({
                        image: hits[2],
                        hiddenTitle: hits[3],
                        FileUrl: hits[1],
                        height: "auto",
                        left: 2
                    });
                    var labelTitle = Titanium.UI.createLabel({
                        text: hits[3],
                        hiddenTitle: hits[3],
                        FileUrl: hits[1],
                        font: {
                            fontSize: 16,
                            fontWeight: "bold"
                        },
                        color: "#000",
                        width: "auto",
                        textAlign: "left",
                        left: 20
                    });
                    if (0 == c) var fbRow = Titanium.UI.createTableViewRow({
                        header: "Homework",
                        backgroundColor: "#ffffff",
                        hiddenTitle: hits[3],
                        FileUrl: hits[1],
                        height: 40
                    }); else var fbRow = Titanium.UI.createTableViewRow({
                        backgroundColor: "#ffffff",
                        hiddenTitle: hits[3],
                        FileUrl: hits[1],
                        height: 40
                    });
                    c++;
                    fbRow.add(leftImage);
                    fbRow.add(labelTitle);
                    tableview.appendRow(fbRow);
                }
            };
            xhr.send();
        } else alert("Network problems.");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "moodle_class";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.moodle_class = Ti.UI.createWindow({
        backgroundColor: "#FFF",
        id: "moodle_class",
        barColor: "#15B17A",
        navTintColor: "#ffffff",
        translucent: "false"
    });
    $.__views.moodle_class && $.addTopLevelView($.__views.moodle_class);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var win = $.moodle_class;
    Ti.App.addEventListener("reloadNotifications", function() {
        reloadNotifications();
    });
    var winModal = Ti.UI.createWindow({
        backgroundColor: "#B0000000",
        visible: false
    });
    winModal.addEventListener("click", function(e) {
        true != e.source.box && winModal.hide();
    });
    winModal.open();
    var win_height = 380;
    var win_width = .85 * Ti.Platform.displayCaps.platformWidth;
    var view = Ti.UI.createView({
        backgroundColor: "#e2e7ed",
        borderColor: "#A5A5A5",
        box: true,
        borderRadius: 15,
        top: 50,
        layout: "vertical",
        borderWidth: 2,
        width: win_width,
        height: win_height
    });
    var modalTableView = Titanium.UI.createTableView({
        backgroundColor: "#e2e7ed",
        box: true
    });
    modalTableView.addEventListener("click", function(e) {
        xhr = postNotificationMarkAsRead(Titanium.App.Properties.getString("mmat"), e.source.notification_id);
        xhr.onload = function() {
            this.responseText;
            if ("Post" == e.source.type) {
                var post = Alloy.createController("post", {
                    postid: e.source.id
                }).getView();
                winModal.hide();
                Alloy.CFG.navwindow.openWindow(post, {
                    animated: false
                });
            } else if ("Topic" == e.source.type) {
                winModal.hide();
                Titanium.App.fireEvent("goTopic", {
                    topic_id: e.source.id
                });
            } else if ("Group" == e.source.type) {
                winModal.hide();
                Titanium.App.fireEvent("goGroup", {
                    group_id: e.source.id
                });
            }
        };
        xhr.send();
    });
    var labelTitle = Titanium.UI.createLabel({
        text: Titanium.App.Properties.getString("name"),
        font: {
            fontSize: 16,
            fontWeight: "bold"
        },
        color: "#000",
        box: true,
        width: "auto",
        textAlign: "center",
        top: -37,
        left: 55
    });
    var labelTitle2 = Titanium.UI.createLabel({
        text: "Notifications",
        font: {
            fontSize: 12
        },
        color: "#000",
        box: true,
        width: "auto",
        textAlign: "center",
        left: 55
    });
    var seperatorPhone = Ti.UI.createView({
        backgroundColor: "#808080",
        width: .85 * Titanium.Platform.displayCaps.platformWidth - 10,
        top: 7,
        box: true,
        height: 2
    });
    var pict = Titanium.UI.createImageView({
        image: Titanium.App.Properties.getString("photo_url"),
        top: 10,
        left: 10,
        box: true,
        height: 40,
        width: 40
    });
    view.add(pict);
    view.add(labelTitle);
    view.add(labelTitle2);
    view.add(seperatorPhone);
    view.add(modalTableView);
    winModal.add(view);
    Titanium.UI.createButton({
        title: "Grades"
    });
    var regex = /course\/view\.php\?id=(\d+)/;
    gradesid = regex.exec(win.Moodurl);
    var tableview = Titanium.UI.createTableView({
        backgroundColor: "#ffffff"
    });
    win.add(tableview);
    var notificationButton = Ti.UI.createButton({
        height: 27,
        width: 27
    });
    var numLabel = Ti.UI.createLabel({
        textAlign: "center",
        height: "auto",
        width: 11,
        font: {
            fontWeight: "bold",
            fontSize: 12
        },
        backgroundColor: "red",
        color: "white",
        borderRadius: 3,
        top: 0,
        left: 15,
        visible: false
    });
    notificationButton.add(numLabel);
    notificationButton.addEventListener("click", function() {
        if (true != winModal.visible) {
            winModal.show();
            winModal.visible = true;
        }
    });
    win.setTitleControl(notificationButton);
    var user = "";
    tableview.addEventListener("click", function(e) {
        var win1 = Titanium.UI.createWindow({
            title: e.source.hiddenTitle,
            backgroundColor: "#ffffff",
            layout: "absolute",
            navTintColor: "#ffffff",
            statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
            translucent: false,
            barColor: "#15B17A"
        });
        url2 = e.source.FileUrl;
        var webview = Titanium.UI.createWebView({
            url: url2
        });
        win1.add(webview);
        Alloy.CFG.navwindow.openWindow(win1, {
            animated: false
        });
    });
    beginReloading();
    reloadNotifications();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;