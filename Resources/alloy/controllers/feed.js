function Controller() {
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
        section.getItemAt(e.itemIndex);
        alert("itemclick: " + e.itemIndex);
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
                }
            });
        }
        $.section.setItems(items);
    }
    function GetFeedPosts() {
        xhr = getPostsWithFamily(Titanium.App.Properties.getString("mmat"));
        xhr.onload = function() {
            postXML = this.responseText;
            createListView(JSON.parse(postXML));
        };
        xhr.onerror = function(e) {
            alert(e.message);
        };
        xhr.send();
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
                        var __alloyId24 = {
                            type: "Ti.UI.Label",
                            bindId: "idLabel",
                            properties: {
                                color: "#000",
                                width: Ti.UI.SIZE,
                                height: Ti.UI.SIZE,
                                bindId: "idLabel"
                            }
                        };
                        __alloyId23.push(__alloyId24);
                        var __alloyId26 = {
                            type: "Ti.UI.Label",
                            properties: {
                                text: "0",
                                left: "100"
                            }
                        };
                        __alloyId23.push(__alloyId26);
                        var __alloyId28 = {
                            type: "Ti.UI.Label",
                            properties: {
                                text: "comments",
                                left: "10"
                            }
                        };
                        __alloyId23.push(__alloyId28);
                        return __alloyId23;
                    }(),
                    properties: {
                        layout: "horizontal",
                        backgroundColor: "#eeeeee"
                    }
                };
                __alloyId5.push(__alloyId22);
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
        var __alloyId29 = [];
        var __alloyId31 = [];
        $.__views.__alloyId32 = {
            template: "template1",
            properties: {
                id: "__alloyId32"
            }
        };
        __alloyId31.push($.__views.__alloyId32);
        $.__views.section = Ti.UI.createListSection({
            id: "section"
        });
        __alloyId29.push($.__views.section);
        $.__views.section.items = __alloyId31;
        $.__views.list = Ti.UI.createListView({
            sections: __alloyId29,
            templates: __alloyId0,
            id: "list",
            defaultItemTemplate: "template1"
        });
        $.__views.feedWindow.add($.__views.list);
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
    }
    exports.destroy = function() {};
    _.extend($, $.__views);
    var postXML = "";
    GetFeedPosts();
    Ti.API.info("feed loaded");
    __defers["$.__views.backBtn!click!backBtnClicked"] && $.__views.backBtn.addEventListener("click", backBtnClicked);
    __defers["$.__views.loadMoreBtn!click!loadMoreBtnClicked"] && $.__views.loadMoreBtn.addEventListener("click", loadMoreBtnClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;