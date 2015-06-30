
module.exports = markAsInDocument;

function markAsInDocument(element){
	var cur = element;

	while(cur) {
		if(cur.nodeType === 1) {
			cur.inDocument = true;
			if(cur.parentNode && cur.parentNode.dontDiff){
				cur.dontDiff = true;
			}
		}
		var child = cur.firstChild;
		while(child) {
			markAsInDocument(child);

			child = child.nextSibling;
		}
		cur = cur.nextSibling;
	}
}
