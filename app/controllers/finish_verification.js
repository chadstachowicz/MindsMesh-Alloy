var args = arguments[0] || {};
function checkConfirm(){
	$.activityIndicator.show();	
	xhr = getUserWithChildren(Titanium.App.Properties.getString('mmat'),Titanium.App.Properties.getString('userid'));
						xhr.onload = function(){
						var response = this.responseText;
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
						if(user.entity_users.length > 0)
						{
							Titanium.App.Properties.setString("num_entities",user.entity_users.length);
							Titanium.App.fireEvent('goNavigation');
							$.veriWindow.close();
							
						} else {
							alert('You have not confirmed the email we have sent you.  If you would like to resend it to yourself please click the Re-enter Email button.');
						}
						$.activityIndicator.hide();	
						};
						xhr.send();
}
function sendEmail(){
	$.activityIndicator2.show();
	var postData = {'email': Titanium.App.Properties.getString("email")};
			xhr = postEntityJoin(Titanium.App.Properties.getString('mmat'),postData);
			xhr.onload = function(){
				var response = this.responseText;
				$.activityIndicator2.hide();
				alert("A confirmation email has been sent to you, if you do not see it please check your spam folder.");

			};
			xhr.send(JSON.stringify(postData));	
}
function closeWindow(){
	    Titanium.App.Properties.setString("logged_in", 'false');
        fb.logout();
     $.veriWindow.animate({top:'100%',duration:300});
setTimeout(function(){$.veriWindow.close();}
, 300);
	
}

$.veriWindow.addEventListener('open', function(e){
        $.veriWindow.animate({top:0,duration:300});
});
