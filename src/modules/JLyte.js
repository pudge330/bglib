const toCamelCase = require('../functions/toCamelCase');
const htmlEntities = require('../functions/htmlEntities')
const El = require('./Element');
const DomEvents = require('./DomEvents');
const DataType = require('./DataType');

console.log(El);

var _hasLoaded = false;
var _onloadCallbacks = [];
DomEvents.document.on('ready', function() {
	for (var i = 0; i < _onloadCallbacks.length; i++) {
		(_onloadCallbacks[i])();
	}
	_onloadCallbacks = [];
	_hasLoaded = true;
});
var jLyte = function (arg, init) {
	//--if function handle as onload event
	if (DataType.isFunction(arg)) {
		if (_hasLoaded) {
			arg();
		}
		else {
			_onloadCallbacks.push(arg);
		}
		return;
	}
	if (init) {
		if (!DataType.isArray(arg) && !DataType.isString(arg)) {
			arg = [arg];
		}
		var elements = El.elements(arg);
		for (var i = 0; i < elements.length; i++) {
			this[i] = elements[i];
		}
		this.length = elements.length;
		//--load data- attributes
		for (var i = 0; i < this.length; i++) {
			if (this[i].nodeType != 3) {
                var attrs = El.getAttributes(this[i]);
                for (var attrKey in attrs) {
                    if (attrs.hasOwnProperty(attrKey)) {
                        if (attrKey.match(/^data-/)) {
                            var key = attrKey.replace(/^data-/, '');
                            key = toCamelCase(key);
                            El.data.set(this[i], key, attrs[attrKey]);
                        }
                    }
                }
            }
		}
	}
	else {
		return new jLyte(arg, true);
	}
};

jLyte.prototype.each = function(cb) { // √ not needed
	var _self = this;
	for (var i = 0; i < _self.length; i++) {
		var tmp = cb.bind(_self[i]);
		tmp(i, _self[i]);
	}
	return this;
};	

jLyte.prototype.toArray = function() { // √ not needed
	var arr = [];
	for (var i = 0; i < this.length; i++) {
		arr.push(this[i]);
	}
	return arr;
};

jLyte.prototype.addClass = function(cls) { // √
	for (var i = 0; i < this.length; i++) {
		El.addClass(this[i], cls);
	}
	return this;
};

jLyte.prototype.removeClass = function(cls) { // √
	for (var i = 0; i < this.length; i++) {
		El.removeClass(this[i], cls);
	}
	return this;
};

jLyte.prototype.toggleClass = function(cls) { // √
	for (var i = 0; i < this.length; i++) {
		El.toggleClass(this[i], cls);
	}
	return this;
};

jLyte.prototype.hasClass = function(cls) { // √
	var hasClass = true;
	for (var i = 0; i < this.length; i++) {
		if (!El.hasClass(this[i], cls)) {
			hasClass = false;
			i = this.length;
		}
	}
	return hasClass;
};

jLyte.prototype.find = function(sel) { // √ not needed
	var elms = [];
	this.each(function() {
		elms = elms.concatUnique(Array.prototype.slice.call(this.querySelectorAll(sel)));
	});
	return jLyte(elms);
};

jLyte.prototype.parent = function() { // √ not needed
	var parents = [];
	this.each(function() {
		parents = parents.concatUnique([this.parentElement]);
	});
	return jLyte(parents);
};

jLyte.prototype.children = function() { // √ not neded
	var children = [];
	this.each(function() {
		children = children.concatUnique(this.childNodes);
	});
	return jLyte(children);
};

jLyte.prototype.attr = function(k, v) { // √
	if (arguments.length > 1) {
		this.each(function() {
			this.setAttribute(k, v);
		});
		return this;
	}
	else {
		var val;
		if (this.length) {
			val = this[0].getAttribute(k);
		}
		return val;
	}
};

jLyte.prototype.removeAttr = function(k) { // √ not needed
	this.each(function() {
		this.removeAttribute(k);
	});
	return this;
};

jLyte.prototype.data = function(key, value) { // √
	if (arguments.length > 1) {
		this.each(function() {
			El.data.set(this, key, value);
		});
		return this;
	}
	else {
		var val;
		if (this.length) {
			val = El.data.get(this[0], key);
		}
		return val;
	}
};

jLyte.prototype.removeData = function(k) { // √
	this.each(function() {
		El.data.remove(this, key);
	});
	return this;
};

jLyte.prototype.closest = function(sel) { // √
	var parents = [];
	this.each(function() {
    	var tmp = this. (sel);
    	if (tmp) {
    		if (parents.indexOf(tmp) === -1) {
    			parents.pushUnique(tmp);
    		}
    	}
	});
	return jLyte(parents);
};

jLyte.prototype.remove = function() {
	this.each(function() {
		El.data.remove(this);
		El.remove(this);
	});
	this.length = 0;
	return this;
};

jLyte.prototype.css = function(attr, value) {
	if (arguments.length > 1) {
		this.each(function() {
			El.css(this, attr, value);
		});
		return this;
	}
	else {
		if (DataType.isObject(attr)) {
			for (var key in attr) {
				if (attr.hasOwnProperty(key)) {
					this.css(key, attr[key]);
				}
			}
			return this;
		}
		var val = undefined;
		if (this.length) {
			val = El.css(this[0], attr);
		}
		return val;
	}
};

jLyte.prototype.on = function(/* names[, selector, data, cb] */) {
	var args = [].slice.call(arguments);
    args.unshift(null);
    this.each(function() {
        args[0] = this;
        El.on.apply(null, args);
    });
};

