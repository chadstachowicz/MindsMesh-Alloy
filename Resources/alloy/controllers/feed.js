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
    function openWindow(windowName) {
        var args = {
            data: "test data",
            value: "other data"
        };
        $.feedWindow.close();
        $.feedWindow = null;
        var view1 = Alloy.createController(windowName, args);
        view1.getView().open();
    }
    function backBtnClicked() {
        Ti.API.info("back button clicked");
        openWindow("settings");
    }
    function loadMoreBtnClicked() {
        alert(postXML);
    }
    function ItemClick(e) {
        var section = $.list.sections[e.sectionIndex];
        var item = section.getItemAt(e.itemIndex);
        alert("ItemClick: " + item.dataLabel.text);
        var view1 = Alloy.createController(windowName, item.dataLabel.text);
        view1.getView().open();
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
                },
                paperClipImage: {
                    visible: hasExtAttachment
                }
            });
        }
        $.section.setItems(items);
    }
    function handleClick(e) {
        alert(e.row.post_id);
        alert(e.row.data);
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
        $.__views.feedWindow = Ti.UI.createWindow({
            backgroundColor: "#FFF",
            id: "feedWindow"
        });
        $.__views.feedWindow && $.addTopLevelView($.__views.feedWindow);
        var __alloyId0 = {};
        var __alloyId2 = [];
        var __alloyId4 = {
            type: "Ti.UI.View",
            childTemplates: function() {
                var __alloyId5 = [];
                var __alloyId7 = {
                    type: "Ti.UI.View",
                    childTemplates: function() {
                        var __alloyId8 = [];
                        var __alloyId10 = {
                            type: "Ti.UI.Label",
                            properties: {}
                        };
                        __alloyId8.push(__alloyId10);
                        return __alloyId8;
                    }(),
                    properties: {
                        backgroundColor: "green",
                        width: Ti.UI.FILL,
                        height: 25
                    }
                };
                __alloyId5.push(__alloyId7);
                var __alloyId12 = {
                    type: "Ti.UI.View",
                    childTemplates: function() {
                        var __alloyId13 = [];
                        var __alloyId14 = {
                            type: "Ti.UI.ImageView",
                            bindId: "pic",
                            properties: {
                                left: 5,
                                width: 40,
                                height: 40,
                                bindId: "pic"
                            }
                        };
                        __alloyId13.push(__alloyId14);
                        var __alloyId16 = {
                            type: "Ti.UI.View",
                            childTemplates: function() {
                                var __alloyId17 = [];
                                var __alloyId18 = {
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
                                __alloyId17.push(__alloyId18);
                                var __alloyId19 = {
                                    type: "Ti.UI.Label",
                                    bindId: "dateLabel",
                                    properties: {
                                        color: "#000",
                                        width: Ti.UI.SIZE,
                                        height: Ti.UI.SIZE,
                                        left: 5,
                                        bindId: "dateLabel"
                                    }
                                };
                                __alloyId17.push(__alloyId19);
                                return __alloyId17;
                            }(),
                            properties: {
                                width: Ti.UI.FILL,
                                height: Ti.UI.SIZE,
                                layout: "vertical"
                            }
                        };
                        __alloyId13.push(__alloyId16);
                        return __alloyId13;
                    }(),
                    properties: {
                        layout: "horizontal",
                        height: "40"
                    }
                };
                __alloyId5.push(__alloyId12);
                var __alloyId20 = {
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
                __alloyId5.push(__alloyId20);
                var __alloyId21 = {
                    type: "Ti.UI.ImageView",
                    bindId: "postAttachmentImage",
                    properties: {
                        bindId: "postAttachmentImage"
                    }
                };
                __alloyId5.push(__alloyId21);
                var __alloyId23 = {
                    type: "Ti.UI.View",
                    childTemplates: function() {
                        var __alloyId24 = [];
                        var __alloyId26 = {
                            type: "Ti.UI.ImageView",
                            bindId: "paperClipImage",
                            properties: {
                                image: "/images/paperclip_black_24.png",
                                bindId: "paperClipImage",
                                left: "5"
                            }
                        };
                        __alloyId24.push(__alloyId26);
                        var __alloyId27 = {
                            type: "Ti.UI.ImageView",
                            bindId: "extAttachmentImage",
                            properties: {
                                bindId: "extAttachmentImage",
                                left: "45"
                            }
                        };
                        __alloyId24.push(__alloyId27);
                        var __alloyId28 = {
                            type: "Ti.UI.Label",
                            bindId: "commentCountLabel",
                            properties: {
                                bindId: "commentCountLabel",
                                right: "45"
                            }
                        };
                        __alloyId24.push(__alloyId28);
                        var __alloyId30 = {
                            type: "Ti.UI.ImageView",
                            properties: {
                                image: "/images/comment_32.png",
                                right: "5"
                            }
                        };
                        __alloyId24.push(__alloyId30);
                        return __alloyId24;
                    }(),
                    properties: {
                        backgroundColor: "#eeeeee",
                        width: Ti.UI.FILL
                    }
                };
                __alloyId5.push(__alloyId23);
                var __alloyId31 = {
                    type: "Ti.UI.Label",
                    bindId: "dataLabel",
                    properties: {
                        bindId: "dataLabel",
                        visible: "false",
                        width: "0",
                        height: "0"
                    }
                };
                __alloyId5.push(__alloyId31);
                return __alloyId5;
            }(),
            properties: {
                layout: "vertical"
            }
        };
        __alloyId2.push(__alloyId4);
        var __alloyId1 = {
            properties: {
                height: Ti.UI.SIZE,
                name: "template1"
            },
            events: {
                click: ItemClick
            },
            childTemplates: __alloyId2
        };
        __alloyId0["template1"] = __alloyId1;
        var __alloyId32 = [];
        var __alloyId34 = [];
        $.__views.__alloyId35 = {
            template: "template1",
            properties: {
                id: "__alloyId35"
            }
        };
        __alloyId34.push($.__views.__alloyId35);
        $.__views.section = Ti.UI.createListSection({
            id: "section"
        });
        __alloyId32.push($.__views.section);
        $.__views.section.items = __alloyId34;
        $.__views.list = Ti.UI.createListView({
            sections: __alloyId32,
            templates: __alloyId0,
            id: "list",
            defaultItemTemplate: "template1",
            visible: "false"
        });
        $.__views.feedWindow.add($.__views.list);
        $.__views.table = Ti.UI.createTableView({
            id: "table",
            backgroundColor: "green",
            visible: "false"
        });
        $.__views.feedWindow.add($.__views.table);
        handleClick ? $.__views.table.addEventListener("click", handleClick) : __defers["$.__views.table!click!handleClick"] = true;
        $.__views.backBtn = Ti.UI.createButton({
            left: 0,
            bottom: 0,
            title: "back",
            id: "backBtn"
        });
        $.__views.feedWindow.add($.__views.backBtn);
        backBtnClicked ? $.__views.backBtn.addEventListener("click", backBtnClicked) : __defers["$.__views.backBtn!click!backBtnClicked"] = true;
        $.__views.loadMoreBtn = Ti.UI.createButton({
            right: 0,
            bottom: 0,
            title: "Load More",
            id: "loadMoreBtn"
        });
        $.__views.feedWindow.add($.__views.loadMoreBtn);
        loadMoreBtnClicked ? $.__views.loadMoreBtn.addEventListener("click", loadMoreBtnClicked) : __defers["$.__views.loadMoreBtn!click!loadMoreBtnClicked"] = true;
        $.__views.platformLabel = Ti.UI.createLabel({
            id: "platformLabel"
        });
        $.__views.feedWindow.add($.__views.platformLabel);
    }
    exports.destroy = function() {};
    _.extend($, $.__views);
    var postXML = "";
    GetFeedPosts();
    $.platformLabel.text = "android";
    Ti.API.info("feed loaded");
    __defers["$.__views.table!click!handleClick"] && $.__views.table.addEventListener("click", handleClick);
    __defers["$.__views.backBtn!click!backBtnClicked"] && $.__views.backBtn.addEventListener("click", backBtnClicked);
    __defers["$.__views.loadMoreBtn!click!loadMoreBtnClicked"] && $.__views.loadMoreBtn.addEventListener("click", loadMoreBtnClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;