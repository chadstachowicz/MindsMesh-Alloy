function openWindow(windowName){
	var args = {
		data: "test data",
		value: "other data"
	};
	
	$.externalViewWindow.close();
	$.externalViewWindow = null;
	
	

	var view1 = Alloy.createController(windowName, args);
	view1.getView().open();
		
}
function backBtnClicked(_event) {
	openWindow("feed");
}






function doClick(e) {
    alert($.headerLabel.text);
}


var data = [];
data.push(Alloy.createController('row', {title: "fight club",url: "other data1"}).getView());
data.push(Alloy.createController('row', {title: "heat",url: "other data2"}).getView());  
data.push(Alloy.createController('row', {title: "fight club",url: "other data1"}).getView());
data.push(Alloy.createController('row', {title: "heat",url: "other data2"}).getView());  


    
$.tableView.setData(data);

