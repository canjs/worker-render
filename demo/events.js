var can = require("can");
var stache = require("can/view/stache/");
var renderer = require("worker-render/worker");

var template = stache("<a href='javascript://' can-click='toggle'>Click to toggle</a>" +
	"{{#state}}<div can-click='log'>we have state</div>{{/state}}");

var State = can.Map.extend({
	state: false,
	toggle: function(viewModel, el, event){
		this.attr("state", !this.attr("state"));
	},
	log: function(){
		console.log("this is bound");
	}
});

var state = new State();

renderer.ready(function(){
	var frag = template(state);
	document.body.appendChild(frag);
});
