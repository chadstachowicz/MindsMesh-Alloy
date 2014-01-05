var args = arguments[0]||{};
$.feedImg.image = Titanium.App.Properties.getString("photo_url");
var win = $.new_post;
win.addEventListener('open',function(e)
{
     $.postText.focus();
});
function postStatus(){
	if(args.postid == null){
                if($.postText.value.length >= 5)
                {               
                	if(args.topic_id != null)
                                {
                                        var postData = {'topic_id': args.topic_id, 'text': $.postText.value};
                                } else if (args.group_id != null) {                
                                        var postData = {'group_id': args.group_id, 'text': $.postText.value};
                                } else {                                        
                                        var postData = {'text': $.postText.value};
                                }
                                
                                xhr = postPostCreate(Titanium.App.Properties.getString('mmat'),postData);
                        xhr.onload = function(){
                                var response = this.responseText;
                                var test = JSON.parse(response);
                                Titanium.App.fireEvent('reload_feed',{data:'posted'});
                                Alloy.CFG.navwindow.closeWindow(win);

                        };
                        xhr.send(postData);
                                
                        
                } else {
                        alert("A reasonable post should have at least 5 chars.");
                }
          } else {
          	if($.postText.value.length < 1)
                {
                        alert("Your post must be at least 1 character");
                } else {
                var postData = {'text' : $.postText.value};
                xhr = postReplyCreate(Titanium.App.Properties.getString("mmat"),args.postid,postData);
                xhr.onload = function(){
                        var response = this.responseText;
                        var test = JSON.parse(response);
                        Titanium.App.fireEvent('reload_post',{data:'posted'});
                        Alloy.CFG.navwindow.closeWindow(win);

                };
                xhr.send(postData);
                
        }
          }
                        
                
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
		onsendstream: function(e) {$.pb.value = e.progress;},
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
		//var postData = {'file': 'http://s3.amazonaws.com/mindsmesh.com/' + serverFilename};
		
		
		//LAST HERE
		xhr2 = new EduMeshAPI().postEncodeVideo(Titanium.App.Properties.getString('mmat'),serverFilename);
		xhr2.onload = function()
		{
			$.pb.hide();	
			$.pb.visible = false;
		};
		xhr2.send(JSON.stringify(postData));
 		
 	}else{	
 		//just hide progress bar
 		$.pb.hide();	
 		$.pb.visible = false;
 	}
 	
 	alert("upload success");
 	Ti.API.info("AWS upload complete");	
}