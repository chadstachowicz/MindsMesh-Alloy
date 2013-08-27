function doClick(e) {
    alert($.headerLabel.text);
}


function goLogin(e){

	openWindow("loginWindow");
}



function goSideMenu(e){
	openWindow("externalView");
}



function goSideView2(e){
	openWindow("index2");
}



function goFeed(e){

	if(Titanium.App.Properties.hasProperty('mmat')){
		openWindow("index2");
	
	}else{
		openWindow("loginWindow");		
	}
	
}

function goSideView(e){
	openWindow("slideview");
}



function openWindow(windowName){
	var args = {
		data: "test data",
		value: "other data"
	};
	
	$.indexWindow.close();
	$.indexWindow = null;
	
	

	var view1 = Alloy.createController(windowName, args);
	view1.getView().open();
		
	
	Ti.API.info(windowName);
	
}





//alert("index opened");


$.indexWindow.open();




	


