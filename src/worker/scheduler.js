var domId = require("../dom-id");
require("setimmediate");

var changedRoutes = {},
	changes = [],
	globals = [],
	flushScheduled;

exports.schedule = function schedule(el, callbackOrData){
	var route = domId.getID(el);

	if(!changedRoutes[route]) {
		changes.push(route);
	}

	changedRoutes[route] = callbackOrData;

	exports.scheduleFlush();
};

exports.scheduleGlobal = function scheduleGlobal(callback){
	globals.push(callback);
	exports.scheduleFlush();
};

exports.scheduleFlush = function scheduleFlush(){
	if(!flushScheduled) {
		flushScheduled = true;

		// TODO can we do faster than setTimeout
		setTimeout(exports.flushChanges);
	}
};

exports.flushChanges = function flushChanges(){
	var domChanges = [], fn, res;

	globals.forEach(function(fn){
		domChanges.push(fn());
	});

	console.log("Flushing:", changes);

	changes.forEach(function(route){
		var fn = changedRoutes[route];
		//var route = change.route;
		//var fn = change.callback;

		if(typeof fn === "function") {
			res = fn(route);
		} else {
			res = fn;
		}
		// Callbacks could return undefined which means do nothing.
		if(res) {
			res.route = route;
			domChanges.push(res);
		}

	});

	changedRoutes = {};
	changes.length = 0;
	globals.length = 0;

	postMessage(domChanges);

	flushScheduled = false;
};
