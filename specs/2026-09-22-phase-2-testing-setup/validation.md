# Phase 2: Set up testing — Validation

Phase 2 is done, and `feature/testing-setup` can be merged, when every check below passes.

## Automated checks

- [x] `npm run lint` passes with zero warnings, including the test files.
- [x] `npm test` passes: project data, project cards, and the Contact form (success and failure).
- [x] `npm run test:e2e` passes on the desktop and mobile projects. The only "expected to fail" test is the mobile 3D test.
- [x] `npm run build` succeeds, and the chunk list matches `specs/perf-baseline.md` (no test code in the bundle).

## The tests really test something

- [x] Breaking a project entry (for example, emptying a `name`) makes `npm test` fail.
- [x] The Contact tests never call the real EmailJS (it's mocked, and no network request is made).
- [x] The mobile 3D test lists the Three.js files it found in its failure message.

## No change to the site

- [x] `git diff main --stat` touches only test files, `e2e/`, `src/test/`, config files (`vite.config.js`, `playwright.config.js`, `.eslintrc.cjs`, `.gitignore`), `package.json`, `package-lock.json`, `CLAUDE.md` and `specs/`. One approved exception: the `Stars.jsx` NaN fix (see `requirements.md`).
- [x] The user checked `npm run preview` on desktop and mobile width, and it looks the same as before.

## Git and process

- [x] Work is on `feature/testing-setup`, not on `main`.
- [x] `CLAUDE.md` lists the test commands and where the tests live.
- [x] Roadmap steps 10–14 are marked as done in `specs/roadmap.md`.
- [ ] Merged into `main` through a PR after the user approved.
