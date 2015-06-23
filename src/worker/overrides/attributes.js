var live = require("can/view/live/live");
var listen = require("./utils/listen");
var schedule = require("../scheduler").schedule;

var oldFunction = live.simpleAttribute;
live.simpleAttribute = function(el, attributeName, compute){
	var res = oldFunction.apply(this, arguments);
	listen(el, compute, function(ev, newVal){
		schedule(el, {
			type: "attribute",
			attr: attributeName,
			value: newVal
		});
	});
	return res;
};
