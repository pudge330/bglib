bglib.extend = function(name, prototypeProps, staticProps) {
    if (!bglib.DT.isString(name)) {
        // old order: prototypeProps, staticProps, name
        return bglib.extend(staticProps || 'Base', name || {}, prototypeProps || {});
    }
    prototypeProps = prototypeProps || {};
    staticProps = staticProps || {};
    name = name || 'Base';
    if (!_bglib.modules.hasOwnProperty(name)) {
        name = 'Base';
    }
    return _bglib.modules[name].extend(prototypeProps, staticProps);
};

bglib.module = function(name) {
    if (_bglib.modules.hasOwnProperty(name)) {
        return _bglib.modules[name];
    }
};

bglib.create = function(name) {
    if (_bglib.modules.hasOwnProperty(name)) {
        var args = Array.prototype.slice.call(arguments);
        args.shift();
        var argsDef = '';
        for (var i = 0; i < args.length; i++) {
            argsDef += (argsDef === '' ? '' : ', ') + 'args[' + i + ']';
        }
        return eval('new _bglib.modules[name](' + argsDef + ')');
        // return new _bglib.modules[name](...args);
    }
};
