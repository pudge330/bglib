# bglib Documentation

bglib is a collection of javascript functions and modules that I've written over the years for various websites and applications. It was written to be easy to use and incorporate into your existing application. This project includes client side routing, an extensible module system, a dataset module for searching or filtering and many others useful modules and functions for things like converting em values to rendering custom JS based templates.

Download the [latest](/downloads/bglib/latest/bglib.js) pre-built copy to get started and check out the documentation to see what all bglib has to offer. You can also clone the repo on [GitHub](https://github.com/pudge330/bglib) and build a customized library with only the features you want.

<div class="container-fluid p-0">
	<div class="row">
		<div class="col-12 col-lg-6">
			<p><strong>Functions (bglib.fn.*):</strong></p>
			<ul>
				<li>debounce(func, delay)</li>
				<li>documentReady(callback, context)</li>
				<li>toEm(val, scope)</li>
				<li>toPx(val, scope)</li>
				<li>formatDecimal(amount, pos)</li>
				<li>formatPrice(amount)</li>
				<li>htmlEntities(s)</li>
				<li>interpolate(tpl, data)</li>
				<li>iosVersion()</li>
				<li>rand(max)</li>
				<li>renderTemplate(tpl, data)</li>
				<li>request(url, cb, data, type)</li>
				<li>toCamelCase(str)</li>
				<li>toProperCase(str)</li>
			</ul>
		</div>
		<div class="col-12 col-lg-6">
			<p><strong>Modules (bglib.*)</strong></p>
			<ul>
				<li>AppRouter</li>
				<li>BaseModule</li>
				<li>DatasetModule</li>
				<li>DataType</li>
				<li>DomEvents</li>
				<li>Element</li>
				<li>ElementalData</li>
				<li>Event</li>
				<li>EventManager</li>
				<li>EventModule</li>
				<li>EventUtil</li>
				<li>Polyfills</li>
				<li>Storage</li>
				<li>TagLoader</li>
				<li>Timeout</li>
				<li>UrlParser</li>
				<li>UserAutoExpire</li>
				<li>Webify</li>
			</ul>
		</div>
	</div>
</div>

<div class="container-fluid p-0 mt-5">
	<div class="row">
		<div class="col-12">
			<div class="alert alert-warning">
				<h4 class="alert-heading">beta</h4>
				<p>bglib is in beta and thus should only be use for development and testing purposes. Version 1.0 is scheduled to be released once the documentation is completed.</p>
			</div>
		</div>
	</div>
</div>