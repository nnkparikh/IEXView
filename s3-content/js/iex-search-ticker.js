iex.search_ticker = (function(){
    var configMap = {
        symbolsUrl: "https://api.iextrading.com/1.0/ref-data/symbols",
        main_html: String()
             + '<div class="main-tool-bar">'
                 + '<div class="search-bar">'
                     + '<i class="material-icons md-24">search</i>'
                     + '<div class="search-container">'
                        + '<input type="text" class="search-input" placeholder="Search by ticker symbol or company." \
                            pattern="[a-zA-Z0-9]+"/>'
                        + '<div style="overflow-y: scroll; max-height:400px;" class="search-results">'
                        + '</div>'
                     + '</div>'
                 + '</div>'
                 + '<div class="active-stocks"></div>'
             + '</div>'
             + '<div class="detailed-info">'
             + '</div>'
    },
    stateMap = {
        container: null,
        symbols: []
    }, 
    elementMap = {}, 
    setElementMap,  getSymbols, onTickerSearchEvent,
    initModule;

    // Event handlers
    onTickerSearchEvent = function(event){
        var result_div;
        search_term = this.value;
        symbols = stateMap.symbols;
        removeSearchResults(elementMap.search_results);
        for (var i = 0; i < symbols.length; i++){
            var ticker = symbols[i].ticker;
            var name = symbols[i].name;
            var ticker_substr = ticker.substr(0, search_term.length);
            var name_substr = name.substr(0, search_term.length);
            var name_match = (name_substr.toLowerCase() == search_term.toLowerCase());
            var ticker_match = (ticker_substr.toLowerCase() == search_term.toLowerCase());
            if (name_match || ticker_match){
                var search_results = elementMap.search_results;
                result_div = document.createElement("div");
                result_div.innerHTML = "<b>" + ticker + " - " + name + "</b>";
                search_results.append(result_div);
            }
        }
    };

    // DOM methods
    removeSearchResults = function(element){
        while (element.firstChild){
            element.removeChild(element.firstChild);
        }
    }

    getSymbols = function(symbolsUrl){
        console.log("getting symbols from: " + symbolsUrl);
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

    setElementMap = function(){
        var container = stateMap.container;
        elementMap = {
            container: container,
            search_input: container.querySelector('.search-input'),
            search_results: container.querySelector('.search-results')
        };
    };

    // Public methods
    initModule = function(container){
        stateMap.container = container;
        container.innerHTML = configMap.main_html;
        setElementMap();
        getSymbols(configMap.symbolsUrl);
        var search_input = elementMap.search_input;
        search_input.addEventListener("input", onTickerSearchEvent);
    };

    return {initModule: initModule};
}());