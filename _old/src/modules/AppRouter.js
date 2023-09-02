bglib.AppRouter = bglib.BaseModule.extend({
	routes: undefined
	,init: function(_routes) {
		this.routes = {};
		if (typeof _routes !== 'undefined') {
			var copy = Object.deepCopyMerge({}, _routes);
			//--changes to copy seems to affect the original object
			this.setRoutes(copy);
		}
	}
	,processRoute: function(route) {
		if (typeof route.defaults == 'undefined')
			route.defaults = {};
		if (typeof route.requirements == 'undefined')
			route.requirements = {};
		route.defaultSlugs = {keys: [], obj: {}, arr: []};
		route.pattern = route.pattern.replace(/\/+$/, '');
		if (route.pattern == '') {
			route.pattern = '/';
		}
		route.compiledRegex = this.compileRoute(route, route.pattern, route.defaults, route.requirements);
		return route;
	}
	,compileRoute: function(route, pattern, defaults, requirements) {
		var slugMatches = pattern.match(/({([^\/{}]+)})/g);
		var regexes = {};
		if (slugMatches) {
			for (var i = 0; i < slugMatches.length; i++) {
				var slugMatch = slugMatches[i];
				slugMatches[i] = slugMatches[i].replace(/^({)|(})$/g, '');
				var _tmpRegex = '([^\\/?#]+)';
				if (typeof requirements[slugMatches[i]] != 'undefined') {
					_tmpRegex = '(' + requirements[slugMatches[i]] + ')';
				}
				slugMatch = '\\{' + slugMatches[i] + '\\}';
				route.defaultSlugs.keys.push(slugMatches[i]);
				if (typeof defaults[slugMatches[i]] != 'undefined') {
					route.defaultSlugs.obj[slugMatches[i]] = defaults[slugMatches[i]];
					route.defaultSlugs.arr.push(defaults[slugMatches[i]]);
					if (i == slugMatches.length - 1) {
						_tmpRegex = '(?:\\/' + _tmpRegex + '|\\/)?';
						slugMatch = '\\/' + slugMatch;
					}
					delete route.defaults[slugMatches[i]];
				}
				else {
					route.defaultSlugs.obj[slugMatches[i]] = undefined;
					route.defaultSlugs.arr.push(undefined);
				}
				regexes[slugMatch] = _tmpRegex;
			}
		}
		pattern = this.regexEscape(pattern);
		for (var _slug in regexes) {
			if (regexes.hasOwnProperty(_slug)) {
				pattern = pattern.replace(_slug, regexes[_slug]);
			}
		}
		pattern = '^' + pattern + '$';
		return new RegExp(pattern);
	}
	,regexEscape: function(str) {
		return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	}
	,setRoutes: function(routes) {
		this.routes = routes;
		for (var _name in this.routes) {
			if (this.routes.hasOwnProperty(_name)) {
				this.routes[_name] = this.processRoute(this.routes[_name]);
			}
		}
	}
	,addRoute: function(name, opts, action) {
		this.routes[name] = opts;
		if (typeof action != 'undefined') {
			this.routes[name].action = action;
		}
		this.routes[name] = this.processRoute(this.routes[name]);
	}
	,addRoutes: function(routes) {
		for (var _name in routes) {
			if (routes.hasOwnProperty(_name)) {
				this.routes[_name] = routes[_name];
				this.routes[_name] = this.processRoute(this.routes[_name]);
			}
		}
	}
	,match: function(url) {
		url = url.replace(/\/+$/, '');
		if (url == '') {
			url = '/';
		}
		for (var _name in this.routes) {
			if (this.routes.hasOwnProperty(_name)) {
				var urlMatches = url.match(this.routes[_name].compiledRegex);
				if (urlMatches) {
					var _slugs = {
						obj: Object.copy(this.routes[_name].defaultSlugs.obj)
						,arr: this.routes[_name].defaultSlugs.arr.slice()
					};
					for (var i = 0; i < _slugs.arr.length; i++) {
						if (typeof urlMatches[i + 1] != 'undefined') {
							_slugs.obj[this.routes[_name].defaultSlugs.keys[i]] = urlMatches[i + 1];
							_slugs.arr[i] = urlMatches[i + 1];
						}
					}
					return {
						action: this.routes[_name].action
						,slugs: _slugs
						,defaults: Object.copy(this.routes[_name].defaults)
					};
				}
			}
		}
		return null;
	}
});