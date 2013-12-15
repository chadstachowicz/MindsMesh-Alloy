var args = arguments[0]||{};
if (args.topic != null){
	$.lblMenu.text = args.topic.number;
	$.ClassesRow.topic_id = args.topic.id;
	$.ClassesRow.addEventListener('click', function (e){
 		goTopic(e);
	});
} else {
	$.lblMenu.text = args.group.name;
	$.ClassesRow.group_id = args.group.id;
	$.ClassesRow.addEventListener('click', function (e){
 		goGroup(e);
	});
}
function goTopic(e){
	var feed = Alloy.createController("old_feed", {topic_id: $.ClassesRow.topic_id, moodle: $.ClassesRow.moodle}).getView();
	var navAnimate = Ti.UI.createAnimation({
            left:0,
            duration:75,
            curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
	Alloy.CFG.navwindow.animate(navAnimate);
	Alloy.CFG.navwindow.closeWindow(Ti.App.myCurrentWindow,{animated:false});
	Alloy.CFG.navwindow.openWindow(feed,{animated:false});
};
function goGroup(e){
	var feed = Alloy.createController("old_feed", {group_id: $.ClassesRow.group_id, moodle: $.ClassesRow.moodle}).getView();
	feed.group_id = $.ClassesRow.group_id;
	var navAnimate = Ti.UI.createAnimation({
            left:0,
            duration:75,
            curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
	Alloy.CFG.navwindow.animate(navAnimate);
	Alloy.CFG.navwindow.closeWindow(Ti.App.myCurrentWindow,{animated:false});
	Alloy.CFG.navwindow.openWindow(feed,{animated:false});
};