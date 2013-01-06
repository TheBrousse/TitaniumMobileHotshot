var ps = require('service/PreferenceService');

function FirstView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView();

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
	
	self.add(Ti.UI.createLabel({
		right: 5,
		top: 110,
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		text: ps.getObjective() + '$',
		font: {
			fontSize: '16sp',
		}
	}));
	
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
    	}
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
		var PortfolioWindow = require('ui/SettingsWindow');
		
		new PortfolioWindow().open({
			transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
		});
	});
	
	btnRefresh.addEventListener('click', function(e) {
		var oqs = require('service/OnlineQuotesService');
		
		oqs.fetchValues();
	});
	
	Ti.App.addEventListener('oqs:stockUpdated', function(stock) {
	    ps.updateStock(stock);
	    Ti.API.info('-- ' + stock.symbol + ' has been updated: ' + stock.price);
	    
	    progress.value = ps.getPortfolioValue();
	    
	    if (progress.value >= progress.max) {
	        lblWhatToDo = '!!! SELL !!!';
	    }
	});
	
	progress.setValue(ps.getPortfolioValue());

	return self;
}

module.exports = FirstView;