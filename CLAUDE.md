# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Eugenio Condori, built with React, Three.js, and Tailwind CSS. Single-page app with sections: Hero, About, Experience, Tech, Works (projects), and Contact.

## Commands

- `npm run dev` — Start Vite dev server
- `npm run build` — Production build
- `npm run lint` — ESLint (JS/JSX, zero warnings allowed)
- `npm run preview` — Preview production build

## Architecture

**Stack:** React 18 + Vite, Three.js (via @react-three/fiber + @react-three/drei), Framer Motion, Tailwind CSS (JIT mode), EmailJS for contact form.

**Key patterns:**

- `src/components/` — Page sections. Each section component is wrapped with `SectionWrapper` HOC (from `src/hoc/`) which adds Framer Motion stagger animations and consistent padding/layout.
- `src/components/canvas/` — Three.js 3D components (Computers, Earth, Ball, Stars) rendered via React Three Fiber. These are heavy — the Hero section's `AnimatedBackground` and `ComputersCanvas` are conditionally hidden on mobile (width <= 768px).
- `src/constants/index.js` — All portfolio content data (nav links, services, technologies, experiences, projects). This is the primary file to edit when updating portfolio content.
- `src/styles.js` — Shared Tailwind class string constants for typography (hero text, section headers).
- `src/utils/motion.js` — Framer Motion animation variant factories (`textVariant`, `fadeIn`, `zoomIn`, `slideIn`, `staggerContainer`).
- `src/assets/index.js` — Central re-export of all image/icon assets.

**Tailwind custom theme** (in `tailwind.config.js`): custom colors (`primary` = dark bg `#050816`, `secondary`, `tertiary` = card bg), custom `xs: 450px` breakpoint, hero background image pattern.

**Color accent scheme:** Pink `#F72585` for primary accent, cyan `#4CC9F0` for sub-text, blue `#4361EE` for form labels, blue `#4895ef` for secondary.

## GIT AND GITHUB
Never push directly to the main branch in git, use another branches for the changes.
