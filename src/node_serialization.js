var NodeProp = require("./node_prop");

exports.serialize = nodeToObject;

exports.deserialize = objectToNode;

function nodeToObject(node){
	var objNode = [], i;

	if (node.nodeType === 3) {
		objNode[NodeProp.TEXT] = node.nodeValue;
	} else if (node.nodeType === 8) {
		objNode[NodeProp.COMMENT] = node.data;
	} else {
		objNode[NodeProp.NODE_NAME] = node.nodeName;
		if (node.attributes && node.attributes.length > 0) {
			objNode[NodeProp.ATTRIBUTES] = [];
			for (i = 0; i < node.attributes.length; i++) {
				objNode[NodeProp.ATTRIBUTES].push([node.attributes[i].name, node.attributes[i].value]);
			}
		}
		var cnlen = childNodesLength(node.childNodes);
		if (node.childNodes && cnlen > 0) {
			objNode[NodeProp.CHILD_NODES] = [];
			for (i = 0; i < cnlen; i++) {
				objNode[NodeProp.CHILD_NODES].push(nodeToObject(node.childNodes.item(i)));
			}
		}
		if (node.value) {
			objNode[NodeProp.VALUE] = node.value;
		}
		if (node.checked) {
			objNode[NodeProp.CHECKED] = node.checked;
		}
		if (node.selected) {
			objNode[NodeProp.SELECTED] = node.selected;
		}
		if(node.__events) {
			objNode[NodeProp.EVENTS] = [];
			var events = Object.keys(node.__events);
			for(i = 0; i < events.length; i++) {
				objNode[NodeProp.EVENTS].push(events[i]);
			}
		}
	}
	return objNode;
}


function objectToNode(objNode, insideSvg, diffOptions) {
	if(!objNode) {
		return objNode;
	}

	var node, i;
	if (objNode.hasOwnProperty(NodeProp.TEXT)) {
		node = document.createTextNode(objNode[NodeProp.TEXT]);
	} else if (objNode.hasOwnProperty(NodeProp.COMMENT)) {
		node = document.createComment(objNode[COMMENT]);
	} else {
		if (objNode[NodeProp.NODE_NAME] === 'svg' || insideSvg) {
			node = document.createElementNS('http://www.w3.org/2000/svg', objNode[NodeProp.NODE_NAME]);
			insideSvg = true;
		} else {
			var nodeName = objNode[NodeProp.NODE_NAME];
			node = nodeName === "#document-fragment" ? document.createDocumentFragment() : document.createElement(nodeName);
		}
		if (objNode[NodeProp.ATTRIBUTES]) {
			for (i = 0; i < objNode[NodeProp.ATTRIBUTES].length; i++) {
				node.setAttribute(objNode[NodeProp.ATTRIBUTES][i][0], objNode[NodeProp.ATTRIBUTES][i][1]);
			}
		}
		if (objNode[NodeProp.CHILD_NODES]) {
			for (i = 0; i < objNode[NodeProp.CHILD_NODES].length; i++) {
				node.appendChild(objectToNode(objNode[NodeProp.CHILD_NODES][i], insideSvg, diffOptions));
			}
		}
		if (objNode[NodeProp.VALUE]) {
			node.value = objNode[NodeProp.VALUE];
		}
		if (objNode[NodeProp.CHECKED]) {
			node.checked = objNode[NodeProp.CHECKED];
		}
		if (objNode[NodeProp.SELECTED]) {
			node.selected = objNode[NodeProp.SELECTED];
		}
		if (objNode[NodeProp.EVENTS]) {
			node.__events = {};
			objNode[NodeProp.EVENTS].forEach(function(evName){
				node.__events[evName] = true;
				if(diffOptions && diffOptions.eventHandler) {
					node.addEventListener(evName, diffOptions.eventHandler);
				}
			});

		}
	}
	return node;
}

function childNodesLength(childNodes){
	var len = 0, cur = childNodes.node.firstChild;
	while(cur) {
		len++;
		cur = cur.nextSibling;
	}
	return len;
}

window.childNodes = function(cn){
	var arr = [], cur = cn.node.firstChild;
	while(cur) {
		arr.push(cur);
		cur = cur.nextSibling;
	}
	return arr;

};

window.childNodesLength = childNodesLength;
