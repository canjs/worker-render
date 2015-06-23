var live = require("can/view/live/live");
var schedule = require("../scheduler").schedule;
var listen = require("./utils/listen");

var oldFunction = live.text;
live.text = function(el, compute){
	var node = oldFunction.apply(this, arguments);
	listen(el, compute, function(ev, newVal, oldVal){
		// Send the text change
		schedule(node, {
			type: "text",
			value: newVal
		});
	});
	return node;
};
