function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Copy of sideMenuSection";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.sideMenu = Ti.UI.createWindow({
        backgroundColor: "#252525",
        id: "sideMenu"
    });
    $.__views.sideMenu && $.addTopLevelView($.__views.sideMenu);
    var __alloyId1 = [];
    $.__views.tableViewMenu = Ti.UI.createTableViewSection({
        id: "tableViewMenu",
        headerTitle: "Menu"
    });
    __alloyId1.push($.__views.tableViewMenu);
    $.__views.tableViewClasses = Ti.UI.createTableViewSection({
        id: "tableViewClasses",
        headerTitle: "Classes"
    });
    __alloyId1.push($.__views.tableViewClasses);
    $.__views.tableViewGroups = Ti.UI.createTableViewSection({
        id: "tableViewGroups",
        headerTitle: "Groups"
    });
    __alloyId1.push($.__views.tableViewGroups);
    $.__views.tableViewSettings = Ti.UI.createTableViewSection({
        id: "tableViewSettings",
        headerTitle: "Settings"
    });
    __alloyId1.push($.__views.tableViewSettings);
    $.__views.SettingsRow = Ti.UI.createTableViewRow({
        id: "SettingsRow",
        height: "40dp"
    });
    $.__views.tableViewSettings.add($.__views.SettingsRow);
    $.__views.lbl = Ti.UI.createLabel({
        text: "Logout",
        id: "lbl",
        color: "#fff",
        left: "45",
        textAlign: "left"
    });
    $.__views.SettingsRow.add($.__views.lbl);
    reloadMenu ? $.__views.lbl.addEventListener("click", reloadMenu) : __defers["$.__views.lbl!click!reloadMenu"] = true;
    $.__views.menuTableView = Ti.UI.createTableView({
        data: __alloyId1,
        id: "menuTableView",
        backgroundColor: "#252525",
        separatorColor: "#000",
        width: "260dp",
        left: "0dp",
        top: "20dp"
    });
    $.__views.sideMenu.add($.__views.menuTableView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.lbl!click!reloadMenu"] && $.__views.lbl.addEventListener("click", reloadMenu);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;