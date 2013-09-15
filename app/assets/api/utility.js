function openWindow(windowName){
	var view1 = Alloy.createController(windowName, {});
	view1.getView().open();
		
}

function openWindowWithArguments(windowName, args){
	var view1 = Alloy.createController(windowName, args);
	view1.getView().open();
}




function Tester(){
	this.makeAlert = MakeAlert;
	
	function MakeAlert(){
		alert("hello world");
	}
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

function formatDate(d)
{
	var d = new Date(d);
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

function GetExtention(filename){
 	var filesplit = [];
 	var f = "" + filename;
 	filesplit = f.split("."); 
 	if(filesplit.length==2){
 		return(filesplit[1]);
 	}
 	return("");
 }
 

function GetFilenameFromPath(path){
 	var pathsplit = [];
 	var p = "" + path;
 	pathsplit = p.split("/"); 
 	if(pathsplit.length>0){
 		return(pathsplit[pathsplit.length - 1]);//gets the last item in the list
 	}
 	return("");
 }
 
 function GetCleanFilenameFromPath(path){
 	var pathsplit = [];
 	var p = "" + path;
 	pathsplit = p.split("/"); 
 	if(pathsplit.length>0){
 		return(CleanFilename(pathsplit[pathsplit.length - 1]));//gets the last item in the list
 	}
 	return("");
 }
 
 function CleanFilename(fileAndQueryString){
 	var querstringsplit = [];
 	var f = "" + fileAndQueryString;
 	querstringsplit = f.split("?"); 
 	if(querstringsplit.length>0){
 		return(querstringsplit[0]);//gets the last item in the list
 	}
 	return(f);
 }
 