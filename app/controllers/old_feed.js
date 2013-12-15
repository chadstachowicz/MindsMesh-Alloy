var args = arguments[0]||{};
var row_data = [];
var offset = 0;
var data = [];
var f;
var currentFile = '';
var win = $.old_feed;
Ti.App.myCurrentWindow = win;
var view2 = Ti.UI.createView(
{
   transparent:'none',
    backgroundColor : "#F7F7F7",
    height: '40dp',
    top: 0,
    zIndex: '44'
});
var penView1 = Titanium.UI.createLabel({
    backgroundColor:"#F7F7F7",
    height: '40dp',
    width: Titanium.Platform.displayCaps.platformWidth * .3333,
    left: 0,
});
var penViewLabel = Titanium.UI.createLabel({
    backgroundColor:"#F7F7F7",
    layout:'horizontal',
});
var photoView1 = Titanium.UI.createLabel({
    backgroundColor:"#F7F7F7",
    width: Titanium.Platform.displayCaps.platformWidth * .3333,
    height: '40dp',
    left: Titanium.Platform.displayCaps.platformWidth * .3333
});
var photoViewLabel = Titanium.UI.createLabel({
    backgroundColor:"#F7F7F7",
    layout:'horizontal',
});
var vidView1 = Titanium.UI.createLabel({
    backgroundColor:"#F7F7F7",
    width: Titanium.Platform.displayCaps.platformWidth * .3333,
    height: '40dp',
    left: Titanium.Platform.displayCaps.platformWidth * .66666
});
var vidViewLabel = Titanium.UI.createLabel({
    backgroundColor:"#F7F7F7",
    layout:'horizontal',
});
var sepView1 = Titanium.UI.createLabel({
    backgroundColor: "d0d0d0",
    height: '24dp',
    width: '1dp',
    left: Titanium.Platform.displayCaps.platformWidth * .3333
});
var sepView2 = Titanium.UI.createLabel({
    backgroundColor: "d0d0d0",
    height: '24dp',
    width: '1dp',
    left: Titanium.Platform.displayCaps.platformWidth * .6666
});
var penLabel = Titanium.UI.createLabel({
    text:'Status',
    backgroundColor:"#F7F7F7",
    font:{fontSize:14},
    color:'#000',
});
var pencilView = Titanium.UI.createImageView({
    image:'/images/pencil-1.png',
    backgroundColor:"#F7F7F7",
    height:'10',
});
 var photLabel = Titanium.UI.createLabel({
    text:'Photo',
    backgroundColor:"#F7F7F7",
    font:{fontSize:14},
    color:'#000',
});
var photView = Titanium.UI.createImageView({
    image:'/images/camera-1.png',
    backgroundColor:"#F7F7F7",
    height:'10',
});

var vidLabel = Titanium.UI.createLabel({
    text:'Video',
    backgroundColor:"#F7F7F7",
    font:{fontSize:14},
    color:'#000',
});
var vidView = Titanium.UI.createImageView({
    image:'/images/video-camera-1.png',
    backgroundColor:"#F7F7F7",
    height:'10',
});
var borderView = Titanium.UI.createView({
    backgroundColor:"#000",
    height:'1',
    bottom: 0
});


penViewLabel.add(pencilView);
penViewLabel.add(penLabel);
penView1.add(penViewLabel);
view2.add(penView1);
photoViewLabel.add(photView);
photoViewLabel.add(photLabel);
photoView1.add(photoViewLabel);
view2.add(photoView1);
vidViewLabel.add(vidView);
vidViewLabel.add(vidLabel);
vidView1.add(vidViewLabel);
view2.add(vidView1);
view2.add(sepView1);
view2.add(sepView2);
view2.add(borderView);
win.add(view2);
function goStatus(){
	var feed = Alloy.createController("new_post", "test").getView();
	if(args.topic_id != null)
     {
          var title = feed.class_number;
     } else if (args.group_id != null) {                
          var title = feed.group_name;
     } else {                                        
          var title = "Status";
     }
	Alloy.CFG.navwindow.openWindow(feed,{animated:false});
};
penView1.addEventListener('click', function(e)
{
     goStatus();
});


