exports.fetchValues = function(stockList) {
    for (var i=0; i < stockList.length; i++) {
        var s = stockList[i];
        // Update the Latest Stock Prce
        getLastPrice(s);
    }
}

function getLastPrice(stock) {
    var url = 'http://dev.markitondemand.com/Api/Quote/json?symbol=' + stock.symbol;
    
    var xhr = Ti.Network.createHTTPClient({
        onload: function(e) {
            // this function is called when data is returned from the server and available for use
            Ti.API.debug(this.responseText);
            
            var quote = JSON.parse(this.responseText).Data;
            stock.price = quote.LastPrice;
Ti.App.fireEvent('app:stockUpdated');
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
