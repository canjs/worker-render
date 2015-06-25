var can = require("can/util/util");
var special = require("./globals/special");

module.exports = function(ev){
	var event = ev.data.event;
	event.target = event.currentTarget = ev.target;

	// Pre-conditions for global events.
	if(special[event.type]) {
		special[event.type](event);
	}

	can.trigger(window, event);
};
