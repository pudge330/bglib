/*! @license
 *
 * bglib v2.0
 * https://github.com/pudge330/bglib
 *
 * Copyright 2019 - 2023
 * Released under the MIT license
 * https://github.com/pudge330/bglib/blob/master/LICENSE
 */
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["bglib"] = factory();
	else
		root["bglib"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/base/core.js":
/*!**************************!*\
  !*** ./src/base/core.js ***!
  \**************************/
/***/ ((module) => {

eval("module.exports = {\n  name: 'bglib',\n  version: '2.0.0',\n  modules: {}\n};\n\n//# sourceURL=webpack://bglib/./src/base/core.js?");

/***/ }),

/***/ "./src/base/create.js":
/*!****************************!*\
  !*** ./src/base/create.js ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// base\nconst _ = __webpack_require__(/*! ./core */ \"./src/base/core.js\");\nmodule.exports = function (name) {\n  if (_.hasOwnProperty(name)) {\n    var args = Array.prototype.slice.call(arguments);\n    args.shift();\n    var argsDef = '';\n    for (var i = 0; i < args.length; i++) {\n      argsDef += (argsDef === '' ? '' : ', ') + 'args[' + i + ']';\n    }\n    return eval('new _[name](' + argsDef + ')');\n  }\n};\n\n//# sourceURL=webpack://bglib/./src/base/create.js?");

/***/ }),

/***/ "./src/base/extend.js":
/*!****************************!*\
  !*** ./src/base/extend.js ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// base\nconst _ = __webpack_require__(/*! ./core */ \"./src/base/core.js\");\n// modules\nconst DataType = __webpack_require__(/*! ../modules/DataType */ \"./src/modules/DataType.js\");\nconst extend = function (name, prototypeProps, staticProps) {\n  if (!DataType.isString(name)) {\n    // old order: prototypeProps, staticProps, name\n    return extend(staticProps || 'Base', name || {}, prototypeProps || {});\n  }\n  prototypeProps = prototypeProps || {};\n  staticProps = staticProps || {};\n  name = name || 'Base';\n  if (!_.modules.hasOwnProperty(name)) {\n    name = 'Base';\n  }\n  return _.modules[name].extend(prototypeProps, staticProps);\n};\nmodule.exports = extend;\n\n//# sourceURL=webpack://bglib/./src/base/extend.js?");

/***/ }),

/***/ "./src/base/module.js":
/*!****************************!*\
  !*** ./src/base/module.js ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// base\nconst _ = __webpack_require__(/*! ./core */ \"./src/base/core.js\");\nmodule.exports = function (name) {\n  if (_.modules.hasOwnProperty(name)) {\n    return _.modules[name];\n  }\n};\n\n//# sourceURL=webpack://bglib/./src/base/module.js?");

/***/ }),

/***/ "./src/base/noop.js":
/*!**************************!*\
  !*** ./src/base/noop.js ***!
  \**************************/
/***/ ((module) => {

eval("module.exports = function () {};\n\n//# sourceURL=webpack://bglib/./src/base/noop.js?");

/***/ }),

/***/ "./src/base/run.js":
/*!*************************!*\
  !*** ./src/base/run.js ***!
  \*************************/
/***/ ((module) => {

eval("module.exports = function (code) {\n  return self[atob(\"ZXZhbA==\")](code);\n};\n\n//# sourceURL=webpack://bglib/./src/base/run.js?");

/***/ }),

/***/ "./src/base/setModule.js":
/*!*******************************!*\
  !*** ./src/base/setModule.js ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// base\nconst _ = __webpack_require__(/*! ./core */ \"./src/base/core.js\");\nmodule.exports = function (n, m) {\n  _.modules[n] = m;\n};\n\n//# sourceURL=webpack://bglib/./src/base/setModule.js?");

/***/ }),

/***/ "./src/functions/call.js":
/*!*******************************!*\
  !*** ./src/functions/call.js ***!
  \*******************************/
/***/ ((module) => {

eval("module.exports = function (func, args) {\n  return func.apply(null, args);\n};\n\n//# sourceURL=webpack://bglib/./src/functions/call.js?");

/***/ }),

/***/ "./src/functions/compileTemplate.js":
/*!******************************************!*\
  !*** ./src/functions/compileTemplate.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// functions\nconst rand = __webpack_require__(/*! ./rand */ \"./src/functions/rand.js\");\nmodule.exports = function (tpl, keys) {\n  var match,\n    jsTokens = [],\n    count = -1,\n    token = null;\n  //--js-code tokens\n  while (match = tpl.match(/(\\<\\%(.*|[\\s\\S]+?)\\%\\>?)/)) {\n    count++;\n    token = '##__jct__' + count + '__' + rand() + '__##';\n    jsTokens.push([token, match[2].trim()]);\n    tpl = tpl.replace(/(\\<\\%(.*|[\\s\\S]+?)\\%\\>?)/, token);\n  }\n  //--handle \\' and '\n  tpl = tpl.replace(/\\\\\\'/g, \"\\\\\\\\\\'\");\n  tpl = tpl.replace(/\\'/g, \"\\\\\\'\");\n  //--single-line tokens and comment tokens\n  tpl = tpl.replace(/\\{\\{\\{/g, \"' + helpers.htmlEntities(\");\n  tpl = tpl.replace(/\\}\\}\\}/g, \") + '\");\n  tpl = tpl.replace(/\\{\\{/g, \"' + \");\n  tpl = tpl.replace(/\\}\\}/g, \" + '\");\n  tpl = tpl.replace(/\\<\\*/g, \"'; /*\");\n  tpl = tpl.replace(/\\*\\>/g, \"*/ __bglib_template__ += '\");\n  //--escaped tokens\n  tpl = tpl.replace(/\\{\\\\\\{\\\\\\{/g, \"{{{\");\n  tpl = tpl.replace(/\\}\\\\\\}\\\\\\}/g, \"}}}\");\n  tpl = tpl.replace(/\\{\\\\\\{/g, \"{{\");\n  tpl = tpl.replace(/\\}\\\\\\}/g, \"}}\");\n  tpl = tpl.replace(/\\<\\\\\\*/g, \"<*\");\n  tpl = tpl.replace(/\\*\\\\\\>/g, \"*>\");\n  tpl = tpl.replace(/\\<\\\\\\%/g, \"<%\");\n  tpl = tpl.replace(/\\%\\\\\\>/g, \"%>\");\n  //--newlines\n  tpl = tpl.replace(/\\r\\n/g, \"\\n\");\n  tpl = tpl.replace(/\\n/g, \"';\\n__bglib_template__ += '\");\n  //--cut js comments\n  while (match = tpl.match(/(\\/\\*(.*|[\\s\\S]+?)\\*\\/)/)) {\n    tpl = tpl.replace(/(\\/\\*(.*|[\\s\\S]+?)\\*\\/)/, '');\n  }\n  //--js-code tokens\n  for (var i = 0; i < jsTokens.length; i++) {\n    tpl = tpl.replace(jsTokens[i][0], \"'; \" + jsTokens[i][1] + \"  __bglib_template__ += '\");\n  }\n  while (match = tpl.match(/for\\s*\\(\\s*([a-zA-Z_][a-zA-Z0-9_]*)\\s+in\\s+([a-zA-Z_][a-zA-Z0-9_]*)\\s*\\)\\s*\\{/)) {\n    var indexName = match[1] + 'Index',\n      replacement = 'for (var ' + indexName + ' = 0; ' + indexName + ' < ' + match[2] + '.length; ' + indexName + '++) { var ' + match[1] + ' = ' + match[2] + '[' + indexName + '];';\n    tpl = tpl.replace(/for\\s*\\(\\s*[a-zA-Z_][a-zA-Z0-9_]*\\s+in\\s+[a-zA-Z_][a-zA-Z0-9_]*\\s*\\)\\s*\\{/, replacement);\n  }\n  tpl = tpl.replace(/__bglib_template__ \\+\\= '';/gm, '');\n  tpl = tpl.replace(/__bglib_template__ \\+\\= '\\s+';/gm, '');\n  return 'var __bglib_template__ = \\'' + tpl + '\\';';\n};\n\n//# sourceURL=webpack://bglib/./src/functions/compileTemplate.js?");

/***/ }),

/***/ "./src/functions/concatUnique.js":
/*!***************************************!*\
  !*** ./src/functions/concatUnique.js ***!
  \***************************************/
/***/ ((module) => {

eval("module.exports = function (arr1, arr2) {\n  for (var i = 0; i < arr2.length; i++) {\n    if (arr1.indexOf(arr2[i]) === -1) {\n      arr1.push(arr2[i]);\n    }\n  }\n  return arr1;\n};\n\n//# sourceURL=webpack://bglib/./src/functions/concatUnique.js?");

/***/ }),

/***/ "./src/functions/copy.js":
/*!*******************************!*\
  !*** ./src/functions/copy.js ***!
  \*******************************/
/***/ ((module) => {

eval("module.exports = function (o) {\n  if (null === o || \"object\" != typeof o) return o;\n  var c = o.constructor();\n  return Object.assign(c, o);\n};\n\n//# sourceURL=webpack://bglib/./src/functions/copy.js?");

/***/ }),

/***/ "./src/functions/copyMerge.js":
/*!************************************!*\
  !*** ./src/functions/copyMerge.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const copy = __webpack_require__(/*! ./copy */ \"./src/functions/copy.js\");\nmodule.exports = function (o1, o2) {\n  return Object.assign(copy(o1), o2);\n};\n\n//# sourceURL=webpack://bglib/./src/functions/copyMerge.js?");

/***/ }),

/***/ "./src/functions/debounce.js":
/*!***********************************!*\
  !*** ./src/functions/debounce.js ***!
  \***********************************/
/***/ ((module) => {

eval("module.exports = function (func, delay) {\n  var timer;\n  return function () {\n    var context = this,\n      args = arguments;\n    clearTimeout(timer);\n    timer = setTimeout(function () {\n      func.apply(context, args);\n    }, delay);\n  };\n};\n\n//# sourceURL=webpack://bglib/./src/functions/debounce.js?");

/***/ }),

/***/ "./src/functions/deepCopyMerge.js":
/*!****************************************!*\
  !*** ./src/functions/deepCopyMerge.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// functions\nconst isObject = (__webpack_require__(/*! ../modules/DataType */ \"./src/modules/DataType.js\").isObject);\nconst deepCopyMerge = function () {\n  var args = Array.prototype.slice.call(arguments);\n  if (args.length === 0) return {};\n  var merged = Object.assign({}, args.shift());\n  for (var i = 0; i < args.length; i++) {\n    for (var key in args[i]) {\n      if (args[i].hasOwnProperty(key)) {\n        if (isObject(args[i][key]) && !Array.isArray(args[i][key]) && merged.hasOwnProperty(key) && isObject(merged[key])) merged[key] = deepCopyMerge(merged[key], args[i][key]);else if (Array.isArray(args[i][key]) && merged.hasOwnProperty(key) && Array.isArray(merged[key])) merged[key] = merged[key].concat(args[i][key]);else {\n          if (isObject(args[i][key])) args[i][key] = Object.assign({}, args[i][key]);\n          merged[key] = args[i][key];\n        }\n      }\n    }\n  }\n  return merged;\n};\nmodule.exports = deepCopyMerge;\n\n//# sourceURL=webpack://bglib/./src/functions/deepCopyMerge.js?");

/***/ }),

/***/ "./src/functions/deepMerge.js":
/*!************************************!*\
  !*** ./src/functions/deepMerge.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// functions\nconst isObject = (__webpack_require__(/*! ../modules/DataType */ \"./src/modules/DataType.js\").isObject);\nvar deepMerge = function () {\n  var args = Array.prototype.slice.call(arguments);\n  if (args.length === 0) return {};\n  var clone = false;\n  if (args.length > 2 && args[args.length - 1] === true) {\n    clone = true;\n    args.pop();\n  }\n  var merged = clone ? Object.assign({}, args.shift()) : args.shift();\n  for (var i = 0; i < args.length; i++) {\n    for (var key in args[i]) {\n      if (args[i].hasOwnProperty(key)) {\n        if (isObject(args[i][key]) && !Array.isArray(args[i][key]) && merged.hasOwnProperty(key) && isObject(merged[key])) merged[key] = deepMerge(merged[key], args[i][key], true);else if (Array.isArray(args[i][key]) && merged.hasOwnProperty(key) && Array.isArray(merged[key])) merged[key] = merged[key].concat(args[i][key]);else {\n          if (isObject(args[i][key])) args[i][key] = Object.assign({}, args[i][key]);\n          merged[key] = args[i][key];\n        }\n      }\n    }\n  }\n  return merged;\n};\nmodule.exports = deepMerge;\n\n//# sourceURL=webpack://bglib/./src/functions/deepMerge.js?");

/***/ }),

/***/ "./src/functions/formatDecimal.js":
/*!****************************************!*\
  !*** ./src/functions/formatDecimal.js ***!
  \****************************************/
/***/ ((module) => {

eval("module.exports = function (amount, pos) {\n  pos = pos || 2;\n  if (!amount || amount === '0') {\n    amount = 0;\n  }\n  if (typeof amount === 'string') {\n    amount = amount.replace(/[^\\d\\.]/g, '');\n  }\n  //-@ http://stackoverflow.com/a/6134070\n  return parseFloat(Math.round(amount * 100) / 100).toFixed(pos);\n};\n\n//# sourceURL=webpack://bglib/./src/functions/formatDecimal.js?");

/***/ }),

