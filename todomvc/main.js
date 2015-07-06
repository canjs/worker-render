require("todomvc-common/base");
require("./todo-app");
var can = require("can");
var $ = require("jquery");
var template = require("./index.stache!");

//var worker = require("can-worker/worker/");

//worker.startup(function(){

	can.route(':filter');

	var todoapp = $('section:first');
	todoapp.html(template());

	can.route.ready();

//});
