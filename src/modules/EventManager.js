// base
const extend = require('../base/extend');
// modules
const DataType = require('./DataType');
const Event = require('./Event');

module.exports = extend({
    target: undefined
    ,attached: undefined
    ,init: function(target) {
        this.target = target;
        this.attached = {};
    }
    ,resolveArguments: function(type, args) {
        args = [].slice.call(args);
        var names = args.shift();
        var selector = null;
        var data;
        var callback;
        var cache = false;

        if (type === 'on') {
            if (args.length === 3) {
                selector = args[0];
                data = args[1];
                callback = args[2];
            }
            else if (args.length === 2) {
                if (DataType.isString(args[0])) {
                    selector = args[0];
                }
                else {
                    data = args[0];
                }
                callback = args[1];
            }
            else if (args.length === 1 && DataType.isFunction(args[0])) {
                callback = args[0];
            }
        }
        else {
            if (args.length === 3) {
                selector = args[0];
                callback = args[1];
                cache = args[2];
            }
            else if (args.length === 2) {
                if (DataType.isString(args[0])) {
                    selector = args[0];
                    callback = args[1];
                }
                else if (DataType.isFunction(args[0])) {
                    callback = args[0];
                    cache = args[1];
                }
            }
            else if (args.length === 1) {
                if (DataType.isString(args[0])) {
                    selector = args[0];
                }
                else if (DataType.isFunction(args[0])) {
                    callback = args[0];
                }
            }
        }

        names = DataType.isString(names) ? names.trim().split(/\s+/).filter(Boolean).join(' ') : '';
        if (type === 'on') {
            return [names, selector, data, callback];
        }
        return [names, selector, callback, Boolean(cache)];
    }
    ,on: function(/* names[, selector, data, cb] */) {
        var _self = this;
        var args = this.resolveArguments('on', arguments);
        var names = args[0] ? args[0].split(' ') : [];
        var selector = args[1];
        var data = args[2];
        var callback = args[3];

        if (!DataType.isFunction(callback)) {
            return;
        }

        names.forEach(function(name) {
            if (!_self.attached[name]) {
                var listener = function(originalEvent) {
                    _self.attached[name].handlers.slice().some(function(handler) {
                        if (!handler.active) {
                            return false;
                        }

                        var currentTarget = _self.target;
                        if (handler.selector) {
                            if (!(originalEvent.target instanceof Element)) {
                                return false;
                            }
                            currentTarget = originalEvent.target.closest(handler.selector);
                            if (!currentTarget || (
                                currentTarget !== _self.target &&
                                typeof _self.target.contains === 'function' &&
                                !_self.target.contains(currentTarget)
                            )) {
                                return false;
                            }
                        }

                        var event = new Event(name, {
                            target: originalEvent.target
                            ,currentTarget: currentTarget
                            ,detail: originalEvent.detail
                        }, handler.data, originalEvent);
                        handler.callback.call(currentTarget, event);
                        return event.isPropagationStopped();
                    });
                };
                _self.attached[name] = {
                    listener: listener
                    ,handlers: []
                };
                _self.target.addEventListener(name, listener);
            }

            _self.attached[name].handlers.push({
                selector: selector
                ,data: data
                ,callback: callback
                ,active: true
            });
        });
    }
    ,off: function(/* names[, selector, cb, cache] */) {
        var _self = this;
        var args = this.resolveArguments('off', arguments);
        var names = args[0] ? args[0].split(' ') : Object.keys(this.attached);
        var selector = args[1];
        var callback = args[2];
        var cache = args[3];

        names.forEach(function(name) {
            var attached = _self.attached[name];
            if (!attached) {
                return;
            }

            attached.handlers = attached.handlers.filter(function(handler) {
                var matches = (selector === null || selector === handler.selector) &&
                    (!callback || callback === handler.callback);
                if (matches && cache) {
                    handler.active = false;
                    return true;
                }
                return !matches;
            });

            if (!attached.handlers.length) {
                _self.target.removeEventListener(name, attached.listener);
                delete _self.attached[name];
            }
        });
    }
    ,hasHandlers: function(name) {
        if (name) {
            return Boolean(this.attached[name] && this.attached[name].handlers.length);
        }
        return Object.keys(this.attached).some(function(eventName) {
            return this.attached[eventName].handlers.length > 0;
        }, this);
    }
});
