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
    function createTableView(_data) {
        var items = [];
        for (var i in _data) items.push(Alloy.createController("tableViewRow", _data[i]).getView());
        $.table.setData(items);
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
            id: "feed"
        });
        $.__views.feed && $.addTopLevelView($.__views.feed);
        $.__views.table = Ti.UI.createTableView({
            id: "table",
            backgroundColor: "#46a346",
            visible: "false"
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
                                width: 40,
                                height: 40,
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
                                left: "0"
                            }
                        };
                        __alloyId20.push(__alloyId21);
                        var __alloyId22 = {
                            type: "Ti.UI.Label",
                            bindId: "commentCountLabel",
                            properties: {
                                bindId: "commentCountLabel",
                                right: "40"
                            }
                        };
                        __alloyId20.push(__alloyId22);
                        var __alloyId24 = {
                            type: "Ti.UI.ImageView",
                            properties: {
                                image: "/images/comment_32.png",
                                right: "5"
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
                height: 46,
                name: "template1",
                backgroundColor: "#46a346"
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
                id: "__alloyId34"
            }
        };
        __alloyId33.push($.__views.__alloyId34);
        $.__views.section = Ti.UI.createListSection({
            id: "section"
        });
        __alloyId31.push($.__views.section);
        $.__views.section.items = __alloyId33;
        $.__views.list = Ti.UI.createListView({
            sections: __alloyId31,
            templates: __alloyId1,
            id: "list",
            defaultItemTemplate: "template1",
            visible: "false"
        });
        $.__views.feed.add($.__views.list);
        $.__views.loadMoreBtn = Ti.UI.createButton({
            title: "Load More",
            id: "loadMoreBtn",
            left: "0",
            bottom: "0"
        });
        $.__views.feed.add($.__views.loadMoreBtn);
        loadMoreBtnClicked ? $.__views.loadMoreBtn.addEventListener("click", loadMoreBtnClicked) : __defers["$.__views.loadMoreBtn!click!loadMoreBtnClicked"] = true;
        $.__views.addImageBtn = Ti.UI.createButton({
            title: "Add Pic",
            id: "addImageBtn",
            right: "80",
            bottom: "0"
        });
        $.__views.feed.add($.__views.addImageBtn);
        loadMoreBtnClicked ? $.__views.addImageBtn.addEventListener("click", loadMoreBtnClicked) : __defers["$.__views.addImageBtn!click!loadMoreBtnClicked"] = true;
        $.__views.commentBtn = Ti.UI.createButton({
            title: "Comment",
            id: "commentBtn",
            right: "0",
            bottom: "0"
        });
        $.__views.feed.add($.__views.commentBtn);
        loadMoreBtnClicked ? $.__views.commentBtn.addEventListener("click", loadMoreBtnClicked) : __defers["$.__views.commentBtn!click!loadMoreBtnClicked"] = true;
        $.__views.platformLabel = Ti.UI.createLabel({
            id: "platformLabel",
            visible: "false"
        });
        $.__views.feed.add($.__views.platformLabel);
    }
    exports.destroy = function() {};
    _.extend($, $.__views);
    var postXML = "";
    GetFeedPosts();
    $.platformLabel.text = "iPhone OS";
    Ti.API.info("feed loaded");
    __defers["$.__views.table!click!tableViewHandleClick"] && $.__views.table.addEventListener("click", tableViewHandleClick);
    __defers["$.__views.loadMoreBtn!click!loadMoreBtnClicked"] && $.__views.loadMoreBtn.addEventListener("click", loadMoreBtnClicked);
    __defers["$.__views.addImageBtn!click!loadMoreBtnClicked"] && $.__views.addImageBtn.addEventListener("click", loadMoreBtnClicked);
    __defers["$.__views.commentBtn!click!loadMoreBtnClicked"] && $.__views.commentBtn.addEventListener("click", loadMoreBtnClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;