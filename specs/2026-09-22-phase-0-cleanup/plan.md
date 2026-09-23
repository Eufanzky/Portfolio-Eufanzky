# Phase 0: Clean up the repository — Plan

See `requirements.md` for the scope and decisions, and `validation.md` for the done criteria.

Each task group ends with the roadmap check: `npm run lint` and `npm run build` pass, `npm run preview`, the user checks desktop and mobile widths, and it is committed only after the user approves.

## 1. Commit pending changes (branch `chore/phase-0-cleanup`)

1.1. Commit the spec docs in `specs/2026-09-22-phase-0-cleanup/` (`docs: add phase 0 cleanup spec`).
1.2. Commit the `specs/techstack.md` deletion, which finishes the rename to `tech-stack.md` (`docs: remove old techstack.md`).
1.3. Commit the local `package-lock.json` change (`chore: update package-lock for local npm version`).
1.4. Run `npm ci` to confirm that the lockfile installs cleanly, then run the build.

## 2. Apply the stagger fix (branch `chore/phase-0-cleanup`)

2.1. In `src/components/Works.jsx:37`, change `fadeIn("up", "spring", index * 0.5, 0.75)` to `index * 0.2`.
2.2. Lint, build and preview. The user checks that the project cards appear faster, both on desktop and on mobile.
2.3. Commit (`fix: shorten project card stagger delay`).

## 3. Merge the perf branch into `main`

3.1. On `main`, run `git merge --no-ff perf/optimize-threejs-loading`. It is expected to be conflict-free.
3.2. Rebase `chore/phase-0-cleanup` onto `main` (not pushed yet, so this is safe).
3.3. Run `npm ci` to confirm that the lockfile still matches `package.json` after the merge.

## 4. Fix lint (branch `chore/phase-0-cleanup`)

4.1. Code fixes: remove unused `React` imports (`About`, `Navbar`, `Computers`), the unused `Preload` import (`Earth`) and the unused `backend` import (`constants/index.js`). Delete the unused `canvas/Ball.jsx`. Escape the apostrophes in `About` and `Hero`.
4.2. Config fixes in `.eslintrc.cjs`: `react/prop-types` off; overrides for `src/components/canvas/**` (`react/no-unknown-property` off), `src/components/*.jsx` (`react-refresh/only-export-components` off) and `*.config.js` (Node env).
4.3. `npm run lint` has zero problems, and `npm run build` passes.
4.4. Update the specs: this spec, `specs/roadmap.md` (new Phase 0 step), `specs/tech-stack.md` (lint decisions, no `vendor-three` chunk) and `CLAUDE.md` (chunk list).
4.5. Preview. The user checks that nothing changed visually, then commit (`chore: fix eslint errors and warnings`, `docs: update specs for lint fix and chunk changes`).
4.6. Merge `chore/phase-0-cleanup` into `main` and delete the local chore branch.

## 5. Check the merged site on a phone

5.1. Run `npm run build` and then `npm run preview -- --host`.
5.2. At desktop width: Hero with the 3D computer, the Stars and the Earth in Contact all render.
5.3. At mobile width (DevTools device mode at 375px, or a real phone): Hero, Projects and Contact appear, and the Network tab shows no `.gltf`/`.bin` request and no `react-three-fiber.esm-*.js` chunk.
5.4. The user approves, then push `main` to `origin`.

## 6. Delete the stale branches

6.1. Confirm with the user right before deleting (it can't be undone).
6.2. Delete them locally: `git branch -D development bugfix/projects-mobile-reload feature/json-projects-data`, and `git branch -d perf/optimize-threejs-loading` (it is merged, so `-d` should succeed).
6.3. Delete them on GitHub: `git push origin --delete development bugfix/projects-mobile-reload feature/json-projects-data perf/optimize-threejs-loading`.
6.4. `git fetch --prune`, then confirm that only `main` remains locally and on the remote.

## 7. Close out

7.1. Run the checks in `validation.md`.
7.2. Mark roadmap steps 1–7 as done in `specs/roadmap.md` and commit it (`docs: mark roadmap phase 0 done`).
