function Controller() {
    function goLogin() {
        openWindow("loginWindow");
    }
    function goSettings() {
        openWindow("settings");
    }
    function openWindow(windowName) {
        var args = {
            data: "test data",
            value: "other data"
        };
        $.indexWindow.close();
        $.indexWindow = null;
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
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "indexWindow"
    });
    $.__views.indexWindow && $.addTopLevelView($.__views.indexWindow);
    $.__views.mainView = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        top: 0,
        layout: "vertical",
        id: "mainView"
    });
    $.__views.indexWindow.add($.__views.mainView);
    $.__views.__alloyId48 = Ti.UI.createButton({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        title: "Login",
        id: "__alloyId48"
    });
    $.__views.mainView.add($.__views.__alloyId48);
    goLogin ? $.__views.__alloyId48.addEventListener("click", goLogin) : __defers["$.__views.__alloyId48!click!goLogin"] = true;
    $.__views.__alloyId49 = Ti.UI.createButton({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        title: "Feed",
        id: "__alloyId49"
    });
    $.__views.mainView.add($.__views.__alloyId49);
    goSettings ? $.__views.__alloyId49.addEventListener("click", goSettings) : __defers["$.__views.__alloyId49!click!goSettings"] = true;
    $.__views.image = Ti.UI.createImageView({
        top: "0dp",
        id: "image",
        image: "/images/Mindsmesh_logo_highres.png"
    });
    $.__views.mainView.add($.__views.image);
    $.__views.__alloyId50 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        backgroundColor: "red",
        textAlign: "center",
        bottom: "0dp",
        text: "Welcome to EDU Mesh",
        id: "__alloyId50"
    });
    $.__views.indexWindow.add($.__views.__alloyId50);
    $.__views.btnNext = Ti.UI.createButton({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        textAlign: "center",
        bottom: "0dp",
        right: "0dp",
        title: "Next",
        id: "btnNext"
    });
    $.__views.indexWindow.add($.__views.btnNext);
    goSettings ? $.__views.btnNext.addEventListener("click", goSettings) : __defers["$.__views.btnNext!click!goSettings"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.indexWindow.open();
    __defers["$.__views.__alloyId48!click!goLogin"] && $.__views.__alloyId48.addEventListener("click", goLogin);
    __defers["$.__views.__alloyId49!click!goSettings"] && $.__views.__alloyId49.addEventListener("click", goSettings);
    __defers["$.__views.btnNext!click!goSettings"] && $.__views.btnNext.addEventListener("click", goSettings);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;