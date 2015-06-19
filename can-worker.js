var can = require("can");
var stache = require("can/view/stache/stache");
var live = require("can/view/live/live");
var DiffDOM = require("diff-dom");
var id = require("dom-id");

var dd = new DiffDOM();

var changes = [],
	firstRender = false,
	flushScheduled = false;

[
	"html",
	"list"
].forEach(makeDiffer);

makeTextSetter();
makeAttributesSetter();

function makeDiffer(name){
	var oldFunction = live[name];
	live[name] = function(el, compute){
		var res = oldFunction.apply(this, arguments);
		listen(el, compute, function(){
			queueDiffChange(el);
		});
		return res;
	};
}

function makeTextSetter(){
	var oldFunction = live.text;
	live.text = function(el, compute){
		var node = oldFunction.apply(this, arguments);
		listen(el, compute, function(ev, newVal, oldVal){
			// Send the text change
			changes.push({
				path: id.make(node),
				type: "text",
				value: newVal
			});

			scheduleFlush();
		});
		return node;
	};
}

function makeAttributesSetter(){
	var oldFunction = live.simpleAttribute;
	live.simpleAttribute = function(el, attributeName, compute){
		var res = oldFunction.apply(this, arguments);
		listen(el, compute, function(ev, newVal){
			changes.push({
				path: id.make(el),
				type: "attribute",
				attr: attributeName,
				value: newVal
			});
		});
		return res;
	};
}

function listen(el, compute, change){
	function teardown(){
		compute.unbind("change", change);
		can.unbind.call(el, "removed", teardown);
	}

	compute.bind("change", change);
	can.bind.call(el, "removed", teardown);
}

var clone = document.documentElement.cloneNode(true);

function queueDiffChange(el) {
	if(!firstRender) {
		return;
	}

	// Set the node's id so we can find it.
	var elementPath = id.make(el);

	// Diff and apply the old element.
	var prevEl = id.get(elementPath, clone);
	var diff = dd.diff(prevEl, el);

	changes.push({
		type: "diff",
		path: elementPath,
		diff: diff
	});

	scheduleFlush();

	dd.apply(prevEl, diff);
}

function scheduleFlush(){
	if(!flushScheduled) {
		flushScheduled = true;
		setTimeout(flushChanges);
	}
}

function flushChanges(){
	var domChanges = changes;
	changes = [];

	postMessage({
		changes: domChanges
	});
	flushScheduled = false;
}

onmessage = function(ev){
	if(ev.data.type === "initial") {
		var docEl = document.documentElement;
		docEl.innerHTML = ev.data.content;
		document.body = (function(){
			var child = docEl.firstChild;
			while(child) {
				if(child.nodeName === "BODY") {
					return child;
				}
				child = child.nextSibling;
			}
			return null;
		})();
		clone = document.documentElement.cloneNode(true);

		var render = exports.initialRender;
		render();
		firstRender = true;
		queueDiffChange(document.documentElement);
	}
};

postMessage("start");

// Not sure the best API, this is just temporary.
exports.initialRender = function(){};
