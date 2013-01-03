var Stock = require('model/Stock');
var ps = require('service/PreferenceService');

function SettingsView() {
    var quotes = [];
    
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({
		backgroundColor: 'blue'
	});
	
	self.add(Ti.UI.createLabel({
	    left: 10,
	    top: 15,
	    width: Ti.UI.SIZE,
	    height: Ti.UI.SIZE,
	    text: 'How much money are you planning to make?'
	}));
	
	var txtObjective = Ti.UI.createTextField({
	    left: 10,
        top: 25,
        width: '90%',
        height: Ti.UI.SIZE,
        hintText: 'Enter Amount',
        keyboardType: Ti.UI.KEYBOARD_NUMBER_PAD
	});

    self.add(Ti.UI.createLabel({
        left: 10,
        top: 35,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        text: 'Symbol'
    }));
    
    var txtSymbol = Ti.UI.createTextField({
        left: 10,
        top: 35,
        width: 30,
        height: Ti.UI.SIZE
    });
    
    self.add(txtSymbol);
    
    self.add(Ti.UI.createLabel({
        left: 100,
        top: 35,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        text: 'Quantity'
    }));

    var txtQuantity = Ti.UI.createTextField({
        left: 145,
        top: 35,
        width: 30,
        height: Ti.UI.SIZE,
        keyboardType: Ti.UI.KEYBOARD_NUMBER_PAD
    });
    
    self.add(txtQuantity);
    
    var btnAddStock = Ti.U.createButton({
        left: 180,
        top: 35
    });
    
	var btnSave = Ti.UI.createButton({
	    botton: 10,
	    title: 'Save Settings'
	});

    var stockList = Ti.UI.createTableView({
        left: 0,
        top: 50,
        width: Ti.UI.FILL,
        height: '50%'
    });	
	
	btnAddStock.addEventListener('click', function() {
        var stock = new Stock(txtSymbol.value.toUpperCase(), txtQuantity.value);
        
    });
	
	
	btnSave.addEventListener('click', function() {
	    ps.saveObjective(txtObjective.value);
	    ps.saveQuotes(quites);	    
	    
	    self.fireEvent('settings:close');
	});
	
	self.add(btnSave);
	
	return self;
}

function

module.exports = SettingsView;