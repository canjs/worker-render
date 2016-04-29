/*worker-render@1.2.0#worker/handlers/globals/special*/
define(function (require, exports, module) {
    var Location = require('micro-location');
    var extend = require('../../../simple_extend');
    exports.hashchange = function (event) {
        var newLocation = Location.parse(event.newURL);
        extend(window.location, newLocation);
    };
});