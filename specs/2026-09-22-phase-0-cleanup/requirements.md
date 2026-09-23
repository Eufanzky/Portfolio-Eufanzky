# Phase 0: Clean up the repository — Requirements

Roadmap reference: `specs/roadmap.md`, Phase 0, steps 1–7.

## Context

Before measuring and improving performance (Phases 1–2), `main` must hold all the work that is already finished, and the repository must stop carrying stale branches.

State on 2026-09-22:

- `CLAUDE.md` changes are already committed (`4787e71`).
- `package-lock.json` has a local change. It only moves npm's `"peer": true` flags (12+/18-) because it was written by a different npm version. No dependency changed.
- `specs/techstack.md` is deleted in the working tree. It was renamed to `specs/tech-stack.md`, which is already tracked, so the deletion still needs to be committed.
- `perf/optimize-threejs-loading` has one commit (`dcd27e0`) that isn't in `main`. It merges cleanly (16 files, +69/-94).
- `src/components/Works.jsx:37` still uses `index * 0.5` for the project card stagger.
- `development`, `bugfix/projects-mobile-reload` and `feature/json-projects-data` exist locally and on `origin`. They still hold the history with the hardcoded contact email.
- `npm run lint` fails on `main` and on the perf branch (79 problems): `react/prop-types`, Three.js props flagged by `react/no-unknown-property`, `react-refresh/only-export-components` on the `SectionWrapper` exports, unused imports, unescaped apostrophes, and `module` undefined in `tailwind.config.js`. Found during this phase.
- The perf branch removes the `vendor-three` manual chunk on purpose. Three.js now loads only as an async chunk (`react-three-fiber.esm-*.js`) from the lazy canvases.

## Scope

In scope:

1. Commit the pending lockfile change and the `techstack.md` deletion.
2. Merge `perf/optimize-threejs-loading` into `main`.
3. Check the merged site on a phone.
4. Change the project card stagger in `Works.jsx` from `index * 0.5` to `index * 0.2`.
5. Delete the stale branches `development`, `bugfix/projects-mobile-reload` and `feature/json-projects-data`, locally and on GitHub.
6. Also delete `perf/optimize-threejs-loading`, locally and on GitHub, after it is merged.
7. Make `npm run lint` pass with zero warnings, so the roadmap's check can be met from Phase 1 onwards.

Out of scope:

- Any other code change from the stale branches. Only the stagger value is taken from `bugfix/projects-mobile-reload`, and the JSON projects approach is not adopted (see `specs/tech-stack.md`).
- Rewriting `main`'s history to remove the hardcoded email. Only the branches are deleted.
- Performance measurement or tuning (Phases 1–2).

## Decisions

| Decision | Choice | Reason |
|---|---|---|
| Branching | Short branch `chore/phase-0-cleanup` for the spec docs, the lockfile commit and the stagger fix. It is merged into `main`, and the perf merge and branch deletions happen from `main`. | Keeps the reviewable changes together, while merging and deleting branches stay operations on `main`. |
| Perf merge style | Merge commit (`git merge --no-ff`) | Keeps `dcd27e0` as it is and records where the perf work came in. |
| `package-lock.json` | Commit the local change | The user's choice: match the lockfile to the local npm version. |
| Perf branch after the merge | Delete it locally and on GitHub | The roadmap doesn't list it, but once merged it has no further use. |
| Backup of deleted branches | None | The user chose not to keep archive tags. The deletions are final. |
| Order of the merges | Merge the perf branch into `main` first, then rebase `chore/phase-0-cleanup` onto it and merge the chore branch last. | The lint fix touches the same files as the perf branch, so it has to be done against the merged code. The chore commits aren't pushed, so the rebase is safe. |
| Lint in scope | Fix lint in Phase 0 | The user's choice. Every later step's check needs lint to pass. |
| Lint approach | Fix real problems in code: remove unused imports, delete the unused `canvas/Ball.jsx`, escape apostrophes. Change the config only for false positives: `react/prop-types` off (plain JS, no `prop-types` package), `react/no-unknown-property` off for `src/components/canvas/**` (React Three Fiber props), `react-refresh/only-export-components` off for `src/components/*.jsx` (`SectionWrapper` HOC exports), and the Node env for `*.config.js`. | Keeps the rules that catch real bugs, and turns off only the ones that don't fit this codebase's patterns. |

## Constraints

- Keep the performance setup from `CLAUDE.md` working (lazy sections, manual vendor chunks, compression, Draco models, `vercel.json` cache headers).
- On mobile (≤ 768px) no WebGL canvas is created and no 3D model or Three.js chunk is downloaded (`specs/tech-stack.md`).
- Every step ends with the roadmap's human-in-the-loop check: lint and build pass, `npm run preview`, the user checks it at desktop and mobile widths, and only then is it committed.
- Deleting remote branches can't be undone, so the user confirms right before it runs.
