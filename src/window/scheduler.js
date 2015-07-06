
module.exports = function(worker){
	var flushScheduled = false;
	var events = [];

	var scheduler = {
		scheduleEvent: function(event){
			events.push(event);

			scheduler.scheduleFlush();
		},

		scheduleFlush: function(){
			if(!flushScheduled) {
				flushScheduled = true;

				requestAnimationFrame(scheduler.flush);
			}
		},

		flush: function(){
			worker.postMessage(events);

			events.length = 0;
			flushScheduled = false;
		}
	};

	return scheduler;
};
