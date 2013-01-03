
exports.saveObjective = function(objective) {
    Ti.App.Properties.setInt('objective', objective);
}

exports.getObjective = function() {
    return Ti.App.Properties.getInt('objective', 1);
}

exports.saveStocks = function(quotes) {
    Ti.API.info('Stocks saved');            
    
    Ti.App.Properties.setList('stocks', quotes);
}

exports.getStocks = function() {
    Ti.API.info(JSON.stringify(Ti.App.Properties.getList('stocks', [])));
        
    return Ti.App.Properties.getList('stocks', []);
}