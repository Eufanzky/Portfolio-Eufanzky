# Phase 3: Improve performance — Plan

See `requirements.md` for the scope and decisions, and `validation.md` for the done criteria.

All work is on branch `feature/perf-improvements`, created from `main`.

## 1. Set up

1.1. Create `feature/perf-improvements` from `main`.
1.2. Add this spec folder. The user approves it and answers the open questions before any code change.
1.3. Take reference screenshots of the current build (desktop 1280×720 and mobile 375px, hero and each section) and a local Lighthouse mobile run. These are the "before" numbers for the local comparison.

## 2. Hero image (roadmap step 15)

2.1. Remove the `herobg.webp` preload from `index.html`.
2.2. Remove `bg-hero-pattern` from `App.jsx` and `backgroundImage` from `tailwind.config.js`.
2.3. `grep` for `herobg`. If nothing else uses it, delete `src/assets/herobg.png` and `src/assets/herobg.webp`, and their export in `src/assets/index.js` if there is one.
2.4. Compare screenshots with 1.3: no visual change. Run local Lighthouse.
2.5. Checks, preview, user approval, then commit `perf: drop unused hero background image`.

## 3. No Three.js on mobile (roadmap step 16)

3.1. `src/hooks/useIsMobile.js`: `useState(() => matchMedia(query).matches)` plus a `change` listener. Default query `(max-width: 768px)`.
3.2. `src/hooks/useIsMobile.test.js`: returns true or false from the stubbed `matchMedia`, and updates on `change`. Extend the `matchMedia` stub in `src/test/setup.js` if needed.
3.3. Use the hook in `Hero.jsx` and `Contact.jsx` (remove their resize listeners). In `App.jsx`, render `StarsCanvas` only when not mobile.
3.4. `Computers.jsx` has its own `(max-width: 500px)` check that scales the model down. The canvas never renders at 768px or below, so that branch is dead code. Remove it.
3.5. Component tests: at mobile width, Hero and Contact don't render their canvas mocks. At desktop width, they do.
3.6. Remove `test.fail` and its comment from `e2e/mobile-no-3d.spec.js`. `npm run test:e2e` passes, with no "expected to fail".
3.7. Local Lighthouse. Checks, preview (mobile: no Stars behind Contact, desktop unchanged), user approval, then commit `perf: skip 3d canvases on mobile`.

## 4. Fonts (roadmap step 17)

4.1. No code change (the user kept 400–800). Record in `perf-baseline.md` that fonts were checked: non-blocking, `display=swap`, all loaded weights used.

## 5. Motion (roadmap step 18)

5.1. Replace the Framer Motion dot in `Hero.jsx` with a CSS keyframe (`y: 0 → 24px → 0`, 1.5 s, infinite).
5.2. Check `Navbar.jsx` for Framer Motion. If neither eager component imports it, confirm in `dist/index.html` that `vendor-motion` is no longer `modulepreload`ed.
5.3. Wrap the app in `<MotionConfig reducedMotion="user">` (inside the lazy part, so it doesn't pull Framer Motion back into the entry chunk). Add `@media (prefers-reduced-motion: reduce)` to stop the CSS animations (hero dot, retro background).
5.4. Tests: Hero test that the dot renders without Framer Motion. e2e test with `reducedMotion: "reduce"` that the page loads and headings appear.
5.5. Update the chunk notes in `CLAUDE.md` (`vendor-motion` is no longer loaded on first paint).
5.6. Local Lighthouse. Checks, preview, approval, then commit `perf: take framer motion off the critical path`.

## 6. Tilt (roadmap step 19)

6.1. Record a mobile performance profile (Playwright trace or DevTools) while scrolling About and Works.
6.2. If tilt shows up, render a plain `div` on `(hover: none)` devices, and add a component test. If not, record "not needed" in `perf-baseline.md` and skip.

## 7. Close out (roadmap step 20)

7.1. Update `specs/perf-baseline.md`: new build sizes (first-paint table) and local Lighthouse before and after.
7.2. Mark roadmap steps 15–19 as done. Push, open a PR into `main`, and merge after the user approves.
7.3. After Netlify deploys, the user runs PSI mobile on production. Record it as "After Phase 3". If it's 90 or higher, mark step 20 done. If not, propose the next items (a new PR).
