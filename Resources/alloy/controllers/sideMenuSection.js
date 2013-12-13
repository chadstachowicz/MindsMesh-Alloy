function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "sideMenuSection";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.tableViewSection = Ti.UI.createTableViewSection({
        id: "tableViewSection"
    });
    $.__views.tableViewSection && $.addTopLevelView($.__views.tableViewSection);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.tableViewSection.headerTitle = "Classes";
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;