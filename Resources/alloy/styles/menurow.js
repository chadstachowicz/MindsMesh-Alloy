module.exports = [ {
    isApi: true,
    priority: 1000.0001,
    key: "Window",
    style: {
        backgroundColor: "#FFF"
    }
}, {
    isApi: true,
    priority: 1000.0049,
    key: "Label",
    style: {
        color: "#666",
        font: {
            fontSize: "16"
        }
    }
}, {
    isClass: true,
    priority: 10000.005,
    key: "vgroup",
    style: {
        layout: "vertical",
        height: Ti.UI.SIZE
    }
}, {
    isId: true,
    priority: 100000.0051,
    key: "row",
    style: {
        selectedBackgroundColor: "#666",
        selectedColor: "white",
        backgroundColor: "#F9F9F9",
        backgroundGradient: {
            type: "linear",
            startPoint: {
                x: "0%",
                y: "0%"
            },
            endPoint: {
                x: "0%",
                y: "100%"
            },
            colors: [ {
                color: "#F9F9F9",
                offset: "0.0"
            }, {
                color: "#EEE",
                offset: "1.0"
            } ]
        }
    }
}, {
    isId: true,
    priority: 100000.0052,
    key: "icon",
    style: {
        width: "38dp",
        left: "5dp"
    }
}, {
    isId: true,
    priority: 100000.0053,
    key: "title",
    style: {
        left: "48dp"
    }
} ];