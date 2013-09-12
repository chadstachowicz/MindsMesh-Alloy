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
        var __alloyId36 = {};
        var __alloyId38 = {
            properties: {
                name: "buttonItem",
                height: Ti.UI.SIZE
            }
        };
        __alloyId36["buttonItem"] = __alloyId38;
        var __alloyId40 = [];
        var __alloyId41 = {
            type: "Ti.UI.ImageView",
            bindId: "pic",
            properties: {
                width: "50dp",
                height: "50dp",
                left: 0,
                bindId: "pic"
            }
        };
        __alloyId40.push(__alloyId41);
        var __alloyId42 = {
            type: "Ti.UI.View",
            childTemplates: function() {
                var __alloyId43 = [];
                var __alloyId44 = {
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
                __alloyId43.push(__alloyId44);
                return __alloyId43;
            }(),
            properties: {}
        };
        __alloyId40.push(__alloyId42);
        var __alloyId39 = {
            properties: {
                height: Ti.UI.SIZE,
                name: "template1"
            },
            childTemplates: __alloyId40
        };
        __alloyId36["template1"] = __alloyId39;
        var __alloyId45 = [];
        var __alloyId47 = [];
        $.__views.__alloyId48 = {
            template: "template1",
            properties: {
                id: "__alloyId48"
            }
        };
        __alloyId47.push($.__views.__alloyId48);
        $.__views.section = Ti.UI.createListSection({
            id: "section"
        });
        __alloyId45.push($.__views.section);
        $.__views.section.items = __alloyId47;
        $.__views.list = Ti.UI.createListView({
            sections: __alloyId45,
            templates: __alloyId36,
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