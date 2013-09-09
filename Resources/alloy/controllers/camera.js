function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "camera";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
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
        cancel: function() {},
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
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;