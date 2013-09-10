function Controller() {
    function handleClick(e) {
        alert("feedTableview:handleclick()");
        alert(e.row.post_id);
        alert(e.row.data);
        var currentView = Alloy.createController("showpost", e.row.data).getView();
        $.ds.contentview.add(currentView);
    }
    function handleScrollEnd() {}
    function openWindow(windowName) {
        var args = {
            data: "test data",
            value: "other data"
        };
        $.feedTableview.close();
        $.feedTableview = null;
        var view1 = Alloy.createController(windowName, args);
        view1.getView().open();
    }
    function createTableView(_data) {
        var items = [];
        for (var i in _data) items.push(Alloy.createController("tableViewRow", _data[i]).getView());
        $.table.setData(items);
    }
    function GetTableViewFeedPosts() {
        xhr = getPostsWithFamily(Titanium.App.Properties.getString("mmat"));
        xhr.onload = function() {
            postXML = this.responseText;
            eval("createTableView(JSON.parse(postXML));");
        };
        xhr.onerror = function(e) {
            alert(e.message);
        };
        xhr.send();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "feedTableview";
    var __parentSymbol = arguments[0] ? arguments[0]["__parentSymbol"] : null;
    var $model = arguments[0] ? arguments[0]["$model"] : null;
    var __itemTemplate = arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.feedTableview = Ti.UI.createWindow({
        backgroundColor: "#FFF",
        id: "feedTableview"
    });
    $.__views.feedTableview && $.addTopLevelView($.__views.feedTableview);
    $.__views.table = Ti.UI.createTableView({
        id: "table",
        backgroundColor: "#46a346"
    });
    $.__views.feedTableview.add($.__views.table);
    handleClick ? $.__views.table.addEventListener("click", handleClick) : __defers["$.__views.table!click!handleClick"] = true;
    handleScrollEnd ? $.__views.table.addEventListener("scrollend", handleScrollEnd) : __defers["$.__views.table!scrollend!handleScrollEnd"] = true;
    $.__views.platformLabel = Ti.UI.createLabel({
        bottom: 5,
        right: 5,
        id: "platformLabel"
    });
    $.__views.feedTableview.add($.__views.platformLabel);
    $.__views.__alloyId35 = Ti.UI.createLabel({
        text: "tableview for ios",
        left: "50",
        id: "__alloyId35"
    });
    $.__views.feedTableview.add($.__views.__alloyId35);
    exports.destroy = function() {};
    _.extend($, $.__views);
    GetTableViewFeedPosts();
    $.platformLabel.text = "iPhone OS";
    Ti.API.info("tableview feed loaded");
    __defers["$.__views.table!click!handleClick"] && $.__views.table.addEventListener("click", handleClick);
    __defers["$.__views.table!scrollend!handleScrollEnd"] && $.__views.table.addEventListener("scrollend", handleScrollEnd);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;