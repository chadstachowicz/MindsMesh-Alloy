function Controller() {
    function GetFeedPosts() {
        xhr = getPostsWithFamily(Titanium.App.Properties.getString("mmat"));
        xhr.onload = function() {
            postXML = this.responseText;
            ShowJSONData(JSON.parse(postXML));
        };
        xhr.onerror = function(e) {
            alert(e.message);
        };
        xhr.send();
    }
    function createListView(_data) {
        var items = [];
        for (var i in _data) {
            var imagepath = "";
            var extAttachmentPath = "";
            var hasExtAttachment = false;
            var hasMainAttachment = false;
            if (_data[i].post_attachments.length > 0) {
                var filetype = "" + GetExtention(_data[i].post_attachments[0].name);
                if ("png" == filetype || "jpg" == filetype) {
                    imagepath = _data[i].post_attachments[0].url;
                    hasMainAttachment = true;
                } else if ("mov" == filetype) {
                    var url = _data[i].post_attachments[0].url;
                    var pieces = url.substring(0, url.length - 8);
                    imagepath = pieces + "frame_0000.png";
                    hasMainAttachment = true;
                } else {
                    extAttachmentPath = _data[i].post_attachments[0].ext_path;
                    hasExtAttachment = true;
                }
            }
            var mainImageWidth = 0;
            var mainImageHeight = 0;
            if (hasMainAttachment) {
                mainImageWidth = 100;
                mainImageHeight = 100;
            }
            items.push({
                template: "template1",
                textLabel: {
                    text: _data[i].text
                },
                nameLabel: {
                    text: "[" + _data[i].user.name + "]"
                },
                dateLabel: {
                    text: formatDate(_data[i].created_at)
                },
                pic: {
                    image: _data[i].user.photo_url
                },
                postAttachmentImage: {
                    image: imagepath,
                    visible: hasMainAttachment,
                    width: mainImageWidth,
                    heigth: mainImageHeight
                },
                pic: {
                    image: _data[i].user.photo_url
                },
                idLabel: {
                    text: _data[i].id
                },
                dataLabel: {
                    text: JSON.stringify(_data[i])
                },
                commentCountLabel: {
                    text: _data[i].replies_count
                },
                extAttachmentImage: {
                    image: extAttachmentPath,
                    visible: hasExtAttachment
                },
                paperClipImage: {
                    visible: hasExtAttachment
                }
            });
        }
        $.section.setItems(items);
    }
    function ShowJSONData(postJSON) {
        createListView(postJSON);
        $.list.visible = true;
        Ti.API.info("showing listview, because of android");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Copy of feed";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    exports.destroy = function() {};
    _.extend($, $.__views);
    var postXML = "";
    GetFeedPosts();
    $.platformLabel.text = "android";
    Ti.API.info("feed loaded");
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;