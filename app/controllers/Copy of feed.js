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
	var args = {
		data: "test data",
		value: "other data"
	};
	
	$.feedWindow.close();
	$.feedWindow = null;
	
	
	var view1 = Alloy.createController(windowName, args);
	view1.getView().open();
		
}


function backBtnClicked(_event) {
    //alert("back button clicked");
	Ti.API.info("back button clicked");
	openWindow("settings");
}

function loadMoreBtnClicked(_event) {
    alert(postXML);
}





//called on android
function ItemClick(e) {
	// get the clicked section
	var section = $.list.sections[e.sectionIndex];

	// get the clicked item from that section
	var item = section.getItemAt(e.itemIndex);

	// print the item's title
	alert('ItemClick: ' + item.dataLabel.text);

	var view1 = Alloy.createController(windowName, item.dataLabel.text);
	view1.getView().open();
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
            },
            paperClipImage : {
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
 
 
function handleClick(e) {
    alert(e.row.post_id); 
    
    alert(e.row.data);   
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
