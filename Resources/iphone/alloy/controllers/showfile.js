function Controller() {
    function goBackToPost() {
        $.showfile.close();
        $.showfile = null;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "showfile";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.showfile = Ti.UI.createWindow({
        backgroundColor: "#FFF",
        id: "showfile"
    });
    $.__views.showfile && $.addTopLevelView($.__views.showfile);
    $.__views.mainWebView = Ti.UI.createWebView({
        id: "mainWebView",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        backgroundColor: "#dddddd"
    });
    $.__views.showfile.add($.__views.mainWebView);
    $.__views.mainFileLabel = Ti.UI.createLabel({
        id: "mainFileLabel",
        visible: "false"
    });
    $.__views.showfile.add($.__views.mainFileLabel);
    $.__views.backBtn = Ti.UI.createButton({
        title: "back",
        id: "backBtn",
        left: "0",
        bottom: "0"
    });
    $.__views.showfile.add($.__views.backBtn);
    goBackToPost ? $.__views.backBtn.addEventListener("click", goBackToPost) : __defers["$.__views.backBtn!click!goBackToPost"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.mainWebView.url = args.value;
    $.mainFileLabel.text = args.value;
    __defers["$.__views.backBtn!click!goBackToPost"] && $.__views.backBtn.addEventListener("click", goBackToPost);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;