bglib.fn.compileTemplate = function(tpl) {
	/*
		Does not work with multi line <% %> tags
			- only single line works
	*/
	var str = tpl;
	var match;
	while (match = str.match(/\<\%([^]+?)\%\>/m)) {
		// console.log(match);
		// console.log(match[1]);
		// match[1] = match[1].replace(/\\$/gm, "");
		// console.log(match[1]);
		str = str.replace(/\<\%([^]+?)\%\>/m, "'; $1  __bglib_template__ += '");
		// str = str.replace(/\<\%/, "'; ");
		// str = str.replace(/\%\>/, " __bglib_template__ += '");
	}
	str = str.replace(/\{\{/g, "' + ");
	str = str.replace(/\}\}/g, " + '");
	// str = str.replace(/\<\%/g, "'; ");
	// str = str.replace(/\%\>/g, " __bglib_template__ += '");
	str = str.replace(/\<\*/g, "'; /*");
	str = str.replace(/\*\>/g, "*/ __bglib_template__ += '");
	str = str.replace(/\\\{\\\{/g, "{{");
	str = str.replace(/\\\}\\\}/g, "}}");
	str = str.replace(/\r\n/g, "\n");
	// str = str.replace(/\n/g, "\\\n");
	str = str.replace(/\n/g, "';\n__bglib_template__ += '");
	// str = str.replace(/\'\; \\/g, "';");
	// console.log('var __bglib_template__ = \'' + str + '\';');
	return 'var __bglib_template__ = \'' + str + '\';';
};
bglib.fn.renderTemplate = function(tpl, data) {
	var helpers = bglib.fn.renderTemplate.helpers,
		format = bglib.fn.renderTemplate.format;
	tpl = tpl.match(/^var __bglib_template__ = \'/) ? tpl : bglib.fn.compileTemplate(tpl);
	return function() {
		return eval(tpl);
	}.call(data);
};
bglib.fn.renderTemplate.helpers = {};
bglib.fn.renderTemplate.helpers.htmlEntities = bglib.fn.htmlEntities;
bglib.fn.renderTemplate.helpers.rand = bglib.fn.rand;
bglib.fn.renderTemplate.helpers.toEm = bglib.fn.toEm;
bglib.fn.renderTemplate.helpers.toPx = bglib.fn.toPx;
bglib.fn.renderTemplate.helpers.dt = bglib.DT;
bglib.fn.renderTemplate.format = {};
bglib.fn.renderTemplate.format.camelCase = bglib.fn.toCamelCase;
bglib.fn.renderTemplate.format.properCase = bglib.fn.toProperCase;
bglib.fn.renderTemplate.format.decimal = bglib.fn.formatDecimal;
bglib.fn.renderTemplate.format.price = bglib.fn.formatPrice;