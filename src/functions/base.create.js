bglib.create = function(p, s, t) {
    p = p || {};
    s = s || {};
    t = t || 'Base';
    if (!_bglib.modules.hasOwnProperty(t)) {
        t = 'Base';
    }
    if (_bglib.modules.hasOwnProperty(t)) {
        return _bglib.modules[t].extend(p, s);
    }
};