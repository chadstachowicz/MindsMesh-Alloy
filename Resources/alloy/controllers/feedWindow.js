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
        var __alloyId47 = {};
        var __alloyId49 = {
            properties: {
                name: "buttonItem",
                height: Ti.UI.SIZE
            }
        };
        __alloyId47["buttonItem"] = __alloyId49;
        var __alloyId51 = [];
        var __alloyId52 = {
            type: "Ti.UI.ImageView",
            bindId: "pic",
            properties: {
                width: "50dp",
                height: "50dp",
                left: 0,
                bindId: "pic"
            }
        };
        __alloyId51.push(__alloyId52);
        var __alloyId53 = {
            type: "Ti.UI.View",
            childTemplates: function() {
                var __alloyId54 = [];
                var __alloyId55 = {
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
                __alloyId54.push(__alloyId55);
                return __alloyId54;
            }(),
            properties: {}
        };
        __alloyId51.push(__alloyId53);
        var __alloyId50 = {
            properties: {
                height: Ti.UI.SIZE,
                name: "template1"
            },
            childTemplates: __alloyId51
        };
        __alloyId47["template1"] = __alloyId50;
        var __alloyId56 = [];
        var __alloyId58 = [];
        $.__views.__alloyId59 = {
            template: "template1",
            properties: {
                id: "__alloyId59"
            }
        };
        __alloyId58.push($.__views.__alloyId59);
        $.__views.section = Ti.UI.createListSection({
            id: "section"
        });
        __alloyId56.push($.__views.section);
        $.__views.section.items = __alloyId58;
        $.__views.list = Ti.UI.createListView({
            sections: __alloyId56,
            templates: __alloyId47,
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