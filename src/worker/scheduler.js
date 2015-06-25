var domId = require("../dom-id");
require("setimmediate");

var changes = {},
	globals = [],
	flushScheduled;

exports.schedule = function schedule(el, callbackOrData){
	var path = domId.make(el);

	if(!changes[path]) {
		changes[path] = callbackOrData;
		exports.scheduleFlush();
	}
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

	for(var path in changes) {
		path = domId.getId(path);
		fn = changes[path];
		if(typeof fn === "function") {
			res = fn(path);
		} else {
			res = fn;
		}
		// Callbacks could return undefined which means do nothing.
		if(res) {
			res.path = path;
			domChanges.push(res);
		}
	}
	changes = {};
	globals = [];

	postMessage({
		changes: domChanges
	});

	flushScheduled = false;
};

