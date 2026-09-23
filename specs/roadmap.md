# Roadmap

Performance comes first, then project content. Each step is one small piece of work, and is one commit (or one small PR).

All work happens on a `feature/<feature-name>` branch created from `main`, never on `main` itself. The branch is merged into `main` through a pull request after the user approves.

Every step ends with this human-in-the-loop check, in order:

1. `npm run lint` and `npm run build` pass.
2. Run `npm run preview` to serve the production build locally.
3. The user opens the preview in the browser, on desktop width and on mobile width (DevTools device mode or a real phone on the same network with `npm run preview -- --host`), and checks what changed.
4. Only after the user approves what they see is the step committed. If they don't approve, the step is revised and checked again.

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

## Phase 2: Improve performance

Pick items by what the baseline shows to be slowest. Re-measure after each one.

10. Make sure the hero image (`herobg`) is WebP, correctly sized, and preloaded.
11. Check that no Three.js chunk loads on mobile (Network tab at 375px width).
12. Check fonts: load only the weights used, with `font-display: swap`.
13. Reduce Framer Motion cost on mobile if it shows up in the profile (fewer animated elements, or respect `prefers-reduced-motion`).
14. Replace `react-tilt` on mobile, or skip it on touch devices, if it costs noticeable JavaScript or layout work.
15. Re-run Lighthouse and update `specs/perf-baseline.md`. Repeat items 10 to 14 until mobile scores 90 or higher.

## Phase 3: Update projects

16. Write the list of current projects: name, one-line description, tech, role, GitHub link, demo link, and screenshot.
17. Decide which existing projects to keep, remove or move lower.
18. Add the image for one new project as WebP in `src/assets/` and export it from `src/assets/index.js`.
19. Add that project's entry to `projects` in `src/constants/index.js`.
20. Repeat steps 18 and 19 for each remaining new project, one project per commit.
21. Remove the retired projects and their unused images.
22. Order the projects so the strongest and most recent come first.
23. Check that every GitHub and demo link works.

## Phase 4: Project detail pages (every project)

Every project card must still work on its own (description, tech, role, links). Every project in the portfolio also gets a detail page, as extra depth for readers who click through. Smaller projects can have a shorter page, but none is left without one.

24. Collect the material for every project's page: screenshots, and notes on the decisions made and the results.
25. Write the detail page content for every project: problem, what was built, the user's role, key decisions and trade-offs, results, and 2–4 screenshots with short captions. Same honesty rule as the cards: match the real work, no exaggeration.
26. Add `react-router-dom` back and set up routes: `/` for the main page and `/projects/:slug` for detail pages, with the detail page loaded via `React.lazy`.
27. Add a SPA rewrite to `vercel.json` so `/projects/:slug` works on direct visit and refresh.
28. Add a `slug` to every project in `src/constants/index.js`. Each project's detail content is added with its page in steps 29 and 31.
29. Build the detail page layout, and fill it in for the first project.
30. Link that project's card to its detail page (a "Read more" link next to the demo and GitHub links).
31. Add the detail page and "Read more" link for each remaining project, one project per commit, until every project has one.
32. Check navigation: back button returns to the Projects section, the page scrolls to the top on open, and the page title changes per project.
33. Check that the main page on mobile does not download the detail page code or its images.

## Phase 5: Update the rest of the content

34. Update the Experience entries with current roles.
35. Update the Tech list to match the technologies used in the current projects.
36. Review the About and Hero text for recruiters: role, focus and availability.

## Phase 6: Final check

37. Run Lighthouse (mobile) on production and confirm a score of 90 or higher.
38. Send a test message through the contact form in production.