photoView1.addEventListener('click', function(e)
{
        Titanium.Media.showCamera(
        {
                success:function(event)
                  {
                          
                          var win_height = 380;
                                   var win_width = Ti.Platform.displayCaps.platformWidth * .85;
                                 var view = Ti.UI.createView(
                            {
                                backgroundColor : '#e2e7ed',
                                borderColor : '#A5A5A5',
                                box: true,
                                borderRadius : 15,
                                top: 50,
                                layout: 'vertical',
                                borderWidth : 2,
                                width : win_width,
                                height : win_height
                                    });
                                    var btnDone = Ti.UI.createButton({title:'Done'});
                                    var ta1 = Titanium.UI.createTextArea({
                                        editable: true,
                                        top:-95,
                                        left:77,
                                        box: true,
                                        height: 95,
                                        value: "Enter a message!",
                                        width: (Titanium.Platform.displayCaps.platformWidth - 130),
                                        color:'#000',
                                        textAlign:'left',
                                        appearance:Titanium.UI.KEYBOARD_APPEARANCE_ALERT,        
                                        suppressReturn:false,
                                        keyboardToolbar: [btnDone]
                                });
                                    btnDone.addEventListener('click', function(e)
                                    {
                                            ta1.blur();
                                    });
                                ta1._hintText = ta1.value;
                                ta1.addEventListener('focus',function(e)
                                {
                                    if(e.source.value == e.source._hintText)
                                    {
                                        e.source.value = "";
                                    }
                                });
                                ta1.addEventListener('blur',function(e)
                                {
                                    if(e.source.value=="")
                                    {
                                        e.source.value = e.source._hintText;
                                    }
                                });
                                var finishButton = Ti.UI.createButton({
                                    title: 'Finish',
                                            toggle:false,
                                    height: 30,
                                    width:200,
                                        box: true,
                                        top: 10
                                });
                                finishButton.addEventListener('click', function(e)
                                {
                                        if (ta1.value == "Enter a message!")
                                        {
                                                ta1.value = "";
                                        }
                                        if(args.topic_id != null)
                                        {
                                                var postData = {'topic_id': args.topic_id, 'text': ta1.value, 'filename': 'post.png', 'content_type': currentFile.mimeType};
                                        } else if (args.group_id != null) {                
                                                var postData = {'group_id': args.group_id, 'text': ta1.value, 'filename': 'post.png', 'content_type': currentFile.mimeType};
                                        } else {                                        
                                                var postData = {'text': ta1.value, 'filename': 'post.png', 'content_type': currentFile.mimeType};
                                        }
                                                        xhr = postPostCreate(Titanium.App.Properties.getString('mmat'),postData);
                                                        var pb = Ti.UI.createProgressBar({
                                                                zIndex:50,
                                                                width:250,
                                                            height:'auto',
                                                                    min:0,
                                                                    max:1,
                                                                    value:0,
                                                                   top: 0,
                                                                    message:'Uploading File',
                                                            color:'#333',
                                                            font:{fontSize:14, fontWeight:'bold'},
                                                                    style:Titanium.UI.iPhone.ProgressBarStyle.PLAIN
                                                            });
                                                        win.add(pb);
                                                        pb.show();
                                                        xhr.onload = function()
                                                        {
                                                                var post_id = JSON.parse(this.responseText).id;
                                                                f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'post.png');
                                                                if(f.exists() == true)
                                                                {
                                                                        f.deleteFile();
                                                                }
                                                                image = currentFile.imageAsResized(currentFile.width / 4, currentFile.height / 4);
                                                                f.write(image);
                                                                var env = 'development';
                                                                 if(Ti.App.Properties.getString('production')=='true')
                                                                 {
                                                                         env = 'production';
                                                                 }
                                                                 var filnam = env + '/post_attachments/' + post_id + '/post.png';

                                                                AWS.config(
                                                                {
                                                                    key: 'AKIAIKFVJ3EMAIBXELBQ',
                                                                    secret: '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',
                                                                    bucket: 'mindsmesh.com',
                                                                           GSM:' -0700',
                                                                    debug:true,
                                                                    http: Titanium.Network.createHTTPClient(),
                                                                    s3fileName: filnam,
                                                                    timeout: (1000 * 60 * 4),
                                                                    onsendstream: function(e) {pb.value = e.progress;},
                                                                           error: function(e) {alert(e)},
                                                                           success: function(e) 
                                                                           {
                                                                                   f.deleteFile();
                                                                                pb.hide();        
                                                                   
                                                                           }
                                                                });
                                                                AWS.PUT('post.png');

                                                        };
                                                        xhr.send(postData);
                                                        shareWhoModal.close();
                                });
                                var labelTitle = Titanium.UI.createLabel({
                                    text:Titanium.App.Properties.getString("name"),
                                    font:{fontSize:16,fontWeight:'bold'},
                                    color:'#000',
                                    box: true,
                                           width:'auto',
                                    textAlign:'center',
                                    top: -37,
                                    left: 55,
                                });
                                var labelTitle2 = Titanium.UI.createLabel({
                                    text:'Add a message and share',
                                    font:{fontSize:12},
                                    color:'#000',
                                    box: true,
                                           width:'auto',
                                    textAlign:'center',
                                    left: 55
                                });
                                var seperatorPhone = Ti.UI.createView({
                                        backgroundColor: "#808080",
                                        width:(Titanium.Platform.displayCaps.platformWidth * .85 ) - 10,
                                        top: 7,
                                        box: true,
                                        height:2,
                                });
                                var pict = Titanium.UI.createImageView({
                                        image: Titanium.App.Properties.getString("photo_url"),
                                        top: 10,
                                        left: 10,
                                        box:true,
                                        height:40,
                                        width:40,
                                });

                                view.add(pict);
                                view.add(labelTitle);
                                view.add(labelTitle2);
                                view.add(seperatorPhone);
                                var picModal = Ti.UI.createWindow({
                                backgroundColor : 'black',
                                barColor: '#15B17A',
                                navTintColor: "#ffffff",
                                    statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
                                       translucent: false,
                                title: 'Picture',
                                orientationModes:[Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT,Ti.UI.PORTRAIT,Ti.UI.UPSIDE_PORTRAIT]
                                });
                                picModal.addEventListener('close', function(e)
                                {
                                        shareWhoModal.show();
                                });
                                currentFile = event.media;
                            var movPict = Titanium.UI.createImageView({
                                        image: currentFile,
                                        top: 5,
                                        left: 5,
                                        box: true,
                                        height: 95,
                                        width: 70,
                                });
                                var imgPic = Titanium.UI.createImageView({
                                        image: currentFile,
                                        box: true
                                });
                                movPict.addEventListener('click', function(e)
                                {
                                        Alloy.CFG.navwindow.openWindow(picModal,{animated:false});
                                        picModal.add(imgPic);
                                        shareWhoModal.hide();
                                });
                                view.add(movPict);
                                view.add(ta1);
                                view.add(finishButton);
                                   shareWhoModal.add(view);
                                   shareWhoModal.open();
                          
 
 
 
 
 
 
                var cameraView = Ti.UI.createImageView({
                    width: 320,
                    height: 480,
                    top: 0,
                    left: 0,
                    image: event.media,
                });
                var imageNew = cameraView.toImage(function(e)
                {
            //Save Image
                    var filename1 = Titanium.Filesystem.applicationDataDirectory + "/NAMEOFTHEPICTURE.png";
                           f = Titanium.Filesystem.getFile(filename1);
                    f.write(e.blob);
                          Titanium.Media.saveToPhotoGallery(f);
                       });
                var thumbCameraView = Ti.UI.createImageView({
                    width: 150,
                            height: 225,
                    top: 0,
                    left: 0,
                    image: event.media,
                });
      //  thumbCameraView.add(thumbOverImage);
      //  win.add(thumbCameraView);
                  },
                  cancel:function()
                  {
                 },
                  error:function(error)
                  {
                    var a = Titanium.UI.createAlertDialog({title:'Camera'});
                    if (error.code == Titanium.Media.NO_CAMERA)
                    {
                              a.setMessage('Sorry this device does not have a camera.');
                            }
                    else
                    {
                              a.setMessage('Error: ' + error.code);
                    }
                    a.show();
                  },
                 // overlay:overImage,
                  showControls:true,
                  mediaTypes:Ti.Media.MEDIA_TYPE_PHOTO,
            saveToPhotoGallery:false,
            allowEditing: true,
            allowImageEditing:true,
        });
});

