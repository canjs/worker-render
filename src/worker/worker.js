var handlers = require("./handlers/handlers");
var schedule = require("./scheduler").schedule;
var syncDom = require("./sync-dom");
var domId = require("dom-diff/dom-id");
var workerState = require("./state");
var can = require("can");

require("./overrides/insert");
require("./overrides/remove");
require("./overrides/attributes");
require("./overrides/prop");
require("./overrides/events");

/**
 * @function startup
 * @param {Function} render
 *
 * Startup the worker to do the initial render
 */
exports.startup = function(render){
	var initial = handlers.initial;
	handlers.initial = function(){
		initial.apply(this, arguments);

		// Call the initial render
		render();

		/*schedule(document.documentElement, function(path){
			var diff = syncDom(path, document.documentElement, true);
			workerState.firstRender = true;
			return { type: "diff", diff: diff };
		});*/

	};
};

// The global message listener. Gets messages from the window and hands
// them off to a handler.
onmessage = function(ev){
	var data = ev.data;

	//can.batch.start();
	var start = new Date();
	if(Array.isArray(data)) {
		data.forEach(runHandler);
	} else {
		runHandler(data);
	}
	console.log("Rendering took:", new Date() - start);
	//can.batch.stop();
};

function runHandler(data){
	var handler = handlers[data.type];
	if(handler) {
		handler(data);
	} else {
		console.warn("No handler for", data.type);
	}
}

// Tell the window that we're ready to start rendering.
postMessage("start");
