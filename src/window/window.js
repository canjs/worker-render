var nodeRoute = require("node-route");
var applyPatches = require("dom-patch/apply");
var makeEventHandler = require("./event_handler");
var extend = require("./simple_extend");

exports.updateWith = updateWith;

function updateWith(worker){
	var eventHandler = makeEventHandler(worker);

	var globalEventHandler = function(ev){
		worker.postMessage({
			type: "globalEvent",
			event: extend({}, ev)
		});
	};

	var patchOptions = {
		globalEventHandler: globalEventHandler,

		eventHandler: eventHandler
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
}
