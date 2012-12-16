//bootstrap and check dependencies
if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');	  	
}

// This is a single context application with mutliple windows in a stack
(function() {
	//determine platform and form factor and render approproate components
	var osname = Ti.Platform.osname,
		version = Ti.Platform.version,
		height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;
	
	var Window;

	// Android uses platform-specific properties to create windows.
	// All other platforms follow a similar UI pattern.
	if (osname === 'android') {
		Window = require('ui/android/ApplicationWindow');
	}
	else {
		Window = require('ui/ApplicationWindow');
	}

	new Window().open();
})();
