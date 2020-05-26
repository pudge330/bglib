(function(bglib) {
	var EventModule = bglib.EventModule;
	var module = EventModule.extend({
		dataSet: undefined
		,dataSetState: undefined
		,constructor: function () {
			EventModule.apply(this, arguments);
			var opts = arguments[0] || [];
			if (opts.onChange) {
				this.on('change', opts.onChange);
			}
			if (opts.data && Array.isArray(opts.data)) {
				var clone = opts.clone || false;
				this.dataSet = clone ? opts.data.slice(0) : opts.data;
			}
			else {
				this.dataSet = [];
			}
			this.dataSetState = (new Array(this.dataSet.length).fill(true));
			this.triggerChange('set');
		}
		,getData: function() {
			var _self = this;
			return this.dataSet.filter(function(value, index) {
				if (_self.dataSetState[index])
					return true;
				else
					return false;
			});
		}
		,triggerChange: function(type) {
			var _self = this;
			this.trigger('change', {
				caller: _self
				,dataSet: _self.getData()
				,type: type
			});
		}
		,setData: function(data, clone) {
			clone = clone || false;
			this.dataSet = clone ? data.slice(0) : data;
			this.dataSetState = (new Array(this.dataSet.length).fill(true));
			return this;
		}
		,determineSort: function(order) {
			var _self = this;
			order = order.toLowerCase();
			if (Array.isArray(order))
				return order;
			else if (['desc', '>'].indexOf(order) !== -1)
				return 'desc';
			else // asc <
				return 'asc';
		}
		,sort: function(sorts) {
			var _self = this;
			var sortsCopy = [];
			for (var i = 0; i < sorts.length; i++) {
				var name = null, direction = null;
				if (typeof sorts[i] === 'string') {
					name = sorts[i];
					direction = 'asc';
				}
				else if (Array.isArray(sorts[i])) {
					name = sorts[i][0];
					direction = this.determineSort(sorts[i][1]);
				}
				else if (Object.isObject(sorts[i])) {
					name = sorts[i].name;
					direction = sorts[i].dir;
					direction = this.determineSort(direction);
				}
				if (name) {
					sortsCopy.push({name: name, dir: direction});
				}
			}
			var arr = this.dataSet;
			arr.sort(function(value1, value2) {
				for (var i = 0; i < sortsCopy.length; i++) {
					var s = sortsCopy[i];
					if (Array.isArray(s.dir)) {
						var returned = s.dir(value1[s.name], value2[s.name]);
						if ([-1, 1].indexOf(returned) !== -1) {
							return returned;
						}
					}
					else {
						if (value1[s.name] > value2[s.name]) return (s.dir === 'asc' ? 1 : -1);
						if (value1[s.name] < value2[s.name]) return (s.dir === 'asc' ? -1 : 1);
					}
				}
				return 0;
			});
			this.triggerChange('sort');
			return this;
		}
		,detemineFilterType: function(type) {
			type = type.toLowerCase();
			if (['equals', 'equal', '='].indexOf(type) !== 1)
				return 'equals';
			else if (['!equals', '!equal', '!=', '<>'].indexOf(type) !== 1)
				return 'not-equals';
			else if (['contains', 'contain', 'has'].indexOf(type) !== 1)
				return 'contains';
			else if (['!contains', '!contain', '!has'].indexOf(type) !== 1)
				return 'not-contains';
			else if (['<', 'less-than', 'lessthan', 'less'].indexOf(type) !== 1)
				return 'less-than';
			else if (['>', 'greater-than', 'greaterthan', 'greater'].indexOf(type) !== 1)
				return 'greater-than';
			else if (['starts-with', 'starts', '^'].indexOf(type) !== 1)
				return 'starts-with';
			else if (['ends-with', 'ends', '$'].indexOf(type) !== 1)
				return 'ends-with';
			else if (['regex'].indexOf(type) !== 1)
				return 'regex';
			else if (['function', 'func'].indexOf(type) !== 1)
				return 'function';
			else
				return 'equals';
			//--todo: add 'regex' and 'func' type
		}
		,detemineFilterGlue: function(glue) {
			glue = glue.toLowerCase();
			if (['and', '&'].indexOf(glue) !== 1)
				return 'and';
			else if (['or', '||', '|'].indexOf(glue) !== 1)
				return 'or';
			else
				return 'and';
		}
		,filter: function(filters, returnFiltered) {
			returnFiltered = returnFiltered || false;
			var _self = this;
			_self.reset();
			var filtersCopy = {and: [], or: []};
			for (var i = 0; i < filters.length; i++) {
				var name = null, value = null, type = null, glue = null;
				if (Array.isArray(filters[i])) {
					switch (filters[i].length) {
						case 4:
							name = filters[i][0];
							value = filters[i][1];
							type = this.determineFilterType(filters[i][2]);
							glue = this.detemineFilterGlue(filters[i][3]);
						break;
						case 3:
							name = filters[i][0];
							value = filters[i][1];
							type = this.determineFilterType(filters[i][2]);
							glue = 'and';
						break;
						case 2:
						default:
							name = filters[i][0];
							value = filters[i][1];
							type = 'equals';
							glue = 'and';
						break;
					}
				}
				else if (Object.isObject(filters[i])) {
					name = filters[i].name;
					value = filters[i].value;
					type = filters[i].type || 'equals';
					glue = filters[i].glue || 'and';
				}
				if (name) {
					if (glue == 'or') {
						filtersCopy.or.push({name: name, value: value, type: type, glue: glue});
					}
					else {
						filtersCopy.and.push({name: name, value: value, type: type, glue: glue});
					}
				}
			}
			var filtered = this.dataSet.filter(function(value, index) {
				var passedFilter = true;
				var test;
				for (var key in filtersCopy) {
					if (filtersCopy.hasOwnProperty(key)) {
						for (var i = 0; i < filtersCopy[key].length; i++) {
							var f = filtersCopy[key][i];
							switch (f.type) {
								case 'not-equals':
									if (value[f.name] == f.value) {
										passedFilter = false;
										if (key == 'and') {
											i = filtersCopy[key].length;
										}
									}
								break;
								case 'contains':
									if (value[f.name].indexOf(f.value) === -1) {
										passedFilter = false;
										if (key == 'and') {
											i = filtersCopy[key].length;
										}
									}
								break;
								case 'not-contains':
									if (value[f.name].indexOf(f.value) !== -1) {
										passedFilter = false;
										if (key == 'and') {
											i = filtersCopy[key].length;
										}
									}
								break;
								case 'less-than':
									if (value[f.name] < f.value) {
										passedFilter = false;
										if (key == 'and') {
											i = filtersCopy[key].length;
										}
									}
								break;
								case 'greater-than':
									if (value[f.name] > f.value) {
										passedFilter = false;
										if (key == 'and') {
											i = filtersCopy[key].length;
										}
									}
								break;
								case 'starts-width':
									test = value[f.name].substring(0, f.value.length);
									if (test != f.value) {
										passedFilter = false;
										if (key == 'and') {
											i = filtersCopy[key].length;
										}
									}
								break;
								case 'ends-with':
									test = value[f.name].substring(value[f.name] - f.value.length, value[f.name].length);
									if (test != f.value) {
										passedFilter = false;
										if (key == 'and') {
											i = filtersCopy[key].length;
										}
									}
								break;
								case 'regex':
									var regexFlags = f.flags || '';
									var regex = new RegExp(f.value, regexFlags);
									if (!value[f.name].match(regex)) {
										passedFilter = false;
										if (key == 'and') {
											i = filtersCopy[key].length;
										}
									}
								break;
								case 'func':
									if (!Array.isArray(f.value) || f.value(value[f.name]) === false) {
										passedFilter = false;
										if (key == 'and') {
											i = filtersCopy[key].length;
										}
									}
								break;
								case 'equals':
								default:
									if (value[f.name] != f.value) {
										passedFilter = false;
										if (key == 'and') {
											i = filtersCopy[key].length;
										}
									}
								break;
							}
						}
					}
				}
				if (!passedFilter) {
					_self.dataSetState[index] = false;
				}
				return passedFilter;
			});
			this.triggerChange('filter');
			return (returnFiltered ? filtered : this);
		}
		,reset: function() {
			this.dataSetState = (new Array(this.dataSet.length).fill(true));
			this.triggerChange('reset');
			return this;
		}
	}, {
		sort: function(data, sorts) {
			return (new module({ data: data, clone: true })).sort(sorts).getData();
		}
		,filter: function(data, filters) {
			return (new module({ data: data, clone: true })).filter(filters, true);
		}
		,filterSort: function(data, filters, sorts) {
			var ds = new module({ data: data, clone: true });
			return ds.setData(ds.filter(filters, true)).sort(sorts).getData();
		}
	});
	bglib.DatasetModule = module;
	bglib.setRegisteredModule('Dataset', module);

	module.extend({
		getFoo: function() {
			return 'foo';
		}
	}, {
		getFooStatic: function() {
			return 'foo';
		}
	});

})(bglib);