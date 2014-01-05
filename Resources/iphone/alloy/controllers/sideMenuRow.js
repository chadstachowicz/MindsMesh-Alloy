function Controller() {
    function goTopic() {
        var feed = Alloy.createController("old_feed", {
            topic_id: $.ClassesRow.topic_id,
            moodle: $.ClassesRow.moodle,
            entity_id: $.ClassesRow.entity_id,
            class_number: $.ClassesRow.class_number
        }).getView();
        var navAnimate = Ti.UI.createAnimation({
            left: 0,
            duration: 75,
            curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
        Alloy.CFG.navwindow.animate(navAnimate);
        Alloy.CFG.navwindow.closeWindow(Ti.App.myCurrentWindow, {
            animated: false
        });
        Alloy.CFG.navwindow.openWindow(feed, {
            animated: false
        });
    }
    function goGroup() {
        var feed = Alloy.createController("old_feed", {
            group_id: $.ClassesRow.group_id
        }).getView();
        var navAnimate = Ti.UI.createAnimation({
            left: 0,
            duration: 75,
            curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
        Alloy.CFG.navwindow.animate(navAnimate);
        Alloy.CFG.navwindow.closeWindow(Ti.App.myCurrentWindow, {
            animated: false
        });
        Alloy.CFG.navwindow.openWindow(feed, {
            animated: false
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "sideMenuRow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.ClassesRow = Ti.UI.createTableViewRow({
        id: "ClassesRow",
        height: "40dp"
    });
    $.__views.ClassesRow && $.addTopLevelView($.__views.ClassesRow);
    $.__views.lblMenu = Ti.UI.createLabel({
        id: "lblMenu",
        color: "#fff",
        left: "45",
        textAlign: "left"
    });
    $.__views.ClassesRow.add($.__views.lblMenu);
    $.__views.imgIcon = Ti.UI.createImageView({
        id: "imgIcon",
        left: "4dp",
        height: "32dp",
        image: "/images/emblem_library.png",
        width: "32dp"
    });
    $.__views.ClassesRow.add($.__views.imgIcon);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    if (null != args.topic) {
        var moodle_entity_string = "moodle_entity_" + user.topic_users[c].topic.entity_id;
        var moodle_url_string = "moodle_url_" + user.topic_users[c].topic.entity_id;
        args.topic.entity_id == Titanium.App.Properties.getString(moodle_entity_string) && ($.ClassesRow.moodle = Titanium.App.Properties.getString(moodle_url_string));
        $.lblMenu.text = args.topic.number;
        $.ClassesRow.topic_id = args.topic.id;
        $.ClassesRow.class_number = args.topic.number;
        $.ClassesRow.entity_id = args.topic.entity_id;
        $.ClassesRow.addEventListener("click", function(e) {
            goTopic(e);
        });
    } else {
        $.lblMenu.text = args.group.name;
        $.ClassesRow.group_id = args.group.id;
        $.ClassesRow.addEventListener("click", function(e) {
            goGroup(e);
        });
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;