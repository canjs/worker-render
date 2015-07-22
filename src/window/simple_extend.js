module.exports = extend;

// A simple extend that doesn't go deep
function extend(a, b){
	var p, type;
	for(p in b) {
		type = typeof b[p];
		if(type !== "object" && type !== "function") {
			a[p] = b[p];
		}
	}
	return a;
}
