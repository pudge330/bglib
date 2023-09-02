module.exports = function(amount, pos) {
    pos = pos || 2;
    if(!amount || amount === '0'){
        amount = 0;
    }
    if(typeof amount === 'string'){
        amount = amount.replace(/[^\d\.]/g, '');
    }
    //-@ http://stackoverflow.com/a/6134070
    return parseFloat(Math.round(amount * 100) / 100).toFixed(pos);
};