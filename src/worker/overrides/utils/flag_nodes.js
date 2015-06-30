
module.exports = function(node){
	var cur = element;

	while(cur) {
		if(cur.nodeType === 1) {
			cur.inDocument = true;
		}
		var child = cur.firstChild;
		while(child) {
			markAsInDocument(child);

			child = child.nextSibling;
		}
		cur = cur.nextSibling;
	}
};