/***/ "./src/functions/formatPrice.js":
/*!**************************************!*\
  !*** ./src/functions/formatPrice.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// functions\nconst formatDecimal = __webpack_require__(/*! ./formatDecimal */ \"./src/functions/formatDecimal.js\");\n// modules\nconst DataType = __webpack_require__(/*! ../modules/DataType */ \"./src/modules/DataType.js\");\nmodule.exports = function (amount) {\n  if (DataType.isString(amount)) {\n    amount = parseFloat(amount.replace(/[^\\d\\.]/g, ''));\n  }\n  if (window.Intl && Intl.NumberFormat) {\n    var formatter = new Intl.NumberFormat('en-US', {\n      roundingMode: 'ceil',\n      currency: 'USD',\n      style: 'currency'\n    });\n    return formatter.format(amount);\n  }\n  return '$' + formatDecimal(amount, 2);\n};\n\n//# sourceURL=webpack://bglib/./src/functions/formatPrice.js?");

/***/ }),

/***/ "./src/functions/formatPriceNumeric.js":
/*!*********************************************!*\
  !*** ./src/functions/formatPriceNumeric.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// functions\nconst formatPrice = __webpack_require__(/*! ./formatPrice */ \"./src/functions/formatPrice.js\");\nmodule.exports = function (amount) {\n  return formatPrice(amount).replace(/[^\\d\\.]/g, '');\n};\n\n//# sourceURL=webpack://bglib/./src/functions/formatPriceNumeric.js?");

/***/ }),

/***/ "./src/functions/htmlEntities.js":
/*!***************************************!*\
  !*** ./src/functions/htmlEntities.js ***!
  \***************************************/
/***/ ((module) => {

eval("module.exports = function (s) {\n  s = s.replace(/[\\'\\\"\\&]/gim, function (i) {\n    if (i == '\\'') {\n      return '&#039;';\n    } else if (i == '\"') {\n      return '&quot;';\n    } else if (i == '&') {\n      return '&amp;';\n    }\n  });\n  return s.replace(/[\\u00A0-\\u9999<>]/gim, function (i) {\n    if (['\\'', '\"', '&'].indexOf(i) === -1) {\n      return '&#' + i.charCodeAt(0) + ';';\n    } else {\n      i;\n    }\n  });\n};\n\n//# sourceURL=webpack://bglib/./src/functions/htmlEntities.js?");

/***/ }),

/***/ "./src/functions/interpolate.js":
/*!**************************************!*\
  !*** ./src/functions/interpolate.js ***!
  \**************************************/
/***/ ((module) => {

eval("module.exports = function (tpl, data) {\n  for (var key in data) {\n    tpl = tpl.replace(new RegExp('{{' + key + '}}', 'gm'), data[key]);\n  }\n  return tpl;\n};\n\n//# sourceURL=webpack://bglib/./src/functions/interpolate.js?");

/***/ }),

/***/ "./src/functions/iosVersion.js":
/*!*************************************!*\
  !*** ./src/functions/iosVersion.js ***!
  \*************************************/
/***/ ((module) => {

eval("module.exports = function () {\n  //--@ https://stackoverflow.com/questions/8348139/detect-ios-version-less-than-5-with-javascript\n  if (/iP(hone|od|ad)/.test(navigator.platform)) {\n    // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>\n    var v = navigator.appVersion.match(/OS (\\d+)_(\\d+)_?(\\d+)?/);\n    return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];\n  } else {\n    return null;\n  }\n};\n\n//# sourceURL=webpack://bglib/./src/functions/iosVersion.js?");

/***/ }),

/***/ "./src/functions/jsonParse.js":
/*!************************************!*\
  !*** ./src/functions/jsonParse.js ***!
  \************************************/
/***/ ((module) => {

eval("module.exports = function (_json) {\n  if (_json === null) {\n    return null;\n  }\n  try {\n    _json = JSON.parse(_json);\n  } catch (e) {\n    _json = null;\n  }\n  return _json;\n};\n\n//# sourceURL=webpack://bglib/./src/functions/jsonParse.js?");

/***/ }),

/***/ "./src/functions/lowerCaseFirst.js":
/*!*****************************************!*\
  !*** ./src/functions/lowerCaseFirst.js ***!
  \*****************************************/
/***/ ((module) => {

eval("module.exports = function (str) {\n  str.charAt(0).toLowerCase() + str.slice(1);\n};\n\n//# sourceURL=webpack://bglib/./src/functions/lowerCaseFirst.js?");

/***/ }),

/***/ "./src/functions/pushUnique.js":
/*!*************************************!*\
  !*** ./src/functions/pushUnique.js ***!
  \*************************************/
/***/ ((module) => {

eval("module.exports = function (arr, val) {\n  if (arr.indexOf(val) === -1) {\n    arr.push(val);\n  }\n  return arr;\n};\n\n//# sourceURL=webpack://bglib/./src/functions/pushUnique.js?");

/***/ }),

/***/ "./src/functions/rand.js":
/*!*******************************!*\
  !*** ./src/functions/rand.js ***!
  \*******************************/
/***/ ((module) => {

eval("module.exports = function (max) {\n  max = max || 100000000;\n  return Math.floor(Math.random() * max + 1);\n};\n\n//# sourceURL=webpack://bglib/./src/functions/rand.js?");

/***/ }),

/***/ "./src/functions/renderTemplate.js":
/*!*****************************************!*\
  !*** ./src/functions/renderTemplate.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// base\nconst run = __webpack_require__(/*! ../base/run */ \"./src/base/run.js\");\n// functions\nconst compileTemplate = __webpack_require__(/*! ./compileTemplate */ \"./src/functions/compileTemplate.js\");\nconst formatDecimal = __webpack_require__(/*! ./formatDecimal */ \"./src/functions/formatDecimal.js\");\nconst formatPrice = __webpack_require__(/*! ./formatPrice */ \"./src/functions/formatPrice.js\");\nconst htmlEntities = __webpack_require__(/*! ./htmlEntities */ \"./src/functions/htmlEntities.js\");\nconst rand = __webpack_require__(/*! ./rand */ \"./src/functions/rand.js\");\nconst toCamelCase = __webpack_require__(/*! ./toCamelCase */ \"./src/functions/toCamelCase.js\");\nconst toEm = __webpack_require__(/*! ./toEm */ \"./src/functions/toEm.js\");\nconst toProperCase = __webpack_require__(/*! ./toProperCase */ \"./src/functions/toProperCase.js\");\nconst toPx = __webpack_require__(/*! ./toPx */ \"./src/functions/toPx.js\");\n// modules\nconst DataType = __webpack_require__(/*! ../modules/DataType */ \"./src/modules/DataType.js\");\nlet renderTemplate = function (tpl, data) {\n  var helpers = renderTemplate.helpers,\n    format = renderTemplate.format,\n    fn = renderTemplate.fn,\n    data = data || {},\n    dataKeys = Object.keys(data),\n    tpl1 = '';\n  for (var i = 0; i < dataKeys.length; i++) {\n    if (['helpers', 'format', 'fn', 'data'].indexOf(dataKeys[i]) === -1 && dataKeys[i].match(/^[a-zA-Z_][a-zA-Z0-9_]*$/)) {\n      tpl1 += 'var ' + dataKeys[i] + ' = this.' + dataKeys[i] + ';';\n    }\n  }\n  tpl = tpl1 + (tpl.match(/^var __bglib_template__ = \\'/) ? tpl : compileTemplate(tpl, Object.keys(data)));\n  return function () {\n    eval(tpl);\n    return __bglib_template__;\n  }.call(data);\n};\nrenderTemplate.helpers = {};\nrenderTemplate.helpers.htmlEntities = htmlEntities;\nrenderTemplate.helpers.rand = rand;\nrenderTemplate.helpers.toEm = toEm;\nrenderTemplate.helpers.toPx = toPx;\nrenderTemplate.helpers.dt = DataType;\nrenderTemplate.format = {};\nrenderTemplate.format.camelCase = toCamelCase;\nrenderTemplate.format.properCase = toProperCase;\nrenderTemplate.format.decimal = formatDecimal;\nrenderTemplate.format.price = formatPrice;\nrenderTemplate.fn = {};\nmodule.exports = renderTemplate;\n\n//# sourceURL=webpack://bglib/./src/functions/renderTemplate.js?");

/***/ }),

/***/ "./src/functions/request.js":
/*!**********************************!*\
  !*** ./src/functions/request.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// base\nconst noop = __webpack_require__(/*! ../base/noop */ \"./src/base/noop.js\");\n// modules\nconst DataType = __webpack_require__(/*! ../modules/DataType */ \"./src/modules/DataType.js\");\nmodule.exports = function (url, cb, data, type) {\n  data = data || {};\n  type = type || 'GET';\n  var sendData = type !== 'GET';\n  cb = cb || noop;\n  cb = DataType.isFunction(cb) ? {\n    success: cb,\n    error: noop,\n    always: noop\n  } : Object.assign({\n    success: noop,\n    error: noop,\n    always: noop\n  }, cb);\n  var xhr = new XMLHttpRequest();\n  xhr.open(type, url, true);\n  xhr.addEventListener(\"readystatechange\", function () {\n    if (xhr.readyState == 4 && xhr.status == 200) {\n      cb.success(xhr.responseText, xhr, data);\n    } else {\n      cb.error(xhr.responseText, xhr, data);\n    }\n    cb.always(xhr.responseText, xhr, data);\n  }, false);\n  if (sendData) {\n    xhr.setRequestHeader(\"Content-Type\", \"application/json;charset=UTF-8\");\n    xhr.send(JSON.stringify(data));\n  } else {\n    xhr.send();\n  }\n};\n\n//# sourceURL=webpack://bglib/./src/functions/request.js?");

/***/ }),

/***/ "./src/functions/throttle.js":
/*!***********************************!*\
  !*** ./src/functions/throttle.js ***!
  \***********************************/
/***/ ((module) => {

eval("module.exports = function (func, delay) {\n  //--https://www.youtube.com/watch?v=cjIswDCKgu0\n  var shouldWait = false;\n  var waitingArguments = null;\n  var timeoutFunc = function () {\n    if (waitingArguments == null) {\n      shouldWait = false;\n    } else {\n      func.apply(this, waitingArguments);\n      waitingArguments = null;\n      setTimeout(timeoutFunc, delay);\n    }\n  };\n  return function () {\n    var args = arguments;\n    if (shouldWait) {\n      waitingArguments = args;\n      return;\n    }\n    func.apply(this, args);\n    shouldWait = true;\n    setTimeout(timeoutFunc, delay);\n  };\n};\n\n//# sourceURL=webpack://bglib/./src/functions/throttle.js?");

/***/ }),

/***/ "./src/functions/toCamelCase.js":
/*!**************************************!*\
  !*** ./src/functions/toCamelCase.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const upperCaseFirst = __webpack_require__(/*! ./upperCaseFirst */ \"./src/functions/upperCaseFirst.js\");\nmodule.exports = function (str) {\n  var parts = str.split('-');\n  var final = parts.shift();\n  while (parts.length) {\n    final += upperCaseFirst(parts[0]);\n    parts.shift();\n  }\n  return final;\n};\n\n//# sourceURL=webpack://bglib/./src/functions/toCamelCase.js?");

/***/ }),

/***/ "./src/functions/toEm.js":
/*!*******************************!*\
  !*** ./src/functions/toEm.js ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// modules\nconst El = __webpack_require__(/*! ../modules/Element */ \"./src/modules/Element.js\");\nmodule.exports = function (val, scope) {\n  scope = scope || document.querySelector('body');\n  val = parseInt(val, 10);\n  var test = document.createElement('div');\n  test.innerHTML = '&nbsp;';\n  El.css(test, {\n    \"font-size\": '1em',\n    \"margin\": 0,\n    \"padding\": 0,\n    \"height\": 'auto',\n    \"line-height\": 1,\n    \"border\": 0\n  });\n  scope.appendChild(test);\n  var testVal = parseFloat(El.css(test, 'height'));\n  El.remove(test);\n  return ((val / testVal).toFixed(8) + '').replace(/0+$/, '').replace(/\\.$/, '') + 'em';\n};\n\n//# sourceURL=webpack://bglib/./src/functions/toEm.js?");

/***/ }),

/***/ "./src/functions/toProperCase.js":
/*!***************************************!*\
  !*** ./src/functions/toProperCase.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// functions\nconst toCamelCase = __webpack_require__(/*! ./toCamelCase */ \"./src/functions/toCamelCase.js\");\nconst upperCaseFirst = __webpack_require__(/*! ./upperCaseFirst */ \"./src/functions/upperCaseFirst.js\");\nmodule.exports = function (str) {\n  return upperCaseFirst(toCamelCase(str));\n};\n\n//# sourceURL=webpack://bglib/./src/functions/toProperCase.js?");

/***/ }),

/***/ "./src/functions/toPx.js":
/*!*******************************!*\
  !*** ./src/functions/toPx.js ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// modules\nconst El = __webpack_require__(/*! ../modules/Element */ \"./src/modules/Element.js\");\nmodule.exports = function (val, scope) {\n  scope = scope || document.querySelector('body');\n  val = parseFloat(val);\n  var test = document.createElement('div');\n  test.innerHTML = '&nbsp;';\n  El.css(test, {\n    \"font-size\": '1em',\n    \"margin\": 0,\n    \"padding\": 0,\n    \"height\": 'auto',\n    \"line-height\": 1,\n    \"border\": 0\n  });\n  scope.appendChild(test);\n  var testVal = parseFloat(El.css(test, 'height'));\n  El.remove(test);\n  return Math.round(val * testVal) + '' + 'px';\n};\n\n//# sourceURL=webpack://bglib/./src/functions/toPx.js?");

/***/ }),

/***/ "./src/functions/upperCaseFirst.js":
/*!*****************************************!*\
  !*** ./src/functions/upperCaseFirst.js ***!
  \*****************************************/
