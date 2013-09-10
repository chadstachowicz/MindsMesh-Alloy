
var hasCompass = Titanium.Geolocation.hasCompass;






if (Titanium.Geolocation.hasCompass)
{
   Titanium.Geolocation.showCalibration = false;
   Titanium.Geolocation.headingFilter = 90;
   Ti.Geolocation.getCurrentHeading(DoHeadingUpdate);
   Titanium.Geolocation.addEventListener('heading',DoHeadingUpdate);
}
else
{
    Titanium.API.info("No Compass on device");
}
    
 
function AdustedHeading(heading){
	var angle = 0; 
	
	if(heading<180){
		
		angle = -(Math.round(heading));
	}else{
		
		angle = Math.round(360 - heading);
	}
	
	return(angle);
} 
 
 
function DoHeadingUpdate(e){
	if (e.error)
    {
        Titanium.API.info("error: " + e.error);
       	return;
    }
 
    var x = e.heading.x;
    var y = e.heading.y;
    var z = e.heading.z;
    var magneticHeading = e.heading.magneticHeading;
    var accuracy = e.heading.accuracy;
    var trueHeading = e.heading.trueHeading;
    var timestamp = e.heading.timestamp;
 
 
    var adjustedAngle = AdustedHeading(trueHeading); 
 
    Titanium.API.info('geo - heading updated: ' + Math.round(trueHeading) + "," + adjustedAngle);
    
        
    $.headingTextField.value = Math.round(trueHeading) + "," +adjustedAngle;
    $.image.transform = Ti.UI.create2DMatrix({rotate:adjustedAngle});
	
	
}
 