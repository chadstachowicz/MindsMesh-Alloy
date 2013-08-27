function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "feedWindow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    if (!Alloy.isTablet) {
        $.__views.feedWindow = Ti.UI.createWindow({
            backgroundColor: "white",
            id: "feedWindow"
        });
        $.__views.feedWindow && $.addTopLevelView($.__views.feedWindow);
        var __alloyId18 = {};
        var __alloyId20 = {
            properties: {
                name: "buttonItem",
                height: Ti.UI.SIZE
            }
        };
        __alloyId18["buttonItem"] = __alloyId20;
        var __alloyId22 = [];
        var __alloyId23 = {
            type: "Ti.UI.ImageView",
            bindId: "pic",
            properties: {
                width: "50dp",
                height: "50dp",
                left: 0,
                bindId: "pic"
            }
        };
        __alloyId22.push(__alloyId23);
        var __alloyId24 = {
            type: "Ti.UI.View",
            childTemplates: function() {
                var __alloyId25 = [];
                var __alloyId26 = {
                    type: "Ti.UI.Label",
                    bindId: "textLabel",
                    properties: {
                        width: Ti.UI.SIZE,
                        height: Ti.UI.SIZE,
                        color: "#000",
                        left: "60dp",
                        top: 0,
                        textAlign: "left",
                        bindId: "textLabel"
                    }
                };
                __alloyId25.push(__alloyId26);
                return __alloyId25;
            }(),
            properties: {}
        };
        __alloyId22.push(__alloyId24);
        var __alloyId21 = {
            properties: {
                height: "56dp",
                name: "template1"
            },
            childTemplates: __alloyId22
        };
        __alloyId18["template1"] = __alloyId21;
        var __alloyId27 = [];
        var __alloyId29 = [];
        $.__views.__alloyId30 = {
            template: "template1",
            properties: {
                id: "__alloyId30"
            }
        };
        __alloyId29.push($.__views.__alloyId30);
        $.__views.section = Ti.UI.createListSection({
            id: "section"
        });
        __alloyId27.push($.__views.section);
        $.__views.section.items = __alloyId29;
        $.__views.list = Ti.UI.createListView({
            sections: __alloyId27,
            templates: __alloyId18,
            id: "list",
            defaultItemTemplate: "template1"
        });
        $.__views.feedWindow.add($.__views.list);
    }
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;