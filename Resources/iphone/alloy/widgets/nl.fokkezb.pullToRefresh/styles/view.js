function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "nl.fokkezb.pullToRefresh/" + s : s.substring(0, index) + "/nl.fokkezb.pullToRefresh/" + s.substring(index + 1);
    return path;
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
    priority: 10000.0013,
    key: "ptr",
    style: {
        width: Ti.UI.FILL,
        height: 50,
        backgroundColor: "#eeeeee"
    }
}, {
    isClass: true,
    priority: 10000.0014,
    key: "ptrCenter",
    style: {
        bottom: 10,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE
    }
}, {
    isClass: true,
    priority: 10000.0015,
    key: "ptrArrow",
    style: {
        left: 8,
        width: 12,
        height: 30,
        image: WPATH("/images/grey.png")
    }
}, {
    isClass: true,
    priority: 10000.0016,
    key: "ptrIndicator",
    style: {
        left: 0,
        style: Ti.UI.ActivityIndicatorStyle.DARK
    }
}, {
    isClass: true,
    priority: 10000.0018,
    key: "ptrText",
    style: {
        left: 30,
        color: "#777",
        font: {
            fontSize: 13,
            fontWeight: "bold"
        }
    }
}, {
    isClass: true,
    priority: 10101.0017,
    key: "ptrIndicator",
    style: {
        style: Ti.UI.iPhone.ActivityIndicatorStyle.DARK
    }
} ];