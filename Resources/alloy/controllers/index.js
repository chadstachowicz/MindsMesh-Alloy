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
        view1.orientationModes = [ Titanium.UI.PORTRAIT ];
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
    $.__views.image = Ti.UI.createImageView({
        id: "image",
        top: "0",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        image: "/images/Mindsmesh_logo_highres.png"
    });
    $.__views.indexWindow.add($.__views.image);
    $.__views.__alloyId49 = Ti.UI.createLabel({
        text: "Welcome to EDU Mesh",
        top: "130",
        id: "__alloyId49"
    });
    $.__views.indexWindow.add($.__views.__alloyId49);
    $.__views.btnNext = Ti.UI.createButton({
        title: "Next",
        id: "btnNext",
        bottom: "90",
        right: "0",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE
    });
    $.__views.indexWindow.add($.__views.btnNext);
    goSettings ? $.__views.btnNext.addEventListener("click", goSettings) : __defers["$.__views.btnNext!click!goSettings"] = true;
    $.__views.__alloyId50 = Ti.UI.createButton({
        title: "Login",
        bottom: "45",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "__alloyId50"
    });
    $.__views.indexWindow.add($.__views.__alloyId50);
    goLogin ? $.__views.__alloyId50.addEventListener("click", goLogin) : __defers["$.__views.__alloyId50!click!goLogin"] = true;
    $.__views.__alloyId51 = Ti.UI.createButton({
        title: "Feed",
        bottom: "0",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "__alloyId51"
    });
    $.__views.indexWindow.add($.__views.__alloyId51);
    goSettings ? $.__views.__alloyId51.addEventListener("click", goSettings) : __defers["$.__views.__alloyId51!click!goSettings"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.indexWindow.open();
    __defers["$.__views.btnNext!click!goSettings"] && $.__views.btnNext.addEventListener("click", goSettings);
    __defers["$.__views.__alloyId50!click!goLogin"] && $.__views.__alloyId50.addEventListener("click", goLogin);
    __defers["$.__views.__alloyId51!click!goSettings"] && $.__views.__alloyId51.addEventListener("click", goSettings);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;