# resonatrix station status

> **continuity role:** operational checkpoint  
> **status:** current  
> **last verified:** 2026-09-21
> **owns:** verified current state, active work, known gaps, and next useful action  
> **update when:** a meaningful stopping point changes any of those facts

## Verified checkpoint

the accepted resonatrix station revamp is complete in the local worktree. the
homepage now exposes an unequal constellation of geogematria, cyphers.news,
and cootie oracle; writing visibility fails closed; and a single github pages
workflow owns the eleventy artifact. on fine-pointer screens the work rests as
sigils only: geogematria and cyphers mirror one another across the upper field,
their names resolving on hover or keyboard focus. touch layouts retain the full
readouts. a high-contrast `◎` favicon now compresses the station's listening
reticle into a bone loop and ember core that remains distinct at 16px.

verification performed:

```text
npm test
npm run build
node --check main.js
python3 /home/resonatingloop/.codex/skills/manage-project-docs/scripts/check_docset.py .
git diff --check
rendered inspection at 1490x827 and 390x844
rendered inspection of rest, cyphers hover, and non-hover fallback states
```

evidence of success:

```text
4 node tests pass.
eleventy copies 3 files and writes 15 files.
desktop rest, desktop hover, and mobile fallback states render without
navigation or utility collisions.
favicon inspected at 16px, 32px, 64px, and 128px on dark and light fields.
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
- the homepage and writing document shell both reference `/favicon.svg`; the
  eleventy artifact includes that asset.

## Incomplete or broken

- the favicon changes have not been pushed or deployed; the live site keeps its
  current icon behavior until the owner authorizes publication.

## Active work

- accepted spec: none; retired at `specs/resonatrix-station-revamp.md`
- current focus: none
- blockers: none

## Next useful action

review the favicon in the local diff, then explicitly authorize a commit and
push when it is ready to become the live icon.

## Re-entry notes

- configuration required: none
- persistent state: none
- external dependencies: google fonts and the separately owned satellite sites
- recovery warning: a push to `main` invokes the pages deployment workflow
