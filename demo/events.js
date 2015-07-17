var can = require("can");
var stache = require("can/view/stache/");
var canWorker = require("can-worker/worker/");

var template = stache("<a href='javascript://' can-click='toggle'>Click to toggle</a>" +
	"{{#state}}<div can-click='log'>we have state</div>{{/state}}");

var State = can.Map.extend({
	state: false,
	toggle: function(){
		this.attr("state", !this.attr("state"));
	},
	log: function(){
		console.log("this is bound");
	}
});

var state = new State();

canWorker.startup(function(){
	var frag = template(state);
	document.body.appendChild(frag);
});
