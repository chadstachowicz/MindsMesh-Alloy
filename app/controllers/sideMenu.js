
	var navAnimate = Ti.UI.createAnimation({
            left:0,
            duration:75,
            curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });


var menuTitles = [];
var entityTopic = [];
var topicNumber = [];
function reloadMenu(){
	$.menuTableView.data = [];
	xhr = getUserWithChildren(Titanium.App.Properties.getString('mmat'),Titanium.App.Properties.getString('userid'));
	xhr.onload = function(){
	var response = this.responseText;
	user = JSON.parse(response);
    
    //for each item in the data
    classesSection = Alloy.createController('sideMenuSection', "Classes").getView();
    groupsSection = Alloy.createController('sideMenuSection', "Groups").getView();
    for(c=0;c<user.topic_users.length;c++){
	     menuTitles[c] = Alloy.createController('sideMenuRow', user.topic_users[c]).getView();
	     entityTopic[user.topic_users[c].topic.id] = user.topic_users[c].topic.entity_id;
	     topicNumber[user.topic_users[c].topic.id] = user.topic_users[c].topic.number;
	     classesSection.add(menuTitles[c]); 
	}
	for(c=0;c<user.group_users.length;c++){
	     menuTitles[c] = Alloy.createController('sideMenuRow', user.group_users[c]).getView();
	     groupsSection.add(menuTitles[c]); 
	}
	$.menuTableView.data = [$.tableViewMenu, classesSection, groupsSection, $.tableViewSettings];
	
};
	xhr.send();
}
function goFeed(){
	var feed = Alloy.createController("old_feed", "test").getView();
	Alloy.CFG.navwindow.animate(navAnimate);
	Alloy.CFG.navwindow.closeWindow(Ti.App.myCurrentWindow,{animated:false});
	Alloy.CFG.navwindow.openWindow(feed,{animated:false});
};

