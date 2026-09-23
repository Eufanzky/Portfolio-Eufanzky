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

1. **Three.js loads on mobile.** `App.jsx` lazy-loads `StarsCanvas` with no width check, and `Stars-*.js` imports `react-three-fiber.esm-*.js` directly. Every mobile visit downloads about 179 KB brotli (809 KB raw) of Three.js. It also creates a WebGL canvas when the Contact section scrolls into view. This breaks the "No Three.js JavaScript downloaded on mobile" budget (roadmap step 16).
2. **Production is on Netlify, not Vercel.** `vercel.json` has no effect. Every response, including hashed `/assets/*` files and the 3D models, is served with `cache-control: public,max-age=0,must-revalidate`, so repeat visits revalidate every file. Decision (2026-09-22): stay on Netlify and leave the hosting config as it is. This affects repeat visits only, not the Lighthouse first-load score.
3. **3D models are not compressed in transit.** Netlify serves `desktop_pc/scene-draco.gltf` (1.87 MB) without `content-encoding`. The build's `.br` file for it is 93 KB. This affects desktop only.
4. **Icons are PNG.** Tech and experience icons (up to 57 KB each) are still PNG, while the tech stack decision is WebP.
