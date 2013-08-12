 /*
  * 
  function createListView(_data) {
 
    // this is pretty straight forward, assigning the values to the specific
    // properties in the template we defined above
    var items = [];
    for (var i in _data) {
        
        // add items to an array
        items.push({
            template : "template1",            // set the template
            textLabel : {
                text : _data[i].name           // assign the values from the data
            },
            pic : {
                image : _data[i].pic_square    // assign the values from the data
            }
        });
    }
    
    // add the array, items, to the section defined in the view.xml file
    $.section.setItems(items);
 
}
 
function GetFeedPosts() {
	
	alert(Titanium.App.Properties.getString('mmat'));
	
	xhr = getPostsWithFamily(Titanium.App.Properties.getString('mmat'));

    xhr.onload = function(){
    	//should be createListView() with data
    	alert(this.responseText);
    	//onLoad();
    };
	xhr.send();
	
	
	
	

    if (!fb.loggedIn) { debugger;
        fb.permissions = ["read_stream", "email"];
        fb.authorize();
        return;
    }
 
    var query = "SELECT uid, name, pic_square, hometown_location  FROM user ";
    query += "where uid IN (SELECT uid2 FROM friend WHERE uid1 = " + fb.uid + ")";
    query += "order by last_name limit 1000";
    Ti.API.info("user id " + fb.uid);
    fb.request("fql.query", {
        query : query
    }, function(r) {
        if (r.success) {
            createListView(JSON.parse(r.result));
        } else {
            alert('error happened!');
        }
    });
 
    // set login callback
    fb.addEventListener('login', function(e) {
        _doFacebookLoginAction();
    });
    */
 


// open the view
//$.index.open();
 
//var fb = require("facebook");
 
// YOU MUST DO THIS
// set this in your tiapp.xml file
//fb.appid = Ti.App.Properties.getString("ti.facebook.appid");
 
// Start process by loggin in
//GetFeedPosts();



