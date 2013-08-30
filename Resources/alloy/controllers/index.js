function Controller() {
    function goLogin() {
        openWindow("loginWindow");
    }
    function goExternalView() {
        openWindow("externalView");
    }
    function goTableView() {
        openWindow("feedTableview");
    }
    function goSideView2() {
        openWindow("index2");
    }
    function goFeed() {
        Titanium.App.Properties.hasProperty("mmat") ? openWindow("index2") : openWindow("loginWindow");
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
    $.__views.__alloyId32 = Ti.UI.createButton({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        title: "Login",
        id: "__alloyId32"
    });
    $.__views.mainView.add($.__views.__alloyId32);
    goLogin ? $.__views.__alloyId32.addEventListener("click", goLogin) : __defers["$.__views.__alloyId32!click!goLogin"] = true;
    $.__views.__alloyId33 = Ti.UI.createButton({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        title: "Feed",
        id: "__alloyId33"
    });
    $.__views.mainView.add($.__views.__alloyId33);
    goFeed ? $.__views.__alloyId33.addEventListener("click", goFeed) : __defers["$.__views.__alloyId33!click!goFeed"] = true;
    $.__views.__alloyId34 = Ti.UI.createButton({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        title: "ExternalView",
        id: "__alloyId34"
    });
    $.__views.mainView.add($.__views.__alloyId34);
    goExternalView ? $.__views.__alloyId34.addEventListener("click", goExternalView) : __defers["$.__views.__alloyId34!click!goExternalView"] = true;
    $.__views.__alloyId35 = Ti.UI.createButton({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        title: "SideView",
        id: "__alloyId35"
    });
    $.__views.mainView.add($.__views.__alloyId35);
    goSideView ? $.__views.__alloyId35.addEventListener("click", goSideView) : __defers["$.__views.__alloyId35!click!goSideView"] = true;
    $.__views.__alloyId36 = Ti.UI.createButton({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        title: "Settings",
        id: "__alloyId36"
    });
    $.__views.mainView.add($.__views.__alloyId36);
    goSideView2 ? $.__views.__alloyId36.addEventListener("click", goSideView2) : __defers["$.__views.__alloyId36!click!goSideView2"] = true;
    $.__views.__alloyId37 = Ti.UI.createButton({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        title: "tableview",
        id: "__alloyId37"
    });
    $.__views.mainView.add($.__views.__alloyId37);
    goTableView ? $.__views.__alloyId37.addEventListener("click", goTableView) : __defers["$.__views.__alloyId37!click!goTableView"] = true;
    $.__views.image = Ti.UI.createImageView({
        top: "0dp",
        id: "image",
        image: "/images/Mindsmesh_logo_highres.png"
    });
    $.__views.mainView.add($.__views.image);
    $.__views.__alloyId38 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        backgroundColor: "red",
        textAlign: "center",
        bottom: "0dp",
        text: "Welcome to EDU Mesh",
        id: "__alloyId38"
    });
    $.__views.indexWindow.add($.__views.__alloyId38);
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
    $.indexWindow.open();
    __defers["$.__views.__alloyId32!click!goLogin"] && $.__views.__alloyId32.addEventListener("click", goLogin);
    __defers["$.__views.__alloyId33!click!goFeed"] && $.__views.__alloyId33.addEventListener("click", goFeed);
    __defers["$.__views.__alloyId34!click!goExternalView"] && $.__views.__alloyId34.addEventListener("click", goExternalView);
    __defers["$.__views.__alloyId35!click!goSideView"] && $.__views.__alloyId35.addEventListener("click", goSideView);
    __defers["$.__views.__alloyId36!click!goSideView2"] && $.__views.__alloyId36.addEventListener("click", goSideView2);
    __defers["$.__views.__alloyId37!click!goTableView"] && $.__views.__alloyId37.addEventListener("click", goTableView);
    __defers["$.__views.btnNext!click!goFeed"] && $.__views.btnNext.addEventListener("click", goFeed);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;