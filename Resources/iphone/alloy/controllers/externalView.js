function Controller() {
    function openWindow(windowName) {
        var args = {
            data: "test data",
            value: "other data"
        };
        $.externalViewWindow.close();
        $.externalViewWindow = null;
        var view1 = Alloy.createController(windowName, args);
        view1.getView().open();
    }
    function backBtnClicked() {
        openWindow("feed");
    }
    function doClick() {
        alert($.headerLabel.text);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "externalView";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.externalViewWindow = Ti.UI.createWindow({
        backgroundColor: "#FFF",
        orientationModes: [ Titanium.UI.PORTRAIT ],
        id: "externalViewWindow"
    });
    $.__views.externalViewWindow && $.addTopLevelView($.__views.externalViewWindow);
    $.__views.headerLabel = Ti.UI.createLabel({
        top: 0,
        font: {
            fontSize: 25
        },
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        text: "Settings",
        id: "headerLabel"
    });
    $.__views.externalViewWindow.add($.__views.headerLabel);
    doClick ? $.__views.headerLabel.addEventListener("click", doClick) : __defers["$.__views.headerLabel!click!doClick"] = true;
    $.__views.tableView = Ti.UI.createTableView({
        width: Ti.UI.SIZE,
        id: "tableView"
    });
    $.__views.externalViewWindow.add($.__views.tableView);
    $.__views.backBtn = Ti.UI.createButton({
        left: 0,
        bottom: 0,
        title: "back",
        id: "backBtn"
    });
    $.__views.externalViewWindow.add($.__views.backBtn);
    backBtnClicked ? $.__views.backBtn.addEventListener("click", backBtnClicked) : __defers["$.__views.backBtn!click!backBtnClicked"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var data = [];
    data.push(Alloy.createController("row", {
        title: "fight club",
        url: "other data1"
    }).getView());
    data.push(Alloy.createController("row", {
        title: "heat",
        url: "other data2"
    }).getView());
    data.push(Alloy.createController("row", {
        title: "fight club2",
        url: "other data1"
    }).getView());
    data.push(Alloy.createController("row", {
        title: "heat2",
        url: "other data2"
    }).getView());
    $.tableView.setData(data);
    $.externalViewWindow.open();
    __defers["$.__views.headerLabel!click!doClick"] && $.__views.headerLabel.addEventListener("click", doClick);
    __defers["$.__views.backBtn!click!backBtnClicked"] && $.__views.backBtn.addEventListener("click", backBtnClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;