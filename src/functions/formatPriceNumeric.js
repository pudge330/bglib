// functions
const formatPrice = require('./formatPrice');

module.exports = function(amount) {
    return formatPrice(amount).replace(/[^\d\.]/g, '');
};