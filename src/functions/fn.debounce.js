bglib.fn.debounce = function(func, delay) {
	var timer;
	return function() {
		var context = this,
			args = arguments;
		clearTimeout(timer);
		timer = setTimeout(function() {
			func.apply(context, args);
		}, delay);
	};
};