vidView1.addEventListener('click', function(e)
{
        var record = true;
        if (record == false)
        {
                var activeMovie = Titanium.Media.createVideoPlayer(
                {
                        backgroundColor:'#111',
                        mediaControlStyle:Titanium.Media.VIDEO_CONTROL_DEFAULT,
                        scalingMode:Titanium.Media.VIDEO_SCALING_ASPECT_FILL,
                        //contentURL:movieFile.nativePath
                        media:movieFile                        // note you can use either contentURL to nativePath or the file object
                });
                activeMovie.play();
                activeMovie.addEventListener('complete', function()
                {
                        movieFile.deleteFile();
                        record = true;
                });
                win.add(activeMovie);
        }
        else
        {
                Titanium.Media.showCamera(
                {
                        success:function(event)
                        {
                        var win_height = 380;
                                   var win_width = Ti.Platform.displayCaps.platformWidth * .85;
                                 var view = Ti.UI.createView(
                            {
                                backgroundColor : '#e2e7ed',
                                borderColor : '#A5A5A5',
                                box: true,
                                borderRadius : 15,
                                top: 50,
                                layout: 'vertical',
                                borderWidth : 2,
                                width : win_width,
                                height : win_height
                                    });
                                    var btnDone = Ti.UI.createButton({title:'Done'});
                                    var ta1 = Titanium.UI.createTextArea({
                                        editable: true,
                                        top:-56,
                                        left:77,
                                        box: true,
                                        height: 95,
                                        value: "Enter a message!",
                                        width: (Titanium.Platform.displayCaps.platformWidth - 130),
                                        color:'#000',
                                        textAlign:'left',
                                        appearance:Titanium.UI.KEYBOARD_APPEARANCE_ALERT,        
                                        suppressReturn:false,
                                        keyboardToolbar: [btnDone]
                                });
                                    btnDone.addEventListener('click', function(e)
                                    {
                                            ta1.blur();
                                    });
                                ta1._hintText = ta1.value;
                                ta1.addEventListener('focus',function(e)
                                {
                                    if(e.source.value == e.source._hintText)
                                    {
                                        e.source.value = "";
                                    }
                                });
                                ta1.addEventListener('blur',function(e)
                                {
                                    if(e.source.value=="")
                                    {
                                        e.source.value = e.source._hintText;
                                    }
                                });
                                var finishButton = Ti.UI.createButton({
                                    title: 'Finish',
                                            toggle:false,
                                    height: 30,
                                    width:200,
                                        box: true,
                                        top: 10
                                });
                                finishButton.addEventListener('click', function(e)
                                {
                                        if (ta1.value == "Enter a message!")
                                        {
                                                ta1.value = "";
                                        }

                                        if(args.topic_id != null)
                                        {
                                                var postData = {'topic_id': args.topic_id, 'text': ta1.value, 'filename': 'post.mov', 'content_type': currentFile.mimeType};
                                        } else if (args.group_id != null) {                
                                                var postData = {'group_id': args.group_id, 'text': ta1.value, 'filename': 'post.mov', 'content_type': currentFile.mimeType};
                                        } else {                                        
                                                var postData = {'text': ta1.value, 'filename': 'post.mov', 'content_type': currentFile.mimeType};
                                        }
                                                        xhr = postPostCreate(Titanium.App.Properties.getString('mmat'),postData);
                                                        var pb = Ti.UI.createProgressBar({
                                                                zIndex:50,
                                                                width:250,
                                                            height:'auto',
                                                                    min:0,
                                                                    max:1,
                                                                    value:0,
                                                                   top: 0,
                                                                    message:'Uploading File',
                                                            color:'#333',
                                                            font:{fontSize:14, fontWeight:'bold'},
                                                                    style:Titanium.UI.iPhone.ProgressBarStyle.PLAIN
                                                            });
                                                        win.add(pb);
                                                        pb.show();
                                                        xhr.onload = function()
                                                        {
                                                                var post_id = JSON.parse(this.responseText).id;
                                                                f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'post.mov');
                                                                if(f.exists() == true)
                                                                {
                                                                        f.deleteFile();
                                                                }
                                                                f.write(currentFile);
                                                                var env = 'development';
                                                                 if(Ti.App.Properties.getString('production')=='true')
                                                                 {
                                                                         env = 'production'
                                                                 }
                                                                 var filnam = env + '/post_attachments/' + post_id + '/post.mov';

                                                                AWS.config(
                                                                {
                                                                    key: 'AKIAIKFVJ3EMAIBXELBQ',
                                                                    secret: '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',
                                                                    bucket: 'mindsmesh.com',
                                                                           GSM:' -0700',
                                                                    debug:true,
                                                                    http: Titanium.Network.createHTTPClient(),
                                                                    s3fileName: filnam,
                                                                    timeout: (1000 * 60 * 4),
                                                                    onsendstream: function(e) {pb.value = e.progress;},
                                                                           error: function(e) {alert(e);},
                                                                           success: function(e) 
                                                                           {
                                                                                   f.deleteFile();
                                                                            var postData = {'file': 'http://s3.amazonaws.com/mindsmesh.com/' + filnam};
                                                                                xhr2 = postEncodeVideo(Titanium.App.Properties.getString('mmat'),postData);
                                                                                 xhr2.onload = function()
                                                                                 {
                                                                                        pb.hide();        
                                                                                };
                                                                                xhr2.send(JSON.stringify(postData));
                                                                   
                                                                           }
                                                                });
                                                                AWS.PUT('post.mov');

                                                        };
                                                        xhr.send(postData);
                                                        shareWhoModal.close();
                                });
                                var labelTitle = Titanium.UI.createLabel({
                                    text:Titanium.App.Properties.getString("name"),
                                    font:{fontSize:16,fontWeight:'bold'},
                                    color:'#000',
                                    box: true,
                                           width:'auto',
                                    textAlign:'center',
                                    top: -37,
                                    left: 55,
                                });
                                var labelTitle2 = Titanium.UI.createLabel({
                                    text:'Add a message and share',
                                    font:{fontSize:12},
                                    color:'#000',
                                    box: true,
                                           width:'auto',
                                    textAlign:'center',
                                    left: 55
                                });
                                var seperatorPhone = Ti.UI.createView({
                                        backgroundColor: "#808080",
                                        width:(Titanium.Platform.displayCaps.platformWidth * .85 ) - 10,
                                        top: 7,
                                        box: true,
                                        height:2,
                                });
                                var pict = Titanium.UI.createImageView({
                                        image: Titanium.App.Properties.getString("photo_url"),
                                        top: 10,
                                        left: 10,
                                        box:true,
                                        height:40,
                                        width:40,
                                });

                                view.add(pict);
                                view.add(labelTitle);
                                view.add(labelTitle2);
                                view.add(seperatorPhone);
                                var movieModal = Ti.UI.createWindow({
                                backgroundColor : '#00000000',
                                barColor: '#15B17A',
                                title: 'Video',
                                orientationModes:[Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT,Ti.UI.PORTRAIT,Ti.UI.UPSIDE_PORTRAIT]
                                });
                                movieModal.addEventListener('close', function(e)
                                {
                                        shareWhoModal.show();
                                });
                                var activeMovie = Ti.Media.createVideoPlayer({
                                    backgroundColor: '#000',
                                    fullscreen: true,
                                    scalingMode: Titanium.Media.VIDEO_SCALING_ASPECT_FIT,
                                    mediaControlMode: Titanium.Media.VIDEO_CONTROL_NONE,
                                    media: event.media,
                                    autoplay: false
                                });
                                currentFile = event.media;
                                var thumbImage = activeMovie.thumbnailImageAtTime(0,Ti.Media.VIDEO_TIME_OPTION_NEAREST_KEYFRAME);
                            var movPict = Titanium.UI.createImageView({
                                        image: thumbImage,
                                        top: 5,
                                        left: 5,
                                        box: true,
                                        height: 95,
                                        width: 70,
                                });
                                var playButton = Titanium.UI.createImageView({
                                        image: '/images/LH2-Play-icon-2.png',
                                        top: -70,
                                        left: 25,
                                        height: 32,
                                        zIndex: 1,
                                        box: true,
                                        width: 32,
                                });
                                movPict.addEventListener('click', function(e)
                                {
                                        Alloy.CFG.navwindow.openWindow(movieModal,{animated:false});
                                        movieModal.add(activeMovie);
                                        shareWhoModal.hide();
                                        activeMovie.addEventListener('fullscreen', function(e)
                                        {
                                            if (e.entering == 0) 
                                            {
                                                       Alloy.CFG.navwindow.close(movieModal);
                                            };
                                        });
                                });
                                playButton.addEventListener('click', function(e)
                                {
                                        Alloy.CFG.navwindow.openWindow(movieModal,{animated:false});
                                        movieModal.add(activeMovie);
                                        shareWhoModal.hide();
                                        activeMovie.addEventListener('fullscreen', function(e)
                                        {
                                            if (e.entering == 0) {
                                                    Alloy.CFG.navwindow.close(movieModal);
                                            };
                                        }); 
                                });
                                view.add(movPict);
                                view.add(playButton);
                                view.add(ta1);
                                view.add(finishButton);
                                   shareWhoModal.add(view);
                                   shareWhoModal.open();
                                   record = false;
                        },
                        cancel:function()
                        {

                        },
                        error:function(error)
                        {
                                // create alert
                                var a = Titanium.UI.createAlertDialog({title:'Video'});

                                // set message
                                if (error.code == Titanium.Media.NO_VIDEO)
                                {
                                        a.setMessage('Device does not have video recording capabilities');
                                }
                                else
                                {
                                        a.setMessage('Unexpected error: ' + error.code);
                                }

                                // show alert
                                a.show();
                        },
                        mediaTypes: Titanium.Media.MEDIA_TYPE_VIDEO,
                        videoMaximumDuration:15000,
                        videoQuality:Titanium.Media.QUALITY_MEDIUM,
                });
        }
});


