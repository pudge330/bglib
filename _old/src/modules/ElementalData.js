(function(bglib) {
	var m = function() {
		this.storage = new WeakMap();
	};
	m.prototype.set = function (element, key, obj) {
		if (!this.storage.has(element)) {
			this.storage.set(element, new Map());
		}
		this.storage.get(element).set(key, obj);
	};
	m.prototype.get = function (element, key) {
		return this.has(element, key) ? this.storage.get(element).get(key) : undefined;
	};
	m.prototype.has = function (element, key) {
		return this.hasBase(element) ? this.storage.get(element).has(key) : false;
	};
	m.prototype.hasBase = function (element) {
		return this.storage.has(element);
	};
	m.prototype.remove = function (element, key) {
		var result = false;
		if (this.has(element, key)) {
			result = this.storage.get(element).delete(key);	
		}
		if (this.hasBase(element)) {
			if (this.storage.get(element).size === 0) {
				this.storage.delete(element);
			}
		}
		return result;
	};
	m.prototype.reset = function(element) {
		if (this.hasBase(element)) {
			this.storage.delete(element);
		}
	};
	bglib.ElementalData = m;
})(bglib);