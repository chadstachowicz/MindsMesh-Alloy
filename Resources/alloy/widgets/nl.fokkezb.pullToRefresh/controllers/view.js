function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "nl.fokkezb.pullToRefresh/" + s : s.substring(0, index) + "/nl.fokkezb.pullToRefresh/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

function Controller() {
    new (require("alloy/widget"))("nl.fokkezb.pullToRefresh");
    this.__widgetId = "nl.fokkezb.pullToRefresh";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "view";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.ptr = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: 50,
        backgroundColor: "#eeeeee",
        id: "ptr"
    });
    $.__views.ptr && $.addTopLevelView($.__views.ptr);
    $.__views.prtCenter = Ti.UI.createView({
        bottom: 10,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        id: "prtCenter"
    });
    $.__views.ptr.add($.__views.prtCenter);
    $.__views.ptrArrow = Ti.UI.createImageView({
        left: 8,
        width: 12,
        height: 30,
        image: WPATH("/images/grey.png"),
        id: "ptrArrow"
    });
    $.__views.prtCenter.add($.__views.ptrArrow);
    $.__views.ptrIndicator = Ti.UI.createActivityIndicator({
        left: 0,
        style: Ti.UI.ActivityIndicatorStyle.DARK,
        id: "ptrIndicator"
    });
    $.__views.prtCenter.add($.__views.ptrIndicator);
    $.__views.ptrText = Ti.UI.createLabel({
        left: 30,
        color: "#777",
        font: {
            fontSize: 13,
            fontWeight: "bold"
        },
        id: "ptrText"
    });
    $.__views.prtCenter.add($.__views.ptrText);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;