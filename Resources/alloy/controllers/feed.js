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
        Ti.API.info("ItemClick: " + item.dataLabel.text);
    }
    function ItemClick2(e) {
        var section = $.list.sections[e.sectionIndex];
        var item = section.getItemAt(e.itemIndex);
        Ti.API.info("ItemClick2: " + item.dataLabel.text);
    }
    function createListView(_data) {
        var items = [];
        for (var i in _data) {
            var imagepath = "";
            _data[i].post_attachments.count > 0 && (imagepath = _data[i].post_attachments[0].ext_path);
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
                attachmentImage: {
                    image: imagepath
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
    function handleClick(e) {
        alert(e.row.post_id);
        alert(e.row.data);
    }
    function ShowJSONData(postJSON) {
        if ("iphone" === Ti.Platform.osname) {
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
                var __alloyId22 = {
                    type: "Ti.UI.View",
                    childTemplates: function() {
                        var __alloyId23 = [];
                        var __alloyId25 = {
                            type: "Ti.UI.ImageView",
                            properties: {
                                image: "/images/paperclip_black_24.png",
                                left: "5"
                            }
                        };
                        __alloyId23.push(__alloyId25);
                        var __alloyId26 = {
                            type: "Ti.UI.Label",
                            bindId: "idLabel",
                            properties: {
                                color: "#000",
                                width: Ti.UI.SIZE,
                                height: Ti.UI.SIZE,
                                bindId: "idLabel"
                            }
                        };
                        __alloyId23.push(__alloyId26);
                        var __alloyId27 = {
                            type: "Ti.UI.Label",
                            bindId: "commentCountLabel",
                            properties: {
                                bindId: "commentCountLabel",
                                left: "200"
                            }
                        };
                        __alloyId23.push(__alloyId27);
                        var __alloyId29 = {
                            type: "Ti.UI.ImageView",
                            properties: {
                                image: "/images/comment_32.png",
                                left: "10"
                            }
                        };
                        __alloyId23.push(__alloyId29);
                        return __alloyId23;
                    }(),
                    properties: {
                        layout: "horizontal",
                        backgroundColor: "#eeeeee"
                    }
                };
                __alloyId5.push(__alloyId22);
                var __alloyId30 = {
                    type: "Ti.UI.Label",
                    bindId: "dataLabel",
                    properties: {
                        bindId: "dataLabel",
                        visible: "false",
                        width: "0",
                        height: "0"
                    }
                };
                __alloyId5.push(__alloyId30);
                var __alloyId32 = {
                    type: "Ti.UI.Label",
                    properties: {
                        text: "listview"
                    }
                };
                __alloyId5.push(__alloyId32);
                return __alloyId5;
            }(),
            properties: {
                layout: "vertical"
            }
        };
        __alloyId2.push(__alloyId4);
        var __alloyId1 = {
            properties: {
                height: 46,
                name: "template1"
            },
            events: {
                click: ItemClick
            },
            childTemplates: __alloyId2
        };
        __alloyId0["template1"] = __alloyId1;
        var __alloyId33 = [];
        var __alloyId35 = [];
        $.__views.__alloyId36 = {
            template: "template1",
            properties: {
                id: "__alloyId36"
            }
        };
        __alloyId35.push($.__views.__alloyId36);
        $.__views.section = Ti.UI.createListSection({
            id: "section"
        });
        __alloyId33.push($.__views.section);
        $.__views.section.items = __alloyId35;
        $.__views.list = Ti.UI.createListView({
            sections: __alloyId33,
            templates: __alloyId0,
            id: "list",
            defaultItemTemplate: "template1",
            visible: "false"
        });
        $.__views.feedWindow.add($.__views.list);
        ItemClick2 ? $.__views.list.addEventListener("itemclick", ItemClick2) : __defers["$.__views.list!itemclick!ItemClick2"] = true;
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
    $.platformLabel.text = "iPhone OS";
    Ti.API.info("feed loaded");
    __defers["$.__views.list!itemclick!ItemClick2"] && $.__views.list.addEventListener("itemclick", ItemClick2);
    __defers["$.__views.table!click!handleClick"] && $.__views.table.addEventListener("click", handleClick);
    __defers["$.__views.backBtn!click!backBtnClicked"] && $.__views.backBtn.addEventListener("click", backBtnClicked);
    __defers["$.__views.loadMoreBtn!click!loadMoreBtnClicked"] && $.__views.loadMoreBtn.addEventListener("click", loadMoreBtnClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;