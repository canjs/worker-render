var schedule = require("../scheduler").schedule;
var domId = require("../../dom-id");
var syncDom = require("../sync-dom");

module.exports = function(doc){
	doc = doc || document;
	markAsInDocument(doc.documentElement);

	var maybeRegisterElementForDiffing = function(child){
		var parent = nodeParent(child);
		if(parent && parent.inDocument) {
			markAsInDocument(child);

			getChildren(child).forEach(function(node){
				schedule(node, function(route){
					var diff = syncDom(route, node);

					if(diff.length) {
						return {
							type: "diff",
							diff: diff
						}
					}
				});
			});
		}
	};

	var testElement = doc.createElement("div");
	var proto = testElement.constructor.prototype.__proto__;

	var appendChild = proto.appendChild;
	proto.appendChild = function(child){
		var res = appendChild.apply(this, arguments);
		maybeRegisterElementForDiffing(child);
		return res;
	};

	var insertBefore = proto.insertBefore;
	proto.insertBefore = function(child){
		var res = insertBefore.apply(this, arguments);
		maybeRegisterElementForDiffing(child);
		return res;
	};
};

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

function markAsInDocument(element){
	var cur = element;

	while(cur) {
		if(cur.nodeType === 1) {
			cur.inDocument = true;
		}
		var child = cur.firstChild;
		while(child) {
			markAsInDocument(child);

			child = child.nextSibling;
		}
		cur = cur.nextSibling;
	}
}
