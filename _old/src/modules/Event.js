(function(bglib) {
	var BaseModule = bglib.BaseModule;
	var module = BaseModule.extend({
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
			this.data = data || {};
			event = event || {};
			this.__eventProps = event;
			for (var key in event) {
				if (event.hasOwnProperty(key)) {
					this[key] = event[key];
				}
			}
			if (original) {
				this.originalEvent = original;
			}
		}
		,getEventProps: function() {
			return this.__eventProps;
		}
		,stopPropagation: function() {
			this.__propagationStopped = true;
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
	bglib.Event = module;
})(bglib);