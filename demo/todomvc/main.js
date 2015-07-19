require("todomvc-common/base");
require("./todo-app");
var can = require("can");
var $ = require("jquery");
var template = require("./index.stache!");

var worker = require("worker-render/worker");

worker.ready(function(){

	can.route(':filter');

	var todoapp = $($('section')[0]);
	todoapp.html(template());

	can.route.ready();

});
