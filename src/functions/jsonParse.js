module.exports = function(_json) {
	if (_json === null) { return null; }
	try {
		_json = JSON.parse(_json);
	} catch(e) {
		_json = null;
	}
	return _json;
};