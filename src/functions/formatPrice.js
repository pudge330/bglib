const normalizeNumber = require('./normalizeNumber');

var formatter = new Intl.NumberFormat('en-US', {
    currency: 'USD'
    ,style: 'currency'
});

module.exports = function(amount) {
    return formatter.format(normalizeNumber(amount));
};
