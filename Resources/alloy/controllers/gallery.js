function Controller() {
    function goBackToFeed() {
        Ti.API.info("goBackToFeed");
    }
    function backBtnClicked() {
        Ti.API.info("back button clicked");
        goBackToFeed();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "gallery";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.gallery = Ti.UI.createWindow({
        backgroundColor: "#FFF",
        id: "gallery"
    });
    $.__views.gallery && $.addTopLevelView($.__views.gallery);
    $.__views.mainView = Ti.UI.createImageView({
        id: "mainView",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE
    });
    $.__views.gallery.add($.__views.mainView);
    $.__views.backBtn = Ti.UI.createButton({
        title: "back",
        id: "backBtn",
        top: "0",
        left: "0"
    });
    $.__views.gallery.add($.__views.backBtn);
    backBtnClicked ? $.__views.backBtn.addEventListener("click", backBtnClicked) : __defers["$.__views.backBtn!click!backBtnClicked"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    Titanium.Media.openPhotoGallery({
        success: function(event) {
            Ti.API.debug("Our type was: " + event.mediaType);
            if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
                $.mainView.image = event.media;
                Ti.API.debug("Our media was: " + event.media);
            } else alert("got the wrong type back: " + event.mediaType);
        },
        cancel: function() {
            alert("cancel");
        },
        error: function() {
            alert("error");
        },
        saveToPhotoGallery: true,
        allowEditing: true,
        mediaTypes: [ Ti.Media.MEDIA_TYPE_VIDEO, Ti.Media.MEDIA_TYPE_PHOTO ]
    });
    __defers["$.__views.backBtn!click!backBtnClicked"] && $.__views.backBtn.addEventListener("click", backBtnClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;