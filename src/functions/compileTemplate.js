// functions
const rand = require('./rand');

module.exports = function(tpl, keys) {
	var match,
		jsTokens = [],
		count = -1,
		token = null;
	//--js-code tokens
	while (match = tpl.match(/(\<\%(.*|[\s\S]+?)\%\>?)/)) {
		count++;
		token = '##__jct__' + count + '__' + rand() + '__##';
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