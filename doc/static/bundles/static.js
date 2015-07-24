/*[system-bundles-config]*/
System.paths["bundles/*.css"] ="../../../../../../../../../../../node_modules/documentjs/site/static/build/21aa896404b6a39bcc3102db8c989a7f/bundles/*css";
System.paths["bundles/*"] = "../../../../../../../../../../../node_modules/documentjs/site/static/build/21aa896404b6a39bcc3102db8c989a7f/bundles/*.js";
System.bundles = {"bundles/static.css!":["styles/styles.less!$less"]};
/*config.js*/
define('config.js', function(require, exports, module) {
(function () {
	var isClient = typeof window !== "undefined";
	
	var configData = {
		map: {
			"jquery/jquery": "jquery",
			"can/util/util": "can/util/jquery/jquery",
			"benchmark/benchmark": "benchmark",
			"mustache": "can/view/mustache/system"
		},
		meta: {
			jquery: {
				exports: "jQuery"
			},
			prettify: {format: "global"}
		},
		ext: {
			ejs: "can/view/ejs/system",
			mustache: "can/view/mustache/system",
			stache: "can/view/stache/system"
		}
	};
	
	if(isClient) {
		// when not a client, these values are set by build.js.
		configData.paths = {
			"jquery": "jquery/dist/jquery.js",
			"can/*": "can/*.js" 
		};
	}
	
	System.config(configData);
})();

System.buildConfig = {
	map: {"can/util/util" : "can/util/domless/domless"}
};

});
/*jquery*/
System.define('jquery','/*!\n * jQuery JavaScript Library v1.11.3\n * http://jquery.com/\n *\n * Includes Sizzle.js\n * http://sizzlejs.com/\n *\n * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors\n * Released under the MIT license\n * http://jquery.org/license\n *\n * Date: 2015-04-28T16:19Z\n */\n\n(function( global, factory ) {\n\n	if ( typeof module === \"object\" && typeof module.exports === \"object\" ) {\n		// For CommonJS and CommonJS-like environments where a proper window is present,\n		// execute the factory and get jQuery\n		// For environments that do not inherently posses a window with a document\n		// (such as Node.js), expose a jQuery-making factory as module.exports\n		// This accentuates the need for the creation of a real window\n		// e.g. var jQuery = require(\"jquery\")(window);\n		// See ticket #14549 for more info\n		module.exports = global.document ?\n			factory( global, true ) :\n			function( w ) {\n				if ( !w.document ) {\n					throw new Error( \"jQuery requires a window with a document\" );\n				}\n				return factory( w );\n			};\n	} else {\n		factory( global );\n	}\n\n// Pass this if window is not defined yet\n}(typeof window !== \"undefined\" ? window : this, function( window, noGlobal ) {\n\n// Can\'t do this because several apps including ASP.NET trace\n// the stack via arguments.caller.callee and Firefox dies if\n// you try to trace through \"use strict\" call chains. (#13335)\n// Support: Firefox 18+\n//\n\nvar deletedIds = [];\n\nvar slice = deletedIds.slice;\n\nvar concat = deletedIds.concat;\n\nvar push = deletedIds.push;\n\nvar indexOf = deletedIds.indexOf;\n\nvar class2type = {};\n\nvar toString = class2type.toString;\n\nvar hasOwn = class2type.hasOwnProperty;\n\nvar support = {};\n\n\n\nvar\n	version = \"1.11.3\",\n\n	// Define a local copy of jQuery\n	jQuery = function( selector, context ) {\n		// The jQuery object is actually just the init constructor \'enhanced\'\n		// Need init if jQuery is called (just allow error to be thrown if not included)\n		return new jQuery.fn.init( selector, context );\n	},\n\n	// Support: Android<4.1, IE<9\n	// Make sure we trim BOM and NBSP\n	rtrim = /^[\\s\\uFEFF\\xA0]+|[\\s\\uFEFF\\xA0]+$/g,\n\n	// Matches dashed string for camelizing\n	rmsPrefix = /^-ms-/,\n	rdashAlpha = /-([\\da-z])/gi,\n\n	// Used by jQuery.camelCase as callback to replace()\n	fcamelCase = function( all, letter ) {\n		return letter.toUpperCase();\n	};\n\njQuery.fn = jQuery.prototype = {\n	// The current version of jQuery being used\n	jquery: version,\n\n	constructor: jQuery,\n\n	// Start with an empty selector\n	selector: \"\",\n\n	// The default length of a jQuery object is 0\n	length: 0,\n\n	toArray: function() {\n		return slice.call( this );\n	},\n\n	// Get the Nth element in the matched element set OR\n	// Get the whole matched element set as a clean array\n	get: function( num ) {\n		return num != null ?\n\n			// Return just the one element from the set\n			( num < 0 ? this[ num + this.length ] : this[ num ] ) :\n\n			// Return all the elements in a clean array\n			slice.call( this );\n	},\n\n	// Take an array of elements and push it onto the stack\n	// (returning the new matched element set)\n	pushStack: function( elems ) {\n\n		// Build a new jQuery matched element set\n		var ret = jQuery.merge( this.constructor(), elems );\n\n		// Add the old object onto the stack (as a reference)\n		ret.prevObject = this;\n		ret.context = this.context;\n\n		// Return the newly-formed element set\n		return ret;\n	},\n\n	// Execute a callback for every element in the matched set.\n	// (You can seed the arguments with an array of args, but this is\n	// only used internally.)\n	each: function( callback, args ) {\n		return jQuery.each( this, callback, args );\n	},\n\n	map: function( callback ) {\n		return this.pushStack( jQuery.map(this, function( elem, i ) {\n			return callback.call( elem, i, elem );\n		}));\n	},\n\n	slice: function() {\n		return this.pushStack( slice.apply( this, arguments ) );\n	},\n\n	first: function() {\n		return this.eq( 0 );\n	},\n\n	last: function() {\n		return this.eq( -1 );\n	},\n\n	eq: function( i ) {\n		var len = this.length,\n			j = +i + ( i < 0 ? len : 0 );\n		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );\n	},\n\n	end: function() {\n		return this.prevObject || this.constructor(null);\n	},\n\n	// For internal use only.\n	// Behaves like an Array\'s method, not like a jQuery method.\n	push: push,\n	sort: deletedIds.sort,\n	splice: deletedIds.splice\n};\n\njQuery.extend = jQuery.fn.extend = function() {\n	var src, copyIsArray, copy, name, options, clone,\n		target = arguments[0] || {},\n		i = 1,\n		length = arguments.length,\n		deep = false;\n\n	// Handle a deep copy situation\n	if ( typeof target === \"boolean\" ) {\n		deep = target;\n\n		// skip the boolean and the target\n		target = arguments[ i ] || {};\n		i++;\n	}\n\n	// Handle case when target is a string or something (possible in deep copy)\n	if ( typeof target !== \"object\" && !jQuery.isFunction(target) ) {\n		target = {};\n	}\n\n	// extend jQuery itself if only one argument is passed\n	if ( i === length ) {\n		target = this;\n		i--;\n	}\n\n	for ( ; i < length; i++ ) {\n		// Only deal with non-null/undefined values\n		if ( (options = arguments[ i ]) != null ) {\n			// Extend the base object\n			for ( name in options ) {\n				src = target[ name ];\n				copy = options[ name ];\n\n				// Prevent never-ending loop\n				if ( target === copy ) {\n					continue;\n				}\n\n				// Recurse if we\'re merging plain objects or arrays\n				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {\n					if ( copyIsArray ) {\n						copyIsArray = false;\n						clone = src && jQuery.isArray(src) ? src : [];\n\n					} else {\n						clone = src && jQuery.isPlainObject(src) ? src : {};\n					}\n\n					// Never move original objects, clone them\n					target[ name ] = jQuery.extend( deep, clone, copy );\n\n				// Don\'t bring in undefined values\n				} else if ( copy !== undefined ) {\n					target[ name ] = copy;\n				}\n			}\n		}\n	}\n\n	// Return the modified object\n	return target;\n};\n\njQuery.extend({\n	// Unique for each copy of jQuery on the page\n	expando: \"jQuery\" + ( version + Math.random() ).replace( /\\D/g, \"\" ),\n\n	// Assume jQuery is ready without the ready module\n	isReady: true,\n\n	error: function( msg ) {\n		throw new Error( msg );\n	},\n\n	noop: function() {},\n\n	// See test/unit/core.js for details concerning isFunction.\n	// Since version 1.3, DOM methods and functions like alert\n	// aren\'t supported. They return false on IE (#2968).\n	isFunction: function( obj ) {\n		return jQuery.type(obj) === \"function\";\n	},\n\n	isArray: Array.isArray || function( obj ) {\n		return jQuery.type(obj) === \"array\";\n	},\n\n	isWindow: function( obj ) {\n		/* jshint eqeqeq: false */\n		return obj != null && obj == obj.window;\n	},\n\n	isNumeric: function( obj ) {\n		// parseFloat NaNs numeric-cast false positives (null|true|false|\"\")\n		// ...but misinterprets leading-number strings, particularly hex literals (\"0x...\")\n		// subtraction forces infinities to NaN\n		// adding 1 corrects loss of precision from parseFloat (#15100)\n		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;\n	},\n\n	isEmptyObject: function( obj ) {\n		var name;\n		for ( name in obj ) {\n			return false;\n		}\n		return true;\n	},\n\n	isPlainObject: function( obj ) {\n		var key;\n\n		// Must be an Object.\n		// Because of IE, we also have to check the presence of the constructor property.\n		// Make sure that DOM nodes and window objects don\'t pass through, as well\n		if ( !obj || jQuery.type(obj) !== \"object\" || obj.nodeType || jQuery.isWindow( obj ) ) {\n			return false;\n		}\n\n		try {\n			// Not own constructor property must be Object\n			if ( obj.constructor &&\n				!hasOwn.call(obj, \"constructor\") &&\n				!hasOwn.call(obj.constructor.prototype, \"isPrototypeOf\") ) {\n				return false;\n			}\n		} catch ( e ) {\n			// IE8,9 Will throw exceptions on certain host objects #9897\n			return false;\n		}\n\n		// Support: IE<9\n		// Handle iteration over inherited properties before own properties.\n		if ( support.ownLast ) {\n			for ( key in obj ) {\n				return hasOwn.call( obj, key );\n			}\n		}\n\n		// Own properties are enumerated firstly, so to speed up,\n		// if last one is own, then all properties are own.\n		for ( key in obj ) {}\n\n		return key === undefined || hasOwn.call( obj, key );\n	},\n\n	type: function( obj ) {\n		if ( obj == null ) {\n			return obj + \"\";\n		}\n		return typeof obj === \"object\" || typeof obj === \"function\" ?\n			class2type[ toString.call(obj) ] || \"object\" :\n			typeof obj;\n	},\n\n	// Evaluates a script in a global context\n	// Workarounds based on findings by Jim Driscoll\n	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context\n	globalEval: function( data ) {\n		if ( data && jQuery.trim( data ) ) {\n			// We use execScript on Internet Explorer\n			// We use an anonymous function so that context is window\n			// rather than jQuery in Firefox\n			( window.execScript || function( data ) {\n				window[ \"eval\" ].call( window, data );\n			} )( data );\n		}\n	},\n\n	// Convert dashed to camelCase; used by the css and data modules\n	// Microsoft forgot to hump their vendor prefix (#9572)\n	camelCase: function( string ) {\n		return string.replace( rmsPrefix, \"ms-\" ).replace( rdashAlpha, fcamelCase );\n	},\n\n	nodeName: function( elem, name ) {\n		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();\n	},\n\n	// args is for internal usage only\n	each: function( obj, callback, args ) {\n		var value,\n			i = 0,\n			length = obj.length,\n			isArray = isArraylike( obj );\n\n		if ( args ) {\n			if ( isArray ) {\n				for ( ; i < length; i++ ) {\n					value = callback.apply( obj[ i ], args );\n\n					if ( value === false ) {\n						break;\n					}\n				}\n			} else {\n				for ( i in obj ) {\n					value = callback.apply( obj[ i ], args );\n\n					if ( value === false ) {\n						break;\n					}\n				}\n			}\n\n		// A special, fast, case for the most common use of each\n		} else {\n			if ( isArray ) {\n				for ( ; i < length; i++ ) {\n					value = callback.call( obj[ i ], i, obj[ i ] );\n\n					if ( value === false ) {\n						break;\n					}\n				}\n			} else {\n				for ( i in obj ) {\n					value = callback.call( obj[ i ], i, obj[ i ] );\n\n					if ( value === false ) {\n						break;\n					}\n				}\n			}\n		}\n\n		return obj;\n	},\n\n	// Support: Android<4.1, IE<9\n	trim: function( text ) {\n		return text == null ?\n			\"\" :\n			( text + \"\" ).replace( rtrim, \"\" );\n	},\n\n	// results is for internal usage only\n	makeArray: function( arr, results ) {\n		var ret = results || [];\n\n		if ( arr != null ) {\n			if ( isArraylike( Object(arr) ) ) {\n				jQuery.merge( ret,\n					typeof arr === \"string\" ?\n					[ arr ] : arr\n				);\n			} else {\n				push.call( ret, arr );\n			}\n		}\n\n		return ret;\n	},\n\n	inArray: function( elem, arr, i ) {\n		var len;\n\n		if ( arr ) {\n			if ( indexOf ) {\n				return indexOf.call( arr, elem, i );\n			}\n\n			len = arr.length;\n			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;\n\n			for ( ; i < len; i++ ) {\n				// Skip accessing in sparse arrays\n				if ( i in arr && arr[ i ] === elem ) {\n					return i;\n				}\n			}\n		}\n\n		return -1;\n	},\n\n	merge: function( first, second ) {\n		var len = +second.length,\n			j = 0,\n			i = first.length;\n\n		while ( j < len ) {\n			first[ i++ ] = second[ j++ ];\n		}\n\n		// Support: IE<9\n		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)\n		if ( len !== len ) {\n			while ( second[j] !== undefined ) {\n				first[ i++ ] = second[ j++ ];\n			}\n		}\n\n		first.length = i;\n\n		return first;\n	},\n\n	grep: function( elems, callback, invert ) {\n		var callbackInverse,\n			matches = [],\n			i = 0,\n			length = elems.length,\n			callbackExpect = !invert;\n\n		// Go through the array, only saving the items\n		// that pass the validator function\n		for ( ; i < length; i++ ) {\n			callbackInverse = !callback( elems[ i ], i );\n			if ( callbackInverse !== callbackExpect ) {\n				matches.push( elems[ i ] );\n			}\n		}\n\n		return matches;\n	},\n\n	// arg is for internal usage only\n	map: function( elems, callback, arg ) {\n		var value,\n			i = 0,\n			length = elems.length,\n			isArray = isArraylike( elems ),\n			ret = [];\n\n		// Go through the array, translating each of the items to their new values\n		if ( isArray ) {\n			for ( ; i < length; i++ ) {\n				value = callback( elems[ i ], i, arg );\n\n				if ( value != null ) {\n					ret.push( value );\n				}\n			}\n\n		// Go through every key on the object,\n		} else {\n			for ( i in elems ) {\n				value = callback( elems[ i ], i, arg );\n\n				if ( value != null ) {\n					ret.push( value );\n				}\n			}\n		}\n\n		// Flatten any nested arrays\n		return concat.apply( [], ret );\n	},\n\n	// A global GUID counter for objects\n	guid: 1,\n\n	// Bind a function to a context, optionally partially applying any\n	// arguments.\n	proxy: function( fn, context ) {\n		var args, proxy, tmp;\n\n		if ( typeof context === \"string\" ) {\n			tmp = fn[ context ];\n			context = fn;\n			fn = tmp;\n		}\n\n		// Quick check to determine if target is callable, in the spec\n		// this throws a TypeError, but we will just return undefined.\n		if ( !jQuery.isFunction( fn ) ) {\n			return undefined;\n		}\n\n		// Simulated bind\n		args = slice.call( arguments, 2 );\n		proxy = function() {\n			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );\n		};\n\n		// Set the guid of unique handler to the same of original handler, so it can be removed\n		proxy.guid = fn.guid = fn.guid || jQuery.guid++;\n\n		return proxy;\n	},\n\n	now: function() {\n		return +( new Date() );\n	},\n\n	// jQuery.support is not used in Core but other projects attach their\n	// properties to it so it needs to exist.\n	support: support\n});\n\n// Populate the class2type map\njQuery.each(\"Boolean Number String Function Array Date RegExp Object Error\".split(\" \"), function(i, name) {\n	class2type[ \"[object \" + name + \"]\" ] = name.toLowerCase();\n});\n\nfunction isArraylike( obj ) {\n\n	// Support: iOS 8.2 (not reproducible in simulator)\n	// `in` check used to prevent JIT error (gh-2145)\n	// hasOwn isn\'t used here due to false negatives\n	// regarding Nodelist length in IE\n	var length = \"length\" in obj && obj.length,\n		type = jQuery.type( obj );\n\n	if ( type === \"function\" || jQuery.isWindow( obj ) ) {\n		return false;\n	}\n\n	if ( obj.nodeType === 1 && length ) {\n		return true;\n	}\n\n	return type === \"array\" || length === 0 ||\n		typeof length === \"number\" && length > 0 && ( length - 1 ) in obj;\n}\nvar Sizzle =\n/*!\n * Sizzle CSS Selector Engine v2.2.0-pre\n * http://sizzlejs.com/\n *\n * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors\n * Released under the MIT license\n * http://jquery.org/license\n *\n * Date: 2014-12-16\n */\n(function( window ) {\n\nvar i,\n	support,\n	Expr,\n	getText,\n	isXML,\n	tokenize,\n	compile,\n	select,\n	outermostContext,\n	sortInput,\n	hasDuplicate,\n\n	// Local document vars\n	setDocument,\n	document,\n	docElem,\n	documentIsHTML,\n	rbuggyQSA,\n	rbuggyMatches,\n	matches,\n	contains,\n\n	// Instance-specific data\n	expando = \"sizzle\" + 1 * new Date(),\n	preferredDoc = window.document,\n	dirruns = 0,\n	done = 0,\n	classCache = createCache(),\n	tokenCache = createCache(),\n	compilerCache = createCache(),\n	sortOrder = function( a, b ) {\n		if ( a === b ) {\n			hasDuplicate = true;\n		}\n		return 0;\n	},\n\n	// General-purpose constants\n	MAX_NEGATIVE = 1 << 31,\n\n	// Instance methods\n	hasOwn = ({}).hasOwnProperty,\n	arr = [],\n	pop = arr.pop,\n	push_native = arr.push,\n	push = arr.push,\n	slice = arr.slice,\n	// Use a stripped-down indexOf as it\'s faster than native\n	// http://jsperf.com/thor-indexof-vs-for/5\n	indexOf = function( list, elem ) {\n		var i = 0,\n			len = list.length;\n		for ( ; i < len; i++ ) {\n			if ( list[i] === elem ) {\n				return i;\n			}\n		}\n		return -1;\n	},\n\n	booleans = \"checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped\",\n\n	// Regular expressions\n\n	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace\n	whitespace = \"[\\\\x20\\\\t\\\\r\\\\n\\\\f]\",\n	// http://www.w3.org/TR/css3-syntax/#characters\n	characterEncoding = \"(?:\\\\\\\\.|[\\\\w-]|[^\\\\x00-\\\\xa0])+\",\n\n	// Loosely modeled on CSS identifier characters\n	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors\n	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier\n	identifier = characterEncoding.replace( \"w\", \"w#\" ),\n\n	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors\n	attributes = \"\\\\[\" + whitespace + \"*(\" + characterEncoding + \")(?:\" + whitespace +\n		// Operator (capture 2)\n		\"*([*^$|!~]?=)\" + whitespace +\n		// \"Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]\"\n		\"*(?:\'((?:\\\\\\\\.|[^\\\\\\\\\'])*)\'|\\\"((?:\\\\\\\\.|[^\\\\\\\\\\\"])*)\\\"|(\" + identifier + \"))|)\" + whitespace +\n		\"*\\\\]\",\n\n	pseudos = \":(\" + characterEncoding + \")(?:\\\\((\" +\n		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:\n		// 1. quoted (capture 3; capture 4 or capture 5)\n		\"(\'((?:\\\\\\\\.|[^\\\\\\\\\'])*)\'|\\\"((?:\\\\\\\\.|[^\\\\\\\\\\\"])*)\\\")|\" +\n		// 2. simple (capture 6)\n		\"((?:\\\\\\\\.|[^\\\\\\\\()[\\\\]]|\" + attributes + \")*)|\" +\n		// 3. anything else (capture 2)\n		\".*\" +\n		\")\\\\)|)\",\n\n	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter\n	rwhitespace = new RegExp( whitespace + \"+\", \"g\" ),\n	rtrim = new RegExp( \"^\" + whitespace + \"+|((?:^|[^\\\\\\\\])(?:\\\\\\\\.)*)\" + whitespace + \"+$\", \"g\" ),\n\n	rcomma = new RegExp( \"^\" + whitespace + \"*,\" + whitespace + \"*\" ),\n	rcombinators = new RegExp( \"^\" + whitespace + \"*([>+~]|\" + whitespace + \")\" + whitespace + \"*\" ),\n\n	rattributeQuotes = new RegExp( \"=\" + whitespace + \"*([^\\\\]\'\\\"]*?)\" + whitespace + \"*\\\\]\", \"g\" ),\n\n	rpseudo = new RegExp( pseudos ),\n	ridentifier = new RegExp( \"^\" + identifier + \"$\" ),\n\n	matchExpr = {\n		\"ID\": new RegExp( \"^#(\" + characterEncoding + \")\" ),\n		\"CLASS\": new RegExp( \"^\\\\.(\" + characterEncoding + \")\" ),\n		\"TAG\": new RegExp( \"^(\" + characterEncoding.replace( \"w\", \"w*\" ) + \")\" ),\n		\"ATTR\": new RegExp( \"^\" + attributes ),\n		\"PSEUDO\": new RegExp( \"^\" + pseudos ),\n		\"CHILD\": new RegExp( \"^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\\\(\" + whitespace +\n			\"*(even|odd|(([+-]|)(\\\\d*)n|)\" + whitespace + \"*(?:([+-]|)\" + whitespace +\n			\"*(\\\\d+)|))\" + whitespace + \"*\\\\)|)\", \"i\" ),\n		\"bool\": new RegExp( \"^(?:\" + booleans + \")$\", \"i\" ),\n		// For use in libraries implementing .is()\n		// We use this for POS matching in `select`\n		\"needsContext\": new RegExp( \"^\" + whitespace + \"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\\\(\" +\n			whitespace + \"*((?:-\\\\d)?\\\\d*)\" + whitespace + \"*\\\\)|)(?=[^-]|$)\", \"i\" )\n	},\n\n	rinputs = /^(?:input|select|textarea|button)$/i,\n	rheader = /^h\\d$/i,\n\n	rnative = /^[^{]+\\{\\s*\\[native \\w/,\n\n	// Easily-parseable/retrievable ID or TAG or CLASS selectors\n	rquickExpr = /^(?:#([\\w-]+)|(\\w+)|\\.([\\w-]+))$/,\n\n	rsibling = /[+~]/,\n	rescape = /\'|\\\\/g,\n\n	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters\n	runescape = new RegExp( \"\\\\\\\\([\\\\da-f]{1,6}\" + whitespace + \"?|(\" + whitespace + \")|.)\", \"ig\" ),\n	funescape = function( _, escaped, escapedWhitespace ) {\n		var high = \"0x\" + escaped - 0x10000;\n		// NaN means non-codepoint\n		// Support: Firefox<24\n		// Workaround erroneous numeric interpretation of +\"0x\"\n		return high !== high || escapedWhitespace ?\n			escaped :\n			high < 0 ?\n				// BMP codepoint\n				String.fromCharCode( high + 0x10000 ) :\n				// Supplemental Plane codepoint (surrogate pair)\n				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );\n	},\n\n	// Used for iframes\n	// See setDocument()\n	// Removing the function wrapper causes a \"Permission Denied\"\n	// error in IE\n	unloadHandler = function() {\n		setDocument();\n	};\n\n// Optimize for push.apply( _, NodeList )\ntry {\n	push.apply(\n		(arr = slice.call( preferredDoc.childNodes )),\n		preferredDoc.childNodes\n	);\n	// Support: Android<4.0\n	// Detect silently failing push.apply\n	arr[ preferredDoc.childNodes.length ].nodeType;\n} catch ( e ) {\n	push = { apply: arr.length ?\n\n		// Leverage slice if possible\n		function( target, els ) {\n			push_native.apply( target, slice.call(els) );\n		} :\n\n		// Support: IE<9\n		// Otherwise append directly\n		function( target, els ) {\n			var j = target.length,\n				i = 0;\n			// Can\'t trust NodeList.length\n			while ( (target[j++] = els[i++]) ) {}\n			target.length = j - 1;\n		}\n	};\n}\n\nfunction Sizzle( selector, context, results, seed ) {\n	var match, elem, m, nodeType,\n		// QSA vars\n		i, groups, old, nid, newContext, newSelector;\n\n	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {\n		setDocument( context );\n	}\n\n	context = context || document;\n	results = results || [];\n	nodeType = context.nodeType;\n\n	if ( typeof selector !== \"string\" || !selector ||\n		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {\n\n		return results;\n	}\n\n	if ( !seed && documentIsHTML ) {\n\n		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)\n		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {\n			// Speed-up: Sizzle(\"#ID\")\n			if ( (m = match[1]) ) {\n				if ( nodeType === 9 ) {\n					elem = context.getElementById( m );\n					// Check parentNode to catch when Blackberry 4.6 returns\n					// nodes that are no longer in the document (jQuery #6963)\n					if ( elem && elem.parentNode ) {\n						// Handle the case where IE, Opera, and Webkit return items\n						// by name instead of ID\n						if ( elem.id === m ) {\n							results.push( elem );\n							return results;\n						}\n					} else {\n						return results;\n					}\n				} else {\n					// Context is not a document\n					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&\n						contains( context, elem ) && elem.id === m ) {\n						results.push( elem );\n						return results;\n					}\n				}\n\n			// Speed-up: Sizzle(\"TAG\")\n			} else if ( match[2] ) {\n				push.apply( results, context.getElementsByTagName( selector ) );\n				return results;\n\n			// Speed-up: Sizzle(\".CLASS\")\n			} else if ( (m = match[3]) && support.getElementsByClassName ) {\n				push.apply( results, context.getElementsByClassName( m ) );\n				return results;\n			}\n		}\n\n		// QSA path\n		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {\n			nid = old = expando;\n			newContext = context;\n			newSelector = nodeType !== 1 && selector;\n\n			// qSA works strangely on Element-rooted queries\n			// We can work around this by specifying an extra ID on the root\n			// and working up from there (Thanks to Andrew Dupont for the technique)\n			// IE 8 doesn\'t work on object elements\n			if ( nodeType === 1 && context.nodeName.toLowerCase() !== \"object\" ) {\n				groups = tokenize( selector );\n\n				if ( (old = context.getAttribute(\"id\")) ) {\n					nid = old.replace( rescape, \"\\\\$&\" );\n				} else {\n					context.setAttribute( \"id\", nid );\n				}\n				nid = \"[id=\'\" + nid + \"\'] \";\n\n				i = groups.length;\n				while ( i-- ) {\n					groups[i] = nid + toSelector( groups[i] );\n				}\n				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;\n				newSelector = groups.join(\",\");\n			}\n\n			if ( newSelector ) {\n				try {\n					push.apply( results,\n						newContext.querySelectorAll( newSelector )\n					);\n					return results;\n				} catch(qsaError) {\n				} finally {\n					if ( !old ) {\n						context.removeAttribute(\"id\");\n					}\n				}\n			}\n		}\n	}\n\n	// All others\n	return select( selector.replace( rtrim, \"$1\" ), context, results, seed );\n}\n\n/**\n * Create key-value caches of limited size\n * @returns {Function(string, Object)} Returns the Object data after storing it on itself with\n *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)\n *	deleting the oldest entry\n */\nfunction createCache() {\n	var keys = [];\n\n	function cache( key, value ) {\n		// Use (key + \" \") to avoid collision with native prototype properties (see Issue #157)\n		if ( keys.push( key + \" \" ) > Expr.cacheLength ) {\n			// Only keep the most recent entries\n			delete cache[ keys.shift() ];\n		}\n		return (cache[ key + \" \" ] = value);\n	}\n	return cache;\n}\n\n/**\n * Mark a function for special use by Sizzle\n * @param {Function} fn The function to mark\n */\nfunction markFunction( fn ) {\n	fn[ expando ] = true;\n	return fn;\n}\n\n/**\n * Support testing using an element\n * @param {Function} fn Passed the created div and expects a boolean result\n */\nfunction assert( fn ) {\n	var div = document.createElement(\"div\");\n\n	try {\n		return !!fn( div );\n	} catch (e) {\n		return false;\n	} finally {\n		// Remove from its parent by default\n		if ( div.parentNode ) {\n			div.parentNode.removeChild( div );\n		}\n		// release memory in IE\n		div = null;\n	}\n}\n\n/**\n * Adds the same handler for all of the specified attrs\n * @param {String} attrs Pipe-separated list of attributes\n * @param {Function} handler The method that will be applied\n */\nfunction addHandle( attrs, handler ) {\n	var arr = attrs.split(\"|\"),\n		i = attrs.length;\n\n	while ( i-- ) {\n		Expr.attrHandle[ arr[i] ] = handler;\n	}\n}\n\n/**\n * Checks document order of two siblings\n * @param {Element} a\n * @param {Element} b\n * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b\n */\nfunction siblingCheck( a, b ) {\n	var cur = b && a,\n		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&\n			( ~b.sourceIndex || MAX_NEGATIVE ) -\n			( ~a.sourceIndex || MAX_NEGATIVE );\n\n	// Use IE sourceIndex if available on both nodes\n	if ( diff ) {\n		return diff;\n	}\n\n	// Check if b follows a\n	if ( cur ) {\n		while ( (cur = cur.nextSibling) ) {\n			if ( cur === b ) {\n				return -1;\n			}\n		}\n	}\n\n	return a ? 1 : -1;\n}\n\n/**\n * Returns a function to use in pseudos for input types\n * @param {String} type\n */\nfunction createInputPseudo( type ) {\n	return function( elem ) {\n		var name = elem.nodeName.toLowerCase();\n		return name === \"input\" && elem.type === type;\n	};\n}\n\n/**\n * Returns a function to use in pseudos for buttons\n * @param {String} type\n */\nfunction createButtonPseudo( type ) {\n	return function( elem ) {\n		var name = elem.nodeName.toLowerCase();\n		return (name === \"input\" || name === \"button\") && elem.type === type;\n	};\n}\n\n/**\n * Returns a function to use in pseudos for positionals\n * @param {Function} fn\n */\nfunction createPositionalPseudo( fn ) {\n	return markFunction(function( argument ) {\n		argument = +argument;\n		return markFunction(function( seed, matches ) {\n			var j,\n				matchIndexes = fn( [], seed.length, argument ),\n				i = matchIndexes.length;\n\n			// Match elements found at the specified indexes\n			while ( i-- ) {\n				if ( seed[ (j = matchIndexes[i]) ] ) {\n					seed[j] = !(matches[j] = seed[j]);\n				}\n			}\n		});\n	});\n}\n\n/**\n * Checks a node for validity as a Sizzle context\n * @param {Element|Object=} context\n * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value\n */\nfunction testContext( context ) {\n	return context && typeof context.getElementsByTagName !== \"undefined\" && context;\n}\n\n// Expose support vars for convenience\nsupport = Sizzle.support = {};\n\n/**\n * Detects XML nodes\n * @param {Element|Object} elem An element or a document\n * @returns {Boolean} True iff elem is a non-HTML XML node\n */\nisXML = Sizzle.isXML = function( elem ) {\n	// documentElement is verified for cases where it doesn\'t yet exist\n	// (such as loading iframes in IE - #4833)\n	var documentElement = elem && (elem.ownerDocument || elem).documentElement;\n	return documentElement ? documentElement.nodeName !== \"HTML\" : false;\n};\n\n/**\n * Sets document-related variables once based on the current document\n * @param {Element|Object} [doc] An element or document object to use to set the document\n * @returns {Object} Returns the current document\n */\nsetDocument = Sizzle.setDocument = function( node ) {\n	var hasCompare, parent,\n		doc = node ? node.ownerDocument || node : preferredDoc;\n\n	// If no document and documentElement is available, return\n	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {\n		return document;\n	}\n\n	// Set our document\n	document = doc;\n	docElem = doc.documentElement;\n	parent = doc.defaultView;\n\n	// Support: IE>8\n	// If iframe document is assigned to \"document\" variable and if iframe has been reloaded,\n	// IE will throw \"permission denied\" error when accessing \"document\" variable, see jQuery #13936\n	// IE6-8 do not support the defaultView property so parent will be undefined\n	if ( parent && parent !== parent.top ) {\n		// IE11 does not have attachEvent, so all must suffer\n		if ( parent.addEventListener ) {\n			parent.addEventListener( \"unload\", unloadHandler, false );\n		} else if ( parent.attachEvent ) {\n			parent.attachEvent( \"onunload\", unloadHandler );\n		}\n	}\n\n	/* Support tests\n	---------------------------------------------------------------------- */\n	documentIsHTML = !isXML( doc );\n\n	/* Attributes\n	---------------------------------------------------------------------- */\n\n	// Support: IE<8\n	// Verify that getAttribute really returns attributes and not properties\n	// (excepting IE8 booleans)\n	support.attributes = assert(function( div ) {\n		div.className = \"i\";\n		return !div.getAttribute(\"className\");\n	});\n\n	/* getElement(s)By*\n	---------------------------------------------------------------------- */\n\n	// Check if getElementsByTagName(\"*\") returns only elements\n	support.getElementsByTagName = assert(function( div ) {\n		div.appendChild( doc.createComment(\"\") );\n		return !div.getElementsByTagName(\"*\").length;\n	});\n\n	// Support: IE<9\n	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );\n\n	// Support: IE<10\n	// Check if getElementById returns elements by name\n	// The broken getElementById methods don\'t pick up programatically-set names,\n	// so use a roundabout getElementsByName test\n	support.getById = assert(function( div ) {\n		docElem.appendChild( div ).id = expando;\n		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;\n	});\n\n	// ID find and filter\n	if ( support.getById ) {\n		Expr.find[\"ID\"] = function( id, context ) {\n			if ( typeof context.getElementById !== \"undefined\" && documentIsHTML ) {\n				var m = context.getElementById( id );\n				// Check parentNode to catch when Blackberry 4.6 returns\n				// nodes that are no longer in the document #6963\n				return m && m.parentNode ? [ m ] : [];\n			}\n		};\n		Expr.filter[\"ID\"] = function( id ) {\n			var attrId = id.replace( runescape, funescape );\n			return function( elem ) {\n				return elem.getAttribute(\"id\") === attrId;\n			};\n		};\n	} else {\n		// Support: IE6/7\n		// getElementById is not reliable as a find shortcut\n		delete Expr.find[\"ID\"];\n\n		Expr.filter[\"ID\"] =  function( id ) {\n			var attrId = id.replace( runescape, funescape );\n			return function( elem ) {\n				var node = typeof elem.getAttributeNode !== \"undefined\" && elem.getAttributeNode(\"id\");\n				return node && node.value === attrId;\n			};\n		};\n	}\n\n	// Tag\n	Expr.find[\"TAG\"] = support.getElementsByTagName ?\n		function( tag, context ) {\n			if ( typeof context.getElementsByTagName !== \"undefined\" ) {\n				return context.getElementsByTagName( tag );\n\n			// DocumentFragment nodes don\'t have gEBTN\n			} else if ( support.qsa ) {\n				return context.querySelectorAll( tag );\n			}\n		} :\n\n		function( tag, context ) {\n			var elem,\n				tmp = [],\n				i = 0,\n				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too\n				results = context.getElementsByTagName( tag );\n\n			// Filter out possible comments\n			if ( tag === \"*\" ) {\n				while ( (elem = results[i++]) ) {\n					if ( elem.nodeType === 1 ) {\n						tmp.push( elem );\n					}\n				}\n\n				return tmp;\n			}\n			return results;\n		};\n\n	// Class\n	Expr.find[\"CLASS\"] = support.getElementsByClassName && function( className, context ) {\n		if ( documentIsHTML ) {\n			return context.getElementsByClassName( className );\n		}\n	};\n\n	/* QSA/matchesSelector\n	---------------------------------------------------------------------- */\n\n	// QSA and matchesSelector support\n\n	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)\n	rbuggyMatches = [];\n\n	// qSa(:focus) reports false when true (Chrome 21)\n	// We allow this because of a bug in IE8/9 that throws an error\n	// whenever `document.activeElement` is accessed on an iframe\n	// So, we allow :focus to pass through QSA all the time to avoid the IE error\n	// See http://bugs.jquery.com/ticket/13378\n	rbuggyQSA = [];\n\n	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {\n		// Build QSA regex\n		// Regex strategy adopted from Diego Perini\n		assert(function( div ) {\n			// Select is set to empty string on purpose\n			// This is to test IE\'s treatment of not explicitly\n			// setting a boolean content attribute,\n			// since its presence should be enough\n			// http://bugs.jquery.com/ticket/12359\n			docElem.appendChild( div ).innerHTML = \"<a id=\'\" + expando + \"\'></a>\" +\n				\"<select id=\'\" + expando + \"-\\f]\' msallowcapture=\'\'>\" +\n				\"<option selected=\'\'></option></select>\";\n\n			// Support: IE8, Opera 11-12.16\n			// Nothing should be selected when empty strings follow ^= or $= or *=\n			// The test attribute must be unknown in Opera but \"safe\" for WinRT\n			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section\n			if ( div.querySelectorAll(\"[msallowcapture^=\'\']\").length ) {\n				rbuggyQSA.push( \"[*^$]=\" + whitespace + \"*(?:\'\'|\\\"\\\")\" );\n			}\n\n			// Support: IE8\n			// Boolean attributes and \"value\" are not treated correctly\n			if ( !div.querySelectorAll(\"[selected]\").length ) {\n				rbuggyQSA.push( \"\\\\[\" + whitespace + \"*(?:value|\" + booleans + \")\" );\n			}\n\n			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+\n			if ( !div.querySelectorAll( \"[id~=\" + expando + \"-]\" ).length ) {\n				rbuggyQSA.push(\"~=\");\n			}\n\n			// Webkit/Opera - :checked should return selected option elements\n			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked\n			// IE8 throws error here and will not see later tests\n			if ( !div.querySelectorAll(\":checked\").length ) {\n				rbuggyQSA.push(\":checked\");\n			}\n\n			// Support: Safari 8+, iOS 8+\n			// https://bugs.webkit.org/show_bug.cgi?id=136851\n			// In-page `selector#id sibing-combinator selector` fails\n			if ( !div.querySelectorAll( \"a#\" + expando + \"+*\" ).length ) {\n				rbuggyQSA.push(\".#.+[+~]\");\n			}\n		});\n\n		assert(function( div ) {\n			// Support: Windows 8 Native Apps\n			// The type and name attributes are restricted during .innerHTML assignment\n			var input = doc.createElement(\"input\");\n			input.setAttribute( \"type\", \"hidden\" );\n			div.appendChild( input ).setAttribute( \"name\", \"D\" );\n\n			// Support: IE8\n			// Enforce case-sensitivity of name attribute\n			if ( div.querySelectorAll(\"[name=d]\").length ) {\n				rbuggyQSA.push( \"name\" + whitespace + \"*[*^$|!~]?=\" );\n			}\n\n			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)\n			// IE8 throws error here and will not see later tests\n			if ( !div.querySelectorAll(\":enabled\").length ) {\n				rbuggyQSA.push( \":enabled\", \":disabled\" );\n			}\n\n			// Opera 10-11 does not throw on post-comma invalid pseudos\n			div.querySelectorAll(\"*,:x\");\n			rbuggyQSA.push(\",.*:\");\n		});\n	}\n\n	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||\n		docElem.webkitMatchesSelector ||\n		docElem.mozMatchesSelector ||\n		docElem.oMatchesSelector ||\n		docElem.msMatchesSelector) )) ) {\n\n		assert(function( div ) {\n			// Check to see if it\'s possible to do matchesSelector\n			// on a disconnected node (IE 9)\n			support.disconnectedMatch = matches.call( div, \"div\" );\n\n			// This should fail with an exception\n			// Gecko does not error, returns false instead\n			matches.call( div, \"[s!=\'\']:x\" );\n			rbuggyMatches.push( \"!=\", pseudos );\n		});\n	}\n\n	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join(\"|\") );\n	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join(\"|\") );\n\n	/* Contains\n	---------------------------------------------------------------------- */\n	hasCompare = rnative.test( docElem.compareDocumentPosition );\n\n	// Element contains another\n	// Purposefully does not implement inclusive descendent\n	// As in, an element does not contain itself\n	contains = hasCompare || rnative.test( docElem.contains ) ?\n		function( a, b ) {\n			var adown = a.nodeType === 9 ? a.documentElement : a,\n				bup = b && b.parentNode;\n			return a === bup || !!( bup && bup.nodeType === 1 && (\n				adown.contains ?\n					adown.contains( bup ) :\n					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16\n			));\n		} :\n		function( a, b ) {\n			if ( b ) {\n				while ( (b = b.parentNode) ) {\n					if ( b === a ) {\n						return true;\n					}\n				}\n			}\n			return false;\n		};\n\n	/* Sorting\n	---------------------------------------------------------------------- */\n\n	// Document order sorting\n	sortOrder = hasCompare ?\n	function( a, b ) {\n\n		// Flag for duplicate removal\n		if ( a === b ) {\n			hasDuplicate = true;\n			return 0;\n		}\n\n		// Sort on method existence if only one input has compareDocumentPosition\n		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;\n		if ( compare ) {\n			return compare;\n		}\n\n		// Calculate position if both inputs belong to the same document\n		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?\n			a.compareDocumentPosition( b ) :\n\n			// Otherwise we know they are disconnected\n			1;\n\n		// Disconnected nodes\n		if ( compare & 1 ||\n			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {\n\n			// Choose the first element that is related to our preferred document\n			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {\n				return -1;\n			}\n			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {\n				return 1;\n			}\n\n			// Maintain original order\n			return sortInput ?\n				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :\n				0;\n		}\n\n		return compare & 4 ? -1 : 1;\n	} :\n	function( a, b ) {\n		// Exit early if the nodes are identical\n		if ( a === b ) {\n			hasDuplicate = true;\n			return 0;\n		}\n\n		var cur,\n			i = 0,\n			aup = a.parentNode,\n			bup = b.parentNode,\n			ap = [ a ],\n			bp = [ b ];\n\n		// Parentless nodes are either documents or disconnected\n		if ( !aup || !bup ) {\n			return a === doc ? -1 :\n				b === doc ? 1 :\n				aup ? -1 :\n				bup ? 1 :\n				sortInput ?\n				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :\n				0;\n\n		// If the nodes are siblings, we can do a quick check\n		} else if ( aup === bup ) {\n			return siblingCheck( a, b );\n		}\n\n		// Otherwise we need full lists of their ancestors for comparison\n		cur = a;\n		while ( (cur = cur.parentNode) ) {\n			ap.unshift( cur );\n		}\n		cur = b;\n		while ( (cur = cur.parentNode) ) {\n			bp.unshift( cur );\n		}\n\n		// Walk down the tree looking for a discrepancy\n		while ( ap[i] === bp[i] ) {\n			i++;\n		}\n\n		return i ?\n			// Do a sibling check if the nodes have a common ancestor\n			siblingCheck( ap[i], bp[i] ) :\n\n			// Otherwise nodes in our document sort first\n			ap[i] === preferredDoc ? -1 :\n			bp[i] === preferredDoc ? 1 :\n			0;\n	};\n\n	return doc;\n};\n\nSizzle.matches = function( expr, elements ) {\n	return Sizzle( expr, null, null, elements );\n};\n\nSizzle.matchesSelector = function( elem, expr ) {\n	// Set document vars if needed\n	if ( ( elem.ownerDocument || elem ) !== document ) {\n		setDocument( elem );\n	}\n\n	// Make sure that attribute selectors are quoted\n	expr = expr.replace( rattributeQuotes, \"=\'$1\']\" );\n\n	if ( support.matchesSelector && documentIsHTML &&\n		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&\n		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {\n\n		try {\n			var ret = matches.call( elem, expr );\n\n			// IE 9\'s matchesSelector returns false on disconnected nodes\n			if ( ret || support.disconnectedMatch ||\n					// As well, disconnected nodes are said to be in a document\n					// fragment in IE 9\n					elem.document && elem.document.nodeType !== 11 ) {\n				return ret;\n			}\n		} catch (e) {}\n	}\n\n	return Sizzle( expr, document, null, [ elem ] ).length > 0;\n};\n\nSizzle.contains = function( context, elem ) {\n	// Set document vars if needed\n	if ( ( context.ownerDocument || context ) !== document ) {\n		setDocument( context );\n	}\n	return contains( context, elem );\n};\n\nSizzle.attr = function( elem, name ) {\n	// Set document vars if needed\n	if ( ( elem.ownerDocument || elem ) !== document ) {\n		setDocument( elem );\n	}\n\n	var fn = Expr.attrHandle[ name.toLowerCase() ],\n		// Don\'t get fooled by Object.prototype properties (jQuery #13807)\n		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?\n			fn( elem, name, !documentIsHTML ) :\n			undefined;\n\n	return val !== undefined ?\n		val :\n		support.attributes || !documentIsHTML ?\n			elem.getAttribute( name ) :\n			(val = elem.getAttributeNode(name)) && val.specified ?\n				val.value :\n				null;\n};\n\nSizzle.error = function( msg ) {\n	throw new Error( \"Syntax error, unrecognized expression: \" + msg );\n};\n\n/**\n * Document sorting and removing duplicates\n * @param {ArrayLike} results\n */\nSizzle.uniqueSort = function( results ) {\n	var elem,\n		duplicates = [],\n		j = 0,\n		i = 0;\n\n	// Unless we *know* we can detect duplicates, assume their presence\n	hasDuplicate = !support.detectDuplicates;\n	sortInput = !support.sortStable && results.slice( 0 );\n	results.sort( sortOrder );\n\n	if ( hasDuplicate ) {\n		while ( (elem = results[i++]) ) {\n			if ( elem === results[ i ] ) {\n				j = duplicates.push( i );\n			}\n		}\n		while ( j-- ) {\n			results.splice( duplicates[ j ], 1 );\n		}\n	}\n\n	// Clear input after sorting to release objects\n	// See https://github.com/jquery/sizzle/pull/225\n	sortInput = null;\n\n	return results;\n};\n\n/**\n * Utility function for retrieving the text value of an array of DOM nodes\n * @param {Array|Element} elem\n */\ngetText = Sizzle.getText = function( elem ) {\n	var node,\n		ret = \"\",\n		i = 0,\n		nodeType = elem.nodeType;\n\n	if ( !nodeType ) {\n		// If no nodeType, this is expected to be an array\n		while ( (node = elem[i++]) ) {\n			// Do not traverse comment nodes\n			ret += getText( node );\n		}\n	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {\n		// Use textContent for elements\n		// innerText usage removed for consistency of new lines (jQuery #11153)\n		if ( typeof elem.textContent === \"string\" ) {\n			return elem.textContent;\n		} else {\n			// Traverse its children\n			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {\n				ret += getText( elem );\n			}\n		}\n	} else if ( nodeType === 3 || nodeType === 4 ) {\n		return elem.nodeValue;\n	}\n	// Do not include comment or processing instruction nodes\n\n	return ret;\n};\n\nExpr = Sizzle.selectors = {\n\n	// Can be adjusted by the user\n	cacheLength: 50,\n\n	createPseudo: markFunction,\n\n	match: matchExpr,\n\n	attrHandle: {},\n\n	find: {},\n\n	relative: {\n		\">\": { dir: \"parentNode\", first: true },\n		\" \": { dir: \"parentNode\" },\n		\"+\": { dir: \"previousSibling\", first: true },\n		\"~\": { dir: \"previousSibling\" }\n	},\n\n	preFilter: {\n		\"ATTR\": function( match ) {\n			match[1] = match[1].replace( runescape, funescape );\n\n			// Move the given value to match[3] whether quoted or unquoted\n			match[3] = ( match[3] || match[4] || match[5] || \"\" ).replace( runescape, funescape );\n\n			if ( match[2] === \"~=\" ) {\n				match[3] = \" \" + match[3] + \" \";\n			}\n\n			return match.slice( 0, 4 );\n		},\n\n		\"CHILD\": function( match ) {\n			/* matches from matchExpr[\"CHILD\"]\n				1 type (only|nth|...)\n				2 what (child|of-type)\n				3 argument (even|odd|\\d*|\\d*n([+-]\\d+)?|...)\n				4 xn-component of xn+y argument ([+-]?\\d*n|)\n				5 sign of xn-component\n				6 x of xn-component\n				7 sign of y-component\n				8 y of y-component\n			*/\n			match[1] = match[1].toLowerCase();\n\n			if ( match[1].slice( 0, 3 ) === \"nth\" ) {\n				// nth-* requires argument\n				if ( !match[3] ) {\n					Sizzle.error( match[0] );\n				}\n\n				// numeric x and y parameters for Expr.filter.CHILD\n				// remember that false/true cast respectively to 0/1\n				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === \"even\" || match[3] === \"odd\" ) );\n				match[5] = +( ( match[7] + match[8] ) || match[3] === \"odd\" );\n\n			// other types prohibit arguments\n			} else if ( match[3] ) {\n				Sizzle.error( match[0] );\n			}\n\n			return match;\n		},\n\n		\"PSEUDO\": function( match ) {\n			var excess,\n				unquoted = !match[6] && match[2];\n\n			if ( matchExpr[\"CHILD\"].test( match[0] ) ) {\n				return null;\n			}\n\n			// Accept quoted arguments as-is\n			if ( match[3] ) {\n				match[2] = match[4] || match[5] || \"\";\n\n			// Strip excess characters from unquoted arguments\n			} else if ( unquoted && rpseudo.test( unquoted ) &&\n				// Get excess from tokenize (recursively)\n				(excess = tokenize( unquoted, true )) &&\n				// advance to the next closing parenthesis\n				(excess = unquoted.indexOf( \")\", unquoted.length - excess ) - unquoted.length) ) {\n\n				// excess is a negative index\n				match[0] = match[0].slice( 0, excess );\n				match[2] = unquoted.slice( 0, excess );\n			}\n\n			// Return only captures needed by the pseudo filter method (type and argument)\n			return match.slice( 0, 3 );\n		}\n	},\n\n	filter: {\n\n		\"TAG\": function( nodeNameSelector ) {\n			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();\n			return nodeNameSelector === \"*\" ?\n				function() { return true; } :\n				function( elem ) {\n					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;\n				};\n		},\n\n		\"CLASS\": function( className ) {\n			var pattern = classCache[ className + \" \" ];\n\n			return pattern ||\n				(pattern = new RegExp( \"(^|\" + whitespace + \")\" + className + \"(\" + whitespace + \"|$)\" )) &&\n				classCache( className, function( elem ) {\n					return pattern.test( typeof elem.className === \"string\" && elem.className || typeof elem.getAttribute !== \"undefined\" && elem.getAttribute(\"class\") || \"\" );\n				});\n		},\n\n		\"ATTR\": function( name, operator, check ) {\n			return function( elem ) {\n				var result = Sizzle.attr( elem, name );\n\n				if ( result == null ) {\n					return operator === \"!=\";\n				}\n				if ( !operator ) {\n					return true;\n				}\n\n				result += \"\";\n\n				return operator === \"=\" ? result === check :\n					operator === \"!=\" ? result !== check :\n					operator === \"^=\" ? check && result.indexOf( check ) === 0 :\n					operator === \"*=\" ? check && result.indexOf( check ) > -1 :\n					operator === \"$=\" ? check && result.slice( -check.length ) === check :\n					operator === \"~=\" ? ( \" \" + result.replace( rwhitespace, \" \" ) + \" \" ).indexOf( check ) > -1 :\n					operator === \"|=\" ? result === check || result.slice( 0, check.length + 1 ) === check + \"-\" :\n					false;\n			};\n		},\n\n		\"CHILD\": function( type, what, argument, first, last ) {\n			var simple = type.slice( 0, 3 ) !== \"nth\",\n				forward = type.slice( -4 ) !== \"last\",\n				ofType = what === \"of-type\";\n\n			return first === 1 && last === 0 ?\n\n				// Shortcut for :nth-*(n)\n				function( elem ) {\n					return !!elem.parentNode;\n				} :\n\n				function( elem, context, xml ) {\n					var cache, outerCache, node, diff, nodeIndex, start,\n						dir = simple !== forward ? \"nextSibling\" : \"previousSibling\",\n						parent = elem.parentNode,\n						name = ofType && elem.nodeName.toLowerCase(),\n						useCache = !xml && !ofType;\n\n					if ( parent ) {\n\n						// :(first|last|only)-(child|of-type)\n						if ( simple ) {\n							while ( dir ) {\n								node = elem;\n								while ( (node = node[ dir ]) ) {\n									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {\n										return false;\n									}\n								}\n								// Reverse direction for :only-* (if we haven\'t yet done so)\n								start = dir = type === \"only\" && !start && \"nextSibling\";\n							}\n							return true;\n						}\n\n						start = [ forward ? parent.firstChild : parent.lastChild ];\n\n						// non-xml :nth-child(...) stores cache data on `parent`\n						if ( forward && useCache ) {\n							// Seek `elem` from a previously-cached index\n							outerCache = parent[ expando ] || (parent[ expando ] = {});\n							cache = outerCache[ type ] || [];\n							nodeIndex = cache[0] === dirruns && cache[1];\n							diff = cache[0] === dirruns && cache[2];\n							node = nodeIndex && parent.childNodes[ nodeIndex ];\n\n							while ( (node = ++nodeIndex && node && node[ dir ] ||\n\n								// Fallback to seeking `elem` from the start\n								(diff = nodeIndex = 0) || start.pop()) ) {\n\n								// When found, cache indexes on `parent` and break\n								if ( node.nodeType === 1 && ++diff && node === elem ) {\n									outerCache[ type ] = [ dirruns, nodeIndex, diff ];\n									break;\n								}\n							}\n\n						// Use previously-cached element index if available\n						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {\n							diff = cache[1];\n\n						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)\n						} else {\n							// Use the same loop as above to seek `elem` from the start\n							while ( (node = ++nodeIndex && node && node[ dir ] ||\n								(diff = nodeIndex = 0) || start.pop()) ) {\n\n								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {\n									// Cache the index of each encountered element\n									if ( useCache ) {\n										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];\n									}\n\n									if ( node === elem ) {\n										break;\n									}\n								}\n							}\n						}\n\n						// Incorporate the offset, then check against cycle size\n						diff -= last;\n						return diff === first || ( diff % first === 0 && diff / first >= 0 );\n					}\n				};\n		},\n\n		\"PSEUDO\": function( pseudo, argument ) {\n			// pseudo-class names are case-insensitive\n			// http://www.w3.org/TR/selectors/#pseudo-classes\n			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters\n			// Remember that setFilters inherits from pseudos\n			var args,\n				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||\n					Sizzle.error( \"unsupported pseudo: \" + pseudo );\n\n			// The user may use createPseudo to indicate that\n			// arguments are needed to create the filter function\n			// just as Sizzle does\n			if ( fn[ expando ] ) {\n				return fn( argument );\n			}\n\n			// But maintain support for old signatures\n			if ( fn.length > 1 ) {\n				args = [ pseudo, pseudo, \"\", argument ];\n				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?\n					markFunction(function( seed, matches ) {\n						var idx,\n							matched = fn( seed, argument ),\n							i = matched.length;\n						while ( i-- ) {\n							idx = indexOf( seed, matched[i] );\n							seed[ idx ] = !( matches[ idx ] = matched[i] );\n						}\n					}) :\n					function( elem ) {\n						return fn( elem, 0, args );\n					};\n			}\n\n			return fn;\n		}\n	},\n\n	pseudos: {\n		// Potentially complex pseudos\n		\"not\": markFunction(function( selector ) {\n			// Trim the selector passed to compile\n			// to avoid treating leading and trailing\n			// spaces as combinators\n			var input = [],\n				results = [],\n				matcher = compile( selector.replace( rtrim, \"$1\" ) );\n\n			return matcher[ expando ] ?\n				markFunction(function( seed, matches, context, xml ) {\n					var elem,\n						unmatched = matcher( seed, null, xml, [] ),\n						i = seed.length;\n\n					// Match elements unmatched by `matcher`\n					while ( i-- ) {\n						if ( (elem = unmatched[i]) ) {\n							seed[i] = !(matches[i] = elem);\n						}\n					}\n				}) :\n				function( elem, context, xml ) {\n					input[0] = elem;\n					matcher( input, null, xml, results );\n					// Don\'t keep the element (issue #299)\n					input[0] = null;\n					return !results.pop();\n				};\n		}),\n\n		\"has\": markFunction(function( selector ) {\n			return function( elem ) {\n				return Sizzle( selector, elem ).length > 0;\n			};\n		}),\n\n		\"contains\": markFunction(function( text ) {\n			text = text.replace( runescape, funescape );\n			return function( elem ) {\n				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;\n			};\n		}),\n\n		// \"Whether an element is represented by a :lang() selector\n		// is based solely on the element\'s language value\n		// being equal to the identifier C,\n		// or beginning with the identifier C immediately followed by \"-\".\n		// The matching of C against the element\'s language value is performed case-insensitively.\n		// The identifier C does not have to be a valid language name.\"\n		// http://www.w3.org/TR/selectors/#lang-pseudo\n		\"lang\": markFunction( function( lang ) {\n			// lang value must be a valid identifier\n			if ( !ridentifier.test(lang || \"\") ) {\n				Sizzle.error( \"unsupported lang: \" + lang );\n			}\n			lang = lang.replace( runescape, funescape ).toLowerCase();\n			return function( elem ) {\n				var elemLang;\n				do {\n					if ( (elemLang = documentIsHTML ?\n						elem.lang :\n						elem.getAttribute(\"xml:lang\") || elem.getAttribute(\"lang\")) ) {\n\n						elemLang = elemLang.toLowerCase();\n						return elemLang === lang || elemLang.indexOf( lang + \"-\" ) === 0;\n					}\n				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );\n				return false;\n			};\n		}),\n\n		// Miscellaneous\n		\"target\": function( elem ) {\n			var hash = window.location && window.location.hash;\n			return hash && hash.slice( 1 ) === elem.id;\n		},\n\n		\"root\": function( elem ) {\n			return elem === docElem;\n		},\n\n		\"focus\": function( elem ) {\n			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);\n		},\n\n		// Boolean properties\n		\"enabled\": function( elem ) {\n			return elem.disabled === false;\n		},\n\n		\"disabled\": function( elem ) {\n			return elem.disabled === true;\n		},\n\n		\"checked\": function( elem ) {\n			// In CSS3, :checked should return both checked and selected elements\n			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked\n			var nodeName = elem.nodeName.toLowerCase();\n			return (nodeName === \"input\" && !!elem.checked) || (nodeName === \"option\" && !!elem.selected);\n		},\n\n		\"selected\": function( elem ) {\n			// Accessing this property makes selected-by-default\n			// options in Safari work properly\n			if ( elem.parentNode ) {\n				elem.parentNode.selectedIndex;\n			}\n\n			return elem.selected === true;\n		},\n\n		// Contents\n		\"empty\": function( elem ) {\n			// http://www.w3.org/TR/selectors/#empty-pseudo\n			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),\n			//   but not by others (comment: 8; processing instruction: 7; etc.)\n			// nodeType < 6 works because attributes (2) do not appear as children\n			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {\n				if ( elem.nodeType < 6 ) {\n					return false;\n				}\n			}\n			return true;\n		},\n\n		\"parent\": function( elem ) {\n			return !Expr.pseudos[\"empty\"]( elem );\n		},\n\n		// Element/input types\n		\"header\": function( elem ) {\n			return rheader.test( elem.nodeName );\n		},\n\n		\"input\": function( elem ) {\n			return rinputs.test( elem.nodeName );\n		},\n\n		\"button\": function( elem ) {\n			var name = elem.nodeName.toLowerCase();\n			return name === \"input\" && elem.type === \"button\" || name === \"button\";\n		},\n\n		\"text\": function( elem ) {\n			var attr;\n			return elem.nodeName.toLowerCase() === \"input\" &&\n				elem.type === \"text\" &&\n\n				// Support: IE<8\n				// New HTML5 attribute values (e.g., \"search\") appear with elem.type === \"text\"\n				( (attr = elem.getAttribute(\"type\")) == null || attr.toLowerCase() === \"text\" );\n		},\n\n		// Position-in-collection\n		\"first\": createPositionalPseudo(function() {\n			return [ 0 ];\n		}),\n\n		\"last\": createPositionalPseudo(function( matchIndexes, length ) {\n			return [ length - 1 ];\n		}),\n\n		\"eq\": createPositionalPseudo(function( matchIndexes, length, argument ) {\n			return [ argument < 0 ? argument + length : argument ];\n		}),\n\n		\"even\": createPositionalPseudo(function( matchIndexes, length ) {\n			var i = 0;\n			for ( ; i < length; i += 2 ) {\n				matchIndexes.push( i );\n			}\n			return matchIndexes;\n		}),\n\n		\"odd\": createPositionalPseudo(function( matchIndexes, length ) {\n			var i = 1;\n			for ( ; i < length; i += 2 ) {\n				matchIndexes.push( i );\n			}\n			return matchIndexes;\n		}),\n\n		\"lt\": createPositionalPseudo(function( matchIndexes, length, argument ) {\n			var i = argument < 0 ? argument + length : argument;\n			for ( ; --i >= 0; ) {\n				matchIndexes.push( i );\n			}\n			return matchIndexes;\n		}),\n\n		\"gt\": createPositionalPseudo(function( matchIndexes, length, argument ) {\n			var i = argument < 0 ? argument + length : argument;\n			for ( ; ++i < length; ) {\n				matchIndexes.push( i );\n			}\n			return matchIndexes;\n		})\n	}\n};\n\nExpr.pseudos[\"nth\"] = Expr.pseudos[\"eq\"];\n\n// Add button/input type pseudos\nfor ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {\n	Expr.pseudos[ i ] = createInputPseudo( i );\n}\nfor ( i in { submit: true, reset: true } ) {\n	Expr.pseudos[ i ] = createButtonPseudo( i );\n}\n\n// Easy API for creating new setFilters\nfunction setFilters() {}\nsetFilters.prototype = Expr.filters = Expr.pseudos;\nExpr.setFilters = new setFilters();\n\ntokenize = Sizzle.tokenize = function( selector, parseOnly ) {\n	var matched, match, tokens, type,\n		soFar, groups, preFilters,\n		cached = tokenCache[ selector + \" \" ];\n\n	if ( cached ) {\n		return parseOnly ? 0 : cached.slice( 0 );\n	}\n\n	soFar = selector;\n	groups = [];\n	preFilters = Expr.preFilter;\n\n	while ( soFar ) {\n\n		// Comma and first run\n		if ( !matched || (match = rcomma.exec( soFar )) ) {\n			if ( match ) {\n				// Don\'t consume trailing commas as valid\n				soFar = soFar.slice( match[0].length ) || soFar;\n			}\n			groups.push( (tokens = []) );\n		}\n\n		matched = false;\n\n		// Combinators\n		if ( (match = rcombinators.exec( soFar )) ) {\n			matched = match.shift();\n			tokens.push({\n				value: matched,\n				// Cast descendant combinators to space\n				type: match[0].replace( rtrim, \" \" )\n			});\n			soFar = soFar.slice( matched.length );\n		}\n\n		// Filters\n		for ( type in Expr.filter ) {\n			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||\n				(match = preFilters[ type ]( match ))) ) {\n				matched = match.shift();\n				tokens.push({\n					value: matched,\n					type: type,\n					matches: match\n				});\n				soFar = soFar.slice( matched.length );\n			}\n		}\n\n		if ( !matched ) {\n			break;\n		}\n	}\n\n	// Return the length of the invalid excess\n	// if we\'re just parsing\n	// Otherwise, throw an error or return tokens\n	return parseOnly ?\n		soFar.length :\n		soFar ?\n			Sizzle.error( selector ) :\n			// Cache the tokens\n			tokenCache( selector, groups ).slice( 0 );\n};\n\nfunction toSelector( tokens ) {\n	var i = 0,\n		len = tokens.length,\n		selector = \"\";\n	for ( ; i < len; i++ ) {\n		selector += tokens[i].value;\n	}\n	return selector;\n}\n\nfunction addCombinator( matcher, combinator, base ) {\n	var dir = combinator.dir,\n		checkNonElements = base && dir === \"parentNode\",\n		doneName = done++;\n\n	return combinator.first ?\n		// Check against closest ancestor/preceding element\n		function( elem, context, xml ) {\n			while ( (elem = elem[ dir ]) ) {\n				if ( elem.nodeType === 1 || checkNonElements ) {\n					return matcher( elem, context, xml );\n				}\n			}\n		} :\n\n		// Check against all ancestor/preceding elements\n		function( elem, context, xml ) {\n			var oldCache, outerCache,\n				newCache = [ dirruns, doneName ];\n\n			// We can\'t set arbitrary data on XML nodes, so they don\'t benefit from dir caching\n			if ( xml ) {\n				while ( (elem = elem[ dir ]) ) {\n					if ( elem.nodeType === 1 || checkNonElements ) {\n						if ( matcher( elem, context, xml ) ) {\n							return true;\n						}\n					}\n				}\n			} else {\n				while ( (elem = elem[ dir ]) ) {\n					if ( elem.nodeType === 1 || checkNonElements ) {\n						outerCache = elem[ expando ] || (elem[ expando ] = {});\n						if ( (oldCache = outerCache[ dir ]) &&\n							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {\n\n							// Assign to newCache so results back-propagate to previous elements\n							return (newCache[ 2 ] = oldCache[ 2 ]);\n						} else {\n							// Reuse newcache so results back-propagate to previous elements\n							outerCache[ dir ] = newCache;\n\n							// A match means we\'re done; a fail means we have to keep checking\n							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {\n								return true;\n							}\n						}\n					}\n				}\n			}\n		};\n}\n\nfunction elementMatcher( matchers ) {\n	return matchers.length > 1 ?\n		function( elem, context, xml ) {\n			var i = matchers.length;\n			while ( i-- ) {\n				if ( !matchers[i]( elem, context, xml ) ) {\n					return false;\n				}\n			}\n			return true;\n		} :\n		matchers[0];\n}\n\nfunction multipleContexts( selector, contexts, results ) {\n	var i = 0,\n		len = contexts.length;\n	for ( ; i < len; i++ ) {\n		Sizzle( selector, contexts[i], results );\n	}\n	return results;\n}\n\nfunction condense( unmatched, map, filter, context, xml ) {\n	var elem,\n		newUnmatched = [],\n		i = 0,\n		len = unmatched.length,\n		mapped = map != null;\n\n	for ( ; i < len; i++ ) {\n		if ( (elem = unmatched[i]) ) {\n			if ( !filter || filter( elem, context, xml ) ) {\n				newUnmatched.push( elem );\n				if ( mapped ) {\n					map.push( i );\n				}\n			}\n		}\n	}\n\n	return newUnmatched;\n}\n\nfunction setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {\n	if ( postFilter && !postFilter[ expando ] ) {\n		postFilter = setMatcher( postFilter );\n	}\n	if ( postFinder && !postFinder[ expando ] ) {\n		postFinder = setMatcher( postFinder, postSelector );\n	}\n	return markFunction(function( seed, results, context, xml ) {\n		var temp, i, elem,\n			preMap = [],\n			postMap = [],\n			preexisting = results.length,\n\n			// Get initial elements from seed or context\n			elems = seed || multipleContexts( selector || \"*\", context.nodeType ? [ context ] : context, [] ),\n\n			// Prefilter to get matcher input, preserving a map for seed-results synchronization\n			matcherIn = preFilter && ( seed || !selector ) ?\n				condense( elems, preMap, preFilter, context, xml ) :\n				elems,\n\n			matcherOut = matcher ?\n				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,\n				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?\n\n					// ...intermediate processing is necessary\n					[] :\n\n					// ...otherwise use results directly\n					results :\n				matcherIn;\n\n		// Find primary matches\n		if ( matcher ) {\n			matcher( matcherIn, matcherOut, context, xml );\n		}\n\n		// Apply postFilter\n		if ( postFilter ) {\n			temp = condense( matcherOut, postMap );\n			postFilter( temp, [], context, xml );\n\n			// Un-match failing elements by moving them back to matcherIn\n			i = temp.length;\n			while ( i-- ) {\n				if ( (elem = temp[i]) ) {\n					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);\n				}\n			}\n		}\n\n		if ( seed ) {\n			if ( postFinder || preFilter ) {\n				if ( postFinder ) {\n					// Get the final matcherOut by condensing this intermediate into postFinder contexts\n					temp = [];\n					i = matcherOut.length;\n					while ( i-- ) {\n						if ( (elem = matcherOut[i]) ) {\n							// Restore matcherIn since elem is not yet a final match\n							temp.push( (matcherIn[i] = elem) );\n						}\n					}\n					postFinder( null, (matcherOut = []), temp, xml );\n				}\n\n				// Move matched elements from seed to results to keep them synchronized\n				i = matcherOut.length;\n				while ( i-- ) {\n					if ( (elem = matcherOut[i]) &&\n						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {\n\n						seed[temp] = !(results[temp] = elem);\n					}\n				}\n			}\n\n		// Add elements to results, through postFinder if defined\n		} else {\n			matcherOut = condense(\n				matcherOut === results ?\n					matcherOut.splice( preexisting, matcherOut.length ) :\n					matcherOut\n			);\n			if ( postFinder ) {\n				postFinder( null, results, matcherOut, xml );\n			} else {\n				push.apply( results, matcherOut );\n			}\n		}\n	});\n}\n\nfunction matcherFromTokens( tokens ) {\n	var checkContext, matcher, j,\n		len = tokens.length,\n		leadingRelative = Expr.relative[ tokens[0].type ],\n		implicitRelative = leadingRelative || Expr.relative[\" \"],\n		i = leadingRelative ? 1 : 0,\n\n		// The foundational matcher ensures that elements are reachable from top-level context(s)\n		matchContext = addCombinator( function( elem ) {\n			return elem === checkContext;\n		}, implicitRelative, true ),\n		matchAnyContext = addCombinator( function( elem ) {\n			return indexOf( checkContext, elem ) > -1;\n		}, implicitRelative, true ),\n		matchers = [ function( elem, context, xml ) {\n			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (\n				(checkContext = context).nodeType ?\n					matchContext( elem, context, xml ) :\n					matchAnyContext( elem, context, xml ) );\n			// Avoid hanging onto element (issue #299)\n			checkContext = null;\n			return ret;\n		} ];\n\n	for ( ; i < len; i++ ) {\n		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {\n			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];\n		} else {\n			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );\n\n			// Return special upon seeing a positional matcher\n			if ( matcher[ expando ] ) {\n				// Find the next relative operator (if any) for proper handling\n				j = ++i;\n				for ( ; j < len; j++ ) {\n					if ( Expr.relative[ tokens[j].type ] ) {\n						break;\n					}\n				}\n				return setMatcher(\n					i > 1 && elementMatcher( matchers ),\n					i > 1 && toSelector(\n						// If the preceding token was a descendant combinator, insert an implicit any-element `*`\n						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === \" \" ? \"*\" : \"\" })\n					).replace( rtrim, \"$1\" ),\n					matcher,\n					i < j && matcherFromTokens( tokens.slice( i, j ) ),\n					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),\n					j < len && toSelector( tokens )\n				);\n			}\n			matchers.push( matcher );\n		}\n	}\n\n	return elementMatcher( matchers );\n}\n\nfunction matcherFromGroupMatchers( elementMatchers, setMatchers ) {\n	var bySet = setMatchers.length > 0,\n		byElement = elementMatchers.length > 0,\n		superMatcher = function( seed, context, xml, results, outermost ) {\n			var elem, j, matcher,\n				matchedCount = 0,\n				i = \"0\",\n				unmatched = seed && [],\n				setMatched = [],\n				contextBackup = outermostContext,\n				// We must always have either seed elements or outermost context\n				elems = seed || byElement && Expr.find[\"TAG\"]( \"*\", outermost ),\n				// Use integer dirruns iff this is the outermost matcher\n				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),\n				len = elems.length;\n\n			if ( outermost ) {\n				outermostContext = context !== document && context;\n			}\n\n			// Add elements passing elementMatchers directly to results\n			// Keep `i` a string if there are no elements so `matchedCount` will be \"00\" below\n			// Support: IE<9, Safari\n			// Tolerate NodeList properties (IE: \"length\"; Safari: <number>) matching elements by id\n			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {\n				if ( byElement && elem ) {\n					j = 0;\n					while ( (matcher = elementMatchers[j++]) ) {\n						if ( matcher( elem, context, xml ) ) {\n							results.push( elem );\n							break;\n						}\n					}\n					if ( outermost ) {\n						dirruns = dirrunsUnique;\n					}\n				}\n\n				// Track unmatched elements for set filters\n				if ( bySet ) {\n					// They will have gone through all possible matchers\n					if ( (elem = !matcher && elem) ) {\n						matchedCount--;\n					}\n\n					// Lengthen the array for every element, matched or not\n					if ( seed ) {\n						unmatched.push( elem );\n					}\n				}\n			}\n\n			// Apply set filters to unmatched elements\n			matchedCount += i;\n			if ( bySet && i !== matchedCount ) {\n				j = 0;\n				while ( (matcher = setMatchers[j++]) ) {\n					matcher( unmatched, setMatched, context, xml );\n				}\n\n				if ( seed ) {\n					// Reintegrate element matches to eliminate the need for sorting\n					if ( matchedCount > 0 ) {\n						while ( i-- ) {\n							if ( !(unmatched[i] || setMatched[i]) ) {\n								setMatched[i] = pop.call( results );\n							}\n						}\n					}\n\n					// Discard index placeholder values to get only actual matches\n					setMatched = condense( setMatched );\n				}\n\n				// Add matches to results\n				push.apply( results, setMatched );\n\n				// Seedless set matches succeeding multiple successful matchers stipulate sorting\n				if ( outermost && !seed && setMatched.length > 0 &&\n					( matchedCount + setMatchers.length ) > 1 ) {\n\n					Sizzle.uniqueSort( results );\n				}\n			}\n\n			// Override manipulation of globals by nested matchers\n			if ( outermost ) {\n				dirruns = dirrunsUnique;\n				outermostContext = contextBackup;\n			}\n\n			return unmatched;\n		};\n\n	return bySet ?\n		markFunction( superMatcher ) :\n		superMatcher;\n}\n\ncompile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {\n	var i,\n		setMatchers = [],\n		elementMatchers = [],\n		cached = compilerCache[ selector + \" \" ];\n\n	if ( !cached ) {\n		// Generate a function of recursive functions that can be used to check each element\n		if ( !match ) {\n			match = tokenize( selector );\n		}\n		i = match.length;\n		while ( i-- ) {\n			cached = matcherFromTokens( match[i] );\n			if ( cached[ expando ] ) {\n				setMatchers.push( cached );\n			} else {\n				elementMatchers.push( cached );\n			}\n		}\n\n		// Cache the compiled function\n		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );\n\n		// Save selector and tokenization\n		cached.selector = selector;\n	}\n	return cached;\n};\n\n/**\n * A low-level selection function that works with Sizzle\'s compiled\n *  selector functions\n * @param {String|Function} selector A selector or a pre-compiled\n *  selector function built with Sizzle.compile\n * @param {Element} context\n * @param {Array} [results]\n * @param {Array} [seed] A set of elements to match against\n */\nselect = Sizzle.select = function( selector, context, results, seed ) {\n	var i, tokens, token, type, find,\n		compiled = typeof selector === \"function\" && selector,\n		match = !seed && tokenize( (selector = compiled.selector || selector) );\n\n	results = results || [];\n\n	// Try to minimize operations if there is no seed and only one group\n	if ( match.length === 1 ) {\n\n		// Take a shortcut and set the context if the root selector is an ID\n		tokens = match[0] = match[0].slice( 0 );\n		if ( tokens.length > 2 && (token = tokens[0]).type === \"ID\" &&\n				support.getById && context.nodeType === 9 && documentIsHTML &&\n				Expr.relative[ tokens[1].type ] ) {\n\n			context = ( Expr.find[\"ID\"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];\n			if ( !context ) {\n				return results;\n\n			// Precompiled matchers will still verify ancestry, so step up a level\n			} else if ( compiled ) {\n				context = context.parentNode;\n			}\n\n			selector = selector.slice( tokens.shift().value.length );\n		}\n\n		// Fetch a seed set for right-to-left matching\n		i = matchExpr[\"needsContext\"].test( selector ) ? 0 : tokens.length;\n		while ( i-- ) {\n			token = tokens[i];\n\n			// Abort if we hit a combinator\n			if ( Expr.relative[ (type = token.type) ] ) {\n				break;\n			}\n			if ( (find = Expr.find[ type ]) ) {\n				// Search, expanding context for leading sibling combinators\n				if ( (seed = find(\n					token.matches[0].replace( runescape, funescape ),\n					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context\n				)) ) {\n\n					// If seed is empty or no tokens remain, we can return early\n					tokens.splice( i, 1 );\n					selector = seed.length && toSelector( tokens );\n					if ( !selector ) {\n						push.apply( results, seed );\n						return results;\n					}\n\n					break;\n				}\n			}\n		}\n	}\n\n	// Compile and execute a filtering function if one is not provided\n	// Provide `match` to avoid retokenization if we modified the selector above\n	( compiled || compile( selector, match ) )(\n		seed,\n		context,\n		!documentIsHTML,\n		results,\n		rsibling.test( selector ) && testContext( context.parentNode ) || context\n	);\n	return results;\n};\n\n// One-time assignments\n\n// Sort stability\nsupport.sortStable = expando.split(\"\").sort( sortOrder ).join(\"\") === expando;\n\n// Support: Chrome 14-35+\n// Always assume duplicates if they aren\'t passed to the comparison function\nsupport.detectDuplicates = !!hasDuplicate;\n\n// Initialize against the default document\nsetDocument();\n\n// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)\n// Detached nodes confoundingly follow *each other*\nsupport.sortDetached = assert(function( div1 ) {\n	// Should return 1, but returns 4 (following)\n	return div1.compareDocumentPosition( document.createElement(\"div\") ) & 1;\n});\n\n// Support: IE<8\n// Prevent attribute/property \"interpolation\"\n// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx\nif ( !assert(function( div ) {\n	div.innerHTML = \"<a href=\'#\'></a>\";\n	return div.firstChild.getAttribute(\"href\") === \"#\" ;\n}) ) {\n	addHandle( \"type|href|height|width\", function( elem, name, isXML ) {\n		if ( !isXML ) {\n			return elem.getAttribute( name, name.toLowerCase() === \"type\" ? 1 : 2 );\n		}\n	});\n}\n\n// Support: IE<9\n// Use defaultValue in place of getAttribute(\"value\")\nif ( !support.attributes || !assert(function( div ) {\n	div.innerHTML = \"<input/>\";\n	div.firstChild.setAttribute( \"value\", \"\" );\n	return div.firstChild.getAttribute( \"value\" ) === \"\";\n}) ) {\n	addHandle( \"value\", function( elem, name, isXML ) {\n		if ( !isXML && elem.nodeName.toLowerCase() === \"input\" ) {\n			return elem.defaultValue;\n		}\n	});\n}\n\n// Support: IE<9\n// Use getAttributeNode to fetch booleans when getAttribute lies\nif ( !assert(function( div ) {\n	return div.getAttribute(\"disabled\") == null;\n}) ) {\n	addHandle( booleans, function( elem, name, isXML ) {\n		var val;\n		if ( !isXML ) {\n			return elem[ name ] === true ? name.toLowerCase() :\n					(val = elem.getAttributeNode( name )) && val.specified ?\n					val.value :\n				null;\n		}\n	});\n}\n\nreturn Sizzle;\n\n})( window );\n\n\n\njQuery.find = Sizzle;\njQuery.expr = Sizzle.selectors;\njQuery.expr[\":\"] = jQuery.expr.pseudos;\njQuery.unique = Sizzle.uniqueSort;\njQuery.text = Sizzle.getText;\njQuery.isXMLDoc = Sizzle.isXML;\njQuery.contains = Sizzle.contains;\n\n\n\nvar rneedsContext = jQuery.expr.match.needsContext;\n\nvar rsingleTag = (/^<(\\w+)\\s*\\/?>(?:<\\/\\1>|)$/);\n\n\n\nvar risSimple = /^.[^:#\\[\\.,]*$/;\n\n// Implement the identical functionality for filter and not\nfunction winnow( elements, qualifier, not ) {\n	if ( jQuery.isFunction( qualifier ) ) {\n		return jQuery.grep( elements, function( elem, i ) {\n			/* jshint -W018 */\n			return !!qualifier.call( elem, i, elem ) !== not;\n		});\n\n	}\n\n	if ( qualifier.nodeType ) {\n		return jQuery.grep( elements, function( elem ) {\n			return ( elem === qualifier ) !== not;\n		});\n\n	}\n\n	if ( typeof qualifier === \"string\" ) {\n		if ( risSimple.test( qualifier ) ) {\n			return jQuery.filter( qualifier, elements, not );\n		}\n\n		qualifier = jQuery.filter( qualifier, elements );\n	}\n\n	return jQuery.grep( elements, function( elem ) {\n		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;\n	});\n}\n\njQuery.filter = function( expr, elems, not ) {\n	var elem = elems[ 0 ];\n\n	if ( not ) {\n		expr = \":not(\" + expr + \")\";\n	}\n\n	return elems.length === 1 && elem.nodeType === 1 ?\n		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :\n		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {\n			return elem.nodeType === 1;\n		}));\n};\n\njQuery.fn.extend({\n	find: function( selector ) {\n		var i,\n			ret = [],\n			self = this,\n			len = self.length;\n\n		if ( typeof selector !== \"string\" ) {\n			return this.pushStack( jQuery( selector ).filter(function() {\n				for ( i = 0; i < len; i++ ) {\n					if ( jQuery.contains( self[ i ], this ) ) {\n						return true;\n					}\n				}\n			}) );\n		}\n\n		for ( i = 0; i < len; i++ ) {\n			jQuery.find( selector, self[ i ], ret );\n		}\n\n		// Needed because $( selector, context ) becomes $( context ).find( selector )\n		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );\n		ret.selector = this.selector ? this.selector + \" \" + selector : selector;\n		return ret;\n	},\n	filter: function( selector ) {\n		return this.pushStack( winnow(this, selector || [], false) );\n	},\n	not: function( selector ) {\n		return this.pushStack( winnow(this, selector || [], true) );\n	},\n	is: function( selector ) {\n		return !!winnow(\n			this,\n\n			// If this is a positional/relative selector, check membership in the returned set\n			// so $(\"p:first\").is(\"p:last\") won\'t return true for a doc with two \"p\".\n			typeof selector === \"string\" && rneedsContext.test( selector ) ?\n				jQuery( selector ) :\n				selector || [],\n			false\n		).length;\n	}\n});\n\n\n// Initialize a jQuery object\n\n\n// A central reference to the root jQuery(document)\nvar rootjQuery,\n\n	// Use the correct document accordingly with window argument (sandbox)\n	document = window.document,\n\n	// A simple way to check for HTML strings\n	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)\n	// Strict HTML recognition (#11290: must start with <)\n	rquickExpr = /^(?:\\s*(<[\\w\\W]+>)[^>]*|#([\\w-]*))$/,\n\n	init = jQuery.fn.init = function( selector, context ) {\n		var match, elem;\n\n		// HANDLE: $(\"\"), $(null), $(undefined), $(false)\n		if ( !selector ) {\n			return this;\n		}\n\n		// Handle HTML strings\n		if ( typeof selector === \"string\" ) {\n			if ( selector.charAt(0) === \"<\" && selector.charAt( selector.length - 1 ) === \">\" && selector.length >= 3 ) {\n				// Assume that strings that start and end with <> are HTML and skip the regex check\n				match = [ null, selector, null ];\n\n			} else {\n				match = rquickExpr.exec( selector );\n			}\n\n			// Match html or make sure no context is specified for #id\n			if ( match && (match[1] || !context) ) {\n\n				// HANDLE: $(html) -> $(array)\n				if ( match[1] ) {\n					context = context instanceof jQuery ? context[0] : context;\n\n					// scripts is true for back-compat\n					// Intentionally let the error be thrown if parseHTML is not present\n					jQuery.merge( this, jQuery.parseHTML(\n						match[1],\n						context && context.nodeType ? context.ownerDocument || context : document,\n						true\n					) );\n\n					// HANDLE: $(html, props)\n					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {\n						for ( match in context ) {\n							// Properties of context are called as methods if possible\n							if ( jQuery.isFunction( this[ match ] ) ) {\n								this[ match ]( context[ match ] );\n\n							// ...and otherwise set as attributes\n							} else {\n								this.attr( match, context[ match ] );\n							}\n						}\n					}\n\n					return this;\n\n				// HANDLE: $(#id)\n				} else {\n					elem = document.getElementById( match[2] );\n\n					// Check parentNode to catch when Blackberry 4.6 returns\n					// nodes that are no longer in the document #6963\n					if ( elem && elem.parentNode ) {\n						// Handle the case where IE and Opera return items\n						// by name instead of ID\n						if ( elem.id !== match[2] ) {\n							return rootjQuery.find( selector );\n						}\n\n						// Otherwise, we inject the element directly into the jQuery object\n						this.length = 1;\n						this[0] = elem;\n					}\n\n					this.context = document;\n					this.selector = selector;\n					return this;\n				}\n\n			// HANDLE: $(expr, $(...))\n			} else if ( !context || context.jquery ) {\n				return ( context || rootjQuery ).find( selector );\n\n			// HANDLE: $(expr, context)\n			// (which is just equivalent to: $(context).find(expr)\n			} else {\n				return this.constructor( context ).find( selector );\n			}\n\n		// HANDLE: $(DOMElement)\n		} else if ( selector.nodeType ) {\n			this.context = this[0] = selector;\n			this.length = 1;\n			return this;\n\n		// HANDLE: $(function)\n		// Shortcut for document ready\n		} else if ( jQuery.isFunction( selector ) ) {\n			return typeof rootjQuery.ready !== \"undefined\" ?\n				rootjQuery.ready( selector ) :\n				// Execute immediately if ready is not present\n				selector( jQuery );\n		}\n\n		if ( selector.selector !== undefined ) {\n			this.selector = selector.selector;\n			this.context = selector.context;\n		}\n\n		return jQuery.makeArray( selector, this );\n	};\n\n// Give the init function the jQuery prototype for later instantiation\ninit.prototype = jQuery.fn;\n\n// Initialize central reference\nrootjQuery = jQuery( document );\n\n\nvar rparentsprev = /^(?:parents|prev(?:Until|All))/,\n	// methods guaranteed to produce a unique set when starting from a unique set\n	guaranteedUnique = {\n		children: true,\n		contents: true,\n		next: true,\n		prev: true\n	};\n\njQuery.extend({\n	dir: function( elem, dir, until ) {\n		var matched = [],\n			cur = elem[ dir ];\n\n		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {\n			if ( cur.nodeType === 1 ) {\n				matched.push( cur );\n			}\n			cur = cur[dir];\n		}\n		return matched;\n	},\n\n	sibling: function( n, elem ) {\n		var r = [];\n\n		for ( ; n; n = n.nextSibling ) {\n			if ( n.nodeType === 1 && n !== elem ) {\n				r.push( n );\n			}\n		}\n\n		return r;\n	}\n});\n\njQuery.fn.extend({\n	has: function( target ) {\n		var i,\n			targets = jQuery( target, this ),\n			len = targets.length;\n\n		return this.filter(function() {\n			for ( i = 0; i < len; i++ ) {\n				if ( jQuery.contains( this, targets[i] ) ) {\n					return true;\n				}\n			}\n		});\n	},\n\n	closest: function( selectors, context ) {\n		var cur,\n			i = 0,\n			l = this.length,\n			matched = [],\n			pos = rneedsContext.test( selectors ) || typeof selectors !== \"string\" ?\n				jQuery( selectors, context || this.context ) :\n				0;\n\n		for ( ; i < l; i++ ) {\n			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {\n				// Always skip document fragments\n				if ( cur.nodeType < 11 && (pos ?\n					pos.index(cur) > -1 :\n\n					// Don\'t pass non-elements to Sizzle\n					cur.nodeType === 1 &&\n						jQuery.find.matchesSelector(cur, selectors)) ) {\n\n					matched.push( cur );\n					break;\n				}\n			}\n		}\n\n		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );\n	},\n\n	// Determine the position of an element within\n	// the matched set of elements\n	index: function( elem ) {\n\n		// No argument, return index in parent\n		if ( !elem ) {\n			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;\n		}\n\n		// index in selector\n		if ( typeof elem === \"string\" ) {\n			return jQuery.inArray( this[0], jQuery( elem ) );\n		}\n\n		// Locate the position of the desired element\n		return jQuery.inArray(\n			// If it receives a jQuery object, the first element is used\n			elem.jquery ? elem[0] : elem, this );\n	},\n\n	add: function( selector, context ) {\n		return this.pushStack(\n			jQuery.unique(\n				jQuery.merge( this.get(), jQuery( selector, context ) )\n			)\n		);\n	},\n\n	addBack: function( selector ) {\n		return this.add( selector == null ?\n			this.prevObject : this.prevObject.filter(selector)\n		);\n	}\n});\n\nfunction sibling( cur, dir ) {\n	do {\n		cur = cur[ dir ];\n	} while ( cur && cur.nodeType !== 1 );\n\n	return cur;\n}\n\njQuery.each({\n	parent: function( elem ) {\n		var parent = elem.parentNode;\n		return parent && parent.nodeType !== 11 ? parent : null;\n	},\n	parents: function( elem ) {\n		return jQuery.dir( elem, \"parentNode\" );\n	},\n	parentsUntil: function( elem, i, until ) {\n		return jQuery.dir( elem, \"parentNode\", until );\n	},\n	next: function( elem ) {\n		return sibling( elem, \"nextSibling\" );\n	},\n	prev: function( elem ) {\n		return sibling( elem, \"previousSibling\" );\n	},\n	nextAll: function( elem ) {\n		return jQuery.dir( elem, \"nextSibling\" );\n	},\n	prevAll: function( elem ) {\n		return jQuery.dir( elem, \"previousSibling\" );\n	},\n	nextUntil: function( elem, i, until ) {\n		return jQuery.dir( elem, \"nextSibling\", until );\n	},\n	prevUntil: function( elem, i, until ) {\n		return jQuery.dir( elem, \"previousSibling\", until );\n	},\n	siblings: function( elem ) {\n		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );\n	},\n	children: function( elem ) {\n		return jQuery.sibling( elem.firstChild );\n	},\n	contents: function( elem ) {\n		return jQuery.nodeName( elem, \"iframe\" ) ?\n			elem.contentDocument || elem.contentWindow.document :\n			jQuery.merge( [], elem.childNodes );\n	}\n}, function( name, fn ) {\n	jQuery.fn[ name ] = function( until, selector ) {\n		var ret = jQuery.map( this, fn, until );\n\n		if ( name.slice( -5 ) !== \"Until\" ) {\n			selector = until;\n		}\n\n		if ( selector && typeof selector === \"string\" ) {\n			ret = jQuery.filter( selector, ret );\n		}\n\n		if ( this.length > 1 ) {\n			// Remove duplicates\n			if ( !guaranteedUnique[ name ] ) {\n				ret = jQuery.unique( ret );\n			}\n\n			// Reverse order for parents* and prev-derivatives\n			if ( rparentsprev.test( name ) ) {\n				ret = ret.reverse();\n			}\n		}\n\n		return this.pushStack( ret );\n	};\n});\nvar rnotwhite = (/\\S+/g);\n\n\n\n// String to Object options format cache\nvar optionsCache = {};\n\n// Convert String-formatted options into Object-formatted ones and store in cache\nfunction createOptions( options ) {\n	var object = optionsCache[ options ] = {};\n	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {\n		object[ flag ] = true;\n	});\n	return object;\n}\n\n/*\n * Create a callback list using the following parameters:\n *\n *	options: an optional list of space-separated options that will change how\n *			the callback list behaves or a more traditional option object\n *\n * By default a callback list will act like an event callback list and can be\n * \"fired\" multiple times.\n *\n * Possible options:\n *\n *	once:			will ensure the callback list can only be fired once (like a Deferred)\n *\n *	memory:			will keep track of previous values and will call any callback added\n *					after the list has been fired right away with the latest \"memorized\"\n *					values (like a Deferred)\n *\n *	unique:			will ensure a callback can only be added once (no duplicate in the list)\n *\n *	stopOnFalse:	interrupt callings when a callback returns false\n *\n */\njQuery.Callbacks = function( options ) {\n\n	// Convert options from String-formatted to Object-formatted if needed\n	// (we check in cache first)\n	options = typeof options === \"string\" ?\n		( optionsCache[ options ] || createOptions( options ) ) :\n		jQuery.extend( {}, options );\n\n	var // Flag to know if list is currently firing\n		firing,\n		// Last fire value (for non-forgettable lists)\n		memory,\n		// Flag to know if list was already fired\n		fired,\n		// End of the loop when firing\n		firingLength,\n		// Index of currently firing callback (modified by remove if needed)\n		firingIndex,\n		// First callback to fire (used internally by add and fireWith)\n		firingStart,\n		// Actual callback list\n		list = [],\n		// Stack of fire calls for repeatable lists\n		stack = !options.once && [],\n		// Fire callbacks\n		fire = function( data ) {\n			memory = options.memory && data;\n			fired = true;\n			firingIndex = firingStart || 0;\n			firingStart = 0;\n			firingLength = list.length;\n			firing = true;\n			for ( ; list && firingIndex < firingLength; firingIndex++ ) {\n				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {\n					memory = false; // To prevent further calls using add\n					break;\n				}\n			}\n			firing = false;\n			if ( list ) {\n				if ( stack ) {\n					if ( stack.length ) {\n						fire( stack.shift() );\n					}\n				} else if ( memory ) {\n					list = [];\n				} else {\n					self.disable();\n				}\n			}\n		},\n		// Actual Callbacks object\n		self = {\n			// Add a callback or a collection of callbacks to the list\n			add: function() {\n				if ( list ) {\n					// First, we save the current length\n					var start = list.length;\n					(function add( args ) {\n						jQuery.each( args, function( _, arg ) {\n							var type = jQuery.type( arg );\n							if ( type === \"function\" ) {\n								if ( !options.unique || !self.has( arg ) ) {\n									list.push( arg );\n								}\n							} else if ( arg && arg.length && type !== \"string\" ) {\n								// Inspect recursively\n								add( arg );\n							}\n						});\n					})( arguments );\n					// Do we need to add the callbacks to the\n					// current firing batch?\n					if ( firing ) {\n						firingLength = list.length;\n					// With memory, if we\'re not firing then\n					// we should call right away\n					} else if ( memory ) {\n						firingStart = start;\n						fire( memory );\n					}\n				}\n				return this;\n			},\n			// Remove a callback from the list\n			remove: function() {\n				if ( list ) {\n					jQuery.each( arguments, function( _, arg ) {\n						var index;\n						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {\n							list.splice( index, 1 );\n							// Handle firing indexes\n							if ( firing ) {\n								if ( index <= firingLength ) {\n									firingLength--;\n								}\n								if ( index <= firingIndex ) {\n									firingIndex--;\n								}\n							}\n						}\n					});\n				}\n				return this;\n			},\n			// Check if a given callback is in the list.\n			// If no argument is given, return whether or not list has callbacks attached.\n			has: function( fn ) {\n				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );\n			},\n			// Remove all callbacks from the list\n			empty: function() {\n				list = [];\n				firingLength = 0;\n				return this;\n			},\n			// Have the list do nothing anymore\n			disable: function() {\n				list = stack = memory = undefined;\n				return this;\n			},\n			// Is it disabled?\n			disabled: function() {\n				return !list;\n			},\n			// Lock the list in its current state\n			lock: function() {\n				stack = undefined;\n				if ( !memory ) {\n					self.disable();\n				}\n				return this;\n			},\n			// Is it locked?\n			locked: function() {\n				return !stack;\n			},\n			// Call all callbacks with the given context and arguments\n			fireWith: function( context, args ) {\n				if ( list && ( !fired || stack ) ) {\n					args = args || [];\n					args = [ context, args.slice ? args.slice() : args ];\n					if ( firing ) {\n						stack.push( args );\n					} else {\n						fire( args );\n					}\n				}\n				return this;\n			},\n			// Call all the callbacks with the given arguments\n			fire: function() {\n				self.fireWith( this, arguments );\n				return this;\n			},\n			// To know if the callbacks have already been called at least once\n			fired: function() {\n				return !!fired;\n			}\n		};\n\n	return self;\n};\n\n\njQuery.extend({\n\n	Deferred: function( func ) {\n		var tuples = [\n				// action, add listener, listener list, final state\n				[ \"resolve\", \"done\", jQuery.Callbacks(\"once memory\"), \"resolved\" ],\n				[ \"reject\", \"fail\", jQuery.Callbacks(\"once memory\"), \"rejected\" ],\n				[ \"notify\", \"progress\", jQuery.Callbacks(\"memory\") ]\n			],\n			state = \"pending\",\n			promise = {\n				state: function() {\n					return state;\n				},\n				always: function() {\n					deferred.done( arguments ).fail( arguments );\n					return this;\n				},\n				then: function( /* fnDone, fnFail, fnProgress */ ) {\n					var fns = arguments;\n					return jQuery.Deferred(function( newDefer ) {\n						jQuery.each( tuples, function( i, tuple ) {\n							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];\n							// deferred[ done | fail | progress ] for forwarding actions to newDefer\n							deferred[ tuple[1] ](function() {\n								var returned = fn && fn.apply( this, arguments );\n								if ( returned && jQuery.isFunction( returned.promise ) ) {\n									returned.promise()\n										.done( newDefer.resolve )\n										.fail( newDefer.reject )\n										.progress( newDefer.notify );\n								} else {\n									newDefer[ tuple[ 0 ] + \"With\" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );\n								}\n							});\n						});\n						fns = null;\n					}).promise();\n				},\n				// Get a promise for this deferred\n				// If obj is provided, the promise aspect is added to the object\n				promise: function( obj ) {\n					return obj != null ? jQuery.extend( obj, promise ) : promise;\n				}\n			},\n			deferred = {};\n\n		// Keep pipe for back-compat\n		promise.pipe = promise.then;\n\n		// Add list-specific methods\n		jQuery.each( tuples, function( i, tuple ) {\n			var list = tuple[ 2 ],\n				stateString = tuple[ 3 ];\n\n			// promise[ done | fail | progress ] = list.add\n			promise[ tuple[1] ] = list.add;\n\n			// Handle state\n			if ( stateString ) {\n				list.add(function() {\n					// state = [ resolved | rejected ]\n					state = stateString;\n\n				// [ reject_list | resolve_list ].disable; progress_list.lock\n				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );\n			}\n\n			// deferred[ resolve | reject | notify ]\n			deferred[ tuple[0] ] = function() {\n				deferred[ tuple[0] + \"With\" ]( this === deferred ? promise : this, arguments );\n				return this;\n			};\n			deferred[ tuple[0] + \"With\" ] = list.fireWith;\n		});\n\n		// Make the deferred a promise\n		promise.promise( deferred );\n\n		// Call given func if any\n		if ( func ) {\n			func.call( deferred, deferred );\n		}\n\n		// All done!\n		return deferred;\n	},\n\n	// Deferred helper\n	when: function( subordinate /* , ..., subordinateN */ ) {\n		var i = 0,\n			resolveValues = slice.call( arguments ),\n			length = resolveValues.length,\n\n			// the count of uncompleted subordinates\n			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,\n\n			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.\n			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),\n\n			// Update function for both resolve and progress values\n			updateFunc = function( i, contexts, values ) {\n				return function( value ) {\n					contexts[ i ] = this;\n					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;\n					if ( values === progressValues ) {\n						deferred.notifyWith( contexts, values );\n\n					} else if ( !(--remaining) ) {\n						deferred.resolveWith( contexts, values );\n					}\n				};\n			},\n\n			progressValues, progressContexts, resolveContexts;\n\n		// add listeners to Deferred subordinates; treat others as resolved\n		if ( length > 1 ) {\n			progressValues = new Array( length );\n			progressContexts = new Array( length );\n			resolveContexts = new Array( length );\n			for ( ; i < length; i++ ) {\n				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {\n					resolveValues[ i ].promise()\n						.done( updateFunc( i, resolveContexts, resolveValues ) )\n						.fail( deferred.reject )\n						.progress( updateFunc( i, progressContexts, progressValues ) );\n				} else {\n					--remaining;\n				}\n			}\n		}\n\n		// if we\'re not waiting on anything, resolve the master\n		if ( !remaining ) {\n			deferred.resolveWith( resolveContexts, resolveValues );\n		}\n\n		return deferred.promise();\n	}\n});\n\n\n// The deferred used on DOM ready\nvar readyList;\n\njQuery.fn.ready = function( fn ) {\n	// Add the callback\n	jQuery.ready.promise().done( fn );\n\n	return this;\n};\n\njQuery.extend({\n	// Is the DOM ready to be used? Set to true once it occurs.\n	isReady: false,\n\n	// A counter to track how many items to wait for before\n	// the ready event fires. See #6781\n	readyWait: 1,\n\n	// Hold (or release) the ready event\n	holdReady: function( hold ) {\n		if ( hold ) {\n			jQuery.readyWait++;\n		} else {\n			jQuery.ready( true );\n		}\n	},\n\n	// Handle when the DOM is ready\n	ready: function( wait ) {\n\n		// Abort if there are pending holds or we\'re already ready\n		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {\n			return;\n		}\n\n		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).\n		if ( !document.body ) {\n			return setTimeout( jQuery.ready );\n		}\n\n		// Remember that the DOM is ready\n		jQuery.isReady = true;\n\n		// If a normal DOM Ready event fired, decrement, and wait if need be\n		if ( wait !== true && --jQuery.readyWait > 0 ) {\n			return;\n		}\n\n		// If there are functions bound, to execute\n		readyList.resolveWith( document, [ jQuery ] );\n\n		// Trigger any bound ready events\n		if ( jQuery.fn.triggerHandler ) {\n			jQuery( document ).triggerHandler( \"ready\" );\n			jQuery( document ).off( \"ready\" );\n		}\n	}\n});\n\n/**\n * Clean-up method for dom ready events\n */\nfunction detach() {\n	if ( document.addEventListener ) {\n		document.removeEventListener( \"DOMContentLoaded\", completed, false );\n		window.removeEventListener( \"load\", completed, false );\n\n	} else {\n		document.detachEvent( \"onreadystatechange\", completed );\n		window.detachEvent( \"onload\", completed );\n	}\n}\n\n/**\n * The ready event handler and self cleanup method\n */\nfunction completed() {\n	// readyState === \"complete\" is good enough for us to call the dom ready in oldIE\n	if ( document.addEventListener || event.type === \"load\" || document.readyState === \"complete\" ) {\n		detach();\n		jQuery.ready();\n	}\n}\n\njQuery.ready.promise = function( obj ) {\n	if ( !readyList ) {\n\n		readyList = jQuery.Deferred();\n\n		// Catch cases where $(document).ready() is called after the browser event has already occurred.\n		// we once tried to use readyState \"interactive\" here, but it caused issues like the one\n		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15\n		if ( document.readyState === \"complete\" ) {\n			// Handle it asynchronously to allow scripts the opportunity to delay ready\n			setTimeout( jQuery.ready );\n\n		// Standards-based browsers support DOMContentLoaded\n		} else if ( document.addEventListener ) {\n			// Use the handy event callback\n			document.addEventListener( \"DOMContentLoaded\", completed, false );\n\n			// A fallback to window.onload, that will always work\n			window.addEventListener( \"load\", completed, false );\n\n		// If IE event model is used\n		} else {\n			// Ensure firing before onload, maybe late but safe also for iframes\n			document.attachEvent( \"onreadystatechange\", completed );\n\n			// A fallback to window.onload, that will always work\n			window.attachEvent( \"onload\", completed );\n\n			// If IE and not a frame\n			// continually check to see if the document is ready\n			var top = false;\n\n			try {\n				top = window.frameElement == null && document.documentElement;\n			} catch(e) {}\n\n			if ( top && top.doScroll ) {\n				(function doScrollCheck() {\n					if ( !jQuery.isReady ) {\n\n						try {\n							// Use the trick by Diego Perini\n							// http://javascript.nwbox.com/IEContentLoaded/\n							top.doScroll(\"left\");\n						} catch(e) {\n							return setTimeout( doScrollCheck, 50 );\n						}\n\n						// detach all dom ready events\n						detach();\n\n						// and execute any waiting functions\n						jQuery.ready();\n					}\n				})();\n			}\n		}\n	}\n	return readyList.promise( obj );\n};\n\n\nvar strundefined = typeof undefined;\n\n\n\n// Support: IE<9\n// Iteration over object\'s inherited properties before its own\nvar i;\nfor ( i in jQuery( support ) ) {\n	break;\n}\nsupport.ownLast = i !== \"0\";\n\n// Note: most support tests are defined in their respective modules.\n// false until the test is run\nsupport.inlineBlockNeedsLayout = false;\n\n// Execute ASAP in case we need to set body.style.zoom\njQuery(function() {\n	// Minified: var a,b,c,d\n	var val, div, body, container;\n\n	body = document.getElementsByTagName( \"body\" )[ 0 ];\n	if ( !body || !body.style ) {\n		// Return for frameset docs that don\'t have a body\n		return;\n	}\n\n	// Setup\n	div = document.createElement( \"div\" );\n	container = document.createElement( \"div\" );\n	container.style.cssText = \"position:absolute;border:0;width:0;height:0;top:0;left:-9999px\";\n	body.appendChild( container ).appendChild( div );\n\n	if ( typeof div.style.zoom !== strundefined ) {\n		// Support: IE<8\n		// Check if natively block-level elements act like inline-block\n		// elements when setting their display to \'inline\' and giving\n		// them layout\n		div.style.cssText = \"display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1\";\n\n		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;\n		if ( val ) {\n			// Prevent IE 6 from affecting layout for positioned elements #11048\n			// Prevent IE from shrinking the body in IE 7 mode #12869\n			// Support: IE<8\n			body.style.zoom = 1;\n		}\n	}\n\n	body.removeChild( container );\n});\n\n\n\n\n(function() {\n	var div = document.createElement( \"div\" );\n\n	// Execute the test only if not already executed in another module.\n	if (support.deleteExpando == null) {\n		// Support: IE<9\n		support.deleteExpando = true;\n		try {\n			delete div.test;\n		} catch( e ) {\n			support.deleteExpando = false;\n		}\n	}\n\n	// Null elements to avoid leaks in IE.\n	div = null;\n})();\n\n\n/**\n * Determines whether an object can have data\n */\njQuery.acceptData = function( elem ) {\n	var noData = jQuery.noData[ (elem.nodeName + \" \").toLowerCase() ],\n		nodeType = +elem.nodeType || 1;\n\n	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).\n	return nodeType !== 1 && nodeType !== 9 ?\n		false :\n\n		// Nodes accept data unless otherwise specified; rejection can be conditional\n		!noData || noData !== true && elem.getAttribute(\"classid\") === noData;\n};\n\n\nvar rbrace = /^(?:\\{[\\w\\W]*\\}|\\[[\\w\\W]*\\])$/,\n	rmultiDash = /([A-Z])/g;\n\nfunction dataAttr( elem, key, data ) {\n	// If nothing was found internally, try to fetch any\n	// data from the HTML5 data-* attribute\n	if ( data === undefined && elem.nodeType === 1 ) {\n\n		var name = \"data-\" + key.replace( rmultiDash, \"-$1\" ).toLowerCase();\n\n		data = elem.getAttribute( name );\n\n		if ( typeof data === \"string\" ) {\n			try {\n				data = data === \"true\" ? true :\n					data === \"false\" ? false :\n					data === \"null\" ? null :\n					// Only convert to a number if it doesn\'t change the string\n					+data + \"\" === data ? +data :\n					rbrace.test( data ) ? jQuery.parseJSON( data ) :\n					data;\n			} catch( e ) {}\n\n			// Make sure we set the data so it isn\'t changed later\n			jQuery.data( elem, key, data );\n\n		} else {\n			data = undefined;\n		}\n	}\n\n	return data;\n}\n\n// checks a cache object for emptiness\nfunction isEmptyDataObject( obj ) {\n	var name;\n	for ( name in obj ) {\n\n		// if the public data object is empty, the private is still empty\n		if ( name === \"data\" && jQuery.isEmptyObject( obj[name] ) ) {\n			continue;\n		}\n		if ( name !== \"toJSON\" ) {\n			return false;\n		}\n	}\n\n	return true;\n}\n\nfunction internalData( elem, name, data, pvt /* Internal Use Only */ ) {\n	if ( !jQuery.acceptData( elem ) ) {\n		return;\n	}\n\n	var ret, thisCache,\n		internalKey = jQuery.expando,\n\n		// We have to handle DOM nodes and JS objects differently because IE6-7\n		// can\'t GC object references properly across the DOM-JS boundary\n		isNode = elem.nodeType,\n\n		// Only DOM nodes need the global jQuery cache; JS object data is\n		// attached directly to the object so GC can occur automatically\n		cache = isNode ? jQuery.cache : elem,\n\n		// Only defining an ID for JS objects if its cache already exists allows\n		// the code to shortcut on the same path as a DOM node with no cache\n		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;\n\n	// Avoid doing any more work than we need to when trying to get data on an\n	// object that has no data at all\n	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === \"string\" ) {\n		return;\n	}\n\n	if ( !id ) {\n		// Only DOM nodes need a new unique ID for each element since their data\n		// ends up in the global cache\n		if ( isNode ) {\n			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;\n		} else {\n			id = internalKey;\n		}\n	}\n\n	if ( !cache[ id ] ) {\n		// Avoid exposing jQuery metadata on plain JS objects when the object\n		// is serialized using JSON.stringify\n		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };\n	}\n\n	// An object can be passed to jQuery.data instead of a key/value pair; this gets\n	// shallow copied over onto the existing cache\n	if ( typeof name === \"object\" || typeof name === \"function\" ) {\n		if ( pvt ) {\n			cache[ id ] = jQuery.extend( cache[ id ], name );\n		} else {\n			cache[ id ].data = jQuery.extend( cache[ id ].data, name );\n		}\n	}\n\n	thisCache = cache[ id ];\n\n	// jQuery data() is stored in a separate object inside the object\'s internal data\n	// cache in order to avoid key collisions between internal data and user-defined\n	// data.\n	if ( !pvt ) {\n		if ( !thisCache.data ) {\n			thisCache.data = {};\n		}\n\n		thisCache = thisCache.data;\n	}\n\n	if ( data !== undefined ) {\n		thisCache[ jQuery.camelCase( name ) ] = data;\n	}\n\n	// Check for both converted-to-camel and non-converted data property names\n	// If a data property was specified\n	if ( typeof name === \"string\" ) {\n\n		// First Try to find as-is property data\n		ret = thisCache[ name ];\n\n		// Test for null|undefined property data\n		if ( ret == null ) {\n\n			// Try to find the camelCased property\n			ret = thisCache[ jQuery.camelCase( name ) ];\n		}\n	} else {\n		ret = thisCache;\n	}\n\n	return ret;\n}\n\nfunction internalRemoveData( elem, name, pvt ) {\n	if ( !jQuery.acceptData( elem ) ) {\n		return;\n	}\n\n	var thisCache, i,\n		isNode = elem.nodeType,\n\n		// See jQuery.data for more information\n		cache = isNode ? jQuery.cache : elem,\n		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;\n\n	// If there is already no cache entry for this object, there is no\n	// purpose in continuing\n	if ( !cache[ id ] ) {\n		return;\n	}\n\n	if ( name ) {\n\n		thisCache = pvt ? cache[ id ] : cache[ id ].data;\n\n		if ( thisCache ) {\n\n			// Support array or space separated string names for data keys\n			if ( !jQuery.isArray( name ) ) {\n\n				// try the string as a key before any manipulation\n				if ( name in thisCache ) {\n					name = [ name ];\n				} else {\n\n					// split the camel cased version by spaces unless a key with the spaces exists\n					name = jQuery.camelCase( name );\n					if ( name in thisCache ) {\n						name = [ name ];\n					} else {\n						name = name.split(\" \");\n					}\n				}\n			} else {\n				// If \"name\" is an array of keys...\n				// When data is initially created, via (\"key\", \"val\") signature,\n				// keys will be converted to camelCase.\n				// Since there is no way to tell _how_ a key was added, remove\n				// both plain key and camelCase key. #12786\n				// This will only penalize the array argument path.\n				name = name.concat( jQuery.map( name, jQuery.camelCase ) );\n			}\n\n			i = name.length;\n			while ( i-- ) {\n				delete thisCache[ name[i] ];\n			}\n\n			// If there is no data left in the cache, we want to continue\n			// and let the cache object itself get destroyed\n			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {\n				return;\n			}\n		}\n	}\n\n	// See jQuery.data for more information\n	if ( !pvt ) {\n		delete cache[ id ].data;\n\n		// Don\'t destroy the parent cache unless the internal data object\n		// had been the only thing left in it\n		if ( !isEmptyDataObject( cache[ id ] ) ) {\n			return;\n		}\n	}\n\n	// Destroy the cache\n	if ( isNode ) {\n		jQuery.cleanData( [ elem ], true );\n\n	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)\n	/* jshint eqeqeq: false */\n	} else if ( support.deleteExpando || cache != cache.window ) {\n		/* jshint eqeqeq: true */\n		delete cache[ id ];\n\n	// When all else fails, null\n	} else {\n		cache[ id ] = null;\n	}\n}\n\njQuery.extend({\n	cache: {},\n\n	// The following elements (space-suffixed to avoid Object.prototype collisions)\n	// throw uncatchable exceptions if you attempt to set expando properties\n	noData: {\n		\"applet \": true,\n		\"embed \": true,\n		// ...but Flash objects (which have this classid) *can* handle expandos\n		\"object \": \"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\"\n	},\n\n	hasData: function( elem ) {\n		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];\n		return !!elem && !isEmptyDataObject( elem );\n	},\n\n	data: function( elem, name, data ) {\n		return internalData( elem, name, data );\n	},\n\n	removeData: function( elem, name ) {\n		return internalRemoveData( elem, name );\n	},\n\n	// For internal use only.\n	_data: function( elem, name, data ) {\n		return internalData( elem, name, data, true );\n	},\n\n	_removeData: function( elem, name ) {\n		return internalRemoveData( elem, name, true );\n	}\n});\n\njQuery.fn.extend({\n	data: function( key, value ) {\n		var i, name, data,\n			elem = this[0],\n			attrs = elem && elem.attributes;\n\n		// Special expections of .data basically thwart jQuery.access,\n		// so implement the relevant behavior ourselves\n\n		// Gets all values\n		if ( key === undefined ) {\n			if ( this.length ) {\n				data = jQuery.data( elem );\n\n				if ( elem.nodeType === 1 && !jQuery._data( elem, \"parsedAttrs\" ) ) {\n					i = attrs.length;\n					while ( i-- ) {\n\n						// Support: IE11+\n						// The attrs elements can be null (#14894)\n						if ( attrs[ i ] ) {\n							name = attrs[ i ].name;\n							if ( name.indexOf( \"data-\" ) === 0 ) {\n								name = jQuery.camelCase( name.slice(5) );\n								dataAttr( elem, name, data[ name ] );\n							}\n						}\n					}\n					jQuery._data( elem, \"parsedAttrs\", true );\n				}\n			}\n\n			return data;\n		}\n\n		// Sets multiple values\n		if ( typeof key === \"object\" ) {\n			return this.each(function() {\n				jQuery.data( this, key );\n			});\n		}\n\n		return arguments.length > 1 ?\n\n			// Sets one value\n			this.each(function() {\n				jQuery.data( this, key, value );\n			}) :\n\n			// Gets one value\n			// Try to fetch any internally stored data first\n			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;\n	},\n\n	removeData: function( key ) {\n		return this.each(function() {\n			jQuery.removeData( this, key );\n		});\n	}\n});\n\n\njQuery.extend({\n	queue: function( elem, type, data ) {\n		var queue;\n\n		if ( elem ) {\n			type = ( type || \"fx\" ) + \"queue\";\n			queue = jQuery._data( elem, type );\n\n			// Speed up dequeue by getting out quickly if this is just a lookup\n			if ( data ) {\n				if ( !queue || jQuery.isArray(data) ) {\n					queue = jQuery._data( elem, type, jQuery.makeArray(data) );\n				} else {\n					queue.push( data );\n				}\n			}\n			return queue || [];\n		}\n	},\n\n	dequeue: function( elem, type ) {\n		type = type || \"fx\";\n\n		var queue = jQuery.queue( elem, type ),\n			startLength = queue.length,\n			fn = queue.shift(),\n			hooks = jQuery._queueHooks( elem, type ),\n			next = function() {\n				jQuery.dequeue( elem, type );\n			};\n\n		// If the fx queue is dequeued, always remove the progress sentinel\n		if ( fn === \"inprogress\" ) {\n			fn = queue.shift();\n			startLength--;\n		}\n\n		if ( fn ) {\n\n			// Add a progress sentinel to prevent the fx queue from being\n			// automatically dequeued\n			if ( type === \"fx\" ) {\n				queue.unshift( \"inprogress\" );\n			}\n\n			// clear up the last queue stop function\n			delete hooks.stop;\n			fn.call( elem, next, hooks );\n		}\n\n		if ( !startLength && hooks ) {\n			hooks.empty.fire();\n		}\n	},\n\n	// not intended for public consumption - generates a queueHooks object, or returns the current one\n	_queueHooks: function( elem, type ) {\n		var key = type + \"queueHooks\";\n		return jQuery._data( elem, key ) || jQuery._data( elem, key, {\n			empty: jQuery.Callbacks(\"once memory\").add(function() {\n				jQuery._removeData( elem, type + \"queue\" );\n				jQuery._removeData( elem, key );\n			})\n		});\n	}\n});\n\njQuery.fn.extend({\n	queue: function( type, data ) {\n		var setter = 2;\n\n		if ( typeof type !== \"string\" ) {\n			data = type;\n			type = \"fx\";\n			setter--;\n		}\n\n		if ( arguments.length < setter ) {\n			return jQuery.queue( this[0], type );\n		}\n\n		return data === undefined ?\n			this :\n			this.each(function() {\n				var queue = jQuery.queue( this, type, data );\n\n				// ensure a hooks for this queue\n				jQuery._queueHooks( this, type );\n\n				if ( type === \"fx\" && queue[0] !== \"inprogress\" ) {\n					jQuery.dequeue( this, type );\n				}\n			});\n	},\n	dequeue: function( type ) {\n		return this.each(function() {\n			jQuery.dequeue( this, type );\n		});\n	},\n	clearQueue: function( type ) {\n		return this.queue( type || \"fx\", [] );\n	},\n	// Get a promise resolved when queues of a certain type\n	// are emptied (fx is the type by default)\n	promise: function( type, obj ) {\n		var tmp,\n			count = 1,\n			defer = jQuery.Deferred(),\n			elements = this,\n			i = this.length,\n			resolve = function() {\n				if ( !( --count ) ) {\n					defer.resolveWith( elements, [ elements ] );\n				}\n			};\n\n		if ( typeof type !== \"string\" ) {\n			obj = type;\n			type = undefined;\n		}\n		type = type || \"fx\";\n\n		while ( i-- ) {\n			tmp = jQuery._data( elements[ i ], type + \"queueHooks\" );\n			if ( tmp && tmp.empty ) {\n				count++;\n				tmp.empty.add( resolve );\n			}\n		}\n		resolve();\n		return defer.promise( obj );\n	}\n});\nvar pnum = (/[+-]?(?:\\d*\\.|)\\d+(?:[eE][+-]?\\d+|)/).source;\n\nvar cssExpand = [ \"Top\", \"Right\", \"Bottom\", \"Left\" ];\n\nvar isHidden = function( elem, el ) {\n		// isHidden might be called from jQuery#filter function;\n		// in that case, element will be second argument\n		elem = el || elem;\n		return jQuery.css( elem, \"display\" ) === \"none\" || !jQuery.contains( elem.ownerDocument, elem );\n	};\n\n\n\n// Multifunctional method to get and set values of a collection\n// The value/s can optionally be executed if it\'s a function\nvar access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {\n	var i = 0,\n		length = elems.length,\n		bulk = key == null;\n\n	// Sets many values\n	if ( jQuery.type( key ) === \"object\" ) {\n		chainable = true;\n		for ( i in key ) {\n			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );\n		}\n\n	// Sets one value\n	} else if ( value !== undefined ) {\n		chainable = true;\n\n		if ( !jQuery.isFunction( value ) ) {\n			raw = true;\n		}\n\n		if ( bulk ) {\n			// Bulk operations run against the entire set\n			if ( raw ) {\n				fn.call( elems, value );\n				fn = null;\n\n			// ...except when executing function values\n			} else {\n				bulk = fn;\n				fn = function( elem, key, value ) {\n					return bulk.call( jQuery( elem ), value );\n				};\n			}\n		}\n\n		if ( fn ) {\n			for ( ; i < length; i++ ) {\n				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );\n			}\n		}\n	}\n\n	return chainable ?\n		elems :\n\n		// Gets\n		bulk ?\n			fn.call( elems ) :\n			length ? fn( elems[0], key ) : emptyGet;\n};\nvar rcheckableType = (/^(?:checkbox|radio)$/i);\n\n\n\n(function() {\n	// Minified: var a,b,c\n	var input = document.createElement( \"input\" ),\n		div = document.createElement( \"div\" ),\n		fragment = document.createDocumentFragment();\n\n	// Setup\n	div.innerHTML = \"  <link/><table></table><a href=\'/a\'>a</a><input type=\'checkbox\'/>\";\n\n	// IE strips leading whitespace when .innerHTML is used\n	support.leadingWhitespace = div.firstChild.nodeType === 3;\n\n	// Make sure that tbody elements aren\'t automatically inserted\n	// IE will insert them into empty tables\n	support.tbody = !div.getElementsByTagName( \"tbody\" ).length;\n\n	// Make sure that link elements get serialized correctly by innerHTML\n	// This requires a wrapper element in IE\n	support.htmlSerialize = !!div.getElementsByTagName( \"link\" ).length;\n\n	// Makes sure cloning an html5 element does not cause problems\n	// Where outerHTML is undefined, this still works\n	support.html5Clone =\n		document.createElement( \"nav\" ).cloneNode( true ).outerHTML !== \"<:nav></:nav>\";\n\n	// Check if a disconnected checkbox will retain its checked\n	// value of true after appended to the DOM (IE6/7)\n	input.type = \"checkbox\";\n	input.checked = true;\n	fragment.appendChild( input );\n	support.appendChecked = input.checked;\n\n	// Make sure textarea (and checkbox) defaultValue is properly cloned\n	// Support: IE6-IE11+\n	div.innerHTML = \"<textarea>x</textarea>\";\n	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;\n\n	// #11217 - WebKit loses check when the name is after the checked attribute\n	fragment.appendChild( div );\n	div.innerHTML = \"<input type=\'radio\' checked=\'checked\' name=\'t\'/>\";\n\n	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3\n	// old WebKit doesn\'t clone checked state correctly in fragments\n	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;\n\n	// Support: IE<9\n	// Opera does not clone events (and typeof div.attachEvent === undefined).\n	// IE9-10 clones events bound via attachEvent, but they don\'t trigger with .click()\n	support.noCloneEvent = true;\n	if ( div.attachEvent ) {\n		div.attachEvent( \"onclick\", function() {\n			support.noCloneEvent = false;\n		});\n\n		div.cloneNode( true ).click();\n	}\n\n	// Execute the test only if not already executed in another module.\n	if (support.deleteExpando == null) {\n		// Support: IE<9\n		support.deleteExpando = true;\n		try {\n			delete div.test;\n		} catch( e ) {\n			support.deleteExpando = false;\n		}\n	}\n})();\n\n\n(function() {\n	var i, eventName,\n		div = document.createElement( \"div\" );\n\n	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)\n	for ( i in { submit: true, change: true, focusin: true }) {\n		eventName = \"on\" + i;\n\n		if ( !(support[ i + \"Bubbles\" ] = eventName in window) ) {\n			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)\n			div.setAttribute( eventName, \"t\" );\n			support[ i + \"Bubbles\" ] = div.attributes[ eventName ].expando === false;\n		}\n	}\n\n	// Null elements to avoid leaks in IE.\n	div = null;\n})();\n\n\nvar rformElems = /^(?:input|select|textarea)$/i,\n	rkeyEvent = /^key/,\n	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,\n	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,\n	rtypenamespace = /^([^.]*)(?:\\.(.+)|)$/;\n\nfunction returnTrue() {\n	return true;\n}\n\nfunction returnFalse() {\n	return false;\n}\n\nfunction safeActiveElement() {\n	try {\n		return document.activeElement;\n	} catch ( err ) { }\n}\n\n/*\n * Helper functions for managing events -- not part of the public interface.\n * Props to Dean Edwards\' addEvent library for many of the ideas.\n */\njQuery.event = {\n\n	global: {},\n\n	add: function( elem, types, handler, data, selector ) {\n		var tmp, events, t, handleObjIn,\n			special, eventHandle, handleObj,\n			handlers, type, namespaces, origType,\n			elemData = jQuery._data( elem );\n\n		// Don\'t attach events to noData or text/comment nodes (but allow plain objects)\n		if ( !elemData ) {\n			return;\n		}\n\n		// Caller can pass in an object of custom data in lieu of the handler\n		if ( handler.handler ) {\n			handleObjIn = handler;\n			handler = handleObjIn.handler;\n			selector = handleObjIn.selector;\n		}\n\n		// Make sure that the handler has a unique ID, used to find/remove it later\n		if ( !handler.guid ) {\n			handler.guid = jQuery.guid++;\n		}\n\n		// Init the element\'s event structure and main handler, if this is the first\n		if ( !(events = elemData.events) ) {\n			events = elemData.events = {};\n		}\n		if ( !(eventHandle = elemData.handle) ) {\n			eventHandle = elemData.handle = function( e ) {\n				// Discard the second event of a jQuery.event.trigger() and\n				// when an event is called after a page has unloaded\n				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?\n					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :\n					undefined;\n			};\n			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events\n			eventHandle.elem = elem;\n		}\n\n		// Handle multiple events separated by a space\n		types = ( types || \"\" ).match( rnotwhite ) || [ \"\" ];\n		t = types.length;\n		while ( t-- ) {\n			tmp = rtypenamespace.exec( types[t] ) || [];\n			type = origType = tmp[1];\n			namespaces = ( tmp[2] || \"\" ).split( \".\" ).sort();\n\n			// There *must* be a type, no attaching namespace-only handlers\n			if ( !type ) {\n				continue;\n			}\n\n			// If event changes its type, use the special event handlers for the changed type\n			special = jQuery.event.special[ type ] || {};\n\n			// If selector defined, determine special event api type, otherwise given type\n			type = ( selector ? special.delegateType : special.bindType ) || type;\n\n			// Update special based on newly reset type\n			special = jQuery.event.special[ type ] || {};\n\n			// handleObj is passed to all event handlers\n			handleObj = jQuery.extend({\n				type: type,\n				origType: origType,\n				data: data,\n				handler: handler,\n				guid: handler.guid,\n				selector: selector,\n				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),\n				namespace: namespaces.join(\".\")\n			}, handleObjIn );\n\n			// Init the event handler queue if we\'re the first\n			if ( !(handlers = events[ type ]) ) {\n				handlers = events[ type ] = [];\n				handlers.delegateCount = 0;\n\n				// Only use addEventListener/attachEvent if the special events handler returns false\n				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {\n					// Bind the global event handler to the element\n					if ( elem.addEventListener ) {\n						elem.addEventListener( type, eventHandle, false );\n\n					} else if ( elem.attachEvent ) {\n						elem.attachEvent( \"on\" + type, eventHandle );\n					}\n				}\n			}\n\n			if ( special.add ) {\n				special.add.call( elem, handleObj );\n\n				if ( !handleObj.handler.guid ) {\n					handleObj.handler.guid = handler.guid;\n				}\n			}\n\n			// Add to the element\'s handler list, delegates in front\n			if ( selector ) {\n				handlers.splice( handlers.delegateCount++, 0, handleObj );\n			} else {\n				handlers.push( handleObj );\n			}\n\n			// Keep track of which events have ever been used, for event optimization\n			jQuery.event.global[ type ] = true;\n		}\n\n		// Nullify elem to prevent memory leaks in IE\n		elem = null;\n	},\n\n	// Detach an event or set of events from an element\n	remove: function( elem, types, handler, selector, mappedTypes ) {\n		var j, handleObj, tmp,\n			origCount, t, events,\n			special, handlers, type,\n			namespaces, origType,\n			elemData = jQuery.hasData( elem ) && jQuery._data( elem );\n\n		if ( !elemData || !(events = elemData.events) ) {\n			return;\n		}\n\n		// Once for each type.namespace in types; type may be omitted\n		types = ( types || \"\" ).match( rnotwhite ) || [ \"\" ];\n		t = types.length;\n		while ( t-- ) {\n			tmp = rtypenamespace.exec( types[t] ) || [];\n			type = origType = tmp[1];\n			namespaces = ( tmp[2] || \"\" ).split( \".\" ).sort();\n\n			// Unbind all events (on this namespace, if provided) for the element\n			if ( !type ) {\n				for ( type in events ) {\n					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );\n				}\n				continue;\n			}\n\n			special = jQuery.event.special[ type ] || {};\n			type = ( selector ? special.delegateType : special.bindType ) || type;\n			handlers = events[ type ] || [];\n			tmp = tmp[2] && new RegExp( \"(^|\\\\.)\" + namespaces.join(\"\\\\.(?:.*\\\\.|)\") + \"(\\\\.|$)\" );\n\n			// Remove matching events\n			origCount = j = handlers.length;\n			while ( j-- ) {\n				handleObj = handlers[ j ];\n\n				if ( ( mappedTypes || origType === handleObj.origType ) &&\n					( !handler || handler.guid === handleObj.guid ) &&\n					( !tmp || tmp.test( handleObj.namespace ) ) &&\n					( !selector || selector === handleObj.selector || selector === \"**\" && handleObj.selector ) ) {\n					handlers.splice( j, 1 );\n\n					if ( handleObj.selector ) {\n						handlers.delegateCount--;\n					}\n					if ( special.remove ) {\n						special.remove.call( elem, handleObj );\n					}\n				}\n			}\n\n			// Remove generic event handler if we removed something and no more handlers exist\n			// (avoids potential for endless recursion during removal of special event handlers)\n			if ( origCount && !handlers.length ) {\n				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {\n					jQuery.removeEvent( elem, type, elemData.handle );\n				}\n\n				delete events[ type ];\n			}\n		}\n\n		// Remove the expando if it\'s no longer used\n		if ( jQuery.isEmptyObject( events ) ) {\n			delete elemData.handle;\n\n			// removeData also checks for emptiness and clears the expando if empty\n			// so use it instead of delete\n			jQuery._removeData( elem, \"events\" );\n		}\n	},\n\n	trigger: function( event, data, elem, onlyHandlers ) {\n		var handle, ontype, cur,\n			bubbleType, special, tmp, i,\n			eventPath = [ elem || document ],\n			type = hasOwn.call( event, \"type\" ) ? event.type : event,\n			namespaces = hasOwn.call( event, \"namespace\" ) ? event.namespace.split(\".\") : [];\n\n		cur = tmp = elem = elem || document;\n\n		// Don\'t do events on text and comment nodes\n		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {\n			return;\n		}\n\n		// focus/blur morphs to focusin/out; ensure we\'re not firing them right now\n		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {\n			return;\n		}\n\n		if ( type.indexOf(\".\") >= 0 ) {\n			// Namespaced trigger; create a regexp to match event type in handle()\n			namespaces = type.split(\".\");\n			type = namespaces.shift();\n			namespaces.sort();\n		}\n		ontype = type.indexOf(\":\") < 0 && \"on\" + type;\n\n		// Caller can pass in a jQuery.Event object, Object, or just an event type string\n		event = event[ jQuery.expando ] ?\n			event :\n			new jQuery.Event( type, typeof event === \"object\" && event );\n\n		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)\n		event.isTrigger = onlyHandlers ? 2 : 3;\n		event.namespace = namespaces.join(\".\");\n		event.namespace_re = event.namespace ?\n			new RegExp( \"(^|\\\\.)\" + namespaces.join(\"\\\\.(?:.*\\\\.|)\") + \"(\\\\.|$)\" ) :\n			null;\n\n		// Clean up the event in case it is being reused\n		event.result = undefined;\n		if ( !event.target ) {\n			event.target = elem;\n		}\n\n		// Clone any incoming data and prepend the event, creating the handler arg list\n		data = data == null ?\n			[ event ] :\n			jQuery.makeArray( data, [ event ] );\n\n		// Allow special events to draw outside the lines\n		special = jQuery.event.special[ type ] || {};\n		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {\n			return;\n		}\n\n		// Determine event propagation path in advance, per W3C events spec (#9951)\n		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)\n		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {\n\n			bubbleType = special.delegateType || type;\n			if ( !rfocusMorph.test( bubbleType + type ) ) {\n				cur = cur.parentNode;\n			}\n			for ( ; cur; cur = cur.parentNode ) {\n				eventPath.push( cur );\n				tmp = cur;\n			}\n\n			// Only add window if we got to document (e.g., not plain obj or detached DOM)\n			if ( tmp === (elem.ownerDocument || document) ) {\n				eventPath.push( tmp.defaultView || tmp.parentWindow || window );\n			}\n		}\n\n		// Fire handlers on the event path\n		i = 0;\n		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {\n\n			event.type = i > 1 ?\n				bubbleType :\n				special.bindType || type;\n\n			// jQuery handler\n			handle = ( jQuery._data( cur, \"events\" ) || {} )[ event.type ] && jQuery._data( cur, \"handle\" );\n			if ( handle ) {\n				handle.apply( cur, data );\n			}\n\n			// Native handler\n			handle = ontype && cur[ ontype ];\n			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {\n				event.result = handle.apply( cur, data );\n				if ( event.result === false ) {\n					event.preventDefault();\n				}\n			}\n		}\n		event.type = type;\n\n		// If nobody prevented the default action, do it now\n		if ( !onlyHandlers && !event.isDefaultPrevented() ) {\n\n			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&\n				jQuery.acceptData( elem ) ) {\n\n				// Call a native DOM method on the target with the same name name as the event.\n				// Can\'t use an .isFunction() check here because IE6/7 fails that test.\n				// Don\'t do default actions on window, that\'s where global variables be (#6170)\n				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {\n\n					// Don\'t re-trigger an onFOO event when we call its FOO() method\n					tmp = elem[ ontype ];\n\n					if ( tmp ) {\n						elem[ ontype ] = null;\n					}\n\n					// Prevent re-triggering of the same event, since we already bubbled it above\n					jQuery.event.triggered = type;\n					try {\n						elem[ type ]();\n					} catch ( e ) {\n						// IE<9 dies on focus/blur to hidden element (#1486,#12518)\n						// only reproducible on winXP IE8 native, not IE9 in IE8 mode\n					}\n					jQuery.event.triggered = undefined;\n\n					if ( tmp ) {\n						elem[ ontype ] = tmp;\n					}\n				}\n			}\n		}\n\n		return event.result;\n	},\n\n	dispatch: function( event ) {\n\n		// Make a writable jQuery.Event from the native event object\n		event = jQuery.event.fix( event );\n\n		var i, ret, handleObj, matched, j,\n			handlerQueue = [],\n			args = slice.call( arguments ),\n			handlers = ( jQuery._data( this, \"events\" ) || {} )[ event.type ] || [],\n			special = jQuery.event.special[ event.type ] || {};\n\n		// Use the fix-ed jQuery.Event rather than the (read-only) native event\n		args[0] = event;\n		event.delegateTarget = this;\n\n		// Call the preDispatch hook for the mapped type, and let it bail if desired\n		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {\n			return;\n		}\n\n		// Determine handlers\n		handlerQueue = jQuery.event.handlers.call( this, event, handlers );\n\n		// Run delegates first; they may want to stop propagation beneath us\n		i = 0;\n		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {\n			event.currentTarget = matched.elem;\n\n			j = 0;\n			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {\n\n				// Triggered event must either 1) have no namespace, or\n				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).\n				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {\n\n					event.handleObj = handleObj;\n					event.data = handleObj.data;\n\n					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )\n							.apply( matched.elem, args );\n\n					if ( ret !== undefined ) {\n						if ( (event.result = ret) === false ) {\n							event.preventDefault();\n							event.stopPropagation();\n						}\n					}\n				}\n			}\n		}\n\n		// Call the postDispatch hook for the mapped type\n		if ( special.postDispatch ) {\n			special.postDispatch.call( this, event );\n		}\n\n		return event.result;\n	},\n\n	handlers: function( event, handlers ) {\n		var sel, handleObj, matches, i,\n			handlerQueue = [],\n			delegateCount = handlers.delegateCount,\n			cur = event.target;\n\n		// Find delegate handlers\n		// Black-hole SVG <use> instance trees (#13180)\n		// Avoid non-left-click bubbling in Firefox (#3861)\n		if ( delegateCount && cur.nodeType && (!event.button || event.type !== \"click\") ) {\n\n			/* jshint eqeqeq: false */\n			for ( ; cur != this; cur = cur.parentNode || this ) {\n				/* jshint eqeqeq: true */\n\n				// Don\'t check non-elements (#13208)\n				// Don\'t process clicks on disabled elements (#6911, #8165, #11382, #11764)\n				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== \"click\") ) {\n					matches = [];\n					for ( i = 0; i < delegateCount; i++ ) {\n						handleObj = handlers[ i ];\n\n						// Don\'t conflict with Object.prototype properties (#13203)\n						sel = handleObj.selector + \" \";\n\n						if ( matches[ sel ] === undefined ) {\n							matches[ sel ] = handleObj.needsContext ?\n								jQuery( sel, this ).index( cur ) >= 0 :\n								jQuery.find( sel, this, null, [ cur ] ).length;\n						}\n						if ( matches[ sel ] ) {\n							matches.push( handleObj );\n						}\n					}\n					if ( matches.length ) {\n						handlerQueue.push({ elem: cur, handlers: matches });\n					}\n				}\n			}\n		}\n\n		// Add the remaining (directly-bound) handlers\n		if ( delegateCount < handlers.length ) {\n			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });\n		}\n\n		return handlerQueue;\n	},\n\n	fix: function( event ) {\n		if ( event[ jQuery.expando ] ) {\n			return event;\n		}\n\n		// Create a writable copy of the event object and normalize some properties\n		var i, prop, copy,\n			type = event.type,\n			originalEvent = event,\n			fixHook = this.fixHooks[ type ];\n\n		if ( !fixHook ) {\n			this.fixHooks[ type ] = fixHook =\n				rmouseEvent.test( type ) ? this.mouseHooks :\n				rkeyEvent.test( type ) ? this.keyHooks :\n				{};\n		}\n		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;\n\n		event = new jQuery.Event( originalEvent );\n\n		i = copy.length;\n		while ( i-- ) {\n			prop = copy[ i ];\n			event[ prop ] = originalEvent[ prop ];\n		}\n\n		// Support: IE<9\n		// Fix target property (#1925)\n		if ( !event.target ) {\n			event.target = originalEvent.srcElement || document;\n		}\n\n		// Support: Chrome 23+, Safari?\n		// Target should not be a text node (#504, #13143)\n		if ( event.target.nodeType === 3 ) {\n			event.target = event.target.parentNode;\n		}\n\n		// Support: IE<9\n		// For mouse/key events, metaKey==false if it\'s undefined (#3368, #11328)\n		event.metaKey = !!event.metaKey;\n\n		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;\n	},\n\n	// Includes some event props shared by KeyEvent and MouseEvent\n	props: \"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which\".split(\" \"),\n\n	fixHooks: {},\n\n	keyHooks: {\n		props: \"char charCode key keyCode\".split(\" \"),\n		filter: function( event, original ) {\n\n			// Add which for key events\n			if ( event.which == null ) {\n				event.which = original.charCode != null ? original.charCode : original.keyCode;\n			}\n\n			return event;\n		}\n	},\n\n	mouseHooks: {\n		props: \"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement\".split(\" \"),\n		filter: function( event, original ) {\n			var body, eventDoc, doc,\n				button = original.button,\n				fromElement = original.fromElement;\n\n			// Calculate pageX/Y if missing and clientX/Y available\n			if ( event.pageX == null && original.clientX != null ) {\n				eventDoc = event.target.ownerDocument || document;\n				doc = eventDoc.documentElement;\n				body = eventDoc.body;\n\n				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );\n				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );\n			}\n\n			// Add relatedTarget, if necessary\n			if ( !event.relatedTarget && fromElement ) {\n				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;\n			}\n\n			// Add which for click: 1 === left; 2 === middle; 3 === right\n			// Note: button is not normalized, so don\'t use it\n			if ( !event.which && button !== undefined ) {\n				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );\n			}\n\n			return event;\n		}\n	},\n\n	special: {\n		load: {\n			// Prevent triggered image.load events from bubbling to window.load\n			noBubble: true\n		},\n		focus: {\n			// Fire native event if possible so blur/focus sequence is correct\n			trigger: function() {\n				if ( this !== safeActiveElement() && this.focus ) {\n					try {\n						this.focus();\n						return false;\n					} catch ( e ) {\n						// Support: IE<9\n						// If we error on focus to hidden element (#1486, #12518),\n						// let .trigger() run the handlers\n					}\n				}\n			},\n			delegateType: \"focusin\"\n		},\n		blur: {\n			trigger: function() {\n				if ( this === safeActiveElement() && this.blur ) {\n					this.blur();\n					return false;\n				}\n			},\n			delegateType: \"focusout\"\n		},\n		click: {\n			// For checkbox, fire native event so checked state will be right\n			trigger: function() {\n				if ( jQuery.nodeName( this, \"input\" ) && this.type === \"checkbox\" && this.click ) {\n					this.click();\n					return false;\n				}\n			},\n\n			// For cross-browser consistency, don\'t fire native .click() on links\n			_default: function( event ) {\n				return jQuery.nodeName( event.target, \"a\" );\n			}\n		},\n\n		beforeunload: {\n			postDispatch: function( event ) {\n\n				// Support: Firefox 20+\n				// Firefox doesn\'t alert if the returnValue field is not set.\n				if ( event.result !== undefined && event.originalEvent ) {\n					event.originalEvent.returnValue = event.result;\n				}\n			}\n		}\n	},\n\n	simulate: function( type, elem, event, bubble ) {\n		// Piggyback on a donor event to simulate a different one.\n		// Fake originalEvent to avoid donor\'s stopPropagation, but if the\n		// simulated event prevents default then we do the same on the donor.\n		var e = jQuery.extend(\n			new jQuery.Event(),\n			event,\n			{\n				type: type,\n				isSimulated: true,\n				originalEvent: {}\n			}\n		);\n		if ( bubble ) {\n			jQuery.event.trigger( e, null, elem );\n		} else {\n			jQuery.event.dispatch.call( elem, e );\n		}\n		if ( e.isDefaultPrevented() ) {\n			event.preventDefault();\n		}\n	}\n};\n\njQuery.removeEvent = document.removeEventListener ?\n	function( elem, type, handle ) {\n		if ( elem.removeEventListener ) {\n			elem.removeEventListener( type, handle, false );\n		}\n	} :\n	function( elem, type, handle ) {\n		var name = \"on\" + type;\n\n		if ( elem.detachEvent ) {\n\n			// #8545, #7054, preventing memory leaks for custom events in IE6-8\n			// detachEvent needed property on element, by name of that event, to properly expose it to GC\n			if ( typeof elem[ name ] === strundefined ) {\n				elem[ name ] = null;\n			}\n\n			elem.detachEvent( name, handle );\n		}\n	};\n\njQuery.Event = function( src, props ) {\n	// Allow instantiation without the \'new\' keyword\n	if ( !(this instanceof jQuery.Event) ) {\n		return new jQuery.Event( src, props );\n	}\n\n	// Event object\n	if ( src && src.type ) {\n		this.originalEvent = src;\n		this.type = src.type;\n\n		// Events bubbling up the document may have been marked as prevented\n		// by a handler lower down the tree; reflect the correct value.\n		this.isDefaultPrevented = src.defaultPrevented ||\n				src.defaultPrevented === undefined &&\n				// Support: IE < 9, Android < 4.0\n				src.returnValue === false ?\n			returnTrue :\n			returnFalse;\n\n	// Event type\n	} else {\n		this.type = src;\n	}\n\n	// Put explicitly provided properties onto the event object\n	if ( props ) {\n		jQuery.extend( this, props );\n	}\n\n	// Create a timestamp if incoming event doesn\'t have one\n	this.timeStamp = src && src.timeStamp || jQuery.now();\n\n	// Mark it as fixed\n	this[ jQuery.expando ] = true;\n};\n\n// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding\n// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html\njQuery.Event.prototype = {\n	isDefaultPrevented: returnFalse,\n	isPropagationStopped: returnFalse,\n	isImmediatePropagationStopped: returnFalse,\n\n	preventDefault: function() {\n		var e = this.originalEvent;\n\n		this.isDefaultPrevented = returnTrue;\n		if ( !e ) {\n			return;\n		}\n\n		// If preventDefault exists, run it on the original event\n		if ( e.preventDefault ) {\n			e.preventDefault();\n\n		// Support: IE\n		// Otherwise set the returnValue property of the original event to false\n		} else {\n			e.returnValue = false;\n		}\n	},\n	stopPropagation: function() {\n		var e = this.originalEvent;\n\n		this.isPropagationStopped = returnTrue;\n		if ( !e ) {\n			return;\n		}\n		// If stopPropagation exists, run it on the original event\n		if ( e.stopPropagation ) {\n			e.stopPropagation();\n		}\n\n		// Support: IE\n		// Set the cancelBubble property of the original event to true\n		e.cancelBubble = true;\n	},\n	stopImmediatePropagation: function() {\n		var e = this.originalEvent;\n\n		this.isImmediatePropagationStopped = returnTrue;\n\n		if ( e && e.stopImmediatePropagation ) {\n			e.stopImmediatePropagation();\n		}\n\n		this.stopPropagation();\n	}\n};\n\n// Create mouseenter/leave events using mouseover/out and event-time checks\njQuery.each({\n	mouseenter: \"mouseover\",\n	mouseleave: \"mouseout\",\n	pointerenter: \"pointerover\",\n	pointerleave: \"pointerout\"\n}, function( orig, fix ) {\n	jQuery.event.special[ orig ] = {\n		delegateType: fix,\n		bindType: fix,\n\n		handle: function( event ) {\n			var ret,\n				target = this,\n				related = event.relatedTarget,\n				handleObj = event.handleObj;\n\n			// For mousenter/leave call the handler if related is outside the target.\n			// NB: No relatedTarget if the mouse left/entered the browser window\n			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {\n				event.type = handleObj.origType;\n				ret = handleObj.handler.apply( this, arguments );\n				event.type = fix;\n			}\n			return ret;\n		}\n	};\n});\n\n// IE submit delegation\nif ( !support.submitBubbles ) {\n\n	jQuery.event.special.submit = {\n		setup: function() {\n			// Only need this for delegated form submit events\n			if ( jQuery.nodeName( this, \"form\" ) ) {\n				return false;\n			}\n\n			// Lazy-add a submit handler when a descendant form may potentially be submitted\n			jQuery.event.add( this, \"click._submit keypress._submit\", function( e ) {\n				// Node name check avoids a VML-related crash in IE (#9807)\n				var elem = e.target,\n					form = jQuery.nodeName( elem, \"input\" ) || jQuery.nodeName( elem, \"button\" ) ? elem.form : undefined;\n				if ( form && !jQuery._data( form, \"submitBubbles\" ) ) {\n					jQuery.event.add( form, \"submit._submit\", function( event ) {\n						event._submit_bubble = true;\n					});\n					jQuery._data( form, \"submitBubbles\", true );\n				}\n			});\n			// return undefined since we don\'t need an event listener\n		},\n\n		postDispatch: function( event ) {\n			// If form was submitted by the user, bubble the event up the tree\n			if ( event._submit_bubble ) {\n				delete event._submit_bubble;\n				if ( this.parentNode && !event.isTrigger ) {\n					jQuery.event.simulate( \"submit\", this.parentNode, event, true );\n				}\n			}\n		},\n\n		teardown: function() {\n			// Only need this for delegated form submit events\n			if ( jQuery.nodeName( this, \"form\" ) ) {\n				return false;\n			}\n\n			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above\n			jQuery.event.remove( this, \"._submit\" );\n		}\n	};\n}\n\n// IE change delegation and checkbox/radio fix\nif ( !support.changeBubbles ) {\n\n	jQuery.event.special.change = {\n\n		setup: function() {\n\n			if ( rformElems.test( this.nodeName ) ) {\n				// IE doesn\'t fire change on a check/radio until blur; trigger it on click\n				// after a propertychange. Eat the blur-change in special.change.handle.\n				// This still fires onchange a second time for check/radio after blur.\n				if ( this.type === \"checkbox\" || this.type === \"radio\" ) {\n					jQuery.event.add( this, \"propertychange._change\", function( event ) {\n						if ( event.originalEvent.propertyName === \"checked\" ) {\n							this._just_changed = true;\n						}\n					});\n					jQuery.event.add( this, \"click._change\", function( event ) {\n						if ( this._just_changed && !event.isTrigger ) {\n							this._just_changed = false;\n						}\n						// Allow triggered, simulated change events (#11500)\n						jQuery.event.simulate( \"change\", this, event, true );\n					});\n				}\n				return false;\n			}\n			// Delegated event; lazy-add a change handler on descendant inputs\n			jQuery.event.add( this, \"beforeactivate._change\", function( e ) {\n				var elem = e.target;\n\n				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, \"changeBubbles\" ) ) {\n					jQuery.event.add( elem, \"change._change\", function( event ) {\n						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {\n							jQuery.event.simulate( \"change\", this.parentNode, event, true );\n						}\n					});\n					jQuery._data( elem, \"changeBubbles\", true );\n				}\n			});\n		},\n\n		handle: function( event ) {\n			var elem = event.target;\n\n			// Swallow native change events from checkbox/radio, we already triggered them above\n			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== \"radio\" && elem.type !== \"checkbox\") ) {\n				return event.handleObj.handler.apply( this, arguments );\n			}\n		},\n\n		teardown: function() {\n			jQuery.event.remove( this, \"._change\" );\n\n			return !rformElems.test( this.nodeName );\n		}\n	};\n}\n\n// Create \"bubbling\" focus and blur events\nif ( !support.focusinBubbles ) {\n	jQuery.each({ focus: \"focusin\", blur: \"focusout\" }, function( orig, fix ) {\n\n		// Attach a single capturing handler on the document while someone wants focusin/focusout\n		var handler = function( event ) {\n				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );\n			};\n\n		jQuery.event.special[ fix ] = {\n			setup: function() {\n				var doc = this.ownerDocument || this,\n					attaches = jQuery._data( doc, fix );\n\n				if ( !attaches ) {\n					doc.addEventListener( orig, handler, true );\n				}\n				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );\n			},\n			teardown: function() {\n				var doc = this.ownerDocument || this,\n					attaches = jQuery._data( doc, fix ) - 1;\n\n				if ( !attaches ) {\n					doc.removeEventListener( orig, handler, true );\n					jQuery._removeData( doc, fix );\n				} else {\n					jQuery._data( doc, fix, attaches );\n				}\n			}\n		};\n	});\n}\n\njQuery.fn.extend({\n\n	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {\n		var type, origFn;\n\n		// Types can be a map of types/handlers\n		if ( typeof types === \"object\" ) {\n			// ( types-Object, selector, data )\n			if ( typeof selector !== \"string\" ) {\n				// ( types-Object, data )\n				data = data || selector;\n				selector = undefined;\n			}\n			for ( type in types ) {\n				this.on( type, selector, data, types[ type ], one );\n			}\n			return this;\n		}\n\n		if ( data == null && fn == null ) {\n			// ( types, fn )\n			fn = selector;\n			data = selector = undefined;\n		} else if ( fn == null ) {\n			if ( typeof selector === \"string\" ) {\n				// ( types, selector, fn )\n				fn = data;\n				data = undefined;\n			} else {\n				// ( types, data, fn )\n				fn = data;\n				data = selector;\n				selector = undefined;\n			}\n		}\n		if ( fn === false ) {\n			fn = returnFalse;\n		} else if ( !fn ) {\n			return this;\n		}\n\n		if ( one === 1 ) {\n			origFn = fn;\n			fn = function( event ) {\n				// Can use an empty set, since event contains the info\n				jQuery().off( event );\n				return origFn.apply( this, arguments );\n			};\n			// Use same guid so caller can remove using origFn\n			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );\n		}\n		return this.each( function() {\n			jQuery.event.add( this, types, fn, data, selector );\n		});\n	},\n	one: function( types, selector, data, fn ) {\n		return this.on( types, selector, data, fn, 1 );\n	},\n	off: function( types, selector, fn ) {\n		var handleObj, type;\n		if ( types && types.preventDefault && types.handleObj ) {\n			// ( event )  dispatched jQuery.Event\n			handleObj = types.handleObj;\n			jQuery( types.delegateTarget ).off(\n				handleObj.namespace ? handleObj.origType + \".\" + handleObj.namespace : handleObj.origType,\n				handleObj.selector,\n				handleObj.handler\n			);\n			return this;\n		}\n		if ( typeof types === \"object\" ) {\n			// ( types-object [, selector] )\n			for ( type in types ) {\n				this.off( type, selector, types[ type ] );\n			}\n			return this;\n		}\n		if ( selector === false || typeof selector === \"function\" ) {\n			// ( types [, fn] )\n			fn = selector;\n			selector = undefined;\n		}\n		if ( fn === false ) {\n			fn = returnFalse;\n		}\n		return this.each(function() {\n			jQuery.event.remove( this, types, fn, selector );\n		});\n	},\n\n	trigger: function( type, data ) {\n		return this.each(function() {\n			jQuery.event.trigger( type, data, this );\n		});\n	},\n	triggerHandler: function( type, data ) {\n		var elem = this[0];\n		if ( elem ) {\n			return jQuery.event.trigger( type, data, elem, true );\n		}\n	}\n});\n\n\nfunction createSafeFragment( document ) {\n	var list = nodeNames.split( \"|\" ),\n		safeFrag = document.createDocumentFragment();\n\n	if ( safeFrag.createElement ) {\n		while ( list.length ) {\n			safeFrag.createElement(\n				list.pop()\n			);\n		}\n	}\n	return safeFrag;\n}\n\nvar nodeNames = \"abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|\" +\n		\"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video\",\n	rinlinejQuery = / jQuery\\d+=\"(?:null|\\d+)\"/g,\n	rnoshimcache = new RegExp(\"<(?:\" + nodeNames + \")[\\\\s/>]\", \"i\"),\n	rleadingWhitespace = /^\\s+/,\n	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\\w:]+)[^>]*)\\/>/gi,\n	rtagName = /<([\\w:]+)/,\n	rtbody = /<tbody/i,\n	rhtml = /<|&#?\\w+;/,\n	rnoInnerhtml = /<(?:script|style|link)/i,\n	// checked=\"checked\" or checked\n	rchecked = /checked\\s*(?:[^=]|=\\s*.checked.)/i,\n	rscriptType = /^$|\\/(?:java|ecma)script/i,\n	rscriptTypeMasked = /^true\\/(.*)/,\n	rcleanScript = /^\\s*<!(?:\\[CDATA\\[|--)|(?:\\]\\]|--)>\\s*$/g,\n\n	// We have to close these tags to support XHTML (#13200)\n	wrapMap = {\n		option: [ 1, \"<select multiple=\'multiple\'>\", \"</select>\" ],\n		legend: [ 1, \"<fieldset>\", \"</fieldset>\" ],\n		area: [ 1, \"<map>\", \"</map>\" ],\n		param: [ 1, \"<object>\", \"</object>\" ],\n		thead: [ 1, \"<table>\", \"</table>\" ],\n		tr: [ 2, \"<table><tbody>\", \"</tbody></table>\" ],\n		col: [ 2, \"<table><tbody></tbody><colgroup>\", \"</colgroup></table>\" ],\n		td: [ 3, \"<table><tbody><tr>\", \"</tr></tbody></table>\" ],\n\n		// IE6-8 can\'t serialize link, script, style, or any html5 (NoScope) tags,\n		// unless wrapped in a div with non-breaking characters in front of it.\n		_default: support.htmlSerialize ? [ 0, \"\", \"\" ] : [ 1, \"X<div>\", \"</div>\"  ]\n	},\n	safeFragment = createSafeFragment( document ),\n	fragmentDiv = safeFragment.appendChild( document.createElement(\"div\") );\n\nwrapMap.optgroup = wrapMap.option;\nwrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;\nwrapMap.th = wrapMap.td;\n\nfunction getAll( context, tag ) {\n	var elems, elem,\n		i = 0,\n		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || \"*\" ) :\n			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || \"*\" ) :\n			undefined;\n\n	if ( !found ) {\n		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {\n			if ( !tag || jQuery.nodeName( elem, tag ) ) {\n				found.push( elem );\n			} else {\n				jQuery.merge( found, getAll( elem, tag ) );\n			}\n		}\n	}\n\n	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?\n		jQuery.merge( [ context ], found ) :\n		found;\n}\n\n// Used in buildFragment, fixes the defaultChecked property\nfunction fixDefaultChecked( elem ) {\n	if ( rcheckableType.test( elem.type ) ) {\n		elem.defaultChecked = elem.checked;\n	}\n}\n\n// Support: IE<8\n// Manipulating tables requires a tbody\nfunction manipulationTarget( elem, content ) {\n	return jQuery.nodeName( elem, \"table\" ) &&\n		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, \"tr\" ) ?\n\n		elem.getElementsByTagName(\"tbody\")[0] ||\n			elem.appendChild( elem.ownerDocument.createElement(\"tbody\") ) :\n		elem;\n}\n\n// Replace/restore the type attribute of script elements for safe DOM manipulation\nfunction disableScript( elem ) {\n	elem.type = (jQuery.find.attr( elem, \"type\" ) !== null) + \"/\" + elem.type;\n	return elem;\n}\nfunction restoreScript( elem ) {\n	var match = rscriptTypeMasked.exec( elem.type );\n	if ( match ) {\n		elem.type = match[1];\n	} else {\n		elem.removeAttribute(\"type\");\n	}\n	return elem;\n}\n\n// Mark scripts as having already been evaluated\nfunction setGlobalEval( elems, refElements ) {\n	var elem,\n		i = 0;\n	for ( ; (elem = elems[i]) != null; i++ ) {\n		jQuery._data( elem, \"globalEval\", !refElements || jQuery._data( refElements[i], \"globalEval\" ) );\n	}\n}\n\nfunction cloneCopyEvent( src, dest ) {\n\n	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {\n		return;\n	}\n\n	var type, i, l,\n		oldData = jQuery._data( src ),\n		curData = jQuery._data( dest, oldData ),\n		events = oldData.events;\n\n	if ( events ) {\n		delete curData.handle;\n		curData.events = {};\n\n		for ( type in events ) {\n			for ( i = 0, l = events[ type ].length; i < l; i++ ) {\n				jQuery.event.add( dest, type, events[ type ][ i ] );\n			}\n		}\n	}\n\n	// make the cloned public data object a copy from the original\n	if ( curData.data ) {\n		curData.data = jQuery.extend( {}, curData.data );\n	}\n}\n\nfunction fixCloneNodeIssues( src, dest ) {\n	var nodeName, e, data;\n\n	// We do not need to do anything for non-Elements\n	if ( dest.nodeType !== 1 ) {\n		return;\n	}\n\n	nodeName = dest.nodeName.toLowerCase();\n\n	// IE6-8 copies events bound via attachEvent when using cloneNode.\n	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {\n		data = jQuery._data( dest );\n\n		for ( e in data.events ) {\n			jQuery.removeEvent( dest, e, data.handle );\n		}\n\n		// Event data gets referenced instead of copied if the expando gets copied too\n		dest.removeAttribute( jQuery.expando );\n	}\n\n	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text\n	if ( nodeName === \"script\" && dest.text !== src.text ) {\n		disableScript( dest ).text = src.text;\n		restoreScript( dest );\n\n	// IE6-10 improperly clones children of object elements using classid.\n	// IE10 throws NoModificationAllowedError if parent is null, #12132.\n	} else if ( nodeName === \"object\" ) {\n		if ( dest.parentNode ) {\n			dest.outerHTML = src.outerHTML;\n		}\n\n		// This path appears unavoidable for IE9. When cloning an object\n		// element in IE9, the outerHTML strategy above is not sufficient.\n		// If the src has innerHTML and the destination does not,\n		// copy the src.innerHTML into the dest.innerHTML. #10324\n		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {\n			dest.innerHTML = src.innerHTML;\n		}\n\n	} else if ( nodeName === \"input\" && rcheckableType.test( src.type ) ) {\n		// IE6-8 fails to persist the checked state of a cloned checkbox\n		// or radio button. Worse, IE6-7 fail to give the cloned element\n		// a checked appearance if the defaultChecked value isn\'t also set\n\n		dest.defaultChecked = dest.checked = src.checked;\n\n		// IE6-7 get confused and end up setting the value of a cloned\n		// checkbox/radio button to an empty string instead of \"on\"\n		if ( dest.value !== src.value ) {\n			dest.value = src.value;\n		}\n\n	// IE6-8 fails to return the selected option to the default selected\n	// state when cloning options\n	} else if ( nodeName === \"option\" ) {\n		dest.defaultSelected = dest.selected = src.defaultSelected;\n\n	// IE6-8 fails to set the defaultValue to the correct value when\n	// cloning other types of input fields\n	} else if ( nodeName === \"input\" || nodeName === \"textarea\" ) {\n		dest.defaultValue = src.defaultValue;\n	}\n}\n\njQuery.extend({\n	clone: function( elem, dataAndEvents, deepDataAndEvents ) {\n		var destElements, node, clone, i, srcElements,\n			inPage = jQuery.contains( elem.ownerDocument, elem );\n\n		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( \"<\" + elem.nodeName + \">\" ) ) {\n			clone = elem.cloneNode( true );\n\n		// IE<=8 does not properly clone detached, unknown element nodes\n		} else {\n			fragmentDiv.innerHTML = elem.outerHTML;\n			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );\n		}\n\n		if ( (!support.noCloneEvent || !support.noCloneChecked) &&\n				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {\n\n			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2\n			destElements = getAll( clone );\n			srcElements = getAll( elem );\n\n			// Fix all IE cloning issues\n			for ( i = 0; (node = srcElements[i]) != null; ++i ) {\n				// Ensure that the destination node is not null; Fixes #9587\n				if ( destElements[i] ) {\n					fixCloneNodeIssues( node, destElements[i] );\n				}\n			}\n		}\n\n		// Copy the events from the original to the clone\n		if ( dataAndEvents ) {\n			if ( deepDataAndEvents ) {\n				srcElements = srcElements || getAll( elem );\n				destElements = destElements || getAll( clone );\n\n				for ( i = 0; (node = srcElements[i]) != null; i++ ) {\n					cloneCopyEvent( node, destElements[i] );\n				}\n			} else {\n				cloneCopyEvent( elem, clone );\n			}\n		}\n\n		// Preserve script evaluation history\n		destElements = getAll( clone, \"script\" );\n		if ( destElements.length > 0 ) {\n			setGlobalEval( destElements, !inPage && getAll( elem, \"script\" ) );\n		}\n\n		destElements = srcElements = node = null;\n\n		// Return the cloned set\n		return clone;\n	},\n\n	buildFragment: function( elems, context, scripts, selection ) {\n		var j, elem, contains,\n			tmp, tag, tbody, wrap,\n			l = elems.length,\n\n			// Ensure a safe fragment\n			safe = createSafeFragment( context ),\n\n			nodes = [],\n			i = 0;\n\n		for ( ; i < l; i++ ) {\n			elem = elems[ i ];\n\n			if ( elem || elem === 0 ) {\n\n				// Add nodes directly\n				if ( jQuery.type( elem ) === \"object\" ) {\n					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );\n\n				// Convert non-html into a text node\n				} else if ( !rhtml.test( elem ) ) {\n					nodes.push( context.createTextNode( elem ) );\n\n				// Convert html into DOM nodes\n				} else {\n					tmp = tmp || safe.appendChild( context.createElement(\"div\") );\n\n					// Deserialize a standard representation\n					tag = (rtagName.exec( elem ) || [ \"\", \"\" ])[ 1 ].toLowerCase();\n					wrap = wrapMap[ tag ] || wrapMap._default;\n\n					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, \"<$1></$2>\" ) + wrap[2];\n\n					// Descend through wrappers to the right content\n					j = wrap[0];\n					while ( j-- ) {\n						tmp = tmp.lastChild;\n					}\n\n					// Manually add leading whitespace removed by IE\n					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {\n						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );\n					}\n\n					// Remove IE\'s autoinserted <tbody> from table fragments\n					if ( !support.tbody ) {\n\n						// String was a <table>, *may* have spurious <tbody>\n						elem = tag === \"table\" && !rtbody.test( elem ) ?\n							tmp.firstChild :\n\n							// String was a bare <thead> or <tfoot>\n							wrap[1] === \"<table>\" && !rtbody.test( elem ) ?\n								tmp :\n								0;\n\n						j = elem && elem.childNodes.length;\n						while ( j-- ) {\n							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), \"tbody\" ) && !tbody.childNodes.length ) {\n								elem.removeChild( tbody );\n							}\n						}\n					}\n\n					jQuery.merge( nodes, tmp.childNodes );\n\n					// Fix #12392 for WebKit and IE > 9\n					tmp.textContent = \"\";\n\n					// Fix #12392 for oldIE\n					while ( tmp.firstChild ) {\n						tmp.removeChild( tmp.firstChild );\n					}\n\n					// Remember the top-level container for proper cleanup\n					tmp = safe.lastChild;\n				}\n			}\n		}\n\n		// Fix #11356: Clear elements from fragment\n		if ( tmp ) {\n			safe.removeChild( tmp );\n		}\n\n		// Reset defaultChecked for any radios and checkboxes\n		// about to be appended to the DOM in IE 6/7 (#8060)\n		if ( !support.appendChecked ) {\n			jQuery.grep( getAll( nodes, \"input\" ), fixDefaultChecked );\n		}\n\n		i = 0;\n		while ( (elem = nodes[ i++ ]) ) {\n\n			// #4087 - If origin and destination elements are the same, and this is\n			// that element, do not do anything\n			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {\n				continue;\n			}\n\n			contains = jQuery.contains( elem.ownerDocument, elem );\n\n			// Append to fragment\n			tmp = getAll( safe.appendChild( elem ), \"script\" );\n\n			// Preserve script evaluation history\n			if ( contains ) {\n				setGlobalEval( tmp );\n			}\n\n			// Capture executables\n			if ( scripts ) {\n				j = 0;\n				while ( (elem = tmp[ j++ ]) ) {\n					if ( rscriptType.test( elem.type || \"\" ) ) {\n						scripts.push( elem );\n					}\n				}\n			}\n		}\n\n		tmp = null;\n\n		return safe;\n	},\n\n	cleanData: function( elems, /* internal */ acceptData ) {\n		var elem, type, id, data,\n			i = 0,\n			internalKey = jQuery.expando,\n			cache = jQuery.cache,\n			deleteExpando = support.deleteExpando,\n			special = jQuery.event.special;\n\n		for ( ; (elem = elems[i]) != null; i++ ) {\n			if ( acceptData || jQuery.acceptData( elem ) ) {\n\n				id = elem[ internalKey ];\n				data = id && cache[ id ];\n\n				if ( data ) {\n					if ( data.events ) {\n						for ( type in data.events ) {\n							if ( special[ type ] ) {\n								jQuery.event.remove( elem, type );\n\n							// This is a shortcut to avoid jQuery.event.remove\'s overhead\n							} else {\n								jQuery.removeEvent( elem, type, data.handle );\n							}\n						}\n					}\n\n					// Remove cache only if it was not already removed by jQuery.event.remove\n					if ( cache[ id ] ) {\n\n						delete cache[ id ];\n\n						// IE does not allow us to delete expando properties from nodes,\n						// nor does it have a removeAttribute function on Document nodes;\n						// we must handle all of these cases\n						if ( deleteExpando ) {\n							delete elem[ internalKey ];\n\n						} else if ( typeof elem.removeAttribute !== strundefined ) {\n							elem.removeAttribute( internalKey );\n\n						} else {\n							elem[ internalKey ] = null;\n						}\n\n						deletedIds.push( id );\n					}\n				}\n			}\n		}\n	}\n});\n\njQuery.fn.extend({\n	text: function( value ) {\n		return access( this, function( value ) {\n			return value === undefined ?\n				jQuery.text( this ) :\n				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );\n		}, null, value, arguments.length );\n	},\n\n	append: function() {\n		return this.domManip( arguments, function( elem ) {\n			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {\n				var target = manipulationTarget( this, elem );\n				target.appendChild( elem );\n			}\n		});\n	},\n\n	prepend: function() {\n		return this.domManip( arguments, function( elem ) {\n			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {\n				var target = manipulationTarget( this, elem );\n				target.insertBefore( elem, target.firstChild );\n			}\n		});\n	},\n\n	before: function() {\n		return this.domManip( arguments, function( elem ) {\n			if ( this.parentNode ) {\n				this.parentNode.insertBefore( elem, this );\n			}\n		});\n	},\n\n	after: function() {\n		return this.domManip( arguments, function( elem ) {\n			if ( this.parentNode ) {\n				this.parentNode.insertBefore( elem, this.nextSibling );\n			}\n		});\n	},\n\n	remove: function( selector, keepData /* Internal Use Only */ ) {\n		var elem,\n			elems = selector ? jQuery.filter( selector, this ) : this,\n			i = 0;\n\n		for ( ; (elem = elems[i]) != null; i++ ) {\n\n			if ( !keepData && elem.nodeType === 1 ) {\n				jQuery.cleanData( getAll( elem ) );\n			}\n\n			if ( elem.parentNode ) {\n				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {\n					setGlobalEval( getAll( elem, \"script\" ) );\n				}\n				elem.parentNode.removeChild( elem );\n			}\n		}\n\n		return this;\n	},\n\n	empty: function() {\n		var elem,\n			i = 0;\n\n		for ( ; (elem = this[i]) != null; i++ ) {\n			// Remove element nodes and prevent memory leaks\n			if ( elem.nodeType === 1 ) {\n				jQuery.cleanData( getAll( elem, false ) );\n			}\n\n			// Remove any remaining nodes\n			while ( elem.firstChild ) {\n				elem.removeChild( elem.firstChild );\n			}\n\n			// If this is a select, ensure that it displays empty (#12336)\n			// Support: IE<9\n			if ( elem.options && jQuery.nodeName( elem, \"select\" ) ) {\n				elem.options.length = 0;\n			}\n		}\n\n		return this;\n	},\n\n	clone: function( dataAndEvents, deepDataAndEvents ) {\n		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;\n		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;\n\n		return this.map(function() {\n			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );\n		});\n	},\n\n	html: function( value ) {\n		return access( this, function( value ) {\n			var elem = this[ 0 ] || {},\n				i = 0,\n				l = this.length;\n\n			if ( value === undefined ) {\n				return elem.nodeType === 1 ?\n					elem.innerHTML.replace( rinlinejQuery, \"\" ) :\n					undefined;\n			}\n\n			// See if we can take a shortcut and just use innerHTML\n			if ( typeof value === \"string\" && !rnoInnerhtml.test( value ) &&\n				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&\n				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&\n				!wrapMap[ (rtagName.exec( value ) || [ \"\", \"\" ])[ 1 ].toLowerCase() ] ) {\n\n				value = value.replace( rxhtmlTag, \"<$1></$2>\" );\n\n				try {\n					for (; i < l; i++ ) {\n						// Remove element nodes and prevent memory leaks\n						elem = this[i] || {};\n						if ( elem.nodeType === 1 ) {\n							jQuery.cleanData( getAll( elem, false ) );\n							elem.innerHTML = value;\n						}\n					}\n\n					elem = 0;\n\n				// If using innerHTML throws an exception, use the fallback method\n				} catch(e) {}\n			}\n\n			if ( elem ) {\n				this.empty().append( value );\n			}\n		}, null, value, arguments.length );\n	},\n\n	replaceWith: function() {\n		var arg = arguments[ 0 ];\n\n		// Make the changes, replacing each context element with the new content\n		this.domManip( arguments, function( elem ) {\n			arg = this.parentNode;\n\n			jQuery.cleanData( getAll( this ) );\n\n			if ( arg ) {\n				arg.replaceChild( elem, this );\n			}\n		});\n\n		// Force removal if there was no new content (e.g., from empty arguments)\n		return arg && (arg.length || arg.nodeType) ? this : this.remove();\n	},\n\n	detach: function( selector ) {\n		return this.remove( selector, true );\n	},\n\n	domManip: function( args, callback ) {\n\n		// Flatten any nested arrays\n		args = concat.apply( [], args );\n\n		var first, node, hasScripts,\n			scripts, doc, fragment,\n			i = 0,\n			l = this.length,\n			set = this,\n			iNoClone = l - 1,\n			value = args[0],\n			isFunction = jQuery.isFunction( value );\n\n		// We can\'t cloneNode fragments that contain checked, in WebKit\n		if ( isFunction ||\n				( l > 1 && typeof value === \"string\" &&\n					!support.checkClone && rchecked.test( value ) ) ) {\n			return this.each(function( index ) {\n				var self = set.eq( index );\n				if ( isFunction ) {\n					args[0] = value.call( this, index, self.html() );\n				}\n				self.domManip( args, callback );\n			});\n		}\n\n		if ( l ) {\n			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );\n			first = fragment.firstChild;\n\n			if ( fragment.childNodes.length === 1 ) {\n				fragment = first;\n			}\n\n			if ( first ) {\n				scripts = jQuery.map( getAll( fragment, \"script\" ), disableScript );\n				hasScripts = scripts.length;\n\n				// Use the original fragment for the last item instead of the first because it can end up\n				// being emptied incorrectly in certain situations (#8070).\n				for ( ; i < l; i++ ) {\n					node = fragment;\n\n					if ( i !== iNoClone ) {\n						node = jQuery.clone( node, true, true );\n\n						// Keep references to cloned scripts for later restoration\n						if ( hasScripts ) {\n							jQuery.merge( scripts, getAll( node, \"script\" ) );\n						}\n					}\n\n					callback.call( this[i], node, i );\n				}\n\n				if ( hasScripts ) {\n					doc = scripts[ scripts.length - 1 ].ownerDocument;\n\n					// Reenable scripts\n					jQuery.map( scripts, restoreScript );\n\n					// Evaluate executable scripts on first document insertion\n					for ( i = 0; i < hasScripts; i++ ) {\n						node = scripts[ i ];\n						if ( rscriptType.test( node.type || \"\" ) &&\n							!jQuery._data( node, \"globalEval\" ) && jQuery.contains( doc, node ) ) {\n\n							if ( node.src ) {\n								// Optional AJAX dependency, but won\'t run scripts if not present\n								if ( jQuery._evalUrl ) {\n									jQuery._evalUrl( node.src );\n								}\n							} else {\n								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || \"\" ).replace( rcleanScript, \"\" ) );\n							}\n						}\n					}\n				}\n\n				// Fix #11809: Avoid leaking memory\n				fragment = first = null;\n			}\n		}\n\n		return this;\n	}\n});\n\njQuery.each({\n	appendTo: \"append\",\n	prependTo: \"prepend\",\n	insertBefore: \"before\",\n	insertAfter: \"after\",\n	replaceAll: \"replaceWith\"\n}, function( name, original ) {\n	jQuery.fn[ name ] = function( selector ) {\n		var elems,\n			i = 0,\n			ret = [],\n			insert = jQuery( selector ),\n			last = insert.length - 1;\n\n		for ( ; i <= last; i++ ) {\n			elems = i === last ? this : this.clone(true);\n			jQuery( insert[i] )[ original ]( elems );\n\n			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()\n			push.apply( ret, elems.get() );\n		}\n\n		return this.pushStack( ret );\n	};\n});\n\n\nvar iframe,\n	elemdisplay = {};\n\n/**\n * Retrieve the actual display of a element\n * @param {String} name nodeName of the element\n * @param {Object} doc Document object\n */\n// Called only from within defaultDisplay\nfunction actualDisplay( name, doc ) {\n	var style,\n		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),\n\n		// getDefaultComputedStyle might be reliably used only on attached element\n		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?\n\n			// Use of this method is a temporary fix (more like optmization) until something better comes along,\n			// since it was removed from specification and supported only in FF\n			style.display : jQuery.css( elem[ 0 ], \"display\" );\n\n	// We don\'t have any data stored on the element,\n	// so use \"detach\" method as fast way to get rid of the element\n	elem.detach();\n\n	return display;\n}\n\n/**\n * Try to determine the default display value of an element\n * @param {String} nodeName\n */\nfunction defaultDisplay( nodeName ) {\n	var doc = document,\n		display = elemdisplay[ nodeName ];\n\n	if ( !display ) {\n		display = actualDisplay( nodeName, doc );\n\n		// If the simple way fails, read from inside an iframe\n		if ( display === \"none\" || !display ) {\n\n			// Use the already-created iframe if possible\n			iframe = (iframe || jQuery( \"<iframe frameborder=\'0\' width=\'0\' height=\'0\'/>\" )).appendTo( doc.documentElement );\n\n			// Always write a new HTML skeleton so Webkit and Firefox don\'t choke on reuse\n			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;\n\n			// Support: IE\n			doc.write();\n			doc.close();\n\n			display = actualDisplay( nodeName, doc );\n			iframe.detach();\n		}\n\n		// Store the correct default display\n		elemdisplay[ nodeName ] = display;\n	}\n\n	return display;\n}\n\n\n(function() {\n	var shrinkWrapBlocksVal;\n\n	support.shrinkWrapBlocks = function() {\n		if ( shrinkWrapBlocksVal != null ) {\n			return shrinkWrapBlocksVal;\n		}\n\n		// Will be changed later if needed.\n		shrinkWrapBlocksVal = false;\n\n		// Minified: var b,c,d\n		var div, body, container;\n\n		body = document.getElementsByTagName( \"body\" )[ 0 ];\n		if ( !body || !body.style ) {\n			// Test fired too early or in an unsupported environment, exit.\n			return;\n		}\n\n		// Setup\n		div = document.createElement( \"div\" );\n		container = document.createElement( \"div\" );\n		container.style.cssText = \"position:absolute;border:0;width:0;height:0;top:0;left:-9999px\";\n		body.appendChild( container ).appendChild( div );\n\n		// Support: IE6\n		// Check if elements with layout shrink-wrap their children\n		if ( typeof div.style.zoom !== strundefined ) {\n			// Reset CSS: box-sizing; display; margin; border\n			div.style.cssText =\n				// Support: Firefox<29, Android 2.3\n				// Vendor-prefix box-sizing\n				\"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;\" +\n				\"box-sizing:content-box;display:block;margin:0;border:0;\" +\n				\"padding:1px;width:1px;zoom:1\";\n			div.appendChild( document.createElement( \"div\" ) ).style.width = \"5px\";\n			shrinkWrapBlocksVal = div.offsetWidth !== 3;\n		}\n\n		body.removeChild( container );\n\n		return shrinkWrapBlocksVal;\n	};\n\n})();\nvar rmargin = (/^margin/);\n\nvar rnumnonpx = new RegExp( \"^(\" + pnum + \")(?!px)[a-z%]+$\", \"i\" );\n\n\n\nvar getStyles, curCSS,\n	rposition = /^(top|right|bottom|left)$/;\n\nif ( window.getComputedStyle ) {\n	getStyles = function( elem ) {\n		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)\n		// IE throws on elements created in popups\n		// FF meanwhile throws on frame elements through \"defaultView.getComputedStyle\"\n		if ( elem.ownerDocument.defaultView.opener ) {\n			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );\n		}\n\n		return window.getComputedStyle( elem, null );\n	};\n\n	curCSS = function( elem, name, computed ) {\n		var width, minWidth, maxWidth, ret,\n			style = elem.style;\n\n		computed = computed || getStyles( elem );\n\n		// getPropertyValue is only needed for .css(\'filter\') in IE9, see #12537\n		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;\n\n		if ( computed ) {\n\n			if ( ret === \"\" && !jQuery.contains( elem.ownerDocument, elem ) ) {\n				ret = jQuery.style( elem, name );\n			}\n\n			// A tribute to the \"awesome hack by Dean Edwards\"\n			// Chrome < 17 and Safari 5.0 uses \"computed value\" instead of \"used value\" for margin-right\n			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels\n			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values\n			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {\n\n				// Remember the original values\n				width = style.width;\n				minWidth = style.minWidth;\n				maxWidth = style.maxWidth;\n\n				// Put in the new values to get a computed value out\n				style.minWidth = style.maxWidth = style.width = ret;\n				ret = computed.width;\n\n				// Revert the changed values\n				style.width = width;\n				style.minWidth = minWidth;\n				style.maxWidth = maxWidth;\n			}\n		}\n\n		// Support: IE\n		// IE returns zIndex value as an integer.\n		return ret === undefined ?\n			ret :\n			ret + \"\";\n	};\n} else if ( document.documentElement.currentStyle ) {\n	getStyles = function( elem ) {\n		return elem.currentStyle;\n	};\n\n	curCSS = function( elem, name, computed ) {\n		var left, rs, rsLeft, ret,\n			style = elem.style;\n\n		computed = computed || getStyles( elem );\n		ret = computed ? computed[ name ] : undefined;\n\n		// Avoid setting ret to empty string here\n		// so we don\'t default to auto\n		if ( ret == null && style && style[ name ] ) {\n			ret = style[ name ];\n		}\n\n		// From the awesome hack by Dean Edwards\n		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291\n\n		// If we\'re not dealing with a regular pixel number\n		// but a number that has a weird ending, we need to convert it to pixels\n		// but not position css attributes, as those are proportional to the parent element instead\n		// and we can\'t measure the parent instead because it might trigger a \"stacking dolls\" problem\n		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {\n\n			// Remember the original values\n			left = style.left;\n			rs = elem.runtimeStyle;\n			rsLeft = rs && rs.left;\n\n			// Put in the new values to get a computed value out\n			if ( rsLeft ) {\n				rs.left = elem.currentStyle.left;\n			}\n			style.left = name === \"fontSize\" ? \"1em\" : ret;\n			ret = style.pixelLeft + \"px\";\n\n			// Revert the changed values\n			style.left = left;\n			if ( rsLeft ) {\n				rs.left = rsLeft;\n			}\n		}\n\n		// Support: IE\n		// IE returns zIndex value as an integer.\n		return ret === undefined ?\n			ret :\n			ret + \"\" || \"auto\";\n	};\n}\n\n\n\n\nfunction addGetHookIf( conditionFn, hookFn ) {\n	// Define the hook, we\'ll check on the first run if it\'s really needed.\n	return {\n		get: function() {\n			var condition = conditionFn();\n\n			if ( condition == null ) {\n				// The test was not ready at this point; screw the hook this time\n				// but check again when needed next time.\n				return;\n			}\n\n			if ( condition ) {\n				// Hook not needed (or it\'s not possible to use it due to missing dependency),\n				// remove it.\n				// Since there are no other hooks for marginRight, remove the whole object.\n				delete this.get;\n				return;\n			}\n\n			// Hook needed; redefine it so that the support test is not executed again.\n\n			return (this.get = hookFn).apply( this, arguments );\n		}\n	};\n}\n\n\n(function() {\n	// Minified: var b,c,d,e,f,g, h,i\n	var div, style, a, pixelPositionVal, boxSizingReliableVal,\n		reliableHiddenOffsetsVal, reliableMarginRightVal;\n\n	// Setup\n	div = document.createElement( \"div\" );\n	div.innerHTML = \"  <link/><table></table><a href=\'/a\'>a</a><input type=\'checkbox\'/>\";\n	a = div.getElementsByTagName( \"a\" )[ 0 ];\n	style = a && a.style;\n\n	// Finish early in limited (non-browser) environments\n	if ( !style ) {\n		return;\n	}\n\n	style.cssText = \"float:left;opacity:.5\";\n\n	// Support: IE<9\n	// Make sure that element opacity exists (as opposed to filter)\n	support.opacity = style.opacity === \"0.5\";\n\n	// Verify style float existence\n	// (IE uses styleFloat instead of cssFloat)\n	support.cssFloat = !!style.cssFloat;\n\n	div.style.backgroundClip = \"content-box\";\n	div.cloneNode( true ).style.backgroundClip = \"\";\n	support.clearCloneStyle = div.style.backgroundClip === \"content-box\";\n\n	// Support: Firefox<29, Android 2.3\n	// Vendor-prefix box-sizing\n	support.boxSizing = style.boxSizing === \"\" || style.MozBoxSizing === \"\" ||\n		style.WebkitBoxSizing === \"\";\n\n	jQuery.extend(support, {\n		reliableHiddenOffsets: function() {\n			if ( reliableHiddenOffsetsVal == null ) {\n				computeStyleTests();\n			}\n			return reliableHiddenOffsetsVal;\n		},\n\n		boxSizingReliable: function() {\n			if ( boxSizingReliableVal == null ) {\n				computeStyleTests();\n			}\n			return boxSizingReliableVal;\n		},\n\n		pixelPosition: function() {\n			if ( pixelPositionVal == null ) {\n				computeStyleTests();\n			}\n			return pixelPositionVal;\n		},\n\n		// Support: Android 2.3\n		reliableMarginRight: function() {\n			if ( reliableMarginRightVal == null ) {\n				computeStyleTests();\n			}\n			return reliableMarginRightVal;\n		}\n	});\n\n	function computeStyleTests() {\n		// Minified: var b,c,d,j\n		var div, body, container, contents;\n\n		body = document.getElementsByTagName( \"body\" )[ 0 ];\n		if ( !body || !body.style ) {\n			// Test fired too early or in an unsupported environment, exit.\n			return;\n		}\n\n		// Setup\n		div = document.createElement( \"div\" );\n		container = document.createElement( \"div\" );\n		container.style.cssText = \"position:absolute;border:0;width:0;height:0;top:0;left:-9999px\";\n		body.appendChild( container ).appendChild( div );\n\n		div.style.cssText =\n			// Support: Firefox<29, Android 2.3\n			// Vendor-prefix box-sizing\n			\"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;\" +\n			\"box-sizing:border-box;display:block;margin-top:1%;top:1%;\" +\n			\"border:1px;padding:1px;width:4px;position:absolute\";\n\n		// Support: IE<9\n		// Assume reasonable values in the absence of getComputedStyle\n		pixelPositionVal = boxSizingReliableVal = false;\n		reliableMarginRightVal = true;\n\n		// Check for getComputedStyle so that this code is not run in IE<9.\n		if ( window.getComputedStyle ) {\n			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== \"1%\";\n			boxSizingReliableVal =\n				( window.getComputedStyle( div, null ) || { width: \"4px\" } ).width === \"4px\";\n\n			// Support: Android 2.3\n			// Div with explicit width and no margin-right incorrectly\n			// gets computed margin-right based on width of container (#3333)\n			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right\n			contents = div.appendChild( document.createElement( \"div\" ) );\n\n			// Reset CSS: box-sizing; display; margin; border; padding\n			contents.style.cssText = div.style.cssText =\n				// Support: Firefox<29, Android 2.3\n				// Vendor-prefix box-sizing\n				\"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;\" +\n				\"box-sizing:content-box;display:block;margin:0;border:0;padding:0\";\n			contents.style.marginRight = contents.style.width = \"0\";\n			div.style.width = \"1px\";\n\n			reliableMarginRightVal =\n				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );\n\n			div.removeChild( contents );\n		}\n\n		// Support: IE8\n		// Check if table cells still have offsetWidth/Height when they are set\n		// to display:none and there are still other visible table cells in a\n		// table row; if so, offsetWidth/Height are not reliable for use when\n		// determining if an element has been hidden directly using\n		// display:none (it is still safe to use offsets if a parent element is\n		// hidden; don safety goggles and see bug #4512 for more information).\n		div.innerHTML = \"<table><tr><td></td><td>t</td></tr></table>\";\n		contents = div.getElementsByTagName( \"td\" );\n		contents[ 0 ].style.cssText = \"margin:0;border:0;padding:0;display:none\";\n		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;\n		if ( reliableHiddenOffsetsVal ) {\n			contents[ 0 ].style.display = \"\";\n			contents[ 1 ].style.display = \"none\";\n			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;\n		}\n\n		body.removeChild( container );\n	}\n\n})();\n\n\n// A method for quickly swapping in/out CSS properties to get correct calculations.\njQuery.swap = function( elem, options, callback, args ) {\n	var ret, name,\n		old = {};\n\n	// Remember the old values, and insert the new ones\n	for ( name in options ) {\n		old[ name ] = elem.style[ name ];\n		elem.style[ name ] = options[ name ];\n	}\n\n	ret = callback.apply( elem, args || [] );\n\n	// Revert the old values\n	for ( name in options ) {\n		elem.style[ name ] = old[ name ];\n	}\n\n	return ret;\n};\n\n\nvar\n		ralpha = /alpha\\([^)]*\\)/i,\n	ropacity = /opacity\\s*=\\s*([^)]*)/,\n\n	// swappable if display is none or starts with table except \"table\", \"table-cell\", or \"table-caption\"\n	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display\n	rdisplayswap = /^(none|table(?!-c[ea]).+)/,\n	rnumsplit = new RegExp( \"^(\" + pnum + \")(.*)$\", \"i\" ),\n	rrelNum = new RegExp( \"^([+-])=(\" + pnum + \")\", \"i\" ),\n\n	cssShow = { position: \"absolute\", visibility: \"hidden\", display: \"block\" },\n	cssNormalTransform = {\n		letterSpacing: \"0\",\n		fontWeight: \"400\"\n	},\n\n	cssPrefixes = [ \"Webkit\", \"O\", \"Moz\", \"ms\" ];\n\n\n// return a css property mapped to a potentially vendor prefixed property\nfunction vendorPropName( style, name ) {\n\n	// shortcut for names that are not vendor prefixed\n	if ( name in style ) {\n		return name;\n	}\n\n	// check for vendor prefixed names\n	var capName = name.charAt(0).toUpperCase() + name.slice(1),\n		origName = name,\n		i = cssPrefixes.length;\n\n	while ( i-- ) {\n		name = cssPrefixes[ i ] + capName;\n		if ( name in style ) {\n			return name;\n		}\n	}\n\n	return origName;\n}\n\nfunction showHide( elements, show ) {\n	var display, elem, hidden,\n		values = [],\n		index = 0,\n		length = elements.length;\n\n	for ( ; index < length; index++ ) {\n		elem = elements[ index ];\n		if ( !elem.style ) {\n			continue;\n		}\n\n		values[ index ] = jQuery._data( elem, \"olddisplay\" );\n		display = elem.style.display;\n		if ( show ) {\n			// Reset the inline display of this element to learn if it is\n			// being hidden by cascaded rules or not\n			if ( !values[ index ] && display === \"none\" ) {\n				elem.style.display = \"\";\n			}\n\n			// Set elements which have been overridden with display: none\n			// in a stylesheet to whatever the default browser style is\n			// for such an element\n			if ( elem.style.display === \"\" && isHidden( elem ) ) {\n				values[ index ] = jQuery._data( elem, \"olddisplay\", defaultDisplay(elem.nodeName) );\n			}\n		} else {\n			hidden = isHidden( elem );\n\n			if ( display && display !== \"none\" || !hidden ) {\n				jQuery._data( elem, \"olddisplay\", hidden ? display : jQuery.css( elem, \"display\" ) );\n			}\n		}\n	}\n\n	// Set the display of most of the elements in a second loop\n	// to avoid the constant reflow\n	for ( index = 0; index < length; index++ ) {\n		elem = elements[ index ];\n		if ( !elem.style ) {\n			continue;\n		}\n		if ( !show || elem.style.display === \"none\" || elem.style.display === \"\" ) {\n			elem.style.display = show ? values[ index ] || \"\" : \"none\";\n		}\n	}\n\n	return elements;\n}\n\nfunction setPositiveNumber( elem, value, subtract ) {\n	var matches = rnumsplit.exec( value );\n	return matches ?\n		// Guard against undefined \"subtract\", e.g., when used as in cssHooks\n		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || \"px\" ) :\n		value;\n}\n\nfunction augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {\n	var i = extra === ( isBorderBox ? \"border\" : \"content\" ) ?\n		// If we already have the right measurement, avoid augmentation\n		4 :\n		// Otherwise initialize for horizontal or vertical properties\n		name === \"width\" ? 1 : 0,\n\n		val = 0;\n\n	for ( ; i < 4; i += 2 ) {\n		// both box models exclude margin, so add it if we want it\n		if ( extra === \"margin\" ) {\n			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );\n		}\n\n		if ( isBorderBox ) {\n			// border-box includes padding, so remove it if we want content\n			if ( extra === \"content\" ) {\n				val -= jQuery.css( elem, \"padding\" + cssExpand[ i ], true, styles );\n			}\n\n			// at this point, extra isn\'t border nor margin, so remove border\n			if ( extra !== \"margin\" ) {\n				val -= jQuery.css( elem, \"border\" + cssExpand[ i ] + \"Width\", true, styles );\n			}\n		} else {\n			// at this point, extra isn\'t content, so add padding\n			val += jQuery.css( elem, \"padding\" + cssExpand[ i ], true, styles );\n\n			// at this point, extra isn\'t content nor padding, so add border\n			if ( extra !== \"padding\" ) {\n				val += jQuery.css( elem, \"border\" + cssExpand[ i ] + \"Width\", true, styles );\n			}\n		}\n	}\n\n	return val;\n}\n\nfunction getWidthOrHeight( elem, name, extra ) {\n\n	// Start with offset property, which is equivalent to the border-box value\n	var valueIsBorderBox = true,\n		val = name === \"width\" ? elem.offsetWidth : elem.offsetHeight,\n		styles = getStyles( elem ),\n		isBorderBox = support.boxSizing && jQuery.css( elem, \"boxSizing\", false, styles ) === \"border-box\";\n\n	// some non-html elements return undefined for offsetWidth, so check for null/undefined\n	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285\n	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668\n	if ( val <= 0 || val == null ) {\n		// Fall back to computed then uncomputed css if necessary\n		val = curCSS( elem, name, styles );\n		if ( val < 0 || val == null ) {\n			val = elem.style[ name ];\n		}\n\n		// Computed unit is not pixels. Stop here and return.\n		if ( rnumnonpx.test(val) ) {\n			return val;\n		}\n\n		// we need the check for style in case a browser which returns unreliable values\n		// for getComputedStyle silently falls back to the reliable elem.style\n		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );\n\n		// Normalize \"\", auto, and prepare for extra\n		val = parseFloat( val ) || 0;\n	}\n\n	// use the active box-sizing model to add/subtract irrelevant styles\n	return ( val +\n		augmentWidthOrHeight(\n			elem,\n			name,\n			extra || ( isBorderBox ? \"border\" : \"content\" ),\n			valueIsBorderBox,\n			styles\n		)\n	) + \"px\";\n}\n\njQuery.extend({\n	// Add in style property hooks for overriding the default\n	// behavior of getting and setting a style property\n	cssHooks: {\n		opacity: {\n			get: function( elem, computed ) {\n				if ( computed ) {\n					// We should always get a number back from opacity\n					var ret = curCSS( elem, \"opacity\" );\n					return ret === \"\" ? \"1\" : ret;\n				}\n			}\n		}\n	},\n\n	// Don\'t automatically add \"px\" to these possibly-unitless properties\n	cssNumber: {\n		\"columnCount\": true,\n		\"fillOpacity\": true,\n		\"flexGrow\": true,\n		\"flexShrink\": true,\n		\"fontWeight\": true,\n		\"lineHeight\": true,\n		\"opacity\": true,\n		\"order\": true,\n		\"orphans\": true,\n		\"widows\": true,\n		\"zIndex\": true,\n		\"zoom\": true\n	},\n\n	// Add in properties whose names you wish to fix before\n	// setting or getting the value\n	cssProps: {\n		// normalize float css property\n		\"float\": support.cssFloat ? \"cssFloat\" : \"styleFloat\"\n	},\n\n	// Get and set the style property on a DOM Node\n	style: function( elem, name, value, extra ) {\n		// Don\'t set styles on text and comment nodes\n		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {\n			return;\n		}\n\n		// Make sure that we\'re working with the right name\n		var ret, type, hooks,\n			origName = jQuery.camelCase( name ),\n			style = elem.style;\n\n		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );\n\n		// gets hook for the prefixed version\n		// followed by the unprefixed version\n		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];\n\n		// Check if we\'re setting a value\n		if ( value !== undefined ) {\n			type = typeof value;\n\n			// convert relative number strings (+= or -=) to relative numbers. #7345\n			if ( type === \"string\" && (ret = rrelNum.exec( value )) ) {\n				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );\n				// Fixes bug #9237\n				type = \"number\";\n			}\n\n			// Make sure that null and NaN values aren\'t set. See: #7116\n			if ( value == null || value !== value ) {\n				return;\n			}\n\n			// If a number was passed in, add \'px\' to the (except for certain CSS properties)\n			if ( type === \"number\" && !jQuery.cssNumber[ origName ] ) {\n				value += \"px\";\n			}\n\n			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,\n			// but it would mean to define eight (for every problematic property) identical functions\n			if ( !support.clearCloneStyle && value === \"\" && name.indexOf(\"background\") === 0 ) {\n				style[ name ] = \"inherit\";\n			}\n\n			// If a hook was provided, use that value, otherwise just set the specified value\n			if ( !hooks || !(\"set\" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {\n\n				// Support: IE\n				// Swallow errors from \'invalid\' CSS values (#5509)\n				try {\n					style[ name ] = value;\n				} catch(e) {}\n			}\n\n		} else {\n			// If a hook was provided get the non-computed value from there\n			if ( hooks && \"get\" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {\n				return ret;\n			}\n\n			// Otherwise just get the value from the style object\n			return style[ name ];\n		}\n	},\n\n	css: function( elem, name, extra, styles ) {\n		var num, val, hooks,\n			origName = jQuery.camelCase( name );\n\n		// Make sure that we\'re working with the right name\n		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );\n\n		// gets hook for the prefixed version\n		// followed by the unprefixed version\n		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];\n\n		// If a hook was provided get the computed value from there\n		if ( hooks && \"get\" in hooks ) {\n			val = hooks.get( elem, true, extra );\n		}\n\n		// Otherwise, if a way to get the computed value exists, use that\n		if ( val === undefined ) {\n			val = curCSS( elem, name, styles );\n		}\n\n		//convert \"normal\" to computed value\n		if ( val === \"normal\" && name in cssNormalTransform ) {\n			val = cssNormalTransform[ name ];\n		}\n\n		// Return, converting to number if forced or a qualifier was provided and val looks numeric\n		if ( extra === \"\" || extra ) {\n			num = parseFloat( val );\n			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;\n		}\n		return val;\n	}\n});\n\njQuery.each([ \"height\", \"width\" ], function( i, name ) {\n	jQuery.cssHooks[ name ] = {\n		get: function( elem, computed, extra ) {\n			if ( computed ) {\n				// certain elements can have dimension info if we invisibly show them\n				// however, it must have a current display style that would benefit from this\n				return rdisplayswap.test( jQuery.css( elem, \"display\" ) ) && elem.offsetWidth === 0 ?\n					jQuery.swap( elem, cssShow, function() {\n						return getWidthOrHeight( elem, name, extra );\n					}) :\n					getWidthOrHeight( elem, name, extra );\n			}\n		},\n\n		set: function( elem, value, extra ) {\n			var styles = extra && getStyles( elem );\n			return setPositiveNumber( elem, value, extra ?\n				augmentWidthOrHeight(\n					elem,\n					name,\n					extra,\n					support.boxSizing && jQuery.css( elem, \"boxSizing\", false, styles ) === \"border-box\",\n					styles\n				) : 0\n			);\n		}\n	};\n});\n\nif ( !support.opacity ) {\n	jQuery.cssHooks.opacity = {\n		get: function( elem, computed ) {\n			// IE uses filters for opacity\n			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || \"\" ) ?\n				( 0.01 * parseFloat( RegExp.$1 ) ) + \"\" :\n				computed ? \"1\" : \"\";\n		},\n\n		set: function( elem, value ) {\n			var style = elem.style,\n				currentStyle = elem.currentStyle,\n				opacity = jQuery.isNumeric( value ) ? \"alpha(opacity=\" + value * 100 + \")\" : \"\",\n				filter = currentStyle && currentStyle.filter || style.filter || \"\";\n\n			// IE has trouble with opacity if it does not have layout\n			// Force it by setting the zoom level\n			style.zoom = 1;\n\n			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652\n			// if value === \"\", then remove inline opacity #12685\n			if ( ( value >= 1 || value === \"\" ) &&\n					jQuery.trim( filter.replace( ralpha, \"\" ) ) === \"\" &&\n					style.removeAttribute ) {\n\n				// Setting style.filter to null, \"\" & \" \" still leave \"filter:\" in the cssText\n				// if \"filter:\" is present at all, clearType is disabled, we want to avoid this\n				// style.removeAttribute is IE Only, but so apparently is this code path...\n				style.removeAttribute( \"filter\" );\n\n				// if there is no filter style applied in a css rule or unset inline opacity, we are done\n				if ( value === \"\" || currentStyle && !currentStyle.filter ) {\n					return;\n				}\n			}\n\n			// otherwise, set new filter values\n			style.filter = ralpha.test( filter ) ?\n				filter.replace( ralpha, opacity ) :\n				filter + \" \" + opacity;\n		}\n	};\n}\n\njQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,\n	function( elem, computed ) {\n		if ( computed ) {\n			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right\n			// Work around by temporarily setting element display to inline-block\n			return jQuery.swap( elem, { \"display\": \"inline-block\" },\n				curCSS, [ elem, \"marginRight\" ] );\n		}\n	}\n);\n\n// These hooks are used by animate to expand properties\njQuery.each({\n	margin: \"\",\n	padding: \"\",\n	border: \"Width\"\n}, function( prefix, suffix ) {\n	jQuery.cssHooks[ prefix + suffix ] = {\n		expand: function( value ) {\n			var i = 0,\n				expanded = {},\n\n				// assumes a single number if not a string\n				parts = typeof value === \"string\" ? value.split(\" \") : [ value ];\n\n			for ( ; i < 4; i++ ) {\n				expanded[ prefix + cssExpand[ i ] + suffix ] =\n					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];\n			}\n\n			return expanded;\n		}\n	};\n\n	if ( !rmargin.test( prefix ) ) {\n		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;\n	}\n});\n\njQuery.fn.extend({\n	css: function( name, value ) {\n		return access( this, function( elem, name, value ) {\n			var styles, len,\n				map = {},\n				i = 0;\n\n			if ( jQuery.isArray( name ) ) {\n				styles = getStyles( elem );\n				len = name.length;\n\n				for ( ; i < len; i++ ) {\n					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );\n				}\n\n				return map;\n			}\n\n			return value !== undefined ?\n				jQuery.style( elem, name, value ) :\n				jQuery.css( elem, name );\n		}, name, value, arguments.length > 1 );\n	},\n	show: function() {\n		return showHide( this, true );\n	},\n	hide: function() {\n		return showHide( this );\n	},\n	toggle: function( state ) {\n		if ( typeof state === \"boolean\" ) {\n			return state ? this.show() : this.hide();\n		}\n\n		return this.each(function() {\n			if ( isHidden( this ) ) {\n				jQuery( this ).show();\n			} else {\n				jQuery( this ).hide();\n			}\n		});\n	}\n});\n\n\nfunction Tween( elem, options, prop, end, easing ) {\n	return new Tween.prototype.init( elem, options, prop, end, easing );\n}\njQuery.Tween = Tween;\n\nTween.prototype = {\n	constructor: Tween,\n	init: function( elem, options, prop, end, easing, unit ) {\n		this.elem = elem;\n		this.prop = prop;\n		this.easing = easing || \"swing\";\n		this.options = options;\n		this.start = this.now = this.cur();\n		this.end = end;\n		this.unit = unit || ( jQuery.cssNumber[ prop ] ? \"\" : \"px\" );\n	},\n	cur: function() {\n		var hooks = Tween.propHooks[ this.prop ];\n\n		return hooks && hooks.get ?\n			hooks.get( this ) :\n			Tween.propHooks._default.get( this );\n	},\n	run: function( percent ) {\n		var eased,\n			hooks = Tween.propHooks[ this.prop ];\n\n		if ( this.options.duration ) {\n			this.pos = eased = jQuery.easing[ this.easing ](\n				percent, this.options.duration * percent, 0, 1, this.options.duration\n			);\n		} else {\n			this.pos = eased = percent;\n		}\n		this.now = ( this.end - this.start ) * eased + this.start;\n\n		if ( this.options.step ) {\n			this.options.step.call( this.elem, this.now, this );\n		}\n\n		if ( hooks && hooks.set ) {\n			hooks.set( this );\n		} else {\n			Tween.propHooks._default.set( this );\n		}\n		return this;\n	}\n};\n\nTween.prototype.init.prototype = Tween.prototype;\n\nTween.propHooks = {\n	_default: {\n		get: function( tween ) {\n			var result;\n\n			if ( tween.elem[ tween.prop ] != null &&\n				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {\n				return tween.elem[ tween.prop ];\n			}\n\n			// passing an empty string as a 3rd parameter to .css will automatically\n			// attempt a parseFloat and fallback to a string if the parse fails\n			// so, simple values such as \"10px\" are parsed to Float.\n			// complex values such as \"rotate(1rad)\" are returned as is.\n			result = jQuery.css( tween.elem, tween.prop, \"\" );\n			// Empty strings, null, undefined and \"auto\" are converted to 0.\n			return !result || result === \"auto\" ? 0 : result;\n		},\n		set: function( tween ) {\n			// use step hook for back compat - use cssHook if its there - use .style if its\n			// available and use plain properties where available\n			if ( jQuery.fx.step[ tween.prop ] ) {\n				jQuery.fx.step[ tween.prop ]( tween );\n			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {\n				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );\n			} else {\n				tween.elem[ tween.prop ] = tween.now;\n			}\n		}\n	}\n};\n\n// Support: IE <=9\n// Panic based approach to setting things on disconnected nodes\n\nTween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {\n	set: function( tween ) {\n		if ( tween.elem.nodeType && tween.elem.parentNode ) {\n			tween.elem[ tween.prop ] = tween.now;\n		}\n	}\n};\n\njQuery.easing = {\n	linear: function( p ) {\n		return p;\n	},\n	swing: function( p ) {\n		return 0.5 - Math.cos( p * Math.PI ) / 2;\n	}\n};\n\njQuery.fx = Tween.prototype.init;\n\n// Back Compat <1.8 extension point\njQuery.fx.step = {};\n\n\n\n\nvar\n	fxNow, timerId,\n	rfxtypes = /^(?:toggle|show|hide)$/,\n	rfxnum = new RegExp( \"^(?:([+-])=|)(\" + pnum + \")([a-z%]*)$\", \"i\" ),\n	rrun = /queueHooks$/,\n	animationPrefilters = [ defaultPrefilter ],\n	tweeners = {\n		\"*\": [ function( prop, value ) {\n			var tween = this.createTween( prop, value ),\n				target = tween.cur(),\n				parts = rfxnum.exec( value ),\n				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? \"\" : \"px\" ),\n\n				// Starting value computation is required for potential unit mismatches\n				start = ( jQuery.cssNumber[ prop ] || unit !== \"px\" && +target ) &&\n					rfxnum.exec( jQuery.css( tween.elem, prop ) ),\n				scale = 1,\n				maxIterations = 20;\n\n			if ( start && start[ 3 ] !== unit ) {\n				// Trust units reported by jQuery.css\n				unit = unit || start[ 3 ];\n\n				// Make sure we update the tween properties later on\n				parts = parts || [];\n\n				// Iteratively approximate from a nonzero starting point\n				start = +target || 1;\n\n				do {\n					// If previous iteration zeroed out, double until we get *something*\n					// Use a string for doubling factor so we don\'t accidentally see scale as unchanged below\n					scale = scale || \".5\";\n\n					// Adjust and apply\n					start = start / scale;\n					jQuery.style( tween.elem, prop, start + unit );\n\n				// Update scale, tolerating zero or NaN from tween.cur()\n				// And breaking the loop if scale is unchanged or perfect, or if we\'ve just had enough\n				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );\n			}\n\n			// Update tween properties\n			if ( parts ) {\n				start = tween.start = +start || +target || 0;\n				tween.unit = unit;\n				// If a +=/-= token was provided, we\'re doing a relative animation\n				tween.end = parts[ 1 ] ?\n					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :\n					+parts[ 2 ];\n			}\n\n			return tween;\n		} ]\n	};\n\n// Animations created synchronously will run synchronously\nfunction createFxNow() {\n	setTimeout(function() {\n		fxNow = undefined;\n	});\n	return ( fxNow = jQuery.now() );\n}\n\n// Generate parameters to create a standard animation\nfunction genFx( type, includeWidth ) {\n	var which,\n		attrs = { height: type },\n		i = 0;\n\n	// if we include width, step value is 1 to do all cssExpand values,\n	// if we don\'t include width, step value is 2 to skip over Left and Right\n	includeWidth = includeWidth ? 1 : 0;\n	for ( ; i < 4 ; i += 2 - includeWidth ) {\n		which = cssExpand[ i ];\n		attrs[ \"margin\" + which ] = attrs[ \"padding\" + which ] = type;\n	}\n\n	if ( includeWidth ) {\n		attrs.opacity = attrs.width = type;\n	}\n\n	return attrs;\n}\n\nfunction createTween( value, prop, animation ) {\n	var tween,\n		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ \"*\" ] ),\n		index = 0,\n		length = collection.length;\n	for ( ; index < length; index++ ) {\n		if ( (tween = collection[ index ].call( animation, prop, value )) ) {\n\n			// we\'re done with this property\n			return tween;\n		}\n	}\n}\n\nfunction defaultPrefilter( elem, props, opts ) {\n	/* jshint validthis: true */\n	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,\n		anim = this,\n		orig = {},\n		style = elem.style,\n		hidden = elem.nodeType && isHidden( elem ),\n		dataShow = jQuery._data( elem, \"fxshow\" );\n\n	// handle queue: false promises\n	if ( !opts.queue ) {\n		hooks = jQuery._queueHooks( elem, \"fx\" );\n		if ( hooks.unqueued == null ) {\n			hooks.unqueued = 0;\n			oldfire = hooks.empty.fire;\n			hooks.empty.fire = function() {\n				if ( !hooks.unqueued ) {\n					oldfire();\n				}\n			};\n		}\n		hooks.unqueued++;\n\n		anim.always(function() {\n			// doing this makes sure that the complete handler will be called\n			// before this completes\n			anim.always(function() {\n				hooks.unqueued--;\n				if ( !jQuery.queue( elem, \"fx\" ).length ) {\n					hooks.empty.fire();\n				}\n			});\n		});\n	}\n\n	// height/width overflow pass\n	if ( elem.nodeType === 1 && ( \"height\" in props || \"width\" in props ) ) {\n		// Make sure that nothing sneaks out\n		// Record all 3 overflow attributes because IE does not\n		// change the overflow attribute when overflowX and\n		// overflowY are set to the same value\n		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];\n\n		// Set display property to inline-block for height/width\n		// animations on inline elements that are having width/height animated\n		display = jQuery.css( elem, \"display\" );\n\n		// Test default display if display is currently \"none\"\n		checkDisplay = display === \"none\" ?\n			jQuery._data( elem, \"olddisplay\" ) || defaultDisplay( elem.nodeName ) : display;\n\n		if ( checkDisplay === \"inline\" && jQuery.css( elem, \"float\" ) === \"none\" ) {\n\n			// inline-level elements accept inline-block;\n			// block-level elements need to be inline with layout\n			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === \"inline\" ) {\n				style.display = \"inline-block\";\n			} else {\n				style.zoom = 1;\n			}\n		}\n	}\n\n	if ( opts.overflow ) {\n		style.overflow = \"hidden\";\n		if ( !support.shrinkWrapBlocks() ) {\n			anim.always(function() {\n				style.overflow = opts.overflow[ 0 ];\n				style.overflowX = opts.overflow[ 1 ];\n				style.overflowY = opts.overflow[ 2 ];\n			});\n		}\n	}\n\n	// show/hide pass\n	for ( prop in props ) {\n		value = props[ prop ];\n		if ( rfxtypes.exec( value ) ) {\n			delete props[ prop ];\n			toggle = toggle || value === \"toggle\";\n			if ( value === ( hidden ? \"hide\" : \"show\" ) ) {\n\n				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden\n				if ( value === \"show\" && dataShow && dataShow[ prop ] !== undefined ) {\n					hidden = true;\n				} else {\n					continue;\n				}\n			}\n			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );\n\n		// Any non-fx value stops us from restoring the original display value\n		} else {\n			display = undefined;\n		}\n	}\n\n	if ( !jQuery.isEmptyObject( orig ) ) {\n		if ( dataShow ) {\n			if ( \"hidden\" in dataShow ) {\n				hidden = dataShow.hidden;\n			}\n		} else {\n			dataShow = jQuery._data( elem, \"fxshow\", {} );\n		}\n\n		// store state if its toggle - enables .stop().toggle() to \"reverse\"\n		if ( toggle ) {\n			dataShow.hidden = !hidden;\n		}\n		if ( hidden ) {\n			jQuery( elem ).show();\n		} else {\n			anim.done(function() {\n				jQuery( elem ).hide();\n			});\n		}\n		anim.done(function() {\n			var prop;\n			jQuery._removeData( elem, \"fxshow\" );\n			for ( prop in orig ) {\n				jQuery.style( elem, prop, orig[ prop ] );\n			}\n		});\n		for ( prop in orig ) {\n			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );\n\n			if ( !( prop in dataShow ) ) {\n				dataShow[ prop ] = tween.start;\n				if ( hidden ) {\n					tween.end = tween.start;\n					tween.start = prop === \"width\" || prop === \"height\" ? 1 : 0;\n				}\n			}\n		}\n\n	// If this is a noop like .hide().hide(), restore an overwritten display value\n	} else if ( (display === \"none\" ? defaultDisplay( elem.nodeName ) : display) === \"inline\" ) {\n		style.display = display;\n	}\n}\n\nfunction propFilter( props, specialEasing ) {\n	var index, name, easing, value, hooks;\n\n	// camelCase, specialEasing and expand cssHook pass\n	for ( index in props ) {\n		name = jQuery.camelCase( index );\n		easing = specialEasing[ name ];\n		value = props[ index ];\n		if ( jQuery.isArray( value ) ) {\n			easing = value[ 1 ];\n			value = props[ index ] = value[ 0 ];\n		}\n\n		if ( index !== name ) {\n			props[ name ] = value;\n			delete props[ index ];\n		}\n\n		hooks = jQuery.cssHooks[ name ];\n		if ( hooks && \"expand\" in hooks ) {\n			value = hooks.expand( value );\n			delete props[ name ];\n\n			// not quite $.extend, this wont overwrite keys already present.\n			// also - reusing \'index\' from above because we have the correct \"name\"\n			for ( index in value ) {\n				if ( !( index in props ) ) {\n					props[ index ] = value[ index ];\n					specialEasing[ index ] = easing;\n				}\n			}\n		} else {\n			specialEasing[ name ] = easing;\n		}\n	}\n}\n\nfunction Animation( elem, properties, options ) {\n	var result,\n		stopped,\n		index = 0,\n		length = animationPrefilters.length,\n		deferred = jQuery.Deferred().always( function() {\n			// don\'t match elem in the :animated selector\n			delete tick.elem;\n		}),\n		tick = function() {\n			if ( stopped ) {\n				return false;\n			}\n			var currentTime = fxNow || createFxNow(),\n				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),\n				// archaic crash bug won\'t allow us to use 1 - ( 0.5 || 0 ) (#12497)\n				temp = remaining / animation.duration || 0,\n				percent = 1 - temp,\n				index = 0,\n				length = animation.tweens.length;\n\n			for ( ; index < length ; index++ ) {\n				animation.tweens[ index ].run( percent );\n			}\n\n			deferred.notifyWith( elem, [ animation, percent, remaining ]);\n\n			if ( percent < 1 && length ) {\n				return remaining;\n			} else {\n				deferred.resolveWith( elem, [ animation ] );\n				return false;\n			}\n		},\n		animation = deferred.promise({\n			elem: elem,\n			props: jQuery.extend( {}, properties ),\n			opts: jQuery.extend( true, { specialEasing: {} }, options ),\n			originalProperties: properties,\n			originalOptions: options,\n			startTime: fxNow || createFxNow(),\n			duration: options.duration,\n			tweens: [],\n			createTween: function( prop, end ) {\n				var tween = jQuery.Tween( elem, animation.opts, prop, end,\n						animation.opts.specialEasing[ prop ] || animation.opts.easing );\n				animation.tweens.push( tween );\n				return tween;\n			},\n			stop: function( gotoEnd ) {\n				var index = 0,\n					// if we are going to the end, we want to run all the tweens\n					// otherwise we skip this part\n					length = gotoEnd ? animation.tweens.length : 0;\n				if ( stopped ) {\n					return this;\n				}\n				stopped = true;\n				for ( ; index < length ; index++ ) {\n					animation.tweens[ index ].run( 1 );\n				}\n\n				// resolve when we played the last frame\n				// otherwise, reject\n				if ( gotoEnd ) {\n					deferred.resolveWith( elem, [ animation, gotoEnd ] );\n				} else {\n					deferred.rejectWith( elem, [ animation, gotoEnd ] );\n				}\n				return this;\n			}\n		}),\n		props = animation.props;\n\n	propFilter( props, animation.opts.specialEasing );\n\n	for ( ; index < length ; index++ ) {\n		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );\n		if ( result ) {\n			return result;\n		}\n	}\n\n	jQuery.map( props, createTween, animation );\n\n	if ( jQuery.isFunction( animation.opts.start ) ) {\n		animation.opts.start.call( elem, animation );\n	}\n\n	jQuery.fx.timer(\n		jQuery.extend( tick, {\n			elem: elem,\n			anim: animation,\n			queue: animation.opts.queue\n		})\n	);\n\n	// attach callbacks from options\n	return animation.progress( animation.opts.progress )\n		.done( animation.opts.done, animation.opts.complete )\n		.fail( animation.opts.fail )\n		.always( animation.opts.always );\n}\n\njQuery.Animation = jQuery.extend( Animation, {\n	tweener: function( props, callback ) {\n		if ( jQuery.isFunction( props ) ) {\n			callback = props;\n			props = [ \"*\" ];\n		} else {\n			props = props.split(\" \");\n		}\n\n		var prop,\n			index = 0,\n			length = props.length;\n\n		for ( ; index < length ; index++ ) {\n			prop = props[ index ];\n			tweeners[ prop ] = tweeners[ prop ] || [];\n			tweeners[ prop ].unshift( callback );\n		}\n	},\n\n	prefilter: function( callback, prepend ) {\n		if ( prepend ) {\n			animationPrefilters.unshift( callback );\n		} else {\n			animationPrefilters.push( callback );\n		}\n	}\n});\n\njQuery.speed = function( speed, easing, fn ) {\n	var opt = speed && typeof speed === \"object\" ? jQuery.extend( {}, speed ) : {\n		complete: fn || !fn && easing ||\n			jQuery.isFunction( speed ) && speed,\n		duration: speed,\n		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing\n	};\n\n	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === \"number\" ? opt.duration :\n		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;\n\n	// normalize opt.queue - true/undefined/null -> \"fx\"\n	if ( opt.queue == null || opt.queue === true ) {\n		opt.queue = \"fx\";\n	}\n\n	// Queueing\n	opt.old = opt.complete;\n\n	opt.complete = function() {\n		if ( jQuery.isFunction( opt.old ) ) {\n			opt.old.call( this );\n		}\n\n		if ( opt.queue ) {\n			jQuery.dequeue( this, opt.queue );\n		}\n	};\n\n	return opt;\n};\n\njQuery.fn.extend({\n	fadeTo: function( speed, to, easing, callback ) {\n\n		// show any hidden elements after setting opacity to 0\n		return this.filter( isHidden ).css( \"opacity\", 0 ).show()\n\n			// animate to the value specified\n			.end().animate({ opacity: to }, speed, easing, callback );\n	},\n	animate: function( prop, speed, easing, callback ) {\n		var empty = jQuery.isEmptyObject( prop ),\n			optall = jQuery.speed( speed, easing, callback ),\n			doAnimation = function() {\n				// Operate on a copy of prop so per-property easing won\'t be lost\n				var anim = Animation( this, jQuery.extend( {}, prop ), optall );\n\n				// Empty animations, or finishing resolves immediately\n				if ( empty || jQuery._data( this, \"finish\" ) ) {\n					anim.stop( true );\n				}\n			};\n			doAnimation.finish = doAnimation;\n\n		return empty || optall.queue === false ?\n			this.each( doAnimation ) :\n			this.queue( optall.queue, doAnimation );\n	},\n	stop: function( type, clearQueue, gotoEnd ) {\n		var stopQueue = function( hooks ) {\n			var stop = hooks.stop;\n			delete hooks.stop;\n			stop( gotoEnd );\n		};\n\n		if ( typeof type !== \"string\" ) {\n			gotoEnd = clearQueue;\n			clearQueue = type;\n			type = undefined;\n		}\n		if ( clearQueue && type !== false ) {\n			this.queue( type || \"fx\", [] );\n		}\n\n		return this.each(function() {\n			var dequeue = true,\n				index = type != null && type + \"queueHooks\",\n				timers = jQuery.timers,\n				data = jQuery._data( this );\n\n			if ( index ) {\n				if ( data[ index ] && data[ index ].stop ) {\n					stopQueue( data[ index ] );\n				}\n			} else {\n				for ( index in data ) {\n					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {\n						stopQueue( data[ index ] );\n					}\n				}\n			}\n\n			for ( index = timers.length; index--; ) {\n				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {\n					timers[ index ].anim.stop( gotoEnd );\n					dequeue = false;\n					timers.splice( index, 1 );\n				}\n			}\n\n			// start the next in the queue if the last step wasn\'t forced\n			// timers currently will call their complete callbacks, which will dequeue\n			// but only if they were gotoEnd\n			if ( dequeue || !gotoEnd ) {\n				jQuery.dequeue( this, type );\n			}\n		});\n	},\n	finish: function( type ) {\n		if ( type !== false ) {\n			type = type || \"fx\";\n		}\n		return this.each(function() {\n			var index,\n				data = jQuery._data( this ),\n				queue = data[ type + \"queue\" ],\n				hooks = data[ type + \"queueHooks\" ],\n				timers = jQuery.timers,\n				length = queue ? queue.length : 0;\n\n			// enable finishing flag on private data\n			data.finish = true;\n\n			// empty the queue first\n			jQuery.queue( this, type, [] );\n\n			if ( hooks && hooks.stop ) {\n				hooks.stop.call( this, true );\n			}\n\n			// look for any active animations, and finish them\n			for ( index = timers.length; index--; ) {\n				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {\n					timers[ index ].anim.stop( true );\n					timers.splice( index, 1 );\n				}\n			}\n\n			// look for any animations in the old queue and finish them\n			for ( index = 0; index < length; index++ ) {\n				if ( queue[ index ] && queue[ index ].finish ) {\n					queue[ index ].finish.call( this );\n				}\n			}\n\n			// turn off finishing flag\n			delete data.finish;\n		});\n	}\n});\n\njQuery.each([ \"toggle\", \"show\", \"hide\" ], function( i, name ) {\n	var cssFn = jQuery.fn[ name ];\n	jQuery.fn[ name ] = function( speed, easing, callback ) {\n		return speed == null || typeof speed === \"boolean\" ?\n			cssFn.apply( this, arguments ) :\n			this.animate( genFx( name, true ), speed, easing, callback );\n	};\n});\n\n// Generate shortcuts for custom animations\njQuery.each({\n	slideDown: genFx(\"show\"),\n	slideUp: genFx(\"hide\"),\n	slideToggle: genFx(\"toggle\"),\n	fadeIn: { opacity: \"show\" },\n	fadeOut: { opacity: \"hide\" },\n	fadeToggle: { opacity: \"toggle\" }\n}, function( name, props ) {\n	jQuery.fn[ name ] = function( speed, easing, callback ) {\n		return this.animate( props, speed, easing, callback );\n	};\n});\n\njQuery.timers = [];\njQuery.fx.tick = function() {\n	var timer,\n		timers = jQuery.timers,\n		i = 0;\n\n	fxNow = jQuery.now();\n\n	for ( ; i < timers.length; i++ ) {\n		timer = timers[ i ];\n		// Checks the timer has not already been removed\n		if ( !timer() && timers[ i ] === timer ) {\n			timers.splice( i--, 1 );\n		}\n	}\n\n	if ( !timers.length ) {\n		jQuery.fx.stop();\n	}\n	fxNow = undefined;\n};\n\njQuery.fx.timer = function( timer ) {\n	jQuery.timers.push( timer );\n	if ( timer() ) {\n		jQuery.fx.start();\n	} else {\n		jQuery.timers.pop();\n	}\n};\n\njQuery.fx.interval = 13;\n\njQuery.fx.start = function() {\n	if ( !timerId ) {\n		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );\n	}\n};\n\njQuery.fx.stop = function() {\n	clearInterval( timerId );\n	timerId = null;\n};\n\njQuery.fx.speeds = {\n	slow: 600,\n	fast: 200,\n	// Default speed\n	_default: 400\n};\n\n\n// Based off of the plugin by Clint Helfers, with permission.\n// http://blindsignals.com/index.php/2009/07/jquery-delay/\njQuery.fn.delay = function( time, type ) {\n	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;\n	type = type || \"fx\";\n\n	return this.queue( type, function( next, hooks ) {\n		var timeout = setTimeout( next, time );\n		hooks.stop = function() {\n			clearTimeout( timeout );\n		};\n	});\n};\n\n\n(function() {\n	// Minified: var a,b,c,d,e\n	var input, div, select, a, opt;\n\n	// Setup\n	div = document.createElement( \"div\" );\n	div.setAttribute( \"className\", \"t\" );\n	div.innerHTML = \"  <link/><table></table><a href=\'/a\'>a</a><input type=\'checkbox\'/>\";\n	a = div.getElementsByTagName(\"a\")[ 0 ];\n\n	// First batch of tests.\n	select = document.createElement(\"select\");\n	opt = select.appendChild( document.createElement(\"option\") );\n	input = div.getElementsByTagName(\"input\")[ 0 ];\n\n	a.style.cssText = \"top:1px\";\n\n	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)\n	support.getSetAttribute = div.className !== \"t\";\n\n	// Get the style information from getAttribute\n	// (IE uses .cssText instead)\n	support.style = /top/.test( a.getAttribute(\"style\") );\n\n	// Make sure that URLs aren\'t manipulated\n	// (IE normalizes it by default)\n	support.hrefNormalized = a.getAttribute(\"href\") === \"/a\";\n\n	// Check the default checkbox/radio value (\"\" on WebKit; \"on\" elsewhere)\n	support.checkOn = !!input.value;\n\n	// Make sure that a selected-by-default option has a working selected property.\n	// (WebKit defaults to false instead of true, IE too, if it\'s in an optgroup)\n	support.optSelected = opt.selected;\n\n	// Tests for enctype support on a form (#6743)\n	support.enctype = !!document.createElement(\"form\").enctype;\n\n	// Make sure that the options inside disabled selects aren\'t marked as disabled\n	// (WebKit marks them as disabled)\n	select.disabled = true;\n	support.optDisabled = !opt.disabled;\n\n	// Support: IE8 only\n	// Check if we can trust getAttribute(\"value\")\n	input = document.createElement( \"input\" );\n	input.setAttribute( \"value\", \"\" );\n	support.input = input.getAttribute( \"value\" ) === \"\";\n\n	// Check if an input maintains its value after becoming a radio\n	input.value = \"t\";\n	input.setAttribute( \"type\", \"radio\" );\n	support.radioValue = input.value === \"t\";\n})();\n\n\nvar rreturn = /\\r/g;\n\njQuery.fn.extend({\n	val: function( value ) {\n		var hooks, ret, isFunction,\n			elem = this[0];\n\n		if ( !arguments.length ) {\n			if ( elem ) {\n				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];\n\n				if ( hooks && \"get\" in hooks && (ret = hooks.get( elem, \"value\" )) !== undefined ) {\n					return ret;\n				}\n\n				ret = elem.value;\n\n				return typeof ret === \"string\" ?\n					// handle most common string cases\n					ret.replace(rreturn, \"\") :\n					// handle cases where value is null/undef or number\n					ret == null ? \"\" : ret;\n			}\n\n			return;\n		}\n\n		isFunction = jQuery.isFunction( value );\n\n		return this.each(function( i ) {\n			var val;\n\n			if ( this.nodeType !== 1 ) {\n				return;\n			}\n\n			if ( isFunction ) {\n				val = value.call( this, i, jQuery( this ).val() );\n			} else {\n				val = value;\n			}\n\n			// Treat null/undefined as \"\"; convert numbers to string\n			if ( val == null ) {\n				val = \"\";\n			} else if ( typeof val === \"number\" ) {\n				val += \"\";\n			} else if ( jQuery.isArray( val ) ) {\n				val = jQuery.map( val, function( value ) {\n					return value == null ? \"\" : value + \"\";\n				});\n			}\n\n			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];\n\n			// If set returns undefined, fall back to normal setting\n			if ( !hooks || !(\"set\" in hooks) || hooks.set( this, val, \"value\" ) === undefined ) {\n				this.value = val;\n			}\n		});\n	}\n});\n\njQuery.extend({\n	valHooks: {\n		option: {\n			get: function( elem ) {\n				var val = jQuery.find.attr( elem, \"value\" );\n				return val != null ?\n					val :\n					// Support: IE10-11+\n					// option.text throws exceptions (#14686, #14858)\n					jQuery.trim( jQuery.text( elem ) );\n			}\n		},\n		select: {\n			get: function( elem ) {\n				var value, option,\n					options = elem.options,\n					index = elem.selectedIndex,\n					one = elem.type === \"select-one\" || index < 0,\n					values = one ? null : [],\n					max = one ? index + 1 : options.length,\n					i = index < 0 ?\n						max :\n						one ? index : 0;\n\n				// Loop through all the selected options\n				for ( ; i < max; i++ ) {\n					option = options[ i ];\n\n					// oldIE doesn\'t update selected after form reset (#2551)\n					if ( ( option.selected || i === index ) &&\n							// Don\'t return options that are disabled or in a disabled optgroup\n							( support.optDisabled ? !option.disabled : option.getAttribute(\"disabled\") === null ) &&\n							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, \"optgroup\" ) ) ) {\n\n						// Get the specific value for the option\n						value = jQuery( option ).val();\n\n						// We don\'t need an array for one selects\n						if ( one ) {\n							return value;\n						}\n\n						// Multi-Selects return an array\n						values.push( value );\n					}\n				}\n\n				return values;\n			},\n\n			set: function( elem, value ) {\n				var optionSet, option,\n					options = elem.options,\n					values = jQuery.makeArray( value ),\n					i = options.length;\n\n				while ( i-- ) {\n					option = options[ i ];\n\n					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {\n\n						// Support: IE6\n						// When new option element is added to select box we need to\n						// force reflow of newly added node in order to workaround delay\n						// of initialization properties\n						try {\n							option.selected = optionSet = true;\n\n						} catch ( _ ) {\n\n							// Will be executed only in IE6\n							option.scrollHeight;\n						}\n\n					} else {\n						option.selected = false;\n					}\n				}\n\n				// Force browsers to behave consistently when non-matching value is set\n				if ( !optionSet ) {\n					elem.selectedIndex = -1;\n				}\n\n				return options;\n			}\n		}\n	}\n});\n\n// Radios and checkboxes getter/setter\njQuery.each([ \"radio\", \"checkbox\" ], function() {\n	jQuery.valHooks[ this ] = {\n		set: function( elem, value ) {\n			if ( jQuery.isArray( value ) ) {\n				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );\n			}\n		}\n	};\n	if ( !support.checkOn ) {\n		jQuery.valHooks[ this ].get = function( elem ) {\n			// Support: Webkit\n			// \"\" is returned instead of \"on\" if a value isn\'t specified\n			return elem.getAttribute(\"value\") === null ? \"on\" : elem.value;\n		};\n	}\n});\n\n\n\n\nvar nodeHook, boolHook,\n	attrHandle = jQuery.expr.attrHandle,\n	ruseDefault = /^(?:checked|selected)$/i,\n	getSetAttribute = support.getSetAttribute,\n	getSetInput = support.input;\n\njQuery.fn.extend({\n	attr: function( name, value ) {\n		return access( this, jQuery.attr, name, value, arguments.length > 1 );\n	},\n\n	removeAttr: function( name ) {\n		return this.each(function() {\n			jQuery.removeAttr( this, name );\n		});\n	}\n});\n\njQuery.extend({\n	attr: function( elem, name, value ) {\n		var hooks, ret,\n			nType = elem.nodeType;\n\n		// don\'t get/set attributes on text, comment and attribute nodes\n		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {\n			return;\n		}\n\n		// Fallback to prop when attributes are not supported\n		if ( typeof elem.getAttribute === strundefined ) {\n			return jQuery.prop( elem, name, value );\n		}\n\n		// All attributes are lowercase\n		// Grab necessary hook if one is defined\n		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {\n			name = name.toLowerCase();\n			hooks = jQuery.attrHooks[ name ] ||\n				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );\n		}\n\n		if ( value !== undefined ) {\n\n			if ( value === null ) {\n				jQuery.removeAttr( elem, name );\n\n			} else if ( hooks && \"set\" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {\n				return ret;\n\n			} else {\n				elem.setAttribute( name, value + \"\" );\n				return value;\n			}\n\n		} else if ( hooks && \"get\" in hooks && (ret = hooks.get( elem, name )) !== null ) {\n			return ret;\n\n		} else {\n			ret = jQuery.find.attr( elem, name );\n\n			// Non-existent attributes return null, we normalize to undefined\n			return ret == null ?\n				undefined :\n				ret;\n		}\n	},\n\n	removeAttr: function( elem, value ) {\n		var name, propName,\n			i = 0,\n			attrNames = value && value.match( rnotwhite );\n\n		if ( attrNames && elem.nodeType === 1 ) {\n			while ( (name = attrNames[i++]) ) {\n				propName = jQuery.propFix[ name ] || name;\n\n				// Boolean attributes get special treatment (#10870)\n				if ( jQuery.expr.match.bool.test( name ) ) {\n					// Set corresponding property to false\n					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {\n						elem[ propName ] = false;\n					// Support: IE<9\n					// Also clear defaultChecked/defaultSelected (if appropriate)\n					} else {\n						elem[ jQuery.camelCase( \"default-\" + name ) ] =\n							elem[ propName ] = false;\n					}\n\n				// See #9699 for explanation of this approach (setting first, then removal)\n				} else {\n					jQuery.attr( elem, name, \"\" );\n				}\n\n				elem.removeAttribute( getSetAttribute ? name : propName );\n			}\n		}\n	},\n\n	attrHooks: {\n		type: {\n			set: function( elem, value ) {\n				if ( !support.radioValue && value === \"radio\" && jQuery.nodeName(elem, \"input\") ) {\n					// Setting the type on a radio button after the value resets the value in IE6-9\n					// Reset value to default in case type is set after value during creation\n					var val = elem.value;\n					elem.setAttribute( \"type\", value );\n					if ( val ) {\n						elem.value = val;\n					}\n					return value;\n				}\n			}\n		}\n	}\n});\n\n// Hook for boolean attributes\nboolHook = {\n	set: function( elem, value, name ) {\n		if ( value === false ) {\n			// Remove boolean attributes when set to false\n			jQuery.removeAttr( elem, name );\n		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {\n			// IE<8 needs the *property* name\n			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );\n\n		// Use defaultChecked and defaultSelected for oldIE\n		} else {\n			elem[ jQuery.camelCase( \"default-\" + name ) ] = elem[ name ] = true;\n		}\n\n		return name;\n	}\n};\n\n// Retrieve booleans specially\njQuery.each( jQuery.expr.match.bool.source.match( /\\w+/g ), function( i, name ) {\n\n	var getter = attrHandle[ name ] || jQuery.find.attr;\n\n	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?\n		function( elem, name, isXML ) {\n			var ret, handle;\n			if ( !isXML ) {\n				// Avoid an infinite loop by temporarily removing this function from the getter\n				handle = attrHandle[ name ];\n				attrHandle[ name ] = ret;\n				ret = getter( elem, name, isXML ) != null ?\n					name.toLowerCase() :\n					null;\n				attrHandle[ name ] = handle;\n			}\n			return ret;\n		} :\n		function( elem, name, isXML ) {\n			if ( !isXML ) {\n				return elem[ jQuery.camelCase( \"default-\" + name ) ] ?\n					name.toLowerCase() :\n					null;\n			}\n		};\n});\n\n// fix oldIE attroperties\nif ( !getSetInput || !getSetAttribute ) {\n	jQuery.attrHooks.value = {\n		set: function( elem, value, name ) {\n			if ( jQuery.nodeName( elem, \"input\" ) ) {\n				// Does not return so that setAttribute is also used\n				elem.defaultValue = value;\n			} else {\n				// Use nodeHook if defined (#1954); otherwise setAttribute is fine\n				return nodeHook && nodeHook.set( elem, value, name );\n			}\n		}\n	};\n}\n\n// IE6/7 do not support getting/setting some attributes with get/setAttribute\nif ( !getSetAttribute ) {\n\n	// Use this for any attribute in IE6/7\n	// This fixes almost every IE6/7 issue\n	nodeHook = {\n		set: function( elem, value, name ) {\n			// Set the existing or create a new attribute node\n			var ret = elem.getAttributeNode( name );\n			if ( !ret ) {\n				elem.setAttributeNode(\n					(ret = elem.ownerDocument.createAttribute( name ))\n				);\n			}\n\n			ret.value = value += \"\";\n\n			// Break association with cloned elements by also using setAttribute (#9646)\n			if ( name === \"value\" || value === elem.getAttribute( name ) ) {\n				return value;\n			}\n		}\n	};\n\n	// Some attributes are constructed with empty-string values when not defined\n	attrHandle.id = attrHandle.name = attrHandle.coords =\n		function( elem, name, isXML ) {\n			var ret;\n			if ( !isXML ) {\n				return (ret = elem.getAttributeNode( name )) && ret.value !== \"\" ?\n					ret.value :\n					null;\n			}\n		};\n\n	// Fixing value retrieval on a button requires this module\n	jQuery.valHooks.button = {\n		get: function( elem, name ) {\n			var ret = elem.getAttributeNode( name );\n			if ( ret && ret.specified ) {\n				return ret.value;\n			}\n		},\n		set: nodeHook.set\n	};\n\n	// Set contenteditable to false on removals(#10429)\n	// Setting to empty string throws an error as an invalid value\n	jQuery.attrHooks.contenteditable = {\n		set: function( elem, value, name ) {\n			nodeHook.set( elem, value === \"\" ? false : value, name );\n		}\n	};\n\n	// Set width and height to auto instead of 0 on empty string( Bug #8150 )\n	// This is for removals\n	jQuery.each([ \"width\", \"height\" ], function( i, name ) {\n		jQuery.attrHooks[ name ] = {\n			set: function( elem, value ) {\n				if ( value === \"\" ) {\n					elem.setAttribute( name, \"auto\" );\n					return value;\n				}\n			}\n		};\n	});\n}\n\nif ( !support.style ) {\n	jQuery.attrHooks.style = {\n		get: function( elem ) {\n			// Return undefined in the case of empty string\n			// Note: IE uppercases css property names, but if we were to .toLowerCase()\n			// .cssText, that would destroy case senstitivity in URL\'s, like in \"background\"\n			return elem.style.cssText || undefined;\n		},\n		set: function( elem, value ) {\n			return ( elem.style.cssText = value + \"\" );\n		}\n	};\n}\n\n\n\n\nvar rfocusable = /^(?:input|select|textarea|button|object)$/i,\n	rclickable = /^(?:a|area)$/i;\n\njQuery.fn.extend({\n	prop: function( name, value ) {\n		return access( this, jQuery.prop, name, value, arguments.length > 1 );\n	},\n\n	removeProp: function( name ) {\n		name = jQuery.propFix[ name ] || name;\n		return this.each(function() {\n			// try/catch handles cases where IE balks (such as removing a property on window)\n			try {\n				this[ name ] = undefined;\n				delete this[ name ];\n			} catch( e ) {}\n		});\n	}\n});\n\njQuery.extend({\n	propFix: {\n		\"for\": \"htmlFor\",\n		\"class\": \"className\"\n	},\n\n	prop: function( elem, name, value ) {\n		var ret, hooks, notxml,\n			nType = elem.nodeType;\n\n		// don\'t get/set properties on text, comment and attribute nodes\n		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {\n			return;\n		}\n\n		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );\n\n		if ( notxml ) {\n			// Fix name and attach hooks\n			name = jQuery.propFix[ name ] || name;\n			hooks = jQuery.propHooks[ name ];\n		}\n\n		if ( value !== undefined ) {\n			return hooks && \"set\" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?\n				ret :\n				( elem[ name ] = value );\n\n		} else {\n			return hooks && \"get\" in hooks && (ret = hooks.get( elem, name )) !== null ?\n				ret :\n				elem[ name ];\n		}\n	},\n\n	propHooks: {\n		tabIndex: {\n			get: function( elem ) {\n				// elem.tabIndex doesn\'t always return the correct value when it hasn\'t been explicitly set\n				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/\n				// Use proper attribute retrieval(#12072)\n				var tabindex = jQuery.find.attr( elem, \"tabindex\" );\n\n				return tabindex ?\n					parseInt( tabindex, 10 ) :\n					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?\n						0 :\n						-1;\n			}\n		}\n	}\n});\n\n// Some attributes require a special call on IE\n// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx\nif ( !support.hrefNormalized ) {\n	// href/src property should get the full normalized URL (#10299/#12915)\n	jQuery.each([ \"href\", \"src\" ], function( i, name ) {\n		jQuery.propHooks[ name ] = {\n			get: function( elem ) {\n				return elem.getAttribute( name, 4 );\n			}\n		};\n	});\n}\n\n// Support: Safari, IE9+\n// mis-reports the default selected property of an option\n// Accessing the parent\'s selectedIndex property fixes it\nif ( !support.optSelected ) {\n	jQuery.propHooks.selected = {\n		get: function( elem ) {\n			var parent = elem.parentNode;\n\n			if ( parent ) {\n				parent.selectedIndex;\n\n				// Make sure that it also works with optgroups, see #5701\n				if ( parent.parentNode ) {\n					parent.parentNode.selectedIndex;\n				}\n			}\n			return null;\n		}\n	};\n}\n\njQuery.each([\n	\"tabIndex\",\n	\"readOnly\",\n	\"maxLength\",\n	\"cellSpacing\",\n	\"cellPadding\",\n	\"rowSpan\",\n	\"colSpan\",\n	\"useMap\",\n	\"frameBorder\",\n	\"contentEditable\"\n], function() {\n	jQuery.propFix[ this.toLowerCase() ] = this;\n});\n\n// IE6/7 call enctype encoding\nif ( !support.enctype ) {\n	jQuery.propFix.enctype = \"encoding\";\n}\n\n\n\n\nvar rclass = /[\\t\\r\\n\\f]/g;\n\njQuery.fn.extend({\n	addClass: function( value ) {\n		var classes, elem, cur, clazz, j, finalValue,\n			i = 0,\n			len = this.length,\n			proceed = typeof value === \"string\" && value;\n\n		if ( jQuery.isFunction( value ) ) {\n			return this.each(function( j ) {\n				jQuery( this ).addClass( value.call( this, j, this.className ) );\n			});\n		}\n\n		if ( proceed ) {\n			// The disjunction here is for better compressibility (see removeClass)\n			classes = ( value || \"\" ).match( rnotwhite ) || [];\n\n			for ( ; i < len; i++ ) {\n				elem = this[ i ];\n				cur = elem.nodeType === 1 && ( elem.className ?\n					( \" \" + elem.className + \" \" ).replace( rclass, \" \" ) :\n					\" \"\n				);\n\n				if ( cur ) {\n					j = 0;\n					while ( (clazz = classes[j++]) ) {\n						if ( cur.indexOf( \" \" + clazz + \" \" ) < 0 ) {\n							cur += clazz + \" \";\n						}\n					}\n\n					// only assign if different to avoid unneeded rendering.\n					finalValue = jQuery.trim( cur );\n					if ( elem.className !== finalValue ) {\n						elem.className = finalValue;\n					}\n				}\n			}\n		}\n\n		return this;\n	},\n\n	removeClass: function( value ) {\n		var classes, elem, cur, clazz, j, finalValue,\n			i = 0,\n			len = this.length,\n			proceed = arguments.length === 0 || typeof value === \"string\" && value;\n\n		if ( jQuery.isFunction( value ) ) {\n			return this.each(function( j ) {\n				jQuery( this ).removeClass( value.call( this, j, this.className ) );\n			});\n		}\n		if ( proceed ) {\n			classes = ( value || \"\" ).match( rnotwhite ) || [];\n\n			for ( ; i < len; i++ ) {\n				elem = this[ i ];\n				// This expression is here for better compressibility (see addClass)\n				cur = elem.nodeType === 1 && ( elem.className ?\n					( \" \" + elem.className + \" \" ).replace( rclass, \" \" ) :\n					\"\"\n				);\n\n				if ( cur ) {\n					j = 0;\n					while ( (clazz = classes[j++]) ) {\n						// Remove *all* instances\n						while ( cur.indexOf( \" \" + clazz + \" \" ) >= 0 ) {\n							cur = cur.replace( \" \" + clazz + \" \", \" \" );\n						}\n					}\n\n					// only assign if different to avoid unneeded rendering.\n					finalValue = value ? jQuery.trim( cur ) : \"\";\n					if ( elem.className !== finalValue ) {\n						elem.className = finalValue;\n					}\n				}\n			}\n		}\n\n		return this;\n	},\n\n	toggleClass: function( value, stateVal ) {\n		var type = typeof value;\n\n		if ( typeof stateVal === \"boolean\" && type === \"string\" ) {\n			return stateVal ? this.addClass( value ) : this.removeClass( value );\n		}\n\n		if ( jQuery.isFunction( value ) ) {\n			return this.each(function( i ) {\n				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );\n			});\n		}\n\n		return this.each(function() {\n			if ( type === \"string\" ) {\n				// toggle individual class names\n				var className,\n					i = 0,\n					self = jQuery( this ),\n					classNames = value.match( rnotwhite ) || [];\n\n				while ( (className = classNames[ i++ ]) ) {\n					// check each className given, space separated list\n					if ( self.hasClass( className ) ) {\n						self.removeClass( className );\n					} else {\n						self.addClass( className );\n					}\n				}\n\n			// Toggle whole class name\n			} else if ( type === strundefined || type === \"boolean\" ) {\n				if ( this.className ) {\n					// store className if set\n					jQuery._data( this, \"__className__\", this.className );\n				}\n\n				// If the element has a class name or if we\'re passed \"false\",\n				// then remove the whole classname (if there was one, the above saved it).\n				// Otherwise bring back whatever was previously saved (if anything),\n				// falling back to the empty string if nothing was stored.\n				this.className = this.className || value === false ? \"\" : jQuery._data( this, \"__className__\" ) || \"\";\n			}\n		});\n	},\n\n	hasClass: function( selector ) {\n		var className = \" \" + selector + \" \",\n			i = 0,\n			l = this.length;\n		for ( ; i < l; i++ ) {\n			if ( this[i].nodeType === 1 && (\" \" + this[i].className + \" \").replace(rclass, \" \").indexOf( className ) >= 0 ) {\n				return true;\n			}\n		}\n\n		return false;\n	}\n});\n\n\n\n\n// Return jQuery for attributes-only inclusion\n\n\njQuery.each( (\"blur focus focusin focusout load resize scroll unload click dblclick \" +\n	\"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave \" +\n	\"change select submit keydown keypress keyup error contextmenu\").split(\" \"), function( i, name ) {\n\n	// Handle event binding\n	jQuery.fn[ name ] = function( data, fn ) {\n		return arguments.length > 0 ?\n			this.on( name, null, data, fn ) :\n			this.trigger( name );\n	};\n});\n\njQuery.fn.extend({\n	hover: function( fnOver, fnOut ) {\n		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );\n	},\n\n	bind: function( types, data, fn ) {\n		return this.on( types, null, data, fn );\n	},\n	unbind: function( types, fn ) {\n		return this.off( types, null, fn );\n	},\n\n	delegate: function( selector, types, data, fn ) {\n		return this.on( types, selector, data, fn );\n	},\n	undelegate: function( selector, types, fn ) {\n		// ( namespace ) or ( selector, types [, fn] )\n		return arguments.length === 1 ? this.off( selector, \"**\" ) : this.off( types, selector || \"**\", fn );\n	}\n});\n\n\nvar nonce = jQuery.now();\n\nvar rquery = (/\\?/);\n\n\n\nvar rvalidtokens = /(,)|(\\[|{)|(}|])|\"(?:[^\"\\\\\\r\\n]|\\\\[\"\\\\\\/bfnrt]|\\\\u[\\da-fA-F]{4})*\"\\s*:?|true|false|null|-?(?!0\\d)\\d+(?:\\.\\d+|)(?:[eE][+-]?\\d+|)/g;\n\njQuery.parseJSON = function( data ) {\n	// Attempt to parse using the native JSON parser first\n	if ( window.JSON && window.JSON.parse ) {\n		// Support: Android 2.3\n		// Workaround failure to string-cast null input\n		return window.JSON.parse( data + \"\" );\n	}\n\n	var requireNonComma,\n		depth = null,\n		str = jQuery.trim( data + \"\" );\n\n	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains\n	// after removing valid tokens\n	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {\n\n		// Force termination if we see a misplaced comma\n		if ( requireNonComma && comma ) {\n			depth = 0;\n		}\n\n		// Perform no more replacements after returning to outermost depth\n		if ( depth === 0 ) {\n			return token;\n		}\n\n		// Commas must not follow \"[\", \"{\", or \",\"\n		requireNonComma = open || comma;\n\n		// Determine new depth\n		// array/object open (\"[\" or \"{\"): depth += true - false (increment)\n		// array/object close (\"]\" or \"}\"): depth += false - true (decrement)\n		// other cases (\",\" or primitive): depth += true - true (numeric cast)\n		depth += !close - !open;\n\n		// Remove this token\n		return \"\";\n	}) ) ?\n		( Function( \"return \" + str ) )() :\n		jQuery.error( \"Invalid JSON: \" + data );\n};\n\n\n// Cross-browser xml parsing\njQuery.parseXML = function( data ) {\n	var xml, tmp;\n	if ( !data || typeof data !== \"string\" ) {\n		return null;\n	}\n	try {\n		if ( window.DOMParser ) { // Standard\n			tmp = new DOMParser();\n			xml = tmp.parseFromString( data, \"text/xml\" );\n		} else { // IE\n			xml = new ActiveXObject( \"Microsoft.XMLDOM\" );\n			xml.async = \"false\";\n			xml.loadXML( data );\n		}\n	} catch( e ) {\n		xml = undefined;\n	}\n	if ( !xml || !xml.documentElement || xml.getElementsByTagName( \"parsererror\" ).length ) {\n		jQuery.error( \"Invalid XML: \" + data );\n	}\n	return xml;\n};\n\n\nvar\n	// Document location\n	ajaxLocParts,\n	ajaxLocation,\n\n	rhash = /#.*$/,\n	rts = /([?&])_=[^&]*/,\n	rheaders = /^(.*?):[ \\t]*([^\\r\\n]*)\\r?$/mg, // IE leaves an \\r character at EOL\n	// #7653, #8125, #8152: local protocol detection\n	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,\n	rnoContent = /^(?:GET|HEAD)$/,\n	rprotocol = /^\\/\\//,\n	rurl = /^([\\w.+-]+:)(?:\\/\\/(?:[^\\/?#]*@|)([^\\/?#:]*)(?::(\\d+)|)|)/,\n\n	/* Prefilters\n	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)\n	 * 2) These are called:\n	 *    - BEFORE asking for a transport\n	 *    - AFTER param serialization (s.data is a string if s.processData is true)\n	 * 3) key is the dataType\n	 * 4) the catchall symbol \"*\" can be used\n	 * 5) execution will start with transport dataType and THEN continue down to \"*\" if needed\n	 */\n	prefilters = {},\n\n	/* Transports bindings\n	 * 1) key is the dataType\n	 * 2) the catchall symbol \"*\" can be used\n	 * 3) selection will start with transport dataType and THEN go to \"*\" if needed\n	 */\n	transports = {},\n\n	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression\n	allTypes = \"*/\".concat(\"*\");\n\n// #8138, IE may throw an exception when accessing\n// a field from window.location if document.domain has been set\ntry {\n	ajaxLocation = location.href;\n} catch( e ) {\n	// Use the href attribute of an A element\n	// since IE will modify it given document.location\n	ajaxLocation = document.createElement( \"a\" );\n	ajaxLocation.href = \"\";\n	ajaxLocation = ajaxLocation.href;\n}\n\n// Segment location into parts\najaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];\n\n// Base \"constructor\" for jQuery.ajaxPrefilter and jQuery.ajaxTransport\nfunction addToPrefiltersOrTransports( structure ) {\n\n	// dataTypeExpression is optional and defaults to \"*\"\n	return function( dataTypeExpression, func ) {\n\n		if ( typeof dataTypeExpression !== \"string\" ) {\n			func = dataTypeExpression;\n			dataTypeExpression = \"*\";\n		}\n\n		var dataType,\n			i = 0,\n			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];\n\n		if ( jQuery.isFunction( func ) ) {\n			// For each dataType in the dataTypeExpression\n			while ( (dataType = dataTypes[i++]) ) {\n				// Prepend if requested\n				if ( dataType.charAt( 0 ) === \"+\" ) {\n					dataType = dataType.slice( 1 ) || \"*\";\n					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );\n\n				// Otherwise append\n				} else {\n					(structure[ dataType ] = structure[ dataType ] || []).push( func );\n				}\n			}\n		}\n	};\n}\n\n// Base inspection function for prefilters and transports\nfunction inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {\n\n	var inspected = {},\n		seekingTransport = ( structure === transports );\n\n	function inspect( dataType ) {\n		var selected;\n		inspected[ dataType ] = true;\n		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {\n			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );\n			if ( typeof dataTypeOrTransport === \"string\" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {\n				options.dataTypes.unshift( dataTypeOrTransport );\n				inspect( dataTypeOrTransport );\n				return false;\n			} else if ( seekingTransport ) {\n				return !( selected = dataTypeOrTransport );\n			}\n		});\n		return selected;\n	}\n\n	return inspect( options.dataTypes[ 0 ] ) || !inspected[ \"*\" ] && inspect( \"*\" );\n}\n\n// A special extend for ajax options\n// that takes \"flat\" options (not to be deep extended)\n// Fixes #9887\nfunction ajaxExtend( target, src ) {\n	var deep, key,\n		flatOptions = jQuery.ajaxSettings.flatOptions || {};\n\n	for ( key in src ) {\n		if ( src[ key ] !== undefined ) {\n			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];\n		}\n	}\n	if ( deep ) {\n		jQuery.extend( true, target, deep );\n	}\n\n	return target;\n}\n\n/* Handles responses to an ajax request:\n * - finds the right dataType (mediates between content-type and expected dataType)\n * - returns the corresponding response\n */\nfunction ajaxHandleResponses( s, jqXHR, responses ) {\n	var firstDataType, ct, finalDataType, type,\n		contents = s.contents,\n		dataTypes = s.dataTypes;\n\n	// Remove auto dataType and get content-type in the process\n	while ( dataTypes[ 0 ] === \"*\" ) {\n		dataTypes.shift();\n		if ( ct === undefined ) {\n			ct = s.mimeType || jqXHR.getResponseHeader(\"Content-Type\");\n		}\n	}\n\n	// Check if we\'re dealing with a known content-type\n	if ( ct ) {\n		for ( type in contents ) {\n			if ( contents[ type ] && contents[ type ].test( ct ) ) {\n				dataTypes.unshift( type );\n				break;\n			}\n		}\n	}\n\n	// Check to see if we have a response for the expected dataType\n	if ( dataTypes[ 0 ] in responses ) {\n		finalDataType = dataTypes[ 0 ];\n	} else {\n		// Try convertible dataTypes\n		for ( type in responses ) {\n			if ( !dataTypes[ 0 ] || s.converters[ type + \" \" + dataTypes[0] ] ) {\n				finalDataType = type;\n				break;\n			}\n			if ( !firstDataType ) {\n				firstDataType = type;\n			}\n		}\n		// Or just use first one\n		finalDataType = finalDataType || firstDataType;\n	}\n\n	// If we found a dataType\n	// We add the dataType to the list if needed\n	// and return the corresponding response\n	if ( finalDataType ) {\n		if ( finalDataType !== dataTypes[ 0 ] ) {\n			dataTypes.unshift( finalDataType );\n		}\n		return responses[ finalDataType ];\n	}\n}\n\n/* Chain conversions given the request and the original response\n * Also sets the responseXXX fields on the jqXHR instance\n */\nfunction ajaxConvert( s, response, jqXHR, isSuccess ) {\n	var conv2, current, conv, tmp, prev,\n		converters = {},\n		// Work with a copy of dataTypes in case we need to modify it for conversion\n		dataTypes = s.dataTypes.slice();\n\n	// Create converters map with lowercased keys\n	if ( dataTypes[ 1 ] ) {\n		for ( conv in s.converters ) {\n			converters[ conv.toLowerCase() ] = s.converters[ conv ];\n		}\n	}\n\n	current = dataTypes.shift();\n\n	// Convert to each sequential dataType\n	while ( current ) {\n\n		if ( s.responseFields[ current ] ) {\n			jqXHR[ s.responseFields[ current ] ] = response;\n		}\n\n		// Apply the dataFilter if provided\n		if ( !prev && isSuccess && s.dataFilter ) {\n			response = s.dataFilter( response, s.dataType );\n		}\n\n		prev = current;\n		current = dataTypes.shift();\n\n		if ( current ) {\n\n			// There\'s only work to do if current dataType is non-auto\n			if ( current === \"*\" ) {\n\n				current = prev;\n\n			// Convert response if prev dataType is non-auto and differs from current\n			} else if ( prev !== \"*\" && prev !== current ) {\n\n				// Seek a direct converter\n				conv = converters[ prev + \" \" + current ] || converters[ \"* \" + current ];\n\n				// If none found, seek a pair\n				if ( !conv ) {\n					for ( conv2 in converters ) {\n\n						// If conv2 outputs current\n						tmp = conv2.split( \" \" );\n						if ( tmp[ 1 ] === current ) {\n\n							// If prev can be converted to accepted input\n							conv = converters[ prev + \" \" + tmp[ 0 ] ] ||\n								converters[ \"* \" + tmp[ 0 ] ];\n							if ( conv ) {\n								// Condense equivalence converters\n								if ( conv === true ) {\n									conv = converters[ conv2 ];\n\n								// Otherwise, insert the intermediate dataType\n								} else if ( converters[ conv2 ] !== true ) {\n									current = tmp[ 0 ];\n									dataTypes.unshift( tmp[ 1 ] );\n								}\n								break;\n							}\n						}\n					}\n				}\n\n				// Apply converter (if not an equivalence)\n				if ( conv !== true ) {\n\n					// Unless errors are allowed to bubble, catch and return them\n					if ( conv && s[ \"throws\" ] ) {\n						response = conv( response );\n					} else {\n						try {\n							response = conv( response );\n						} catch ( e ) {\n							return { state: \"parsererror\", error: conv ? e : \"No conversion from \" + prev + \" to \" + current };\n						}\n					}\n				}\n			}\n		}\n	}\n\n	return { state: \"success\", data: response };\n}\n\njQuery.extend({\n\n	// Counter for holding the number of active queries\n	active: 0,\n\n	// Last-Modified header cache for next request\n	lastModified: {},\n	etag: {},\n\n	ajaxSettings: {\n		url: ajaxLocation,\n		type: \"GET\",\n		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),\n		global: true,\n		processData: true,\n		async: true,\n		contentType: \"application/x-www-form-urlencoded; charset=UTF-8\",\n		/*\n		timeout: 0,\n		data: null,\n		dataType: null,\n		username: null,\n		password: null,\n		cache: null,\n		throws: false,\n		traditional: false,\n		headers: {},\n		*/\n\n		accepts: {\n			\"*\": allTypes,\n			text: \"text/plain\",\n			html: \"text/html\",\n			xml: \"application/xml, text/xml\",\n			json: \"application/json, text/javascript\"\n		},\n\n		contents: {\n			xml: /xml/,\n			html: /html/,\n			json: /json/\n		},\n\n		responseFields: {\n			xml: \"responseXML\",\n			text: \"responseText\",\n			json: \"responseJSON\"\n		},\n\n		// Data converters\n		// Keys separate source (or catchall \"*\") and destination types with a single space\n		converters: {\n\n			// Convert anything to text\n			\"* text\": String,\n\n			// Text to html (true = no transformation)\n			\"text html\": true,\n\n			// Evaluate text as a json expression\n			\"text json\": jQuery.parseJSON,\n\n			// Parse text as xml\n			\"text xml\": jQuery.parseXML\n		},\n\n		// For options that shouldn\'t be deep extended:\n		// you can add your own custom options here if\n		// and when you create one that shouldn\'t be\n		// deep extended (see ajaxExtend)\n		flatOptions: {\n			url: true,\n			context: true\n		}\n	},\n\n	// Creates a full fledged settings object into target\n	// with both ajaxSettings and settings fields.\n	// If target is omitted, writes into ajaxSettings.\n	ajaxSetup: function( target, settings ) {\n		return settings ?\n\n			// Building a settings object\n			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :\n\n			// Extending ajaxSettings\n			ajaxExtend( jQuery.ajaxSettings, target );\n	},\n\n	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),\n	ajaxTransport: addToPrefiltersOrTransports( transports ),\n\n	// Main method\n	ajax: function( url, options ) {\n\n		// If url is an object, simulate pre-1.5 signature\n		if ( typeof url === \"object\" ) {\n			options = url;\n			url = undefined;\n		}\n\n		// Force options to be an object\n		options = options || {};\n\n		var // Cross-domain detection vars\n			parts,\n			// Loop variable\n			i,\n			// URL without anti-cache param\n			cacheURL,\n			// Response headers as string\n			responseHeadersString,\n			// timeout handle\n			timeoutTimer,\n\n			// To know if global events are to be dispatched\n			fireGlobals,\n\n			transport,\n			// Response headers\n			responseHeaders,\n			// Create the final options object\n			s = jQuery.ajaxSetup( {}, options ),\n			// Callbacks context\n			callbackContext = s.context || s,\n			// Context for global events is callbackContext if it is a DOM node or jQuery collection\n			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?\n				jQuery( callbackContext ) :\n				jQuery.event,\n			// Deferreds\n			deferred = jQuery.Deferred(),\n			completeDeferred = jQuery.Callbacks(\"once memory\"),\n			// Status-dependent callbacks\n			statusCode = s.statusCode || {},\n			// Headers (they are sent all at once)\n			requestHeaders = {},\n			requestHeadersNames = {},\n			// The jqXHR state\n			state = 0,\n			// Default abort message\n			strAbort = \"canceled\",\n			// Fake xhr\n			jqXHR = {\n				readyState: 0,\n\n				// Builds headers hashtable if needed\n				getResponseHeader: function( key ) {\n					var match;\n					if ( state === 2 ) {\n						if ( !responseHeaders ) {\n							responseHeaders = {};\n							while ( (match = rheaders.exec( responseHeadersString )) ) {\n								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];\n							}\n						}\n						match = responseHeaders[ key.toLowerCase() ];\n					}\n					return match == null ? null : match;\n				},\n\n				// Raw string\n				getAllResponseHeaders: function() {\n					return state === 2 ? responseHeadersString : null;\n				},\n\n				// Caches the header\n				setRequestHeader: function( name, value ) {\n					var lname = name.toLowerCase();\n					if ( !state ) {\n						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;\n						requestHeaders[ name ] = value;\n					}\n					return this;\n				},\n\n				// Overrides response content-type header\n				overrideMimeType: function( type ) {\n					if ( !state ) {\n						s.mimeType = type;\n					}\n					return this;\n				},\n\n				// Status-dependent callbacks\n				statusCode: function( map ) {\n					var code;\n					if ( map ) {\n						if ( state < 2 ) {\n							for ( code in map ) {\n								// Lazy-add the new callback in a way that preserves old ones\n								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];\n							}\n						} else {\n							// Execute the appropriate callbacks\n							jqXHR.always( map[ jqXHR.status ] );\n						}\n					}\n					return this;\n				},\n\n				// Cancel the request\n				abort: function( statusText ) {\n					var finalText = statusText || strAbort;\n					if ( transport ) {\n						transport.abort( finalText );\n					}\n					done( 0, finalText );\n					return this;\n				}\n			};\n\n		// Attach deferreds\n		deferred.promise( jqXHR ).complete = completeDeferred.add;\n		jqXHR.success = jqXHR.done;\n		jqXHR.error = jqXHR.fail;\n\n		// Remove hash character (#7531: and string promotion)\n		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)\n		// Handle falsy url in the settings object (#10093: consistency with old signature)\n		// We also use the url parameter if available\n		s.url = ( ( url || s.url || ajaxLocation ) + \"\" ).replace( rhash, \"\" ).replace( rprotocol, ajaxLocParts[ 1 ] + \"//\" );\n\n		// Alias method option to type as per ticket #12004\n		s.type = options.method || options.type || s.method || s.type;\n\n		// Extract dataTypes list\n		s.dataTypes = jQuery.trim( s.dataType || \"*\" ).toLowerCase().match( rnotwhite ) || [ \"\" ];\n\n		// A cross-domain request is in order when we have a protocol:host:port mismatch\n		if ( s.crossDomain == null ) {\n			parts = rurl.exec( s.url.toLowerCase() );\n			s.crossDomain = !!( parts &&\n				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||\n					( parts[ 3 ] || ( parts[ 1 ] === \"http:\" ? \"80\" : \"443\" ) ) !==\n						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === \"http:\" ? \"80\" : \"443\" ) ) )\n			);\n		}\n\n		// Convert data if not already a string\n		if ( s.data && s.processData && typeof s.data !== \"string\" ) {\n			s.data = jQuery.param( s.data, s.traditional );\n		}\n\n		// Apply prefilters\n		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );\n\n		// If request was aborted inside a prefilter, stop there\n		if ( state === 2 ) {\n			return jqXHR;\n		}\n\n		// We can fire global events as of now if asked to\n		// Don\'t fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)\n		fireGlobals = jQuery.event && s.global;\n\n		// Watch for a new set of requests\n		if ( fireGlobals && jQuery.active++ === 0 ) {\n			jQuery.event.trigger(\"ajaxStart\");\n		}\n\n		// Uppercase the type\n		s.type = s.type.toUpperCase();\n\n		// Determine if request has content\n		s.hasContent = !rnoContent.test( s.type );\n\n		// Save the URL in case we\'re toying with the If-Modified-Since\n		// and/or If-None-Match header later on\n		cacheURL = s.url;\n\n		// More options handling for requests with no content\n		if ( !s.hasContent ) {\n\n			// If data is available, append data to url\n			if ( s.data ) {\n				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? \"&\" : \"?\" ) + s.data );\n				// #9682: remove data so that it\'s not used in an eventual retry\n				delete s.data;\n			}\n\n			// Add anti-cache in url if needed\n			if ( s.cache === false ) {\n				s.url = rts.test( cacheURL ) ?\n\n					// If there is already a \'_\' parameter, set its value\n					cacheURL.replace( rts, \"$1_=\" + nonce++ ) :\n\n					// Otherwise add one to the end\n					cacheURL + ( rquery.test( cacheURL ) ? \"&\" : \"?\" ) + \"_=\" + nonce++;\n			}\n		}\n\n		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.\n		if ( s.ifModified ) {\n			if ( jQuery.lastModified[ cacheURL ] ) {\n				jqXHR.setRequestHeader( \"If-Modified-Since\", jQuery.lastModified[ cacheURL ] );\n			}\n			if ( jQuery.etag[ cacheURL ] ) {\n				jqXHR.setRequestHeader( \"If-None-Match\", jQuery.etag[ cacheURL ] );\n			}\n		}\n\n		// Set the correct header, if data is being sent\n		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {\n			jqXHR.setRequestHeader( \"Content-Type\", s.contentType );\n		}\n\n		// Set the Accepts header for the server, depending on the dataType\n		jqXHR.setRequestHeader(\n			\"Accept\",\n			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?\n				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== \"*\" ? \", \" + allTypes + \"; q=0.01\" : \"\" ) :\n				s.accepts[ \"*\" ]\n		);\n\n		// Check for headers option\n		for ( i in s.headers ) {\n			jqXHR.setRequestHeader( i, s.headers[ i ] );\n		}\n\n		// Allow custom headers/mimetypes and early abort\n		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {\n			// Abort if not done already and return\n			return jqXHR.abort();\n		}\n\n		// aborting is no longer a cancellation\n		strAbort = \"abort\";\n\n		// Install callbacks on deferreds\n		for ( i in { success: 1, error: 1, complete: 1 } ) {\n			jqXHR[ i ]( s[ i ] );\n		}\n\n		// Get transport\n		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );\n\n		// If no transport, we auto-abort\n		if ( !transport ) {\n			done( -1, \"No Transport\" );\n		} else {\n			jqXHR.readyState = 1;\n\n			// Send global event\n			if ( fireGlobals ) {\n				globalEventContext.trigger( \"ajaxSend\", [ jqXHR, s ] );\n			}\n			// Timeout\n			if ( s.async && s.timeout > 0 ) {\n				timeoutTimer = setTimeout(function() {\n					jqXHR.abort(\"timeout\");\n				}, s.timeout );\n			}\n\n			try {\n				state = 1;\n				transport.send( requestHeaders, done );\n			} catch ( e ) {\n				// Propagate exception as error if not done\n				if ( state < 2 ) {\n					done( -1, e );\n				// Simply rethrow otherwise\n				} else {\n					throw e;\n				}\n			}\n		}\n\n		// Callback for when everything is done\n		function done( status, nativeStatusText, responses, headers ) {\n			var isSuccess, success, error, response, modified,\n				statusText = nativeStatusText;\n\n			// Called once\n			if ( state === 2 ) {\n				return;\n			}\n\n			// State is \"done\" now\n			state = 2;\n\n			// Clear timeout if it exists\n			if ( timeoutTimer ) {\n				clearTimeout( timeoutTimer );\n			}\n\n			// Dereference transport for early garbage collection\n			// (no matter how long the jqXHR object will be used)\n			transport = undefined;\n\n			// Cache response headers\n			responseHeadersString = headers || \"\";\n\n			// Set readyState\n			jqXHR.readyState = status > 0 ? 4 : 0;\n\n			// Determine if successful\n			isSuccess = status >= 200 && status < 300 || status === 304;\n\n			// Get response data\n			if ( responses ) {\n				response = ajaxHandleResponses( s, jqXHR, responses );\n			}\n\n			// Convert no matter what (that way responseXXX fields are always set)\n			response = ajaxConvert( s, response, jqXHR, isSuccess );\n\n			// If successful, handle type chaining\n			if ( isSuccess ) {\n\n				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.\n				if ( s.ifModified ) {\n					modified = jqXHR.getResponseHeader(\"Last-Modified\");\n					if ( modified ) {\n						jQuery.lastModified[ cacheURL ] = modified;\n					}\n					modified = jqXHR.getResponseHeader(\"etag\");\n					if ( modified ) {\n						jQuery.etag[ cacheURL ] = modified;\n					}\n				}\n\n				// if no content\n				if ( status === 204 || s.type === \"HEAD\" ) {\n					statusText = \"nocontent\";\n\n				// if not modified\n				} else if ( status === 304 ) {\n					statusText = \"notmodified\";\n\n				// If we have data, let\'s convert it\n				} else {\n					statusText = response.state;\n					success = response.data;\n					error = response.error;\n					isSuccess = !error;\n				}\n			} else {\n				// We extract error from statusText\n				// then normalize statusText and status for non-aborts\n				error = statusText;\n				if ( status || !statusText ) {\n					statusText = \"error\";\n					if ( status < 0 ) {\n						status = 0;\n					}\n				}\n			}\n\n			// Set data for the fake xhr object\n			jqXHR.status = status;\n			jqXHR.statusText = ( nativeStatusText || statusText ) + \"\";\n\n			// Success/Error\n			if ( isSuccess ) {\n				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );\n			} else {\n				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );\n			}\n\n			// Status-dependent callbacks\n			jqXHR.statusCode( statusCode );\n			statusCode = undefined;\n\n			if ( fireGlobals ) {\n				globalEventContext.trigger( isSuccess ? \"ajaxSuccess\" : \"ajaxError\",\n					[ jqXHR, s, isSuccess ? success : error ] );\n			}\n\n			// Complete\n			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );\n\n			if ( fireGlobals ) {\n				globalEventContext.trigger( \"ajaxComplete\", [ jqXHR, s ] );\n				// Handle the global AJAX counter\n				if ( !( --jQuery.active ) ) {\n					jQuery.event.trigger(\"ajaxStop\");\n				}\n			}\n		}\n\n		return jqXHR;\n	},\n\n	getJSON: function( url, data, callback ) {\n		return jQuery.get( url, data, callback, \"json\" );\n	},\n\n	getScript: function( url, callback ) {\n		return jQuery.get( url, undefined, callback, \"script\" );\n	}\n});\n\njQuery.each( [ \"get\", \"post\" ], function( i, method ) {\n	jQuery[ method ] = function( url, data, callback, type ) {\n		// shift arguments if data argument was omitted\n		if ( jQuery.isFunction( data ) ) {\n			type = type || callback;\n			callback = data;\n			data = undefined;\n		}\n\n		return jQuery.ajax({\n			url: url,\n			type: method,\n			dataType: type,\n			data: data,\n			success: callback\n		});\n	};\n});\n\n\njQuery._evalUrl = function( url ) {\n	return jQuery.ajax({\n		url: url,\n		type: \"GET\",\n		dataType: \"script\",\n		async: false,\n		global: false,\n		\"throws\": true\n	});\n};\n\n\njQuery.fn.extend({\n	wrapAll: function( html ) {\n		if ( jQuery.isFunction( html ) ) {\n			return this.each(function(i) {\n				jQuery(this).wrapAll( html.call(this, i) );\n			});\n		}\n\n		if ( this[0] ) {\n			// The elements to wrap the target around\n			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);\n\n			if ( this[0].parentNode ) {\n				wrap.insertBefore( this[0] );\n			}\n\n			wrap.map(function() {\n				var elem = this;\n\n				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {\n					elem = elem.firstChild;\n				}\n\n				return elem;\n			}).append( this );\n		}\n\n		return this;\n	},\n\n	wrapInner: function( html ) {\n		if ( jQuery.isFunction( html ) ) {\n			return this.each(function(i) {\n				jQuery(this).wrapInner( html.call(this, i) );\n			});\n		}\n\n		return this.each(function() {\n			var self = jQuery( this ),\n				contents = self.contents();\n\n			if ( contents.length ) {\n				contents.wrapAll( html );\n\n			} else {\n				self.append( html );\n			}\n		});\n	},\n\n	wrap: function( html ) {\n		var isFunction = jQuery.isFunction( html );\n\n		return this.each(function(i) {\n			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );\n		});\n	},\n\n	unwrap: function() {\n		return this.parent().each(function() {\n			if ( !jQuery.nodeName( this, \"body\" ) ) {\n				jQuery( this ).replaceWith( this.childNodes );\n			}\n		}).end();\n	}\n});\n\n\njQuery.expr.filters.hidden = function( elem ) {\n	// Support: Opera <= 12.12\n	// Opera reports offsetWidths and offsetHeights less than zero on some elements\n	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||\n		(!support.reliableHiddenOffsets() &&\n			((elem.style && elem.style.display) || jQuery.css( elem, \"display\" )) === \"none\");\n};\n\njQuery.expr.filters.visible = function( elem ) {\n	return !jQuery.expr.filters.hidden( elem );\n};\n\n\n\n\nvar r20 = /%20/g,\n	rbracket = /\\[\\]$/,\n	rCRLF = /\\r?\\n/g,\n	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,\n	rsubmittable = /^(?:input|select|textarea|keygen)/i;\n\nfunction buildParams( prefix, obj, traditional, add ) {\n	var name;\n\n	if ( jQuery.isArray( obj ) ) {\n		// Serialize array item.\n		jQuery.each( obj, function( i, v ) {\n			if ( traditional || rbracket.test( prefix ) ) {\n				// Treat each array item as a scalar.\n				add( prefix, v );\n\n			} else {\n				// Item is non-scalar (array or object), encode its numeric index.\n				buildParams( prefix + \"[\" + ( typeof v === \"object\" ? i : \"\" ) + \"]\", v, traditional, add );\n			}\n		});\n\n	} else if ( !traditional && jQuery.type( obj ) === \"object\" ) {\n		// Serialize object item.\n		for ( name in obj ) {\n			buildParams( prefix + \"[\" + name + \"]\", obj[ name ], traditional, add );\n		}\n\n	} else {\n		// Serialize scalar item.\n		add( prefix, obj );\n	}\n}\n\n// Serialize an array of form elements or a set of\n// key/values into a query string\njQuery.param = function( a, traditional ) {\n	var prefix,\n		s = [],\n		add = function( key, value ) {\n			// If value is a function, invoke it and return its value\n			value = jQuery.isFunction( value ) ? value() : ( value == null ? \"\" : value );\n			s[ s.length ] = encodeURIComponent( key ) + \"=\" + encodeURIComponent( value );\n		};\n\n	// Set traditional to true for jQuery <= 1.3.2 behavior.\n	if ( traditional === undefined ) {\n		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;\n	}\n\n	// If an array was passed in, assume that it is an array of form elements.\n	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {\n		// Serialize the form elements\n		jQuery.each( a, function() {\n			add( this.name, this.value );\n		});\n\n	} else {\n		// If traditional, encode the \"old\" way (the way 1.3.2 or older\n		// did it), otherwise encode params recursively.\n		for ( prefix in a ) {\n			buildParams( prefix, a[ prefix ], traditional, add );\n		}\n	}\n\n	// Return the resulting serialization\n	return s.join( \"&\" ).replace( r20, \"+\" );\n};\n\njQuery.fn.extend({\n	serialize: function() {\n		return jQuery.param( this.serializeArray() );\n	},\n	serializeArray: function() {\n		return this.map(function() {\n			// Can add propHook for \"elements\" to filter or add form elements\n			var elements = jQuery.prop( this, \"elements\" );\n			return elements ? jQuery.makeArray( elements ) : this;\n		})\n		.filter(function() {\n			var type = this.type;\n			// Use .is(\":disabled\") so that fieldset[disabled] works\n			return this.name && !jQuery( this ).is( \":disabled\" ) &&\n				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&\n				( this.checked || !rcheckableType.test( type ) );\n		})\n		.map(function( i, elem ) {\n			var val = jQuery( this ).val();\n\n			return val == null ?\n				null :\n				jQuery.isArray( val ) ?\n					jQuery.map( val, function( val ) {\n						return { name: elem.name, value: val.replace( rCRLF, \"\\r\\n\" ) };\n					}) :\n					{ name: elem.name, value: val.replace( rCRLF, \"\\r\\n\" ) };\n		}).get();\n	}\n});\n\n\n// Create the request object\n// (This is still attached to ajaxSettings for backward compatibility)\njQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?\n	// Support: IE6+\n	function() {\n\n		// XHR cannot access local files, always use ActiveX for that case\n		return !this.isLocal &&\n\n			// Support: IE7-8\n			// oldIE XHR does not support non-RFC2616 methods (#13240)\n			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx\n			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9\n			// Although this check for six methods instead of eight\n			// since IE also does not support \"trace\" and \"connect\"\n			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&\n\n			createStandardXHR() || createActiveXHR();\n	} :\n	// For all other browsers, use the standard XMLHttpRequest object\n	createStandardXHR;\n\nvar xhrId = 0,\n	xhrCallbacks = {},\n	xhrSupported = jQuery.ajaxSettings.xhr();\n\n// Support: IE<10\n// Open requests must be manually aborted on unload (#5280)\n// See https://support.microsoft.com/kb/2856746 for more info\nif ( window.attachEvent ) {\n	window.attachEvent( \"onunload\", function() {\n		for ( var key in xhrCallbacks ) {\n			xhrCallbacks[ key ]( undefined, true );\n		}\n	});\n}\n\n// Determine support properties\nsupport.cors = !!xhrSupported && ( \"withCredentials\" in xhrSupported );\nxhrSupported = support.ajax = !!xhrSupported;\n\n// Create transport if the browser can provide an xhr\nif ( xhrSupported ) {\n\n	jQuery.ajaxTransport(function( options ) {\n		// Cross domain only allowed if supported through XMLHttpRequest\n		if ( !options.crossDomain || support.cors ) {\n\n			var callback;\n\n			return {\n				send: function( headers, complete ) {\n					var i,\n						xhr = options.xhr(),\n						id = ++xhrId;\n\n					// Open the socket\n					xhr.open( options.type, options.url, options.async, options.username, options.password );\n\n					// Apply custom fields if provided\n					if ( options.xhrFields ) {\n						for ( i in options.xhrFields ) {\n							xhr[ i ] = options.xhrFields[ i ];\n						}\n					}\n\n					// Override mime type if needed\n					if ( options.mimeType && xhr.overrideMimeType ) {\n						xhr.overrideMimeType( options.mimeType );\n					}\n\n					// X-Requested-With header\n					// For cross-domain requests, seeing as conditions for a preflight are\n					// akin to a jigsaw puzzle, we simply never set it to be sure.\n					// (it can always be set on a per-request basis or even using ajaxSetup)\n					// For same-domain requests, won\'t change header if already provided.\n					if ( !options.crossDomain && !headers[\"X-Requested-With\"] ) {\n						headers[\"X-Requested-With\"] = \"XMLHttpRequest\";\n					}\n\n					// Set headers\n					for ( i in headers ) {\n						// Support: IE<9\n						// IE\'s ActiveXObject throws a \'Type Mismatch\' exception when setting\n						// request header to a null-value.\n						//\n						// To keep consistent with other XHR implementations, cast the value\n						// to string and ignore `undefined`.\n						if ( headers[ i ] !== undefined ) {\n							xhr.setRequestHeader( i, headers[ i ] + \"\" );\n						}\n					}\n\n					// Do send the request\n					// This may raise an exception which is actually\n					// handled in jQuery.ajax (so no try/catch here)\n					xhr.send( ( options.hasContent && options.data ) || null );\n\n					// Listener\n					callback = function( _, isAbort ) {\n						var status, statusText, responses;\n\n						// Was never called and is aborted or complete\n						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {\n							// Clean up\n							delete xhrCallbacks[ id ];\n							callback = undefined;\n							xhr.onreadystatechange = jQuery.noop;\n\n							// Abort manually if needed\n							if ( isAbort ) {\n								if ( xhr.readyState !== 4 ) {\n									xhr.abort();\n								}\n							} else {\n								responses = {};\n								status = xhr.status;\n\n								// Support: IE<10\n								// Accessing binary-data responseText throws an exception\n								// (#11426)\n								if ( typeof xhr.responseText === \"string\" ) {\n									responses.text = xhr.responseText;\n								}\n\n								// Firefox throws an exception when accessing\n								// statusText for faulty cross-domain requests\n								try {\n									statusText = xhr.statusText;\n								} catch( e ) {\n									// We normalize with Webkit giving an empty statusText\n									statusText = \"\";\n								}\n\n								// Filter status for non standard behaviors\n\n								// If the request is local and we have data: assume a success\n								// (success with no data won\'t get notified, that\'s the best we\n								// can do given current implementations)\n								if ( !status && options.isLocal && !options.crossDomain ) {\n									status = responses.text ? 200 : 404;\n								// IE - #1450: sometimes returns 1223 when it should be 204\n								} else if ( status === 1223 ) {\n									status = 204;\n								}\n							}\n						}\n\n						// Call complete if needed\n						if ( responses ) {\n							complete( status, statusText, responses, xhr.getAllResponseHeaders() );\n						}\n					};\n\n					if ( !options.async ) {\n						// if we\'re in sync mode we fire the callback\n						callback();\n					} else if ( xhr.readyState === 4 ) {\n						// (IE6 & IE7) if it\'s in cache and has been\n						// retrieved directly we need to fire the callback\n						setTimeout( callback );\n					} else {\n						// Add to the list of active xhr callbacks\n						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;\n					}\n				},\n\n				abort: function() {\n					if ( callback ) {\n						callback( undefined, true );\n					}\n				}\n			};\n		}\n	});\n}\n\n// Functions to create xhrs\nfunction createStandardXHR() {\n	try {\n		return new window.XMLHttpRequest();\n	} catch( e ) {}\n}\n\nfunction createActiveXHR() {\n	try {\n		return new window.ActiveXObject( \"Microsoft.XMLHTTP\" );\n	} catch( e ) {}\n}\n\n\n\n\n// Install script dataType\njQuery.ajaxSetup({\n	accepts: {\n		script: \"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript\"\n	},\n	contents: {\n		script: /(?:java|ecma)script/\n	},\n	converters: {\n		\"text script\": function( text ) {\n			jQuery.globalEval( text );\n			return text;\n		}\n	}\n});\n\n// Handle cache\'s special case and global\njQuery.ajaxPrefilter( \"script\", function( s ) {\n	if ( s.cache === undefined ) {\n		s.cache = false;\n	}\n	if ( s.crossDomain ) {\n		s.type = \"GET\";\n		s.global = false;\n	}\n});\n\n// Bind script tag hack transport\njQuery.ajaxTransport( \"script\", function(s) {\n\n	// This transport only deals with cross domain requests\n	if ( s.crossDomain ) {\n\n		var script,\n			head = document.head || jQuery(\"head\")[0] || document.documentElement;\n\n		return {\n\n			send: function( _, callback ) {\n\n				script = document.createElement(\"script\");\n\n				script.async = true;\n\n				if ( s.scriptCharset ) {\n					script.charset = s.scriptCharset;\n				}\n\n				script.src = s.url;\n\n				// Attach handlers for all browsers\n				script.onload = script.onreadystatechange = function( _, isAbort ) {\n\n					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {\n\n						// Handle memory leak in IE\n						script.onload = script.onreadystatechange = null;\n\n						// Remove the script\n						if ( script.parentNode ) {\n							script.parentNode.removeChild( script );\n						}\n\n						// Dereference the script\n						script = null;\n\n						// Callback if not abort\n						if ( !isAbort ) {\n							callback( 200, \"success\" );\n						}\n					}\n				};\n\n				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending\n				// Use native DOM manipulation to avoid our domManip AJAX trickery\n				head.insertBefore( script, head.firstChild );\n			},\n\n			abort: function() {\n				if ( script ) {\n					script.onload( undefined, true );\n				}\n			}\n		};\n	}\n});\n\n\n\n\nvar oldCallbacks = [],\n	rjsonp = /(=)\\?(?=&|$)|\\?\\?/;\n\n// Default jsonp settings\njQuery.ajaxSetup({\n	jsonp: \"callback\",\n	jsonpCallback: function() {\n		var callback = oldCallbacks.pop() || ( jQuery.expando + \"_\" + ( nonce++ ) );\n		this[ callback ] = true;\n		return callback;\n	}\n});\n\n// Detect, normalize options and install callbacks for jsonp requests\njQuery.ajaxPrefilter( \"json jsonp\", function( s, originalSettings, jqXHR ) {\n\n	var callbackName, overwritten, responseContainer,\n		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?\n			\"url\" :\n			typeof s.data === \"string\" && !( s.contentType || \"\" ).indexOf(\"application/x-www-form-urlencoded\") && rjsonp.test( s.data ) && \"data\"\n		);\n\n	// Handle iff the expected data type is \"jsonp\" or we have a parameter to set\n	if ( jsonProp || s.dataTypes[ 0 ] === \"jsonp\" ) {\n\n		// Get callback name, remembering preexisting value associated with it\n		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?\n			s.jsonpCallback() :\n			s.jsonpCallback;\n\n		// Insert callback into url or form data\n		if ( jsonProp ) {\n			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, \"$1\" + callbackName );\n		} else if ( s.jsonp !== false ) {\n			s.url += ( rquery.test( s.url ) ? \"&\" : \"?\" ) + s.jsonp + \"=\" + callbackName;\n		}\n\n		// Use data converter to retrieve json after script execution\n		s.converters[\"script json\"] = function() {\n			if ( !responseContainer ) {\n				jQuery.error( callbackName + \" was not called\" );\n			}\n			return responseContainer[ 0 ];\n		};\n\n		// force json dataType\n		s.dataTypes[ 0 ] = \"json\";\n\n		// Install callback\n		overwritten = window[ callbackName ];\n		window[ callbackName ] = function() {\n			responseContainer = arguments;\n		};\n\n		// Clean-up function (fires after converters)\n		jqXHR.always(function() {\n			// Restore preexisting value\n			window[ callbackName ] = overwritten;\n\n			// Save back as free\n			if ( s[ callbackName ] ) {\n				// make sure that re-using the options doesn\'t screw things around\n				s.jsonpCallback = originalSettings.jsonpCallback;\n\n				// save the callback name for future use\n				oldCallbacks.push( callbackName );\n			}\n\n			// Call if it was a function and we have a response\n			if ( responseContainer && jQuery.isFunction( overwritten ) ) {\n				overwritten( responseContainer[ 0 ] );\n			}\n\n			responseContainer = overwritten = undefined;\n		});\n\n		// Delegate to script\n		return \"script\";\n	}\n});\n\n\n\n\n// data: string of html\n// context (optional): If specified, the fragment will be created in this context, defaults to document\n// keepScripts (optional): If true, will include scripts passed in the html string\njQuery.parseHTML = function( data, context, keepScripts ) {\n	if ( !data || typeof data !== \"string\" ) {\n		return null;\n	}\n	if ( typeof context === \"boolean\" ) {\n		keepScripts = context;\n		context = false;\n	}\n	context = context || document;\n\n	var parsed = rsingleTag.exec( data ),\n		scripts = !keepScripts && [];\n\n	// Single tag\n	if ( parsed ) {\n		return [ context.createElement( parsed[1] ) ];\n	}\n\n	parsed = jQuery.buildFragment( [ data ], context, scripts );\n\n	if ( scripts && scripts.length ) {\n		jQuery( scripts ).remove();\n	}\n\n	return jQuery.merge( [], parsed.childNodes );\n};\n\n\n// Keep a copy of the old load method\nvar _load = jQuery.fn.load;\n\n/**\n * Load a url into a page\n */\njQuery.fn.load = function( url, params, callback ) {\n	if ( typeof url !== \"string\" && _load ) {\n		return _load.apply( this, arguments );\n	}\n\n	var selector, response, type,\n		self = this,\n		off = url.indexOf(\" \");\n\n	if ( off >= 0 ) {\n		selector = jQuery.trim( url.slice( off, url.length ) );\n		url = url.slice( 0, off );\n	}\n\n	// If it\'s a function\n	if ( jQuery.isFunction( params ) ) {\n\n		// We assume that it\'s the callback\n		callback = params;\n		params = undefined;\n\n	// Otherwise, build a param string\n	} else if ( params && typeof params === \"object\" ) {\n		type = \"POST\";\n	}\n\n	// If we have elements to modify, make the request\n	if ( self.length > 0 ) {\n		jQuery.ajax({\n			url: url,\n\n			// if \"type\" variable is undefined, then \"GET\" method will be used\n			type: type,\n			dataType: \"html\",\n			data: params\n		}).done(function( responseText ) {\n\n			// Save response for use in complete callback\n			response = arguments;\n\n			self.html( selector ?\n\n				// If a selector was specified, locate the right elements in a dummy div\n				// Exclude scripts to avoid IE \'Permission Denied\' errors\n				jQuery(\"<div>\").append( jQuery.parseHTML( responseText ) ).find( selector ) :\n\n				// Otherwise use the full result\n				responseText );\n\n		}).complete( callback && function( jqXHR, status ) {\n			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );\n		});\n	}\n\n	return this;\n};\n\n\n\n\n// Attach a bunch of functions for handling common AJAX events\njQuery.each( [ \"ajaxStart\", \"ajaxStop\", \"ajaxComplete\", \"ajaxError\", \"ajaxSuccess\", \"ajaxSend\" ], function( i, type ) {\n	jQuery.fn[ type ] = function( fn ) {\n		return this.on( type, fn );\n	};\n});\n\n\n\n\njQuery.expr.filters.animated = function( elem ) {\n	return jQuery.grep(jQuery.timers, function( fn ) {\n		return elem === fn.elem;\n	}).length;\n};\n\n\n\n\n\nvar docElem = window.document.documentElement;\n\n/**\n * Gets a window from an element\n */\nfunction getWindow( elem ) {\n	return jQuery.isWindow( elem ) ?\n		elem :\n		elem.nodeType === 9 ?\n			elem.defaultView || elem.parentWindow :\n			false;\n}\n\njQuery.offset = {\n	setOffset: function( elem, options, i ) {\n		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,\n			position = jQuery.css( elem, \"position\" ),\n			curElem = jQuery( elem ),\n			props = {};\n\n		// set position first, in-case top/left are set even on static elem\n		if ( position === \"static\" ) {\n			elem.style.position = \"relative\";\n		}\n\n		curOffset = curElem.offset();\n		curCSSTop = jQuery.css( elem, \"top\" );\n		curCSSLeft = jQuery.css( elem, \"left\" );\n		calculatePosition = ( position === \"absolute\" || position === \"fixed\" ) &&\n			jQuery.inArray(\"auto\", [ curCSSTop, curCSSLeft ] ) > -1;\n\n		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed\n		if ( calculatePosition ) {\n			curPosition = curElem.position();\n			curTop = curPosition.top;\n			curLeft = curPosition.left;\n		} else {\n			curTop = parseFloat( curCSSTop ) || 0;\n			curLeft = parseFloat( curCSSLeft ) || 0;\n		}\n\n		if ( jQuery.isFunction( options ) ) {\n			options = options.call( elem, i, curOffset );\n		}\n\n		if ( options.top != null ) {\n			props.top = ( options.top - curOffset.top ) + curTop;\n		}\n		if ( options.left != null ) {\n			props.left = ( options.left - curOffset.left ) + curLeft;\n		}\n\n		if ( \"using\" in options ) {\n			options.using.call( elem, props );\n		} else {\n			curElem.css( props );\n		}\n	}\n};\n\njQuery.fn.extend({\n	offset: function( options ) {\n		if ( arguments.length ) {\n			return options === undefined ?\n				this :\n				this.each(function( i ) {\n					jQuery.offset.setOffset( this, options, i );\n				});\n		}\n\n		var docElem, win,\n			box = { top: 0, left: 0 },\n			elem = this[ 0 ],\n			doc = elem && elem.ownerDocument;\n\n		if ( !doc ) {\n			return;\n		}\n\n		docElem = doc.documentElement;\n\n		// Make sure it\'s not a disconnected DOM node\n		if ( !jQuery.contains( docElem, elem ) ) {\n			return box;\n		}\n\n		// If we don\'t have gBCR, just use 0,0 rather than error\n		// BlackBerry 5, iOS 3 (original iPhone)\n		if ( typeof elem.getBoundingClientRect !== strundefined ) {\n			box = elem.getBoundingClientRect();\n		}\n		win = getWindow( doc );\n		return {\n			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),\n			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )\n		};\n	},\n\n	position: function() {\n		if ( !this[ 0 ] ) {\n			return;\n		}\n\n		var offsetParent, offset,\n			parentOffset = { top: 0, left: 0 },\n			elem = this[ 0 ];\n\n		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent\n		if ( jQuery.css( elem, \"position\" ) === \"fixed\" ) {\n			// we assume that getBoundingClientRect is available when computed position is fixed\n			offset = elem.getBoundingClientRect();\n		} else {\n			// Get *real* offsetParent\n			offsetParent = this.offsetParent();\n\n			// Get correct offsets\n			offset = this.offset();\n			if ( !jQuery.nodeName( offsetParent[ 0 ], \"html\" ) ) {\n				parentOffset = offsetParent.offset();\n			}\n\n			// Add offsetParent borders\n			parentOffset.top  += jQuery.css( offsetParent[ 0 ], \"borderTopWidth\", true );\n			parentOffset.left += jQuery.css( offsetParent[ 0 ], \"borderLeftWidth\", true );\n		}\n\n		// Subtract parent offsets and element margins\n		// note: when an element has margin: auto the offsetLeft and marginLeft\n		// are the same in Safari causing offset.left to incorrectly be 0\n		return {\n			top:  offset.top  - parentOffset.top - jQuery.css( elem, \"marginTop\", true ),\n			left: offset.left - parentOffset.left - jQuery.css( elem, \"marginLeft\", true)\n		};\n	},\n\n	offsetParent: function() {\n		return this.map(function() {\n			var offsetParent = this.offsetParent || docElem;\n\n			while ( offsetParent && ( !jQuery.nodeName( offsetParent, \"html\" ) && jQuery.css( offsetParent, \"position\" ) === \"static\" ) ) {\n				offsetParent = offsetParent.offsetParent;\n			}\n			return offsetParent || docElem;\n		});\n	}\n});\n\n// Create scrollLeft and scrollTop methods\njQuery.each( { scrollLeft: \"pageXOffset\", scrollTop: \"pageYOffset\" }, function( method, prop ) {\n	var top = /Y/.test( prop );\n\n	jQuery.fn[ method ] = function( val ) {\n		return access( this, function( elem, method, val ) {\n			var win = getWindow( elem );\n\n			if ( val === undefined ) {\n				return win ? (prop in win) ? win[ prop ] :\n					win.document.documentElement[ method ] :\n					elem[ method ];\n			}\n\n			if ( win ) {\n				win.scrollTo(\n					!top ? val : jQuery( win ).scrollLeft(),\n					top ? val : jQuery( win ).scrollTop()\n				);\n\n			} else {\n				elem[ method ] = val;\n			}\n		}, method, val, arguments.length, null );\n	};\n});\n\n// Add the top/left cssHooks using jQuery.fn.position\n// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084\n// getComputedStyle returns percent when specified for top/left/bottom/right\n// rather than make the css module depend on the offset module, we just check for it here\njQuery.each( [ \"top\", \"left\" ], function( i, prop ) {\n	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,\n		function( elem, computed ) {\n			if ( computed ) {\n				computed = curCSS( elem, prop );\n				// if curCSS returns percentage, fallback to offset\n				return rnumnonpx.test( computed ) ?\n					jQuery( elem ).position()[ prop ] + \"px\" :\n					computed;\n			}\n		}\n	);\n});\n\n\n// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods\njQuery.each( { Height: \"height\", Width: \"width\" }, function( name, type ) {\n	jQuery.each( { padding: \"inner\" + name, content: type, \"\": \"outer\" + name }, function( defaultExtra, funcName ) {\n		// margin is only for outerHeight, outerWidth\n		jQuery.fn[ funcName ] = function( margin, value ) {\n			var chainable = arguments.length && ( defaultExtra || typeof margin !== \"boolean\" ),\n				extra = defaultExtra || ( margin === true || value === true ? \"margin\" : \"border\" );\n\n			return access( this, function( elem, type, value ) {\n				var doc;\n\n				if ( jQuery.isWindow( elem ) ) {\n					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there\n					// isn\'t a whole lot we can do. See pull request at this URL for discussion:\n					// https://github.com/jquery/jquery/pull/764\n					return elem.document.documentElement[ \"client\" + name ];\n				}\n\n				// Get document width or height\n				if ( elem.nodeType === 9 ) {\n					doc = elem.documentElement;\n\n					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest\n					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.\n					return Math.max(\n						elem.body[ \"scroll\" + name ], doc[ \"scroll\" + name ],\n						elem.body[ \"offset\" + name ], doc[ \"offset\" + name ],\n						doc[ \"client\" + name ]\n					);\n				}\n\n				return value === undefined ?\n					// Get width or height on the element, requesting but not forcing parseFloat\n					jQuery.css( elem, type, extra ) :\n\n					// Set width or height on the element\n					jQuery.style( elem, type, value, extra );\n			}, type, chainable ? margin : undefined, chainable, null );\n		};\n	});\n});\n\n\n// The number of elements contained in the matched element set\njQuery.fn.size = function() {\n	return this.length;\n};\n\njQuery.fn.andSelf = jQuery.fn.addBack;\n\n\n\n\n// Register as a named AMD module, since jQuery can be concatenated with other\n// files that may use define, but not via a proper concatenation script that\n// understands anonymous AMD modules. A named AMD is safest and most robust\n// way to register. Lowercase jquery is used because AMD module names are\n// derived from file names, and jQuery is normally delivered in a lowercase\n// file name. Do this after creating the global so that if an AMD module wants\n// to call noConflict to hide this version of jQuery, it will work.\n\n// Note that for maximum portability, libraries that are not jQuery should\n// declare themselves as anonymous modules, and avoid setting a global if an\n// AMD loader is present. jQuery is a special case. For more information, see\n// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon\n\nif ( typeof define === \"function\" && define.amd ) {\n	define( \"jquery\", [], function() {\n		return jQuery;\n	});\n}\n\n\n\n\nvar\n	// Map over jQuery in case of overwrite\n	_jQuery = window.jQuery,\n\n	// Map over the $ in case of overwrite\n	_$ = window.$;\n\njQuery.noConflict = function( deep ) {\n	if ( window.$ === jQuery ) {\n		window.$ = _$;\n	}\n\n	if ( deep && window.jQuery === jQuery ) {\n		window.jQuery = _jQuery;\n	}\n\n	return jQuery;\n};\n\n// Expose jQuery and $ identifiers, even in\n// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)\n// and CommonJS for browser emulators (#13566)\nif ( typeof noGlobal === strundefined ) {\n	window.jQuery = window.$ = jQuery;\n}\n\n\n\n\nreturn jQuery;\n\n}));\n',{"address":"jquery","metadata":{"exports":"jQuery","deps":[],"format":"global"}});
/*can/util/can*/
define('can/util/can', [], function () {
    var glbl = typeof window !== 'undefined' ? window : global;
    var can = {};
    if (typeof GLOBALCAN === 'undefined' || GLOBALCAN !== false) {
        glbl.can = can;
    }
    can.global = glbl;
    can.k = function () {
    };
    can.isDeferred = function (obj) {
        return obj && typeof obj.then === 'function' && typeof obj.pipe === 'function';
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
    can.frag = function (item) {
        var frag;
        if (!item || typeof item === 'string') {
            frag = can.buildFragment(item == null ? '' : '' + item, document.body);
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
            return frag;
        } else {
            frag = can.buildFragment('' + item, document.body);
            if (!frag.childNodes.length) {
                frag.appendChild(document.createTextNode(''));
            }
            return frag;
        }
    };
    can.scope = function (el, attr) {
        el = can.$(el);
        var scope = can.data(el, 'scope');
        if (!scope) {
            scope = can.Map ? new can.Map() : {};
            can.data(el, 'scope', scope);
        }
        if (attr) {
            return scope.attr(attr);
        } else {
            return scope;
        }
    };
    can['import'] = function (moduleName) {
        var deferred = new can.Deferred();
        if (typeof window.System === 'object') {
            window.System['import'](moduleName).then(can.proxy(deferred.resolve, deferred), can.proxy(deferred.reject, deferred));
        } else if (window.require && window.require.amd) {
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
    can.__reading = function () {
    };
    return can;
});
/*can/util/attr/attr*/
define('can/util/attr/attr', ['can/util/can'], function (can) {
    var setImmediate = can.global.setImmediate || function (cb) {
            return setTimeout(cb, 0);
        }, attr = {
            MutationObserver: can.global.MutationObserver || can.global.WebKitMutationObserver || can.global.MozMutationObserver,
            map: {
                'class': 'className',
                'value': 'value',
                'innerText': 'innerText',
                'textContent': 'textContent',
                'checked': true,
                'disabled': true,
                'readonly': true,
                'required': true,
                src: function (el, val) {
                    if (val == null || val === '') {
                        el.removeAttribute('src');
                        return null;
                    } else {
                        el.setAttribute('src', val);
                        return val;
                    }
                },
                style: function (el, val) {
                    return el.style.cssText = val || '';
                }
            },
            defaultValue: [
                'input',
                'textarea'
            ],
            set: function (el, attrName, val) {
                var oldValue;
                if (!attr.MutationObserver) {
                    oldValue = attr.get(el, attrName);
                }
                var tagName = el.nodeName.toString().toLowerCase(), prop = attr.map[attrName], newValue;
                if (typeof prop === 'function') {
                    newValue = prop(el, val);
                } else if (prop === true) {
                    newValue = el[attrName] = true;
                    if (attrName === 'checked' && el.type === 'radio') {
                        if (can.inArray(tagName, attr.defaultValue) >= 0) {
                            el.defaultChecked = true;
                        }
                    }
                } else if (prop) {
                    newValue = el[prop] = val;
                    if (prop === 'value' && can.inArray(tagName, attr.defaultValue) >= 0) {
                        el.defaultValue = val;
                    }
                } else {
                    el.setAttribute(attrName, val);
                    newValue = val;
                }
                if (!attr.MutationObserver && newValue !== oldValue) {
                    attr.trigger(el, attrName, oldValue);
                }
            },
            trigger: function (el, attrName, oldValue) {
                if (can.data(can.$(el), 'canHasAttributesBindings')) {
                    return setImmediate(function () {
                        can.trigger(el, {
                            type: 'attributes',
                            attributeName: attrName,
                            target: el,
                            oldValue: oldValue,
                            bubbles: false
                        }, []);
                    });
                }
            },
            get: function (el, attrName) {
                var prop = attr.map[attrName];
                if (typeof prop === 'string' && el[prop]) {
                    return el[prop];
                }
                return el.getAttribute(attrName);
            },
            remove: function (el, attrName) {
                var oldValue;
                if (!attr.MutationObserver) {
                    oldValue = attr.get(el, attrName);
                }
                var setter = attr.map[attrName];
                if (typeof setter === 'function') {
                    setter(el, undefined);
                }
                if (setter === true) {
                    el[attrName] = false;
                } else if (typeof setter === 'string') {
                    el[setter] = '';
                } else {
                    el.removeAttribute(attrName);
                }
                if (!attr.MutationObserver && oldValue != null) {
                    attr.trigger(el, attrName, oldValue);
                }
            },
            has: function () {
                var el = can.global.document && document.createElement('div');
                if (el && el.hasAttribute) {
                    return function (el, name) {
                        return el.hasAttribute(name);
                    };
                } else {
                    return function (el, name) {
                        return el.getAttribute(name) !== null;
                    };
                }
            }()
        };
    return attr;
});
/*can/event/event*/
define('can/event/event', ['can/util/can'], function (can) {
    can.addEvent = function (event, handler) {
        var allEvents = this.__bindEvents || (this.__bindEvents = {}), eventList = allEvents[event] || (allEvents[event] = []);
        eventList.push({
            handler: handler,
            name: event
        });
        return this;
    };
    can.listenTo = function (other, event, handler) {
        var idedEvents = this.__listenToEvents;
        if (!idedEvents) {
            idedEvents = this.__listenToEvents = {};
        }
        var otherId = can.cid(other);
        var othersEvents = idedEvents[otherId];
        if (!othersEvents) {
            othersEvents = idedEvents[otherId] = {
                obj: other,
                events: {}
            };
        }
        var eventsEvents = othersEvents.events[event];
        if (!eventsEvents) {
            eventsEvents = othersEvents.events[event] = [];
        }
        eventsEvents.push(handler);
        can.bind.call(other, event, handler);
    };
    can.stopListening = function (other, event, handler) {
        var idedEvents = this.__listenToEvents, iterIdedEvents = idedEvents, i = 0;
        if (!idedEvents) {
            return this;
        }
        if (other) {
            var othercid = can.cid(other);
            (iterIdedEvents = {})[othercid] = idedEvents[othercid];
            if (!idedEvents[othercid]) {
                return this;
            }
        }
        for (var cid in iterIdedEvents) {
            var othersEvents = iterIdedEvents[cid], eventsEvents;
            other = idedEvents[cid].obj;
            if (!event) {
                eventsEvents = othersEvents.events;
            } else {
                (eventsEvents = {})[event] = othersEvents.events[event];
            }
            for (var eventName in eventsEvents) {
                var handlers = eventsEvents[eventName] || [];
                i = 0;
                while (i < handlers.length) {
                    if (handler && handler === handlers[i] || !handler) {
                        can.unbind.call(other, eventName, handlers[i]);
                        handlers.splice(i, 1);
                    } else {
                        i++;
                    }
                }
                if (!handlers.length) {
                    delete othersEvents.events[eventName];
                }
            }
            if (can.isEmptyObject(othersEvents.events)) {
                delete idedEvents[cid];
            }
        }
        return this;
    };
    can.removeEvent = function (event, fn, __validate) {
        if (!this.__bindEvents) {
            return this;
        }
        var events = this.__bindEvents[event] || [], i = 0, ev, isFunction = typeof fn === 'function';
        while (i < events.length) {
            ev = events[i];
            if (__validate ? __validate(ev, event, fn) : isFunction && ev.handler === fn || !isFunction && (ev.cid === fn || !fn)) {
                events.splice(i, 1);
            } else {
                i++;
            }
        }
        return this;
    };
    can.dispatch = function (event, args) {
        var events = this.__bindEvents;
        if (!events) {
            return;
        }
        if (typeof event === 'string') {
            event = { type: event };
        }
        var eventName = event.type, handlers = (events[eventName] || []).slice(0), passed = [event];
        if (args) {
            passed.push.apply(passed, args);
        }
        for (var i = 0, len = handlers.length; i < len; i++) {
            handlers[i].handler.apply(this, passed);
        }
        return event;
    };
    can.one = function (event, handler) {
        var one = function () {
            can.unbind.call(this, event, one);
            return handler.apply(this, arguments);
        };
        can.bind.call(this, event, one);
        return this;
    };
    can.event = {
        on: function () {
            if (arguments.length === 0 && can.Control && this instanceof can.Control) {
                return can.Control.prototype.on.call(this);
            } else {
                return can.addEvent.apply(this, arguments);
            }
        },
        off: function () {
            if (arguments.length === 0 && can.Control && this instanceof can.Control) {
                return can.Control.prototype.off.call(this);
            } else {
                return can.removeEvent.apply(this, arguments);
            }
        },
        bind: can.addEvent,
        unbind: can.removeEvent,
        delegate: function (selector, event, handler) {
            return can.addEvent.call(this, event, handler);
        },
        undelegate: function (selector, event, handler) {
            return can.removeEvent.call(this, event, handler);
        },
        trigger: can.dispatch,
        one: can.one,
        addEvent: can.addEvent,
        removeEvent: can.removeEvent,
        listenTo: can.listenTo,
        stopListening: can.stopListening,
        dispatch: can.dispatch
    };
    return can.event;
});
/*can/util/array/each*/
define('can/util/array/each', ['can/util/can'], function (can) {
    var isArrayLike = function (obj) {
        var length = obj.length;
        return typeof arr !== 'function' && (length === 0 || typeof length === 'number' && length > 0 && length - 1 in obj);
    };
    can.each = function (elements, callback, context) {
        var i = 0, key, len, item;
        if (elements) {
            if (isArrayLike(elements)) {
                if (can.List && elements instanceof can.List) {
                    for (len = elements.attr('length'); i < len; i++) {
                        item = elements.attr(i);
                        if (callback.call(context || item, item, i, elements) === false) {
                            break;
                        }
                    }
                } else {
                    for (len = elements.length; i < len; i++) {
                        item = elements[i];
                        if (callback.call(context || item, item, i, elements) === false) {
                            break;
                        }
                    }
                }
            } else if (typeof elements === 'object') {
                if (can.Map && elements instanceof can.Map || elements === can.route) {
                    var keys = can.Map.keys(elements);
                    for (i = 0, len = keys.length; i < len; i++) {
                        key = keys[i];
                        item = elements.attr(key);
                        if (callback.call(context || item, item, key, elements) === false) {
                            break;
                        }
                    }
                } else {
                    for (key in elements) {
                        if (elements.hasOwnProperty(key) && callback.call(context || elements[key], elements[key], key, elements) === false) {
                            break;
                        }
                    }
                }
            }
        }
        return elements;
    };
    return can;
});
/*can/util/inserted/inserted*/
define('can/util/inserted/inserted', ['can/util/can'], function (can) {
    can.inserted = function (elems) {
        elems = can.makeArray(elems);
        var inDocument = false, doc = can.$(document.contains ? document : document.body), children;
        for (var i = 0, elem; (elem = elems[i]) !== undefined; i++) {
            if (!inDocument) {
                if (elem.getElementsByTagName) {
                    if (can.has(doc, elem).length) {
                        inDocument = true;
                    } else {
                        return;
                    }
                } else {
                    continue;
                }
            }
            if (inDocument && elem.getElementsByTagName) {
                children = can.makeArray(elem.getElementsByTagName('*'));
                can.trigger(elem, 'inserted', [], false);
                for (var j = 0, child; (child = children[j]) !== undefined; j++) {
                    can.trigger(child, 'inserted', [], false);
                }
            }
        }
    };
    can.appendChild = function (el, child) {
        var children;
        if (child.nodeType === 11) {
            children = can.makeArray(child.childNodes);
        } else {
            children = [child];
        }
        el.appendChild(child);
        can.inserted(children);
    };
    can.insertBefore = function (el, child, ref) {
        var children;
        if (child.nodeType === 11) {
            children = can.makeArray(child.childNodes);
        } else {
            children = [child];
        }
        el.insertBefore(child, ref);
        can.inserted(children);
    };
});
/*can/util/jquery/jquery*/
define('can/util/jquery/jquery', [
    'jquery/jquery',
    'can/util/can',
    'can/util/attr/attr',
    'can/event/event',
    'can/util/array/each',
    'can/util/inserted/inserted'
], function ($, can, attr, event) {
    var isBindableElement = function (node) {
        return node.nodeName && (node.nodeType === 1 || node.nodeType === 9) || node == window;
    };
    $ = $ || window.$;
    $.extend(can, $, {
        trigger: function (obj, event, args, bubbles) {
            if (isBindableElement(obj)) {
                $.event.trigger(event, args, obj, !bubbles);
            } else if (obj.trigger) {
                obj.trigger(event, args);
            } else {
                if (typeof event === 'string') {
                    event = { type: event };
                }
                event.target = event.target || obj;
                if (args) {
                    if (args.length && typeof args === 'string') {
                        args = [args];
                    } else if (!args.length) {
                        args = [args];
                    }
                }
                if (!args) {
                    args = [];
                }
                can.dispatch.call(obj, event, args);
            }
        },
        event: can.event,
        addEvent: can.addEvent,
        removeEvent: can.removeEvent,
        buildFragment: function (elems, context) {
            var ret;
            elems = [elems];
            context = context || document;
            context = !context.nodeType && context[0] || context;
            context = context.ownerDocument || context;
            ret = $.buildFragment(elems, context);
            return ret.cacheable ? $.clone(ret.fragment) : ret.fragment || ret;
        },
        $: $,
        each: can.each,
        bind: function (ev, cb) {
            if (this.bind && this.bind !== can.bind) {
                this.bind(ev, cb);
            } else if (isBindableElement(this)) {
                $.event.add(this, ev, cb);
            } else {
                can.addEvent.call(this, ev, cb);
            }
            return this;
        },
        unbind: function (ev, cb) {
            if (this.unbind && this.unbind !== can.unbind) {
                this.unbind(ev, cb);
            } else if (isBindableElement(this)) {
                $.event.remove(this, ev, cb);
            } else {
                can.removeEvent.call(this, ev, cb);
            }
            return this;
        },
        delegate: function (selector, ev, cb) {
            if (this.delegate) {
                this.delegate(selector, ev, cb);
            } else if (isBindableElement(this)) {
                $(this).delegate(selector, ev, cb);
            } else {
                can.bind.call(this, ev, cb);
            }
            return this;
        },
        undelegate: function (selector, ev, cb) {
            if (this.undelegate) {
                this.undelegate(selector, ev, cb);
            } else if (isBindableElement(this)) {
                $(this).undelegate(selector, ev, cb);
            } else {
                can.unbind.call(this, ev, cb);
            }
            return this;
        },
        proxy: function (fn, context) {
            return function () {
                return fn.apply(context, arguments);
            };
        },
        attr: attr
    });
    can.on = can.bind;
    can.off = can.unbind;
    $.each([
        'append',
        'filter',
        'addClass',
        'remove',
        'data',
        'get',
        'has'
    ], function (i, name) {
        can[name] = function (wrapped) {
            return wrapped[name].apply(wrapped, can.makeArray(arguments).slice(1));
        };
    });
    var oldClean = $.cleanData;
    $.cleanData = function (elems) {
        $.each(elems, function (i, elem) {
            if (elem) {
                can.trigger(elem, 'removed', [], false);
            }
        });
        oldClean(elems);
    };
    var oldDomManip = $.fn.domManip, cbIndex;
    $.fn.domManip = function (args, cb1, cb2) {
        for (var i = 1; i < arguments.length; i++) {
            if (typeof arguments[i] === 'function') {
                cbIndex = i;
                break;
            }
        }
        return oldDomManip.apply(this, arguments);
    };
    $(document.createElement('div')).append(document.createElement('div'));
    $.fn.domManip = cbIndex === 2 ? function (args, table, callback) {
        return oldDomManip.call(this, args, table, function (elem) {
            var elems;
            if (elem.nodeType === 11) {
                elems = can.makeArray(elem.childNodes);
            }
            var ret = callback.apply(this, arguments);
            can.inserted(elems ? elems : [elem]);
            return ret;
        });
    } : function (args, callback) {
        return oldDomManip.call(this, args, function (elem) {
            var elems;
            if (elem.nodeType === 11) {
                elems = can.makeArray(elem.childNodes);
            }
            var ret = callback.apply(this, arguments);
            can.inserted(elems ? elems : [elem]);
            return ret;
        });
    };
    if (!can.attr.MutationObserver) {
        var oldAttr = $.attr;
        $.attr = function (el, attrName) {
            var oldValue, newValue;
            if (arguments.length >= 3) {
                oldValue = oldAttr.call(this, el, attrName);
            }
            var res = oldAttr.apply(this, arguments);
            if (arguments.length >= 3) {
                newValue = oldAttr.call(this, el, attrName);
            }
            if (newValue !== oldValue) {
                can.attr.trigger(el, attrName, oldValue);
            }
            return res;
        };
        var oldRemove = $.removeAttr;
        $.removeAttr = function (el, attrName) {
            var oldValue = oldAttr.call(this, el, attrName), res = oldRemove.apply(this, arguments);
            if (oldValue != null) {
                can.attr.trigger(el, attrName, oldValue);
            }
            return res;
        };
        $.event.special.attributes = {
            setup: function () {
                can.data(can.$(this), 'canHasAttributesBindings', true);
            },
            teardown: function () {
                $.removeData(this, 'canHasAttributesBindings');
            }
        };
    } else {
        $.event.special.attributes = {
            setup: function () {
                var self = this;
                var observer = new can.attr.MutationObserver(function (mutations) {
                        mutations.forEach(function (mutation) {
                            var copy = can.simpleExtend({}, mutation);
                            can.trigger(self, copy, []);
                        });
                    });
                observer.observe(this, {
                    attributes: true,
                    attributeOldValue: true
                });
                can.data(can.$(this), 'canAttributesObserver', observer);
            },
            teardown: function () {
                can.data(can.$(this), 'canAttributesObserver').disconnect();
                $.removeData(this, 'canAttributesObserver');
            }
        };
    }
    (function () {
        var text = '<-\n>', frag = can.buildFragment(text, document);
        if (text !== frag.childNodes[0].nodeValue) {
            var oldBuildFragment = can.buildFragment;
            can.buildFragment = function (content, context) {
                var res = oldBuildFragment(content, context);
                if (res.childNodes.length === 1 && res.childNodes[0].nodeType === 3) {
                    res.childNodes[0].nodeValue = content;
                }
                return res;
            };
        }
    }());
    $.event.special.inserted = {};
    $.event.special.removed = {};
    return can;
});
/*can/util/string/string*/
define('can/util/string/string', ['can/util/util'], function (can) {
    var strUndHash = /_|-/, strColons = /\=\=/, strWords = /([A-Z]+)([A-Z][a-z])/g, strLowUp = /([a-z\d])([A-Z])/g, strDash = /([a-z\d])([A-Z])/g, strReplacer = /\{([^\}]+)\}/g, strQuote = /"/g, strSingleQuote = /'/g, strHyphenMatch = /-+(.)?/g, strCamelMatch = /[a-z][A-Z]/g, getNext = function (obj, prop, add) {
            var result = obj[prop];
            if (result === undefined && add === true) {
                result = obj[prop] = {};
            }
            return result;
        }, isContainer = function (current) {
            return /^f|^o/.test(typeof current);
        }, convertBadValues = function (content) {
            var isInvalid = content === null || content === undefined || isNaN(content) && '' + content === 'NaN';
            return '' + (isInvalid ? '' : content);
        };
    can.extend(can, {
        esc: function (content) {
            return convertBadValues(content).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(strQuote, '&#34;').replace(strSingleQuote, '&#39;');
        },
        getObject: function (name, roots, add) {
            var parts = name ? name.split('.') : [], length = parts.length, current, r = 0, i, container, rootsLength;
            roots = can.isArray(roots) ? roots : [roots || window];
            rootsLength = roots.length;
            if (!length) {
                return roots[0];
            }
            for (r; r < rootsLength; r++) {
                current = roots[r];
                container = undefined;
                for (i = 0; i < length && isContainer(current); i++) {
                    container = current;
                    current = getNext(container, parts[i]);
                }
                if (container !== undefined && current !== undefined) {
                    break;
                }
            }
            if (add === false && current !== undefined) {
                delete container[parts[i - 1]];
            }
            if (add === true && current === undefined) {
                current = roots[0];
                for (i = 0; i < length && isContainer(current); i++) {
                    current = getNext(current, parts[i], true);
                }
            }
            return current;
        },
        capitalize: function (s, cache) {
            return s.charAt(0).toUpperCase() + s.slice(1);
        },
        camelize: function (str) {
            return convertBadValues(str).replace(strHyphenMatch, function (match, chr) {
                return chr ? chr.toUpperCase() : '';
            });
        },
        hyphenate: function (str) {
            return convertBadValues(str).replace(strCamelMatch, function (str, offset) {
                return str.charAt(0) + '-' + str.charAt(1).toLowerCase();
            });
        },
        underscore: function (s) {
            return s.replace(strColons, '/').replace(strWords, '$1_$2').replace(strLowUp, '$1_$2').replace(strDash, '_').toLowerCase();
        },
        sub: function (str, data, remove) {
            var obs = [];
            str = str || '';
            obs.push(str.replace(strReplacer, function (whole, inside) {
                var ob = can.getObject(inside, data, remove === true ? false : undefined);
                if (ob === undefined || ob === null) {
                    obs = null;
                    return '';
                }
                if (isContainer(ob) && obs) {
                    obs.push(ob);
                    return '';
                }
                return '' + ob;
            }));
            return obs === null ? obs : obs.length <= 1 ? obs[0] : obs;
        },
        replacer: strReplacer,
        undHash: strUndHash
    });
    return can;
});
/*can/construct/construct*/
define('can/construct/construct', ['can/util/string/string'], function (can) {
    var initializing = 0;
    var getDescriptor = function (newProps, name) {
            var descriptor = Object.getOwnPropertyDescriptor(newProps, name);
            if (descriptor && (descriptor.get || descriptor.set)) {
                return descriptor;
            }
            return null;
        }, inheritGetterSetter = function (newProps, oldProps, addTo) {
            addTo = addTo || newProps;
            var descriptor;
            for (var name in newProps) {
                if (descriptor = getDescriptor(newProps, name)) {
                    this._defineProperty(addTo, oldProps, name, descriptor);
                } else {
                    can.Construct._overwrite(addTo, oldProps, name, newProps[name]);
                }
            }
        }, simpleInherit = function (newProps, oldProps, addTo) {
            addTo = addTo || newProps;
            for (var name in newProps) {
                can.Construct._overwrite(addTo, oldProps, name, newProps[name]);
            }
        };
    can.Construct = function () {
        if (arguments.length) {
            return can.Construct.extend.apply(can.Construct, arguments);
        }
    };
    can.extend(can.Construct, {
        constructorExtends: true,
        newInstance: function () {
            var inst = this.instance(), args;
            if (inst.setup) {
                args = inst.setup.apply(inst, arguments);
            }
            if (inst.init) {
                inst.init.apply(inst, args || arguments);
            }
            return inst;
        },
        _inherit: Object.getOwnPropertyDescriptor ? inheritGetterSetter : simpleInherit,
        _defineProperty: function (what, oldProps, propName, descriptor) {
            Object.defineProperty(what, propName, descriptor);
        },
        _overwrite: function (what, oldProps, propName, val) {
            what[propName] = val;
        },
        setup: function (base, fullName) {
            this.defaults = can.extend(true, {}, base.defaults, this.defaults);
        },
        instance: function () {
            initializing = 1;
            var inst = new this();
            initializing = 0;
            return inst;
        },
        extend: function (name, staticProperties, instanceProperties) {
            var fullName = name, klass = staticProperties, proto = instanceProperties;
            if (typeof fullName !== 'string') {
                proto = klass;
                klass = fullName;
                fullName = null;
            }
            if (!proto) {
                proto = klass;
                klass = null;
            }
            proto = proto || {};
            var _super_class = this, _super = this.prototype, parts, current, _fullName, _shortName, propName, shortName, namespace, prototype;
            prototype = this.instance();
            can.Construct._inherit(proto, _super, prototype);
            function Constructor() {
                if (!initializing) {
                    return this.constructor !== Constructor && arguments.length && Constructor.constructorExtends ? Constructor.extend.apply(Constructor, arguments) : Constructor.newInstance.apply(Constructor, arguments);
                }
            }
            for (propName in _super_class) {
                if (_super_class.hasOwnProperty(propName)) {
                    Constructor[propName] = _super_class[propName];
                }
            }
            can.Construct._inherit(klass, _super_class, Constructor);
            if (fullName) {
                parts = fullName.split('.');
                shortName = parts.pop();
                current = can.getObject(parts.join('.'), window, true);
                namespace = current;
                _fullName = can.underscore(fullName.replace(/\./g, '_'));
                _shortName = can.underscore(shortName);
                current[shortName] = Constructor;
            }
            can.extend(Constructor, {
                constructor: Constructor,
                prototype: prototype,
                namespace: namespace,
                _shortName: _shortName,
                fullName: fullName,
                _fullName: _fullName
            });
            if (shortName !== undefined) {
                Constructor.shortName = shortName;
            }
            Constructor.prototype.constructor = Constructor;
            var t = [_super_class].concat(can.makeArray(arguments)), args = Constructor.setup.apply(Constructor, t);
            if (Constructor.init) {
                Constructor.init.apply(Constructor, args || t);
            }
            return Constructor;
        }
    });
    can.Construct.prototype.setup = function () {
    };
    can.Construct.prototype.init = function () {
    };
    return can.Construct;
});
/*can/control/control*/
define('can/control/control', [
    'can/util/util',
    'can/construct/construct'
], function (can) {
    var bind = function (el, ev, callback) {
            can.bind.call(el, ev, callback);
            return function () {
                can.unbind.call(el, ev, callback);
            };
        }, isFunction = can.isFunction, extend = can.extend, each = can.each, slice = [].slice, paramReplacer = /\{([^\}]+)\}/g, special = can.getObject('$.event.special', [can]) || {}, delegate = function (el, selector, ev, callback) {
            can.delegate.call(el, selector, ev, callback);
            return function () {
                can.undelegate.call(el, selector, ev, callback);
            };
        }, binder = function (el, ev, callback, selector) {
            return selector ? delegate(el, can.trim(selector), ev, callback) : bind(el, ev, callback);
        }, basicProcessor;
    var Control = can.Control = can.Construct({
            setup: function () {
                can.Construct.setup.apply(this, arguments);
                if (can.Control) {
                    var control = this, funcName;
                    control.actions = {};
                    for (funcName in control.prototype) {
                        if (control._isAction(funcName)) {
                            control.actions[funcName] = control._action(funcName);
                        }
                    }
                }
            },
            _shifter: function (context, name) {
                var method = typeof name === 'string' ? context[name] : name;
                if (!isFunction(method)) {
                    method = context[method];
                }
                return function () {
                    context.called = name;
                    return method.apply(context, [this.nodeName ? can.$(this) : this].concat(slice.call(arguments, 0)));
                };
            },
            _isAction: function (methodName) {
                var val = this.prototype[methodName], type = typeof val;
                return methodName !== 'constructor' && (type === 'function' || type === 'string' && isFunction(this.prototype[val])) && !!(special[methodName] || processors[methodName] || /[^\w]/.test(methodName));
            },
            _action: function (methodName, options) {
                paramReplacer.lastIndex = 0;
                if (options || !paramReplacer.test(methodName)) {
                    var convertedName = options ? can.sub(methodName, this._lookup(options)) : methodName;
                    if (!convertedName) {
                        return null;
                    }
                    var arr = can.isArray(convertedName), name = arr ? convertedName[1] : convertedName, parts = name.split(/\s+/g), event = parts.pop();
                    return {
                        processor: processors[event] || basicProcessor,
                        parts: [
                            name,
                            parts.join(' '),
                            event
                        ],
                        delegate: arr ? convertedName[0] : undefined
                    };
                }
            },
            _lookup: function (options) {
                return [
                    options,
                    window
                ];
            },
            processors: {},
            defaults: {}
        }, {
            setup: function (element, options) {
                var cls = this.constructor, pluginname = cls.pluginName || cls._fullName, arr;
                this.element = can.$(element);
                if (pluginname && pluginname !== 'can_control') {
                    this.element.addClass(pluginname);
                }
                arr = can.data(this.element, 'controls');
                if (!arr) {
                    arr = [];
                    can.data(this.element, 'controls', arr);
                }
                arr.push(this);
                this.options = extend({}, cls.defaults, options);
                this.on();
                return [
                    this.element,
                    this.options
                ];
            },
            on: function (el, selector, eventName, func) {
                if (!el) {
                    this.off();
                    var cls = this.constructor, bindings = this._bindings, actions = cls.actions, element = this.element, destroyCB = can.Control._shifter(this, 'destroy'), funcName, ready;
                    for (funcName in actions) {
                        if (actions.hasOwnProperty(funcName)) {
                            ready = actions[funcName] || cls._action(funcName, this.options, this);
                            if (ready) {
                                bindings.control[funcName] = ready.processor(ready.delegate || element, ready.parts[2], ready.parts[1], funcName, this);
                            }
                        }
                    }
                    can.bind.call(element, 'removed', destroyCB);
                    bindings.user.push(function (el) {
                        can.unbind.call(el, 'removed', destroyCB);
                    });
                    return bindings.user.length;
                }
                if (typeof el === 'string') {
                    func = eventName;
                    eventName = selector;
                    selector = el;
                    el = this.element;
                }
                if (func === undefined) {
                    func = eventName;
                    eventName = selector;
                    selector = null;
                }
                if (typeof func === 'string') {
                    func = can.Control._shifter(this, func);
                }
                this._bindings.user.push(binder(el, eventName, func, selector));
                return this._bindings.user.length;
            },
            off: function () {
                var el = this.element[0], bindings = this._bindings;
                if (bindings) {
                    each(bindings.user || [], function (value) {
                        value(el);
                    });
                    each(bindings.control || {}, function (value) {
                        value(el);
                    });
                }
                this._bindings = {
                    user: [],
                    control: {}
                };
            },
            destroy: function () {
                if (this.element === null) {
                    return;
                }
                var Class = this.constructor, pluginName = Class.pluginName || Class._fullName, controls;
                this.off();
                if (pluginName && pluginName !== 'can_control') {
                    this.element.removeClass(pluginName);
                }
                controls = can.data(this.element, 'controls');
                controls.splice(can.inArray(this, controls), 1);
                can.trigger(this, 'destroyed');
                this.element = null;
            }
        });
    var processors = can.Control.processors;
    basicProcessor = function (el, event, selector, methodName, control) {
        return binder(el, event, can.Control._shifter(control, methodName), selector);
    };
    each([
        'change',
        'click',
        'contextmenu',
        'dblclick',
        'keydown',
        'keyup',
        'keypress',
        'mousedown',
        'mousemove',
        'mouseout',
        'mouseover',
        'mouseup',
        'reset',
        'resize',
        'scroll',
        'select',
        'submit',
        'focusin',
        'focusout',
        'mouseenter',
        'mouseleave',
        'touchstart',
        'touchmove',
        'touchcancel',
        'touchend',
        'touchleave',
        'inserted',
        'removed'
    ], function (v) {
        processors[v] = basicProcessor;
    });
    return Control;
});
/*can/util/bind/bind*/
define('can/util/bind/bind', ['can/util/util'], function (can) {
    can.bindAndSetup = function () {
        can.addEvent.apply(this, arguments);
        if (!this._init) {
            if (!this._bindings) {
                this._bindings = 1;
                if (this._bindsetup) {
                    this._bindsetup();
                }
            } else {
                this._bindings++;
            }
        }
        return this;
    };
    can.unbindAndTeardown = function (ev, handler) {
        can.removeEvent.apply(this, arguments);
        if (this._bindings === null) {
            this._bindings = 0;
        } else {
            this._bindings--;
        }
        if (!this._bindings && this._bindteardown) {
            this._bindteardown();
        }
        return this;
    };
    return can;
});
/*can/map/bubble*/
define('can/map/bubble', ['can/util/util'], function (can) {
    var bubble = can.bubble = {
            event: function (map, eventName) {
                return map.constructor._bubbleRule(eventName, map);
            },
            childrenOf: function (parentMap, eventName) {
                parentMap._each(function (child, prop) {
                    if (child && child.bind) {
                        bubble.toParent(child, parentMap, prop, eventName);
                    }
                });
            },
            teardownChildrenFrom: function (parentMap, eventName) {
                parentMap._each(function (child) {
                    bubble.teardownFromParent(parentMap, child, eventName);
                });
            },
            toParent: function (child, parent, prop, eventName) {
                can.listenTo.call(parent, child, eventName, function () {
                    var args = can.makeArray(arguments), ev = args.shift();
                    args[0] = (can.List && parent instanceof can.List ? parent.indexOf(child) : prop) + (args[0] ? '.' + args[0] : '');
                    ev.triggeredNS = ev.triggeredNS || {};
                    if (ev.triggeredNS[parent._cid]) {
                        return;
                    }
                    ev.triggeredNS[parent._cid] = true;
                    can.trigger(parent, ev, args);
                });
            },
            teardownFromParent: function (parent, child, eventName) {
                if (child && child.unbind) {
                    can.stopListening.call(parent, child, eventName);
                }
            },
            isBubbling: function (parent, eventName) {
                return parent._bubbleBindings && parent._bubbleBindings[eventName];
            },
            bind: function (parent, eventName) {
                if (!parent._init) {
                    var bubbleEvent = bubble.event(parent, eventName);
                    if (bubbleEvent) {
                        if (!parent._bubbleBindings) {
                            parent._bubbleBindings = {};
                        }
                        if (!parent._bubbleBindings[bubbleEvent]) {
                            parent._bubbleBindings[bubbleEvent] = 1;
                            bubble.childrenOf(parent, bubbleEvent);
                        } else {
                            parent._bubbleBindings[bubbleEvent]++;
                        }
                    }
                }
            },
            unbind: function (parent, eventName) {
                var bubbleEvent = bubble.event(parent, eventName);
                if (bubbleEvent) {
                    if (parent._bubbleBindings) {
                        parent._bubbleBindings[bubbleEvent]--;
                    }
                    if (parent._bubbleBindings && !parent._bubbleBindings[bubbleEvent]) {
                        delete parent._bubbleBindings[bubbleEvent];
                        bubble.teardownChildrenFrom(parent, bubbleEvent);
                        if (can.isEmptyObject(parent._bubbleBindings)) {
                            delete parent._bubbleBindings;
                        }
                    }
                }
            },
            add: function (parent, child, prop) {
                if (child instanceof can.Map && parent._bubbleBindings) {
                    for (var eventName in parent._bubbleBindings) {
                        if (parent._bubbleBindings[eventName]) {
                            bubble.teardownFromParent(parent, child, eventName);
                            bubble.toParent(child, parent, prop, eventName);
                        }
                    }
                }
            },
            removeMany: function (parent, children) {
                for (var i = 0, len = children.length; i < len; i++) {
                    bubble.remove(parent, children[i]);
                }
            },
            remove: function (parent, child) {
                if (child instanceof can.Map && parent._bubbleBindings) {
                    for (var eventName in parent._bubbleBindings) {
                        if (parent._bubbleBindings[eventName]) {
                            bubble.teardownFromParent(parent, child, eventName);
                        }
                    }
                }
            },
            set: function (parent, prop, value, current) {
                if (can.Map.helpers.isObservable(value)) {
                    bubble.add(parent, value, prop);
                }
                if (can.Map.helpers.isObservable(current)) {
                    bubble.remove(parent, current);
                }
                return value;
            }
        };
    return bubble;
});
/*can/util/batch/batch*/
define('can/util/batch/batch', ['can/util/can'], function (can) {
    var batchNum = 1, transactions = 0, batchEvents = [], stopCallbacks = [];
    can.batch = {
        start: function (batchStopHandler) {
            transactions++;
            if (batchStopHandler) {
                stopCallbacks.push(batchStopHandler);
            }
        },
        stop: function (force, callStart) {
            if (force) {
                transactions = 0;
            } else {
                transactions--;
            }
            if (transactions === 0) {
                var items = batchEvents.slice(0), callbacks = stopCallbacks.slice(0), i, len;
                batchEvents = [];
                stopCallbacks = [];
                batchNum++;
                if (callStart) {
                    can.batch.start();
                }
                for (i = 0, len = items.length; i < len; i++) {
                    can.dispatch.apply(items[i][0], items[i][1]);
                }
                for (i = 0, len = callbacks.length; i < callbacks.length; i++) {
                    callbacks[i]();
                }
            }
        },
        trigger: function (item, event, args) {
            if (!item._init) {
                if (transactions === 0) {
                    return can.dispatch.call(item, event, args);
                } else {
                    event = typeof event === 'string' ? { type: event } : event;
                    event.batchNum = batchNum;
                    batchEvents.push([
                        item,
                        [
                            event,
                            args
                        ]
                    ]);
                }
            }
        }
    };
});
/*can/map/map*/
define('can/map/map', [
    'can/util/util',
    'can/util/bind/bind',
    './bubble',
    'can/construct/construct',
    'can/util/batch/batch'
], function (can, bind, bubble) {
    var madeMap = null;
    var teardownMap = function () {
        for (var cid in madeMap) {
            if (madeMap[cid].added) {
                delete madeMap[cid].obj._cid;
            }
        }
        madeMap = null;
    };
    var getMapFromObject = function (obj) {
        return madeMap && madeMap[obj._cid] && madeMap[obj._cid].instance;
    };
    var serializeMap = null;
    var Map = can.Map = can.Construct.extend({
            setup: function () {
                can.Construct.setup.apply(this, arguments);
                if (can.Map) {
                    if (!this.defaults) {
                        this.defaults = {};
                    }
                    this._computes = [];
                    for (var prop in this.prototype) {
                        if (prop !== 'define' && prop !== 'constructor' && (typeof this.prototype[prop] !== 'function' || this.prototype[prop].prototype instanceof can.Construct)) {
                            this.defaults[prop] = this.prototype[prop];
                        } else if (this.prototype[prop].isComputed) {
                            this._computes.push(prop);
                        }
                    }
                    if (this.helpers.define) {
                        this.helpers.define(this);
                    }
                }
                if (can.List && !(this.prototype instanceof can.List)) {
                    this.List = Map.List.extend({ Map: this }, {});
                }
            },
            _bubble: bubble,
            _bubbleRule: function (eventName) {
                return (eventName === 'change' || eventName.indexOf('.') >= 0) && 'change';
            },
            _computes: [],
            bind: can.bindAndSetup,
            on: can.bindAndSetup,
            unbind: can.unbindAndTeardown,
            off: can.unbindAndTeardown,
            id: 'id',
            helpers: {
                define: null,
                attrParts: function (attr, keepKey) {
                    if (keepKey) {
                        return [attr];
                    }
                    return typeof attr === 'object' ? attr : ('' + attr).split('.');
                },
                addToMap: function (obj, instance) {
                    var teardown;
                    if (!madeMap) {
                        teardown = teardownMap;
                        madeMap = {};
                    }
                    var hasCid = obj._cid;
                    var cid = can.cid(obj);
                    if (!madeMap[cid]) {
                        madeMap[cid] = {
                            obj: obj,
                            instance: instance,
                            added: !hasCid
                        };
                    }
                    return teardown;
                },
                isObservable: function (obj) {
                    return obj instanceof can.Map || obj && obj === can.route;
                },
                canMakeObserve: function (obj) {
                    return obj && !can.isDeferred(obj) && (can.isArray(obj) || can.isPlainObject(obj));
                },
                serialize: function (map, how, where) {
                    var cid = can.cid(map), firstSerialize = false;
                    if (!serializeMap) {
                        firstSerialize = true;
                        serializeMap = {
                            attr: {},
                            serialize: {}
                        };
                    }
                    serializeMap[how][cid] = where;
                    map.each(function (val, name) {
                        var result, isObservable = Map.helpers.isObservable(val), serialized = isObservable && serializeMap[how][can.cid(val)];
                        if (serialized) {
                            result = serialized;
                        } else {
                            if (how === 'serialize') {
                                result = Map.helpers._serialize(map, name, val);
                            } else {
                                result = Map.helpers._getValue(map, name, val, how);
                            }
                        }
                        if (result !== undefined) {
                            where[name] = result;
                        }
                    });
                    can.__reading(map, '__keys');
                    if (firstSerialize) {
                        serializeMap = null;
                    }
                    return where;
                },
                _serialize: function (map, name, val) {
                    return Map.helpers._getValue(map, name, val, 'serialize');
                },
                _getValue: function (map, name, val, how) {
                    if (Map.helpers.isObservable(val)) {
                        return val[how]();
                    } else {
                        return val;
                    }
                }
            },
            keys: function (map) {
                var keys = [];
                can.__reading(map, '__keys');
                for (var keyName in map._data) {
                    keys.push(keyName);
                }
                return keys;
            }
        }, {
            setup: function (obj) {
                if (obj instanceof can.Map) {
                    obj = obj.serialize();
                }
                this._data = {};
                can.cid(this, '.map');
                this._init = 1;
                this._computedBindings = {};
                var defaultValues = this._setupDefaults(obj);
                this._setupComputes(defaultValues);
                var teardownMapping = obj && can.Map.helpers.addToMap(obj, this);
                var data = can.extend(can.extend(true, {}, defaultValues), obj);
                this.attr(data);
                if (teardownMapping) {
                    teardownMapping();
                }
                this.bind('change', can.proxy(this._changes, this));
                delete this._init;
            },
            _setupComputes: function () {
                var computes = this.constructor._computes;
                for (var i = 0, len = computes.length, prop; i < len; i++) {
                    prop = computes[i];
                    this[prop] = this[prop].clone(this);
                    this._computedBindings[prop] = { count: 0 };
                }
            },
            _setupDefaults: function () {
                return this.constructor.defaults || {};
            },
            _bindsetup: function () {
            },
            _bindteardown: function () {
            },
            _changes: function (ev, attr, how, newVal, oldVal) {
                can.batch.trigger(this, {
                    type: attr,
                    batchNum: ev.batchNum,
                    target: ev.target
                }, [
                    newVal,
                    oldVal
                ]);
            },
            _triggerChange: function (attr, how, newVal, oldVal) {
                if (bubble.isBubbling(this, 'change')) {
                    can.batch.trigger(this, {
                        type: 'change',
                        target: this
                    }, [
                        attr,
                        how,
                        newVal,
                        oldVal
                    ]);
                } else {
                    can.batch.trigger(this, attr, [
                        newVal,
                        oldVal
                    ]);
                }
                if (how === 'remove' || how === 'add') {
                    can.batch.trigger(this, {
                        type: '__keys',
                        target: this
                    });
                }
            },
            _each: function (callback) {
                var data = this.__get();
                for (var prop in data) {
                    if (data.hasOwnProperty(prop)) {
                        callback(data[prop], prop);
                    }
                }
            },
            attr: function (attr, val) {
                var type = typeof attr;
                if (type !== 'string' && type !== 'number') {
                    return this._attrs(attr, val);
                } else if (arguments.length === 1) {
                    can.__reading(this, attr);
                    return this._get(attr);
                } else {
                    this._set(attr, val);
                    return this;
                }
            },
            each: function () {
                return can.each.apply(undefined, [this].concat(can.makeArray(arguments)));
            },
            removeAttr: function (attr) {
                var isList = can.List && this instanceof can.List, parts = can.Map.helpers.attrParts(attr), prop = parts.shift(), current = isList ? this[prop] : this._data[prop];
                if (parts.length && current) {
                    return current.removeAttr(parts);
                } else {
                    if (typeof attr === 'string' && !!~attr.indexOf('.')) {
                        prop = attr;
                    }
                    this._remove(prop, current);
                    return current;
                }
            },
            _remove: function (prop, current) {
                if (prop in this._data) {
                    delete this._data[prop];
                    if (!(prop in this.constructor.prototype)) {
                        delete this[prop];
                    }
                    this._triggerChange(prop, 'remove', undefined, current);
                }
            },
            _get: function (attr) {
                attr = '' + attr;
                var dotIndex = attr.indexOf('.');
                if (dotIndex >= 0) {
                    var value = this.__get(attr);
                    if (value !== undefined) {
                        return value;
                    }
                    var first = attr.substr(0, dotIndex), second = attr.substr(dotIndex + 1), current = this.__get(first);
                    return current && current._get ? current._get(second) : undefined;
                } else {
                    return this.__get(attr);
                }
            },
            __get: function (attr) {
                if (attr) {
                    if (this._computedBindings[attr]) {
                        return this[attr]();
                    } else {
                        return this._data[attr];
                    }
                } else {
                    return this._data;
                }
            },
            __type: function (value, prop) {
                if (!(value instanceof can.Map) && can.Map.helpers.canMakeObserve(value)) {
                    var cached = getMapFromObject(value);
                    if (cached) {
                        return cached;
                    }
                    if (can.isArray(value)) {
                        var List = can.List;
                        return new List(value);
                    } else {
                        var Map = this.constructor.Map || can.Map;
                        return new Map(value);
                    }
                }
                return value;
            },
            _set: function (attr, value, keepKey) {
                attr = '' + attr;
                var dotIndex = attr.indexOf('.'), current;
                if (!keepKey && dotIndex >= 0) {
                    var first = attr.substr(0, dotIndex), second = attr.substr(dotIndex + 1);
                    current = this._init ? undefined : this.__get(first);
                    if (Map.helpers.isObservable(current)) {
                        current._set(second, value);
                    } else {
                        throw 'can.Map: Object does not exist';
                    }
                } else {
                    if (this.__convert) {
                        value = this.__convert(attr, value);
                    }
                    current = this._init ? undefined : this.__get(attr);
                    this.__set(attr, this.__type(value, attr), current);
                }
            },
            __set: function (prop, value, current) {
                if (value !== current) {
                    var changeType = current !== undefined || this.__get().hasOwnProperty(prop) ? 'set' : 'add';
                    this.___set(prop, this.constructor._bubble.set(this, prop, value, current));
                    this._triggerChange(prop, changeType, value, current);
                    if (current) {
                        this.constructor._bubble.teardownFromParent(this, current);
                    }
                }
            },
            ___set: function (prop, val) {
                if (this._computedBindings[prop]) {
                    this[prop](val);
                } else {
                    this._data[prop] = val;
                }
                if (typeof this.constructor.prototype[prop] !== 'function' && !this._computedBindings[prop]) {
                    this[prop] = val;
                }
            },
            bind: function (eventName, handler) {
                var computedBinding = this._computedBindings && this._computedBindings[eventName];
                if (computedBinding) {
                    if (!computedBinding.count) {
                        computedBinding.count = 1;
                        var self = this;
                        computedBinding.handler = function (ev, newVal, oldVal) {
                            can.batch.trigger(self, {
                                type: eventName,
                                batchNum: ev.batchNum,
                                target: self
                            }, [
                                newVal,
                                oldVal
                            ]);
                        };
                        this[eventName].bind('change', computedBinding.handler);
                    } else {
                        computedBinding.count++;
                    }
                }
                this.constructor._bubble.bind(this, eventName);
                return can.bindAndSetup.apply(this, arguments);
            },
            unbind: function (eventName, handler) {
                var computedBinding = this._computedBindings && this._computedBindings[eventName];
                if (computedBinding) {
                    if (computedBinding.count === 1) {
                        computedBinding.count = 0;
                        this[eventName].unbind('change', computedBinding.handler);
                        delete computedBinding.handler;
                    } else {
                        computedBinding.count--;
                    }
                }
                this.constructor._bubble.unbind(this, eventName);
                return can.unbindAndTeardown.apply(this, arguments);
            },
            serialize: function () {
                return can.Map.helpers.serialize(this, 'serialize', {});
            },
            _attrs: function (props, remove) {
                if (props === undefined) {
                    return Map.helpers.serialize(this, 'attr', {});
                }
                props = can.simpleExtend({}, props);
                var prop, self = this, newVal;
                can.batch.start();
                this.each(function (curVal, prop) {
                    if (prop === '_cid') {
                        return;
                    }
                    newVal = props[prop];
                    if (newVal === undefined) {
                        if (remove) {
                            self.removeAttr(prop);
                        }
                        return;
                    }
                    if (self.__convert) {
                        newVal = self.__convert(prop, newVal);
                    }
                    if (Map.helpers.isObservable(newVal)) {
                        self.__set(prop, self.__type(newVal, prop), curVal);
                    } else if (Map.helpers.isObservable(curVal) && Map.helpers.canMakeObserve(newVal)) {
                        curVal.attr(newVal, remove);
                    } else if (curVal !== newVal) {
                        self.__set(prop, self.__type(newVal, prop), curVal);
                    }
                    delete props[prop];
                });
                for (prop in props) {
                    if (prop !== '_cid') {
                        newVal = props[prop];
                        this._set(prop, newVal, true);
                    }
                }
                can.batch.stop();
                return this;
            },
            compute: function (prop) {
                if (can.isFunction(this.constructor.prototype[prop])) {
                    return can.compute(this[prop], this);
                } else {
                    var reads = prop.split('.'), last = reads.length - 1, options = { args: [] };
                    return can.compute(function (newVal) {
                        if (arguments.length) {
                            can.compute.read(this, reads.slice(0, last)).value.attr(reads[last], newVal);
                        } else {
                            return can.compute.read(this, reads, options).value;
                        }
                    }, this);
                }
            }
        });
    Map.prototype.on = Map.prototype.bind;
    Map.prototype.off = Map.prototype.unbind;
    return Map;
});
/*can/list/list*/
define('can/list/list', [
    'can/util/util',
    'can/map/map',
    'can/map/bubble'
], function (can, Map, bubble) {
    var splice = [].splice, spliceRemovesProps = function () {
            var obj = {
                    0: 'a',
                    length: 1
                };
            splice.call(obj, 0, 1);
            return !obj[0];
        }();
    var list = Map.extend({ Map: Map }, {
            setup: function (instances, options) {
                this.length = 0;
                can.cid(this, '.map');
                this._init = 1;
                this._computedBindings = {};
                this._setupComputes();
                instances = instances || [];
                var teardownMapping;
                if (can.isDeferred(instances)) {
                    this.replace(instances);
                } else {
                    teardownMapping = instances.length && can.Map.helpers.addToMap(instances, this);
                    this.push.apply(this, can.makeArray(instances || []));
                }
                if (teardownMapping) {
                    teardownMapping();
                }
                this.bind('change', can.proxy(this._changes, this));
                can.simpleExtend(this, options);
                delete this._init;
            },
            _triggerChange: function (attr, how, newVal, oldVal) {
                Map.prototype._triggerChange.apply(this, arguments);
                var index = +attr;
                if (!~attr.indexOf('.') && !isNaN(index)) {
                    if (how === 'add') {
                        can.batch.trigger(this, how, [
                            newVal,
                            index
                        ]);
                        can.batch.trigger(this, 'length', [this.length]);
                    } else if (how === 'remove') {
                        can.batch.trigger(this, how, [
                            oldVal,
                            index
                        ]);
                        can.batch.trigger(this, 'length', [this.length]);
                    } else {
                        can.batch.trigger(this, how, [
                            newVal,
                            index
                        ]);
                    }
                }
            },
            __get: function (attr) {
                if (attr) {
                    if (this[attr] && this[attr].isComputed && can.isFunction(this.constructor.prototype[attr])) {
                        return this[attr]();
                    } else {
                        return this[attr];
                    }
                } else {
                    return this;
                }
            },
            ___set: function (attr, val) {
                this[attr] = val;
                if (+attr >= this.length) {
                    this.length = +attr + 1;
                }
            },
            _remove: function (prop, current) {
                if (isNaN(+prop)) {
                    delete this[prop];
                    this._triggerChange(prop, 'remove', undefined, current);
                } else {
                    this.splice(prop, 1);
                }
            },
            _each: function (callback) {
                var data = this.__get();
                for (var i = 0; i < data.length; i++) {
                    callback(data[i], i);
                }
            },
            serialize: function () {
                return Map.helpers.serialize(this, 'serialize', []);
            },
            splice: function (index, howMany) {
                var args = can.makeArray(arguments), added = [], i, len;
                for (i = 2, len = args.length; i < len; i++) {
                    args[i] = this.__type(args[i], i);
                    added.push(args[i]);
                }
                if (howMany === undefined) {
                    howMany = args[1] = this.length - index;
                }
                var removed = splice.apply(this, args);
                if (!spliceRemovesProps) {
                    for (i = this.length; i < removed.length + this.length; i++) {
                        delete this[i];
                    }
                }
                can.batch.start();
                if (howMany > 0) {
                    bubble.removeMany(this, removed);
                    this._triggerChange('' + index, 'remove', undefined, removed);
                }
                if (args.length > 2) {
                    for (i = 0, len = added.length; i < len; i++) {
                        bubble.set(this, i, added[i]);
                    }
                    this._triggerChange('' + index, 'add', added, removed);
                }
                can.batch.stop();
                return removed;
            },
            _attrs: function (items, remove) {
                if (items === undefined) {
                    return Map.helpers.serialize(this, 'attr', []);
                }
                items = can.makeArray(items);
                can.batch.start();
                this._updateAttrs(items, remove);
                can.batch.stop();
            },
            _updateAttrs: function (items, remove) {
                var len = Math.min(items.length, this.length);
                for (var prop = 0; prop < len; prop++) {
                    var curVal = this[prop], newVal = items[prop];
                    if (Map.helpers.isObservable(curVal) && Map.helpers.canMakeObserve(newVal)) {
                        curVal.attr(newVal, remove);
                    } else if (curVal !== newVal) {
                        this._set(prop, newVal);
                    } else {
                    }
                }
                if (items.length > this.length) {
                    this.push.apply(this, items.slice(this.length));
                } else if (items.length < this.length && remove) {
                    this.splice(items.length);
                }
            }
        }), getArgs = function (args) {
            return args[0] && can.isArray(args[0]) ? args[0] : can.makeArray(args);
        };
    can.each({
        push: 'length',
        unshift: 0
    }, function (where, name) {
        var orig = [][name];
        list.prototype[name] = function () {
            var args = [], len = where ? this.length : 0, i = arguments.length, res, val;
            while (i--) {
                val = arguments[i];
                args[i] = bubble.set(this, i, this.__type(val, i));
            }
            res = orig.apply(this, args);
            if (!this.comparator || args.length) {
                this._triggerChange('' + len, 'add', args, undefined);
            }
            return res;
        };
    });
    can.each({
        pop: 'length',
        shift: 0
    }, function (where, name) {
        list.prototype[name] = function () {
            var args = getArgs(arguments), len = where && this.length ? this.length - 1 : 0;
            var res = [][name].apply(this, args);
            this._triggerChange('' + len, 'remove', undefined, [res]);
            if (res && res.unbind) {
                bubble.remove(this, res);
            }
            return res;
        };
    });
    can.extend(list.prototype, {
        indexOf: function (item, fromIndex) {
            this.attr('length');
            return can.inArray(item, this, fromIndex);
        },
        join: function () {
            return [].join.apply(this.attr(), arguments);
        },
        reverse: function () {
            var list = can.makeArray([].reverse.call(this));
            this.replace(list);
        },
        slice: function () {
            var temp = Array.prototype.slice.apply(this, arguments);
            return new this.constructor(temp);
        },
        concat: function () {
            var args = [];
            can.each(can.makeArray(arguments), function (arg, i) {
                args[i] = arg instanceof can.List ? arg.serialize() : arg;
            });
            return new this.constructor(Array.prototype.concat.apply(this.serialize(), args));
        },
        forEach: function (cb, thisarg) {
            return can.each(this, cb, thisarg || this);
        },
        replace: function (newList) {
            if (can.isDeferred(newList)) {
                newList.then(can.proxy(this.replace, this));
            } else {
                this.splice.apply(this, [
                    0,
                    this.length
                ].concat(can.makeArray(newList || [])));
            }
            return this;
        },
        filter: function (callback, thisArg) {
            var filteredList = new can.List(), self = this, filtered;
            this.each(function (item, index, list) {
                filtered = callback.call(thisArg | self, item, index, self);
                if (filtered) {
                    filteredList.push(item);
                }
            });
            return filteredList;
        }
    });
    can.List = Map.List = list;
    return can.List;
});
/*can/compute/compute*/
define('can/compute/compute', [
    'can/util/util',
    'can/util/bind/bind',
    'can/util/batch/batch'
], function (can, bind) {
    var stack = [];
    can.__read = function (func, self) {
        stack.push({});
        var value = func.call(self);
        return {
            value: value,
            observed: stack.pop()
        };
    };
    can.__reading = function (obj, event) {
        if (stack.length) {
            stack[stack.length - 1][obj._cid + '|' + event] = {
                obj: obj,
                event: event + ''
            };
        }
    };
    can.__clearReading = function () {
        if (stack.length) {
            var ret = stack[stack.length - 1];
            stack[stack.length - 1] = {};
            return ret;
        }
    };
    can.__setReading = function (o) {
        if (stack.length) {
            stack[stack.length - 1] = o;
        }
    };
    can.__addReading = function (o) {
        if (stack.length) {
            can.simpleExtend(stack[stack.length - 1], o);
        }
    };
    var getValueAndBind = function (func, context, oldObserved, onchanged) {
        var info = can.__read(func, context), newObserveSet = info.observed;
        bindNewSet(oldObserved, newObserveSet, onchanged);
        unbindOldSet(oldObserved, onchanged);
        return info;
    };
    var bindNewSet = function (oldObserved, newObserveSet, onchanged) {
        for (var name in newObserveSet) {
            bindOrPreventUnbinding(oldObserved, newObserveSet, name, onchanged);
        }
    };
    var bindOrPreventUnbinding = function (oldObserved, newObserveSet, name, onchanged) {
        if (oldObserved[name]) {
            delete oldObserved[name];
        } else {
            var obEv = newObserveSet[name];
            obEv.obj.bind(obEv.event, onchanged);
        }
    };
    var unbindOldSet = function (oldObserved, onchanged) {
        for (var name in oldObserved) {
            var obEv = oldObserved[name];
            obEv.obj.unbind(obEv.event, onchanged);
        }
    };
    var updateOnChange = function (compute, newValue, oldValue, batchNum) {
        if (newValue !== oldValue) {
            can.batch.trigger(compute, batchNum ? {
                type: 'change',
                batchNum: batchNum
            } : 'change', [
                newValue,
                oldValue
            ]);
        }
    };
    var setupComputeHandlers = function (compute, func, context, setCachedValue) {
        var readInfo, onchanged, batchNum;
        return {
            on: function (updater) {
                if (!onchanged) {
                    onchanged = function (ev) {
                        if (compute.bound && (ev.batchNum === undefined || ev.batchNum !== batchNum)) {
                            var oldValue = readInfo.value;
                            readInfo = getValueAndBind(func, context, readInfo.observed, onchanged);
                            updater(readInfo.value, oldValue, ev.batchNum);
                            batchNum = batchNum = ev.batchNum;
                        }
                    };
                }
                readInfo = getValueAndBind(func, context, {}, onchanged);
                setCachedValue(readInfo.value);
                compute.hasDependencies = !can.isEmptyObject(readInfo.observed);
            },
            off: function (updater) {
                for (var name in readInfo.observed) {
                    var ob = readInfo.observed[name];
                    ob.obj.unbind(ob.event, onchanged);
                }
            }
        };
    };
    var setupSingleBindComputeHandlers = function (compute, func, context, setCachedValue) {
        var readInfo, oldValue, onchanged, batchNum;
        return {
            on: function (updater) {
                if (!onchanged) {
                    onchanged = function (ev) {
                        if (compute.bound && (ev.batchNum === undefined || ev.batchNum !== batchNum)) {
                            var reads = can.__clearReading();
                            var newValue = func.call(context);
                            can.__setReading(reads);
                            updater(newValue, oldValue, ev.batchNum);
                            oldValue = newValue;
                            batchNum = batchNum = ev.batchNum;
                        }
                    };
                }
                readInfo = getValueAndBind(func, context, {}, onchanged);
                oldValue = readInfo.value;
                setCachedValue(readInfo.value);
                compute.hasDependencies = !can.isEmptyObject(readInfo.observed);
            },
            off: function (updater) {
                for (var name in readInfo.observed) {
                    var ob = readInfo.observed[name];
                    ob.obj.unbind(ob.event, onchanged);
                }
            }
        };
    };
    var isObserve = function (obj) {
            return obj instanceof can.Map || obj && obj.__get;
        }, k = function () {
        };
    can.compute = function (getterSetter, context, eventName, bindOnce) {
        if (getterSetter && getterSetter.isComputed) {
            return getterSetter;
        }
        var computed, on = k, off = k, value, get = function () {
                return value;
            }, set = function (newVal) {
                value = newVal;
            }, setCached = set, args = [], updater = function (newValue, oldValue, batchNum) {
                setCached(newValue);
                updateOnChange(computed, newValue, oldValue, batchNum);
            }, form;
        for (var i = 0, arglen = arguments.length; i < arglen; i++) {
            args[i] = arguments[i];
        }
        computed = function (newVal) {
            if (arguments.length) {
                var old = value;
                var setVal = set.call(context, newVal, old);
                if (computed.hasDependencies) {
                    return get.call(context);
                }
                if (setVal === undefined) {
                    value = get.call(context);
                } else {
                    value = setVal;
                }
                updateOnChange(computed, value, old);
                return value;
            } else {
                if (stack.length && computed.canReadForChangeEvent !== false) {
                    can.__reading(computed, 'change');
                    if (!computed.bound) {
                        can.compute.temporarilyBind(computed);
                    }
                }
                if (computed.bound) {
                    return value;
                } else {
                    return get.call(context);
                }
            }
        };
        if (typeof getterSetter === 'function') {
            set = getterSetter;
            get = getterSetter;
            computed.canReadForChangeEvent = eventName === false ? false : true;
            var handlers = bindOnce ? setupSingleBindComputeHandlers(computed, getterSetter, context || this, setCached) : setupComputeHandlers(computed, getterSetter, context || this, setCached);
            on = handlers.on;
            off = handlers.off;
        } else if (context) {
            if (typeof context === 'string') {
                var propertyName = context, isObserve = getterSetter instanceof can.Map;
                if (isObserve) {
                    computed.hasDependencies = true;
                    var handler;
                    get = function () {
                        return getterSetter.attr(propertyName);
                    };
                    set = function (newValue) {
                        getterSetter.attr(propertyName, newValue);
                    };
                    on = function (update) {
                        handler = function (ev, newVal, oldVal) {
                            update(newVal, oldVal, ev.batchNum);
                        };
                        getterSetter.bind(eventName || propertyName, handler);
                        value = can.__read(get).value;
                    };
                    off = function (update) {
                        getterSetter.unbind(eventName || propertyName, handler);
                    };
                } else {
                    get = function () {
                        return getterSetter[propertyName];
                    };
                    set = function (newValue) {
                        getterSetter[propertyName] = newValue;
                    };
                    on = function (update) {
                        handler = function () {
                            update(get(), value);
                        };
                        can.bind.call(getterSetter, eventName || propertyName, handler);
                        value = can.__read(get).value;
                    };
                    off = function (update) {
                        can.unbind.call(getterSetter, eventName || propertyName, handler);
                    };
                }
            } else {
                if (typeof context === 'function') {
                    value = getterSetter;
                    set = context;
                    context = eventName;
                    form = 'setter';
                } else {
                    value = getterSetter;
                    var options = context, oldUpdater = updater;
                    context = options.context || options;
                    get = options.get || get;
                    set = options.set || function () {
                        return value;
                    };
                    if (options.fn) {
                        var fn = options.fn, data;
                        get = function () {
                            return fn.call(context, value);
                        };
                        if (fn.length === 0) {
                            data = setupComputeHandlers(computed, fn, context, setCached);
                        } else if (fn.length === 1) {
                            data = setupComputeHandlers(computed, function () {
                                return fn.call(context, value);
                            }, context, setCached);
                        } else {
                            updater = function (newVal) {
                                if (newVal !== undefined) {
                                    oldUpdater(newVal, value);
                                }
                            };
                            data = setupComputeHandlers(computed, function () {
                                var res = fn.call(context, value, function (newVal) {
                                        oldUpdater(newVal, value);
                                    });
                                return res !== undefined ? res : value;
                            }, context, setCached);
                        }
                        on = data.on;
                        off = data.off;
                    } else {
                        updater = function () {
                            var newVal = get.call(context);
                            oldUpdater(newVal, value);
                        };
                    }
                    on = options.on || on;
                    off = options.off || off;
                }
            }
        } else {
            value = getterSetter;
        }
        can.cid(computed, 'compute');
        return can.simpleExtend(computed, {
            isComputed: true,
            _bindsetup: function () {
                this.bound = true;
                var oldReading = can.__clearReading();
                on.call(this, updater);
                can.__setReading(oldReading);
            },
            _bindteardown: function () {
                off.call(this, updater);
                this.bound = false;
            },
            bind: can.bindAndSetup,
            unbind: can.unbindAndTeardown,
            clone: function (context) {
                if (context) {
                    if (form === 'setter') {
                        args[2] = context;
                    } else {
                        args[1] = context;
                    }
                }
                return can.compute.apply(can, args);
            }
        });
    };
    var computes, unbindComputes = function () {
            for (var i = 0, len = computes.length; i < len; i++) {
                computes[i].unbind('change', k);
            }
            computes = null;
        };
    can.compute.temporarilyBind = function (compute) {
        compute.bind('change', k);
        if (!computes) {
            computes = [];
            setTimeout(unbindComputes, 10);
        }
        computes.push(compute);
    };
    can.compute.truthy = function (compute) {
        return can.compute(function () {
            var res = compute();
            if (typeof res === 'function') {
                res = res();
            }
            return !!res;
        });
    };
    can.compute.async = function (initialValue, asyncComputer, context) {
        return can.compute(initialValue, {
            fn: asyncComputer,
            context: context
        });
    };
    can.compute.read = function (parent, reads, options) {
        options = options || {};
        var cur = parent, type, prev, foundObs;
        for (var i = 0, readLength = reads.length; i < readLength; i++) {
            prev = cur;
            if (prev && prev.isComputed) {
                if (options.foundObservable) {
                    options.foundObservable(prev, i);
                }
                prev = cur = prev();
            }
            if (isObserve(prev)) {
                if (!foundObs && options.foundObservable) {
                    options.foundObservable(prev, i);
                }
                foundObs = 1;
                if (typeof prev[reads[i]] === 'function' && prev.constructor.prototype[reads[i]] === prev[reads[i]]) {
                    if (options.returnObserveMethods) {
                        cur = cur[reads[i]];
                    } else if (reads[i] === 'constructor' && prev instanceof can.Construct || prev[reads[i]].prototype instanceof can.Construct) {
                        cur = prev[reads[i]];
                    } else {
                        cur = prev[reads[i]].apply(prev, options.args || []);
                    }
                } else {
                    cur = cur.attr(reads[i]);
                }
            } else {
                if (cur == null) {
                    cur = undefined;
                } else {
                    cur = prev[reads[i]];
                }
            }
            type = typeof cur;
            if (cur && cur.isComputed && (!options.isArgument && i < readLength - 1)) {
                if (!foundObs && options.foundObservable) {
                    options.foundObservable(prev, i + 1);
                }
                cur = cur();
            } else if (i < reads.length - 1 && type === 'function' && options.executeAnonymousFunctions && !(can.Construct && cur.prototype instanceof can.Construct)) {
                cur = cur();
            }
            if (i < reads.length - 1 && (cur === null || type !== 'function' && type !== 'object')) {
                if (options.earlyExit) {
                    options.earlyExit(prev, i, cur);
                }
                return {
                    value: undefined,
                    parent: prev
                };
            }
        }
        if (typeof cur === 'function' && !(can.Construct && cur.prototype instanceof can.Construct) && !(can.route && cur === can.route)) {
            if (options.isArgument) {
                if (!cur.isComputed && options.proxyMethods !== false) {
                    cur = can.proxy(cur, prev);
                }
            } else {
                if (cur.isComputed && !foundObs && options.foundObservable) {
                    options.foundObservable(cur, i);
                }
                cur = cur.call(prev);
            }
        }
        if (cur === undefined) {
            if (options.earlyExit) {
                options.earlyExit(prev, i - 1);
            }
        }
        return {
            value: cur,
            parent: prev
        };
    };
    can.compute.set = function (parent, key, value) {
        if (isObserve(parent)) {
            return parent.attr(key, value);
        }
        if (parent[key] && parent[key].isComputed) {
            return parent[key](value);
        }
        if (typeof parent === 'object') {
            parent[key] = value;
        }
    };
    return can.compute;
});
/*can/observe/observe*/
define('can/observe/observe', [
    'can/util/util',
    'can/map/map',
    'can/list/list',
    'can/compute/compute'
], function (can) {
    can.Observe = can.Map;
    can.Observe.startBatch = can.batch.start;
    can.Observe.stopBatch = can.batch.stop;
    can.Observe.triggerBatch = can.batch.trigger;
    return can;
});
/*content_list*/
define('content_list', [
    'can/control/control',
    'jquery/jquery',
    'can/observe/observe'
], function (Control, $) {
    var contentList = function (sections, tag) {
        var text = '<' + tag + '>';
        $.each(sections, function (i, section) {
            text += '<li><a href=\'#' + section.id + '\'>' + section.text + '</a></li>';
            if (section.sections && section.sections.length) {
                text += contentList(section.sections, tag);
            }
        });
        text += '</' + tag + '>';
        return text;
    };
    return can.Control.extend({
        init: function () {
            var sections = [];
            this.collectSignatures().each(function (ix) {
                var h2 = $('h2', this);
                this.id = 'sig_' + h2.text().replace(/\s/g, '').replace(/[^\w]/g, '_');
                sections.push({
                    id: this.id,
                    text: h2.text()
                });
            });
            var headingStack = [], last = function () {
                    return headingStack[headingStack.length - 1];
                };
            var ch = this.collectHeadings().each(function (ix) {
                    var el = $(this);
                    this.id = 'section_' + el.text().replace(/\s/g, '').replace(/[^\w]/g, '_');
                    var num = +this.nodeName.substr(1);
                    var section = {
                            id: this.id,
                            text: el.text(),
                            num: num,
                            sections: []
                        };
                    while (last() && last().num >= num) {
                        headingStack.pop();
                    }
                    if (!headingStack.length) {
                        sections.push(section);
                        headingStack.push(section);
                    } else {
                        last().sections.push(section);
                        headingStack.push(section);
                    }
                });
            this.element.html(contentList(sections, (window.docObject.outline && window.docObject.outline.tag || 'ul').toLowerCase()));
            if (window.location.hash.length) {
                var id = window.location.hash.replace('#', ''), anchor = document.getElementById(id);
                if (anchor) {
                    anchor.scrollIntoView(true);
                }
            }
        },
        collectSignatures: function () {
            var cloned = $('.content .signature').clone();
            cloned.find('.release').remove();
            return cloned;
        },
        collectHeadings: function () {
            var depth = window.docObject.outline && window.docObject.outline.depth || 1;
            var headings = [];
            for (var i = 0; i < depth; i++) {
                headings.push('h' + (i + 2));
            }
            return $('.content .comment').find(headings.join(','));
        }
    });
});
/*can/view/view*/
define('can/view/view', ['can/util/util'], function (can) {
    var isFunction = can.isFunction, makeArray = can.makeArray, hookupId = 1;
    var makeRenderer = function (textRenderer) {
        var renderer = function () {
            return $view.frag(textRenderer.apply(this, arguments));
        };
        renderer.render = function () {
            return textRenderer.apply(textRenderer, arguments);
        };
        return renderer;
    };
    var checkText = function (text, url) {
        if (!text.length) {
            throw 'can.view: No template or empty template:' + url;
        }
    };
    var getRenderer = function (obj, async) {
        if (isFunction(obj)) {
            var def = can.Deferred();
            return def.resolve(obj);
        }
        var url = typeof obj === 'string' ? obj : obj.url, suffix = obj.engine && '.' + obj.engine || url.match(/\.[\w\d]+$/), type, el, id;
        if (url.match(/^#/)) {
            url = url.substr(1);
        }
        if (el = document.getElementById(url)) {
            suffix = '.' + el.type.match(/\/(x\-)?(.+)/)[2];
        }
        if (!suffix && !$view.cached[url]) {
            url += suffix = $view.ext;
        }
        if (can.isArray(suffix)) {
            suffix = suffix[0];
        }
        id = $view.toId(url);
        if (url.match(/^\/\//)) {
            url = url.substr(2);
            url = !window.steal ? url : steal.config().root.mapJoin('' + steal.id(url));
        }
        if (window.require) {
            if (require.toUrl) {
                url = require.toUrl(url);
            }
        }
        type = $view.types[suffix];
        if ($view.cached[id]) {
            return $view.cached[id];
        } else if (el) {
            return $view.registerView(id, el.innerHTML, type);
        } else {
            var d = new can.Deferred();
            can.ajax({
                async: async,
                url: url,
                dataType: 'text',
                error: function (jqXHR) {
                    checkText('', url);
                    d.reject(jqXHR);
                },
                success: function (text) {
                    checkText(text, url);
                    $view.registerView(id, text, type, d);
                }
            });
            return d;
        }
    };
    var getDeferreds = function (data) {
        var deferreds = [];
        if (can.isDeferred(data)) {
            return [data];
        } else {
            for (var prop in data) {
                if (can.isDeferred(data[prop])) {
                    deferreds.push(data[prop]);
                }
            }
        }
        return deferreds;
    };
    var usefulPart = function (resolved) {
        return can.isArray(resolved) && resolved[1] === 'success' ? resolved[0] : resolved;
    };
    var $view = can.view = can.template = function (view, data, helpers, callback) {
            if (isFunction(helpers)) {
                callback = helpers;
                helpers = undefined;
            }
            return $view.renderAs('fragment', view, data, helpers, callback);
        };
    can.extend($view, {
        frag: function (result, parentNode) {
            return $view.hookup($view.fragment(result), parentNode);
        },
        fragment: function (result) {
            if (typeof result !== 'string' && result.nodeType === 11) {
                return result;
            }
            var frag = can.buildFragment(result, document.body);
            if (!frag.childNodes.length) {
                frag.appendChild(document.createTextNode(''));
            }
            return frag;
        },
        toId: function (src) {
            return can.map(src.toString().split(/\/|\./g), function (part) {
                if (part) {
                    return part;
                }
            }).join('_');
        },
        toStr: function (txt) {
            return txt == null ? '' : '' + txt;
        },
        hookup: function (fragment, parentNode) {
            var hookupEls = [], id, func;
            can.each(fragment.childNodes ? can.makeArray(fragment.childNodes) : fragment, function (node) {
                if (node.nodeType === 1) {
                    hookupEls.push(node);
                    hookupEls.push.apply(hookupEls, can.makeArray(node.getElementsByTagName('*')));
                }
            });
            can.each(hookupEls, function (el) {
                if (el.getAttribute && (id = el.getAttribute('data-view-id')) && (func = $view.hookups[id])) {
                    func(el, parentNode, id);
                    delete $view.hookups[id];
                    el.removeAttribute('data-view-id');
                }
            });
            return fragment;
        },
        hookups: {},
        hook: function (cb) {
            $view.hookups[++hookupId] = cb;
            return ' data-view-id=\'' + hookupId + '\'';
        },
        cached: {},
        cachedRenderers: {},
        cache: true,
        register: function (info) {
            this.types['.' + info.suffix] = info;
            can[info.suffix] = $view[info.suffix] = function (id, text) {
                var renderer, renderFunc;
                if (!text) {
                    renderFunc = function () {
                        if (!renderer) {
                            if (info.fragRenderer) {
                                renderer = info.fragRenderer(null, id);
                            } else {
                                renderer = makeRenderer(info.renderer(null, id));
                            }
                        }
                        return renderer.apply(this, arguments);
                    };
                    renderFunc.render = function () {
                        var textRenderer = info.renderer(null, id);
                        return textRenderer.apply(textRenderer, arguments);
                    };
                    return renderFunc;
                }
                var registeredRenderer = function () {
                    if (!renderer) {
                        if (info.fragRenderer) {
                            renderer = info.fragRenderer(id, text);
                        } else {
                            renderer = info.renderer(id, text);
                        }
                    }
                    return renderer.apply(this, arguments);
                };
                if (info.fragRenderer) {
                    return $view.preload(id, registeredRenderer);
                } else {
                    return $view.preloadStringRenderer(id, registeredRenderer);
                }
            };
        },
        types: {},
        ext: '.ejs',
        registerScript: function (type, id, src) {
            return 'can.view.preloadStringRenderer(\'' + id + '\',' + $view.types['.' + type].script(id, src) + ');';
        },
        preload: function (id, renderer) {
            var def = $view.cached[id] = new can.Deferred().resolve(function (data, helpers) {
                    return renderer.call(data, data, helpers);
                });
            def.__view_id = id;
            $view.cachedRenderers[id] = renderer;
            return renderer;
        },
        preloadStringRenderer: function (id, stringRenderer) {
            return this.preload(id, makeRenderer(stringRenderer));
        },
        render: function (view, data, helpers, callback) {
            return can.view.renderAs('string', view, data, helpers, callback);
        },
        renderTo: function (format, renderer, data, helpers) {
            return (format === 'string' && renderer.render ? renderer.render : renderer)(data, helpers);
        },
        renderAs: function (format, view, data, helpers, callback) {
            if (isFunction(helpers)) {
                callback = helpers;
                helpers = undefined;
            }
            var deferreds = getDeferreds(data);
            var reading, deferred, dataCopy, async, response;
            if (deferreds.length) {
                deferred = new can.Deferred();
                dataCopy = can.extend({}, data);
                deferreds.push(getRenderer(view, true));
                can.when.apply(can, deferreds).then(function (resolved) {
                    var objs = makeArray(arguments), renderer = objs.pop(), result;
                    if (can.isDeferred(data)) {
                        dataCopy = usefulPart(resolved);
                    } else {
                        for (var prop in data) {
                            if (can.isDeferred(data[prop])) {
                                dataCopy[prop] = usefulPart(objs.shift());
                            }
                        }
                    }
                    result = can.view.renderTo(format, renderer, dataCopy, helpers);
                    deferred.resolve(result, dataCopy);
                    if (callback) {
                        callback(result, dataCopy);
                    }
                }, function () {
                    deferred.reject.apply(deferred, arguments);
                });
                return deferred;
            } else {
                reading = can.__clearReading();
                async = isFunction(callback);
                deferred = getRenderer(view, async);
                if (reading) {
                    can.__setReading(reading);
                }
                if (async) {
                    response = deferred;
                    deferred.then(function (renderer) {
                        callback(data ? can.view.renderTo(format, renderer, data, helpers) : renderer);
                    });
                } else {
                    if (deferred.state() === 'resolved' && deferred.__view_id) {
                        var currentRenderer = $view.cachedRenderers[deferred.__view_id];
                        return data ? can.view.renderTo(format, currentRenderer, data, helpers) : currentRenderer;
                    } else {
                        deferred.then(function (renderer) {
                            response = data ? can.view.renderTo(format, renderer, data, helpers) : renderer;
                        });
                    }
                }
                return response;
            }
        },
        registerView: function (id, text, type, def) {
            var info = typeof type === 'object' ? type : $view.types[type || $view.ext], renderer;
            if (info.fragRenderer) {
                renderer = info.fragRenderer(id, text);
            } else {
                renderer = makeRenderer(info.renderer(id, text));
            }
            def = def || new can.Deferred();
            if ($view.cache) {
                $view.cached[id] = def;
                def.__view_id = id;
                $view.cachedRenderers[id] = renderer;
            }
            return def.resolve(renderer);
        }
    });
    return can;
});
/*can/view/scope/scope*/
define('can/view/scope/scope', [
    'can/util/util',
    'can/construct/construct',
    'can/map/map',
    'can/list/list',
    'can/view/view',
    'can/compute/compute'
], function (can) {
    var escapeReg = /(\\)?\./g, escapeDotReg = /\\\./g, getNames = function (attr) {
            var names = [], last = 0;
            attr.replace(escapeReg, function (first, second, index) {
                if (!second) {
                    names.push(attr.slice(last, index).replace(escapeDotReg, '.'));
                    last = index + first.length;
                }
            });
            names.push(attr.slice(last).replace(escapeDotReg, '.'));
            return names;
        };
    var Scope = can.Construct.extend({ read: can.compute.read }, {
            init: function (context, parent) {
                this._context = context;
                this._parent = parent;
                this.__cache = {};
            },
            attr: function (key, value) {
                var previousReads = can.__clearReading(), res = this.read(key, {
                        isArgument: true,
                        returnObserveMethods: true,
                        proxyMethods: false
                    });
                if (arguments.length === 2) {
                    var lastIndex = key.lastIndexOf('.'), readKey = lastIndex !== -1 ? key.substring(0, lastIndex) : '.', obj = this.read(readKey, {
                            isArgument: true,
                            returnObserveMethods: true,
                            proxyMethods: false
                        }).value;
                    if (lastIndex !== -1) {
                        key = key.substring(lastIndex + 1, key.length);
                    }
                    can.compute.set(obj, key, value);
                }
                can.__setReading(previousReads);
                return res.value;
            },
            add: function (context) {
                if (context !== this._context) {
                    return new this.constructor(context, this);
                } else {
                    return this;
                }
            },
            computeData: function (key, options) {
                options = options || { args: [] };
                var self = this, rootObserve, rootReads, computeData = {
                        compute: can.compute(function (newVal) {
                            if (arguments.length) {
                                if (rootObserve.isComputed) {
                                    rootObserve(newVal);
                                } else if (rootReads.length) {
                                    var last = rootReads.length - 1;
                                    var obj = rootReads.length ? can.compute.read(rootObserve, rootReads.slice(0, last)).value : rootObserve;
                                    can.compute.set(obj, rootReads[last], newVal);
                                }
                            } else {
                                if (rootObserve) {
                                    return can.compute.read(rootObserve, rootReads, options).value;
                                }
                                var data = self.read(key, options);
                                rootObserve = data.rootObserve;
                                rootReads = data.reads;
                                computeData.scope = data.scope;
                                computeData.initialValue = data.value;
                                computeData.reads = data.reads;
                                computeData.root = rootObserve;
                                return data.value;
                            }
                        })
                    };
                return computeData;
            },
            compute: function (key, options) {
                return this.computeData(key, options).compute;
            },
            read: function (attr, options) {
                var stopLookup;
                if (attr.substr(0, 2) === './') {
                    stopLookup = true;
                    attr = attr.substr(2);
                } else if (attr.substr(0, 3) === '../') {
                    return this._parent.read(attr.substr(3), options);
                } else if (attr === '..') {
                    return { value: this._parent._context };
                } else if (attr === '.' || attr === 'this') {
                    return { value: this._context };
                }
                var names = attr.indexOf('\\.') === -1 ? attr.split('.') : getNames(attr), context, scope = this, defaultObserve, defaultReads = [], defaultPropertyDepth = -1, defaultComputeReadings, defaultScope, currentObserve, currentReads;
                while (scope) {
                    context = scope._context;
                    if (context !== null) {
                        var data = can.compute.read(context, names, can.simpleExtend({
                                foundObservable: function (observe, nameIndex) {
                                    currentObserve = observe;
                                    currentReads = names.slice(nameIndex);
                                },
                                earlyExit: function (parentValue, nameIndex) {
                                    if (nameIndex > defaultPropertyDepth) {
                                        defaultObserve = currentObserve;
                                        defaultReads = currentReads;
                                        defaultPropertyDepth = nameIndex;
                                        defaultScope = scope;
                                        defaultComputeReadings = can.__clearReading();
                                    }
                                },
                                executeAnonymousFunctions: true
                            }, options));
                        if (data.value !== undefined) {
                            return {
                                scope: scope,
                                rootObserve: currentObserve,
                                value: data.value,
                                reads: currentReads
                            };
                        }
                    }
                    can.__clearReading();
                    if (!stopLookup) {
                        scope = scope._parent;
                    } else {
                        scope = null;
                    }
                }
                if (defaultObserve) {
                    can.__setReading(defaultComputeReadings);
                    return {
                        scope: defaultScope,
                        rootObserve: defaultObserve,
                        reads: defaultReads,
                        value: undefined
                    };
                } else {
                    return {
                        names: names,
                        value: undefined
                    };
                }
            }
        });
    can.view.Scope = Scope;
    return Scope;
});
/*can/view/elements*/
define('can/view/elements', [
    'can/util/util',
    'can/view/view'
], function (can) {
    var doc = typeof document !== 'undefined' ? document : null;
    var selectsCommentNodes = doc && function () {
            return can.$(document.createComment('~')).length === 1;
        }();
    var elements = {
            tagToContentPropMap: {
                option: doc && 'textContent' in document.createElement('option') ? 'textContent' : 'innerText',
                textarea: 'value'
            },
            attrMap: can.attr.map,
            attrReg: /([^\s=]+)[\s]*=[\s]*/,
            defaultValue: can.attr.defaultValue,
            tagMap: {
                '': 'span',
                colgroup: 'col',
                table: 'tbody',
                tr: 'td',
                ol: 'li',
                ul: 'li',
                tbody: 'tr',
                thead: 'tr',
                tfoot: 'tr',
                select: 'option',
                optgroup: 'option'
            },
            reverseTagMap: {
                col: 'colgroup',
                tr: 'tbody',
                option: 'select',
                td: 'tr',
                th: 'tr',
                li: 'ul'
            },
            getParentNode: function (el, defaultParentNode) {
                return defaultParentNode && el.parentNode.nodeType === 11 ? defaultParentNode : el.parentNode;
            },
            setAttr: can.attr.set,
            getAttr: can.attr.get,
            removeAttr: can.attr.remove,
            contentText: function (text) {
                if (typeof text === 'string') {
                    return text;
                }
                if (!text && text !== 0) {
                    return '';
                }
                return '' + text;
            },
            after: function (oldElements, newFrag) {
                var last = oldElements[oldElements.length - 1];
                if (last.nextSibling) {
                    can.insertBefore(last.parentNode, newFrag, last.nextSibling);
                } else {
                    can.appendChild(last.parentNode, newFrag);
                }
            },
            replace: function (oldElements, newFrag) {
                elements.after(oldElements, newFrag);
                if (can.remove(can.$(oldElements)).length < oldElements.length && !selectsCommentNodes) {
                    can.each(oldElements, function (el) {
                        if (el.nodeType === 8) {
                            el.parentNode.removeChild(el);
                        }
                    });
                }
            }
        };
    can.view.elements = elements;
    return elements;
});
/*can/view/callbacks/callbacks*/
define('can/view/callbacks/callbacks', [
    'can/util/util',
    'can/view/view'
], function (can) {
    var attr = can.view.attr = function (attributeName, attrHandler) {
            if (attrHandler) {
                if (typeof attributeName === 'string') {
                    attributes[attributeName] = attrHandler;
                } else {
                    regExpAttributes.push({
                        match: attributeName,
                        handler: attrHandler
                    });
                }
            } else {
                var cb = attributes[attributeName];
                if (!cb) {
                    for (var i = 0, len = regExpAttributes.length; i < len; i++) {
                        var attrMatcher = regExpAttributes[i];
                        if (attrMatcher.match.test(attributeName)) {
                            cb = attrMatcher.handler;
                            break;
                        }
                    }
                }
                return cb;
            }
        };
    var attributes = {}, regExpAttributes = [], automaticCustomElementCharacters = /[-\:]/;
    var tag = can.view.tag = function (tagName, tagHandler) {
            if (tagHandler) {
                if (can.global.html5) {
                    can.global.html5.elements += ' ' + tagName;
                    can.global.html5.shivDocument();
                }
                tags[tagName.toLowerCase()] = tagHandler;
            } else {
                var cb = tags[tagName.toLowerCase()];
                if (!cb && automaticCustomElementCharacters.test(tagName)) {
                    cb = function () {
                    };
                }
                return cb;
            }
        };
    var tags = {};
    can.view.callbacks = {
        _tags: tags,
        _attributes: attributes,
        _regExpAttributes: regExpAttributes,
        tag: tag,
        attr: attr,
        tagHandler: function (el, tagName, tagData) {
            var helperTagCallback = tagData.options.attr('tags.' + tagName), tagCallback = helperTagCallback || tags[tagName];
            var scope = tagData.scope, res;
            if (tagCallback) {
                var reads = can.__clearReading();
                res = tagCallback(el, tagData);
                can.__setReading(reads);
            } else {
                res = scope;
            }
            if (res && tagData.subtemplate) {
                if (scope !== res) {
                    scope = scope.add(res);
                }
                var result = tagData.subtemplate(scope, tagData.options);
                var frag = typeof result === 'string' ? can.view.frag(result) : result;
                can.appendChild(el, frag);
            }
        }
    };
    return can.view.callbacks;
});
/*can/view/scanner*/
define('can/view/scanner', [
    'can/view/view',
    './elements',
    'can/view/callbacks/callbacks'
], function (can, elements, viewCallbacks) {
    var newLine = /(\r|\n)+/g, notEndTag = /\//, clean = function (content) {
            return content.split('\\').join('\\\\').split('\n').join('\\n').split('"').join('\\"').split('\t').join('\\t');
        }, getTag = function (tagName, tokens, i) {
            if (tagName) {
                return tagName;
            } else {
                while (i < tokens.length) {
                    if (tokens[i] === '<' && !notEndTag.test(tokens[i + 1])) {
                        return elements.reverseTagMap[tokens[i + 1]] || 'span';
                    }
                    i++;
                }
            }
            return '';
        }, bracketNum = function (content) {
            return --content.split('{').length - --content.split('}').length;
        }, myEval = function (script) {
            eval(script);
        }, attrReg = /([^\s]+)[\s]*=[\s]*$/, startTxt = 'var ___v1ew = [];', finishTxt = 'return ___v1ew.join(\'\')', put_cmd = '___v1ew.push(\n', insert_cmd = put_cmd, htmlTag = null, quote = null, beforeQuote = null, rescan = null, getAttrName = function () {
            var matches = beforeQuote.match(attrReg);
            return matches && matches[1];
        }, status = function () {
            return quote ? '\'' + getAttrName() + '\'' : htmlTag ? 1 : 0;
        }, top = function (stack) {
            return stack[stack.length - 1];
        }, Scanner;
    can.view.Scanner = Scanner = function (options) {
        can.extend(this, {
            text: {},
            tokens: []
        }, options);
        this.text.options = this.text.options || '';
        this.tokenReg = [];
        this.tokenSimple = {
            '<': '<',
            '>': '>',
            '"': '"',
            '\'': '\''
        };
        this.tokenComplex = [];
        this.tokenMap = {};
        for (var i = 0, token; token = this.tokens[i]; i++) {
            if (token[2]) {
                this.tokenReg.push(token[2]);
                this.tokenComplex.push({
                    abbr: token[1],
                    re: new RegExp(token[2]),
                    rescan: token[3]
                });
            } else {
                this.tokenReg.push(token[1]);
                this.tokenSimple[token[1]] = token[0];
            }
            this.tokenMap[token[0]] = token[1];
        }
        this.tokenReg = new RegExp('(' + this.tokenReg.slice(0).concat([
            '<',
            '>',
            '"',
            '\''
        ]).join('|') + ')', 'g');
    };
    Scanner.prototype = {
        helpers: [],
        scan: function (source, name) {
            var tokens = [], last = 0, simple = this.tokenSimple, complex = this.tokenComplex;
            source = source.replace(newLine, '\n');
            if (this.transform) {
                source = this.transform(source);
            }
            source.replace(this.tokenReg, function (whole, part) {
                var offset = arguments[arguments.length - 2];
                if (offset > last) {
                    tokens.push(source.substring(last, offset));
                }
                if (simple[whole]) {
                    tokens.push(whole);
                } else {
                    for (var i = 0, token; token = complex[i]; i++) {
                        if (token.re.test(whole)) {
                            tokens.push(token.abbr);
                            if (token.rescan) {
                                tokens.push(token.rescan(part));
                            }
                            break;
                        }
                    }
                }
                last = offset + part.length;
            });
            if (last < source.length) {
                tokens.push(source.substr(last));
            }
            var content = '', buff = [startTxt + (this.text.start || '')], put = function (content, bonus) {
                    buff.push(put_cmd, '"', clean(content), '"' + (bonus || '') + ');');
                }, endStack = [], lastToken, startTag = null, magicInTag = false, specialStates = {
                    attributeHookups: [],
                    tagHookups: [],
                    lastTagHookup: ''
                }, popTagHookup = function () {
                    specialStates.lastTagHookup = specialStates.tagHookups.pop() + specialStates.tagHookups.length;
                }, tagName = '', tagNames = [], popTagName = false, bracketCount, specialAttribute = false, i = 0, token, tmap = this.tokenMap, attrName;
            htmlTag = quote = beforeQuote = null;
            for (; (token = tokens[i++]) !== undefined;) {
                if (startTag === null) {
                    switch (token) {
                    case tmap.left:
                    case tmap.escapeLeft:
                    case tmap.returnLeft:
                        magicInTag = htmlTag && 1;
                    case tmap.commentLeft:
                        startTag = token;
                        if (content.length) {
                            put(content);
                        }
                        content = '';
                        break;
                    case tmap.escapeFull:
                        magicInTag = htmlTag && 1;
                        rescan = 1;
                        startTag = tmap.escapeLeft;
                        if (content.length) {
                            put(content);
                        }
                        rescan = tokens[i++];
                        content = rescan.content || rescan;
                        if (rescan.before) {
                            put(rescan.before);
                        }
                        tokens.splice(i, 0, tmap.right);
                        break;
                    case tmap.commentFull:
                        break;
                    case tmap.templateLeft:
                        content += tmap.left;
                        break;
                    case '<':
                        if (tokens[i].indexOf('!--') !== 0) {
                            htmlTag = 1;
                            magicInTag = 0;
                        }
                        content += token;
                        break;
                    case '>':
                        htmlTag = 0;
                        var emptyElement = content.substr(content.length - 1) === '/' || content.substr(content.length - 2) === '--', attrs = '';
                        if (specialStates.attributeHookups.length) {
                            attrs = 'attrs: [\'' + specialStates.attributeHookups.join('\',\'') + '\'], ';
                            specialStates.attributeHookups = [];
                        }
                        if (tagName + specialStates.tagHookups.length !== specialStates.lastTagHookup && tagName === top(specialStates.tagHookups)) {
                            if (emptyElement) {
                                content = content.substr(0, content.length - 1);
                            }
                            buff.push(put_cmd, '"', clean(content), '"', ',can.view.pending({tagName:\'' + tagName + '\',' + attrs + 'scope: ' + (this.text.scope || 'this') + this.text.options);
                            if (emptyElement) {
                                buff.push('}));');
                                content = '/>';
                                popTagHookup();
                            } else if (tokens[i] === '<' && tokens[i + 1] === '/' + tagName) {
                                buff.push('}));');
                                content = token;
                                popTagHookup();
                            } else {
                                buff.push(',subtemplate: function(' + this.text.argNames + '){\n' + startTxt + (this.text.start || ''));
                                content = '';
                            }
                        } else if (magicInTag || !popTagName && elements.tagToContentPropMap[tagNames[tagNames.length - 1]] || attrs) {
                            var pendingPart = ',can.view.pending({' + attrs + 'scope: ' + (this.text.scope || 'this') + this.text.options + '}),"';
                            if (emptyElement) {
                                put(content.substr(0, content.length - 1), pendingPart + '/>"');
                            } else {
                                put(content, pendingPart + '>"');
                            }
                            content = '';
                            magicInTag = 0;
                        } else {
                            content += token;
                        }
                        if (emptyElement || popTagName) {
                            tagNames.pop();
                            tagName = tagNames[tagNames.length - 1];
                            popTagName = false;
                        }
                        specialStates.attributeHookups = [];
                        break;
                    case '\'':
                    case '"':
                        if (htmlTag) {
                            if (quote && quote === token) {
                                quote = null;
                                var attr = getAttrName();
                                if (viewCallbacks.attr(attr)) {
                                    specialStates.attributeHookups.push(attr);
                                }
                                if (specialAttribute) {
                                    content += token;
                                    put(content);
                                    buff.push(finishTxt, '}));\n');
                                    content = '';
                                    specialAttribute = false;
                                    break;
                                }
                            } else if (quote === null) {
                                quote = token;
                                beforeQuote = lastToken;
                                attrName = getAttrName();
                                if (tagName === 'img' && attrName === 'src' || attrName === 'style') {
                                    put(content.replace(attrReg, ''));
                                    content = '';
                                    specialAttribute = true;
                                    buff.push(insert_cmd, 'can.view.txt(2,\'' + getTag(tagName, tokens, i) + '\',' + status() + ',this,function(){', startTxt);
                                    put(attrName + '=' + token);
                                    break;
                                }
                            }
                        }
                    default:
                        if (lastToken === '<') {
                            tagName = token.substr(0, 3) === '!--' ? '!--' : token.split(/\s/)[0];
                            var isClosingTag = false, cleanedTagName;
                            if (tagName.indexOf('/') === 0) {
                                isClosingTag = true;
                                cleanedTagName = tagName.substr(1);
                            }
                            if (isClosingTag) {
                                if (top(tagNames) === cleanedTagName) {
                                    tagName = cleanedTagName;
                                    popTagName = true;
                                }
                                if (top(specialStates.tagHookups) === cleanedTagName) {
                                    put(content.substr(0, content.length - 1));
                                    buff.push(finishTxt + '}}) );');
                                    content = '><';
                                    popTagHookup();
                                }
                            } else {
                                if (tagName.lastIndexOf('/') === tagName.length - 1) {
                                    tagName = tagName.substr(0, tagName.length - 1);
                                }
                                if (tagName !== '!--' && viewCallbacks.tag(tagName)) {
                                    if (tagName === 'content' && elements.tagMap[top(tagNames)]) {
                                        token = token.replace('content', elements.tagMap[top(tagNames)]);
                                    }
                                    specialStates.tagHookups.push(tagName);
                                }
                                tagNames.push(tagName);
                            }
                        }
                        content += token;
                        break;
                    }
                } else {
                    switch (token) {
                    case tmap.right:
                    case tmap.returnRight:
                        switch (startTag) {
                        case tmap.left:
                            bracketCount = bracketNum(content);
                            if (bracketCount === 1) {
                                buff.push(insert_cmd, 'can.view.txt(0,\'' + getTag(tagName, tokens, i) + '\',' + status() + ',this,function(){', startTxt, content);
                                endStack.push({
                                    before: '',
                                    after: finishTxt + '}));\n'
                                });
                            } else {
                                last = endStack.length && bracketCount === -1 ? endStack.pop() : { after: ';' };
                                if (last.before) {
                                    buff.push(last.before);
                                }
                                buff.push(content, ';', last.after);
                            }
                            break;
                        case tmap.escapeLeft:
                        case tmap.returnLeft:
                            bracketCount = bracketNum(content);
                            if (bracketCount) {
                                endStack.push({
                                    before: finishTxt,
                                    after: '}));\n'
                                });
                            }
                            var escaped = startTag === tmap.escapeLeft ? 1 : 0, commands = {
                                    insert: insert_cmd,
                                    tagName: getTag(tagName, tokens, i),
                                    status: status(),
                                    specialAttribute: specialAttribute
                                };
                            for (var ii = 0; ii < this.helpers.length; ii++) {
                                var helper = this.helpers[ii];
                                if (helper.name.test(content)) {
                                    content = helper.fn(content, commands);
                                    if (helper.name.source === /^>[\s]*\w*/.source) {
                                        escaped = 0;
                                    }
                                    break;
                                }
                            }
                            if (typeof content === 'object') {
                                if (content.startTxt && content.end && specialAttribute) {
                                    buff.push(insert_cmd, 'can.view.toStr( ', content.content, '() ) );');
                                } else {
                                    if (content.startTxt) {
                                        buff.push(insert_cmd, 'can.view.txt(\n' + (typeof status() === 'string' || (content.escaped != null ? content.escaped : escaped)) + ',\n\'' + tagName + '\',\n' + status() + ',\nthis,\n');
                                    } else if (content.startOnlyTxt) {
                                        buff.push(insert_cmd, 'can.view.onlytxt(this,\n');
                                    }
                                    buff.push(content.content);
                                    if (content.end) {
                                        buff.push('));');
                                    }
                                }
                            } else if (specialAttribute) {
                                buff.push(insert_cmd, content, ');');
                            } else {
                                buff.push(insert_cmd, 'can.view.txt(\n' + (typeof status() === 'string' || escaped) + ',\n\'' + tagName + '\',\n' + status() + ',\nthis,\nfunction(){ ' + (this.text.escape || '') + 'return ', content, bracketCount ? startTxt : '}));\n');
                            }
                            if (rescan && rescan.after && rescan.after.length) {
                                put(rescan.after.length);
                                rescan = null;
                            }
                            break;
                        }
                        startTag = null;
                        content = '';
                        break;
                    case tmap.templateLeft:
                        content += tmap.left;
                        break;
                    default:
                        content += token;
                        break;
                    }
                }
                lastToken = token;
            }
            if (content.length) {
                put(content);
            }
            buff.push(';');
            var template = buff.join(''), out = { out: (this.text.outStart || '') + template + ' ' + finishTxt + (this.text.outEnd || '') };
            myEval.call(out, 'this.fn = (function(' + this.text.argNames + '){' + out.out + '});\r\n//# sourceURL=' + name + '.js');
            return out;
        }
    };
    can.view.pending = function (viewData) {
        var hooks = can.view.getHooks();
        return can.view.hook(function (el) {
            can.each(hooks, function (fn) {
                fn(el);
            });
            viewData.templateType = 'legacy';
            if (viewData.tagName) {
                viewCallbacks.tagHandler(el, viewData.tagName, viewData);
            }
            can.each(viewData && viewData.attrs || [], function (attributeName) {
                viewData.attributeName = attributeName;
                var callback = viewCallbacks.attr(attributeName);
                if (callback) {
                    callback(el, viewData);
                }
            });
        });
    };
    can.view.tag('content', function (el, tagData) {
        return tagData.scope;
    });
    can.view.Scanner = Scanner;
    return Scanner;
});
/*can/view/node_lists/node_lists*/
define('can/view/node_lists/node_lists', [
    'can/util/util',
    'can/view/elements'
], function (can) {
    var canExpando = true;
    try {
        document.createTextNode('')._ = 0;
    } catch (ex) {
        canExpando = false;
    }
    var nodeMap = {}, textNodeMap = {}, expando = 'ejs_' + Math.random(), _id = 0, id = function (node, localMap) {
            var _textNodeMap = localMap || textNodeMap;
            var id = readId(node, _textNodeMap);
            if (id) {
                return id;
            } else {
                if (canExpando || node.nodeType !== 3) {
                    ++_id;
                    return node[expando] = (node.nodeName ? 'element_' : 'obj_') + _id;
                } else {
                    ++_id;
                    _textNodeMap['text_' + _id] = node;
                    return 'text_' + _id;
                }
            }
        }, readId = function (node, textNodeMap) {
            if (canExpando || node.nodeType !== 3) {
                return node[expando];
            } else {
                for (var textNodeID in textNodeMap) {
                    if (textNodeMap[textNodeID] === node) {
                        return textNodeID;
                    }
                }
            }
        }, splice = [].splice, push = [].push, itemsInChildListTree = function (list) {
            var count = 0;
            for (var i = 0, len = list.length; i < len; i++) {
                var item = list[i];
                if (item.nodeType) {
                    count++;
                } else {
                    count += itemsInChildListTree(item);
                }
            }
            return count;
        }, replacementMap = function (replacements, idMap) {
            var map = {};
            for (var i = 0, len = replacements.length; i < len; i++) {
                var node = nodeLists.first(replacements[i]);
                map[id(node, idMap)] = replacements[i];
            }
            return map;
        };
    var nodeLists = {
            id: id,
            update: function (nodeList, newNodes) {
                var oldNodes = nodeLists.unregisterChildren(nodeList);
                newNodes = can.makeArray(newNodes);
                var oldListLength = nodeList.length;
                splice.apply(nodeList, [
                    0,
                    oldListLength
                ].concat(newNodes));
                if (nodeList.replacements) {
                    nodeLists.nestReplacements(nodeList);
                } else {
                    nodeLists.nestList(nodeList);
                }
                return oldNodes;
            },
            nestReplacements: function (list) {
                var index = 0, idMap = {}, rMap = replacementMap(list.replacements, idMap), rCount = list.replacements.length;
                while (index < list.length && rCount) {
                    var node = list[index], replacement = rMap[readId(node, idMap)];
                    if (replacement) {
                        list.splice(index, itemsInChildListTree(replacement), replacement);
                        rCount--;
                    }
                    index++;
                }
                list.replacements = [];
            },
            nestList: function (list) {
                var index = 0;
                while (index < list.length) {
                    var node = list[index], childNodeList = nodeMap[id(node)];
                    if (childNodeList) {
                        if (childNodeList !== list) {
                            list.splice(index, itemsInChildListTree(childNodeList), childNodeList);
                        }
                    } else {
                        nodeMap[id(node)] = list;
                    }
                    index++;
                }
            },
            last: function (nodeList) {
                var last = nodeList[nodeList.length - 1];
                if (last.nodeType) {
                    return last;
                } else {
                    return nodeLists.last(last);
                }
            },
            first: function (nodeList) {
                var first = nodeList[0];
                if (first.nodeType) {
                    return first;
                } else {
                    return nodeLists.first(first);
                }
            },
            register: function (nodeList, unregistered, parent) {
                nodeList.unregistered = unregistered;
                nodeList.parentList = parent;
                if (parent === true) {
                    nodeList.replacements = [];
                } else if (parent) {
                    parent.replacements.push(nodeList);
                    nodeList.replacements = [];
                } else {
                    nodeLists.nestList(nodeList);
                }
                return nodeList;
            },
            unregisterChildren: function (nodeList) {
                var nodes = [];
                can.each(nodeList, function (node) {
                    if (node.nodeType) {
                        if (!nodeList.replacements) {
                            delete nodeMap[id(node)];
                        }
                        nodes.push(node);
                    } else {
                        push.apply(nodes, nodeLists.unregister(node));
                    }
                });
                return nodes;
            },
            unregister: function (nodeList) {
                var nodes = nodeLists.unregisterChildren(nodeList);
                if (nodeList.unregistered) {
                    var unregisteredCallback = nodeList.unregistered;
                    delete nodeList.unregistered;
                    delete nodeList.replacements;
                    unregisteredCallback();
                }
                return nodes;
            },
            nodeMap: nodeMap
        };
    can.view.nodeLists = nodeLists;
    return nodeLists;
});
/*can/view/parser/parser*/
define('can/view/parser/parser', ['can/view/view'], function (can) {
    function makeMap(str) {
        var obj = {}, items = str.split(',');
        for (var i = 0; i < items.length; i++) {
            obj[items[i]] = true;
        }
        return obj;
    }
    function handleIntermediate(intermediate, handler) {
        for (var i = 0, len = intermediate.length; i < len; i++) {
            var item = intermediate[i];
            handler[item.tokenType].apply(handler, item.args);
        }
        return intermediate;
    }
    var alphaNumericHU = '-:A-Za-z0-9_', attributeNames = '[a-zA-Z_:][' + alphaNumericHU + ':.]*', spaceEQspace = '\\s*=\\s*', dblQuote2dblQuote = '"((?:\\\\.|[^"])*)"', quote2quote = '\'((?:\\\\.|[^\'])*)\'', attributeEqAndValue = '(?:' + spaceEQspace + '(?:' + '(?:"[^"]*")|(?:\'[^\']*\')|[^>\\s]+))?', matchStash = '\\{\\{[^\\}]*\\}\\}\\}?', stash = '\\{\\{([^\\}]*)\\}\\}\\}?', startTag = new RegExp('^<([' + alphaNumericHU + ']+)' + '(' + '(?:\\s*' + '(?:(?:' + '(?:' + attributeNames + ')?' + attributeEqAndValue + ')|' + '(?:' + matchStash + ')+)' + ')*' + ')\\s*(\\/?)>'), endTag = new RegExp('^<\\/([' + alphaNumericHU + ']+)[^>]*>'), attr = new RegExp('(?:' + '(?:(' + attributeNames + ')|' + stash + ')' + '(?:' + spaceEQspace + '(?:' + '(?:' + dblQuote2dblQuote + ')|(?:' + quote2quote + ')|([^>\\s]+)' + ')' + ')?)', 'g'), mustache = new RegExp(stash, 'g'), txtBreak = /<|\{\{/;
    var empty = makeMap('area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed');
    var block = makeMap('address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video');
    var inline = makeMap('a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var');
    var closeSelf = makeMap('colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr');
    var fillAttrs = makeMap('checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected');
    var special = makeMap('script,style');
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
            can.each(tokenTypes, function (name) {
                var callback = handler[name] || fn;
                handler[name] = function () {
                    if (callback.apply(this, arguments) !== false) {
                        intermediate.push({
                            tokenType: name,
                            args: can.makeArray(arguments)
                        });
                    }
                };
            });
        }
        function parseStartTag(tag, tagName, rest, unary) {
            tagName = tagName.toLowerCase();
            if (block[tagName]) {
                while (stack.last() && inline[stack.last()]) {
                    parseEndTag('', stack.last());
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
        var index, chars, match, stack = [], last = html;
        stack.last = function () {
            return this[this.length - 1];
        };
        while (html) {
            chars = true;
            if (!stack.last() || !special[stack.last()]) {
                if (html.indexOf('<!--') === 0) {
                    index = html.indexOf('-->');
                    if (index >= 0) {
                        if (handler.comment) {
                            handler.comment(html.substring(4, index));
                        }
                        html = html.substring(index + 3);
                        chars = false;
                    }
                } else if (html.indexOf('</') === 0) {
                    match = html.match(endTag);
                    if (match) {
                        html = html.substring(match[0].length);
                        match[0].replace(endTag, parseEndTag);
                        chars = false;
                    }
                } else if (html.indexOf('<') === 0) {
                    match = html.match(startTag);
                    if (match) {
                        html = html.substring(match[0].length);
                        match[0].replace(startTag, parseStartTag);
                        chars = false;
                    }
                } else if (html.indexOf('{{') === 0) {
                    match = html.match(mustache);
                    if (match) {
                        html = html.substring(match[0].length);
                        match[0].replace(mustache, parseMustache);
                    }
                }
                if (chars) {
                    index = html.search(txtBreak);
                    var text = index < 0 ? html : html.substring(0, index);
                    html = index < 0 ? '' : html.substring(index);
                    if (handler.chars && text) {
                        handler.chars(text);
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
                throw 'Parse Error: ' + html;
            }
            last = html;
        }
        parseEndTag();
        handler.done();
        return intermediate;
    };
    HTMLParser.parseAttrs = function (rest, handler) {
        (rest != null ? rest : '').replace(attr, function (text, name, special, dblQuote, singleQuote, val) {
            if (special) {
                handler.special(special);
            }
            if (name || dblQuote || singleQuote || val) {
                var value = arguments[3] ? arguments[3] : arguments[4] ? arguments[4] : arguments[5] ? arguments[5] : fillAttrs[name.toLowerCase()] ? name : '';
                handler.attrStart(name || '');
                var last = mustache.lastIndex = 0, res = mustache.exec(value), chars;
                while (res) {
                    chars = value.substring(last, mustache.lastIndex - res[0].length);
                    if (chars.length) {
                        handler.attrValue(chars);
                    }
                    handler.special(res[1]);
                    last = mustache.lastIndex;
                    res = mustache.exec(value);
                }
                chars = value.substr(last, value.length);
                if (chars) {
                    handler.attrValue(chars);
                }
                handler.attrEnd(name || '');
            }
        });
    };
    can.view.parser = HTMLParser;
    return HTMLParser;
});
/*can/view/live/live*/
define('can/view/live/live', [
    'can/util/util',
    'can/view/elements',
    'can/view/view',
    'can/view/node_lists/node_lists',
    'can/view/parser/parser'
], function (can, elements, view, nodeLists, parser) {
    elements = elements || can.view.elements;
    nodeLists = nodeLists || can.view.NodeLists;
    parser = parser || can.view.parser;
    var setup = function (el, bind, unbind) {
            var tornDown = false, teardown = function () {
                    if (!tornDown) {
                        tornDown = true;
                        unbind(data);
                        can.unbind.call(el, 'removed', teardown);
                    }
                    return true;
                }, data = {
                    teardownCheck: function (parent) {
                        return parent ? false : teardown();
                    }
                };
            can.bind.call(el, 'removed', teardown);
            bind(data);
            return data;
        }, listen = function (el, compute, change) {
            return setup(el, function () {
                compute.bind('change', change);
            }, function (data) {
                compute.unbind('change', change);
                if (data.nodeList) {
                    nodeLists.unregister(data.nodeList);
                }
            });
        }, getAttributeParts = function (newVal) {
            var attrs = {}, attr;
            parser.parseAttrs(newVal, {
                attrStart: function (name) {
                    attrs[name] = '';
                    attr = name;
                },
                attrValue: function (value) {
                    attrs[attr] += value;
                },
                attrEnd: function () {
                }
            });
            return attrs;
        }, splice = [].splice, isNode = function (obj) {
            return obj && obj.nodeType;
        }, addTextNodeIfNoChildren = function (frag) {
            if (!frag.childNodes.length) {
                frag.appendChild(document.createTextNode(''));
            }
        };
    var live = {
            list: function (el, compute, render, context, parentNode, nodeList) {
                var masterNodeList = nodeList || [el], indexMap = [], add = function (ev, items, index) {
                        var frag = document.createDocumentFragment(), newNodeLists = [], newIndicies = [];
                        can.each(items, function (item, key) {
                            var itemNodeList = [];
                            if (nodeList) {
                                nodeLists.register(itemNodeList, null, true);
                            }
                            var itemIndex = can.compute(key + index), itemHTML = render.call(context, item, itemIndex, itemNodeList), gotText = typeof itemHTML === 'string', itemFrag = can.frag(itemHTML);
                            itemFrag = gotText ? can.view.hookup(itemFrag) : itemFrag;
                            var childNodes = can.makeArray(itemFrag.childNodes);
                            if (nodeList) {
                                nodeLists.update(itemNodeList, childNodes);
                                newNodeLists.push(itemNodeList);
                            } else {
                                newNodeLists.push(nodeLists.register(childNodes));
                            }
                            frag.appendChild(itemFrag);
                            newIndicies.push(itemIndex);
                        });
                        var masterListIndex = index + 1;
                        if (!masterNodeList[masterListIndex]) {
                            elements.after(masterListIndex === 1 ? [text] : [nodeLists.last(masterNodeList[masterListIndex - 1])], frag);
                        } else {
                            var el = nodeLists.first(masterNodeList[masterListIndex]);
                            can.insertBefore(el.parentNode, frag, el);
                        }
                        splice.apply(masterNodeList, [
                            masterListIndex,
                            0
                        ].concat(newNodeLists));
                        splice.apply(indexMap, [
                            index,
                            0
                        ].concat(newIndicies));
                        for (var i = index + newIndicies.length, len = indexMap.length; i < len; i++) {
                            indexMap[i](i);
                        }
                    }, remove = function (ev, items, index, duringTeardown, fullTeardown) {
                        if (!duringTeardown && data.teardownCheck(text.parentNode)) {
                            return;
                        }
                        if (index < 0) {
                            index = indexMap.length + index;
                        }
                        var removedMappings = masterNodeList.splice(index + 1, items.length), itemsToRemove = [];
                        can.each(removedMappings, function (nodeList) {
                            var nodesToRemove = nodeLists.unregister(nodeList);
                            [].push.apply(itemsToRemove, nodesToRemove);
                        });
                        indexMap.splice(index, items.length);
                        for (var i = index, len = indexMap.length; i < len; i++) {
                            indexMap[i](i);
                        }
                        if (!fullTeardown) {
                            can.remove(can.$(itemsToRemove));
                        }
                    }, text = document.createTextNode(''), list, teardownList = function (fullTeardown) {
                        if (list && list.unbind) {
                            list.unbind('add', add).unbind('remove', remove);
                        }
                        remove({}, { length: masterNodeList.length - 1 }, 0, true, fullTeardown);
                    }, updateList = function (ev, newList, oldList) {
                        teardownList();
                        list = newList || [];
                        if (list.bind) {
                            list.bind('add', add).bind('remove', remove);
                        }
                        add({}, list, 0);
                    };
                parentNode = elements.getParentNode(el, parentNode);
                var data = setup(parentNode, function () {
                        if (can.isFunction(compute)) {
                            compute.bind('change', updateList);
                        }
                    }, function () {
                        if (can.isFunction(compute)) {
                            compute.unbind('change', updateList);
                        }
                        teardownList(true);
                    });
                if (!nodeList) {
                    live.replace(masterNodeList, text, data.teardownCheck);
                } else {
                    elements.replace(masterNodeList, text);
                    nodeLists.update(masterNodeList, [text]);
                    nodeList.unregistered = data.teardownCheck;
                }
                updateList({}, can.isFunction(compute) ? compute() : compute);
            },
            html: function (el, compute, parentNode, nodeList) {
                var data;
                parentNode = elements.getParentNode(el, parentNode);
                data = listen(parentNode, compute, function (ev, newVal, oldVal) {
                    var attached = nodeLists.first(nodes).parentNode;
                    if (attached) {
                        makeAndPut(newVal);
                    }
                    data.teardownCheck(nodeLists.first(nodes).parentNode);
                });
                var nodes = nodeList || [el], makeAndPut = function (val) {
                        var isString = !isNode(val), frag = can.frag(val), oldNodes = can.makeArray(nodes);
                        addTextNodeIfNoChildren(frag);
                        if (isString) {
                            frag = can.view.hookup(frag, parentNode);
                        }
                        oldNodes = nodeLists.update(nodes, frag.childNodes);
                        elements.replace(oldNodes, frag);
                    };
                data.nodeList = nodes;
                if (!nodeList) {
                    nodeLists.register(nodes, data.teardownCheck);
                } else {
                    nodeList.unregistered = data.teardownCheck;
                }
                makeAndPut(compute());
            },
            replace: function (nodes, val, teardown) {
                var oldNodes = nodes.slice(0), frag = can.frag(val);
                nodeLists.register(nodes, teardown);
                if (typeof val === 'string') {
                    frag = can.view.hookup(frag, nodes[0].parentNode);
                }
                nodeLists.update(nodes, frag.childNodes);
                elements.replace(oldNodes, frag);
                return nodes;
            },
            text: function (el, compute, parentNode, nodeList) {
                var parent = elements.getParentNode(el, parentNode);
                var data = listen(parent, compute, function (ev, newVal, oldVal) {
                        if (typeof node.nodeValue !== 'unknown') {
                            node.nodeValue = can.view.toStr(newVal);
                        }
                        data.teardownCheck(node.parentNode);
                    });
                var node = document.createTextNode(can.view.toStr(compute()));
                if (nodeList) {
                    nodeList.unregistered = data.teardownCheck;
                    data.nodeList = nodeList;
                    nodeLists.update(nodeList, [node]);
                    elements.replace([el], node);
                } else {
                    data.nodeList = live.replace([el], node, data.teardownCheck);
                }
            },
            setAttributes: function (el, newVal) {
                var attrs = getAttributeParts(newVal);
                for (var name in attrs) {
                    can.attr.set(el, name, attrs[name]);
                }
            },
            attributes: function (el, compute, currentValue) {
                var oldAttrs = {};
                var setAttrs = function (newVal) {
                    var newAttrs = getAttributeParts(newVal), name;
                    for (name in newAttrs) {
                        var newValue = newAttrs[name], oldValue = oldAttrs[name];
                        if (newValue !== oldValue) {
                            can.attr.set(el, name, newValue);
                        }
                        delete oldAttrs[name];
                    }
                    for (name in oldAttrs) {
                        elements.removeAttr(el, name);
                    }
                    oldAttrs = newAttrs;
                };
                listen(el, compute, function (ev, newVal) {
                    setAttrs(newVal);
                });
                if (arguments.length >= 3) {
                    oldAttrs = getAttributeParts(currentValue);
                } else {
                    setAttrs(compute());
                }
            },
            attributePlaceholder: '__!!__',
            attributeReplace: /__!!__/g,
            attribute: function (el, attributeName, compute) {
                listen(el, compute, function (ev, newVal) {
                    elements.setAttr(el, attributeName, hook.render());
                });
                var wrapped = can.$(el), hooks;
                hooks = can.data(wrapped, 'hooks');
                if (!hooks) {
                    can.data(wrapped, 'hooks', hooks = {});
                }
                var attr = elements.getAttr(el, attributeName), parts = attr.split(live.attributePlaceholder), goodParts = [], hook;
                goodParts.push(parts.shift(), parts.join(live.attributePlaceholder));
                if (hooks[attributeName]) {
                    hooks[attributeName].computes.push(compute);
                } else {
                    hooks[attributeName] = {
                        render: function () {
                            var i = 0, newAttr = attr ? attr.replace(live.attributeReplace, function () {
                                    return elements.contentText(hook.computes[i++]());
                                }) : elements.contentText(hook.computes[i++]());
                            return newAttr;
                        },
                        computes: [compute],
                        batchNum: undefined
                    };
                }
                hook = hooks[attributeName];
                goodParts.splice(1, 0, compute());
                elements.setAttr(el, attributeName, goodParts.join(''));
            },
            specialAttribute: function (el, attributeName, compute) {
                listen(el, compute, function (ev, newVal) {
                    elements.setAttr(el, attributeName, getValue(newVal));
                });
                elements.setAttr(el, attributeName, getValue(compute()));
            },
            simpleAttribute: function (el, attributeName, compute) {
                listen(el, compute, function (ev, newVal) {
                    elements.setAttr(el, attributeName, newVal);
                });
                elements.setAttr(el, attributeName, compute());
            }
        };
    live.attr = live.simpleAttribute;
    live.attrs = live.attributes;
    var newLine = /(\r|\n)+/g;
    var getValue = function (val) {
        var regexp = /^["'].*["']$/;
        val = val.replace(elements.attrReg, '').replace(newLine, '');
        return regexp.test(val) ? val.substr(1, val.length - 2) : val;
    };
    can.view.live = live;
    return live;
});
/*can/view/render*/
define('can/view/render', [
    'can/view/view',
    './elements',
    'can/view/live/live',
    'can/util/string/string'
], function (can, elements, live) {
    var pendingHookups = [], tagChildren = function (tagName) {
            var newTag = elements.tagMap[tagName] || 'span';
            if (newTag === 'span') {
                return '@@!!@@';
            }
            return '<' + newTag + '>' + tagChildren(newTag) + '</' + newTag + '>';
        }, contentText = function (input, tag) {
            if (typeof input === 'string') {
                return input;
            }
            if (!input && input !== 0) {
                return '';
            }
            var hook = input.hookup && function (el, id) {
                    input.hookup.call(input, el, id);
                } || typeof input === 'function' && input;
            if (hook) {
                if (tag) {
                    return '<' + tag + ' ' + can.view.hook(hook) + '></' + tag + '>';
                } else {
                    pendingHookups.push(hook);
                }
                return '';
            }
            return '' + input;
        }, contentEscape = function (txt, tag) {
            return typeof txt === 'string' || typeof txt === 'number' ? can.esc(txt) : contentText(txt, tag);
        }, withinTemplatedSectionWithinAnElement = false, emptyHandler = function () {
        };
    var lastHookups;
    can.extend(can.view, {
        live: live,
        setupLists: function () {
            var old = can.view.lists, data;
            can.view.lists = function (list, renderer) {
                data = {
                    list: list,
                    renderer: renderer
                };
                return Math.random();
            };
            return function () {
                can.view.lists = old;
                return data;
            };
        },
        getHooks: function () {
            var hooks = pendingHookups.slice(0);
            lastHookups = hooks;
            pendingHookups = [];
            return hooks;
        },
        onlytxt: function (self, func) {
            return contentEscape(func.call(self));
        },
        txt: function (escape, tagName, status, self, func) {
            var tag = elements.tagMap[tagName] || 'span', setupLiveBinding = false, value, listData, compute, unbind = emptyHandler, attributeName;
            if (withinTemplatedSectionWithinAnElement) {
                value = func.call(self);
            } else {
                if (typeof status === 'string' || status === 1) {
                    withinTemplatedSectionWithinAnElement = true;
                }
                var listTeardown = can.view.setupLists();
                unbind = function () {
                    compute.unbind('change', emptyHandler);
                };
                compute = can.compute(func, self, false);
                compute.bind('change', emptyHandler);
                listData = listTeardown();
                value = compute();
                withinTemplatedSectionWithinAnElement = false;
                setupLiveBinding = compute.hasDependencies;
            }
            if (listData) {
                unbind();
                return '<' + tag + can.view.hook(function (el, parentNode) {
                    live.list(el, listData.list, listData.renderer, self, parentNode);
                }) + '></' + tag + '>';
            }
            if (!setupLiveBinding || typeof value === 'function') {
                unbind();
                return (withinTemplatedSectionWithinAnElement || escape === 2 || !escape ? contentText : contentEscape)(value, status === 0 && tag);
            }
            var contentProp = elements.tagToContentPropMap[tagName];
            if (status === 0 && !contentProp) {
                return '<' + tag + can.view.hook(escape && typeof value !== 'object' ? function (el, parentNode) {
                    live.text(el, compute, parentNode);
                    unbind();
                } : function (el, parentNode) {
                    live.html(el, compute, parentNode);
                    unbind();
                }) + '>' + tagChildren(tag) + '</' + tag + '>';
            } else if (status === 1) {
                pendingHookups.push(function (el) {
                    live.attributes(el, compute, compute());
                    unbind();
                });
                return compute();
            } else if (escape === 2) {
                attributeName = status;
                pendingHookups.push(function (el) {
                    live.specialAttribute(el, attributeName, compute);
                    unbind();
                });
                return compute();
            } else {
                attributeName = status === 0 ? contentProp : status;
                (status === 0 ? lastHookups : pendingHookups).push(function (el) {
                    live.attribute(el, attributeName, compute);
                    unbind();
                });
                return live.attributePlaceholder;
            }
        }
    });
    return can;
});
/*can/view/bindings/bindings*/
define('can/view/bindings/bindings', [
    'can/util/util',
    'can/view/callbacks/callbacks',
    'can/control/control'
], function (can) {
    var isContentEditable = function () {
            var values = {
                    '': true,
                    'true': true,
                    'false': false
                };
            var editable = function (el) {
                if (!el || !el.getAttribute) {
                    return;
                }
                var attr = el.getAttribute('contenteditable');
                return values[attr];
            };
            return function (el) {
                var val = editable(el);
                if (typeof val === 'boolean') {
                    return val;
                } else {
                    return !!editable(el.parentNode);
                }
            };
        }(), removeCurly = function (value) {
            if (value[0] === '{' && value[value.length - 1] === '}') {
                return value.substr(1, value.length - 2);
            }
            return value;
        };
    can.view.attr('can-value', function (el, data) {
        var attr = removeCurly(el.getAttribute('can-value')), value = data.scope.computeData(attr, { args: [] }).compute, trueValue, falseValue;
        if (el.nodeName.toLowerCase() === 'input') {
            if (el.type === 'checkbox') {
                if (can.attr.has(el, 'can-true-value')) {
                    trueValue = el.getAttribute('can-true-value');
                } else {
                    trueValue = true;
                }
                if (can.attr.has(el, 'can-false-value')) {
                    falseValue = el.getAttribute('can-false-value');
                } else {
                    falseValue = false;
                }
            }
            if (el.type === 'checkbox' || el.type === 'radio') {
                new Checked(el, {
                    value: value,
                    trueValue: trueValue,
                    falseValue: falseValue
                });
                return;
            }
        }
        if (el.nodeName.toLowerCase() === 'select' && el.multiple) {
            new Multiselect(el, { value: value });
            return;
        }
        if (isContentEditable(el)) {
            new Content(el, { value: value });
            return;
        }
        new Value(el, { value: value });
    });
    var special = {
            enter: function (data, el, original) {
                return {
                    event: 'keyup',
                    handler: function (ev) {
                        if (ev.keyCode === 13) {
                            return original.call(this, ev);
                        }
                    }
                };
            }
        };
    can.view.attr(/can-[\w\.]+/, function (el, data) {
        var attributeName = data.attributeName, event = attributeName.substr('can-'.length), handler = function (ev) {
                var attr = removeCurly(el.getAttribute(attributeName)), scopeData = data.scope.read(attr, {
                        returnObserveMethods: true,
                        isArgument: true
                    });
                return scopeData.value.call(scopeData.parent, data.scope._context, can.$(this), ev);
            };
        if (special[event]) {
            var specialData = special[event](data, el, handler);
            handler = specialData.handler;
            event = specialData.event;
        }
        can.bind.call(el, event, handler);
    });
    var Value = can.Control.extend({
            init: function () {
                if (this.element[0].nodeName.toUpperCase() === 'SELECT') {
                    setTimeout(can.proxy(this.set, this), 1);
                } else {
                    this.set();
                }
            },
            '{value} change': 'set',
            set: function () {
                if (!this.element) {
                    return;
                }
                var val = this.options.value();
                this.element[0].value = val == null ? '' : val;
            },
            'change': function () {
                if (!this.element) {
                    return;
                }
                this.options.value(this.element[0].value);
            }
        }), Checked = can.Control.extend({
            init: function () {
                this.isCheckbox = this.element[0].type.toLowerCase() === 'checkbox';
                this.check();
            },
            '{value} change': 'check',
            check: function () {
                if (this.isCheckbox) {
                    var value = this.options.value(), trueValue = this.options.trueValue || true;
                    this.element[0].checked = value === trueValue;
                } else {
                    var setOrRemove = this.options.value() == this.element[0].value ? 'set' : 'remove';
                    can.attr[setOrRemove](this.element[0], 'checked', true);
                }
            },
            'change': function () {
                if (this.isCheckbox) {
                    this.options.value(this.element[0].checked ? this.options.trueValue : this.options.falseValue);
                } else {
                    if (this.element[0].checked) {
                        this.options.value(this.element[0].value);
                    }
                }
            }
        }), Multiselect = Value.extend({
            init: function () {
                this.delimiter = ';';
                this.set();
            },
            set: function () {
                var newVal = this.options.value();
                if (typeof newVal === 'string') {
                    newVal = newVal.split(this.delimiter);
                    this.isString = true;
                } else if (newVal) {
                    newVal = can.makeArray(newVal);
                }
                var isSelected = {};
                can.each(newVal, function (val) {
                    isSelected[val] = true;
                });
                can.each(this.element[0].childNodes, function (option) {
                    if (option.value) {
                        option.selected = !!isSelected[option.value];
                    }
                });
            },
            get: function () {
                var values = [], children = this.element[0].childNodes;
                can.each(children, function (child) {
                    if (child.selected && child.value) {
                        values.push(child.value);
                    }
                });
                return values;
            },
            'change': function () {
                var value = this.get(), currentValue = this.options.value();
                if (this.isString || typeof currentValue === 'string') {
                    this.isString = true;
                    this.options.value(value.join(this.delimiter));
                } else if (currentValue instanceof can.List) {
                    currentValue.attr(value, true);
                } else {
                    this.options.value(value);
                }
            }
        }), Content = can.Control.extend({
            init: function () {
                this.set();
                this.on('blur', 'setValue');
            },
            '{value} change': 'set',
            set: function () {
                var val = this.options.value();
                this.element[0].innerHTML = typeof val === 'undefined' ? '' : val;
            },
            setValue: function () {
                this.options.value(this.element[0].innerHTML);
            }
        });
});
/*can/view/mustache/mustache*/
define('can/view/mustache/mustache', [
    'can/util/util',
    'can/view/scope/scope',
    'can/view/view',
    'can/view/scanner',
    'can/compute/compute',
    'can/view/render',
    'can/view/bindings/bindings'
], function (can) {
    can.view.ext = '.mustache';
    var SCOPE = 'scope', HASH = '___h4sh', CONTEXT_OBJ = '{scope:' + SCOPE + ',options:options}', SPECIAL_CONTEXT_OBJ = '{scope:' + SCOPE + ',options:options, special: true}', ARG_NAMES = SCOPE + ',options', argumentsRegExp = /((([^'"\s]+?=)?('.*?'|".*?"))|.*?)\s/g, literalNumberStringBooleanRegExp = /^(('.*?'|".*?"|[0-9]+\.?[0-9]*|true|false|null|undefined)|((.+?)=(('.*?'|".*?"|[0-9]+\.?[0-9]*|true|false)|(.+))))$/, makeLookupLiteral = function (type) {
            return '{get:"' + type.replace(/"/g, '\\"') + '"}';
        }, isLookup = function (obj) {
            return obj && typeof obj.get === 'string';
        }, isObserveLike = function (obj) {
            return obj instanceof can.Map || obj && !!obj._get;
        }, isArrayLike = function (obj) {
            return obj && obj.splice && typeof obj.length === 'number';
        }, makeConvertToScopes = function (original, scope, options) {
            var originalWithScope = function (ctx, opts) {
                return original(ctx || scope, opts);
            };
            return function (updatedScope, updatedOptions) {
                if (updatedScope !== undefined && !(updatedScope instanceof can.view.Scope)) {
                    updatedScope = scope.add(updatedScope);
                }
                if (updatedOptions !== undefined && !(updatedOptions instanceof can.view.Options)) {
                    updatedOptions = options.add(updatedOptions);
                }
                return originalWithScope(updatedScope, updatedOptions || options);
            };
        };
    var Mustache = function (options, helpers) {
        if (this.constructor !== Mustache) {
            var mustache = new Mustache(options);
            return function (data, options) {
                return mustache.render(data, options);
            };
        }
        if (typeof options === 'function') {
            this.template = { fn: options };
            return;
        }
        can.extend(this, options);
        this.template = this.scanner.scan(this.text, this.name);
    };
    can.Mustache = can.global.Mustache = Mustache;
    Mustache.prototype.render = function (data, options) {
        if (!(data instanceof can.view.Scope)) {
            data = new can.view.Scope(data || {});
        }
        if (!(options instanceof can.view.Options)) {
            options = new can.view.Options(options || {});
        }
        options = options || {};
        return this.template.fn.call(data, data, options);
    };
    can.extend(Mustache.prototype, {
        scanner: new can.view.Scanner({
            text: {
                start: '',
                scope: SCOPE,
                options: ',options: options',
                argNames: ARG_NAMES
            },
            tokens: [
                [
                    'returnLeft',
                    '{{{',
                    '{{[{&]'
                ],
                [
                    'commentFull',
                    '{{!}}',
                    '^[\\s\\t]*{{!.+?}}\\n'
                ],
                [
                    'commentLeft',
                    '{{!',
                    '(\\n[\\s\\t]*{{!|{{!)'
                ],
                [
                    'escapeFull',
                    '{{}}',
                    '(^[\\s\\t]*{{[#/^][^}]+?}}\\n|\\n[\\s\\t]*{{[#/^][^}]+?}}\\n|\\n[\\s\\t]*{{[#/^][^}]+?}}$)',
                    function (content) {
                        return {
                            before: /^\n.+?\n$/.test(content) ? '\n' : '',
                            content: content.match(/\{\{(.+?)\}\}/)[1] || ''
                        };
                    }
                ],
                [
                    'escapeLeft',
                    '{{'
                ],
                [
                    'returnRight',
                    '}}}'
                ],
                [
                    'right',
                    '}}'
                ]
            ],
            helpers: [
                {
                    name: /^>[\s]*\w*/,
                    fn: function (content, cmd) {
                        var templateName = can.trim(content.replace(/^>\s?/, '')).replace(/["|']/g, '');
                        return 'can.Mustache.renderPartial(\'' + templateName + '\',' + ARG_NAMES + ')';
                    }
                },
                {
                    name: /^\s*data\s/,
                    fn: function (content, cmd) {
                        var attr = content.match(/["|'](.*)["|']/)[1];
                        return 'can.proxy(function(__){' + 'can.data(can.$(__),\'' + attr + '\', this.attr(\'.\')); }, ' + SCOPE + ')';
                    }
                },
                {
                    name: /\s*\(([\$\w]+)\)\s*->([^\n]*)/,
                    fn: function (content) {
                        var quickFunc = /\s*\(([\$\w]+)\)\s*->([^\n]*)/, parts = content.match(quickFunc);
                        return 'can.proxy(function(__){var ' + parts[1] + '=can.$(__);with(' + SCOPE + '.attr(\'.\')){' + parts[2] + '}}, this);';
                    }
                },
                {
                    name: /^.*$/,
                    fn: function (content, cmd) {
                        var mode = false, result = {
                                content: '',
                                startTxt: false,
                                startOnlyTxt: false,
                                end: false
                            };
                        content = can.trim(content);
                        if (content.length && (mode = content.match(/^([#^/]|else$)/))) {
                            mode = mode[0];
                            switch (mode) {
                            case '#':
                            case '^':
                                if (cmd.specialAttribute) {
                                    result.startOnlyTxt = true;
                                } else {
                                    result.startTxt = true;
                                    result.escaped = 0;
                                }
                                break;
                            case '/':
                                result.end = true;
                                result.content += 'return ___v1ew.join("");}}])';
                                return result;
                            }
                            content = content.substring(1);
                        }
                        if (mode !== 'else') {
                            var args = [], hashes = [], i = 0, m;
                            result.content += 'can.Mustache.txt(\n' + (cmd.specialAttribute ? SPECIAL_CONTEXT_OBJ : CONTEXT_OBJ) + ',\n' + (mode ? '"' + mode + '"' : 'null') + ',';
                            (can.trim(content) + ' ').replace(argumentsRegExp, function (whole, arg) {
                                if (i && (m = arg.match(literalNumberStringBooleanRegExp))) {
                                    if (m[2]) {
                                        args.push(m[0]);
                                    } else {
                                        hashes.push(m[4] + ':' + (m[6] ? m[6] : makeLookupLiteral(m[5])));
                                    }
                                } else {
                                    args.push(makeLookupLiteral(arg));
                                }
                                i++;
                            });
                            result.content += args.join(',');
                            if (hashes.length) {
                                result.content += ',{' + HASH + ':{' + hashes.join(',') + '}}';
                            }
                        }
                        if (mode && mode !== 'else') {
                            result.content += ',[\n\n';
                        }
                        switch (mode) {
                        case '^':
                        case '#':
                            result.content += '{fn:function(' + ARG_NAMES + '){var ___v1ew = [];';
                            break;
                        case 'else':
                            result.content += 'return ___v1ew.join("");}},\n{inverse:function(' + ARG_NAMES + '){\nvar ___v1ew = [];';
                            break;
                        default:
                            result.content += ')';
                            break;
                        }
                        if (!mode) {
                            result.startTxt = true;
                            result.end = true;
                        }
                        return result;
                    }
                }
            ]
        })
    });
    var helpers = can.view.Scanner.prototype.helpers;
    for (var i = 0; i < helpers.length; i++) {
        Mustache.prototype.scanner.helpers.unshift(helpers[i]);
    }
    Mustache.txt = function (scopeAndOptions, mode, name) {
        var scope = scopeAndOptions.scope, options = scopeAndOptions.options, args = [], helperOptions = {
                fn: function () {
                },
                inverse: function () {
                }
            }, hash, context = scope.attr('.'), getHelper = true, helper;
        for (var i = 3; i < arguments.length; i++) {
            var arg = arguments[i];
            if (mode && can.isArray(arg)) {
                helperOptions = can.extend.apply(can, [helperOptions].concat(arg));
            } else if (arg && arg[HASH]) {
                hash = arg[HASH];
                for (var prop in hash) {
                    if (isLookup(hash[prop])) {
                        hash[prop] = Mustache.get(hash[prop].get, scopeAndOptions, false, true);
                    }
                }
            } else if (arg && isLookup(arg)) {
                args.push(Mustache.get(arg.get, scopeAndOptions, false, true, true));
            } else {
                args.push(arg);
            }
        }
        if (isLookup(name)) {
            var get = name.get;
            name = Mustache.get(name.get, scopeAndOptions, args.length, false);
            getHelper = get === name;
        }
        helperOptions.fn = makeConvertToScopes(helperOptions.fn, scope, options);
        helperOptions.inverse = makeConvertToScopes(helperOptions.inverse, scope, options);
        if (mode === '^') {
            var tmp = helperOptions.fn;
            helperOptions.fn = helperOptions.inverse;
            helperOptions.inverse = tmp;
        }
        if (helper = getHelper && (typeof name === 'string' && Mustache.getHelper(name, options)) || can.isFunction(name) && !name.isComputed && { fn: name }) {
            can.extend(helperOptions, {
                context: context,
                scope: scope,
                contexts: scope,
                hash: hash
            });
            args.push(helperOptions);
            return function () {
                return helper.fn.apply(context, args) || '';
            };
        }
        return function () {
            var value;
            if (can.isFunction(name) && name.isComputed) {
                value = name();
            } else {
                value = name;
            }
            var validArgs = args.length ? args : [value], valid = true, result = [], i, argIsObserve, arg;
            if (mode) {
                for (i = 0; i < validArgs.length; i++) {
                    arg = validArgs[i];
                    argIsObserve = typeof arg !== 'undefined' && isObserveLike(arg);
                    if (isArrayLike(arg)) {
                        if (mode === '#') {
                            valid = valid && !!(argIsObserve ? arg.attr('length') : arg.length);
                        } else if (mode === '^') {
                            valid = valid && !(argIsObserve ? arg.attr('length') : arg.length);
                        }
                    } else {
                        valid = mode === '#' ? valid && !!arg : mode === '^' ? valid && !arg : valid;
                    }
                }
            }
            if (valid) {
                if (mode === '#') {
                    if (isArrayLike(value)) {
                        var isObserveList = isObserveLike(value);
                        for (i = 0; i < value.length; i++) {
                            result.push(helperOptions.fn(isObserveList ? value.attr('' + i) : value[i]));
                        }
                        return result.join('');
                    } else {
                        return helperOptions.fn(value || {}) || '';
                    }
                } else if (mode === '^') {
                    return helperOptions.inverse(value || {}) || '';
                } else {
                    return '' + (value != null ? value : '');
                }
            }
            return '';
        };
    };
    Mustache.get = function (key, scopeAndOptions, isHelper, isArgument, isLookup) {
        var context = scopeAndOptions.scope.attr('.'), options = scopeAndOptions.options || {};
        if (isHelper) {
            if (Mustache.getHelper(key, options)) {
                return key;
            }
            if (scopeAndOptions.scope && can.isFunction(context[key])) {
                return context[key];
            }
        }
        var computeData = scopeAndOptions.scope.computeData(key, {
                isArgument: isArgument,
                args: [
                    context,
                    scopeAndOptions.scope
                ]
            }), compute = computeData.compute;
        can.compute.temporarilyBind(compute);
        var initialValue = computeData.initialValue, helperObj = Mustache.getHelper(key, options);
        if (!isLookup && (initialValue === undefined || computeData.scope !== scopeAndOptions.scope) && Mustache.getHelper(key, options)) {
            return key;
        }
        if (!compute.hasDependencies) {
            return initialValue;
        } else {
            return compute;
        }
    };
    Mustache.resolve = function (value) {
        if (isObserveLike(value) && isArrayLike(value) && value.attr('length')) {
            return value;
        } else if (can.isFunction(value)) {
            return value();
        } else {
            return value;
        }
    };
    can.view.Options = can.view.Scope.extend({
        init: function (data, parent) {
            if (!data.helpers && !data.partials && !data.tags) {
                data = { helpers: data };
            }
            can.view.Scope.prototype.init.apply(this, arguments);
        }
    });
    Mustache._helpers = {};
    Mustache.registerHelper = function (name, fn) {
        this._helpers[name] = {
            name: name,
            fn: fn
        };
    };
    Mustache.getHelper = function (name, options) {
        var helper;
        if (options) {
            helper = options.attr('helpers.' + name);
        }
        return helper ? { fn: helper } : this._helpers[name];
    };
    Mustache.render = function (partial, scope, options) {
        if (!can.view.cached[partial]) {
            var reads = can.__clearReading();
            if (scope.attr('partial')) {
                partial = scope.attr('partial');
            }
            can.__setReading(reads);
        }
        return can.view.render(partial, scope, options);
    };
    Mustache.safeString = function (str) {
        return {
            toString: function () {
                return str;
            }
        };
    };
    Mustache.renderPartial = function (partialName, scope, options) {
        var partial = options.attr('partials.' + partialName);
        if (partial) {
            return partial.render ? partial.render(scope, options) : partial(scope, options);
        } else {
            return can.Mustache.render(partialName, scope, options);
        }
    };
    can.each({
        'if': function (expr, options) {
            var value;
            if (can.isFunction(expr)) {
                value = can.compute.truthy(expr)();
            } else {
                value = !!Mustache.resolve(expr);
            }
            if (value) {
                return options.fn(options.contexts || this);
            } else {
                return options.inverse(options.contexts || this);
            }
        },
        'unless': function (expr, options) {
            return Mustache._helpers['if'].fn.apply(this, [
                can.isFunction(expr) ? can.compute(function () {
                    return !expr();
                }) : !expr,
                options
            ]);
        },
        'each': function (expr, options) {
            var resolved = Mustache.resolve(expr), result = [], keys, key, i;
            if (can.view.lists && (resolved instanceof can.List || expr && expr.isComputed && resolved === undefined)) {
                return can.view.lists(expr, function (item, index) {
                    return options.fn(options.scope.add({ '@index': index }).add(item));
                });
            }
            expr = resolved;
            if (!!expr && isArrayLike(expr)) {
                for (i = 0; i < expr.length; i++) {
                    result.push(options.fn(options.scope.add({ '@index': i }).add(expr[i])));
                }
                return result.join('');
            } else if (isObserveLike(expr)) {
                keys = can.Map.keys(expr);
                for (i = 0; i < keys.length; i++) {
                    key = keys[i];
                    result.push(options.fn(options.scope.add({ '@key': key }).add(expr[key])));
                }
                return result.join('');
            } else if (expr instanceof Object) {
                for (key in expr) {
                    result.push(options.fn(options.scope.add({ '@key': key }).add(expr[key])));
                }
                return result.join('');
            }
        },
        'with': function (expr, options) {
            var ctx = expr;
            expr = Mustache.resolve(expr);
            if (!!expr) {
                return options.fn(ctx);
            }
        },
        'log': function (expr, options) {
            if (typeof console !== 'undefined' && console.log) {
                if (!options) {
                    console.log(expr.context);
                } else {
                    console.log(expr, options.context);
                }
            }
        },
        '@index': function (offset, options) {
            if (!options) {
                options = offset;
                offset = 0;
            }
            var index = options.scope.attr('@index');
            return '' + ((can.isFunction(index) ? index() : index) + offset);
        }
    }, function (fn, name) {
        Mustache.registerHelper(name, fn);
    });
    can.view.register({
        suffix: 'mustache',
        contentType: 'x-mustache-template',
        script: function (id, src) {
            return 'can.Mustache(function(' + ARG_NAMES + ') { ' + new Mustache({
                text: src,
                name: id
            }).template.out + ' })';
        },
        renderer: function (id, text) {
            return Mustache({
                text: text,
                name: id
            });
        }
    });
    can.mustache.registerHelper = can.proxy(can.Mustache.registerHelper, can.Mustache);
    can.mustache.safeString = can.Mustache.safeString;
    return can;
});
/*can/view/mustache/system*/
System.set('can/view/mustache/system', System.newModule({}));
/*can/util/array/makeArray*/
System.set('can/util/array/makeArray', System.newModule({}));
/*demo_frame.mustache!can/view/mustache/system*/
define('demo_frame.mustache!can/view/mustache/system', ['can/view/mustache/mustache'], function (can) {
    return can.view.preloadStringRenderer('demo_frame.mustache', can.Mustache(function (scope, options) {
        var ___v1ew = [];
        ___v1ew.push('<div class="demo">\n\t<ul>\n\t\t<li class="tab" data-tab="demo">Demo</li>\n\t\t<li class="tab" data-tab="html">HTML</li>\n\t\t<li class="tab" data-tab="js" ');
        ___v1ew.push(can.view.txt(2, 'li', 'style', this, function () {
            var ___v1ew = [];
            ___v1ew.push('style="');
            ___v1ew.push('display:none;"');
            return ___v1ew.join('');
        }));
        ___v1ew.push('>JS</li>\n\t</ul>\n\t<div class="tab-content" data-for="demo">\n\t\t<iframe src="');
        ___v1ew.push(can.view.txt(true, 'iframe', 'src', this, can.Mustache.txt({
            scope: scope,
            options: options
        }, null, { get: 'demoSrc' })));
        ___v1ew.push('"', can.view.pending({
            scope: scope,
            options: options
        }), '/>');
        ___v1ew.push('\n\t</div>\n\t<div class="tab-content" data-for="html">\n\t\t<pre class="prettyprint"></pre>\n\t</div>\n\t<div class="tab-content" data-for="js">\n\t\t<pre class="prettyprint lang-js"></pre>\n\t</div>\n</div>');
        ;
        return ___v1ew.join('');
    }));
});
/*can/util/domless/domless*/
System.set('can/util/domless/domless', System.newModule({}));
/*prettify*/
System.define('prettify','!function(){var q=null;window.PR_SHOULD_USE_CONTINUATION=!0;\n	(function(){function S(a){function d(e){var b=e.charCodeAt(0);if(b!==92)return b;var a=e.charAt(1);return(b=r[a])?b:\"0\"<=a&&a<=\"7\"?parseInt(e.substring(1),8):a===\"u\"||a===\"x\"?parseInt(e.substring(2),16):e.charCodeAt(1)}function g(e){if(e<32)return(e<16?\"\\\\x0\":\"\\\\x\")+e.toString(16);e=String.fromCharCode(e);return e===\"\\\\\"||e===\"-\"||e===\"]\"||e===\"^\"?\"\\\\\"+e:e}function b(e){var b=e.substring(1,e.length-1).match(/\\\\u[\\dA-Fa-f]{4}|\\\\x[\\dA-Fa-f]{2}|\\\\[0-3][0-7]{0,2}|\\\\[0-7]{1,2}|\\\\[\\S\\s]|[^\\\\]/g),e=[],a=\n		b[0]===\"^\",c=[\"[\"];a&&c.push(\"^\");for(var a=a?1:0,f=b.length;a<f;++a){var h=b[a];if(/\\\\[bdsw]/i.test(h))c.push(h);else{var h=d(h),l;a+2<f&&\"-\"===b[a+1]?(l=d(b[a+2]),a+=2):l=h;e.push([h,l]);l<65||h>122||(l<65||h>90||e.push([Math.max(65,h)|32,Math.min(l,90)|32]),l<97||h>122||e.push([Math.max(97,h)&-33,Math.min(l,122)&-33]))}}e.sort(function(e,a){return e[0]-a[0]||a[1]-e[1]});b=[];f=[];for(a=0;a<e.length;++a)h=e[a],h[0]<=f[1]+1?f[1]=Math.max(f[1],h[1]):b.push(f=h);for(a=0;a<b.length;++a)h=b[a],c.push(g(h[0])),\n		h[1]>h[0]&&(h[1]+1>h[0]&&c.push(\"-\"),c.push(g(h[1])));c.push(\"]\");return c.join(\"\")}function s(e){for(var a=e.source.match(/\\[(?:[^\\\\\\]]|\\\\[\\S\\s])*]|\\\\u[\\dA-Fa-f]{4}|\\\\x[\\dA-Fa-f]{2}|\\\\\\d+|\\\\[^\\dux]|\\(\\?[!:=]|[()^]|[^()[\\\\^]+/g),c=a.length,d=[],f=0,h=0;f<c;++f){var l=a[f];l===\"(\"?++h:\"\\\\\"===l.charAt(0)&&(l=+l.substring(1))&&(l<=h?d[l]=-1:a[f]=g(l))}for(f=1;f<d.length;++f)-1===d[f]&&(d[f]=++x);for(h=f=0;f<c;++f)l=a[f],l===\"(\"?(++h,d[h]||(a[f]=\"(?:\")):\"\\\\\"===l.charAt(0)&&(l=+l.substring(1))&&l<=h&&\n		(a[f]=\"\\\\\"+d[l]);for(f=0;f<c;++f)\"^\"===a[f]&&\"^\"!==a[f+1]&&(a[f]=\"\");if(e.ignoreCase&&m)for(f=0;f<c;++f)l=a[f],e=l.charAt(0),l.length>=2&&e===\"[\"?a[f]=b(l):e!==\"\\\\\"&&(a[f]=l.replace(/[A-Za-z]/g,function(a){a=a.charCodeAt(0);return\"[\"+String.fromCharCode(a&-33,a|32)+\"]\"}));return a.join(\"\")}for(var x=0,m=!1,j=!1,k=0,c=a.length;k<c;++k){var i=a[k];if(i.ignoreCase)j=!0;else if(/[a-z]/i.test(i.source.replace(/\\\\u[\\da-f]{4}|\\\\x[\\da-f]{2}|\\\\[^UXux]/gi,\"\"))){m=!0;j=!1;break}}for(var r={b:8,t:9,n:10,v:11,\n		f:12,r:13},n=[],k=0,c=a.length;k<c;++k){i=a[k];if(i.global||i.multiline)throw Error(\"\"+i);n.push(\"(?:\"+s(i)+\")\")}return RegExp(n.join(\"|\"),j?\"gi\":\"g\")}function T(a,d){function g(a){var c=a.nodeType;if(c==1){if(!b.test(a.className)){for(c=a.firstChild;c;c=c.nextSibling)g(c);c=a.nodeName.toLowerCase();if(\"br\"===c||\"li\"===c)s[j]=\"\\n\",m[j<<1]=x++,m[j++<<1|1]=a}}else if(c==3||c==4)c=a.nodeValue,c.length&&(c=d?c.replace(/\\r\\n?/g,\"\\n\"):c.replace(/[\\t\\n\\r ]+/g,\" \"),s[j]=c,m[j<<1]=x,x+=c.length,m[j++<<1|1]=\n		a)}var b=/(?:^|\\s)nocode(?:\\s|$)/,s=[],x=0,m=[],j=0;g(a);return{a:s.join(\"\").replace(/\\n$/,\"\"),d:m}}function H(a,d,g,b){d&&(a={a:d,e:a},g(a),b.push.apply(b,a.g))}function U(a){for(var d=void 0,g=a.firstChild;g;g=g.nextSibling)var b=g.nodeType,d=b===1?d?a:g:b===3?V.test(g.nodeValue)?a:d:d;return d===a?void 0:d}function C(a,d){function g(a){for(var j=a.e,k=[j,\"pln\"],c=0,i=a.a.match(s)||[],r={},n=0,e=i.length;n<e;++n){var z=i[n],w=r[z],t=void 0,f;if(typeof w===\"string\")f=!1;else{var h=b[z.charAt(0)];\n		if(h)t=z.match(h[1]),w=h[0];else{for(f=0;f<x;++f)if(h=d[f],t=z.match(h[1])){w=h[0];break}t||(w=\"pln\")}if((f=w.length>=5&&\"lang-\"===w.substring(0,5))&&!(t&&typeof t[1]===\"string\"))f=!1,w=\"src\";f||(r[z]=w)}h=c;c+=z.length;if(f){f=t[1];var l=z.indexOf(f),B=l+f.length;t[2]&&(B=z.length-t[2].length,l=B-f.length);w=w.substring(5);H(j+h,z.substring(0,l),g,k);H(j+h+l,f,I(w,f),k);H(j+h+B,z.substring(B),g,k)}else k.push(j+h,w)}a.g=k}var b={},s;(function(){for(var g=a.concat(d),j=[],k={},c=0,i=g.length;c<i;++c){var r=\n		g[c],n=r[3];if(n)for(var e=n.length;--e>=0;)b[n.charAt(e)]=r;r=r[1];n=\"\"+r;k.hasOwnProperty(n)||(j.push(r),k[n]=q)}j.push(/[\\S\\s]/);s=S(j)})();var x=d.length;return g}function v(a){var d=[],g=[];a.tripleQuotedStrings?d.push([\"str\",/^(?:\'\'\'(?:[^\'\\\\]|\\\\[\\S\\s]|\'\'?(?=[^\']))*(?:\'\'\'|$)|\"\"\"(?:[^\"\\\\]|\\\\[\\S\\s]|\"\"?(?=[^\"]))*(?:\"\"\"|$)|\'(?:[^\'\\\\]|\\\\[\\S\\s])*(?:\'|$)|\"(?:[^\"\\\\]|\\\\[\\S\\s])*(?:\"|$))/,q,\"\'\\\"\"]):a.multiLineStrings?d.push([\"str\",/^(?:\'(?:[^\'\\\\]|\\\\[\\S\\s])*(?:\'|$)|\"(?:[^\"\\\\]|\\\\[\\S\\s])*(?:\"|$)|`(?:[^\\\\`]|\\\\[\\S\\s])*(?:`|$))/,\n		q,\"\'\\\"`\"]):d.push([\"str\",/^(?:\'(?:[^\\n\\r\'\\\\]|\\\\.)*(?:\'|$)|\"(?:[^\\n\\r\"\\\\]|\\\\.)*(?:\"|$))/,q,\"\\\"\'\"]);a.verbatimStrings&&g.push([\"str\",/^@\"(?:[^\"]|\"\")*(?:\"|$)/,q]);var b=a.hashComments;b&&(a.cStyleComments?(b>1?d.push([\"com\",/^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/,q,\"#\"]):d.push([\"com\",/^#(?:(?:define|e(?:l|nd)if|else|error|ifn?def|include|line|pragma|undef|warning)\\b|[^\\n\\r]*)/,q,\"#\"]),g.push([\"str\",/^<(?:(?:(?:\\.\\.\\/)*|\\/?)(?:[\\w-]+(?:\\/[\\w-]+)+)?[\\w-]+\\.h(?:h|pp|\\+\\+)?|[a-z]\\w*)>/,q])):d.push([\"com\",\n		/^#[^\\n\\r]*/,q,\"#\"]));a.cStyleComments&&(g.push([\"com\",/^\\/\\/[^\\n\\r]*/,q]),g.push([\"com\",/^\\/\\*[\\S\\s]*?(?:\\*\\/|$)/,q]));if(b=a.regexLiterals){var s=(b=b>1?\"\":\"\\n\\r\")?\".\":\"[\\\\S\\\\s]\";g.push([\"lang-regex\",RegExp(\"^(?:^^\\\\.?|[+-]|[!=]=?=?|\\\\#|%=?|&&?=?|\\\\(|\\\\*=?|[+\\\\-]=|->|\\\\/=?|::?|<<?=?|>>?>?=?|,|;|\\\\?|@|\\\\[|~|{|\\\\^\\\\^?=?|\\\\|\\\\|?=?|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\\\\s*(\"+(\"/(?=[^/*\"+b+\"])(?:[^/\\\\x5B\\\\x5C\"+b+\"]|\\\\x5C\"+s+\"|\\\\x5B(?:[^\\\\x5C\\\\x5D\"+b+\"]|\\\\x5C\"+\n		s+\")*(?:\\\\x5D|$))+/\")+\")\")])}(b=a.types)&&g.push([\"typ\",b]);b=(\"\"+a.keywords).replace(/^ | $/g,\"\");b.length&&g.push([\"kwd\",RegExp(\"^(?:\"+b.replace(/[\\s,]+/g,\"|\")+\")\\\\b\"),q]);d.push([\"pln\",/^\\s+/,q,\" \\r\\n\\t\\u00a0\"]);b=\"^.[^\\\\s\\\\w.$@\'\\\"`/\\\\\\\\]*\";a.regexLiterals&&(b+=\"(?!s*/)\");g.push([\"lit\",/^@[$_a-z][\\w$@]*/i,q],[\"typ\",/^(?:[@_]?[A-Z]+[a-z][\\w$@]*|\\w+_t\\b)/,q],[\"pln\",/^[$_a-z][\\w$@]*/i,q],[\"lit\",/^(?:0x[\\da-f]+|(?:\\d(?:_\\d+)*\\d*(?:\\.\\d*)?|\\.\\d\\+)(?:e[+-]?\\d+)?)[a-z]*/i,q,\"0123456789\"],[\"pln\",/^\\\\[\\S\\s]?/,\n		q],[\"pun\",RegExp(b),q]);return C(d,g)}function J(a,d,g){function b(a){var c=a.nodeType;if(c==1&&!x.test(a.className))if(\"br\"===a.nodeName)s(a),a.parentNode&&a.parentNode.removeChild(a);else for(a=a.firstChild;a;a=a.nextSibling)b(a);else if((c==3||c==4)&&g){var d=a.nodeValue,i=d.match(m);if(i)c=d.substring(0,i.index),a.nodeValue=c,(d=d.substring(i.index+i[0].length))&&a.parentNode.insertBefore(j.createTextNode(d),a.nextSibling),s(a),c||a.parentNode.removeChild(a)}}function s(a){function b(a,c){var d=\n		c?a.cloneNode(!1):a,e=a.parentNode;if(e){var e=b(e,1),g=a.nextSibling;e.appendChild(d);for(var i=g;i;i=g)g=i.nextSibling,e.appendChild(i)}return d}for(;!a.nextSibling;)if(a=a.parentNode,!a)return;for(var a=b(a.nextSibling,0),d;(d=a.parentNode)&&d.nodeType===1;)a=d;c.push(a)}for(var x=/(?:^|\\s)nocode(?:\\s|$)/,m=/\\r\\n?|\\n/,j=a.ownerDocument,k=j.createElement(\"li\");a.firstChild;)k.appendChild(a.firstChild);for(var c=[k],i=0;i<c.length;++i)b(c[i]);d===(d|0)&&c[0].setAttribute(\"value\",d);var r=j.createElement(\"ol\");\n		r.className=\"linenums\";for(var d=Math.max(0,d-1|0)||0,i=0,n=c.length;i<n;++i)k=c[i],k.className=\"L\"+(i+d)%10,k.firstChild||k.appendChild(j.createTextNode(\"\\u00a0\")),r.appendChild(k);a.appendChild(r)}function p(a,d){for(var g=d.length;--g>=0;){var b=d[g];F.hasOwnProperty(b)?D.console&&console.warn(\"cannot override language handler %s\",b):F[b]=a}}function I(a,d){if(!a||!F.hasOwnProperty(a))a=/^\\s*</.test(d)?\"default-markup\":\"default-code\";return F[a]}function K(a){var d=a.h;try{var g=T(a.c,a.i),b=g.a;\n		a.a=b;a.d=g.d;a.e=0;I(d,b)(a);var s=/\\bMSIE\\s(\\d+)/.exec(navigator.userAgent),s=s&&+s[1]<=8,d=/\\n/g,x=a.a,m=x.length,g=0,j=a.d,k=j.length,b=0,c=a.g,i=c.length,r=0;c[i]=m;var n,e;for(e=n=0;e<i;)c[e]!==c[e+2]?(c[n++]=c[e++],c[n++]=c[e++]):e+=2;i=n;for(e=n=0;e<i;){for(var p=c[e],w=c[e+1],t=e+2;t+2<=i&&c[t+1]===w;)t+=2;c[n++]=p;c[n++]=w;e=t}c.length=n;var f=a.c,h;if(f)h=f.style.display,f.style.display=\"none\";try{for(;b<k;){var l=j[b+2]||m,B=c[r+2]||m,t=Math.min(l,B),A=j[b+1],G;if(A.nodeType!==1&&(G=x.substring(g,\n			t))){s&&(G=G.replace(d,\"\\r\"));A.nodeValue=G;var L=A.ownerDocument,o=L.createElement(\"span\");o.className=c[r+1];var v=A.parentNode;v.replaceChild(o,A);o.appendChild(A);g<l&&(j[b+1]=A=L.createTextNode(x.substring(t,l)),v.insertBefore(A,o.nextSibling))}g=t;g>=l&&(b+=2);g>=B&&(r+=2)}}finally{if(f)f.style.display=h}}catch(u){D.console&&console.log(u&&u.stack||u)}}var D=window,y=[\"break,continue,do,else,for,if,return,while\"],E=[[y,\"auto,case,char,const,default,double,enum,extern,float,goto,inline,int,long,register,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile\"],\n			\"catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof\"],M=[E,\"alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,delegate,dynamic_cast,explicit,export,friend,generic,late_check,mutable,namespace,nullptr,property,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where\"],N=[E,\"abstract,assert,boolean,byte,extends,final,finally,implements,import,instanceof,interface,null,native,package,strictfp,super,synchronized,throws,transient\"],\n		O=[N,\"as,base,by,checked,decimal,delegate,descending,dynamic,event,fixed,foreach,from,group,implicit,in,internal,into,is,let,lock,object,out,override,orderby,params,partial,readonly,ref,sbyte,sealed,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,var,virtual,where\"],E=[E,\"debugger,eval,export,function,get,null,set,undefined,var,with,Infinity,NaN\"],P=[y,\"and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None\"],\n		Q=[y,\"alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END\"],W=[y,\"as,assert,const,copy,drop,enum,extern,fail,false,fn,impl,let,log,loop,match,mod,move,mut,priv,pub,pure,ref,self,static,struct,true,trait,type,unsafe,use\"],y=[y,\"case,done,elif,esac,eval,fi,function,in,local,set,then,until\"],R=/^(DIR|FILE|vector|(de|priority_)?queue|list|stack|(const_)?iterator|(multi)?(set|map)|bitset|u?(int|float)\\d*)\\b/,\n		V=/\\S/,X=v({keywords:[M,O,E,\"caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END\",P,Q,y],hashComments:!0,cStyleComments:!0,multiLineStrings:!0,regexLiterals:!0}),F={};p(X,[\"default-code\"]);p(C([],[[\"pln\",/^[^<?]+/],[\"dec\",/^<!\\w[^>]*(?:>|$)/],[\"com\",/^<\\!--[\\S\\s]*?(?:--\\>|$)/],[\"lang-\",/^<\\?([\\S\\s]+?)(?:\\?>|$)/],[\"lang-\",/^<%([\\S\\s]+?)(?:%>|$)/],[\"pun\",/^(?:<[%?]|[%?]>)/],[\"lang-\",\n		/^<xmp\\b[^>]*>([\\S\\s]+?)<\\/xmp\\b[^>]*>/i],[\"lang-js\",/^<script\\b[^>]*>([\\S\\s]*?)(<\\/script\\b[^>]*>)/i],[\"lang-css\",/^<style\\b[^>]*>([\\S\\s]*?)(<\\/style\\b[^>]*>)/i],[\"lang-in.tag\",/^(<\\/?[a-z][^<>]*>)/i]]),[\"default-markup\",\"htm\",\"html\",\"mxml\",\"xhtml\",\"xml\",\"xsl\"]);p(C([[\"pln\",/^\\s+/,q,\" \\t\\r\\n\"],[\"atv\",/^(?:\"[^\"]*\"?|\'[^\']*\'?)/,q,\"\\\"\'\"]],[[\"tag\",/^^<\\/?[a-z](?:[\\w-.:]*\\w)?|\\/?>$/i],[\"atn\",/^(?!style[\\s=]|on)[a-z](?:[\\w:-]*\\w)?/i],[\"lang-uq.val\",/^=\\s*([^\\s\"\'>]*(?:[^\\s\"\'/>]|\\/(?=\\s)))/],[\"pun\",/^[/<->]+/],\n		[\"lang-js\",/^on\\w+\\s*=\\s*\"([^\"]+)\"/i],[\"lang-js\",/^on\\w+\\s*=\\s*\'([^\']+)\'/i],[\"lang-js\",/^on\\w+\\s*=\\s*([^\\s\"\'>]+)/i],[\"lang-css\",/^style\\s*=\\s*\"([^\"]+)\"/i],[\"lang-css\",/^style\\s*=\\s*\'([^\']+)\'/i],[\"lang-css\",/^style\\s*=\\s*([^\\s\"\'>]+)/i]]),[\"in.tag\"]);p(C([],[[\"atv\",/^[\\S\\s]+/]]),[\"uq.val\"]);p(v({keywords:M,hashComments:!0,cStyleComments:!0,types:R}),[\"c\",\"cc\",\"cpp\",\"cxx\",\"cyc\",\"m\"]);p(v({keywords:\"null,true,false\"}),[\"json\"]);p(v({keywords:O,hashComments:!0,cStyleComments:!0,verbatimStrings:!0,types:R}),\n		[\"cs\"]);p(v({keywords:N,cStyleComments:!0}),[\"java\"]);p(v({keywords:y,hashComments:!0,multiLineStrings:!0}),[\"bash\",\"bsh\",\"csh\",\"sh\"]);p(v({keywords:P,hashComments:!0,multiLineStrings:!0,tripleQuotedStrings:!0}),[\"cv\",\"py\",\"python\"]);p(v({keywords:\"caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END\",hashComments:!0,multiLineStrings:!0,regexLiterals:2}),[\"perl\",\"pl\",\"pm\"]);p(v({keywords:Q,\n		hashComments:!0,multiLineStrings:!0,regexLiterals:!0}),[\"rb\",\"ruby\"]);p(v({keywords:E,cStyleComments:!0,regexLiterals:!0}),[\"javascript\",\"js\"]);p(v({keywords:\"all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,throw,true,try,unless,until,when,while,yes\",hashComments:3,cStyleComments:!0,multilineStrings:!0,tripleQuotedStrings:!0,regexLiterals:!0}),[\"coffee\"]);p(v({keywords:W,cStyleComments:!0,multilineStrings:!0}),[\"rc\",\"rs\",\"rust\"]);\n		p(C([],[[\"str\",/^[\\S\\s]+/]]),[\"regex\"]);var Y=D.PR={createSimpleLexer:C,registerLangHandler:p,sourceDecorator:v,PR_ATTRIB_NAME:\"atn\",PR_ATTRIB_VALUE:\"atv\",PR_COMMENT:\"com\",PR_DECLARATION:\"dec\",PR_KEYWORD:\"kwd\",PR_LITERAL:\"lit\",PR_NOCODE:\"nocode\",PR_PLAIN:\"pln\",PR_PUNCTUATION:\"pun\",PR_SOURCE:\"src\",PR_STRING:\"str\",PR_TAG:\"tag\",PR_TYPE:\"typ\",prettyPrintOne:D.prettyPrintOne=function(a,d,g){var b=document.createElement(\"div\");b.innerHTML=\"<pre>\"+a+\"</pre>\";b=b.firstChild;g&&J(b,g,!0);K({h:d,j:g,c:b,i:1});\n			return b.innerHTML},prettyPrint:D.prettyPrint=function(a,d){function g(){for(var b=D.PR_SHOULD_USE_CONTINUATION?c.now()+250:Infinity;i<p.length&&c.now()<b;i++){for(var d=p[i],j=h,k=d;k=k.previousSibling;){var m=k.nodeType,o=(m===7||m===8)&&k.nodeValue;if(o?!/^\\??prettify\\b/.test(o):m!==3||/\\S/.test(k.nodeValue))break;if(o){j={};o.replace(/\\b(\\w+)=([\\w%+\\-.:]+)/g,function(a,b,c){j[b]=c});break}}k=d.className;if((j!==h||e.test(k))&&!v.test(k)){m=!1;for(o=d.parentNode;o;o=o.parentNode)if(f.test(o.tagName)&&\n			o.className&&e.test(o.className)){m=!0;break}if(!m){d.className+=\" prettyprinted\";m=j.lang;if(!m){var m=k.match(n),y;if(!m&&(y=U(d))&&t.test(y.tagName))m=y.className.match(n);m&&(m=m[1])}if(w.test(d.tagName))o=1;else var o=d.currentStyle,u=s.defaultView,o=(o=o?o.whiteSpace:u&&u.getComputedStyle?u.getComputedStyle(d,q).getPropertyValue(\"white-space\"):0)&&\"pre\"===o.substring(0,3);u=j.linenums;if(!(u=u===\"true\"||+u))u=(u=k.match(/\\blinenums\\b(?::(\\d+))?/))?u[1]&&u[1].length?+u[1]:!0:!1;u&&J(d,u,o);r=\n		{h:m,c:d,j:u,i:o};K(r)}}}i<p.length?setTimeout(g,250):\"function\"===typeof a&&a()}for(var b=d||document.body,s=b.ownerDocument||document,b=[b.getElementsByTagName(\"pre\"),b.getElementsByTagName(\"code\"),b.getElementsByTagName(\"xmp\")],p=[],m=0;m<b.length;++m)for(var j=0,k=b[m].length;j<k;++j)p.push(b[m][j]);var b=q,c=Date;c.now||(c={now:function(){return+new Date}});var i=0,r,n=/\\blang(?:uage)?-([\\w.]+)(?!\\S)/,e=/\\bprettyprint\\b/,v=/\\bprettyprinted\\b/,w=/pre|xmp/i,t=/^code$/i,f=/^(?:pre|code|xmp)$/i,\n			h={};g()}};typeof define===\"function\"&&define.amd&&define(\"google-code-prettify\",[],function(){return Y})})();}()\n',{"address":"prettify","metadata":{"format":"global","deps":[]}});
/*demo_frame*/
define('demo_frame', [
    'can/control/control',
    './demo_frame.mustache!',
    'jquery/jquery',
    'can/observe/observe',
    './prettify'
], function (Control, demoFrameMustache, $) {
    return can.Control.extend({
        init: function () {
            var docConfig = window.docConfig || {};
            this.element.html(demoFrameMustache({ demoSrc: (docConfig.demoSrcRoot || '..') + '/' + this.element.data('demoSrc') }));
            this.showTab('demo');
            var self = this;
            var iFrame = this.element.find('iframe');
            iFrame.load(function () {
                var demoEl = this.contentDocument.getElementById('demo-html'), sourceEl = this.contentDocument.getElementById('demo-source');
                var html = demoEl ? demoEl.innerHTML : this.contentWindow.DEMO_HTML;
                if (!html) {
                    var clonedBody = $(this.contentDocument.body).clone();
                    clonedBody.find('script').each(function () {
                        if (!this.type || this.type.indexOf('javascript') >= 0) {
                            $(this).remove();
                        }
                    });
                    clonedBody.find('style').remove();
                    html = $.trim(clonedBody.html());
                }
                var source = sourceEl ? sourceEl.innerHTML : this.contentWindow.DEMO_SOURCE;
                if (!source) {
                    var scripts = $(this.contentDocument.body).find('script:not([src])');
                    for (var i = 0; i < scripts.length; i++) {
                        if (!scripts[i].type || scripts[i].type.indexOf('javascript') >= 0) {
                            source = scripts[i].innerHTML;
                        }
                    }
                }
                source = $.trim(source);
                self.element.find('[data-for=html] > pre').html(self.prettify(html));
                var prettySource = self.prettify(source.replace(/\t/g, '  '));
                if (prettySource.length) {
                    self.element.find('[data-for=js] > pre').html(prettySource);
                    self.element.find('[data-tab=js]').show();
                }
                var resizeIframe = function () {
                    iFrame.height($(iFrame).contents().height());
                    setTimeout(arguments.callee, 1000);
                };
                resizeIframe();
            });
        },
        '.tab click': function (el, ev) {
            this.showTab(el.data('tab'));
        },
        showTab: function (tabName) {
            $('.tab', this.element).removeClass('active');
            $('.tab-content', this.element).hide();
            $('.tab[data-tab=' + tabName + ']', this.element).addClass('active');
            $('[data-for=' + tabName + ']', this.element).show();
        },
        prettify: function (unescaped) {
            return prettyPrintOne(unescaped.replace(/</g, '&lt;'));
        }
    });
});
/*frame_helper*/
define('frame_helper', [
    'can/control/control',
    'jquery/jquery',
    './demo_frame'
], function (Control, $, DemoFrame) {
    return Control.extend({
        init: function () {
            this.replaceIframes();
            this.replaceDemos();
        },
        replaceIframes: function () {
            $('.iframe_wrapper', this.element).each(function () {
                var wrapper = $(this), iframe = $('<iframe src="../' + wrapper.data('iframeSrc') + '">');
                if (wrapper.data('iframeHeight')) {
                    iframe.height(wrapper.data('iframeHeight'));
                }
                wrapper.append(iframe);
            });
        },
        replaceDemos: function () {
            $('.demo_wrapper', this.element).each(function () {
                var wrapper = $(this);
                new DemoFrame(wrapper);
                if (wrapper.data('demoHeight')) {
                    iframe.height(wrapper.data('demoHeight'));
                }
            });
        }
    });
});
/*versions*/
define('versions', [
    'can/control/control',
    'can/util/util',
    'jquery/jquery'
], function (Control, can, $) {
    var pageConfig = window.docObject || {};
    var endsWithSlash = function (path) {
        return path[path.length - 1] === '/';
    };
    var combine = function (first, second) {
        var right = first[first.length - 1], left = second[0];
        if (right != '/' && left != '/') {
            return steal.joinURIs(first, second);
        } else if (right == '/' && left == '/') {
            return left + second.substr(1);
        } else {
            return first + second;
        }
    };
    var dirname = function (path) {
        var parts = path.split('/');
        parts.pop();
        return parts.join('/');
    };
    var removeTrailingSlash = function (path) {
        if (endsWithSlash(path)) {
            return path.substr(0, path.length - 1);
        } else {
            return path;
        }
    };
    return Control.extend({
        setup: function (el, options) {
            var container;
            el = $(el);
            if (el.attr('id') === 'versions' && el[0].nodeName.toLowerCase() === 'select') {
                container = el;
            } else {
                container = $('<select id=\'versions\'/>').hide();
                el.after(container);
            }
            return Control.prototype.setup.call(this, container, options);
        },
        init: function () {
            if (pageConfig.project && pageConfig.project.version) {
                var self = this;
                $.ajax(pageConfig.docConfigDest || '../../documentjs.json', {
                    success: function (docConfig) {
                        self.docConfig = docConfig;
                        var versions = [];
                        $.each(docConfig.versions || [], function (name) {
                            versions.push(name);
                        });
                        self.addOptions(versions);
                    },
                    error: function () {
                    },
                    dataType: 'json'
                });
            }
        },
        addOptions: function (versions) {
            this.versions = versions;
            var html = '', self = this;
            can.each(versions, function (version) {
                html += '<option value=\'' + version + '\'' + (version == pageConfig.project.version ? ' SELECTED' : '') + '>' + self.getVersionSelectText(version) + '</option>';
            });
            this.element.html(html).fadeIn();
        },
        getVersionSelectText: function (version) {
            return pageConfig.versionsSelectText ? pageConfig.versionsSelectText.replace(/<%=\s*version\s*%>/, '' + version) : version;
        },
        getVersionedParentPath: function (version) {
            var path = (this.docConfig.versionDest || './<%= version %>/<%= name %>').replace(/<%=\s*version\s*%>/, '' + version).replace(/<%=\s*name\s*%>/, '' + pageConfig.project.name);
            return dirname(path);
        },
        getDefaultParentPath: function () {
            var path = (this.docConfig.defaultDest || './<%= name %>').replace(/<%=\s*name\s*%>/, '' + pageConfig.project.name);
            return dirname(path);
        },
        'change': function (el, ev) {
            var newVersion = this.element.val(), version = pageConfig.project.version, loc = '' + window.location, isVersioned = loc.indexOf('/' + version + '/') >= 0, versions = this.versions, isNewCurrentVersion = false, defaultVersion = this.docConfig.defaultVersion, defaultDest = this.getDefaultParentPath();
            for (var i = 0; i < versions.length; i++) {
                if (versions[i] == defaultVersion && versions[i] == newVersion) {
                    isNewCurrentVersion = true;
                }
            }
            if (isVersioned && isNewCurrentVersion) {
                var afterVersion = loc.replace(new RegExp('.*' + version), '');
                var toDocumentJSON = steal.joinURIs(window.location.pathname, pageConfig.docConfigDest);
                var toDefaultDest = steal.joinURIs(toDocumentJSON, defaultDest);
                toDefaultDest = removeTrailingSlash(toDefaultDest);
                window.location = toDefaultDest + afterVersion;
            } else if (!isVersioned) {
                var toDocumentJSON = steal.joinURIs(window.location.pathname, pageConfig.docConfigDest);
                var toDefaultDest = steal.joinURIs(toDocumentJSON, defaultDest);
                toDefaultDest = removeTrailingSlash(toDefaultDest);
                var after = window.location.pathname.replace(toDefaultDest, '');
                var versioned = combine(toDocumentJSON, this.getVersionedParentPath(newVersion));
                window.location = versioned + after;
            } else {
                window.location = loc.replace('/' + version + '/', '/' + newVersion + '/');
            }
        }
    });
});
/*$css*/
define('$css', function(require, exports, module) {
if( steal.config('env') === 'production' ) {
	exports.fetch = function(load) {
		// return a thenable for fetching (as per specification)
		// alternatively return new Promise(function(resolve, reject) { ... })
		var cssFile = load.address;

		var link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = cssFile;

		document.head.appendChild(link);
		return "";
	};
} else {
	exports.instantiate = function(load) {
		load.metadata.deps = [];
		load.metadata.execute = function(){
			var source = load.source+"/*# sourceURL="+load.address+" */";
			source = source.replace(/url\(['"]?([^'"\)]*)['"]?\)/g, function( whole, part ) {
				return "url(" + steal.joinURIs( load.address, part) + ")";
			});
				
			if(load.source && typeof document !== "undefined") {
				var head = document.head || document.getElementsByTagName('head')[0],
					style = document.createElement('style');

				// make source load relative to the current page
				
				style.type = 'text/css';

				if (style.styleSheet){
					style.styleSheet.cssText = source;
				} else {
					style.appendChild(document.createTextNode(source));
				}
				head.appendChild(style);
			}

			return System.newModule({source: source});
		};
		load.metadata.format = "css";
	};
	
}

exports.buildType = "css";
exports.includeInBuild = true;

});
/*less*/
System.set('less', System.newModule({}));
/*$less*/
System.set('$less', System.newModule({}));
/*static*/
define('static', [
    './content_list',
    './frame_helper',
    './versions',
    './styles/styles.less!',
    './prettify'
], function (ContentList, FrameHelper, Versions) {
    var codes = document.getElementsByTagName('code');
    for (var i = 0; i < codes.length; i++) {
        var code = codes[i];
        if (code.parentNode.nodeName.toUpperCase() === 'PRE') {
            code.className = code.className + ' prettyprint';
        }
    }
    prettyPrint();
    new ContentList('.contents');
    new FrameHelper('.docs');
    new Versions($('#versions, .sidebar-title:first'));
});
