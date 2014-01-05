var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Ti.include("api/api.js");

Ti.include("api/utility.js");

var Cloud = require("ti.cloud");

var isPaused = true;

var AWS = require("api/amazon").load();

var fb = require("facebook");

fb.appid = "391884850858794";

fb.permissions = [ "email" ];

fb.forceDialogAuth = true;

var fblisten = 0;

Titanium.App.addEventListener("resumed", function() {
    setTimeout(isPaused = false, 1e3);
});

Titanium.App.addEventListener("paused", function() {
    isPaused = true;
});

setTimeout(isPaused = false, 3e3);

Alloy.createController("index");