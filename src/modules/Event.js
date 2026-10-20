// base
const setModule = require('../base/setModule');
// modules
const BaseModule = require('./BaseModule');

var _Event = BaseModule.extend({
	__propagationStopped: undefined
	,__defaultPrevented: undefined
	,__eventProps: undefined
	,data: undefined
	,name: undefined
	,constructor: function(name, event, data, original) {
		BaseModule.apply(this, arguments);
		this.__propagationStopped = false;
		this.__defaultPrevented = false;
		this.name = name || 'UnsetEventName';
		this.data = typeof data === 'undefined' ? {} : data;
		event = event || {};
		this.__eventProps = event;
		Object.keys(event).forEach(function(key) {
			this[key] = event[key];
		}, this);
		if (original) {
			this.originalEvent = original;
		}
	}
	,getEventProps: function() {
		return this.__eventProps;
	}
	,stopPropagation: function() {
		this.__propagationStopped = true;
		if (typeof this.originalEvent !== 'undefined') {
			this.originalEvent.stopPropagation();
		}
	}
	,isPropagationStopped: function() {
		return this.__propagationStopped;
	}
	,preventDefault: function() {
		if (typeof this.originalEvent !== 'undefined') {
			this.originalEvent.preventDefault();
		}
		else {
			this.__defaultPrevented = true;
		}
	}
	,isDefaultPrevented: function() {
		if (typeof this.originalEvent !== 'undefined') {
			return this.originalEvent.defaultPrevented;
		}
		else {
			return this.__defaultPrevented;
		}
	}
});

setModule('Event', _Event);
module.exports = _Event;
