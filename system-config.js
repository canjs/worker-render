var isWorker = typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope;

if(isWorker) {
	exports.systemConfig = {
		meta: {
			"jquery": {
				"format": "global",
				"exports": "jQuery",
				"deps": ["can/util/vdom/vdom"]
			}
		}
	};
}
