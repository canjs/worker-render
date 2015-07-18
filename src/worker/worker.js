var handlers = require("./handlers/handlers");
var schedule = require("./scheduler").schedule;
var domId = require("can-worker/dom-id/");
var serialize = require("../../node_serialization").serialize;

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
	};
};

// The global message listener. Gets messages from the window and hands
// them off to a handler.
onmessage = function(ev){
	var data = ev.data;

	if(Array.isArray(data)) {
		data.forEach(runHandler);
	} else {
		runHandler(data);
	}
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
