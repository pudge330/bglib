requirejs.config({
	baseUrl: '/',
	paths: {
		bglib: 'js/vendor/bglib.min'
		,bootstrap: 'js/vendor/bootstrap.bundle.min'
		,bootstrap_plus: 'js/vendor/bootstrap-plus.min'
		,jquery: 'js/vendor/jquery.min'
		,prism: 'js/vendor/prism.min'
		,text: 'js/vendor/requirejs/text'
	},
	shim: {
		bglib: {
			//--useful for bglib.TagLoader and bglib.El
			deps: ['jquery']
		},
		bootstrap: {
			deps: ['jquery']
		},
		bootstrap_plus: {
			deps: ['jquery', 'bglib', 'bootstrap']
		}
	}
});

require([
	'js/default'
], function() {
	console.log(['JS Loaded']);
});