var route = require("can/route/route");
var Location = require("micro-location");

module.exports = function(data){
	route.location = Location.parse(data.location);

	var docEl = document.documentElement;
	docEl.innerHTML = data.content;

	setIfPresent(document, "body");
	setIfPresent(document, "head");
};

function setIfPresent(document, nodeName){
	var docEl = document.documentElement;
	var upperCase = nodeName.toUpperCase();

	var node = (function(){
		var child = docEl.firstChild;
		while(child) {
			if(child.nodeName === upperCase) {
				return child;
			}
			child = child.nextSibling;
		}
		return null;
	})();

	if(node) {
		document[nodeName] = node;
	}
}
