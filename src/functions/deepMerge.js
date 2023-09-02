// functions
const isObject = require('../modules/DataType').isObject;

var deepMerge = function() {
	var args = Array.prototype.slice.call(arguments);
	if (args.length === 0)
		return {};
	var clone = false;
	if (args.length > 2 && args[args.length - 1] === true) {
		clone = true;
		args.pop();
	}
	var merged = clone ? Object.assign({}, args.shift()) : args.shift();
	for (var i = 0; i < args.length; i++) {
		for (var key in args[i]) {
			if (args[i].hasOwnProperty(key)) {
				if (isObject(args[i][key]) && !Array.isArray(args[i][key]) && merged.hasOwnProperty(key) && isObject(merged[key]))
					merged[key] = deepMerge(merged[key], args[i][key], true);
				else if (Array.isArray(args[i][key]) && merged.hasOwnProperty(key) && Array.isArray(merged[key]))
					merged[key] = merged[key].concat(args[i][key]);
				else {
					if (isObject(args[i][key]))
						args[i][key] = Object.assign({}, args[i][key]);
					merged[key] = args[i][key];
				}
			}
		}
	}
	return merged;
};

module.exports = deepMerge;