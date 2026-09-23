# Tech stack

## Current stack (keep)

| Area | Choice |
|---|---|
| UI | React 18, built with Vite 5 |
| Styling | Tailwind CSS 3 (custom theme in `tailwind.config.js`) |
| Animation | Framer Motion (variants in `src/utils/motion.js`, section stagger via the `SectionWrapper` HOC) |
| 3D | Three.js through `@react-three/fiber` and `@react-three/drei` |
| Contact form | EmailJS (`@emailjs/browser`), configured with `VITE_EMAILJS_*` and `VITE_CONTACT_EMAIL` |
| Hosting | Netlify (https://eugenio-condori.netlify.app/). `vercel.json` is kept but has no effect there. Decided in Phase 1 to stay on Netlify and leave the hosting config as it is. |
| Quality checks | ESLint with zero warnings (`npm run lint`) and a clean `npm run build`. There is no test suite. |

## Decisions

### 3D runs on desktop only

- The 3D scenes (computer in Hero, Earth in Contact, Stars) render on desktop only.
- On mobile (width ≤ 768px) no WebGL canvas is created and no 3D model is downloaded. A lightweight CSS alternative (for example `AnimatedBackground`) fills the space.
- Three.js code is loaded only when needed (`React.lazy` with direct imports, not through the canvas barrel file), so it never blocks the first render.
- Models are Draco-compressed (`public/**/scene-draco.gltf`).

### Project data lives in `src/constants/index.js`

- Projects stay in the `projects` array in `src/constants/index.js`, with images imported through `src/assets/index.js`.
- This bundles the data at build time: no extra request before the Projects section appears, and images go through Vite's hashed, long-cached assets.
- The runtime JSON approach (`feature/json-projects-data` branch) is not adopted.

### Project detail pages

- Every project in the portfolio gets a detail page. Every project card must still work on its own, without the reader opening the page.
- Adding a new project means adding both its card entry and its detail page content.
- Routing uses `react-router-dom`: `/` for the main page and `/projects/:slug` for detail pages.
- The detail page is loaded with `React.lazy`, so the main page (especially on mobile) never downloads its code or images.
- `vercel.json` rewrites all routes to `index.html`, so detail URLs work on direct visit and refresh.
- Detail content lives with the project entry in `src/constants/index.js` (same decision as project data).

### Images

- Project and icon images use WebP, lazy-loaded when below the fold.
- New images are added as WebP, at a width that fits the card, not the full-size screenshot.

### Linting

- `npm run lint` must pass with zero warnings.
- Fix real problems in code. Turn a rule off only for a pattern it misreads, as an override in `.eslintrc.cjs`, never with `eslint-disable` comments.
- Current overrides: `react/prop-types` off (plain JS, no `prop-types` package), `react/no-unknown-property` off in `src/components/canvas/` (React Three Fiber props), `react-refresh/only-export-components` off in `src/components/*.jsx` (the `SectionWrapper` HOC exports), and the Node env for `*.config.js`.

### Dependencies

- Remove dependencies the site doesn't use. `BallCanvas` (`canvas/Ball.jsx`) was deleted in Phase 0. The perf branch removed `react-router-dom` because nothing uses it yet; it comes back in roadmap Phase 4 for the project detail pages.
- Three.js has no manual vendor chunk. Vite puts it in an async chunk that only the lazy canvases load, which keeps it off mobile.
- Before adding a dependency, check its bundle size cost. Prefer CSS or small custom code for simple effects.

## Performance budget

- Lighthouse mobile performance: 90 or higher.
- Largest Contentful Paint (mobile): 2.5 s or less.
- Cumulative Layout Shift: 0.1 or less.
- No Three.js JavaScript downloaded on mobile.
