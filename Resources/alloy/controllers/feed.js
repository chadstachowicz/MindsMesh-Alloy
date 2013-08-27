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
        openWindow("index2");
    }
    function loadMoreBtnClicked() {
        alert(postXML);
    }
    function itemClickBtnClicked() {
        alert("button clicked");
    }
    function ItemClick(e) {
        alert("called ItemClick");
        var section = $.list.sections[e.sectionIndex];
        var item = section.getItemAt(e.itemIndex);
        alert("item: " + item.idLabel.text);
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
                    text: "date"
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
        var __alloyId3 = {
            type: "Ti.UI.View",
            childTemplates: function() {
                var __alloyId4 = [];
                var __alloyId5 = {
                    type: "Ti.UI.ImageView",
                    bindId: "pic",
                    properties: {
                        left: "0dp",
                        top: "0dp",
                        width: Ti.UI.SIZE,
                        height: Ti.UI.SIZE,
                        bindId: "pic"
                    }
                };
                __alloyId4.push(__alloyId5);
                var __alloyId6 = {
                    type: "Ti.UI.View",
                    childTemplates: function() {
                        var __alloyId7 = [];
                        var __alloyId8 = {
                            type: "Ti.UI.Label",
                            bindId: "textLabel",
                            properties: {
                                color: "#000",
                                textAlign: "left",
                                top: "0dp",
                                backgroundColor: "blue",
                                width: Ti.UI.FILL,
                                height: Ti.UI.SIZE,
                                layout: "vertical",
                                bindId: "textLabel"
                            }
                        };
                        __alloyId7.push(__alloyId8);
                        var __alloyId9 = {
                            type: "Ti.UI.View",
                            childTemplates: function() {
                                var __alloyId10 = [];
                                var __alloyId11 = {
                                    type: "Ti.UI.Label",
                                    bindId: "nameLabel",
                                    properties: {
                                        color: "#000",
                                        textAlign: "left",
                                        backgroundColor: "green",
                                        width: Ti.UI.SIZE,
                                        height: Ti.UI.SIZE,
                                        bindId: "nameLabel"
                                    }
                                };
                                __alloyId10.push(__alloyId11);
                                var __alloyId12 = {
                                    type: "Ti.UI.ImageView",
                                    bindId: "attachmentImage",
                                    properties: {
                                        bindId: "attachmentImage"
                                    }
                                };
                                __alloyId10.push(__alloyId12);
                                return __alloyId10;
                            }(),
                            properties: {
                                backgroundColor: "red",
                                layout: "horizontal",
                                textAlign: "left",
                                width: Ti.UI.FILL,
                                height: Ti.UI.FILL
                            }
                        };
                        __alloyId7.push(__alloyId9);
                        var __alloyId13 = {
                            type: "Ti.UI.Label",
                            bindId: "idLabel",
                            properties: {
                                color: "#000",
                                textAlign: "left",
                                width: Ti.UI.SIZE,
                                height: Ti.UI.SIZE,
                                backgroundColor: "blue",
                                bindId: "idLabel"
                            }
                        };
                        __alloyId7.push(__alloyId13);
                        return __alloyId7;
                    }(),
                    properties: {
                        textAlign: "left",
                        width: Ti.UI.SIZE,
                        height: Ti.UI.SIZE,
                        layout: "vertical"
                    }
                };
                __alloyId4.push(__alloyId6);
                return __alloyId4;
            }(),
            properties: {
                backgroundColor: "red",
                layout: "horizontal",
                textAlign: "left",
                width: Ti.UI.FILL,
                height: Ti.UI.FILL
            },
            events: {
                click: itemClickBtnClicked
            }
        };
        __alloyId2.push(__alloyId3);
        var __alloyId1 = {
            properties: {
                width: Ti.UI.SIZE,
                height: Ti.UI.SIZE,
                name: "template1"
            },
            childTemplates: __alloyId2
        };
        __alloyId0["template1"] = __alloyId1;
        var __alloyId14 = [];
        var __alloyId16 = [];
        $.__views.__alloyId17 = {
            template: "template1",
            properties: {
                id: "__alloyId17"
            }
        };
        __alloyId16.push($.__views.__alloyId17);
        $.__views.section = Ti.UI.createListSection({
            id: "section"
        });
        __alloyId14.push($.__views.section);
        $.__views.section.items = __alloyId16;
        $.__views.list = Ti.UI.createListView({
            sections: __alloyId14,
            templates: __alloyId0,
            id: "list",
            defaultItemTemplate: "template1"
        });
        $.__views.feedWindow.add($.__views.list);
        ItemClick ? $.__views.list.addEventListener("itemclick", ItemClick) : __defers["$.__views.list!itemclick!ItemClick"] = true;
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
    __defers["$.__views.list!itemclick!ItemClick"] && $.__views.list.addEventListener("itemclick", ItemClick);
    __defers["$.__views.backBtn!click!backBtnClicked"] && $.__views.backBtn.addEventListener("click", backBtnClicked);
    __defers["$.__views.loadMoreBtn!click!loadMoreBtnClicked"] && $.__views.loadMoreBtn.addEventListener("click", loadMoreBtnClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;