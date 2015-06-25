var QUnit = require("steal-qunit");
var domId = require("./dom-id");
var $ = require("jquery");

QUnit.module("dom-id", {
	setup: function(){
		domId.purgeID(".1.0.0.0.1.0");
		$("#qunit-test-area").html(
			"<div style='display:none;'><ul><li></li><li><span></span></li></ul></div>"
		);
	}
});

QUnit.test("creates correct route for dom elements", function(){
	var span = $("#qunit-test-area span")[0];
	var route = domId.getID(span);

	equal(route, ".1.0.0.0.1.0", "route is correct");
});

QUnit.test("finds the element at a route", function(){
	var id = ".1.0.0.0.1.0";

	var span = $("#qunit-test-area span")[0];
	var node = domId.getNode(id);

	equal(span, node, "Got the correct element");
});
