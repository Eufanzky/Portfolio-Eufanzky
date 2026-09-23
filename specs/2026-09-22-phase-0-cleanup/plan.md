# Phase 0: Clean up the repository — Plan

See `requirements.md` for the scope and decisions, and `validation.md` for the done criteria.

Each task group ends with the roadmap check: `npm run lint` and `npm run build` pass, `npm run preview`, the user checks desktop and mobile widths, and it is committed only after the user approves.

## 1. Commit pending changes (branch `chore/phase-0-cleanup`)

1.1. Commit the spec docs in `specs/2026-09-22-phase-0-cleanup/` (`docs: add phase 0 cleanup spec`).
1.2. Commit the `specs/techstack.md` deletion, which finishes the rename to `tech-stack.md` (`docs: remove old techstack.md`).
1.3. Commit the local `package-lock.json` change (`chore: update package-lock for local npm version`).
1.4. Run `npm ci` to confirm that the lockfile installs cleanly, then run lint and build.

## 2. Apply the stagger fix (branch `chore/phase-0-cleanup`)

2.1. In `src/components/Works.jsx:37`, change `fadeIn("up", "spring", index * 0.5, 0.75)` to `index * 0.2`.
2.2. Lint, build and preview. The user checks that the project cards appear faster, both on desktop and on mobile.
2.3. Commit (`fix: shorten project card stagger delay`).

## 3. Merge the chore branch into `main`

3.1. Switch to `main` and merge `chore/phase-0-cleanup`.
3.2. Delete the local `chore/phase-0-cleanup` branch.

## 4. Merge the perf branch into `main`

4.1. On `main`, run `git merge --no-ff perf/optimize-threejs-loading`. It is expected to be conflict-free. If `Works.jsx` conflicts, keep `index * 0.2`.
4.2. Run `npm install` if the perf branch changed dependencies, then lint and build.
4.3. Check that `package-lock.json` still matches `package.json` after the merge (`npm ci` succeeds).

## 5. Check the merged site on a phone

5.1. Run `npm run build` and then `npm run preview -- --host`.
5.2. At desktop width: Hero with the 3D computer, the Stars and the Earth in Contact all render.
5.3. At mobile width (DevTools device mode at 375px, or a real phone): Hero, Projects and Contact appear, and the Network tab shows no `.gltf`/`.bin` request and no `vendor-three` chunk.
5.4. The user approves, then push `main` to `origin`.

## 6. Delete the stale branches

6.1. Confirm with the user right before deleting (it can't be undone).
6.2. Delete them locally: `git branch -D development bugfix/projects-mobile-reload feature/json-projects-data`, and `git branch -d perf/optimize-threejs-loading` (it is merged, so `-d` should succeed).
6.3. Delete them on GitHub: `git push origin --delete development bugfix/projects-mobile-reload feature/json-projects-data perf/optimize-threejs-loading`.
6.4. `git fetch --prune`, then confirm that only `main` remains locally and on the remote.

## 7. Close out

7.1. Run the checks in `validation.md`.
7.2. Mark roadmap steps 1–6 as done in `specs/roadmap.md` and commit it (`docs: mark roadmap phase 0 done`).
