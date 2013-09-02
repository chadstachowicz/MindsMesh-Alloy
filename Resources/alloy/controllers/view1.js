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
        openWindow("settings");
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
        var children = [];
        children = item.childen;
        var index = 0;
        while (children.length > index) {
            alert("item: " + index + " is " + children[index].id);
            index++;
        }
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
                    image: _data[i].id
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
    this.__controllerPath = "view1";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.view1 = Ti.UI.createView({
        id: "view1"
    });
    $.__views.view1 && $.addTopLevelView($.__views.view1);
    var __alloyId69 = {};
    var __alloyId71 = [];
    var __alloyId72 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId73 = [];
            var __alloyId74 = {
                type: "Ti.UI.ImageView",
                bindId: "pic",
                properties: {
                    left: "0dp",
                    top: "0dp",
                    width: 40,
                    height: 40,
                    bindId: "pic",
                    style: ""
                }
            };
            __alloyId73.push(__alloyId74);
            var __alloyId75 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId76 = [];
                    var __alloyId77 = {
                        type: "Ti.UI.Label",
                        bindId: "textLabel",
                        properties: {
                            width: Ti.UI.SIZE,
                            height: Ti.UI.SIZE,
                            color: "#000",
                            textAlign: "left",
                            top: "0dp",
                            layout: "vertical",
                            bindId: "textLabel"
                        }
                    };
                    __alloyId76.push(__alloyId77);
                    var __alloyId78 = {
                        type: "Ti.UI.View",
                        childTemplates: function() {
                            var __alloyId79 = [];
                            var __alloyId80 = {
                                type: "Ti.UI.Label",
                                bindId: "nameLabel",
                                properties: {
                                    width: Ti.UI.SIZE,
                                    height: Ti.UI.SIZE,
                                    color: "#000",
                                    textAlign: "left",
                                    bindId: "nameLabel"
                                }
                            };
                            __alloyId79.push(__alloyId80);
                            var __alloyId81 = {
                                type: "Ti.UI.ImageView",
                                bindId: "attachmentImage",
                                properties: {
                                    bindId: "attachmentImage"
                                }
                            };
                            __alloyId79.push(__alloyId81);
                            return __alloyId79;
                        }(),
                        properties: {
                            layout: "horizontal",
                            width: Ti.UI.FILL,
                            height: Ti.UI.FILL
                        }
                    };
                    __alloyId76.push(__alloyId78);
                    var __alloyId82 = {
                        type: "Ti.UI.Label",
                        bindId: "idLabel",
                        properties: {
                            width: Ti.UI.SIZE,
                            height: Ti.UI.SIZE,
                            color: "#000",
                            bindId: "idLabel"
                        }
                    };
                    __alloyId76.push(__alloyId82);
                    return __alloyId76;
                }(),
                properties: {
                    width: Ti.UI.SIZE,
                    height: Ti.UI.SIZE,
                    layout: "vertical"
                }
            };
            __alloyId73.push(__alloyId75);
            return __alloyId73;
        }(),
        properties: {
            layout: "horizontal",
            width: Ti.UI.FILL,
            height: Ti.UI.FILL
        },
        events: {
            click: itemClickBtnClicked
        }
    };
    __alloyId71.push(__alloyId72);
    var __alloyId70 = {
        properties: {
            height: Ti.UI.SIZE,
            name: "template1"
        },
        childTemplates: __alloyId71
    };
    __alloyId69["template1"] = __alloyId70;
    var __alloyId83 = [];
    var __alloyId85 = [];
    $.__views.__alloyId86 = {
        template: "template1",
        properties: {
            id: "__alloyId86"
        }
    };
    __alloyId85.push($.__views.__alloyId86);
    $.__views.section = Ti.UI.createListSection({
        id: "section"
    });
    __alloyId83.push($.__views.section);
    $.__views.section.items = __alloyId85;
    $.__views.list = Ti.UI.createListView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        sections: __alloyId83,
        templates: __alloyId69,
        id: "list",
        defaultItemTemplate: "template1"
    });
    $.__views.view1.add($.__views.list);
    ItemClick ? $.__views.list.addEventListener("itemclick", ItemClick) : __defers["$.__views.list!itemclick!ItemClick"] = true;
    $.__views.backBtn = Ti.UI.createButton({
        left: 0,
        bottom: 0,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        title: "back",
        id: "backBtn"
    });
    $.__views.view1.add($.__views.backBtn);
    backBtnClicked ? $.__views.backBtn.addEventListener("click", backBtnClicked) : __defers["$.__views.backBtn!click!backBtnClicked"] = true;
    $.__views.loadMoreBtn = Ti.UI.createButton({
        right: 0,
        bottom: 0,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        title: "Load More",
        id: "loadMoreBtn"
    });
    $.__views.view1.add($.__views.loadMoreBtn);
    loadMoreBtnClicked ? $.__views.loadMoreBtn.addEventListener("click", loadMoreBtnClicked) : __defers["$.__views.loadMoreBtn!click!loadMoreBtnClicked"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var postXML = "";
    GetFeedPosts();
    Ti.API.info("view1 loaded");
    __defers["$.__views.list!itemclick!ItemClick"] && $.__views.list.addEventListener("itemclick", ItemClick);
    __defers["$.__views.backBtn!click!backBtnClicked"] && $.__views.backBtn.addEventListener("click", backBtnClicked);
    __defers["$.__views.loadMoreBtn!click!loadMoreBtnClicked"] && $.__views.loadMoreBtn.addEventListener("click", loadMoreBtnClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;