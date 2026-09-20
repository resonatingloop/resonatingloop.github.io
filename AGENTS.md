# resonatrix station agent guide

this file governs coding agents working in this repository. read it before
acting.

## required reading and authority

1. `README.md` is the operational front door and documentation map.
2. `STATUS.md` owns the last verified checkpoint and next useful action.
3. an accepted file under `specs/` owns its bounded transition until retired.
4. `lib/visibility.js` owns valid writing visibility values.

current user instructions govern the requested slice. if sources disagree,
identify which representation owns the fact and surface unresolved conflicts
before editing.

## authorization

- discussion, exploration, planning, resume, and audit are read-only unless the
  user explicitly requests changes.
- a direct bounded change request authorizes that change.
- substantial, ambiguous, or cross-cutting implementation requires an
  explicitly accepted spec. only the user may accept it.
- local implementation does not authorize a push, github pages deployment,
  dns change, repository-setting change, or edit to a satellite repository.

## project boundaries

- this repository owns the root `resonatrix.tech` homepage and its eleventy
  writing artifact.
- `/geomatria/` and `/cootie-oracle/` are deployed from separate repositories;
  treat their urls as external integration points here.
- `cyphers.news` is an external site. do not change it from this repository.
- preserve the writing visibility boundary: public enters publication
  surfaces; unlisted is direct-url plus `noindex,nofollow` and excluded from
  collections; private never enters `_site`.
- unlisted source is not secret, but do not dump or rewrite writing bodies when
  a task only requires structure, metadata, or publication checks.
- do not add dependencies, analytics, a backend, or runtime storage without a
  separately accepted transition.
- preserve semantic anchors, keyboard focus, narrow-screen navigation, and
  reduced-motion behavior during visual work.

## common commands

```text
npm ci
npm test
npm run build
npm run dev
python3 /home/resonatingloop/.codex/skills/manage-project-docs/scripts/check_docset.py .
git diff --check
```

## working protocol

before changing files:

1. read the governing documents for the task;
2. inspect version-control status and preserve unrelated work;
3. state the authorized slice and its likely proof.

during implementation, work by invariant, use `apply_patch` for edits, and run
focused proof after each meaningful chunk. rendered appearance and automated
mechanics are separate proof obligations for user-visible work.

before completion:

1. revisit the accepted spec's change-shape matrix when applicable;
2. reconcile code, delivery, privacy, tests, and affected documentation;
3. update `STATUS.md` at the new checkpoint and retire a completed spec;
4. run the complete validation listed above;
5. report unverified external state and the next authorized transition.

## stop and ask

- a normative visibility or deployment contract must change;
- the request expands into a satellite repository;
- the task would publish, push, delete user writing, or change external state;
- verification requires destructive, privileged, or materially costly action;
- the requested change exceeds the authorized slice.
