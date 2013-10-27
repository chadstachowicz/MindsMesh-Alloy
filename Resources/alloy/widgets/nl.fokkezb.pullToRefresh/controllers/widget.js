function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "nl.fokkezb.pullToRefresh/" + s : s.substring(0, index) + "/nl.fokkezb.pullToRefresh/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

function Controller() {
    function show(msg) {
        if (!attached || pulled) return false;
        pulled = true;
        $.view.ptrText.text = msg || options.msgUpdating;
        $.view.ptrArrow.hide();
        $.view.ptrIndicator.show();
        __parentSymbol.animate({
            top: 0
        });
        return true;
    }
    function hide() {
        if (!attached || !pulled) return false;
        $.view.ptrIndicator.hide();
        $.view.ptrArrow.transform = Ti.UI.create2DMatrix();
        $.view.ptrArrow.show();
        $.view.ptrText.text = options.msgPull;
        __parentSymbol.animate({
            top: -height
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
        offset = e.firstVisibleItem;
        return;
    }
    function swipeListener(e) {
        0 === offset && "down" === e.direction && refresh();
        return;
    }
    function setOptions(_properties) {
        _.extend(options, _properties);
        return;
    }
    function attach() {
        if (attached) return false;
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
        __parentSymbol.top = -height;
        __parentSymbol.addEventListener("swipe", swipeListener);
        $.view.ptrText.text = options.msgPull;
        return;
    }
    function dettach() {
        if (!attached) return false;
        __parentSymbol.removeEventListener("scroll", scrollListener);
        __parentSymbol.removeEventListener("swipe", swipeListener);
        hide();
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
        id: "view"
    });
    __parentSymbol.headerView = $.__views.view.getViewEx({
        recurse: true
    });
    $.__views.__alloyId0 && $.addTopLevelView($.__views.__alloyId0);
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