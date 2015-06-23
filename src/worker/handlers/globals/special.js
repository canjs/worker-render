var route = require("can/route/route");
var Location = require("micro-location");

/**
 * @function hashchange
 * @hide
 *
 * Preprocessor for hashchange events
 */
exports.hashchange = function(event){
	route.location = Location.parse(event.newURL);
};
