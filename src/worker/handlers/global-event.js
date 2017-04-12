var canEvent = require("can-event");
var special = require("./globals/special");

module.exports = function(data){
	var event = data.event;
	event.target = event.currentTarget = self;

	// Pre-conditions for global events.
	if(special[event.type]) {
		special[event.type](event);
	}

	canEvent.trigger.call(window, event);
};
