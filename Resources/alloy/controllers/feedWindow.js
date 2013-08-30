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
        var __alloyId19 = {};
        var __alloyId21 = {
            properties: {
                name: "buttonItem",
                height: Ti.UI.SIZE
            }
        };
        __alloyId19["buttonItem"] = __alloyId21;
        var __alloyId23 = [];
        var __alloyId24 = {
            type: "Ti.UI.ImageView",
            bindId: "pic",
            properties: {
                width: "50dp",
                height: "50dp",
                left: 0,
                bindId: "pic"
            }
        };
        __alloyId23.push(__alloyId24);
        var __alloyId25 = {
            type: "Ti.UI.View",
            childTemplates: function() {
                var __alloyId26 = [];
                var __alloyId27 = {
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
                __alloyId26.push(__alloyId27);
                return __alloyId26;
            }(),
            properties: {}
        };
        __alloyId23.push(__alloyId25);
        var __alloyId22 = {
            properties: {
                height: "56dp",
                name: "template1"
            },
            childTemplates: __alloyId23
        };
        __alloyId19["template1"] = __alloyId22;
        var __alloyId28 = [];
        var __alloyId30 = [];
        $.__views.__alloyId31 = {
            template: "template1",
            properties: {
                id: "__alloyId31"
            }
        };
        __alloyId30.push($.__views.__alloyId31);
        $.__views.section = Ti.UI.createListSection({
            id: "section"
        });
        __alloyId28.push($.__views.section);
        $.__views.section.items = __alloyId30;
        $.__views.list = Ti.UI.createListView({
            sections: __alloyId28,
            templates: __alloyId19,
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