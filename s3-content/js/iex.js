var iex = (function(){
    'using strict';
    var initModule = function (container) {
        iex.shell.initModule(container);
        iex.model.initModule();
    };
    return {
        initModule: initModule
    };
}());