# Phase 0: Clean up the repository — Validation

Phase 0 is done, and the chore branch can be merged, when every check below passes.

## Automated checks

- [ ] `npm ci` succeeds with the committed `package-lock.json`.
- [ ] `npm run lint` passes with zero warnings.
- [ ] `npm run build` succeeds and still emits the `vendor-react`, `vendor-three` and `vendor-motion` chunks plus `.gz`/`.br` files.

## Git state

- [ ] `git status` on `main` is clean (no pending lockfile change, and `specs/techstack.md` is gone).
- [ ] `git log --merges main` shows the `--no-ff` merge of `perf/optimize-threejs-loading`, and `git branch --contains dcd27e0` includes `main`.
- [ ] `grep -n "index \* 0.2" src/components/Works.jsx` matches, and `index * 0.5` no longer appears.
- [ ] `git branch` lists only `main`.
- [ ] `git ls-remote --heads origin` lists only `refs/heads/main`.
- [ ] `main` is pushed: `git status` shows it is up to date with `origin/main`.

## Manual check (production preview, approved by the user)

Run `npm run build && npm run preview -- --host`.

Desktop width:

- [ ] The Hero 3D computer, the Stars background and the Contact Earth all render.
- [ ] The project cards stagger in quickly (0.2s steps), with no long wait for the last card.

Mobile width (375px in DevTools device mode, or a real phone):

- [ ] Hero, Projects and Contact all appear and scroll smoothly.
- [ ] The Network tab shows no `.gltf`/`.bin` model request and no `vendor-three` chunk.
- [ ] No console errors.

## Merge gate

- [ ] The user approved the preview for each committed step (roadmap human-in-the-loop check).
- [ ] The user confirmed the branch deletions right before they ran.
- [ ] Roadmap steps 1–6 are marked as done in `specs/roadmap.md`.
