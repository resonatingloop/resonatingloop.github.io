# resonating loop

Maria Colette's personal site. Plain HTML/CSS/JS, no build step.

## View it

Open `index.html` in a browser. That's it — no server, no install.

For a more realistic localhost (correct font loading, etc.):

```sh
python3 -m http.server
# then visit http://localhost:8000
```

## Structure

```
index.html   the page
style.css     design tokens at top — the main thing to tweak
main.js       the resonance-ring interaction (added in slice 2)
writing/      stub for later essays/notes
```

## Status

**v0, not deployed.** This repo has a remote but going live is a deliberate
choice, made when it's ready — not a default. Build first, ship on purpose.

## Tweaking the design

Open `style.css`. Everything visual is a CSS custom property in `:root` at
the top, each commented with what it does. Change a token once and the whole
page re-tunes — start with `--space-unit` and `--size-name`.
