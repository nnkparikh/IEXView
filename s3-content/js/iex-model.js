iex.model = (function(){
    'using strict';
    var configMap = {
        apiUrl: "https://api.iextrading.com/1.0/",
        symbolsAPIPath: "/ref-data/symbols"
    },
    stateMap = {
        symbols: []
    },
    setTickerSymbols, getTickerSymbols, 
    getCompanyBaseDetails, getCompanyPrice, initModule;

    setTickerSymbols = function(){
        var apiUrl = configMap.apiUrl;
        var symbolsAPIPath = configMap.symbolsAPIPath;
        var symbolsUrl = apiUrl + symbolsAPIPath;

        fetch(symbolsUrl)
        .then(function(e){
            return e.json();
        })
        .then(function(e){
            e.forEach(function(e){
                var item = {
                    ticker: e.symbol, 
                    name: e.name
                };
                stateMap.symbols.push(item);
            });
        });
    };

    // public methods
    getTickerSymbols = function(){
        return stateMap.symbols;
    };

    getCompanyBaseDetails = function(ticker, callback){
        var companyURL = configMap.apiUrl + `stock/${ticker}/company`;
        fetch(companyURL)
        .then(function(e){
            return e.json();
        })
        .then(function(e){
            callback(e);
        });
    };

    getCompanyPrice = function(ticker, callback){
        var priceURL = configMap.apiUrl + `stock/${ticker}/price`;
        fetch(priceURL)
        .then(function(e){
            return e.json();
        })
        .then(function(e){
            callback(e);
        });
    };

    initModule = function(){
        setTickerSymbols();
    };
    
    return {
        initModule: initModule,
        getTickerSymbols: getTickerSymbols,
        getCompanyBaseDetails: getCompanyBaseDetails,
        getCompanyPrice: getCompanyPrice
    }
}());