/***/ ((module) => {

eval("module.exports = function (str) {\n  str.charAt(0).toUpperCase() + str.slice(1);\n};\n\n//# sourceURL=webpack://bglib/./src/functions/upperCaseFirst.js?");

/***/ }),

/***/ "./src/functions/uuidv4.js":
/*!*********************************!*\
  !*** ./src/functions/uuidv4.js ***!
  \*********************************/
/***/ ((module) => {

eval("/*\n * Generate uuidv4 string.\n *\n * https://stackoverflow.com/a/2117523\n */\nmodule.exports = function () {\n  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));\n};\n\n//# sourceURL=webpack://bglib/./src/functions/uuidv4.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const _ = __webpack_require__(/*! ./base/core */ \"./src/base/core.js\");\n\n// Auto Polyfills\nhttps:\n//polyfill.io/v3/polyfill.min.js?features=String.prototype.trim%2CArray.isArray%2CObject.keys%2CObject.assign%2CElement.prototype.matches%2CElement.prototype.closest%2CFunction.prototype.bind\n\nvar bglib = {\n  fn: {}\n};\n\n// core\nbglib.name = function () {\n  return _.name;\n};\nbglib.version = function () {\n  return _.version;\n};\n\n// vendor\n__webpack_require__(/*! ./vendor/Polyfills */ \"./src/vendor/Polyfills.js\");\n\n// base\nbglib.create = __webpack_require__(/*! ./base/create */ \"./src/base/create.js\");\nbglib.extend = __webpack_require__(/*! ./base/extend */ \"./src/base/extend.js\");\nbglib.module = __webpack_require__(/*! ./base/module */ \"./src/base/module.js\");\nbglib.noop = __webpack_require__(/*! ./base/noop */ \"./src/base/noop.js\");\nbglib.run = __webpack_require__(/*! ./base/run */ \"./src/base/run.js\");\nbglib.setModule = __webpack_require__(/*! ./base/setModule */ \"./src/base/setModule.js\");\n\n// functions\nbglib.fn.call = __webpack_require__(/*! ./functions/call */ \"./src/functions/call.js\");\nbglib.fn.compileTemplate = __webpack_require__(/*! ./functions/compileTemplate */ \"./src/functions/compileTemplate.js\");\nbglib.fn.concatUnique = __webpack_require__(/*! ./functions/concatUnique */ \"./src/functions/concatUnique.js\");\nbglib.fn.copy = __webpack_require__(/*! ./functions/copy */ \"./src/functions/copy.js\");\nbglib.fn.copyMerge = __webpack_require__(/*! ./functions/copyMerge */ \"./src/functions/copyMerge.js\");\nbglib.fn.debounce = __webpack_require__(/*! ./functions/debounce */ \"./src/functions/debounce.js\");\nbglib.fn.deepCopyMerge = __webpack_require__(/*! ./functions/deepCopyMerge */ \"./src/functions/deepCopyMerge.js\");\nbglib.fn.deepMerge = __webpack_require__(/*! ./functions/deepMerge */ \"./src/functions/deepMerge.js\");\nbglib.fn.formatDecimal = __webpack_require__(/*! ./functions/formatDecimal */ \"./src/functions/formatDecimal.js\");\nbglib.fn.formatPrice = __webpack_require__(/*! ./functions/formatPrice */ \"./src/functions/formatPrice.js\");\nbglib.fn.formatPriceNumeric = __webpack_require__(/*! ./functions/formatPriceNumeric */ \"./src/functions/formatPriceNumeric.js\");\nbglib.fn.htmlEntities = __webpack_require__(/*! ./functions/htmlEntities */ \"./src/functions/htmlEntities.js\");\nbglib.fn.interpolate = __webpack_require__(/*! ./functions/interpolate */ \"./src/functions/interpolate.js\");\nbglib.fn.iosVersion = __webpack_require__(/*! ./functions/iosVersion */ \"./src/functions/iosVersion.js\");\nbglib.fn.jsonParse = __webpack_require__(/*! ./functions/jsonParse */ \"./src/functions/jsonParse.js\");\nbglib.fn.lowerCaseFirst = __webpack_require__(/*! ./functions/lowerCaseFirst */ \"./src/functions/lowerCaseFirst.js\");\nbglib.fn.pushUnique = __webpack_require__(/*! ./functions/pushUnique */ \"./src/functions/pushUnique.js\");\nbglib.fn.rand = __webpack_require__(/*! ./functions/rand */ \"./src/functions/rand.js\");\nbglib.fn.renderTemplate = __webpack_require__(/*! ./functions/renderTemplate */ \"./src/functions/renderTemplate.js\");\nbglib.fn.request = __webpack_require__(/*! ./functions/request */ \"./src/functions/request.js\");\nbglib.fn.throttle = __webpack_require__(/*! ./functions/throttle */ \"./src/functions/throttle.js\");\nbglib.fn.toCamelCase = __webpack_require__(/*! ./functions/toCamelCase */ \"./src/functions/toCamelCase.js\");\nbglib.fn.toEm = __webpack_require__(/*! ./functions/toEm */ \"./src/functions/toEm.js\");\nbglib.fn.toProperCase = __webpack_require__(/*! ./functions/toProperCase */ \"./src/functions/toProperCase.js\");\nbglib.fn.toPx = __webpack_require__(/*! ./functions/toPx */ \"./src/functions/toPx.js\");\nbglib.fn.upperCaseFirst = __webpack_require__(/*! ./functions/upperCaseFirst */ \"./src/functions/upperCaseFirst.js\");\nbglib.fn.uuidv4 = __webpack_require__(/*! ./functions/uuidv4 */ \"./src/functions/uuidv4.js\");\n\n// modules\nbglib.AppRouter = __webpack_require__(/*! ./modules/AppRouter */ \"./src/modules/AppRouter.js\");\nbglib.BaseModule = __webpack_require__(/*! ./modules/BaseModule */ \"./src/modules/BaseModule.js\");\nbglib.DatasetModule = __webpack_require__(/*! ./modules/DatasetModule */ \"./src/modules/DatasetModule.js\");\nbglib.DataType = __webpack_require__(/*! ./modules/DataType */ \"./src/modules/DataType.js\");\nbglib.DomEvents = __webpack_require__(/*! ./modules/DomEvents */ \"./src/modules/DomEvents.js\");\nbglib.Element = __webpack_require__(/*! ./modules/Element */ \"./src/modules/Element.js\");\nbglib.ElementalData = __webpack_require__(/*! ./modules/ElementalData */ \"./src/modules/ElementalData.js\");\nbglib.Event = __webpack_require__(/*! ./modules/Event */ \"./src/modules/Event.js\");\nbglib.EventManager = __webpack_require__(/*! ./modules/EventManager */ \"./src/modules/EventManager.js\");\nbglib.EventModule = __webpack_require__(/*! ./modules/EventModule */ \"./src/modules/EventModule.js\");\nbglib.EventUtil = __webpack_require__(/*! ./modules/EventUtil */ \"./src/modules/EventUtil.js\");\nbglib.Storage = __webpack_require__(/*! ./modules/Storage */ \"./src/modules/Storage.js\");\nbglib.TagLoader = __webpack_require__(/*! ./modules/TagLoader */ \"./src/modules/TagLoader.js\");\nbglib.Timeout = __webpack_require__(/*! ./modules/Timeout */ \"./src/modules/Timeout.js\");\nbglib.UrlParser = __webpack_require__(/*! ./modules/UrlParser */ \"./src/modules/UrlParser.js\");\nbglib.UserAutoExpire = __webpack_require__(/*! ./modules/UserAutoExpire */ \"./src/modules/UserAutoExpire.js\");\nbglib.Webify = __webpack_require__(/*! ./modules/Webify */ \"./src/modules/Webify.js\");\nmodule.exports = bglib;\n\n//# sourceURL=webpack://bglib/./src/index.js?");

/***/ }),

/***/ "./src/modules/AppRouter.js":
/*!**********************************!*\
  !*** ./src/modules/AppRouter.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// functions\nconst deepCopyMerge = __webpack_require__(/*! ../functions/deepCopyMerge */ \"./src/functions/deepCopyMerge.js\");\nconst objectCopy = __webpack_require__(/*! ../functions/copy */ \"./src/functions/copy.js\");\n// modules\nconst BaseModule = __webpack_require__(/*! ./BaseModule */ \"./src/modules/BaseModule.js\");\nmodule.exports = BaseModule.extend({\n  routes: undefined,\n  init: function (_routes) {\n    this.routes = {};\n    if (typeof _routes !== 'undefined') {\n      var copy = deepCopyMerge({}, _routes);\n      //--changes to copy seems to affect the original object\n      this.setRoutes(copy);\n    }\n  },\n  processRoute: function (route) {\n    if (typeof route.defaults == 'undefined') route.defaults = {};\n    if (typeof route.requirements == 'undefined') route.requirements = {};\n    route.defaultSlugs = {\n      keys: [],\n      obj: {},\n      arr: []\n    };\n    route.pattern = route.pattern.replace(/\\/+$/, '');\n    if (route.pattern == '') {\n      route.pattern = '/';\n    }\n    route.compiledRegex = this.compileRoute(route, route.pattern, route.defaults, route.requirements);\n    return route;\n  },\n  compileRoute: function (route, pattern, defaults, requirements) {\n    var slugMatches = pattern.match(/({([^\\/{}]+)})/g);\n    var regexes = {};\n    if (slugMatches) {\n      for (var i = 0; i < slugMatches.length; i++) {\n        var slugMatch = slugMatches[i];\n        slugMatches[i] = slugMatches[i].replace(/^({)|(})$/g, '');\n        var _tmpRegex = '([^\\\\/?#]+)';\n        if (typeof requirements[slugMatches[i]] != 'undefined') {\n          _tmpRegex = '(' + requirements[slugMatches[i]] + ')';\n        }\n        slugMatch = '\\\\{' + slugMatches[i] + '\\\\}';\n        route.defaultSlugs.keys.push(slugMatches[i]);\n        if (typeof defaults[slugMatches[i]] != 'undefined') {\n          route.defaultSlugs.obj[slugMatches[i]] = defaults[slugMatches[i]];\n          route.defaultSlugs.arr.push(defaults[slugMatches[i]]);\n          if (i == slugMatches.length - 1) {\n            _tmpRegex = '(?:\\\\/' + _tmpRegex + '|\\\\/)?';\n            slugMatch = '\\\\/' + slugMatch;\n          }\n          delete route.defaults[slugMatches[i]];\n        } else {\n          route.defaultSlugs.obj[slugMatches[i]] = undefined;\n          route.defaultSlugs.arr.push(undefined);\n        }\n        regexes[slugMatch] = _tmpRegex;\n      }\n    }\n    pattern = this.regexEscape(pattern);\n    for (var _slug in regexes) {\n      if (regexes.hasOwnProperty(_slug)) {\n        pattern = pattern.replace(_slug, regexes[_slug]);\n      }\n    }\n    pattern = '^' + pattern + '$';\n    return new RegExp(pattern);\n  },\n  regexEscape: function (str) {\n    return str.replace(/[-\\/\\\\^$*+?.()|[\\]{}]/g, '\\\\$&');\n  },\n  setRoutes: function (routes) {\n    this.routes = routes;\n    for (var _name in this.routes) {\n      if (this.routes.hasOwnProperty(_name)) {\n        this.routes[_name] = this.processRoute(this.routes[_name]);\n      }\n    }\n  },\n  addRoute: function (name, opts, action) {\n    this.routes[name] = opts;\n    if (typeof action != 'undefined') {\n      this.routes[name].action = action;\n    }\n    this.routes[name] = this.processRoute(this.routes[name]);\n  },\n  addRoutes: function (routes) {\n    for (var _name in routes) {\n      if (routes.hasOwnProperty(_name)) {\n        this.routes[_name] = routes[_name];\n        this.routes[_name] = this.processRoute(this.routes[_name]);\n      }\n    }\n  },\n  match: function (url) {\n    url = url.replace(/\\/+$/, '');\n    if (url == '') {\n      url = '/';\n    }\n    for (var _name in this.routes) {\n      if (this.routes.hasOwnProperty(_name)) {\n        var urlMatches = url.match(this.routes[_name].compiledRegex);\n        if (urlMatches) {\n          var _slugs = {\n            obj: objectCopy(this.routes[_name].defaultSlugs.obj),\n            arr: this.routes[_name].defaultSlugs.arr.slice()\n          };\n          for (var i = 0; i < _slugs.arr.length; i++) {\n            if (typeof urlMatches[i + 1] != 'undefined') {\n              _slugs.obj[this.routes[_name].defaultSlugs.keys[i]] = urlMatches[i + 1];\n              _slugs.arr[i] = urlMatches[i + 1];\n            }\n          }\n          return {\n            action: this.routes[_name].action,\n            slugs: _slugs,\n            defaults: objectCopy(this.routes[_name].defaults)\n          };\n        }\n      }\n    }\n    return null;\n  }\n});\n\n//# sourceURL=webpack://bglib/./src/modules/AppRouter.js?");

/***/ }),

