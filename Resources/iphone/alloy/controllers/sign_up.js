function Controller() {
    function finSignup() {
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.edu$/;
        if (false == reg.test($.email.value)) alert("This is not a valid educational email."); else if ($.password.value != $.confirm_password.value && null != $.password.value && "" != $.password.value) alert("Passwords don't match."); else if (4 > $.name.value.length) alert("Please enter your first and last name."); else {
            $.activityIndicator.show();
            var postData = {
                name: $.name.value,
                email: $.email.value,
                password: $.password.value,
                password_confirmation: $.confirm_password.value
            };
            xhr = postCreateUser(postData);
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
                Titanium.App.Properties.setString("email", $.email.value);
                Titanium.App.Properties.setString("num_entities", user.entity_users.length);
                Titanium.App.Properties.setString("num_topics", user.topic_users.length);
                Titanium.App.Properties.setString("userid", user.id);
                Titanium.App.Properties.setString("mmat", user.access_token);
                Titanium.App.Properties.setString("photo_url", user.photo_url);
                Ti.UI.createWindow({
                    width: Titanium.Platform.displayCaps.platformWidth,
                    backgroundColor: "#e2e7ed"
                });
                $.activityIndicator.hide();
                alert("A confirmation email has been sent to you, if you do not see it please check your spam folder.");
                $.signupWindow.close();
                openWindow("finish_verification");
            };
            xhr.onerror = function() {
                this.responseText;
                alert("This email is already taken, if it is yours please go back to the login screen to continue.");
                $.activityIndicator.hide();
            };
            xhr.send(postData);
        }
    }
    function closeWindow() {
        $.signupWindow.animate({
            top: "100%",
            duration: 300
        });
        setTimeout(function() {
            $.signupWindow.close();
        }, 300);
    }
    function openWindow(windowName, args) {
        var view1 = Alloy.createController(windowName, args);
        view1.getView().open();
        Ti.API.info(windowName);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "sign_up";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.signupWindow = Ti.UI.createWindow({
        backgroundColor: "#FFF",
        id: "signupWindow",
        top: "99%"
    });
    $.__views.signupWindow && $.addTopLevelView($.__views.signupWindow);
    $.__views.mainView = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        top: 0,
        layout: "vertical",
        id: "mainView",
        backgroundColor: "#ee7533"
    });
    $.__views.signupWindow.add($.__views.mainView);
    $.__views.image = Ti.UI.createImageView({
        id: "image",
        top: "8%",
        width: "80dp",
        height: "80dp",
        image: "/images/MindsMesh-NewLogo.png"
    });
    $.__views.mainView.add($.__views.image);
    $.__views.loginView = Ti.UI.createView({
        width: "300dp",
        height: "160dp",
        top: "4%",
        borderRadius: 3,
        keyb: true,
        layout: "vertical",
        id: "loginView",
        backgroundColor: "white"
    });
    $.__views.mainView.add($.__views.loginView);
    $.__views.name = Ti.UI.createTextField({
        keyb: true,
        id: "name",
        color: "#000000",
        top: "5dp",
        bottom: "5dp",
        left: "10dp",
        width: "250dp",
        height: "30dp",
        hintText: "Full Name"
    });
    $.__views.loginView.add($.__views.name);
    $.__views.__alloyId97 = Ti.UI.createView({
        keyb: true,
        height: "1dp",
        width: "300dp",
        backgroundColor: "#E5E4E2",
        id: "__alloyId97"
    });
    $.__views.loginView.add($.__views.__alloyId97);
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
    $.__views.__alloyId98 = Ti.UI.createView({
        keyb: true,
        height: "1dp",
        width: "300dp",
        backgroundColor: "#E5E4E2",
        id: "__alloyId98"
    });
    $.__views.loginView.add($.__views.__alloyId98);
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
    $.__views.__alloyId99 = Ti.UI.createView({
        keyb: true,
        height: "1dp",
        width: "300dp",
        backgroundColor: "#E5E4E2",
        id: "__alloyId99"
    });
    $.__views.loginView.add($.__views.__alloyId99);
    $.__views.confirm_password = Ti.UI.createTextField({
        keyb: true,
        passwordMask: true,
        id: "confirm_password",
        color: "#000000",
        top: "5dp",
        bottom: "5dp",
        left: "10dp",
        width: "250dp",
        height: "30dp",
        hintText: "Confirm Password"
    });
    $.__views.loginView.add($.__views.confirm_password);
    $.__views.__alloyId100 = Ti.UI.createButton({
        height: "40dp",
        width: "300dp",
        color: "#fffff",
        font: "Arial",
        borderRadius: 2,
        backgroundColor: "#f99965",
        top: "5dp",
        bottom: "17dp",
        id: "__alloyId100"
    });
    $.__views.mainView.add($.__views.__alloyId100);
    finSignup ? $.__views.__alloyId100.addEventListener("click", finSignup) : __defers["$.__views.__alloyId100!click!finSignup"] = true;
    $.__views.__alloyId101 = Ti.UI.createLabel({
        text: "Finish Signup",
        color: "white",
        id: "__alloyId101"
    });
    $.__views.__alloyId100.add($.__views.__alloyId101);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        right: "5%",
        id: "activityIndicator"
    });
    $.__views.__alloyId100.add($.__views.activityIndicator);
    $.__views.__alloyId102 = Ti.UI.createButton({
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
        id: "__alloyId102"
    });
    $.__views.signupWindow.add($.__views.__alloyId102);
    closeWindow ? $.__views.__alloyId102.addEventListener("click", closeWindow) : __defers["$.__views.__alloyId102!click!closeWindow"] = true;
    $.__views.__alloyId103 = Ti.UI.createLabel({
        font: {
            color: "#fffff",
            size: 9
        },
        text: "Back to Login",
        color: "white",
        id: "__alloyId103"
    });
    $.__views.__alloyId102.add($.__views.__alloyId103);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.signupWindow.addEventListener("open", function() {
        $.signupWindow.animate({
            top: 0,
            duration: 300
        });
    });
    $.signupWindow.addEventListener("click", function(e) {
        if (true != e.source.keyb) {
            $.name.blur();
            $.email.blur();
            $.password.blur();
            $.confirm_password.blur();
        }
    });
    __defers["$.__views.__alloyId100!click!finSignup"] && $.__views.__alloyId100.addEventListener("click", finSignup);
    __defers["$.__views.__alloyId102!click!closeWindow"] && $.__views.__alloyId102.addEventListener("click", closeWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;