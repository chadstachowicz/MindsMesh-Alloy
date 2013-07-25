function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "#ecfaff",
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.image = Ti.UI.createImageView({
        id: "image",
        image: "/images/Mindsmesh_logo_highres.png",
        top: "25"
    });
    $.__views.win.add($.__views.image);
    $.__views.signup = Ti.UI.createButton({
        id: "signup",
        title: "Sign Up",
        height: "30dp",
        width: "200",
        bottom: "70dp"
    });
    $.__views.win.add($.__views.signup);
    $.__views.login = Ti.UI.createButton({
        id: "login",
        title: "Login",
        height: "30dp",
        width: "200",
        bottom: "30dp"
    });
    $.__views.win.add($.__views.login);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var fb = require("facebook");
    fb.appid = "391884850858794";
    fb.permissions = [ "email" ];
    fb.forceDialogAuth = true;
    $.win.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;