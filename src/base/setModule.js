// base
const _ = require('./core');

module.exports = function(n, m) {
    _.modules[n] = m;
};