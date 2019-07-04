bglib.fn.request = function(url, cb, data, type) {
    data = data || {};
    type = type || 'GET';
    var sendData = (type !== 'GET');
    cb = cb || bglib.noop;
    cb = bglib.DT.isFunction(cb)
        ? {success: cb, error: bglib.noop}
        : Object.assign({success: bglib.noop, error: bglib.noop}, cb)
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
    }, false);
    if (sendData) {
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify(data));
    }
    else {
        xhr.send();
    }
};