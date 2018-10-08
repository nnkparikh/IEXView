iex.company_details = (function(){
	var configMap = {
		apiURL: "https://api.iextrading.com/1.0/",
        main_html: String()
    },
    stateMap = {
        container: null,
        symbol: "",
        name: ""
    },
    elementMap = {}, 
    setElementMap, getCompanyProfile,
    initModule;

    // DOM methods

    getCompanyProfile = function(){
    	var companyURL = configMap.apiURL + `stock/${stateMap.symbol}/company`;
    	
    };

    setElementMap = function(){
        var container = stateMap.container;
        elementMap = {
            container: container
        };
    };

    // Public methods
    initModule = function(container){
        stateMap.container = container;
        container.innerHTML = configMap.main_html;
        setElementMap();
    };

    return {initModule: initModule};
}());