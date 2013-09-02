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
        var __alloyId49 = {};
        var __alloyId51 = {
            properties: {
                name: "buttonItem",
                height: Ti.UI.SIZE
            }
        };
        __alloyId49["buttonItem"] = __alloyId51;
        var __alloyId53 = [];
        var __alloyId54 = {
            type: "Ti.UI.ImageView",
            bindId: "pic",
            properties: {
                width: "50dp",
                height: "50dp",
                left: 0,
                bindId: "pic"
            }
        };
        __alloyId53.push(__alloyId54);
        var __alloyId55 = {
            type: "Ti.UI.View",
            childTemplates: function() {
                var __alloyId56 = [];
                var __alloyId57 = {
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
                __alloyId56.push(__alloyId57);
                return __alloyId56;
            }(),
            properties: {}
        };
        __alloyId53.push(__alloyId55);
        var __alloyId52 = {
            properties: {
                height: Ti.UI.SIZE,
                name: "template1"
            },
            childTemplates: __alloyId53
        };
        __alloyId49["template1"] = __alloyId52;
        var __alloyId58 = [];
        var __alloyId60 = [];
        $.__views.__alloyId61 = {
            template: "template1",
            properties: {
                id: "__alloyId61"
            }
        };
        __alloyId60.push($.__views.__alloyId61);
        $.__views.section = Ti.UI.createListSection({
            id: "section"
        });
        __alloyId58.push($.__views.section);
        $.__views.section.items = __alloyId60;
        $.__views.list = Ti.UI.createListView({
            sections: __alloyId58,
            templates: __alloyId49,
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