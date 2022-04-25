# Getting Started

Getting started using bglib is very simple and straightforward. Start by either cloning the repository, downloading the pre-compiled files. Once you have a copy its as simple as including a script tag linking to the bglib.js file.

```html
&lt;script src=&quot;/path/to/bglib.js&quot;&gt;&lt;/script&gt;

&lt;!-- Or include the minified version only 12kb minified and gzipped --&gt;
&lt;script src=&quot;/path/to/bglib.min.js&quot;&gt;&lt;/script&gt;
```

You can also use a module loading system like <a href="https://requirejs.org/" target="_blank">RequireJS</a>.

```javascript
define([&apos;path/to/bglib.min&apos;], function(bglib) {

});
```
