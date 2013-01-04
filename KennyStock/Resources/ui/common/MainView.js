var ps = require('service/PreferenceService');

function FirstView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView();

    var progress = Ti.UI.createProgressBar({
        top: 55,
        width: '95%',
        height: 50,
        max: ps.getObjective()
    });
    
    self.add(progress);
    
    self.add(Ti.UI.createLabel({
       left: 1,
       top: 110,
       width: Ti.UI.SIZE,
       height: Ti.UI.SIZE,
       text: '0$' 
    }));
    
    self.add(Ti.UI.createLabel({
       right: 1,
       top: 110,
       width: Ti.UI.SIZE,
       height: Ti.UI.SIZE,
       text: ps.getObjective() + '$' 
    }));
    			
	var btnSettings = Ti.UI.createButton({
		backgroundImage: 'images/info.png',
		height: 19,
		width: 19,
		bottom: 8,
		right: 8
	});
	
	self.add(btnSettings);
	
	var btnRefresh = Ti.UI.createButton({
        backgroundImage: 'images/info.png',
        height: 19,
        width: 19,
        bottom: 8,
        left: 8
    });

    self.add(btnRefresh)    
	
	btnSettings.addEventListener('click', function(e) {
		var SettingsWindow = require('ui/SettingsWindow');
		
		new SettingsWindow().open({
			transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
		});
	});
	
	btnList.addEventListener('click', function(e) {
		Ti.API.info(JSON.stringify(qs.getQuotes()));
	});
	
	progress.setValue(30);

	return self;
}

module.exports = FirstView;
