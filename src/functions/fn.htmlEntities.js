bglib.fn.htmlEntities = function(s) {
    return s.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
        return '&#'+i.charCodeAt(0)+';';
    });
};