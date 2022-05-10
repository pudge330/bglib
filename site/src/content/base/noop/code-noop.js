function someFunction(callback) {
    if (!bglib.DT.isFunction(callback)) {
        callback = bglib.noop;
    }

    Some Code…

    //--call callback
    callback();
}