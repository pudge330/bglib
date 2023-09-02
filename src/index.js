const _ = require('./base/core');

// Auto Polyfills
https://polyfill.io/v3/polyfill.min.js?features=String.prototype.trim%2CArray.isArray%2CObject.keys%2CObject.assign%2CElement.prototype.matches%2CElement.prototype.closest%2CFunction.prototype.bind

var bglib = {
    fn: {}
};

// core
bglib.name = function() {
    return _.name;
};
bglib.version = function() {
    return _.version;
};

// vendor
require('./vendor/Polyfills');

// base
bglib.create = require('./base/create');
bglib.extend = require('./base/extend');
bglib.module = require('./base/module');
bglib.noop = require('./base/noop');
bglib.run = require('./base/run');
bglib.setModule = require('./base/setModule');

// functions
bglib.fn.call = require('./functions/call');
bglib.fn.compileTemplate = require('./functions/compileTemplate');
bglib.fn.concatUnique = require('./functions/concatUnique');
bglib.fn.copy = require('./functions/copy');
bglib.fn.copyMerge = require('./functions/copyMerge');
bglib.fn.debounce = require('./functions/debounce');
bglib.fn.deepCopyMerge = require('./functions/deepCopyMerge');
bglib.fn.deepMerge = require('./functions/deepMerge');
bglib.fn.formatDecimal = require('./functions/formatDecimal');
bglib.fn.formatPrice = require('./functions/formatPrice');
bglib.fn.formatPriceNumeric = require('./functions/formatPriceNumeric');
bglib.fn.htmlEntities = require('./functions/htmlEntities');
bglib.fn.interpolate = require('./functions/interpolate');
bglib.fn.iosVersion = require('./functions/iosVersion');
bglib.fn.jsonParse = require('./functions/jsonParse');
bglib.fn.lowerCaseFirst = require('./functions/lowerCaseFirst');
bglib.fn.pushUnique = require('./functions/pushUnique');
bglib.fn.rand = require('./functions/rand');
bglib.fn.renderTemplate = require('./functions/renderTemplate');
bglib.fn.request = require('./functions/request');
bglib.fn.throttle = require('./functions/throttle');
bglib.fn.toCamelCase = require('./functions/toCamelCase');
bglib.fn.toEm = require('./functions/toEm');
bglib.fn.toProperCase = require('./functions/toProperCase');
bglib.fn.toPx = require('./functions/toPx');
bglib.fn.upperCaseFirst = require('./functions/upperCaseFirst');
bglib.fn.uuidv4 = require('./functions/uuidv4');

// modules
bglib.AppRouter = require('./modules/AppRouter');
bglib.BaseModule = require('./modules/BaseModule');
bglib.DatasetModule = require('./modules/DatasetModule');
bglib.DataType = require('./modules/DataType');
bglib.DomEvents = require('./modules/DomEvents');
bglib.Element = require('./modules/Element');
bglib.ElementalData = require('./modules/ElementalData');
bglib.Event = require('./modules/Event');
bglib.EventManager = require('./modules/EventManager');
bglib.EventModule = require('./modules/EventModule');
bglib.EventUtil = require('./modules/EventUtil');
bglib.Storage = require('./modules/Storage');
bglib.TagLoader = require('./modules/TagLoader');
bglib.Timeout = require('./modules/Timeout');
bglib.UrlParser = require('./modules/UrlParser');
bglib.UserAutoExpire = require('./modules/UserAutoExpire');
bglib.Webify = require('./modules/Webify');

module.exports = bglib;