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

bglib.fn.throttle = function(func, delay) {
	//--https://www.youtube.com/watch?v=cjIswDCKgu0
	var shouldWait = false;
	var waitingArguments = null;
	var timeoutFunc = function() {
		if (waitingArguments == null) {
			shouldWait = false;
		}
		else {
			func.apply(this, waitingArguments);
			waitingArguments = null;
			setTimeout(timeoutFunc, delay);
		}
	};
	return function() {
		var args = arguments;
		if (shouldWait) {
			waitingArguments = args;
			return;
		}
		func.apply(this, args);
		shouldWait = true;
		setTimeout(timeoutFunc, delay);
	}
};