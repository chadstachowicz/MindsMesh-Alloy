 var fb = require('facebook');
 fb.appid = "391884850858794";
 fb.permissions = ['email'];
 fb.forceDialogAuth = true;

$.win.open();


$.signup.addEventListener('click', function (e) {
	alert('hello');
});
