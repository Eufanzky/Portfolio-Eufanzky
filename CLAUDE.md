# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Eugenio Condori, built with React, Three.js, and Tailwind CSS. Single-page app with sections: Hero, About, Experience, Tech, Works (projects), and Contact.

## Commands

- `npm run dev` — Start Vite dev server
- `npm run build` — Production build
- `npm run lint` — ESLint (JS/JSX, zero warnings allowed)
- `npm run preview` — Preview production build
- `npm test` — Vitest + React Testing Library component tests, run once (`npm run test:watch` for watch mode)
- `npm run test:e2e` — Playwright end-to-end tests. Builds the site and serves it with `npm run preview` on port 4173 (reuses a server already running there, so rebuild first if you started one yourself)

Check changes with `npm run lint`, `npm test`, `npm run test:e2e` and `npm run build`. Every feature adds or updates its tests (see "Testing" in `specs/tech-stack.md`). `.eslintrc.cjs` turns off `react/prop-types` everywhere, `react/no-unknown-property` in `src/components/canvas/` (React Three Fiber props), and `react-refresh/only-export-components` in `src/components/*.jsx` (the `SectionWrapper` HOC exports). Test files (`**/*.test.{js,jsx}`, `e2e/**`, `src/test/**`) get the Node environment.

**Tests:**

- Component tests live next to the code they test (`src/**/*.test.{js,jsx}`). Vitest config is the `test` block in `vite.config.js` (jsdom). `src/test/setup.js` loads jest-dom and stubs `IntersectionObserver` and `matchMedia`, which jsdom lacks. The `matchMedia` stub never matches (desktop layout). Use `mockMatchMedia` from `src/test/matchMedia.js` to render at phone width. Globals are off: import `describe`, `it`, `expect` and `vi` from `vitest`.
- Mock the 3D canvases (`vi.mock("./canvas/Earth", ...)`, since jsdom has no WebGL) and always mock `@emailjs/browser`. No test may send a real email.
- End-to-end tests live in `e2e/`, config in `playwright.config.js`: Chromium only, a `desktop` project (1280×720) and a `mobile` project (375px wide). `e2e/helpers.js` has `scrollToBottom`, which scrolls instantly because the site uses `scroll-behavior: smooth`.
- Headless Chromium has no GPU, so the canvases render in software and the desktop page is slow. That's why the timeouts are raised (60 s per test, 15 s per `expect`).
- `e2e/mobile-no-3d.spec.js` checks that no Three.js chunk and no `.gltf` or `.bin` file loads at 375px. It must pass.
- On Linux or WSL, Chromium needs system libraries: run `sudo npx playwright install-deps chromium` once per machine.

**Environment variables** (Vite `VITE_` prefix, read in `Contact.jsx`): `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`, `VITE_CONTACT_EMAIL`. The contact form needs these to send email.

## Architecture

**Stack:** React 18 + Vite, Three.js (via @react-three/fiber + @react-three/drei), Framer Motion, Tailwind CSS (JIT mode), EmailJS for contact form.

**Key patterns:**

- `src/components/` — Page sections. Each section component is wrapped with `SectionWrapper` HOC (from `src/hoc/`) which adds Framer Motion stagger animations and consistent padding/layout.
- `src/components/canvas/` — Three.js 3D components (Computers, Earth, Stars) rendered via React Three Fiber. These are heavy, so they render on desktop only: `Hero`, `Contact` and `App` skip `ComputersCanvas`, `EarthCanvas` and `StarsCanvas` when `useIsMobile()` (`src/hooks/useIsMobile.js`, width <= 768px) is true. The hook reads `matchMedia` during the first render. Don't change it to an effect, or a phone requests the 3D chunks before the effect runs. The Hero's CSS `AnimatedBackground` shows on every width.
- `src/constants/index.js` — All portfolio content data (nav links, services, technologies, experiences, projects). This is the primary file to edit when updating portfolio content.
- `src/styles.js` — Shared Tailwind class string constants for typography (hero text, section headers).
- `src/utils/motion.js` — Framer Motion animation variant factories (`textVariant`, `fadeIn`, `zoomIn`, `slideIn`, `staggerContainer`).
- `src/assets/index.js` — Central re-export of all image/icon assets. Project images have `.webp` variants alongside the `.png` originals.

**Performance setup** (recent commits focus on this; keep it intact):

- `App.jsx` loads `Navbar` and `Hero` eagerly. Everything below the fold (About through Contact, plus `StarsCanvas`) uses `React.lazy` inside one `Suspense`.
- `Navbar` and `Hero` don't import Framer Motion (the hero's bouncing dot is the CSS `.hero-scroll-dot`), so `vendor-motion` isn't in the first-load `modulepreload` list. Only the lazy sections load it. `e2e/critical-path.spec.js` checks this. `SectionWrapper` wraps each section in `MotionConfig reducedMotion="user"`, and `index.css` stops CSS animations under `prefers-reduced-motion: reduce`.
- `vite.config.js` splits vendors into manual chunks (`vendor-react`, `vendor-motion`) and emits gzip and brotli files through `vite-plugin-compression2`. Three.js has no manual chunk on purpose. It ends up in an async chunk that only the lazy-loaded canvases request.
- The 3D models are served from `public/desktop_pc/` and `public/planet/`. `vercel.json` sets the cache headers for those paths and for hashed `/assets/`. The canvases load the Draco-compressed `scene-draco.gltf` files; the plain `scene.gltf` versions are unused originals. If you move the models, update `vercel.json` too. Note: production (https://eugenio-condori.netlify.app/) runs on Netlify, where `vercel.json` has no effect. The user chose to stay on Netlify and leave the hosting config as it is (see `specs/perf-baseline.md`).

**Tailwind custom theme** (in `tailwind.config.js`): custom colors (`primary` = dark bg `#050816`, `secondary`, `tertiary` = card bg), custom `xs: 450px` breakpoint. The hero has no background image: `AnimatedBackground` (`#retrobg`) covers it.

**Color accent scheme:** Pink `#F72585` for primary accent, cyan `#4CC9F0` for sub-text, blue `#4361EE` for form labels, blue `#4895ef` for secondary.

## GIT AND GITHUB

- Never work on, commit to or push to `main` directly.
- Every feature (each roadmap phase or step, or any other change) gets its own branch, named `feature/<feature-name>` in kebab-case (for example `feature/perf-baseline`). Create it from an up-to-date `main` before making any change.
- Commit on the feature branch only after the roadmap's human-in-the-loop check (`specs/roadmap.md`): lint and build pass, and the user approves the preview.
- Get changes into `main` through a pull request from the feature branch, merged only after the user approves.
- Plans for each phase live in `specs/<date>-<phase-name>/` (`requirements.md`, `plan.md`, `validation.md`). Performance numbers live in `specs/perf-baseline.md`.
