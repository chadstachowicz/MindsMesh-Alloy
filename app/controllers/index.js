//$.indexWindow.orientationModes = Titanium.UI.PORTRAIT;

//alert("hello");





function goLogin(e){

	openWindow("loginWindow");
}

function goUploadTester(e){
	openWindow("upload");
}


function goSettings(e){
	openWindow("settings");
}
function goFeed(e){
	openWindow("feed");
}



function openWindow(windowName){
	$.indexWindow.close();
	$.indexWindow = null;

	var view1 = Alloy.createController(windowName, {});
	//view1.orientationModes=[Titanium.UI.PORTRAIT];
	view1.getView().open();
		
	Ti.API.info(windowName);
}

$.indexWindow.open();




	


