// SettingsView Component Constructor
function SettingsView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({
		backgroundColor: 'blue'
	});

	var btnClose = Ti.UI.createButton({
	    title: 'Save Settings'
	});
	
	btnClose.addEventListener('click', function() {
	    self.fireEvent('settings:close');
	});
	
	self.add(btnClose);
	
	return self;
}

module.exports = SettingsView;