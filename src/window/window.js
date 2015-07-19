var loader = require("@loader");
var nodeRoute = require("node-route");
var scheduleMaker = require("./scheduler");
var applyPatches = require("dom-patch/apply");


exports.updateWith = updateWith;

function updateWith(worker){
	var scheduleEvent = scheduleMaker(worker).scheduleEvent;

	var globalEventHandler = function(ev){
		worker.postMessage({
			type: "globalEvent",
			event: extend({}, ev)
		});
	};

	var valueSetters = {
		INPUT: function(ev, el){
			if(el.type === "checkbox") {
				return { checked: el.checked, value: el.checked };
			} else {
				return { value: el.value };
			}
		}
	};

	var patchOptions = {
		globalEventHandler: globalEventHandler,

		eventHandler: function(ev){
			var el = ev.target;
			var route = nodeRoute.getID(el);
			var values;

			if(valueSetters[el.tagName]) {
				values = valueSetters[el.tagName](ev, el);
			}

			scheduleEvent({
				type: "event",
				route: route,
				event: extend({}, ev),
				values: values
			});
		}
	};

	worker.onmessage = function(ev){
		if(ev.data === "start"){
			worker.postMessage({
				type: "initial",
				content: document.documentElement.innerHTML,
				location: location.toString()
			});
			return;
		}

		var patches = ev.data;
		applyPatches(document, patches, patchOptions);
	};

	// A simple extend that doesn't go deep
	function extend(a, b){
		var p, type;
		for(p in b) {
			type = typeof b[p];
			if(type !== "object" && type !== "function") {
				a[p] = b[p];
			}
		}
		return a;
	}
}
