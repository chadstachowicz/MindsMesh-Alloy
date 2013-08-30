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
    var __alloyId63 = [];
    __alloyId63.push($.__views.sectionFruit);
    $.__views.__alloyId64 = Ti.UI.createTableViewRow({
        title: "Apple",
        id: "__alloyId64"
    });
    $.__views.sectionFruit.add($.__views.__alloyId64);
    $.__views.__alloyId65 = Ti.UI.createTableViewRow({
        title: "Bananas",
        id: "__alloyId65"
    });
    $.__views.sectionFruit.add($.__views.__alloyId65);
    $.__views.sectionVeg = Ti.UI.createTableViewSection({
        id: "sectionVeg",
        headerTitle: "Vegetables"
    });
    __alloyId63.push($.__views.sectionVeg);
    $.__views.__alloyId66 = Ti.UI.createTableViewRow({
        title: "Carrots",
        id: "__alloyId66"
    });
    $.__views.sectionVeg.add($.__views.__alloyId66);
    $.__views.__alloyId67 = Ti.UI.createTableViewRow({
        title: "Potatoes",
        id: "__alloyId67"
    });
    $.__views.sectionVeg.add($.__views.__alloyId67);
    $.__views.sectionFish = Ti.UI.createTableViewSection({
        id: "sectionFish",
        headerTitle: "Fish"
    });
    __alloyId63.push($.__views.sectionFish);
    $.__views.__alloyId68 = Ti.UI.createTableViewRow({
        title: "Cod",
        id: "__alloyId68"
    });
    $.__views.sectionFish.add($.__views.__alloyId68);
    $.__views.__alloyId69 = Ti.UI.createTableViewRow({
        title: "Haddock",
        id: "__alloyId69"
    });
    $.__views.sectionFish.add($.__views.__alloyId69);
    $.__views.table = Ti.UI.createTableView({
        data: __alloyId63,
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