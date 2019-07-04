//--Date
if (!Date.getMonthName) {
	Date.label = {
		month: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
		,day: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
	};
	Date.label.month.abbr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	Date.label.day.abbr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	Date.getMonthName = function(index, abbr){
		abbr = abbr || false;
		if (index > 12) index = 12;
		else if (index < 1) index = 1;
		index = index -1;
		return abbr ? Date.label.month.abbr[index] : Date.label.month[index];
	};
}
if (!Date.getMonthIndex) {
	Date.getMonthIndex = function(name){
		name = name.toLowerCase().uppercaseFirst();
		var index = Date.label.month.indexOf(name);
		if (index === -1) {
			index = Date.label.month.abbr.indexOf(name);
		}
		return (index !== -1 ? index + 1 : null);
	};
}
if (!Date.getDayName) {
	Date.getDayName = function(index, abbr){
		abbr = abbr || false;
		if (index > 7) index = 7;
		else if (index < 1) index = 1;
		index = index -1;
		return abbr ? Date.label.day.abbr[index] : Date.label.day[index];
	};
}
if (!Date.getDayIndex) {
	Date.getDayIndex = function(name){
		name = name.toLowerCase().uppercaseFirst();
		var index = Date.label.day.indexOf(name);
		if (index === -1) {
			index = Date.label.day.abbr.indexOf(name);
		}
		return (index !== -1 ? index + 1 : null);
	};
}
//--String
if (!String.prototype.trim) {
	String.prototype.trim = function(){
		return this.replace(/^\s+|\s+$/g, '');
	};
}
if (!String.prototype.uppercaseFirst) {
	String.prototype.uppercaseFirst = function(){
		return this.charAt(0).toUpperCase() + this.slice(1);
	};
}
if (!String.prototype.lowercaseFirst) {
	String.prototype.lowercaseFirst = function(){
		return this.charAt(0).toLowerCase() + this.slice(1);
	};
}
//--Array
if (!Array.isArray) {
	Array.isArray = function(arg) {
		return Object.prototype.toString.call(arg) === '[object Array]';
	};
}
if (!Array.prototype.concatUnique) {
	Array.prototype.concatUnique = function(arr) {
		for (var i = 0; i < arr.length; i++) {
			if (this.indexOf(arr[i]) === -1) {
				this.push(arr[i]);
			}
		}
		return this;
	};
}
if (!Array.prototype.pushUnique) {
	Array.prototype.pushUnique = function(val) {
		if (this.indexOf(val) === -1) {
			this.push(val);
		}
		return this;
	};
}
//--Object
if (!window.isObject) {
	window.isObject = function(val) {
		if (val === null) { return false; }
		return ( (typeof val === 'function') || (typeof val === 'object') );
	};
}
if (!Object.isObject) {
	Object.isObject = window.isObject;
}
if (!Object.copy) {
	Object.copy = function(o) {
		if (null === o || "object" != typeof o)
			return o;
		var c = o.constructor();
		return Object.assign(c, o);
	};
}
if (!Object.copyMerge) {
	Object.copyMerge = function(o1, o2) {
		return Object.assign(
			Object.copy(o1)
			,o2
		);
	};
}
if (!Object.deepMerge) {
	Object.deepMerge = function() {
		var args = Array.prototype.slice.call(arguments);
		if (args.length === 0)
			return {};
		var clone = false;
		if (args.length > 2 && args[args.length - 1] === true) {
			clone = true;
			args.pop();
		}
		var merged = clone ? Object.assign({}, args.shift()) : args.shift();
		for (var i = 0; i < args.length; i++) {
			for (var key in args[i]) {
				if (args[i].hasOwnProperty(key)) {
					if (Object.isObject(args[i][key]) && !Array.isArray(args[i][key]) && merged.hasOwnProperty(key) && Object.isObject(merged[key]))
						merged[key] = Object.deepMerge(merged[key], args[i][key], true);
					else if (Array.isArray(args[i][key]) && merged.hasOwnProperty(key) && Array.isArray(merged[key]))
						merged[key] = merged[key].concat(args[i][key]);
					else {
						if (Object.isObject(args[i][key]))
							args[i][key] = Object.assign({}, args[i][key]);
						merged[key] = args[i][key];
					}
				}
			}
		}
		return merged;
	};
}
if (!Object.deepCopyMerge) {
	Object.deepCopyMerge = function() {
		var args = Array.prototype.slice.call(arguments);
		if (args.length === 0)
			return {};
		var merged = Object.assign({}, args.shift());
		for (var i = 0; i < args.length; i++) {
			for (var key in args[i]) {
				if (args[i].hasOwnProperty(key)) {
					if (Object.isObject(args[i][key]) && !Array.isArray(args[i][key]) && merged.hasOwnProperty(key) && Object.isObject(merged[key]))
						merged[key] = Object.deepCopyMerge(merged[key], args[i][key]);
					else if (Array.isArray(args[i][key]) && merged.hasOwnProperty(key) && Array.isArray(merged[key]))
						merged[key] = merged[key].concat(args[i][key]);
					else {
						if (Object.isObject(args[i][key]))
							args[i][key] = Object.assign({}, args[i][key]);
						merged[key] = args[i][key];
					}
				}
			}
		}
		return merged;
	};
}
// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
if (!Object.keys) {
	Object.keys = (function() {
		'use strict';
		var hasOwnProperty = Object.prototype.hasOwnProperty,
			hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
			dontEnums = [
				'toString',
				'toLocaleString',
				'valueOf',
				'hasOwnProperty',
				'isPrototypeOf',
				'propertyIsEnumerable',
				'constructor'
			],
			dontEnumsLength = dontEnums.length;
		return function(obj) {
			if (typeof obj !== 'function' && (typeof obj !== 'object' || obj === null)) {
				throw new TypeError('Object.keys called on non-object');
			}
			var result = [], prop, i;
			for (prop in obj) {
				if (hasOwnProperty.call(obj, prop)) {
					result.push(prop);
				}
			}
			if (hasDontEnumBug) {
				for (i = 0; i < dontEnumsLength; i++) {
					if (hasOwnProperty.call(obj, dontEnums[i])) {
						result.push(dontEnums[i]);
					}
				}
			}
			return result;
		};
	}());
}
if (typeof Object.assign != 'function') {
	// Must be writable: true, enumerable: false, configurable: true
	Object.defineProperty(Object, "assign", {
		value: function assign(target, varArgs) { // .length of function is 2
			'use strict';
			if (target == null) { // TypeError if undefined or null
				throw new TypeError('Cannot convert undefined or null to object');
			}
			var to = Object(target);
			for (var index = 1; index < arguments.length; index++) {
				var nextSource = arguments[index];
				if (nextSource != null) { // Skip over if undefined or null
					for (var nextKey in nextSource) {
						// Avoid bugs when hasOwnProperty is shadowed
						if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
							to[nextKey] = nextSource[nextKey];
						}
					}
				}
			}
			return to;
		},
		writable: true,
		configurable: true
	});
}
//--Object watch/unwatch polyfill
//--@ https://gist.github.com/eligrey/384583
if (!Object.prototype.watch) {
	Object.defineProperty(Object.prototype, "watch", {
		enumerable: false
		,configurable: true
		,writable: false
		,value: function (prop, handler) {
			var oldval = this[prop]
				,newval = oldval
				,getter = function () {
					return newval;
				}
				,setter = function (val) {
					oldval = newval;
					return newval = handler.call(this, prop, oldval, val);
				}
			;
			if (delete this[prop]) { // can't watch constants
				Object.defineProperty(this, prop, {
					  get: getter
					, set: setter
					, enumerable: true
					, configurable: true
				});
			}
		}
	});
}
// object.unwatch
if (!Object.prototype.unwatch) {
	Object.defineProperty(Object.prototype, "unwatch", {
		 enumerable: false
		,configurable: true
		,writable: false
		,value: function (prop) {
			var val = this[prop];
			delete this[prop]; // remove accessors
			this[prop] = val;
		}
	});
}
//--JSON
if (!JSON.safeParse) {
	JSON.safeParse = function(_json, _d) {
		_d = typeof _d !== 'undefined' ? _d : null;
		if (_json === null) { return null; }
		try {
			_json = JSON.parse(_json);
		} catch(e) {
			_json = null;
		}
		return _json;
	};
}
if (!Element.prototype.matches) {
	Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}
//--@https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
if (!Element.prototype.closest) {
	Element.prototype.closest = function(s) {
		var el = this;
		var ancestor = this;
		if (!document.documentElement.contains(el)) return null;
		do {
			if (ancestor.matches(s)) return ancestor;
			ancestor = ancestor.parentElement;
		} while (ancestor !== null);
		return null;
	};
}
// Does not work with `new funcA.bind(thisArg, args)`
if (!Function.prototype.bind) (function(){
  var ArrayPrototypeSlice = Array.prototype.slice;
  Function.prototype.bind = function() {
    var thatFunc = this, thatArg = arguments[0];
    var args = ArrayPrototypeSlice.call(arguments, 1);
    if (typeof thatFunc !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - ' +
             'what is trying to be bound is not callable');
    }
    return function(){
      args.push.apply(args, arguments);
      return thatFunc.apply(thatArg, args);
    };
  };
})();