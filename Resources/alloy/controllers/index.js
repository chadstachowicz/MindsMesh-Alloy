function Controller() {
    function goLogin() {
        $.indexWindow.close();
        $.indexWindow = null;
        openWindow("loginWindow");
    }
    function goSideMenu() {
        var external = Alloy.createController("externalView", args);
        external.getView().open();
        openWindow("externalView");
    }
    function goFeed() {
        Titanium.App.Properties.hasProperty("mmat") ? openWindow("feed") : openWindow("loginWindow");
    }
    function goSideView() {
        openWindow("slideview");
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
    $.__views.btnLogin = Ti.UI.createButton({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        title: "Login",
        id: "btnLogin"
    });
    $.__views.mainView.add($.__views.btnLogin);
    goLogin ? $.__views.btnLogin.addEventListener("click", goLogin) : __defers["$.__views.btnLogin!click!goLogin"] = true;
    $.__views.btnFeed = Ti.UI.createButton({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        title: "Feed",
        id: "btnFeed"
    });
    $.__views.mainView.add($.__views.btnFeed);
    goFeed ? $.__views.btnFeed.addEventListener("click", goFeed) : __defers["$.__views.btnFeed!click!goFeed"] = true;
    $.__views.btnSideMenu = Ti.UI.createButton({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        title: "SideMenu",
        id: "btnSideMenu"
    });
    $.__views.mainView.add($.__views.btnSideMenu);
    goSideMenu ? $.__views.btnSideMenu.addEventListener("click", goSideMenu) : __defers["$.__views.btnSideMenu!click!goSideMenu"] = true;
    $.__views.btnSideView = Ti.UI.createButton({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        title: "SideView",
        id: "btnSideView"
    });
    $.__views.mainView.add($.__views.btnSideView);
    goSideView ? $.__views.btnSideView.addEventListener("click", goSideView) : __defers["$.__views.btnSideView!click!goSideView"] = true;
    $.__views.image = Ti.UI.createImageView({
        top: "0dp",
        id: "image",
        image: "/images/Mindsmesh_logo_highres.png"
    });
    $.__views.mainView.add($.__views.image);
    $.__views.__alloyId32 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        backgroundColor: "red",
        textAlign: "center",
        bottom: "0dp",
        text: "Welcome to EDU Mesh",
        id: "__alloyId32"
    });
    $.__views.indexWindow.add($.__views.__alloyId32);
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
    goFeed ? $.__views.btnNext.addEventListener("click", goFeed) : __defers["$.__views.btnNext!click!goFeed"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    alert("index opened");
    $.indexWindow.open();
    __defers["$.__views.btnLogin!click!goLogin"] && $.__views.btnLogin.addEventListener("click", goLogin);
    __defers["$.__views.btnFeed!click!goFeed"] && $.__views.btnFeed.addEventListener("click", goFeed);
    __defers["$.__views.btnSideMenu!click!goSideMenu"] && $.__views.btnSideMenu.addEventListener("click", goSideMenu);
    __defers["$.__views.btnSideView!click!goSideView"] && $.__views.btnSideView.addEventListener("click", goSideView);
    __defers["$.__views.btnNext!click!goFeed"] && $.__views.btnNext.addEventListener("click", goFeed);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;