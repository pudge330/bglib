(function(bglib) {
	var EventModule = bglib.EventModule;
	var module = EventModule.extend({
		target: undefined
		,props: undefined
		,currentProps: undefined
		,time: undefined
		,tick: undefined
		,timeout: undefined
		,paused: undefined
		init: function(target, props, time, opts) {
			var autostart = true, tick = 5;
			if (bglib.DT.isObject(opts)) {
				opts = Object.assign({
					autostart: true
					,tick: 5
				}, opts);
				this.tick = opts.tick;
				autostart = opts.autostart
			}
			this.target = target;
			this.props = props;
			this.currentProps = {};
			this.time = time;
			this.paused = false;
			if (autostart) {
				this.start();
			}
		}
		,start: function() {
			//--change|diff / (remaining-time / tick) = step
			var _self = this;
			this.timeout = setTimeout(function() {
				if (!_self.paused) {
					_self.step();
				}
			}, this.tick);
		}
		,stop: function() {
			clearInterval(this.timeout);
		}
		,pause: function() {
			this.paused = true;
		}
		,resume: function() {
			this.paused = false;
		}
		,step: function() {

		}
		,parseValue: function() {
			
		}
	});
})(bglib);