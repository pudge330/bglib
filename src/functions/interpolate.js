module.exports = function(tpl, data) {
    for (var key in data) {
        tpl = tpl.replace(new RegExp('{{' + key + '}}', 'gm'), data[key]);
    }
    return tpl;
};