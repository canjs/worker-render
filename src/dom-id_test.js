var QUnit = require("steal-qunit");
var domId = require("./dom-id");
var $ = require("jquery");

var SPAN_ID = "0.1.0.0.0.1.0";

QUnit.module("dom-id", {
	setup: function(){
		domId.purgeID(SPAN_ID);
		$("#qunit-test-area").html(
			"<div style='display:none;'><ul><li></li><li><span></span></li></ul></div>"
		);
	}
});

QUnit.test("creates correct route for dom elements", function(){
	var span = $("#qunit-test-area span")[0];
	var route = domId.getID(span);

	equal(route, SPAN_ID, "route is correct");
});

QUnit.test("finds the element at a route", function(){
	var span = $("#qunit-test-area span")[0];
	var node = domId.getNode(SPAN_ID);

	equal(span, node, "Got the correct element");
});
