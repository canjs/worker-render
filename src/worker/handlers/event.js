var domId = require("../../dom-id");
var can = require("can/util/util");

module.exports = function(ev){
	var event = ev.data.event;
	var el = domId.get(ev.data.path);
	event.target = event.currentTarget = el;
	if(ev.data.value) {
		el.value = ev.data.value;
	}

	can.trigger(el, event);
};
