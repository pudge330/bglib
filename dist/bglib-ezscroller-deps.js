(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
    	var oldObject = root.bglib;
        var lib = root.bglib = factory();
        lib.noConflict = function() {
        	root.bglib = oldObject;
        	return lib;
        };
    }
}(window, function () {
var jQuery = root.jQuery !== 'undefined' ? root.jQuery : null;
var _bglib = {
    name: 'bglib'
    ,version: '1.0'
    ,modules: {}
};

var bglib = function() {};

bglib.fn = {};

bglib.getName = function() {
    return _bglib.name;
};

bglib.getVersion = function() {
    return _bglib.version;
};

bglib.fn.call = function(f, a) {
    return f.apply(null, a);
};

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
	JSON.safeParse = function(_json) {
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
bglib.create = function(p, s, t) {
    p = p || {};
    s = s || {};
    t = t || 'Base';
    if (!_bglib.modules.hasOwnProperty(t)) {
        t = 'Base';
    }
    if (_bglib.modules.hasOwnProperty(t)) {
        return _bglib.modules[t].extend(p, s);
    }
};
bglib.noop = function() {};
bglib.setRegisteredModule = function(n, m) {
    _bglib.modules[n] = m;
};
//--@https://github.com/jfriend00/docReady
//--MIT License
(function(funcName, baseObj) {
    "use strict";
    // The public function name defaults to window.docReady
    // but you can modify the last line of this function to pass in a different object or method name
    // if you want to put them in a different namespace and those will be used instead of 
    // window.docReady(...)
    funcName = funcName || "docReady";
    baseObj = baseObj || window;
    var readyList = [];
    var readyFired = false;
    var readyEventHandlersInstalled = false;
    
    // call this when the document is ready
    // this function protects itself against being called more than once
    function ready() {
        if (!readyFired) {
            // this must be set to true before we start calling callbacks
            readyFired = true;
            for (var i = 0; i < readyList.length; i++) {
                // if a callback here happens to add new ready handlers,
                // the docReady() function will see that it already fired
                // and will schedule the callback to run right after
                // this event loop finishes so all handlers will still execute
                // in order and no new ones will be added to the readyList
                // while we are processing the list
                readyList[i].fn.call(window, readyList[i].ctx);
            }
            // allow any closures held by these functions to free
            readyList = [];
        }
    }
    
    function readyStateChange() {
        if ( document.readyState === "complete" ) {
            ready();
        }
    }
    
    // This is the one public interface
    // docReady(fn, context);
    // the context argument is optional - if present, it will be passed
    // as an argument to the callback
    baseObj[funcName] = function(callback, context) {
        if (typeof callback !== "function") {
            throw new TypeError("callback for docReady(fn) must be a function");
        }
        // if ready has already fired, then just schedule the callback
        // to fire asynchronously, but right away
        if (readyFired) {
            setTimeout(function() {callback(context);}, 1);
            return;
        } else {
            // add the function and context to the list
            readyList.push({fn: callback, ctx: context});
        }
        // if document already ready to go, schedule the ready function to run
        // IE only safe when readyState is "complete", others safe when readyState is "interactive"
        if (document.readyState === "complete" || (!document.attachEvent && document.readyState === "interactive")) {
            setTimeout(ready, 1);
        } else if (!readyEventHandlersInstalled) {
            // otherwise if we don't have event handlers installed, install them
            if (document.addEventListener) {
                // first choice is DOMContentLoaded event
                document.addEventListener("DOMContentLoaded", ready, false);
                // backup is window load event
                window.addEventListener("load", ready, false);
            } else {
                // must be IE
                document.attachEvent("onreadystatechange", readyStateChange);
                window.attachEvent("onload", ready);
            }
            readyEventHandlersInstalled = true;
        }
    }
})("documentReady", bglib.fn);
bglib.fn.formatDecimal = function(amount, pos) {
    pos = pos || 2;
    if(!amount || amount === '0'){
        amount = 0;
    }
    if(typeof amount === 'string'){
        amount = amount.replace(/[^\d\.]/g, '');
    }
    //-@ http://stackoverflow.com/a/6134070
    return parseFloat(Math.round(amount * 100) / 100).toFixed(pos);
};
bglib.fn.interpolate = function(tpl, data) {
    for (var key in data) {
        tpl = tpl.replace(new RegExp('{{' + key + '}}', 'gm'), data[key]);
    }
    return tpl;
};
bglib.fn.iosVersion = function() {
    //--@ https://stackoverflow.com/questions/8348139/detect-ios-version-less-than-5-with-javascript
	if (/iP(hone|od|ad)/.test(navigator.platform)) {
		// supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
		var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
		return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
	}
	else {
		return null;
	}
};
bglib.fn.rand = function(max) {
    max = max || 100000000;
    return Math.floor((Math.random() * max) + 1);
};
bglib.fn.request = function(url, cb, data, type) {
    data = data || {};
    type = type || 'GET';
    var sendData = (type !== 'GET');
    cb = cb || bglib.noop;
    cb = bglib.DT.isFunction(cb)
        ? {success: cb, error: bglib.noop, always: bglib.noop}
        : Object.assign({success: bglib.noop, error: bglib.noop, always: bglib.noop}, cb)
    ;
    var xhr = new XMLHttpRequest();
    xhr.open(type, url, true);
    xhr.addEventListener("readystatechange", function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            cb.success(xhr.responseText, xhr, data);
        }
        else {
            cb.error(xhr.responseText, xhr, data);
        }
        cb.always(xhr.responseText, xhr, data);
    }, false);
    if (sendData) {
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify(data));
    }
    else {
        xhr.send();
    }
};
(function(bglib) {
	var module = function () {};
	module.extend = function(prototypeProperties, staticProperties) {
		prototypeProperties = prototypeProperties || {};
		staticProperties = staticProperties || {};
		var parent = this;
		var child;
		if (prototypeProperties && prototypeProperties.hasOwnProperty('constructor')) {
			child = prototypeProperties.constructor;
		}
		else {
			child = function () { return parent.apply(this, arguments); };
		}
		child = Object.assign(child, parent);
		child = Object.assign(child, staticProperties);
		child.prototype = Object.create(parent.prototype, {
			constructor: {
				value: child
				,enumerable: false
				,writable: true
				,configurable: true
			}
		});
		Object.assign(child.prototype, prototypeProperties);
		child.__parent = parent;
	    return child;
	};
	bglib.BaseModule = module.extend({
		constructor: function() {
			var _self = this;
			module.apply(_self, arguments);
			if (this.init) {
				this.init.apply(_self, arguments);
			}
		}
	});
	bglib.setRegisteredModule('Base', bglib.BaseModule);
})(bglib);
bglib.DT = {
	isString: function(value) {
		return typeof value === 'string' || value instanceof String;
	}
	,isFinite: function(value) {
		if (typeof isFinite !== 'undefined') {
			return isFinite(value);
		}
		else
			return typeof value === 'number';
	}
	,isNumber: function(value) {
		return typeof value === 'number' && (this.isFinite(value));
	}
	,isArray: function(value) {
		return Object.prototype.toString.call(value) === '[object Array]';
	}
	,isFunction: function(value) {
		return typeof value === 'function';
	}
	,isObject: function(value) {
		return (value !== false && (typeof value === 'function' || typeof value === 'object'));
		// return value && typeof value === 'object' && value.constructor === Object;
	}
	,isNull: function(value) {
		return value === null;
	}
	,isUndefined: function(value) {
		return typeof value === 'undefined';
	}
	,isBool: function(value) {
		return typeof value === 'boolean';
	}
	,isRegExp: function(value) {
		return value && typeof value === 'object' && value.constructor === RegExp;
	}
	,isError: function (value) {
		return value instanceof Error && typeof value.message !== 'undefined';
	}
	,isDate: function(value) {
		return value instanceof Date;
	}
};
(function(bglib) {
	var m = function() {
		this.storage = new WeakMap();
	};
	m.prototype.set = function (element, key, obj) {
		if (!this.storage.has(element)) {
			this.storage.set(element, new Map());
		}
		this.storage.get(element).set(key, obj);
	};
	m.prototype.get = function (element, key) {
		return this.has(element, key) ? this.storage.get(element).get(key) : undefined;
	};
	m.prototype.has = function (element, key) {
		return this.hasBase(element) ? this.storage.get(element).has(key) : false;
	};
	m.prototype.hasBase = function (element) {
		return this.storage.has(element);
	};
	m.prototype.remove = function (element, key) {
		var result = false;
		if (this.has(element, key)) {
			result = this.storage.get(element).delete(key);	
		}
		if (this.hasBase(element)) {
			if (this.storage.get(element).size === 0) {
				this.storage.delete(element);
			}
		}
		return result;
	};
	m.prototype.reset = function(element) {
		if (this.hasBase(element)) {
			this.storage.delete(element);
		}
	};
	bglib.ElementalData = m;
})(bglib);
(function(bglib) {
	var BaseModule = bglib.BaseModule;
	var module = BaseModule.extend({
		__propagationStopped: undefined
		,__defaultPrevented: undefined
		,__eventProps: undefined
		,data: undefined
		,name: undefined
		,constructor: function(name, event, data, original) {
			BaseModule.apply(this, arguments);
			this.__propagationStopped = false;
			this.__defaultPrevented = false;
			this.name = name || 'UnsetEventName';
			this.data = data || {};
			event = event || {};
			this.__eventProps = event;
			for (var key in event) {
				if (event.hasOwnProperty(key)) {
					this[key] = event[key];
				}
			}
			if (original) {
				this.originalEvent = original;
			}
		}
		,getEventProps: function() {
			return this.__eventProps;
		}
		,stopPropagation: function() {
			this.__propagationStopped = true;
		}
		,isPropagationStopped: function() {
			return this.__propagationStopped;
		}
		,preventDefault: function() {
			if (typeof this.originalEvent !== 'undefined') {
				this.originalEvent.preventDefault();
			}
			else {
				this.__defaultPrevented = true;
			}
		}
		,isDefaultPrevented: function() {
			if (typeof this.originalEvent !== 'undefined') {
				return this.originalEvent.defaultPrevented;
			}
			else {
				return this.__defaultPrevented;
			}
		}
	});
	bglib.Event = module;
})(bglib);
//--@https://stackoverflow.com/questions/12949590/how-to-detach-event-in-ie-6-7-8-9-using-javascript
bglib.EventUtil = {
    addHandler: function(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },
    removeHandler: function(element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    }
};
(function(bglib) {
    var Event = bglib.Event;
    var EventUtil = bglib.EventUtil;
    bglib.EventManager = bglib.create({
        target: undefined
        ,attached: undefined
        ,init: function(target) {
            this.target = target;
            this.attached = {};
        }
        ,resolveArguments: function(type, arguments) {
            var args = [].slice.call(arguments);
            var names, selector, data, callback;
            names = args.shift();
            if (type === 'on') {
                switch (args.length) {
                    case 3:
                        selector = args[0];
                        data = args[1];
                        callback = args[2];
                    break;
                    case 2:
                        if (bglib.DT.isString(args[0])) {
                            selector = args[0];
                        }
                        else {
                            data = args[0];
                        }
                        callback = args[1];
                    break;
                    case 1:
                        if (bglib.DT.isFunction(args[0])) {
                            callback = args[0];
                        }
                    break;
                }
            }
            else {
                switch (args.length) {
                    case 3:
                        selector = args[0];
                        callback = args[1];
                        cache = args[2];
                    break;
                    case 2:
                        if (bglib.DT.isString(args[0])) {
                            selector = args[0];
                            callback = args[1];
                        }
                        else if (bglib.DT.isFunction(args[0])) {
                            callback = args[0];
                            cache = args[1];
                        }
                    break;
                    case 1:
                        if (bglib.DT.isFunction(args[0])) {
                            callback = args[0];
                        }
                    break;
                }
            }
            selector = selector || null;
            data = data || data;
            callback = callback || function() {};
            cache = typeof cache !== 'undefined' ? cache : false;
            names = names.trim();
            names = names ? names.replace(/(\s{2,})/, ' ') : '';
            if (type === 'on') {
                return [names, selector, data, callback];
            }
            else {
                return [names, selector, callback, cache];
            }
        }
        ,on: function(/* names[, selector, data, cb] */) {
            var _self = this;
            var names, selector, data, callback;
            var args = this.resolveArguments('on', arguments);
            names = args[0]; selector = args[1]; data = args[2]; callback = args[3];
            names = names != '' ? names.split(' ') : [];
            for (var i = 0; i < names.length; i++) {
                var name = names[i].trim();
                //--make sure parent event handler is created
                if (!this.attached.hasOwnProperty(name)) {
                    this.attached[name] = {
                        name: name
                        ,fn: function() {}
                        ,handlers: new Map()
                        ,data: new Map()
                    };
                    this.attached[name].fn = (function(attached, originalEvent) {
                        var evt = new Event(name, { target: _self.target }, {}, originalEvent);
                        // var evt = _self.newEvent({}, originalEvent);
                        attached.handlers.forEach(function (status, key) {
                            if (evt.isPropagationStopped()) { return; }
                            if (status) {
                                var d = attached.data.get(key);
                                d = d || {};
                                var _evt = new Event(name, { target: _self.target }, d, evt.originalEvent);
                                // var _evt = _self.newEvent(d, evt.originalEvent);
                                if (key.selector) {
                                    var closest;
                                    if (_evt.originalEvent.target.matches(key.selector)) {
                                        var cb = key.callback.bind(_evt.originalEvent.target);
                                        cb(_evt);
                                        if (_evt.isPropagationStopped()) {
                                            evt.stopPropagation();
                                        }
                                    }
                                    else if (closest = _evt.originalEvent.target.closest(key.selector)) {
                                        var cb = key.callback.bind(closest);
                                        cb(_evt);
                                        if (_evt.isPropagationStopped()) {
                                            evt.stopPropagation();
                                        }
                                    }
                                }
                                else {
                                    var cb = key.callback.bind(_self.target);
                                    cb(_evt);
                                    if (_evt.isPropagationStopped()) {
                                        evt.stopPropagation();
                                    }
                                }
                            }
                        });
                    }).bind(this.target, this.attached[name]);
                    EventUtil.addHandler(this.target, name, this.attached[name].fn);
                }
                var mapKey = {
                    name: name
                    ,selector: selector
                    ,callback: callback
                };
                this.attached[name].handlers.set(mapKey, true);
                this.attached[name].data.set(mapKey, data);
            }
        }
        ,off: function(/* names[, selector, cb, cache] */) {
            var names, selector, callback, cache;
            var args = this.resolveArguments('off', arguments);
            names = args[0]; selector = args[1]; callback = args[2], cache = args[3];
            names = names != '' ? names.split(' ') : [];
            for (var i = 0; i < names.length; i++) {
                var name = names[i];
                var mapKey = {
                    name: name
                    ,selector: selector
                    ,callback: callback
                };
                var found;
                this.attached[name].handlers.forEach(function(value, key) {
                    if (!found && (
                        mapKey.name == key.name && mapKey.selector == key.selector && mapKey.callback == key.callback
                    )) {
                        found = key;
                    }
                });
                if (found) {
                    if (cache) {
                        this.attached[name].handlers.set(found, false);
                    }
                    else {
                        this.attached[name].handlers.delete(found);
                        this.attached[name].data.delete(found);
                    }
                }
            }
        }
        ,hasHandlers: function(name) {
            if (this.attached.hasOwnProperty(name)) {
                if (this.attached[name].handlers.size) {
                    return true;
                }
            }
            return false;
        }
    });
})(bglib);
(function(bglib) {
	var EventManager = bglib.EventManager;
	var elData = new bglib.ElementalData();
	var elEventMap = new WeakMap();
	var m = {};
	m.getAttributes = function(e) {
	    var a = {};
	    e = m.element(e);
	    if (e) {
	        for (var i = 0, atts = e.attributes, n = atts.length; i < n; i++){
	            a[atts[i].nodeName] = atts[i].value;
	        }
	    }
	    return a;
	};
	m.text = function(e) {
		if (e) {
			return e.innerText || e.textContent;
		}
		return '';
	};
	m.addClass = function(e, cls) {
	    if (!m.hasClass(e, cls)) {
	        if (e.className != '')
	            cls = ' ' + cls;
	        e.className = e.className.trim() + ' ' + cls.trim();
	    }
	};
	m.removeClass = function(e, cls) {
	    if (m.hasClass(e, cls)) {
	        cls = ' ' + cls + ' ';
	        var clsName = (" " + e.className + " ").replace(/[\n\t\r]/g, " ");
	        clsName = clsName.replace(cls, '');
	        e.className = clsName.trim();
	    }
	};
	m.toggleClass = function(e, cls) {
	    if (!m.hasClass(e, cls))
	        m.addClass(e, cls);
	    else
	        m.removeClass(e, cls);
	};
	m.hasClass = function(e, cls) {
	    cls = ' ' + cls + ' ';
	    if ((" " + e.className + " ").replace(/[\n\t\r]/g, " ").indexOf(cls) > -1)
	        return true;
	    else
	        return false;
	};
	m.css = function(e, prop, val){
	    if (typeof val === 'undefined') {
	        var b = (window.navigator.userAgent).toLowerCase();
	        var s;
	        if(/msie|opera/.test(b)){
	            s = e.currentStyle;
	        }else if(/gecko/.test(b)){
	            s = document.defaultView.getComputedStyle(e, null);
	        }
	        if (bglib.DT.isObject(prop)) {
	        	for (var key in prop) {
	        		if (prop.hasOwnProperty(key)) {
	        			m.css(e, key, prop[key]);
	        		}
	        	}
	        }
	        else {
		        if(s[prop]!=undefined){
		            return s[prop];
		        }
		        return e.style[prop];
		    }
	    }
	    else if(prop){
	        e.style[prop]=val;
	    }
	};
	m.data = function(e, key, val) {
	    if (arguments.length > 2) {
	        m.data.set(e, key, val);
	    }
	    else {
	        return m.data.get(e, key);
	    }
	};
	m.data.get = function(e, key) {
	    return elData.get(e, key);
	};
	m.data.set = function(e, key, val) {
	    elData.set(e, key, val);
	};
	m.data.has = function(e, key) {
	    return elData.has(e, key);
	};
	m.data.remove = function(e, key) {
	    elData.remove(e, key);
	};
	m.element = function(e) {
	    var elements = m.elements(e);
	    return elements.length ? elements[0] : null;
	};
	m.elements = function() {
	    var elms = [];
	    for (var i = 0; i < arguments.length; i++) {
	        var arg = arguments[i];
	        if (bglib.DT.isString(arg)) {
	            arg = [arg];
	        }
	        else if ((jQuery && arg instanceof jQuery)
	            || (bglib.jLyte && arg instanceof bglib.jLyte)) {
	            arg = arg.toArray();
	        }
	        else if (arg instanceof NodeList) {
	        	arg = [].slice.call(arg);
	        }
	        else if (arg instanceof DocumentFragment) {
	        	arg = arg.childNodes
	        }
	        else if (!bglib.DT.isArray(arg)) {
	            arg = [arg];
	        }
	        for (var j = 0; j < arg.length; j++) {
	            if (bglib.DT.isString(arg[j])) {
	                elms = elms.concat(m.resolveElements(arg[j]));
	            }
	            else if ((jQuery && arg[j] instanceof jQuery)
	                || (bglib.jLyte && arg[j] instanceof bglib.jLyte)) {
	                elms = elms.concat(arg[j].toArray());
	            }
	            else {
	            	if (bglib.DT.isArray(arg[j])) {
	                	elms.concat(arg[j]);
	            	}
	            	else {
	            		elms.push(arg[j]);
	            	}
	            }
	        }
	    }
	    return elms;
	};
	m.resolveElements = function(str) {
	    var fastRegex = /^(?:(<[\w\W]+>)|\#([\w-]+)|\.([\w-]+))$/; //--matches html string, simple id or class
	    var selectorRegex = /([^\r\n,{}]+)(\s?,(?=[^}]*{)|\s*{)/; //--matches any other selector
	    //--table decendant tags have trouble getting created outside the context of a table
	    var tableChildRegex = /^(<\s*(thead|tbody|tfoot|tr|td|th)[^>]*>)(.*)<\s*\/\s*(thead|tbody|tfoot|tr|td|th)\s*>$/; 
	    str = str.trim();
	    if (!str || str == '') { return []; }
	    var elements = [];
	    var match = str.match(fastRegex);
	    if (match) {
	        //--matches HTML String, id selector or class selector
	        if (match[1]) {
	            match = str.match(tableChildRegex);
	            if (match) {
	                //--starting and ending node must match
	                if (match[2] == match[4]) {
	                    var parent = 'table';
	                    if (match[2] == 'tr') {
	                        parent = 'thead';
	                    }
	                    else if (['td', 'th'].indexOf(match[2]) !== -1) {
	                        parent = 'tr';
	                    }
	                    var parent = document.createElement(parent);
	                    parent.innerHTML = str;
	                    elements = parent.childNodes;
	                }
	                else {
	                    elements = [document.createTextNode(str)];
	                }
	            }
	            else {
	                //--possibly need to find better method than this, may not support IE 9, but also maybe doesn't need to
	                elements = document.createRange().createContextualFragment(str).childNodes;
	            }
	        }
	        else if (match[2]) {
	            var tmp = document.getElementById(match[2]);
	            elements = tmp ? [tmp] : [];
	        }
	        else {
	            elements = document.querySelectorAll('.' + match[3]);
	        }
	    }
	    else {
	        match = (str.replace(/[\s,{]+$/gm, '').concat(' {')).match(selectorRegex);
	        if (match && !str.match(/^(text\#|txt\#)/)) {
	            //--matches any css selector, still may benefit from using sizzle instead of default querySelector methods
	            elements = document.querySelectorAll(str.replace(/[\s,{]+$/gm, ''));
	        }
	        else {
	            //--standard text node
	            str = str.replace(/^(text\#|txt\#)/, '');
	            elements = [document.createTextNode(str)];
	        }
	    }
	    return [].slice.call(elements);
	};
	m.offset = function(e) {
	    var rect = e.getBoundingClientRect(),
	    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
	    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
	}
	m.remove = function(e) {
	    if (e instanceof Element) {
	        e.parentElement.removeChild(e);
	    }
	    else if (e instanceof NodeList || e instanceof HTMLCollection || bglib.DT.isArray(e)) {
	        for(var i = e.length - 1; i >= 0; i--) {
	            if(e[i] && e[i].parentElement) {
	                e[i].parentElement.removeChild(e[i]);
	            }
	        }
	    }
	};
	m.on = function(/* element[, names, selector, data, cb] */) {
		var args = [].slice.call(arguments);
		var element = args.shift();
		if (element) {
			if (!elEventMap.has(element)) {
				elEventMap.set(element, new EventManager(element));
			}
			var em = elEventMap.get(element);
			EventManager.prototype.on.apply(em, args);
		}
	};
	m.off = function(/* element[, names, selector, cb] */) {
		var args = [].slice.call(arguments);
		var element = args.shift();
		if (element && elEventMap.has(element)) {
			var em = elEventMap.get(element);
			EventManager.prototype.off.apply(em, args);
		}
	};
	bglib.El = m;
})(bglib);
return bglib;}));