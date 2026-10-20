// base
const setModule = require('../base/setModule');
// modules
const BaseModule = require('./BaseModule');
const DataType = require('./DataType');
const Event = require('./Event');

var eventNames = function(names) {
    return DataType.isString(names) ? names.trim().split(/\s+/).filter(Boolean) : [];
};

var EventModule = BaseModule.extend({
    __moduleEvents: undefined
    ,constructor: function() {
        this.__moduleEvents = Object.create(null);
        BaseModule.apply(this, arguments);
    }
    ,on: function(/* names[, data, callback] */) {
        var args = [].slice.call(arguments);
        var names = eventNames(args.shift());
        var callback = args.pop();
        var data = args.length ? args[0] : undefined;

        if (!DataType.isFunction(callback)) {
            return this;
        }

        var _self = this;
        names.forEach(function(name) {
            if (!_self.__moduleEvents[name]) {
                _self.__moduleEvents[name] = [];
            }
            _self.__moduleEvents[name].push({
                callback: callback
                ,data: data
            });
        });
        return this;
    }
    ,off: function(/* [names][, callback] */) {
        var args = [].slice.call(arguments);
        var names = eventNames(args.shift());
        var callback = args[0];

        if (!names.length) {
            names = Object.keys(this.__moduleEvents);
        }

        var _self = this;
        names.forEach(function(name) {
            var handlers = _self.__moduleEvents[name];
            if (!handlers) {
                return;
            }
            if (!DataType.isFunction(callback)) {
                delete _self.__moduleEvents[name];
                return;
            }

            handlers = handlers.filter(function(handler) {
                return handler.callback !== callback;
            });
            if (handlers.length) {
                _self.__moduleEvents[name] = handlers;
            }
            else {
                delete _self.__moduleEvents[name];
            }
        });
        return this;
    }
    ,trigger: function(name, event) {
        var handlers = this.__moduleEvents[name] || [];
        var sourceEvent = event instanceof Event ? event : new Event(name, event);

        for (var i = 0; i < handlers.length; i++) {
            if (sourceEvent.isPropagationStopped()) {
                break;
            }

            var handler = handlers[i];
            var handlerEvent = new Event(name, sourceEvent.getEventProps(), handler.data);
            handler.callback.call(this, handlerEvent);
            if (handlerEvent.isPropagationStopped()) {
                sourceEvent.stopPropagation();
            }
            if (handlerEvent.isDefaultPrevented()) {
                sourceEvent.preventDefault();
            }
        }

        return !sourceEvent.isDefaultPrevented();
    }
    ,hasHandlers: function(name) {
        if (name) {
            return Boolean(this.__moduleEvents[name] && this.__moduleEvents[name].length);
        }
        return Object.keys(this.__moduleEvents).some(function(eventName) {
            return this.__moduleEvents[eventName].length > 0;
        }, this);
    }
});

setModule('EventModule', EventModule);
module.exports = EventModule;
