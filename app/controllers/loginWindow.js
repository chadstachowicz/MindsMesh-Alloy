


function clickLogin(){
	LoginUser($.email.value.toString(), $.password.value.toString());
	
	$.email.blur();
	$.password.blur();
	
	
	/*
	alert(success.toString());	
	if(success){
		alert("login success");
		$.email.blur();
		$.password.blur();
		
	}else{
		alert($.email.value.toString() + " " + $.password.value.toString());
		alert("login failed");
	}
	
	*/
		//redirectAfterLogin();
		//Ti.API.info("clickLogin");
	//Ti.API.info("login clicked");	
	//var eml = email.value;
	//Titanium.API.info($.email.value.toString());
	//Titanium.API.info($.password.value.toString());	

}




function LoginUser(email, password){

	var postData = {'email': email, 'password': password};

	xhr = postLogin("",postData)
	xhr.onload = function(){
		var response = this.responseText;
		//alert(response);
		
		var user = JSON.parse(response);
		for (i=0;i<user.entity_users.length;i++){
			if (user.entity_users[i].entity.moodle_url != null)
			{
				moodle_entity_string = "moodle_entity_" + user.entity_users[i].entity.id;
				moodle_url_string = "moodle_url_" + user.entity_users[i].entity.id;
				entity_user_string = "entity_user_" + user.entity_users[i].id;
				Titanium.App.Properties.setString(moodle_entity_string,user.entity_users[i].entity.id);
				Titanium.App.Properties.setString(moodle_url_string,user.entity_users[i].entity.moodle_url);
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
		
		
		
		openFeed();
		


	};
	xhr.onerror = function(e){
		alert('Login failed, please check credentials and try again.');
	}
	
	xhr.send(JSON.stringify(postData));
	

}


function openFeed(){
	var args = {
		data: "test data",
		value: "other data"
	}
	

	$.loginWindow.close();
	$.loginWindow = null;
	
	var feed = Alloy.createController("feed", args);
	
	feed.getView().open();
	
}




$.email.value ="james@uncc.edu";
$.password.value = "easy123";

var args = arguments[0]||{};

$.message.text = args.data + " " +args.value;
