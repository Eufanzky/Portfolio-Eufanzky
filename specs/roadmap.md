# Roadmap

Performance comes first, then project content. Each step is one small piece of work, and is one commit (or one small PR).

All work happens on a `feature/<feature-name>` branch created from `main`, never on `main` itself. The branch is merged into `main` through a pull request after the user approves.

Every step ends with this human-in-the-loop check, in order:

1. Write or update the tests for what the step changed (see "Testing" in `specs/tech-stack.md`). A step that changes only docs or content data still runs the existing tests.
2. `npm run lint`, `npm test`, `npm run test:e2e` and `npm run build` pass. (The two test commands exist from Phase 2 onwards.)
3. Run `npm run preview` to serve the production build locally.
4. The user opens the preview in the browser, on desktop width and on mobile width (DevTools device mode or a real phone on the same network with `npm run preview -- --host`), and checks what changed.
5. Only after the user approves what they see is the step committed. If they don't approve, the step is revised and checked again.

## Phase 0: Clean up the repository (done 2026-09-22)

1. Commit the pending `CLAUDE.md` changes, and decide whether to keep or discard the local `package-lock.json` change.
2. Merge `perf/optimize-threejs-loading` into `main` (it applies cleanly).
3. Check the merged site on a phone: Hero, Projects and Contact appear, and no 3D model downloads.
4. Apply the one missing change from `bugfix/projects-mobile-reload`: project card stagger in `Works.jsx` from `index * 0.5` to `index * 0.2`.
5. Delete the local branches `development`, `bugfix/projects-mobile-reload` and `feature/json-projects-data`.
6. Delete those branches on GitHub too (they still hold the history with the hardcoded email).
7. Fix `npm run lint` so it passes with zero warnings (it was already failing before Phase 0).

## Phase 1: Measure performance (done 2026-09-22)

8. Run Lighthouse (mobile) on the production site and record the score, LCP and CLS in `specs/perf-baseline.md`.
9. Run `npm run build` and record the main chunk sizes in the same file.

## Phase 2: Set up testing (done 2026-09-22)

10. Install Vitest, React Testing Library, `@testing-library/user-event` and jsdom as dev dependencies. Add a `test` block to `vite.config.js` (jsdom environment, a setup file) and an `npm test` script.
11. Write the first component tests. Replace the 3D canvases and EmailJS with mocks (jsdom has no WebGL, and tests must never send real email):
    - every project in `src/constants/index.js` has a name, description, tags, image and GitHub link;
    - a project card shows its name and its GitHub and demo links;
    - the Contact form sends through EmailJS with the typed values and shows the result to the user.
12. Install Playwright with Chromium only. Add `playwright.config.js` that builds and serves the site with `npm run preview`, a desktop project and a mobile project (375px wide), and an `npm run test:e2e` script.
13. Write the first end-to-end tests:
    - the page loads with no console errors on desktop and mobile width, and every section heading appears;
    - the nav links scroll to their sections;
    - at mobile width, no Three.js chunk and no `.gltf` file is downloaded. This fails today (`specs/perf-baseline.md`, finding 1), so mark it as an expected failure (`test.fail`) until step 16 fixes it.
14. Update `CLAUDE.md` with the test commands and where the tests live.

## Phase 3: Improve performance (steps 15–19 done 2026-09-23, step 20 after deploy)

Pick items by what the baseline shows to be slowest. Re-measure after each one.

15. Make sure the hero image (`herobg`) is WebP, correctly sized, and preloaded.
16. Make sure no Three.js chunk loads on mobile, and remove `test.fail` from the Playwright mobile test so it must pass from now on.
17. Check fonts: load only the weights used, with `font-display: swap`.
18. Reduce Framer Motion cost on mobile if it shows up in the profile (fewer animated elements, or respect `prefers-reduced-motion`).
19. Replace `react-tilt` on mobile, or skip it on touch devices, if it costs noticeable JavaScript or layout work.
20. Re-run Lighthouse and update `specs/perf-baseline.md`. Repeat items 15 to 19 until mobile scores 90 or higher.

## Phase 4: Update projects

21. Write the list of current projects: name, one-line description, tech, role, GitHub link, demo link, and screenshot.
22. Decide which existing projects to keep, remove or move lower.
23. Add the image for one new project as WebP in `src/assets/` and export it from `src/assets/index.js`.
24. Add that project's entry to `projects` in `src/constants/index.js`. The project data test from step 11 must pass for it.
25. Repeat steps 23 and 24 for each remaining new project, one project per commit.
26. Remove the retired projects and their unused images.
27. Order the projects so the strongest and most recent come first.
28. Check that every GitHub and demo link works.

## Phase 5: Project detail pages (every project)

Every project card must still work on its own (description, tech, role, links). Every project in the portfolio also gets a detail page, as extra depth for readers who click through. Smaller projects can have a shorter page, but none is left without one.

29. Collect the material for every project's page: screenshots, and notes on the decisions made and the results.
30. Write the detail page content for every project: problem, what was built, the user's role, key decisions and trade-offs, results, and 2–4 screenshots with short captions. Same honesty rule as the cards: match the real work, no exaggeration.
31. Add `react-router-dom` back and set up routes: `/` for the main page and `/projects/:slug` for detail pages, with the detail page loaded via `React.lazy`.
32. Add a SPA rewrite to `vercel.json` so `/projects/:slug` works on direct visit and refresh.
33. Add a `slug` to every project in `src/constants/index.js`, and extend the project data test: every project has a unique slug. Each project's detail content is added with its page in steps 34 and 36.
34. Build the detail page layout, and fill it in for the first project. Add a component test that the page renders that project's content, and a test that an unknown slug shows a "not found" message.
35. Link that project's card to its detail page (a "Read more" link next to the demo and GitHub links).
36. Add the detail page and "Read more" link for each remaining project, one project per commit, until every project has one.
37. Check navigation with Playwright tests: the back button returns to the Projects section, the page scrolls to the top on open, the page title changes per project, and a direct visit to `/projects/:slug` works.
38. Check with a Playwright test that the main page on mobile does not download the detail page code or its images.

## Phase 6: Update the rest of the content

39. Update the Experience entries with current roles.
40. Update the Tech list to match the technologies used in the current projects.
41. Review the About and Hero text for recruiters: role, focus and availability.

## Phase 7: Final check

42. Run Lighthouse (mobile) on production and confirm a score of 90 or higher.
43. Send a test message through the contact form in production.