/***/ "./src/modules/BaseModule.js":
/*!***********************************!*\
  !*** ./src/modules/BaseModule.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// base\nconst setModule = __webpack_require__(/*! ../base/setModule */ \"./src/base/setModule.js\");\nvar _BaseModule = function () {};\n_BaseModule.extend = function (prototypeProperties, staticProperties) {\n  prototypeProperties = prototypeProperties || {};\n  staticProperties = staticProperties || {};\n  var parent = this;\n  var child;\n  if (prototypeProperties && prototypeProperties.hasOwnProperty('constructor')) {\n    child = prototypeProperties.constructor;\n  } else {\n    child = function () {\n      return parent.apply(this, arguments);\n    };\n  }\n  child = Object.assign(child, parent);\n  child = Object.assign(child, staticProperties);\n  child.prototype = Object.create(parent.prototype, {\n    constructor: {\n      value: child,\n      enumerable: false,\n      writable: true,\n      configurable: true\n    }\n  });\n  Object.assign(child.prototype, prototypeProperties);\n  child.__parent = parent;\n  return child;\n};\nBaseModule = _BaseModule.extend({\n  constructor: function () {\n    _BaseModule.apply(this, arguments);\n    if (this.init) {\n      this.init.apply(this, arguments);\n    }\n  }\n});\nsetModule('Base', BaseModule);\nmodule.exports = BaseModule;\n\n//# sourceURL=webpack://bglib/./src/modules/BaseModule.js?");

/***/ }),

/***/ "./src/modules/DataType.js":
/*!*********************************!*\
  !*** ./src/modules/DataType.js ***!
  \*********************************/
/***/ ((module) => {

eval("module.exports = {\n  isString: function (value) {\n    return typeof value === 'string' || value instanceof String;\n  },\n  isFinite: function (value) {\n    if (typeof isFinite !== 'undefined') {\n      return isFinite(value);\n    } else return typeof value === 'number';\n  },\n  isNumber: function (value) {\n    return typeof value === 'number' && this.isFinite(value);\n  },\n  isArray: function (value) {\n    return Object.prototype.toString.call(value) === '[object Array]';\n  },\n  isFunction: function (value) {\n    return typeof value === 'function';\n  },\n  isObject: function (value) {\n    return value !== false && (typeof value === 'function' || typeof value === 'object');\n  },\n  isNull: function (value) {\n    return value === null;\n  },\n  isUndefined: function (value) {\n    return typeof value === 'undefined';\n  },\n  isBool: function (value) {\n    return typeof value === 'boolean';\n  },\n  isRegExp: function (value) {\n    return value && typeof value === 'object' && value.constructor === RegExp;\n  },\n  isError: function (value) {\n    return value instanceof Error && typeof value.message !== 'undefined';\n  },\n  isDate: function (value) {\n    return value instanceof Date;\n  }\n};\n\n//# sourceURL=webpack://bglib/./src/modules/DataType.js?");

/***/ }),

/***/ "./src/modules/DatasetModule.js":
/*!**************************************!*\
  !*** ./src/modules/DatasetModule.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// base\nconst setModule = __webpack_require__(/*! ../base/setModule */ \"./src/base/setModule.js\");\n// modules\nconst DataType = __webpack_require__(/*! ./DataType */ \"./src/modules/DataType.js\");\nconst EventModule = __webpack_require__(/*! ./EventModule */ \"./src/modules/EventModule.js\");\nvar DatasetModule = EventModule.extend({\n  dataSet: undefined,\n  dataSetState: undefined,\n  constructor: function () {\n    EventModule.apply(this, arguments);\n    var opts = arguments[0] || [];\n    if (opts.onChange) {\n      this.on('change', opts.onChange);\n    }\n    if (opts.data && Array.isArray(opts.data)) {\n      var clone = opts.clone || false;\n      this.dataSet = clone ? opts.data.slice(0) : opts.data;\n    } else {\n      this.dataSet = [];\n    }\n    this.dataSetState = new Array(this.dataSet.length).fill(true);\n    this.triggerChange('set');\n  },\n  getData: function () {\n    var _self = this;\n    return this.dataSet.filter(function (value, index) {\n      if (_self.dataSetState[index]) return true;else return false;\n    });\n  },\n  triggerChange: function (type) {\n    var _self = this;\n    this.trigger('change', {\n      caller: _self,\n      dataSet: _self.getData(),\n      type: type\n    });\n  },\n  setData: function (data, clone) {\n    clone = clone || false;\n    this.dataSet = clone ? data.slice(0) : data;\n    this.dataSetState = new Array(this.dataSet.length).fill(true);\n    return this;\n  },\n  determineSort: function (order) {\n    var _self = this;\n    order = order.toLowerCase();\n    if (Array.isArray(order)) return order;else if (['desc', '>'].indexOf(order) !== -1) return 'desc';else\n      // asc <\n      return 'asc';\n  },\n  sort: function (sorts) {\n    var _self = this;\n    var sortsCopy = [];\n    for (var i = 0; i < sorts.length; i++) {\n      var name = null,\n        direction = null;\n      if (typeof sorts[i] === 'string') {\n        name = sorts[i];\n        direction = 'asc';\n      } else if (Array.isArray(sorts[i])) {\n        name = sorts[i][0];\n        direction = this.determineSort(sorts[i][1]);\n      } else if (DataType.isObject(sorts[i])) {\n        name = sorts[i].name;\n        direction = sorts[i].dir;\n        direction = this.determineSort(direction);\n      }\n      if (name) {\n        sortsCopy.push({\n          name: name,\n          dir: direction\n        });\n      }\n    }\n    var arr = this.dataSet;\n    arr.sort(function (value1, value2) {\n      for (var i = 0; i < sortsCopy.length; i++) {\n        var s = sortsCopy[i];\n        if (Array.isArray(s.dir)) {\n          var returned = s.dir(value1[s.name], value2[s.name]);\n          if ([-1, 1].indexOf(returned) !== -1) {\n            return returned;\n          }\n        } else {\n          if (value1[s.name] > value2[s.name]) return s.dir === 'asc' ? 1 : -1;\n          if (value1[s.name] < value2[s.name]) return s.dir === 'asc' ? -1 : 1;\n        }\n      }\n      return 0;\n    });\n    this.triggerChange('sort');\n    return this;\n  },\n  determineFilterType: function (type) {\n    type = type.toLowerCase();\n    if (['equals', 'equal', '='].indexOf(type) !== -1) return 'equals';else if (['!equals', '!equal', '!=', '<>'].indexOf(type) !== -1) return 'not-equals';else if (['contains', 'contain', 'has'].indexOf(type) !== -1) return 'contains';else if (['!contains', '!contain', '!has'].indexOf(type) !== -1) return 'not-contains';else if (['<', 'less-than', 'lessthan', 'less'].indexOf(type) !== -1) return 'less-than';else if (['>', 'greater-than', 'greaterthan', 'greater'].indexOf(type) !== -1) return 'greater-than';else if (['starts-with', 'starts', '^'].indexOf(type) !== -1) return 'starts-with';else if (['ends-with', 'ends', '$'].indexOf(type) !== -1) return 'ends-with';else if (['regex'].indexOf(type) !== -1) return 'regex';else if (['function', 'func'].indexOf(type) !== -1) return 'function';else return 'equals';\n    //--todo: add 'regex' and 'func' type\n  },\n\n  detemineFilterGlue: function (glue) {\n    glue = glue.toLowerCase();\n    if (['and', '&'].indexOf(glue) !== 1) return 'and';else if (['or', '||', '|'].indexOf(glue) !== 1) return 'or';else return 'and';\n  },\n  filter: function (filters, returnFiltered) {\n    returnFiltered = returnFiltered || false;\n    var _self = this;\n    _self.reset();\n    var filtersCopy = {\n      and: [],\n      or: []\n    };\n    for (var i = 0; i < filters.length; i++) {\n      var name = null,\n        value = null,\n        type = null,\n        glue = null;\n      if (Array.isArray(filters[i])) {\n        switch (filters[i].length) {\n          case 4:\n            name = filters[i][0];\n            value = filters[i][1];\n            type = this.determineFilterType(filters[i][2]);\n            glue = this.detemineFilterGlue(filters[i][3]);\n            break;\n          case 3:\n            name = filters[i][0];\n            value = filters[i][1];\n            type = this.determineFilterType(filters[i][2]);\n            glue = 'and';\n            break;\n          case 2:\n          default:\n            name = filters[i][0];\n            value = filters[i][1];\n            type = 'equals';\n            glue = 'and';\n            break;\n        }\n      } else if (DataType.isObject(filters[i])) {\n        name = filters[i].name;\n        value = filters[i].value;\n        type = filters[i].type || 'equals';\n        glue = filters[i].glue || 'and';\n      }\n      if (name) {\n        if (glue == 'or') {\n          filtersCopy.or.push({\n            name: name,\n            value: value,\n            type: type,\n            glue: glue\n          });\n        } else {\n          filtersCopy.and.push({\n            name: name,\n            value: value,\n            type: type,\n            glue: glue\n          });\n        }\n      }\n    }\n    var filtered = this.dataSet.filter(function (value, index) {\n      var passedFilter = true;\n      var test;\n      for (var key in filtersCopy) {\n        if (filtersCopy.hasOwnProperty(key)) {\n          for (var i = 0; i < filtersCopy[key].length; i++) {\n            var f = filtersCopy[key][i];\n            switch (f.type) {\n              case 'not-equals':\n                if (value[f.name] == f.value) {\n                  passedFilter = false;\n                  if (key == 'and') {\n                    i = filtersCopy[key].length;\n                  }\n                }\n                break;\n              case 'contains':\n                if (value[f.name].indexOf(f.value) === -1) {\n                  passedFilter = false;\n                  if (key == 'and') {\n                    i = filtersCopy[key].length;\n                  }\n                }\n                break;\n              case 'not-contains':\n                if (value[f.name].indexOf(f.value) !== -1) {\n                  passedFilter = false;\n                  if (key == 'and') {\n                    i = filtersCopy[key].length;\n                  }\n                }\n                break;\n              case 'less-than':\n                if (value[f.name] < f.value) {\n                  passedFilter = false;\n                  if (key == 'and') {\n                    i = filtersCopy[key].length;\n                  }\n                }\n                break;\n              case 'greater-than':\n                if (value[f.name] > f.value) {\n                  passedFilter = false;\n                  if (key == 'and') {\n                    i = filtersCopy[key].length;\n                  }\n                }\n                break;\n              case 'starts-width':\n                test = value[f.name].substring(0, f.value.length);\n                if (test != f.value) {\n                  passedFilter = false;\n                  if (key == 'and') {\n                    i = filtersCopy[key].length;\n                  }\n                }\n                break;\n              case 'ends-with':\n                test = value[f.name].substring(value[f.name] - f.value.length, value[f.name].length);\n                if (test != f.value) {\n                  passedFilter = false;\n                  if (key == 'and') {\n                    i = filtersCopy[key].length;\n                  }\n                }\n                break;\n              case 'regex':\n                var regexFlags = f.flags || '';\n                var regex = new RegExp(f.value, regexFlags);\n                if (!value[f.name].match(regex)) {\n                  passedFilter = false;\n                  if (key == 'and') {\n                    i = filtersCopy[key].length;\n                  }\n                }\n                break;\n              case 'func':\n                if (!Array.isArray(f.value) || f.value(value[f.name]) === false) {\n                  passedFilter = false;\n                  if (key == 'and') {\n                    i = filtersCopy[key].length;\n                  }\n                }\n                break;\n              case 'equals':\n              default:\n                if (value[f.name] != f.value) {\n                  passedFilter = false;\n                  if (key == 'and') {\n                    i = filtersCopy[key].length;\n                  }\n                }\n                break;\n            }\n          }\n        }\n      }\n      if (!passedFilter) {\n        _self.dataSetState[index] = false;\n      }\n      return passedFilter;\n    });\n    this.triggerChange('filter');\n    return returnFiltered ? filtered : this;\n  },\n  reset: function () {\n    this.dataSetState = new Array(this.dataSet.length).fill(true);\n    this.triggerChange('reset');\n    return this;\n  }\n}, {\n  sort: function (data, sorts) {\n    return new DatasetModule({\n      data: data,\n      clone: true\n    }).sort(sorts).getData();\n  },\n  filter: function (data, filters) {\n    return new DatasetModule({\n      data: data,\n      clone: true\n    }).filter(filters, true);\n  },\n  filterSort: function (data, filters, sorts) {\n    var ds = new DatasetModule({\n      data: data,\n      clone: true\n    });\n    return ds.setData(ds.filter(filters, true)).sort(sorts).getData();\n  }\n});\nsetModule('Dataset', DatasetModule);\nmodule.exports = DatasetModule;\n\n//# sourceURL=webpack://bglib/./src/modules/DatasetModule.js?");

/***/ }),

/***/ "./src/modules/DomEvents.js":
/*!**********************************!*\
  !*** ./src/modules/DomEvents.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// modules\nconst Event = __webpack_require__(/*! ./Event */ \"./src/modules/Event.js\");\nconst EventManager = __webpack_require__(/*! ./EventManager */ \"./src/modules/EventManager.js\");\nconst EventUtil = __webpack_require__(/*! ./EventUtil */ \"./src/modules/EventUtil.js\");\n// vendor\nconst documentReady = __webpack_require__(/*! ../vendor/documentReady */ \"./src/vendor/documentReady.js\");\n\n//--add debounce/delay for certain events\nvar isLoaded = false,\n  isReady = false;\nif (document.readyState === 'complete') {\n  isLoaded = true;\n} else {\n  EventUtil.addHandler(window, 'load', function (e) {\n    isLoaded = true;\n  });\n}\ndocumentReady(function (e) {\n  isReady = true;\n});\nvar DomEvents = EventManager.extend({\n  isDocument: undefined,\n  isWindow: undefined,\n  init: function () {\n    EventManager.prototype.init.apply(this, arguments);\n    this.isWindow = this.target === window;\n    this.isDocument = this.target === document;\n  },\n  on: function () {\n    var _self = this;\n    var names, selector, data, callback;\n    var args = this.resolveArguments('on', arguments);\n    names = args[0];\n    selector = args[1];\n    data = args[2];\n    callback = args[3];\n    var tmpNames = ' ' + names + ' ';\n    if (this.isWindow && isLoaded && tmpNames.indexOf(' load ') !== -1) {\n      var evt = new Event('load', {\n        target: _self.target\n      }, data);\n      callback(evt);\n      names = (' ' + names + ' ').replace(' load ', '');\n    }\n    if (this.isDocument && isReady && tmpNames.indexOf(' ready ') !== -1) {\n      var evt = new Event('ready', {\n        target: _self.target\n      }, data);\n      callback(evt);\n      names = (' ' + names + ' ').replace(' ready ', '');\n    }\n    //--the ready event is intended for the document\n    var tmpNames = ' ' + names + ' ';\n    if (this.isDocument && tmpNames.indexOf(' ready ') !== -1) {\n      documentReady(function (data, callback, e) {\n        var evt = new Event('ready', {\n          target: _self.target\n        }, data, e);\n        callback(evt);\n      }.bind(_self, data, callback));\n      names = (' ' + names + ' ').replace(' ready ', '');\n    }\n    args[0] = names;\n    EventManager.prototype.on.apply(this, args);\n  }\n});\nmodule.exports = {\n  window: new DomEvents(window),\n  document: new DomEvents(document)\n};\n\n//# sourceURL=webpack://bglib/./src/modules/DomEvents.js?");

