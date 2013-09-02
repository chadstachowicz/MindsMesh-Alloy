function Controller() {
    function onItemClick(e) {
        var section = $.list.sections[e.sectionIndex];
        var item = section.getItemAt(e.itemIndex);
        alert("itemclick: " + item.properties.title);
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
    this.__controllerPath = "feed2";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.feed2 = Ti.UI.createWindow({
        backgroundColor: "#FFF",
        title: "basic",
        id: "feed2"
    });
    $.__views.feed2 && $.addTopLevelView($.__views.feed2);
    var __alloyId36 = {};
    var __alloyId38 = [];
    var __alloyId39 = {
        type: "Ti.UI.ImageView",
        bindId: "pic",
        properties: {
            bindId: "pic"
        }
    };
    __alloyId38.push(__alloyId39);
    var __alloyId40 = {
        type: "Ti.UI.Label",
        bindId: "textLabel",
        properties: {
            layout: "vertical",
            bindId: "textLabel"
        }
    };
    __alloyId38.push(__alloyId40);
    var __alloyId41 = {
        type: "Ti.UI.Label",
        bindId: "nameLabel",
        properties: {
            bindId: "nameLabel"
        }
    };
    __alloyId38.push(__alloyId41);
    var __alloyId42 = {
        type: "Ti.UI.ImageView",
        bindId: "attachmentImage",
        properties: {
            bindId: "attachmentImage"
        }
    };
    __alloyId38.push(__alloyId42);
    var __alloyId43 = {
        type: "Ti.UI.Label",
        bindId: "idLabel",
        properties: {
            bindId: "idLabel"
        }
    };
    __alloyId38.push(__alloyId43);
    var __alloyId37 = {
        properties: {
            name: "template1"
        },
        events: {
            click: onItemClick
        },
        childTemplates: __alloyId38
    };
    __alloyId36["template1"] = __alloyId37;
    var __alloyId44 = [];
    var __alloyId46 = [];
    $.__views.__alloyId47 = {
        template: "template1",
        properties: {
            id: "__alloyId47"
        }
    };
    __alloyId46.push($.__views.__alloyId47);
    $.__views.section = Ti.UI.createListSection({
        id: "section"
    });
    __alloyId44.push($.__views.section);
    $.__views.section.items = __alloyId46;
    $.__views.list = Ti.UI.createListView({
        sections: __alloyId44,
        templates: __alloyId36,
        id: "list"
    });
    $.__views.feed2.add($.__views.list);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var postXML = "";
    GetFeedPosts();
    Ti.API.info("feed loaded");
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;