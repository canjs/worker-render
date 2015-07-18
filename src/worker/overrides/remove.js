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

		schedule(child, function(route){
			return {
				type: "remove",
				parent: domId.getID(parent)
			};

		});

	}

	return removeChild.apply(this, arguments);
};
