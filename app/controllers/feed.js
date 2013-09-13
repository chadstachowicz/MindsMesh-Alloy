//$.feed.orientationModes = [Titanium.UI.PORTRAIT];
$.commentTextArea.visible=false;



function GetFeedPosts() {
	xhr = getPostsWithFamily(Titanium.App.Properties.getString('mmat'));
    xhr.onload = function(){
    	postXML = this.responseText;
    	
    	//consume data
    	ShowJSONData(JSON.parse(postXML));
    };
    
    xhr.onerror = function(e){
    	alert(e.message);
    };
	xhr.send();
}

function openWindow(windowName){
	var view1 = Alloy.createController(windowName, {});
	view1.getView().open();
		
}


function backBtnClicked(_event) {
    //alert("back button clicked");
	Ti.API.info("back button clicked");
	openWindow("settings");
}

//COMMENT STUFF******************************
function loadMoreBtnClicked(_event) {
    alert(postXML);
}




function textAreaReturn(_event) {
    //alert("back button clicked");
	Ti.API.info("text Field Return");
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
	
	
	
	//alert($.commentTextArea.visible);
	
	
	if($.commentTextArea.visible==true){

		$.commentTextArea.visible = false;
		//$.commentBtn.title = "s";

	}else{
		shareComment($.commentTextArea.value);

	}
	
	
}




function shareBtnClicked(_event) {
    //alert("shareBtnClicked");
	Ti.API.info("share button clicked");
	
	
	
	//alert($.commentTextArea.visible);
	
	
	if($.commentTextArea.visible==false){

		$.commentTextArea.visible = true;
		//$.commentBtn.title = "share";

	}else{
		shareComment($.commentTextArea.value);

	}
	
	

}

function shareComment(commentText){
	
	
	
	alert("send comment here: " + commentText);
	MakeComment(commentText);
	/*
	if(commentText.length < 1)
	{
		alert("Your post must be at least 1 character");
	} else {
		var postData = {'reply': {'text' :commentText} };
		xhr = postReplyCreate(Titanium.App.Properties.getString("mmat"),$.postidLabel.text,postData);
		xhr.onload = function(){
			var response = this.responseText;
			alert(response);
			//var test = JSON.parse(response);
			//win.navGroup.close(win);
		};
		xhr.send(JSON.stringify(postData));
		
	}
	*/
	
	alert("refresh comments");

	$.commentTextArea.visible = false;
	$.commentBtn.title = "comment";
	$.commentTextArea.setValue("");
}
 
 

function MakeComment(comment,topic_id,group_id)
{
	comment =  "" + comment;

	if(comment.length >= 5)
	{				
		if(topic_id != null)
		{
			var postData = {'topic_id': topic_id, 'text': comment};
		} else if (group_id != null) {		
			var postData = {'group_id': group_id, 'text': comment};
		} else {					
			var postData = {'text': comment};
		}
		
		xhr = postPostCreate(Titanium.App.Properties.getString('mmat'),postData);
		
		xhr.onload = function(){
			var response = this.responseText;
			alert(response);
		};
		
		xhr.send(postData);
			
		
	} else {
		alert("A reasonable post should have at least 5 chars.");
	}
 
}


//COMMENT STUFF******************************





function cameraBtnClicked(_event) {
    //alert("back button clicked");
	Ti.API.info("camera button clicked");
	//openWindow("camera");
	OpenCamera();
	
	
	
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
					
				
			} else {
				alert("got the wrong type back: "+ event.media);
			}
		},
		cancel:function() {
			// called when user cancels taking a picture
			alert("user cancelled");
			//$.camera.close();
			//$.camera = null;
		},
		error:function(error) {
			// called when there's an error
			var a = Titanium.UI.createAlertDialog({title:'Camera'});
			if (error.code == Titanium.Media.NO_CAMERA) {
				a.setMessage('Please run this test on device');
			} else {
				a.setMessage('Unexpected error: ' + error.code);
			}
			a.show();
		},
		saveToPhotoGallery:true,
		allowEditing:true,
		mediaTypes:[Ti.Media.MEDIA_TYPE_VIDEO,Ti.Media.MEDIA_TYPE_PHOTO]
	});

	
	
	
}





function OpenGallery(){
	Titanium.Media.openPhotoGallery({
		success:function(event) {
			// called when media returned from the camera
			Ti.API.debug('Our type was: '+event.mediaType);
			if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
				//$.mainView.image = event.media;
				Ti.API.info("data from gallery: " + event.media);
				$.postImage.image = event.media;
				$.postImage.visible = true;
					
					
				Ti.API.debug('Our media was: '+event.media);
			} else {
				alert("got the wrong type back: " + event.mediaType);
			}
		},
		cancel:function() {
			
			// called when user cancels taking a picture
			alert("user cancelled");
			//Titanium.UI.currentWindow.close();
			
			
			//$.gallery.close();
			//$.gallery = null;
			
		},
		error:function(error) {
			// called when there's an error
			
			alert("Unexpected error: " + error.code);
			/*
			var a = Titanium.UI.createAlertDialog({title:'Camera'});
			if (error.code == Titanium.Media.NO_CAMERA) {
				a.setMessage('Please run this test on device');
			} else {
				a.setMessage('Unexpected error: ' + error.code);
			}
			a.show();
			*/
			
		},
		saveToPhotoGallery:true,
		allowEditing:true,
		mediaTypes:[Ti.Media.MEDIA_TYPE_VIDEO,Ti.Media.MEDIA_TYPE_PHOTO]
	});
	
	
}




function galleryBtnClicked(_event) {
    //alert("back button clicked");
	Ti.API.info("gallery button clicked");
	//openWindow("gallery");
	
	OpenGallery();
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
            }//,
            //paperClipImage : {
            //	visible : hasExtAttachment
            //}   
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

	// print the item's title
	//alert('ItemClick: ' + item.dataLabel.text);

	var view1 = Alloy.createController("showpost", JSON.parse(item.dataLabel.text) );
	view1.getView().open();
}

function tableViewHandleClick(e) {
    //alert(e.row.post_id); 
    
    //alert(e.row.data);   

  
    //$.feed.close();
	//$.feed = null;
	
	var view1 = Alloy.createController("showpost", e.row.data).getView();
	view1.open();

}
 
 
function ShowJSONData(postJSON){
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
 
 
 
 

	
	
var postXML = "";
 

GetFeedPosts();

$.platformLabel.text = Ti.Platform.name;
Ti.API.info('feed loaded');
