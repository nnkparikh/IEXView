iex.company_details = (function(){
    var configMap = {
        apiURL: iex.apiURL,
        main_html: String()
                + '<div class="company-intro">'
                +   '<div class="company-header"></div>'
                +   '<div class="company-price"></div>'
                +   '<div class="company-description"></div>'
                + '</div>'
    },
    stateMap = {
        container: null,
        company_details: null,
    },
    elementMap = {}, 
    setElementMap, displayCompanyDetails, displayCompanyPrice,
    initModule;

    // Event Listener
    displayCompanyDetails = function(e){
        var ticker = e.data.ticker;
        displayCompanyBaseDetails(ticker);
        displayCompanyPrice(ticker);
    };


    // DOM methods
    setElementMap = function(){
        var container = stateMap.container;
        elementMap = {
            container: container,
            company_header: container.querySelector('.company-header'),
            company_description: container.querySelector('.company-description'),
            company_price: container.querySelector('.company-price')
        };
    };

    displayCompanyBaseDetails = function(ticker){
        var companyURL = configMap.apiURL + `stock/${ticker}/company`;
        fetch(companyURL)
        .then(function(e){
            return e.json();
        })
        .then(function(e){
            stateMap.company_details = e;
            elementMap.company_header.innerHTML = `<h1>${e.companyName}</h1>`;
            elementMap.company_description.innerHTML = `<h4>Description</h4>${e.description}`;
        });
    }

    displayCompanyPrice = function(ticker){
        var priceURL = configMap.apiURL + `stock/${ticker}/price`;
        fetch(priceURL)
        .then(function(e){
            return e.json();
        })
        .then(function(e){
            stateMap.company_price = e;
            elementMap.company_price.innerHTML = `${e}`;
        });
    }

    // Public methods
    initModule = function(container){
        stateMap.container = container;
        container.innerHTML = configMap.main_html;
        document.addEventListener('tickersearch', displayCompanyDetails, false);
        setElementMap();
    };

    return {initModule: initModule};
}());