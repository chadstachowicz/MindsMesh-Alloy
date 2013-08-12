function openWindow(windowName){
	var args = {
		data: "test data",
		value: "other data"
	}
	
	$.externalViewWindow.close();
	$.externalViewWindow = null;
	
	

	var view1 = Alloy.createController(windowName, args);
	view1.getView().open();
		
}
function backBtnClicked(_event) {
    alert("back button clicked");
   // openWindow("index")
    	
    //var args = {
	//	data: "test data",
	//	value: "other data"
	//}
	
	//$.feedWindow.close();
	//$.feedWindow = null;
	
	

	//var nextView = Alloy.createController("index", args);
	//nextView.getView().open();
	
	openWindow("feed");
    
}






function doClick(e) {
    alert($.headerLabel.text);
}

/*
var data = [];


	var source = [{postTitle: "test data",postLink: "other data"},{	postTitle: "test data2",postLink: "other data2"}];

for (var i=0; i<source.length; i++) {    
    var arg = {
        title: source[i].postTitle,
        url: source[i].postLink
    };
    
    var row = Alloy.createController('row', arg).getView();
    data.push(row);
}
*/









var data = [];
data.push(Alloy.createController('row', {title: "fight club",url: "other data1"}).getView());
data.push(Alloy.createController('row', {title: "heat",url: "other data2"}).getView());  
    
$.tableView.setData(data);

