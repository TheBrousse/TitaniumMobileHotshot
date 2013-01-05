//Application Window Component Constructor
function SettingsWindow() {
	//load component dependencies
	var SettingsView = require('ui/common/PortfolioView');
		
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		title: 'Settings'
	});
		
	//construct UI
	var settingsView = new SettingsView();
	self.add(settingsView);
	
	settingsView.addEventListener('settings:close', function() {
	    self.close({
           transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
        });
	});
	
	return self;
}

//make constructor function the public component interface
module.exports = SettingsWindow;