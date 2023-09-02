module.exports = function(_opts) {
	if (typeof _opts == 'undefined')
		_opts = {};
	var _expTime = _opts.time || 1800; // 30 minutes
	var _expCallback = _opts.callback || function() { 
		alert('Session Expired');
		location.reload();
	};
	var _idleCounter = 0;
	var _isRunning = _opts.autostart || true;
	var _restartTimeout = function() {
		_idleCounter = 0;
		_isRunning = true;
	};
	var _stopTimeout = function() {
		_idleCounter = 0;
		_isRunning = false;
	};
	var _resetCounter = function() {
		_idleCounter = 0;
		// clog('reset counter');
	};
	var _checkIdleTime = function() {
		if (_isRunning) {
			_idleCounter++;
			if (_idleCounter >= _expTime) {
				_isRunning = false;
				_expCallback();
			}
		}
	};
	var _triggerCallback = function() {
		_expCallback();
	};
	if (typeof _opts.manualHandlers === 'undefined' || !_opts.manualHandlers) {
		document.onclick = _resetCounter;
		document.onmousemove = _resetCounter;
		document.onkeypress = _resetCounter;
		//--possibly need to add listeners to cover touch devices
	}
	window.setInterval(_checkIdleTime, 1000); // runs every second
	var _exports = {
		expTime: _expTime
		,isRunning: function() {return _isRunning;}
		,restart: _restartTimeout
		,stop: _stopTimeout
		,counter: {
			get: function() {return _idleCounter;}
			,reset: _resetCounter
		}
		,check: _checkIdleTime
		,triggerCallback: _triggerCallback
	};
	return _exports;
};