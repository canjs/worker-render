var can = require("can/util/util");
var special = require("./globals/special");

module.exports = function(data){
	var event = data.event;
	event.target = event.currentTarget = self;

	// Pre-conditions for global events.
	if(special[event.type]) {
		special[event.type](event);
	}

	can.trigger(window, event);
};
