 
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



$.commentLabel.text = "";

//$.mainAttachmentImage.image
//$.userImage.image
$.dateLabel.text = "";




//args.post_attachments.count
//args.post_attachments[0].ext_path
