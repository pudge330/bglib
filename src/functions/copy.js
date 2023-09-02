module.exports = function(o) {
	if (null === o || "object" != typeof o)
		return o;
	var c = o.constructor();
	return Object.assign(c, o);
};