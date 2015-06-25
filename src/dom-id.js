/**
 * @module can-worker/dom-id dom-id
 *
 * Utilities for finding DOM elements.
 *
 */

var slice = [].slice;

// An object for caching nodes
var nodeCache = {};

// Separator for our dom ids
var SEPARATOR = ".";

/**
 * @function can-worker/dom-id.rootNode
 * @parent can-worker/dom-id
 *
 * Get the root DOM element.
 *
 * @param {Document} [root] The root document.
 * @return {HTMLHtmlElement}
 */
var rootNode = exports.rootNode = function(root){
	return (root ? root.documentElement : root) || document.documentElement;
};

var cache = function(node, id){
	node.__route = id;
	nodeCache[id] = node;
};

/**
 * @function can-worker/dom-id.getID getID
 * @parent can-worker/dom-id
 *
 * Get the ID for a given element.
 *
 * The id is represented as ".0.1.0.0.1" where each integer is the index of the
 * node within it's parent. This is computed by starting with the node and
 * walking up the document
 *
 * @param {Node} node
 * @return {String} id of the node
 */
var getID = exports.getID = function(node, cacheResult){
	var id = node.__route;
	if(id) {
		// Caching
		if(nodeCache[id]) {
			if(nodeCache[id] !== node) {
				nodeCache[id] = node;
			}
		} else {
			nodeCache[id] = node;
		}
	} else {
		// Get the route to the node.
		var id = getRoute(node);

		cache(node, id);
	}
	return id;
};

function getRoute(node) {
	var id = "",
		cur = node,
		par, idx;
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
			id = id + SEPARATOR + idx;
		}
		cur = par;
	}
	return id.substr(2);
}


/**
 * Checks if a character in the supplied ID is a separator or the end.
 *
 * @param {string} id A React DOM ID.
 * @param {number} index Index of the character to check.
 * @return {boolean} True if the character is a separator or end of the ID.
 * @private
 */
var isBoundary = exports.isBoundary = function(id, index){
	return id.charAt(index) === SEPARATOR || index === id.length;
}

/**
 * Checks if the first ID is an ancestor of or equal to the second ID.
 *
 * @param {string} ancestorID
 * @param {string} descendantID
 * @return {boolean} True if `ancestorID` is an ancestor of `descendantID`.
 */
var isAncestorIDOf = exports.isAncestorIDOf = function(ancestorID, descendantID){
	return (
		descendantID.indexOf(ancestorID) === 0 &&
		isBoundary(descendantID, ancestorID.length)
	);
};

/**
 * @function can-worker/dom-id.findNode findNode
 * @parent can-worker/dom-id
 *
 * Find a DOM node by its id.
 */
var findNode = exports.findNode = function(id, root){
	var node = rootNode(root);
	var ids = id.split(".");
	var idIndex = 1;

	while(node) {
		var currentIndex = ids[idIndex];
		if(currentIndex == null) {
			break;
		}

		var nodeIndex = 0;
		var child = node.firstChild;

		while(child) {
			if(nodeIndex == currentIndex) {
				node = child;
				break;
			}
			nodeIndex++;
			child = child.nextSibling;
		}

		idIndex++;
		node = child;
	}

	return node;
};

/**
 * @function can-worker/dom-id.getNode getNode
 * @parent can-worker/dom-id
 *
 * Get the Node for a particular id.
 *
 * @param {String} id
 * @param {HTMLHtmlElement} [root] The root element to start with in the search
 * for a DOM node.
 * @return {Node} dom element matching the id.
 */
exports.getNode = function(id, root){
	var node;

	node = nodeCache[id];
	if(node) {
		return node;
	}

	// Find the node with traversal
	node = findNode(id, root);
	cache(node, id);

	return node;
};

exports.purgeID = function(id){
	var node = nodeCache[id];
	if(node) {
		delete node.__route;
		delete nodeCache[id];
	}
};





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




exports.getId = function(str){
	return str ? str.split(",") : [];
};

exports.set = function(el){
	var path = make(el);
	el.path = path;
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
