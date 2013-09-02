function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "showpost";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.showpost = Ti.UI.createView({
        layout: "vertical",
        id: "showpost"
    });
    $.__views.showpost && $.addTopLevelView($.__views.showpost);
    $.__views.commentLabel = Ti.UI.createLabel({
        id: "commentLabel"
    });
    $.__views.showpost.add($.__views.commentLabel);
    $.__views.mainAttachmentImage = Ti.UI.createImageView({
        id: "mainAttachmentImage"
    });
    $.__views.showpost.add($.__views.mainAttachmentImage);
    $.__views.userImage = Ti.UI.createImageView({
        id: "userImage"
    });
    $.__views.showpost.add($.__views.userImage);
    $.__views.dateLabel = Ti.UI.createLabel({
        id: "dateLabel"
    });
    $.__views.showpost.add($.__views.dateLabel);
    $.__views.replyTable = Ti.UI.createTableView({
        id: "replyTable",
        visible: "false"
    });
    $.__views.showpost.add($.__views.replyTable);
    handleClick ? $.__views.replyTable.addEventListener("click", handleClick) : __defers["$.__views.replyTable!click!handleClick"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    $.commentLabel.text = "";
    $.dateLabel.text = "";
    __defers["$.__views.replyTable!click!handleClick"] && $.__views.replyTable.addEventListener("click", handleClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;