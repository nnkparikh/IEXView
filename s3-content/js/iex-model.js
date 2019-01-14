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

    getCompanyBaseDetails = async function(ticker){
        var companyURL = configMap.apiUrl + `stock/${ticker}/company`;
        const response = await fetch(companyURL);
        const json = await response.json();
        return json;
    };

    getCompanyPrice = async function(ticker){
        var priceURL = configMap.apiUrl + `stock/${ticker}/price`;
        const response = await fetch(priceURL);
        const json = await response.json();
        return json;
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