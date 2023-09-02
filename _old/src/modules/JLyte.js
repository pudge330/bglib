(function(bglib) {
	var _hasLoaded = false;
	var _onloadCallbacks = [];
	bglib.DomEvents.document.on('ready', function() {
		for (var i = 0; i < _onloadCallbacks.length; i++) {
			(_onloadCallbacks[i])();
		}
		_onloadCallbacks = [];
		_hasLoaded = true;
	});
	var module = function (arg, init) {
		//--if function handle as onload event
		if (bglib.DT.isFunction(arg)) {
			if (_hasLoaded) {
				arg();
			}
			else {
				_onloadCallbacks.push(arg);
			}
			return;
		}
		if (init) {
			if (!bglib.DT.isArray(arg) && !bglib.DT.isString(arg)) {
				arg = [arg];
			}
			var elements = bglib.El.elements(arg);
			for (var i = 0; i < elements.length; i++) {
				this[i] = elements[i];
			}
			this.length = elements.length;
			//--load data- attributes
			for (var i = 0; i < this.length; i++) {
				if (this[i].nodeType != 3) {
                    var attrs = bglib.El.getAttributes(this[i]);
                    for (var attrKey in attrs) {
                        if (attrs.hasOwnProperty(attrKey)) {
                            if (attrKey.match(/^data-/)) {
                                var key = attrKey.replace(/^data-/, '');
                                key = bglib.fn.toCamelCase(key);
                                bglib.El.data.set(this[i], key, attrs[attrKey]);
                            }
                        }
                    }
                }
			}
		}
		else {
			return new module(arg, true);
		}
	};

	module.prototype.each = function(cb) {
		var _self = this;
		for (var i = 0; i < _self.length; i++) {
			var tmp = cb.bind(_self[i]);
			tmp(i, _self[i]);
		}
		return this;
	};	

	module.prototype.toArray = function() {
		var arr = [];
		for (var i = 0; i < this.length; i++) {
			arr.push(this[i]);
		}
		return arr;
	};

	module.prototype.addClass = function(cls) {
		for (var i = 0; i < this.length; i++) {
			bglib.El.addClass(this[i], cls);
		}
		return this;
	};

	module.prototype.removeClass = function(cls) {
		for (var i = 0; i < this.length; i++) {
			bglib.El.removeClass(this[i], cls);
		}
		return this;
	};

	module.prototype.toggleClass = function(cls) {
		for (var i = 0; i < this.length; i++) {
			bglib.El.toggleClass(this[i], cls);
		}
		return this;
	};

	module.prototype.hasClass = function(cls) {
		var hasClass = true;
		for (var i = 0; i < this.length; i++) {
			if (!bglib.El.hasClass(this[i], cls)) {
				hasClass = false;
				i = this.length;
			}
		}
		return hasClass;
	};

	module.prototype.find = function(sel) {
		var elms = [];
		this.each(function() {
			elms = elms.concatUnique(Array.prototype.slice.call(this.querySelectorAll(sel)));
		});
		return module(elms);
	};

	module.prototype.parent = function() {
		var parents = [];
		this.each(function() {
			parents = parents.concatUnique([this.parentElement]);
		});
		return module(parents);
	};

	module.prototype.children = function() {
		var children = [];
		this.each(function() {
			children = children.concatUnique(this.childNodes);
		});
		return module(children);
	};

	module.prototype.attr = function(k, v) {
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

	module.prototype.removeAttr = function(k) {
		this.each(function() {
			this.removeAttribute(k);
		});
		return this;
	};

	module.prototype.data = function(key, value) {
    	if (arguments.length > 1) {
    		this.each(function() {
    			bglib.El.data.set(this, key, value);
    		});
    		return this;
    	}
    	else {
    		var val;
			if (this.length) {
				val = bglib.El.data.get(this[0], key);
			}
    		return val;
    	}
    };

    module.prototype.removeData = function(k) {
    	this.each(function() {
			bglib.El.data.remove(this, key);
		});
		return this;
    };

    module.prototype.closest = function(sel) {
    	var parents = [];
    	this.each(function() {
	    	var tmp = this.closest(sel);
	    	if (tmp) {
	    		if (parents.indexOf(tmp) === -1) {
	    			parents.pushUnique(tmp);
	    		}
	    	}
    	});
    	return module(parents);
    };

    module.prototype.remove = function() {
    	this.each(function() {
    		bglib.El.data.remove(this);
    		bglib.El.remove(this);
    	});
    	this.length = 0;
    	return this;
    };

    module.prototype.css = function(attr, value) {
    	if (arguments.length > 1) {
    		this.each(function() {
    			bglib.El.css(this, attr, value);
    		});
    		return this;
    	}
    	else {
    		if (bglib.DT.isObject(attr)) {
    			for (var key in attr) {
    				if (attr.hasOwnProperty(key)) {
    					this.css(key, attr[key]);
    				}
    			}
    			return this;
    		}
    		var val = undefined;
    		if (this.length) {
    			val = bglib.El.css(this[0], attr);
    		}
    		return val;
    	}
    };

    module.prototype.on = function(/* names[, selector, data, cb] */) {
    	var args = [].slice.call(arguments);
        args.unshift(null);
        this.each(function() {
            args[0] = this;
            bglib.El.on.apply(null, args);
        });
	};

    module.prototype.off = function(/* names[, selector, cb] */) {
        var args = [].slice.call(arguments);
        args.unshift(null);
        this.each(function() {
            args[0] = this;
            bglib.El.off.apply(null, args);
        });
    };

    module.prototype.val = function(value) {
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

    module.prototype.append = function() {
    	for (var i = 0; i < arguments.length; i++) {
    		var arg = arguments[i];
    		var _this = this;
    		this.each(function() {
    			if (!bglib.DT.isArray(arg) && !(arg instanceof NodeList)) {
    				if (arg instanceof module) {
    					arg = arg.toArray();
    				}
    				else {
    					arg = [arg];
    				}
    			}
    			for (var j = 0; j < arg.length; j++) {
    				var nodes = bglib.El.elements(arg[j]);
    				for (var nc = 0; nc < nodes.length; nc++) {
    					if (this != nodes[nc]) {
                            this.appendChild(nodes[nc]);
                        }
    				}
    			}
    		});
    	}
    };

    module.prototype.prepend = function() {
    	var args = [].slice.call(arguments).reverse();
    	for (var i = 0; i < args.length; i++) {
    		var arg = args[i];
    		var _this = this;
    		if (!bglib.DT.isArray(arg) && !(arg instanceof NodeList)) {
				if (arg instanceof module) {
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
    				var nodes = bglib.El.elements(arg[j]);
    				for (var nc = nodes.length - 1; nc >= 0; nc--) {
    					this.prepend(nodes[nc]);
    				}
    			}
    		});
    	}
    };

    module.prototype.appendTo = function(target) {
    	target = bglib.El.elements(target);
    	for (var i = 0; i < target.length; i++) {
    		this.each(function() {
    			target[i].appendChild(this);
    		});
    	}
    };

    module.prototype.prependTo = function(target) {
    	target = bglib.El.elements(target);
    	for (var i = 0; i < target.length; i++) {
    		this.each(function() {
    			target[i].prepend(this);
    		});
    	}
    };

    module.prototype.insertBefore = function(target) {
    	target = bglib.El.elements(target);
    	for (var i = 0; i < target.length; i++) {
    		this.each(function() {
    			target[i].parentElement.insertBefore(this, target[i]);
    		});
    	}
    };

    module.prototype.insertAfter = function(target) {
    	target = bglib.El.elements(target);
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

    module.prototype.html = function(html) {
    	if (typeof html === 'undefined') {
    		var val;
    		if (this.length) {
    			val = this[0].innerHTML;
    		}
    		return val;
    	}
    	else {
    		this.each(function() {
                if (bglib.DT.isObject(html)) {
    			    this.innerHTML = '';
                    var elements = bglib.El.elements(html);
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

    module.prototype.outerHtml = function() {
        var val;
        if (this.length) {
            val = this[0].outerHtml;
        }
        return val;
    };

    module.prototype.text = function(text) {
        if (typeof text === 'undefined') {
            var val;
            if (this.length) {
                val = bglib.El.text(this[0]);
                val = val.replace(/\r\n|\n/g, ' ').replace(/ +(?= )/g, '');
            }
            return val;
        }
        else {
            this.each(function() {
                this.innerHTML = bglib.fn.htmlEntities(text);
            });
            return this;
        }
    };

    module.prototype.val = function(value) {
        if (typeof value === 'undefined') {
            var val;
            if (this.length) {
                val = this[0].value;
                //--need to handle selects (single + multiple[])
            }
            return val;
        }
        else {
            value = bglib.DT.isArray(value) ? value : [value];
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
    module.each = function(data, handler) {
    	if (data instanceof module) {
    		data.each(function(i, el) {
    			handler(i, jLyte(el));
    		});
    	}
    	else if (bglib.DT.isObject(data)) {
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

	bglib.jLyte = module;
})(bglib);