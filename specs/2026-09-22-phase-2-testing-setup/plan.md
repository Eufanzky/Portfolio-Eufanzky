# Phase 2: Set up testing — Plan

See `requirements.md` for the scope and decisions, and `validation.md` for the done criteria.

All work is on branch `feature/testing-setup`, created from `main`.

## 1. Set up

1.1. Create `feature/testing-setup` from `main`.
1.2. Add this spec folder. The user approves it before any install.

## 2. Vitest and React Testing Library (roadmap step 10)

2.1. `npm install -D vitest jsdom @testing-library/react @testing-library/user-event @testing-library/jest-dom`.
2.2. Add a `test` block to `vite.config.js`: `environment: "jsdom"`, `setupFiles: ["./src/test/setup.js"]`, `include: ["src/**/*.test.{js,jsx}"]`.
2.3. `src/test/setup.js`: load `@testing-library/jest-dom/vitest`, clean up after each test, and stub `IntersectionObserver` and `matchMedia`.
2.4. Add the scripts `"test": "vitest run"` and `"test:watch": "vitest"`.
2.5. Add the ESLint override for test files to `.eslintrc.cjs`.

## 3. First component tests (roadmap step 11)

3.1. `src/constants/index.test.js`: project data is complete.
3.2. `src/components/Works.test.jsx`: cards, names and links.
3.3. `src/components/Contact.test.jsx`: send, loading text, success, failure. Mock EmailJS, `window.alert` and `./canvas/Earth`.
3.4. `npm test` passes. Break one test on purpose to see it fail, then restore it.

## 4. Playwright (roadmap step 12)

4.1. `npm install -D @playwright/test` and `npx playwright install chromium`.
4.2. `playwright.config.js`: `testDir: "e2e"`, `webServer` runs `npm run build && npm run preview` on port 4173, and `reuseExistingServer` is on outside CI. Projects are `desktop` (Desktop Chrome, 1280×720) and `mobile` (Pixel 5 device, width set to 375).
4.3. Add the script `"test:e2e": "playwright test"`.
4.4. Add `test-results/`, `playwright-report/` and `playwright/.cache/` to `.gitignore`.

## 5. First end-to-end tests (roadmap step 13)

5.1. `e2e/home.spec.js`: no console errors, and the Projects and Contact headings appear after scrolling (desktop and mobile).
5.2. `e2e/nav.spec.js`: the nav links About, Work and Contact work (desktop only).
5.3. `e2e/mobile-no-3d.spec.js`: record every request, scroll to the bottom, and expect no Three.js or model files (mobile only, `test.fail`).
5.4. `npm run test:e2e` passes. The mobile 3D test shows as "expected to fail".

## 6. Close out (roadmap step 14)

6.1. Update `CLAUDE.md`: commands, test locations, and the ESLint override.
6.2. `npm run lint`, `npm test`, `npm run test:e2e` and `npm run build` pass. The build chunk list matches `specs/perf-baseline.md`.
6.3. The user runs `npm run preview` and checks that the site looks the same as before.
6.4. After the user approves: commit (`docs: add phase 2 spec`, `test: set up vitest and first component tests`, `test: set up playwright and first e2e tests`, `docs: document test commands`).
6.5. Mark roadmap steps 10–14 as done, commit, push, and open a PR into `main`. Merge after the user approves.
