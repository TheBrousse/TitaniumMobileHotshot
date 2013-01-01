var Stock = require('model/Stock');

var quotes;

exports.getQuotes = function() {
	return quotes;
}

exports.loadSavedQuotes = function() {
	quotes = Ti.App.Properties.getList('quotes', []);
	
	Ti.API.info(JSON.stringify(quotes));
}


exports.getTotalAmount = function() {
	var totalAmount = 0.0;
	
	return totalAmount;
}

exports.saveQuotes = function() {
    Ti.App.Properties.setList('quotes', quotes);
    
    Ti.API.info('Quotes saved');            
}


exports.fetchValues = function(stock) {
	var url = 'http://dev.markitondemand.com/Api/Quote/json?symbol=' + stock.symbol;
	
	var xhr = Ti.Network.createHTTPClient({
	    onload: function(e) {
			// this function is called when data is returned from the server and available for use
	        // this.responseText holds the raw text return of the message (used for text/JSON)
	        // this.responseXML holds any returned XML (including SOAP)
	        // this.responseData holds any returned binary data
	        Ti.API.debug(this.responseText);
	        
	        var quote = JSON.parse(this.responseText).Data;
	        
	        Ti.API.info(JSON.stringify(quote));
	        
	        stock.price = quote.LastPrice;
	        
	        Ti.API.debug(stock.symbol + ' Fetched');
	    },
	    onerror: function(e) {
			// this function is called when an error occurs, including a timeout
	        Ti.API.error(e.error);
	    },
	    timeout: 5000  /* in milliseconds */
	});
	xhr.open("GET", url);
	xhr.send();  // request is actually sent with this statement
}
