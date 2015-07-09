var schedule = require("../scheduler").schedule;
var domId = require("dom-diff/dom-id");
var inDocument = require("./utils/in_document");
var shouldDiff = require("./utils/should_diff");
var Node = require("can-simple-dom/simple-dom/document/node")["default"];

[
	{ prop:"nodeValue", type: "text"},
	{ prop: "value", type: "prop"},
	{ prop: "className", type: "prop"}
].forEach(watchProperty);

function watchProperty(info) {
	var prop = info.prop;
	var type = info.type;
	var priv = "_" + prop;

	Object.defineProperty(Node.prototype, prop, {
		get: function(){
			return this[priv];
		},
		set: function(val){
			this[priv] = val;

			scheduleIfInDocument(this, prop, val, type);
		}
	});
}

function scheduleIfInDocument(node, prop, val, type){
	if(inDocument(node.parentNode) && shouldDiff(node.parentNode)) {
		schedule(node, {
			type: type,
			prop: prop,
			value: val
		});
	}
}
