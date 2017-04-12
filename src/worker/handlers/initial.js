var Location = require("micro-location");
var extend = require("../../simple_extend");

module.exports = function(data){
	//var newLocation = Location.parse(data.location);
	var newLocation = new URL(data.location);
	extend(window.location, newLocation);
	var docEl = document.documentElement;

	// Keep the contents inside the <head> because they might have
	// been set as part of the page load. An example is <style>
	// tags added by the css plugin.
	var resetContent = preserveHeadContent(docEl);

	docEl.innerHTML = data.content;

	setIfPresent(docEl, "body");
	setIfPresent(docEl, "head");

	return resetContent;
};

function getBaseElement(docEl, nodeName){
	var upperCase = nodeName.toUpperCase();

	return (function(){
		var child = docEl.firstChild;
		while(child) {
			if(child.nodeName === upperCase) {
				return child;
			}
			child = child.nextSibling;
		}
		return null;
	})();
}

/**
 * Set the document.body and document.head properties.
 */
function setIfPresent(docEl, nodeName){
	var node = getBaseElement(docEl, nodeName);

	if(node) {
		document[nodeName] = node;
	}
}

function preserveHeadContent(docEl){
	var head = getBaseElement(docEl, "head");
	var preserveTags = { "STYLE": true, "LINK": true };

	var elements = [];
	if(head) {
		var cur = head.firstChild;
		while(cur) {
			if(preserveTags[cur.nodeName]) {
				elements.push(cur);
			}
			cur = cur.nextSibling;
		}
	}

	return function(){
		var head = getBaseElement(docEl, "head");
		elements.forEach(function(element){
			head.appendChild(element);
		});
	};
}
