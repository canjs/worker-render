var DiffDOM = require("../diff-dom");
var domId = require("../dom-id");
var workerState = require("./state");

var dd = new DiffDOM();

/**
 * Given a path to an element, update it.
 */
module.exports = function(path, newEl){
	// Diff and apply the old element.
	var prevEl = domId.get(path, workerState.clonedDom);
	var diff = dd.diff(prevEl, newEl);
	dd.apply(prevEl, diff);

	return diff;
};
