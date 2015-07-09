var schedule = require("../scheduler").schedule;
var domId = require("dom-diff/dom-id");
var syncDom = require("../sync-dom");
var Node = require("can-simple-dom/simple-dom/document/node")["default"];
var markAsInDocument = require("./utils/mark_in_document");
var shouldDiff = require("./utils/should_diff");

var proto = Node.prototype;

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

function maybeRegisterElementForDiffing(child){
	var parent = nodeParent(child);
	if(parent && parent.inDocument && shouldDiff(parent)) {
		markAsInDocument(child);

		if(child.nodeType === 1) {
			domId.getID(child);
			domId.purgeSiblings(child);
		}

		schedule(parent, function(route){
			var diff = syncDom(route, parent);
			if(diff) {
				return {
					type: "diff",
					diff: diff
				};
			}
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