if (args.topic_id != null)
{
        if (args.moodle != null){
var btnBar = Ti.UI.createButtonBar({
    labels:['Moodle'],
});
btnBar.addEventListener('click', function(e) {
  if (e.index == 1 ){
            shareModal.open();
                shareModal.visible = true;
  } else if (e.index == 0) {
          if (Titanium.App.Properties.hasProperty('moodle-token-' + win.entity_id) == false)
          {
                  
                  var win1 = Titanium.UI.createWindow({  
            title:'Moodle Account',
                    url:'moodle_account.js',
                    navGroup: Alloy.CFG.navwindow,
                    class_id: args.topic_id,
                    backgroundColor:'#ecfaff',
                    navTintColor: "#ffffff",
                statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
                   translucent: false,
                    layout:'absolute',
                    barColor: '#15B17A'
           });
           Alloy.CFG.navwindow.openWindow(win1,{animated:false});
          } else {

 
        loadView.add(loadIndicator);
        loadView.open();
        loadIndicator.show();
        if (win.entity_id == 2)
        {
                var postData = {username: Titanium.App.Properties.getString('moodle-user-' + win.entity_id), password: Titanium.App.Properties.getString('moodle-pass-' + win.entity_id)};        
                  xhr = postLoginToMoodle(win.moodle,postData);
                xhr.onload = function(){
                var response = this.responseText;
                var regexSess = /Your\ssession\shas/i;
                var regexSess2 = /your\slogin\ssession/i;
                var regexLog = /Invalid\slogin/i;
                if(response.match(regexSess2)) 
                {
                        xhr = postLoginToMoodle(win.moodle,postData);
                        xhr.onload = function()
                        {
                                var response2 = this.responseText;
                                redirectToMoodle(response2);
                        };
                        xhr.send(postData);
                } else if(response.match(regexLog)) {
                        alert('These are not valid credentials.  Please correct them.');
                } else {
                        redirectToMoodle(response);
                }
        };
        xhr.send(postData);
        } else {
                xhr = getMoodle2EnrolledCourses(Titanium.App.Properties.getString("moodle_url_" + win.entity_id),Titanium.App.Properties.getString("moodle-token-" + win.entity_id),Titanium.App.Properties.getString("moodle-userid-" + win.entity_id));
                xhr.onload = function()
                {
                        var response = this.responseText;
                        var courses = JSON.parse(response);
                        for(c=0;c<courses.length;c++)
                        {
                                if (courses[c].shortname == win.class_number)
                                {
                                        var win1 = Titanium.UI.createWindow({  
                                            url:'moodle_class.js',
                                            navGroup: Alloy.CFG.navwindow,
                                            backgroundColor:'#ecfaff',
                                            navTintColor: "#ffffff",
                                            statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
                                               translucent: false,
                                            barColor: '#15B17A'
                                        });
                                        win1.class_id = courses[c].id;
                                        win1.entity_id = win.entity_id;
                                        Alloy.CFG.navwindow.openWindow(win1,{animated:false});
                                }
                        }
                        loadView.close();
                        //alert("No Moodle Course found for this discussion.  Make sure course Numbers between MindsMesh.com and Moodle match exactly, and that you are a part of the class on your schools Moodle.");
                };
                xhr.send();
                
                
                
        }
        }
  } 
});
win.setRightNavButton(btnBar);
}

          var loadView = Ti.UI.createWindow({
            backgroundColor: 'black',
            opacity: .90,
            height: Ti.Platform.displayCaps.platformHeight,
            width: Ti.Platform.displayCaps.platformWidth
        });
 
        var loadIndicator = Ti.UI.createActivityIndicator({
            style: Ti.UI.iPhone.ActivityIndicatorStyle.BIG,
            message: 'Loading Moodle...',
            font : 'Arial',
            color: '#FFF'
        });
} else {
//        var btnPost = Titanium.UI.createButton({
//        title:'Post',
//});
//btnPost.addEventListener('click', function(e){
//                                shareModal.open();
//                                shareModal.visible = true;
//});
//win.setRightNavButton(btnPost);
}

var shareWhoModal = Ti.UI.createWindow(
{
    backgroundColor : '#B0000000',
    zIndex: 1
});
shareWhoModal.addEventListener('click', function(e)
{
        if(e.source.box != true)
        {
                var dlg = Titanium.UI.createAlertDialog(
                {
                        box: true,
                    message:'If you exit your content will be lost from this post, is that ok?', 
                    buttonNames: ['Yes','Cancel']
                  });
                   dlg.addEventListener('click', function(ev) 
                   {
                           if (ev.index == 0)
                           { 
                                   shareWhoModal.close();
                           } else if (ev.index == 1) { // clicked "No"
                                dlg.hide();
                           }
                 });
                 dlg.show();
         }
});
var shareModal = Ti.UI.createWindow(
{
        backgroundColor : '#B0000000'
});
shareModal.addEventListener('click', function(e)
{
        if(e.source.box != true)
        {
                 shareModal.close();
         }
});
var win_height = 380;
var win_width = Ti.Platform.displayCaps.platformWidth * .85;
var view = Ti.UI.createView(
{
        backgroundColor : '#e2e7ed',
    borderColor : '#A5A5A5',
    box: true,
    borderRadius : 15,
    top: 50,
    layout: 'vertical',
    borderWidth : 2,
    width : win_width,
    height : win_height
});


                


                                    var labelTitle = Titanium.UI.createLabel({
                            text:Titanium.App.Properties.getString("name"),
                            font:{fontSize:16,fontWeight:'bold'},
                            color:'#000',
                            box: true,
                                   width:'auto',
                            textAlign:'center',
                            top: -37,
                            left: 55,
 
                        });
                        var labelTitle2 = Titanium.UI.createLabel({
                            text:'Share something awesome',
                            font:{fontSize:12},
                            color:'#000',
                            box: true,
                                   width:'auto',
                            textAlign:'center',
                            left: 55,
 
                        });
                var seperatorPhone = Ti.UI.createView({
                                backgroundColor: "#808080",
                                width:(Titanium.Platform.displayCaps.platformWidth * .85 ) - 10,
                                top: 7,
                                box: true,
                                height:2,
                        });
                        var pict = Titanium.UI.createImageView({
                                image: Titanium.App.Properties.getString("photo_url"),
                                top: 10,
                                left: 10,
                                box:true,
                                height:40,
                                width:40,
                        });
                         view.add(pict);
                 view.add(labelTitle);
                 view.add(labelTitle2);
                 view.add(seperatorPhone);
                    shareModal.add(view);





var winModal = Ti.UI.createWindow({
        backgroundColor : '#B0000000',
        visible: false
    });
                var win_height = 380;
                   var win_width = Ti.Platform.displayCaps.platformWidth * .85;
 
            var view = Ti.UI.createView({
                backgroundColor : '#e2e7ed',
                borderColor : '#A5A5A5',
                box: true,
                borderRadius : 15,
                top: 50,
                layout: 'vertical',
                borderWidth : 2,
                width : win_width,
                height : win_height
                    });
                    var modalTableView = Titanium.UI.createTableView({
                        backgroundColor:'#e2e7ed',
                        box: true
                });
                
                modalTableView.addEventListener('click', function(e){                        
                        xhr = postNotificationMarkAsRead(Titanium.App.Properties.getString("mmat"),e.source.notification_id);
                        xhr.onload = function(){
                        var response = this.responseText;

                        if(e.source.type == "Post")
                        {
                                var win1 = Titanium.UI.createWindow({  
                            url:'post.js',
                            navGroup: Alloy.CFG.navwindow,
                            navTintColor: "#ffffff",
                                statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
                                   translucent: false,
                                   backgroundColor:"#CDC9C9",
                            barColor: '#15B17A',
                            notModal: winModal
                        });
                        win1.postid = e.source.id;
                        win1.fullname = Titanium.App.Properties.getString("name");
                        win1.photo_url = Titanium.App.Properties.getString("photo_url");
                        winModal.hide();
                        Alloy.CFG.navwindow.openWindow(win1,{animated:false});
                        } else if (e.source.type == "Topic"){
                                Titanium.App.fireEvent('nav-menu-button',{data:true, menu_id:7, topic_id: e.source.id});
                        }
        };
        xhr.send();
                
});


                                    var labelTitle = Titanium.UI.createLabel({
                            text:Titanium.App.Properties.getString("name"),
                            font:{fontSize:16,fontWeight:'bold'},
                            color:'#000',
                            box: true,
                                   width:'auto',
                            textAlign:'center',
                            top: -37,
                            left: 55,
 
                        });
                        var labelTitle2 = Titanium.UI.createLabel({
                            text:'Notifications',
                            font:{fontSize:12},
                            color:'#000',
                            box: true,
                                   width:'auto',
                            textAlign:'center',
                            left: 55,
 
                        });
                var seperatorPhone = Ti.UI.createView({
                                backgroundColor: "#808080",
                                width:(Titanium.Platform.displayCaps.platformWidth * .85 ) - 10,
                                top: 7,
                                box: true,
                                height:2,
                        });
                        var pict = Titanium.UI.createImageView({
                                image: Titanium.App.Properties.getString("photo_url"),
                                top: 10,
                                left: 10,
                                box:true,
                                height:40,
                                width:40,
                        });
                         view.add(pict);
                 view.add(labelTitle);
                 view.add(labelTitle2);
                 view.add(seperatorPhone);
                 view.add(modalTableView);
                    winModal.add(view);
var tableView = Titanium.UI.createTableView({
        backgroundColor:'#CDC9C9',
        separatorColor: 'transparent',
        top: '40dp'
});
var scrollView = Ti.UI.createScrollView({
            contentHeight : 'auto',
            layout : 'vertical',
            showVerticalScrollIndicator: true
            });
//win.addEventListener('touchstart', function(e){
 //    Get starting horizontal position
 ///        alert("test2");
 //   e.source.axis = parseInt(e.x);
