var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Ti.include("api/api.js");

var fb = require("facebook");

fb.appid = "391884850858794";

fb.permissions = [ "email" ];

fb.forceDialogAuth = true;

Alloy.createController("index");