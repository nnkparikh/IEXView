iex.search_ticker = (function(){
    'using strict';
    var configMap = {
        tickersearch_event: new CustomEvent('tickersearch'),
        main_html: String()
            + '<div class="search-bar">'
                 + '<i class="material-icons md-24">search</i>'
                 + '<div class="search-container">'
                    + '<input type="text" class="search-input" placeholder="Search by ticker symbol or company." \
                        pattern="[a-zA-Z0-9]+"/>'
                    + '<div class="search-results">'
                    + '</div>'
                 + '</div>'
             + '</div>'
             + '<div class="account">'
             +      '<i class="material-icons md-24">account_circle</i>'
             + '</div>'
    },
    stateMap = {
        container: null,
        symbols: []
    },
    elementMap = {}, 
    setElementMap,  getSymbols, 
    onTickerSearchEvent, onTickerSearchResultClick,
    initModule;

    configMap.tickersearch_event.data = {
        ticker: ""
    }
    
    // Event handlers
    onTickerSearchResultClick = function(event){
        var ticker = this.getAttribute("ticker");
        var ticker_e = configMap.tickersearch_event;
        ticker_e.data.ticker = ticker;
        document.dispatchEvent(ticker_e);
    };

    onTickerSearchEvent = function(event){
        var result_div;
        search_term = this.value;
        symbols = stateMap.symbols;
        removeSearchResults(elementMap.search_results);
        if (search_term == "") return;
        for (var i = 0; i < symbols.length; i++){
            var ticker = symbols[i].ticker;
            var name = symbols[i].name;
            var ticker_substr = ticker.substr(0, search_term.length);
            var name_substr = name.substr(0, search_term.length);
            var name_match = (name_substr.toLowerCase() == search_term.toLowerCase());
            var ticker_match = (ticker_substr.toLowerCase() == search_term.toLowerCase());
            if ((name_match || ticker_match) && name.length <= 50){
                var search_results = elementMap.search_results;
                result_div = document.createElement("div");
                result_div.classList.add("search-result-item");
                result_div.setAttribute("ticker",ticker);
                result_div.innerHTML = "<b>" + ticker + " - " + name + "</b>";
                result_div.addEventListener("click", onTickerSearchResultClick);
                search_results.appendChild(result_div);
            }
        }
    };

    // DOM methods
    removeSearchResults = function(element){
        while (element.firstChild){
            element.removeChild(element.firstChild);
        }
    }

    setElementMap = function(){
        var container = stateMap.container;
        elementMap = {
            container: container,
            search_input: container.querySelector('.search-input'),
            search_results: container.querySelector('.search-results'),
            company_details: container.querySelector('.company-details')
        };
    };

    // Public methods
    initModule = function(container){
        stateMap.container = container;
        container.innerHTML = configMap.main_html;
        setElementMap();
        stateMap.symbols = iex.model.getTickerSymbols();
        var search_input = elementMap.search_input;
        search_input.addEventListener("input", onTickerSearchEvent);
        document.addEventListener("click", function (e) {
            removeSearchResults(elementMap.search_results);
        });
    };

    return {initModule: initModule};
}());