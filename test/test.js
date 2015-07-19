var QUnit = require("steal-qunit");
var F = require("funcunit");

QUnit.config.testTimeout = 30000;

F.attach(QUnit);

QUnit.module("worker-render", {
	setup: function(){
		F.open("//../demo/simple_event.html");
	}
});

QUnit.test("does initial render", function(){
	F("[can-click='toggle']").exists("The link renders");
});

QUnit.test("Event handlers work", function(){
	F("[can-click='toggle']").exists().click();
	F("[can-click='log']").exists("The span was rendered");
});
