	fb.addEventListener('login', function(e) {
	    if (e.data != null ){
		Titanium.App.Properties.setString("fbid",e.data["id"]);	
		}
		xhr = postLogin(fb.accessToken);
		xhr.onload = function(){
			var response = this.responseText;
			var user = JSON.parse(response);
			for (i=0;i<user.entity_users.length;i++){
				if (user.entity_users[i].entity.moodle_url != null)
				{
					moodle_entity_string = "moodle_entity_" + user.entity_users[i].entity.id;
					moodle_url_string = "moodle_url_" + user.entity_users[i].entity.id;
					moodle_sso_string = "moodle_sso_" + user.entity_users[i].entity.id;
					entity_user_string = "entity_user_" + user.entity_users[i].id;
					Titanium.App.Properties.setString(moodle_entity_string,user.entity_users[i].entity.id);
					Titanium.App.Properties.setString(moodle_url_string,user.entity_users[i].entity.moodle_url);
					Titanium.App.Properties.setString(moodle_sso_string,user.entity_users[i].entity.moodle_sso);
					Titanium.App.Properties.setString(entity_user_string,user.entity_users[i].id);
				}	
			}
			Titanium.App.Properties.setString("logged_in", 'true');
			Titanium.App.Properties.setString("name",user.name);
			Titanium.App.Properties.setString("num_entities",user.entity_users.length);
			Titanium.App.Properties.setString("num_topics",user.topic_users.length);
			Titanium.App.Properties.setString("userid",user.id);
			Titanium.App.Properties.setString("mmat", user.access_token);
			Titanium.App.Properties.setString("photo_url", user.photo_url);
			openWindow("feed");
			
		};
		xhr.send();
		
	});

function doClick(e) {
    alert($.headerLabel.text);
}


function goLogin(e){
	$.activityIndicator.show();
	LoginUser($.email.value.toString(), $.password.value.toString());
	
	$.email.blur();
	$.password.blur();
}

function goFacebookLogin(e){
	if (fb.loggedIn==true)
	{
		openWindow("feed");
	} else{
		fb.authorize();
	}
}

function goSignup(e){
	openWindow("sign_up");
}
function goFeed(e){
	openWindow("feed");
}

function goFeed2(e){
	openWindow("feed2");
}

function LoginUser(email, password){

	var postData = {'email': email, 'password': password};

	xhr = postLogin("",postData);
	xhr.onload = function(){
		var response = this.responseText;
		//alert(response);
		Ti.API.info(response);
		
		var user = JSON.parse(response);
		for (i=0;i<user.entity_users.length;i++){
			if (user.entity_users[i].entity.moodle_url != null)
			{
				moodle_entity_string = "moodle_entity_" + user.entity_users[i].entity.id;
				moodle_url_string = "moodle_url_" + user.entity_users[i].entity.id;
				moodle_sso_string = "moodle_sso_" + user.entity_users[i].entity.id;
				entity_user_string = "entity_user_" + user.entity_users[i].id;
				Titanium.App.Properties.setString(moodle_entity_string,user.entity_users[i].entity.id);
				Titanium.App.Properties.setString(moodle_url_string,user.entity_users[i].entity.moodle_url);
				Titanium.App.Properties.setString(moodle_sso_string,user.entity_users[i].entity.moodle_sso);
				Titanium.App.Properties.setString(entity_user_string,user.entity_users[i].id);
			}	
		}
		Titanium.App.Properties.setString("logged_in", 'true');
		Titanium.App.Properties.setString("name",user.name);
		Titanium.App.Properties.setString("num_entities",user.entity_users.length);
		Titanium.App.Properties.setString("num_topics",user.topic_users.length);
		Titanium.App.Properties.setString("userid",user.id);
		Titanium.App.Properties.setString("mmat", user.access_token);
		Titanium.App.Properties.setString("photo_url", user.photo_url);
		$.activityIndicator.hide();	
		openFeed();
		


	};
	xhr.onerror = function(e){
		alert('Login failed, please check credentials and try again.');
		$.activityIndicator.hide();	
	};
	
	if (Titanium.Platform.osname == "iphone" || Titanium.Platform.osname == "ipad")
	{
		xhr.send(postData);
	} else {
		xhr.send(JSON.stringify(postData));
	}

}


function openFeed(){
	var args = {
		data: "test data",
		value: "other data"
	};
	
	var feed = Alloy.createController("feed", args);
	
	feed.getView().open();
	
}

function openWindow(windowName){
	var args = {
		data: "test data",
		value: "other data"
	};
	
	//$.indexWindow.close();
	//$.indexWindow = null;
	
	

	var view1 = Alloy.createController(windowName, args);
	view1.getView().open();
		
	
	Ti.API.info(windowName);
	
}





//alert("index opened");

$.indexWindow.addEventListener('click', function(e){
	if (e.source.keyb != true)
	{
		$.email.blur();
		$.password.blur();	
	}
});
$.indexWindow.open();




	


