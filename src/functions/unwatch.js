const watchState = require('./watchState');

module.exports = function(object, callback) {
    var proxy = watchState.states.has(object)
        ? object
        : watchState.proxies.get(object);

    if (!proxy) {
        return object;
    }

    var state = watchState.states.get(proxy);
    if (typeof callback === 'function') {
        state.callbacks.delete(callback);
    }
    else {
        state.callbacks.clear();
    }

    return proxy;
};
