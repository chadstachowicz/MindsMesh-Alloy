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
    var __defers = {};
    $.__views.feed2 = Ti.UI.createWindow({
        backgroundColor: "#FFF",
        title: "basic",
        id: "feed2"
    });
    $.__views.feed2 && $.addTopLevelView($.__views.feed2);
    var __alloyId33 = [];
    var __alloyId36 = [];
    $.__views.__alloyId37 = {
        properties: {
            title: "row 1",
            id: "__alloyId37"
        }
    };
    __alloyId36.push($.__views.__alloyId37);
    $.__views.__alloyId38 = {
        properties: {
            title: "row 2",
            id: "__alloyId38"
        }
    };
    __alloyId36.push($.__views.__alloyId38);
    $.__views.__alloyId39 = {
        properties: {
            title: "row 3",
            id: "__alloyId39"
        }
    };
    __alloyId36.push($.__views.__alloyId39);
    $.__views.__alloyId40 = {
        properties: {
            title: "row 4",
            id: "__alloyId40"
        }
    };
    __alloyId36.push($.__views.__alloyId40);
    $.__views.__alloyId41 = {
        properties: {
            title: "row 5",
            id: "__alloyId41"
        }
    };
    __alloyId36.push($.__views.__alloyId41);
    $.__views.__alloyId42 = {
        properties: {
            title: "row 6",
            id: "__alloyId42"
        }
    };
    __alloyId36.push($.__views.__alloyId42);
    $.__views.__alloyId43 = {
        properties: {
            title: "row 7",
            id: "__alloyId43"
        }
    };
    __alloyId36.push($.__views.__alloyId43);
    $.__views.__alloyId44 = {
        properties: {
            title: "row 8",
            id: "__alloyId44"
        }
    };
    __alloyId36.push($.__views.__alloyId44);
    $.__views.__alloyId45 = {
        properties: {
            title: "row 9",
            id: "__alloyId45"
        }
    };
    __alloyId36.push($.__views.__alloyId45);
    $.__views.__alloyId46 = {
        properties: {
            title: "row 10",
            id: "__alloyId46"
        }
    };
    __alloyId36.push($.__views.__alloyId46);
    $.__views.__alloyId34 = Ti.UI.createListSection({
        id: "__alloyId34"
    });
    __alloyId33.push($.__views.__alloyId34);
    $.__views.__alloyId34.items = __alloyId36;
    $.__views.list = Ti.UI.createListView({
        sections: __alloyId33,
        id: "list"
    });
    $.__views.feed2.add($.__views.list);
    onItemClick ? $.__views.list.addEventListener("itemclick", onItemClick) : __defers["$.__views.list!itemclick!onItemClick"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var postXML = "";
    GetFeedPosts();
    Ti.API.info("feed loaded");
    __defers["$.__views.list!itemclick!onItemClick"] && $.__views.list.addEventListener("itemclick", onItemClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;