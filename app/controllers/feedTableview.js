function handleClick(e) {
    alert(e.row.post_id); 
    
    alert(e.row.data);   
}
 

 
 function handleScrollEnd(e) {
 	
 	//var evt = e;
 	
 	
 	
    //alert("do refresh here");  
}
 

 
 
 
 
 
 
 
 
//creates tableview items
function createListView(_data) {
    // this is pretty straight forward, assigning the values to the specific
    // properties in the template we defined above
    var items = [];
    
    
    
    //for each item in the data
    for (var i in _data) {
    	
    	
    	/*
        var imagepath = "";
        if(_data[i].post_attachments.count>0){
        	imagepath =  _data[i].post_attachments[0].ext_path;    // assign the values from the data
       	}else{
       		
       	}

		var args = {
	            textLabel : _data[i].text, 
	            nameLabel : _data[i].user.name,      
	            dateLabel : _data[i].created_at,           
	            photo_url : _data[i].user.photo_url, 
	            attachmentImage : imagepath, 
	            idLabel : _data[i].id 
		};    
	*/
	    
	    //items.push(Alloy.createController('tableViewRow', args).getView());
	    items.push(Alloy.createController('tableViewRow', _data[i]).getView());
	    
	    
	    
	}
	
	$.table.setData(items);
}
 
 
 
 //gets the data to build the tableview
function GetTableViewFeedPosts() {
	//alert(Titanium.App.Properties.getString('mmat'));
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
	


GetTableViewFeedPosts();

Ti.API.info('tableview feed loaded');
 
 
