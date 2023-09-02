var __priv = {
	hasAsked: undefined
	,hasGranted: undefined
	,hasDenied: undefined
};
var __this = {
	supported: function() {
		return ("Notification" in window);
	}
	,hasAsked: function() {
		return __priv.hasAsked;
	}
	,hasGranted: function() {
		return __priv.hasGranted;
	}
	,hasDenied: function() {
		return __priv.hasDenied;
	}
	,notify: function(msg, opts) {
		opts = opts || {};
		var _autoClose = opts.autoClose || false;
		var _autoCloseTime = opts.autoCloseTime || 5000;
		delete opts.autoClose;
		delete opts.autoCloseTime;
		if (__priv.hasGranted) {
			var n = new Notification(msg, opts);
			if (_autoClose) {
				setTimeout(n.close.bind(n), _autoCloseTime);
			}
		}
		else if (!__priv.hasAsked) {
			__this.request(function(permission) {
				if (permission) {
					var n = new Notification(msg, opts);
					if (_autoClose) {
						setTimeout(n.close.bind(n), _autoCloseTime);
					}
				}
			});
		}
	}
	,request: function(cb) {
		cb = cb || function() {};
		Notification.requestPermission(function(perm) {
			__priv.hasAsked = true;
			if (perm == "granted") {
				__priv.hasGranted = true;
				cb(true);
			}
			else {
				__priv.hasDenied = true;
				cb(false);
			}
		});
	}
};
if (__this.supported()) {
	__priv.hasGranted = Notification.permission === "granted";
	__priv.hasDenied = Notification.permission === "denied";
	__priv.hasAsked = Notification.permission !== "denied" && Notification.permission !== "granted";
	//--I think this should be the follow snippet, has Asked should just check if Notification.permission
	//--equals either one which would indicate it had already asked
	//
	//__priv.hasAsked = Notification.permission !== "denied" && Notification.permission !== "granted";
	//
}

module.exports = __this;