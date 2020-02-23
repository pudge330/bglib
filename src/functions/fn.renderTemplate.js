bglib.fn.compileTemplate = function(tpl, keys) {
	var match,
		jsTokens = [],
		count = -1,
		token = null;
	//--js-code tokens
	while (match = tpl.match(/(\<\%(.*|[\s\S]+?)\%\>?)/)) {
		count++;
		token = '##__jct__' + count + '__' + bglib.fn.rand() + '__##';
		jsTokens.push([token, match[2].trim()]);
		tpl = tpl.replace(/(\<\%(.*|[\s\S]+?)\%\>?)/, token);
	}
	//--handle \' and '
	tpl = tpl.replace(/\\\'/g, "\\\\\'");
	tpl = tpl.replace(/\'/g, "\\\'");
	//--single-line tokens and comment tokens
	tpl = tpl.replace(/\{\{\{/g, "' + helpers.htmlEntities(");
	tpl = tpl.replace(/\}\}\}/g, ") + '");
	tpl = tpl.replace(/\{\{/g, "' + ");
	tpl = tpl.replace(/\}\}/g, " + '");
	tpl = tpl.replace(/\<\*/g, "'; /*");
	tpl = tpl.replace(/\*\>/g, "*/ __bglib_template__ += '");
	//--escaped tokens
	tpl = tpl.replace(/\{\\\{\\\{/g, "{{{");
	tpl = tpl.replace(/\}\\\}\\\}/g, "}}}");
	tpl = tpl.replace(/\{\\\{/g, "{{");
	tpl = tpl.replace(/\}\\\}/g, "}}");
	tpl = tpl.replace(/\<\\\*/g, "<*");
	tpl = tpl.replace(/\*\\\>/g, "*>");
	tpl = tpl.replace(/\<\\\%/g, "<%");
	tpl = tpl.replace(/\%\\\>/g, "%>");
	//--newlines
	tpl = tpl.replace(/\r\n/g, "\n");
	tpl = tpl.replace(/\n/g, "';\n__bglib_template__ += '");
	//--cut js comments
	while (match = tpl.match(/(\/\*(.*|[\s\S]+?)\*\/)/)) {
		tpl = tpl.replace(/(\/\*(.*|[\s\S]+?)\*\/)/, '');
	}
	//--js-code tokens
	for (var i = 0; i < jsTokens.length; i++) {
		tpl = tpl.replace(jsTokens[i][0], "'; " + jsTokens[i][1] + "  __bglib_template__ += '");
	}
	while (match = tpl.match(/for\s*\(\s*([a-zA-Z_][a-zA-Z0-9_]*)\s+in\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\)\s*\{/)) {
		var indexName = match[1] + 'Index',
			replacement = 'for (var ' + indexName + ' = 0; ' + indexName + ' < ' + match[2] + '.length; ' + indexName + '++) { var ' + match[1] + ' = ' + match[2] + '[' + indexName + '];';
		tpl = tpl.replace(/for\s*\(\s*[a-zA-Z_][a-zA-Z0-9_]*\s+in\s+[a-zA-Z_][a-zA-Z0-9_]*\s*\)\s*\{/, replacement);
	}
	tpl = tpl.replace(/__bglib_template__ \+\= '';/gm, '');
	tpl = tpl.replace(/__bglib_template__ \+\= '\s+';/gm, '');
	return 'var __bglib_template__ = \'' + tpl + '\';';
};
bglib.fn.renderTemplate = function(tpl, data) {
	var helpers = bglib.fn.renderTemplate.helpers,
		format = bglib.fn.renderTemplate.format,
		fn = bglib.fn.renderTemplate.fn,
		data = data || {},
		dataKeys = Object.keys(data),
		tpl1 = '';
	for (var i = 0; i < dataKeys.length; i++) {
		if (['helpers', 'format', 'fn', 'data'].indexOf(dataKeys[i]) === -1 && dataKeys[i].match(/^[a-zA-Z_][a-zA-Z0-9_]*$/)) {
			tpl1 += 'var ' + dataKeys[i] + ' = this.' + dataKeys[i] + ';';
		}
	}
	tpl = tpl1 + (tpl.match(/^var __bglib_template__ = \'/) ? tpl : bglib.fn.compileTemplate(tpl, Object.keys(data)));
	return function() {
		eval(tpl);
		return __bglib_template__;
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
bglib.fn.renderTemplate.fn = {};