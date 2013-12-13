function Controller() {
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
    alert(args);
    if (null != args.topic) {
        $.lblMenu.text = args.topic.number;
        $.ClassesRow.onClick = "goTopic";
    } else {
        $.lblMenu.text = args.group.name;
        $.ClassesRow.onClick = "goGroup";
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;