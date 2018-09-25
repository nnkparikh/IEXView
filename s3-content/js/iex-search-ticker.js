iex.search_ticker = (function(){
    var configMap = {
        symbolsUrl: "https://api.iextrading.com/1.0/ref-data/symbols",
        main_html: String()
             + '<div class="main-tool-bar">'
                 + '<div class="search-bar">'
                     + '<i class="material-icons md-24">search</i>'
                     + '<input type="text" class="search-input" placeholder="Search by ticker symbol or company." \
                        pattern="[a-zA-Z0-9]+"/>'
                 + '</div>'
                 + '<div class="active-stocks"></div>'
             + '</div>'
             + '<div class="detailed-info">'
             + '</div>'
    },
    stateMap = {
        container: null,
        symbols: null
    }, 
    elementMap = {}, 
    setElementMap,  getSymbols,
    initModule;

    // Event handlers
    onTickerSearchEvent = function(event){
        console.log(this.value);
    };

    // DOM methods
    getSymbols = function(symbolsUrl){
        console.log("getting symbols from: " + symbolsUrl);
        return "list of symbols..";
    };

    setElementMap = function(){
        var container = stateMap.container;
        elementMap = {
            container: container,
            search_input: container.querySelector('.search-input')
        };
    };

    // Public methods
    initModule = function(container){
        stateMap.container = container;
        stateMap.symbols = getSymbols(configMap.symbolsUrl);
        container.innerHTML = configMap.main_html;
        setElementMap();
        var search_input = elementMap.search_input;
        search_input.addEventListener("input", onTickerSearchEvent);
    };

    return {initModule: initModule};
}());