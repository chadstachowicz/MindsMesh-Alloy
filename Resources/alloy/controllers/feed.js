function Controller() {
    function backBtnClicked() {
        Ti.API.info("back button clicked");
        openWindow("settings");
    }
    function loadMoreBtnClicked() {
        alert(postXML);
    }
    function textAreaReturn() {
        Ti.API.info("textAreaReturn");
        $.commentTextArea.bottom = 50;
        $.commentTextArea.blur();
    }
    function textAreaClick() {
        Ti.API.info("textAreaClick");
        $.commentTextArea.bottom = "android" == Ti.Platform.osname ? 10 : 220;
    }
    function cancelBtnClicked() {
        Ti.API.info("cancel button clicked");
        $.commentTextArea.visible = false;
        $.commentLabel.visible = false;
    }
    function refreshTableView(e) {
        GetFeedPostsWithCallback("ShowDataByPlatform");
        alert("updating");
        e.hide();
    }
    function shareBtnClicked() {
        Ti.API.info("share button clicked");
        if (false == $.commentTextArea.visible) {
            $.commentTextArea.visible = true;
            $.commentTextArea.focus();
        } else shareComment($.commentTextArea.value);
    }
    function commentLabelClick() {
        Ti.API.info("commentLabelClick");
        $.commentTextArea.visible = true;
        $.commentBtn.title = "share";
        $.commentLabel.visible = false;
    }
    function shareComment(commentText) {
        if (commentText.length >= 5) {
            false == $.postImage.visible ? MakeCommentWithCallback(commentText, "alert") : MakeComentWithImage(commentText, $.postImage.image);
            $.commentTextArea.visible = false;
            $.commentTextArea.setValue("");
            $.postImage.visible = false;
            Ti.API.info("refresh comments");
            GetFeedPostsWithCallback("ShowDataByPlatform");
        } else alert("A reasonable post should have at least 5 chars.");
    }
    function cameraBtnClicked() {
        Ti.API.info("camera button clicked");
        OpenCamera();
    }
    function galleryBtnClicked() {
        Ti.API.info("gallery button clicked");
        OpenGallery();
    }
    function OpenCamera() {
        Titanium.Media.showCamera({
            success: function(event) {
                Ti.API.debug("Our type was: " + event.mediaType);
                if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
                    Ti.API.info("data from camera: " + event.media);
                    $.postImage.image = event.media;
                    $.postImage.visible = true;
                    $.commentLabel.visible = true;
                } else alert("got the wrong type back: " + event.media);
            },
            cancel: function() {
                alert("user cancelled");
            },
            error: function(error) {
                alert("Unexpected error: " + error.code);
            },
            saveToPhotoGallery: true,
            allowEditing: true,
            mediaTypes: [ Ti.Media.MEDIA_TYPE_VIDEO, Ti.Media.MEDIA_TYPE_PHOTO ]
        });
    }
    function OpenGallery() {
        Titanium.Media.openPhotoGallery({
            success: function(event) {
                Ti.API.debug("Our type was: " + event.mediaType);
                if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
                    Ti.API.info("data from gallery: " + event.media);
                    $.postImage.image = event.media;
                    $.postImage.visible = true;
                    $.commentLabel.visible = true;
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
    function createListView(_data) {
        var items = [];
        for (var i in _data) {
            var imagepath = "";
            var extAttachmentPath = "";
            var hasExtAttachment = false;
            var hasMainAttachment = false;
            if (_data[i].post_attachments.length > 0) {
                var filetype = "" + GetExtention(_data[i].post_attachments[0].name);
                if ("png" == filetype || "jpg" == filetype) {
                    imagepath = _data[i].post_attachments[0].url;
                    hasMainAttachment = true;
                } else if ("mov" == filetype) {
                    var url = _data[i].post_attachments[0].url;
                    var pieces = url.substring(0, url.length - 8);
                    imagepath = pieces + "frame_0000.png";
                    hasMainAttachment = true;
                } else {
                    extAttachmentPath = _data[i].post_attachments[0].ext_path;
                    hasExtAttachment = true;
                }
            }
            var mainImageWidth = 0;
            var mainImageHeight = 0;
            if (hasMainAttachment) {
                mainImageWidth = 200;
                mainImageHeight = Ti.UI.SIZE;
            }
            items.push({
                template: "template1",
                textLabel: {
                    text: _data[i].text
                },
                nameLabel: {
                    text: "[" + _data[i].user.name + "]"
                },
                dateLabel: {
                    text: formatDate(_data[i].created_at)
                },
                pic: {
                    image: _data[i].user.photo_url
                },
                postAttachmentImage: {
                    image: imagepath,
                    visible: hasMainAttachment,
                    width: mainImageWidth,
                    heigth: mainImageHeight
                },
                pic: {
                    image: _data[i].user.photo_url
                },
                idLabel: {
                    text: _data[i].id
                },
                dataLabel: {
                    text: JSON.stringify(_data[i])
                },
                commentCountLabel: {
                    text: _data[i].replies_count
                },
                extAttachmentImage: {
                    image: extAttachmentPath,
                    visible: hasExtAttachment
                }
            });
        }
        $.section.setItems(items);
    }
    function createTableView(_data) {
        var items = [];
        for (var i in _data) items.push(Alloy.createController("tableViewRow", _data[i]).getView());
        $.table.setData(items);
    }
    function listViewItemClick(e) {
        var section = $.list.sections[e.sectionIndex];
        var item = section.getItemAt(e.itemIndex);
        openWindowWithArguments("showpost", JSON.parse(item.dataLabel.text));
    }
    function tableViewHandleClick(e) {
        openWindowWithArguments("showpost", e.row.data);
    }
    function GetFeedPostsWithCallback(callback) {
        Ti.API.info("GetFeedPostsWithCallback");
        xhr = new EduMeshAPI().getPostsWithFamily(Titanium.App.Properties.getString("mmat"));
        xhr.onload = function() {
            postXML = this.responseText;
            var c = "" + callback + "(JSON.parse(postXML))";
            eval(c);
        };
        xhr.onerror = function(e) {
            alert(e.message);
        };
        xhr.send();
    }
    function ShowDataByPlatform(postJSON) {
        if ("iphone" == Ti.Platform.osname) {
            createTableView(postJSON);
            $.table.visible = true;
            Ti.API.info("showing tableview, because of IOS");
        } else {
            createListView(postJSON);
            $.list.visible = true;
            Ti.API.info("showing listview, because of android");
        }
    }
    function MakeCommentWithCallback(message, callback) {
        if (null != topic_id) var postData = {
            topic_id: topic_id,
            text: message
        }; else if (null != group_id) var postData = {
            group_id: group_id,
            text: message
        }; else var postData = {
            text: message
        };
        xhr = postPostCreate(Titanium.App.Properties.getString("mmat"), postData);
        xhr.onload = function() {
            var response = this.responseText;
            var c = callback + "(" + response + ");";
            eval(c);
        };
        xhr.send(postData);
    }
    function MakeComentWithImage(message, currentFile) {
        Ti.API.info("SendPostImage");
        var filename = "post.png";
        var postData;
        postData = null != topic_id ? {
            topic_id: topic_id,
            text: message,
            filename: filename,
            content_type: currentFile.mimeType
        } : null != group_id ? {
            group_id: group_id,
            text: message,
            filename: filename,
            content_type: currentFile.mimeType
        } : {
            text: message,
            filename: filename,
            content_type: currentFile.mimeType
        };
        xhr = postPostCreate(Titanium.App.Properties.getString("mmat"), postData);
        $.pb.visible = true;
        $.pb.show();
        xhr.onload = function() {
            var post_id = JSON.parse(this.responseText).id;
            f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, filename);
            true == f.exists() && f.deleteFile();
            f.write(currentFile);
            Ti.API.info(env);
            var serverFilePath = env + "/post_attachments/" + post_id + "/" + filename;
            UploadToAWS(serverFilePath, filename);
            f.deleteFile();
        };
        xhr.send(postData);
    }
    function SendPostMovie(message, currentFile) {
        var filename = "post.mov";
        var postData;
        postData = null != topic_id ? {
            topic_id: topic_id,
            text: message,
            filename: filename,
            content_type: currentFile.mimeType
        } : null != win.group_id ? {
            group_id: group_id,
            text: message,
            filename: filename,
            content_type: currentFile.mimeType
        } : {
            text: message,
            filename: filename,
            content_type: currentFile.mimeType
        };
        xhr = postPostCreate(Titanium.App.Properties.getString("mmat"), postData);
        $.pb.visible = true;
        $.pb.show();
        xhr.onload = function() {
            var post_id = JSON.parse(this.responseText).id;
            f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, filename);
            true == f.exists() && f.deleteFile();
            currentFile.copy(f.nativePath);
            var serverFilePath = env + "/post_attachments/" + post_id + "/" + filename;
            UploadToAWS(serverFilePath, filename);
            f.deleteFile();
        };
        xhr.send(postData);
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
                $.pb.value = e.progress;
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
                $.pb.visible = false;
            };
            xhr2.send(JSON.stringify(postData));
        } else {
            $.pb.hide();
            $.pb.visible = false;
        }
        alert("upload success");
        Ti.API.info("AWS upload complete");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "feed";
    var __parentSymbol = arguments[0] ? arguments[0]["__parentSymbol"] : null;
    var $model = arguments[0] ? arguments[0]["$model"] : null;
    var __itemTemplate = arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    if (!Alloy.isTablet) {
        $.__views.feed = Ti.UI.createWindow({
            backgroundColor: "#FFF",
            id: "feed",
            width: Ti.UI.FILL
        });
        $.__views.feed && $.addTopLevelView($.__views.feed);
        $.__views.table = Ti.UI.createTableView({
            id: "table",
            backgroundColor: "#46a346",
            separatorColor: "transparent",
            visible: "false",
            width: Ti.UI.FILL
        });
        $.__views.feed.add($.__views.table);
        $.__views.ptr = Alloy.createWidget("nl.fokkezb.pullToRefresh", "widget", {
            id: "ptr",
            __parentSymbol: $.__views.table
        });
        $.__views.ptr.setParent($.__views.table);
        refreshTableView ? $.__views.ptr.on("release", refreshTableView) : __defers["$.__views.ptr!release!refreshTableView"] = true;
        tableViewHandleClick ? $.__views.table.addEventListener("click", tableViewHandleClick) : __defers["$.__views.table!click!tableViewHandleClick"] = true;
        var __alloyId4 = {};
        var __alloyId6 = [];
        var __alloyId8 = {
            type: "Ti.UI.View",
            childTemplates: function() {
                var __alloyId9 = [];
                var __alloyId11 = {
                    type: "Ti.UI.View",
                    childTemplates: function() {
                        var __alloyId12 = [];
                        var __alloyId13 = {
                            type: "Ti.UI.ImageView",
                            bindId: "pic",
                            properties: {
                                left: 5,
                                width: 50,
                                height: 50,
                                bindId: "pic"
                            }
                        };
                        __alloyId12.push(__alloyId13);
                        var __alloyId15 = {
                            type: "Ti.UI.View",
                            childTemplates: function() {
                                var __alloyId16 = [];
                                var __alloyId17 = {
                                    type: "Ti.UI.Label",
                                    bindId: "nameLabel",
                                    properties: {
                                        color: "#000",
                                        width: Ti.UI.SIZE,
                                        height: Ti.UI.SIZE,
                                        left: 5,
                                        bindId: "nameLabel"
                                    }
                                };
                                __alloyId16.push(__alloyId17);
                                var __alloyId18 = {
                                    type: "Ti.UI.Label",
                                    bindId: "dateLabel",
                                    properties: {
                                        color: "#000",
                                        width: Ti.UI.SIZE,
                                        height: Ti.UI.SIZE,
                                        left: 5,
                                        font: {
                                            fontSize: 12
                                        },
                                        bindId: "dateLabel"
                                    }
                                };
                                __alloyId16.push(__alloyId18);
                                return __alloyId16;
                            }(),
                            properties: {
                                width: Ti.UI.FILL,
                                height: Ti.UI.SIZE,
                                layout: "vertical"
                            }
                        };
                        __alloyId12.push(__alloyId15);
                        return __alloyId12;
                    }(),
                    properties: {
                        layout: "horizontal",
                        height: "40",
                        backgroundColor: "#eeeeee"
                    }
                };
                __alloyId9.push(__alloyId11);
                var __alloyId19 = {
                    type: "Ti.UI.Label",
                    bindId: "textLabel",
                    properties: {
                        color: "#000",
                        textAlign: "left",
                        backgroundColor: "white",
                        width: Ti.UI.FILL,
                        height: Ti.UI.SIZE,
                        left: 10,
                        font: {
                            fontSize: 20
                        },
                        bindId: "textLabel"
                    }
                };
                __alloyId9.push(__alloyId19);
                var __alloyId20 = {
                    type: "Ti.UI.ImageView",
                    bindId: "postAttachmentImage",
                    properties: {
                        bindId: "postAttachmentImage"
                    }
                };
                __alloyId9.push(__alloyId20);
                var __alloyId22 = {
                    type: "Ti.UI.View",
                    childTemplates: function() {
                        var __alloyId23 = [];
                        var __alloyId24 = {
                            type: "Ti.UI.ImageView",
                            bindId: "extAttachmentImage",
                            properties: {
                                bindId: "extAttachmentImage",
                                left: "0",
                                bottom: "2"
                            }
                        };
                        __alloyId23.push(__alloyId24);
                        var __alloyId26 = {
                            type: "Ti.UI.ImageView",
                            properties: {
                                image: "/images/comment_32.png",
                                right: "5"
                            }
                        };
                        __alloyId23.push(__alloyId26);
                        var __alloyId27 = {
                            type: "Ti.UI.Label",
                            bindId: "commentCountLabel",
                            properties: {
                                color: "white",
                                bindId: "commentCountLabel",
                                right: "15",
                                bottom: "10"
                            }
                        };
                        __alloyId23.push(__alloyId27);
                        return __alloyId23;
                    }(),
                    properties: {
                        backgroundColor: "#eeeeee",
                        width: Ti.UI.FILL
                    }
                };
                __alloyId9.push(__alloyId22);
                var __alloyId28 = {
                    type: "Ti.UI.Label",
                    bindId: "dataLabel",
                    properties: {
                        bindId: "dataLabel",
                        visible: "false",
                        width: "0",
                        height: "0"
                    }
                };
                __alloyId9.push(__alloyId28);
                var __alloyId30 = {
                    type: "Ti.UI.View",
                    childTemplates: function() {
                        var __alloyId31 = [];
                        var __alloyId33 = {
                            type: "Ti.UI.Label",
                            properties: {}
                        };
                        __alloyId31.push(__alloyId33);
                        return __alloyId31;
                    }(),
                    properties: {
                        backgroundColor: "#46a346",
                        width: Ti.UI.FILL,
                        height: 15
                    }
                };
                __alloyId9.push(__alloyId30);
                return __alloyId9;
            }(),
            properties: {
                layout: "vertical",
                left: "10",
                right: "10",
                backgroundColor: "white"
            }
        };
        __alloyId6.push(__alloyId8);
        var __alloyId5 = {
            properties: {
                height: 46,
                name: "template1",
                backgroundColor: "#46a346",
                width: Ti.UI.FILL
            },
            events: {
                click: listViewItemClick
            },
            childTemplates: __alloyId6
        };
        __alloyId4["template1"] = __alloyId5;
        var __alloyId34 = [];
        var __alloyId36 = [];
        $.__views.__alloyId37 = {
            template: "template1",
            properties: {
                width: Ti.UI.FILL,
                id: "__alloyId37"
            }
        };
        __alloyId36.push($.__views.__alloyId37);
        $.__views.section = Ti.UI.createListSection({
            id: "section",
            width: Ti.UI.FILL
        });
        __alloyId34.push($.__views.section);
        $.__views.section.items = __alloyId36;
        $.__views.list = Ti.UI.createListView({
            sections: __alloyId34,
            templates: __alloyId4,
            id: "list",
            backgroundColor: "#46a346",
            separatorColor: "transparent",
            width: Ti.UI.FILL,
            defaultItemTemplate: "template1",
            visible: "false"
        });
        $.__views.feed.add($.__views.list);
        $.__views.postImage = Ti.UI.createImageView({
            id: "postImage",
            visible: "false",
            width: Ti.UI.FILL,
            height: "300"
        });
        $.__views.feed.add($.__views.postImage);
        $.__views.loadMoreBtn = Ti.UI.createButton({
            title: "Data",
            id: "loadMoreBtn",
            left: "0",
            bottom: "45"
        });
        $.__views.feed.add($.__views.loadMoreBtn);
        loadMoreBtnClicked ? $.__views.loadMoreBtn.addEventListener("click", loadMoreBtnClicked) : __defers["$.__views.loadMoreBtn!click!loadMoreBtnClicked"] = true;
        $.__views.picBtn = Ti.UI.createButton({
            title: "Camera",
            id: "picBtn",
            left: "0",
            bottom: "0"
        });
        $.__views.feed.add($.__views.picBtn);
        cameraBtnClicked ? $.__views.picBtn.addEventListener("click", cameraBtnClicked) : __defers["$.__views.picBtn!click!cameraBtnClicked"] = true;
        $.__views.galBtn = Ti.UI.createButton({
            title: "Gallery",
            id: "galBtn",
            left: "82",
            bottom: "0"
        });
        $.__views.feed.add($.__views.galBtn);
        galleryBtnClicked ? $.__views.galBtn.addEventListener("click", galleryBtnClicked) : __defers["$.__views.galBtn!click!galleryBtnClicked"] = true;
        $.__views.cancelBtn = Ti.UI.createButton({
            title: "Cancel",
            id: "cancelBtn",
            right: "68",
            bottom: "0"
        });
        $.__views.feed.add($.__views.cancelBtn);
        cancelBtnClicked ? $.__views.cancelBtn.addEventListener("click", cancelBtnClicked) : __defers["$.__views.cancelBtn!click!cancelBtnClicked"] = true;
        $.__views.commentBtn = Ti.UI.createButton({
            title: "Share",
            id: "commentBtn",
            right: "0",
            bottom: "0"
        });
        $.__views.feed.add($.__views.commentBtn);
        shareBtnClicked ? $.__views.commentBtn.addEventListener("click", shareBtnClicked) : __defers["$.__views.commentBtn!click!shareBtnClicked"] = true;
        $.__views.platformLabel = Ti.UI.createLabel({
            id: "platformLabel",
            visible: "false"
        });
        $.__views.feed.add($.__views.platformLabel);
        $.__views.commentLabel = Ti.UI.createLabel({
            font: {
                fontSize: 25
            },
            text: "[ add comment ]",
            id: "commentLabel",
            visible: "false",
            color: "white",
            left: "10",
            bottom: "140"
        });
        $.__views.feed.add($.__views.commentLabel);
        commentLabelClick ? $.__views.commentLabel.addEventListener("click", commentLabelClick) : __defers["$.__views.commentLabel!click!commentLabelClick"] = true;
        $.__views.commentTextArea = Ti.UI.createTextArea({
            font: {
                fontSize: 30
            },
            id: "commentTextArea",
            visible: "false",
            bottom: "50",
            width: Ti.UI.FILL,
            height: "100"
        });
        $.__views.feed.add($.__views.commentTextArea);
        textAreaClick ? $.__views.commentTextArea.addEventListener("click", textAreaClick) : __defers["$.__views.commentTextArea!click!textAreaClick"] = true;
        textAreaClick ? $.__views.commentTextArea.addEventListener("focus", textAreaClick) : __defers["$.__views.commentTextArea!focus!textAreaClick"] = true;
        textAreaReturn ? $.__views.commentTextArea.addEventListener("return", textAreaReturn) : __defers["$.__views.commentTextArea!return!textAreaReturn"] = true;
        $.__views.pb = Ti.UI.createProgressBar({
            id: "pb",
            top: "10",
            width: "250",
            height: "auto",
            min: "0",
            max: "10",
            value: "0",
            color: "#fff",
            visible: "false",
            message: "Uploading..."
        });
        $.__views.feed.add($.__views.pb);
    }
    exports.destroy = function() {};
    _.extend($, $.__views);
    var win = Titanium.UI.currentWindow;
    var env = "production";
    var postXML = "";
    var topic_id = null;
    var group_id = null;
    $.commentTextArea.visible = false;
    GetFeedPostsWithCallback("ShowDataByPlatform");
    Ti.API.info("feed loaded");
    $.pb.hide();
    __defers["$.__views.ptr!release!refreshTableView"] && $.__views.ptr.on("release", refreshTableView);
    __defers["$.__views.table!click!tableViewHandleClick"] && $.__views.table.addEventListener("click", tableViewHandleClick);
    __defers["$.__views.loadMoreBtn!click!loadMoreBtnClicked"] && $.__views.loadMoreBtn.addEventListener("click", loadMoreBtnClicked);
    __defers["$.__views.picBtn!click!cameraBtnClicked"] && $.__views.picBtn.addEventListener("click", cameraBtnClicked);
    __defers["$.__views.galBtn!click!galleryBtnClicked"] && $.__views.galBtn.addEventListener("click", galleryBtnClicked);
    __defers["$.__views.cancelBtn!click!cancelBtnClicked"] && $.__views.cancelBtn.addEventListener("click", cancelBtnClicked);
    __defers["$.__views.commentBtn!click!shareBtnClicked"] && $.__views.commentBtn.addEventListener("click", shareBtnClicked);
    __defers["$.__views.commentLabel!click!commentLabelClick"] && $.__views.commentLabel.addEventListener("click", commentLabelClick);
    __defers["$.__views.commentTextArea!click!textAreaClick"] && $.__views.commentTextArea.addEventListener("click", textAreaClick);
    __defers["$.__views.commentTextArea!focus!textAreaClick"] && $.__views.commentTextArea.addEventListener("focus", textAreaClick);
    __defers["$.__views.commentTextArea!return!textAreaReturn"] && $.__views.commentTextArea.addEventListener("return", textAreaReturn);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;