


$.pb.hide();
OpenGallery("alert");

/*
var props = Ti.App.Properties.listProperties();

for (var i=0, ilen=props.length; i<ilen; i++){
    var value = Ti.App.Properties.getString(props[i]);
    Ti.API.info(props[i] + ' = ' + value);
}
*/



function OpenGallery(callback){
	Titanium.Media.openPhotoGallery({
		success:function(event) {
			// called when media returned from the camera
			Ti.API.debug('Our type was: '+event.mediaType);
			if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
				//$.mainView.image = event.media;
				Ti.API.info("data from gallery: " + event.media);
				$.postImage.image = event.media;
				$.postImage.visible = true;
				$.btnUpload.visible = true;
				//$.commentLabel.visible = true;
					
				Ti.API.debug('Our media was: '+event.media);
			} else {
				alert("got the wrong type back: " + event.mediaType);
			}
		},
		cancel:function() {
			// called when user cancels taking a picture
			alert("user cancelled");
		},
		error:function(error) {
			// called when there's an error
			alert("Unexpected error: " + error.code);
			/*if (error.code == Titanium.Media.NO_CAMERA) {*/
		},
		
		allowEditing:true,
		mediaTypes:[Ti.Media.MEDIA_TYPE_VIDEO,Ti.Media.MEDIA_TYPE_PHOTO]
	});
	
	
}

function goUploadTester(){
	
		var currentFile = $.postImage.image;
		var post_id = "356";
		var filename = "post.png";
	
	
	
			//get post id for aws
		//var post_id = JSON.parse(this.responseText).id;
		
		//get temp file
		f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,filename);
		
		//if temp file exists, delete and fill with current file data
		if(f.exists() == true){f.deleteFile();}
		f.write(currentFile);
		
		
		Ti.API.info(Ti.App.Properties.getString('production'));
		//var env = 'development';
		//if(Ti.App.Properties.getString('production')=='true')
		//{
			var env = 'production';
		//}
		
		Ti.API.info(env);
		
		
		var serverFilePath = env + '/post_attachments/' + post_id + '/' + filename;
		
		//upload file
		UploadToAWS(serverFilePath,filename);
		
		//delete temp			
		f.deleteFile();
}



// AWS UPLOADS
function UploadToAWS(serverFilename,filename){
//unploads file to AWS
	Ti.API.info("serverFilename: " + serverFilename);
	Ti.API.info("filename: " + filename);
	$.pb.show();
	AWS.config(
	{
		key: 'AKIAIKFVJ3EMAIBXELBQ',
		secret: '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',
		bucket: 'mindsmesh.com',
		GSM:' -0700',
		debug:true,
		http: Titanium.Network.createHTTPClient(),
		s3fileName: serverFilename,
		timeout: (1000 * 60 * 4),
		onsendstream: function(e) {pb.value = e.progress;},
		error: function(e) {alert(e);},
		success: AWSPostSuccess(serverFilename,filename)
	});
	AWS.PUT(filename);
	
	Ti.API.info("AWS upload started");	
	
}


 
 
function AWSPostSuccess(serverFilename,filename){
 	//called after upload to AWS
 	Ti.API.info("extention: " + GetExtention(filename));
 	var ext = "" + GetExtention(filename);

 	if(ext=="mov"){
	 	//encode video
		var postData = {'file': 'http://s3.amazonaws.com/mindsmesh.com/' + serverFilename};
		xhr2 = postEncodeVideo(Titanium.App.Properties.getString('mmat'),postData);
		xhr2.onload = function()
		{
			$.pb.hide();	
		};
		xhr2.send(JSON.stringify(postData));
 		
 	}else{	
 		//just hide progress bar
 		$.pb.hide();	
 	}
 	
 	alert("upload success");
 	Ti.API.info("AWS upload complete");	
}
