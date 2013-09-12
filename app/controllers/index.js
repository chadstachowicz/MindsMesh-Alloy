//$.indexWindow.orientationModes = Titanium.UI.PORTRAIT;






function doClick(e) {
    alert($.headerLabel.text);
}


function goLogin(e){

	openWindow("loginWindow");
}




function goSettings(e){
	openWindow("settings");
}
function goFeed(e){
	openWindow("feed");
}

function goFeed2(e){
	openWindow("feed2");
}

function goCompass(e){
	openWindow("compass");
}



function openWindow(windowName){
	var args = {
		data: "test data",
		value: "other data"
	};
	
	$.indexWindow.close();
	$.indexWindow = null;
	
	//alert(args);

	var view1 = Alloy.createController(windowName, args);
	view1.getView().open();
		
	
	Ti.API.info(windowName);
	
}





//alert("index opened");


$.indexWindow.open();




	


