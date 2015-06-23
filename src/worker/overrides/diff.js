var live = require("can/view/live/live");
var schedule = require("../scheduler").schedule;
var domId = require("../../dom-id");
var syncDom = require("../sync-dom");
var listen = require("./utils/listen");

[
	"html",
	"list"
].forEach(makeDiffer);

function makeDiffer(name){
	var oldFunction = live[name];
	live[name] = function(el, compute){
		var nodes = oldFunction.apply(this, arguments);
		listen(el, compute, function(){
			nodes.forEach(function(node){
				node = node.parentNode || node;

				schedule(node, function(path){
					// Diff and apply the old element.
					var diff = syncDom(path, node);

					if(diff.length) {
						return {
							type: "diff",
							diff: diff
						};
					}
				});
			});
		});
		return nodes;
	};
}
