(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
    	var oldObject = root.bglib;
        var lib = root.bglib = factory();
        lib.noConflict = function() {
        	root.bglib = oldObject;
        	return lib;
        };
    }
}(window, function () {
var jQuery = window.jQuery !== 'undefined' ? window.jQuery : null;