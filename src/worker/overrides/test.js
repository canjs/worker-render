var QUnit = require("steal-qunit");
var can = require("can");
var simpleDOM = require("can-simple-dom");
require("can/util/vdom/build_fragment/");
require("can/view/stache/");
var domId = require("../../dom-id");

var insert = require("./insert");

QUnit.module("can-worker overrides", {
	setup: function(){
		this.oldPostMessage = window.postMessage;
		window.postMessage = function(){};
		this.doc = can.document = new simpleDOM.Document();
		insert(this.doc);
	},
	teardown: function(){
		window.postMessage = this.oldPostMessage;
		can.document = window.document;
	}
});

QUnit.test("Nodes appended to the DOM are in the document", function(){
	var template = can.stache("<div><span>hello world</span></div>");
	var frag = template();
	this.doc.documentElement.appendChild(frag);

	var div = frag.firstChild;
	var span = div.firstChild;

	equal(span.inDocument, true, "span is in the document");

	var id = domId.getCachedID(div);
	console.log(id);
	equal(id, "1", "div is correctly ided");
});

QUnit.test("Inserting a sibling will reset ids", function(){
	var map = new can.Map({name:"matthew"});
	var template = can.stache("<div><div><ul><li><span id='hello'>{{name}}</span></li></ul></div></div>");
	var frag = template(map);
	this.doc.documentElement.appendChild(frag);

	var ul = frag.firstChild.firstChild.firstChild;
	var firstLi = ul.firstChild;

	// Get the li and span ids which will cause them to be cached;
	domId.getID(firstLi);
	domId.getID(firstLi.firstChild);

	// Now we have 3 cached nodes, the first div, the first li and the span.
	// If we insert a sibling li it should update the first li and the span.
	ul.insertBefore(this.doc.createElement("li"), firstLi);

	//console.log(domId.nodeCache)
	console.log(domId.parentMap);

	// It should be removed from the nodeCache
	equal(domId.nodeCache["1.0.0.0.0"], undefined, "SPAN is no longer in the map");
	equal(domId.nodeCache["1.0.0.0"], ul.firstChild, "The new LI is in the map");
});
