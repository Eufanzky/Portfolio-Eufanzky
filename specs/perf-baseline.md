# Performance baseline

Roadmap Phase 1 (steps 8–9). Phase 3 picks its work from these numbers, and step 20 re-measures and updates this file.

- Production URL: https://eugenio-condori.netlify.app/ (GitHub repo homepage)
- Measured commit: `6070e8c` (`main`). The asset hashes served in production match a local `npm run build` of this commit exactly.

## Lighthouse (mobile), step 8

PageSpeed Insights, Mobile tab, run by the user on 2026-09-22 at 10:12 PM GMT-4. Lighthouse 13.5.0, emulated Moto G Power, Slow 4G throttling, HeadlessChromium 153.0.8010.36. One run.

| Metric | Value | Budget | Status |
|---|---|---|---|
| Performance score | **78** | ≥ 90 | Over budget |
| First Contentful Paint | 3.0 s | – | |
| Largest Contentful Paint | **4.2 s** | ≤ 2.5 s | Over budget |
| Total Blocking Time | 0 ms | – | |
| Cumulative Layout Shift | 0.091 | ≤ 0.1 | Within budget, close to the limit |
| Speed Index | 3.0 s | – | |

Other categories: Accessibility 90, Best Practices 100, SEO 100.

Insights and diagnostics PSI reported:

- Reduce unused JavaScript: est. savings 180 KiB. This matches the Three.js chunk that mobile downloads (finding 1 below).
- Improve image delivery: est. savings 140 KiB.
- Minimize main-thread work: 2.2 s. 3 long tasks found.
- Forced reflow, and layout shift culprits (CLS 0.091).
- 1 non-composited animation.
- Render-blocking requests: est. savings 10 ms (small).
- Accessibility: links without a discernible name, and no `<main>` landmark.

To re-measure (step 20), use https://pagespeed.web.dev/ on the production URL, Mobile tab, and record the same fields.

## Build output, step 9

`npm run build` on 2026-09-22 (Vite 5, `es2020` target). Sizes are in KB (1 KB = 1000 bytes). Production serves compressed responses (`content-encoding: br`), so the brotli column is closest to what is actually transferred.

### Loaded on first paint (all devices)

| File | Raw | gzip | brotli |
|---|---|---|---|
| `index.html` | 1.5 | – | – |
| `index-*.js` (entry: App, Navbar, Hero) | 52.3 | 28.4 | 26.0 |
| `vendor-react-*.js` | 141.4 | 45.3 | 39.7 |
| `vendor-motion-*.js` | 98.6 | 33.1 | 29.7 |
| `index-*.css` | 21.3 | 5.4 | 4.7 |
| **JS + CSS total** | **313.6** | **112.2** | **100.1** |
| `herobg-*.webp` (preloaded) | 142.9 | – | – |

Also loaded: Google Fonts CSS and Poppins 400–800 font files (not part of the build).

### Loaded right after first paint (all devices)

All lazy sections share one `Suspense` in `App.jsx`, so they load as soon as the page mounts, not on scroll.

| File | Raw | brotli |
|---|---|---|
| `About-*.js` | 1.6 | 0.7 |
| `Experience-*.js` + `.css` | 10.3 + 8.0 | 3.6 + 1.1 |
| `Tech-*.js` | 0.8 | – |
| `Works-*.js` | 4.5 | 1.7 |
| `Contact-*.js` | 8.6 | 3.2 |
| `SectionWrapper-*.js` | 0.9 | – |
| `index-*.js` (`react-tilt`, used by About and Works) | 3.7 | 1.1 |
| `Stars-*.js` | 7.4 | 2.8 |
| `react-three-fiber.esm-*.js` (Three.js, R3F, drei) | 809.0 | 179.1 |

### Desktop only (width > 768px)

| File | Raw | brotli |
|---|---|---|
| `Computers-*.js` | 1.7 | 0.9 |
| `Earth-*.js` | 1.1 | 0.6 |
| `Loader-*.js` (drei GLTF/Draco loader) | 99.4 | 25.2 |
| `desktop_pc/scene-draco.gltf` + `.bin` | 1868.4 + 617.5 | served uncompressed (see findings) |
| `planet/scene-draco.gltf` + `.bin` | 10.8 + 138.3 | served uncompressed |

Images: the largest are `python-*.png` (56.8), `new_relic_logo-*.png` (44.1) and `nextjs-*.png` (36.6). All tech and experience icons are still PNG.

## Findings for Phase 3

1. **Three.js loads on mobile.** *Fixed in Phase 3, step 16.* `App.jsx` lazy-loads `StarsCanvas` with no width check, and `Stars-*.js` imports `react-three-fiber.esm-*.js` directly. Every mobile visit downloads about 179 KB brotli (809 KB raw) of Three.js. It also creates a WebGL canvas when the Contact section scrolls into view. This breaks the "No Three.js JavaScript downloaded on mobile" budget (roadmap step 16).
2. **Production is on Netlify, not Vercel.** `vercel.json` has no effect. Every response, including hashed `/assets/*` files and the 3D models, is served with `cache-control: public,max-age=0,must-revalidate`, so repeat visits revalidate every file. Decision (2026-09-22): stay on Netlify and leave the hosting config as it is. This affects repeat visits only, not the Lighthouse first-load score.
3. **3D models are not compressed in transit.** Netlify serves `desktop_pc/scene-draco.gltf` (1.87 MB) without `content-encoding`. The build's `.br` file for it is 93 KB. This affects desktop only.
4. **Icons are PNG.** Tech and experience icons (up to 57 KB each) are still PNG, while the tech stack decision is WebP.

## Phase 3 changes, local measurements (steps 15–19)

