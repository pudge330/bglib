define(['bglib', 'jquery', 'bootstrap', 'bootstrap_plus', 'prism'], function(bglib, $, bootstrap, bootstrap_plus, prism) {
	var copyStringToClipboard = function(str) {
		// @source https://techoverflow.net/2018/03/30/copying-strings-to-the-clipboard-using-pure-javascript/
		// Create new element
		var el = document.createElement('textarea');
		// Set value (string to be copied)
		el.value = str;
		// Set non-editable to avoid focus and move outside of view
		el.setAttribute('readonly', '');
		el.style = {position: 'absolute', left: '-9999px', visibility: 'hidden'};
		document.body.appendChild(el);
		// Select text inside element
		el.select();
		// Copy text to clipboard
		document.execCommand('copy');
		// Remove temporary element
		document.body.removeChild(el);
	}
	$('.permalink').on('click', function(e) {
		var toastLiveExample = document.getElementById('liveToast');
		$(toastLiveExample).find('.toast-body').html(e.currentTarget.href);
		copyStringToClipboard(e.currentTarget.href);
		var toast = new bootstrap.Toast(toastLiveExample);
		toast.show();
		e.preventDefault();
		return false;
	});
	var $activeMenuItem = jQuery('.side-menu .nav-item.active-item');
	if ($activeMenuItem.length) {
		jQuery('.side-menu').scrollTop(parseInt($activeMenuItem.position().top));
	}
	window.bglib = bglib;
});