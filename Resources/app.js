var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Ti.include("api/EduMeshAPI.js");

Ti.include("api/api.js");

Ti.include("api/utility.js");

var Cloud = require("ti.cloud");

var AWS = require("api/amazon").load();

var fb = require("facebook");

fb.appid = "391884850858794";

fb.permissions = [ "email" ];

fb.forceDialogAuth = true;

Alloy.createController("index");