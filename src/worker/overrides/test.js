var QUnit = require("steal-qunit");
var can = require("can");
var simpleDOM = require("can-simple-dom");
require("can/util/vdom/build_fragment/");
require("can/view/stache/");
var domId = require("can-worker/dom-id/");
var markAsInDocument = require("./utils/mark_in_document");

require("./insert");
require("./prop");

QUnit.module("can-worker overrides", {
	setup: function(){
		this.oldPostMessage = window.postMessage;
		window.postMessage = function(){};
		this.doc = can.document = new simpleDOM.Document();

		markAsInDocument(this.doc.documentElement);
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

	var span = frag.firstChild.firstChild;
	equal(span.inDocument, true, "span is in the document");
});

QUnit.test("Inserting a sibling will reset ids", function(){
	var map = new can.Map({name:"matthew"});
	var template = can.stache("<div><div><ul><li><span id='hello'>{{name}}</span></li></ul></div></div>");
	var frag = template(map);
	this.doc.documentElement.appendChild(frag);

	var ul = frag.firstChild.firstChild.firstChild;
	var firstLi = ul.firstChild;

	// Now we have 3 cached nodes, the first div, the first li and the span.
	// If we insert a sibling li it should update the first li and the span.
	ul.insertBefore(this.doc.createElement("li"), firstLi);

	// It should be removed from the nodeCache
	equal(domId.nodeCache["0.1.0.0.0.0"], undefined, "SPAN is no longer in the map");
	equal(domId.nodeCache["0.1.0.0.0"], ul.firstChild, "The new LI is in the map");
});

QUnit.test("Setting a TextNode will create an id", function(){
	var template = can.stache("<div>{{name}}</div>");
	var map = new can.Map({name:"matthew"});
	var frag = template(map);

	this.doc.documentElement.appendChild(frag);

	map.attr("name", "wilbur");

	var textNode = frag.firstChild.firstChild;
	equal(domId.nodeCache["0.1.0"], textNode, "it is the text node");
});
