window.addEventListener('load', function() {
	document.querySelectorAll('.html-component').forEach(function(el) {
		$.get(el.getAttribute('data-file')).done(function(res) {
			$(res).insertBefore(el);
		});
	});
});