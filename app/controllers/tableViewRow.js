
 function GetAttachmentExtention(filename){
 	var filesplit = [];
 	
 	var f = "" + filename;
 	
 	filesplit = f.split("."); 
 	if(filesplit.length==2){
 		return(filesplit[1]);
 	}
 	return("");
 	
 }
 
 
 var args = arguments[0]||{};








//args.post_attachments.count
//args.post_attachments[0].ext_path
$.textLabel.text = args.text  + "this is the end of long text";
$.nameLabel.text = args.user.name;
$.dateLabel.text = formatDate(args.created_at);
$.thumbImage.image = args.user.photo_url;
$.row.post_id = args.id ;
$.commentCountLabel.text = args.replies_count;
	

$.row.data = args;

if(args.post_attachments.length>0){
	
	var filetype = GetAttachmentExtention(args.post_attachments[0].name);
	if(filetype=="png"){
		$.postAttachmentImage.image = args.post_attachments[0].url;    // assign the values from the data
		
	}else{
		
		$.postAttachmentImage.image = args.post_attachments[0].ext_path;
	}
	
	
	
	


	
	
}else{
	$.postAttachmentImage.width = 0;
		$.postAttachmentImage.height = 0;
	$.postAttachmentImage.visible = false;
}




/*

$.textLabel.text = args.textLabel;          
$.nameLabel.text = args.nameLabel;  
$.dateLabel.text = args.dateLabel;         
$.row.post_id = args.idLabel;
$.thumbImage.image = args.photo_url;replies_count	0	

*/