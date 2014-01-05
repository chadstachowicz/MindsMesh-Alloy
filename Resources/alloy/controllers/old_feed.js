function Controller() {
    function goStatus() {
        var feed = Alloy.createController("new_post", {
            group_id: args.group_id,
            topic_id: args.topic_id
        }).getView();
        feed.title = null != args.topic_id ? args.class_number : null != args.group_id ? args.group_name : "Status";
        Alloy.CFG.navwindow.openWindow(feed, {
            animated: false
        });
    }
    function reloadNotifications() {
        modalTableView.data = [];
        xhr = getNotificationsGrouped(Titanium.App.Properties.getString("mmat"));
        xhr.onload = function() {
            var response = this.responseText;
            setTimeout(user = JSON.parse(response), 500);
            if (user.unread.length > 0) {
                var notificationButton = Ti.UI.createButton({
                    backgroundImage: "/images/bell-light.png",
                    height: 27,
                    width: 27
                });
                var label = Ti.UI.createLabel({
                    text: user.unread.length,
                    textAlign: "center",
                    height: "auto",
                    width: 11,
                    font: {
                        fontWeight: "bold",
                        fontSize: 12
                    },
                    backgroundColor: "red",
                    color: "white",
                    borderRadius: 3,
                    top: 0,
                    left: 15
                });
                notificationButton.add(label);
            } else var notificationButton = Ti.UI.createButton({
                backgroundImage: "/images/bell.png",
                height: 25,
                width: 25
            });
            win.setTitleControl(notificationButton);
            win.title = "Feed";
            if (null != user.unread.length) for (var i = 0; user.unread.length > i; ++i) {
                var classNumber = Titanium.UI.createLabel({
                    text: user.unread[i].actors_count + " people " + user.unread[i].action + " to",
                    box: true,
                    notification_id: user.unread[i].id,
                    id: user.unread[i].target_id,
                    type: user.unread[i].target_type,
                    font: {
                        fontSize: "16dp",
                        fontWeight: "bold"
                    },
                    color: "#000",
                    width: "auto",
                    textAlign: "left",
                    top: 0,
                    left: 10
                });
                var classTitle = Titanium.UI.createLabel({
                    text: user.unread[i].text,
                    box: true,
                    notification_id: user.unread[i].id,
                    id: user.unread[i].target_id,
                    type: user.unread[i].target_type,
                    font: {
                        fontSize: "14dp"
                    },
                    color: "#000",
                    width: .85 * Titanium.Platform.displayCaps.platformWidth - 45,
                    textAlign: "left",
                    left: 10,
                    top: 18
                });
                var flag = Titanium.UI.createImageView({
                    image: "/images/flag_new_red.png",
                    top: 7,
                    right: 12,
                    notification_id: user.unread[i].id,
                    id: user.unread[i].target_id,
                    type: user.unread[i].target_type,
                    box: true,
                    height: 24,
                    width: 24
                });
                var fbRow = Titanium.UI.createTableViewRow({
                    backgroundColor: "#e2e7ed",
                    box: true,
                    notification_id: user.unread[i].id,
                    id: user.unread[i].target_id,
                    type: user.unread[i].target_type,
                    height: 40
                });
                fbRow.add(classNumber);
                fbRow.add(classTitle);
                fbRow.add(flag);
                modalTableView.appendRow(fbRow);
            }
            for (var i = 0; user.read.length > i; ++i) {
                var classNumber = Titanium.UI.createLabel({
                    text: user.read[i].actors_count + " people " + user.read[i].action + " to",
                    box: true,
                    notification_id: user.read[i].id,
                    id: user.read[i].target_id,
                    type: user.read[i].target_type,
                    font: {
                        fontSize: "16dp",
                        fontWeight: "bold"
                    },
                    color: "#000",
                    width: "auto",
                    textAlign: "left",
                    left: 10,
                    top: 0
                });
                var classTitle = Titanium.UI.createLabel({
                    text: user.read[i].text,
                    box: true,
                    notification_id: user.read[i].id,
                    id: user.read[i].target_id,
                    type: user.read[i].target_type,
                    font: {
                        fontSize: "14dp"
                    },
                    color: "#000",
                    width: .85 * Titanium.Platform.displayCaps.platformWidth - 45,
                    textAlign: "left",
                    left: 10,
                    top: 18
                });
                var fbRow = Titanium.UI.createTableViewRow({
                    backgroundColor: "#e2e7ed",
                    box: true,
                    notification_id: user.read[i].id,
                    id: user.read[i].target_id,
                    type: user.read[i].target_type,
                    height: 40
                });
                fbRow.add(classNumber);
                fbRow.add(classTitle);
                modalTableView.appendRow(fbRow);
            }
            winModal.addEventListener("click", function(e) {
                true != e.source.box && winModal.hide();
            });
            notificationButton.addEventListener("click", function() {
                true == winModal.visible ? winModal.show() : winModal.open();
                winModal.visible = true;
            });
        };
        xhr.send();
    }
    function formatDate() {
        var d = new Date();
        var datestr = d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear();
        datestr += d.getHours() >= 12 ? " " + (12 == d.getHours() ? d.getHours() : d.getHours() - 12) + ":" + d.getMinutes() + " PM" : " " + d.getHours() + ":" + d.getMinutes() + " AM";
        return datestr;
    }
    function beginReloading() {
        setTimeout(endReloading, 2e3);
    }
    function endReloading() {
        row_data = [];
        tableView.data = row_data;
        lastRow = 0;
        lastRowId = 1;
        xhr = null != args.topic_id ? getTopicPostsWithFamily(Titanium.App.Properties.getString("mmat"), args.topic_id) : null != args.group_id ? getGroupPostsWithFamily(Titanium.App.Properties.getString("mmat"), args.group_id) : getPostsWithFamily(Titanium.App.Properties.getString("mmat"));
        xhr.onload = function() {
            onLoad(this.responseText);
        };
        xhr.send();
        tableView.setContentInsets({
            top: 0
        }, {
            animated: true
        });
        lastUpdatedLabel.text = "Last Updated: " + formatDate();
        statusLabel.text = "Pull down to refresh...";
        lastDistance = 0;
        actInd.hide();
        arrow.show();
    }
    function beginUpdate() {
        updating = true;
        tableView.appendRow(loadingRow);
        actInd2.show();
        setTimeout(endUpdate, 2e3);
    }
    function endUpdate() {
        actInd2.hide();
        tableView.deleteRow(lastRow, {
            animationStyle: Titanium.UI.iPhone.RowAnimationStyle.NONE
        });
        xhr = null != args.topic_id ? getTopicPostsWithFamily(Titanium.App.Properties.getString("mmat"), args.topic_id, lastRowId) : null != args.group_id ? getGroupPostsWithFamily(Titanium.App.Properties.getString("mmat"), args.group_id, lastRowId) : getPostsWithFamily(Titanium.App.Properties.getString("mmat"), lastRowId);
        xhr.onload = function() {
            onLoad(this.responseText);
        };
        xhr.send();
    }
    function timeDifference(current, previous) {
        var prev = new Date(previous);
        var msPerMinute = 6e4;
        var msPerHour = 60 * msPerMinute;
        var msPerDay = 24 * msPerHour;
        var msPerMonth = 30 * msPerDay;
        var msPerYear = 365 * msPerDay;
        var elapsed = current - prev;
        return msPerMinute > elapsed ? Math.round(elapsed / 1e3) + " seconds ago" : msPerHour > elapsed ? Math.round(elapsed / msPerMinute) + " minutes ago" : msPerDay > elapsed ? Math.round(elapsed / msPerHour) + " hours ago" : msPerMonth > elapsed ? "about " + Math.round(elapsed / msPerDay) + " days ago" : msPerYear > elapsed ? "about " + Math.round(elapsed / msPerMonth) + " months ago" : "about " + Math.round(elapsed / msPerYear) + " years ago";
    }
    function onLoad(response) {
        var d = new Date();
        setTimeout(row = JSON.parse(response), 500);
        true == reloading && (g = 0);
        0 == lastRow ? lastRow = row.length : lastRow += row.length;
        for (c = 0; row.length > c; c++) {
            var post = row[c];
            c == row.length - 1 && (lastRowId = post.id);
            var fullname = post.user.name;
            var picUrl = post.user.photo_url;
            var fbRow = Titanium.UI.createTableViewRow({
                backgroundColor: "#CDC9C9",
                height: Ti.UI.SIZE,
                result: post.id,
                fullname: fullname,
                photo_url: picUrl,
                selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
                layout: "vertical"
            });
            var rowtext = "";
            rowtext = null != post.topic ? fullname + " asked " + post.topic.number : null != post.group ? fullname + " posted in " + post.group.name : fullname;
            if ("iphone" == Titanium.Platform.osname) {
                var fbName = Titanium.UI.createLabel({
                    text: rowtext,
                    backgroundColor: "#fff",
                    textAlign: "left",
                    left: 55,
                    height: "auto",
                    top: -41,
                    color: "#000",
                    font: {
                        fontWeight: "bold",
                        fontSize: 13
                    }
                });
                var timetext = timeDifference(d, post.created_at);
                var postTime = Titanium.UI.createLabel({
                    text: timetext,
                    backgroundColor: "#fff",
                    textAlign: "left",
                    left: 55,
                    top: 5,
                    height: "auto",
                    color: "#808080",
                    font: {
                        fontSize: 11
                    }
                });
                comment[g] = Titanium.UI.createLabel({
                    text: post.text,
                    backgroundColor: "#fff",
                    textAlign: "left",
                    width: Titanium.Platform.displayCaps.platformWidth - 30,
                    top: 15,
                    height: Ti.UI.SIZE,
                    font: {
                        fontSize: 12
                    },
                    autoLink: Ti.UI.AUTODETECT_ALL
                });
                commentHolder[g] = Ti.UI.createView({
                    backgroundColor: "#fff",
                    top: 7,
                    width: Titanium.Platform.displayCaps.platformWidth - 10,
                    height: Ti.UI.SIZE,
                    layout: "vertical"
                });
                var commentCount = Titanium.UI.createLabel({
                    text: post.replies_count,
                    bottom: 10,
                    right: 0,
                    textAlign: "center",
                    font: {
                        fontWeight: "bold",
                        fontSize: 11
                    }
                });
                var tmpView = Ti.UI.createView({
                    width: 30,
                    height: 30,
                    right: 5
                });
                var givbutton = Titanium.UI.createButton({
                    result: post.id,
                    fullname: fullname,
                    photo_url: picUrl,
                    width: 16,
                    height: 16,
                    left: 0,
                    backgroundImage: "/images/comment.png"
                });
                tmpView.add(givbutton);
                tmpView.add(commentCount);
                var pict = Titanium.UI.createImageView({
                    image: picUrl,
                    top: 10,
                    left: 10,
                    height: 40,
                    width: 40
                });
            } else {
                var fbName = Titanium.UI.createLabel({
                    text: rowtext,
                    backgroundColor: "#fff",
                    textAlign: "left",
                    left: 80,
                    height: "auto",
                    top: -55,
                    color: "#000",
                    font: {
                        fontWeight: "bold",
                        fontSize: 20
                    }
                });
                var timetext = timeDifference(d, post.created_at);
                var postTime = Titanium.UI.createLabel({
                    text: timetext,
                    backgroundColor: "#fff",
                    textAlign: "left",
                    left: 80,
                    height: "auto",
                    top: 10,
                    color: "#808080",
                    font: {
                        fontSize: 14
                    }
                });
                var w = Titanium.Platform.displayCaps.platformWidth;
                var h = Titanium.Platform.displayCaps.platformHeight;
                var comWidth = 0;
                comWidth = w > h ? Titanium.Platform.displayCaps.platformHeight : Titanium.Platform.displayCaps.platformWidth;
                comment[g] = Titanium.UI.createLabel({
                    text: post.text,
                    backgroundColor: "#fff",
                    textAlign: "left",
                    left: 15,
                    top: 5,
                    width: comWidth - 60,
                    height: Ti.UI.SIZE,
                    autoLink: Ti.UI.AUTODETECT_ALL,
                    font: {
                        fontSize: 16
                    }
                });
                commentHolder[g] = Ti.UI.createView({
                    backgroundColor: "#fff",
                    top: 15,
                    width: comWidth - 30,
                    height: Ti.UI.SIZE,
                    layout: "vertical"
                });
                var commentCount = Titanium.UI.createLabel({
                    text: post.replies_count,
                    bottom: 13,
                    right: 0,
                    textAlign: "center",
                    font: {
                        fontWeight: "bold",
                        fontSize: 16
                    }
                });
                var tmpView = Ti.UI.createView({
                    width: 52,
                    height: 42,
                    right: 5
                });
                var givbutton = Titanium.UI.createButton({
                    result: post.id,
                    fullname: fullname,
                    photo_url: picUrl,
                    width: 32,
                    height: 32,
                    left: 0,
                    backgroundImage: "/images/comment_32.png"
                });
                tmpView.add(givbutton);
                tmpView.add(commentCount);
                var pict = Titanium.UI.createImageView({
                    image: picUrl,
                    top: 15,
                    left: 15,
                    height: 50,
                    width: 50
                });
            }
            commentHolder[g].add(pict);
            commentHolder[g].add(fbName);
            commentHolder[g].add(postTime);
            commentHolder[g].add(comment[g]);
            var commentSpacer = Ti.UI.createView({
                backgroundColor: "#fff",
                width: comWidth - 30,
                height: 20
            });
            commentHolder[g].add(commentSpacer);
            if ("iphone" == Titanium.Platform.osname) {
                backHolder[g] = Ti.UI.createView({
                    backgroundColor: "#F7F7F7",
                    width: Titanium.Platform.displayCaps.platformWidth - 10,
                    height: "auto",
                    height: 30
                });
                if (post.post_attachments.length > 0) {
                    var myRegEx = /\.png$/i;
                    var myRegEx2 = /\.jpg$/i;
                    var myRegEx3 = /\.jpeg$/i;
                    if ("post.mov" == post.post_attachments[0].name) {
                        var url = post.post_attachments[0].url;
                        var pieces = url.substring(0, url.length - 8);
                        var movPict = Titanium.UI.createImageView({
                            image: pieces + "frame_0000.png",
                            box: true,
                            height: 280,
                            url: url,
                            bottom: 5
                        });
                        var playButton = Titanium.UI.createImageView({
                            image: "/images/LH2-Play-icon-2.png",
                            top: -150,
                            height: 32,
                            zIndex: 1,
                            box: true,
                            url: url,
                            width: 32
                        });
                        var activeMovie = Ti.Media.createVideoPlayer({
                            backgroundColor: "#000",
                            scalingMode: Titanium.Media.VIDEO_SCALING_ASPECT_FIT,
                            mediaControlMode: Titanium.Media.VIDEO_CONTROL_DEFAULT,
                            autoplay: false
                        });
                        movPict.addEventListener("click", function(e) {
                            activeMovie.url = e.source.url;
                            Alloy.CFG.navwindow.openWindow(movieModal2, {
                                animated: false
                            });
                            movieModal2.add(activeMovie);
                        });
                        playButton.addEventListener("click", function(e) {
                            activeMovie.url = e.source.url;
                            Alloy.CFG.navwindow.openWindow(movieModal2, {
                                animated: false
                            });
                            movieModal2.add(activeMovie);
                        });
                        commentHolder[g].add(movPict);
                        commentHolder[g].add(playButton);
                    } else if (post.post_attachments[0].name.match(myRegEx) || post.post_attachments[0].name.match(myRegEx2) || post.post_attachments[0].name.match(myRegEx3)) {
                        var url = post.post_attachments[0].url;
                        var imgPic = Titanium.UI.createImageView({
                            image: post.post_attachments[0].url,
                            box: true,
                            height: "auto",
                            url: url,
                            width: 200,
                            bottom: 20
                        });
                        imgPic.addEventListener("click", function(e) {
                            var picModal2 = Ti.UI.createWindow({
                                backgroundColor: "black",
                                barColor: "#15B17A",
                                navTintColor: "#ffffff",
                                statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
                                translucent: false,
                                title: "Picture",
                                orientationModes: [ Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT, Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT ]
                            });
                            var imgPic2 = Titanium.UI.createImageView({
                                image: e.source.url
                            });
                            Alloy.CFG.navwindow.openWindow(picModal2, {
                                animated: false
                            });
                            picModal2.add(imgPic2);
                        });
                        commentHolder[g].add(imgPic);
                    } else {
                        var attach = Titanium.UI.createLabel({
                            text: post.post_attachments.length + " file(s) attached",
                            height: "auto",
                            textAlign: "center",
                            left: 27,
                            top: 7,
                            font: {
                                fontSize: 11,
                                color: "#fff"
                            }
                        });
                        var paperclip = Titanium.UI.createImageView({
                            image: "/images/paperclip_black_24.png",
                            left: 10,
                            top: 6,
                            height: 16,
                            width: 16
                        });
                        backHolder[g].add(paperclip);
                        backHolder[g].add(attach);
                    }
                }
                seperatorPhone[g] = Ti.UI.createView({
                    backgroundColor: "#808080",
                    width: Titanium.Platform.displayCaps.platformWidth - 10,
                    height: 1
                });
            } else {
                backHolder[g] = Ti.UI.createView({
                    backgroundColor: "#E5E4E2",
                    width: comWidth - 30,
                    height: "auto",
                    height: 42
                });
                if (post.post_attachments.length > 0) {
                    var myRegEx = /\.png$/i;
                    var myRegEx2 = /\.jpg$/i;
                    var myRegEx3 = /\.jpeg$/i;
                    if ("post.mov" == post.post_attachments[0].name) {
                        var url = post.post_attachments[0].url;
                        var pieces = url.substring(0, url.length - 8);
                        var movPict = Titanium.UI.createImageView({
                            image: pieces + "frame_0000.png",
                            box: true,
                            height: 260,
                            url: post.post_attachments[0].url,
                            bottom: 5
                        });
                        var playButton = Titanium.UI.createImageView({
                            image: "/images/LH2-Play-icon-2.png",
                            top: -170,
                            height: 32,
                            url: post.post_attachments[0].url,
                            zIndex: 1,
                            box: true,
                            width: 32
                        });
                        movPict.addEventListener("click", function(e) {
                            var movieModal2 = Ti.UI.createWindow({
                                backgroundColor: "#00000000",
                                barColor: "#15B17A",
                                title: "Video",
                                orientationModes: [ Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT, Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT ]
                            });
                            var activeMovie = Ti.Media.createVideoPlayer({
                                backgroundColor: "#000",
                                scalingMode: Titanium.Media.VIDEO_SCALING_ASPECT_FIT,
                                mediaControlMode: Titanium.Media.VIDEO_CONTROL_NONE,
                                url: e.source.url,
                                autoplay: false
                            });
                            Alloy.CFG.navwindow.openWindow(movieModal2, {
                                animated: false
                            });
                            movieModal2.add(activeMovie);
                        });
                        playButton.addEventListener("click", function(e) {
                            var movieModal2 = Ti.UI.createWindow({
                                backgroundColor: "#00000000",
                                barColor: "#15B17A",
                                title: "Video",
                                orientationModes: [ Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT, Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT ]
                            });
                            var activeMovie = Ti.Media.createVideoPlayer({
                                backgroundColor: "#000",
                                scalingMode: Titanium.Media.VIDEO_SCALING_ASPECT_FIT,
                                mediaControlMode: Titanium.Media.VIDEO_CONTROL_NONE,
                                url: e.source.url,
                                autoplay: false
                            });
                            Alloy.CFG.navwindow.openWindow(movieModal2, {
                                animated: false
                            });
                            movieModal2.add(activeMovie);
                        });
                        commentHolder[g].add(movPict);
                        commentHolder[g].add(playButton);
                    } else if (post.post_attachments[0].name.match(myRegEx) || post.post_attachments[0].name.match(myRegEx2) || post.post_attachments[0].name.match(myRegEx3)) {
                        var url = post.post_attachments[0].url;
                        var imgPic = Titanium.UI.createImageView({
                            image: post.post_attachments[0].url,
                            box: true,
                            height: "auto",
                            url: url,
                            width: 200,
                            bottom: 20
                        });
                        imgPic.addEventListener("click", function(e) {
                            var picModal2 = Ti.UI.createWindow({
                                backgroundColor: "black",
                                barColor: "#15B17A",
                                title: "Picture",
                                orientationModes: [ Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT, Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT ]
                            });
                            var imgPic2 = Titanium.UI.createImageView({
                                image: e.source.url
                            });
                            Alloy.CFG.navwindow.openWindow(picModal2, {
                                animated: false
                            });
                            picModal2.add(imgPic2);
                        });
                        commentHolder[g].add(imgPic);
                    } else {
                        var attach = Titanium.UI.createLabel({
                            text: post.post_attachments.length + " file(s) attached",
                            height: "auto",
                            textAlign: "center",
                            left: 50,
                            top: 10,
                            font: {
                                fontSize: 14,
                                color: "#fff"
                            }
                        });
                        var paperclip = Titanium.UI.createImageView({
                            image: "/images/paperclip4_black.png",
                            left: 15,
                            top: 6,
                            height: 32,
                            width: 32
                        });
                        backHolder[g].add(paperclip);
                        backHolder[g].add(attach);
                    }
                }
                seperatorPhone[g] = Ti.UI.createView({
                    backgroundColor: "#808080",
                    width: comWidth - 30,
                    height: 1
                });
            }
            fbRow.add(commentHolder[g]);
            fbRow.add(seperatorPhone[g]);
            backHolder[g].add(tmpView);
            fbRow.add(backHolder[g]);
            row_data[g] = fbRow;
            g++;
        }
        tableView.setData(row_data);
        updating && tableView.scrollToIndex(lastRow - (row.length - 1), {
            animated: true,
            position: Ti.UI.iPhone.TableViewScrollPosition.BOTTOM
        });
        updating = false;
        reloading = false;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "old_feed";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.old_feed = Ti.UI.createWindow({
        backgroundColor: "#FFF",
        id: "old_feed",
        barColor: "#15B17A",
        navTintColor: "#ffffff",
        translucent: "false"
    });
    $.__views.old_feed && $.addTopLevelView($.__views.old_feed);
    $.__views.menuButton = Ti.UI.createButton({
        id: "menuButton",
        image: "/images/Paragraph-Justify.png",
        height: "30dp",
        width: "30dp",
        toggle: "false"
    });
    $.__views.old_feed.leftNavButton = $.__views.menuButton;
    $.__views.photoView = Ti.UI.createView({
        id: "photoView",
        zIndex: "0",
        backgroundColor: "black",
        opacity: "1",
        height: "100%",
        width: "100%"
    });
    $.__views.old_feed.add($.__views.photoView);
    $.__views.__alloyId68 = Ti.UI.createView({
        backgroundColor: "white",
        height: "45dp",
        bottom: "205dp",
        width: "100%",
        id: "__alloyId68"
    });
    $.__views.photoView.add($.__views.__alloyId68);
    $.__views.__alloyId69 = Ti.UI.createButton({
        title: "Cancel",
        left: "10",
        id: "__alloyId69"
    });
    $.__views.__alloyId68.add($.__views.__alloyId69);
    $.__views.__alloyId70 = Ti.UI.createButton({
        title: "Ready",
        right: "10",
        id: "__alloyId70"
    });
    $.__views.__alloyId68.add($.__views.__alloyId70);
    $.__views.photoOptions = Ti.UI.createPicker({
        id: "photoOptions",
        bottom: "0dp",
        height: "150dp",
        selectionIndicator: "true",
        useSpinner: "true"
    });
    $.__views.photoView.add($.__views.photoOptions);
    $.__views.CameraOptionsColumns = Ti.UI.createPickerColumn({
        backgroundColor: "#252525",
        id: "CameraOptionsColumns"
    });
    $.__views.photoOptions.add($.__views.CameraOptionsColumns);
    $.__views.__alloyId72 = Ti.UI.createPickerRow({
        title: "Choose Existing Photo",
        id: "__alloyId72"
    });
    $.__views.CameraOptionsColumns.addRow($.__views.__alloyId72);
    $.__views.__alloyId73 = Ti.UI.createPickerRow({
        title: "Take New Photo",
        id: "__alloyId73"
    });
    $.__views.CameraOptionsColumns.addRow($.__views.__alloyId73);
    $.__views.videoView = Ti.UI.createView({
        id: "videoView",
        backgroundColor: "black",
        opacity: "1",
        height: "100%",
        width: "100%"
    });
    $.__views.old_feed.add($.__views.videoView);
    $.__views.__alloyId74 = Ti.UI.createView({
        backgroundColor: "white",
        height: "45dp",
        bottom: "200",
        width: "100%",
        id: "__alloyId74"
    });
    $.__views.videoView.add($.__views.__alloyId74);
    $.__views.__alloyId75 = Ti.UI.createButton({
        title: "Cancel",
        left: "10",
        id: "__alloyId75"
    });
    $.__views.__alloyId74.add($.__views.__alloyId75);
    $.__views.__alloyId76 = Ti.UI.createButton({
        title: "Done",
        right: "10",
        id: "__alloyId76"
    });
    $.__views.__alloyId74.add($.__views.__alloyId76);
    $.__views.videoOptions = Ti.UI.createPicker({
        id: "videoOptions",
        bottom: "0dp",
        height: "150dp",
        selectionIndicator: "true",
        useSpinner: "true"
    });
    $.__views.videoView.add($.__views.videoOptions);
    $.__views.CameraOptionsColumns = Ti.UI.createPickerColumn({
        backgroundColor: "#252525",
        id: "CameraOptionsColumns"
    });
    $.__views.videoOptions.add($.__views.CameraOptionsColumns);
    $.__views.__alloyId78 = Ti.UI.createPickerRow({
        title: "Choose Existing Video",
        id: "__alloyId78"
    });
    $.__views.CameraOptionsColumns.addRow($.__views.__alloyId78);
    $.__views.__alloyId79 = Ti.UI.createPickerRow({
        title: "Take New Video",
        id: "__alloyId79"
    });
    $.__views.CameraOptionsColumns.addRow($.__views.__alloyId79);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var row_data = [];
    var f;
    var currentFile = "";
    var win = $.old_feed;
    Ti.App.myCurrentWindow = win;
    var movieModal2 = Ti.UI.createWindow({
        backgroundColor: "#00000000",
        navTintColor: "#ffffff",
        statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
        translucent: false,
        barColor: "#15B17A",
        title: "Video",
        orientationModes: [ Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT, Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT ]
    });
    var view2 = Ti.UI.createView({
        transparent: "none",
        backgroundColor: "#F7F7F7",
        height: "40dp",
        top: 0,
        zIndex: "44"
    });
    var penView1 = Titanium.UI.createLabel({
        backgroundColor: "#F7F7F7",
        height: "40dp",
        width: .3333 * Titanium.Platform.displayCaps.platformWidth,
        left: 0
    });
    var penViewLabel = Titanium.UI.createLabel({
        backgroundColor: "#F7F7F7",
        layout: "horizontal"
    });
    var photoView1 = Titanium.UI.createLabel({
        backgroundColor: "#F7F7F7",
        width: .3333 * Titanium.Platform.displayCaps.platformWidth,
        height: "40dp",
        left: .3333 * Titanium.Platform.displayCaps.platformWidth
    });
    var photoViewLabel = Titanium.UI.createLabel({
        backgroundColor: "#F7F7F7",
        layout: "horizontal"
    });
    var vidView1 = Titanium.UI.createLabel({
        backgroundColor: "#F7F7F7",
        width: .3333 * Titanium.Platform.displayCaps.platformWidth,
        height: "40dp",
        left: .66666 * Titanium.Platform.displayCaps.platformWidth
    });
    var vidViewLabel = Titanium.UI.createLabel({
        backgroundColor: "#F7F7F7",
        layout: "horizontal"
    });
    var sepView1 = Titanium.UI.createLabel({
        backgroundColor: "d0d0d0",
        height: "24dp",
        width: "1dp",
        left: .3333 * Titanium.Platform.displayCaps.platformWidth
    });
    var sepView2 = Titanium.UI.createLabel({
        backgroundColor: "d0d0d0",
        height: "24dp",
        width: "1dp",
        left: .6666 * Titanium.Platform.displayCaps.platformWidth
    });
    var penLabel = Titanium.UI.createLabel({
        text: "Status",
        backgroundColor: "#F7F7F7",
        font: {
            fontSize: 14
        },
        color: "#000"
    });
    var pencilView = Titanium.UI.createImageView({
        image: "/images/pencil-1.png",
        backgroundColor: "#F7F7F7",
        height: "10"
    });
    var photLabel = Titanium.UI.createLabel({
        text: "Photo",
        backgroundColor: "#F7F7F7",
        font: {
            fontSize: 14
        },
        color: "#000"
    });
    var photView = Titanium.UI.createImageView({
        image: "/images/camera-1.png",
        backgroundColor: "#F7F7F7",
        height: "10"
    });
    var vidLabel = Titanium.UI.createLabel({
        text: "Video",
        backgroundColor: "#F7F7F7",
        font: {
            fontSize: 14
        },
        color: "#000"
    });
    var vidView = Titanium.UI.createImageView({
        image: "/images/video-camera-1.png",
        backgroundColor: "#F7F7F7",
        height: "10"
    });
    var borderView = Titanium.UI.createView({
        backgroundColor: "#000",
        height: "1",
        bottom: 0
    });
    penViewLabel.add(pencilView);
    penViewLabel.add(penLabel);
    penView1.add(penViewLabel);
    view2.add(penView1);
    photoViewLabel.add(photView);
    photoViewLabel.add(photLabel);
    photoView1.add(photoViewLabel);
    view2.add(photoView1);
    vidViewLabel.add(vidView);
    vidViewLabel.add(vidLabel);
    vidView1.add(vidViewLabel);
    view2.add(vidView1);
    view2.add(sepView1);
    view2.add(sepView2);
    view2.add(borderView);
    win.add(view2);
    penView1.addEventListener("click", function() {
        goStatus();
    });
    photoView1.addEventListener("click", function() {
        Titanium.Media.showCamera({
            success: function(event) {
                var win_height = 380;
                var win_width = .85 * Ti.Platform.displayCaps.platformWidth;
                var view = Ti.UI.createView({
                    backgroundColor: "#e2e7ed",
                    borderColor: "#A5A5A5",
                    box: true,
                    borderRadius: 15,
                    top: 50,
                    layout: "vertical",
                    borderWidth: 2,
                    width: win_width,
                    height: win_height
                });
                var btnDone = Ti.UI.createButton({
                    title: "Done"
                });
                var ta1 = Titanium.UI.createTextArea({
                    editable: true,
                    top: -95,
                    left: 77,
                    box: true,
                    height: 95,
                    value: "Enter a message!",
                    width: Titanium.Platform.displayCaps.platformWidth - 130,
                    color: "#000",
                    textAlign: "left",
                    appearance: Titanium.UI.KEYBOARD_APPEARANCE_ALERT,
                    suppressReturn: false,
                    keyboardToolbar: [ btnDone ]
                });
                btnDone.addEventListener("click", function() {
                    ta1.blur();
                });
                ta1._hintText = ta1.value;
                ta1.addEventListener("focus", function(e) {
                    e.source.value == e.source._hintText && (e.source.value = "");
                });
                ta1.addEventListener("blur", function(e) {
                    "" == e.source.value && (e.source.value = e.source._hintText);
                });
                var finishButton = Ti.UI.createButton({
                    title: "Finish",
                    toggle: false,
                    height: 30,
                    width: 200,
                    box: true,
                    top: 10
                });
                finishButton.addEventListener("click", function() {
                    "Enter a message!" == ta1.value && (ta1.value = "");
                    if (null != args.topic_id) var postData = {
                        topic_id: args.topic_id,
                        text: ta1.value,
                        filename: "post.png",
                        content_type: currentFile.mimeType
                    }; else if (null != args.group_id) var postData = {
                        group_id: args.group_id,
                        text: ta1.value,
                        filename: "post.png",
                        content_type: currentFile.mimeType
                    }; else var postData = {
                        text: ta1.value,
                        filename: "post.png",
                        content_type: currentFile.mimeType
                    };
                    xhr = postPostCreate(Titanium.App.Properties.getString("mmat"), postData);
                    var pb = Ti.UI.createProgressBar({
                        zIndex: 50,
                        width: 250,
                        height: "auto",
                        min: 0,
                        max: 1,
                        value: 0,
                        top: 0,
                        message: "Uploading File",
                        color: "#333",
                        font: {
                            fontSize: 14,
                            fontWeight: "bold"
                        },
                        style: Titanium.UI.iPhone.ProgressBarStyle.PLAIN
                    });
                    win.add(pb);
                    pb.show();
                    xhr.onload = function() {
                        var post_id = JSON.parse(this.responseText).id;
                        f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, "post.png");
                        true == f.exists() && f.deleteFile();
                        image = currentFile.imageAsResized(currentFile.width / 4, currentFile.height / 4);
                        f.write(image);
                        var env = "development";
                        "true" == Ti.App.Properties.getString("production") && (env = "production");
                        var filnam = env + "/post_attachments/" + post_id + "/post.png";
                        AWS.config({
                            key: "AKIAIKFVJ3EMAIBXELBQ",
                            secret: "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",
                            bucket: "mindsmesh.com",
                            GSM: " -0700",
                            debug: true,
                            http: Titanium.Network.createHTTPClient(),
                            s3fileName: filnam,
                            timeout: 24e4,
                            onsendstream: function(e) {
                                pb.value = e.progress;
                            },
                            error: function(e) {
                                alert(e);
                            },
                            success: function() {
                                f.deleteFile();
                                pb.hide();
                            }
                        });
                        AWS.PUT("post.png");
                    };
                    xhr.send(postData);
                    shareWhoModal.close();
                });
                var labelTitle = Titanium.UI.createLabel({
                    text: Titanium.App.Properties.getString("name"),
                    font: {
                        fontSize: 16,
                        fontWeight: "bold"
                    },
                    color: "#000",
                    box: true,
                    width: "auto",
                    textAlign: "center",
                    top: -37,
                    left: 55
                });
                var labelTitle2 = Titanium.UI.createLabel({
                    text: "Add a message and share",
                    font: {
                        fontSize: 12
                    },
                    color: "#000",
                    box: true,
                    width: "auto",
                    textAlign: "center",
                    left: 55
                });
                var seperatorPhone = Ti.UI.createView({
                    backgroundColor: "#808080",
                    width: .85 * Titanium.Platform.displayCaps.platformWidth - 10,
                    top: 7,
                    box: true,
                    height: 2
                });
                var pict = Titanium.UI.createImageView({
                    image: Titanium.App.Properties.getString("photo_url"),
                    top: 10,
                    left: 10,
                    box: true,
                    height: 40,
                    width: 40
                });
                view.add(pict);
                view.add(labelTitle);
                view.add(labelTitle2);
                view.add(seperatorPhone);
                var picModal = Ti.UI.createWindow({
                    backgroundColor: "black",
                    barColor: "#15B17A",
                    navTintColor: "#ffffff",
                    statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
                    translucent: false,
                    title: "Picture",
                    orientationModes: [ Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT, Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT ]
                });
                picModal.addEventListener("close", function() {
                    shareWhoModal.show();
                });
                currentFile = event.media;
                var movPict = Titanium.UI.createImageView({
                    image: currentFile,
                    top: 5,
                    left: 5,
                    box: true,
                    height: 95,
                    width: 70
                });
                var imgPic = Titanium.UI.createImageView({
                    image: currentFile,
                    box: true
                });
                movPict.addEventListener("click", function() {
                    Alloy.CFG.navwindow.openWindow(picModal, {
                        animated: false
                    });
                    picModal.add(imgPic);
                    shareWhoModal.hide();
                });
                view.add(movPict);
                view.add(ta1);
                view.add(finishButton);
                shareWhoModal.add(view);
                shareWhoModal.open();
                var cameraView = Ti.UI.createImageView({
                    width: 320,
                    height: 480,
                    top: 0,
                    left: 0,
                    image: event.media
                });
                cameraView.toImage(function(e) {
                    var filename1 = Titanium.Filesystem.applicationDataDirectory + "/NAMEOFTHEPICTURE.png";
                    f = Titanium.Filesystem.getFile(filename1);
                    f.write(e.blob);
                    Titanium.Media.saveToPhotoGallery(f);
                });
                Ti.UI.createImageView({
                    width: 150,
                    height: 225,
                    top: 0,
                    left: 0,
                    image: event.media
                });
            },
            cancel: function() {},
            error: function(error) {
                var a = Titanium.UI.createAlertDialog({
                    title: "Camera"
                });
                error.code == Titanium.Media.NO_CAMERA ? a.setMessage("Sorry this device does not have a camera.") : a.setMessage("Error: " + error.code);
                a.show();
            },
            showControls: true,
            mediaTypes: Ti.Media.MEDIA_TYPE_PHOTO,
            saveToPhotoGallery: false,
            allowEditing: true,
            allowImageEditing: true
        });
    });
    vidView1.addEventListener("click", function() {
        var record = true;
        if (false == record) {
            var activeMovie = Titanium.Media.createVideoPlayer({
                backgroundColor: "#111",
                mediaControlStyle: Titanium.Media.VIDEO_CONTROL_DEFAULT,
                scalingMode: Titanium.Media.VIDEO_SCALING_ASPECT_FILL,
                media: movieFile
            });
            activeMovie.play();
            activeMovie.addEventListener("complete", function() {
                movieFile.deleteFile();
                record = true;
            });
            win.add(activeMovie);
        } else Titanium.Media.showCamera({
            success: function(event) {
                var win_height = 380;
                var win_width = .85 * Ti.Platform.displayCaps.platformWidth;
                var view = Ti.UI.createView({
                    backgroundColor: "#e2e7ed",
                    borderColor: "#A5A5A5",
                    box: true,
                    borderRadius: 15,
                    top: 50,
                    layout: "vertical",
                    borderWidth: 2,
                    width: win_width,
                    height: win_height
                });
                var btnDone = Ti.UI.createButton({
                    title: "Done"
                });
                var ta1 = Titanium.UI.createTextArea({
                    editable: true,
                    top: -56,
                    left: 77,
                    box: true,
                    height: 95,
                    value: "Enter a message!",
                    width: Titanium.Platform.displayCaps.platformWidth - 130,
                    color: "#000",
                    textAlign: "left",
                    appearance: Titanium.UI.KEYBOARD_APPEARANCE_ALERT,
                    suppressReturn: false,
                    keyboardToolbar: [ btnDone ]
                });
                btnDone.addEventListener("click", function() {
                    ta1.blur();
                });
                ta1._hintText = ta1.value;
                ta1.addEventListener("focus", function(e) {
                    e.source.value == e.source._hintText && (e.source.value = "");
                });
                ta1.addEventListener("blur", function(e) {
                    "" == e.source.value && (e.source.value = e.source._hintText);
                });
                var finishButton = Ti.UI.createButton({
                    title: "Finish",
                    toggle: false,
                    height: 30,
                    width: 200,
                    box: true,
                    top: 10
                });
                finishButton.addEventListener("click", function() {
                    "Enter a message!" == ta1.value && (ta1.value = "");
                    if (null != args.topic_id) var postData = {
                        topic_id: args.topic_id,
                        text: ta1.value,
                        filename: "post.mov",
                        content_type: currentFile.mimeType
                    }; else if (null != args.group_id) var postData = {
                        group_id: args.group_id,
                        text: ta1.value,
                        filename: "post.mov",
                        content_type: currentFile.mimeType
                    }; else var postData = {
                        text: ta1.value,
                        filename: "post.mov",
                        content_type: currentFile.mimeType
                    };
                    xhr = postPostCreate(Titanium.App.Properties.getString("mmat"), postData);
                    var pb = Ti.UI.createProgressBar({
                        zIndex: 50,
                        width: 250,
                        height: "auto",
                        min: 0,
                        max: 1,
                        value: 0,
                        top: 0,
                        message: "Uploading File",
                        color: "#333",
                        font: {
                            fontSize: 14,
                            fontWeight: "bold"
                        },
                        style: Titanium.UI.iPhone.ProgressBarStyle.PLAIN
                    });
                    win.add(pb);
                    pb.show();
                    xhr.onload = function() {
                        var post_id = JSON.parse(this.responseText).id;
                        f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, "post.mov");
                        true == f.exists() && f.deleteFile();
                        f.write(currentFile);
                        var env = "development";
                        "true" == Ti.App.Properties.getString("production") && (env = "production");
                        var filnam = env + "/post_attachments/" + post_id + "/post.mov";
                        AWS.config({
                            key: "AKIAIKFVJ3EMAIBXELBQ",
                            secret: "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",
                            bucket: "mindsmesh.com",
                            GSM: " -0700",
                            debug: true,
                            http: Titanium.Network.createHTTPClient(),
                            s3fileName: filnam,
                            timeout: 24e4,
                            onsendstream: function(e) {
                                pb.value = e.progress;
                            },
                            error: function(e) {
                                alert(e);
                            },
                            success: function() {
                                f.deleteFile();
                                var postData = {
                                    file: "http://s3.amazonaws.com/mindsmesh.com/" + filnam
                                };
                                xhr2 = postEncodeVideo(Titanium.App.Properties.getString("mmat"), postData);
                                xhr2.onload = function() {
                                    pb.hide();
                                };
                                xhr2.send(JSON.stringify(postData));
                            }
                        });
                        AWS.PUT("post.mov");
                    };
                    xhr.send(postData);
                    shareWhoModal.close();
                });
                var labelTitle = Titanium.UI.createLabel({
                    text: Titanium.App.Properties.getString("name"),
                    font: {
                        fontSize: 16,
                        fontWeight: "bold"
                    },
                    color: "#000",
                    box: true,
                    width: "auto",
                    textAlign: "center",
                    top: -37,
                    left: 55
                });
                var labelTitle2 = Titanium.UI.createLabel({
                    text: "Add a message and share",
                    font: {
                        fontSize: 12
                    },
                    color: "#000",
                    box: true,
                    width: "auto",
                    textAlign: "center",
                    left: 55
                });
                var seperatorPhone = Ti.UI.createView({
                    backgroundColor: "#808080",
                    width: .85 * Titanium.Platform.displayCaps.platformWidth - 10,
                    top: 7,
                    box: true,
                    height: 2
                });
                var pict = Titanium.UI.createImageView({
                    image: Titanium.App.Properties.getString("photo_url"),
                    top: 10,
                    left: 10,
                    box: true,
                    height: 40,
                    width: 40
                });
                view.add(pict);
                view.add(labelTitle);
                view.add(labelTitle2);
                view.add(seperatorPhone);
                var movieModal = Ti.UI.createWindow({
                    backgroundColor: "#00000000",
                    barColor: "#15B17A",
                    title: "Video",
                    orientationModes: [ Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT, Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT ]
                });
                movieModal.addEventListener("close", function() {
                    shareWhoModal.show();
                });
                var activeMovie = Ti.Media.createVideoPlayer({
                    backgroundColor: "#000",
                    scalingMode: Titanium.Media.VIDEO_SCALING_ASPECT_FIT,
                    mediaControlMode: Titanium.Media.VIDEO_CONTROL_DEFAULT,
                    media: event.media,
                    autoplay: false
                });
                currentFile = event.media;
                var thumbImage = activeMovie.thumbnailImageAtTime(0, Ti.Media.VIDEO_TIME_OPTION_NEAREST_KEYFRAME);
                var movPict = Titanium.UI.createImageView({
                    image: thumbImage,
                    top: 5,
                    left: 5,
                    box: true,
                    height: 95,
                    width: 70
                });
                var playButton = Titanium.UI.createImageView({
                    image: "/images/LH2-Play-icon-2.png",
                    top: -70,
                    left: 25,
                    height: 32,
                    zIndex: 1,
                    box: true,
                    width: 32
                });
                movPict.addEventListener("click", function() {
                    Alloy.CFG.navwindow.openWindow(movieModal, {
                        animated: false
                    });
                    movieModal.add(activeMovie);
                });
                playButton.addEventListener("click", function() {
                    Alloy.CFG.navwindow.openWindow(movieModal, {
                        animated: false
                    });
                    movieModal.add(activeMovie);
                });
                view.add(movPict);
                view.add(playButton);
                view.add(ta1);
                view.add(finishButton);
                shareWhoModal.add(view);
                shareWhoModal.open();
                record = false;
            },
            cancel: function() {},
            error: function(error) {
                var a = Titanium.UI.createAlertDialog({
                    title: "Video"
                });
                error.code == Titanium.Media.NO_VIDEO ? a.setMessage("Device does not have video recording capabilities") : a.setMessage("Unexpected error: " + error.code);
                a.show();
            },
            mediaTypes: Titanium.Media.MEDIA_TYPE_VIDEO,
            videoMaximumDuration: 15e3,
            videoQuality: Titanium.Media.QUALITY_MEDIUM
        });
    });
    if (null != args.topic_id) {
        if (null != args.moodle) {
            var btnBar = Ti.UI.createButtonBar({
                labels: [ "Moodle" ]
            });
            btnBar.addEventListener("click", function(e) {
                if (1 == e.index) {
                    shareModal.open();
                    shareModal.visible = true;
                } else if (0 == e.index) if (false == Titanium.App.Properties.hasProperty("moodle-token-" + args.entity_id)) {
                    var moodle_account = Alloy.createController("moodle_account", "test").getView();
                    Alloy.CFG.navwindow.openWindow(moodle_account, {
                        animated: false
                    });
                } else {
                    loadView.add(loadIndicator);
                    loadView.open();
                    loadIndicator.show();
                    xhr = getMoodle2EnrolledCourses(Titanium.App.Properties.getString("moodle_url_" + args.entity_id), Titanium.App.Properties.getString("moodle-token-" + args.entity_id), Titanium.App.Properties.getString("moodle-userid-" + args.entity_id));
                    xhr.onload = function() {
                        var response = this.responseText;
                        var courses = JSON.parse(response);
                        for (c = 0; courses.length > c; c++) if (courses[c].shortname == args.class_number) {
                            var moodle_class = Alloy.createController("moodle_class", {
                                class_id: courses[c].id,
                                entity_id: args.entity_id
                            }).getView();
                            Alloy.CFG.navwindow.openWindow(moodle_class, {
                                animated: false
                            });
                        }
                        loadView.close();
                    };
                    xhr.send();
                }
            });
            win.setRightNavButton(btnBar);
        }
        var loadView = Ti.UI.createWindow({
            backgroundColor: "black",
            opacity: .9,
            height: Ti.Platform.displayCaps.platformHeight,
            width: Ti.Platform.displayCaps.platformWidth
        });
        var loadIndicator = Ti.UI.createActivityIndicator({
            style: Ti.UI.iPhone.ActivityIndicatorStyle.BIG,
            message: "Loading Moodle...",
            font: "Arial",
            color: "#FFF"
        });
    }
    var shareWhoModal = Ti.UI.createWindow({
        backgroundColor: "#B0000000",
        zIndex: 1
    });
    shareWhoModal.addEventListener("click", function(e) {
        if (true != e.source.box) {
            var dlg = Titanium.UI.createAlertDialog({
                box: true,
                message: "If you exit your content will be lost from this post, is that ok?",
                buttonNames: [ "Yes", "Cancel" ]
            });
            dlg.addEventListener("click", function(ev) {
                0 == ev.index ? shareWhoModal.close() : 1 == ev.index && dlg.hide();
            });
            dlg.show();
        }
    });
    var shareModal = Ti.UI.createWindow({
        backgroundColor: "#B0000000"
    });
    shareModal.addEventListener("click", function(e) {
        true != e.source.box && shareModal.close();
    });
    var win_height = 380;
    var win_width = .85 * Ti.Platform.displayCaps.platformWidth;
    var view = Ti.UI.createView({
        backgroundColor: "#e2e7ed",
        borderColor: "#A5A5A5",
        box: true,
        borderRadius: 15,
        top: 50,
        layout: "vertical",
        borderWidth: 2,
        width: win_width,
        height: win_height
    });
    var labelTitle = Titanium.UI.createLabel({
        text: Titanium.App.Properties.getString("name"),
        font: {
            fontSize: 16,
            fontWeight: "bold"
        },
        color: "#000",
        box: true,
        width: "auto",
        textAlign: "center",
        top: -37,
        left: 55
    });
    var labelTitle2 = Titanium.UI.createLabel({
        text: "Share something awesome",
        font: {
            fontSize: 12
        },
        color: "#000",
        box: true,
        width: "auto",
        textAlign: "center",
        left: 55
    });
    var seperatorPhone = Ti.UI.createView({
        backgroundColor: "#808080",
        width: .85 * Titanium.Platform.displayCaps.platformWidth - 10,
        top: 7,
        box: true,
        height: 2
    });
    var pict = Titanium.UI.createImageView({
        image: Titanium.App.Properties.getString("photo_url"),
        top: 10,
        left: 10,
        box: true,
        height: 40,
        width: 40
    });
    view.add(pict);
    view.add(labelTitle);
    view.add(labelTitle2);
    view.add(seperatorPhone);
    shareModal.add(view);
    var winModal = Ti.UI.createWindow({
        backgroundColor: "#B0000000",
        visible: false
    });
    var win_height = 380;
    var win_width = .85 * Ti.Platform.displayCaps.platformWidth;
    var view = Ti.UI.createView({
        backgroundColor: "#e2e7ed",
        borderColor: "#A5A5A5",
        box: true,
        borderRadius: 15,
        top: 50,
        layout: "vertical",
        borderWidth: 2,
        width: win_width,
        height: win_height
    });
    var modalTableView = Titanium.UI.createTableView({
        backgroundColor: "#e2e7ed",
        box: true
    });
    modalTableView.addEventListener("click", function(e) {
        xhr = postNotificationMarkAsRead(Titanium.App.Properties.getString("mmat"), e.source.notification_id);
        xhr.onload = function() {
            this.responseText;
            if ("Post" == e.source.type) {
                var post = Alloy.createController("post", {
                    postid: e.source.id
                }).getView();
                winModal.close();
                Alloy.CFG.navwindow.openWindow(post, {
                    animated: false
                });
            } else if ("Topic" == e.source.type) {
                winModal.close();
                Titanium.App.fireEvent("goTopic", {
                    topic_id: e.source.id
                });
            } else if ("Group" == e.source.type) {
                winModal.close();
                Titanium.App.fireEvent("goGroup", {
                    group_id: e.source.id
                });
            }
        };
        xhr.send();
    });
    var labelTitle = Titanium.UI.createLabel({
        text: Titanium.App.Properties.getString("name"),
        font: {
            fontSize: 16,
            fontWeight: "bold"
        },
        color: "#000",
        box: true,
        width: "auto",
        textAlign: "center",
        top: -37,
        left: 55
    });
    var labelTitle2 = Titanium.UI.createLabel({
        text: "Notifications",
        font: {
            fontSize: 12
        },
        color: "#000",
        box: true,
        width: "auto",
        textAlign: "center",
        left: 55
    });
    var seperatorPhone = Ti.UI.createView({
        backgroundColor: "#808080",
        width: .85 * Titanium.Platform.displayCaps.platformWidth - 10,
        top: 7,
        box: true,
        height: 2
    });
    var pict = Titanium.UI.createImageView({
        image: Titanium.App.Properties.getString("photo_url"),
        top: 10,
        left: 10,
        box: true,
        height: 40,
        width: 40
    });
    view.add(pict);
    view.add(labelTitle);
    view.add(labelTitle2);
    view.add(seperatorPhone);
    view.add(modalTableView);
    winModal.add(view);
    var tableView = Titanium.UI.createTableView({
        backgroundColor: "#CDC9C9",
        separatorColor: "transparent",
        top: "40dp"
    });
    Ti.UI.createScrollView({
        contentHeight: "auto",
        layout: "vertical",
        showVerticalScrollIndicator: true
    });
    $.menuButton.addEventListener("click", function(e) {
        tableView.scrollable = false == $.menuButton.toggle ? false : true;
        Titanium.App.fireEvent("nav-menu-button", {
            data: e.source.toggle
        });
    });
    Titanium.App.addEventListener("nav-menu-button-toggle", function(e) {
        $.menuButton.toggle = e.toggle;
    });
    Titanium.App.addEventListener("main-win-close", function() {
        winModal.close();
        Alloy.CFG.navwindow.closeWindow(win);
    });
    tableView.addEventListener("click", function(e) {
        if (true == $.menuButton.toggle) {
            Titanium.App.fireEvent("nav-menu-button", {
                data: true
            });
            tableView.scrollable = true;
        } else if (true == e.source.box) ; else {
            var post = Alloy.createController("post", {
                postid: e.rowData.result
            }).getView();
            winModal.hide();
            Alloy.CFG.navwindow.openWindow(post, {
                animated: false
            });
        }
    });
    win.add(tableView);
    var lastRow = 0;
    var border = Ti.UI.createView({
        backgroundColor: "#000",
        height: 1,
        bottom: 0
    });
    var tableHeader = Ti.UI.createView({
        backgroundColor: "#F7F7F7",
        width: 320,
        height: 60
    });
    tableHeader.add(border);
    var arrow = Ti.UI.createView({
        backgroundImage: "/images/whiteArrow.png",
        width: 23,
        height: 60,
        bottom: 10,
        left: 20
    });
    var statusLabel = Ti.UI.createLabel({
        text: "Pull to reload",
        left: 55,
        width: 200,
        bottom: 30,
        height: "auto",
        color: "#000",
        textAlign: "center",
        font: {
            fontSize: 13,
            fontWeight: "bold"
        }
    });
    var lastUpdatedLabel = Ti.UI.createLabel({
        text: "Last Updated: " + formatDate(),
        left: 55,
        width: 240,
        bottom: 15,
        height: "auto",
        color: "#000",
        textAlign: "center",
        font: {
            fontSize: 12
        }
    });
    var actInd = Titanium.UI.createActivityIndicator({
        left: 20,
        bottom: 13,
        width: 30,
        height: 30
    });
    var statusLabel2 = Ti.UI.createLabel({
        text: "Loading...",
        left: 55,
        width: 200,
        bottom: 30,
        height: "auto",
        color: "#000",
        textAlign: "center",
        font: {
            fontSize: 13,
            fontWeight: "bold"
        },
        shadowColor: "#999",
        shadowOffset: {
            x: 0,
            y: 1
        }
    });
    var actInd2 = Titanium.UI.createActivityIndicator({
        left: 20,
        bottom: 13,
        width: 30,
        height: 30
    });
    tableHeader.add(arrow);
    tableHeader.add(statusLabel);
    tableHeader.add(lastUpdatedLabel);
    tableHeader.add(actInd);
    tableView.headerPullView = tableHeader;
    var reloading = false;
    var updating = false;
    var loadingRow = Ti.UI.createTableViewRow({
        backgroundColor: "#e2e7ed"
    });
    loadingRow.add(statusLabel2);
    loadingRow.add(actInd2);
    var lastRowId = 1;
    var row = "";
    var pulling = false;
    endReloading();
    win.addEventListener("focus", function() {
        if (Titanium.Network.online) {
            if ("posted" == win.passedData) {
                reloading = true;
                row_data = [];
                tableView.setData([]);
                beginReloading();
            } else reloadNotifications();
            win.passedData = null;
        } else {
            var alertDialog = Titanium.UI.createAlertDialog({
                title: "Attention",
                message: "No Internet Connectity!",
                buttonNames: [ "OK" ]
            });
            alertDialog.show();
        }
    });
    var lastDistance = 0;
    tableView.addEventListener("scroll", function(e) {
        var offset = e.contentOffset.y;
        var height = e.size.height;
        var total = offset + height;
        var theEnd = e.contentSize.height;
        var distance = theEnd - total;
        if (!pulling && !updating && !reloading && lastDistance > distance && row.length >= 10) {
            var nearEnd = .75 * theEnd;
            !pulling && !updating && !reloading && total >= nearEnd && beginUpdate();
        } else if (-65 > offset && !pulling && !reloading && !updating) {
            var t = Ti.UI.create2DMatrix();
            t = t.rotate(-180);
            pulling = true;
            arrow.animate({
                transform: t,
                duration: 180
            });
            statusLabel.text = "Release to refresh...";
        } else if (offset > -65 && 0 > offset && pulling && !reloading && !updating) {
            pulling = false;
            var t = Ti.UI.create2DMatrix();
            arrow.animate({
                transform: t,
                duration: 180
            });
            statusLabel.text = "Pull down to refresh...";
        }
    });
    tableView.addEventListener("dragEnd", function() {
        if (pulling && !reloading && !updating) {
            reloading = true;
            pulling = false;
            arrow.hide();
            actInd.show();
            statusLabel.text = "Reloading...";
            tableView.setContentInsets({
                top: 60
            }, {
                animated: true
            });
            tableView.scrollToTop(-60, true);
            arrow.transform = Ti.UI.create2DMatrix();
            beginReloading();
            reloadNotifications();
        }
    });
    Titanium.App.addEventListener("reload_feed", function() {
        endReloading();
    });
    var commentHolder = [];
    var backHolder = [];
    var seperatorPhone = [];
    var comment = [];
    var g = 0;
    reloadNotifications();
    Ti.Gesture.addEventListener("orientationchange", function() {
        win.width = Titanium.Platform.displayCaps.platformWidth;
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;