// modules
const El = require('../modules/Element');

module.exports = function(val, scope) {
	scope = scope || document.querySelector('body');
	val = parseInt(val, 10);
	var test = document.createElement('div');
	test.innerHTML = '&nbsp;';
	El.css(test, {
		"font-size": '1em'
		,"margin": 0
		,"padding": 0
		,"height": 'auto'
		,"line-height": 1
		,"border": 0
	});
	scope.appendChild(test);
	var testVal = parseFloat(El.css(test, 'height'));
	El.remove(test);
	return ((val / testVal).toFixed(8) + '').replace(/0+$/, '').replace(/\.$/, '') + 'em';
};