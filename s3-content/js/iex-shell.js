iex.shell = (function(){
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
		     + '<div class="side-bar">'
		         + '<a class="nav-stocks" href="/">Stocks</a>'
		     + '</div>'
		     + '<div class="main-content">'
		         + '<div class="main-tool-bar">'
		             + '<div class="search-bar">'
		                 + '<i class="material-icons md-24">search</i>'
		                 + '<input type="text" class="search-input" placeholder="Search by ticker symbol or company." />'
		             + '</div>'
		             + '<div class="active-stocks"></div>'
		         + '</div>'
		         + '<div class="detailed-info">'
		         + '</div>'
		     + '</div>'
		  + '</div>'
	},
	stateMap = {
		container: null
	}, initModule;

	// DOM METHODS

	// Public methods
	initModule = function(container){
		stateMap.container = container;
		container.innerHTML = configMap.main_html;
	};

	return {initModule: initModule};
}());