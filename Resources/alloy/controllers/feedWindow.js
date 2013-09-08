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
        var __alloyId35 = {};
        var __alloyId37 = {
            properties: {
                name: "buttonItem",
                height: Ti.UI.SIZE
            }
        };
        __alloyId35["buttonItem"] = __alloyId37;
        var __alloyId39 = [];
        var __alloyId40 = {
            type: "Ti.UI.ImageView",
            bindId: "pic",
            properties: {
                width: "50dp",
                height: "50dp",
                left: 0,
                bindId: "pic"
            }
        };
        __alloyId39.push(__alloyId40);
        var __alloyId41 = {
            type: "Ti.UI.View",
            childTemplates: function() {
                var __alloyId42 = [];
                var __alloyId43 = {
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
                __alloyId42.push(__alloyId43);
                return __alloyId42;
            }(),
            properties: {}
        };
        __alloyId39.push(__alloyId41);
        var __alloyId38 = {
            properties: {
                height: "56dp",
                name: "template1"
            },
            childTemplates: __alloyId39
        };
        __alloyId35["template1"] = __alloyId38;
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
            templates: __alloyId35,
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