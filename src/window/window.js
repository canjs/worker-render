var loader = require("@loader");
var DiffDOM = require("../diff-dom");
var domId = require("../dom-id");
var elements = require("can/view/elements.js");

var dd = new DiffDOM();

module.exports = function(main){

	var worker = new Worker(loader.stealURL+"?main="+main);

	var globalEventHandler = function(ev){
		worker.postMessage({
			type: "globalEvent",
			event: extend({}, ev)
		});
	};

	var valueSetters = {
		INPUT: function(ev, el){
			if(el.type === "checkbox") {
				return { checked: el.checked, value: el.checked };
			} else {
				return { value: el.value };
			}
		}
	};

	var diffOptions = {
		eventHandler: function(ev){
			var el = ev.target;
			var route = domId.getID(el);
			var values;

			if(valueSetters[el.tagName]) {
				values = valueSetters[el.tagName](ev, el);
			}

			worker.postMessage({
				type: "event",
				route: route,
				event: extend({}, ev),
				values: values
			});
		}
	};

	var handlers = {

		diff: function(data){
			var route = data.route;
			var diff = data.diff;

			var el = domId.findNode(route);
			dd.apply(el, diff, diffOptions);
		},

		text: function(data){
			var node = domId.findNode(data.route);
			node.nodeValue = data.value;
		},

		attribute: function(data){
			var el = domId.findNode(data.route);
			elements.setAttr(el, data.attr, data.value);
		},

		prop: function(data){
			var el = domId.findNode(data.route);
			el[data.prop] = data.value;
		},

		globalEvent: function(data){
			var fn = data.action === "add" ? "addEventListener" : "removeEventListener";
			window[fn](data.name, globalEventHandler);
		}

	};

	worker.onmessage = function(ev){
		if(ev.data === "start"){
			worker.postMessage({
				type: "initial",
				content: document.documentElement.innerHTML,
				location: location.toString()
			});
			return;
		}

		var changes = ev.data.changes;
		changes.forEach(function(data){
			// Apply the change
			handlers[data.type](data);
		});
	};

	// A simple extend that doesn't go deep
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
