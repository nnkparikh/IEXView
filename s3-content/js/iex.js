var iex = (function(){
    var apiURL = "https://api.iextrading.com/1.0/";
    var initModule = function (container) {
        iex.shell.initModule(container);
    };
    return {
        initModule: initModule,
        apiURL: apiURL
    };
}());