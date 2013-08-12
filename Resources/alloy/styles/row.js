module.exports = [ {
    isApi: true,
    priority: 1000.0001,
    key: "Window",
    style: {
        backgroundColor: "#FFF"
    }
}, {
    isClass: true,
    priority: 10000.0055,
    key: "container",
    style: {}
}, {
    isId: true,
    priority: 100000.0056,
    key: "title",
    style: {
        left: 0,
        font: {
            fontSize: 15
        },
        backgroundColor: "blue",
        width: 70,
        height: Ti.UI.SIZE
    }
}, {
    isId: true,
    priority: 100000.0057,
    key: "url",
    style: {
        left: 5,
        font: {
            fontSize: 10
        },
        width: Ti.UI.SIZE,
        height: 30
    }
} ];