var domId = require("../../dom-id");
var can = require("can/util/util");

module.exports = function(ev){
	var event = ev.data.event;
	var el = domId.get(ev.data.path);
	event.target = event.currentTarget = el;

	var values = ev.data.values;
	if(values) {
		for(var p in values) {
			el[p] = values[p];
		}
	}

	can.trigger(el, event);
};
