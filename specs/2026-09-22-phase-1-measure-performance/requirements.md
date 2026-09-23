# Phase 1: Measure performance — Requirements

Roadmap reference: `specs/roadmap.md`, Phase 1, steps 8–9.

## Context

Phase 2 picks performance work by what is slowest, so it needs a recorded baseline first. The baseline is also what step 15 compares against.

State on 2026-09-22:

- `main` is at `6070e8c` (Phase 0 done).
- Production is https://eugenio-condori.netlify.app/ (the GitHub repo homepage). It serves the same asset hashes as a local build of `6070e8c`, so it is up to date with `main`.
- The site is hosted on Netlify, although `CLAUDE.md` and `specs/tech-stack.md` say Vercel. `vercel.json` has no effect in production.
- Chrome isn't installed in the dev environment (WSL), and the anonymous PageSpeed Insights API quota was used up, so the Lighthouse runs are done by the user in PageSpeed Insights.

## Scope

In scope:

1. Lighthouse mobile on production: score, LCP and CLS (plus FCP, TBT and Speed Index, which come free), recorded in `specs/perf-baseline.md`.
2. `npm run build` chunk sizes (raw, gzip, brotli) recorded in the same file, grouped by when they load.
3. Findings found along the way, listed in `specs/perf-baseline.md` for Phase 2 to pick from.

Out of scope:

- Any code or config change. Phase 1 only measures. Fixes belong to Phase 2.
- Moving hosting between Netlify and Vercel (an open decision, see below).

## Decisions

| Decision | Choice | Reason |
|---|---|---|
| Branch | `feature/perf-baseline` | Every roadmap feature gets its own `feature/<name>` branch (`CLAUDE.md`). |
| Lighthouse source | PageSpeed Insights, Mobile tab, one run by the user | Uses Lighthouse's standard mobile throttling, so it's repeatable in step 15. Needs no local Chrome. |
| Size unit | KB = 1000 bytes, brotli column shown | Production serves brotli, so it is closest to what is transferred. |

## Resolved questions

- **Hosting:** stay on Netlify and leave the hosting config as it is (user's choice, 2026-09-22). No `netlify.toml` or `_headers` file is added.

## Constraints

- No change to `src/`, `vite.config.js` or hosting config in this phase.
- The roadmap's human-in-the-loop check still applies: lint and build pass, and the user approves before the commit.
