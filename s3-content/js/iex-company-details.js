iex.company_details = (function(){
	var configMap = {
		apiURL: "https://api.iextrading.com/1.0/",
        main_html: String()
    			+ '<div class="company-intro">'
        		+ 	'<div class="company-header"></div>'
        		+ 	'<div class="company-price"></div>'
        		+ 	'<div class="company-description"></div>'
        		+ '</div>'
    },
    stateMap = {
        container: null,
        company_details: null,
        company_price: ""
    },
    elementMap = {}, 
    setElementMap, displayCompanyDetails, displayCompanyPrice,
    initModule;

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
        setElementMap();
    };

    displayCompanyDetails = function(ticker){
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
    	displayCompanyPrice(ticker);
    };

    return {
    	initModule: initModule,
    	displayCompanyDetails: displayCompanyDetails
    };
}());