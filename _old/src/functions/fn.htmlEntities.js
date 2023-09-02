bglib.fn.htmlEntities = function(s) {
	s = s.replace(/[\'\"\&]/gim, function(i) {
		if (i == '\'') {
			return '&#039;';
		} else if (i == '"') {
			return '&quot;'
		} else if (i == '&') {
			return '&amp;'
		}
	});
    return s.replace(/[\u00A0-\u9999<>]/gim, function(i) {
    	if (['\'', '"', '&'].indexOf(i) === -1) {
        	return '&#'+i.charCodeAt(0)+';';
        }
        else {
        	i;
        }
    });
};