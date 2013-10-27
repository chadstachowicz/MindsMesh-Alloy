function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "nl.fokkezb.pullToRefresh/" + s : s.substring(0, index) + "/nl.fokkezb.pullToRefresh/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

module.exports = [ {
    isApi: true,
    priority: 1000.0001,
    key: "Window",
    style: {
        backgroundColor: "#FFF"
    }
}, {
    isClass: true,
    priority: 10000.0015,
    key: "ptr",
    style: {
        width: Ti.UI.FILL,
        height: 50,
        backgroundColor: "#eeeeee"
    }
}, {
    isClass: true,
    priority: 10000.0016,
    key: "ptrCenter",
    style: {
        bottom: 10,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE
    }
}, {
    isClass: true,
    priority: 10000.0017,
    key: "ptrArrow",
    style: {
        left: 8,
        width: 12,
        height: 30,
        image: WPATH("/images/grey.png")
    }
}, {
    isClass: true,
    priority: 10000.0018,
    key: "ptrIndicator",
    style: {
        left: 0,
        style: Ti.UI.ActivityIndicatorStyle.DARK
    }
}, {
    isClass: true,
    priority: 10000.002,
    key: "ptrText",
    style: {
        left: 30,
        color: "#777",
        font: {
            fontSize: 13,
            fontWeight: "bold"
        }
    }
} ];