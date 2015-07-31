window = self;

importScripts("https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js");
importScripts("https://cdn.rawgit.com/jashkenas/dbmonster/gh-pages/junkola-copied-from-ember.js");
importScripts("../../dist/global/vdom.js");
importScripts("../../dist/global/worker.js");
importScripts("../../node_modules/can/dist/can.jquery.js");
importScripts("../../node_modules/can/dist/can.stache.js");

workerRender.ready(render);

function render() {
	var TIMEOUT = 0;
	ROWS = 100;

	var body = document.getElementsByTagName('body')[0];
	var table;

	var template = document.getElementById("template");
	var renderer = can.stache(template.innerHTML.trim());

	var list = new can.List(getDatabases());
	body.appendChild(renderer({dbs: list}));

	function redraw() {
		var dbs = getDatabases();

		for(var i = 0, len = dbs.length; i < len; i++) {
			var db = dbs[i];
			var item = list.attr(i);

			item.attr({
				countClassName: db.countClassName,
				queryCount: db.queries.length
			});

			j = 0;
			jLen = 5;
			for(; j < jLen; j++) {
				item.attr("topFiveQueries").attr(j).attr(db.topFiveQueries[j]);
			}
		}
		setTimeout(redraw, TIMEOUT);
	}
	redraw();
}
