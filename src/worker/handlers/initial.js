var route = require("can/route/route");
var Location = require("micro-location");
var workerState = require("../state");

module.exports = function(ev){
	route.location = Location.parse(ev.data.location);

	var docEl = document.documentElement;
	docEl.innerHTML = ev.data.content;
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
};
