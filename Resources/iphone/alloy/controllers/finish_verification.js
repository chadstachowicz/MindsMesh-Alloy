function Controller() {
    function checkConfirm() {
        $.activityIndicator.show();
        xhr = getUserWithChildren(Titanium.App.Properties.getString("mmat"), Titanium.App.Properties.getString("userid"));
        xhr.onload = function() {
            var response = this.responseText;
            var user = JSON.parse(response);
            for (i = 0; user.entity_users.length > i; i++) if (null != user.entity_users[i].entity.moodle_url) {
                moodle_entity_string = "moodle_entity_" + user.entity_users[i].entity.id;
                moodle_url_string = "moodle_url_" + user.entity_users[i].entity.id;
                entity_user_string = "entity_user_" + user.entity_users[i].id;
                Titanium.App.Properties.setString(moodle_entity_string, user.entity_users[i].entity.id);
                Titanium.App.Properties.setString(moodle_url_string, user.entity_users[i].entity.moodle_url);
                Titanium.App.Properties.setString(entity_user_string, user.entity_users[i].id);
            }
            if (user.entity_users.length > 0) {
                Titanium.App.Properties.setString("num_entities", user.entity_users.length);
                Titanium.App.fireEvent("goNavigation");
                $.veriWindow.close();
            } else alert("You have not confirmed the email we have sent you.  If you would like to resend it to yourself please click the Re-enter Email button.");
            $.activityIndicator.hide();
        };
        xhr.send();
    }
    function sendEmail() {
        $.activityIndicator2.show();
        var postData = {
            email: Titanium.App.Properties.getString("email")
        };
        xhr = postEntityJoin(Titanium.App.Properties.getString("mmat"), postData);
        xhr.onload = function() {
            this.responseText;
            $.activityIndicator2.hide();
            alert("A confirmation email has been sent to you, if you do not see it please check your spam folder.");
        };
        xhr.send(JSON.stringify(postData));
    }
    function closeWindow() {
        Titanium.App.Properties.setString("logged_in", "false");
        fb.logout();
        $.veriWindow.animate({
            top: "100%",
            duration: 300
        });
        setTimeout(function() {
            $.veriWindow.close();
        }, 300);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "finish_verification";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.veriWindow = Ti.UI.createWindow({
        backgroundColor: "#FFF",
        id: "veriWindow",
        top: "99%"
    });
    $.__views.veriWindow && $.addTopLevelView($.__views.veriWindow);
    $.__views.mainView = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        top: 0,
        layout: "vertical",
        id: "mainView",
        backgroundColor: "#ee7533"
    });
    $.__views.veriWindow.add($.__views.mainView);
    $.__views.image = Ti.UI.createImageView({
        id: "image",
        top: "8%",
        width: "80dp",
        height: "80dp",
        image: "/images/MindsMesh-NewLogo.png"
    });
    $.__views.mainView.add($.__views.image);
    $.__views.__alloyId54 = Ti.UI.createLabel({
        color: "#ffffff",
        size: 15,
        font: {
            fontSize: 25
        },
        text: "Once you have verified the link which arrives in your email.  Please click the Confirmed button below.",
        id: "__alloyId54"
    });
    $.__views.mainView.add($.__views.__alloyId54);
    $.__views.__alloyId55 = Ti.UI.createButton({
        height: "40dp",
        width: "300dp",
        color: "#fffff",
        font: "Arial",
        borderRadius: 2,
        backgroundColor: "#f99965",
        top: "5dp",
        bottom: "17dp",
        id: "__alloyId55"
    });
    $.__views.mainView.add($.__views.__alloyId55);
    checkConfirm ? $.__views.__alloyId55.addEventListener("click", checkConfirm) : __defers["$.__views.__alloyId55!click!checkConfirm"] = true;
    $.__views.__alloyId56 = Ti.UI.createLabel({
        text: "Confirmed",
        color: "white",
        id: "__alloyId56"
    });
    $.__views.__alloyId55.add($.__views.__alloyId56);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        right: "5%",
        id: "activityIndicator"
    });
    $.__views.__alloyId55.add($.__views.activityIndicator);
    $.__views.__alloyId57 = Ti.UI.createButton({
        height: "40dp",
        width: "300dp",
        color: "#fffff",
        font: "Arial",
        borderRadius: 2,
        backgroundColor: "#f99965",
        top: "5dp",
        bottom: "17dp",
        id: "__alloyId57"
    });
    $.__views.mainView.add($.__views.__alloyId57);
    sendEmail ? $.__views.__alloyId57.addEventListener("click", sendEmail) : __defers["$.__views.__alloyId57!click!sendEmail"] = true;
    $.__views.__alloyId58 = Ti.UI.createLabel({
        text: "Send Email Again",
        color: "white",
        id: "__alloyId58"
    });
    $.__views.__alloyId57.add($.__views.__alloyId58);
    $.__views.activityIndicator2 = Ti.UI.createActivityIndicator({
        right: "5%",
        id: "activityIndicator2"
    });
    $.__views.__alloyId57.add($.__views.activityIndicator2);
    $.__views.__alloyId59 = Ti.UI.createButton({
        height: Ti.UI.SIZE,
        width: "300dp",
        tintColor: "#fffff",
        shadowColor: "#aaa",
        font: {
            color: "#fffff",
            size: 9,
            fontWeight: "bold"
        },
        borderRadius: 2,
        bottom: "5%",
        id: "__alloyId59"
    });
    $.__views.veriWindow.add($.__views.__alloyId59);
    closeWindow ? $.__views.__alloyId59.addEventListener("click", closeWindow) : __defers["$.__views.__alloyId59!click!closeWindow"] = true;
    $.__views.__alloyId60 = Ti.UI.createLabel({
        font: {
            color: "#fffff",
            size: 9
        },
        text: "Back to Login",
        color: "white",
        id: "__alloyId60"
    });
    $.__views.__alloyId59.add($.__views.__alloyId60);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    $.veriWindow.addEventListener("open", function() {
        $.veriWindow.animate({
            top: 0,
            duration: 300
        });
    });
    __defers["$.__views.__alloyId55!click!checkConfirm"] && $.__views.__alloyId55.addEventListener("click", checkConfirm);
    __defers["$.__views.__alloyId57!click!sendEmail"] && $.__views.__alloyId57.addEventListener("click", sendEmail);
    __defers["$.__views.__alloyId59!click!closeWindow"] && $.__views.__alloyId59.addEventListener("click", closeWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;