Measured on branch `feature/perf-improvements` on 2026-09-23, before the merge. Local Lighthouse 12 (`npx lighthouse`, mobile preset) against `vite preview`, using Playwright's Chromium on WSL with no GPU. Each row is the median of 3 runs. Compare these numbers only with each other, not with the PSI baseline above. The production PSI run is in the next section (step 20).

| After | Score | FCP | LCP | TBT | CLS | Transferred |
|---|---|---|---|---|---|---|
| Nothing (`main`, the "before" run) | 59 | 2.57 s | 3.83 s | 1172 ms | 0.093 | 671 KB |
| Step 15: hero image dropped | 82 | 2.52 s | 3.48 s | 223 ms | 0.094 | 714 KB |
| Step 16: no 3D on mobile | 99 | 1.74 s | 1.93 s | 55 ms | 0.002 | 274 KB |
| Step 18: Framer Motion off the critical path | 97 | 1.85 s | 2.28 s | 30 ms | 0.002 | 275 KB |

The TBT numbers before step 16 are mostly the Stars canvas drawn by software WebGL, which exaggerates them compared with a real phone.

Step 18 scores lower above because Lighthouse's default *simulated* throttling (also used by PSI) doesn't slow the network. It replays the load, and `vendor-motion` is now requested after the entry chunk instead of preloaded next to it. With real throttling (`--throttling-method=devtools`, 3 runs each), step 18 is faster: LCP about 1.96 s against 2.19 s for step 16, score 97 against 96. If PSI is short of 90, the next item is to start the lazy sections' imports after the first paint instead of on mount (see "Next items").

What each step did:

- **Step 15, hero image.** `herobg.webp` (143 KB, 2880×1566) was preloaded on every visit but never visible: `#retrobg` covers the hero. The preload, the Tailwind `hero-pattern` and both image files were removed. The LCP element is the hero `<h1>` text, not an image.
- **Step 16, no 3D on mobile.** `useIsMobile` (`src/hooks/useIsMobile.js`) reads `matchMedia` during the first render. `Hero`, `Contact` and `App` use it for the Computers, Earth and Stars canvases. Before, the first render assumed desktop, so phones also requested `Computers`, `Earth` and `Loader`. That flip also moved the hero heading, which was most of the CLS.
- **Step 17, fonts.** Checked, no change: Poppins loads without blocking render, with `display=swap`, and every weight requested (400–800) is used. 800 draws `font-black`. The user chose to keep 800 over loading 900 (2026-09-22).
- **Step 18, motion.** The hero dot is a CSS animation, so `vendor-motion` (29.9 KB brotli) is no longer preloaded on first load. `MotionConfig reducedMotion="user"` in `SectionWrapper`, and a `prefers-reduced-motion` rule in `index.css`.
- **Step 19, `react-tilt`: not needed.** It only adds React mouse handlers, with no work on load or scroll. Scrolling the page at 375px with a 4× CPU slowdown, script time was the same with and without it (332/421/332 ms against 334/434/344 ms). On touch, a tap leaves the card at 0° (no stuck tilt). Kept as is.

### Loaded on first paint after Phase 3

| File | Raw | gzip | brotli |
|---|---|---|---|
| `index-*.js` (entry: App, Navbar, Hero) | 52.2 | 28.3 | 26.0 |
| `vendor-react-*.js` | 141.4 | 45.3 | 39.7 |
| `index-*.css` | 21.9 | 5.5 | 4.8 |
| **JS + CSS total** | **215.5** | **79.1** | **70.5** |

Down from 100.1 KB brotli (`vendor-motion` is no longer on first paint), and without the 142.9 KB hero image. At 375px, no Three.js, canvas or model file loads at all (`e2e/mobile-no-3d.spec.js`).

## After Phase 3, production (step 20)

PageSpeed Insights, Mobile tab, run by the user on 2026-09-23 at 12:29–12:30 AM GMT-4, right after PR #6 was deployed (`main` at `87e6e60`; the served asset hashes match a local build). Lighthouse 13.5.0, emulated Moto G Power, Slow 4G throttling, HeadlessChromium 153.0.8010.36. Three runs.

| Metric | Baseline | Run 1 | Run 2 | Run 3 | Budget | Status |
|---|---|---|---|---|---|---|
| Performance score | 78 | **94** | **94** | **94** | ≥ 90 | Within budget |
| First Contentful Paint | 3.0 s | 2.4 s | 2.4 s | 2.4 s | – | |
| Largest Contentful Paint | 4.2 s | 2.5 s | 2.5 s | 2.5 s | ≤ 2.5 s | Within budget, at the limit |
| Total Blocking Time | 0 ms | 0 ms | 0 ms | 0 ms | – | |
| Cumulative Layout Shift | 0.091 | 0 | 0.002 | 0 | ≤ 0.1 | Within budget |
| Speed Index | 3.0 s | 2.4 s | 2.4 s | 2.4 s | – | |

Other categories are unchanged: Accessibility 90, Best Practices 100, SEO 100.

Every budget in `specs/tech-stack.md` is now met, and step 20 is done. LCP sits exactly at the 2.5 s limit, so any new work on the hero or the entry chunk should be re-measured.

What PSI still reports:

- Improve image delivery: est. savings 33 KiB (was 140 KiB before `herobg` was removed). Probably the PNG icons (finding 4).
- Reduce unused JavaScript: est. savings 23 KiB (was 180 KiB before Three.js left mobile).
- 1 non-composited animation.
- Accessibility: links without a discernible name, and no `<main>` landmark.

### Possible later items (not needed for the budget)

- Start the lazy section imports after the first paint (for example on `requestIdleCallback`), for more headroom on LCP.
- Icons as WebP (finding 4).
- The accessibility findings above.
