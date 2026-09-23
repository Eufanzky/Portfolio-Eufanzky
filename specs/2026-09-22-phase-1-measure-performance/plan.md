# Phase 1: Measure performance — Plan

See `requirements.md` for the scope and decisions, and `validation.md` for the done criteria.

All work is on branch `feature/perf-baseline`, created from `main`.

## 1. Set up

1.1. Create `feature/perf-baseline` from `main`.
1.2. Record the branching rule (`feature/<name>` for every feature, never work on `main`) in `CLAUDE.md` and `specs/roadmap.md`.
1.3. Add this spec folder and `specs/perf-baseline.md`.

## 2. Build sizes (roadmap step 9)

2.1. Run `npm run build`.
2.2. Record raw, gzip and brotli sizes of each JS/CSS chunk in `specs/perf-baseline.md`, grouped by: first paint, right after first paint, desktop only.
2.3. Confirm that production serves the same build (compare the asset hashes in production `index.html` with `dist/index.html`).

## 3. Lighthouse (roadmap step 8)

3.1. The user runs PageSpeed Insights on https://eugenio-condori.netlify.app/, Mobile tab, 3 times.
3.2. Record each run (score, FCP, LCP, TBT, CLS, Speed Index, Lighthouse version) and the median in `specs/perf-baseline.md`.
3.3. Note the LCP element PSI reports (expected: the hero background or the hero heading).

## 4. Close out

4.1. `npm run lint` and `npm run build` pass.
4.2. The user reviews `specs/perf-baseline.md` and decides the hosting question.
4.3. Commit (`docs: add phase 1 spec and branch rule`, `docs: record performance baseline`).
4.4. Mark roadmap steps 8–9 as done and commit (`docs: mark roadmap phase 1 done`).
4.5. Push `feature/perf-baseline` and open a PR into `main`. Merge after the user approves.
