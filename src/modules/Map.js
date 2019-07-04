(function(bglib) {
	var BaseModule = bglib.BaseModule;
	var module = BaseModule.extend({
        __isWeak: undefined
        ,__references: undefined
        ,length: undefined
        ,size: undefined
		,constructor: function(iterable, opts) {
			var _self = this;
            iterable = iterable || [];
            opts = opts || {};
            this.__isWeak = opts.type == 'weak' ? true : false;
            this.__references = {};
			BaseModule.apply(_self, arguments);
		}
        ,clear: function() {}
        ,delete: function(key) {}
        ,entries: function() {}
        ,forEach: function() {}
        ,get: function(key) {}
        ,has: function(key) {}
        ,keys: function() {}
        ,set: function(key, value) {}
        ,values: function() {}
	}, {
        keyProp: '__bglibMapKey'
    });
	bglib.MapModule = module;
	bglib.setRegisteredModule('Map', module);
})(bglib);