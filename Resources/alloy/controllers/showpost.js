function Controller() {
    function LoadImages() {
        if (args.post_attachments.length > 0) {
            filetype = "" + GetExtention(args.post_attachments[0].name);
            filename = "" + GetCleanFilenameFromPath(args.post_attachments[0].url);
            if ("png" == filetype || "jpg" == filetype) {
                imagepath = args.post_attachments[0].url;
                attachmentURL = args.post_attachments[0].url;
                hasMainAttachment = true;
            } else if ("mov" == filetype) {
                attachmentURL = args.post_attachments[0].url;
                var pieces = attachmentURL.substring(0, attachmentURL.length - 8);
                imagepath = pieces + "frame_0000.png";
                hasMainAttachment = true;
            } else {
                attachmentURL = args.post_attachments[0].url;
                extAttachmentPath = args.post_attachments[0].ext_path;
                hasExtAttachment = true;
            }
        }
        $.extAttachmentFileNameLabel.text = filename;
        $.attachmentExtLabel.text = filetype;
        $.mainAttachmentImage.visible = hasMainAttachment;
        $.extAttachmentImage.visible = hasExtAttachment;
        hasMainAttachment && ($.mainAttachmentImage.image = imagepath);
        hasExtAttachment && ($.extAttachmentImage.image = extAttachmentPath);
    }
    function ExternalFileClick() {
        Ti.API.info("ExternalFileClick clicked");
        if ("pdf" == filetype) if ("android" == Ti.Platform.osname) {
            Ti.API.info("android, open external file");
            AndroidDownloadFile(attachmentURL);
        } else {
            var view1;
            view1 = Alloy.createController("showfile", {
                value: attachmentURL
            });
            Ti.API.info("IOS, use showfile");
            view1.getView().open();
        } else {
            var view1;
            view1 = Alloy.createController("showimage", {
                value: $.mainAttachmentImage.image
            });
            view1.getView().open();
        }
    }
    function handleClick() {
        alert("handleClick");
    }
    function ShowReplies() {
        Ti.API.info(JSON.stringify($.replies));
        createRepliesTableView($.replies);
    }
    function goBackToFeed() {
        $.win.close();
        $.win = null;
    }
    function backBtnClicked() {
        Ti.API.info("back button clicked");
        goBackToFeed();
    }
    function textFieldReturn() {
        Ti.API.info("text Field Return");
        $.textField.bottom = 50;
        $.textField.blur();
    }
    function textAreaClick() {
        Ti.API.info("textAreaClick");
        $.textField.bottom = "android" == Ti.Platform.osname ? 10 : 220;
    }
    function shareBtnClicked() {
        Ti.API.info("share button clicked");
        if (false == $.textField.visible) {
            $.textField.visible = true;
            $.shareBtn.title = "share";
        } else shareComment($.textField.value);
    }
    function shareComment(commentText) {
        alert("send comment here: " + commentText);
        MakeComment();
        alert("refresh comments");
        $.textField.visible = false;
        $.shareBtn.title = "comment";
        $.textField.setValue("");
    }
    function MakeComment() {
        if (1 > $.textField.value.length) alert("Your post must be at least 1 character"); else {
            xhr = new EduMeshAPI().postReplyCreate(Titanium.App.Properties.getString("mmat"), $.postidLabel.text, $.textField.value);
            xhr.onload = function() {
                var response = this.responseText;
                alert(response);
            };
            xhr.send(JSON.stringify(postData));
        }
    }
    function MainImageClick() {
        Ti.API.info("main image clicked");
        var view1;
        view1 = "mov" == filetype ? Alloy.createController("showvideo", {
            value: attachmentURL
        }) : Alloy.createController("showimage", {
            value: $.mainAttachmentImage.image
        });
        view1.getView().open();
    }
    function createRepliesTableView(_data) {
        Ti.API.info("called: createRepliesTableView");
        var items = [];
        for (var i in _data) items.push(Alloy.createController("replyTableViewRow", _data[i]).getView());
        if (items.length > 0) {
            $.replyTable.setData(items);
            $.replyTable.visible = true;
        }
    }
    function AndroidDownloadFile(URL) {
        Ti.API.info("AndroidDownloadFile: " + URL);
        loadView = Ti.UI.createWindow({
            backgroundColor: "black",
            opacity: .9,
            height: Ti.Platform.displayCaps.platformHeight,
            width: Ti.Platform.displayCaps.platformWidth
        });
        var loadIndicator = Ti.UI.createActivityIndicator({
            style: Ti.UI.iPhone.ActivityIndicatorStyle.BIG,
            message: "Downloading File...",
            font: "Arial",
            color: "#FFF"
        });
        loadView.add(loadIndicator);
        loadView.open();
        loadIndicator.show();
        var name = GetCleanFilenameFromPath(URL);
        var xhr = Titanium.Network.createHTTPClient({
            enableKeepAlive: false,
            timeout: 6e3
        });
        xhr.retries = 0;
        xhr.open("GET", url);
        xhr.onload = MoveAndOpenFile(name);
        xhr.send();
    }
    function MoveAndOpenFile(filename) {
        Ti.API.info("MoveAndOpenFile: " + filename);
        loadView.close();
        try {
            if (1 == this.responseData.type) {
                var f = Ti.Filesystem.getFile(this.responseData.nativePath);
                var dest = Ti.Filesystem.getFile(Ti.Filesystem.getExternalStorageDirectory(), filename);
                dest.exists && dest.deleteFile();
                f.copy(dest.nativePath);
                alert("seems like it works");
            } else {
                var f = Ti.Filesystem.getFile(Ti.Filesystem.getExternalStorageDirectory(), filename);
                f.write(this.responseData);
            }
            var mimeType = this.responseData.mimeType;
            var intent = Ti.Android.createIntent({
                action: Ti.Android.ACTION_VIEW,
                type: mimeType,
                data: f.getNativePath()
            });
            Ti.Android.currentActivity.startActivity(intent);
        } catch (err) {
            alert("We we unable to open " + filename + " automatically.  You can find the file on your storage device under " + Ti.Filesystem.getExternalStorageDirectory());
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "showpost";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "#FFF",
        navBarHidden: "false",
        orientationModes: [ Ti.UI.PORTRAIT ],
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.__alloyId68 = Ti.UI.createView({
        layout: "vertical",
        backgroundColor: "#99e099",
        width: Ti.UI.FILL,
        id: "__alloyId68"
    });
    $.__views.win.add($.__views.__alloyId68);
    $.__views.__alloyId69 = Ti.UI.createView({
        backgroundColor: "#1c731c",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        id: "__alloyId69"
    });
    $.__views.__alloyId68.add($.__views.__alloyId69);
    $.__views.userImage = Ti.UI.createImageView({
        id: "userImage",
        left: "0",
        top: "0",
        width: "70",
        height: "70"
    });
    $.__views.__alloyId69.add($.__views.userImage);
    $.__views.nameLabel = Ti.UI.createLabel({
        color: "white",
        font: {
            fontSize: 20
        },
        left: "75",
        top: "0",
        id: "nameLabel"
    });
    $.__views.__alloyId69.add($.__views.nameLabel);
    $.__views.dateLabel = Ti.UI.createLabel({
        left: "75",
        top: "20",
        id: "dateLabel"
    });
    $.__views.__alloyId69.add($.__views.dateLabel);
    $.__views.commentLabel = Ti.UI.createLabel({
        color: "black",
        font: {
            fontSize: 20
        },
        id: "commentLabel",
        width: Ti.UI.FILL,
        backgroundColor: "white"
    });
    $.__views.__alloyId68.add($.__views.commentLabel);
    $.__views.mainAttachmentImage = Ti.UI.createImageView({
        id: "mainAttachmentImage"
    });
    $.__views.__alloyId68.add($.__views.mainAttachmentImage);
    MainImageClick ? $.__views.mainAttachmentImage.addEventListener("click", MainImageClick) : __defers["$.__views.mainAttachmentImage!click!MainImageClick"] = true;
    $.__views.__alloyId70 = Ti.UI.createView({
        backgroundColor: "#eeeeee",
        height: Ti.UI.SIZE,
        id: "__alloyId70"
    });
    $.__views.__alloyId68.add($.__views.__alloyId70);
    ExternalFileClick ? $.__views.__alloyId70.addEventListener("click", ExternalFileClick) : __defers["$.__views.__alloyId70!click!ExternalFileClick"] = true;
    $.__views.extAttachmentImage = Ti.UI.createImageView({
        id: "extAttachmentImage",
        top: "0",
        left: "0"
    });
    $.__views.__alloyId70.add($.__views.extAttachmentImage);
    $.__views.extAttachmentFileNameLabel = Ti.UI.createLabel({
        font: {
            fontSize: 10
        },
        id: "extAttachmentFileNameLabel",
        top: "0",
        left: "30"
    });
    $.__views.__alloyId70.add($.__views.extAttachmentFileNameLabel);
    $.__views.replyTable = Ti.UI.createTableView({
        id: "replyTable",
        top: "0",
        visible: "false",
        backgroundColor: "#99e099"
    });
    $.__views.__alloyId68.add($.__views.replyTable);
    handleClick ? $.__views.replyTable.addEventListener("click", handleClick) : __defers["$.__views.replyTable!click!handleClick"] = true;
    $.__views.attachmentCountLabel = Ti.UI.createLabel({
        id: "attachmentCountLabel",
        visible: "false"
    });
    $.__views.__alloyId68.add($.__views.attachmentCountLabel);
    $.__views.replyCountLabel = Ti.UI.createLabel({
        id: "replyCountLabel",
        visible: "false"
    });
    $.__views.__alloyId68.add($.__views.replyCountLabel);
    $.__views.attachmentExtLabel = Ti.UI.createLabel({
        id: "attachmentExtLabel",
        visible: "false"
    });
    $.__views.__alloyId68.add($.__views.attachmentExtLabel);
    $.__views.postidLabel = Ti.UI.createLabel({
        id: "postidLabel"
    });
    $.__views.__alloyId68.add($.__views.postidLabel);
    $.__views.textField = Ti.UI.createTextArea({
        font: {
            fontSize: 30
        },
        id: "textField",
        visible: "false",
        bottom: "50",
        width: Ti.UI.FILL,
        height: "100"
    });
    $.__views.win.add($.__views.textField);
    alert ? $.__views.textField.addEventListener("click", alert) : __defers["$.__views.textField!click!alert"] = true;
    textAreaClick ? $.__views.textField.addEventListener("focus", textAreaClick) : __defers["$.__views.textField!focus!textAreaClick"] = true;
    textFieldReturn ? $.__views.textField.addEventListener("return", textFieldReturn) : __defers["$.__views.textField!return!textFieldReturn"] = true;
    $.__views.backBtn = Ti.UI.createButton({
        left: 0,
        bottom: 0,
        title: "back",
        id: "backBtn"
    });
    $.__views.win.add($.__views.backBtn);
    backBtnClicked ? $.__views.backBtn.addEventListener("click", backBtnClicked) : __defers["$.__views.backBtn!click!backBtnClicked"] = true;
    $.__views.shareBtn = Ti.UI.createButton({
        title: "comment",
        id: "shareBtn",
        right: "0",
        bottom: "0"
    });
    $.__views.win.add($.__views.shareBtn);
    shareBtnClicked ? $.__views.shareBtn.addEventListener("click", shareBtnClicked) : __defers["$.__views.shareBtn!click!shareBtnClicked"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var imagepath = "";
    var extAttachmentPath = "";
    var hasExtAttachment = false;
    var hasMainAttachment = false;
    var filetype = "";
    var attachmentURL = "";
    var filename = "";
    $.postidLabel.text = args.postid;
    $.replies = args.replies;
    $.userImage.image = args.user.photo_url;
    $.nameLabel.text = args.user.name;
    $.dateLabel.text = formatDate(args.updated_at);
    $.commentLabel.text = "\r\n" + args.text + "\r\n\r\n";
    $.replyCountLabel.text = args.replies_count;
    $.attachmentCountLabel.text = args.post_attachments.length;
    LoadImages();
    ShowReplies();
    $.textField.visible = false;
    var loadView;
    __defers["$.__views.mainAttachmentImage!click!MainImageClick"] && $.__views.mainAttachmentImage.addEventListener("click", MainImageClick);
    __defers["$.__views.__alloyId70!click!ExternalFileClick"] && $.__views.__alloyId70.addEventListener("click", ExternalFileClick);
    __defers["$.__views.replyTable!click!handleClick"] && $.__views.replyTable.addEventListener("click", handleClick);
    __defers["$.__views.textField!click!alert"] && $.__views.textField.addEventListener("click", alert);
    __defers["$.__views.textField!focus!textAreaClick"] && $.__views.textField.addEventListener("focus", textAreaClick);
    __defers["$.__views.textField!return!textFieldReturn"] && $.__views.textField.addEventListener("return", textFieldReturn);
    __defers["$.__views.backBtn!click!backBtnClicked"] && $.__views.backBtn.addEventListener("click", backBtnClicked);
    __defers["$.__views.shareBtn!click!shareBtnClicked"] && $.__views.shareBtn.addEventListener("click", shareBtnClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;