function Controller() {
    function goBackToPost() {
        $.showimage.close();
        $.showimage = null;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "showimage";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.showimage = Ti.UI.createWindow({
        backgroundColor: "#FFF",
        id: "showimage"
    });
    $.__views.showimage && $.addTopLevelView($.__views.showimage);
    $.__views.mainImage = Ti.UI.createImageView({
        id: "mainImage",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        backgroundColor: "#dddddd"
    });
    $.__views.showimage.add($.__views.mainImage);
    $.__views.mainImageLabel = Ti.UI.createLabel({
        id: "mainImageLabel"
    });
    $.__views.showimage.add($.__views.mainImageLabel);
    $.__views.backBtn = Ti.UI.createButton({
        title: "back",
        id: "backBtn",
        left: "0",
        bottom: "0"
    });
    $.__views.showimage.add($.__views.backBtn);
    goBackToPost ? $.__views.backBtn.addEventListener("click", goBackToPost) : __defers["$.__views.backBtn!click!goBackToPost"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.mainImageLabel.text = args.value;
    $.mainImage.image = args.value;
    __defers["$.__views.backBtn!click!goBackToPost"] && $.__views.backBtn.addEventListener("click", goBackToPost);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;