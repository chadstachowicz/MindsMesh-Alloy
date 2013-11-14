function finSignup(){
		var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.edu$/; 
		if(reg.test($.email.value) == false) {
		   alert("This is not a valid educational email.");
		} else if ($.password.value != $.confirm_password.value && $.password.value != null && $.password.value != "") {
		   alert("Passwords don't match.");
		}  else if ($.name.value.length < 4) {
		   alert("Please enter your first and last name.");
		} else {
			var postData = {'name': $.name.value, 'email': $.email.value, 'password': $.password.value, 'password_confirmation': $.confirm_password.value};
			xhr = postCreateUser(postData);
			xhr.onload = function(e){
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
					};
					Titanium.App.Properties.setString("logged_in", 'true');
					Titanium.App.Properties.setString("name",user.name);
					Titanium.App.Properties.setString("num_entities",user.entity_users.length);
					Titanium.App.Properties.setString("num_topics",user.topic_users.length);
					Titanium.App.Properties.setString("userid",user.id);
					Titanium.App.Properties.setString("mmat", user.access_token);
					Titanium.App.Properties.setString("photo_url", user.photo_url);
					var navWindow = Ti.UI.createWindow({
						//height:Titanium.Platform.displayCaps.platformHeight,
   						width:Titanium.Platform.displayCaps.platformWidth, // Set the width of the sliding window to avoid cut out from animation
						backgroundColor:"#e2e7ed"
					});
				    var win4 = Titanium.UI.createWindow({  
   						url:'source_both/finish_verification.js',
    					barColor: '#46a546',
   	    				backgroundColor:'#ecfaff',
    			 	});
					win4.open();
			};
			xhr.onerror = function(e){
				var response = this.responseText;
			};
			xhr.send(postData);


		}
	
}

function closeWindow(){
	    
     $.signupWindow.animate({top:'100%',duration:300});
setTimeout(function(){$.signupWindow.close();}
, 300);
	
}

$.signupWindow.addEventListener('open', function(e){
        $.signupWindow.animate({top:0,duration:300});
});

$.signupWindow.addEventListener('click', function(e){
	if (e.source.keyb != true)
	{
		$.name.blur();	
		$.email.blur();
		$.password.blur();	
		$.confirm_password.blur();	
	}
});
