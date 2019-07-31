(function(bglib) {
	var EventManager = bglib.EventManager;
	var elData = new bglib.ElementalData();
	var elEventMap = new WeakMap();
	var m = {};
	m.getAttributes = function(e) {
	    var a = {};
	    var el = null;
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