module.exports = function(arr1, arr2) {
	var values = new Set(arr1);
	arr2.forEach(function(value) {
		if (!values.has(value)) {
			values.add(value);
			arr1.push(value);
		}
	});
	return arr1;
};
