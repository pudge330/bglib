(function(bglib) {
	var module = function () {};
	module.extend = function(prototypeProperties, staticProperties) {
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
	bglib.BaseModule = module.extend({
		constructor: function() {
			var _self = this;
			module.apply(_self, arguments);
			if (this.init) {
				this.init.apply(_self, arguments);
			}
		}
	});
	bglib.setRegisteredModule('Base', bglib.BaseModule);
})(bglib);