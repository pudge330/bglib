module.exports = {
	isString: function(value) {
		return typeof value === 'string' || value instanceof String;
	}
	,isFinite: function(value) {
		if (typeof isFinite !== 'undefined') {
			return isFinite(value);
		}
		else
			return typeof value === 'number';
	}
	,isNumber: function(value) {
		return typeof value === 'number' && (this.isFinite(value));
	}
	,isArray: function(value) {
		return Object.prototype.toString.call(value) === '[object Array]';
	}
	,isFunction: function(value) {
		return typeof value === 'function';
	}
	,isObject: function(value) {
		return (value !== false && (typeof value === 'function' || typeof value === 'object'));
	}
	,isNull: function(value) {
		return value === null;
	}
	,isUndefined: function(value) {
		return typeof value === 'undefined';
	}
	,isBool: function(value) {
		return typeof value === 'boolean';
	}
	,isRegExp: function(value) {
		return value && typeof value === 'object' && value.constructor === RegExp;
	}
	,isError: function (value) {
		return value instanceof Error && typeof value.message !== 'undefined';
	}
	,isDate: function(value) {
		return value instanceof Date;
	}
};