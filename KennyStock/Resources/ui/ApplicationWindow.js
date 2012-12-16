//Application Window Component Constructor
function ApplicationWindow() {
	//load component dependencies
	var MainView = require('ui/common/MainView');
		
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff'
	});
		
	//construct UI
	var mainView = new MainView();
	self.add(mainView);
	
	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
