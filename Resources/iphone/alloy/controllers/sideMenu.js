function Controller() {
    function reloadMenu() {
        $.menuTableView.data = [];
        xhr = getUserWithChildren(Titanium.App.Properties.getString("mmat"), Titanium.App.Properties.getString("userid"));
        xhr.onload = function() {
            var response = this.responseText;
            user = JSON.parse(response);
            classesSection = Alloy.createController("sideMenuSection", "Classes").getView();
            groupsSection = Alloy.createController("sideMenuSection", "Groups").getView();
            for (c = 0; user.topic_users.length > c; c++) {
                menuTitles[c] = Alloy.createController("sideMenuRow", user.topic_users[c]).getView();
                entityTopic[user.topic_users[c].topic.id] = user.topic_users[c].topic.entity_id;
                topicNumber[user.topic_users[c].topic.id] = user.topic_users[c].topic.number;
                classesSection.add(menuTitles[c]);
            }
            for (c = 0; user.group_users.length > c; c++) {
                menuTitles[c] = Alloy.createController("sideMenuRow", user.group_users[c]).getView();
                groupsSection.add(menuTitles[c]);
            }
            $.menuTableView.data = [ $.tableViewMenu, classesSection, groupsSection, $.tableViewSettings ];
        };
        xhr.send();
    }
    function goFeed() {
        var feed = Alloy.createController("old_feed", "test").getView();
        Alloy.CFG.navwindow.animate(navAnimate);
        Alloy.CFG.navwindow.closeWindow(Ti.App.myCurrentWindow, {
            animated: false
        });
        Alloy.CFG.navwindow.openWindow(feed, {
            animated: false
        });
    }
    function logout() {
        var dlg = Titanium.UI.createAlertDialog({
            message: "Are you sure you want to logout",
            buttonNames: [ "Logout", "Cancel" ]
        });
        dlg.addEventListener("click", function(ev) {
            if (0 == ev.index) {
                Titanium.App.Properties.setString("logged_in", "false");
                fb.logout();
                openWindow("index");
                $.sideMenu.close();
                Alloy.CFG.navwindow.close();
                Titanium.App.fireEvent("main-win-close");
            } else 1 == ev.index && dlg.hide();
        });
        dlg.show();
    }
    function moodleAccount() {
        var moodle_account = Alloy.createController("moodle_account", "test").getView();
        Alloy.CFG.navwindow.animate(navAnimate);
        Alloy.CFG.navwindow.closeWindow(Ti.App.myCurrentWindow, {
            animated: false
        });
        Alloy.CFG.navwindow.openWindow(moodle_account, {
            animated: false
        });
    }
    function pushNotifications() {
        ("iphone" == Titanium.Platform.osname || "ipad" == Titanium.Platform.osname) && Titanium.Network.registerForPushNotifications({
            types: [ Titanium.Network.NOTIFICATION_TYPE_BADGE, Titanium.Network.NOTIFICATION_TYPE_ALERT ],
            success: function(e) {
                var deviceToken = e.deviceToken;
                Cloud.Users.login({
                    login: "contact@mindsmesh.com",
                    password: "password"
                }, function(e) {
                    e.success && Cloud.PushNotifications.subscribe({
                        channel: "alert",
                        type: "ios",
                        device_token: deviceToken
                    }, function(e) {
                        if (e.success) {
                            var env = "development";
                            "true" == Ti.App.Properties.getString("production") && (env = "production");
                            var postData = {
                                token: deviceToken,
                                model: escape(Titanium.Platform.model),
                                os: escape(Titanium.Platform.osname),
                                name: escape(Titanium.Platform.model),
                                environment: env
                            };
                            request = postRegisterDevice(Titanium.App.Properties.getString("mmat"), postData);
                            request.onload = function() {};
                            request.send(postData);
                        }
                    });
                });
                Ti.API.info("Push notification device token is: " + deviceToken);
                Ti.API.info("Push notification types: " + Titanium.Network.remoteNotificationTypes);
                Ti.API.info("Push notification enabled: " + Titanium.Network.remoteNotificationsEnabled);
            },
            error: function() {},
            callback: function(e) {
                if (true == isPaused) {
                    xhr = getNotification(Titanium.App.Properties.getString("mmat"), e.data.notification_id);
                    xhr.onload = function() {
                        var response = this.responseText;
                        user = JSON.parse(response);
                        if ("Post" == user.target_type) {
                            var post = Alloy.createController("post", {
                                postid: user.target_id
                            }).getView();
                            Alloy.CFG.navwindow.openWindow(post, {
                                animated: false
                            });
                        } else "Topic" == user.target_type ? Titanium.App.fireEvent("goTopic", {
                            topic_id: user.target_id
                        }) : "Group" == user.target_type && Titanium.App.fireEvent("goGroup", {
                            group_id: user.target_id
                        });
                    };
                    xhr.send();
                } else Ti.App.fireEvent("reloadNotifications");
            }
        });
    }
    function openWindow(windowName, args) {
        var view1 = Alloy.createController(windowName, args).getView();
        view1.open();
        Ti.API.info(windowName);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "sideMenu";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.sideMenu = Ti.UI.createWindow({
        backgroundColor: "#252525",
        id: "sideMenu",
        zIndex: "-5"
    });
    $.__views.sideMenu && $.addTopLevelView($.__views.sideMenu);
    var __alloyId96 = [];
    $.__views.tableViewMenu = Ti.UI.createTableViewSection({
        id: "tableViewMenu",
        headerTitle: "Menu"
    });
    __alloyId96.push($.__views.tableViewMenu);
    $.__views.feedRow = Ti.UI.createTableViewRow({
        id: "feedRow",
        height: "40dp"
    });
    $.__views.tableViewMenu.add($.__views.feedRow);
    goFeed ? $.__views.feedRow.addEventListener("click", goFeed) : __defers["$.__views.feedRow!click!goFeed"] = true;
    $.__views.feedImg = Ti.UI.createImageView({
        id: "feedImg",
        left: "4dp",
        height: "32dp",
        width: "32dp"
    });
    $.__views.feedRow.add($.__views.feedImg);
    $.__views.feedLbl = Ti.UI.createLabel({
        text: "Campus Feed",
        id: "feedLbl",
        color: "#e2e7ed",
        left: "45dp",
        textAlign: "left"
    });
    $.__views.feedRow.add($.__views.feedLbl);
    $.__views.tableViewClasses = Ti.UI.createTableViewSection({
        id: "tableViewClasses",
        headerTitle: "Classes"
    });
    __alloyId96.push($.__views.tableViewClasses);
    $.__views.tableViewGroups = Ti.UI.createTableViewSection({
        id: "tableViewGroups",
        headerTitle: "Groups"
    });
    __alloyId96.push($.__views.tableViewGroups);
    $.__views.tableViewSettings = Ti.UI.createTableViewSection({
        id: "tableViewSettings",
        headerTitle: "Settings"
    });
    __alloyId96.push($.__views.tableViewSettings);
    $.__views.moodleRow = Ti.UI.createTableViewRow({
        id: "moodleRow",
        height: "40dp"
    });
    $.__views.tableViewSettings.add($.__views.moodleRow);
    moodleAccount ? $.__views.moodleRow.addEventListener("click", moodleAccount) : __defers["$.__views.moodleRow!click!moodleAccount"] = true;
    $.__views.reloadImg = Ti.UI.createImageView({
        id: "reloadImg",
        image: "/images/run.png",
        left: "4dp",
        height: "32dp",
        width: "32dp"
    });
    $.__views.moodleRow.add($.__views.reloadImg);
    $.__views.lbl = Ti.UI.createLabel({
        text: "Moodle Account",
        id: "lbl",
        color: "#e2e7ed",
        left: "45dp",
        textAlign: "left"
    });
    $.__views.moodleRow.add($.__views.lbl);
    $.__views.ReloadRow = Ti.UI.createTableViewRow({
        id: "ReloadRow",
        height: "40dp"
    });
    $.__views.tableViewSettings.add($.__views.ReloadRow);
    reloadMenu ? $.__views.ReloadRow.addEventListener("click", reloadMenu) : __defers["$.__views.ReloadRow!click!reloadMenu"] = true;
    $.__views.reloadImg = Ti.UI.createImageView({
        id: "reloadImg",
        image: "/images/gtk_refresh.png",
        left: "4dp",
        height: "32dp",
        width: "32dp"
    });
    $.__views.ReloadRow.add($.__views.reloadImg);
    $.__views.lbl = Ti.UI.createLabel({
        text: "Reload Menu",
        id: "lbl",
        color: "#e2e7ed",
        left: "45dp",
        textAlign: "left"
    });
    $.__views.ReloadRow.add($.__views.lbl);
    $.__views.LogoutRow = Ti.UI.createTableViewRow({
        id: "LogoutRow",
        height: "40dp"
    });
    $.__views.tableViewSettings.add($.__views.LogoutRow);
    logout ? $.__views.LogoutRow.addEventListener("click", logout) : __defers["$.__views.LogoutRow!click!logout"] = true;
    $.__views.logoutImg = Ti.UI.createImageView({
        id: "logoutImg",
        image: "/images/exit.png",
        left: "4dp",
        height: "32dp",
        width: "32dp"
    });
    $.__views.LogoutRow.add($.__views.logoutImg);
    $.__views.lbl = Ti.UI.createLabel({
        text: "Logout",
        id: "lbl",
        color: "#e2e7ed",
        left: "45dp",
        textAlign: "left"
    });
    $.__views.LogoutRow.add($.__views.lbl);
    $.__views.menuTableView = Ti.UI.createTableView({
        data: __alloyId96,
        id: "menuTableView",
        backgroundColor: "#252525",
        separatorColor: "#000",
        width: "260dp",
        left: "0dp",
        top: "20dp"
    });
    $.__views.sideMenu.add($.__views.menuTableView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var navAnimate = Ti.UI.createAnimation({
        left: 0,
        duration: 75,
        curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
    });
    var menuTitles = [];
    var entityTopic = [];
    var topicNumber = [];
    Titanium.App.addEventListener("reloadMenu", function() {
        reloadMenu();
    });
    Titanium.App.addEventListener("goTopic", function(e) {
        var moodle_url_string = "moodle_url_" + entityTopic[e.topic_id];
        var feed = Alloy.createController("old_feed", {
            topic_id: e.topic_id,
            moodle: Titanium.App.Properties.getString(moodle_url_string),
            entity_id: entityTopic[e.topic_id],
            class_number: topicNumber[e.topic_id]
        }).getView();
        var navAnimate = Ti.UI.createAnimation({
            left: 0,
            duration: 75,
            curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
        Alloy.CFG.navwindow.animate(navAnimate);
        Alloy.CFG.navwindow.closeWindow(Ti.App.myCurrentWindow, {
            animated: false
        });
        Alloy.CFG.navwindow.openWindow(feed, {
            animated: false
        });
    });
    Titanium.App.addEventListener("goGroup", function(e) {
        var feed = Alloy.createController("old_feed", {
            group_id: e.group_id
        }).getView();
        var navAnimate = Ti.UI.createAnimation({
            left: 0,
            duration: 75,
            curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
        Alloy.CFG.navwindow.animate(navAnimate);
        Alloy.CFG.navwindow.closeWindow(Ti.App.myCurrentWindow, {
            animated: false
        });
        Alloy.CFG.navwindow.openWindow(feed, {
            animated: false
        });
    });
    Titanium.App.addEventListener("nav-menu-button", function(e) {
        if (true == e.data) {
            navAnimate.addEventListener("complete", function() {});
            Alloy.CFG.navwindow.animate(navAnimate);
            Titanium.App.fireEvent("nav-menu-button-toggle", {
                toggle: false
            });
        } else {
            Alloy.CFG.navwindow.animate({
                left: 260,
                duration: 75,
                curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
            });
            Titanium.App.fireEvent("nav-menu-button-toggle", {
                toggle: true
            });
        }
    });
    $.sideMenu.addEventListener("open", function() {
        reloadMenu();
        pushNotifications();
        var navw = Alloy.createController("navWindow", "test");
        navw.getView().open();
        Alloy.CFG.navwindow = navw.navWindow;
        var feed = Alloy.createController("old_feed", "test");
        $.feedImg.image = Titanium.App.Properties.getString("photo_url");
        Alloy.CFG.navwindow.openWindow(feed.getView(), {
            animated: false
        });
    });
    __defers["$.__views.feedRow!click!goFeed"] && $.__views.feedRow.addEventListener("click", goFeed);
    __defers["$.__views.moodleRow!click!moodleAccount"] && $.__views.moodleRow.addEventListener("click", moodleAccount);
    __defers["$.__views.ReloadRow!click!reloadMenu"] && $.__views.ReloadRow.addEventListener("click", reloadMenu);
    __defers["$.__views.LogoutRow!click!logout"] && $.__views.LogoutRow.addEventListener("click", logout);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;