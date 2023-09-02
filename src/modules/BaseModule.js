// base
const setModule = require('../base/setModule');

var _BaseModule = function () {};
_BaseModule.extend = function(prototypeProperties, staticProperties) {
	prototypeProperties = prototypeProperties || {};
	staticProperties = staticProperties || {};
	var parent = this;
	var child;
	if (prototypeProperties && prototypeProperties.hasOwnProperty('constructor')) {
		child = prototypeProperties.constructor;
	}
	else {
		child = function () { return parent.apply(this, arguments); };
	}
	child = Object.assign(child, parent);
	child = Object.assign(child, staticProperties);
	child.prototype = Object.create(parent.prototype, {
		constructor: {
			value: child
			,enumerable: false
			,writable: true
			,configurable: true
		}
	});
	Object.assign(child.prototype, prototypeProperties);
	child.__parent = parent;
    return child;
};

BaseModule = _BaseModule.extend({
	constructor: function() {
		_BaseModule.apply(this, arguments);
		if (this.init) {
			this.init.apply(this, arguments);
		}
	}
});

setModule('Base', BaseModule);
module.exports = BaseModule;