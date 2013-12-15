function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "new_post";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
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
    $.feedImg.image = Titanium.App.Properties.getString("photo_url");
    var win = $.new_post;
    win.addEventListener("open", function() {
        $.postText.focus();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;