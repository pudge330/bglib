module.exports = function(opts) {
	opts = opts || {};
	var expTime = Number(opts.time);
	expTime = Number.isFinite(expTime) && expTime >= 0 ? expTime : 1800;
	var callback = typeof opts.callback === 'function'
		? opts.callback
		: function() {
			alert('Session Expired');
			location.reload();
		};
	var isRunning = typeof opts.autostart === 'undefined' ? true : Boolean(opts.autostart);
	var destroyed = false;
	var idleStartedAt = Date.now();
	var idleCounter = 0;
	var activityEvents = ['pointerdown', 'pointermove', 'keydown', 'touchstart'];

	var resetCounter = function() {
		idleStartedAt = Date.now();
		idleCounter = 0;
	};
	var restartTimeout = function() {
		if (!destroyed) {
			resetCounter();
			isRunning = true;
		}
	};
	var stopTimeout = function() {
		resetCounter();
		isRunning = false;
	};
	var checkIdleTime = function() {
		if (!isRunning || destroyed) {
			return;
		}
		var elapsed = (Date.now() - idleStartedAt) / 1000;
		idleCounter = Math.floor(elapsed);
		if (elapsed >= expTime) {
			isRunning = false;
			callback();
		}
	};
	var triggerCallback = function() {
		callback();
	};
	var activityHandler = function() {
		resetCounter();
	};

	if (!opts.manualHandlers) {
		activityEvents.forEach(function(name) {
			document.addEventListener(name, activityHandler, { passive: true });
		});
	}
	var interval = window.setInterval(checkIdleTime, 1000);

	var destroy = function() {
		if (destroyed) {
			return;
		}
		destroyed = true;
		isRunning = false;
		window.clearInterval(interval);
		if (!opts.manualHandlers) {
			activityEvents.forEach(function(name) {
				document.removeEventListener(name, activityHandler);
			});
		}
	};

	return {
		expTime: expTime
		,isRunning: function() { return isRunning; }
		,restart: restartTimeout
		,stop: stopTimeout
		,destroy: destroy
		,dispose: destroy
		,counter: {
			get: function() {
				if (isRunning && !destroyed) {
					idleCounter = Math.floor((Date.now() - idleStartedAt) / 1000);
				}
				return idleCounter;
			}
			,reset: resetCounter
		}
		,check: checkIdleTime
		,triggerCallback: triggerCallback
	};
};
