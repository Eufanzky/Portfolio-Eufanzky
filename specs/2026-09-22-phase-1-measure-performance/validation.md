# Phase 1: Measure performance — Validation

Phase 1 is done, and `feature/perf-baseline` can be merged, when every check below passes.

## Automated checks

- [ ] `npm run lint` passes with zero warnings.
- [ ] `npm run build` succeeds.
- [ ] `git diff main --stat` only touches `CLAUDE.md` and files under `specs/` (no code change in this phase).

## Baseline content

- [ ] `specs/perf-baseline.md` has 3 Lighthouse mobile runs and their median: score, LCP and CLS at least.
- [ ] Each run records its date and Lighthouse version.
- [ ] The build table lists every JS/CSS chunk with raw, gzip and brotli sizes.
- [ ] The measured commit and production URL are stated, and production matches that commit.

## Git and process

- [ ] Work is on `feature/perf-baseline`, not on `main`.
- [ ] The user reviewed `specs/perf-baseline.md` before the commit.
- [ ] Roadmap steps 8–9 are marked as done in `specs/roadmap.md`.
- [ ] Merged into `main` through a PR after the user approved.
