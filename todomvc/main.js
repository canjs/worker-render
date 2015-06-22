require("todomvc-common/base");
require("./todo-app");
var can = require("can");
var $ = require("jquery");
var template = require("./index.stache!");

var worker = require("can-worker/can-worker");
worker.initialRender = function(){
	var todoapp = $($('section')[0]);
	todoapp.html(template());
};
