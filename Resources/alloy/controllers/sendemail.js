function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "sendemail";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.emailDialog = Ti.UI.createEmailDialog({
        id: "emailDialog",
        subject: "Hello from Titanium",
        messageBody: "<b>Appcelerator Titanium Rocks!</b>"
    });
    $.__views.emailDialog && $.addTopLevelView($.__views.emailDialog);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;