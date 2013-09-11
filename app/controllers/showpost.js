
var args = arguments[0]||{};


var imagepath = "";
var extAttachmentPath = "";
var hasExtAttachment = false;
var hasMainAttachment = false;
var attachmentType = "";
var filetype = "";
var attachmentURL = "";
var filename = "";




$.postidLabel.text = args.postid;

$.replies = args.replies;
$.userImage.image	 = args.user.photo_url;
$.nameLabel.text = args.user.name;
$.dateLabel.text = formatDate(args.updated_at);
$.commentLabel.text = "\r\n" + args.text + "\r\n\r\n";
$.replyCountLabel.text = args.replies_count;
$.attachmentCountLabel.text = args.post_attachments.length;




LoadImages();
ShowReplies();


$.textField.visible = false;



function LoadImages(){
	if(args.post_attachments.length>0){
		//imagepath =  _data[i].post_attachments[0].url;    // assign the values from the data
	    filetype = "" + GetExtention(args.post_attachments[0].name);
	    filename = "" + GetCleanFilenameFromPath(args.post_attachments[0].url);
	    
		
		if(filetype=="png"||filetype=="jpg"){
			imagepath = args.post_attachments[0].url;    // assign the values from the data
			attachmentURL = args.post_attachments[0].url;
			hasMainAttachment = true;
		}else if(filetype=="mov"){
			attachmentURL = args.post_attachments[0].url;
			//this is wrong, should split on "/" and then "."
			var pieces = attachmentURL.substring(0, attachmentURL.length - 8);	
			imagepath = pieces + "frame_0000.png";
			hasMainAttachment = true;
		}else{
			attachmentURL = args.post_attachments[0].url;
			extAttachmentPath = args.post_attachments[0].ext_path;
			hasExtAttachment = true;
		}
	}else{
		//imagepath = _data[i].user.photo_url;
	}
	
	$.extAttachmentFileNameLabel.text =  filename;
	$.attachmentExtLabel.text =  filetype;  	
	$.mainAttachmentImage.visible  =  hasMainAttachment;
	$.extAttachmentImage.visible  =  hasExtAttachment;
	    
	if(hasMainAttachment){
	  	$.mainAttachmentImage.image = imagepath;
	}
	if(hasExtAttachment){
	  	$.extAttachmentImage.image = extAttachmentPath;
	}

	
}



function ExternalFileClick(e) {
    
    //alert("ExternalFileClick");
        //alert("back button clicked");
	Ti.API.info("ExternalFileClick clicked");
	

	if(filetype=="pdf"){
		
			//display json data, listing the feeds of a single user
	    if (Ti.Platform.osname == 'android'){
	    	//iphone shows tableview because it is fast and the height works
			Ti.API.info("android, open external file");
			AndroidDownloadFile(attachmentURL);
		}else{
			var view1;
			//android needs a listview for speed
			view1 = Alloy.createController("showfile", {value: attachmentURL});	
			Ti.API.info("IOS, use showfile");		
			view1.getView().open();
		}
		
		



	}else{
		
		
		var view1;
		view1 = Alloy.createController("showimage", {value: $.mainAttachmentImage.image});	
			view1.getView().open();
		
		
	}



    //alert(e.row.post_id); 
    //alert(e.row.data);   
}


function handleClick(e) {
    
    alert("handleClick");
    
    //alert(e.row.post_id); 
    //alert(e.row.data);   
}

