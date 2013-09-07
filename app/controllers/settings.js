


function goExternalView(e){
	openWindow("externalView");
}

function goTableView(e){
	openWindow("feedTableview");
}

function goFeed(e){
	if(Titanium.App.Properties.hasProperty('mmat')){
		openWindow("settings");
	
	}else{
		openWindow("loginWindow");		
	}
	
}

function goSideView(e){
	openWindow("slideview");
}







var leftData = [];


function createSection() {
	var section = Ti.UI.createTableViewSection();

	var customView = Ti.UI.createView({
		height : 'auto',
		backgroundColor : "#EEE",
		backgroundGradient : {
			type : "linear",
			startPoint : {
				x : "0%",
				y : "0%"
			},
			endPoint : {
				x : "0%",
				y : "100%"
			},
			colors : [{
				color : "#EEE",
				offset : 0.0
			}, {
				color : "#CCC",
				offset : 1.0
			}]
		}
	});

	var customLabel = Ti.UI.createLabel({
		top : 8,
		bottom : 8,
		left : 10,
		right : 10,
		height : 'auto',
		text : 'Settings',
		font : {
			fontSize : 12,
			fontWeight : 'bold'
		},
		color : '#666666'
	});

	customView.add(customLabel);

	section.headerView = customView;
	
	section.add(Alloy.createController('menurow', {title : 'index',customView : 'index',image : "images/ic_search.png"}).getView());
	
	/*
	if (Ti.Platform.osname === 'iphone'){
		section.add(Alloy.createController('menurow', {title : 'feed tableview(ios)',customView : 'feedTableview',image : "images/ic_search.png"}).getView());
	}else{
		
		section.add(Alloy.createController('menurow', {title : 'feed listview(and)',customView : 'feed',image : "images/ic_search.png"}).getView());
		
	}
	*/
		section.add(Alloy.createController('menurow', {title : 'feed ',customView : 'feed',image : "images/ic_search.png"}).getView());
	

	//section.add(Alloy.createController('menurow', {title : 'feed2 listview (click)',customView : 'feed2',image : "images/ic_search.png"}).getView());

	
		//section.add(Alloy.createController('menurow', {title : 'external view',customView : 'externalView',image : "images/ic_search.png"}).getView());
	//section.add(Alloy.createController('menurow', {title : 'slideview',customView : 'slideview',image : "images/ic_search.png"}).getView());
	//section.add(Alloy.createController('menurow', {title : 'view2',customView : 'view2',image : "images/ic_search.png"}).getView());
	

	return section;
}

function rowSelect(e) {
	if (currentView.id != e.row.customView) {
		$.ds.contentview.remove(currentView);
		currentView = Alloy.createController(e.row.customView).getView();
		$.ds.contentview.add(currentView);
	}
}


	leftData[0] = createSection();

$.ds.leftTableView.data = leftData;



var currentView = Alloy.createController("feed").getView();



$.ds.contentview.add(currentView);









// Swap views on menu item click
$.ds.leftTableView.addEventListener('click', function selectRow(e) {
	rowSelect(e);
	$.ds.toggleLeftSlider();
});
$.ds.rightTableView.addEventListener('click', function selectRow(e) {
	rowSelect(e);
	$.ds.toggleRightSlider();
});

// Set row title highlight colour (left table view)
var storedRowTitle = null;
$.ds.leftTableView.addEventListener('touchstart', function(e) {
	//storedRowTitle = e.row.customTitle;
	//storedRowTitle.color = "#FFF";
});
$.ds.leftTableView.addEventListener('touchend', function(e) {
	//storedRowTitle.color = "#666";
});
$.ds.leftTableView.addEventListener('scroll', function(e) {
	//if (storedRowTitle != null)
		//storedRowTitle.color = "#666";
});

Ti.App.addEventListener("sliderToggled", function(e) {
	if (e.direction == "right") {
		$.ds.leftMenu.zIndex = 2;
		$.ds.rightMenu.zIndex = 1;
	} else if (e.direction == "left") {
		$.ds.leftMenu.zIndex = 1;
		$.ds.rightMenu.zIndex = 2;
	}
});





if (Ti.Platform.osname === 'iphone')
	$.win.open({
		transition : Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
	});
else
	$.win.open();
	
	

