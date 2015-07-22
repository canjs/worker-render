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


module.exports = function(worker){
	return function(ev){
		var el = ev.target;
		var route = nodeRoute.getID(el);
		var values;

		if(valueSetters[el.tagName]) {
			values = valueSetters[el.tagName](ev, el);
		}

		worker.postMessage({
			type: "event",
			route: route,
			event: extend({}, ev),
			values: values
		});
	};
};
