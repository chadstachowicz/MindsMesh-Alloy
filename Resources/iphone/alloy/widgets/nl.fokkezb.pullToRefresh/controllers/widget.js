function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "nl.fokkezb.pullToRefresh/" + s : s.substring(0, index) + "/nl.fokkezb.pullToRefresh/" + s.substring(index + 1);
    return path;
}

function Controller() {
    function show(msg) {
        if (!attached || pulled) return false;
        pulled = true;
        $.view.ptrText.text = msg || options.msgUpdating;
        $.view.ptrArrow.hide();
        $.view.ptrIndicator.show();
        __parentSymbol.setContentInsets({
            top: height
        }, {
            animated: true
        });
        return true;
    }
    function hide() {
        if (!attached || !pulled) return false;
        $.view.ptrIndicator.hide();
        $.view.ptrArrow.transform = Ti.UI.create2DMatrix();
        $.view.ptrArrow.show();
        $.view.ptrText.text = options.msgPull;
        __parentSymbol.setContentInsets({
            top: 0
        }, {
            animated: true
        });
        pulled = false;
        loading = false;
        return true;
    }
    function refresh() {
        if (!attached || loading) return false;
        loading = true;
        show();
        $.trigger("release", {
            hide: hide
        });
        return true;
    }
    function scrollListener(e) {
        if (pulled) return;
        offset = e.contentOffset.y;
        if (pulling && !loading && offset > -height && 0 > offset) {
            pulling = false;
            var unrotate = Ti.UI.create2DMatrix();
            $.view.ptrArrow.animate({
                transform: unrotate,
                duration: 180
            });
            $.view.ptrText.text = options.msgPull;
        } else if (!pulling && !loading && -height > offset) {
            pulling = true;
            var rotate = Ti.UI.create2DMatrix().rotate(180);
            $.view.ptrArrow.animate({
                transform: rotate,
                duration: 180
            });
            $.view.ptrText.text = options.msgRelease;
        }
        return;
    }
    function dragEndListener() {
        if (!pulled && pulling && !loading && -height > offset) {
            pulling = false;
            refresh();
        }
        return;
    }
    function setOptions(_properties) {
        _.extend(options, _properties);
        return;
    }
    function attach() {
        if (attached) return false;
        __parentSymbol.headerPullView = $.view.ptr;
        init();
        return true;
    }
    function init() {
        __parentSymbol.addEventListener("scroll", scrollListener);
        height = $.view.ptr.height;
        attached = true;
        pulling = false;
        pulled = false;
        loading = false;
        offset = 0;
        __parentSymbol.addEventListener("dragEnd", dragEndListener);
        $.view.ptrText.text = options.msgPull;
        return;
    }
    function dettach() {
        if (!attached) return false;
        __parentSymbol.removeEventListener("scroll", scrollListener);
        __parentSymbol.removeEventListener("dragEnd", dragEndListener);
        __parentSymbol.headerPullView = null;
        attached = false;
        return true;
    }
    new (require("alloy/widget"))("nl.fokkezb.pullToRefresh");
    this.__widgetId = "nl.fokkezb.pullToRefresh";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    var __parentSymbol = arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.view = Alloy.createWidget("nl.fokkezb.pullToRefresh", "view", {
        id: "view",
        __parentSymbol: __parentSymbol
    });
    $.__views.view.getViewEx({
        recurse: true
    }) && $.addProxyProperty("headerPullView", $.__views.view.getViewEx({
        recurse: true
    }));
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var options = {
        msgPull: L("ptrPull", "Pull to refresh..."),
        msgRelease: L("ptrRelease", "Release to refresh..."),
        msgUpdating: L("ptrUpating", "Updating...")
    };
    var height = 50, attached = false, pulling = false, pulled = false, loading = false, offset = 0;
    delete args.__parentSymbol;
    delete args.__itemTemplate;
    delete args.$model;
    setOptions(args);
    init();
    exports.setOptions = setOptions;
    exports.show = show;
    exports.hide = hide;
    exports.refresh = refresh;
    exports.dettach = dettach;
    exports.attach = attach;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;