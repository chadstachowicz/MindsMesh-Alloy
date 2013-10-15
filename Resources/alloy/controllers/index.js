function Controller() {
    function goLogin() {
        openWindow("loginWindow");
    }
    function goSettings() {
        openWindow("settings");
    }
    function openWindow(windowName) {
        $.indexWindow.close();
        $.indexWindow = null;
        var view1 = Alloy.createController(windowName, {});
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
        backgroundColor: "#fff",
        navBarHidden: "false",
        orientationModes: [ Ti.UI.PORTRAIT ],
        id: "indexWindow"
    });
    $.__views.indexWindow && $.addTopLevelView($.__views.indexWindow);
    $.__views.image = Ti.UI.createImageView({
        id: "image",
        top: "0",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        image: "/images/Mindsmesh_logo_highres.png"
    });
    $.__views.indexWindow.add($.__views.image);
    $.__views.__alloyId52 = Ti.UI.createLabel({
        text: "Welcome to EDU Mesh",
        top: "150",
        color: "black",
        id: "__alloyId52"
    });
    $.__views.indexWindow.add($.__views.__alloyId52);
    $.__views.__alloyId53 = Ti.UI.createButton({
        title: "Login",
        bottom: "45",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "__alloyId53"
    });
    $.__views.indexWindow.add($.__views.__alloyId53);
    goLogin ? $.__views.__alloyId53.addEventListener("click", goLogin) : __defers["$.__views.__alloyId53!click!goLogin"] = true;
    $.__views.__alloyId54 = Ti.UI.createButton({
        title: "Feed",
        bottom: "0",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "__alloyId54"
    });
    $.__views.indexWindow.add($.__views.__alloyId54);
    goSettings ? $.__views.__alloyId54.addEventListener("click", goSettings) : __defers["$.__views.__alloyId54!click!goSettings"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.indexWindow.open();
    __defers["$.__views.__alloyId53!click!goLogin"] && $.__views.__alloyId53.addEventListener("click", goLogin);
    __defers["$.__views.__alloyId54!click!goSettings"] && $.__views.__alloyId54.addEventListener("click", goSettings);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;