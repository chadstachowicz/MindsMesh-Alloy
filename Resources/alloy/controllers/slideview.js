function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "slideview";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "#FFF",
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    var __alloyId79 = [];
    $.__views.view1 = Ti.UI.createView({
        id: "view1",
        backgroundColor: "#123"
    });
    __alloyId79.push($.__views.view1);
    $.__views.view2 = Ti.UI.createView({
        id: "view2",
        backgroundColor: "#246"
    });
    __alloyId79.push($.__views.view2);
    $.__views.view3 = Ti.UI.createView({
        id: "view3",
        backgroundColor: "#48b"
    });
    __alloyId79.push($.__views.view3);
    $.__views.scrollableView = Ti.UI.createScrollableView({
        views: __alloyId79,
        id: "scrollableView",
        showPagingControl: "true"
    });
    $.__views.win.add($.__views.scrollableView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;