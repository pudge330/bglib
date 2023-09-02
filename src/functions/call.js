module.exports = function(func, args) {
	return func.apply(null, args);
};