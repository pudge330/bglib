module.exports = function(value) {
    if (typeof value === 'string') {
        var isAccountingNegative = /^\s*\(.*\)\s*$/.test(value);
        value = value.replace(/,/g, '').replace(/[^\d.+-]/g, '');
        value = Number.parseFloat(value);
        if (isAccountingNegative) {
            value = -Math.abs(value);
        }
    }

    value = Number(value);
    return Number.isFinite(value) ? value : 0;
};
