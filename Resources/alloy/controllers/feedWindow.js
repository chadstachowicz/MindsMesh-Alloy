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
        var __alloyId50 = {};
        var __alloyId52 = {
            properties: {
                name: "buttonItem",
                height: Ti.UI.SIZE
            }
        };
        __alloyId50["buttonItem"] = __alloyId52;
        var __alloyId54 = [];
        var __alloyId55 = {
            type: "Ti.UI.ImageView",
            bindId: "pic",
            properties: {
                width: "50dp",
                height: "50dp",
                left: 0,
                bindId: "pic"
            }
        };
        __alloyId54.push(__alloyId55);
        var __alloyId56 = {
            type: "Ti.UI.View",
            childTemplates: function() {
                var __alloyId57 = [];
                var __alloyId58 = {
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
                __alloyId57.push(__alloyId58);
                return __alloyId57;
            }(),
            properties: {}
        };
        __alloyId54.push(__alloyId56);
        var __alloyId53 = {
            properties: {
                height: "56dp",
                name: "template1"
            },
            childTemplates: __alloyId54
        };
        __alloyId50["template1"] = __alloyId53;
        var __alloyId59 = [];
        var __alloyId61 = [];
        $.__views.__alloyId62 = {
            template: "template1",
            properties: {
                id: "__alloyId62"
            }
        };
        __alloyId61.push($.__views.__alloyId62);
        $.__views.section = Ti.UI.createListSection({
            id: "section"
        });
        __alloyId59.push($.__views.section);
        $.__views.section.items = __alloyId61;
        $.__views.list = Ti.UI.createListView({
            sections: __alloyId59,
            templates: __alloyId50,
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