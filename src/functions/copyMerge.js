const copy = require('./copy');

module.exports = function(o1, o2) {
	return Object.assign(
		copy(o1)
		,o2
	);
};