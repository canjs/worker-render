var DiffDOM = require("../diff-dom");
var domId = require("../dom-id");
var workerState = require("./state");

var diff = require("dom-diff/diff");
var apply = require("dom-diff/patch");
var serialize = require("dom-diff/serialize");

var dd = new DiffDOM();

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
		return { diff: [] };
	}

	var diffStart = new Date();

	// Diff and apply the old element.
	var prevEl = domId.findNode(route, workerState.clonedDom);

	/*var patches = diff(prevEl, newEl);
	var w = serialize(patches);
	apply(prevEl, w);*/
	var diff = dd.diff(prevEl, newEl);
	dd.apply(prevEl, diff);

	console.log("Diffed:", route, new Date() - diffStart);

	return diff;

	//return w;
};
