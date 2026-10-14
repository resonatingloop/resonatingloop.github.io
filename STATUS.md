# resonatrix station status

> **continuity role:** operational checkpoint  
> **status:** current  
> **last verified:** 2026-10-14
> **owns:** verified current state, active work, known gaps, and next useful action  
> **update when:** a meaningful stopping point changes any of those facts

## Verified checkpoint

the accepted resonatrix station revamp is complete in the local worktree. the
homepage now exposes an unequal constellation of geogematria, cyphers.news,
upward, and cootie oracle; writing visibility fails closed; and a single github
pages workflow owns the eleventy artifact. on fine-pointer screens the orbital
work rests as sigils only: upward occupies the lower-left arc and resolves a
divisor lattice through the station when hovered or keyboard-focused. touch
layouts retain the full readouts. a high-contrast `◎` favicon compresses the
station's listening reticle into a bone loop and ember core that remains
distinct at 16px.

verification performed:

```text
npm ci
npm test
npm run build
npm run dev (local server smoke)
npm audit --omit=dev
node --check main.js
python3 /home/resonatingloop/.codex/skills/manage-project-docs/scripts/check_docset.py .
git diff --check
rendered inspection at 1490x827 and 390x844
rendered inspection of desktop rest/upward focus and narrow touch states
```

evidence of success:

```text
4 node tests pass.
eleventy copies 3 files and writes 15 files.
the local dev server returns the homepage with the upward route and lattice.
npm audit reports 0 production-dependency vulnerabilities; npm ci reports
15 findings in development dependencies (3 moderate, 12 high).
desktop rest, upward keyboard focus, and mobile fallback states render without
navigation or utility collisions.
favicon inspected at 16px, 32px, 64px, and 128px on dark and light fields.
```

## Working now

- `/` is an eleventy template with semantic work links and quiet utilities.
- `/geomatria/` remains the primary local instrument route.
- `https://cyphers.news/` is visibly marked as the outbound collective signal.
- `/upward/` is an orbital route whose tuned state exposes a divisor lattice.
- `/cootie-oracle/` remains a subordinate folded-corner route.
- current unlisted writing emits direct-url pages with `noindex,nofollow` and
  stays out of collections; private writing does not emit.
- the `texts` coordinate and `/writing/` archive appear only when a public text
  exists.
- `.github/workflows/pages.yml` is the sole pages deployment workflow.
- the homepage and writing document shell both reference `/favicon.svg`; the
  eleventy artifact includes that asset.

## Incomplete or broken

- the upward homepage signal has not been committed, pushed, or deployed.
- development dependencies retain 15 npm audit findings; the deployed static
  artifact has no production dependency audit findings.

## Active work

- accepted spec: none; retired at `specs/resonatrix-station-revamp.md`
- current focus: none
- blockers: none

## Next useful action

review the upward signal in the local diff, then explicitly authorize a commit
and push when it is ready to join the live constellation.

## Re-entry notes

- configuration required: none
- persistent state: none
- external dependencies: google fonts and the separately owned satellite sites
- recovery warning: a push to `main` invokes the pages deployment workflow
