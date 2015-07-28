var stealTools = require("steal-tools");

var mains = [
	"worker-render/window/global",
	"worker-render/worker/global"
];

stealTools.export({
	system: {
		main: mains,
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
				"worker-render/worker/global"
			],
			dest: function(moduleName){
				return moduleName.indexOf("window") > 0 ?
					"dist/global/window.js" : "dist/global/worker.js";
			},
			exports: {
				"jquery": "jQuery",
				"micro-location@0.1.4#lib/micro-location": "Location"
			}
		}
	}
});
