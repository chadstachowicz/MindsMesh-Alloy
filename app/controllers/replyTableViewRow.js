
 var args = arguments[0]||{};

//args.post_attachments.count
//args.post_attachments[0].ext_path
$.textLabel.text = args.text;
$.nameLabel.text = args.user.name;
$.dateLabel.text = formatDate(args.created_at);
$.thumbImage.image = args.user.photo_url;
$.replyRow.post_id = args.id ;

	

$.replyRow.data = args;
