<?php
include __DIR__ . '/../src/autoload.php';
?>
<!DOCTYPE html>
<html>
<head lang="en">
	<meta charset="UTF-8">
	<title><?=$docs->config('site_name')?></title>
	<link href="/css/bootstrap-plus.min.css" type="text/css" rel="stylesheet">
	<link href="/css/main.css" type="text/css" rel="stylesheet">
	<link href="/css/prism.css" type="text/css" rel="stylesheet">
	<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" type="text/css" rel="stylesheet">
	<script>(function(D){D.className=D.className.replace(/\bno-js\b/,"js")})(document.documentElement);</script>
	<!--[if lt IE 9]><script src="/_/packages/lynkcmsstandardpackage/scripts/vendor/html5shiv.min.js"></script><![endif]-->
	<script>Object.deepMerge||(Object.deepMerge=function(){var t=Array.prototype.slice.call(arguments);if(0===t.length)return{};void 0===this.isObject&&(this.isObject=function(t){return!1!==t&&("function"==typeof t||"object"==typeof t)},this.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)});for(var e=Object.assign({},t.shift()),r=0;r<t.length;r++)for(var i in t[r])t[r].hasOwnProperty(i)&&(this.isObject(t[r][i])&&!this.isArray(t[r][i])&&e.hasOwnProperty(i)&&this.isObject(e[i])?e[i]=Object.deepMerge(e[i],t[r][i]):this.isArray(t[r][i])&&e.hasOwnProperty(i)&&this.isArray(e[i])?e[i]=e[i].concat(t[r][i]):(this.isObject(t[r][i])&&(t[r][i]=Object.assign({},t[r][i])),e[i]=t[r][i]));return e});</script>
</head>
<body>
<div class="page d-flex flex-column">
	<div class="page-header">
		<header class="p-2">
			<div><a href="/"><?=$docs->config('site_name')?> Documentation</a></div>
		</header>
	</div>
	<div class="page-content flex-grow-1 d-flex overflow-auto">
		<main class="main-content d-flex flex-row align-items-start flex-grow-1 mw-100 w-100">
			<div class="side-menu h-100 overflow-auto">
				<?php include __DIR__ . '/__menu.php'; ?>
			</div>
			<div class="content-wrap d-flex flex-row flex-grow-1 h-100 w-100 overflow-auto">
				<div class="content-body flex-grow-1 py-4">
					<?=$docs->getCurrentPageContent()?>
				</div>
				<div class="content-directory h-100 overflow-auto">
					<?=$docs->getCurrentPageDirectory()?>
				</div>
			</div>
		</main>
	</div>
	<div class="page-footer">
		<footer class="text-center p-1"><div>&copy;<?=$docs->config('copyright_year')?> <?=$docs->config('copyright_name')?></div></footer>
	</div>
</div>
<div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
	<div id="liveToast" class="toast text-white bg-primary" role="alert" aria-live="assertive" aria-atomic="true">
		<div class="toast-header">
			<strong class="me-auto">Copied</strong>
			<button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
		</div>
		<div class="toast-body">
		</div>
	</div>
</div>
<script data-main="/js/config" src="/js/vendor/requirejs.min.js" type="text/javascript"></script>
</body>
</html>