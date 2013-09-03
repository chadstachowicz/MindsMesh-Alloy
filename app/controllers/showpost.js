 function handleClick(e) {
    
    alert("handleClick");
    
    //alert(e.row.post_id); 
    //alert(e.row.data);   
}
 
 function openWindow(windowName){
	var args = {
		data: "test data",
		value: "other data"
	};
	
	//$.showpost.close();
	//$.showpost = null;
	
	
	var view1 = Alloy.createController(windowName, args);
	view1.getView().open();
		
}

 function goBackToFeed(){

	$.showpost.close();
	$.showpost = null;
		
}
 
 
function backBtnClicked(_event) {
    //alert("back button clicked");
	Ti.API.info("back button clicked");
	goBackToFeed();
}

function MainImageClick(_event) {
    //alert("back button clicked");
	Ti.API.info("main image clicked");
	//openWindow("showimage");
	var e = _event;
	
	
	var i = $.mainAttachmentImage.image;
	
	var args = {
		data: "test data",
		value: i
	};
	
	//$.showpost.close();
	//$.showpost = null;
	
	
	var view1 = Alloy.createController("showimage", args);
	view1.getView().open();
}





 //creates tableview items
function createTableView(_data) {
    // this is pretty straight forward, assigning the values to the specific
    // properties in the template we defined above
    var items = [];
    
    
    
    //for each item in the data
    for (var i in _data) {
    	//replyTableViewRow NEEDS TO BE CREATED
	    //items.push(Alloy.createController('replyTableViewRow', _data[i]).getView());
	}
	
	$.replyTable.setData(items);
}
 


var args = arguments[0]||{};

//alert(args);

//JSON.parse(args)





$.userImage.image	 = args.user.photo_url;
$.nameLabel.text = args.user.name;
$.dateLabel.text	 = args.updated_at;
$.commentLabel.text = args.text;



$.replyCountLabel.text = args.replies_count;
$.attachmentCountLabel.text = args.post_attachments.length;



       var imagepath = "";
        var extAttachmentPath = "";
        var hasExtAttachment = false;
        var hasMainAttachment = false;
        
        if(args.post_attachments.length>0){
        	//imagepath =  _data[i].post_attachments[0].url;    // assign the values from the data
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
       	}else{
       		//imagepath = _data[i].user.photo_url;
       	}
       	
  $.mainAttachmentImage.visible  =  hasMainAttachment;
    $.extAttachmentImage.visible  =  hasExtAttachment;
    
  if(hasMainAttachment){
  	$.mainAttachmentImage.image = imagepath;
  }
  if(hasMainAttachment){
  	$.extAttachmentImage.image = extAttachmentPath;
  }








//args.post_attachments.count
//args.post_attachments[0].ext_path
