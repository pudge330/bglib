// functions
const toCamelCase = require('./toCamelCase');
const upperCaseFirst = require('./upperCaseFirst');

module.exports = function(str) {
    return upperCaseFirst(toCamelCase(str));
};