jLyte.prototype.off = function(/* names[, selector, cb] */) {
    var args = [].slice.call(arguments);
    args.unshift(null);
    this.each(function() {
        args[0] = this;
        El.off.apply(null, args);
    });
};

jLyte.prototype.val = function(value) {
	if (typeof value === 'undefined') {
		var val;
		if (this.length) {
			val = this[0].value;
		}
		return val;
	}
	else {
		this.each(function() {
			this.value = value;
		});
		return this;
	}
};

jLyte.prototype.append = function() {
	for (var i = 0; i < arguments.length; i++) {
		var arg = arguments[i];
		var _this = this;
		this.each(function() {
			if (!DataType.isArray(arg) && !(arg instanceof NodeList)) {
				if (arg instanceof jLyte) {
					arg = arg.toArray();
				}
				else {
					arg = [arg];
				}
			}
			for (var j = 0; j < arg.length; j++) {
				var nodes = El.elements(arg[j]);
				for (var nc = 0; nc < nodes.length; nc++) {
					if (this != nodes[nc]) {
                        this.appendChild(nodes[nc]);
                    }
				}
			}
		});
	}
};

jLyte.prototype.prepend = function() {
	var args = [].slice.call(arguments).reverse();
	for (var i = 0; i < args.length; i++) {
		var arg = args[i];
		var _this = this;
		if (!DataType.isArray(arg) && !(arg instanceof NodeList)) {
			if (arg instanceof jLyte) {
				arg = arg.toArray();
			}
			else {
				arg = [arg];
			}
		}
		arg = arg.reverse();
		this.each(function() {
			for (var j = 0; j < arg.length; j++) {
				//--needs to check if not function for newer jquery compliance, same with append
				var nodes = El.elements(arg[j]);
				for (var nc = nodes.length - 1; nc >= 0; nc--) {
					this.prepend(nodes[nc]);
				}
			}
		});
	}
};

jLyte.prototype.appendTo = function(target) {
	target = El.elements(target);
	for (var i = 0; i < target.length; i++) {
		this.each(function() {
			target[i].appendChild(this);
		});
	}
};

jLyte.prototype.prependTo = function(target) {
	target = El.elements(target);
	for (var i = 0; i < target.length; i++) {
		this.each(function() {
			target[i].prepend(this);
		});
	}
};

jLyte.prototype.insertBefore = function(target) {
	target = El.elements(target);
	for (var i = 0; i < target.length; i++) {
		this.each(function() {
			target[i].parentElement.insertBefore(this, target[i]);
		});
	}
};

jLyte.prototype.insertAfter = function(target) {
	target = El.elements(target);
	for (var i = 0; i < target.length; i++) {
		this.each(function() {
			var nextNode = target[i].nextSibling;
			if (nextNode) {
				target[i].parentElement.insertBefore(this, nextNode);
			}
			else {
				target[i].parentElement.appendChild(this);
			}
		});
	}
};

jLyte.prototype.html = function(html) {
	if (typeof html === 'undefined') {
		var val;
		if (this.length) {
			val = this[0].innerHTML;
		}
		return val;
	}
	else {
		this.each(function() {
            if (DataType.isObject(html)) {
			    this.innerHTML = '';
                var elements = El.elements(html);
                for (var i = 0; i < elements.length; i++) {
                    this.appendChild(elements[i]);
                }
            }
            else {
                this.innerHTML = html;
            }
		});
		return this;
	}
};

jLyte.prototype.outerHtml = function() {
    var val;
    if (this.length) {
        val = this[0].outerHtml;
    }
    return val;
};

jLyte.prototype.text = function(text) {
    if (typeof text === 'undefined') {
        var val;
        if (this.length) {
            val = El.text(this[0]);
            val = val.replace(/\r\n|\n/g, ' ').replace(/ +(?= )/g, '');
        }
        return val;
    }
    else {
        this.each(function() {
            this.innerHTML = htmlEntities(text);
        });
        return this;
    }
};

jLyte.prototype.val = function(value) {
    if (typeof value === 'undefined') {
        var val;
        if (this.length) {
            val = this[0].value;
            //--need to handle selects (single + multiple[])
        }
        return val;
    }
    else {
        value = DataType.isArray(value) ? value : [value];
        this.each(function() {
            var $this = jLyte(this);
            var tagName = this.tagName.toLowerCase();
            if (tagName === 'select') {
                value = this.multiple && value.length ? [value.pop()] : value;
                $this.find('option').each(function() {
                    this.selected = "false";
                    if (this.value && value.indexOf(this.value) !== -1) {
                        this.selected = "true";
                    }
                });
            }
            else if (tagName === 'input') {
                var type = this.type;
                if (['checkbox', 'radio'].indexOf(type) !== -1) {
                    this.checked = false;
                    if (this.value && value.indexOf(this.value) !== -1) {
                        this.checked = true;
                    }
                }
                else {
                    this.value = value[0];
                }
            }
            else {
                this.value = value[0];
            }
        });
        return this;
    }
};

//--static
jLyte.each = function(data, handler) {
	if (data instanceof jLyte) {
		data.each(function(i, el) {
			handler(i, jLyte(el));
		});
	}
	else if (DataType.isObject(data)) {
		var index = -1;
		for (var key in data) {
			if (data.hasOwnProperty(key)) {
				index++;
				handler(key, data[key], index);
			}
		}
	}
	else {
		for (var i = 0; i < data.length; i++) {
			handler(i, data[i]);
		}
	}
};

module.exports = jLyte;