// functions
const isObject = require('../modules/DataType').isObject;

const deepCopyMerge = function() {
	var args = Array.prototype.slice.call(arguments);
	if (args.length === 0)
		return {};
	var merged = Object.assign({}, args.shift());
	for (var i = 0; i < args.length; i++) {
		for (var key in args[i]) {
			if (args[i].hasOwnProperty(key)) {
				if (isObject(args[i][key]) && !Array.isArray(args[i][key]) && merged.hasOwnProperty(key) && isObject(merged[key]))
					merged[key] = deepCopyMerge(merged[key], args[i][key]);
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

module.exports = deepCopyMerge;