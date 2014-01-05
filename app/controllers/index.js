	if (fblisten == 0){
		fblisten = 1;
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
			if (Titanium.App.Properties.getString("num_entities") == 0){
			
			} else {
				goNavigation();
			}
			
		};
		xhr.send();
		
	});
	}

function doClick(e) {
    alert($.headerLabel.text);
}
Titanium.App.addEventListener('goNavigation', function(e)
{
	goNavigation();
});

function goLogin(e){
	$.activityIndicator.show();
	LoginUser($.email.value.toString(), $.password.value.toString());
}

function goFacebookLogin(e){
	if (fb.loggedIn==true)
	{
		openWindow("sideWindow");
	} else{
		fb.authorize();
	}
}

function goSignup(e){
	openWindow("sign_up");
}
function goNavigation(){
//	$.indexWindow.close();
	openWindow("sideMenu");
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
		Titanium.App.Properties.setString("email",email);
		Titanium.App.Properties.setString("num_entities",user.entity_users.length);
		Titanium.App.Properties.setString("num_topics",user.topic_users.length);
		Titanium.App.Properties.setString("userid",user.id);
		Titanium.App.Properties.setString("mmat", user.access_token);
		Titanium.App.Properties.setString("photo_url", user.photo_url);
		$.activityIndicator.hide();
		if (Titanium.App.Properties.getString("num_entities") == 0){
			    openWindow("finish_verification");
			} else {
				goNavigation();
			}
	


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

function openWindow(windowName, args){

	var view1 = Alloy.createController(windowName, args);
	view1.getView().open();
		
	
	Ti.API.info(windowName);
	
}


$.indexWindow.addEventListener('click', function(e){
	if (e.source.keyb != true)
	{
		$.email.blur();
		$.password.blur();	
	}
});
if(Titanium.App.Properties.getString("logged_in") == 'true' && !fb.loggedIn)
{
		if (Titanium.App.Properties.getString("num_entities") == 0){
				$.indexWindow.open();
				openWindow("finish_verification");
			} else {
				goNavigation();
			}
} else if (fb.loggedIn){
	
} else {
		$.indexWindow.open();
}




	


