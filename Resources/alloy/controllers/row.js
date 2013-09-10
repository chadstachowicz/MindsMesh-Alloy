function Controller() {
    function rowClicked() {
        alert("row clicked: " + $.title.text);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "row";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.rowView = Ti.UI.createTableViewRow({
        id: "rowView"
    });
    $.__views.rowView && $.addTopLevelView($.__views.rowView);
    rowClicked ? $.__views.rowView.addEventListener("click", rowClicked) : __defers["$.__views.rowView!click!rowClicked"] = true;
    $.__views.__alloyId56 = Ti.UI.createView({
        layout: "horizontal",
        id: "__alloyId56"
    });
    $.__views.rowView.add($.__views.__alloyId56);
    $.__views.title = Ti.UI.createLabel({
        left: 0,
        font: {
            fontSize: 15
        },
        backgroundColor: "blue",
        width: 70,
        height: Ti.UI.SIZE,
        id: "title"
    });
    $.__views.__alloyId56.add($.__views.title);
    $.__views.url = Ti.UI.createLabel({
        left: 5,
        font: {
            fontSize: 10
        },
        width: Ti.UI.SIZE,
        height: 30,
        id: "url"
    });
    $.__views.__alloyId56.add($.__views.url);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.title.text = args.title || "";
    $.url.text = args.url || "";
    __defers["$.__views.rowView!click!rowClicked"] && $.__views.rowView.addEventListener("click", rowClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;