//bootstrap and check dependencies
if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');	  	
}

(function() {
	var ApplicationWindow = require('ApplicationWindow');
	var win = new ApplicationWindow();

	win.open();
})();