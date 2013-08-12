module.exports = [ {
    isApi: true,
    priority: 1000.0001,
    key: "Window",
    style: {
        backgroundColor: "#FFF"
    }
}, {
    isApi: true,
    priority: 1000.0035,
    key: "Label",
    style: {
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000"
    }
}, {
    isClass: true,
    priority: 10000.0034,
    key: "container",
    style: {
        backgroundColor: "white"
    }
}, {
    isClass: true,
    priority: 10000.0036,
    key: "imageThumb",
    style: {
        width: "50dp",
        height: "50dp",
        left: 0
    }
}, {
    isClass: true,
    priority: 10000.0037,
    key: "title",
    style: {
        color: "#000",
        left: "60dp",
        top: 0,
        textAlign: "left"
    }
}, {
    isClass: true,
    priority: 10101.0039,
    key: "template1",
    style: {
        height: Ti.UI.SIZE
    }
} ];