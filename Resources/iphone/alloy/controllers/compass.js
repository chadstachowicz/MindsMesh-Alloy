function Controller() {
    function AdustedHeading(heading) {
        var angle = 0;
        angle = 180 > heading ? -Math.round(heading) : Math.round(360 - heading);
        return angle;
    }
    function DoHeadingUpdate(e) {
        if (e.error) {
            Titanium.API.info("error: " + e.error);
            return;
        }
        e.heading.x;
        e.heading.y;
        e.heading.z;
        e.heading.magneticHeading;
        e.heading.accuracy;
        var trueHeading = e.heading.trueHeading;
        e.heading.timestamp;
        var adjustedAngle = AdustedHeading(trueHeading);
        Titanium.API.info("geo - heading updated: " + Math.round(trueHeading) + "," + adjustedAngle);
        $.headingTextField.value = Math.round(trueHeading) + "," + adjustedAngle;
        $.image.transform = Ti.UI.create2DMatrix({
            rotate: adjustedAngle
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "compass";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "#FFF",
        orientationModes: [ Ti.UI.PORTRAIT ],
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.image = Ti.UI.createImageView({
        id: "image",
        keepScreenOn: "true",
        image: "/images/mapmini.png",
        width: "550",
        height: "550"
    });
    $.__views.win.add($.__views.image);
    $.__views.__alloyId1 = Ti.UI.createLabel({
        text: "compass page",
        top: "0",
        id: "__alloyId1"
    });
    $.__views.win.add($.__views.__alloyId1);
    $.__views.headingTextField = Ti.UI.createTextField({
        font: {
            fontSize: 24,
            color: "black"
        },
        id: "headingTextField",
        bottom: "0",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE
    });
    $.__views.win.add($.__views.headingTextField);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Titanium.Geolocation.hasCompass;
    if (Titanium.Geolocation.hasCompass) {
        Titanium.Geolocation.showCalibration = false;
        Titanium.Geolocation.headingFilter = 90;
        Ti.Geolocation.getCurrentHeading(DoHeadingUpdate);
        Titanium.Geolocation.addEventListener("heading", DoHeadingUpdate);
    } else Titanium.API.info("No Compass on device");
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;