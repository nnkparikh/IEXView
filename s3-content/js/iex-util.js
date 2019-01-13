iex.util = (function(){
	var makeError;
	makeError = function(name, message, data){
		var error = new Error();
		error.name = name;
		error.message = message;
		if (data){ error.data = data; }
		return error;
	}
	return {
		makeError: makeError
	};
}());