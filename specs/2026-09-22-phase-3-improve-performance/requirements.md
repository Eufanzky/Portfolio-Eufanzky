# Phase 3: Improve performance — Requirements

Roadmap reference: `specs/roadmap.md`, Phase 3, steps 15–20.

## Context

Baseline (`specs/perf-baseline.md`): Lighthouse mobile **78**, LCP **4.2 s**, CLS 0.091. Budget: 90 or higher, LCP 2.5 s or less, and no Three.js on mobile.

Findings from a local check on 2026-09-22 (production build, headless Chromium, 375px and 1280px):

- **The LCP element is the hero `<h1>` ("Hi, I'm Eugenio"), not an image.** It is text rendered by React, so LCP waits for the entry JS (`index`, `vendor-react`, `vendor-motion`, about 95 KB brotli) and for Poppins.
- **`herobg.webp` is never visible.** `#retrobg` (from `AnimatedBackground`) has a solid black background and covers the whole hero, and the navbar has its own background. Yet `index.html` preloads the image (143 KB, 2880×1566) at high priority, so on Slow 4G it competes with the JS that LCP needs.
- **Three.js loads on mobile** (finding 1): `StarsCanvas` has no mobile check, and `Hero` and `Contact` start with `isMobile = false`, so on the first render they request `Computers`, `Earth` and `Loader` too before the effect corrects it.
- **Fonts:** Poppins 400, 500, 600, 700 and 800 are loaded with `display=swap` and a non-blocking `media="print"` swap. The site uses 400 (default), 500, 600, 700 and `font-black` (900). 900 isn't loaded, so the browser draws 800 for it. 800 is only used this way.
- **Framer Motion** (`vendor-motion`, 30 KB brotli) is on the critical path because `Hero` uses it for one bouncing dot. Nothing respects `prefers-reduced-motion`.
- **`react-tilt`** is 1.1 KB brotli, used by About and Works.

## Scope

In scope, in this order (most expected gain first). Re-measure after each step (local Lighthouse, mobile preset). The PSI run on production happens after merge, in step 20.

1. **Step 15, hero image.** Remove the `herobg.webp` preload from `index.html` and the `bg-hero-pattern` background from `App.jsx` and `tailwind.config.js`, since the image is never shown. Delete `herobg.png` and `herobg.webp` if nothing else uses them. The page must look the same (screenshot comparison before and after, desktop and mobile).
2. **Step 16, no Three.js on mobile.**
   - Add one shared hook, `src/hooks/useIsMobile.js`, that reads `matchMedia("(max-width: 768px)")` **synchronously on the first render** (so the first render never requests a 3D chunk) and follows changes.
   - Use it in `Hero`, `Contact` and `App` (render `StarsCanvas` only when not mobile). Replace the hand-written resize listeners.
   - Remove `test.fail` from `e2e/mobile-no-3d.spec.js`. It must pass.
   - Component test for the hook (mobile, desktop, change). Hero and Contact tests check that the canvas isn't rendered at mobile width.
3. **Step 17, fonts.** Already done: the load is non-blocking with `display=swap`, and every loaded weight (400–800) is used (800 draws `font-black`). The user chose to keep 800 (see Decisions), so this step needs no code change. It is recorded as checked in `perf-baseline.md`.
4. **Step 18, motion.**
   - Replace the Framer Motion bouncing dot in `Hero` with a CSS `@keyframes` animation. Then `Hero` and `Navbar` no longer import Framer Motion (Navbar needs checking), and `vendor-motion` moves off the critical path into the lazy sections.
   - Respect `prefers-reduced-motion`: wrap the app in Framer Motion's `MotionConfig reducedMotion="user"`, and stop the CSS animations under `@media (prefers-reduced-motion: reduce)`.
   - Test: an e2e check that `vendor-motion` isn't requested before the lazy sections load is too fragile. Instead, check the build output: the entry chunk's `modulepreload` list in `dist/index.html` no longer includes `vendor-motion`.
5. **Step 19, `react-tilt`.** It's only 1.1 KB, but it runs mouse listeners and transforms. Skip the tilt on touch devices (`(hover: none)`) and render a plain `div`. Do this only if the profile shows it costs something. Otherwise record "not needed" in `perf-baseline.md`.
6. **Step 20, re-measure.** After merge and deploy, the user runs PSI mobile on production. Record the results in a new "After Phase 3" section in `specs/perf-baseline.md`. If the score is under 90, list what's left and propose next items.

Out of scope:

- Hosting config (Netlify caching, `.gltf` compression). The user decided to stay on Netlify as it is.
- Converting icons to WebP (finding 4). That's content work, and PSI's "image delivery" savings mostly came from `herobg`. Revisit in step 20 if PSI still flags images.
- Server-side rendering or prerendering the hero. Revisit only if step 20 is still under 90.
- Accessibility findings (missing `<main>`, links without a name). Worth fixing, but not part of this phase.

## Decisions

| Decision | Choice | Reason |
|---|---|---|
| Branch | `feature/perf-improvements`, one commit per step | One branch per phase, as in Phases 0–2. The roadmap's "one commit per step" is kept. |
| Mobile breakpoint | `max-width: 768px`, same as today | Matches `CLAUDE.md` and the tech stack decision. |
| First-render mobile check | Read `matchMedia` in the `useState` initializer | The effect-based check is why the `Computers`, `Earth` and `Loader` chunks load on mobile. |
| `herobg` | Remove, not resize | It's invisible, so the cheapest image is none. |
| Fonts | Keep Poppins 400–800 | User's choice (2026-09-22). No visual change. |
| Measuring during the phase | Local Lighthouse (`npx lighthouse` against `npm run preview`, mobile preset) for relative gains | PSI only sees production, which updates after merge. Local numbers aren't compared with the PSI baseline, only with each other. |

## Changes made during the phase

- **Reduced motion flattened the floor grid.** `#retrobg-lines` had its `rotateX(84deg)` only inside the keyframes, so stopping the animation removed the perspective. The base rule now has the same transform. An e2e check covers it.
- **The `vendor-motion` preload test reads the served HTML, not the live page.** After the lazy sections load, Vite's preload helper adds `modulepreload` links to the page, Framer Motion included.
- **`MotionConfig` is in `SectionWrapper`, not `App`.** In `App` it would put Framer Motion back into the entry chunk.
- **Step 18 and PSI.** Lighthouse's simulated throttling (used by PSI) rates step 18 slightly worse, while real throttling shows LCP about 230 ms better. The user approved keeping it. Details are in `specs/perf-baseline.md`.
- **Step 19 skipped (not needed).** `react-tilt` showed no measurable cost on mobile (`specs/perf-baseline.md`).
- **The Lighthouse runs left temp profile folders** (named `C:\Users\…\lighthouse.*`, a WSL quirk) in the repo root. They were deleted, and later runs start from the scratchpad directory.
- **The e2e suite was flaky on desktop** before this phase (1 of 2 runs on `main` failed with a timeout, from software WebGL in headless Chromium). The runs since step 16 all passed (14 of 14, several runs). Not changed; revisit if it comes back.

## Open questions

- **Font weight 900:** resolved. The user chose to keep 400–800, so headings look exactly as today.
- **Local Lighthouse:** resolved. The user approved running `npx lighthouse` locally (npx cache only, not `package.json`).

## Constraints

- The site looks the same on desktop. On mobile it looks the same too, except that the Stars background behind Contact disappears (it's WebGL, and the budget forbids it on mobile).
- `npm run lint`, `npm test`, `npm run test:e2e` and `npm run build` pass after every step.
- The human-in-the-loop check (roadmap) applies to each step before its commit.
