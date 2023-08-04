var _ = {
    name: 'bglib',
    version: '1.0.0'
};

var bglib = {
    fn: {}
};

bglib.getName = function() {
    return _.name;
};

bglib.getVersion = function() {
    return _.version;
};

module.exports.bglib = bglib;