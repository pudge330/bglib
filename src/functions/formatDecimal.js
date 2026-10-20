const normalizeNumber = require('./normalizeNumber');

module.exports = function(amount, pos) {
    pos = typeof pos === 'undefined' ? 2 : Number(pos);
    pos = Number.isInteger(pos) && pos >= 0 && pos <= 20 ? pos : 2;

    return new Intl.NumberFormat('en-US', {
        useGrouping: false
        ,minimumFractionDigits: pos
        ,maximumFractionDigits: pos
    }).format(normalizeNumber(amount));
};
