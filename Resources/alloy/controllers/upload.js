function Controller() {
    function OpenGallery() {
        Titanium.Media.openPhotoGallery({
            success: function(event) {
                Ti.API.debug("Our type was: " + event.mediaType);
                if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
                    Ti.API.info("data from gallery: " + event.media);
                    $.postImage.image = event.media;
                    $.postImage.visible = true;
                    $.btnUpload.visible = true;
                    Ti.API.debug("Our media was: " + event.media);
                } else alert("got the wrong type back: " + event.mediaType);
            },
            cancel: function() {
                alert("user cancelled");
            },
            error: function(error) {
                alert("Unexpected error: " + error.code);
            },
            allowEditing: true,
            mediaTypes: [ Ti.Media.MEDIA_TYPE_VIDEO, Ti.Media.MEDIA_TYPE_PHOTO ]
        });
    }
    function goUploadTester() {
        var currentFile = $.postImage.image;
        var post_id = "356";
        var filename = "post.png";
        f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, filename);
        true == f.exists() && f.deleteFile();
        f.write(currentFile);
        Ti.API.info(Ti.App.Properties.getString("production"));
        var env = "production";
        Ti.API.info(env);
        var serverFilePath = env + "/post_attachments/" + post_id + "/" + filename;
        UploadToAWS(serverFilePath, filename);
        f.deleteFile();
    }
    function UploadToAWS(serverFilename, filename) {
        Ti.API.info("serverFilename: " + serverFilename);
        Ti.API.info("filename: " + filename);
        $.pb.show();
        AWS.config({
            key: "AKIAIKFVJ3EMAIBXELBQ",
            secret: "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",
            bucket: "mindsmesh.com",
            GSM: " -0700",
            debug: true,
            http: Titanium.Network.createHTTPClient(),
            s3fileName: serverFilename,
            timeout: 24e4,
            onsendstream: function(e) {
                pb.value = e.progress;
            },
            error: function(e) {
                alert(e);
            },
            success: AWSPostSuccess(serverFilename, filename)
        });
        AWS.PUT(filename);
        Ti.API.info("AWS upload started");
    }
    function AWSPostSuccess(serverFilename, filename) {
        Ti.API.info("extention: " + GetExtention(filename));
        var ext = "" + GetExtention(filename);
        if ("mov" == ext) {
            var postData = {
                file: "http://s3.amazonaws.com/mindsmesh.com/" + serverFilename
            };
            xhr2 = postEncodeVideo(Titanium.App.Properties.getString("mmat"), postData);
            xhr2.onload = function() {
                $.pb.hide();
            };
            xhr2.send(JSON.stringify(postData));
        } else $.pb.hide();
        alert("upload success");
        Ti.API.info("AWS upload complete");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "upload";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "#FFF",
        id: "win",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.btnUpload = Ti.UI.createButton({
        title: "upload",
        id: "btnUpload",
        visible: "false",
        bottom: "0",
        right: "0",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE
    });
    $.__views.win.add($.__views.btnUpload);
    goUploadTester ? $.__views.btnUpload.addEventListener("click", goUploadTester) : __defers["$.__views.btnUpload!click!goUploadTester"] = true;
    $.__views.pb = Ti.UI.createProgressBar({
        id: "pb",
        top: "10",
        width: "250",
        height: "auto",
        min: "0",
        max: "1",
        value: "0",
        color: "#fff",
        message: "uploading..."
    });
    $.__views.win.add($.__views.pb);
    $.__views.postImage = Ti.UI.createImageView({
        id: "postImage",
        visible: "false",
        width: Ti.UI.FILL,
        height: "300"
    });
    $.__views.win.add($.__views.postImage);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.pb.hide();
    OpenGallery("alert");
    __defers["$.__views.btnUpload!click!goUploadTester"] && $.__views.btnUpload.addEventListener("click", goUploadTester);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;