//});
//win.addEventListener('touchmove', function(e){
 //    Subtracting current position to starting horizontal position
   // var coordinates = parseInt(e.globalPoint.x) - e.source.axis;
   // alert("test3");
   // //Detecting movement after a 20px shift
  //  if(coordinates > 20 || coordinates < -20){
    //    e.source.moving = true;
  //  }
    // Locks the window so it doesn't move further than allowed
//    if(e.source.moving == true && coordinates <= 260 && coordinates >= 0){
        // This will smooth the animation and make it less jumpy
//                Titanium.App.fireEvent('touch-slide',{cords:coordinates});
//    }
//});

$.menuButton.addEventListener('click', function(e){
        if($.menuButton.toggle == false)
        {
                tableView.scrollable = false;
        } else {
                tableView.scrollable = true;
        }
    Titanium.App.fireEvent('nav-menu-button',{data:e.source.toggle});
});
Titanium.App.addEventListener('nav-menu-button-toggle', function(e)
{
        
        $.menuButton.toggle = e.toggle;
});
Titanium.App.addEventListener('main-win-close', function(e)
{
        winModal.close();
        Alloy.CFG.navwindow.closeWindow(win);
});


function reloadNotifications()
{
modalTableView.data = [];
xhr = getNotificationsGrouped(Titanium.App.Properties.getString("mmat"));
xhr.onload = function(){
        var response = this.responseText;
        user = JSON.parse(response);
        if(user.unread.length > 0){
                var notificationButton = Ti.UI.createButton({
                    backgroundImage:'/images/bell-light.png',
                    height:27,
                    width:27,
                });
                var label = Ti.UI.createLabel({
                    text: user.unread.length,
                    textAlign: "center",
                    height: 'auto',
                    width: 11,
                    font: {
                        fontWeight: "bold",
                        fontSize: 12
                    },
                    backgroundColor: "red",
                    color: "white",
                    borderRadius: 3,
                    top: 0,
                    left: 15
            });
            notificationButton.add(label);
        } else {
                var notificationButton = Ti.UI.createButton({
                    backgroundImage:'/images/bell.png',
                    height:25,
                    width:25,
                });
        }
        win.setTitleControl(notificationButton);
        win.title = "Feed";
                for (var i = 0; i < user.unread.length; ++i) {
                        var classNumber = Titanium.UI.createLabel({
                            text:user.unread[i].actors_count + ' people ' + user.unread[i].action + ' to',
                            box:true,
                            notification_id: user.unread[i].id,
                            id:user.unread[i].target_id,
                            type: user.unread[i].target_type,
                            font:{fontSize:'16dp',fontWeight:'bold'},
                            color:'#000',
                                   width:'auto',
                            textAlign:'left',
                            top: 0,
                            left: 10
 
                        });
                        var classTitle = Titanium.UI.createLabel({
                            text:user.unread[i].text,
                            box:true,
                            notification_id: user.unread[i].id,
                            id:user.unread[i].target_id,
                            type: user.unread[i].target_type,
                            font:{fontSize:'14dp'},
                            color:'#000',
                                   width:(Titanium.Platform.displayCaps.platformWidth * .85 ) - 45,
                            textAlign:'left',
                            left: 10,
                            top: 18
 
                        });
                        var flag = Titanium.UI.createImageView({
                                image: '/images/flag_new_red.png',
                                top: 7,
                                right: 12,
                                notification_id: user.unread[i].id,
                                id:user.unread[i].target_id,
                                type: user.unread[i].target_type,
                                box:true,
                                height:24,
                                width:24,
                        });
                var fbRow = Titanium.UI.createTableViewRow({
                backgroundColor:'#e2e7ed',
                box:true,
                notification_id: user.unread[i].id,
                id:user.unread[i].target_id,
                type: user.unread[i].target_type,
                height: 40
          });
            fbRow.add(classNumber);
            fbRow.add(classTitle);
             fbRow.add(flag);
         modalTableView.appendRow(fbRow);
          }
          for (var i = 0; i < user.read.length; ++i) {
                        var classNumber = Titanium.UI.createLabel({
                            text:user.read[i].actors_count + ' people ' + user.read[i].action + ' to',
                            box:true,
                            notification_id: user.read[i].id,
                            id:user.read[i].target_id,
                            type: user.read[i].target_type,
                            font:{fontSize:'16dp',fontWeight:'bold'},
                            color:'#000',
                                   width:'auto',
                            textAlign:'left',
                            left: 10,
                            top:0
 
                        });
                        var classTitle = Titanium.UI.createLabel({
                            text:user.read[i].text,
                            box:true,
                            notification_id: user.read[i].id,
                            id:user.read[i].target_id,
                            type: user.read[i].target_type,
                            font:{fontSize:'14dp'},
                            color:'#000',
                                   width:(Titanium.Platform.displayCaps.platformWidth * .85 ) - 45,
                            textAlign:'left',
                            left: 10,
                            top: 18
 
                        });
                var fbRow = Titanium.UI.createTableViewRow({
                backgroundColor:'#e2e7ed',
                box:true,
                notification_id: user.read[i].id,
                id:user.read[i].target_id,
                type: user.read[i].target_type,
                height: 40
          });
            fbRow.add(classNumber);
            fbRow.add(classTitle);
         modalTableView.appendRow(fbRow);
          }
                         winModal.addEventListener('click', function(e){
                                 if(e.source.box != true){
                                 winModal.hide();}
                         });
                        notificationButton.addEventListener('click', function(e){
                                if (winModal.visible == true)
                                {
                                        winModal.show();        
                                } else {
                                        winModal.open();
                                }
                                winModal.visible = true;
                        });
                        
                        
//                        
};
xhr.send();
}


//var fontawesome = IconicFont({ fontfamily: "FontAwesome", ligature: false });
//var fontawesomeLabel = Ti.UI.createLabel({ font: { fontFamily: fontawesome.fontfamily() }, text: fontawesome.icon('bell') });


        tableView.addEventListener('click', function(e)
                {
                        if($.menuButton.toggle == true){
                                Titanium.App.fireEvent('nav-menu-button',{data:true});
                                tableView.scrollable = true;
                        } else if (e.source.box == true){

                        } else {
                                var win1 = Titanium.UI.createWindow({  
                            url:'post.js',
                            navGroup: Alloy.CFG.navwindow,
                                  navTintColor: "#ffffff",
                                                        statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
                                                           translucent: false,
                                                           backgroundColor:"#CDC9C9",
                                  barColor: '#15B17A'
                                });
                                win1.postid = e.rowData.result;
                                win1.fullname = e.rowData.fullname;
                                win1.photo_url = e.rowData.photo_url;
                                Alloy.CFG.navwindow.openWindow(win1,{animated:false});
                        }
                
                });
win.add(tableView);
var brainlabel = [];



var lastRow = 0;

var border = Ti.UI.createView({
        backgroundColor:"#000",
        height:1,
        bottom:0
});

var tableHeader = Ti.UI.createView({
        backgroundColor:"#F7F7F7",
        width:320,
        height:60
});

// fake it til ya make it..  create a 2 pixel
// bottom border
tableHeader.add(border);

var arrow = Ti.UI.createView({
        backgroundImage:"/images/whiteArrow.png",
        width:23,
        height:60,
        bottom:10,
        left:20
});
 
var statusLabel = Ti.UI.createLabel({
        text:"Pull to reload",
        left:55,
        width:200,
        bottom:30,
        height:"auto",
        color:"#000",
        textAlign:"center",
        font:{fontSize:13,fontWeight:"bold"},
});
 
var lastUpdatedLabel = Ti.UI.createLabel({
        text:"Last Updated: "+formatDate(),
        left:55,
        width:240,
        bottom:15,
        height:"auto",
        color:"#000",
        textAlign:"center",
        font:{fontSize:12},
});
var actInd = Titanium.UI.createActivityIndicator({
        left:20,
        bottom:13,
        width:30,
        height:30
});
var statusLabel2 = Ti.UI.createLabel({
        text:"Loading...",
        left:55,
        width:200,
        bottom:30,
        height:"auto",
        color:"#000",
        textAlign:"center",
        font:{fontSize:13,fontWeight:"bold"},
        shadowColor:"#999",
        shadowOffset:{x:0,y:1}
});
var actInd2 = Titanium.UI.createActivityIndicator({
        left:20,
        bottom:13,
        width:30,
        height:30
});

