var renderer = require("worker-render/worker");

var DefineMap = require("can-define/map/map");
var stache = require("can-stache");


var template = stache("<a href='javascript://' ($click)='toggle()'>Click to toggle</a>" +
	"{{#state}}<div ($click)='log()'>we have state</div>{{/state}}");

var State = DefineMap.extend({
	state: "boolean",
	toggle: function(){
		this.state = !this.state;
	},
	log: function(){
		console.log("this is bound");
	}
});

var state = new State({state: false});

renderer.ready(function(){
	var frag = template(state);
	document.body.appendChild(frag);
});
