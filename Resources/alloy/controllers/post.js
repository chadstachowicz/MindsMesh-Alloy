function Controller() {
    function reloadNotifications() {
        modalTableView.data = [];
        xhr = getNotificationsGrouped(Titanium.App.Properties.getString("mmat"));
        xhr.onload = function() {
            var response = this.responseText;
            user = JSON.parse(response);
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
            for (var i = 0; user.unread.length > i; ++i) {
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
    function goComment() {
        var feed = Alloy.createController("new_post", {
            postid: args.postid
        }).getView();
        feed.title = null != args.topic_id ? args.class_number : null != args.group_id ? args.group_name : "Comment";
        Alloy.CFG.navwindow.openWindow(feed, {
            animated: false
        });
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
        var rd = [];
        tableView.data = rd;
        if (Titanium.Network.online) {
            xhr = getPostWithChildren(Titanium.App.Properties.getString("mmat"), args.postid);
            xhr.onload = function() {
                var d = new Date();
                var response = this.responseText;
                var post = JSON.parse(response);
                var fullname = Titanium.App.Properties.getString("name");
                var picUrl = Titanium.App.Properties.getString("photo_url");
                var fbRow = Titanium.UI.createTableViewRow({
                    backgroundColor: "#15B17A",
                    height: Ti.UI.SIZE,
                    selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
                    layout: "vertical"
                });
                if ("iphone" == Titanium.Platform.osname) {
                    var fbName = Titanium.UI.createLabel({
                        text: fullname,
                        backgroundColor: "#ffffff",
                        textAlign: "left",
                        left: 55,
                        height: "auto",
                        top: -41,
                        color: "#000000",
                        font: {
                            fontWeight: "bold",
                            fontSize: 13
                        }
                    });
                    var timetext = timeDifference(d, post.created_at);
                    var postTime = Titanium.UI.createLabel({
                        text: timetext,
                        backgroundColor: "#ffffff",
                        textAlign: "left",
                        left: 55,
                        top: 5,
                        height: "auto",
                        color: "#808080",
                        font: {
                            fontSize: 11
                        }
                    });
                    var comment = Titanium.UI.createLabel({
                        text: post.text,
                        backgroundColor: "#ffffff",
                        textAlign: "left",
                        width: Titanium.Platform.displayCaps.platformWidth - 30,
                        top: 15,
                        height: Ti.UI.SIZE,
                        font: {
                            fontSize: 12
                        }
                    });
                    var commentHolder = Ti.UI.createView({
                        backgroundColor: "#ffffff",
                        top: 6,
                        width: Titanium.Platform.displayCaps.platformWidth - 10,
                        height: Ti.UI.SIZE,
                        layout: "vertical"
                    });
                    var pict = Titanium.UI.createImageView({
                        image: picUrl,
                        top: 10,
                        left: 10,
                        height: 40,
                        width: 40
                    });
                    commentHolder.add(pict);
                    commentHolder.add(fbName);
                    commentHolder.add(postTime);
                    commentHolder.add(comment);
                    var commentSpacer = Ti.UI.createView({
                        backgroundColor: "#ffffff",
                        width: Titanium.Platform.displayCaps.platformWidth - 30,
                        height: 20
                    });
                    commentHolder.add(commentSpacer);
                    if (post.post_attachments.length > 0) {
                        var myRegEx = /\.png$/i;
                        var myRegEx2 = /\.jpg$/i;
                        var myRegEx3 = /\.jpeg$/i;
                        if ("post.mov" == post.post_attachments[0].name) {
                            var movieModal = Ti.UI.createWindow({
                                backgroundColor: "#00000000",
                                barColor: "#15B17A",
                                navTintColor: "#ffffff",
                                translucent: false,
                                title: "Video",
                                orientationModes: [ Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT, Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT ]
                            });
                            var activeMovie = Ti.Media.createVideoPlayer({
                                backgroundColor: "#000",
                                scalingMode: Titanium.Media.VIDEO_SCALING_ASPECT_FIT,
                                mediaControlStyle: Titanium.Media.VIDEO_CONTROL_DEFAULT,
                                url: post.post_attachments[0].url,
                                autoplay: false,
                                zIndex: 5
                            });
                            var url = post.post_attachments[0].url;
                            var pieces = url.substring(0, url.length - 8);
                            var movPict = Titanium.UI.createImageView({
                                image: pieces + "frame_0000.png",
                                box: true,
                                height: 260,
                                bottom: 15
                            });
                            var playButton = Titanium.UI.createImageView({
                                image: "/images/LH2-Play-icon-2.png",
                                top: -170,
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
                            commentHolder.add(movPict);
                            commentHolder.add(playButton);
                        } else if (post.post_attachments[0].name.match(myRegEx) || post.post_attachments[0].name.match(myRegEx2) || post.post_attachments[0].name.match(myRegEx3)) {
                            var picModal = Ti.UI.createWindow({
                                backgroundColor: "black",
                                barColor: "#15B17A",
                                navTintColor: "#ffffff",
                                statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
                                translucent: false,
                                title: "Picture",
                                orientationModes: [ Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT, Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT ]
                            });
                            var imgPic = Titanium.UI.createImageView({
                                image: post.post_attachments[0].url,
                                box: true,
                                height: "auto",
                                width: 200,
                                bottom: 20
                            });
                            imgPic.addEventListener("click", function() {
                                Alloy.CFG.navwindow.openWindow(picModal, {
                                    animated: false
                                });
                                var imgPicMod = Titanium.UI.createImageView({
                                    image: post.post_attachments[0].url,
                                    box: true,
                                    height: "auto"
                                });
                                picModal.add(imgPicMod);
                            });
                            commentHolder.add(imgPic);
                        } else {
                            var view = Titanium.UI.createLabel({
                                height: 25,
                                width: "auto",
                                left: 10
                            });
                            var attach = Titanium.UI.createLabel({
                                text: post.post_attachments.length + " file(s) attached",
                                height: "auto",
                                textAlign: "center",
                                left: 18,
                                top: 6,
                                font: {
                                    fontSize: 11,
                                    color: "#fff"
                                }
                            });
                            var paperclip = Titanium.UI.createImageView({
                                image: "/images/paperclip_black_24.png",
                                top: 4,
                                left: 0,
                                height: 16,
                                width: 16
                            });
                            view.add(paperclip);
                            view.add(attach);
                            commentHolder.add(view);
                            view.addEventListener("click", function() {
                                var winModalFiles = Ti.UI.createWindow({
                                    backgroundColor: "#B0000000"
                                });
                                var win_height = 380;
                                var win_width = .85 * Ti.Platform.displayCaps.platformWidth;
                                var viewFiles = Ti.UI.createView({
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
                                var modalTableViewFiles = Titanium.UI.createTableView({
                                    backgroundColor: "#e2e7ed",
                                    box: true
                                });
                                modalTableViewFiles.addEventListener("click", function(e) {
                                    var win1 = Titanium.UI.createWindow({
                                        title: e.source.title,
                                        backgroundColor: "#ffffff",
                                        layout: "absolute",
                                        barColor: "#15B17A",
                                        navTintColor: "#ffffff",
                                        statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
                                        translucent: false
                                    });
                                    win1.docurl = e.source.url;
                                    var webview = Titanium.UI.createWebView({
                                        url: e.source.url
                                    });
                                    win1.add(webview);
                                    winModalFiles.close();
                                    Alloy.CFG.navwindow.openWindow(win1, {
                                        animated: false
                                    });
                                });
                                var labelTitleFiles = Titanium.UI.createLabel({
                                    text: "Files",
                                    font: {
                                        fontSize: 16,
                                        fontWeight: "bold"
                                    },
                                    color: "#000",
                                    box: true,
                                    width: Ti.UI.Size,
                                    textAlign: "center",
                                    top: 5
                                });
                                var seperatorPhoneFiles = Ti.UI.createView({
                                    backgroundColor: "#808080",
                                    width: .85 * Titanium.Platform.displayCaps.platformWidth - 10,
                                    top: 5,
                                    box: true,
                                    height: 2
                                });
                                viewFiles.add(labelTitleFiles);
                                viewFiles.add(seperatorPhoneFiles);
                                viewFiles.add(modalTableViewFiles);
                                winModalFiles.add(viewFiles);
                                for (c = 0; post.post_attachments.length > c; c++) {
                                    var classNumber = Titanium.UI.createLabel({
                                        text: post.post_attachments[c].name,
                                        url: post.post_attachments[c].url,
                                        font: {
                                            fontSize: 14,
                                            fontWeight: "bold"
                                        },
                                        color: "#000",
                                        width: .85 * Titanium.Platform.displayCaps.platformWidth - 10,
                                        height: "36",
                                        top: 2,
                                        box: true,
                                        textAlign: "left",
                                        left: 10
                                    });
                                    var fbRow = Titanium.UI.createTableViewRow({
                                        backgroundColor: "#e2e7ed",
                                        text: post.post_attachments[c].name,
                                        url: post.post_attachments[c].url,
                                        layout: "vertical",
                                        box: true,
                                        height: 40
                                    });
                                    fbRow.add(classNumber);
                                    modalTableViewFiles.appendRow(fbRow);
                                }
                                winModalFiles.open();
                                winModalFiles.addEventListener("click", function(e) {
                                    true != e.source.box && winModalFiles.close();
                                });
                            });
                        }
                    }
                    fbRow.add(commentHolder);
                    var seperatorPhone = Ti.UI.createView({
                        backgroundColor: "#808080",
                        width: Titanium.Platform.displayCaps.platformWidth - 10,
                        height: 1
                    });
                    tableView.appendRow(fbRow);
                    for (c = 0; post.replies.length > c; c++) {
                        var reply = post.replies[c];
                        var fullname = reply.user.name;
                        var picUrl = reply.user.photo_url;
                        var fbRow = Titanium.UI.createTableViewRow({
                            backgroundColor: "#15B17A",
                            height: Ti.UI.SIZE,
                            selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
                            layout: "vertical"
                        });
                        var fbName = Titanium.UI.createLabel({
                            text: fullname,
                            backgroundColor: "#e2e7ed",
                            textAlign: "left",
                            left: 55,
                            height: "auto",
                            top: -41,
                            color: "#000000",
                            font: {
                                fontWeight: "bold",
                                fontSize: 13
                            }
                        });
                        var timetext = timeDifference(d, reply.created_at);
                        var postTime = Titanium.UI.createLabel({
                            text: timetext,
                            backgroundColor: "#e2e7ed",
                            textAlign: "left",
                            left: 55,
                            top: 2,
                            height: "auto",
                            color: "#808080",
                            font: {
                                fontSize: 11
                            }
                        });
                        var comment = Titanium.UI.createLabel({
                            text: reply.text,
                            backgroundColor: "#e2e7ed",
                            textAlign: "left",
                            width: Titanium.Platform.displayCaps.platformWidth - 78,
                            left: 55,
                            top: 5,
                            height: Ti.UI.SIZE,
                            font: {
                                fontSize: 12
                            }
                        });
                        var commentHolder = Ti.UI.createView({
                            backgroundColor: "#e2e7ed",
                            width: Titanium.Platform.displayCaps.platformWidth - 10,
                            height: Ti.UI.SIZE,
                            layout: "vertical"
                        });
                        var pict = Titanium.UI.createImageView({
                            image: picUrl,
                            top: 10,
                            left: 10,
                            height: 40,
                            width: 40
                        });
                        commentHolder.add(pict);
                        commentHolder.add(fbName);
                        commentHolder.add(comment);
                        commentHolder.add(postTime);
                        var seperatorPhone = Ti.UI.createView({
                            backgroundColor: "#808080",
                            width: Titanium.Platform.displayCaps.platformWidth - 10,
                            height: 1
                        });
                        fbRow.add(seperatorPhone);
                        fbRow.add(commentHolder);
                        tableView.appendRow(fbRow);
                    }
                } else {
                    var fbName = Titanium.UI.createLabel({
                        text: fullname,
                        backgroundColor: "#ffffff",
                        textAlign: "left",
                        left: 80,
                        height: "auto",
                        top: -55,
                        color: "#46a546",
                        font: {
                            fontWeight: "bold",
                            fontSize: 20
                        }
                    });
                    var timetext = timeDifference(d, post.created_at);
                    var postTime = Titanium.UI.createLabel({
                        text: timetext,
                        backgroundColor: "#ffffff",
                        textAlign: "left",
                        left: 80,
                        top: 10,
                        height: "auto",
                        color: "#808080",
                        font: {
                            fontSize: 14
                        }
                    });
                    var w = Titanium.Platform.displayCaps.platformWidth;
                    var h = Titanium.Platform.displayCaps.platformHeight;
                    var comWidth = 0;
                    comWidth = w > h ? Titanium.Platform.displayCaps.platformHeight : Titanium.Platform.displayCaps.platformWidth;
                    var comment = Titanium.UI.createLabel({
                        text: post.text,
                        backgroundColor: "#ffffff",
                        textAlign: "left",
                        width: comWidth - 60,
                        left: 15,
                        top: 5,
                        height: Ti.UI.SIZE,
                        font: {
                            fontSize: 16
                        }
                    });
                    var commentHolder = Ti.UI.createView({
                        backgroundColor: "#ffffff",
                        top: 15,
                        width: comWidth - 30,
                        height: Ti.UI.SIZE,
                        layout: "vertical"
                    });
                    var pict = Titanium.UI.createImageView({
                        image: picUrl,
                        top: 15,
                        left: 15,
                        height: 50,
                        width: 50
                    });
                    commentHolder.add(pict);
                    commentHolder.add(fbName);
                    commentHolder.add(postTime);
                    commentHolder.add(comment);
                    var commentSpacer = Ti.UI.createView({
                        backgroundColor: "#ffffff",
                        width: comWidth - 30,
                        height: 20
                    });
                    commentHolder.add(commentSpacer);
                    if (post.post_attachments.length > 0) {
                        var myRegEx = /\.png$/i;
                        var myRegEx2 = /\.jpg$/i;
                        var myRegEx3 = /\.jpeg$/i;
                        if ("post.mov" == post.post_attachments[0].name) {
                            var movieModal = Ti.UI.createWindow({
                                backgroundColor: "#00000000",
                                barColor: "#15B17A",
                                navTintColor: "#ffffff",
                                statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
                                translucent: false,
                                title: "Video",
                                orientationModes: [ Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT, Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT ]
                            });
                            var activeMovie = Ti.Media.createVideoPlayer({
                                backgroundColor: "#000",
                                mediaControlStyle: Titanium.Media.VIDEO_CONTROL_DEFAULT,
                                scalingMode: Titanium.Media.VIDEO_SCALING_ASPECT_FIT,
                                url: post.post_attachments[0].url,
                                autoplay: false
                            });
                            var url = post.post_attachments[0].url;
                            var pieces = url.substring(0, url.length - 8);
                            var movPict = Titanium.UI.createImageView({
                                image: pieces + "frame_0000.png",
                                box: true,
                                height: 260,
                                bottom: 15
                            });
                            var playButton = Titanium.UI.createImageView({
                                image: "/images/LH2-Play-icon-2.png",
                                top: -170,
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
                            commentHolder.add(movPict);
                            commentHolder.add(playButton);
                        } else if (post.post_attachments[0].name.match(myRegEx) || post.post_attachments[0].name.match(myRegEx2) || post.post_attachments[0].name.match(myRegEx3)) {
                            var picModal = Ti.UI.createWindow({
                                backgroundColor: "black",
                                barColor: "#15B17A",
                                navTintColor: "#ffffff",
                                statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
                                translucent: false,
                                title: "Picture",
                                orientationModes: [ Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT, Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT ]
                            });
                            var imgPic = Titanium.UI.createImageView({
                                image: post.post_attachments[0].url,
                                box: true,
                                height: "auto",
                                width: 200,
                                bottom: 20
                            });
                            imgPic.addEventListener("click", function() {
                                Alloy.CFG.navwindow.openWindow(picModal, {
                                    animated: false
                                });
                                var imgPicMod = Titanium.UI.createImageView({
                                    image: post.post_attachments[0].url,
                                    box: true,
                                    height: "auto"
                                });
                                picModal.add(imgPicMod);
                            });
                            commentHolder.add(imgPic);
                        } else {
                            var view = Titanium.UI.createLabel({
                                height: 25,
                                width: "auto",
                                left: 10
                            });
                            var attach = Titanium.UI.createLabel({
                                text: post.post_attachments.length + " file(s) attached",
                                height: "auto",
                                textAlign: "center",
                                left: 18,
                                top: 6,
                                font: {
                                    fontSize: 11,
                                    color: "#fff"
                                }
                            });
                            var paperclip = Titanium.UI.createImageView({
                                image: "/images/paperclip_black_24.png",
                                top: 4,
                                left: 0,
                                height: 16,
                                width: 16
                            });
                            view.add(paperclip);
                            view.add(attach);
                            commentHolder.add(view);
                            view.addEventListener("click", function() {
                                var winModalFiles = Ti.UI.createWindow({
                                    backgroundColor: "#B0000000"
                                });
                                var win_height = 380;
                                var win_width = .85 * Ti.Platform.displayCaps.platformWidth;
                                var viewFiles = Ti.UI.createView({
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
                                var modalTableViewFiles = Titanium.UI.createTableView({
                                    backgroundColor: "#e2e7ed",
                                    box: true
                                });
                                modalTableViewFiles.addEventListener("click", function(e) {
                                    var win1 = Titanium.UI.createWindow({
                                        title: e.source.title,
                                        backgroundColor: "#ffffff",
                                        layout: "absolute",
                                        barColor: "#15B17A"
                                    });
                                    win1.docurl = e.source.url;
                                    var webview = Titanium.UI.createWebView({
                                        url: e.source.url
                                    });
                                    win1.add(webview);
                                    winModalFiles.close();
                                    Alloy.CFG.navwindow.openWindow(win1, {
                                        animated: false
                                    });
                                });
                                var labelTitleFiles = Titanium.UI.createLabel({
                                    text: "Files",
                                    font: {
                                        fontSize: 16,
                                        fontWeight: "bold"
                                    },
                                    color: "#000",
                                    box: true,
                                    width: Ti.UI.Size,
                                    textAlign: "center",
                                    top: 5
                                });
                                var seperatorPhoneFiles = Ti.UI.createView({
                                    backgroundColor: "#808080",
                                    width: .85 * Titanium.Platform.displayCaps.platformWidth - 10,
                                    top: 5,
                                    box: true,
                                    height: 2
                                });
                                viewFiles.add(labelTitleFiles);
                                viewFiles.add(seperatorPhoneFiles);
                                viewFiles.add(modalTableViewFiles);
                                winModalFiles.add(viewFiles);
                                for (c = 0; post.post_attachments.length > c; c++) {
                                    var classNumber = Titanium.UI.createLabel({
                                        text: post.post_attachments[c].name,
                                        url: post.post_attachments[c].url,
                                        font: {
                                            fontSize: 14,
                                            fontWeight: "bold"
                                        },
                                        color: "#000",
                                        width: .85 * Titanium.Platform.displayCaps.platformWidth - 10,
                                        height: "36",
                                        top: 2,
                                        box: true,
                                        textAlign: "left",
                                        left: 10
                                    });
                                    var fbRow = Titanium.UI.createTableViewRow({
                                        backgroundColor: "#e2e7ed",
                                        text: post.post_attachments[c].name,
                                        url: post.post_attachments[c].url,
                                        layout: "vertical",
                                        box: true,
                                        height: 40
                                    });
                                    fbRow.add(classNumber);
                                    modalTableViewFiles.appendRow(fbRow);
                                }
                                winModalFiles.open();
                                winModalFiles.addEventListener("click", function(e) {
                                    true != e.source.box && winModalFiles.close();
                                });
                            });
                        }
                    }
                    fbRow.add(commentHolder);
                    var seperatorPhone = Ti.UI.createView({
                        backgroundColor: "#808080",
                        width: Titanium.Platform.displayCaps.platformWidth - 30,
                        height: 1
                    });
                    tableView.appendRow(fbRow);
                    for (c = 0; post.replies.length > c; c++) {
                        var reply = post.replies[c];
                        var fullname = reply.user.name;
                        var picUrl = reply.user.photo_url;
                        var fbRow = Titanium.UI.createTableViewRow({
                            backgroundColor: "#15B17A",
                            height: Ti.UI.SIZE,
                            selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
                            layout: "vertical"
                        });
                        var fbName = Titanium.UI.createLabel({
                            text: fullname,
                            backgroundColor: "#e2e7ed",
                            textAlign: "left",
                            left: 80,
                            height: "auto",
                            top: -55,
                            color: "#46a546",
                            font: {
                                fontWeight: "bold",
                                fontSize: 13
                            }
                        });
                        var timetext = timeDifference(d, reply.created_at);
                        var postTime = Titanium.UI.createLabel({
                            text: timetext,
                            backgroundColor: "#e2e7ed",
                            textAlign: "left",
                            left: 80,
                            height: "auto",
                            top: 10,
                            color: "#808080",
                            font: {
                                fontSize: 11
                            }
                        });
                        var w = Titanium.Platform.displayCaps.platformWidth;
                        var h = Titanium.Platform.displayCaps.platformHeight;
                        var comWidth = 0;
                        comWidth = w > h ? Titanium.Platform.displayCaps.platformHeight : Titanium.Platform.displayCaps.platformWidth;
                        var comment = Titanium.UI.createLabel({
                            text: reply.text,
                            backgroundColor: "#e2e7ed",
                            textAlign: "left",
                            width: comWidth - 120,
                            left: 80,
                            top: 5,
                            height: Ti.UI.SIZE,
                            font: {
                                fontSize: 16
                            }
                        });
                        var commentHolder = Ti.UI.createView({
                            backgroundColor: "#e2e7ed",
                            width: comWidth - 30,
                            height: Ti.UI.SIZE,
                            layout: "vertical"
                        });
                        var pict = Titanium.UI.createImageView({
                            image: picUrl,
                            top: 15,
                            left: 15,
                            height: 50,
                            width: 50
                        });
                        commentHolder.add(pict);
                        commentHolder.add(fbName);
                        commentHolder.add(comment);
                        commentHolder.add(postTime);
                        var seperatorPhone = Ti.UI.createView({
                            backgroundColor: "#808080",
                            width: comWidth - 30,
                            height: 1
                        });
                        fbRow.add(seperatorPhone);
                        fbRow.add(commentHolder);
                        tableView.appendRow(fbRow);
                    }
                }
            };
            xhr.send();
        } else alert("Network problems.");
        tableView.setContentInsets({
            top: 0
        }, {
            animated: true
        });
        reloading = false;
        lastUpdatedLabel.text = "Last Updated: " + formatDate();
        statusLabel.text = "Pull down to refresh...";
        actInd.hide();
        arrow.show();
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
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "post";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.post = Ti.UI.createWindow({
        backgroundColor: "#FFF",
        id: "post",
        barColor: "#15B17A",
        navTintColor: "#ffffff",
        translucent: "false"
    });
    $.__views.post && $.addTopLevelView($.__views.post);
    $.__views.postButton = Ti.UI.createButton({
        title: "Comment",
        id: "postButton",
        height: "30dp",
        width: "30dp"
    });
    goComment ? $.__views.postButton.addEventListener("click", goComment) : __defers["$.__views.postButton!click!goComment"] = true;
    $.__views.post.rightNavButton = $.__views.postButton;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var win = $.post;
    var winModal = Ti.UI.createWindow({
        backgroundColor: "#B0000000",
        visible: false
    });
    Titanium.App.addEventListener("reload_post", function() {
        endReloading();
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
                var win1 = Titanium.UI.createWindow({
                    url: "post.js",
                    backgroundColor: "#ffffff",
                    barColor: "#15B17A",
                    notModal: winModal
                });
                win1.postid = e.source.id;
                win1.fullname = Titanium.App.Properties.getString("name");
                win1.photo_url = Titanium.App.Properties.getString("photo_url");
                winModal.hide();
                Alloy.CFG.navwindow.openWindow(win1, {
                    animated: false
                });
            } else "Topic" == e.source.type && Titanium.App.fireEvent("nav-menu-button", {
                data: true,
                menu_id: 7,
                class_id: e.source.id
            });
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
        backgroundColor: "#15B17A",
        separatorStyle: "none"
    });
    win.add(tableView);
    Titanium.App.addEventListener("main-win-close", function() {
        winModal.close();
        Alloy.CFG.navwindow.close(win);
    });
    var border = Ti.UI.createView({
        backgroundColor: "#576c89",
        height: 2,
        bottom: 0
    });
    var tableHeader = Ti.UI.createView({
        backgroundColor: "#e2e7ed",
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
        color: "#576c89",
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
    var lastUpdatedLabel = Ti.UI.createLabel({
        text: "Updated: " + formatDate(),
        left: 55,
        width: 240,
        bottom: 15,
        height: "auto",
        color: "#576c89",
        textAlign: "center",
        font: {
            fontSize: 12
        },
        shadowColor: "#999",
        shadowOffset: {
            x: 0,
            y: 1
        }
    });
    var actInd = Titanium.UI.createActivityIndicator({
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
    var pulling = false;
    var reloading = false;
    tableView.addEventListener("scroll", function(e) {
        var offset = e.contentOffset.y;
        var offset = e.contentOffset.y;
        if (-65 > offset && !pulling && !reloading) {
            var t = Ti.UI.create2DMatrix();
            t = t.rotate(-180);
            pulling = true;
            arrow.animate({
                transform: t,
                duration: 180
            });
            statusLabel.text = "Release to refresh...";
        } else if (offset > -65 && 0 > offset && pulling && !reloading) {
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
        if (pulling && !reloading) {
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
    if (Titanium.Network.networkType != Titanium.Network.NETWORK_NONE) {
        tableView.setData([]);
        endReloading();
        reloadNotifications();
    } else {
        var alertDialog = Titanium.UI.createAlertDialog({
            title: "Attention",
            message: "No Internet Connectity!",
            buttonNames: [ "OK" ]
        });
        alertDialog.show();
    }
    __defers["$.__views.postButton!click!goComment"] && $.__views.postButton.addEventListener("click", goComment);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;