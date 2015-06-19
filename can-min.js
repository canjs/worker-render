var loader = require("@loader");
var DiffDOM = require("diff-dom");
var id = require("dom-id");
var elements = require("can/view/elements.js");

var dd = new DiffDOM();

module.exports = function(main){

	var worker = window.renderWorker = new Worker(loader.stealURL+"?main="+main);

	var receivers = {

		diff: function(data){
			var path = data.path;
			var diff = data.diff;

			var el = id.get(path);
			dd.apply(el, diff);
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
			receivers[data.type](data);
		});
	};
};
