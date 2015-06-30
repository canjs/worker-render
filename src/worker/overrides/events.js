var scheduleGlobal = require("../scheduler").scheduleGlobal;
var isNode = require("../../is-node");
var Node = require("can-simple-dom/simple-dom/document/node")["default"];


var proto = Node.prototype;
var addEventListener = proto.addEventListener;
var removeEventListener = proto.removeEventListener;

proto.addEventListener = function(eventName){
	if(isNode(this)) {
		var el = this;
		if(!el.__events) {
			el.__events = {};
		}
		el.__events[eventName] = true;
	}
	return addEventListener.apply(this, arguments);
};

proto.removeEventListener = function(eventName){
	if(isNode(this)) {
		var el = this;
		if(el.__events) {
			delete el.__events[eventName];
		}
	}
	return removeEventListener.apply(this, arguments);
};

var windowAddEventListener = window.addEventListener;
window.addEventListener = function(evName){
	scheduleGlobal(function(){
		return {
			type: "globalEvent",
			action: "add",
			name: evName
		};
	});
};
