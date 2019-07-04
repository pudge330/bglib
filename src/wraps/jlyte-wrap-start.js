(function (root, factory) {
	var jLyte_ExportLib = root.jLyte_ExportLib !== 'undefined' && root.jLyte_ExportLib;
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        var oldJLyte = root.jLyte;
        var lib = root.jLyte = factory();
        lib.noConflict = function() {
            root.jLyte = oldJLyte;
            return lib;
        };
        if (jLyte_ExportLib) {
            var oldBglib = root.bglib;
            var baseLib = root.bglib = lib.jLyte.bglib();
            baseLib.noConflict = function() {
                root.bglib = oldBglib;
                return baseLib;
            };
        }
    }
}(window, function () {
var jQuery = window.jQuery !== 'undefined' ? window.jQuery : null;