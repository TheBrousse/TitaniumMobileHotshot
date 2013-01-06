var getStocks = function() {
    Ti.API.info(JSON.stringify(Ti.App.Properties.getList('stocks', [])));
        
    return Ti.App.Properties.getList('stocks', []);
};

var saveStocks = function(stocks) {
    Ti.API.info('Stocks saved');            
    
    Ti.App.Properties.setList('stocks', stocks);
    updatePortfolioValue(stocks);
};

exports.saveStocks = saveStocks;
exports.getStocks = getStocks;

exports.saveObjective = function(objective) {
    Ti.App.Properties.setInt('objective', objective);
}

exports.getObjective = function() {
    return Ti.App.Properties.getInt('objective', 1);
}

exports.updateStock = function(stock) {
    var allStocks = getStocks();
    
    // We loop through all stocks in order to find the one to update 
    for (var i=0; i < allStocks.length; i++) {
        if (allStocks[i].symbol === stock.symbol) {
            // We found it!
            allStocks[i] = stock;
        } 
    }
    saveStocks(allStocks);
}

exports.getPortfolioValue = function() {
    return Ti.App.Properties.getInt('portfolioValue', 0);
} 

// Calculate and store Portfolio Value
function updatePortfolioValue(stocks) {
    var totalValue = 0.00;
    
    for (var i=0; i < stocks.length; i++) {
        var s = stocks[i];
        
        totalValue += (s.price * s.quantity);
    }
    
    Ti.App.Properties.setInt('portfolioValue', totalValue);
}
