var DiffDOM = require("../diff-dom");
var domId = require("../dom-id");
var workerState = require("./state");

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

	// Diff and apply the old element.
	var prevEl = domId.findNode(route, workerState.clonedDom);
	var diff = dd.diff(prevEl, newEl);
	dd.apply(prevEl, diff);

	return diff;
};
