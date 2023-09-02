module.exports = {
	regexes: {
		scheme: /^([a-zA-Z0-9]+):\/\/|^\/\//
		,username_password: /^([a-zA-Z0-9_-]+)?:([a-zA-Z0-9_-]+)?@/
		,host: /^((?:(?:[a-zA-Z0-9_-]+)\.)+(?:[a-zA-Z0-9_-]+){1})/
		,port: /^(?::([0-9]+))/
		,path: /^((?!\/\/)(?:\/|\.\/|\.\.\/)(?:[^?#]+)?)/
		,query: /^(?:\?([^#]+)*)/
		,fragment: /^(?:#(.+)*)/
	}
	,parse: function(_url, _path) {
		_path = typeof _path != 'undefined' ? _path : '';
		var _tmpUrl = _url;
		var _urlParts = this.urlParts();
		var _had = {};
		_urlParts.url = _url;
		for (var key in this.regexes) {
			if (this.regexes.hasOwnProperty(key)) {
				var _matches = _tmpUrl.match(this.regexes[key]);
				_had[key] = false;
				if (_matches) {
					_had[key] = true;
					var keys = key.split('_');
					_tmpUrl = _tmpUrl.substring(_matches[0].length, _tmpUrl.length);
					for (var  i = 0; i < keys.length; i++) {
						if (typeof _matches[i + 1] != 'undefined') {
							_urlParts[keys[i]] = _matches[i + 1];
						}
					}
				}
			}
		}
		var _pass = false;
		for (var key in _urlParts) {
			if (_urlParts.hasOwnProperty(key)) {
				if (_urlParts[key] != '') {
					_pass = true;
				}
			}
		}
		if (_urlParts.host == '' && _had.scheme) {
			_pass = false;
		}
		else if (_urlParts.host == '') {
			if (_urlParts.path == '') {
				_pass = false;
			}
			else {
				if (_urlParts.scheme != '' || _urlParts.username != '' || _urlParts.password != '' || _urlParts.host || _urlParts.port) { //--maybe don't need port
					_pass = false;
				}
			}
		}
		else if (_urlParts.path == '') {
			_urlParts.path = _path;
		}
		if (_pass) {
			if (_urlParts.host != '') {
				var _hostBits = _urlParts.host.split('.');
				if (_hostBits.length > 2) {
					_urlParts.domain = _hostBits[_hostBits.length - 2] + '.' + _hostBits[_hostBits.length - 1];
					_hostBits.pop();_hostBits.pop();
					_urlParts.subdomain = _hostBits.join('.');
				}
				else {
					_urlParts.domain = _urlParts.host;
				}
			}
			var _tmpPath = _urlParts.path.replace(/^\/+|\/+$/g, '');
			if (_tmpPath != '') {
				_urlParts.pathParts = _tmpPath.split('/');
			}
			else if (_urlParts.path != '') {
				_urlParts.pathParts = ['/'];
			}
			_urlParts.queryString = _urlParts.path + (_urlParts.query != '' ? '?' + _urlParts.query : '');
			if (_urlParts.query != '') {
				var _queryVariables = _urlParts.query.split('&');
				for (var i = 0; i < _queryVariables.length; i++) {
					var _variablePair = _queryVariables[i].split('=');
					if (_variablePair.length < 2)
						_variablePair.push('');
					_urlParts.queryVariables[_variablePair[0]] = decodeURIComponent(_variablePair[1]);
				}
			}
			return _urlParts;
		}
		else {
			return null;
		}
	}
	,build: function(_p) {
		var _parts = this.cloneObject(_p);
		if (typeof _parts.scheme == 'undefined') { _parts.scheme = ''; }
		if (typeof _parts.username == 'undefined') { _parts.username = ''; }
		if (typeof _parts.password == 'undefined') { _parts.password = ''; }
		if (typeof _parts.subdomain == 'undefined') { _parts.subdomain = ''; }
		if (typeof _parts.domain == 'undefined') { _parts.domain = ''; }
		if (typeof _parts.host == 'undefined') { _parts.host = ''; }
		if (typeof _parts.port == 'undefined') { _parts.port = ''; }
		if (typeof _parts.path == 'undefined') { _parts.path = ''; }
		if (typeof _parts.query == 'undefined') { _parts.query = ''; }
		if (typeof _parts.fragment == 'undefined') { _parts.fragment = ''; }
		if (_parts.scheme != '') {
			_parts.scheme = _parts.scheme + '://';
		}
		if (_parts.host == '') {
			if (_parts.subdomain != '' && _parts.domain != '') {
				_parts.host = _parts.subdomain + '.' + _parts.domain;
			}
			else if (_parts.domain != '') {
				_parts.host = _parts.domain;
			}
		}
		_parts.auth = '';
		if (_parts.username != '' || _parts.password != '') {
			_parts.auth = _parts.username + ':' + _parts.password + '@';
		}
		if (_parts.port != '') {
			_parts.port = ':' + _parts.pprt;
		}
		if (_parts.query != '') {
			_parts.query = '?' + _parts.query;
		}
		if (_parts.fragment != '') {
			_parts.fragment = '#' + _parts.fragment;
		}
		if (_parts.path.match(/^\./) && _parts.host != '') {
			_parts.path = '/' + _parts.path;
		}
		if(_parts.host) {
			return _parts.scheme + _parts.auth + _parts.host + _parts.port + _parts.path + _parts.query + _parts.fragment;
		}
		else {
			if (_parts.path == '') {
				_parts.path = '/';
			}
			return _parts.path + _parts.query + _parts.fragment;
		}
	}
	,urlParts: function() {
		return {
			url: '', scheme: '', username: '', password: '', subdomain: '', domain: '', host: '', port: '', path: '', query: '', fragment: '', queryString: '', pathParts: [], queryVariables: {}
		};
	}
	,cloneObject: function(_obj) {
		if (null == _obj || "object" != typeof _obj)
			return _obj;
		var copy = _obj.constructor();
		for (var attr in _obj) {
			if (_obj.hasOwnProperty(attr))
				copy[attr] = _obj[attr];
		}
		return copy;
	}
};