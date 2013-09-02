function onItemClick(e) {
	// get the clicked section
	var section = $.list.sections[e.sectionIndex];

	// get the clicked item from that section
	var item = section.getItemAt(e.itemIndex);

	// print the item's title
	alert('itemclick: ' + item.properties.title);
}



function createListView(_data) {
    // this is pretty straight forward, assigning the values to the specific
    // properties in the template we defined above
    var items = [];
    for (var i in _data) {
        //alert("load item");
        // add items to an array
        var imagepath = "";
        if(_data[i].post_attachments.count>0){
        	imagepath =  _data[i].post_attachments[0].ext_path;    // assign the values from the data
       	}else{
       		
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
            attachmentImage : {
                image : imagepath    // assign the values from the data
            },               
            pic : {
                image : _data[i].user.photo_url    // assign the values from the data
            },
            idLabel : {
                text : _data[i].id    // assign the values from the data
            }  
             
        });
    }
    
    // add the array, items, to the section defined in the view.xml file
    $.section.setItems(items);
 
}
 
function GetFeedPosts() {
	xhr = getPostsWithFamily(Titanium.App.Properties.getString('mmat'));
    xhr.onload = function(){
    	postXML = this.responseText;
    	createListView(JSON.parse(postXML));
    };
    
    xhr.onerror = function(e){
    	alert(e.message);
    };
	xhr.send();
}
	
	
var postXML = "";
 

GetFeedPosts();


Ti.API.info('feed loaded');