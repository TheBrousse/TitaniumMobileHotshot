var Stock = require('model/Stock');
var ps = require('service/PreferenceService');

function SettingsView() {
    var quotes = [];
    
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({
		backgroundColor: 'blue',
		width: '100%',
		height: '100%'
	});
	
	self.add(Ti.UI.createLabel({
	    top: 15,
	    width: Ti.UI.SIZE,
	    height: Ti.UI.SIZE,
	    text: 'Your money objective:'
	}));
	
	var txtObjective = Ti.UI.createTextField({
	    left: 10,
        top: 45,
        width: '90%',
        height: Ti.UI.SIZE,
        backgroundColor: '#ffffff',
        hintText: 'Enter Amount',
        keyboardType: Ti.UI.KEYBOARD_NUMBER_PAD
	});

    self.add(txtObjective);

    self.add(Ti.UI.createLabel({
        left: 10,
        top: 75,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        text: 'Symbol'
    }));
    
    var txtSymbol = Ti.UI.createTextField({
        left: 10,
        top: 75,
        width: 30,
        height: Ti.UI.SIZE,
        backgroundColor: '#ffffff'
    });
    
    self.add(txtSymbol);
    
    self.add(Ti.UI.createLabel({
        left: 100,
        top: 75,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        text: 'Quantity'
    }));

    var txtQuantity = Ti.UI.createTextField({
        left: 175,
        top: 75,
        width: 30,
        height: Ti.UI.SIZE,
        keyboardType: Ti.UI.KEYBOARD_NUMBER_PAD,
        backgroundColor: '#ffffff',
    });
    
    self.add(txtQuantity);
    
    var btnAddStock = Ti.UI.createButton({
        left: 200,
        top: 75,
        title: 'Add'
    });
    
    self.add(btnAddStock);
    
   var stockList = Ti.UI.createTableView({
        left: 0,
        top: 120,
        width: Ti.UI.FILL,
        height: '65%',
        data: [{ title: 'item1' }]
    }); 
    
    self.add(stockList);
    
	var btnSave = Ti.UI.createButton({
	    bottom: 10,
	    title: 'Save Settings'
	});

    self.add(btnSave);
	
	btnAddStock.addEventListener('click', function() {
        var stock = new Stock(txtSymbol.value.toUpperCase(), txtQuantity.value);
        
    });
	
	btnSave.addEventListener('click', function() {
	    ps.saveObjective(txtObjective.value);
	    ps.saveQuotes(quotes);	    
	    
	    self.fireEvent('settings:close');
	});
	
	return self;
}

module.exports = SettingsView;