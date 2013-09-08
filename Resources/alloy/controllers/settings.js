function Controller() {
    function createSection() {
        var section = Ti.UI.createTableViewSection();
        var customView = Ti.UI.createView({
            height: "auto",
            backgroundColor: "#EEE",
            backgroundGradient: {
                type: "linear",
                startPoint: {
                    x: "0%",
                    y: "0%"
                },
                endPoint: {
                    x: "0%",
                    y: "100%"
                },
                colors: [ {
                    color: "#EEE",
                    offset: 0
                }, {
                    color: "#CCC",
                    offset: 1
                } ]
            }
        });
        var customLabel = Ti.UI.createLabel({
            top: 8,
            bottom: 8,
            left: 10,
            right: 10,
            height: "auto",
            text: "Settings",
            font: {
                fontSize: 12,
                fontWeight: "bold"
            },
            color: "#666666"
        });
        customView.add(customLabel);
        section.headerView = customView;
        section.add(Alloy.createController("menurow", {
            title: "index",
            customView: "index",
            image: "images/ic_search.png"
        }).getView());
        section.add(Alloy.createController("menurow", {
            title: "feed ",
            customView: "feed",
            image: "images/ic_search.png"
        }).getView());
        return section;
    }
    function rowSelect(e) {
        if (currentView.id != e.row.customView) {
            $.ds.contentview.remove(currentView);
            currentView = Alloy.createController(e.row.customView).getView();
            $.ds.contentview.add(currentView);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "settings";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "#FFF",
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.ds = Alloy.createWidget("ds.slideMenu", "widget", {
        id: "ds",
        __parentSymbol: $.__views.win
    });
    $.__views.ds.setParent($.__views.win);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var leftData = [];
    leftData[0] = createSection();
    $.ds.leftTableView.data = leftData;
    var currentView = Alloy.createController("feed").getView();
    $.ds.contentview.add(currentView);
    $.ds.leftTableView.addEventListener("click", function(e) {
        rowSelect(e);
        $.ds.toggleLeftSlider();
    });
    $.ds.rightTableView.addEventListener("click", function(e) {
        rowSelect(e);
        $.ds.toggleRightSlider();
    });
    $.ds.leftTableView.addEventListener("touchstart", function() {});
    $.ds.leftTableView.addEventListener("touchend", function() {});
    $.ds.leftTableView.addEventListener("scroll", function() {});
    Ti.App.addEventListener("sliderToggled", function(e) {
        if ("right" == e.direction) {
            $.ds.leftMenu.zIndex = 2;
            $.ds.rightMenu.zIndex = 1;
        } else if ("left" == e.direction) {
            $.ds.leftMenu.zIndex = 1;
            $.ds.rightMenu.zIndex = 2;
        }
    });
    "iphone" === Ti.Platform.osname ? $.win.open({
        transition: Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
    }) : $.win.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;