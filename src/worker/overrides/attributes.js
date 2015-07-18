var schedule = require("../scheduler").schedule;
var Node = require("can-simple-dom/simple-dom/document/node")["default"];
var inDocument = require("./utils/in_document");

var proto = Node.prototype;

var setAttribute = proto.setAttribute;
proto.setAttribute = function(attr, value){
	var res = setAttribute.apply(this, arguments);
	scheduleIfInDocument(this, attr, value);
	return res;
};

function scheduleIfInDocument(node, attributeName, attributeValue){
	if(inDocument(node)) {
		schedule(node, {
			type: "attribute",
			attr: attributeName,
			value: attributeValue
		});
	}
}
