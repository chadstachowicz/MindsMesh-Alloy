function Controller() {
    function GetAttachmentExtention(filename) {
        var filesplit = [];
        var f = "" + filename;
        filesplit = f.split(".");
        if (2 == filesplit.length) return filesplit[1];
        return "";
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "tableViewRow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.row = Ti.UI.createTableViewRow({
        id: "row"
    });
    $.__views.row && $.addTopLevelView($.__views.row);
    $.__views.__alloyId42 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        backgroundColor: "#ffffff",
        layout: "vertical",
        top: "20",
        id: "__alloyId42"
    });
    $.__views.row.add($.__views.__alloyId42);
    $.__views.__alloyId43 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        layout: "horizontal",
        id: "__alloyId43"
    });
    $.__views.__alloyId42.add($.__views.__alloyId43);
    $.__views.thumbImage = Ti.UI.createImageView({
        height: 40,
        width: 40,
        id: "thumbImage"
    });
    $.__views.__alloyId43.add($.__views.thumbImage);
    $.__views.__alloyId44 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        backgroundColor: "#ffffff",
        layout: "vertical",
        id: "__alloyId44"
    });
    $.__views.__alloyId43.add($.__views.__alloyId44);
    $.__views.nameLabel = Ti.UI.createLabel({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        textAlign: "left",
        left: 10,
        id: "nameLabel"
    });
    $.__views.__alloyId44.add($.__views.nameLabel);
    $.__views.dateLabel = Ti.UI.createLabel({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        textAlign: "left",
        left: 10,
        id: "dateLabel"
    });
    $.__views.__alloyId44.add($.__views.dateLabel);
    $.__views.textLabel = Ti.UI.createLabel({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        textAlign: "left",
        left: 10,
        id: "textLabel"
    });
    $.__views.__alloyId42.add($.__views.textLabel);
    $.__views.postAttachmentImage = Ti.UI.createImageView({
        height: 120,
        width: 160,
        id: "postAttachmentImage"
    });
    $.__views.__alloyId42.add($.__views.postAttachmentImage);
    $.__views.rowFooterView = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        backgroundColor: "#eeeeee",
        layout: "horizontal",
        id: "rowFooterView"
    });
    $.__views.__alloyId42.add($.__views.rowFooterView);
    $.__views.paperclipImage = Ti.UI.createImageView({
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        left: 20,
        image: "/images/paperclip_black_24.png",
        id: "paperclipImage"
    });
    $.__views.rowFooterView.add($.__views.paperclipImage);
    $.__views.commentCountLabel = Ti.UI.createLabel({
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        left: 200,
        id: "commentCountLabel"
    });
    $.__views.rowFooterView.add($.__views.commentCountLabel);
    $.__views.commentImage = Ti.UI.createImageView({
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        left: 10,
        image: "/images/comment_32.png",
        id: "commentImage"
    });
    $.__views.rowFooterView.add($.__views.commentImage);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.textLabel.text = args.text + "this is the end of long text";
    $.nameLabel.text = args.user.name;
    $.dateLabel.text = formatDate(args.created_at);
    $.thumbImage.image = args.user.photo_url;
    $.row.post_id = args.id;
    $.commentCountLabel.text = args.replies_count;
    $.row.data = args;
    if (args.post_attachments.length > 0) {
        var filetype = GetAttachmentExtention(args.post_attachments[0].name);
        $.postAttachmentImage.image = "png" == filetype ? args.post_attachments[0].url : args.post_attachments[0].ext_path;
    } else {
        $.postAttachmentImage.width = 0;
        $.postAttachmentImage.height = 0;
        $.postAttachmentImage.visible = false;
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;