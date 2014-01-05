function Controller() {
    function goBackToPost() {
        $.showvideo.close();
        $.showvideo = null;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "showvideo";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.showvideo = Ti.UI.createWindow({
        backgroundColor: "#fff",
        orientationModes: [ Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT, Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT ],
        id: "showvideo",
        title: "Video View Demo"
    });
    $.__views.showvideo && $.addTopLevelView($.__views.showvideo);
    $.__views.videoPlayer = Ti.Media.createVideoPlayer({
        id: "videoPlayer",
        ns: Ti.Media,
        top: "2",
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        backgroundColor: "blue",
        autoplay: "true"
    });
    $.__views.showvideo.add($.__views.videoPlayer);
    $.__views.mainImageLabel = Ti.UI.createLabel({
        id: "mainImageLabel"
    });
    $.__views.showvideo.add($.__views.mainImageLabel);
    $.__views.backBtn = Ti.UI.createButton({
        title: "back",
        id: "backBtn",
        left: "0",
        top: "0"
    });
    $.__views.showvideo.add($.__views.backBtn);
    goBackToPost ? $.__views.backBtn.addEventListener("click", goBackToPost) : __defers["$.__views.backBtn!click!goBackToPost"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.videoPlayer.url = args.value;
    $.mainImageLabel.text = args.value;
    __defers["$.__views.backBtn!click!goBackToPost"] && $.__views.backBtn.addEventListener("click", goBackToPost);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;