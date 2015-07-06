var route = require("can/route/route");
var Location = require("micro-location");
var workerState = require("../state");
var markAsInDocument = require("../overrides/utils/mark_in_document");

module.exports = function(data){
	route.location = Location.parse(data.location);

	var docEl = document.documentElement;
	docEl.innerHTML = data.content;
	document.body = (function(){
		var child = docEl.firstChild;
		while(child) {
			if(child.nodeName === "BODY") {
				return child;
			}
			child = child.nextSibling;
		}
		return null;
	})();

	workerState.clonedDom = document.documentElement.cloneNode(true);

	markAsInDocument(docEl);

	workerState.clonedDom.dontDiff = true;
	markAsInDocument(workerState.clonedDom);
};
