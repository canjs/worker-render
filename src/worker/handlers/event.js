var nodeRoute = require("node-route");
var canEvent = require("can-event");

/**
 * DOM event handler
 */
module.exports = function(data){
	var event = data.event;
	var el = event.target = nodeRoute.findNode(event.target);
	event.currentTarget = nodeRoute.findNode(event.currentTarget);

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

	canEvent.trigger.call(event.currentTarget, event);

	// Send back an ack so that the window side can retrigger the event.
	postMessage({
		type: "ack",
		id: data.id,
		defaultPrevented: event.defaultPrevented
	});
};
