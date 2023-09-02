bglib.fn.formatPrice = function(amount) {
    if (bglib.DT.isString(amount)) {
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
    return '$' + bglib.fn.formatDecimal(amount, 2);
};

bglib.fn.formatPriceNumeric = function(amount) {
    return bglib.fn.formatPrice(amount).replace(/[^\d\.]/g, '');
};