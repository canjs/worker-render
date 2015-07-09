var domId = require("dom-diff/dom-id");
var workerState = require("./state");

var diff = require("dom-diff/diff");
var apply = require("dom-diff/patch");
var serialize = require("dom-diff/serialize");

/**
 * @module can-worker/worker/sync-dom
 *
 * Given a path to an element, update it.
 *
 * @param {String} route Node's id
 * @param {Element} newEl The element to replace it with
 * @param {Boolean} [force=false]
 */
module.exports = function(route, newEl, force){
	if(!workerState.firstRender && !force) {
		return null;
	}

	var diffStart = new Date();

	// Diff and apply the old element.
	var prevEl = domId.findNode(route, workerState.clonedDom);

	var patches = diff(prevEl, newEl);
	var w = serialize(patches);
	apply(prevEl, w, { root: workerState.clonedDom });

	console.log("Diffed:", route, new Date() - diffStart);

	return w;
};
