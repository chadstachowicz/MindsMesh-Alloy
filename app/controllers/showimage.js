var args = arguments[0]||{};

//alert(args);

//JSON.parse(args)






$.mainImageLabel.text = args.value;

$.mainImage.image = args.value;


function goBackToPost(){

	$.showimage.close();
	$.showimage = null;
		
}