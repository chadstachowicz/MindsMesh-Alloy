var args = arguments[0]||{};
if (args.topic != null){
	var moodle_entity_string = "moodle_entity_" + user.topic_users[c].topic.entity_id;
	var moodle_url_string = "moodle_url_" + user.topic_users[c].topic.entity_id;
	if (args.topic.entity_id == Titanium.App.Properties.getString(moodle_entity_string)){
		$.ClassesRow.moodle = Titanium.App.Properties.getString(moodle_url_string);
	}
	$.lblMenu.text = args.topic.number;
	$.ClassesRow.topic_id = args.topic.id;
	$.ClassesRow.class_number = args.topic.number;
	$.ClassesRow.entity_id = args.topic.entity_id;
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
	var feed = Alloy.createController("old_feed", {topic_id: $.ClassesRow.topic_id, moodle: $.ClassesRow.moodle, entity_id: $.ClassesRow.entity_id, class_number: $.ClassesRow.class_number}).getView();
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
	var feed = Alloy.createController("old_feed", {group_id: $.ClassesRow.group_id}).getView();
	var navAnimate = Ti.UI.createAnimation({
            left:0,
            duration:75,
            curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
	Alloy.CFG.navwindow.animate(navAnimate);
	Alloy.CFG.navwindow.closeWindow(Ti.App.myCurrentWindow,{animated:false});
	Alloy.CFG.navwindow.openWindow(feed,{animated:false});
};