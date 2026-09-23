# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Eugenio Condori, built with React, Three.js, and Tailwind CSS. Single-page app with sections: Hero, About, Experience, Tech, Works (projects), and Contact.

## Commands

- `npm run dev` — Start Vite dev server
- `npm run build` — Production build
- `npm run lint` — ESLint (JS/JSX, zero warnings allowed)
- `npm run preview` — Preview production build
- `npm test` — Vitest + React Testing Library component tests (set up in roadmap Phase 2)
- `npm run test:e2e` — Playwright end-to-end tests against the preview build (set up in roadmap Phase 2)

Check changes with `npm run lint`, `npm test`, `npm run test:e2e` and `npm run build`. Every feature adds or updates its tests (see "Testing" in `specs/tech-stack.md`). Until roadmap Phase 2 is done, the two test commands don't exist yet. `.eslintrc.cjs` turns off `react/prop-types` everywhere, `react/no-unknown-property` in `src/components/canvas/` (React Three Fiber props), and `react-refresh/only-export-components` in `src/components/*.jsx` (the `SectionWrapper` HOC exports).

**Environment variables** (Vite `VITE_` prefix, read in `Contact.jsx`): `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`, `VITE_CONTACT_EMAIL`. The contact form needs these to send email.

## Architecture

**Stack:** React 18 + Vite, Three.js (via @react-three/fiber + @react-three/drei), Framer Motion, Tailwind CSS (JIT mode), EmailJS for contact form.

**Key patterns:**

- `src/components/` — Page sections. Each section component is wrapped with `SectionWrapper` HOC (from `src/hoc/`) which adds Framer Motion stagger animations and consistent padding/layout.
- `src/components/canvas/` — Three.js 3D components (Computers, Earth, Stars) rendered via React Three Fiber. These are heavy — the Hero section's `AnimatedBackground` and `ComputersCanvas` are conditionally hidden on mobile (width <= 768px).
- `src/constants/index.js` — All portfolio content data (nav links, services, technologies, experiences, projects). This is the primary file to edit when updating portfolio content.
- `src/styles.js` — Shared Tailwind class string constants for typography (hero text, section headers).
- `src/utils/motion.js` — Framer Motion animation variant factories (`textVariant`, `fadeIn`, `zoomIn`, `slideIn`, `staggerContainer`).
- `src/assets/index.js` — Central re-export of all image/icon assets. Project images have `.webp` variants alongside the `.png` originals.

**Performance setup** (recent commits focus on this; keep it intact):

- `App.jsx` loads `Navbar` and `Hero` eagerly. Everything below the fold (About through Contact, plus `StarsCanvas`) uses `React.lazy` inside one `Suspense`.
- `vite.config.js` splits vendors into manual chunks (`vendor-react`, `vendor-motion`) and emits gzip and brotli files through `vite-plugin-compression2`. Three.js has no manual chunk on purpose. It ends up in an async chunk that only the lazy-loaded canvases request. Known gap: `StarsCanvas` has no mobile check, so mobile still downloads that chunk (`specs/perf-baseline.md`, finding 1, fixed in roadmap Phase 3).
- The 3D models are served from `public/desktop_pc/` and `public/planet/`. `vercel.json` sets the cache headers for those paths and for hashed `/assets/`. The canvases load the Draco-compressed `scene-draco.gltf` files; the plain `scene.gltf` versions are unused originals. If you move the models, update `vercel.json` too. Note: production (https://eugenio-condori.netlify.app/) runs on Netlify, where `vercel.json` has no effect. The user chose to stay on Netlify and leave the hosting config as it is (see `specs/perf-baseline.md`).

**Tailwind custom theme** (in `tailwind.config.js`): custom colors (`primary` = dark bg `#050816`, `secondary`, `tertiary` = card bg), custom `xs: 450px` breakpoint, hero background image pattern.

**Color accent scheme:** Pink `#F72585` for primary accent, cyan `#4CC9F0` for sub-text, blue `#4361EE` for form labels, blue `#4895ef` for secondary.

## GIT AND GITHUB

- Never work on, commit to or push to `main` directly.
- Every feature (each roadmap phase or step, or any other change) gets its own branch, named `feature/<feature-name>` in kebab-case (for example `feature/perf-baseline`). Create it from an up-to-date `main` before making any change.
- Commit on the feature branch only after the roadmap's human-in-the-loop check (`specs/roadmap.md`): lint and build pass, and the user approves the preview.
- Get changes into `main` through a pull request from the feature branch, merged only after the user approves.
- Plans for each phase live in `specs/<date>-<phase-name>/` (`requirements.md`, `plan.md`, `validation.md`). Performance numbers live in `specs/perf-baseline.md`.
