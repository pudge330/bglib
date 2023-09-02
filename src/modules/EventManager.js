// base
const extend = require('../base/extend');
// modules
const DataType = require('./DataType');
const Event = require('./Event');
const EventUtil = require('./EventUtil');

module.exports = extend({
    target: undefined
    ,attached: undefined
    ,init: function(target) {
        this.target = target;
        this.attached = {};
    }
    ,resolveArguments: function(type, args) {
        var args = [].slice.call(args);
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
                    if (DataType.isString(args[0])) {
                        selector = args[0];
                    }
                    else {
                        data = args[0];
                    }
                    callback = args[1];
                break;
                case 1:
                    if (DataType.isFunction(args[0])) {
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
                    if (DataType.isString(args[0])) {
                        selector = args[0];
                        callback = args[1];
                    }
                    else if (DataType.isFunction(args[0])) {
                        callback = args[0];
                        cache = args[1];
                    }
                break;
                case 1:
                    if (DataType.isFunction(args[0])) {
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