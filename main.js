/* =========================================================================
   resonating loop — main.js
   -------------------------------------------------------------------------
   Slice 2: wake the instrument. The CSS already breathes on its own; this
   file adds the *listening* — the reticle leans toward the cursor, brightens
   as you near centre, tilts to track, answers a click with a ripple, trails a
   faint PHOSPHOR AFTERIMAGE, and lets semantic work links tune the field.

   The trail is real ghost copies of the reticle that ease toward the pointer
   more slowly + sit dimmer, so motion smears and rest converges.

   Each layer gets a transform:  translate(drift) rotate(tilt)
   The svg gets one var:         --engage  (0..1 nearness → brightness)

   To re-tune the feel, change the constants in TUNING below (and the ghost
   opacities live in style.css → .reticle--g1 / --g2).
   ========================================================================= */
(() => {
  'use strict';

  const rings   = document.getElementById('rings');
  const reticle = document.getElementById('reticle');
  const plate   = document.querySelector('.plate');
  if (!rings || !reticle || !plate) return;

  /* --- TUNING ---------------------------------------------------------- */
  const EASE_LIVE = 0.14;   // how fast the real reticle chases the pointer
  const EASE_G1   = 0.07;   // first ghost — laggier → trails
  const EASE_G2   = 0.04;   // second ghost — laggiest → longest tail
  const EASE_EN   = 0.08;   // brightness easing
  const DRIFT     = 0.05;   // how hard the reticle leans toward the pointer
  const DRIFT_MAX = 16;     // clamp on the lean (svg user units)
  const SPIN      = 0.05;   // fraction of pointer-angle the reticle tips
  const SPIN_MAX  = 7;      // deg clamp on the tilt
  const RIPPLE_MS = 900;    // click-answer duration

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = (v, m) => Math.max(-m, Math.min(m, v));
  const lerp  = (a, b, t) => a + (b - a) * t;

  /* shared target the layers chase; each layer keeps its own eased current */
  const tgt = { dx: 0, dy: 0, sp: 0, en: 0 };
  let curEn = 0;
  const layers = [];       // [{ el, ease, dx, dy, sp }]  — live first, ghosts behind
  let built = false;
  let rafId = null;

  /* build the ghost trail once: two dimmer, laggier clones BEHIND the live one */
  function buildGhosts() {
    const g2 = reticle.cloneNode(true);
    const g1 = reticle.cloneNode(true);
    [g1, g2].forEach(g => { g.removeAttribute('id'); g.classList.add('reticle--ghost'); });
    g1.classList.add('reticle--g1');
    g2.classList.add('reticle--g2');
    reticle.parentNode.insertBefore(g2, reticle);   // furthest back
    reticle.parentNode.insertBefore(g1, reticle);   // mid
    layers.push(
      { el: g2,      ease: EASE_G2, dx: 0, dy: 0, sp: 0 },
      { el: g1,      ease: EASE_G1, dx: 0, dy: 0, sp: 0 },
      { el: reticle, ease: EASE_LIVE, dx: 0, dy: 0, sp: 0 }
    );
  }

  function frame() {
    let active = false;

    for (const L of layers) {
      L.dx = lerp(L.dx, tgt.dx, L.ease);
      L.dy = lerp(L.dy, tgt.dy, L.ease);
      L.sp = lerp(L.sp, tgt.sp, L.ease);
      L.el.style.transform =
        `translate(${L.dx.toFixed(2)}px, ${L.dy.toFixed(2)}px) rotate(${L.sp.toFixed(2)}deg)`;
      if (Math.abs(L.dx - tgt.dx) > 0.04 ||
          Math.abs(L.dy - tgt.dy) > 0.04 ||
          Math.abs(L.sp - tgt.sp) > 0.04) active = true;
    }

    curEn = lerp(curEn, tgt.en, EASE_EN);
    rings.style.setProperty('--engage', curEn.toFixed(3));
    if (Math.abs(curEn - tgt.en) > 0.002) active = true;

    rafId = active ? requestAnimationFrame(frame) : null;
  }
  function kick() { if (rafId === null) rafId = requestAnimationFrame(frame); }

  /* pointer → shared target --------------------------------------------- */
  function onMove(e) {
    const r = rings.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    const dist = Math.hypot(dx, dy);
    const maxd = Math.max(window.innerWidth, window.innerHeight) / 2;

    tgt.en = Math.max(0, 1 - dist / maxd);          // 1 at centre → 0 far away
    tgt.dx = clamp(dx * DRIFT, DRIFT_MAX);
    tgt.dy = clamp(dy * DRIFT, DRIFT_MAX);
    tgt.sp = clamp((Math.atan2(dy, dx) * 180 / Math.PI) * SPIN, SPIN_MAX);
    kick();
  }
  function onLeave() {
    tgt.dx = tgt.dy = tgt.sp = tgt.en = 0;           // ease everything back to rest
    kick();
  }

  /* click-answer: a ripple expanding from the touch point --------------- */
  const SVGNS = 'http://www.w3.org/2000/svg';
  function onDown(e) {
    if (e.target.closest('a')) return;               // let links be links

    const r = rings.getBoundingClientRect();
    const vx = ((e.clientX - r.left) / r.width)  * 400 - 200;   // → -200..200 viewBox
    const vy = ((e.clientY - r.top)  / r.height) * 400 - 200;

    const c = document.createElementNS(SVGNS, 'circle');
    c.setAttribute('class', 'ripple');
    c.setAttribute('cx', vx.toFixed(1));
    c.setAttribute('cy', vy.toFixed(1));
    c.setAttribute('r', '1');
    c.style.transformBox = 'fill-box';
    c.style.transformOrigin = 'center';
    rings.appendChild(c);

    c.animate(
      [{ transform: 'scale(0)',   opacity: 0.55 },
       { transform: 'scale(150)', opacity: 0    }],
      { duration: RIPPLE_MS, easing: 'cubic-bezier(.2,.6,.2,1)' }
    ).onfinish = () => c.remove();
  }

  /* wire up, honouring reduced-motion ----------------------------------- */
  function enable() {
    if (!built) { buildGhosts(); built = true; }
    plate.addEventListener('pointermove', onMove);
    plate.addEventListener('pointerleave', onLeave);
    plate.addEventListener('pointerdown', onDown);
  }
  function disable() {
    plate.removeEventListener('pointermove', onMove);
    plate.removeEventListener('pointerleave', onLeave);
    plate.removeEventListener('pointerdown', onDown);
    onLeave();                                        // settle back to a still instrument
  }

  /* work signals tune the plate without becoming nonstandard controls. The
     anchors still navigate normally; hover and keyboard focus merely expose
     their local field state. */
  const signals = [...plate.querySelectorAll('[data-tune]')];
  const tune = (name = 'idle') => { plate.dataset.tuned = name; };

  for (const signal of signals) {
    const name = signal.dataset.tune;
    signal.addEventListener('pointerenter', () => tune(name));
    signal.addEventListener('pointerleave', () => {
      if (document.activeElement !== signal) tune();
    });
    signal.addEventListener('focus', () => tune(name));
    signal.addEventListener('blur', () => tune());
  }

  if (!reduce.matches) enable();
  reduce.addEventListener('change', e => (e.matches ? disable() : enable()));
})();
