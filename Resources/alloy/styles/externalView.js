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
    key: "container",
    style: {
        width: Ti.UI.FILL,
        height: Ti.UI.FILL
    }
}, {
    isClass: true,
    priority: 10000.0014,
    key: "headerLabel",
    style: {
        top: 0,
        backgroundColor: "red",
        font: {
            fontSize: 25
        },
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE
    }
}, {
    isClass: true,
    priority: 10000.0015,
    key: "tableView",
    style: {
        top: 30,
        backgroundColor: "white",
        width: Ti.UI.FILL
    }
}, {
    isClass: true,
    priority: 10000.0017,
    key: "imageThumb",
    style: {
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE
    }
}, {
    isId: true,
    priority: 100000.0016,
    key: "backBtn",
    style: {
        left: 0,
        bottom: 0
    }
} ];