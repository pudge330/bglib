# AGENTS.md

## Project overview

`bglib` is a small JavaScript utility library for browser-oriented helpers and reusable modules. Source files use CommonJS and are bundled by webpack as a UMD library named `bglib`.

## Repository layout

- `src/index.js` defines the public API. Add new public helpers or modules there.
- `src/functions/` contains standalone functions exposed through `bglib.fn`.
- `src/modules/` contains constructors and reusable modules exposed directly on `bglib`.
- `src/base/` contains the library's module-registration and inheritance primitives.
- `src/vendor/` contains library-owned compatibility helpers and polyfills.
- `dist/` contains generated development and production bundles. Do not edit these files by hand.
- `site/` is a small browser demo. Its dependencies are managed by `site/package.json` separately from the root package.
- `_old/` is archived legacy code for reference only. Do not modify it unless the task explicitly concerns the legacy implementation.

## Development conventions

- Match the style of the file being changed. The codebase primarily uses CommonJS (`require` and `module.exports`), semicolons, and 4-space indentation, though some older files use tabs.
- Keep helpers focused and dependency-light. Browser APIs are acceptable because the distributed library targets browsers.
- Preserve existing public names and aliases unless a breaking change is explicitly requested. For example, `DT` and `El` are compatibility aliases in `src/index.js`.
- When adding a public function, create it in `src/functions/` and export it from `src/index.js` under `bglib.fn`.
- When adding a public module, create it in `src/modules/` and export it from `src/index.js`.
- Do not introduce a new framework, runtime dependency, or build tool without a clear need.
- Prefer the simplest clear solution that meets the requirement. Do not over-engineer, over-abstract, or add complexity for hypothetical future needs. Keep code readable and approachable for developers with varied experience levels.
- Avoid unrelated cleanup, especially broad modernization of legacy-style files, while making a focused change.

## Install and build

From the repository root:

```sh
npm install
npm run dev
npm run prod
```

- `npm run dev` generates `dist/bglib.js` with the license header.
- `npm run prod` generates `dist/bglib.min.js` with the license header.
- `npm run watch` rebuilds the development bundle when source files change.
- Install demo-site dependencies separately with `npm install --prefix site` when working on the site.

Generated bundles are tracked. If source behavior changes, rebuild both development and production bundles before handing off the change, unless the user explicitly asks for source-only work.

## Verification

There is currently no automated test or lint command. For every code change:

1. Run `npm run dev` and confirm webpack completes without errors.
2. Run `npm run prod` when the change affects distributed source.
3. Exercise the changed helper or module with a focused Node check when it does not require browser APIs.
4. For DOM, storage, routing, or XHR behavior, verify it in a browser or through the demo site and describe the scenario checked.
5. Review the generated `dist/` diff to ensure it contains only the expected bundle changes.

Do not claim tests passed when only the build was run; report the exact verification performed.

## Demo site

The demo loads the copied UMD bundle from `site/public_html/vendor/bglib/`. That vendor directory is ignored by Git. When demo work requires refreshed assets, use the existing Grunt copy/hash tasks rather than committing the copied vendor files. Cache-busting hashes in `site/public_html/index.html` may change when those tasks run; keep such changes only when they are relevant to the task.

## Change scope and safety

- Treat `src/` as the source of truth and `dist/` as generated output.
- Keep public API changes backward compatible where practical.
- Call out intentional breaking changes and update both source exports and bundles together.
- Do not edit dependency lockfiles unless dependencies actually change.
- Preserve user changes already present in the worktree and avoid modifying unrelated files.
