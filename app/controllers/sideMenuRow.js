var args = arguments[0]||{};
if (args.topic != null){
	$.lblMenu.text = args.topic.number;
	$.ClassesRow.topic_id = args.topic.id;
	$.ClassesRow.onClick = "goTopic";
} else {
	$.lblMenu.text = args.group.name;
	$.ClassesRow.group_id = args.group.id;
	$.ClassesRow.onClick = "goGroup";
}
