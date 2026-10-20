// base
const noop = require('../base/noop');
// modules
const DataType = require('../modules/DataType');

var resolveCallbacks = function(callbacks) {
    if (DataType.isFunction(callbacks)) {
        callbacks = { success: callbacks };
    }
    else if (!DataType.isObject(callbacks)) {
        callbacks = {};
    }

    return {
        success: DataType.isFunction(callbacks.success) ? callbacks.success : noop
        ,error: DataType.isFunction(callbacks.error) ? callbacks.error : noop
        ,always: DataType.isFunction(callbacks.always) ? callbacks.always : noop
    };
};

var reportCallbackError = function(error) {
    setTimeout(function() {
        throw error;
    });
};

var runCallbacks = function(callbacks, success, text, response, data) {
    try {
        if (success) {
            callbacks.success(text, response, data);
        }
        else {
            callbacks.error(text, response, data);
        }
    }
    finally {
        callbacks.always(text, response, data);
    }
};

module.exports = function(url, callbacks, data, type) {
    callbacks = resolveCallbacks(callbacks);
    data = typeof data === 'undefined' ? {} : data;
    type = DataType.isString(type) ? type.toUpperCase() : 'GET';

    var options = { method: type };
    if (type !== 'GET' && type !== 'HEAD') {
        options.headers = { 'Content-Type': 'application/json;charset=UTF-8' };
        options.body = JSON.stringify(data);
    }

    var request = fetch(url, options);

    request.then(function(response) {
        response.clone().text().then(function(text) {
            runCallbacks(callbacks, response.ok, text, response, data);
        }, function() {
            runCallbacks(callbacks, false, '', response, data);
        }).catch(reportCallbackError);
    }, function() {
        try {
            runCallbacks(callbacks, false, '', null, data);
        }
        catch (callbackError) {
            reportCallbackError(callbackError);
        }
    });

    return request;
};
