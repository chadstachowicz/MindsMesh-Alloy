

var imagepath = "";
var extAttachmentPath = "";
var hasExtAttachment = false;
var hasMainAttachment = false;
 
 var args = arguments[0]||{};








//args.post_attachments.count
//args.post_attachments[0].ext_path
$.textLabel.text = args.text;
$.nameLabel.text = args.user.name;
$.dateLabel.text = formatDate(args.created_at);
$.thumbImage.image = args.user.photo_url;
$.row.post_id = args.id ;
$.commentCountLabel.text = args.replies_count;
	

$.row.data = args;

if(args.post_attachments.length>0){
	/*
	var filetype = "" + GetExtention(args.post_attachments[0].name);
	
	$.extLabel.text = filetype + ": " + (filetype=="png");
	
	if(filetype=="png"){
		$.postAttachmentImage.image = args.post_attachments[0].url;    // assign the values from the data
		
	}else if(filetype=="mov"){
		
		var url = args.post_attachments[0].url;
		var pieces = url.substring(0, url.length - 8);	
		
		$.postAttachmentImage.image = pieces + "frame_0000.png";
		
	}else{
		
		$.postAttachmentImage.image = args.post_attachments[0].ext_path;
	}
	*/
	

	    var filetype = "" + GetExtention(args.post_attachments[0].name);
		
		if(filetype=="png"||filetype=="jpg"){
			imagepath = args.post_attachments[0].url;    // assign the values from the data
			hasMainAttachment = true;
		}else if(filetype=="mov"){
			var url = args.post_attachments[0].url;
			var pieces = url.substring(0, url.length - 8);	
			imagepath = pieces + "frame_0000.png";
			hasMainAttachment = true;
		}else{
			extAttachmentPath = args.post_attachments[0].ext_path;
			hasExtAttachment = true;
		}

        $.postAttachmentImage.image = imagepath;
        $.extAttachmentImage.image = extAttachmentPath;
        
        $.postAttachmentImage.visible = hasMainAttachment;
        $.extAttachmentImage.visible = hasExtAttachment;
        
        $.paperClipImage.visible = hasExtAttachment;
        
        
        var mainImageWidth = 0;
        var mainImageHeight = 0;
        
        if(hasMainAttachment){
        	mainImageWidth = 100;
        	mainImageHeight = 100;
        }
        
        $.postAttachmentImage.height = mainImageHeight;
		$.postAttachmentImage.width = mainImageWidth;
	
	
}else{
	$.postAttachmentImage.width = 0;
	$.postAttachmentImage.height = 0;
}




/*

$.textLabel.text = args.textLabel;          
$.nameLabel.text = args.nameLabel;  
$.dateLabel.text = args.dateLabel;         
$.row.post_id = args.idLabel;
$.thumbImage.image = args.photo_url;replies_count	0	

*/