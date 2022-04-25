bglib.create = function(name, prototypeProps, staticProps) {
    if (!bglib.DT.isString(name)) {
        // old order: prototypeProps, staticProps, name
        return bglib.create(staticProps || 'Base', name || {}, prototypeProps || {});
    }
    prototypeProps = prototypeProps || {};
    staticProps = staticProps || {};
    name = name || 'Base';
    if (!_bglib.modules.hasOwnProperty(name)) {
        name = 'Base';
    }
    return _bglib.modules[name].extend(prototypeProps, staticProps);
};