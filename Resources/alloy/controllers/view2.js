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
    var __alloyId53 = [];
    __alloyId53.push($.__views.sectionFruit);
    $.__views.__alloyId54 = Ti.UI.createTableViewRow({
        title: "Apple",
        id: "__alloyId54"
    });
    $.__views.sectionFruit.add($.__views.__alloyId54);
    $.__views.__alloyId55 = Ti.UI.createTableViewRow({
        title: "Bananas",
        id: "__alloyId55"
    });
    $.__views.sectionFruit.add($.__views.__alloyId55);
    $.__views.sectionVeg = Ti.UI.createTableViewSection({
        id: "sectionVeg",
        headerTitle: "Vegetables"
    });
    __alloyId53.push($.__views.sectionVeg);
    $.__views.__alloyId56 = Ti.UI.createTableViewRow({
        title: "Carrots",
        id: "__alloyId56"
    });
    $.__views.sectionVeg.add($.__views.__alloyId56);
    $.__views.__alloyId57 = Ti.UI.createTableViewRow({
        title: "Potatoes",
        id: "__alloyId57"
    });
    $.__views.sectionVeg.add($.__views.__alloyId57);
    $.__views.sectionFish = Ti.UI.createTableViewSection({
        id: "sectionFish",
        headerTitle: "Fish"
    });
    __alloyId53.push($.__views.sectionFish);
    $.__views.__alloyId58 = Ti.UI.createTableViewRow({
        title: "Cod",
        id: "__alloyId58"
    });
    $.__views.sectionFish.add($.__views.__alloyId58);
    $.__views.__alloyId59 = Ti.UI.createTableViewRow({
        title: "Haddock",
        id: "__alloyId59"
    });
    $.__views.sectionFish.add($.__views.__alloyId59);
    $.__views.table = Ti.UI.createTableView({
        data: __alloyId53,
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