/***/ }),

/***/ "./src/modules/Element.js":
/*!********************************!*\
  !*** ./src/modules/Element.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// modules\nconst DataType = __webpack_require__(/*! ./DataType */ \"./src/modules/DataType.js\");\nconst ElementalData = __webpack_require__(/*! ./ElementalData */ \"./src/modules/ElementalData.js\");\nconst EventManager = __webpack_require__(/*! ./EventManager */ \"./src/modules/EventManager.js\");\n\n/**\n * @todo Merge all functionality from jLyte\n */\n\nvar elData = new ElementalData();\nvar elEventMap = new WeakMap();\nvar El = {};\nEl.getAttributes = function (e) {\n  var a = {};\n  e = El.element(e);\n  if (e) {\n    for (var i = 0, atts = e.attributes, n = atts.length; i < n; i++) {\n      a[atts[i].nodeName] = atts[i].value;\n    }\n  }\n  return a;\n};\nEl.text = function (e) {\n  if (e) {\n    return e.innerText || e.textContent;\n  }\n  return '';\n};\nEl.addClass = function (e, cls) {\n  if (!El.hasClass(e, cls)) {\n    if (e.className != '') cls = ' ' + cls;\n    e.className = e.className.trim() + ' ' + cls.trim();\n  }\n};\nEl.removeClass = function (e, cls) {\n  if (El.hasClass(e, cls)) {\n    cls = ' ' + cls + ' ';\n    var clsName = (\" \" + e.className + \" \").replace(/[\\n\\t\\r]/g, \" \");\n    clsName = clsName.replace(cls, '');\n    e.className = clsName.trim();\n  }\n};\nEl.toggleClass = function (e, cls) {\n  if (!El.hasClass(e, cls)) El.addClass(e, cls);else El.removeClass(e, cls);\n};\nEl.hasClass = function (e, cls) {\n  cls = ' ' + cls + ' ';\n  if ((\" \" + e.className + \" \").replace(/[\\n\\t\\r]/g, \" \").indexOf(cls) > -1) return true;else return false;\n};\nEl.css = function (e, prop, val) {\n  if (typeof val === 'undefined') {\n    var b = window.navigator.userAgent.toLowerCase();\n    var s;\n    if (/msie|opera/.test(b)) {\n      s = e.currentStyle;\n    } else if (/gecko/.test(b)) {\n      s = document.defaultView.getComputedStyle(e, null);\n    }\n    if (DataType.isObject(prop)) {\n      for (var key in prop) {\n        if (prop.hasOwnProperty(key)) {\n          El.css(e, key, prop[key]);\n        }\n      }\n    } else {\n      if (s[prop] != undefined) {\n        return s[prop];\n      }\n      return e.style[prop];\n    }\n  } else if (prop) {\n    e.style[prop] = val;\n  }\n};\nEl.data = function (e, key, val) {\n  if (arguments.length > 2) {\n    El.data.set(e, key, val);\n  } else {\n    return El.data.get(e, key);\n  }\n};\nEl.data.get = function (e, key) {\n  return elData.get(e, key);\n};\nEl.data.set = function (e, key, val) {\n  elData.set(e, key, val);\n};\nEl.data.has = function (e, key) {\n  return elData.has(e, key);\n};\nEl.data.remove = function (e, key) {\n  elData.remove(e, key);\n};\nEl.closest = function (e, sel) {\n  var tmp;\n  do {\n    tmp = e.parent;\n  } while (!tmp.matches(sel) || !tmp);\n  return tmp ? tmp : undefined;\n};\nEl.element = function (e) {\n  var elements = El.elements(e);\n  return elements.length ? elements[0] : null;\n};\nEl.elements = function () {\n  var elms = [];\n  for (var i = 0; i < arguments.length; i++) {\n    var arg = arguments[i];\n    if (DataType.isString(arg)) {\n      arg = [arg];\n    } else if (jQuery && arg instanceof jQuery) {\n      arg = arg.toArray();\n    } else if (arg instanceof NodeList) {\n      arg = [].slice.call(arg);\n    } else if (arg instanceof DocumentFragment) {\n      arg = arg.childNodes;\n    } else if (!DataType.isArray(arg)) {\n      arg = [arg];\n    }\n    for (var j = 0; j < arg.length; j++) {\n      if (DataType.isString(arg[j])) {\n        elms = elms.concat(El.resolveElements(arg[j]));\n      } else if (jQuery && arg[j] instanceof jQuery) {\n        elms = elms.concat(arg[j].toArray());\n      } else {\n        if (DataType.isArray(arg[j])) {\n          elms.concat(arg[j]);\n        } else {\n          elms.push(arg[j]);\n        }\n      }\n    }\n  }\n  return elms;\n};\nEl.resolveElements = function (str) {\n  var fastRegex = /^(?:(<[\\w\\W]+>)|\\#([\\w-]+)|\\.([\\w-]+))$/; //--matches html string, simple id or class\n  var selectorRegex = /([^\\r\\n,{}]+)(\\s?,(?=[^}]*{)|\\s*{)/; //--matches any other selector\n  //--table decendant tags have trouble getting created outside the context of a table\n  var tableChildRegex = /^(<\\s*(thead|tbody|tfoot|tr|td|th)[^>]*>)(.*)<\\s*\\/\\s*(thead|tbody|tfoot|tr|td|th)\\s*>$/;\n  str = str.trim();\n  if (!str || str == '') {\n    return [];\n  }\n  var elements = [];\n  var match = str.match(fastRegex);\n  if (match) {\n    //--matches HTML String, id selector or class selector\n    if (match[1]) {\n      match = str.match(tableChildRegex);\n      if (match) {\n        //--starting and ending node must match\n        if (match[2] == match[4]) {\n          var parent = 'table';\n          if (match[2] == 'tr') {\n            parent = 'thead';\n          } else if (['td', 'th'].indexOf(match[2]) !== -1) {\n            parent = 'tr';\n          }\n          var parent = document.createElement(parent);\n          parent.innerHTML = str;\n          elements = parent.childNodes;\n        } else {\n          elements = [document.createTextNode(str)];\n        }\n      } else {\n        //--possibly need to find better method than this, may not support IE 9, but also maybe doesn't need to\n        elements = document.createRange().createContextualFragment(str).childNodes;\n      }\n    } else if (match[2]) {\n      var tmp = document.getElementById(match[2]);\n      elements = tmp ? [tmp] : [];\n    } else {\n      elements = document.querySelectorAll('.' + match[3]);\n    }\n  } else {\n    match = str.replace(/[\\s,{]+$/gm, '').concat(' {').match(selectorRegex);\n    if (match && !str.match(/^(text\\#|txt\\#)/)) {\n      //--matches any css selector, still may benefit from using sizzle instead of default querySelector methods\n      elements = document.querySelectorAll(str.replace(/[\\s,{]+$/gm, ''));\n    } else {\n      //--standard text node\n      str = str.replace(/^(text\\#|txt\\#)/, '');\n      elements = [document.createTextNode(str)];\n    }\n  }\n  return [].slice.call(elements);\n};\nEl.offset = function (e) {\n  var rect = e.getBoundingClientRect(),\n    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,\n    scrollTop = window.pageYOffset || document.documentElement.scrollTop;\n  return {\n    top: rect.top + scrollTop,\n    left: rect.left + scrollLeft\n  };\n};\nEl.remove = function (e) {\n  if (e instanceof Element) {\n    e.parentElement.removeChild(e);\n  } else if (e instanceof NodeList || e instanceof HTMLCollection || DataType.isArray(e)) {\n    for (var i = e.length - 1; i >= 0; i--) {\n      if (e[i] && e[i].parentElement) {\n        e[i].parentElement.removeChild(e[i]);\n      }\n    }\n  }\n};\nEl.on = function /* element[, names, selector, data, cb] */\n() {\n  var args = [].slice.call(arguments);\n  var element = args.shift();\n  if (element) {\n    if (!elEventMap.has(element)) {\n      elEventMap.set(element, new EventManager(element));\n    }\n    var em = elEventMap.get(element);\n    EventManager.prototype.on.apply(em, args);\n  }\n};\nEl.off = function /* element[, names, selector, cb] */\n() {\n  var args = [].slice.call(arguments);\n  var element = args.shift();\n  if (element && elEventMap.has(element)) {\n    var em = elEventMap.get(element);\n    EventManager.prototype.off.apply(em, args);\n  }\n};\nmodule.exports = El;\n\n//# sourceURL=webpack://bglib/./src/modules/Element.js?");

/***/ }),

/***/ "./src/modules/ElementalData.js":
/*!**************************************!*\
  !*** ./src/modules/ElementalData.js ***!
  \**************************************/
/***/ ((module) => {

eval("var m = function () {\n  this.storage = new WeakMap();\n};\nm.prototype.set = function (element, key, obj) {\n  if (!this.storage.has(element)) {\n    this.storage.set(element, new Map());\n  }\n  this.storage.get(element).set(key, obj);\n};\nm.prototype.get = function (element, key) {\n  return this.has(element, key) ? this.storage.get(element).get(key) : undefined;\n};\nm.prototype.has = function (element, key) {\n  return this.hasBase(element) ? this.storage.get(element).has(key) : false;\n};\nm.prototype.hasBase = function (element) {\n  return this.storage.has(element);\n};\nm.prototype.remove = function (element, key) {\n  var result = false;\n  if (this.has(element, key)) {\n    result = this.storage.get(element).delete(key);\n  }\n  if (this.hasBase(element)) {\n    if (this.storage.get(element).size === 0) {\n      this.storage.delete(element);\n    }\n  }\n  return result;\n};\nm.prototype.reset = function (element) {\n  if (this.hasBase(element)) {\n    this.storage.delete(element);\n  }\n};\nmodule.exports = m;\n\n//# sourceURL=webpack://bglib/./src/modules/ElementalData.js?");

/***/ }),

/***/ "./src/modules/Event.js":
/*!******************************!*\
  !*** ./src/modules/Event.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// base\nconst setModule = __webpack_require__(/*! ../base/setModule */ \"./src/base/setModule.js\");\n// modules\nconst BaseModule = __webpack_require__(/*! ./BaseModule */ \"./src/modules/BaseModule.js\");\nvar _Event = BaseModule.extend({\n  __propagationStopped: undefined,\n  __defaultPrevented: undefined,\n  __eventProps: undefined,\n  data: undefined,\n  name: undefined,\n  constructor: function (name, event, data, original) {\n    BaseModule.apply(this, arguments);\n    this.__propagationStopped = false;\n    this.__defaultPrevented = false;\n    this.name = name || 'UnsetEventName';\n    this.data = data || {};\n    event = event || {};\n    this.__eventProps = event;\n    for (var key in event) {\n      if (event.hasOwnProperty(key)) {\n        this[key] = event[key];\n      }\n    }\n    if (original) {\n      this.originalEvent = original;\n    }\n  },\n  getEventProps: function () {\n    return this.__eventProps;\n  },\n  stopPropagation: function () {\n    this.__propagationStopped = true;\n  },\n  isPropagationStopped: function () {\n    return this.__propagationStopped;\n  },\n  preventDefault: function () {\n    if (typeof this.originalEvent !== 'undefined') {\n      this.originalEvent.preventDefault();\n    } else {\n      this.__defaultPrevented = true;\n    }\n  },\n  isDefaultPrevented: function () {\n    if (typeof this.originalEvent !== 'undefined') {\n      return this.originalEvent.defaultPrevented;\n    } else {\n      return this.__defaultPrevented;\n    }\n  }\n});\nsetModule('Event', _Event);\nmodule.exports = _Event;\n\n//# sourceURL=webpack://bglib/./src/modules/Event.js?");

/***/ }),

