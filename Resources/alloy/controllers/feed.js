function Controller() {
    function GetFeedPosts() {
        xhr = getPostsWithFamily(Titanium.App.Properties.getString("mmat"));
        xhr.onload = function() {
            postXML = this.responseText;
            ShowJSONData(JSON.parse(postXML));
        };
        xhr.onerror = function(e) {
            alert(e.message);
        };
        xhr.send();
    }
    function loadMoreBtnClicked() {
        alert(postXML);
    }
    function textAreaReturn() {
        Ti.API.info("text Field Return");
        $.commentTextArea.bottom = 50;
        $.commentTextArea.blur();
    }
    function textAreaClick() {
        Ti.API.info("textAreaClick");
        $.commentTextArea.bottom = 10;
    }
    function cancelBtnClicked() {
        Ti.API.info("cancel button clicked");
        true == $.commentTextArea.visible ? $.commentTextArea.visible = false : shareComment($.commentTextArea.value);
    }
    function shareBtnClicked() {
        Ti.API.info("share button clicked");
        false == $.commentTextArea.visible ? $.commentTextArea.visible = true : shareComment($.commentTextArea.value);
    }
    function shareComment(commentText) {
        alert("send comment here: " + commentText);
        MakeComment(commentText);
        alert("refresh comments");
        $.commentTextArea.visible = false;
        $.commentBtn.title = "comment";
        $.commentTextArea.setValue("");
    }
    function MakeComment(comment, topic_id, group_id) {
        comment = "" + comment;
        if (comment.length >= 5) {
            if (null != topic_id) var postData = {
                topic_id: topic_id,
                text: comment
            }; else if (null != group_id) var postData = {
                group_id: group_id,
                text: comment
            }; else var postData = {
                text: comment
            };
            xhr = postPostCreate(Titanium.App.Properties.getString("mmat"), postData);
            xhr.onload = function() {
                var response = this.responseText;
                alert(response);
            };
            xhr.send(postData);
        } else alert("A reasonable post should have at least 5 chars.");
    }
    function cameraBtnClicked() {
        Ti.API.info("camera button clicked");
        OpenCamera();
    }
    function OpenCamera() {
        Titanium.Media.showCamera({
            success: function(event) {
                Ti.API.debug("Our type was: " + event.mediaType);
                if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
                    Ti.API.info("data from camera: " + event.media);
                    $.postImage.image = event.media;
                    $.postImage.visible = true;
                } else alert("got the wrong type back: " + event.media);
            },
            cancel: function() {
                alert("user cancelled");
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
    }
    function OpenGallery() {
        Titanium.Media.openPhotoGallery({
            success: function(event) {
                Ti.API.debug("Our type was: " + event.mediaType);
                if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
                    Ti.API.info("data from gallery: " + event.media);
                    $.postImage.image = event.media;
                    $.postImage.visible = true;
                    Ti.API.debug("Our media was: " + event.media);
                } else alert("got the wrong type back: " + event.mediaType);
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
    function galleryBtnClicked() {
        Ti.API.info("gallery button clicked");
        OpenGallery();
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
                mainImageWidth = 100;
                mainImageHeight = 100;
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
    function listViewItemClick(e) {
        var section = $.list.sections[e.sectionIndex];
        var item = section.getItemAt(e.itemIndex);
        var view1 = Alloy.createController("showpost", JSON.parse(item.dataLabel.text));
        view1.getView().open();
    }
    function tableViewHandleClick(e) {
        var view1 = Alloy.createController("showpost", e.row.data).getView();
        view1.open();
    }
    function ShowJSONData(postJSON) {
        createListView(postJSON);
        $.list.visible = true;
        Ti.API.info("showing listview, because of android");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "feed";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
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
        tableViewHandleClick ? $.__views.table.addEventListener("click", tableViewHandleClick) : __defers["$.__views.table!click!tableViewHandleClick"] = true;
        var __alloyId1 = {};
        var __alloyId3 = [];
        var __alloyId5 = {
            type: "Ti.UI.View",
            childTemplates: function() {
                var __alloyId6 = [];
                var __alloyId8 = {
                    type: "Ti.UI.View",
                    childTemplates: function() {
                        var __alloyId9 = [];
                        var __alloyId10 = {
                            type: "Ti.UI.ImageView",
                            bindId: "pic",
                            properties: {
                                left: 5,
                                width: 50,
                                height: 50,
                                bindId: "pic"
                            }
                        };
                        __alloyId9.push(__alloyId10);
                        var __alloyId12 = {
                            type: "Ti.UI.View",
                            childTemplates: function() {
                                var __alloyId13 = [];
                                var __alloyId14 = {
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
                                __alloyId13.push(__alloyId14);
                                var __alloyId15 = {
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
                                __alloyId13.push(__alloyId15);
                                return __alloyId13;
                            }(),
                            properties: {
                                width: Ti.UI.FILL,
                                height: Ti.UI.SIZE,
                                layout: "vertical"
                            }
                        };
                        __alloyId9.push(__alloyId12);
                        return __alloyId9;
                    }(),
                    properties: {
                        layout: "horizontal",
                        height: "40",
                        backgroundColor: "#eeeeee"
                    }
                };
                __alloyId6.push(__alloyId8);
                var __alloyId16 = {
                    type: "Ti.UI.Label",
                    bindId: "textLabel",
                    properties: {
                        color: "#000",
                        textAlign: "left",
                        backgroundColor: "white",
                        width: Ti.UI.FILL,
                        height: Ti.UI.SIZE,
                        bindId: "textLabel"
                    }
                };
                __alloyId6.push(__alloyId16);
                var __alloyId17 = {
                    type: "Ti.UI.ImageView",
                    bindId: "postAttachmentImage",
                    properties: {
                        bindId: "postAttachmentImage"
                    }
                };
                __alloyId6.push(__alloyId17);
                var __alloyId19 = {
                    type: "Ti.UI.View",
                    childTemplates: function() {
                        var __alloyId20 = [];
                        var __alloyId21 = {
                            type: "Ti.UI.ImageView",
                            bindId: "extAttachmentImage",
                            properties: {
                                bindId: "extAttachmentImage",
                                left: "0",
                                bottom: "2"
                            }
                        };
                        __alloyId20.push(__alloyId21);
                        var __alloyId23 = {
                            type: "Ti.UI.ImageView",
                            properties: {
                                image: "/images/comment_32.png",
                                right: "5"
                            }
                        };
                        __alloyId20.push(__alloyId23);
                        var __alloyId24 = {
                            type: "Ti.UI.Label",
                            bindId: "commentCountLabel",
                            properties: {
                                color: "white",
                                bindId: "commentCountLabel",
                                right: "15",
                                bottom: "10"
                            }
                        };
                        __alloyId20.push(__alloyId24);
                        return __alloyId20;
                    }(),
                    properties: {
                        backgroundColor: "#eeeeee",
                        width: Ti.UI.FILL
                    }
                };
                __alloyId6.push(__alloyId19);
                var __alloyId25 = {
                    type: "Ti.UI.Label",
                    bindId: "dataLabel",
                    properties: {
                        bindId: "dataLabel",
                        visible: "false",
                        width: "0",
                        height: "0"
                    }
                };
                __alloyId6.push(__alloyId25);
                var __alloyId27 = {
                    type: "Ti.UI.View",
                    childTemplates: function() {
                        var __alloyId28 = [];
                        var __alloyId30 = {
                            type: "Ti.UI.Label",
                            properties: {}
                        };
                        __alloyId28.push(__alloyId30);
                        return __alloyId28;
                    }(),
                    properties: {
                        backgroundColor: "#46a346",
                        width: Ti.UI.FILL,
                        height: 15
                    }
                };
                __alloyId6.push(__alloyId27);
                return __alloyId6;
            }(),
            properties: {
                layout: "vertical",
                left: "10",
                right: "10",
                backgroundColor: "white"
            }
        };
        __alloyId3.push(__alloyId5);
        var __alloyId2 = {
            properties: {
                height: Ti.UI.SIZE,
                name: "template1",
                backgroundColor: "#46a346",
                width: Ti.UI.FILL
            },
            events: {
                click: listViewItemClick
            },
            childTemplates: __alloyId3
        };
        __alloyId1["template1"] = __alloyId2;
        var __alloyId31 = [];
        var __alloyId33 = [];
        $.__views.__alloyId34 = {
            template: "template1",
            properties: {
                width: Ti.UI.FILL,
                id: "__alloyId34"
            }
        };
        __alloyId33.push($.__views.__alloyId34);
        $.__views.section = Ti.UI.createListSection({
            id: "section",
            width: Ti.UI.FILL
        });
        __alloyId31.push($.__views.section);
        $.__views.section.items = __alloyId33;
        $.__views.list = Ti.UI.createListView({
            sections: __alloyId31,
            templates: __alloyId1,
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
            bottom: "80",
            left: "10",
            width: "300",
            height: "200"
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
        alert ? $.__views.commentTextArea.addEventListener("click", alert) : __defers["$.__views.commentTextArea!click!alert"] = true;
        textAreaClick ? $.__views.commentTextArea.addEventListener("focus", textAreaClick) : __defers["$.__views.commentTextArea!focus!textAreaClick"] = true;
        textAreaReturn ? $.__views.commentTextArea.addEventListener("return", textAreaReturn) : __defers["$.__views.commentTextArea!return!textAreaReturn"] = true;
    }
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.commentTextArea.visible = false;
    var postXML = "";
    GetFeedPosts();
    $.platformLabel.text = "android";
    Ti.API.info("feed loaded");
    __defers["$.__views.table!click!tableViewHandleClick"] && $.__views.table.addEventListener("click", tableViewHandleClick);
    __defers["$.__views.loadMoreBtn!click!loadMoreBtnClicked"] && $.__views.loadMoreBtn.addEventListener("click", loadMoreBtnClicked);
    __defers["$.__views.picBtn!click!cameraBtnClicked"] && $.__views.picBtn.addEventListener("click", cameraBtnClicked);
    __defers["$.__views.galBtn!click!galleryBtnClicked"] && $.__views.galBtn.addEventListener("click", galleryBtnClicked);
    __defers["$.__views.cancelBtn!click!cancelBtnClicked"] && $.__views.cancelBtn.addEventListener("click", cancelBtnClicked);
    __defers["$.__views.commentBtn!click!shareBtnClicked"] && $.__views.commentBtn.addEventListener("click", shareBtnClicked);
    __defers["$.__views.commentTextArea!click!alert"] && $.__views.commentTextArea.addEventListener("click", alert);
    __defers["$.__views.commentTextArea!focus!textAreaClick"] && $.__views.commentTextArea.addEventListener("focus", textAreaClick);
    __defers["$.__views.commentTextArea!return!textAreaReturn"] && $.__views.commentTextArea.addEventListener("return", textAreaReturn);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;