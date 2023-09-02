// modules
const DataType = require('./DataType');
const ElementalData = require('./ElementalData');
const EventManager = require('./EventManager');

/**
 * @todo Merge all functionality from jLyte
 */

var elData = new ElementalData();
var elEventMap = new WeakMap();
var El = {};
El.getAttributes = function(e) {
    var a = {};
        e = El.element(e);
    if (e) {
        for (var i = 0, atts = e.attributes, n = atts.length; i < n; i++){
            a[atts[i].nodeName] = atts[i].value;
        }
    }
    return a;
};
El.text = function(e) {
	if (e) {
		return e.innerText || e.textContent;
	}
	return '';
};
El.addClass = function(e, cls) {
    if (!El.hasClass(e, cls)) {
        if (e.className != '')
            cls = ' ' + cls;
        e.className = e.className.trim() + ' ' + cls.trim();
    }
};
El.removeClass = function(e, cls) {
    if (El.hasClass(e, cls)) {
        cls = ' ' + cls + ' ';
        var clsName = (" " + e.className + " ").replace(/[\n\t\r]/g, " ");
        clsName = clsName.replace(cls, '');
        e.className = clsName.trim();
    }
};
El.toggleClass = function(e, cls) {
    if (!El.hasClass(e, cls))
        El.addClass(e, cls);
    else
        El.removeClass(e, cls);
};
El.hasClass = function(e, cls) {
    cls = ' ' + cls + ' ';
    if ((" " + e.className + " ").replace(/[\n\t\r]/g, " ").indexOf(cls) > -1)
        return true;
    else
        return false;
};
El.css = function(e, prop, val){
    if (typeof val === 'undefined') {
        var b = (window.navigator.userAgent).toLowerCase();
        var s;
        if(/msie|opera/.test(b)){
            s = e.currentStyle;
        }else if(/gecko/.test(b)){
            s = document.defaultView.getComputedStyle(e, null);
        }
        if (DataType.isObject(prop)) {
        	for (var key in prop) {
        		if (prop.hasOwnProperty(key)) {
        			El.css(e, key, prop[key]);
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
El.data = function(e, key, val) {
    if (arguments.length > 2) {
        El.data.set(e, key, val);
    }
    else {
        return El.data.get(e, key);
    }
};
El.data.get = function(e, key) {
    return elData.get(e, key);
};
El.data.set = function(e, key, val) {
    elData.set(e, key, val);
};
El.data.has = function(e, key) {
    return elData.has(e, key);
};
El.data.remove = function(e, key) {
    elData.remove(e, key);
};
El.closest = function(e, sel) {
    var tmp;
    do {
        tmp = e.parent;
    } while (!tmp.matches(sel) || !tmp);
    return tmp ? tmp : undefined;
};
El.element = function(e) {
    var elements = El.elements(e);
    return elements.length ? elements[0] : null;
};
El.elements = function() {
    var elms = [];
    for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        if (DataType.isString(arg)) {
            arg = [arg];
        }
        else if (jQuery && arg instanceof jQuery) {
            arg = arg.toArray();
        }
        else if (arg instanceof NodeList) {
        	arg = [].slice.call(arg);
        }
        else if (arg instanceof DocumentFragment) {
        	arg = arg.childNodes
        }
        else if (!DataType.isArray(arg)) {
            arg = [arg];
        }
        for (var j = 0; j < arg.length; j++) {
            if (DataType.isString(arg[j])) {
                elms = elms.concat(El.resolveElements(arg[j]));
            }
            else if (jQuery && arg[j] instanceof jQuery) {
                elms = elms.concat(arg[j].toArray());
            }
            else {
            	if (DataType.isArray(arg[j])) {
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
El.resolveElements = function(str) {
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
El.offset = function(e) {
    var rect = e.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
}
El.remove = function(e) {
    if (e instanceof Element) {
        e.parentElement.removeChild(e);
    }
    else if (e instanceof NodeList || e instanceof HTMLCollection || DataType.isArray(e)) {
        for(var i = e.length - 1; i >= 0; i--) {
            if(e[i] && e[i].parentElement) {
                e[i].parentElement.removeChild(e[i]);
            }
        }
    }
};
El.on = function(/* element[, names, selector, data, cb] */) {
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
El.off = function(/* element[, names, selector, cb] */) {
	var args = [].slice.call(arguments);
	var element = args.shift();
	if (element && elEventMap.has(element)) {
		var em = elEventMap.get(element);
		EventManager.prototype.off.apply(em, args);
	}
};

module.exports = El;