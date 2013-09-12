Titanium.Media.showCamera({
	success:function(event) {
		// called when media returned from the camera
		Ti.API.debug('Our type was: '+event.mediaType);
		if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
			$.mainView.image = event.media;

			Ti.API.debug('Our media was: '+event.media);
			
		} else {
			alert("got the wrong type back: "+ event.media);
		}
	},
	cancel:function() {
		// called when user cancels taking a picture
		alert("cancel");
		//$.camera.close();
		//$.camera = null;
	},
	error:function(error) {
		// called when there's an error
		var a = Titanium.UI.createAlertDialog({title:'Camera'});
		if (error.code == Titanium.Media.NO_CAMERA) {
			a.setMessage('Please run this test on device');
		} else {
			a.setMessage('Unexpected error: ' + error.code);
		}
		a.show();
	},
	saveToPhotoGallery:true,
	allowEditing:true,
	mediaTypes:[Ti.Media.MEDIA_TYPE_VIDEO,Ti.Media.MEDIA_TYPE_PHOTO]
});



function goBackToFeed(){

	//$.camera.close();
	//$.camera = null;
		
}
 
 
function backBtnClicked(_event) {
    //alert("back button clicked");
	Ti.API.info("back button clicked");
	goBackToFeed();
}
