iex.company_details = (function(){
    'using strict';
    var configMap = {
        main_html: String()
                + '<div class="company-intro">'
                +   '<div class="company-header"></div>'
                +   '<div class="company-price"></div>'
                +   '<div class="company-description"></div>'
                +   '<div class="company-ceo"></div>'
                +   '<div class="company-website"></div>'
                +   '<div class="company-industry"></div>'
                +   '<div class="company-exchange"></div>'
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
        iex.model.getCompanyBaseDetails(ticker, displayCompanyBaseDetails);
        iex.model.getCompanyPrice(ticker, displayCompanyPrice);
    };

    // DOM methods
    setElementMap = function(){
        var container = stateMap.container;
        elementMap = {
            container: container,
            company_header: container.querySelector('.company-header'),
            company_description: container.querySelector('.company-description'),
            company_price: container.querySelector('.company-price'),
            company_ceo: container.querySelector('.company-ceo'),
            company_website: container.querySelector('.company-website'),
            company_industry: container.querySelector('.company-industry'),
            company_exchange: container.querySelector('.company-exchange'),
        };
    };

    displayCompanyBaseDetails = function(e){       
        stateMap.company_details = e;
        elementMap.company_header.innerHTML = `<h1>${e.companyName}</h1>`;
        elementMap.company_description.innerHTML = `<h4>Description</h4>${e.description}`;
        elementMap.company_ceo.innerHTML = `<h4>CEO</h4>${e.CEO}`;
        elementMap.company_website.innerHTML = `<h4>Website</h4>${e.website}`;
        elementMap.company_industry.innerHTML = `<h4>Industry</h4>${e.industry}`;
        elementMap.company_exchange.innerHTML = `<h4>Exchange</h4>${e.exchange}`;
    }

    displayCompanyPrice = function(e){
        stateMap.company_price = e;
        elementMap.company_price.innerHTML = `${e}`;
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