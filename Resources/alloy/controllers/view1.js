function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "view1";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.view1 = Ti.UI.createView({
        id: "view1"
    });
    $.__views.view1 && $.addTopLevelView($.__views.view1);
    $.__views.__alloyId36 = Ti.UI.createLabel({
        text: "View 1",
        id: "__alloyId36"
    });
    $.__views.view1.add($.__views.__alloyId36);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;