tableHeader.add(arrow);
tableHeader.add(statusLabel);
tableHeader.add(lastUpdatedLabel);
tableHeader.add(actInd);

tableView.headerPullView = tableHeader;

var reloading = false;
var updating = false;
var loadingRow = Ti.UI.createTableViewRow({backgroundColor:'#e2e7ed'});
loadingRow.add(statusLabel2);
loadingRow.add(actInd2);
var lastRowId = 1;
var row = '';
var pulling = false;
endReloading();
function formatDate()
{
        var d = new Date;
        var datestr = d.getMonth()+'/'+d.getDate()+'/'+d.getFullYear();
        if (d.getHours()>=12)
        {
           datestr+=' '+(d.getHours()==12 ? 
              d.getHours() : d.getHours()-12)+':'+
              d.getMinutes()+' PM';
        }
        else
        {
                datestr+=' '+d.getHours()+':'+d.getMinutes()+' AM';
        }
        return datestr;
}
function beginReloading()
{
        // just mock out the reload
        setTimeout(endReloading,2000);
}

function endReloading()
{
        row_data = []; tableView.data = row_data;
        lastRow = 0;
        lastRowId = 1;
        if(args.topic_id != null){
                xhr = getTopicPostsWithFamily(Titanium.App.Properties.getString("mmat"),args.topic_id);
        } else if(args.group_id != null){
                xhr = getGroupPostsWithFamily(Titanium.App.Properties.getString("mmat"),args.group_id);
        } else {
                xhr = getPostsWithFamily(Titanium.App.Properties.getString('mmat'));
        }
    xhr.onload = function(){
            onLoad(this.responseText);
            
    };
        xhr.send();

        // when you're done, just reset
        if(Titanium.Platform.name == 'iPhone OS'){
                
        tableView.setContentInsets({top:0},{animated:true});
        
        }
        lastUpdatedLabel.text = "Last Updated: "+formatDate();
        statusLabel.text = "Pull down to refresh...";
        lastDistance = 0;
        actInd.hide();
        arrow.show();
}

win.addEventListener('focus', function() 
{
  if ( Titanium.Network.online) {
          if (win.passedData == 'posted'){
                  reloading = true;
                  row_data = [];
                  tableView.setData([]);
            beginReloading();
   } else {
            reloadNotifications();
   }
   win.passedData = null;
  }else{
    var alertDialog = Titanium.UI.createAlertDialog({
    title: 'Attention',
    message: 'No Internet Connectity!',
    buttonNames: ['OK']
    });
    alertDialog.show(); 
}  
});

var lastDistance = 0;
tableView.addEventListener('scroll',function(e)
{
        var offset = e.contentOffset.y;
        var height = e.size.height;
        var total = offset + height;
        var theEnd = e.contentSize.height;
        var distance = theEnd - total;

        // going down is the only time we dynamically load,
        // going up we can safely ignore -- note here that
        // the values will be negative so we do the opposite
        if (!pulling && !updating && !reloading && (distance < lastDistance) && (row.length>=10))
        {
                // adjust the % of rows scrolled before we decide to start fetching
                var nearEnd = theEnd * .75;

                if (!pulling && !updating && !reloading && (total >= nearEnd))
                {
                        beginUpdate();
                }
        }
        else if (offset < -65.0 && !pulling && !reloading && !updating)
        {
                var t = Ti.UI.create2DMatrix();
                t = t.rotate(-180);
                pulling = true;
                arrow.animate({transform:t,duration:180});
                statusLabel.text = "Release to refresh...";
        }
        else if((offset > -65.0 && offset < 0 ) && pulling && !reloading && !updating)
        {
                pulling = false;
                var t = Ti.UI.create2DMatrix();
                arrow.animate({transform:t,duration:180});
                statusLabel.text = "Pull down to refresh...";
        }    
});

tableView.addEventListener('dragEnd', function()
{        
        if(pulling && !reloading && !updating)
        {
                reloading = true;
                pulling = false;
                arrow.hide();
                actInd.show();
                statusLabel.text = "Reloading...";
                tableView.setContentInsets({top:60},{animated:true});
                tableView.scrollToTop(-60,true);
                arrow.transform=Ti.UI.create2DMatrix();
                beginReloading();
                reloadNotifications();
        }
});
function beginUpdate()
{
        updating = true;
        tableView.appendRow(loadingRow);
        actInd2.show();
        
        // just mock out the reload
        setTimeout(endUpdate,2000);
}

function endUpdate()
{
        actInd2.hide();
        tableView.deleteRow(lastRow,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.NONE});
        if(args.topic_id != null){
                xhr = getTopicPostsWithFamily(Titanium.App.Properties.getString("mmat"),args.topic_id,lastRowId);
        } else if(args.group_id != null){
                xhr = getGroupPostsWithFamily(Titanium.App.Properties.getString("mmat"),args.group_id,lastRowId);
        } else {
                xhr = getPostsWithFamily(Titanium.App.Properties.getString('mmat'),lastRowId);
        }
        xhr.onload = function(){
            onLoad(this.responseText);
    };
        xhr.send();
//         just scroll down a bit to the new rows to bring them into view
//        tableView.scrollToIndex(lastRow-1,{animated:true,position:Ti.UI.iPhone.TableViewScrollPosition.BOTTOM});

}
function likeButton(postid, labelid)
{
        var apiUrl2 = 'https://mindsmesh.com/api/v1/posts/' + postid + '/like?access_token=' + Titanium.App.Properties.getString('mmat');
        var likeres;
        xhr.open('POST', apiUrl2);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onerror = function(e){
                alert('HTTP ERR'+e.error);
        }
        xhr.onload = function(){
                var response = this.responseText;
                likeres = JSON.parse(response);
                brainlabel[labelid].text = likeres.likes_count;
        }
        xhr.send();

}
function timeDifference(current, previous) {
        var prev = new Date(previous);
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - prev;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return 'about ' + Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        return 'about ' + Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        return 'about ' + Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}
Titanium.App.addEventListener('event_one', function(e)
{
    win.passedData = e.data;
});
var commentHolder = [];
var backHolder = [];
var seperatorPhone  = [];
var comment  = [];
var g = 0;


reloadNotifications();


