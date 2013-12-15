function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "replyTableViewRow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.replyRow = Ti.UI.createTableViewRow({
        id: "replyRow"
    });
    $.__views.replyRow && $.addTopLevelView($.__views.replyRow);
    $.__views.__alloyId81 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        backgroundColor: "white",
        layout: "vertical",
        top: "20",
        left: "10",
        right: "10",
        id: "__alloyId81"
    });
    $.__views.replyRow.add($.__views.__alloyId81);
    $.__views.__alloyId82 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        backgroundColor: "#eeeeee",
        layout: "horizontal",
        id: "__alloyId82"
    });
    $.__views.__alloyId81.add($.__views.__alloyId82);
    $.__views.thumbImage = Ti.UI.createImageView({
        height: "40",
        width: "40",
        id: "thumbImage"
    });
    $.__views.__alloyId82.add($.__views.thumbImage);
    $.__views.__alloyId83 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        backgroundColor: "#eeeeee",
        layout: "vertical",
        id: "__alloyId83"
    });
    $.__views.__alloyId82.add($.__views.__alloyId83);
    $.__views.nameLabel = Ti.UI.createLabel({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        textAlign: "left",
        left: 10,
        id: "nameLabel"
    });
    $.__views.__alloyId83.add($.__views.nameLabel);
    $.__views.dateLabel = Ti.UI.createLabel({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        textAlign: "left",
        left: 10,
        id: "dateLabel"
    });
    $.__views.__alloyId83.add($.__views.dateLabel);
    $.__views.textLabel = Ti.UI.createLabel({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        textAlign: "left",
        left: 10,
        id: "textLabel"
    });
    $.__views.__alloyId81.add($.__views.textLabel);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.textLabel.text = args.text;
    $.nameLabel.text = args.user.name;
    $.dateLabel.text = formatDate(args.created_at);
    $.thumbImage.image = args.user.photo_url;
    $.replyRow.post_id = args.id;
    $.replyRow.data = args;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;