function doClick(e) {
    alert($.headerLabel.text);
}


function goLogin(e){
	
	//var args = {
	//	data: "test data",
	//	value: "other data"
	//}
	
	$.indexWindow.close();
	$.indexWindow = null;
	
	


	//var loginWindow = Alloy.createController("loginWindow", args);
	//loginWindow.getView().open();

	openWindow("loginWindow");
}
function goSideMenu(e){
	
	//var args = {
	//	data: "test data",
	//	value: "other data"
	//}
	
	//$.indexWindow.close();
	//$.indexWindow = null;
	
	


	var external = Alloy.createController("externalView", args);
	external.getView().open();

	openWindow("externalView");
}


function goFeed(e){
	
	//var args = {
	//	data: "test data",
	//	value: "other data"
	//}
	
	//$.indexWindow.close();
	//$.indexWindow = null;
	
	

	if(Titanium.App.Properties.hasProperty('mmat')){
		
		//alert("logged as: " + Titanium.App.Properties.getString('mmat'))
		
		//var feed = Alloy.createController("feed", args);
		//feed.getView().open();
		
		openWindow("feed");
	
	}else{
		//var loginWindow = Alloy.createController("loginWindow", args);
		//loginWindow.getView().open();
		
		
		openWindow("loginWindow");		
	}
	
}

function goSideView(e){
	/*
	var args = {
		data: "test data",
		value: "other data"
	}
	
	$.indexWindow.close();
	$.indexWindow = null;
	
	

		var slideview = Alloy.createController("slideview", args);
		slideview.getView().open();
	*/
openWindow("slideview");
	
}



function openWindow(windowName){
	var args = {
		data: "test data",
		value: "other data"
	}
	
	$.indexWindow.close();
	$.indexWindow = null;
	
	

	var view1 = Alloy.createController(windowName, args);
	view1.getView().open();
		
	
	
	
}





alert("index opened");


$.indexWindow.open();




	


