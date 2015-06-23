var scheduleGlobal = require("../scheduler").scheduleGlobal;
var isNode = require("../../is-node");


var node = document.createElement("div");
var NodeProto = node.constructor.prototype.__proto__;
var addEventListener = NodeProto.addEventListener;
var removeEventListener = NodeProto.removeEventListener;

NodeProto.addEventListener = function(eventName){
	if(isNode(this)) {
		var el = this;
		if(!el.__events) {
			el.__events = {};
		}
		el.__events[eventName] = true;
	}
	return addEventListener.apply(this, arguments);
};

NodeProto.removeEventListener = function(eventName){
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
