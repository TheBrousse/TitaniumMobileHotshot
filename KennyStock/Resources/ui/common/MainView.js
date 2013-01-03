//FirstView Component Constructor
function FirstView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView();
	
	//label using localization-ready strings from <app dir>/i18n/en/strings.xml
	var label = Ti.UI.createLabel({
		color:'#000000',
		text:String.format(L('welcome'),'Titanium'),
		height: Ti.UI.SIZE,
		width: Ti.UI.SIZE
	});
	self.add(label);
	
	//Add behavior for UI
	label.addEventListener('click', function(e) {
		alert(e.source.text);
	});
	
	var qs = require('service/QuotesService');
	
	qs.loadSavedQuotes();
	
	var count = 0;
	var timer = setInterval(function(){
		qs.fetchValues(qs.getQuotes()[count]);
		Ti.API.info(JSON.stringify(qs.getQuotes()[count]));
	    count++;
	    
	    if (count == qs.getQuotes().length) {
	        clearInterval(timer);
	    }
	    
	}, 10000);
	
	var btn = Ti.UI.createButton({
		backgroundImage:'images/info.png',
		height:19,
		width:19,
		bottom:8,
		right:8
	});
	
	btn.addEventListener('click', function(e) {
		var SettingsWindow = require('ui/SettingsWindow');
		
		new SettingsWindow().open({
			transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
		});
	});
	
	var btnList = Ti.UI.createButton({
		title: 'List Stocks',
		bottom: 17
	});
	
	btnList.addEventListener('click', function(e) {
		Ti.API.info(JSON.stringify(qs.getQuotes()));
	});
	
	self.add(btn);
	
	return self;
}

module.exports = FirstView;
