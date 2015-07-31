/*[global-shim-start]*/
(function (exports, global){
	var origDefine = global.define;

	var get = function(name){
		var parts = name.split("."),
			cur = global,
			i;
		for(i = 0 ; i < parts.length; i++){
			if(!cur) {
				break;
			}
			cur = cur[parts[i]];
		}
		return cur;
	};
	var modules = (global.define && global.define.modules) ||
		(global._define && global._define.modules) || {};
	var ourDefine = global.define = function(moduleName, deps, callback){
		var module;
		if(typeof deps === "function") {
			callback = deps;
			deps = [];
		}
		var args = [],
			i;
		for(i =0; i < deps.length; i++) {
			args.push( exports[deps[i]] ? get(exports[deps[i]]) : ( modules[deps[i]] || get(deps[i]) )  );
		}
		// CJS has no dependencies but 3 callback arguments
		if(!deps.length && callback.length) {
			module = { exports: {} };
			var require = function(name) {
				return exports[name] ? get(exports[name]) : modules[name];
			};
			args.push(require, module.exports, module);
		}
		// Babel uses the exports and module object.
		else if(!args[0] && deps[0] === "exports") {
			module = { exports: {} };
			args[0] = module.exports;
			if(deps[1] === "module") {
				args[1] = module;
			}
		} else if(!args[0] && deps[0] === "module") {
			args[0] = { id: moduleName };
		}

		global.define = origDefine;
		var result = callback ? callback.apply(null, args) : undefined;
		global.define = ourDefine;

		// Favor CJS module.exports over the return value
		modules[moduleName] = module && module.exports ? module.exports : result;
	};
	global.define.orig = origDefine;
	global.define.modules = modules;
	global.define.amd = true;
	ourDefine("@loader", [], function(){
		// shim for @@global-helpers
		var noop = function(){};
		return {
			get: function(){
				return { prepareGlobal: noop, retrieveGlobal: noop };
			},
			global: global,
			__exec: function(__load){
				eval("(function() { " + __load.source + " \n }).call(global);");
			}
		};
	});
})({"jquery":"jQuery","micro-location@0.1.4#lib/micro-location":"Location"},window)
/*node-route@1.0.1#dom-id*/
define('node-route@1.0.1#dom-id', function (require, exports, module) {
    var slice = [].slice;
    var nodeCache = exports.nodeCache = {};
    var nodeTree = exports.nodeTree = [];
    var SEPARATOR = '.';
    var rootNode = exports.rootNode = function (root) {
            if (!root) {
                return document.documentElement;
            }
            return root.documentElement || root;
        };
    var cache = function (node, routeInfo) {
        node.__routeInfo = routeInfo;
        nodeCache[routeInfo.id] = node;
    };
    var getID = exports.getID = function (node) {
            var id = getCachedID(node);
            if (!id) {
                var routeInfo = getRoute(node);
                id = routeInfo.id;
            }
            return id;
        };
    var getCachedInfo = exports.getCachedInfo = function (node) {
            return node.__routeInfo;
        };
    var getCachedID = exports.getCachedID = function (node) {
            var info = getCachedInfo(node);
            return info && info.id;
        };
    var getIndex = exports.getIndex = function (id) {
            return +id.substr(id.lastIndexOf('.') + 1);
        };
    function getBranch(index, element, parentBranch) {
        parentBranch = parentBranch || nodeTree;
        var branch = parentBranch[index];
        if (!branch) {
            branch = parentBranch[index] = [];
            branch.element = element;
        }
        return branch;
    }
    exports.indexOfParent = function indexOfParent(parent, node) {
        var index = -1;
        var child = parent.firstChild;
        while (child) {
            index++;
            if (child === node) {
                break;
            }
            child = child.nextSibling;
        }
        return index;
    };
    function getRoute(node) {
        var id = '';
        var parent = node.parentNode;
        var index = -1;
        if (!parent) {
            return { id: '0' };
        }
        var child = parent.firstChild;
        while (child) {
            index++;
            if (child === node) {
                break;
            }
            child = child.nextSibling;
        }
        var parentInfo = parent.nodeType === 9 ? { id: '' } : getCachedInfo(parent) || getRoute(parent);
        var parentId = parentInfo.id;
        id = (parentId ? parentId + SEPARATOR : '') + index;
        var routeInfo = {
                id: id,
                branch: getBranch(index, node, parentInfo.branch)
            };
        cache(node, routeInfo);
        return routeInfo;
    }
    var findNode = exports.findNode = function (id, root) {
            var node = rootNode(root);
            var ids = id.split('.');
            var idIndex = 1;
            while (node) {
                var currentIndex = ids[idIndex];
                if (currentIndex == null) {
                    break;
                }
                var nodeIndex = 0;
                var child = node.firstChild;
                while (child) {
                    if (nodeIndex == currentIndex) {
                        node = child;
                        break;
                    }
                    nodeIndex++;
                    child = child.nextSibling;
                }
                idIndex++;
                node = child;
            }
            return node;
        };
    exports.getNode = function (id, root) {
        var node;
        node = nodeCache[id];
        if (node && !root) {
            return node;
        }
        node = findNode(id, root);
        if (!root) {
            cache(node, { id: id });
        }
        return node;
    };
    exports.purgeID = function (id) {
        var node = nodeCache[id];
        if (node) {
            delete node.__routeInfo;
            delete nodeCache[id];
        }
    };
    exports.purgeNode = function (node) {
        var routeInfo = getCachedInfo(node);
        if (!routeInfo)
            return;
        var parentRouteInfo = getCachedInfo(node.parentNode);
        if (parentRouteInfo) {
            var parentBranch = parentRouteInfo.branch;
            var index = getIndex(routeInfo.id);
            parentBranch.splice(index, 1);
            routeInfo.branch.length = 0;
            nodeCache = {};
        }
    };
    exports.purgeSiblings = function (node) {
        var routeInfo = getCachedInfo(node);
        if (!routeInfo)
            return;
        var parentRouteInfo = getCachedInfo(node.parentNode);
        if (parentRouteInfo) {
            var parentBranch = parentRouteInfo.branch;
            var index = getIndex(routeInfo.id);
            var staleBranch = false;
            parentBranch.forEach(function (branch, i) {
                if (i > index) {
                    staleBranch = true;
                    return false;
                }
            });
            if (staleBranch) {
                parentBranch.length = 0;
                parentBranch[index] = routeInfo.branch;
            }
        }
    };
});
/*dom-patch@1.0.0#node_prop*/
define('dom-patch@1.0.0#node_prop', function (require, exports, module) {
    module.exports = {
        ROUTE: 0,
        TEXT: 1,
        COMMENT: 2,
        NODE_NAME: 3,
        ATTRIBUTES: 4,
        CHILD_NODES: 5,
        VALUE: 6,
        CHECKED: 7,
        SELECTED: 8,
        EVENTS: 9,
        CLASS: 10
    };
});
/*dom-patch@1.0.0#setattribute*/
define('dom-patch@1.0.0#setattribute', function (require, exports, module) {
    module.exports = setAttribute;
    var invalidAttributes = {
            '[': true,
            '#': true,
            '(': true
        };
    function setAttribute(element, name, value) {
        var firstChar = name[0];
        if (invalidAttributes[firstChar]) {
            return setByCloning(element, name, value);
        }
        return element.setAttribute(name, value);
    }
    var dummyEl = function () {
        var el = document.createElement('div');
        dummyEl = function () {
            return el;
        };
        return el;
    };
    function setByCloning(element, name, value) {
        var el = dummyEl();
        el.innerHTML = '<span ' + name + '="' + value + '"></span>';
        var attr = el.firstChild.attributes[0];
        el.firstChild.removeAttributeNode(attr);
        el.setAttributeNode(attr);
    }
});
/*dom-patch@1.0.0#node_serialization*/
define('dom-patch@1.0.0#node_serialization', function (require, exports, module) {
    var NodeProp = require('dom-patch@1.0.0#node_prop');
    var setAttribute = require('dom-patch@1.0.0#setattribute');
    exports.serialize = nodeToObject;
    exports.deserialize = objectToNode;
    function nodeToObject(node) {
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
                    objNode[NodeProp.ATTRIBUTES].push([
                        node.attributes[i].name,
                        node.attributes[i].value
                    ]);
                }
            }
            var cnlen = childNodesLength(node);
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
            if (node.className) {
                objNode[NodeProp.CLASS] = node.className;
            }
            if (node.__events) {
                objNode[NodeProp.EVENTS] = [];
                var events = Object.keys(node.__events);
                for (i = 0; i < events.length; i++) {
                    objNode[NodeProp.EVENTS].push(events[i]);
                }
            }
        }
        return objNode;
    }
    function objectToNode(objNode, insideSvg, diffOptions) {
        if (!objNode) {
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
                node = nodeName === '#document-fragment' ? document.createDocumentFragment() : document.createElement(nodeName);
            }
            if (objNode[NodeProp.ATTRIBUTES]) {
                for (i = 0; i < objNode[NodeProp.ATTRIBUTES].length; i++) {
                    setAttribute(node, objNode[NodeProp.ATTRIBUTES][i][0], objNode[NodeProp.ATTRIBUTES][i][1]);
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
            if (objNode[NodeProp.CLASS]) {
                node.className = objNode[NodeProp.CLASS];
            }
            if (objNode[NodeProp.EVENTS]) {
                node.__events = {};
                objNode[NodeProp.EVENTS].forEach(function (evName) {
                    node.__events[evName] = true;
                    if (diffOptions && diffOptions.eventHandler) {
                        node.addEventListener(evName, diffOptions.eventHandler);
                    }
                });
            }
        }
        return node;
    }
    function childNodesLength(node) {
        if ('length' in node.childNodes) {
            return node.childNodes.length;
        }
        var len = 0, cur = node.childNodes.node.firstChild;
        while (cur) {
            len++;
            cur = cur.nextSibling;
        }
        return len;
    }
});
/*dom-patch@1.0.0#apply/apply*/
define('dom-patch@1.0.0#apply/apply', function (require, exports, module) {
    var deserialize = require('dom-patch@1.0.0#node_serialization').deserialize;
    var nodeRoute = require('node-route@1.0.1#dom-id');
    var setAttribute = require('dom-patch@1.0.0#setattribute');
    module.exports = applyPatches;
    var handlers = {
            event: function (patch, document, patchOptions) {
                var node = nodeRoute.findNode(patch.route);
				if(!node) return;
                node[patch.action](patch.event, patchOptions.eventHandler);
            },
            history: function (patch) {
                history[patch.action].apply(history, patch.args);
            },
            text: function (patch) {
                var node = nodeRoute.findNode(patch.route);
                node.nodeValue = patch.value;
            },
            attribute: function (patch) {
                var el = nodeRoute.findNode(patch.route);
                setAttribute(el, patch.attr, patch.value);
            },
            prop: function (patch) {
                var el = nodeRoute.findNode(patch.route);
                if (!el) {
                    return;
                }
                el[patch.prop] = patch.value;
            },
            globalEvent: function (patch, document, patchOptions) {
                var fn = patch.action === 'add' ? 'addEventListener' : 'removeEventListener';
                window[fn](patch.name, patchOptions.globalEventHandler);
            },
            insert: function (patch, document, patchOptions) {
                var node = deserialize(patch.node, false, patchOptions);
                var parent = nodeRoute.findNode(patch.route);
                if (patch.ref) {
                    var ref = nodeRoute.findNode('0.' + patch.ref, parent);
                    parent.insertBefore(node, ref);
                } else {
                    parent.appendChild(node);
                }
            },
            remove: function (patch) {
                var parent = nodeRoute.findNode(patch.route);
                var node = nodeRoute.findNode(patch.child);
                if (!node) {
                    return;
                }
                parent.removeChild(node);
            }
        };
    function applyPatches(document, patches, patchOptions) {
        patchOptions = patchOptions || {};
        patches.forEach(function (patch) {
            var handler = handlers[patch.type];
            if (handler) {
                handler(patch, document, patchOptions);
            } else {
                console.error('Patch type', patch.type, 'not supported');
            }
        });
    }
});
/*dom-patch@1.0.0#apply*/
define('dom-patch@1.0.0#apply', function (require, exports, module) {
    module.exports = require('dom-patch@1.0.0#apply/apply');
});
/*worker-render@1.1.5#simple_extend*/
define('worker-render@1.1.5#simple_extend', function (require, exports, module) {
    module.exports = extend;
    function extend(a, b) {
        var p, type;
        for (p in b) {
            type = typeof b[p];
            if (type !== 'object' && type !== 'function') {
                a[p] = b[p];
            }
        }
        return a;
    }
});
/*worker-render@1.1.5#window/event_handler*/
define('worker-render@1.1.5#window/event_handler', function (require, exports, module) {
    var extend = require('worker-render@1.1.5#simple_extend');
    var nodeRoute = require('node-route@1.0.1#dom-id');
    var valueSetters = {
            INPUT: function (ev, el) {
                if (el.type === 'checkbox') {
                    return {
                        checked: el.checked,
                        value: el.checked
                    };
                } else {
                    return { value: el.value };
                }
            },
            SELECT: function (ev, el) {
                return { value: el.value };
            }
        };
    var doPreventDefault = {
            click: true,
            submit: true
        };
    module.exports = function (worker) {
        var pendingEvents = {}, id = 0;
        var eventHandler = function (ev) {
            if (ev.defaultPrevented) {
                return;
            }
            var el = ev.target;
            var route = nodeRoute.getID(el);
            var values;
            if (valueSetters[el.tagName]) {
                values = valueSetters[el.tagName](ev, el);
            }
            var eventObject = extend({}, ev);
            extend(eventObject, {
                target: nodeRoute.getID(ev.target),
                currentTarget: nodeRoute.getID(ev.currentTarget)
            });
            if (doPreventDefault[ev.type]) {
                if (id < 100) {
                    id++;
                } else {
                    id = 0;
                }
                pendingEvents[id] = ev;
                ev.preventDefault();
            }
            worker.postMessage({
                type: 'event',
                route: route,
                event: eventObject,
                values: values,
                id: id
            });
        };
        eventHandler.acknowledge = acknowledge;
        function acknowledge(data) {
            var event = pendingEvents[data.id];
            delete pendingEvents[data.id];
            if (event && !data.defaultPrevented) {
                event.target.dispatchEvent(event);
            }
        }
        return eventHandler;
    };
});
/*worker-render@1.1.5#window/window*/
define('worker-render@1.1.5#window/window', function (require, exports, module) {
    var nodeRoute = require('node-route@1.0.1#dom-id');
    var applyPatches = require('dom-patch@1.0.0#apply');
    var makeEventHandler = require('worker-render@1.1.5#window/event_handler');
    var extend = require('worker-render@1.1.5#simple_extend');
    exports.updateWith = updateWith;
    function updateWith(worker) {
        var eventHandler = makeEventHandler(worker);
        var globalEventHandler = function (ev) {
            worker.postMessage({
                type: 'globalEvent',
                event: extend({}, ev)
            });
        };
        var handlers = { ack: eventHandler.acknowledge };
        var patchOptions = {
                globalEventHandler: globalEventHandler,
                eventHandler: eventHandler
            };
        worker.onmessage = function (ev) {
            if (ev.data === 'start') {
                worker.postMessage({
                    type: 'initial',
                    content: document.documentElement.innerHTML,
                    location: location.toString()
                });
                return;
            }
            var handler = handlers[ev.data.type];
            if (handler) {
                handler(ev.data);
                return;
            }
            var patches = ev.data;
            requestAnimationFrame(function () {
                applyPatches(document, patches, patchOptions);
            });
        };
    }
});
/*worker-render@1.1.5#window*/
define('worker-render@1.1.5#window', function (require, exports, module) {
    module.exports = require('worker-render@1.1.5#window/window');
});
/*worker-render@1.1.5#window/global*/
define('worker-render@1.1.5#window/global', function (require, exports, module) {
    window.windowRender = require('worker-render@1.1.5#window');
});
/*[global-shim-end]*/
(function (){
	window._define = window.define;
	window.define = window.define.orig;
})();
