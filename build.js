var stealTools = require("steal-tools");

var mains = [
	"worker-render/window",
	"worker-render/worker"
];

stealTools.export({
	system: {
		main: mains,
		config: __dirname + "/package.json!npm"
	},
	outputs: {
		"+cjs": {
			graphs: mains
		},
		"+amd": {
			graphs: mains
		},
		"+global-js window": {
			modules: ["worker-render/window"],
			dest: __dirname + "/dist/global/window.js"
		},
		"+global-js worker": {
			modules: ["worker-render/worker"],
			dest: __dirname + "/dist/global/worker.js"
		}
	}
});
