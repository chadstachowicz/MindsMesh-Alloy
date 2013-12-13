function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "navWindow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.__alloyId63 = Ti.UI.createWindow({
        backgroundColor: "#FFF",
        barColor: "#15B17A",
        navTintColor: "#ffffff",
        translucent: "false",
        id: "__alloyId63"
    });
    $.__views.navWindow = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.__alloyId63,
        id: "navWindow"
    });
    $.__views.navWindow && $.addTopLevelView($.__views.navWindow);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;