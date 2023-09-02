// base
const _ = require('./core');
// modules
const DataType = require('../modules/DataType');

const extend = function(name, prototypeProps, staticProps) {
    if (!DataType.isString(name)) {
        // old order: prototypeProps, staticProps, name
        return extend(staticProps || 'Base', name || {}, prototypeProps || {});
    }
    prototypeProps = prototypeProps || {};
    staticProps = staticProps || {};
    name = name || 'Base';
    if (!_.modules.hasOwnProperty(name)) {
        name = 'Base';
    }
    return _.modules[name].extend(prototypeProps, staticProps);
};

module.exports = extend;