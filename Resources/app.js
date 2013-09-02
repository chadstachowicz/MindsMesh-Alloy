function timeDifference(current, previous) {
    var prev = new Date(previous);
    var msPerMinute = 6e4;
    var msPerHour = 60 * msPerMinute;
    var msPerDay = 24 * msPerHour;
    var msPerMonth = 30 * msPerDay;
    var msPerYear = 365 * msPerDay;
    var elapsed = current - prev;
    return msPerMinute > elapsed ? Math.round(elapsed / 1e3) + " seconds ago" : msPerHour > elapsed ? Math.round(elapsed / msPerMinute) + " minutes ago" : msPerDay > elapsed ? Math.round(elapsed / msPerHour) + " hours ago" : msPerMonth > elapsed ? "about " + Math.round(elapsed / msPerDay) + " days ago" : msPerYear > elapsed ? "about " + Math.round(elapsed / msPerMonth) + " months ago" : "about " + Math.round(elapsed / msPerYear) + " years ago";
}

function formatDate(d) {
    var d = new Date(d);
    var datestr = d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear();
    datestr += d.getHours() >= 12 ? " " + (12 == d.getHours() ? d.getHours() : d.getHours() - 12) + ":" + d.getMinutes() + " PM" : " " + d.getHours() + ":" + d.getMinutes() + " AM";
    return datestr;
}

function GetExtention(filename) {
    var filesplit = [];
    var f = "" + filename;
    filesplit = f.split(".");
    if (2 == filesplit.length) return filesplit[1];
    return "";
}

var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Ti.include("api/api.js");

var fb = require("facebook");

fb.appid = "391884850858794";

fb.permissions = [ "email" ];

fb.forceDialogAuth = true;

Alloy.createController("index");