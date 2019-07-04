bglib.fn.toCamelCase = function(str) {
    var parts = str.split('-');
    var final = parts.shift();
    while (parts.length) {
        final += parts[0].uppercaseFirst();
        parts.shift();
    }
    return final;
};