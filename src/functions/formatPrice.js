// functions
const formatDecimal = require('./formatDecimal');
// modules
const DataType = require('../modules/DataType');

module.exports = function(amount) {
    if (DataType.isString(amount)) {
        amount = parseFloat(amount.replace(/[^\d\.]/g, ''));
    }
    if(window.Intl && Intl.NumberFormat) {
        var formatter = new Intl.NumberFormat('en-US', {
            roundingMode: 'ceil',
            currency: 'USD',
            style: 'currency',
        });
        return formatter.format(amount);
    }
    return '$' + formatDecimal(amount, 2);
};