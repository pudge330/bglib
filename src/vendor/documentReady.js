var runCallback = function(callback, context) {
    callback.call(window, context);
};

module.exports = function(callback, context) {
    if (typeof callback !== 'function') {
        throw new TypeError('callback for documentReady(fn) must be a function');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            runCallback(callback, context);
        }, { once: true });
    }
    else {
        queueMicrotask(function() {
            runCallback(callback, context);
        });
    }
};
