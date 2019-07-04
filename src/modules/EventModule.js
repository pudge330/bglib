(function(bglib) {
	var BaseModule = bglib.BaseModule;
	var Event = bglib.Event;
	var module = BaseModule.extend({
		__moduleEvents: undefined
		,constructor: function() {
			var _self = this;
			_self.__moduleEvents = {};
			BaseModule.apply(_self, arguments);
		}
		,on: function(/* names[, data, cb] */) {
			var _self = this;
            var names, data, callback;
            var args = this.resolveArguments('on', arguments);
            names = args[0]; data = args[1]; callback = args[2];
            names = names != '' ? names.split(' ') : [];
            for (var i = 0; i < names.length; i++) {
            	var name  = names[i].trim();
            	if (!this.__moduleEvents.hasOwnProperty(name)) {
            		this.__moduleEvents[name] = {
            			name: name
            			,fn: function() {}
            			,handlers: new Map()
            			,data: new Map()
            		};
            		this.__moduleEvents[name].fn = (function(attached, evt) {
                        attached.handlers.forEach(function (status, key) {
                            if (evt.isPropagationStopped()) { return; }
                            if (status) {
                                var d = attached.data.get(key);
                                d = d || {};
                                var _evt = new Event(key.name, evt.getEventProps(), d);
                                var cb = key.callback.bind(_self);
                                cb(_evt);
                                if (_evt.isPropagationStopped()) {
                                    evt.stopPropagation();
                                }
                                if (_evt.isDefaultPrevented()) {
                                	evt.preventDefault();
                                }
                            }
                        });
                        return evt.isDefaultPrevented();
                    }).bind(this, this.__moduleEvents[name]);
            	}
            	var mapKey = {
                    name: name
                    ,callback: callback
                };
                this.__moduleEvents[name].handlers.set(mapKey, true);
                this.__moduleEvents[name].data.set(mapKey, data);
            }
		}
		,off: function(/* names[, cb, cache] */) {
			var names, callback, cache;
            var args = this.resolveArguments('off', arguments);
            names = args[0]; callback = args[1], cache = args[2];
            names = names != '' ? names.split(' ') : [];
            for (var i = 0; i < names.length; i++) {
            	var name = names[i];
                var mapKey = {
                    name: name
                    ,callback: callback
                };
                var found;
                this.__moduleEvents[name].handlers.forEach(function(value, key) {
                    if (!found && (mapKey.name == key.name && mapKey.callback == key.callback)) {
                        found = key;
                    }
                });
                if (found) {
                	if (cache) {
                    	this.__moduleEvents[name].handlers.set(found, false);
                    }
                    else {
                    	this.__moduleEvents[name].handlers.delete(found);
                    	this.__moduleEvents[name].data.delete(found);
                    }
                }
            }
		}
		,trigger: function(name, event) {
			if (!(event instanceof Event)) {
				event = new Event(name, event);
			}
			if (name in this.__moduleEvents) {
				var cnf = this.__moduleEvents[name];
				return cnf.fn(event);
			}
			return false;
		}
        ,hasHandlers: function(name) {
            if (this.__moduleEvents.hasOwnProperty(name)) {
                if (this.__moduleEvents[name].handlers.size) {
                    return true;
                }
            }
            return false;
        }
		,resolveArguments: function(type, arguments) {
			var args = [].slice.call(arguments);
            var names, data, callback, cache;
            names = args.shift();
            if (type === 'on') {
                switch (args.length) {
                    case 2:
                        data = args[0];
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
                    case 2:
                        cache = args[0];
                        callback = args[1];
                    break;
                    case 1:
                        if (bglib.DT.isFunction(args[0])) {
                            callback = args[0];
                        }
                    break;
                }
            	if (bglib.DT.isFunction(args[0])) {
	                 callback = args[0];
	            }
            }
            data = data || data;
            callback = callback || function() {};
            cache = typeof cache !== 'undefined' ? cache : false;
            names = names.trim();
            names = names ? names.replace(/(\s{2,})/, ' ') : '';
            if (type === 'on') {
                return [names, data, callback];
            }
            else {
                return [names, callback, cache];
            }
		}
	});
	bglib.EventModule = module;
	bglib.setRegisteredModule('Event', module);
})(bglib);