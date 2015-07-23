var workerRender = require("worker-render/worker");
var $ = require("jquery");

workerRender.ready(render);

function render(){
	var anchor = $("<a>")
		.attr("href", "other.html");
	anchor[0].appendChild(document.createTextNode("Other page"));

	anchor.bind("click", function(){
		window.history.pushState({}, "Other page", "other.html");
		var h4 = $("<h4>");
		h4[0].appendChild(document.createTextNode("It worked!"));
		$("body").append(h4);
	});

	var div = $("<div>").append(anchor);

	$("body").html(div);
}
