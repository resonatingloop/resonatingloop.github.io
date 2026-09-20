# spec: resonatrix station revamp

status: retired

> **continuity role:** accepted transition  
> **owner:** maria colette  
> **created:** 2026-09-20  
> **supersedes:** none

## context

`resonatrix.tech` is live, but the homepage still behaves as a sealed identity
plate. the accepted transition preserves that plate while giving it an unequal
constellation of actual destinations. the same slice repairs the competing
github pages workflows and restores the intended fail-closed writing boundary.

## scope

in:

- preserve the existing dark plate, rings, typography, latin, and listening
  behavior;
- add `desert resonatrix` as an explicit epithet without displacing
  `maria colette` or `the loop resonates`;
- make geogematria the primary signal, cyphers.news an outbound collective
  signal, and cootie oracle a peripheral folded-corner signal;
- demote social links to a quiet utility rail;
- publish a writing coordinate only when a public text exists;
- consolidate pages deployment around the eleventy artifact;
- restore unlisted/private visibility behavior and add executable proof;
- reconcile the readme with the implemented system.

out:

- changes to geogematria, cootie oracle, or cyphers.news;
- publishing or rewriting any text;
- dns, github repository settings, push, or deployment;
- analytics, backend work, a framework migration, or a projects index.

## governing contracts and decisions

- current user authorization and this accepted spec;
- `lib/visibility.js` owns valid visibility values;
- unlisted means direct-url access with `noindex,nofollow`, never secret;
- private means absent from the production artifact;
- the existing page aesthetic is the base material, not a disposable mockup.

## change shape

| dimension | changed? | source of truth | proof |
|---|---:|---|---|
| user-visible behavior | yes | homepage html, css, and js | rendered desktop/mobile interaction |
| persisted state or schema | no | no persistence introduced | source inspection |
| external or provider-visible behavior | yes | github pages artifact and outbound links | workflow inspection and route smoke |
| identifiers, secrets or privacy | yes | writing metadata and visibility rulebook | build-output tests |
| lifecycle or terminal states | no | n/a | source inspection |
| setup, operation or recovery | yes | pages workflow and readme | clean ci-equivalent build |
| normative contract or decision | yes | this spec | owner acceptance |
| cross-repository dependency | yes | published satellite urls | live read-only smoke; no satellite edits |

## implementation by invariant

1. one workflow builds and deploys `_site`; raw repository contents are never
   the pages artifact.
2. every writing source declares valid visibility; unlisted work is built with
   noindex metadata and excluded from collections, private work is not emitted,
   and invalid metadata fails the build.
3. the homepage remains the existing plate while semantic anchors express
   unequal project gravity without hover or javascript dependence.
4. pointer, keyboard, touch, narrow-screen, and reduced-motion presentations
   preserve the same navigation semantics.
5. repository documentation and automated checks describe and prove the new
   operational truth.

## done when

- the accepted identity and project hierarchy are visible and usable;
- writing publication and collection behavior match the visibility contract;
- exactly one pages workflow deploys a successful eleventy build;
- node tests, production build, rendered inspection, document checks, and
  `git diff --check` pass;
- deployment remains unperformed pending separate authorization.

## risks and unknowns

- satellite routes are owned by separate repositories and can only be smoke
  checked here;
- the folded-corner treatment must not collide with mobile utilities;
- google fonts remain an existing third-party runtime dependency.

## open questions

- none.
