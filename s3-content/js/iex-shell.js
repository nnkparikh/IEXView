iex.shell = (function(){
    'using strict';
    var configMap = {
        main_html: String()
          + '<div class="top-bar">'
             + '<div class="random-triangle"> </div>'
             + '<div class="iex-view-text">IEXView</div>'
             + '<div class="links">'
                 + 'by'
                 + '<a class="link-to-me" href="https://neelparikh.net"> nparikh </a>'
                 + '<a class="link-to-github" href="https://github.com/nnkparikh/"> github </a>'
             + '</div>'
          + '</div>'
          + '<div class="content-wrapper">'
             + '<div class="main-content">'
                + '<div class="main-tool-bar">'
                + '</div>'
                + '<div class="company-details">'
                + '</div>'
             + '</div>'
          + '</div>'
    },
    stateMap = {
        container: null,
        symbols: null
    }, 
    elementMap = {}, 
    setElementMap,
    initModule;

    // DOM methods
    setElementMap = function(){
        var container = stateMap.container;
        elementMap = {
            container: container,
            main_content: container.querySelector('.main-content'),
            main_toolbar: container.querySelector('.main-tool-bar'),
            company_details: container.querySelector('.company-details'),
        };
    };

    // Public methods
    initModule = function(container){
        stateMap.container = container;
        container.innerHTML = configMap.main_html;
        setElementMap();
        iex.search_ticker.initModule(elementMap.main_toolbar);
        iex.company_details.initModule(elementMap.company_details);
    };

    return {initModule: initModule};
}());