/***/ "./src/modules/EventManager.js":
/*!*************************************!*\
  !*** ./src/modules/EventManager.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// base\nconst extend = __webpack_require__(/*! ../base/extend */ \"./src/base/extend.js\");\n// modules\nconst DataType = __webpack_require__(/*! ./DataType */ \"./src/modules/DataType.js\");\nconst Event = __webpack_require__(/*! ./Event */ \"./src/modules/Event.js\");\nconst EventUtil = __webpack_require__(/*! ./EventUtil */ \"./src/modules/EventUtil.js\");\nmodule.exports = extend({\n  target: undefined,\n  attached: undefined,\n  init: function (target) {\n    this.target = target;\n    this.attached = {};\n  },\n  resolveArguments: function (type, args) {\n    var args = [].slice.call(args);\n    var names, selector, data, callback;\n    names = args.shift();\n    if (type === 'on') {\n      switch (args.length) {\n        case 3:\n          selector = args[0];\n          data = args[1];\n          callback = args[2];\n          break;\n        case 2:\n          if (DataType.isString(args[0])) {\n            selector = args[0];\n          } else {\n            data = args[0];\n          }\n          callback = args[1];\n          break;\n        case 1:\n          if (DataType.isFunction(args[0])) {\n            callback = args[0];\n          }\n          break;\n      }\n    } else {\n      switch (args.length) {\n        case 3:\n          selector = args[0];\n          callback = args[1];\n          cache = args[2];\n          break;\n        case 2:\n          if (DataType.isString(args[0])) {\n            selector = args[0];\n            callback = args[1];\n          } else if (DataType.isFunction(args[0])) {\n            callback = args[0];\n            cache = args[1];\n          }\n          break;\n        case 1:\n          if (DataType.isFunction(args[0])) {\n            callback = args[0];\n          }\n          break;\n      }\n    }\n    selector = selector || null;\n    data = data || data;\n    callback = callback || function () {};\n    cache = typeof cache !== 'undefined' ? cache : false;\n    names = names.trim();\n    names = names ? names.replace(/(\\s{2,})/, ' ') : '';\n    if (type === 'on') {\n      return [names, selector, data, callback];\n    } else {\n      return [names, selector, callback, cache];\n    }\n  },\n  on: function /* names[, selector, data, cb] */\n  () {\n    var _self = this;\n    var names, selector, data, callback;\n    var args = this.resolveArguments('on', arguments);\n    names = args[0];\n    selector = args[1];\n    data = args[2];\n    callback = args[3];\n    names = names != '' ? names.split(' ') : [];\n    for (var i = 0; i < names.length; i++) {\n      var name = names[i].trim();\n      //--make sure parent event handler is created\n      if (!this.attached.hasOwnProperty(name)) {\n        this.attached[name] = {\n          name: name,\n          fn: function () {},\n          handlers: new Map(),\n          data: new Map()\n        };\n        this.attached[name].fn = function (attached, originalEvent) {\n          var evt = new Event(name, {\n            target: _self.target\n          }, {}, originalEvent);\n          // var evt = _self.newEvent({}, originalEvent);\n          attached.handlers.forEach(function (status, key) {\n            if (evt.isPropagationStopped()) {\n              return;\n            }\n            if (status) {\n              var d = attached.data.get(key);\n              d = d || {};\n              var _evt = new Event(name, {\n                target: _self.target\n              }, d, evt.originalEvent);\n              // var _evt = _self.newEvent(d, evt.originalEvent);\n              if (key.selector) {\n                var closest;\n                if (_evt.originalEvent.target.matches(key.selector)) {\n                  var cb = key.callback.bind(_evt.originalEvent.target);\n                  cb(_evt);\n                  if (_evt.isPropagationStopped()) {\n                    evt.stopPropagation();\n                  }\n                } else if (closest = _evt.originalEvent.target.closest(key.selector)) {\n                  var cb = key.callback.bind(closest);\n                  cb(_evt);\n                  if (_evt.isPropagationStopped()) {\n                    evt.stopPropagation();\n                  }\n                }\n              } else {\n                var cb = key.callback.bind(_self.target);\n                cb(_evt);\n                if (_evt.isPropagationStopped()) {\n                  evt.stopPropagation();\n                }\n              }\n            }\n          });\n        }.bind(this.target, this.attached[name]);\n        EventUtil.addHandler(this.target, name, this.attached[name].fn);\n      }\n      var mapKey = {\n        name: name,\n        selector: selector,\n        callback: callback\n      };\n      this.attached[name].handlers.set(mapKey, true);\n      this.attached[name].data.set(mapKey, data);\n    }\n  },\n  off: function /* names[, selector, cb, cache] */\n  () {\n    var names, selector, callback, cache;\n    var args = this.resolveArguments('off', arguments);\n    names = args[0];\n    selector = args[1];\n    callback = args[2], cache = args[3];\n    names = names != '' ? names.split(' ') : [];\n    for (var i = 0; i < names.length; i++) {\n      var name = names[i];\n      var mapKey = {\n        name: name,\n        selector: selector,\n        callback: callback\n      };\n      var found;\n      this.attached[name].handlers.forEach(function (value, key) {\n        if (!found && mapKey.name == key.name && mapKey.selector == key.selector && mapKey.callback == key.callback) {\n          found = key;\n        }\n      });\n      if (found) {\n        if (cache) {\n          this.attached[name].handlers.set(found, false);\n        } else {\n          this.attached[name].handlers.delete(found);\n          this.attached[name].data.delete(found);\n        }\n      }\n    }\n  },\n  hasHandlers: function (name) {\n    if (this.attached.hasOwnProperty(name)) {\n      if (this.attached[name].handlers.size) {\n        return true;\n      }\n    }\n    return false;\n  }\n});\n\n//# sourceURL=webpack://bglib/./src/modules/EventManager.js?");

/***/ }),

/***/ "./src/modules/EventModule.js":
/*!************************************!*\
  !*** ./src/modules/EventModule.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// base\nconst setModule = __webpack_require__(/*! ../base/setModule */ \"./src/base/setModule.js\");\n// modules\nconst BaseModule = __webpack_require__(/*! ./BaseModule */ \"./src/modules/BaseModule.js\");\nconst DataType = __webpack_require__(/*! ./DataType */ \"./src/modules/DataType.js\");\nconst Event = __webpack_require__(/*! ./Event */ \"./src/modules/Event.js\");\nvar EventModule = BaseModule.extend({\n  __moduleEvents: undefined,\n  constructor: function () {\n    var _self = this;\n    _self.__moduleEvents = {};\n    BaseModule.apply(_self, arguments);\n  },\n  on: function /* names[, data, cb] */\n  () {\n    var _self = this;\n    var names, data, callback;\n    var args = this.resolveArguments('on', arguments);\n    names = args[0];\n    data = args[1];\n    callback = args[2];\n    names = names != '' ? names.split(' ') : [];\n    for (var i = 0; i < names.length; i++) {\n      var name = names[i].trim();\n      if (!this.__moduleEvents.hasOwnProperty(name)) {\n        this.__moduleEvents[name] = {\n          name: name,\n          fn: function () {},\n          handlers: new Map(),\n          data: new Map()\n        };\n        this.__moduleEvents[name].fn = function (attached, evt) {\n          attached.handlers.forEach(function (status, key) {\n            if (evt.isPropagationStopped()) {\n              return;\n            }\n            if (status) {\n              var d = attached.data.get(key);\n              d = d || {};\n              var _evt = new Event(key.name, evt.getEventProps(), d);\n              var cb = key.callback.bind(_self);\n              cb(_evt);\n              if (_evt.isPropagationStopped()) {\n                evt.stopPropagation();\n              }\n              if (_evt.isDefaultPrevented()) {\n                evt.preventDefault();\n              }\n            }\n          });\n          return evt.isDefaultPrevented();\n        }.bind(this, this.__moduleEvents[name]);\n      }\n      var mapKey = {\n        name: name,\n        callback: callback\n      };\n      this.__moduleEvents[name].handlers.set(mapKey, true);\n      this.__moduleEvents[name].data.set(mapKey, data);\n    }\n  },\n  off: function /* names[, cb, cache] */\n  () {\n    var names, callback, cache;\n    var args = this.resolveArguments('off', arguments);\n    names = args[0];\n    callback = args[1], cache = args[2];\n    names = names != '' ? names.split(' ') : [];\n    for (var i = 0; i < names.length; i++) {\n      var name = names[i];\n      var mapKey = {\n        name: name,\n        callback: callback\n      };\n      var found;\n      this.__moduleEvents[name].handlers.forEach(function (value, key) {\n        if (!found && mapKey.name == key.name && mapKey.callback == key.callback) {\n          found = key;\n        }\n      });\n      if (found) {\n        if (cache) {\n          this.__moduleEvents[name].handlers.set(found, false);\n        } else {\n          this.__moduleEvents[name].handlers.delete(found);\n          this.__moduleEvents[name].data.delete(found);\n        }\n      }\n    }\n  },\n  trigger: function (name, event) {\n    if (!(event instanceof Event)) {\n      event = new Event(name, event);\n    }\n    if (name in this.__moduleEvents) {\n      var cnf = this.__moduleEvents[name];\n      return cnf.fn(event);\n    }\n    return false;\n  },\n  hasHandlers: function (name) {\n    if (this.__moduleEvents.hasOwnProperty(name)) {\n      if (this.__moduleEvents[name].handlers.size) {\n        return true;\n      }\n    }\n    return false;\n  },\n  resolveArguments: function (type, args) {\n    var args = [].slice.call(args);\n    var names, data, callback, cache;\n    names = args.shift();\n    if (type === 'on') {\n      switch (args.length) {\n        case 2:\n          data = args[0];\n          callback = args[1];\n          break;\n        case 1:\n          if (DataType.isFunction(args[0])) {\n            callback = args[0];\n          }\n          break;\n      }\n    } else {\n      switch (args.length) {\n        case 2:\n          cache = args[0];\n          callback = args[1];\n          break;\n        case 1:\n          if (DataType.isFunction(args[0])) {\n            callback = args[0];\n          }\n          break;\n      }\n      if (DataType.isFunction(args[0])) {\n        callback = args[0];\n      }\n    }\n    data = data || data;\n    callback = callback || function () {};\n    cache = typeof cache !== 'undefined' ? cache : false;\n    names = names.trim();\n    names = names ? names.replace(/(\\s{2,})/, ' ') : '';\n    if (type === 'on') {\n      return [names, data, callback];\n    } else {\n      return [names, callback, cache];\n    }\n  }\n});\nsetModule('Event', EventModule);\nmodule.exports = EventModule;\n\n//# sourceURL=webpack://bglib/./src/modules/EventModule.js?");

/***/ }),

/***/ "./src/modules/EventUtil.js":
/*!**********************************!*\
  !*** ./src/modules/EventUtil.js ***!
  \**********************************/
/***/ ((module) => {

eval("module.exports = {\n  addHandler: function (element, type, handler) {\n    if (element.addEventListener) {\n      element.addEventListener(type, handler, false);\n    } else if (element.attachEvent) {\n      element.attachEvent(\"on\" + type, handler);\n    } else {\n      element[\"on\" + type] = handler;\n    }\n  },\n  removeHandler: function (element, type, handler) {\n    if (element.removeEventListener) {\n      element.removeEventListener(type, handler, false);\n    } else if (element.detachEvent) {\n      element.detachEvent(\"on\" + type, handler);\n    } else {\n      element[\"on\" + type] = null;\n    }\n  }\n};\n\n//# sourceURL=webpack://bglib/./src/modules/EventUtil.js?");

/***/ }),

/***/ "./src/modules/Storage.js":
/*!********************************!*\
  !*** ./src/modules/Storage.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// functions\nconst rand = __webpack_require__(/*! ../functions/rand */ \"./src/functions/rand.js\");\n// modules\nconst El = __webpack_require__(/*! ./Element */ \"./src/modules/Element.js\");\nconst TagLoader = __webpack_require__(/*! ./TagLoader */ \"./src/modules/TagLoader.js\");\nmodule.exports = function () {\n  var _exports = {};\n  var _currentTime = function () {\n    return Math.floor(new Date().getTime() / 1000);\n  };\n  var _storageObject = function (_s) {\n    this.storage = _s;\n  };\n  _storageObject.prototype = {\n    supported: function () {\n      if (this.storage) return true;else return false;\n    },\n    set: function (_k, _v, _e) {\n      if (this.supported()) {\n        _v = JSON.stringify(_v);\n        this.storage.setItem(_k, _v);\n        if (_e) this.storage.setItem(_k + '_exp', _currentTime() + _e);\n      }\n    },\n    get: function (_k) {\n      if (this.supported()) {\n        if (this.storage.getItem(_k + '_exp')) {\n          if (_currentTime() >= parseInt(this.storage.getItem(_k + '_exp'))) {\n            if (this.storage.getItem(_k)) this.storage.removeItem(_k);\n            this.storage.removeItem(_k + '_exp');\n            return null;\n          }\n        }\n        return JSON.parse(this.storage.getItem(_k));\n      } else return null;\n    },\n    remove: function (_k) {\n      if (this.supported()) {\n        this.storage.removeItem(_k);\n        this.storage.removeItem(_k + '_exp');\n      }\n    },\n    clear: function () {\n      if (this.supported()) this.storage.clear();\n    },\n    length: function () {\n      if (this.supported()) {\n        var _count = 0;\n        for (var key in localStorage) {\n          if (!key.endsWith('_exp')) _count++;\n        }\n        return _count;\n      } else return 0;\n    },\n    totalLength: function () {\n      if (this.supported()) {\n        var _count = 0;\n        for (var key in localStorage) {\n          _count++;\n        }\n        return _count;\n      } else return 0;\n    }\n  };\n  var _pageStorage = function () {\n    this.instanceClass = this.itemClass + '_' + rand();\n    this.itemIndex = {};\n  };\n  _pageStorage.prototype = {\n    itemClass: 'appStorageItem',\n    parent: undefined,\n    supported: function () {\n      if (typeof TagLoader != 'undefined' && TagLoader) return true;else return false;\n    },\n    set: function (_k, _v, _e) {\n      if (this.supported()) {\n        if (!this.itemIndex[_k]) this.itemIndex[_k] = '#' + this.itemClass + '_' + rand();\n        if (!this.parent) {\n          var div = document.createElement('div');\n          div.id = this.instanceClass;\n          div.style.display = 'none';\n          this.parent = div;\n          document.body.appendChild(div);\n        }\n        TagLoader.setJson(this.itemIndex[_k], _v, this.parent);\n        var _item = document.getElementById(this.itemIndex[_k].replace(/^#/, ''));\n        El.addClass(_item, this.itemClass);\n        El.addClass(_item, this.instanceClass);\n        if (_e) _item.setAttribute('data-exp', _currentTime() + _e);\n      }\n    },\n    get: function (_k) {\n      if (this.supported() && this.itemIndex[_k]) {\n        var _item = document.getElementById(this.itemIndex[_k].replace(/^#/, ''));\n        if (_item) {\n          if (_item.getAttribute('data-exp')) {\n            if (_currentTime() >= parseInt(_item.getAttribute('data-exp'))) {\n              El.remove(_item);\n              delete this.itemIndex[_k];\n              return null;\n            }\n          }\n          return TagLoader.getJson(_item);\n        } else return null;\n      }\n    },\n    remove: function (_k) {\n      if (this.supported() && this.itemIndex[_k]) {\n        var _item = document.getElementById(this.itemIndex[_k].replace(/^#/, ''));\n        if (_item) {\n          El.remove(_item);\n          delete this.itemIndex[_k];\n        }\n      }\n    },\n    clear: function () {\n      if (this.supported()) {\n        var _items = document.getElementsByClassName(this.instanceClass);\n        if (_items.length > 0) {\n          El.remove(_items);\n          this.itemIndex = {};\n        }\n      }\n    },\n    length: function () {\n      if (this.supported()) {\n        return document.getElementsByClassName(this.instanceClass).length;\n      }\n      return 0;\n    },\n    totalLength: function () {\n      if (this.supported()) {\n        return document.getElementsByClassName(this.itemClass).length;\n      }\n      return 0;\n    }\n  };\n  _exports.local = new _storageObject(window.localStorage);\n  _exports.session = new _storageObject(window.sessionStorage);\n  _exports.page = new _pageStorage();\n  return _exports;\n};\n\n//# sourceURL=webpack://bglib/./src/modules/Storage.js?");

