(function(bglib) {
	//--add debounce/delay for certain events
	var isLoaded = false, isReady = false;
	if (document.readyState === 'complete') {
		isLoaded = true;
	}
	else {
		bglib.EventUtil.addHandler(window, 'load', function(e) {
			isLoaded = true;
		});
	}
	bglib.fn.documentReady(function(e) {
		isReady = true;
	});
	var EventManager = bglib.EventManager;
	var Event = bglib.Event;
	var module = EventManager.extend({
		isDocument: undefined
		,isWindow: undefined
		,init: function() {
			EventManager.prototype.init.apply(this, arguments);
			this.isWindow = (this.target === window);
			this.isDocument = (this.target === document);
		}
		,on: function() {
			var _self = this;
			var names, selector, data, callback;
            var args = this.resolveArguments('on', arguments);
            names = args[0]; selector = args[1]; data = args[2]; callback = args[3];
            var tmpNames = ' ' + names + ' ';
            if (this.isWindow && isLoaded && tmpNames.indexOf(' load ') !== -1) {
            	var evt = new Event('load', { target: _self.target }, data);
            	callback(evt);
            	names = (' ' + names + ' ').replace(' load ', '');
            }
            if (this.isDocument && isReady && tmpNames.indexOf(' ready ') !== -1) {
            	var evt = new Event('ready', { target: _self.target }, data);
            	callback(evt);
            	names = (' ' + names + ' ').replace(' ready ', '');
            }
            //--the ready event is intended for the document
            var tmpNames = ' ' + names + ' ';
            if (this.isDocument && tmpNames.indexOf(' ready ') !== -1) {
            	bglib.fn.documentReady((function(data, callback, e) {
					var evt = new Event('ready', { target: _self.target }, data, e);
            		callback(evt);
				}).bind(_self, data, callback));
				names = (' ' + names + ' ').replace(' ready ', '');
            }
            args[0] = names;
			EventManager.prototype.on.apply(this, args);
		}
	});
	bglib.DomEvents = {
		window: new module(window)
		,document: new module(document)
	};
})(bglib);