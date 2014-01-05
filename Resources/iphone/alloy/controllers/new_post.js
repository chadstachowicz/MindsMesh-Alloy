function Controller() {
    function postStatus() {
        if (null == args.postid) if ($.postText.value.length >= 5) {
            if (null != args.topic_id) var postData = {
                topic_id: args.topic_id,
                text: $.postText.value
            }; else if (null != args.group_id) var postData = {
                group_id: args.group_id,
                text: $.postText.value
            }; else var postData = {
                text: $.postText.value
            };
            xhr = postPostCreate(Titanium.App.Properties.getString("mmat"), postData);
            xhr.onload = function() {
                var response = this.responseText;
                JSON.parse(response);
                Titanium.App.fireEvent("reload_feed", {
                    data: "posted"
                });
                Alloy.CFG.navwindow.closeWindow(win);
            };
            xhr.send(postData);
        } else alert("A reasonable post should have at least 5 chars."); else if (1 > $.postText.value.length) alert("Your post must be at least 1 character"); else {
            var postData = {
                text: $.postText.value
            };
            xhr = postReplyCreate(Titanium.App.Properties.getString("mmat"), args.postid, postData);
            xhr.onload = function() {
                var response = this.responseText;
                JSON.parse(response);
                Titanium.App.fireEvent("reload_post", {
                    data: "posted"
                });
                Alloy.CFG.navwindow.closeWindow(win);
            };
            xhr.send(postData);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "new_post";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.new_post = Ti.UI.createWindow({
        backgroundColor: "#FFF",
        id: "new_post",
        barColor: "#15B17A",
        navTintColor: "#ffffff",
        translucent: "false"
    });
    $.__views.new_post && $.addTopLevelView($.__views.new_post);
    $.__views.postButton = Ti.UI.createButton({
        title: "Post",
        id: "postButton",
        height: "30dp",
        width: "30dp"
    });
    postStatus ? $.__views.postButton.addEventListener("click", postStatus) : __defers["$.__views.postButton!click!postStatus"] = true;
    $.__views.new_post.rightNavButton = $.__views.postButton;
    $.__views.feedImg = Ti.UI.createImageView({
        id: "feedImg",
        top: "0dp",
        left: "0dp",
        height: "50dp",
        width: "50dp"
    });
    $.__views.new_post.add($.__views.feedImg);
    $.__views.postText = Ti.UI.createTextArea({
        top: "0dp",
        left: "55dp",
        id: "postText"
    });
    $.__views.new_post.add($.__views.postText);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.feedImg.image = Titanium.App.Properties.getString("photo_url");
    var win = $.new_post;
    win.addEventListener("open", function() {
        $.postText.focus();
    });
    __defers["$.__views.postButton!click!postStatus"] && $.__views.postButton.addEventListener("click", postStatus);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;