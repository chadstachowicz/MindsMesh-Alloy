function Controller() {
    function goBackToFeed() {
        $.camera.close();
        $.camera = null;
    }
    function backBtnClicked() {
        Ti.API.info("back button clicked");
        goBackToFeed();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "camera";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.camera = Ti.UI.createWindow({
        backgroundColor: "#FFF",
        id: "camera"
    });
    $.__views.camera && $.addTopLevelView($.__views.camera);
    $.__views.mainView = Ti.UI.createImageView({
        id: "mainView",
        width: "300",
        height: "300"
    });
    $.__views.camera.add($.__views.mainView);
    $.__views.backBtn = Ti.UI.createButton({
        title: "back",
        id: "backBtn",
        top: "0",
        left: "0"
    });
    $.__views.camera.add($.__views.backBtn);
    backBtnClicked ? $.__views.backBtn.addEventListener("click", backBtnClicked) : __defers["$.__views.backBtn!click!backBtnClicked"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    Titanium.Media.showCamera({
        success: function(event) {
            Ti.API.debug("Our type was: " + event.mediaType);
            if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
                $.mainView.image = event.media;
                Ti.API.debug("Our media was: " + event.media);
            } else alert("got the wrong type back: " + event.media);
        },
        cancel: function() {
            alert("cancel");
            $.camera.close();
            $.camera = null;
        },
        error: function(error) {
            var a = Titanium.UI.createAlertDialog({
                title: "Camera"
            });
            error.code == Titanium.Media.NO_CAMERA ? a.setMessage("Please run this test on device") : a.setMessage("Unexpected error: " + error.code);
            a.show();
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