/***/ }),

/***/ "./src/modules/TagLoader.js":
/*!**********************************!*\
  !*** ./src/modules/TagLoader.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// functions\nconst jsonParse = __webpack_require__(/*! ../functions/jsonParse */ \"./src/functions/jsonParse.js\");\nconst DataType = __webpack_require__(/*! ./DataType */ \"./src/modules/DataType.js\");\nmodule.exports = {\n  getJson: function (elm) {\n    return jsonParse(this.getText(elm));\n  },\n  setJson: function (elm, obj, parent) {\n    this.setText(elm, JSON.stringify(obj), parent);\n  },\n  getText: function (elm) {\n    var text = null;\n    if (typeof jQuery !== 'undefined' && elm instanceof jQuery) text = elm.text() || elm.html();else if (DataType.isObject(elm)) text = elm.innerHTML;else {\n      elm = document.getElementById(elm.replace(/^#/, ''));\n      if (elm !== null) text = elm.innerText;\n    }\n    return this.removeWrap(text);\n  },\n  setText: function (elm, text, parent) {\n    text = this.applyWrap(text);\n    if (typeof jQuery !== 'undefined' && elm instanceof jQuery) elm.html(text);else if (DataType.isObject(elm)) elm.innerHTML = text;else {\n      var _orgElm = elm;\n      elm = document.getElementById(elm.replace(/^#/, ''));\n      if (elm !== null) elm.innerHTML = text;else {\n        var script = document.createElement('script');\n        script.type = 'application/json';\n        script.id = _orgElm.replace(/^#/, '');\n        script.innerHTML = text;\n        parent = parent || document.body;\n        parent.appendChild(script);\n      }\n    }\n  },\n  applyWrap: function (text) {\n    return '<!--' + text.trim() + '-->';\n  },\n  removeWrap: function (text) {\n    if (typeof text == 'string') return text.trim().replace(/(\\r\\n|\\n|\\r)/gm, ' ').replace(/\\t+/gm, ' ').replace(/^<\\!\\-\\-(.+)\\-\\->$/, '$1');\n    return null;\n  }\n};\n\n//# sourceURL=webpack://bglib/./src/modules/TagLoader.js?");

/***/ }),

/***/ "./src/modules/Timeout.js":
/*!********************************!*\
  !*** ./src/modules/Timeout.js ***!
  \********************************/
/***/ ((module) => {

eval("module.exports = function (_opts) {\n  if (typeof _opts == 'undefined') _opts = {};\n  var _expTime = _opts.time || 1800; // 30 minutes\n  var _expCallback = _opts.callback || function () {\n    alert('Session Expired');\n    location.reload();\n  };\n  var _idleCounter = 0;\n  var _isRunning = _opts.autostart || true;\n  var _restartTimeout = function () {\n    _idleCounter = 0;\n    _isRunning = true;\n  };\n  var _stopTimeout = function () {\n    _idleCounter = 0;\n    _isRunning = false;\n  };\n  var _resetCounter = function () {\n    _idleCounter = 0;\n    // clog('reset counter');\n  };\n\n  var _checkIdleTime = function () {\n    if (_isRunning) {\n      _idleCounter++;\n      if (_idleCounter >= _expTime) {\n        _isRunning = false;\n        _expCallback();\n      }\n    }\n  };\n  var _triggerCallback = function () {\n    _expCallback();\n  };\n  if (typeof _opts.manualHandlers === 'undefined' || !_opts.manualHandlers) {\n    document.onclick = _resetCounter;\n    document.onmousemove = _resetCounter;\n    document.onkeypress = _resetCounter;\n    //--possibly need to add listeners to cover touch devices\n  }\n\n  window.setInterval(_checkIdleTime, 1000); // runs every second\n  var _exports = {\n    expTime: _expTime,\n    isRunning: function () {\n      return _isRunning;\n    },\n    restart: _restartTimeout,\n    stop: _stopTimeout,\n    counter: {\n      get: function () {\n        return _idleCounter;\n      },\n      reset: _resetCounter\n    },\n    check: _checkIdleTime,\n    triggerCallback: _triggerCallback\n  };\n  return _exports;\n};\n\n//# sourceURL=webpack://bglib/./src/modules/Timeout.js?");

/***/ }),

/***/ "./src/modules/UrlParser.js":
/*!**********************************!*\
  !*** ./src/modules/UrlParser.js ***!
  \**********************************/
/***/ ((module) => {

eval("module.exports = {\n  regexes: {\n    scheme: /^([a-zA-Z0-9]+):\\/\\/|^\\/\\//,\n    username_password: /^([a-zA-Z0-9_-]+)?:([a-zA-Z0-9_-]+)?@/,\n    host: /^((?:(?:[a-zA-Z0-9_-]+)\\.)+(?:[a-zA-Z0-9_-]+){1})/,\n    port: /^(?::([0-9]+))/,\n    path: /^((?!\\/\\/)(?:\\/|\\.\\/|\\.\\.\\/)(?:[^?#]+)?)/,\n    query: /^(?:\\?([^#]+)*)/,\n    fragment: /^(?:#(.+)*)/\n  },\n  parse: function (_url, _path) {\n    _path = typeof _path != 'undefined' ? _path : '';\n    var _tmpUrl = _url;\n    var _urlParts = this.urlParts();\n    var _had = {};\n    _urlParts.url = _url;\n    for (var key in this.regexes) {\n      if (this.regexes.hasOwnProperty(key)) {\n        var _matches = _tmpUrl.match(this.regexes[key]);\n        _had[key] = false;\n        if (_matches) {\n          _had[key] = true;\n          var keys = key.split('_');\n          _tmpUrl = _tmpUrl.substring(_matches[0].length, _tmpUrl.length);\n          for (var i = 0; i < keys.length; i++) {\n            if (typeof _matches[i + 1] != 'undefined') {\n              _urlParts[keys[i]] = _matches[i + 1];\n            }\n          }\n        }\n      }\n    }\n    var _pass = false;\n    for (var key in _urlParts) {\n      if (_urlParts.hasOwnProperty(key)) {\n        if (_urlParts[key] != '') {\n          _pass = true;\n        }\n      }\n    }\n    if (_urlParts.host == '' && _had.scheme) {\n      _pass = false;\n    } else if (_urlParts.host == '') {\n      if (_urlParts.path == '') {\n        _pass = false;\n      } else {\n        if (_urlParts.scheme != '' || _urlParts.username != '' || _urlParts.password != '' || _urlParts.host || _urlParts.port) {\n          //--maybe don't need port\n          _pass = false;\n        }\n      }\n    } else if (_urlParts.path == '') {\n      _urlParts.path = _path;\n    }\n    if (_pass) {\n      if (_urlParts.host != '') {\n        var _hostBits = _urlParts.host.split('.');\n        if (_hostBits.length > 2) {\n          _urlParts.domain = _hostBits[_hostBits.length - 2] + '.' + _hostBits[_hostBits.length - 1];\n          _hostBits.pop();\n          _hostBits.pop();\n          _urlParts.subdomain = _hostBits.join('.');\n        } else {\n          _urlParts.domain = _urlParts.host;\n        }\n      }\n      var _tmpPath = _urlParts.path.replace(/^\\/+|\\/+$/g, '');\n      if (_tmpPath != '') {\n        _urlParts.pathParts = _tmpPath.split('/');\n      } else if (_urlParts.path != '') {\n        _urlParts.pathParts = ['/'];\n      }\n      _urlParts.queryString = _urlParts.path + (_urlParts.query != '' ? '?' + _urlParts.query : '');\n      if (_urlParts.query != '') {\n        var _queryVariables = _urlParts.query.split('&');\n        for (var i = 0; i < _queryVariables.length; i++) {\n          var _variablePair = _queryVariables[i].split('=');\n          if (_variablePair.length < 2) _variablePair.push('');\n          _urlParts.queryVariables[_variablePair[0]] = decodeURIComponent(_variablePair[1]);\n        }\n      }\n      return _urlParts;\n    } else {\n      return null;\n    }\n  },\n  build: function (_p) {\n    var _parts = this.cloneObject(_p);\n    if (typeof _parts.scheme == 'undefined') {\n      _parts.scheme = '';\n    }\n    if (typeof _parts.username == 'undefined') {\n      _parts.username = '';\n    }\n    if (typeof _parts.password == 'undefined') {\n      _parts.password = '';\n    }\n    if (typeof _parts.subdomain == 'undefined') {\n      _parts.subdomain = '';\n    }\n    if (typeof _parts.domain == 'undefined') {\n      _parts.domain = '';\n    }\n    if (typeof _parts.host == 'undefined') {\n      _parts.host = '';\n    }\n    if (typeof _parts.port == 'undefined') {\n      _parts.port = '';\n    }\n    if (typeof _parts.path == 'undefined') {\n      _parts.path = '';\n    }\n    if (typeof _parts.query == 'undefined') {\n      _parts.query = '';\n    }\n    if (typeof _parts.fragment == 'undefined') {\n      _parts.fragment = '';\n    }\n    if (_parts.scheme != '') {\n      _parts.scheme = _parts.scheme + '://';\n    }\n    if (_parts.host == '') {\n      if (_parts.subdomain != '' && _parts.domain != '') {\n        _parts.host = _parts.subdomain + '.' + _parts.domain;\n      } else if (_parts.domain != '') {\n        _parts.host = _parts.domain;\n      }\n    }\n    _parts.auth = '';\n    if (_parts.username != '' || _parts.password != '') {\n      _parts.auth = _parts.username + ':' + _parts.password + '@';\n    }\n    if (_parts.port != '') {\n      _parts.port = ':' + _parts.pprt;\n    }\n    if (_parts.query != '') {\n      _parts.query = '?' + _parts.query;\n    }\n    if (_parts.fragment != '') {\n      _parts.fragment = '#' + _parts.fragment;\n    }\n    if (_parts.path.match(/^\\./) && _parts.host != '') {\n      _parts.path = '/' + _parts.path;\n    }\n    if (_parts.host) {\n      return _parts.scheme + _parts.auth + _parts.host + _parts.port + _parts.path + _parts.query + _parts.fragment;\n    } else {\n      if (_parts.path == '') {\n        _parts.path = '/';\n      }\n      return _parts.path + _parts.query + _parts.fragment;\n    }\n  },\n  urlParts: function () {\n    return {\n      url: '',\n      scheme: '',\n      username: '',\n      password: '',\n      subdomain: '',\n      domain: '',\n      host: '',\n      port: '',\n      path: '',\n      query: '',\n      fragment: '',\n      queryString: '',\n      pathParts: [],\n      queryVariables: {}\n    };\n  },\n  cloneObject: function (_obj) {\n    if (null == _obj || \"object\" != typeof _obj) return _obj;\n    var copy = _obj.constructor();\n    for (var attr in _obj) {\n      if (_obj.hasOwnProperty(attr)) copy[attr] = _obj[attr];\n    }\n    return copy;\n  }\n};\n\n//# sourceURL=webpack://bglib/./src/modules/UrlParser.js?");

/***/ }),

