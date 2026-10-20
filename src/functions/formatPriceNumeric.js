// functions
const formatDecimal = require('./formatDecimal');

module.exports = function(amount) {
    return formatDecimal(amount, 2);
};
