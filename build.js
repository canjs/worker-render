var stealTools = require("steal-tools");

var mains = [
	"worker-render/window/global",
	"worker-render/worker/global",
];

function dest(name) {
	if(name.indexOf("#window") > 0) {
		return "window";
	} else if(name.indexOf("#worker") > 0) {
		return "worker";
	} else {
		return "vdom";
	}
}

stealTools.export({
	system: {
		main: mains.concat(["can/util/vdom/vdom"]),
		config: __dirname + "/package.json!npm",
		meta: {
			jquery: { format: "global" }
		}
	},
	outputs: {
		"+cjs": {
			graphs: mains
		},
		"+amd": {
			graphs: mains
		},
		"globals": {
			eachModule: [
				"worker-render/window/global",
				"worker-render/worker/global",
				"can/util/vdom/vdom"
			],
			dest: function(moduleName){
				return "dist/global/" + dest(moduleName) + ".js";
			},
			exports: {
				"jquery": "jQuery",
				"micro-location@0.1.4#lib/micro-location": "Location"
			}
		}
	}
});
