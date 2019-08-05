bglib.fn.toEm = function(val, scope) {
	scope = scope || document.querySelector('body');
	val = parseInt(val, 10);
	var test = document.createElement('div');
	test.innerHTML = '&nbsp;';
	bglib.El.css(test, {
		"font-size": '1em'
		,"margin": 0
		,"padding": 0
		,"height": 'auto'
		,"line-height": 1
		,"border": 0
	});
	scope.appendChild(test);
	var testVal = parseFloat(bglib.El.css(test, 'height'));
	bglib.El.remove(test);
	return (val / testVal).toFixed(8) + 'em';
};
bglib.fn.toPx = function(val, scope) {
	scope = scope || document.querySelector('body');
	val = parseFloat(val);
	var test = document.createElement('div');
	test.innerHTML = '&nbsp;';
	bglib.El.css(test, {
		"font-size": '1em'
		,"margin": 0
		,"padding": 0
		,"height": 'auto'
		,"line-height": 1
		,"border": 0
	});
	scope.appendChild(test);
	var testVal = parseFloat(bglib.El.css(test, 'height'));
	bglib.El.remove(test);
	return Math.round(val * testVal) + 'px';
};