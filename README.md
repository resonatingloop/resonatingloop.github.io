# resonatrix station

maria colette's personal site, published at
[resonatrix.tech](https://resonatrix.tech/). the homepage is a hand-authored
html/css/js instrument assembled by [eleventy](https://www.11ty.dev/); the same
build owns the direct-url writing chamber.

## run and prove it

```sh
npm ci
npm test
npm run dev
```

the production artifact is `_site/`:

```sh
npm run build
```

`npm test` validates visibility metadata and builds into a temporary directory
to prove that unlisted pages receive the full document shell and noindex
metadata without publishing an empty archive.

## structure

```text
index.njk                  the home plate and corpus-aware signal field
favicon.svg                the station's high-contrast listening reticle
style.css                  visual tokens, layout, motion, and prose chamber
main.js                    pointer listening, ripples, and signal tuning
writing/
  index.njk                public archive; absent while no public texts exist
  **/*.md                  public or unlisted writing with explicit metadata
  writing.11tydata.js      layouts and output routing for the whole tree
lib/
  visibility.js            valid visibility values
  writing-metadata.js      fail-closed source validation
_includes/                 post and document layouts
_drafts/                   private writing; ignored and gitignored
tests/                     visibility and built-artifact proof
specs/                     accepted/retired transition records
.github/workflows/pages.yml  the single pages build and deployment path
```

## authority map

- `README.md` — operational/current front door.
- `AGENTS.md` — agent authorization, boundaries, and close protocol.
- `STATUS.md` — current verified checkpoint and next action.
- `specs/*.md` — accepted or retired transition records.
- source and tests — implemented behavior and executable proof.

## writing visibility

every markdown file under `writing/` declares `visibility:` as exactly one of:

- `public` — enters the public writing collection. once at least one exists,
  the archive and homepage `texts` signal are emitted by the build.
- `unlisted` — builds a direct-url page with `noindex,nofollow` and must set
  `eleventyExcludeFromCollections: true`. unlisted means unadvertised, not
  secret; the source remains in this repository.
- `private` — never enters the production artifact. private work belongs in
  `_drafts/`, which eleventy and git both ignore.

missing, mistyped, or collection-leaking metadata fails the build before any
output is produced. `lib/visibility.js`, `lib/writing-metadata.js`, and
`writing/writing.11tydata.js` jointly own this boundary.

## published topology

- `/geomatria/` is geogematria's separately deployed public atlas.
- `/cootie-oracle/` is the separately deployed field oracle.
- `cyphers.news` is an external collective signal.

those projects keep their own repositories and release procedures. this repo
owns only the homepage links to them.

## deployment

pushes to `main` trigger the one pages workflow: install, test, build `_site/`,
then deploy that artifact. local implementation does not imply authorization to
push or deploy; inspect `git status` before either transition.

## design tuning

the stable premise is a dark desert instrument with unequal signal gravity:
geogematria holds the field, cyphers transmits outward, and cootie oracle folds
one mischievous corner. start with the custom properties at the top of
`style.css`; preserve semantic anchors, focus visibility, narrow-screen
readouts, and reduced-motion behavior while tuning the plate.
