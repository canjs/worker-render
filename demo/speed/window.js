
var worker = new Worker("worker2.js");

var start;

worker.onmessage = function(ev){
	var ab = ev.data;
	var str = ab2str(ab);
	var data = JSON.parse(str);

	if(!start) {
		start = new Date(data.start);
	}

	if(data.end) {
		var end = new Date();
		console.log(end - start);
	}
};

function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}
