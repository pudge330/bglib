// base
const noop = require('../base/noop');
// modules
const DataType = require('../modules/DataType');

module.exports = function(url, cb, data, type) {
    data = data || {};
    type = type || 'GET';
    var sendData = (type !== 'GET');
    cb = cb || noop;
    cb = DataType.isFunction(cb)
        ? {success: cb, error: noop, always: noop}
        : Object.assign({success: noop, error: noop, always: noop}, cb)
    ;
    var xhr = new XMLHttpRequest();
    xhr.open(type, url, true);
    xhr.addEventListener("readystatechange", function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            cb.success(xhr.responseText, xhr, data);
        }
        else {
            cb.error(xhr.responseText, xhr, data);
        }
        cb.always(xhr.responseText, xhr, data);
    }, false);
    if (sendData) {
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify(data));
    }
    else {
        xhr.send();
    }
};