iex.util = (function(){
	var symbolsUrl = "https://api.iextrading.com/1.0/ref-data/symbols";
	var getSymbols;

	getSymbols = function(symbolsUrl){
		console.log("this does nothing for now.");
		return "list of symbols.."
	};

	return {
		getSymbols: getSymbols,
		symbols: getSymbols(symbolsUrl),
	};
}());