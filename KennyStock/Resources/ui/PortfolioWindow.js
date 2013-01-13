var Stock = require('model/Stock');
var ps = require('service/PreferenceService');

function PortfolioWindow() {
		
	//create component instance
	var self = Ti.UI.createWindow({
	   title: 'Settings',
	   backgroundGradient: {
        type: 'linear',
        startPoint: { x: '0%', y: '0%' },
        endPoint: { x: '100%', y: '100%' },
        colors: [ { color: '#752201'}, { color: '#bf6e4e' } ]
       }
	});
		
	self.add(Ti.UI.createLabel({
		left: 10,
		top: 30,
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		text: 'Your money objective ($):',
		font: {
			fontSize: '14sp',
			fontWeight: 'bold'
		}
	}));
	
	var txtObjective = Ti.UI.createTextField({
		right: 15,
		top: 15,
		width: 100,
		height: Ti.UI.SIZE,
		backgroundColor: '#ffffff',
        borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		hintText: 'Amount',
		keyboardType: Ti.UI.KEYBOARD_NUMBER_PAD,
		returnKeyType: Titanium.UI.RETURNKEY_DONE,
		value: ps.getObjective()
	});

	self.add(txtObjective);

	self.add(Ti.UI.createLabel({
		left: 5,
		top: 100,
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		text: 'Symbol:',
		font: {
			fontSize: '14sp',
			fontWeight: 'bold'
		}
	}));
	
	var txtSymbol = Ti.UI.createTextField({
		left: 63,
		top: 85,
		width: 70,
		height: Ti.UI.SIZE,
		backgroundColor: '#ffffff',
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		returnKeyType: Titanium.UI.RETURNKEY_DONE
	});
	
	self.add(txtSymbol);
	
	self.add(Ti.UI.createLabel({
		left: 140,
		top: 100,
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		text: 'Quantity:',
		font: {
			fontSize: '14sp',
			fontWeight: 'bold'
		}
	}));

	var txtQuantity = Ti.UI.createTextField({
		left: 205,
		top: 85,
		width: 75,
		height: Ti.UI.SIZE,
		keyboardType: Ti.UI.KEYBOARD_NUMBER_PAD,
		backgroundColor: '#ffffff',
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		returnKeyType: Titanium.UI.RETURNKEY_DONE
	});
	
	self.add(txtQuantity);
	
	var btnAddStock = Ti.UI.createButton({
		right: 2,
		top: 85,
		title: 'Add'
	});
	
	self.add(btnAddStock);
	
	var stockList = Ti.UI.createTableView({
		left: 0,
		top: 170,
		width: Ti.UI.FILL,
		height: '50%'
	}); 
	
	self.add(stockList);
	
	var btnSave = Ti.UI.createButton({
		bottom: 10,
		width: '80%',
		title: 'Save Settings'
	});

	self.add(btnSave);

	btnAddStock.addEventListener('click', function() {
	    if (txtSymbol.text != '' && txtQuantity.text != '') {
    		var stock = new Stock(txtSymbol.value.toUpperCase(), txtQuantity.value);
    		
    		txtSymbol.value = '';
    		txtQuantity.value = '';
    		
    		addCustomRow(stockList, stock);
		}
	});
	
	btnSave.addEventListener('click', function() {
		var stocks = [];
		
		ps.saveObjective(parseInt(txtObjective.value) || 0);
		
		var section = stockList.data[0];
		
		for (var i = 0; i < section.rowCount; i++) {
			var row = section.rows[i];
			
			stocks.push(row.stock);
		}
		
		ps.saveStocks(stocks);	    
		Ti.App.fireEvent('app:portfolioChanged');
		
		self.close({
           transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT
        });
	});
	
	var stocks = ps.getStocks();
	
	for (var i=0; i < stocks.length; i++) {
		addCustomRow(stockList, stocks[i]);
	}
	
	return self;
}

function addCustomRow(table, stock) {
	var row = Ti.UI.createTableViewRow();
	
	row.add(Ti.UI.createLabel({
		text: stock.symbol,
		left: 5, 
		top: 1,
		font: {
			fontSize: '15sp',
			fontWeight: 'bold'
		}
	}));
	
	row.add(Ti.UI.createLabel({
		text: 'Latest Price: ' + stock.price + '$',
		right: 5, 
		top: 1,
		font: {
			fontSize: '9sp',
		}
	}));
	
	row.add(Ti.UI.createLabel({
		text: 'x' + stock.quantity,
		right: 5, 
		top: 20,
		font: {
			fontSize: '8sp',
			fontStyle: 'italic'
		}
	}));
	
	// Used to keep reference to the ioriginal object
	// Used when saving Portfolio
	row.stock = stock;
	
	table.appendRow(row);
}

module.exports = PortfolioWindow;