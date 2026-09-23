# Phase 3: Improve performance — Validation

Phase 3 is done, and `feature/perf-improvements` can be merged, when every check below passes.

## Automated checks

- [x] `npm run lint` passes with zero warnings.
- [x] `npm test` passes, including the new `useIsMobile`, Hero and Contact tests (23 tests).
- [x] `npm run test:e2e` passes on desktop and mobile, with **no** expected failures. `e2e/mobile-no-3d.spec.js` has no `test.fail`.
- [x] `npm run build` succeeds.

## Performance

- [x] At 375px, no `react-three-fiber`, `three`, `Stars`, `Earth`, `Computers` or `Loader` chunk and no `.gltf` or `.bin` file is requested (the e2e test).
- [x] `dist/index.html` has no `herobg` preload, and `herobg` files are gone from `dist/assets/`.
- [x] `dist/index.html` doesn't `modulepreload` `vendor-motion`.
- [x] Fonts checked: every requested weight (400–800) is used, and the load is non-blocking with `display=swap`.
- [x] With reduced motion on, the hero dot and the retro background don't animate, and the floor grid keeps its perspective (`e2e/reduced-motion.spec.js`).
- [x] Local Lighthouse mobile is better than the "before" run from plan step 1.3. Both are recorded in `perf-baseline.md`.
- [ ] After deploy: PSI mobile on production is recorded in `perf-baseline.md`. Target: 90 or higher, LCP 2.5 s or less, CLS 0.1 or less. If it misses, the gaps and next items are listed (step 20 stays open).

## The tests really test something

- [x] Changing `useIsMobile` back to an effect-based check (initial `false`) makes the mobile 3D e2e test fail.
- [x] Rendering `StarsCanvas` without the mobile check makes the mobile 3D e2e test fail.

## No unwanted change to the site

- [x] Desktop screenshots match the "before" ones.
- [x] Mobile screenshots match, except that there are no Stars behind Contact.
- [x] Putting the old Framer Motion hero back makes the preload and reduced-motion e2e tests fail.
- [x] The user checked `npm run preview` on desktop and mobile width after each step.

## Git and process

- [x] Work is on `feature/perf-improvements`, one commit per step.
- [x] Roadmap steps 15–19 are marked as done.
- [ ] Step 20 is marked as done after the production PSI run.
- [ ] Merged into `main` through a PR after the user approved.
