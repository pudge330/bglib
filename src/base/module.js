// base
const _ = require('./core');

module.exports = function(name) {
    if (_.modules.hasOwnProperty(name)) {
        return _.modules[name];
    }
}