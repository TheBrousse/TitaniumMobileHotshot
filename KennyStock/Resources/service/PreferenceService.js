
exports.saveObjective = function(objective) {
    Ti.App.Properties.setInt('objective', objective);
}

exports.getObjective = function() {
    return Ti.App.Properties.getInt('objective', 1);
}

exports.saveStocks = function(stocks) {
    Ti.API.info('Stocks saved');            
    
    Ti.App.Properties.setList('stocks', stocks);
    // Calculate and store Portfolio Value
    var totalValue = 0.00;
    
    for (var i=0; i < stocks.length; i++) {
        totalValue += stocks[i].price;
    }
    
    Ti.App.Properties.setInt('portfolioValue', totalValue);
}

exports.getStocks = function() {
    Ti.API.info(JSON.stringify(Ti.App.Properties.getList('stocks', [])));
        
    return Ti.App.Properties.getList('stocks', []);
}

exports.getPortfolioValue = function() {
    return Ti.App.Properties.getInt('portfolioValue', 0);
} 
