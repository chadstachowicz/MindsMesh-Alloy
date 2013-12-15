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
        var __alloyId40 = {};
        var __alloyId42 = {
            properties: {
                name: "buttonItem",
                height: Ti.UI.SIZE
            }
        };
        __alloyId40["buttonItem"] = __alloyId42;
        var __alloyId44 = [];
        var __alloyId45 = {
            type: "Ti.UI.ImageView",
            bindId: "pic",
            properties: {
                width: "50dp",
                height: "50dp",
                left: 0,
                bindId: "pic"
            }
        };
        __alloyId44.push(__alloyId45);
        var __alloyId46 = {
            type: "Ti.UI.View",
            childTemplates: function() {
                var __alloyId47 = [];
                var __alloyId48 = {
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
                __alloyId47.push(__alloyId48);
                return __alloyId47;
            }(),
            properties: {}
        };
        __alloyId44.push(__alloyId46);
        var __alloyId43 = {
            properties: {
                height: "56dp",
                name: "template1"
            },
            childTemplates: __alloyId44
        };
        __alloyId40["template1"] = __alloyId43;
        var __alloyId49 = [];
        var __alloyId51 = [];
        $.__views.__alloyId52 = {
            template: "template1",
            properties: {
                id: "__alloyId52"
            }
        };
        __alloyId51.push($.__views.__alloyId52);
        $.__views.section = Ti.UI.createListSection({
            id: "section"
        });
        __alloyId49.push($.__views.section);
        $.__views.section.items = __alloyId51;
        $.__views.list = Ti.UI.createListView({
            sections: __alloyId49,
            templates: __alloyId40,
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