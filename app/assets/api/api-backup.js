var sha = require('sha-aws').load();     //var sha = ; 	// file comes from this URL's project: http://aws.amazon.com/code/Amazon-S3/3236824658053653
var utf = require('UTF8').load(); 		// code for this file from this URL: http://www.webtoolkit.info/javascript-utf8.html
require('date').load();		// file comes from this URL: http://www.mattkruse.com/javascript/date/source.html

function errorHTTPClient(request, mode, url, data, errObj, errMsg)
{   
	Titanium.API.info('*******************');
	Titanium.API.info("in errorHTTPClient");
    //alert("in errorHTTPClient");

	if (request.readyState == 4 && request.retries < 3)
    {   request.open(mode,url);
        request.setRequestHeader("Content-Type","application/json");
        request.send(data);
        
        Titanium.API.info("data: " + JSON.stringify(data));
        request.retries++;
    }
    else
    {   
    	var desc = errObj.error.substring(errObj.error.indexOf("Description=")+12,errObj.error.lastIndexOf("}"));
    	
    	//alert("errorHTTPClient: " + desc);
    	Titanium.API.info('*******************');
    	Titanium.API.info("errorHTTPClient: " + desc);
    	Titanium.API.info("full description: " + JSON.stringify(errObj));
    	Titanium.API.info(errObj);
    }
};

function createHttpClient(mode,url,data,header)
{
	//alert("createHttpClient");
	//alert(data.toString());
	
	
	/*
    if (Ti.Platform.osname == 'android'){

		//android needs stringify
		data = JSON.stringify(data);
		Titanium.API.info('android stringify data');

	}
	*/
	Titanium.API.info('*******************');
	Titanium.API.info("in createHttpClient");

	Titanium.API.info("data: " + JSON.stringify(data));
	
	var xhr = Titanium.Network.createHTTPClient({timeout:3000});
	xhr.retries = 0;
	
	if(header == 'FILE'){
		xhr.setRequestHeader("Content-Type", "multipart/form-data");
	} else if (header != 'NONE'){
		xhr.setRequestHeader("Content-Type", "application/json");
		if(Titanium.Platform.osname == 'android'){
		var androidUserAgent = 'Mozilla/5.0 (Linux; U; ' + Ti.Platform.name + ' ' + Ti.Platform.version + '; ' + Ti.Locale.currentLocale + '; ' + Ti.Platform.model + ' AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1';
		xhr.setRequestHeader('User-Agent', androidUserAgent);}
	}
	xhr.onerror = function(e) 
	{
		errorHTTPClient(xhr, mode, url, data, e, L("Comms Error Message"));
	};
	
	xhr.open(mode,url);

	
	return xhr;
}
function createHttpClientNoError(mode,url,data,header)
{
	var xhr = Titanium.Network.createHTTPClient({timeout:3000});
	xhr.retries = 0;

	if(header == 'FILE'){
		xhr.setRequestHeader("Content-Type", "multipart/form-data");
	} else if (header != 'NONE'){
		xhr.setRequestHeader("Content-Type", "application/json");
		if(Titanium.Platform.osname == 'android'){
			var androidUserAgent = 'Mozilla/5.0 (Linux; U; ' + Ti.Platform.name + ' ' + Ti.Platform.version + '; ' + Ti.Locale.currentLocale + '; ' + Ti.Platform.model + ' AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1';
			xhr.setRequestHeader('User-Agent', androidUserAgent);
		}
	}
	xhr.onerror = function(e) 
	{
		Titanium.API.info('*******************');
    	Titanium.API.info("error in createHttpClientNoError");
	};
	xhr.open(mode,url);	
	
	
	return xhr;
}
function getNotificationsGrouped(accessToken)
{
	url = 'https://www.mindsmesh.com/api/v1/notifications/grouped/with_parents?access_token=' + accessToken;
	xhr = createHttpClient('GET',url);
	return xhr;
}
function postRegisterDevice(accessToken,data)
{
	url = 'https://www.mindsmesh.com/api/v1/home/register_device?access_token=' + accessToken; 
	xhr = createHttpClient('POST',url,data);
	return xhr;
}
function postTopicCreate(accessToken,data)
{
	url = 'https://www.mindsmesh.com/api/v1/topics?access_token=' + accessToken; 
	xhr = createHttpClient('POST',url,data);
	return xhr;
}
function postEntityJoin(accessToken,data)
{//var postData = {'email':ta1.value};
	url = 'https://www.mindsmesh.com/api/v1/home/entities?access_token=' + accessToken; 
	xhr = createHttpClient('POST',url,data);
	return xhr;
}
function postPostCreate(accessToken,data)
{//var postData = {'topic_id': win.topic_id, 'text': ta1.value};
	//var postData = {'group_id': win.group_id, 'text': ta1.value};
	//var postData = {'text': ta1.value};
	url = 'https://www.mindsmesh.com/api/v1/posts?access_token=' + accessToken; 
	xhr = createHttpClient('POST',url,data,'FILE');
	return xhr;
}
function postEncodeVideo(accessToken,data)
{	//var filnam = env + '/post_attachments/' + post_id + '/post.mov';
	//var postData = {'file': 'http://s3.amazonaws.com/mindsmesh.com/' + filnam};
	
	url = 'https://www.mindsmesh.com/api/v1/posts/encode_video?access_token=' + accessToken; 
	xhr = createHttpClient('POST',url,data);
	return xhr;
}

