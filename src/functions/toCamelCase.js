const upperCaseFirst = require('./upperCaseFirst');

module.exports = function(str) {
    var parts = str.split('-');
    var final = parts.shift();
    while (parts.length) {
        final += upperCaseFirst(parts[0]);
        parts.shift();
    }
    return final;
};