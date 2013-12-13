var menuMoodle = [];
var menuMoodleSSO = [];
var menuEntity = [];
var menuName = [];
var groupName = [];


$.menuTableView.addEventListener('click', function(e)
{
	if (e.source.id == 1){
     Titanium.App.fireEvent('nav-menu-button',{data:true, menu_id:1});
   } else if (e.source.id == 2){
     Titanium.App.fireEvent('nav-menu-button',{data:true, menu_id:2});
   } else if (e.source.id == 4){
     Titanium.App.fireEvent('nav-menu-button',{data:true, menu_id:4});
   } else if (e.source.id == 5){
     Titanium.App.fireEvent('nav-menu-button',{data:true, menu_id:5});
   } else if (e.source.id == 6){
     Titanium.App.fireEvent('nav-menu-button',{data:true, menu_id:6});
   } else if (e.source.id == 7){
     Titanium.App.fireEvent('nav-menu-button',{data:true, menu_id:7, class_id: e.source.extraData});
   } else if (e.source.id == 8){
     Titanium.App.fireEvent('nav-menu-button',{data:true, menu_id:8});
   } else if (e.source.id == 9){
     Titanium.App.fireEvent('nav-menu-button',{data:true, menu_id:9});
   } else if (e.source.id == 10){
     Titanium.App.fireEvent('nav-menu-button',{data:true, menu_id:10});
   }
});
var menuTitles = [];
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
//	Titanium.App.fireEvent('nav-menu-button');
	var navAnimate = Ti.UI.createAnimation({
            left:0,
            duration:75,
            curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
	Alloy.CFG.navwindow.animate(navAnimate);
	Alloy.CFG.navwindow.closeWindow(Ti.App.myCurrentWindow,{animated:false});
	Alloy.CFG.navwindow.openWindow(feed,{animated:false});
};
function goTopic(){
	var feed = Alloy.createController("old_feed", "test").getView();
	feed.topic_id = topic_id;
//	Titanium.App.fireEvent('nav-menu-button');
	var navAnimate = Ti.UI.createAnimation({
            left:0,
            duration:75,
            curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
	Alloy.CFG.navwindow.animate(navAnimate);
	Alloy.CFG.navwindow.closeWindow(Ti.App.myCurrentWindow,{animated:false});
	Alloy.CFG.navwindow.openWindow(feed,{animated:false});
};
function goGroup(){
	var feed = Alloy.createController("old_feed", "test").getView();
//	Titanium.App.fireEvent('nav-menu-button');
	var navAnimate = Ti.UI.createAnimation({
            left:0,
            duration:75,
            curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
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
                          	 //	openWindow("index");
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
Titanium.App.addEventListener('nav-menu-button', function(e)
{
        // If the menu is opened
    var menu_id = e.menu_id;
    var topic_id = e.topic_id;
    var entity_id = e.entity_id;
    var group_id = e.group_id;
    var group_name = groupName[group_id];
    var moodle = menuMoodle[topic_id];
    var moodle_sso = menuMoodleSSO[topic_id];
    var entity_id = menuEntity[entity_id];
    var class_number = menuName[topic_id];
    if(e.data == true){
        var navAnimate = Ti.UI.createAnimation({
            left:0,
            duration:75,
            curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
        navAnimate.addEventListener('complete', function(e){
                 if(menu_id == 1)
                 {
                        
                 } else if(menu_id == 4) {
                         var win4 = Titanium.UI.createWindow({  
                                    title:'Verify Email',
                                           url:'source_both/join_school.js',
                                           translucent: false,
                                    barColor: '#46a546',
                           //         navGroup: navGroup,
                                       backgroundColor:'#ecfaff',
                             });
               //         navGroup.openWindow(win4,{animated:false});
               //                 navGroup.closeWindow(Ti.App.myCurrentWindow,{animated:false});
                        } else if(menu_id == 5) {
                         var win5 = Titanium.UI.createWindow({  
                                    title:'Moodle',
                                           url:'source_both/moodle_account.js',
                                           statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
                                           translucent: false,
                                    barColor: '#46a546',
                                    navTintColor: "#ffffff",
                                    statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
                                       translucent: false,
                     //               navGroup: navGroup,
                                       backgroundColor:"#e2e7ed",
                             });
                    //    navGroup.openWindow(win5,{animated:false});
                    //            navGroup.closeWindow(Ti.App.myCurrentWindow,{animated:false});
                        }  else if(menu_id == 7) {
                                var win7 = Titanium.UI.createWindow({  
                      //      navGroup: navGroup,
                               backgroundColor:'#CDC9C9',
                            url:'source_both/feed.js',
                            navTintColor: "#ffffff",
                            statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
                                   translucent: false,
                            barColor: '#46a546',
                                });
                                win7.topic_id = topic_id;
                                win7.moodle = moodle;
                                win7.moodle_sso = moodle_sso;
                                win7.entity_id = entity_id;
                                win7.class_number = class_number;
                      //          navGroup.openWindow(win7,{animated:false});
                      //          navGroup.closeWindow(Ti.App.myCurrentWindow,{animated:false});
                        } else if(menu_id == 2) {
                                var win7 = Titanium.UI.createWindow({  
                       //     navGroup: navGroup,
                               backgroundColor:'#CDC9C9',
                            url:'source_both/feed.js',
                            navTintColor: "#ffffff",
                            barColor: '#46a546',
                            statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
                                   translucent: false,
                                });
                                win7.group_id = group_id;
                                win7.group_name = group_name;
                        //        navGroup.openWindow(win7,{animated:false});
                       //         navGroup.closeWindow(Ti.App.myCurrentWindow,{animated:false});
                        } else if(menu_id == 8) {
                                var win8 = Titanium.UI.createWindow({  
                                    title:'Search Classes',
                                            url:'source_both/search_topics.js',
                             //               navGroup: navGroup,
                                            backgroundColor:'#ecfaff',
                                            layout:'absolute',
                                            translucent: false,
                                            barColor: '#46a546',
                                            moving:false, // Custom property for movement
                                       axis:0 // Custom property for X axis
                                });
                        //        navGroup.openWindow(win8,{animated:false});
                       //         navGroup.closeWindow(Ti.App.myCurrentWindow,{animated:false});
                        } else if(menu_id == 10) {
                         var win9 = Titanium.UI.createWindow({  
                                    title:'Moodle Account',
                                           url:'source_both/moodle_account.js',
                                    barColor: '#46a546',
                                    navTintColor: "#ffffff",
                                    statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
                                       translucent: false,
                          //          navGroup: navGroup,
                                       backgroundColor:"#e2e7ed",
                                       moving:false, // Custom property for movement
                                       axis:0 // Custom property for X axis
                             });
                     //   navGroup.openWindow(win9,{animated:false});
                     //           navGroup.closeWindow(Ti.App.myCurrentWindow,{animated:false});
                        } 
        });
        Alloy.CFG.navwindow.animate(navAnimate);
        Titanium.App.fireEvent('nav-menu-button-toggle',{toggle:false});
    }
    // If the menu isn't opened
    else{
     Alloy.CFG.navwindow.animate({
            left:260,
            duration:75,
            curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
       Titanium.App.fireEvent('nav-menu-button-toggle',{toggle:true});
    }
});
function openWindow(windowName,args){

	var view1 = Alloy.createController(windowName,args).getView();
	view1.open();
		
	
	Ti.API.info(windowName);
	
}
 $.sideMenu.addEventListener('open', function(e){
 	   reloadMenu();
 	   var navw = Alloy.createController("navWindow", "test");
 	   navw.getView().open();
 	   Alloy.CFG.navwindow = navw.navWindow;
       var feed = Alloy.createController("old_feed", "test");
		$.feedImg.image = Titanium.App.Properties.getString("photo_url");
		Alloy.CFG.navwindow.openWindow(feed.getView(),{animated:false});
       });



