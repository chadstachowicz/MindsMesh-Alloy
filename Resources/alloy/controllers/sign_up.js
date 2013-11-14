function Controller() {
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
    $.__views.__alloyId69 = Ti.UI.createView({
        keyb: true,
        height: "1dp",
        width: "300dp",
        backgroundColor: "#E5E4E2",
        id: "__alloyId69"
    });
    $.__views.loginView.add($.__views.__alloyId69);
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
    $.__views.__alloyId70 = Ti.UI.createView({
        keyb: true,
        height: "1dp",
        width: "300dp",
        backgroundColor: "#E5E4E2",
        id: "__alloyId70"
    });
    $.__views.loginView.add($.__views.__alloyId70);
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
    $.__views.__alloyId71 = Ti.UI.createView({
        keyb: true,
        height: "1dp",
        width: "300dp",
        backgroundColor: "#E5E4E2",
        id: "__alloyId71"
    });
    $.__views.loginView.add($.__views.__alloyId71);
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
    $.__views.__alloyId72 = Ti.UI.createButton({
        height: "40dp",
        width: "300dp",
        color: "#fffff",
        font: "Arial",
        borderRadius: 2,
        backgroundColor: "#f99965",
        top: "5dp",
        bottom: "17dp",
        id: "__alloyId72"
    });
    $.__views.mainView.add($.__views.__alloyId72);
    finSignup ? $.__views.__alloyId72.addEventListener("click", finSignup) : __defers["$.__views.__alloyId72!click!finSignup"] = true;
    $.__views.__alloyId73 = Ti.UI.createLabel({
        text: "Finish Signup",
        color: "white",
        id: "__alloyId73"
    });
    $.__views.__alloyId72.add($.__views.__alloyId73);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        right: "5%",
        id: "activityIndicator"
    });
    $.__views.__alloyId72.add($.__views.activityIndicator);
    $.__views.__alloyId74 = Ti.UI.createButton({
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
        id: "__alloyId74"
    });
    $.__views.signupWindow.add($.__views.__alloyId74);
    closeWindow ? $.__views.__alloyId74.addEventListener("click", closeWindow) : __defers["$.__views.__alloyId74!click!closeWindow"] = true;
    $.__views.__alloyId75 = Ti.UI.createLabel({
        font: {
            color: "#fffff",
            size: 9
        },
        text: "Back to Login",
        color: "white",
        id: "__alloyId75"
    });
    $.__views.__alloyId74.add($.__views.__alloyId75);
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.__alloyId72!click!finSignup"] && $.__views.__alloyId72.addEventListener("click", finSignup);
    __defers["$.__views.__alloyId74!click!closeWindow"] && $.__views.__alloyId74.addEventListener("click", closeWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;