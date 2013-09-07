function Controller() {
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
    $.__views.__alloyId71 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        backgroundColor: "#ffffff",
        layout: "vertical",
        top: "20",
        left: "10",
        right: "10",
        id: "__alloyId71"
    });
    $.__views.row.add($.__views.__alloyId71);
    $.__views.__alloyId72 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        backgroundColor: "#eeeeee",
        layout: "horizontal",
        id: "__alloyId72"
    });
    $.__views.__alloyId71.add($.__views.__alloyId72);
    $.__views.thumbImage = Ti.UI.createImageView({
        height: 40,
        width: 40,
        id: "thumbImage"
    });
    $.__views.__alloyId72.add($.__views.thumbImage);
    $.__views.__alloyId73 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        backgroundColor: "#ffffff",
        layout: "vertical",
        id: "__alloyId73"
    });
    $.__views.__alloyId72.add($.__views.__alloyId73);
    $.__views.nameLabel = Ti.UI.createLabel({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        textAlign: "left",
        left: 10,
        id: "nameLabel"
    });
    $.__views.__alloyId73.add($.__views.nameLabel);
    $.__views.dateLabel = Ti.UI.createLabel({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        textAlign: "left",
        left: 10,
        id: "dateLabel"
    });
    $.__views.__alloyId73.add($.__views.dateLabel);
    $.__views.textLabel = Ti.UI.createLabel({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        textAlign: "left",
        left: 10,
        id: "textLabel"
    });
    $.__views.__alloyId71.add($.__views.textLabel);
    $.__views.extLabel = Ti.UI.createLabel({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        textAlign: "left",
        left: 10,
        id: "extLabel"
    });
    $.__views.__alloyId71.add($.__views.extLabel);
    $.__views.postAttachmentImage = Ti.UI.createImageView({
        height: 120,
        width: 160,
        id: "postAttachmentImage",
        visible: "false"
    });
    $.__views.__alloyId71.add($.__views.postAttachmentImage);
    $.__views.rowFooterView = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        backgroundColor: "#eeeeee",
        id: "rowFooterView"
    });
    $.__views.__alloyId71.add($.__views.rowFooterView);
    $.__views.paperClipImage = Ti.UI.createImageView({
        image: "/images/paperclip_black_24.png",
        id: "paperClipImage",
        visible: "false",
        left: "5"
    });
    $.__views.rowFooterView.add($.__views.paperClipImage);
    $.__views.extAttachmentImage = Ti.UI.createImageView({
        id: "extAttachmentImage",
        left: "35",
        visible: "false"
    });
    $.__views.rowFooterView.add($.__views.extAttachmentImage);
    $.__views.commentCountLabel = Ti.UI.createLabel({
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        id: "commentCountLabel",
        right: "40"
    });
    $.__views.rowFooterView.add($.__views.commentCountLabel);
    $.__views.commentImage = Ti.UI.createImageView({
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        image: "/images/comment_32.png",
        id: "commentImage",
        right: "5"
    });
    $.__views.rowFooterView.add($.__views.commentImage);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var imagepath = "";
    var extAttachmentPath = "";
    var hasExtAttachment = false;
    var hasMainAttachment = false;
    var args = arguments[0] || {};
    $.textLabel.text = args.text;
    $.nameLabel.text = args.user.name;
    $.dateLabel.text = formatDate(args.created_at);
    $.thumbImage.image = args.user.photo_url;
    $.row.post_id = args.id;
    $.commentCountLabel.text = args.replies_count;
    $.row.data = args;
    if (args.post_attachments.length > 0) {
        var filetype = "" + GetExtention(args.post_attachments[0].name);
        if ("png" == filetype || "jpg" == filetype) {
            imagepath = args.post_attachments[0].url;
            hasMainAttachment = true;
        } else if ("mov" == filetype) {
            var url = args.post_attachments[0].url;
            var pieces = url.substring(0, url.length - 8);
            imagepath = pieces + "frame_0000.png";
            hasMainAttachment = true;
        } else {
            extAttachmentPath = args.post_attachments[0].ext_path;
            hasExtAttachment = true;
        }
        $.postAttachmentImage.image = imagepath;
        $.extAttachmentImage.image = extAttachmentPath;
        $.postAttachmentImage.visible = hasMainAttachment;
        $.extAttachmentImage.visible = hasExtAttachment;
        $.paperClipImage.visible = hasExtAttachment;
        var mainImageWidth = 0;
        var mainImageHeight = 0;
        if (hasMainAttachment) {
            mainImageWidth = 100;
            mainImageHeight = 100;
        }
        $.postAttachmentImage.height = mainImageHeight;
        $.postAttachmentImage.width = mainImageWidth;
    } else {
        $.postAttachmentImage.width = 0;
        $.postAttachmentImage.height = 0;
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;