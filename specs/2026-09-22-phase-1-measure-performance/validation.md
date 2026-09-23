# Phase 1: Measure performance — Validation

Phase 1 is done, and `feature/perf-baseline` can be merged, when every check below passes.

## Automated checks

- [x] `npm run lint` passes with zero warnings.
- [x] `npm run build` succeeds.
- [x] `git diff main --stat` only touches `CLAUDE.md` and files under `specs/` (no code change in this phase).

## Baseline content

- [x] `specs/perf-baseline.md` has a Lighthouse mobile run: score, LCP and CLS at least.
- [x] The run records its date and Lighthouse version.
- [x] The build table lists every JS/CSS chunk with raw, gzip and brotli sizes.
- [x] The measured commit and production URL are stated, and production matches that commit.

## Git and process

- [x] Work is on `feature/perf-baseline`, not on `main`.
- [x] The user reviewed `specs/perf-baseline.md` before the commit.
- [x] Roadmap steps 8–9 are marked as done in `specs/roadmap.md`.
- [ ] Merged into `main` through a PR after the user approved (pending: PR opened).
