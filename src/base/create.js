// base
const _ = require('./core');

module.exports = function(name) {
    if (_.hasOwnProperty(name)) {
        var args = Array.prototype.slice.call(arguments);
        args.shift();
        var argsDef = '';
        for (var i = 0; i < args.length; i++) {
            argsDef += (argsDef === '' ? '' : ', ') + 'args[' + i + ']';
        }
        return eval('new _[name](' + argsDef + ')');
    }
};