/***/ "./src/modules/UserAutoExpire.js":
/*!***************************************!*\
  !*** ./src/modules/UserAutoExpire.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// base\nconst extend = __webpack_require__(/*! ../base/extend */ \"./src/base/extend.js\");\n// functions\nconst deepCopyMerge = __webpack_require__(/*! ../functions/deepCopyMerge */ \"./src/functions/deepCopyMerge.js\");\nconst rand = __webpack_require__(/*! ../functions/rand */ \"./src/functions/rand.js\");\nconst request = __webpack_require__(/*! ../functions/request */ \"./src/functions/request.js\");\n// modules\nconst El = __webpack_require__(/*! ./Element */ \"./src/modules/Element.js\");\nconst EventUtil = __webpack_require__(/*! ./EventUtil */ \"./src/modules/EventUtil.js\");\nconst Timeout = __webpack_require__(/*! ./Timeout */ \"./src/modules/Timeout.js\");\nmodule.exports = extend({\n  el: undefined,\n  modelId: undefined,\n  modelTimer: undefined,\n  keepAliveTimer: undefined,\n  exp: undefined,\n  warningDuration: undefined,\n  warningTimeout: undefined,\n  expireUrl: undefined,\n  renewUrl: undefined,\n  init: function (opts) {\n    var _self = this;\n    opts = opts || {};\n    opts = deepCopyMerge({\n      exp: 1800 //--30 minutes\n      ,\n      warningDuration: 60,\n      expireUrl: '/logout',\n      renewUrl: '/api/keep-session-alive'\n    }, opts);\n    _self.exp = opts.exp;\n    _self.warningDuration = opts.warningDuration;\n    _self.expireUrl = opts.expireUrl;\n    _self.renewUrl = opts.renewUrl;\n    _self.el = {\n      model: undefined,\n      timer: undefined\n    };\n    _self.modelId = 'userAutoExpire' + rand();\n    _self.el.model = _self.attachModel(_self.modelId);\n    _self.el.timer = _self.el.model.querySelector('#' + _self.modelId + '_timer');\n    EventUtil.addHandler(_self.el.model.querySelector('.userAutoExpire_End'), 'click', function () {\n      _self.endSession();\n    });\n    EventUtil.addHandler(_self.el.model.querySelector('.userAutoExpire_Keep'), 'click', function () {\n      _self.continueSession();\n    });\n    _self.warningTimeout = new Timeout({\n      time: _self.exp - _self.warningDuration,\n      callback: function () {\n        _self.promtUser();\n      }\n    });\n    //--every 1/3 of the expTime, just to keep the session alive when no requests are made\n    _self.keepAliveTimer = setInterval(function () {\n      _self.keepAliveHandler();\n    }, 1000 * parseInt(_self.exp / 3));\n  },\n  promtUser: function () {\n    var _self = this;\n    this.el.timer.innerHTML = this.warningDuration + 's';\n    this.revealModel();\n    this.modelTimer = setInterval(function () {\n      _self.countdownTimer();\n    }, 1000);\n  },\n  countdownTimer: function () {\n    var left = parseInt(this.el.timer.innerHTML.replace('s', ''));\n    if (left > 0) {\n      this.el.timer.innerHTML = left - 1 + 's';\n    } else {\n      this.endSession();\n    }\n  },\n  endSession: function () {\n    this.hideModel();\n    clearInterval(this.modelTimer);\n    window.location = this.expireUrl;\n  },\n  continueSession: function () {\n    this.hideModel();\n    this.el.timer.innerHTML = '--';\n    clearInterval(this.modelTimer);\n    this.modelTimer = null;\n    this.warningTimeout.restart();\n  },\n  keepAliveHandler: function () {\n    request(this.renewUrl);\n  },\n  hideModel: function () {\n    El.removeClass(this.el.model, 'opened');\n    El.addClass(this.el.model, 'closed');\n  },\n  revealModel: function () {\n    El.removeClass(this.el.model, 'closed');\n    El.addClass(this.el.model, 'opened');\n  },\n  attachModel: function (id) {\n    //--build/attach style tag here\n    var css = \"\\\n.userAutoExpire_container {\\\nposition: fixed;\\\ntop: 0;\\\nleft: 0;\\\nright: 0;\\\nbottom: 0;\\\nbackground-color: rgba(0, 0, 0, 0.20);\\\nz-index: 10000;\\\n}\\\n.userAutoExpire_container.closed {\\\ndisplay: none;\\\n}\\\n.userAutoExpire_container p {\\\nmargin: 0;\\\nmargin-bottom: 2rem;\\\n}\\\n.userAutoExpire_container p:last-child {\\\nmargin: 0;\\\n}\\\n.userAutoExpire_wrap {\\\nheight: 100%;\\\n}\\\n.userAutoExpire {\\\nwidth: 300px;\\\nbackground: #e9e9e9;\\\nposition: relative;\\\ntop: 50%;\\\ntransform: translateY(-50%);\\\nmargin: 0 auto;\\\npadding: 1rem;\\\nbox-shadow:0 4px 5px 0 rgba(0,0,0,0.14),0 1px 10px 0 rgba(0,0,0,0.12),0 2px 4px -1px rgba(0,0,0,0.3);\\\n}\\\n.userAutoExpire_button {\\\n-webkit-appearance: none;\\\n-moz-appearance: none;\\\nline-height: 1;\\\ndisplay: inline-block;\\\ntext-align: center;\\\ncursor: pointer;\\\ntransition: background-color 0.25s ease-out, color 0.25s ease-out;\\\nvertical-align: middle;\\\nborder: 1px solid #222;\\\nborder-radius: 0;\\\npadding: 0.8em 1em 0.7695em 1em;\\\nmargin: 0;\\\nfont-size: 0.9rem;\\\nbackground-color: #e9e9e9;\\\ncolor: #222;\\\n}\\\n.userAutoExpire_End {\\\nborder-color: transparent;\\\n}\\\n.userAutoExpire_button:hover, .userAutoExpire_button:focus {\\\ntext-decoration: underline;\\\n}\\\n.userAutoExpire_Keep:hover, .userAutoExpire_Keep:focus {\\\ncolor: #e9e9e9;\\\nbackground-color: #222;\\\ntext-decoration: none;\\\n}\\\n.userAutoExpire_links {\\\ntext-align: right;\\\n}\\\n\";\n    var style = document.createElement('style');\n    style.type = \"text/css\";\n    style.innerHTML = css;\n    document.querySelector('head').appendChild(style);\n    var body = document.querySelector('body');\n    var node = El.element(\"\" + \"<div id=\\\"\" + id + \"_container\\\" class=\\\"userAutoExpire_container closed\\\" style=\\\"\\\">\" + \"\t<div id=\\\"\" + id + \"_wrap\\\" class=\\\"userAutoExpire_wrap\\\">\" + \"\t\t<div id=\\\"\" + id + \"\\\" class=\\\"userAutoExpire\\\">\" + \"\t\t\t<div id=\\\"\" + id + \"_content\\\" class=\\\"userAutoExpire_content\\\">\" + \"\t\t\t\t<p class=\\\"userAutoExpire_message\\\">Session will expire in:&nbsp;<span id=\\\"\" + id + \"_timer\\\" class=\\\"userAutoExpire_timer\\\">--</span></p>\" + \"\t\t\t\t<p class=\\\"userAutoExpire_links\\\"><button class=\\\"userAutoExpire_button userAutoExpire_End\\\">End Now</button>&nbsp;&nbsp;<button class=\\\"userAutoExpire_button userAutoExpire_Keep\\\">Keep Alive</button></p>\" + \"\t\t\t</div>\" + \"\t\t</div>\" + \"\t</div>\" + \"</div>\");\n    body.appendChild(node);\n    return node;\n  }\n});\n\n//# sourceURL=webpack://bglib/./src/modules/UserAutoExpire.js?");

/***/ }),

/***/ "./src/modules/Webify.js":
/*!*******************************!*\
  !*** ./src/modules/Webify.js ***!
  \*******************************/
/***/ ((module) => {

eval("var __priv = {\n  hasAsked: undefined,\n  hasGranted: undefined,\n  hasDenied: undefined\n};\nvar __this = {\n  supported: function () {\n    return \"Notification\" in window;\n  },\n  hasAsked: function () {\n    return __priv.hasAsked;\n  },\n  hasGranted: function () {\n    return __priv.hasGranted;\n  },\n  hasDenied: function () {\n    return __priv.hasDenied;\n  },\n  notify: function (msg, opts) {\n    opts = opts || {};\n    var _autoClose = opts.autoClose || false;\n    var _autoCloseTime = opts.autoCloseTime || 5000;\n    delete opts.autoClose;\n    delete opts.autoCloseTime;\n    if (__priv.hasGranted) {\n      var n = new Notification(msg, opts);\n      if (_autoClose) {\n        setTimeout(n.close.bind(n), _autoCloseTime);\n      }\n    } else if (!__priv.hasAsked) {\n      __this.request(function (permission) {\n        if (permission) {\n          var n = new Notification(msg, opts);\n          if (_autoClose) {\n            setTimeout(n.close.bind(n), _autoCloseTime);\n          }\n        }\n      });\n    }\n  },\n  request: function (cb) {\n    cb = cb || function () {};\n    Notification.requestPermission(function (perm) {\n      __priv.hasAsked = true;\n      if (perm == \"granted\") {\n        __priv.hasGranted = true;\n        cb(true);\n      } else {\n        __priv.hasDenied = true;\n        cb(false);\n      }\n    });\n  }\n};\nif (__this.supported()) {\n  __priv.hasGranted = Notification.permission === \"granted\";\n  __priv.hasDenied = Notification.permission === \"denied\";\n  __priv.hasAsked = Notification.permission !== \"denied\" && Notification.permission !== \"granted\";\n  //--I think this should be the follow snippet, has Asked should just check if Notification.permission\n  //--equals either one which would indicate it had already asked\n  //\n  //__priv.hasAsked = Notification.permission !== \"denied\" && Notification.permission !== \"granted\";\n  //\n}\n\nmodule.exports = __this;\n\n//# sourceURL=webpack://bglib/./src/modules/Webify.js?");

/***/ }),

/***/ "./src/vendor/Polyfills.js":
/*!*********************************!*\
  !*** ./src/vendor/Polyfills.js ***!
  \*********************************/
/***/ (() => {

eval("//--Object watch/unwatch polyfill\n//--@ https://gist.github.com/eligrey/384583\nif (!Object.prototype.watch) {\n  Object.defineProperty(Object.prototype, \"watch\", {\n    enumerable: false,\n    configurable: true,\n    writable: false,\n    value: function (prop, handler) {\n      var oldval = this[prop],\n        newval = oldval,\n        getter = function () {\n          return newval;\n        },\n        setter = function (val) {\n          oldval = newval;\n          return newval = handler.call(this, prop, oldval, val);\n        };\n      if (delete this[prop]) {\n        // can't watch constants\n        Object.defineProperty(this, prop, {\n          get: getter,\n          set: setter,\n          enumerable: true,\n          configurable: true\n        });\n      }\n    }\n  });\n}\n// object.unwatch\nif (!Object.prototype.unwatch) {\n  Object.defineProperty(Object.prototype, \"unwatch\", {\n    enumerable: false,\n    configurable: true,\n    writable: false,\n    value: function (prop) {\n      var val = this[prop];\n      delete this[prop]; // remove accessors\n      this[prop] = val;\n    }\n  });\n}\n\n//# sourceURL=webpack://bglib/./src/vendor/Polyfills.js?");

/***/ }),

/***/ "./src/vendor/documentReady.js":
/*!*************************************!*\
  !*** ./src/vendor/documentReady.js ***!
  \*************************************/
/***/ ((module) => {

eval("var _ = {};\n\n//--@https://github.com/jfriend00/docReady\n//--MIT License\n(function (funcName, baseObj) {\n  \"use strict\";\n\n  // The public function name defaults to window.docReady\n  // but you can modify the last line of this function to pass in a different object or method name\n  // if you want to put them in a different namespace and those will be used instead of \n  // window.docReady(...)\n  funcName = funcName || \"docReady\";\n  baseObj = baseObj || window;\n  var readyList = [];\n  var readyFired = false;\n  var readyEventHandlersInstalled = false;\n\n  // call this when the document is ready\n  // this function protects itself against being called more than once\n  function ready() {\n    if (!readyFired) {\n      // this must be set to true before we start calling callbacks\n      readyFired = true;\n      for (var i = 0; i < readyList.length; i++) {\n        // if a callback here happens to add new ready handlers,\n        // the docReady() function will see that it already fired\n        // and will schedule the callback to run right after\n        // this event loop finishes so all handlers will still execute\n        // in order and no new ones will be added to the readyList\n        // while we are processing the list\n        readyList[i].fn.call(window, readyList[i].ctx);\n      }\n      // allow any closures held by these functions to free\n      readyList = [];\n    }\n  }\n  function readyStateChange() {\n    if (document.readyState === \"complete\") {\n      ready();\n    }\n  }\n\n  // This is the one public interface\n  // docReady(fn, context);\n  // the context argument is optional - if present, it will be passed\n  // as an argument to the callback\n  baseObj[funcName] = function (callback, context) {\n    if (typeof callback !== \"function\") {\n      throw new TypeError(\"callback for docReady(fn) must be a function\");\n    }\n    // if ready has already fired, then just schedule the callback\n    // to fire asynchronously, but right away\n    if (readyFired) {\n      setTimeout(function () {\n        callback(context);\n      }, 1);\n      return;\n    } else {\n      // add the function and context to the list\n      readyList.push({\n        fn: callback,\n        ctx: context\n      });\n    }\n    // if document already ready to go, schedule the ready function to run\n    // IE only safe when readyState is \"complete\", others safe when readyState is \"interactive\"\n    if (document.readyState === \"complete\" || !document.attachEvent && document.readyState === \"interactive\") {\n      setTimeout(ready, 1);\n    } else if (!readyEventHandlersInstalled) {\n      // otherwise if we don't have event handlers installed, install them\n      if (document.addEventListener) {\n        // first choice is DOMContentLoaded event\n        document.addEventListener(\"DOMContentLoaded\", ready, false);\n        // backup is window load event\n        window.addEventListener(\"load\", ready, false);\n      } else {\n        // must be IE\n        document.attachEvent(\"onreadystatechange\", readyStateChange);\n        window.attachEvent(\"onload\", ready);\n      }\n      readyEventHandlersInstalled = true;\n    }\n  };\n})(\"documentReady\", _);\nmodule.exports = _.documentReady;\n\n//# sourceURL=webpack://bglib/./src/vendor/documentReady.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});