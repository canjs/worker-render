var schedule = require("../scheduler").schedule;
var domId = require("dom-diff/dom-id");
var Node = require("can-simple-dom/simple-dom/document/node")["default"];
var markAsInDocument = require("./utils/mark_in_document");
var shouldDiff = require("./utils/should_diff");

var proto = Node.prototype;

var removeChild = proto.removeChild;
proto.removeChild = function(child){
	var parent = this;

	if(parent.inDocument && shouldDiff(parent)) {

		schedule(child, function(route){
			return {
				type: "remove",
				parent: domId.getID(parent)
			};

		});

	}

	return removeChild.apply(this, arguments);
};
