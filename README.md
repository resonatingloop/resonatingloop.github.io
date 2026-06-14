# resonating loop

Maria Colette's personal site. The home page is hand-written HTML/CSS/JS; the
writing section is built with [Eleventy](https://www.11ty.dev/).

## Run it

```sh
npm install            # once
npx @11ty/eleventy --serve   # dev server with live reload
# or: npm run dev
```

Build to `_site/` for deploy:

```sh
npm run build
```

The home page (`index.html`) is also still openable directly in a browser —
it's passthrough-copied verbatim and never templated.

## Structure

```
index.html   the home "plate" — passthrough, untouched by the build
style.css     design tokens at top — the main thing to tweak
main.js       the resonance-ring interaction
writing/
  index.njk          the public archive (lists public posts only)
  posts/             markdown posts (public + unlisted) with frontmatter
  posts/posts.11tydata.js   the visibility CHOKEPOINT
lib/visibility.js    the visibility RULEBOOK (read this to know every rule)
_includes/           layouts (base.njk sets noindex for unlisted)
_drafts/             private posts — ignored by the build, gitignored
eleventy.config.js   the build
```

## Writing & visibility

Every post in `writing/posts/` must declare `visibility:` in its frontmatter —
one of `public`, `unlisted`, or `private`. A missing or mistyped value **fails
the build** (it never silently defaults to public).

- **public** — in the archive (and later rss/sitemap/search).
- **unlisted** — builds a real route, reachable by direct URL, `noindex,nofollow`,
  but absent from the archive/feeds. (Its markdown still lives in the repo —
  unlisted means "not advertised," not "secret.")
- **private** — never built. Lives in `_drafts/` (build can't see it; gitignored).

All the filtering logic is in two files: `lib/visibility.js` and
`writing/posts/posts.11tydata.js`.

## Status

**v0, not deployed.** This repo has a remote but going live is a deliberate
choice, made when it's ready — not a default. Build first, ship on purpose.

## Tweaking the design

Open `style.css`. Everything visual is a CSS custom property in `:root` at
the top, each commented with what it does. Change a token once and the whole
page re-tunes — start with `--space-unit` and `--size-name`.
