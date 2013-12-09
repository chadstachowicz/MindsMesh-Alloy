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
        var __alloyId39 = {};
        var __alloyId41 = {
            properties: {
                name: "buttonItem",
                height: Ti.UI.SIZE
            }
        };
        __alloyId39["buttonItem"] = __alloyId41;
        var __alloyId43 = [];
        var __alloyId44 = {
            type: "Ti.UI.ImageView",
            bindId: "pic",
            properties: {
                width: "50dp",
                height: "50dp",
                left: 0,
                bindId: "pic"
            }
        };
        __alloyId43.push(__alloyId44);
        var __alloyId45 = {
            type: "Ti.UI.View",
            childTemplates: function() {
                var __alloyId46 = [];
                var __alloyId47 = {
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
                __alloyId46.push(__alloyId47);
                return __alloyId46;
            }(),
            properties: {}
        };
        __alloyId43.push(__alloyId45);
        var __alloyId42 = {
            properties: {
                height: Ti.UI.SIZE,
                name: "template1"
            },
            childTemplates: __alloyId43
        };
        __alloyId39["template1"] = __alloyId42;
        var __alloyId48 = [];
        var __alloyId50 = [];
        $.__views.__alloyId51 = {
            template: "template1",
            properties: {
                id: "__alloyId51"
            }
        };
        __alloyId50.push($.__views.__alloyId51);
        $.__views.section = Ti.UI.createListSection({
            id: "section"
        });
        __alloyId48.push($.__views.section);
        $.__views.section.items = __alloyId50;
        $.__views.list = Ti.UI.createListView({
            sections: __alloyId48,
            templates: __alloyId39,
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