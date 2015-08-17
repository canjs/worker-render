/*worker-render@1.1.8#worker/handlers/globals/special*/
var Location = require('micro-location');
var extend = require('../../../simple_extend.js');
exports.hashchange = function (event) {
    var newLocation = Location.parse(event.newURL);
    extend(window.location, newLocation);
};