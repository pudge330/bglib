const watchState = require('./watchState');

module.exports = function(object, callback) {
    if ((typeof object !== 'object' || object === null) && typeof object !== 'function') {
        throw new TypeError('watch() requires an object or function');
    }
    if (typeof callback !== 'function') {
        throw new TypeError('watch() requires a callback function');
    }

    var state = watchState.states.get(object);
    if (state) {
        state.callbacks.add(callback);
        return object;
    }

    var existingProxy = watchState.proxies.get(object);
    if (existingProxy) {
        watchState.states.get(existingProxy).callbacks.add(callback);
        return existingProxy;
    }

    state = {
        callbacks: new Set()
    };
    state.callbacks.add(callback);

    var proxy = new Proxy(object, {
        set: function(target, property, value, receiver) {
            var oldValue = Reflect.get(target, property, receiver);
            var success = Reflect.set(target, property, value, receiver);

            if (success && !Object.is(oldValue, value)) {
                Array.from(state.callbacks).forEach(function(callback) {
                    callback.call(receiver, property, oldValue, value);
                });
            }

            return success;
        }
    });

    watchState.proxies.set(object, proxy);
    watchState.states.set(proxy, state);

    return proxy;
};
