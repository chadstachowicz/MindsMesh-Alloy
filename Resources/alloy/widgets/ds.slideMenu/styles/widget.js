function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "ds.slideMenu/" + s : s.substring(0, index) + "/ds.slideMenu/" + s.substring(index + 1);
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
    isId: true,
    priority: 100000.0004,
    key: "leftMenu",
    style: {
        top: "0dp",
        left: "0dp",
        width: "250dp",
        zIndex: "2",
        backgroundColor: "#FFF"
    }
}, {
    isId: true,
    priority: 100000.0005,
    key: "rightMenu",
    style: {
        top: "0dp",
        right: "0dp",
        width: "250dp",
        zIndex: "1",
        backgroundColor: "#FFF"
    }
}, {
    isId: true,
    priority: 100000.0006,
    key: "navview",
    style: {
        top: "0dp",
        left: "0dp",
        width: Ti.Platform.displayCaps.platformWidth,
        height: "44",
        backgroundImage: "/ds.slideMenu/NavBackground.png"
    }
}, {
    isId: true,
    priority: 100000.0007,
    key: "movableview",
    style: {
        left: "0",
        zIndex: "3",
        width: Ti.UI.FILL
    }
}, {
    isId: true,
    priority: 100000.0008,
    key: "containerview",
    style: {
        width: Ti.UI.FILL,
        height: Ti.UI.FILL
    }
}, {
    isId: true,
    priority: 100000.0009,
    key: "contentview",
    style: {
        left: "0dp",
        width: Ti.Platform.displayCaps.platformWidth,
        height: Ti.UI.Fill,
        top: "44",
        backgroundColor: "white"
    }
}, {
    isId: true,
    priority: 100000.001,
    key: "shadowview",
    style: {
        shadowColor: "black",
        shadowOffset: {
            x: "0",
            y: "0"
        },
        shadowRadius: "2.5"
    }
}, {
    isId: true,
    priority: 100000.0011,
    key: "leftButton",
    style: {
        backgroundImage: "none",
        image: "/ds.slideMenu/ButtonMenu.png",
        left: "0",
        top: "0",
        width: "60",
        height: "44",
        style: "none"
    }
}, {
    isId: true,
    priority: 100000.0012,
    key: "refreshButton",
    style: {
        backgroundImage: "none",
        right: "10",
        top: "0",
        width: "60",
        height: "44",
        style: "color:white"
    }
}, {
    isId: true,
    priority: 100000.0013,
    key: "bellButton",
    style: {
        backgroundImage: "/ds.slideMenu/bell.png",
        top: "0",
        width: 40,
        height: 40
    }
} ];