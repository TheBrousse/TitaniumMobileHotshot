//FirstView Component Constructor
function FirstView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView();
	
	//label using localization-ready strings from <app dir>/i18n/en/strings.xml
	var time = Ti.UI.createLabel({
		color:'#000000',
		text: '00:00:00',
		height:'auto',
		width:'auto'
	});
	self.add(time);
	
	var btnStartStop = Ti.UI.createButton({
		title: 'Start'
	});
	var btnNextLap = Ti.UI.createButton({
		title: 'Next Lap'
	});
	var btnReset = Ti.UI.createButton({
		title: 'Reset'
	});

	self.add(btnStartStop);
	self.add(btnNextLap);
	self.add(btnReset);
	
	//Add behavior for UI
	label.addEventListener('click', function(e) {
		alert(e.source.text);
	});
	
	return self;
}

module.exports = FirstView;
