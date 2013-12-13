function Controller() {
    function goLogin() {
        $.activityIndicator.show();
        LoginUser($.email.value.toString(), $.password.value.toString());
    }
    function goFacebookLogin() {
        true == fb.loggedIn ? openWindow("sideWindow") : fb.authorize();
    }
    function goSignup() {
        openWindow("sign_up");
    }
    function goNavigation() {
        openWindow("sideMenu");
    }
    function LoginUser(email, password) {
        var postData = {
            email: email,
            password: password
        };
        xhr = postLogin("", postData);
        xhr.onload = function() {
            var response = this.responseText;
            Ti.API.info(response);
            var user = JSON.parse(response);
            for (i = 0; user.entity_users.length > i; i++) if (null != user.entity_users[i].entity.moodle_url) {
                moodle_entity_string = "moodle_entity_" + user.entity_users[i].entity.id;
                moodle_url_string = "moodle_url_" + user.entity_users[i].entity.id;
                moodle_sso_string = "moodle_sso_" + user.entity_users[i].entity.id;
                entity_user_string = "entity_user_" + user.entity_users[i].id;
                Titanium.App.Properties.setString(moodle_entity_string, user.entity_users[i].entity.id);
                Titanium.App.Properties.setString(moodle_url_string, user.entity_users[i].entity.moodle_url);
                Titanium.App.Properties.setString(moodle_sso_string, user.entity_users[i].entity.moodle_sso);
                Titanium.App.Properties.setString(entity_user_string, user.entity_users[i].id);
            }
            Titanium.App.Properties.setString("logged_in", "true");
            Titanium.App.Properties.setString("name", user.name);
            Titanium.App.Properties.setString("num_entities", user.entity_users.length);
            Titanium.App.Properties.setString("num_topics", user.topic_users.length);
            Titanium.App.Properties.setString("userid", user.id);
            Titanium.App.Properties.setString("mmat", user.access_token);
            Titanium.App.Properties.setString("photo_url", user.photo_url);
            $.activityIndicator.hide();
            goNavigation();
        };
        xhr.onerror = function() {
            alert("Login failed, please check credentials and try again.");
            $.activityIndicator.hide();
        };
        "iphone" == Titanium.Platform.osname || "ipad" == Titanium.Platform.osname ? xhr.send(postData) : xhr.send(JSON.stringify(postData));
    }
    function openWindow(windowName, args) {
        var view1 = Alloy.createController(windowName, args);
        view1.getView().open();
        Ti.API.info(windowName);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.indexWindow = Ti.UI.createWindow({
        backgroundColor: "#FFF",
        id: "indexWindow"
    });
    $.__views.indexWindow && $.addTopLevelView($.__views.indexWindow);
    $.__views.mainView = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        top: 0,
        layout: "vertical",
        id: "mainView",
        backgroundColor: "#15B17A"
    });
    $.__views.indexWindow.add($.__views.mainView);
    $.__views.image = Ti.UI.createImageView({
        id: "image",
        top: "18%",
        width: "80dp",
        height: "80dp",
        image: "/images/MindsMesh-NewLogo.png"
    });
    $.__views.mainView.add($.__views.image);
    $.__views.__alloyId53 = Ti.UI.createLabel({
        color: "#ffffff",
        size: 15,
        font: {
            fontSize: 25
        },
        text: "MindsMesh",
        id: "__alloyId53"
    });
    $.__views.mainView.add($.__views.__alloyId53);
    $.__views.loginView = Ti.UI.createView({
        width: "300dp",
        height: "80dp",
        top: "5%",
        borderRadius: 3,
        keyb: true,
        layout: "vertical",
        id: "loginView",
        backgroundColor: "white"
    });
    $.__views.mainView.add($.__views.loginView);
    $.__views.email = Ti.UI.createTextField({
        keyb: true,
        id: "email",
        color: "#000000",
        top: "5dp",
        bottom: "5dp",
        left: "10dp",
        width: "250dp",
        height: "30dp",
        hintText: "Email Address"
    });
    $.__views.loginView.add($.__views.email);
    $.__views.__alloyId54 = Ti.UI.createView({
        keyb: true,
        height: "1dp",
        width: "300dp",
        backgroundColor: "#E5E4E2",
        id: "__alloyId54"
    });
    $.__views.loginView.add($.__views.__alloyId54);
    $.__views.password = Ti.UI.createTextField({
        keyb: true,
        passwordMask: true,
        id: "password",
        color: "#000000",
        top: "5dp",
        bottom: "5dp",
        left: "10dp",
        width: "250dp",
        height: "30dp",
        hintText: "Password"
    });
    $.__views.loginView.add($.__views.password);
    $.__views.__alloyId55 = Ti.UI.createButton({
        height: "40dp",
        width: "300dp",
        color: "#fffff",
        font: "Arial",
        borderRadius: 2,
        backgroundColor: "#15c58a",
        top: "5dp",
        bottom: "17dp",
        id: "__alloyId55"
    });
    $.__views.mainView.add($.__views.__alloyId55);
    goLogin ? $.__views.__alloyId55.addEventListener("click", goLogin) : __defers["$.__views.__alloyId55!click!goLogin"] = true;
    $.__views.__alloyId56 = Ti.UI.createLabel({
        text: "Login",
        color: "white",
        id: "__alloyId56"
    });
    $.__views.__alloyId55.add($.__views.__alloyId56);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        right: "5%",
        id: "activityIndicator"
    });
    $.__views.__alloyId55.add($.__views.activityIndicator);
    $.__views.__alloyId57 = Ti.UI.createLabel({
        text: "or",
        color: "white",
        id: "__alloyId57"
    });
    $.__views.mainView.add($.__views.__alloyId57);
    $.__views.__alloyId58 = Ti.UI.createButton({
        height: "40dp",
        width: "300dp",
        color: "#fffff",
        font: "Arial",
        borderRadius: 2,
        backgroundColor: "#3b5998",
        top: "17dp",
        id: "__alloyId58"
    });
    $.__views.mainView.add($.__views.__alloyId58);
    goFacebookLogin ? $.__views.__alloyId58.addEventListener("click", goFacebookLogin) : __defers["$.__views.__alloyId58!click!goFacebookLogin"] = true;
    $.__views.__alloyId59 = Ti.UI.createLabel({
        text: "Login using Facebook",
        color: "white",
        id: "__alloyId59"
    });
    $.__views.__alloyId58.add($.__views.__alloyId59);
    $.__views.__alloyId60 = Ti.UI.createButton({
        height: Ti.UI.SIZE,
        width: "300dp",
        tintColor: "#fffff",
        shadowColor: "#aaa",
        font: {
            color: "#fffff",
            size: 9,
            fontWeight: "bold"
        },
        borderRadius: 2,
        bottom: "5%",
        id: "__alloyId60"
    });
    $.__views.indexWindow.add($.__views.__alloyId60);
    goSignup ? $.__views.__alloyId60.addEventListener("click", goSignup) : __defers["$.__views.__alloyId60!click!goSignup"] = true;
    $.__views.__alloyId61 = Ti.UI.createLabel({
        font: {
            color: "#fffff",
            size: 9
        },
        text: "Sign Up For MindsMesh",
        color: "white",
        id: "__alloyId61"
    });
    $.__views.__alloyId60.add($.__views.__alloyId61);
    exports.destroy = function() {};
    _.extend($, $.__views);
    fb.addEventListener("login", function(e) {
        null != e.data && Titanium.App.Properties.setString("fbid", e.data["id"]);
        xhr = postLogin(fb.accessToken);
        xhr.onload = function() {
            var response = this.responseText;
            var user = JSON.parse(response);
            for (i = 0; user.entity_users.length > i; i++) if (null != user.entity_users[i].entity.moodle_url) {
                moodle_entity_string = "moodle_entity_" + user.entity_users[i].entity.id;
                moodle_url_string = "moodle_url_" + user.entity_users[i].entity.id;
                moodle_sso_string = "moodle_sso_" + user.entity_users[i].entity.id;
                entity_user_string = "entity_user_" + user.entity_users[i].id;
                Titanium.App.Properties.setString(moodle_entity_string, user.entity_users[i].entity.id);
                Titanium.App.Properties.setString(moodle_url_string, user.entity_users[i].entity.moodle_url);
                Titanium.App.Properties.setString(moodle_sso_string, user.entity_users[i].entity.moodle_sso);
                Titanium.App.Properties.setString(entity_user_string, user.entity_users[i].id);
            }
            Titanium.App.Properties.setString("logged_in", "true");
            Titanium.App.Properties.setString("name", user.name);
            Titanium.App.Properties.setString("num_entities", user.entity_users.length);
            Titanium.App.Properties.setString("num_topics", user.topic_users.length);
            Titanium.App.Properties.setString("userid", user.id);
            Titanium.App.Properties.setString("mmat", user.access_token);
            Titanium.App.Properties.setString("photo_url", user.photo_url);
            goNavigation();
        };
        xhr.send();
    });
    $.indexWindow.addEventListener("click", function(e) {
        if (true != e.source.keyb) {
            $.email.blur();
            $.password.blur();
        }
    });
    $.indexWindow.open();
    __defers["$.__views.__alloyId55!click!goLogin"] && $.__views.__alloyId55.addEventListener("click", goLogin);
    __defers["$.__views.__alloyId58!click!goFacebookLogin"] && $.__views.__alloyId58.addEventListener("click", goFacebookLogin);
    __defers["$.__views.__alloyId60!click!goSignup"] && $.__views.__alloyId60.addEventListener("click", goSignup);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;