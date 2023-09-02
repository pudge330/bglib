// base
const run = require('../base/run');
// functions
const compileTemplate = require('./compileTemplate');
const formatDecimal = require('./formatDecimal');
const formatPrice = require('./formatPrice');
const htmlEntities = require('./htmlEntities');
const rand = require('./rand');
const toCamelCase = require('./toCamelCase');
const toEm = require('./toEm');
const toProperCase = require('./toProperCase');
const toPx = require('./toPx');
// modules
const DataType = require('../modules/DataType');

let renderTemplate = function(tpl, data) {
	var helpers = renderTemplate.helpers,
		format = renderTemplate.format,
		fn = renderTemplate.fn,
		data = data || {},
		dataKeys = Object.keys(data),
		tpl1 = '';
	for (var i = 0; i < dataKeys.length; i++) {
		if (['helpers', 'format', 'fn', 'data'].indexOf(dataKeys[i]) === -1 && dataKeys[i].match(/^[a-zA-Z_][a-zA-Z0-9_]*$/)) {
			tpl1 += 'var ' + dataKeys[i] + ' = this.' + dataKeys[i] + ';';
		}
	}
	tpl = tpl1 + (tpl.match(/^var __bglib_template__ = \'/) ? tpl : compileTemplate(tpl, Object.keys(data)));
	return function() {
		eval(tpl);
		return __bglib_template__;
	}.call(data);
};

renderTemplate.helpers = {};
renderTemplate.helpers.htmlEntities = htmlEntities;
renderTemplate.helpers.rand = rand;
renderTemplate.helpers.toEm = toEm;
renderTemplate.helpers.toPx = toPx;
renderTemplate.helpers.dt = DataType;
renderTemplate.format = {};
renderTemplate.format.camelCase = toCamelCase;
renderTemplate.format.properCase = toProperCase;
renderTemplate.format.decimal = formatDecimal;
renderTemplate.format.price = formatPrice;
renderTemplate.fn = {};

module.exports = renderTemplate;