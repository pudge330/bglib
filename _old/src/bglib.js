var _bglib = {
    name: 'bglib'
    ,version: '1.0'
    ,modules: {}
};

var bglib = function() {};

bglib.fn = {};

bglib.getName = function() {
    return _bglib.name;
};

bglib.getVersion = function() {
    return _bglib.version;
};

bglib.fn.call = function(f, a) {
    return f.apply(null, a);
};
