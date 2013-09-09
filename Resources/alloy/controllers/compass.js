function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "compass";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.compass = Ti.UI.createView({
        id: "compass"
    });
    $.__views.compass && $.addTopLevelView($.__views.compass);
    exports.destroy = function() {};
    _.extend($, $.__views);
    if (Titanium.Geolocation.hasCompass) {
        Titanium.Geolocation.showCalibration = false;
        Titanium.Geolocation.headingFilter = 90;
        Ti.Geolocation.getCurrentHeading(function(e) {
            if (e.error) {
                currentHeading.text = "error: " + e.error;
                return;
            }
            e.heading.x;
            e.heading.y;
            e.heading.z;
            e.heading.magneticHeading;
            e.heading.accuracy;
            var trueHeading = e.heading.trueHeading;
            e.heading.timestamp;
            Titanium.API.info("geo - current heading: " + trueHeading);
        });
        Titanium.Geolocation.addEventListener("heading", function(e) {
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
            Titanium.API.info("geo - heading updated: " + trueHeading);
        });
    } else Titanium.API.info("No Compass on device");
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;