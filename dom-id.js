var slice = [].slice;

/**
 * @function domId.get
 *
 * Given a path array like [1, 2, 3, 4]
 * traverse down the dom and find the element at that path.
 */
exports.get = function (path, doc){
	var parts = path ? slice.call(path) : [];
	doc = doc || document.documentElement;

	var part, child, idx, cur = doc;
	while(parts.length) {
		part = parts.shift();
		child = cur.firstChild;
		idx = 0;

		while(child) {
			if(idx == part) {
				cur = child;
				break;
			}
			idx++;
			child = child.nextSibling;
		}
	}
	return cur;
};

/**
 * @function domId.make
 *
 * From an element, traverse up the dom to create an array
 * of paths that can find the element.
 */
var make = exports.make = function(el){
	var cur = el, parts = [], par, idx, child;
	while(cur) {
		par = cur.parentNode;
		if(par) {
			idx = -1;
			child = par.firstChild;
			while(child) {
				idx++;
				if(child === cur) {
					break;
				}
				child = child.nextSibling;
			}
			parts.unshift(idx);
		}
		cur = par;
	}
	parts.shift();
	return parts;
};
