# bglib

`bglib` is a collection of browser-oriented helpers and reusable modules. The library ships as UMD for direct browser, AMD, and CommonJS use, and as native ES modules for modern browsers and bundlers.

## Using bglib

### Browser global

The UMD build includes all library code and the compatibility polyfills maintained in `src/vendor`; it has no external runtime dependencies.

```html
<script src="dist/bglib.min.js"></script>
<script>
    console.log(bglib.version());
</script>
```

Use `dist/bglib.js` while debugging and `dist/bglib.min.js` in production. These filenames remain compatible with existing direct-file usage.

### RequireJS / AMD

```js
require(['dist/bglib'], function(bglib) {
    console.log(bglib.version());
});
```

### CommonJS

```js
const bglib = require('bglib');

console.log(bglib.version());
```

### ES modules

The package `module` and conditional `exports` fields select the readable ESM build for modern bundlers.

```js
import bglib, { DataType, fn } from 'bglib';
```

The ESM files can also be loaded directly in a modern browser:

```html
<script type="module">
    import bglib from './dist/bglib.esm.min.mjs';
    console.log(bglib.version());
</script>
```

### Watching object changes

`watch` returns a Proxy that notifies one or more callbacks when a property changes. All changes that should be observed must be made through the returned Proxy.

```js
function logChange(property, oldValue, newValue) {
    console.log(property, oldValue, newValue);
}

let user = bglib.watch({ name: 'Brandon' }, logChange);

user.name = 'Alice';
bglib.unwatch(user, logChange);
```

Calling `watch` again with the original object or its Proxy adds another callback and returns the same Proxy. `unwatch(proxy, callback)` removes one callback; `unwatch(proxy)` removes all callbacks.

### Making requests

`bglib.fn.request` supports its original callback API and also returns the native `fetch` Promise. Callback response bodies are read from a clone, so the returned `Response` remains available to Promise consumers.

```js
bglib.fn.request('/api/user', function(text, response, requestData) {
    console.log(text);
}, { name: 'Brandon' }, 'POST');
```

For modern Promise usage, handle the native `Response` directly:

```js
const response = await bglib.fn.request('/api/user');

if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
}

const result = await response.json();
```

HTTP errors resolve with a response whose `ok` property is `false`, following native `fetch` behavior. Network failures reject the Promise. Callback `success` or `error` runs once, followed by `always` once.

## Distribution files

- `dist/bglib.js`: readable UMD build for browser globals, AMD, and CommonJS
- `dist/bglib.min.js`: minified UMD build
- `dist/bglib.esm.mjs`: readable native ES module build
- `dist/bglib.esm.min.mjs`: minified native ES module build
- `dist/*.map`: source maps for each build

There is no separate third-party runtime bundle because bglib has no runtime package dependencies. Both formats contain the complete library, including its project-owned compatibility polyfills. The project does not currently build library CSS or Sass.

## Building

Install the root dependencies, then run:

```sh
npm install
npm run build
```

Useful focused commands:

- `npm run dev` builds readable UMD output.
- `npm run prod` builds minified UMD output.
- `npm run js` builds all UMD and ESM variants.
- `npm run css` confirms that there are no library styles to compile.
- `npm run watch` rebuilds all JavaScript variants when source files change.

The demo has a separate dependency install. To refresh its ignored vendor copies and cache-busting hashes:

```sh
npm install --prefix site
npm run dev
npm run site:vendor
```
