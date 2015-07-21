var workerRender = require("worker-render/worker");
var $ = require("jquery");
require("./style.css!");

workerRender.ready(render);

function render(){
	var span = document.createElement("span");
	span.appendChild(document.createTextNode("Hello world!"));
	$("body").html(span);
}
