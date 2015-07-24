var workerRender = require("worker-render/worker");
var $ = require("jquery");
var can = require("can");
var stache = require("can/view/stache/");

workerRender.ready(render);

function render(){
	var renderer = stache("{{#if submitted}}" +
						  "<span id='done'>Thanks!</span>" +
						  "{{else}}" +
						  "<form can-submit='submit'>" +
						  "<div><label>Developer?</label>" +
						  "<input type='checkbox' can-value='{isDeveloper}'></div>" +
						  "<div><label>Name</label>" +
						  "<input type='text' can-value='{name}'></div>" +
						  "<input type='submit'></form>" +
						  "{{/if}}");

	var App = can.Map.extend({
		submitted: false,
		isDeveloper: false,
		name: null,

		submit: function(){
			this.attr("submitted", true);
		}
	});

	var frag = renderer(new App());

	$("body").html(frag);
}
