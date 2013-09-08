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
    var __alloyId63 = {};
    var __alloyId65 = [];
    var __alloyId66 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId67 = [];
            var __alloyId68 = {
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
            __alloyId67.push(__alloyId68);
            var __alloyId69 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId70 = [];
                    var __alloyId71 = {
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
                    __alloyId70.push(__alloyId71);
                    var __alloyId72 = {
                        type: "Ti.UI.View",
                        childTemplates: function() {
                            var __alloyId73 = [];
                            var __alloyId74 = {
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
                            __alloyId73.push(__alloyId74);
                            var __alloyId75 = {
                                type: "Ti.UI.ImageView",
                                bindId: "attachmentImage",
                                properties: {
                                    bindId: "attachmentImage"
                                }
                            };
                            __alloyId73.push(__alloyId75);
                            return __alloyId73;
                        }(),
                        properties: {
                            layout: "horizontal",
                            width: Ti.UI.FILL,
                            height: Ti.UI.FILL
                        }
                    };
                    __alloyId70.push(__alloyId72);
                    var __alloyId76 = {
                        type: "Ti.UI.Label",
                        bindId: "idLabel",
                        properties: {
                            width: Ti.UI.SIZE,
                            height: Ti.UI.SIZE,
                            color: "#000",
                            bindId: "idLabel"
                        }
                    };
                    __alloyId70.push(__alloyId76);
                    return __alloyId70;
                }(),
                properties: {
                    width: Ti.UI.SIZE,
                    height: Ti.UI.SIZE,
                    layout: "vertical"
                }
            };
            __alloyId67.push(__alloyId69);
            return __alloyId67;
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
    __alloyId65.push(__alloyId66);
    var __alloyId64 = {
        properties: {
            height: "56dp",
            name: "template1"
        },
        childTemplates: __alloyId65
    };
    __alloyId63["template1"] = __alloyId64;
    var __alloyId77 = [];
    var __alloyId79 = [];
    $.__views.__alloyId80 = {
        template: "template1",
        properties: {
            id: "__alloyId80"
        }
    };
    __alloyId79.push($.__views.__alloyId80);
    $.__views.section = Ti.UI.createListSection({
        id: "section"
    });
    __alloyId77.push($.__views.section);
    $.__views.section.items = __alloyId79;
    $.__views.list = Ti.UI.createListView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        sections: __alloyId77,
        templates: __alloyId63,
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