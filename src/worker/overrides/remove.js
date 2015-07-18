var schedule = require("../scheduler").schedule;
var domId = require("can-worker/dom-id/");
var Node = require("can-simple-dom/simple-dom/document/node")["default"];
var markAsInDocument = require("./utils/mark_in_document");
var inDocument = require("./utils/in_document");

var proto = Node.prototype;

var removeChild = proto.removeChild;
proto.removeChild = function(child){
	var parent = this;

	if(inDocument(parent)) {

		schedule(parent, {
			type: "remove",
			child: domId.getID(child)
		});

	}

	return removeChild.apply(this, arguments);
};
