var handlers = require("./handlers/handlers");
var schedule = require("./scheduler").schedule;
var syncDom = require("./sync-dom");
var domId = require("../dom-id");
var workerState = require("./state");

require("./overrides/diff");
require("./overrides/attributes");
require("./overrides/text");
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

		schedule(document.documentElement, function(path){
			var diff = syncDom(path, document.documentElement, true);
			workerState.firstRender = true;
			return { type: "diff", diff: diff };
		});

	};
};

// The global message listener. Gets messages from the window and hands
// them off to a handler.
onmessage = function(ev){
	var handler = handlers[ev.data.type];
	if(handler) {
		handler(ev);
	} else {
		console.warn("No handler for", ev.data.type);
	}
};

// Tell the window that we're ready to start rendering.
postMessage("start");
