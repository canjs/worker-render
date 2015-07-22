var Location = require("micro-location");
var extend = require("../../../simple_extend");

/**
 * @function hashchange
 * @hide
 *
 * Preprocessor for hashchange events
 */
exports.hashchange = function(event){
	var newLocation = Location.parse(event.newURL);
	extend(window.location, newLocation);
};
