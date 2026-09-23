# Phase 0: Clean up the repository — Validation

Phase 0 is done, and the chore branch can be merged, when every check below passes.

## Automated checks

- [x] `npm ci` succeeds with the committed `package-lock.json`.
- [x] `npm run lint` passes with zero warnings.
- [x] `npm run build` succeeds and emits the `vendor-react` and `vendor-motion` chunks, a separate async `react-three-fiber.esm-*.js` chunk, and `.gz`/`.br` files.
- [x] `.eslintrc.cjs` turns rules off only through the overrides listed in `requirements.md`. There are no `eslint-disable` comments in `src/`.

## Git state

- [x] `git status` on `main` is clean (no pending lockfile change, and `specs/techstack.md` is gone).
- [x] `git log --merges main` shows the `--no-ff` merge of `perf/optimize-threejs-loading`, and `git branch --contains dcd27e0` includes `main`.
- [x] `grep -n "index \* 0.2" src/components/Works.jsx` matches, and `index * 0.5` no longer appears.
- [x] `src/components/canvas/Ball.jsx` no longer exists.
- [x] `git branch` lists only `main`.
- [x] `git ls-remote --heads origin` lists only `refs/heads/main`.
- [x] `main` is pushed: `git status` shows it is up to date with `origin/main`.

## Manual check (production preview, approved by the user)

Run `npm run build && npm run preview -- --host`.

Desktop width:

- [x] The Hero 3D computer, the Stars background and the Contact Earth all render.
- [x] The project cards stagger in quickly (0.2s steps), with no long wait for the last card.

Mobile width (375px in DevTools device mode, or a real phone):

- [x] Hero, Projects and Contact all appear and scroll smoothly.
- [x] The Network tab shows no `.gltf`/`.bin` model request and no `react-three-fiber.esm-*.js` chunk.
- [x] No console errors.
- [x] The Hero and About text still shows "I'm" correctly (the apostrophes were escaped).

## Merge gate

- [x] The user approved the preview for each committed step (roadmap human-in-the-loop check).
- [x] The user confirmed the branch deletions right before they ran.
- [x] Roadmap steps 1–7 are marked as done in `specs/roadmap.md`.
