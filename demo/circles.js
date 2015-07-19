steal("can/view/stache", "worker-render/worker", function(stache, renderer){

	renderer.ready(render);

	var template = stache(
		"<button can-click='start'>Start</button>" +
		"<div>Performed {{loopCount}} iterations in {{totalTime}} ms (average {{average}} ms per loop).</div>" +
		"{{#each boxes}}"+
			"<div class='box-view'>"+
				"<div class='box' id='box-{{number}}'  style='{{style}}'>"+
					"{{content}}"+
				"</div>"+
			"</div>"+
		"{{/each}}");


	var boxes = new can.List(),
		Box = can.Map.extend({
			top: 0,
			left: 0,
			content: 0,
			count: 0,

			tick: function() {
				var count = this.attr('count') + 1;

				this.attr('count', count);
				this.attr('top', Math.sin(count / 10) * 10);
				this.attr('left', Math.cos(count / 10) * 10);
				this.attr('color', count % 255);
				this.attr('content', count % 100);
				this.attr('style', this.computeStyle());

			},

			computeStyle: function() {
				return 'top: ' + this.attr('top') + 'px; left: ' +  this.attr('left') +'px; background: rgb(0,0,' + this.attr('color') + ');';
			}
		});

	for(var i =0; i < 100; i++) {
		var box = new Box({ number: i });
		box.tick();
		boxes.push( box );
	}

	var map = new can.Map({boxes: boxes, start: runBenchmark});
	function render() {
		var frag = template(map);
		var div = document.createElement("div")
		document.body.appendChild(div)
		div.appendChild(frag)

		// Hack to get events to work for the demo since events are not working
		// overall yet.
	}

	var count = 0;


	var run = function(){
		can.batch.start();
		for(var n = 0 ; n < boxes.length; n++) {
			boxes[n].tick();
		}
		can.batch.stop();
	};

	var onmsg = onmessage;
	onmessage = function(ev){
		onmsg.call(this, ev);

		if(ev.data === "start") {
			runBenchmark();
		}
	};
	//$("#start").click(runBenchmark);

	function runBenchmark(){
		 loopCount = 0;
		 totalTime = 0;
		 benchmarkLoop(run);
	}

	window.timeout = null;
	window.totalTime = null;
	window.loopCount = null;
	window.benchmarkLoop = function(fn) {
		var startDate = new Date();
		fn();
		var endDate = new Date();
		totalTime += endDate - startDate;
		loopCount++;
		if (loopCount % 20 === 0) {
			map.attr({
				loopCount: loopCount,
				totalTime: totalTime,
				average: (totalTime / loopCount).toFixed(2)
			});
			//$('#timing').text('Performed ' + loopCount + ' iterations in ' + totalTime + ' ms (average ' + (totalTime / loopCount).toFixed(2) + ' ms per loop).');
		}
		if(loopCount < 1000) {
			timeout = setTimeout(function(){
				benchmarkLoop(fn);
			},1);
		}

	};

});