function goTopic(e){
	var feed = Alloy.createController("old_feed", "test").getView();
	feed.topic_id = $.ClassesRow.topic_id;
	Alloy.CFG.navwindow.animate(navAnimate);
	Alloy.CFG.navwindow.closeWindow(Ti.App.myCurrentWindow,{animated:false});
	Alloy.CFG.navwindow.openWindow(feed,{animated:false});
};
function logout(){
	var dlg = Titanium.UI.createAlertDialog({
                            message:'Are you sure you want to logout', 
                            buttonNames: ['Logout','Cancel']
                          });
                           dlg.addEventListener('click', function(ev) {
                                if (ev.index == 0) {
                                Titanium.App.Properties.setString("logged_in", 'false');
                                fb.logout();
                          	 	openWindow("index");
                          	    $.sideMenu.close();
                                Alloy.CFG.navwindow.close();
                                Titanium.App.fireEvent('main-win-close');
                                    } else if (ev.index == 1) { // clicked "No"
                                        dlg.hide();
                                    }
                          });
                          dlg.show();
}
Titanium.App.addEventListener('reloadMenu', function(e)
{   
	reloadMenu();
});
Titanium.App.addEventListener('goTopic', function(e)
{
	var moodle_url_string = "moodle_url_" + entityTopic[e.topic_id];
	var feed = Alloy.createController("old_feed", {topic_id: e.topic_id, moodle: Titanium.App.Properties.getString(moodle_url_string), entity_id: entityTopic[e.topic_id], class_number: topicNumber[e.topic_id]}).getView();
	var navAnimate = Ti.UI.createAnimation({
            left:0,
            duration:75,
            curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
	Alloy.CFG.navwindow.animate(navAnimate);
	Alloy.CFG.navwindow.closeWindow(Ti.App.myCurrentWindow,{animated:false});
	Alloy.CFG.navwindow.openWindow(feed,{animated:false});
});
Titanium.App.addEventListener('goGroup', function(e)
{
	var feed = Alloy.createController("old_feed", {group_id: e.group_id}).getView();
	var navAnimate = Ti.UI.createAnimation({
            left:0,
            duration:75,
            curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
	Alloy.CFG.navwindow.animate(navAnimate);
	Alloy.CFG.navwindow.closeWindow(Ti.App.myCurrentWindow,{animated:false});
	Alloy.CFG.navwindow.openWindow(feed,{animated:false});
});

Titanium.App.addEventListener('nav-menu-button', function(e)
{
    if(e.data == true){
        navAnimate.addEventListener('complete', function(e){
                
        });
        Alloy.CFG.navwindow.animate(navAnimate);
        Titanium.App.fireEvent('nav-menu-button-toggle',{toggle:false});
    }
    else{
     Alloy.CFG.navwindow.animate({
            left:260,
            duration:75,
            curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
       Titanium.App.fireEvent('nav-menu-button-toggle',{toggle:true});
    }
});
function moodleAccount(){
	var moodle_account = Alloy.createController("moodle_account", "test").getView();
	Alloy.CFG.navwindow.animate(navAnimate);
	Alloy.CFG.navwindow.closeWindow(Ti.App.myCurrentWindow,{animated:false});
	Alloy.CFG.navwindow.openWindow(moodle_account,{animated:false});
}
function pushNotifications(){
	if(Titanium.Platform.osname == 'iphone' || Titanium.Platform.osname == 'ipad'){
        Titanium.Network.registerForPushNotifications({
                                    types: [
                                Titanium.Network.NOTIFICATION_TYPE_BADGE,
                                Titanium.Network.NOTIFICATION_TYPE_ALERT
                                    ],
    success:function(e)
    {
        var deviceToken = e.deviceToken;
        Cloud.Users.login({
            login: 'contact@mindsmesh.com',
            password: 'password'
        }, function (e) {
            if (e.success) {
        Cloud.PushNotifications.subscribe({
                        channel: 'alert',
                        type:'ios',
                        device_token: deviceToken
                        }, function (e) {
                                if (e.success) {
                                        var env = 'development';
                                         if(Ti.App.Properties.getString('production')=='true'){
                                                 env = 'production';
                                         }
                                var postData = {'token': deviceToken,
                                                'model' : escape(Titanium.Platform.model),
                                                'os': escape(Titanium.Platform.osname),
                                                'name': escape(Titanium.Platform.model),
                                                'environment': env};
                                request = postRegisterDevice(Titanium.App.Properties.getString("mmat"),postData);
                                request.onload = function()
                                {
                                        };
                                        request.send(postData);
                                } else {
                                  //      alert('Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
                                }
                        });
            } else {
          //      alert('Error:\\n' +((e.error && e.message) || JSON.stringify(e)));
            }
        });
        Ti.API.info("Push notification device token is: "+deviceToken);
        Ti.API.info("Push notification types: "+Titanium.Network.remoteNotificationTypes);
        Ti.API.info("Push notification enabled: "+Titanium.Network.remoteNotificationsEnabled);
        },
                    error:function(e)
                            {

                            },
                    callback:function(e)
                        {
                            if(isPaused == true)
                            {
                                        xhr = getNotification(Titanium.App.Properties.getString("mmat"),e.data.notification_id);
                                xhr.onload = function(){
                                	var response = this.responseText;
                                    user = JSON.parse(response);
                            		if(user.target_type=="Post")
                        			{
                        				var post = Alloy.createController("post", {postid: user.target_id}).getView();
                            			Alloy.CFG.navwindow.openWindow(post,{animated:false});
                        			} else if(user.target_type=="Topic"){
                                		Titanium.App.fireEvent('goTopic',{topic_id: user.target_id});
                        			} else if(user.target_type=="Group"){
                                		Titanium.App.fireEvent('goGroup',{group_id: user.target_id});
                       				}
                       			};
                       			xhr.send();
                            } else {
                                Ti.App.fireEvent('reloadNotifications');
                            }
                       }                
 
                });
}
}
function openWindow(windowName,args){

	var view1 = Alloy.createController(windowName,args).getView();
	view1.open();
		
	
	Ti.API.info(windowName);
	
}
 $.sideMenu.addEventListener('open', function(e){
 	   reloadMenu();
 	   pushNotifications();
 	   var navw = Alloy.createController("navWindow", "test");
 	   navw.getView().open();
 	   Alloy.CFG.navwindow = navw.navWindow;
       var feed = Alloy.createController("old_feed", "test");
		$.feedImg.image = Titanium.App.Properties.getString("photo_url");
		Alloy.CFG.navwindow.openWindow(feed.getView(),{animated:false});
       });



