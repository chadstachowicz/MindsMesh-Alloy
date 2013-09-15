//LOADING ACTIONS
var win = Titanium.UI.currentWindow;
var postXML = "";



var topic_id = null;
var group_id = null;

//$.feed.orientationModes = [Titanium.UI.PORTRAIT];
$.commentTextArea.visible=false;
$.platformLabel.text = Ti.Platform.name;

	
	
GetFeedPostsWithCallback("ShowDataByPlatform");


Ti.API.info('feed loaded');






//BUTTON ACTIONS
function backBtnClicked(_event) {
    //alert("back button clicked");
	Ti.API.info("back button clicked");
	openWindow("settings");
}


function loadMoreBtnClicked(_event) {
    alert(postXML);
}




//COMMENT STUFF******************************




function textAreaReturn(_event) {
    //alert("textAreaReturn");
	Ti.API.info("textAreaReturn");
	//$.textField.visible = false;
	
	$.commentTextArea.bottom = 50;
	$.commentTextArea.blur();
}


function textAreaClick(){
	//alert("textAreaClick");
	Ti.API.info("textAreaClick");

    if (Ti.Platform.osname == 'android'){
    	//iphone
		$.commentTextArea.bottom = 10;
	}else{
		//android 
 		$.commentTextArea.bottom = 220;
	}
	
}


function cancelBtnClicked(event){
	Ti.API.info("cancel button clicked");

	$.commentTextArea.visible = false;
	$.commentLabel.visible = false;
}

/*
function UpdateCommentText(_event) {
	Ti.API.info("UpdateCommentText: " + $.commentTextArea.value);

	$.commentLabel.text = $.commentTextArea.value;

}
*/

function shareBtnClicked(_event) {
	Ti.API.info("share button clicked");

	if($.commentTextArea.visible==false){

		$.commentTextArea.visible = true;
		$.commentTextArea.focus();
		//$.commentBtn.title = "share";

	}else{
		shareComment($.commentTextArea.value);

	}
}

function commentLabelClick(){
	
	Ti.API.info("commentLabelClick");

	$.commentTextArea.visible = true;
	$.commentBtn.title = "share";
	$.commentLabel.visible = false;

}
 





function shareComment(commentText){

	if(commentText.length >= 5)
	{		
		alert("FAKE MakeCommentWithCallback: " + commentText);
		
		//MakeCommentWithCallback(commentText,null,null,"alert");
	
	
	
	
	
	
	
	
	
	
	SendImage(commentText,	$.postImage.image);
	
	
	
	
	
		$.commentTextArea.visible = false;
	
		$.commentTextArea.setValue("");
	
		Ti.API.info("refresh comments");
		
		
		$.postImage.visible = false;
	
		GetFeedPostsWithCallback("ShowDataByPlatform");
	
	} else {
		alert("A reasonable post should have at least 5 chars.");
	}
}
 
 
 
 
 
 


function cameraBtnClicked(_event) {
    //alert("back button clicked");
	Ti.API.info("camera button clicked");
	//openWindow("camera");
	OpenCamera();
	
	
	
}
function galleryBtnClicked(_event) {
    //alert("back button clicked");
	Ti.API.info("gallery button clicked");
	//openWindow("gallery");
	
	OpenGallery();
}

 





function OpenCamera(){
	Titanium.Media.showCamera({
		success:function(event) {
			// called when media returned from the camera
			Ti.API.debug('Our type was: '+event.mediaType);
			if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
				//$.mainView.image = event.media;
				Ti.API.info("data from camera: " + event.media);
				$.postImage.image = event.media;
				$.postImage.visible = true;
				$.commentLabel.visible = true;

			} else {
				alert("got the wrong type back: "+ event.media);
			}
		},
		cancel:function() {
			// called when user cancels taking a picture
			alert("user cancelled");
		},
		error:function(error) {
			// called when there's an error
			var a = Titanium.UI.createAlertDialog({title:'Camera'});
			//if (error.code == Titanium.Media.NO_CAMERA) {
		},
		saveToPhotoGallery:true,
		allowEditing:true,
		mediaTypes:[Ti.Media.MEDIA_TYPE_VIDEO,Ti.Media.MEDIA_TYPE_PHOTO]
	});

	
	
	
}





function OpenGallery(callback){
	Titanium.Media.openPhotoGallery({
		success:function(event) {
			// called when media returned from the camera
			Ti.API.debug('Our type was: '+event.mediaType);
			if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
				//$.mainView.image = event.media;
				Ti.API.info("data from gallery: " + event.media);
				$.postImage.image = event.media;
				$.postImage.visible = true;
				$.commentLabel.visible = true;
					
				Ti.API.debug('Our media was: '+event.media);
			} else {
				alert("got the wrong type back: " + event.mediaType);
			}
		},
		cancel:function() {
			// called when user cancels taking a picture
			alert("user cancelled");
		},
		error:function(error) {
			// called when there's an error
			alert("Unexpected error: " + error.code);
			/*if (error.code == Titanium.Media.NO_CAMERA) {*/
		},
		allowEditing:true,
		mediaTypes:[Ti.Media.MEDIA_TYPE_VIDEO,Ti.Media.MEDIA_TYPE_PHOTO]
	});
	
	
}








