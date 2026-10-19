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
var classNames = function(cls) {
	return String(cls).trim().split(/\s+/).filter(function(name) {
		return name !== '';
	});
};
El.addClass = function(e, cls) {
	classNames(cls).forEach(function(name) {
		e.classList.add(name);
	});
};
El.removeClass = function(e, cls) {
	classNames(cls).forEach(function(name) {
		e.classList.remove(name);
	});
};
El.toggleClass = function(e, cls) {
	classNames(cls).forEach(function(name) {
		e.classList.toggle(name);
	});
};
El.hasClass = function(e, cls) {
	var names = classNames(cls);
	return names.length > 0 && names.every(function(name) {
		return e.classList.contains(name);
	});
};
El.css = function(e, prop, val){
	if (typeof val === 'undefined' && DataType.isObject(prop)) {
		for (var key in prop) {
			if (prop.hasOwnProperty(key)) {
				El.css(e, key, prop[key]);
			}
		}
		return;
	}
	if (typeof val === 'undefined') {
		var styles = window.getComputedStyle(e);
		return prop.indexOf('-') !== -1
			? styles.getPropertyValue(prop)
			: styles[prop];
	}
	if (prop) {
		if (prop.indexOf('-') !== -1) {
			e.style.setProperty(prop, val);
		}
		else {
			e.style[prop] = val;
		}
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
    if (arguments.length < 2) {
        return elData.remove(e);
    }
    return elData.remove(e, key);
};
El.closest = function(e, sel) {
	return e.closest(sel) || undefined;
};
El.element = function(e) {
    var elements = El.elements(e);
    return elements.length ? elements[0] : null;
};
var isJQueryObject = function(value) {
    return typeof jQuery !== 'undefined' && value instanceof jQuery;
};
var isNode = function(value) {
    return typeof Node !== 'undefined' && value instanceof Node;
};
var addElements = function(elements, value) {
    if (value === null || typeof value === 'undefined') {
        return;
    }
    if (DataType.isString(value)) {
        elements.push.apply(elements, El.resolveElements(value));
        return;
    }
    if (isJQueryObject(value)) {
        value.toArray().forEach(function(element) {
            addElements(elements, element);
        });
        return;
    }
    if (isNode(value)) {
        if (typeof DocumentFragment !== 'undefined' && value instanceof DocumentFragment) {
            Array.from(value.childNodes).forEach(function(element) {
                addElements(elements, element);
            });
        }
        else {
            elements.push(value);
        }
        return;
    }
    if (typeof value[Symbol.iterator] === 'function') {
        Array.from(value).forEach(function(element) {
            addElements(elements, element);
        });
    }
};
El.elements = function() {
    var elms = [];
    for (var i = 0; i < arguments.length; i++) {
        addElements(elms, arguments[i]);
    }
    return elms;
};
El.resolveElements = function(str) {
    str = str.trim();
    if (!str) {
        return [];
    }
    if (/^(text#|txt#)/.test(str)) {
        return [document.createTextNode(str.replace(/^(text#|txt#)/, ''))];
    }
    if (str.charAt(0) === '<') {
        var template = document.createElement('template');
        template.innerHTML = str;
        return Array.from(template.content.childNodes);
    }
    try {
        return Array.from(document.querySelectorAll(str));
    }
    catch (e) {
        return [];
    }
};
El.offset = function(e) {
    var rect = e.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
}
El.remove = function(e) {
	if (!e) {
		return;
	}
	if (typeof e.remove === 'function') {
		e.remove();
		return;
	}
	if (typeof e.length === 'number') {
		Array.from(e).forEach(function(element) {
			if (element && typeof element.remove === 'function') {
				element.remove();
			}
		});
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
		if (!em.hasHandlers()) {
			elEventMap.delete(element);
		}
	}
};
El.trigger = function(element, name, detail) {
	if (!element || !DataType.isString(name) || !name.trim()) {
		return false;
	}
	var event = new CustomEvent(name.trim(), {
		bubbles: true
		,cancelable: true
		,detail: detail
	});
	return element.dispatchEvent(event);
};

module.exports = El;
