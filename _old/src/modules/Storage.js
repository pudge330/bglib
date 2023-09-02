(function(bglib) {
	var TagLoader = bglib.TagLoader;
	bglib.Storage = function() {
		var _exports = {};
		var _currentTime = function() {
			return Math.floor((new Date()).getTime() / 1000);
		};
		var _storageObject = function(_s) {
			this.storage = _s;
		};
		_storageObject.prototype = {
			supported: function() {
				if (this.storage)
					return true;
				else
					return false;
			}
			,set: function(_k, _v, _e) {
				if (this.supported()) {
					_v = JSON.stringify(_v);
					this.storage.setItem(_k, _v);
					if (_e)
						this.storage.setItem(_k + '_exp', _currentTime() + _e);
				}
			}
			,get: function(_k) {
				if (this.supported()) {
					if (this.storage.getItem(_k + '_exp')) {
						if (_currentTime() >= parseInt(this.storage.getItem(_k + '_exp'))) {
							if (this.storage.getItem(_k))
								this.storage.removeItem(_k);
							this.storage.removeItem(_k + '_exp');
							return null;
						}
					}
					return JSON.parse(this.storage.getItem(_k));
				}
				else
					return null;
			}
			,remove: function(_k) {
				if (this.supported()) {
					this.storage.removeItem(_k);
					this.storage.removeItem(_k + '_exp');
				}
			}
			,clear: function() {
				if (this.supported())
					this.storage.clear();
			}
			,length: function() {
				if (this.supported()) {
					var _count = 0;
					for (var key in localStorage){
						if (!key.endsWith('_exp'))
							_count++;
					}
					return _count;
				}
				else
					return 0;
			}
			,totalLength: function() {
				if (this.supported()) {
					var _count = 0;
					for (var key in localStorage){
						_count++;
					}
					return _count;
				}
				else
					return 0;
			}
		};
		var _pageStorage = function() {
			this.instanceClass = this.itemClass + '_' + bglib.fn.rand();
			this.itemIndex = {};
		};
		_pageStorage.prototype = {
			itemClass: 'appStorageItem'
			,parent: undefined
			,supported: function() {
				if (typeof TagLoader != 'undefined' && TagLoader)
					return true;
				else
					return false;
			}
			,set: function(_k, _v, _e) {
				if (this.supported()) {
					if (!this.itemIndex[_k])
						this.itemIndex[_k] = '#' + this.itemClass + '_' + bglib.fn.rand();
					if (!this.parent) {
						var div = document.createElement('div');
						div.id = this.instanceClass;
						div.style.display = 'none';
						this.parent = div;
						document.body.appendChild(div);
					}
					TagLoader.setJson(this.itemIndex[_k], _v, this.parent);
					var _item = document.getElementById(this.itemIndex[_k].replace(/^#/, ''));
					bglib.El.addClass(_item, this.itemClass);
					bglib.El.addClass(_item, this.instanceClass);
					if (_e)
						_item.setAttribute('data-exp', _currentTime() + _e);
				}
			}
			,get: function(_k) {
				if (this.supported() && this.itemIndex[_k]) {
					var _item = document.getElementById(this.itemIndex[_k].replace(/^#/, ''));
					if (_item) {
						if (_item.getAttribute('data-exp')) {
							if (_currentTime() >= parseInt(_item.getAttribute('data-exp'))) {
								bglib.El.remove(_item);
								delete this.itemIndex[_k];
								return null;
							}
						}
						return TagLoader.getJson(_item);
					}
					else
						return null;
				}
			}
			,remove: function(_k) {
				if (this.supported() && this.itemIndex[_k]) {
					var _item = document.getElementById(this.itemIndex[_k].replace(/^#/, ''));
					if (_item) {
						bglib.El.remove(_item);
						delete this.itemIndex[_k];
					}
				}
			}
			,clear: function() {
				if (this.supported()) {
					var _items = document.getElementsByClassName(this.instanceClass);
					if (_items.length > 0) {
						bglib.El.remove(_items);
						this.itemIndex = {};
					}
				}
			}
			,length: function() {
				if (this.supported()) {
					return document.getElementsByClassName(this.instanceClass).length;
				}
				return 0;
			}
			,totalLength: function() {
				if (this.supported()) {
					return document.getElementsByClassName(this.itemClass).length;
				}
				return 0;
			}
		};
		_exports.local = new _storageObject(window.localStorage);
		_exports.session = new _storageObject(window.sessionStorage);
		_exports.page = new _pageStorage();
		return _exports;
	};
})(bglib);