function createListView(_data) {
    // this is pretty straight forward, assigning the values to the specific
    // properties in the template we defined above
    var items = [];
    for (var i in _data) {
        //alert("load item");
        // add items to an array
        var imagepath = "";
        var extAttachmentPath = "";
        var hasExtAttachment = false;
        var hasMainAttachment = false;
        
        if(_data[i].post_attachments.length>0){
        	//imagepath =  _data[i].post_attachments[0].url;    // assign the values from the data
		    var filetype = "" + GetExtention(_data[i].post_attachments[0].name);
			
			if(filetype=="png"||filetype=="jpg"){
				imagepath = _data[i].post_attachments[0].url;    // assign the values from the data
				hasMainAttachment = true;
			}else if(filetype=="mov"){
				var url = _data[i].post_attachments[0].url;
				var pieces = url.substring(0, url.length - 8);	
				imagepath = pieces + "frame_0000.png";
				hasMainAttachment = true;
			}else{
				extAttachmentPath = _data[i].post_attachments[0].ext_path;
				hasExtAttachment = true;
			}
       	}else{
       		//imagepath = _data[i].user.photo_url;
       	}

        var mainImageWidth = 0;
        var mainImageHeight = 0;
        
        if(hasMainAttachment){
        	mainImageWidth = 100;
        	mainImageHeight = 100;
        }

        items.push({
            template : "template1", 
            
            textLabel : {
                text : _data[i].text           // assign the values from the data
            },
            nameLabel : {
            	text :  "[" + _data[i].user.name + "]"
            },           
            dateLabel : {
            	text :  formatDate(_data[i].created_at)
            },               
            pic : {
                image : _data[i].user.photo_url    // assign the values from the data
            },
            postAttachmentImage : {
                image :  imagepath,      // assign the values from the data
                visible : hasMainAttachment,
                width : mainImageWidth,
                heigth : mainImageHeight
            },               
            pic : {
                image : _data[i].user.photo_url    // assign the values from the data
            },
            idLabel : {
                text : _data[i].id    // assign the values from the data
            },
            dataLabel : {
            	text : JSON.stringify(_data[i])
            },
            commentCountLabel : {
            	text : _data[i].replies_count
            },
            extAttachmentImage : {
            	image : extAttachmentPath,
            	visible : hasExtAttachment
            } 
        });
    }
    
    // add the array, items, to the section defined in the view.xml file
    $.section.setItems(items);
 
}
 
 
 
 //creates tableview items
function createTableView(_data) {
    // this is pretty straight forward, assigning the values to the specific
    // properties in the template we defined above
    var items = [];
    
    //for each item in the data
    for (var i in _data) {
	    items.push(Alloy.createController('tableViewRow', _data[i]).getView());
	}
	
	$.table.setData(items);
}
 
 //called on android
function listViewItemClick(e) {
	// get the clicked section
	var section = $.list.sections[e.sectionIndex];
	// get the clicked item from that section
	var item = section.getItemAt(e.itemIndex);
	//opens post from listview
	openWindowWithArguments("showpost", JSON.parse(item.dataLabel.text));
}

function tableViewHandleClick(e) {
	//opens post from tableview
	openWindowWithArguments("showpost", e.row.data);
}
 
 



function GetFeedPostsWithCallback(callback) {
	Ti.API.info("GetFeedPostsWithCallback");
	xhr = getPostsWithFamily(Titanium.App.Properties.getString('mmat'));
    xhr.onload = function(){
    	postXML = this.responseText;
    	//ShowDataByPlatform(JSON.parse(postXML));
    	var c = "" + callback + "(JSON.parse(postXML))";
    	//alert(c);
    	eval(c);
    };
    
    xhr.onerror = function(e){
    	alert(e.message);
    };
	xhr.send();
}

function ShowDataByPlatform(postJSON){
	//display json data, listing the feeds of a single user
    if (Ti.Platform.osname == 'iphone'){
    	//iphone shows tableview because it is fast and the height works
		createTableView(postJSON);
		$.table.visible = true;
		Ti.API.info("showing tableview, because of IOS");
	}else{
		//android needs a listview for speed
    	createListView(postJSON);
		$.list.visible = true;
		Ti.API.info("showing listview, because of android");		
	}
} 