function onLoad(response){
        var d = new Date();
        row = JSON.parse(response);
        if(reloading == true){
                g = 0;
        }
        if (lastRow == 0){
        lastRow = (row.length);} else  {lastRow += row.length;}
       for(c=0;c<row.length;c++){
                       var post = row[c];
                       if (c == (row.length - 1))
                       {
                               lastRowId = post.id;
                       }
            var fullname = post.user.name;
                  var picUrl = post.user.photo_url;
            var fbRow = Titanium.UI.createTableViewRow({
                backgroundColor:'#CDC9C9',
                height:Ti.UI.SIZE,
                result: post.id,
                fullname: fullname,
                photo_url: picUrl,
                selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
                layout:'vertical'

            });
            var rowtext = "";
                        if(post.topic != null){
                                rowtext = fullname + " asked " + post.topic.number;
                        } else if(post.group != null){
                                rowtext = fullname + " posted in " + post.group.name;
                        } else {
                                rowtext = fullname;
                        }
if (Titanium.Platform.osname == "iphone"){
            var fbName = Titanium.UI.createLabel({
                text: rowtext,
                backgroundColor:'#fff',
                                textAlign:'left',
                                left:55,
                                height:'auto',
                                top: -41,
                                color:'#000',
                                font:{fontWeight:'bold',fontSize:13}
                        });
                        var timetext = timeDifference(d,post.created_at);
                        var postTime = Titanium.UI.createLabel({
                text: timetext,
                backgroundColor:'#fff',
                                textAlign:'left',
                left:55,
                top: 5,
                height:'auto',
                color:'#808080',
                font:{fontSize:11}
                });
        comment[g] = Titanium.UI.createLabel({
                text: post.text,
                backgroundColor:'#fff',
                textAlign:'left',
                width: Titanium.Platform.displayCaps.platformWidth - 30,
                top:15,
                height:Ti.UI.SIZE,
                font:{fontSize:12},
                autoLink:Ti.UI.AUTODETECT_ALL
            });
        commentHolder[g] = Ti.UI.createView({
                backgroundColor: '#fff',
                top: 7,
                width:Titanium.Platform.displayCaps.platformWidth - 10,
                height:Ti.UI.SIZE,
                layout:'vertical'
        });
           var commentCount = Titanium.UI.createLabel({
           text: post.replies_count,
           bottom: 10,
           right: 0,
                textAlign:'center',
                font:{fontWeight:'bold',fontSize:11}
            });
            
             var tmpView = Ti.UI.createView({
                         width: 30,
                        height: 30,
                        right: 5
                                 
                         });
            var givbutton = Titanium.UI.createButton({
            result: post.id,
            fullname: fullname,
            photo_url: picUrl,
            width: 16,
                        height: 16,
                        left: 0,
                        backgroundImage: '/images/comment.png',
                        });
                        tmpView.add(givbutton);
            tmpView.add(commentCount);


                        var pict = Titanium.UI.createImageView({
                                image: picUrl,
                                top: 10,
                                left: 10,
                                height:40,
                                width:40,
                        });

                        } else {
                                var fbName = Titanium.UI.createLabel({
                text: rowtext,
                backgroundColor:'#fff',
                textAlign:'left',
                left:80,
                height:'auto',
                top: -55,
                color:'#000',
                font:{fontWeight:'bold',fontSize:20}
                });
                var timetext = timeDifference(d,post.created_at);
                var postTime = Titanium.UI.createLabel({
                text: timetext,
                backgroundColor:'#fff',
                textAlign:'left',
                left:80,
                height:'auto',
                top: 10,
                color:'#808080',
                font:{fontSize:14}
                });
                    var w = Titanium.Platform.displayCaps.platformWidth;
    var h = Titanium.Platform.displayCaps.platformHeight;
    var comWidth = 0;
    if( w > h){
        comWidth = Titanium.Platform.displayCaps.platformHeight;
    }else{
        comWidth = Titanium.Platform.displayCaps.platformWidth;
    }

                comment[g] = Titanium.UI.createLabel({
                text: post.text,
                backgroundColor:'#fff',
                textAlign:'left',
                left:15,
                top:5,
                width:comWidth - 60,
                height:Ti.UI.SIZE,
                autoLink:Ti.UI.AUTODETECT_ALL,
                font:{fontSize:16}
            });

        commentHolder[g] = Ti.UI.createView({
                backgroundColor: '#fff',
                top: 15,
                width:comWidth - 30,
                height:Ti.UI.SIZE,
                layout:'vertical'
        });



        var commentCount = Titanium.UI.createLabel({
           text: post.replies_count,
           bottom: 13,
           right: 0,
                textAlign:'center',
                font:{fontWeight:'bold',fontSize:16}
            });
            
             var tmpView = Ti.UI.createView({
                         width: 52,
                        height: 42,
                        right: 5
                                 
                         });
            var givbutton = Titanium.UI.createButton({
            result: post.id,
            fullname: fullname,
            photo_url: picUrl,
            width:32,
                        height: 32,
                        left: 0,
                        backgroundImage: '/images/comment_32.png',
                        });
                        tmpView.add(givbutton);
            tmpView.add(commentCount);


                        var pict = Titanium.UI.createImageView({
                                image: picUrl,
                                top: 15,
                                left: 15,
                                height:50,
                                width:50,
                        });

                        }
                        commentHolder[g].add(pict);
            commentHolder[g].add(fbName);
            commentHolder[g].add(postTime);
            commentHolder[g].add(comment[g]);
            var commentSpacer = Ti.UI.createView({
                                backgroundColor: '#fff',
                                width:comWidth - 30,
                                height:20,
                        });
                        commentHolder[g].add(commentSpacer);
            if (Titanium.Platform.osname == "iphone"){
            backHolder[g] = Ti.UI.createView({
                                backgroundColor:"#F7F7F7",
                                width:Titanium.Platform.displayCaps.platformWidth - 10,
                                height:'auto',
                                height: 30
                        });
                        if (post.post_attachments.length > 0)
                        {
                                var myRegEx = /\.png$/i;
                                var myRegEx2 = /\.jpg$/i;
                                var myRegEx3 = /\.jpeg$/i;
                        if(post.post_attachments[0].name == "post.mov")
                        {
                                var url = post.post_attachments[0].url;
                                var pieces = url.substring(0, url.length - 8);
                                   var movPict = Titanium.UI.createImageView({
                                        image: (pieces + "frame_0000.png"),
                                        box: true,
                                        height: 280,
                                        url: url,
                                        bottom: 5
                                });
                                var playButton = Titanium.UI.createImageView({
                                        image: '/images/LH2-Play-icon-2.png',
                                        top: -150,
                                        height: 32,
                                        zIndex: 1,
                                        box: true,
                                        url: url,
                                        width: 32,
                                });
                                movPict.addEventListener('click', function(e){
                                        var movieModal2 = Ti.UI.createWindow({
                                 backgroundColor : '#00000000',
                                 navTintColor: "#ffffff",
                                    statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
                                       translucent: false,
                                barColor: '#15B17A',
                                title: 'Video',
                                orientationModes:[Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT,Ti.UI.PORTRAIT,Ti.UI.UPSIDE_PORTRAIT]

                                });
                                var activeMovie = Ti.Media.createVideoPlayer({
                                    backgroundColor: '#000',
                                    scalingMode: Titanium.Media.VIDEO_SCALING_ASPECT_FIT,
                                    mediaControlMode: Titanium.Media.VIDEO_CONTROL_NONE,
                                    url: e.source.url,
                                    autoplay: false
                                });
                                        Alloy.CFG.navwindow.openWindow(movieModal2,{animated:false});
                                        movieModal2.add(activeMovie);
                                        activeMovie.addEventListener('fullscreen', function(e){
                                    
                                                        Alloy.CFG.navwindow.close(movieModal2);
                                    
                                        });
                                });
                                playButton.addEventListener('click', function(e){
                                var movieModal2 = Ti.UI.createWindow({
                                 backgroundColor : '#00000000',
                                barColor: '#15B17A',
                                navTintColor: "#ffffff",
                                    statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
                                       translucent: false,
                                title: 'Video',
                                orientationModes:[Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT,Ti.UI.PORTRAIT,Ti.UI.UPSIDE_PORTRAIT]

                                });
                                                                        var activeMovie = Ti.Media.createVideoPlayer({
                                    backgroundColor: '#000',
                                    scalingMode: Titanium.Media.VIDEO_SCALING_ASPECT_FIT,
                                    mediaControlMode: Titanium.Media.VIDEO_CONTROL_NONE,
                                    url: e.source.url,
                                    autoplay: false
                                });
                                        Alloy.CFG.navwindow.openWindow(movieModal2,{animated:false});
                                        movieModal2.add(activeMovie);
                                        activeMovie.addEventListener('fullscreen', function(e){
                                            
                                                    Alloy.CFG.navwindow.close(movieModal2);
                                            
                                        }); 
                                });
                                commentHolder[g].add(movPict);
                                commentHolder[g].add(playButton);
                        } else if (post.post_attachments[0].name.match(myRegEx) || post.post_attachments[0].name.match(myRegEx2) || post.post_attachments[0].name.match(myRegEx3)) {
                                var url = post.post_attachments[0].url;
                                var imgPic = Titanium.UI.createImageView({
                                        image: post.post_attachments[0].url,
                                        box: true,
                                        height: 'auto',
                                        url: url,
                                        width: 200,
                                        bottom: 20
                                });
                                imgPic.addEventListener('click', function(e){
                                        var picModal2 = Ti.UI.createWindow({
                                backgroundColor : 'black',
                                barColor: '#15B17A',
                                navTintColor: "#ffffff",
                                    statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
                                       translucent: false,
                                title: 'Picture',
                                orientationModes:[Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT,Ti.UI.PORTRAIT,Ti.UI.UPSIDE_PORTRAIT]
                                });
                                var imgPic2 = Titanium.UI.createImageView({
                                        image: e.source.url,
                                });
                                        Alloy.CFG.navwindow.openWindow(picModal2,{animated:false});
                                        picModal2.add(imgPic2);
                                });
                                commentHolder[g].add(imgPic);
                        } else {
                                        var attach = Titanium.UI.createLabel({
                            text: (post.post_attachments.length + ' file(s) attached'),
                                        height: 'auto',
                                        textAlign: 'center',
                                        left: 27,
                                        top: 7,
                                        font:{fontSize:11, color: '#fff'}
                                        });
                                        var paperclip = Titanium.UI.createImageView({
                                        image: '/images/paperclip_black_24.png',
                                        left: 10,
                                        top: 6,
                                        height:16,
                                        width:16,
                                });
                                backHolder[g].add(paperclip);
                    backHolder[g].add(attach);
            }
                        }
                        seperatorPhone[g] = Ti.UI.createView({
                                backgroundColor: "#808080",
                                width:Titanium.Platform.displayCaps.platformWidth - 10,
                                height:1,
                        });
                        } else {
                        backHolder[g] = Ti.UI.createView({
                                backgroundColor:"#E5E4E2",
                                width:comWidth - 30,
                                height:'auto',
                                height: 42
                        });
                        if (post.post_attachments.length > 0)
                        {
                                var myRegEx = /\.png$/i;
                                var myRegEx2 = /\.jpg$/i;
                                var myRegEx3 = /\.jpeg$/i;
                        if(post.post_attachments[0].name == "post.mov")
                        {
                                var url = post.post_attachments[0].url;
                                var pieces = url.substring(0, url.length - 8);
                                   var movPict = Titanium.UI.createImageView({
                                        image: (pieces + "frame_0000.png"),
                                        box: true,
                                        height: 260,
                                        url: post.post_attachments[0].url,
                                        bottom: 5
                                });
                                var playButton = Titanium.UI.createImageView({
                                        image: '/images/LH2-Play-icon-2.png',
                                        top: -170,
                                        height: 32,
                                        url: post.post_attachments[0].url,
                                        zIndex: 1,
                                        box: true,
                                        width: 32,
                                });

                                movPict.addEventListener('click', function(e){
                                var movieModal2 = Ti.UI.createWindow({
                                 backgroundColor : '#00000000',
                                barColor: '#15B17A',
                                title: 'Video',
                                orientationModes:[Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT,Ti.UI.PORTRAIT,Ti.UI.UPSIDE_PORTRAIT]

                                });
                                var activeMovie = Ti.Media.createVideoPlayer({
                                    backgroundColor: '#000',
                                    scalingMode: Titanium.Media.VIDEO_SCALING_ASPECT_FIT,
                                    mediaControlMode: Titanium.Media.VIDEO_CONTROL_NONE,
                                    url: e.source.url,
                                    autoplay: false
                                });
                                        Alloy.CFG.navwindow.openWindow(movieModal2,{animated:false});
                                        movieModal2.add(activeMovie);
                                        activeMovie.addEventListener('fullscreen', function(e){
                                    
                                                        Alloy.CFG.navwindow.close(movieModal2);
                                    
                                        });
                                });
                                playButton.addEventListener('click', function(e){
                                var movieModal2 = Ti.UI.createWindow({
                                 backgroundColor : '#00000000',
                                barColor: '#15B17A',
                                title: 'Video',
                                orientationModes:[Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT,Ti.UI.PORTRAIT,Ti.UI.UPSIDE_PORTRAIT]

                                });
                                var activeMovie = Ti.Media.createVideoPlayer({
                                    backgroundColor: '#000',
                                    scalingMode: Titanium.Media.VIDEO_SCALING_ASPECT_FIT,
                                    mediaControlMode: Titanium.Media.VIDEO_CONTROL_NONE,
                                    url: e.source.url,
                                    autoplay: false
                                });
                                        Alloy.CFG.navwindow.openWindow(movieModal2,{animated:false});
                                        movieModal2.add(activeMovie);
                                        activeMovie.addEventListener('fullscreen', function(e){
                                    
                                                    Alloy.CFG.navwindow.close(movieModal2);
                                            
                                        }); 
                                });
                                commentHolder[g].add(movPict);
                                commentHolder[g].add(playButton);
                        } else if (post.post_attachments[0].name.match(myRegEx) || post.post_attachments[0].name.match(myRegEx2) || post.post_attachments[0].name.match(myRegEx3)) {
                                var url = post.post_attachments[0].url;
                                var imgPic = Titanium.UI.createImageView({
                                        image: post.post_attachments[0].url,
                                        box: true,
                                        height: 'auto',
                                        url: url,
                                        width: 200,
                                        bottom: 20
                                });
                                imgPic.addEventListener('click', function(e){
                                        var picModal2 = Ti.UI.createWindow({
                                backgroundColor : 'black',
                                barColor: '#15B17A',
                                title: 'Picture',
                                orientationModes:[Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT,Ti.UI.PORTRAIT,Ti.UI.UPSIDE_PORTRAIT]
                                });
                                var imgPic2 = Titanium.UI.createImageView({
                                        image: e.source.url,
                                });
                                        Alloy.CFG.navwindow.openWindow(picModal2,{animated:false});
                                        picModal2.add(imgPic2);
                                });
                                commentHolder[g].add(imgPic);
                        } else {
                                        var attach = Titanium.UI.createLabel({
                            text: (post.post_attachments.length + ' file(s) attached'),
                                        height: 'auto',
                                        textAlign: 'center',
                                        left: 50,
                                        top: 10,
                                        font:{fontSize:14, color: '#fff'}
                                        });
                                        var paperclip = Titanium.UI.createImageView({
                                        image: '/images/paperclip4_black.png',
                                        left: 15,
                                        top: 6,
                                        height:32,
                                        width:32,
                                });
                                backHolder[g].add(paperclip);
                    backHolder[g].add(attach);
            }
                        }
                        seperatorPhone[g] = Ti.UI.createView({
                                backgroundColor: "#808080",
                                width:comWidth - 30,
                                height:1,
                        });
                }
            
                        fbRow.add(commentHolder[g]);
            fbRow.add(seperatorPhone[g]);
            backHolder[g].add(tmpView);
            fbRow.add(backHolder[g]);
            row_data[g] = fbRow;
            g++;


           
        }
        tableView.setData(row_data);
        if (updating){
                tableView.scrollToIndex(lastRow-(row.length - 1),{animated:true,position:Ti.UI.iPhone.TableViewScrollPosition.BOTTOM});
        }
        updating = false;
        reloading = false;
   };
   Ti.Gesture.addEventListener('orientationchange',function(e){
        win.width = Titanium.Platform.displayCaps.platformWidth;

   });
   
   
   function redirectToMoodle(response){
        var regex = /TreeNode\('([\w\d\s:-]+)'.+(http.+course\/view\.php\?id=\d+)/ig;
        var totalFound = []
        var totalURL = [];
        while((hits = regex.exec(response)) !== null) {
                var regex2 = /([a-zA-Z]+)-([\d\w]+)/i;
            var found = regex2.exec(hits[1]);
            if( found != null){        
                if ((found[1] + ' ' + found[2]) == win.class_number){
                        totalFound.push(found);
                        totalURL.push(hits[2]);
                }
       }
    }
        loadView.close();
    if (totalFound.length == 0) {
                alert("No Moodle Course found for this discussion.  Make sure course Numbers between MindsMesh.com and Moodle match exactly, and that you are a part of the class on your schools Moodle.");
        } else if ( totalFound.length == 1){
                var win1 = Titanium.UI.createWindow({  
                            url:'moodle_class.js',
                            navGroup: Alloy.CFG.navwindow,
                            navTintColor: "#ffffff",
                            statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
                               translucent: false,
                            backgroundColor:'#ecfaff',
                            barColor: '#15B17A'
                        });
                        win1.Moodurl = totalURL[0];
                        Alloy.CFG.navwindow.openWindow(win1,{animated:false});
        } else {

        }
}; 