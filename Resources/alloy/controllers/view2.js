function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "view2";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.view2 = Ti.UI.createView({
        id: "view2"
    });
    $.__views.view2 && $.addTopLevelView($.__views.view2);
    $.__views.sectionFruit = Ti.UI.createTableViewSection({
        id: "sectionFruit",
        headerTitle: "Fruit"
    });
    var __alloyId89 = [];
    __alloyId89.push($.__views.sectionFruit);
    $.__views.__alloyId90 = Ti.UI.createTableViewRow({
        title: "Apple",
        id: "__alloyId90"
    });
    $.__views.sectionFruit.add($.__views.__alloyId90);
    $.__views.__alloyId91 = Ti.UI.createTableViewRow({
        title: "Bananas",
        id: "__alloyId91"
    });
    $.__views.sectionFruit.add($.__views.__alloyId91);
    $.__views.sectionVeg = Ti.UI.createTableViewSection({
        id: "sectionVeg",
        headerTitle: "Vegetables"
    });
    __alloyId89.push($.__views.sectionVeg);
    $.__views.__alloyId92 = Ti.UI.createTableViewRow({
        title: "Carrots",
        id: "__alloyId92"
    });
    $.__views.sectionVeg.add($.__views.__alloyId92);
    $.__views.__alloyId93 = Ti.UI.createTableViewRow({
        title: "Potatoes",
        id: "__alloyId93"
    });
    $.__views.sectionVeg.add($.__views.__alloyId93);
    $.__views.sectionFish = Ti.UI.createTableViewSection({
        id: "sectionFish",
        headerTitle: "Fish"
    });
    __alloyId89.push($.__views.sectionFish);
    $.__views.__alloyId94 = Ti.UI.createTableViewRow({
        title: "Cod",
        id: "__alloyId94"
    });
    $.__views.sectionFish.add($.__views.__alloyId94);
    $.__views.__alloyId95 = Ti.UI.createTableViewRow({
        title: "Haddock",
        id: "__alloyId95"
    });
    $.__views.sectionFish.add($.__views.__alloyId95);
    $.__views.table = Ti.UI.createTableView({
        data: __alloyId89,
        id: "table"
    });
    $.__views.view2.add($.__views.table);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.App.addEventListener("sliderToggled", function(e) {
        $.table.touchEnabled = e.hasSlided ? false : true;
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;