# Phase 2: Set up testing — Requirements

Roadmap reference: `specs/roadmap.md`, Phase 2, steps 10–14.

## Context

From Phase 3 on, every step must write or update its tests, and `npm test` and `npm run test:e2e` must pass before the commit. This phase sets up both tools and writes the first tests, so there is a safety net before the performance work starts changing code.

State on 2026-09-22:

- `main` is at `03fc9bc` (roadmap and tech stack updated with testing).
- There are no tests and no test dependencies.
- Node 22 on WSL (Ubuntu 26.04). Chrome isn't installed. Playwright downloads its own Chromium, but that Chromium may need system libraries that only `sudo` can install.

## Scope

In scope:

1. Vitest, React Testing Library, `@testing-library/user-event`, `@testing-library/jest-dom` and jsdom as dev dependencies. Vitest is configured in a `test` block in `vite.config.js`, and `npm test` runs it once (`vitest run`).
2. First component tests:
   - `src/constants/index.test.js`: every project has a name, description, at least one tag, an image and a GitHub link. `demo_link` is a string, and it may be empty.
   - `src/components/Works.test.jsx`: every project card shows its name. A card with a GitHub link shows a "Github" link with that URL, and a card with a demo link shows a "Demo" link. When a link is empty, its button isn't shown.
   - `src/components/Contact.test.jsx`: typing a name, email and message and clicking Send calls EmailJS with those values. The button shows "Sending..." during the send. After a successful send the user sees a success message and the fields are cleared. After a failed send the user sees an error message.
3. Playwright with Chromium only, `playwright.config.js`, and an `npm run test:e2e` script. Playwright builds the site and serves it with `npm run preview`. It runs a desktop project (1280px) and a mobile project (375px).
4. First end-to-end tests, in `e2e/`:
   - `e2e/home.spec.js`: the page loads with no console errors, and the Projects and Contact headings appear after scrolling. This runs on desktop and mobile.
   - `e2e/nav.spec.js`: on desktop, clicking About, Work and Contact changes the URL hash and brings that section into view.
   - `e2e/mobile-no-3d.spec.js`: at mobile width, after scrolling to the bottom, no Three.js chunk (`react-three-fiber*`, `three*`, `Stars-*`, `Earth-*` or `Computers-*`) and no `.gltf` or `.bin` file is requested. It is marked `test.fail` because it fails today (`specs/perf-baseline.md`, finding 1). Step 16 removes the mark.
5. `CLAUDE.md`: the test commands, where the tests live, and the ESLint override for test files.

Out of scope:

- Any change to how the site looks or behaves. The only changes outside test files are config files, scripts and dev dependencies.
- Fixing the `StarsCanvas` mobile problem (roadmap step 16).
- CI (GitHub Actions), Lighthouse CI and axe-core.

## Decisions

| Decision | Choice | Reason |
|---|---|---|
| Branch | `feature/testing-setup` | Every roadmap feature gets its own `feature/<name>` branch (`CLAUDE.md`). |
| Vitest config | `test` block in `vite.config.js` | It uses the same plugins and aliases as the app, with one file to maintain. |
| Test globals | Off. Tests import `describe`, `it` and `expect` from `vitest` | ESLint then needs no special globals, and it's clear where each function comes from. |
| Browser APIs missing in jsdom | Stubbed in `src/test/setup.js`: `IntersectionObserver` (used by Framer Motion `whileInView` and the timeline) and `window.matchMedia` | Without them, the sections crash in jsdom. |
| 3D in component tests | Mock the canvas modules (`vi.mock`) | jsdom has no WebGL. |
| EmailJS | `vi.mock("@emailjs/browser")`, `window.alert` spied on | Tests must never send a real email. The site shows results with `alert()`. |
| Playwright browser | Chromium only | It covers the recruiter case (Chrome on desktop and Android) and keeps installs small. |
| Playwright server | `npm run build && npm run preview` on port 4173 | It tests the production build, the same thing the user previews. |
| Mobile 3D test | `test.fail` until step 16 | It records the known problem now, and it will start failing loudly once the problem is fixed and the mark is removed. |
| ESLint for tests | Override for `**/*.test.{js,jsx}`, `e2e/**` and `src/test/**` (Node env) | Test files use Node APIs. No `eslint-disable` comments, as the lint rule in `specs/tech-stack.md` requires. |

## Open questions

- **Playwright system libraries:** if `npx playwright install chromium` works but the browser won't start, the user runs `sudo npx playwright install-deps chromium` once (Claude can't run `sudo`).

## Constraints

- No change to how the site looks or behaves: the preview must look the same as `main`.
- `npm run build` output (chunks and their sizes) stays the same. Test code must not end up in the bundle.
- The roadmap's human-in-the-loop check applies: lint, tests and build pass, and the user approves before the commit.