function ShowReplies(e) {
    
    //alert($.replies); 
    //alert("ShowReplies");
    
    //alert(e.row.post_id); 
    //alert(e.row.data);   
    
    Ti.API.info(JSON.stringify($.replies));
    
    createRepliesTableView($.replies);
    
    
}




 
function openWindow(windowName,args){
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


function textFieldClick(_event) {
    //alert("back button clicked");
	Ti.API.info("text Field Click");
	
	$.textField.bottom = 220;
}


function textFieldReturn(_event) {
    //alert("back button clicked");
	Ti.API.info("text Field Return");
	//$.textField.visible = false;
	
	$.textField.bottom = 50;
	$.textField.blur();
}

function textAreaClick(){
	//alert("textAreaClick");
	Ti.API.info("textAreaClick");

	
	
	
	

    if (Ti.Platform.osname == 'android'){
    	//iphone
		$.textField.bottom = 10;
		
	}else{
		//android 
 		$.textField.bottom = 220;
	}
	
}

function shareBtnClicked(_event) {
    //alert("shareBtnClicked");
	Ti.API.info("share button clicked");
	
	
	
	
	
	
	if($.textField.visible==false){

		$.textField.visible = true;
		$.shareBtn.title = "share";

	}else{
		shareComment($.textField.value);

	}
	
	

}

function shareComment(commentText){
	
	
	
	alert("send comment here: " + commentText);
	
	
	MakeComment();
	
	
	alert("refresh comments");

	$.textField.visible = false;
	$.shareBtn.title = "comment";
	$.textField.setValue("");
}
 
 
 function MakeComment(e){
	if($.textField.value.length < 1)
	{
		alert("Your post must be at least 1 character");
	} else {
		var postData = {'reply': {'text' :$.textField.value} };
		xhr = postReplyCreate(Titanium.App.Properties.getString("mmat"),$.postidLabel.text,postData);
		xhr.onload = function(){
			var response = this.responseText;
			alert(response);
			//var test = JSON.parse(response);
			//win.navGroup.close(win);
		};
		xhr.send(JSON.stringify(postData));
		
	}
 }
 
 
 
 
function MainImageClick(_event) {
    //alert("back button clicked");
	Ti.API.info("main image clicked");
	
	var view1;
	if(filetype=="mov"){
		view1 = Alloy.createController("showvideo", {value: attachmentURL});	

	}else{
		view1 = Alloy.createController("showimage", {value: $.mainAttachmentImage.image});	
	}

	view1.getView().open();
}





 //creates tableview items
function createRepliesTableView(_data) {
	
	Ti.API.info("called: createRepliesTableView");
    // this is pretty straight forward, assigning the values to the specific
    // properties in the template we defined above
    var items = [];
    
    
    
    //for each item in the data
    for (var i in _data) {
    	//replyTableViewRow NEEDS TO BE CREATED
	    items.push(Alloy.createController('replyTableViewRow', _data[i]).getView());
	}
	
	
	if(items.length>0){
		$.replyTable.setData(items);
		$.replyTable.visible = true;	
	}

}
 




//*************************************************
//UNTESTED
var loadView ;
function AndroidDownloadFile(URL){
	
	
	Ti.API.info("AndroidDownloadFile: " + URL);
		
		
	loadView = Ti.UI.createWindow({
    	backgroundColor: 'black',
    	opacity: .90,
    	height: Ti.Platform.displayCaps.platformHeight,
    	width: Ti.Platform.displayCaps.platformWidth
	});
 
	var loadIndicator = Ti.UI.createActivityIndicator({
    	style: Ti.UI.iPhone.ActivityIndicatorStyle.BIG,
    	message: 'Downloading File...',
    	font : 'Arial',
    	color: '#FFF'
	});
	loadView.add(loadIndicator);
	loadView.open();
	loadIndicator.show();
	
	//needs file data here
   	//var url = e.section.getItemAt(e.itemIndex).fileName.FileUrl;
   	//var name = e.section.getItemAt(e.itemIndex).fileName.FileName;		
	var name = GetCleanFilenameFromPath(URL);



	var xhr = Titanium.Network.createHTTPClient({enableKeepAlive:false, timeout:6000});
	xhr.retries = 0;
	xhr.open('GET',url);
	xhr.onload = MoveAndOpenFile(name);
	xhr.send();	
}



function MoveAndOpenFile(filename){
	
	Ti.API.info("MoveAndOpenFile: " + filename);
	
	
	loadView.close();
	try{
		//not needed?
		//var ending = filename.split(".");
		if (this.responseData.type == 1)
		{
			
			var f = Ti.Filesystem.getFile(this.responseData.nativePath);
			var dest = Ti.Filesystem.getFile(Ti.Filesystem.getExternalStorageDirectory(),filename);
	  		if (dest.exists){
				dest.deleteFile();
			}
			f.copy(dest.nativePath);
			alert("seems like it works");
		}
		else
		{
			 var f = Ti.Filesystem.getFile(Ti.Filesystem.getExternalStorageDirectory(),filename);
			 f.write(this.responseData);
		}
		var mimeType = this.responseData.mimeType;
		var intent = Ti.Android.createIntent({action: Ti.Android.ACTION_VIEW,type: mimeType,data: f.getNativePath()});	
		
		Ti.Android.currentActivity.startActivity(intent);
	} catch (err) {
		alert("We we unable to open " + filename + " automatically.  You can find the file on your storage device under " + Ti.Filesystem.getExternalStorageDirectory());
	}
}
function DownloadURL(url){
	
	
	var xhr = Titanium.Network.createHTTPClient({enableKeepAlive:false, timeout:6000});
	xhr.retries = 0;
	xhr.open('GET',url);
	xhr.onload = SaveLocal(name,xhr);
	xhr.send();	
}

function SaveLocal(filename,xhr){
	
	
	Ti.API.info('Status  is ::',xhr.status);
	//var ResponseData = xhrDocument.getResponseXML().getElementsByTagName('GetDocResult').item(0).text;  
	var ResponseData =  xhr.responseText;
	var file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,filename);
	if(xhr.status == 200){ 
	    var file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'filename2.pdf');                   
	    file.write(ResponseData);
		Titanium.API.info('file write');
		Titanium.API.info(file.size);
	}
}


//************************************************

//args.post_attachments.count
//args.post_attachments[0].ext_path
