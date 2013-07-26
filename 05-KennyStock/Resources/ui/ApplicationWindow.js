var ps = require('service/PreferenceService');

function ApplicationWindow() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createWindow({
		title: 'Kenny Stock',
		backgroundGradient: {
			type: 'linear',
			startPoint: { x: '0%', y: '0%' },
			endPoint: { x: '100%', y: '100%' },
			colors: [ { color: '#002400'}, { color: '#b4ddb4' } ]
		}
	});

	var progress = Ti.UI.createProgressBar({
		top: 55,
		width: '95%',
		height: '10%',
		max: ps.getObjective()
	});
	
	self.add(progress);
	
	self.add(Ti.UI.createLabel({
		left: 5,
		top: 110,
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		text: '0$',
		font: {
				fontSize: '16sp',
		}
	}));
	
	var lblObjective = Ti.UI.createLabel({
		right: 5,
		top: 110,
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		text: ps.getObjective() + '$',
		font: {
			fontSize: '16sp',
		}
	});
	
	self.add(lblObjective);
	
	var lblWhatToDo = Ti.UI.createLabel({
		text: 'HOLD',
		left: 5, 
		top: 200,
		width: '100%',
		height: Ti.UI.SIZE,
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		font: {
			fontSize: '65sp',
			fontWeight: 'bold'
		},
		color: '#ffffff'
	})
	
	self.add(lblWhatToDo);

	var btnPortfolio = Ti.UI.createButton({
		backgroundImage: '/images/edit_folio.png',
		height: 26,
		width: 26,
		bottom: 8,
		left: 8
	});
	
	self.add(btnPortfolio);
	
	var btnRefresh = Ti.UI.createButton({
		backgroundImage: '/images/refresh.png',
		height: 26,
		width: 26,
		bottom: 8,
		right: 8
	});

	self.add(btnRefresh);
	
	btnPortfolio.addEventListener('click', function(e) {
		var PortfolioWindow = require('ui/PortfolioWindow');
		
		new PortfolioWindow().open({
			transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
		});
	});
	
	btnRefresh.addEventListener('click', function(e) {
		lblObjective.text = ps.getObjective() + '$'
		
		var oqs = require('service/OnlineQuotesService');
		
		oqs.fetchValues();
	});
	
	Ti.App.addEventListener('app:portfolioChanged', function() {
		btnRefresh.fireEvent('click');
	});
	
	Ti.App.addEventListener('oqs:stockUpdated', function(stock) {
		ps.updateStock(stock);
		
		progress.value = ps.getPortfolioValue();
		progress.max = ps.getObjective();
		progress.show();
		
		if (progress.value < progress.max) {
			lblWhatToDo.text = 'HOLD';
		} else {
			lblWhatToDo.text = '! SELL !';
		}
	});

	self.addEventListener('open', function() {
		btnRefresh.fireEvent('click');
	});
	
	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;