function MakeCommentWithCallback(comment,topic_id,group_id, callback)
{//submits post alone
	if(topic_id != null)
	{
		var postData = {'topic_id': topic_id, 'text': comment};
	} else if (group_id != null) {		
		var postData = {'group_id': group_id, 'text': comment};
	} else {					
		var postData = {'text': comment};
	}
	
	xhr = postPostCreate(Titanium.App.Properties.getString('mmat'), postData);
	
	xhr.onload = function(){
		var response = this.responseText;
		var c = callback + "(" + response + ");";
		//alert(c);
		eval(c);
	};
	
	xhr.send(postData);
}



function SendImage(message,currentFile)
{//submits post with image file
	Ti.API.info("SendPostImage");
	
	var filename = "post.png";
	var postData;
	
	//create postdata from topic, group and file
	if(topic_id != null) 
	{
		postData = {'topic_id': topic_id, 'text': message, 'filename': filename, 'content_type': currentFile.mimeType};
	} else if (group_id != null) {		
		postData = {'group_id': group_id, 'text': message, 'filename': filename, 'content_type': currentFile.mimeType};
	} else {					
		postData = {'text': message, 'filename': filename, 'content_type': currentFile.mimeType};
	}
	
	xhr = postPostCreate(Titanium.App.Properties.getString('mmat'),postData);

	$.pb.show();
	xhr.onload = function()
	{
		//get post id for aws
		var post_id = JSON.parse(this.responseText).id;
		
		//get temp file
		f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,filename);
		
		//if temp file exists, delete and fill with current file data
		if(f.exists() == true){f.deleteFile();}
		f.write(currentFile);
		
		
		Ti.API.info(Ti.App.Properties.getString('production'));
		var env = 'development';
		if(Ti.App.Properties.getString('production')=='true')
		{
			env = 'production';
		}
		
		Ti.API.info(env);
		
		
		var serverFilePath = env + '/post_attachments/' + post_id + '/' + filename;
		
		//upload file
		UploadToAWS(serverFilePath,filename);
		
		//delete temp			
		f.deleteFile();

	};
	xhr.send(postData);
	

	//shareWhoModal.close();
}




	
	
	
function SendPostMovie(message, currentFile)
{//submits post with moive file
	var filename = "post.mov";
	var postData;




alert(topic_id != null);

	if(topic_id != null)
	{
		postData = {'topic_id': topic_id, 'text': message, 'filename': filename, 'content_type': currentFile.mimeType};
	} else if (win.group_id != null) {		
		postData = {'group_id': group_id, 'text': message, 'filename': filename, 'content_type': currentFile.mimeType};
	} else {					
		postData = {'text': message, 'filename': filename, 'content_type': currentFile.mimeType};
	}
	
	xhr = postPostCreate(Titanium.App.Properties.getString('mmat'),postData);
	$.pb.show();
	
	xhr.onload = function()
	{
		var post_id = JSON.parse(this.responseText).id;
		
		f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,filename);
		if(f.exists() == true)
		{
			f.deleteFile();
		}
		currentFile.copy(f.nativePath);
		
		var env = 'development';
		if(Ti.App.Properties.getString('production')=='true'){env = 'production';}
		
		var filnam = env + '/post_attachments/' + post_id + '/' + filename;




		//upload file
		UploadToAWS(serverFilePath,filename);
		
		//delete temp			
		f.deleteFile();
	};
	
	xhr.send(postData);
}






// AWS UPLOADS
function UploadToAWS(serverFilename,filename){
//unploads file to AWS
	Ti.API.info("serverFilename: " + serverFilename);
	Ti.API.info("filename: " + filename);
	
	AWS.config(
	{
		key: 'AKIAIKFVJ3EMAIBXELBQ',
		secret: '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',
		bucket: 'mindsmesh.com',
		GSM:' -0700',
		debug:true,
		http: Titanium.Network.createHTTPClient(),
		s3fileName: serverFilename,
		timeout: (1000 * 60 * 4),
		onsendstream: function(e) {pb.value = e.progress;},
		error: function(e) {alert(e);},
		success: AWSPostSuccess(serverFilename,filename)
	});
	AWS.PUT(filename);
	
	Ti.API.info("AWS upload started");	
	
}


 
 
function AWSPostSuccess(serverFilename,filename){
 	//called after upload to AWS
 	
 	Ti.API.info("extention: " + GetExtention(filename));
 	var ext = "" + GetExtention(filename);
 	
 	alert("ext==mov: " + (ext=="mov"));
 	
 	
 	if(ext=="mov"){
 		//encode video
		var postData = {'file': 'http://s3.amazonaws.com/mindsmesh.com/' + serverFilename};
		xhr2 = postEncodeVideo(Titanium.App.Properties.getString('mmat'),postData);
		xhr2.onload = function()
		{
			pb.hide();	
		};
		xhr2.send(JSON.stringify(postData));
 		
 	}else{
 		//just hide progress bar
 		pb.hide();	
 	}
 	Ti.API.info("AWS upload complete");	
 	
}
