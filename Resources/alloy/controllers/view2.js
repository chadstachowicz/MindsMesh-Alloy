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
    var __alloyId78 = [];
    __alloyId78.push($.__views.sectionFruit);
    $.__views.__alloyId79 = Ti.UI.createTableViewRow({
        title: "Apple",
        id: "__alloyId79"
    });
    $.__views.sectionFruit.add($.__views.__alloyId79);
    $.__views.__alloyId80 = Ti.UI.createTableViewRow({
        title: "Bananas",
        id: "__alloyId80"
    });
    $.__views.sectionFruit.add($.__views.__alloyId80);
    $.__views.sectionVeg = Ti.UI.createTableViewSection({
        id: "sectionVeg",
        headerTitle: "Vegetables"
    });
    __alloyId78.push($.__views.sectionVeg);
    $.__views.__alloyId81 = Ti.UI.createTableViewRow({
        title: "Carrots",
        id: "__alloyId81"
    });
    $.__views.sectionVeg.add($.__views.__alloyId81);
    $.__views.__alloyId82 = Ti.UI.createTableViewRow({
        title: "Potatoes",
        id: "__alloyId82"
    });
    $.__views.sectionVeg.add($.__views.__alloyId82);
    $.__views.sectionFish = Ti.UI.createTableViewSection({
        id: "sectionFish",
        headerTitle: "Fish"
    });
    __alloyId78.push($.__views.sectionFish);
    $.__views.__alloyId83 = Ti.UI.createTableViewRow({
        title: "Cod",
        id: "__alloyId83"
    });
    $.__views.sectionFish.add($.__views.__alloyId83);
    $.__views.__alloyId84 = Ti.UI.createTableViewRow({
        title: "Haddock",
        id: "__alloyId84"
    });
    $.__views.sectionFish.add($.__views.__alloyId84);
    $.__views.table = Ti.UI.createTableView({
        data: __alloyId78,
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