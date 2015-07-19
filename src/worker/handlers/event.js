var nodeRoute = require("node-route");
var can = require("can/util/util");

/**
 * DOM event handler
 */
module.exports = function(data){
	var event = data.event;
	var el = nodeRoute.findNode(data.route);
	event.target = event.currentTarget = el;

	var values = data.values;
	if(values) {
		for(var p in values) {
			el[p] = values[p];
		}
	}

	can.trigger(el, event);
};
