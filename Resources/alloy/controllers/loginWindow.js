function Controller() {
    function clickLogin() {
        LoginUser($.email.value.toString(), $.password.value.toString());
        $.email.blur();
        $.password.blur();
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
                entity_user_string = "entity_user_" + user.entity_users[i].id;
                Titanium.App.Properties.setString(moodle_entity_string, user.entity_users[i].entity.id);
                Titanium.App.Properties.setString(moodle_url_string, user.entity_users[i].entity.moodle_url);
                Titanium.App.Properties.setString(entity_user_string, user.entity_users[i].id);
            }
            Titanium.App.Properties.setString("logged_in", "true");
            Titanium.App.Properties.setString("name", user.name);
            Titanium.App.Properties.setString("num_entities", user.entity_users.length);
            Titanium.App.Properties.setString("num_topics", user.topic_users.length);
            Titanium.App.Properties.setString("userid", user.id);
            Titanium.App.Properties.setString("mmat", user.access_token);
            Titanium.App.Properties.setString("photo_url", user.photo_url);
            openFeed();
        };
        xhr.onerror = function() {
            alert("Login failed, please check credentials and try again.");
            var response = this.responseText;
            alert(response);
        };
        "android" == Ti.Platform.osname ? xhr.send(JSON.stringify(postData)) : xhr.send(postData);
    }
    function openFeed() {
        var args = {
            data: "test data",
            value: "other data"
        };
        $.win.close();
        $.win = null;
        var feed = Alloy.createController("settings", args);
        feed.getView().open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "loginWindow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "#FFF",
        navBarHidden: "false",
        orientationModes: [ Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT, Ti.UI.PORTRAIT ],
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.image = Ti.UI.createImageView({
        id: "image",
        image: "/images/Mindsmesh_logo_highres.png",
        top: "25"
    });
    $.__views.win.add($.__views.image);
    $.__views.message = Ti.UI.createLabel({
        id: "message",
        height: "30dp",
        width: "200dp",
        bottom: "150dp"
    });
    $.__views.win.add($.__views.message);
    $.__views.email = Ti.UI.createTextField({
        id: "email",
        width: "200",
        bottom: "130"
    });
    $.__views.win.add($.__views.email);
    $.__views.password = Ti.UI.createTextField({
        id: "password",
        width: "200",
        bottom: "75"
    });
    $.__views.win.add($.__views.password);
    $.__views.btnLogin = Ti.UI.createButton({
        title: "Login",
        id: "btnLogin",
        width: "200",
        bottom: "25"
    });
    $.__views.win.add($.__views.btnLogin);
    clickLogin ? $.__views.btnLogin.addEventListener("click", clickLogin) : __defers["$.__views.btnLogin!click!clickLogin"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.email.value = "james@uncc.edu";
    $.password.value = "easy123";
    __defers["$.__views.btnLogin!click!clickLogin"] && $.__views.btnLogin.addEventListener("click", clickLogin);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;