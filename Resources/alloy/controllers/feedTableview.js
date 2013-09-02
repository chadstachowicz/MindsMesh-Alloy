function Controller() {
    function handleClick(e) {
        alert(e.row.post_id);
        alert(e.row.data);
    }
    function handleScrollEnd() {}
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
        backgroundColor: "green"
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
    $.__views.__alloyId48 = Ti.UI.createLabel({
        text: "tableview for ios",
        left: "50",
        id: "__alloyId48"
    });
    $.__views.feedTableview.add($.__views.__alloyId48);
    exports.destroy = function() {};
    _.extend($, $.__views);
    GetTableViewFeedPosts();
    $.platformLabel.text = "android";
    Ti.API.info("tableview feed loaded");
    __defers["$.__views.table!click!handleClick"] && $.__views.table.addEventListener("click", handleClick);
    __defers["$.__views.table!scrollend!handleScrollEnd"] && $.__views.table.addEventListener("scrollend", handleScrollEnd);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;