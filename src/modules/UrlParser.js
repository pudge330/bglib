var placeholderOrigin = 'http://bglib.invalid';

var decodeValue = function(value) {
	try {
		return decodeURIComponent(value);
	}
	catch (e) {
		return value;
	}
};

var isIpAddress = function(host) {
	return /^\d{1,3}(?:\.\d{1,3}){3}$/.test(host) || host.indexOf(':') !== -1;
};

var setDomainParts = function(parts) {
	if (!parts.host) {
		return;
	}

	var hostBits = parts.host.split('.');
	if (parts.host === 'localhost' || isIpAddress(parts.host) || hostBits.length <= 2) {
		parts.domain = parts.host;
		return;
	}

	parts.domain = hostBits.slice(-2).join('.');
	parts.subdomain = hostBits.slice(0, -2).join('.');
};

module.exports = {
	// Retained for compatibility; parsing is handled by the native URL API.
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
		if (typeof _url !== 'string') {
			return null;
		}

		var isAbsolute = /^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(_url);
		var isProtocolRelative = /^\/\//.test(_url);
		var isRelative = !isProtocolRelative && /^(?:\/|\.\/|\.\.\/)/.test(_url);
		if (!isAbsolute && !isProtocolRelative && !isRelative) {
			return null;
		}

		var parsed;
		try {
			if (isAbsolute) {
				parsed = new URL(_url);
			}
			else if (isProtocolRelative) {
				parsed = new URL('http:' + _url);
			}
			else {
				parsed = new URL(_url, placeholderOrigin + '/');
			}
		}
		catch (e) {
			return null;
		}

		if (!isRelative && !parsed.hostname) {
			return null;
		}

		var parts = this.urlParts();
		parts.url = _url;
		parts.scheme = isAbsolute ? parsed.protocol.replace(/:$/, '') : '';
		parts.username = decodeValue(parsed.username);
		parts.password = decodeValue(parsed.password);
		parts.host = isRelative ? '' : parsed.hostname;
		parts.port = isRelative ? '' : parsed.port;
		parts.path = parsed.pathname;
		parts.query = parsed.search.replace(/^\?/, '');
		parts.fragment = parsed.hash.replace(/^#/, '');

		var hasAuthorityPath = isRelative || /^(?:[a-zA-Z][a-zA-Z0-9+.-]*:)?\/\/[^\/?#]+\//.test(_url);
		if (!hasAuthorityPath && !isRelative) {
			parts.path = _path;
		}
		else if (isRelative) {
			parts.path = _url.split(/[?#]/)[0];
		}

		setDomainParts(parts);

		var trimmedPath = parts.path.replace(/^\/+|\/+$/g, '');
		if (trimmedPath != '') {
			parts.pathParts = trimmedPath.split('/');
		}
		else if (parts.path != '') {
			parts.pathParts = ['/'];
		}

		parts.queryString = parts.path + (parts.query != '' ? '?' + parts.query : '');
		parsed.searchParams.forEach(function(value, key) {
			parts.queryVariables[key] = value;
		});

		return parts;
	}
	,build: function(_p) {
		var parts = this.cloneObject(_p) || {};
		parts.scheme = parts.scheme || '';
		parts.username = parts.username || '';
		parts.password = parts.password || '';
		parts.subdomain = parts.subdomain || '';
		parts.domain = parts.domain || '';
		parts.host = parts.host || '';
		parts.port = parts.port || '';
		parts.path = parts.path || '';
		parts.query = parts.query || '';
		parts.fragment = parts.fragment || '';

		if (!parts.host) {
			if (parts.subdomain && parts.domain) {
				parts.host = parts.subdomain + '.' + parts.domain;
			}
			else if (parts.domain) {
				parts.host = parts.domain;
			}
		}

		try {
			if (parts.host) {
				var scheme = parts.scheme || 'http';
				var url = new URL(scheme + '://' + parts.host);
				url.username = parts.username;
				url.password = parts.password;
				url.port = parts.port;
				url.pathname = parts.path || '/';
				url.search = parts.query ? '?' + parts.query : '';
				url.hash = parts.fragment ? '#' + parts.fragment : '';

				var output = url.toString();
				if (!parts.path) {
					output = output.replace(/\/(?=[?#]|$)/, '');
				}
				if (!parts.scheme) {
					output = output.replace(new RegExp('^' + scheme + ':\\/\\/'), '');
				}
				return output;
			}

			var relativeUrl = new URL(parts.path || '/', placeholderOrigin + '/');
			relativeUrl.search = parts.query ? '?' + parts.query : '';
			relativeUrl.hash = parts.fragment ? '#' + parts.fragment : '';
			return (parts.path || '/') + relativeUrl.search + relativeUrl.hash;
		}
		catch (e) {
			return null;
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
