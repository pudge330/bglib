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
