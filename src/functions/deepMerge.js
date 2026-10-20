const mergeObjects = require('./mergeObjects');

module.exports = function() {
    var args = Array.prototype.slice.call(arguments);
    if (!args.length) {
        return {};
    }

    var merged = args.shift();
    args.forEach(function(source) {
        mergeObjects(merged, source);
    });
    return merged;
};
