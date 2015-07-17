var schedule = require("../scheduler").schedule;
var domId = require("dom-diff/dom-id");
var syncDom = require("../sync-dom");
var Node = require("can-simple-dom/simple-dom/document/node")["default"];
var markAsInDocument = require("./utils/mark_in_document");
var shouldDiff = require("./utils/should_diff");

var serialize = require("../../node_serialization").serialize;

var proto = Node.prototype;

var appendChild = proto.appendChild;
proto.appendChild = function(child){
	var res = appendChild.apply(this, arguments);
	registerForDiff(child);
	return res;
};

var insertBefore = proto.insertBefore;
proto.insertBefore = function(child, ref){
	var res = insertBefore.apply(this, arguments);
	registerForDiff(child, ref);
	return res;
};

function registerForDiff(child, ref){
	var parent = nodeParent(child);
	if(parent && parent.inDocument && shouldDiff(parent)) {
		markAsInDocument(child);


		if(child.nodeType === 1) {
			domId.getID(child);
			domId.purgeSiblings(child);
		}

		schedule(child, function(route){
			var refId;
			if(ref) {
				refId = domId.getID(ref);
			}

			return {
				type: "insert",
				node: serialize(child),
				parent: domId.getID(parent),
				ref: refId
			};
		});
	}

}

function nodeParent(child){
	return child.nodeType === 11 ? child.firstChild.parentNode : child.parentNode;
}

function getChildren(el){
	var children = [];
	if(el.nodeType === 11) {
		var cur = el.firstChild;
		while(cur) {
			children.push(cur);
			cur = cur.nextSibling;
		}
	} else {
		children.push(el);
	}
	return children;

}
