var args = arguments[0]||{};


$.mainWebView.url = args.value;
$.mainFileLabel.text = args.value;


function goBackToPost(){

	$.showfile.close();
	$.showfile = null;
		
}