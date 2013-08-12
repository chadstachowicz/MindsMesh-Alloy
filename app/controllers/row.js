
function rowClicked(e){
	alert("row clicked: " + $.title.text);
}
	





var args = arguments[0] || {};
$.title.text = args.title || '';
$.url.text = args.url || '';



