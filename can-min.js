var loader = require("@loader");
var DiffDOM = require("diff-dom");
var id = require("dom-id");
var elements = require("can/view/elements.js");

var dd = new DiffDOM();

module.exports = function(main){

	var worker = window.renderWorker = new Worker(loader.stealURL+"?main="+main);

	var diffOptions = {
		eventHandler: function(ev){
			var path = id.make(ev.target);
			worker.postMessage({
				type: "event",
				path: path,
				event: extend({},ev),
				value: ev.target.value
			});
		}
	};

	var handlers = {

		diff: function(data){
			var path = data.path;
			var diff = data.diff;

			var el = id.get(path);
			dd.apply(el, diff, diffOptions);
		},

		text: function(data){
			var node = id.get(data.path);
			node.nodeValue = data.value;
		},

		attribute: function(data){
			var el = id.get(data.path);
			elements.setAttr(el, data.attr, data.value);
		}

	};

	worker.onmessage = function(ev){
		if(ev.data === "start"){
			worker.postMessage({
				type: "initial",
				content: document.documentElement.innerHTML
			});
			return;
		}

		var changes = ev.data.changes;
		changes.forEach(function(data){
			// Apply the change
			handlers[data.type](data);
		});
	};

	function extend(a, b){
		var p, type;
		for(p in b) {
			type = typeof b[p];
			if(type !== "object" && type !== "function") {
				a[p] = b[p];
			}
		}
		return a;
	}
};
