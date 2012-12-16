var Stock = require('model/Stock');

function QuotesService() {
    var service = {}
    
   /* service.prototype.getQuotes = getQuotes;
    service.prototype.saveQuotes = saveQuotes();
    */
   
    this.getQuotes = function() {
        var quotes = Ti.App.Properties.getList('quotes', []);
        
        return quotes;  
    }
    return service;
}

QuotesService.prototype.getQuotes = function() {
    var quotes = Ti.App.Properties.getList('quotes', []);
    
    return quotes;  
}

QuotesService.prototype.saveQuotes = function() {
    var a = [ 
        new Stock('IBM'),
        new Stock('AAPL'),
        new Stock('GOOG')
    ];
    
    Ti.App.Properties.setList('quotes', a);            
}

module.exports = QuotesService;