var handlers = require("./handlers/handlers");
var patch = require("dom-patch");

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

		// Listen for changes in the document and call postMessage
		// with the patches that will be applied on the other side.
		patch(document, function(patches){
			postMessage(patches);
		});

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
