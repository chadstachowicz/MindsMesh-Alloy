var args = arguments[0]||{};

//alert(args);

//JSON.parse(args)






$.videoPlayer.url = args.value;

$.mainImageLabel.text = args.value;


function goBackToPost(){

	$.showvideo.close();
	$.showvideo = null;
		
}