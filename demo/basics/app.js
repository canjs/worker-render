window = self;

importScripts("https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js");
importScripts("https://cdn.rawgit.com/jashkenas/dbmonster/gh-pages/junkola-copied-from-ember.js");
importScripts("../../dist/global/vdom.js");
importScripts("../../dist/global/worker.js");

workerRender.ready(render);

function render() {
	var TIMEOUT = 0;
	ROWS = 100;

	var body = document.getElementsByTagName('body')[0];
	var table;
	function redraw() {
		var dbs = getDatabases();

		var drawBefore = new Date();
		newTable = template(dbs);
		console.log("took", new Date() - drawBefore);
		if(table) {
			body.removeChild(table);
		}
		body.appendChild(newTable);
		table = newTable;
		setTimeout(redraw, TIMEOUT);
	}
	redraw();
}

function template(dbs) {
	// <table>
	var table = document.createElement("table");
	table.className = "table table-striped latest-data";

	// <tbody>
	var tbody = document.createElement("tbody");

	var i = 0, len = dbs.length;
	for(; i < len; i++) {
		var db = dbs[i];
		var tr = document.createElement("tr");

		// <td dbname>
		var dbname = document.createElement("td");
		dbname.className = "dbname";
		dbname.appendChild(document.createTextNode(db.name));
		tr.appendChild(dbname);

		// <td query-count>
		var queryCount = document.createElement("td");
		queryCount.className = "query-count";
		var queryCountSpan = document.createElement("span");
		queryCountSpan.className = "query-count";
		queryCountSpan.appendChild(document.createTextNode(db.queries.length));
		queryCount.appendChild(queryCountSpan);
		tr.appendChild(queryCount);

		// <td Query >
		for(var j = 0, jLen = db.topFiveQueries.length; j < jLen; j++) {
			var query = db.topFiveQueries[j];
			var queryTd = document.createElement("td");
			queryTd.appendChild(document.createTextNode(query.elapsed));

			var popover = document.createElement("div");
			popover.className = "popover left";
			var popoverContent = document.createElement("div");
			popoverContent.className = "popover-content";
			popoverContent.appendChild(document.createTextNode(query.query));
			popover.appendChild(popoverContent);
			var arrow = document.createElement("div");
			arrow.className = "arrow";
			popover.appendChild(arrow);

			queryTd.appendChild(popover);
			tr.appendChild(queryTd);
		}
		tbody.appendChild(tr);
	}
	table.appendChild(tbody);
	return table;
}
