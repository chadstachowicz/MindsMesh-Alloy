var args = arguments[0]||{};

$.mainImageLabel.text = args.value;
$.mainImage.image = args.value;

function goBackToPost(){

	$.win.close();
	$.win = null;
		
}