function postReplyCreate(accessToken,postId,data)
{	//var postData = {'reply': {'text' :ta1.value}};
	url = 'https://www.mindsmesh.com/api/v1/posts/' + postId + '/replies?access_token=' + accessToken; 
	xhr = createHttpClient('POST',url,data);
	return xhr;
}
function postTopicJoin(accessToken,topicId)
{
	url = 'https://www.mindsmesh.com/api/v1/topics/' + topicId + '/join.json?access_token=' + accessToken; 
	xhr = createHttpClient('POST',url);
	return xhr;
}
function postTopicSearch(accessToken,data)
{//var postData = {'q': e.data};
	url = 'https://www.mindsmesh.com/api/v1/home/search_topics?access_token=' + accessToken; 
	xhr = createHttpClient('POST',url,data);
	return xhr;
}
function postLogin(FBaccessToken,data)
{//var postData = {'email': email.value, 'password': password.value};
	//alert("postLogin");
	if (FBaccessToken == "")
	{
		url = 'https://www.mindsmesh.com/api/v1/session/login'; 
	} else {
		url = 'https://www.mindsmesh.com/api/v1/session/login?fb_access_token=' + FBaccessToken; 
	}
	xhr = createHttpClient('POST',url,data);
	return xhr;
}
function postCreateUser(data)
{//var postData = {'name': name.value, 'email': email.value, 'password': password.value, 'password_confirmation': passwordconf.value};
	url = 'https://www.mindsmesh.com/api/v1/users/create'; 
	xhr = createHttpClientNoError('POST',url,data);
	return xhr;
}
function postTopicLeave(accessToken,topicId)
{
	url = 'https://www.mindsmesh.com/api/v1/topics/' + topicId + '/leave.json?access_token=' + accessToken; 
	xhr = createHttpClient('POST',url);
	return xhr;
}
function postNotificationMarkAsRead(accessToken,notificationId)
{
	url = 'https://www.mindsmesh.com/api/v1/notifications/' + notificationId + '/mark_as_read?access_token=' + accessToken; 
	xhr = createHttpClient('POST',url);
	return xhr;
}
function getPostsWithFamily(accessToken,before)
{
	if(before)
	{
		url = 'https://www.mindsmesh.com/api/v1/posts/with_family?access_token=' + accessToken + '&before=' + before;
	} else {
		url = 'https://www.mindsmesh.com/api/v1/posts/with_family?access_token=' + accessToken;
	}
	xhr = createHttpClient('GET',url);
	return xhr;
}
function getPostWithChildren(accessToken,postId)
{
	url = 'https://www.mindsmesh.com/api/v1/posts/' + postId + '/with_family?access_token=' + accessToken;
	xhr = createHttpClient('GET',url);
	return xhr;
}
function getNotification(accessToken,notificationId)
{
	url = 'https://www.mindsmesh.com/api/v1/notifications/' + notificationId + '?access_token=' + accessToken;
	xhr = createHttpClient('GET',url);
	return xhr;
}
function getUserWithChildren(accessToken,userId)
{
	url = 'https://www.mindsmesh.com/api/v1/users/' + userId + '/with_children.json?access_token=' + accessToken;
	xhr = createHttpClient('GET',url);
	return xhr;
}
function getTopicPostsWithFamily(accessToken,topicId,before)
{
	if(before)
	{
		url = 'https://www.mindsmesh.com/api/v1/topics/' + topicId + '/posts/with_family?access_token=' + accessToken + '&before=' + before;
	} else {
		url = 'https://www.mindsmesh.com/api/v1/topics/' + topicId + '/posts/with_family?access_token=' + accessToken;
	}
	xhr = createHttpClient('GET',url);
	return xhr;
}
function getGroupPostsWithFamily(accessToken,groupId,before)
{
	if(before)
	{
		url = 'https://www.mindsmesh.com/api/v1/groups/' + groupId + '/posts/with_family?access_token=' + accessToken + '&before=' + before;
	} else {
		url = 'https://www.mindsmesh.com/api/v1/groups/' + groupId + '/posts/with_family?access_token=' + accessToken;
	}
	xhr = createHttpClient('GET',url);
	return xhr;
}
function postLoginToMoodle(url,data)
{//var postData = {username: Titanium.App.Properties.getString('moodle-user-' + win.entity_id), password: Titanium.App.Properties.getString('moodle-pass-' + win.entity_id)};	
	xhr = createHttpClient('POST',url,data,'NONE');
	return xhr;
}
function getLoginToMoodle2(baseurl,username,password)
{
	url = baseurl + '/login/token.php?username=' + username + '&password=' + password + '&service=moodle_mobile_app';
	xhr = createHttpClient('GET',url);
	return xhr;
}
function getMoodle2SiteRetrieve(baseurl,wstoken)
{//wstoken comes from the moodle response user.token
	url = baseurl + '/webservice/rest/server.php?wstoken=' + wstoken + '&wsfunction=moodle_webservice_get_siteinfo&moodlewsrestformat=json';
	xhr = createHttpClient('GET',url);
	return xhr;
}
function getMoodle2CourseContents(baseurl,wstoken,courseid)
{
	url = baseurl + '/webservice/rest/server.php?wstoken=' + wstoken + '&wsfunction=core_course_get_contents&courseid=' + courseid + '&moodlewsrestformat=json';
	xhr = createHttpClient('GET',url);
	return xhr;
}
function getMoodle2EnrolledCourses(baseurl,wstoken,userid)
{
	url = baseurl + '/webservice/rest/server.php?wstoken=' + wstoken + '&wsfunction=moodle_enrol_get_users_courses&userid=' + userid + '&moodlewsrestformat=json';
	xhr = createHttpClient('GET',url);
	return xhr;
}
function postMethodToMoodleRooms(url,data)
{
	xhr = createHttpClient('POST',url,"",'NONE');
	return xhr;
	
}
function getDataFromMoodle(url)
{
	xhr = createHttpClient('GET',url,"",'NONE');
	return xhr;
}

