# resonatrix station status

> **continuity role:** operational checkpoint  
> **status:** current  
> **last verified:** 2026-09-20  
> **owns:** verified current state, active work, known gaps, and next useful action  
> **update when:** a meaningful stopping point changes any of those facts

## Verified checkpoint

the accepted resonatrix station revamp is complete in the local worktree. the
homepage now exposes an unequal constellation of geogematria, cyphers.news,
and cootie oracle; writing visibility fails closed; and a single github pages
workflow owns the eleventy artifact.

verification performed:

```text
npm test
npm run build
node --check main.js
python3 /home/resonatingloop/.codex/skills/manage-project-docs/scripts/check_docset.py .
git diff --check
rendered inspection at 1440x1000, 1366x650, and 390x844
rendered inspection with reduced motion and focused signal states
```

evidence of success:

```text
4 node tests pass.
eleventy copies 2 files and writes 15 files.
desktop, short-laptop, mobile, reduced-motion, and tuned states render without
navigation or utility collisions.
```

## Working now

- `/` is an eleventy template with semantic work links and quiet utilities.
- `/geomatria/` remains the primary local instrument route.
- `https://cyphers.news/` is visibly marked as the outbound collective signal.
- `/cootie-oracle/` remains a subordinate folded-corner route.
- current unlisted writing emits direct-url pages with `noindex,nofollow` and
  stays out of collections; private writing does not emit.
- the `texts` coordinate and `/writing/` archive appear only when a public text
  exists.
- `.github/workflows/pages.yml` is the sole pages deployment workflow.

## Incomplete or broken

- the local changes have not been pushed or deployed; the live site still
  presents the previous homepage until the owner authorizes publication.

## Active work

- accepted spec: none; retired at `specs/resonatrix-station-revamp.md`
- current focus: none
- blockers: none

## Next useful action

review the local diff, then explicitly authorize a commit and push when this
version is ready to become the live machine.

## Re-entry notes

- configuration required: none
- persistent state: none
- external dependencies: google fonts and the separately owned satellite sites
- recovery warning: a push to `main` invokes the pages deployment workflow
