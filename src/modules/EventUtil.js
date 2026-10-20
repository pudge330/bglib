module.exports = {
    addHandler: function(element, type, handler, options) {
        element.addEventListener(type, handler, options || false);
    },
    removeHandler: function(element, type, handler, options) {
        element.removeEventListener(type, handler, options || false);
    }
};
