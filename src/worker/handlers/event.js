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

	// Override preventDefault so that we know when the event was stopped.
	event.preventDefault = function(){
		event.defaultPrevented = true;
	};

	can.trigger(el, event);

	// Send back an ack so that the window side can retrigger the event.
	postMessage({
		type: "ack",
		id: data.id,
		defaultPrevented: event.defaultPrevented
	});
};
