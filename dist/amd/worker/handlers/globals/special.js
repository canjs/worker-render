/*worker-render@1.1.5#worker/handlers/globals/special*/
define(function (require, exports, module) {
    var Location = require('micro-location');
    var extend = require('../../../simple_extend');
    exports.hashchange = function (event) {
        var newLocation = Location.parse(event.newURL);
        extend(window.location, newLocation);
    };
});