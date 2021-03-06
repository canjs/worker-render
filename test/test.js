var QUnit = require("steal-qunit");
var F = require("funcunit");

QUnit.config.testTimeout = 30000;

F.attach(QUnit);

QUnit.module("worker-render basics", {
	setup: function(){
		F.open("//basics/index.html");
	}
});

QUnit.test("renders an element with css", function(){
	F("span").exists().text(/Hello world/, "span rendered correctly");
	F("style").exists("style tag added to the window DOM");
});

QUnit.module("worker-render events", {
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

QUnit.module("pushState", {
	setup: function(){
		F.open("//pushstate/index.html");
	}
});

QUnit.test("Push state works", function(){
	F("a").exists().click();
	F("h4").exists("h4 added to the page, page didn't change");
});

QUnit.module("forms", {
	setup: function(){
		F.open("//form/index.html");
	}
});

QUnit.test("forms can be filled out and submitted", function(){
	F("form").exists();
	F("[type=checkbox]").click();
	F("[type=text]").click().type("Matthew");
	F("[type=submit]").click();
	F("#done").exists("Form was filled out and submitted");
});
