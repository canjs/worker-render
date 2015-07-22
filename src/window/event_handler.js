var extend = require("./simple_extend");
var nodeRoute = require("node-route");

var valueSetters = {
	INPUT: function(ev, el){
		if(el.type === "checkbox") {
			return { checked: el.checked, value: el.checked };
		} else {
			return { value: el.value };
		}
	}
};

var doPreventDefault = {
	click: true
};

module.exports = function(worker){
	var pendingEvents = {}, id = 0;

	var eventHandler = function(ev){
		if(ev.defaultPrevented) {
			return;
		}

		var el = ev.target;
		var route = nodeRoute.getID(el);
		var values;

		if(valueSetters[el.tagName]) {
			values = valueSetters[el.tagName](ev, el);
		}

		var eventObject = extend({}, ev);

		if(doPreventDefault[ev.type]) {
			if(id < 100) {
				id++;
			} else {
				id = 0;
			}

			pendingEvents[id] = ev;
			ev.preventDefault();
		}

		worker.postMessage({
			type: "event",
			route: route,
			event: eventObject,
			values: values,
			id: id
		});
	};

	eventHandler.acknowledge = acknowledge;

	function acknowledge(data){
		var event = pendingEvents[data.id];
		delete pendingEvents[data.id];

		if(event && !data.defaultPrevented) {
			event.initEvent(event.type, true, false);
			event.target.dispatchEvent(event);
		}
	}

	return eventHandler;
};
