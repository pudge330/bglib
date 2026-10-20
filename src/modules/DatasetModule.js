// base
const setModule = require('../base/setModule');
// modules
const DataType = require('./DataType');
const EventModule = require('./EventModule');

var DatasetModule = EventModule.extend({
    dataSet: undefined
    ,dataSetState: undefined
    ,constructor: function(opts) {
        EventModule.apply(this, arguments);
        opts = opts || {};

        if (opts.onChange) {
            this.on('change', opts.onChange);
        }
        this.dataSet = Array.isArray(opts.data)
            ? (opts.clone ? opts.data.slice() : opts.data)
            : [];
        this.dataSetState = new Array(this.dataSet.length).fill(true);
        this.triggerChange('set');
    }
    ,getData: function() {
        var _self = this;
        return this.dataSet.filter(function(value, index) {
            return _self.dataSetState[index];
        });
    }
    ,triggerChange: function(type) {
        this.trigger('change', {
            caller: this
            ,dataSet: this.getData()
            ,type: type
        });
        return this;
    }
    ,setData: function(data, clone) {
        this.dataSet = Array.isArray(data)
            ? (clone ? data.slice() : data)
            : [];
        this.dataSetState = new Array(this.dataSet.length).fill(true);
        return this.triggerChange('set');
    }
    ,determineSort: function(order) {
        if (DataType.isFunction(order)) {
            return order;
        }
        order = DataType.isString(order) ? order.toLowerCase() : 'asc';
        return ['desc', '>'].indexOf(order) !== -1 ? 'desc' : 'asc';
    }
    ,sort: function(sorts) {
        var _self = this;
        sorts = Array.isArray(sorts) ? sorts : [sorts];
        var normalized = sorts.map(function(sort) {
            if (DataType.isString(sort)) {
                return { name: sort, dir: 'asc' };
            }
            if (Array.isArray(sort)) {
                return { name: sort[0], dir: _self.determineSort(sort[1]) };
            }
            if (sort && DataType.isObject(sort)) {
                return { name: sort.name, dir: _self.determineSort(sort.dir) };
            }
            return null;
        }).filter(function(sort) {
            return sort && sort.name;
        });

        var entries = this.dataSet.map(function(value, index) {
            return { value: value, active: _self.dataSetState[index] };
        });
        entries.sort(function(entry1, entry2) {
            for (var i = 0; i < normalized.length; i++) {
                var sort = normalized[i];
                var value1 = entry1.value[sort.name];
                var value2 = entry2.value[sort.name];
                var result = 0;

                if (DataType.isFunction(sort.dir)) {
                    result = Number(sort.dir(value1, value2, entry1.value, entry2.value)) || 0;
                }
                else if (value1 > value2) {
                    result = sort.dir === 'asc' ? 1 : -1;
                }
                else if (value1 < value2) {
                    result = sort.dir === 'asc' ? -1 : 1;
                }

                if (result !== 0) {
                    return result;
                }
            }
            return 0;
        });

        this.dataSet = entries.map(function(entry) { return entry.value; });
        this.dataSetState = entries.map(function(entry) { return entry.active; });
        return this.triggerChange('sort');
    }
    ,determineFilterType: function(type) {
        type = DataType.isString(type) ? type.toLowerCase() : 'equals';
        var aliases = {
            equal: 'equals'
            ,'=': 'equals'
            ,'!equal': 'not-equals'
            ,'!equals': 'not-equals'
            ,'!=': 'not-equals'
            ,'<>': 'not-equals'
            ,contain: 'contains'
            ,has: 'contains'
            ,'!contain': 'not-contains'
            ,'!contains': 'not-contains'
            ,'!has': 'not-contains'
            ,'<': 'less-than'
            ,lessthan: 'less-than'
            ,less: 'less-than'
            ,'>': 'greater-than'
            ,greaterthan: 'greater-than'
            ,greater: 'greater-than'
            ,starts: 'starts-with'
            ,'^': 'starts-with'
            ,ends: 'ends-with'
            ,'$': 'ends-with'
            ,func: 'function'
        };
        var supported = [
            'equals', 'not-equals', 'contains', 'not-contains', 'less-than'
            ,'greater-than', 'starts-with', 'ends-with', 'regex', 'function'
        ];
        type = aliases[type] || type;
        return supported.indexOf(type) !== -1 ? type : 'equals';
    }
    ,determineFilterGlue: function(glue) {
        glue = DataType.isString(glue) ? glue.toLowerCase() : 'and';
        return ['or', '||', '|'].indexOf(glue) !== -1 ? 'or' : 'and';
    }
    ,detemineFilterGlue: function(glue) {
        return this.determineFilterGlue(glue);
    }
    ,normalizeFilter: function(filter) {
        var normalized;
        if (Array.isArray(filter)) {
            normalized = {
                name: filter[0]
                ,value: filter[1]
                ,type: filter[2]
                ,glue: filter[3]
            };
        }
        else if (filter && DataType.isObject(filter)) {
            normalized = {
                name: filter.name
                ,value: filter.value
                ,type: filter.type
                ,glue: filter.glue
                ,flags: filter.flags
            };
        }
        else {
            return null;
        }

        if (!normalized.name) {
            return null;
        }
        normalized.type = this.determineFilterType(normalized.type);
        normalized.glue = this.determineFilterGlue(normalized.glue);
        return normalized;
    }
    ,testFilter: function(row, filter, index) {
        var value = row[filter.name];
        switch (filter.type) {
            case 'not-equals':
                return value !== filter.value;
            case 'contains':
                return value !== null && typeof value !== 'undefined' &&
                    typeof value.includes === 'function' && value.includes(filter.value);
            case 'not-contains':
                return value === null || typeof value === 'undefined' ||
                    typeof value.includes !== 'function' || !value.includes(filter.value);
            case 'less-than':
                return value < filter.value;
            case 'greater-than':
                return value > filter.value;
            case 'starts-with':
                return String(value).startsWith(String(filter.value));
            case 'ends-with':
                return String(value).endsWith(String(filter.value));
            case 'regex':
                var regex = filter.value instanceof RegExp
                    ? filter.value
                    : new RegExp(filter.value, filter.flags || '');
                regex.lastIndex = 0;
                return regex.test(String(value));
            case 'function':
                return DataType.isFunction(filter.value) && Boolean(filter.value(value, row, index));
            case 'equals':
            default:
                return value === filter.value;
        }
    }
    ,filter: function(filters, returnFiltered) {
        var _self = this;
        filters = Array.isArray(filters) ? filters : [filters];
        var normalized = filters.map(function(filter) {
            return _self.normalizeFilter(filter);
        }).filter(Boolean);
        var andFilters = normalized.filter(function(filter) { return filter.glue === 'and'; });
        var orFilters = normalized.filter(function(filter) { return filter.glue === 'or'; });

        this.dataSetState = this.dataSet.map(function(row, index) {
            var passesAnd = andFilters.every(function(filter) {
                return _self.testFilter(row, filter, index);
            });
            var passesOr = !orFilters.length || orFilters.some(function(filter) {
                return _self.testFilter(row, filter, index);
            });
            return passesAnd && passesOr;
        });

        var filtered = this.getData();
        this.triggerChange('filter');
        return returnFiltered ? filtered : this;
    }
    ,reset: function() {
        this.dataSetState = new Array(this.dataSet.length).fill(true);
        return this.triggerChange('reset');
    }
}, {
    sort: function(data, sorts) {
        return (new DatasetModule({ data: data, clone: true })).sort(sorts).getData();
    }
    ,filter: function(data, filters) {
        return (new DatasetModule({ data: data, clone: true })).filter(filters, true);
    }
    ,filterSort: function(data, filters, sorts) {
        var dataSet = new DatasetModule({ data: data, clone: true });
        dataSet.filter(filters).sort(sorts);
        return dataSet.getData();
    }
});

setModule('Dataset', DatasetModule);
module.exports = DatasetModule;
