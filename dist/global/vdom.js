/*[global-shim-start]*/
(function(exports, global, doEval){ // jshint ignore:line
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
				doEval(__load.source, global);
			}
		};
	});
}
)({"jquery":"jQuery","micro-location@0.1.4#lib/micro-location":"Location"},window,function(__$source__, __$global__) { // jshint ignore:line
	eval("(function() { " + __$source__ + " \n }).call(__$global__);");
}
)
/*can@2.3.23#util/can*/
define('can@2.3.23#util/can', [], function () {
    var glbl = typeof window !== 'undefined' ? window : typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope ? self : global;
    var can = {};
    if (typeof GLOBALCAN === 'undefined' || GLOBALCAN !== false) {
        glbl.can = can;
    }
    can.global = glbl;
    can.k = function () {
    };
    can.isDeferred = function (obj) {
        if (!!can.dev) {
            can.dev.warn('can.isDeferred: this function is deprecated and will be removed in a future release. can.isPromise replaces the functionality of can.isDeferred.');
        }
        return obj && typeof obj.then === 'function' && typeof obj.pipe === 'function';
    };
    can.isPromise = function (obj) {
        return !!obj && (window.Promise && obj instanceof Promise || can.isFunction(obj.then) && (can.List === undefined || !(obj instanceof can.List)));
    };
    can.isMapLike = function (obj) {
        return can.Map && (obj instanceof can.Map || obj && obj.___get);
    };
    var cid = 0;
    can.cid = function (object, name) {
        if (!object._cid) {
            cid++;
            object._cid = (name || '') + cid;
        }
        return object._cid;
    };
    can.VERSION = '@EDGE';
    can.simpleExtend = function (d, s) {
        for (var prop in s) {
            d[prop] = s[prop];
        }
        return d;
    };
    can.last = function (arr) {
        return arr && arr[arr.length - 1];
    };
    can.isDOM = function (el) {
        return (el.ownerDocument || el) === can.global.document;
    };
    can.childNodes = function (node) {
        var childNodes = node.childNodes;
        if ('length' in childNodes) {
            return childNodes;
        } else {
            var cur = node.firstChild;
            var nodes = [];
            while (cur) {
                nodes.push(cur);
                cur = cur.nextSibling;
            }
            return nodes;
        }
    };
    var protoBind = Function.prototype.bind;
    if (protoBind) {
        can.proxy = function (fn, context) {
            return protoBind.call(fn, context);
        };
    } else {
        can.proxy = function (fn, context) {
            return function () {
                return fn.apply(context, arguments);
            };
        };
    }
    can.frag = function (item, doc) {
        var document = doc || can.document || can.global.document;
        var frag;
        if (!item || typeof item === 'string') {
            frag = can.buildFragment(item == null ? '' : '' + item, document);
            if (!frag.childNodes.length) {
                frag.appendChild(document.createTextNode(''));
            }
            return frag;
        } else if (item.nodeType === 11) {
            return item;
        } else if (typeof item.nodeType === 'number') {
            frag = document.createDocumentFragment();
            frag.appendChild(item);
            return frag;
        } else if (typeof item.length === 'number') {
            frag = document.createDocumentFragment();
            can.each(item, function (item) {
                frag.appendChild(can.frag(item));
            });
            if (!can.childNodes(frag).length) {
                frag.appendChild(document.createTextNode(''));
            }
            return frag;
        } else {
            frag = can.buildFragment('' + item, document);
            if (!can.childNodes(frag).length) {
                frag.appendChild(document.createTextNode(''));
            }
            return frag;
        }
    };
    can.scope = can.viewModel = function (el, attr, val) {
        el = can.$(el);
        var scope = can.data(el, 'scope') || can.data(el, 'viewModel');
        if (!scope) {
            scope = new can.Map();
            can.data(el, 'scope', scope);
            can.data(el, 'viewModel', scope);
        }
        switch (arguments.length) {
        case 0:
        case 1:
            return scope;
        case 2:
            return scope.attr(attr);
        default:
            scope.attr(attr, val);
            return el;
        }
    };
    var parseURI = function (url) {
        var m = String(url).replace(/^\s+|\s+$/g, '').match(/^([^:\/?#]+:)?(\/\/(?:[^:@]*(?::[^:@]*)?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);
        return m ? {
            href: m[0] || '',
            protocol: m[1] || '',
            authority: m[2] || '',
            host: m[3] || '',
            hostname: m[4] || '',
            port: m[5] || '',
            pathname: m[6] || '',
            search: m[7] || '',
            hash: m[8] || ''
        } : null;
    };
    can.joinURIs = function (base, href) {
        function removeDotSegments(input) {
            var output = [];
            input.replace(/^(\.\.?(\/|$))+/, '').replace(/\/(\.(\/|$))+/g, '/').replace(/\/\.\.$/, '/../').replace(/\/?[^\/]*/g, function (p) {
                if (p === '/..') {
                    output.pop();
                } else {
                    output.push(p);
                }
            });
            return output.join('').replace(/^\//, input.charAt(0) === '/' ? '/' : '');
        }
        href = parseURI(href || '');
        base = parseURI(base || '');
        return !href || !base ? null : (href.protocol || base.protocol) + (href.protocol || href.authority ? href.authority : base.authority) + removeDotSegments(href.protocol || href.authority || href.pathname.charAt(0) === '/' ? href.pathname : href.pathname ? (base.authority && !base.pathname ? '/' : '') + base.pathname.slice(0, base.pathname.lastIndexOf('/') + 1) + href.pathname : base.pathname) + (href.protocol || href.authority || href.pathname ? href.search : href.search || base.search) + href.hash;
    };
    can['import'] = function (moduleName, parentName) {
        var deferred = new can.Deferred();
        if (typeof window.System === 'object' && can.isFunction(window.System['import'])) {
            window.System['import'](moduleName, { name: parentName }).then(can.proxy(deferred.resolve, deferred), can.proxy(deferred.reject, deferred));
        } else if (window.define && window.define.amd) {
            window.require([moduleName], function (value) {
                deferred.resolve(value);
            });
        } else if (window.steal) {
            steal.steal(moduleName, function (value) {
                deferred.resolve(value);
            });
        } else if (window.require) {
            deferred.resolve(window.require(moduleName));
        } else {
            deferred.resolve();
        }
        return deferred.promise();
    };
    can.__observe = function () {
    };
    can.isNode = typeof process === 'object' && {}.toString.call(process) === '[object process]';
    can.isBrowserWindow = typeof window !== 'undefined' && typeof document !== 'undefined' && typeof SimpleDOM === 'undefined';
    can.isWebWorker = typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope;
    return can;
});
/*can-simple-dom@0.3.0#simple-dom/document/node*/
define('can-simple-dom@0.3.0#simple-dom/document/node', [
    'exports',
    'module'
], function (exports, module) {
    'use strict';
    function Node(nodeType, nodeName, nodeValue, ownerDocument) {
        this.nodeType = nodeType;
        this.nodeName = nodeName;
        this.nodeValue = nodeValue;
        this.ownerDocument = ownerDocument;
        this.childNodes = new ChildNodes(this);
        this.parentNode = null;
        this.previousSibling = null;
        this.nextSibling = null;
        this.firstChild = null;
        this.lastChild = null;
    }
    Node.prototype._cloneNode = function () {
        return new Node(this.nodeType, this.nodeName, this.nodeValue, this.ownerDocument);
    };
    Node.prototype.cloneNode = function (deep) {
        var node = this._cloneNode();
        if (deep) {
            var child = this.firstChild, nextChild = child;
            while (nextChild) {
                nextChild = child.nextSibling;
                node.appendChild(child.cloneNode(true));
                child = nextChild;
            }
        }
        return node;
    };
    var nodeAppendChild = Node.prototype.appendChild = function (node) {
        if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
            insertFragment(node, this, this.lastChild, null);
            return node;
        }
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
        node.parentNode = this;
        var refNode = this.lastChild;
        if (refNode === null) {
            this.firstChild = node;
            this.lastChild = node;
        } else {
            node.previousSibling = refNode;
            refNode.nextSibling = node;
            this.lastChild = node;
        }
        return node;
    };
    function insertFragment(fragment, newParent, before, after) {
        if (!fragment.firstChild) {
            return;
        }
        var firstChild = fragment.firstChild;
        var lastChild = firstChild;
        var node = firstChild;
        firstChild.previousSibling = before;
        if (before) {
            before.nextSibling = firstChild;
        } else {
            newParent.firstChild = firstChild;
        }
        while (node) {
            node.parentNode = newParent;
            lastChild = node;
            node = node.nextSibling;
        }
        lastChild.nextSibling = after;
        if (after) {
            after.previousSibling = lastChild;
        } else {
            newParent.lastChild = lastChild;
        }
        fragment.firstChild = null;
        fragment.lastChild = null;
    }
    var nodeInsertBefore = Node.prototype.insertBefore = function (node, refNode) {
        if (refNode == null) {
            return this.appendChild(node);
        }
        if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
            insertFragment(node, this, refNode ? refNode.previousSibling : null, refNode);
            return node;
        }
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
        node.parentNode = this;
        var previousSibling = refNode.previousSibling;
        if (previousSibling) {
            previousSibling.nextSibling = node;
            node.previousSibling = previousSibling;
        }
        refNode.previousSibling = node;
        node.nextSibling = refNode;
        if (this.firstChild === refNode) {
            this.firstChild = node;
        }
        return node;
    };
    var nodeRemoveChild = Node.prototype.removeChild = function (refNode) {
        if (this.firstChild === refNode) {
            this.firstChild = refNode.nextSibling;
        }
        if (this.lastChild === refNode) {
            this.lastChild = refNode.previousSibling;
        }
        if (refNode.previousSibling) {
            refNode.previousSibling.nextSibling = refNode.nextSibling;
        }
        if (refNode.nextSibling) {
            refNode.nextSibling.previousSibling = refNode.previousSibling;
        }
        refNode.parentNode = null;
        refNode.nextSibling = null;
        refNode.previousSibling = null;
    };
    Node.prototype.replaceChild = function (newChild, oldChild) {
        nodeInsertBefore.call(this, newChild, oldChild);
        nodeRemoveChild.call(this, oldChild);
        return oldChild;
    };
    Node.prototype.addEventListener = function () {
    };
    Node.prototype.removeEventListener = function () {
    };
    if (Object.defineProperty) {
        Object.defineProperty(Node.prototype, 'textContent', {
            get: function get() {
                var child = this.firstChild;
                if (child) {
                    return child.nodeType === 3 ? child.nodeValue : '';
                }
                return '';
            },
            set: function set(val) {
                while (this.firstChild) {
                    nodeRemoveChild.call(this, this.firstChild);
                }
                var tn = this.ownerDocument.createTextNode(val);
                nodeAppendChild.call(this, tn);
            }
        });
    }
    Node.ELEMENT_NODE = 1;
    Node.ATTRIBUTE_NODE = 2;
    Node.TEXT_NODE = 3;
    Node.CDATA_SECTION_NODE = 4;
    Node.ENTITY_REFERENCE_NODE = 5;
    Node.ENTITY_NODE = 6;
    Node.PROCESSING_INSTRUCTION_NODE = 7;
    Node.COMMENT_NODE = 8;
    Node.DOCUMENT_NODE = 9;
    Node.DOCUMENT_TYPE_NODE = 10;
    Node.DOCUMENT_FRAGMENT_NODE = 11;
    Node.NOTATION_NODE = 12;
    function ChildNodes(node) {
        this.node = node;
    }
    ChildNodes.prototype.item = function (index) {
        var child = this.node.firstChild;
        for (var i = 0; child && index !== i; i++) {
            child = child.nextSibling;
        }
        return child;
    };
    module.exports = Node;
});
/*can-simple-dom@0.3.0#simple-dom/document/element*/
define('can-simple-dom@0.3.0#simple-dom/document/element', [
    'exports',
    'module',
    'can-simple-dom@0.3.0#simple-dom/document/node'
], function (exports, module, _node) {
    'use strict';
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
    }
    var _Node = _interopRequireDefault(_node);
    var attrSpecial = {
        'class': function _class(element, value) {
            element._className = value;
        }
    };
    function Element(tagName, ownerDocument) {
        tagName = tagName.toUpperCase();
        this.nodeConstructor(1, tagName, null, ownerDocument);
        this.style = new Style(this);
        this.attributes = [];
        this.tagName = tagName;
    }
    Element.prototype = Object.create(_Node['default'].prototype);
    Element.prototype.constructor = Element;
    Element.prototype.nodeConstructor = _Node['default'];
    Element.prototype._cloneNode = function () {
        var node = this.ownerDocument.createElement(this.tagName);
        node.attributes = this.attributes.map(function (attr) {
            return {
                name: attr.name,
                value: attr.value,
                specified: attr.specified
            };
        });
        return node;
    };
    Element.prototype.getAttribute = function (_name) {
        var attributes = this.attributes;
        var name = _name.toLowerCase();
        var attr;
        for (var i = 0, l = attributes.length; i < l; i++) {
            attr = attributes[i];
            if (attr.name === name) {
                return attr.value;
            }
        }
        return null;
    };
    Element.prototype.setAttribute = function () {
        return this._setAttribute.apply(this, arguments);
    };
    Element.prototype._setAttribute = function (_name, value) {
        var attributes = this.attributes;
        var name = _name.toLowerCase();
        var attr;
        for (var i = 0, l = attributes.length; i < l; i++) {
            attr = attributes[i];
            if (attr.name === name) {
                attr.value = value;
                return;
            }
        }
        attributes.push({
            name: name,
            value: value,
            specified: true
        });
        attributes[name] = value;
        var special = attrSpecial[name];
        if (special) {
            special(this, value);
        }
    };
    Element.prototype.removeAttribute = function (name) {
        var attributes = this.attributes;
        for (var i = 0, l = attributes.length; i < l; i++) {
            var attr = attributes[i];
            if (attr.name === name) {
                attributes.splice(i, 1);
                delete attributes[name];
                return;
            }
        }
    };
    Element.prototype.getElementsByTagName = function (name) {
        name = name.toUpperCase();
        var elements = [];
        var cur = this.firstChild;
        while (cur) {
            if (cur.nodeType === _Node['default'].ELEMENT_NODE) {
                if (cur.nodeName === name || name === '*') {
                    elements.push(cur);
                }
                elements.push.apply(elements, cur.getElementsByTagName(name));
            }
            cur = cur.nextSibling;
        }
        return elements;
    };
    Element.prototype.contains = function (child) {
        child = child.parentNode;
        while (child) {
            if (child === this) {
                return true;
            }
            child = child.parentNode;
        }
        return false;
    };
    Element.prototype.getElementById = function (id) {
        var cur = this.firstChild, child;
        while (cur) {
            if (cur.attributes && cur.attributes.length) {
                var attr;
                for (var i = 0, len = cur.attributes.length; i < len; i++) {
                    attr = cur.attributes[i];
                    if (attr.name === 'id' && attr.value === id) {
                        return cur;
                    }
                }
            }
            if (cur.getElementById) {
                child = cur.getElementById(id);
                if (child) {
                    return child;
                }
            }
            cur = cur.nextSibling;
        }
    };
    function Style(node) {
        this.__node = node;
    }
    if (Object.defineProperty) {
        Object.defineProperty(Element.prototype, 'className', {
            get: function get() {
                return this._className;
            },
            set: function set(val) {
                this._setAttribute('class', val);
                this._className = val;
            }
        });
        Object.defineProperty(Style.prototype, 'cssText', {
            get: function get() {
                return this.__node.getAttribute('style') || '';
            },
            set: function set(val) {
                this.__node._setAttribute('style', val);
            }
        });
        Object.defineProperty(Element.prototype, 'innerHTML', {
            get: function get() {
                var html = '';
                var cur = this.firstChild;
                while (cur) {
                    html += this.ownerDocument.__serializer.serialize(cur);
                    cur = cur.nextSibling;
                }
                return html;
            },
            set: function set(html) {
                this.lastChild = this.firstChild = null;
                var fragment;
                if (this.nodeName === 'SCRIPT' || this.nodeName === 'STYLE') {
                    fragment = this.ownerDocument.createTextNode(html);
                } else {
                    fragment = this.ownerDocument.__parser.parse(html);
                }
                this.appendChild(fragment);
            }
        });
        Object.defineProperty(Element.prototype, 'outerHTML', {
            get: function get() {
                return this.ownerDocument.__serializer.serialize(this);
            },
            set: function set(html) {
                this.parentNode.replaceChild(this.ownerDocument.__parser.parse(html), this);
            }
        });
    }
    module.exports = Element;
});
/*can-simple-dom@0.3.0#simple-dom/document/text*/
define('can-simple-dom@0.3.0#simple-dom/document/text', [
    'exports',
    'module',
    'can-simple-dom@0.3.0#simple-dom/document/node'
], function (exports, module, _node) {
    'use strict';
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
    }
    var _Node = _interopRequireDefault(_node);
    function Text(text, ownerDocument) {
        this.nodeConstructor(3, '#text', text, ownerDocument);
    }
    Text.prototype._cloneNode = function () {
        return this.ownerDocument.createTextNode(this.nodeValue);
    };
    Text.prototype = Object.create(_Node['default'].prototype);
    Text.prototype.constructor = Text;
    Text.prototype.nodeConstructor = _Node['default'];
    module.exports = Text;
});
/*can-simple-dom@0.3.0#simple-dom/document/comment*/
define('can-simple-dom@0.3.0#simple-dom/document/comment', [
    'exports',
    'module',
    'can-simple-dom@0.3.0#simple-dom/document/node'
], function (exports, module, _node) {
    'use strict';
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
    }
    var _Node = _interopRequireDefault(_node);
    function Comment(text, ownerDocument) {
        this.nodeConstructor(8, '#comment', text, ownerDocument);
    }
    Comment.prototype._cloneNode = function () {
        return this.ownerDocument.createComment(this.nodeValue);
    };
    Comment.prototype = Object.create(_Node['default'].prototype);
    Comment.prototype.constructor = Comment;
    Comment.prototype.nodeConstructor = _Node['default'];
    module.exports = Comment;
});
/*can-simple-dom@0.3.0#simple-dom/document/document-fragment*/
define('can-simple-dom@0.3.0#simple-dom/document/document-fragment', [
    'exports',
    'module',
    'can-simple-dom@0.3.0#simple-dom/document/node'
], function (exports, module, _node) {
    'use strict';
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
    }
    var _Node = _interopRequireDefault(_node);
    function DocumentFragment(ownerDocument) {
        this.nodeConstructor(11, '#document-fragment', null, ownerDocument);
    }
    DocumentFragment.prototype._cloneNode = function () {
        return this.ownerDocument.createDocumentFragment();
    };
    DocumentFragment.prototype = Object.create(_Node['default'].prototype);
    DocumentFragment.prototype.constructor = DocumentFragment;
    DocumentFragment.prototype.nodeConstructor = _Node['default'];
    module.exports = DocumentFragment;
});
/*micro-location@0.1.5#lib/micro-location*/
function Location() {
    this.init.apply(this, arguments);
}
Location.prototype = {
    init: function (protocol, host, hostname, port, pathname, search, hash) {
        this.protocol = protocol;
        this.host = host;
        this.hostname = hostname;
        this.port = port || '';
        this.pathname = pathname || '';
        this.search = search || '';
        this.hash = hash || '';
        if (protocol) {
            with (this)
                this.href = protocol + '//' + host + pathname + search + hash;
        } else if (host) {
            with (this)
                this.href = '//' + host + pathname + search + hash;
        } else {
            with (this)
                this.href = pathname + search + hash;
        }
    },
    params: function (name) {
        if (!this._params) {
            var params = {};
            var pairs = this.search.substring(1).split(/[;&]/);
            for (var i = 0, len = pairs.length; i < len; i++) {
                if (!pairs[i])
                    continue;
                var pair = pairs[i].split(/=/);
                var key = decodeURIComponent(pair[0].replace(/\+/g, '%20'));
                var val = decodeURIComponent(pair[1].replace(/\+/g, '%20'));
                if (!params[key])
                    params[key] = [];
                params[key].push(val);
            }
            this._params = params;
        }
        switch (typeof name) {
        case 'undefined':
            return this._params;
        case 'object':
            return this.build(name);
        }
        return this._params[name] ? this._params[name][0] : null;
    },
    build: function (params) {
        if (!params)
            params = this._params;
        var ret = new Location();
        var _search = this.search;
        if (params) {
            var search = [];
            for (var key in params)
                if (params.hasOwnProperty(key)) {
                    var val = params[key];
                    switch (typeof val) {
                    case 'object':
                        for (var i = 0, len = val.length; i < len; i++) {
                            search.push(encodeURIComponent(key) + '=' + encodeURIComponent(val[i]));
                        }
                        break;
                    default:
                        search.push(encodeURIComponent(key) + '=' + encodeURIComponent(val));
                    }
                }
            _search = '?' + search.join('&');
        }
        with (this)
            ret.init.apply(ret, [
                protocol,
                host,
                hostname,
                port,
                pathname,
                _search,
                hash
            ]);
        return ret;
    }
};
Location.regexp = new RegExp('^(?:(https?:)//(([^:/]+)(:[^/]+)?))?([^#?]*)(\\?[^#]*)?(#.*)?$');
Location.parse = function (string) {
    var matched = String(string).match(this.regexp);
    var ret = new Location();
    ret.init.apply(ret, matched.slice(1));
    return ret;
};
(function (root, factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = { Location: factory() };
    } else if (typeof define === 'function' && define.amd) {
        define('micro-location@0.1.5#lib/micro-location', [], function () {
            return { Location: factory() };
        });
    } else {
        root.Location = factory();
    }
}(this, function () {
    return Location;
}));
/*can-simple-dom@0.3.0#simple-dom/extend*/
define('can-simple-dom@0.3.0#simple-dom/extend', [
    'exports',
    'module'
], function (exports, module) {
    'use strict';
    module.exports = function (a, b) {
        for (var p in b) {
            a[p] = b[p];
        }
        return a;
    };
    ;
});
/*can-simple-dom@0.3.0#simple-dom/document/anchor-element*/
define('can-simple-dom@0.3.0#simple-dom/document/anchor-element', [
    'exports',
    'module',
    'can-simple-dom@0.3.0#simple-dom/document/element',
    'micro-location@0.1.5#lib/micro-location',
    'can-simple-dom@0.3.0#simple-dom/extend'
], function (exports, module, _element, _microLocation, _extend) {
    'use strict';
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
    }
    var _Element = _interopRequireDefault(_element);
    var _microLocation2 = _interopRequireDefault(_microLocation);
    var _extend2 = _interopRequireDefault(_extend);
    var Location = _microLocation2['default'].Location || _microLocation2['default'];
    function AnchorElement(tagName, ownerDocument) {
        this.elementConstructor(tagName, ownerDocument);
        (0, _extend2['default'])(this, Location.parse(''));
    }
    AnchorElement.prototype = Object.create(_Element['default'].prototype);
    AnchorElement.prototype.constructor = AnchorElement;
    AnchorElement.prototype.elementConstructor = _Element['default'];
    AnchorElement.prototype.setAttribute = function (_name, value) {
        _Element['default'].prototype.setAttribute.apply(this, arguments);
        if (_name.toLowerCase() === 'href') {
            (0, _extend2['default'])(this, Location.parse(value));
        }
    };
    module.exports = AnchorElement;
});
/*can-simple-dom@0.3.0#simple-dom/document*/
define('can-simple-dom@0.3.0#simple-dom/document', [
    'exports',
    'module',
    'can-simple-dom@0.3.0#simple-dom/document/node',
    'can-simple-dom@0.3.0#simple-dom/document/element',
    'can-simple-dom@0.3.0#simple-dom/document/text',
    'can-simple-dom@0.3.0#simple-dom/document/comment',
    'can-simple-dom@0.3.0#simple-dom/document/document-fragment',
    'can-simple-dom@0.3.0#simple-dom/document/anchor-element'
], function (exports, module, _documentNode, _documentElement, _documentText, _documentComment, _documentDocumentFragment, _documentAnchorElement) {
    'use strict';
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
    }
    var _Node = _interopRequireDefault(_documentNode);
    var _Element = _interopRequireDefault(_documentElement);
    var _Text = _interopRequireDefault(_documentText);
    var _Comment = _interopRequireDefault(_documentComment);
    var _DocumentFragment = _interopRequireDefault(_documentDocumentFragment);
    var _AnchorElement = _interopRequireDefault(_documentAnchorElement);
    function Document() {
        this.nodeConstructor(9, '#document', null, this);
        this.documentElement = new _Element['default']('html', this);
        this.body = new _Element['default']('body', this);
        this.documentElement.appendChild(this.body);
        this.appendChild(this.documentElement);
        var self = this;
        this.implementation = {
            createHTMLDocument: function createHTMLDocument(content) {
                var document = new Document();
                var frag = self.__parser.parse(content);
                var body = _Element['default'].prototype.getElementsByTagName.call(frag, 'body')[0];
                var head = _Element['default'].prototype.getElementsByTagName.call(frag, 'head')[0];
                if (!body && !head) {
                    document.body.appendChild(frag);
                } else {
                    if (body) {
                        document.documentElement.replaceChild(body, document.body);
                    }
                    if (head) {
                        document.documentElement.replaceChild(head, document.head);
                    }
                    document.documentElement.appendChild(frag);
                }
                document.__addSerializerAndParser(self.__serializer, self.__parser);
                return document;
            }
        };
    }
    Document.prototype = Object.create(_Node['default'].prototype);
    Document.prototype.constructor = Document;
    Document.prototype.nodeConstructor = _Node['default'];
    var specialElements = { 'a': _AnchorElement['default'] };
    Document.prototype.createElement = function (tagName) {
        var Special = specialElements[tagName.toLowerCase()];
        if (Special) {
            return new Special(tagName, this);
        }
        return new _Element['default'](tagName, this);
    };
    Document.prototype.createTextNode = function (text) {
        return new _Text['default'](text, this);
    };
    Document.prototype.createComment = function (text) {
        return new _Comment['default'](text, this);
    };
    Document.prototype.createDocumentFragment = function () {
        return new _DocumentFragment['default'](this);
    };
    Document.prototype.getElementsByTagName = function (name) {
        name = name.toUpperCase();
        var elements = [];
        var cur = this.firstChild;
        while (cur) {
            if (cur.nodeType === _Node['default'].ELEMENT_NODE) {
                if (cur.nodeName === name || name === '*') {
                    elements.push(cur);
                }
                elements.push.apply(elements, cur.getElementsByTagName(name));
            }
            cur = cur.nextSibling;
        }
        return elements;
    };
    Document.prototype.getElementById = function (id) {
        return _Element['default'].prototype.getElementById.apply(this.documentElement, arguments);
    };
    Document.prototype.__addSerializerAndParser = function (serializer, parser) {
        this.__parser = parser;
        this.__serializer = serializer;
    };
    if (Object.defineProperty) {
        Object.defineProperty(Document.prototype, 'currentScript', {
            get: function get() {
                var scripts = this.getElementsByTagName('script');
                var first = scripts[scripts.length - 1];
                if (!first) {
                    first = this.createElement('script');
                }
                return first;
            }
        });
    }
    module.exports = Document;
});
/*can-simple-dom@0.3.0#simple-dom/html-parser*/
define('can-simple-dom@0.3.0#simple-dom/html-parser', [
    'exports',
    'module'
], function (exports, module) {
    'use strict';
    function HTMLParser(tokenize, document, voidMap) {
        this.tokenize = tokenize;
        this.document = document;
        this.voidMap = voidMap;
        this.parentStack = [];
    }
    HTMLParser.prototype.isVoid = function (element) {
        return this.voidMap[element.nodeName] === true;
    };
    HTMLParser.prototype.pushElement = function (token) {
        var el = this.document.createElement(token.tagName);
        for (var i = 0; i < token.attributes.length; i++) {
            var attr = token.attributes[i];
            el.setAttribute(attr[0], attr[1]);
        }
        if (this.isVoid(el) || token.selfClosing) {
            return this.appendChild(el);
        }
        this.parentStack.push(el);
    };
    HTMLParser.prototype.popElement = function (token) {
        var el = this.parentStack.pop();
        if (el.nodeName !== token.tagName.toUpperCase()) {
            throw new Error('unbalanced tag');
        }
        this.appendChild(el);
    };
    HTMLParser.prototype.appendText = function (token) {
        var text = this.document.createTextNode(token.chars);
        this.appendChild(text);
    };
    HTMLParser.prototype.appendComment = function (token) {
        var comment = this.document.createComment(token.chars);
        this.appendChild(comment);
    };
    HTMLParser.prototype.appendChild = function (node) {
        var parentNode = this.parentStack[this.parentStack.length - 1];
        parentNode.appendChild(node);
    };
    HTMLParser.prototype.parse = function (html) {
        var fragment = this.document.createDocumentFragment();
        this.parentStack.push(fragment);
        var tokens = this.tokenize(html);
        for (var i = 0, l = tokens.length; i < l; i++) {
            var token = tokens[i];
            switch (token.type) {
            case 'StartTag':
                this.pushElement(token);
                break;
            case 'EndTag':
                this.popElement(token);
                break;
            case 'Chars':
                this.appendText(token);
                break;
            case 'Comment':
                this.appendComment(token);
                break;
            }
        }
        return this.parentStack.pop();
    };
    module.exports = HTMLParser;
});
/*can-simple-dom@0.3.0#simple-dom/html-serializer*/
define('can-simple-dom@0.3.0#simple-dom/html-serializer', [
    'exports',
    'module'
], function (exports, module) {
    'use strict';
    function HTMLSerializer(voidMap) {
        this.voidMap = voidMap;
    }
    HTMLSerializer.prototype.openTag = function (element) {
        return '<' + element.nodeName.toLowerCase() + this.attributes(element.attributes) + '>';
    };
    HTMLSerializer.prototype.closeTag = function (element) {
        return '</' + element.nodeName.toLowerCase() + '>';
    };
    HTMLSerializer.prototype.isVoid = function (element) {
        return this.voidMap[element.nodeName] === true;
    };
    HTMLSerializer.prototype.attributes = function (namedNodeMap) {
        var buffer = '';
        for (var i = 0, l = namedNodeMap.length; i < l; i++) {
            buffer += this.attr(namedNodeMap[i]);
        }
        return buffer;
    };
    HTMLSerializer.prototype.escapeAttrValue = function (attrValue) {
        return attrValue.replace(/[&"]/g, function (match) {
            switch (match) {
            case '&':
                return '&amp;';
            case '"':
                return '&quot;';
            }
        });
    };
    HTMLSerializer.prototype.attr = function (attr) {
        if (!attr.specified) {
            return '';
        }
        if (attr.value) {
            return ' ' + attr.name + '="' + this.escapeAttrValue(attr.value) + '"';
        }
        return ' ' + attr.name;
    };
    HTMLSerializer.prototype.escapeText = function (textNodeValue) {
        return textNodeValue.replace(/[&<>]/g, function (match) {
            switch (match) {
            case '&':
                return '&amp;';
            case '<':
                return '&lt;';
            case '>':
                return '&gt;';
            }
        });
    };
    HTMLSerializer.prototype.text = function (text) {
        var parentNode = text.parentNode;
        if (parentNode && (parentNode.nodeName === 'STYLE' || parentNode.nodeName === 'SCRIPT')) {
            return text.nodeValue;
        }
        return this.escapeText(text.nodeValue);
    };
    HTMLSerializer.prototype.comment = function (comment) {
        return '<!--' + comment.nodeValue + '-->';
    };
    HTMLSerializer.prototype.serialize = function (node) {
        var buffer = '';
        var next;
        switch (node.nodeType) {
        case 1:
            buffer += this.openTag(node);
            break;
        case 3:
            buffer += this.text(node);
            break;
        case 8:
            buffer += this.comment(node);
            break;
        default:
            break;
        }
        next = node.firstChild;
        if (next) {
            while (next) {
                buffer += this.serialize(next);
                next = next.nextSibling;
            }
        } else if (node.nodeType === 1 && node.textContent) {
            buffer += node.textContent;
        }
        if (node.nodeType === 1 && !this.isVoid(node)) {
            buffer += this.closeTag(node);
        }
        return buffer;
    };
    module.exports = HTMLSerializer;
});
/*can-simple-dom@0.3.0#simple-dom/void-map*/
define('can-simple-dom@0.3.0#simple-dom/void-map', [
    'exports',
    'module'
], function (exports, module) {
    'use strict';
    module.exports = {
        AREA: true,
        BASE: true,
        BR: true,
        COL: true,
        COMMAND: true,
        EMBED: true,
        HR: true,
        IMG: true,
        INPUT: true,
        KEYGEN: true,
        LINK: true,
        META: true,
        PARAM: true,
        SOURCE: true,
        TRACK: true,
        WBR: true
    };
});
/*can-simple-dom@0.3.0#simple-dom/dom*/
define('can-simple-dom@0.3.0#simple-dom/dom', [
    'exports',
    'can-simple-dom@0.3.0#simple-dom/document/node',
    'can-simple-dom@0.3.0#simple-dom/document/element',
    'can-simple-dom@0.3.0#simple-dom/document',
    'can-simple-dom@0.3.0#simple-dom/html-parser',
    'can-simple-dom@0.3.0#simple-dom/html-serializer',
    'can-simple-dom@0.3.0#simple-dom/void-map'
], function (exports, _documentNode, _documentElement, _document, _htmlParser, _htmlSerializer, _voidMap) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
    }
    var _Node = _interopRequireDefault(_documentNode);
    var _Element = _interopRequireDefault(_documentElement);
    var _Document = _interopRequireDefault(_document);
    var _HTMLParser = _interopRequireDefault(_htmlParser);
    var _HTMLSerializer = _interopRequireDefault(_htmlSerializer);
    var _voidMap2 = _interopRequireDefault(_voidMap);
    function createDocument(serializer, parser) {
        var doc = new _Document['default']();
        doc.__serializer = serializer;
        doc.__parser = parser;
        return doc;
    }
    exports.Node = _Node['default'];
    exports.Element = _Element['default'];
    exports.Document = _Document['default'];
    exports.HTMLParser = _HTMLParser['default'];
    exports.HTMLSerializer = _HTMLSerializer['default'];
    exports.voidMap = _voidMap2['default'];
    exports.createDocument = createDocument;
});
/*can-simple-dom@0.3.0#simple-dom*/
define('can-simple-dom@0.3.0#simple-dom', [
    'exports',
    'can-simple-dom@0.3.0#simple-dom/dom'
], function (exports, _simpleDomDom) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
            return obj;
        } else {
            var newObj = {};
            if (obj != null) {
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key))
                        newObj[key] = obj[key];
                }
            }
            newObj['default'] = obj;
            return newObj;
        }
    }
    function _defaults(obj, defaults) {
        var keys = Object.getOwnPropertyNames(defaults);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var value = Object.getOwnPropertyDescriptor(defaults, key);
            if (value && value.configurable && obj[key] === undefined) {
                Object.defineProperty(obj, key, value);
            }
        }
        return obj;
    }
    if (typeof window !== 'undefined') {
        window.SimpleDOM = _simpleDomDom;
    }
    _defaults(exports, _interopRequireWildcard(_simpleDomDom));
});
/*can@2.3.23#view/parser/parser*/
define('can@2.3.23#view/parser/parser', [], function () {
    function each(items, callback) {
        for (var i = 0; i < items.length; i++) {
            callback(items[i], i);
        }
    }
    function makeMap(str) {
        var obj = {}, items = str.split(',');
        each(items, function (name) {
            obj[name] = true;
        });
        return obj;
    }
    function handleIntermediate(intermediate, handler) {
        for (var i = 0, len = intermediate.length; i < len; i++) {
            var item = intermediate[i];
            handler[item.tokenType].apply(handler, item.args);
        }
        return intermediate;
    }
    var alphaNumeric = 'A-Za-z0-9', alphaNumericHU = '-:_' + alphaNumeric, attributeNames = '[^=>\\s\\/]+', spaceEQspace = '\\s*=\\s*', singleCurly = '\\{[^\\}\\{]\\}', doubleCurly = '\\{\\{[^\\}]\\}\\}\\}?', attributeEqAndValue = '(?:' + spaceEQspace + '(?:' + '(?:' + doubleCurly + ')|(?:' + singleCurly + ')|(?:"[^"]*")|(?:\'[^\']*\')|[^>\\s]+))?', matchStash = '\\{\\{[^\\}]*\\}\\}\\}?', stash = '\\{\\{([^\\}]*)\\}\\}\\}?', startTag = new RegExp('^<([' + alphaNumeric + '][' + alphaNumericHU + ']*)' + '(' + '(?:\\s*' + '(?:(?:' + '(?:' + attributeNames + ')?' + attributeEqAndValue + ')|' + '(?:' + matchStash + ')+)' + ')*' + ')\\s*(\\/?)>'), endTag = new RegExp('^<\\/([' + alphaNumericHU + ']+)[^>]*>'), mustache = new RegExp(stash, 'g'), txtBreak = /<|\{\{/, space = /\s/;
    var empty = makeMap('area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed');
    var block = makeMap('a,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video');
    var inline = makeMap('a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var');
    var closeSelf = makeMap('colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr');
    var special = makeMap('script');
    var tokenTypes = 'start,end,close,attrStart,attrEnd,attrValue,chars,comment,special,done'.split(',');
    var fn = function () {
    };
    var HTMLParser = function (html, handler, returnIntermediate) {
        if (typeof html === 'object') {
            return handleIntermediate(html, handler);
        }
        var intermediate = [];
        handler = handler || {};
        if (returnIntermediate) {
            each(tokenTypes, function (name) {
                var callback = handler[name] || fn;
                handler[name] = function () {
                    if (callback.apply(this, arguments) !== false) {
                        intermediate.push({
                            tokenType: name,
                            args: [].slice.call(arguments, 0)
                        });
                    }
                };
            });
        }
        function parseStartTag(tag, tagName, rest, unary) {
            tagName = tagName.toLowerCase();
            if (block[tagName] && !inline[tagName]) {
                var last = stack.last();
                while (last && inline[last] && !block[last]) {
                    parseEndTag('', last);
                    last = stack.last();
                }
            }
            if (closeSelf[tagName] && stack.last() === tagName) {
                parseEndTag('', tagName);
            }
            unary = empty[tagName] || !!unary;
            handler.start(tagName, unary);
            if (!unary) {
                stack.push(tagName);
            }
            HTMLParser.parseAttrs(rest, handler);
            handler.end(tagName, unary);
        }
        function parseEndTag(tag, tagName) {
            var pos;
            if (!tagName) {
                pos = 0;
            } else {
                tagName = tagName.toLowerCase();
                for (pos = stack.length - 1; pos >= 0; pos--) {
                    if (stack[pos] === tagName) {
                        break;
                    }
                }
            }
            if (pos >= 0) {
                for (var i = stack.length - 1; i >= pos; i--) {
                    if (handler.close) {
                        handler.close(stack[i]);
                    }
                }
                stack.length = pos;
            }
        }
        function parseMustache(mustache, inside) {
            if (handler.special) {
                handler.special(inside);
            }
        }
        var callChars = function () {
            if (charsText) {
                if (handler.chars) {
                    handler.chars(charsText);
                }
            }
            charsText = '';
        };
        var index, chars, match, stack = [], last = html, charsText = '';
        stack.last = function () {
            return this[this.length - 1];
        };
        while (html) {
            chars = true;
            if (!stack.last() || !special[stack.last()]) {
                if (html.indexOf('<!--') === 0) {
                    index = html.indexOf('-->');
                    if (index >= 0) {
                        callChars();
                        if (handler.comment) {
                            handler.comment(html.substring(4, index));
                        }
                        html = html.substring(index + 3);
                        chars = false;
                    }
                } else if (html.indexOf('</') === 0) {
                    match = html.match(endTag);
                    if (match) {
                        callChars();
                        html = html.substring(match[0].length);
                        match[0].replace(endTag, parseEndTag);
                        chars = false;
                    }
                } else if (html.indexOf('<') === 0) {
                    match = html.match(startTag);
                    if (match) {
                        callChars();
                        html = html.substring(match[0].length);
                        match[0].replace(startTag, parseStartTag);
                        chars = false;
                    }
                } else if (html.indexOf('{{') === 0) {
                    match = html.match(mustache);
                    if (match) {
                        callChars();
                        html = html.substring(match[0].length);
                        match[0].replace(mustache, parseMustache);
                    }
                }
                if (chars) {
                    index = html.search(txtBreak);
                    if (index === 0 && html === last) {
                        charsText += html.charAt(0);
                        html = html.substr(1);
                        index = html.search(txtBreak);
                    }
                    var text = index < 0 ? html : html.substring(0, index);
                    html = index < 0 ? '' : html.substring(index);
                    if (text) {
                        charsText += text;
                    }
                }
            } else {
                html = html.replace(new RegExp('([\\s\\S]*?)</' + stack.last() + '[^>]*>'), function (all, text) {
                    text = text.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, '$1$2');
                    if (handler.chars) {
                        handler.chars(text);
                    }
                    return '';
                });
                parseEndTag('', stack.last());
            }
            if (html === last) {
                throw new Error('Parse Error: ' + html);
            }
            last = html;
        }
        callChars();
        parseEndTag();
        handler.done();
        return intermediate;
    };
    var callAttrStart = function (state, curIndex, handler, rest) {
        state.attrStart = rest.substring(typeof state.nameStart === 'number' ? state.nameStart : curIndex, curIndex);
        handler.attrStart(state.attrStart);
        state.inName = false;
    };
    var callAttrEnd = function (state, curIndex, handler, rest) {
        if (state.valueStart !== undefined && state.valueStart < curIndex) {
            handler.attrValue(rest.substring(state.valueStart, curIndex));
        } else if (!state.inValue) {
        }
        handler.attrEnd(state.attrStart);
        state.attrStart = undefined;
        state.valueStart = undefined;
        state.inValue = false;
        state.inName = false;
        state.lookingForEq = false;
        state.inQuote = false;
        state.lookingForName = true;
    };
    HTMLParser.parseAttrs = function (rest, handler) {
        if (!rest) {
            return;
        }
        var i = 0;
        var curIndex;
        var state = {
            inDoubleCurly: false,
            inName: false,
            nameStart: undefined,
            inValue: false,
            valueStart: undefined,
            inQuote: false,
            attrStart: undefined,
            lookingForName: true,
            lookingForValue: false,
            lookingForEq: false
        };
        while (i < rest.length) {
            curIndex = i;
            var cur = rest.charAt(i);
            var next = rest.charAt(i + 1);
            var nextNext = rest.charAt(i + 2);
            i++;
            if (cur === '{' && next === '{') {
                if (state.inValue && curIndex > state.valueStart) {
                    handler.attrValue(rest.substring(state.valueStart, curIndex));
                } else if (state.inName && state.nameStart < curIndex) {
                    callAttrStart(state, curIndex, handler, rest);
                    callAttrEnd(state, curIndex, handler, rest);
                } else if (state.lookingForValue) {
                    state.inValue = true;
                } else if (state.lookingForEq && state.attrStart) {
                    callAttrEnd(state, curIndex, handler, rest);
                }
                state.inDoubleCurly = true;
                state.doubleCurlyStart = curIndex + 2;
                i++;
            } else if (state.inDoubleCurly) {
                if (cur === '}' && next === '}') {
                    var isTriple = nextNext === '}' ? 1 : 0;
                    handler.special(rest.substring(state.doubleCurlyStart, curIndex));
                    state.inDoubleCurly = false;
                    if (state.inValue) {
                        state.valueStart = curIndex + 2 + isTriple;
                    }
                    i += 1 + isTriple;
                }
            } else if (state.inValue) {
                if (state.inQuote) {
                    if (cur === state.inQuote) {
                        callAttrEnd(state, curIndex, handler, rest);
                    }
                } else if (space.test(cur)) {
                    callAttrEnd(state, curIndex, handler, rest);
                }
            } else if (cur === '=' && (state.lookingForEq || state.lookingForName || state.inName)) {
                if (!state.attrStart) {
                    callAttrStart(state, curIndex, handler, rest);
                }
                state.lookingForValue = true;
                state.lookingForEq = false;
                state.lookingForName = false;
            } else if (state.inName) {
                if (space.test(cur)) {
                    callAttrStart(state, curIndex, handler, rest);
                    state.lookingForEq = true;
                }
            } else if (state.lookingForName) {
                if (!space.test(cur)) {
                    if (state.attrStart) {
                        callAttrEnd(state, curIndex, handler, rest);
                    }
                    state.nameStart = curIndex;
                    state.inName = true;
                }
            } else if (state.lookingForValue) {
                if (!space.test(cur)) {
                    state.lookingForValue = false;
                    state.inValue = true;
                    if (cur === '\'' || cur === '"') {
                        state.inQuote = cur;
                        state.valueStart = curIndex + 1;
                    } else {
                        state.valueStart = curIndex;
                    }
                }
            }
        }
        if (state.inName) {
            callAttrStart(state, curIndex + 1, handler, rest);
            callAttrEnd(state, curIndex + 1, handler, rest);
        } else if (state.lookingForEq) {
            callAttrEnd(state, curIndex + 1, handler, rest);
        } else if (state.inValue) {
            callAttrEnd(state, curIndex + 1, handler, rest);
        }
    };
    return HTMLParser;
});
/*can@2.3.23#util/vdom/build_fragment/make_parser*/
define('can@2.3.23#util/vdom/build_fragment/make_parser', [
    'can@2.3.23#view/parser/parser',
    'can-simple-dom@0.3.0#simple-dom'
], function (canParser, simpleDOM) {
    return function (document) {
        return new simpleDOM.HTMLParser(function (string) {
            var tokens = [];
            var currentTag, currentAttr;
            canParser(string, {
                start: function (tagName, unary) {
                    currentTag = {
                        type: 'StartTag',
                        attributes: [],
                        tagName: tagName
                    };
                },
                end: function (tagName, unary) {
                    tokens.push(currentTag);
                    currentTag = undefined;
                },
                close: function (tagName) {
                    tokens.push({
                        type: 'EndTag',
                        tagName: tagName
                    });
                },
                attrStart: function (attrName) {
                    currentAttr = [
                        attrName,
                        ''
                    ];
                    currentTag.attributes.push(currentAttr);
                },
                attrEnd: function (attrName) {
                },
                attrValue: function (value) {
                    currentAttr[1] += value;
                },
                chars: function (value) {
                    tokens.push({
                        type: 'Chars',
                        chars: value
                    });
                },
                comment: function (value) {
                    tokens.push({
                        type: 'Comment',
                        chars: value
                    });
                },
                special: function (value) {
                },
                done: function () {
                }
            });
            return tokens;
        }, document, simpleDOM.voidMap);
    };
});
/*can@2.3.23#util/vdom/document/document*/
define('can@2.3.23#util/vdom/document/document', [
    'can@2.3.23#util/can',
    'can-simple-dom@0.3.0#simple-dom',
    'can@2.3.23#util/vdom/build_fragment/make_parser'
], function (can, simpleDOM, makeParser) {
    function CanSimpleDocument() {
        simpleDOM.Document.apply(this, arguments);
        var serializer = new simpleDOM.HTMLSerializer(simpleDOM.voidMap);
        var parser = makeParser(this);
        this.__addSerializerAndParser(serializer, parser);
    }
    CanSimpleDocument.prototype = new simpleDOM.Document();
    CanSimpleDocument.prototype.constructor = CanSimpleDocument;
    var document = new CanSimpleDocument();
    can.simpleDocument = document;
    return document;
});
/*can@2.3.23#util/vdom/vdom*/
define('can@2.3.23#util/vdom/vdom', [
    'can@2.3.23#util/can',
    'can@2.3.23#util/vdom/document/document'
], function (can, document) {
    var global = can.global;
    global.document = document;
    global.window = global;
    global.addEventListener = function () {
    };
    global.removeEventListener = function () {
    };
    global.navigator = {
        userAgent: '',
        platform: '',
        language: '',
        languages: [],
        plugins: [],
        onLine: true
    };
    global.location = {
        href: '',
        protocol: '',
        host: '',
        hostname: '',
        port: '',
        pathname: '',
        search: '',
        hash: ''
    };
    global.history = {
        pushState: can.k,
        replaceState: can.k
    };
});
/*[global-shim-end]*/
(function(){ // jshint ignore:line
	window._define = window.define;
	window.define = window.define.orig;
}
)();