function Controller() {
    function handleClick(e) {
        alert(e.row.post_id);
        alert(e.row.data);
    }
    function handleScrollEnd() {}
    function createListView(_data) {
        var items = [];
        for (var i in _data) items.push(Alloy.createController("tableViewRow", _data[i]).getView());
        $.table.setData(items);
    }
    function GetTableViewFeedPosts() {
        xhr = getPostsWithFamily(Titanium.App.Properties.getString("mmat"));
        xhr.onload = function() {
            postXML = this.responseText;
            createListView(JSON.parse(postXML));
        };
        xhr.onerror = function(e) {
            alert(e.message);
        };
        xhr.send();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "feedTableview";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
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
    exports.destroy = function() {};
    _.extend($, $.__views);
    GetTableViewFeedPosts();
    Ti.API.info("tableview feed loaded");
    __defers["$.__views.table!click!handleClick"] && $.__views.table.addEventListener("click", handleClick);
    __defers["$.__views.table!scrollend!handleScrollEnd"] && $.__views.table.addEventListener("scrollend", handleScrollEnd);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;