/*
 * Generate uuidv4 string.
 *
 * https://stackoverflow.com/a/2117523
 */
module.exports = function() {
	var cryptoApi = globalThis.crypto;
	if (cryptoApi && typeof cryptoApi.randomUUID === 'function') {
		return cryptoApi.randomUUID();
	}
	if (!cryptoApi || typeof cryptoApi.getRandomValues !== 'function') {
		throw new Error('Secure random UUID generation is not available');
	}

	return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
		(c ^ cryptoApi.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
	);
};
