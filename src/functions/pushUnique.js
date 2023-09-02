module.exports = function(arr, val) {
	if (arr.indexOf(val) === -1) {
		arr.push(val);
	}
	return arr;
};