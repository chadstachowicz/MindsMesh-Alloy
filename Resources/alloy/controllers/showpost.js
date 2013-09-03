function Controller() {
    function handleClick() {
        alert("handleClick");
    }
    function goBackToFeed() {
        $.showpost.close();
        $.showpost = null;
    }
    function backBtnClicked() {
        Ti.API.info("back button clicked");
        goBackToFeed();
    }
    function MainImageClick(_event) {
        Ti.API.info("main image clicked");
        var i = $.mainAttachmentImage.image;
        var args = {
            data: "test data",
            value: i
        };
        var view1 = Alloy.createController("showimage", args);
        view1.getView().open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "showpost";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.showpost = Ti.UI.createWindow({
        backgroundColor: "#FFF",
        id: "showpost"
    });
    $.__views.showpost && $.addTopLevelView($.__views.showpost);
    $.__views.__alloyId67 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId67"
    });
    $.__views.showpost.add($.__views.__alloyId67);
    $.__views.__alloyId68 = Ti.UI.createView({
        backgroundColor: "#eeeeee",
        height: Ti.UI.SIZE,
        id: "__alloyId68"
    });
    $.__views.__alloyId67.add($.__views.__alloyId68);
    $.__views.userImage = Ti.UI.createImageView({
        id: "userImage",
        left: "0",
        top: "0",
        width: "70",
        height: "70"
    });
    $.__views.__alloyId68.add($.__views.userImage);
    $.__views.nameLabel = Ti.UI.createLabel({
        left: "90",
        top: "0",
        id: "nameLabel"
    });
    $.__views.__alloyId68.add($.__views.nameLabel);
    $.__views.dateLabel = Ti.UI.createLabel({
        left: "90",
        top: "20",
        id: "dateLabel"
    });
    $.__views.__alloyId68.add($.__views.dateLabel);
    $.__views.commentLabel = Ti.UI.createLabel({
        id: "commentLabel",
        left: "5"
    });
    $.__views.__alloyId67.add($.__views.commentLabel);
    $.__views.attachmentCountLabel = Ti.UI.createLabel({
        id: "attachmentCountLabel"
    });
    $.__views.__alloyId67.add($.__views.attachmentCountLabel);
    $.__views.replyCountLabel = Ti.UI.createLabel({
        id: "replyCountLabel"
    });
    $.__views.__alloyId67.add($.__views.replyCountLabel);
    $.__views.mainAttachmentImage = Ti.UI.createImageView({
        id: "mainAttachmentImage"
    });
    $.__views.__alloyId67.add($.__views.mainAttachmentImage);
    MainImageClick ? $.__views.mainAttachmentImage.addEventListener("click", MainImageClick) : __defers["$.__views.mainAttachmentImage!click!MainImageClick"] = true;
    $.__views.extAttachmentImage = Ti.UI.createImageView({
        id: "extAttachmentImage"
    });
    $.__views.__alloyId67.add($.__views.extAttachmentImage);
    $.__views.replyTable = Ti.UI.createTableView({
        id: "replyTable",
        visible: "false"
    });
    $.__views.__alloyId67.add($.__views.replyTable);
    handleClick ? $.__views.replyTable.addEventListener("click", handleClick) : __defers["$.__views.replyTable!click!handleClick"] = true;
    $.__views.backBtn = Ti.UI.createButton({
        left: 0,
        bottom: 0,
        title: "back",
        id: "backBtn"
    });
    $.__views.showpost.add($.__views.backBtn);
    backBtnClicked ? $.__views.backBtn.addEventListener("click", backBtnClicked) : __defers["$.__views.backBtn!click!backBtnClicked"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.userImage.image = args.user.photo_url;
    $.nameLabel.text = args.user.name;
    $.dateLabel.text = args.updated_at;
    $.commentLabel.text = args.text;
    $.replyCountLabel.text = args.replies_count;
    $.attachmentCountLabel.text = args.post_attachments.length;
    var imagepath = "";
    var extAttachmentPath = "";
    var hasExtAttachment = false;
    var hasMainAttachment = false;
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
    }
    $.mainAttachmentImage.visible = hasMainAttachment;
    $.extAttachmentImage.visible = hasExtAttachment;
    hasMainAttachment && ($.mainAttachmentImage.image = imagepath);
    hasMainAttachment && ($.extAttachmentImage.image = extAttachmentPath);
    __defers["$.__views.mainAttachmentImage!click!MainImageClick"] && $.__views.mainAttachmentImage.addEventListener("click", MainImageClick);
    __defers["$.__views.replyTable!click!handleClick"] && $.__views.replyTable.addEventListener("click", handleClick);
    __defers["$.__views.backBtn!click!backBtnClicked"] && $.__views.backBtn.addEventListener("click", backBtnClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;