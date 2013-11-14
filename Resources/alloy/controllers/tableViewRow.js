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
    $.__views.__alloyId77 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        backgroundColor: "white",
        layout: "vertical",
        bottom: "10",
        left: "10",
        right: "10",
        id: "__alloyId77"
    });
    $.__views.row.add($.__views.__alloyId77);
    $.__views.__alloyId78 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        backgroundColor: "#eeeeee",
        layout: "horizontal",
        id: "__alloyId78"
    });
    $.__views.__alloyId77.add($.__views.__alloyId78);
    $.__views.thumbImage = Ti.UI.createImageView({
        height: 40,
        width: 40,
        id: "thumbImage"
    });
    $.__views.__alloyId78.add($.__views.thumbImage);
    $.__views.__alloyId79 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        backgroundColor: "#eeeeee",
        layout: "vertical",
        id: "__alloyId79"
    });
    $.__views.__alloyId78.add($.__views.__alloyId79);
    $.__views.nameLabel = Ti.UI.createLabel({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        textAlign: "left",
        left: 10,
        font: {
            fontSize: 17
        },
        id: "nameLabel"
    });
    $.__views.__alloyId79.add($.__views.nameLabel);
    $.__views.dateLabel = Ti.UI.createLabel({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        textAlign: "left",
        left: 10,
        font: {
            fontSize: 10
        },
        id: "dateLabel"
    });
    $.__views.__alloyId79.add($.__views.dateLabel);
    $.__views.textLabel = Ti.UI.createLabel({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        textAlign: "left",
        left: 5,
        font: {
            fontSize: 20
        },
        bottom: 5,
        top: 5,
        id: "textLabel"
    });
    $.__views.__alloyId77.add($.__views.textLabel);
    $.__views.extLabel = Ti.UI.createLabel({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        textAlign: "left",
        left: 5,
        font: {
            fontSize: 20
        },
        bottom: 5,
        top: 5,
        id: "extLabel"
    });
    $.__views.__alloyId77.add($.__views.extLabel);
    $.__views.postAttachmentImage = Ti.UI.createImageView({
        id: "postAttachmentImage"
    });
    $.__views.__alloyId77.add($.__views.postAttachmentImage);
    $.__views.rowFooterView = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        backgroundColor: "#eeeeee",
        id: "rowFooterView"
    });
    $.__views.__alloyId77.add($.__views.rowFooterView);
    $.__views.extAttachmentImage = Ti.UI.createImageView({
        id: "extAttachmentImage",
        left: "0",
        visible: "false",
        bottom: "2"
    });
    $.__views.rowFooterView.add($.__views.extAttachmentImage);
    $.__views.commentImage = Ti.UI.createImageView({
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        image: "/images/comment_32.png",
        id: "commentImage",
        right: "5"
    });
    $.__views.rowFooterView.add($.__views.commentImage);
    $.__views.commentCountLabel = Ti.UI.createLabel({
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        id: "commentCountLabel",
        color: "white",
        right: "15",
        bottom: "10"
    });
    $.__views.rowFooterView.add($.__views.commentCountLabel);
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
        var mainImageWidth = 0;
        var mainImageHeight = 0;
        if (hasMainAttachment) {
            mainImageWidth = 200;
            mainImageHeight = Ti.UI.SIZE;
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