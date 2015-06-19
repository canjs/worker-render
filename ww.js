var can = require("can");
var stache = require("can/view/stache/stache");
var canWorker = require("./can-worker");

canWorker.initialRender = render;

// Demo

function render() {
	var map = new can.Map({foo:"bar"});
	var renderer = stache("<div>{{foo}}</div>");
	var frag = renderer(map);

	document.body.appendChild(frag);

	setTimeout(function(){
		map.attr("foo", "qux");
	}, 500);
}
