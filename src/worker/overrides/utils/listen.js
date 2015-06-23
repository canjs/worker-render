
/**
 * @function listen
 * @param {Element} el
 * @param {can.Compute} compute
 * @param {Function} change
 *
 * Utility for listening to a compute attached to an element.
 *
 */
module.exports = function(el, compute, change){
	function teardown(){
		compute.unbind("change", change);
		can.unbind.call(el, "removed", teardown);
	}

	compute.bind("change", change);
	can.bind.call(el, "removed", teardown);
}
