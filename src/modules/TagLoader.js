// functions
const jsonParse = require('../functions/jsonParse');
const DataType = require('./DataType');

module.exports = {
	getJson: function(elm) {
		return jsonParse(this.getText(elm));
	}
	,setJson: function(elm, obj, parent) {
		this.setText(elm, JSON.stringify(obj), parent);
	}
	,getText: function(elm) {
		var text = null;
		if (typeof jQuery !== 'undefined' && elm instanceof jQuery)
			text = elm.text() || elm.html();
		else if (DataType.isObject(elm))
			text = elm.innerHTML;
		else {
			elm = document.getElementById(elm.replace(/^#/, ''));
			if (elm !== null)
				text = elm.innerText;
		}
		return this.removeWrap(text);
	}
	,setText: function(elm, text, parent) {
		text = this.applyWrap(text);
		if (typeof jQuery !== 'undefined' && elm instanceof jQuery)
			elm.html(text);
		else if (DataType.isObject(elm))
			elm.innerHTML = text;
		else {
			var _orgElm = elm;
			elm = document.getElementById(elm.replace(/^#/, ''));
			if (elm !== null)
				elm.innerHTML = text;
			else {
				var script = document.createElement( 'script' );
				script.type = 'application/json';
				script.id = _orgElm.replace(/^#/, '');
				script.innerHTML = text;
				parent = parent || document.body;
				parent.appendChild(script);
			}
		}
	}
	,applyWrap: function(text) {
		return '<!--' + text.trim() + '-->';
	}
	,removeWrap: function(text) {
		if (typeof text == 'string')
			return text.trim().replace(/(\r\n|\n|\r)/gm, ' ').replace(/\t+/gm, ' ').replace(/^<\!\-\-(.+)\-\->$/, '$1');
		return null;
	}
};