/*
        var loadingTemplate = {
		        	childTemplates: [
		        	{
			            type: 'Ti.UI.Label', // Use a label
			            bindId: 'loadingLabel',  // Bind ID for this label
			            properties: {        // Sets the Label.left property
		                left: 80,
		                top: 15,
		                textAlign:'left',
		                text: 'Loading',
		                backgroundColor:'#ecfaff',
						height:'auto',
		                color:'#46a546',
						font:{fontWeight:'bold',fontSize:20}
		            },
		        }
        	]
        }



var plainTemplate = {
    childTemplates: [
        {
            type: 'Ti.UI.Label', // Use a label
            bindId: 'listName',  // Bind ID for this label
            properties: {        // Sets the Label.left property
                left: '65dp',
                top: 15,
                right: 20,
                textAlign:'left',
                backgroundColor:'#ecfaff',
				height:'20dp',
                color:'#46a546',
				font:{fontWeight:'bold',fontSize:'18dp'}
            },
            events: { click : redirectToPost } 
        },
        {
            type: 'Ti.UI.Label', // Use a label
            bindId: 'attachText',  // Bind ID for this label
            properties: {        // Sets the Label.left property
                left: 57,
                bottom: 18,
                textAlign:'center',
				height:'auto',
                color:'#000000',
				font:{fontWeight:'bold',fontSize:14}
            },
            events: { click : redirectToPost } 
        },
        {
            type: 'Ti.UI.ImageView', // Use a label
            bindId: 'paperclip',  // Bind ID for this label
            properties: {        // Sets the Label.left property
				bottom: 10,
				height: 32,
				left: 20,
            },
            events: { click : redirectToPost }  
        },
        {
            type: 'Ti.UI.ImageView', // Use a label
            bindId: 'movPict',  // Bind ID for this label
            properties: {        // Sets the Label.left property
				bottom: 52,
            },
            events: { click : launchMovie }  
        },
        {
            type: 'Ti.UI.ImageView', // Use a label
            bindId: 'picPict',  // Bind ID for this label
            properties: {        // Sets the Label.left property
				bottom: 52,
            },
            events: { click : launchPic }  
        },
        {
            type: 'Ti.UI.Label', // Use a label
            bindId: 'commentCount',  // Bind ID for this label
            properties: {        // Sets the Label.left property
                bottom: 18,
           		right: 22,
           		color:'#000000',
				textAlign:'center',
				font:{fontWeight:'bold',fontSize:16}
            },
            events: { click : redirectToPost } 
        },
        {
            type: 'Ti.UI.Button', // Use a label
            bindId: 'replyButton',  // Bind ID for this label
            properties: {        // Sets the Label.left property
                width:32,
				height: 32,
				bottom: 10,
				right: 40,
				backgroundImage: '/images/comment_32.png'
            },
            events: { click : redirectToPost } 
        },
        {
            type: 'Ti.UI.ImageView', // Use a label
            bindId: 'picSquare',  // Bind ID for this label
            properties: {        // Sets the Label.left property
				top: 15,
				left: 23,
				height:'40dp',
				width:'40dp'
            },
            events: { click : redirectToPost } 
        },
        {
            type: 'Ti.UI.Label', // Use a label
            bindId: 'postTime',  // Bind ID for this label
            properties: {        // Sets the Label.left property
                backgroundColor:'#ecfaff',
				textAlign:'left',
				left:'65dp',
				top: '34dp',
				height:'auto',
				color:'#808080',
				font:{fontSize:'11dp'}
            },
            events: { click : redirectToPost } 
        },
        {
            type: 'Ti.UI.Label', // Use a label
            bindId: 'comment',  // Bind ID for this label
            properties: {        // Sets the Label.left property
                left: 25,
                right: 15,
                top: '65dp',
                textAlign:'left',
                backgroundColor:'#ecfaff',
				height:'auto',
                color:'#000000',
				font:{fontSize:'15dp'},
				bottom: 50,
            },
            events: { click : redirectToPost } 
        },
        {
            type: 'Ti.UI.ImageView', // Use a label
            bindId: 'playButton',  // Bind ID for this label
            properties: {        // Sets the Label.left property
                height: 32,
				bottom: 170,
				zIndex: 1,
            },
            events: { click : launchMovie } 
        },
        {
            type: 'Ti.UI.View', // Use a label
            bindId: 'commentBack',  // Bind ID for this label
            properties: {        // Sets the Label.left property
                backgroundColor:'#ecfaff',
				height:Ti.UI.Fill,
				width:Ti.UI.Fill,
				left: 15,
				right: 15,
				top: 5,
				bottom: 48,
				zIndex: -1,
            },
            events: { click : redirectToPost } 
        },
        {
            type: 'Ti.UI.View', // Use a label
            bindId: 'seperator',  // Bind ID for this label
            properties: {        // Sets the Label.left property
                backgroundColor:'#808080',
				height:1,
				width:Ti.UI.Fill,
				left: 15,
				right: 15,
				bottom: 47,
				zIndex: -1,
            },
            events: { click : redirectToPost } 
        },
        {
            type: 'Ti.UI.View', // Use a label
            bindId: 'backHold',  // Bind ID for this label
            properties: {        // Sets the Label.left property
                backgroundColor:'#e2e7ed',
				width:Ti.UI.Fill,
				left: 15,
				right: 15,
				height: 42,
				bottom: 5,
				zIndex: -1,
            },
            events: { click : redirectToPost } 
        }
    ]
};

//FEED DATA XML
var listView = Titanium.UI.createListView({
	backgroundColor:'#46a546',
	templates: { 'plain': plainTemplate, 'loading': loadingTemplate },
	separatorStyle: 'none',
	separatorColor: 'transparent',
	defaultItemTemplate: 'plain',
	top:'44dp'
});


$.feedList.templates.


   function redirectToPost(e)
   {
   	
   		alert(e.section.getItemAt(e.itemIndex).comment.postid);
   	
   	

   		var win1 = Titanium.UI.createWindow({  
    			url:'post.js',
  				backgroundColor:'#fff',
  				barColor: '#46a546',
  				fullscreen: true,
				});
		win1.postid = e.section.getItemAt(e.itemIndex).comment.postid;
		win1.open();
		
   }
   



$

$.feedLabel.text = Titanium.App.Properties.getString("userid")
//$.feedWindow.open();

alert("login successful");
	


	
	
//alert("hello feed");
function CreateTemplate(){
	//FEED DATA, TEMPLATE
}


*/
