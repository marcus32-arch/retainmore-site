# RetainMore Site Escalation: BUILD SPEC

Repo: `/Users/marcusarena/retainmore-site/` (static HTML/CSS/vanilla JS, GitHub Pages, no build step, no libraries)
Files in scope: `index.html`, `style.css`, `site.js`, `how-it-works.html`, `pricing.html`, `about.html`

## Non-negotiables (verify against every change)

- **Brand pinned.** `--ink: #F6F2E9` paper, `--signal: #0E5C4C` teal, DM Serif Display headings, Inter body. Single light theme. The only dark surface allowed is the `#0A4238` anchor band. JetBrains Mono is retired; `--font-mono` is already aliased to Inter, never reintroduce monospace.
- **Artifacts, not text blocks.** Every new set piece renders an object from a clinic's day (diary row, SMS, form card, wire). No stock photos, no illustrations of people, no icon packs.
- **Reduced motion and no-JS are mandatory on every treatment.** Pattern already established in `style.css` lines 431-437 and 490-500: no JS means everything visible in final state; `prefers-reduced-motion: reduce` means final state instantly, never a half-drawn or invisible element.
- **No libraries, no WebGL, no parallax (standing ruling), no horizontal scroll hijack, no marquee of logos.**
- **Honesty constraints on motion:** a number may only animate if it is (a) a cited third-party figure, (b) the visitor's own calculator output, or (c) our own published price/conduct. Never animate an invented or implied-result number. No fake client logos, testimonials, or activity feeds. SMS template examples must never solicit reviews, mention treatment outcomes, or imply clinical triage.
- **Copy rules in any new strings:** no em-dashes or en-dashes, no emoji, no "seamless/leverage/delve", AU formats (0412 345 678, "4:12 pm", GPCCMP never EPC).

---

## Part 1: Ranked treatments

### 1. Sticky scrollytelling "How it works" (index) — THE WOW, build first
Full spec in Part 4. Replaces the flat three-card `.workflow` grid in the "How it works" section of `index.html` (lines 346-369). Effort: 1 to 1.5 days.

### 2. House motion system: easing tokens + stateful hover/press (site-wide)
**Where:** `style.css`, every `transition` declaration.
**Approach:** Add to `:root`:
```css
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);   /* entrances, hover; already used ad hoc in reveal-l */
--ease-swift: cubic-bezier(0.32, 0.72, 0, 1); /* larger moves, state swaps */
--dur-press: 140ms; --dur-hover: 200ms; --dur-reveal: 600ms;
```
Sweep every existing `transition: ... 0.2s` / `0.25s` / `ease-out` (nav links, `.btn-primary`, `.btn-ghost`, `.tier`, `.workflow-step`, `.tier-cta`, `.faq-q .plus`, footer links) onto the tokens. Then add missing states, gated behind `@media (hover: hover) and (pointer: fine)`:
- `.btn-primary`, `.nav-cta`, `.tier-cta`: `:active { transform: scale(0.98); }` at `--dur-press`; hover keeps the existing lift and adds a teal-tinted shadow `0 6px 18px -8px rgba(14, 92, 76, 0.35)`. Never grey shadows on paper.
- `.leak`, `.workflow-step`, `.tier`, `.card`, `.contact-card`: hover `translateY(-2px)` + `border-color: var(--signal-border)`.
- Text links (footer, `.stat-source a`, prose links): left-growing underline via `::after` with `transform: scaleX(0)` to `1`, `transform-origin: left`, `--dur-hover`.
Only `transform`, `opacity`, `box-shadow`, `border-color` ever animate.
**Effort:** half day. **Why rank 2:** invisible as a feature, felt everywhere; it is the single-physics consistency that reads as engineered.

### 3. Living leak artifacts (index, `#problem` section, lines 228-267)
**Where:** the three `.leak` cards: SMS thread, form card, did-not-attend row.
**Approach:** Copy the diary's proven pattern (`style.css` lines 328-353, `site.js` lines 43-56). One IntersectionObserver (threshold 0.4, fire once) adds `.play` to `.leaks`; CSS keyframes choreograph each card with `animation-delay`, all elements present in DOM from the start:
- **SMS card:** bubble slides in (`stamp-in`, 0.3s delay), `.sms-meta` at 0.9s, then `.sms-none` ("No reply ever sent") fades in at 1.8s and holds. The failure lands as an event, not a caption.
- **Form card:** `.fc-row` lines cascade 0.3s apart, then the `stamp-cancel` "Unread until Mon 8:32 am" pops at 1.6s using the existing `stamp-in` keyframe.
- **DNA card:** strike-through draws over "Call James to rebook" reusing the existing `strike-in` keyframe at 1.2s, "Did not attend" stamp pops at 0.6s.
These cards show only the leak. The fix lives in the scrolly section (treatment 1), which is the narrative split: problem cards break, the pinned artifact repairs.
**Reduced motion / no-JS:** exactly the diary's existing block: `animation: none; opacity: 1;` and full-width strike.
**Effort:** 1 day.

### 4. Calculator as instrument (index, `#calculator`, lines 312-344 + `site.js` lines 58-84)
**Where:** `.calc-out-month` and `.calc-out-year` only. Copy, layout, and honesty lines untouched.
**Approach:** ~40 lines in `site.js`. On input, animate the displayed value from current to target over 300ms with a requestAnimationFrame ease-out lerp; yearly figure starts 80ms after monthly. Add `font-variant-numeric: tabular-nums` to `.calc-out-month` and `.calc-out-year b` so digits never jitter. Sliders drive it continuously while dragging.
**Accessibility:** the animating span gets `aria-hidden="true"`; keep a visually-hidden sibling inside the existing `aria-live="polite"` node updated once per input event with the final value, so screen readers hear one announcement, not sixty frames.
**Reduced motion:** `matchMedia` check already in `site.js` line 12; if reduced, set final value directly.
**Effort:** half day. Also add the one legal counter elsewhere: the `$114,827` stat (cited, BMJ Open) counts up over 1.1s on entry via the same lerp, fired once by the existing `.reveal` observer. The "8 to 10%" range and "3 systems" stay static; ranges and small integers do not tick naturally.

### 5. Paper-sheet section overlaps + broken rhythm (site-wide)
**Where:** every full-bleed band: the `--ink-2` "Why RetainMore" band (index line 270), pricing preview band (index line 388), anchor band, and the equivalent bands on subpages.
**Approach:** pure CSS. Each band becomes a sheet: `border-radius: 28px 28px 0 0; margin-top: -28px; position: relative; z-index: 1 (incrementing per sheet); box-shadow: 0 -14px 30px rgba(23, 20, 9, 0.05);`. The page reads as lapped sheets of paper, which converts the grain texture into the structural metaphor. While in there, break the uniform `padding: 100px 48px`: claim sections (problem, honest, CTA) get ~140px vertical, utility sections (stats, compliance strip) get ~72px, and let the diary keep overhanging its column. Replace the hard hairline `border-top/bottom` pairs on the bands with the sheet edge.
**Effort:** half to 1 day including regression checks at 900px and 480px. No JS, no fallback needed.

### 6. Background dip into the anchor band (index + all pages once their CTA gets `.anchor`)
**Where:** `body` + `.cta-band.anchor`.
**Approach:** `body { transition: background-color 0.6s var(--ease-swift); }`. One IntersectionObserver with `rootMargin: '-45% 0% -45% 0%'` on the anchor band toggles `body.dipped`; when set, `body` background goes `#0A4238` and `.cta-band.anchor` background goes transparent, so the whole viewport breathes dark at the ask, then recovers on exit. The band keeps its own dark background as default, so no-JS and non-observing browsers see exactly today's hard-edged band.
**Reduced motion:** skip the observer entirely (band stays self-contained, as now).
**Note:** the paper-grain `body::before` overlay sits above the dip; at `opacity: 0.14` it reads fine on the dark ground, verify visually.
**Effort:** 2 to 3 hours.

### 7. CSS scroll-driven upgrade layer for reveals (site-wide, progressive)
**Where:** `.reveal`, `.reveal-l`, `.stagger` rules (`style.css` lines 431-437, 490-500).
**Approach:** behind `@supports (animation-timeline: view())`, rebind the same motions as scrubbing keyframes:
```css
@supports (animation-timeline: view()) {
  .js .reveal-l { transition: none; opacity: 1; transform: none;
    animation: kf-reveal-l both; animation-timeline: view();
    animation-range: entry 10% entry 45%; }
  /* kf-reveal-l: from { opacity: 0; transform: translateX(-40px); } */
}
```
Inside the `@supports` block the class-based `.in` transition must be fully neutralised (as above) so the two systems never double-fire. The existing IntersectionObserver path stays untouched as the Firefox/older-Safari fallback. Everything remains inside the `prefers-reduced-motion` guard.
**Effort:** half day. Elements track the scrubber instead of popping once, which reads engineered rather than AOS-plugin.

### 8. Workflow wire SVG (how-it-works page, new set piece)
**Where:** new full-width artifact band inserted between the page hero and "The universal pillars" in `how-it-works.html`.
**Approach:** hand-authored inline SVG in the site's ink language: 1.5px `--signal` strokes, rounded caps, four labelled nodes in letterspaced Inter 600 caps: `Your booking system (Cliniko · Nookal · Halaxy)` -> `RetainMore rules` -> `Your patient's phone` -> back into `Your diary`. It depicts the real data flow: event in, fixed rule fires, SMS out, reply lands back in the diary. On entry (existing observer adds `.play`): each path draws via `stroke-dasharray`/`stroke-dashoffset` (`path.getTotalLength()` set inline as a CSS var to avoid layout read at scroll time), 0.6s per segment, staggered; afterwards a 4px teal dot loops the path with SVG `<animateMotion>`.
**Reduced motion:** full static drawing, no dot loop (`animateMotion` gated by adding it only when `!reduced` in JS, or `display: none` on the dot). **No-JS:** full static drawing (default state is drawn; `.play` starts the draw by first zeroing dashoffset only when JS adds a `.js`-scoped rule, same convention as reveals).
**Effort:** 1 day, of which the SVG authoring is most of it. This was already listed as a future artifact in `DESIGN-DIRECTION.md`.

### 9. Editorial typography and anti-template sweep (site-wide)
**Where:** `style.css` + a copy-punctuation pass.
**Approach:** `text-wrap: balance` extended to all h2/h3 (currently h1/h2 only); `text-wrap: pretty` on `p`; `hyphens: none`; max measure ~65ch already roughly held, formalise it; curly quotes and apostrophes in copy; radius by role instead of near-uniform: chips/pills stay full, diary rows 6px, cards 10-12px (mostly true already, audit the strays); confirm every shadow is warm-tinted. One deliberate scale break: promote the `.stat-number` holding `$114,827` to `clamp(56px, 7vw, 96px)` so the page has a single oversized serif moment paired with its citation.
**Effort:** half day.

### 10. Invisible robustness: fonts and layout stability (site-wide)
**Where:** all six HTML heads + `style.css`.
**Approach:** self-host DM Serif Display (400 regular + italic) and Inter (300/400/500/600, or the variable file) as woff2 in `/fonts/`, `@font-face` with `font-display: swap` plus metric-compatible fallbacks (`size-adjust`, `ascent-override` against Georgia and system-ui) so text never visibly reflows. **Delete JetBrains Mono from the Google Fonts request entirely; it is retired but still downloaded on every page (`index.html` line 22 and equivalents), which is dead weight.** Then remove the Google Fonts links and preconnects. Give every artifact card an `aspect-ratio` or `min-height` so nothing shifts as JS lands.
**Effort:** half day. This is the deepest "safe pair of hands" proxy: the site never glitches on front-desk hardware.

### Explicitly rejected (do not build)
- Horizontal-scroll timeline: reads design-agency, flirts with "crazy intense".
- Any marquee: no clients means no logo strip, and a looping texture band adds noise, not trust.
- Paper-stack sticky cards on the leaks: conflicts with treatment 3, and stacking hides two of the three artifacts at any given scroll position.
- Scroll progress hairline: nav already carries a border; skip.

---

## Part 2: Keep untouched

- **The diary hero** (index lines 184-207, CSS 295-353): built, proven, the reference implementation every new animation copies. Do not re-time it.
- **The honest section** ("We'd rather show you the audit than a wall of logos", index lines 371-386): the most anti-template element on the site. Copy and structure frozen; it may receive `.reveal` only.
- **Calculator copy and logic**, including `.calc-honest` and `.calc-privacy` lines. Only the output animation layer changes (treatment 4).
- **Stats band copy, citations, and sources** (index lines 210-226). Only the one count-up and the scale break apply.
- **Nav**: the no-JS wrap-instead-of-hamburger decision (style.css comment, lines 52-54) stays. No mobile menu JS.
- **Focus styles** (lines 262-275), **paper grain** (`body::before`), **the single dark anchor band color `#0A4238`**, `:root` palette values, selection color.
- **The reveal/reveal-l/stagger IntersectionObserver system in `site.js`** including the anchor-jump sweep (lines 8-41): it becomes the fallback layer, never deleted.
- **Comparison table content** on how-it-works (the audit is the differentiator; rows may cascade in, cells do not change).
- **All copy site-wide** unless a treatment explicitly adds strings; new strings follow the brand rules verbatim.
- **Schema.org JSON-LD, meta tags, canonical URLs, footer, ABN line.**

---

## Part 3: Page-by-page plan (subpages currently have zero scroll choreography)

First step on all three pages, before anything bespoke: add the existing `reveal-l` class to every `.section-label` and `h2`, `.reveal` to standalone blocks, `.stagger reveal` to grids, and add `.anchor` to each page's `.cta-band` so the dark band and theme dip (treatment 6) work everywhere. This alone lifts the subpages to the index's current baseline in about an hour per page.

### how-it-works.html
1. Choreography baseline as above; `.card-grid` pillars and `.process-steps` get `stagger`.
2. **Workflow wire SVG** (treatment 8) inserted as a new band directly under the page hero. This page's job is "we are the tech experts"; the wire is its artifact.
3. **Comparison table entrance:** wrap rows so `tbody tr` participate in a stagger (add a scoped rule `.js .tbl-wrap.stagger-rows tr { ... }` mirroring the stagger pattern with per-row `transition-delay`); "real gap" cells stay static amber text, no pulsing.
4. **Process steps rail:** a 1px `--rule` vertical line down the left of `.process-steps` that scales `scaleY` 0 to 1 via `animation-timeline: view()` behind `@supports`, static full-height otherwise. `.process-num` inherits the house entrance.
5. Sheet treatment (5) on the `--ink-2` PMS band; hover states (2) on `.card`.
Effort: 1.5 days including the wire.

### pricing.html
1. Choreography baseline; `.tiers` gets `stagger reveal`, featured tier arrives 60ms early with a 4px lift so hierarchy is felt in motion order. Prices do not count up; a published price should feel fixed, not rolling.
2. **Hover/press system** (treatment 2) matters most here: `.tier` lift + border shift, `.tier-cta` press state, contact cards lift.
3. **FAQ open animation:** keep the `<details>` foundation. Behind `@supports (interpolate-size: allow-keywords)` add `::details-content` height transition at `--dur-hover`; otherwise opens instantly as today. Rotate the `.plus` with `--ease-out`.
4. **Tabular numerals** on `.tier-price` and `.mini-tier-price` (treatment 9).
5. Sheet treatment on the FAQ band; `.anchor` + dip on the contact section is not appropriate here because `#contact` is a paper section with cards, so instead give pricing's CTA card pair the standard reveal and leave the band light. (Only true `.cta-band` sections dip.)
Effort: 1 day.

### about.html
1. Choreography baseline on hero and prose headings.
2. **The single word-by-word manifesto reveal, used exactly once site-wide, here.** Target the opening paragraph ("Most 'AI for clinics' pitches lead with the AI. We lead with the result: fewer empty appointment slots..."). At load, JS splits it into per-word `<span>`s (guarded: if JS absent, paragraph is untouched full-ink text). Words transition `color` from `--muted` to `--off-white` as the paragraph crosses the viewport: `animation-timeline: view(); animation-range: entry 45% entry 75%` with tiny per-word delays behind `@supports`; fallback is one scroll listener mapping paragraph progress to an `.inked` word count. Text is never hidden, only de-emphasised; reduced motion renders full ink instantly.
3. **Byline entrance:** `.byline` gets `.reveal`; the `.byline-mark` circle scales from 0.9 with the house ease. Small, no signature-drawing gimmick.
4. Typography pass (treatment 9) hits hardest here: `text-wrap: pretty`, curly punctuation, 65ch measure on `.prose`.
Effort: half day.

---

## Part 4: The wow moment, exact build

**The pinned "how it works" scrollytelling on index.** It replaces the flat `.workflow` three-card grid (index lines 351-367) with the site's centrepiece: three scroll steps on the left, one pinned clinic-artifact card on the right that changes state as each step crosses the midline. It reuses the diary and SMS visual language already built, it demonstrates the actual product behaviour (subject 2, our conduct: intervals and triggers already published on this page), and it is the exact "sticky graphic" pattern from Stripe/Pudding, in ~120 lines of vanilla code.

### Markup (replaces the `.workflow` div; heading, intro, and catalogue link stay)

```html
<div class="scrolly">
  <div class="scrolly-steps">
    <section class="scrolly-step is-active" data-step="1">
      <span class="step-tag">Workflow 01</span>
      <h3>Appointment reminders</h3>
      <p>Reminders at 72 hours, 24 hours, and 2 hours by SMS and email, with a
      simple confirm or cancel link, timed to what each booking system allows.</p>
      <!-- mobile-only compact artifact, hidden >= 900px -->
      <div class="scrolly-mini" aria-hidden="true"><!-- state-1 artifact copy --></div>
    </section>
    <section class="scrolly-step" data-step="2"> ... No-show recovery ... </section>
    <section class="scrolly-step" data-step="3"> ... New enquiry response ... </section>
  </div>

  <aside class="scrolly-visual" data-state="3"
         aria-label="Example: the same three workflows shown as diary rows and SMS messages.">
    <div class="sv-layer" data-for="1">
      <!-- artifact card: diary row, Sarah M. Thu 2:30 pm, plus SMS bubble
           "Hi Sarah, a reminder about your physio appointment Thu 2:30 pm.
            Reply Y to confirm or call us on 03 9123 4567."
           meta: "Delivered · Tue 9:00 am" -->
    </div>
    <div class="sv-layer" data-for="2">
      <!-- James T., Mon 9:00 am, stamp-cancel "Did not attend",
           outgoing SMS at 9:28 am, then stamp-rebooked "Rebooked · Thu 2:10 pm" -->
    </div>
    <div class="sv-layer" data-for="3">
      <!-- Emma W. form card, Thu 7:04 pm, reply bubble with
           sms-meta "Sent · Thu 7:04 pm" -->
    </div>
  </aside>
</div>
```

Domain detail is load-bearing: **reuse the characters and timestamps already on the page** (James T. Mon 9:00 did-not-attend from the leak card; Emma W. Thu 7:04 pm enquiry). The leak section shows these moments failing; the pinned artifact shows the same moments recovered. Internally consistent times across the whole page is the insider-precision signal. The no-show SMS lands at 9:28 am, inside the "within 30 minutes" already claimed at line 360. Message copy never asks for a review, never mentions a condition or outcome.

### CSS

```css
.scrolly { display: grid; grid-template-columns: 1fr 1fr; gap: 64px;
  align-items: start; margin-top: 64px; }
.scrolly-step { min-height: 85vh; display: flex; flex-direction: column;
  justify-content: center; opacity: 0.35;
  transition: opacity 0.4s var(--ease-out); }
.scrolly-step.is-active { opacity: 1; }
.scrolly-visual { position: sticky; top: calc(50vh - 220px); /* card ~440px tall */
  background: var(--ink-2); border: 1px solid var(--rule); border-radius: 14px;
  box-shadow: 0 24px 60px -30px rgba(23, 20, 9, 0.18); /* matches the diary */
  padding: 26px 24px; min-height: 440px; position: sticky; overflow: hidden; }
.sv-layer { position: absolute; inset: 26px 24px; opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.45s var(--ease-out), transform 0.45s var(--ease-swift); }
.scrolly-visual[data-state="1"] .sv-layer[data-for="1"],
.scrolly-visual[data-state="2"] .sv-layer[data-for="2"],
.scrolly-visual[data-state="3"] .sv-layer[data-for="3"] {
  opacity: 1; transform: none; }
.scrolly-mini { display: none; }

@media (max-width: 900px) {
  .scrolly { grid-template-columns: 1fr; }
  .scrolly-visual { display: none; }          /* un-pin below 900px */
  .scrolly-step { min-height: 0; padding: 32px 0; opacity: 1; }
  .scrolly-mini { display: block; margin-top: 20px; } /* artifact interleaves per step */
}
@media (prefers-reduced-motion: reduce) {
  .scrolly-step, .sv-layer { transition: none; }
}
```

Stamps and bubbles inside the layers reuse `.diary-row`, `.diary-stamp`, `.stamp-*`, `.sms-bubble`, `.sms-meta` classes unchanged. One new outbound-bubble variant: `.sms-bubble.out { background: var(--signal-dim); border-bottom-left-radius: 14px; border-bottom-right-radius: 4px; align-self: flex-end; }`.

### JS (append to `site.js`, same conventions: `var`, guarded, observer-based)

```js
(function () {
  var visual = document.querySelector('.scrolly-visual');
  var steps = document.querySelectorAll('.scrolly-step');
  if (!visual || !steps.length || !('IntersectionObserver' in window)) return;
  visual.setAttribute('data-state', '1');   /* JS present: start at step 1 */
  var so = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var n = e.target.getAttribute('data-step');
      visual.setAttribute('data-state', n);
      steps.forEach(function (s) { s.classList.toggle('is-active', s === e.target); });
    });
  }, { rootMargin: '-45% 0% -45% 0%' });   /* fires as a step crosses the midline */
  steps.forEach(function (s) { so.observe(s); });
})();
```

### Fallback matrix (must all pass before ship)

| Condition | Behaviour |
|---|---|
| No JS | HTML ships `data-state="3"` and all steps full-opacity via a `.js`-scoped dimming rule (`.js .scrolly-step { opacity: 0.35 }` etc., mirroring the existing `.js .reveal` convention). Steps read top to bottom, visual shows the final composite state. Nothing invisible. |
| Reduced motion | Sticky pinning stays (it is position, not motion); layer swaps and step dimming become instant (`transition: none`). |
| < 900px | Visual hidden, each step carries its own compact inline artifact. No pinning, no dead scroll. |
| Firefox / no `view()` | Unaffected; this treatment uses IO only. |
| Keyboard / SR | Steps are real `<section>`s in DOM order; the visual is one labelled `aside`, layers `aria-hidden` except the SR summary in the aside's `aria-label`. |

### Why this is first
It is the section a clinic owner scrolls to immediately after the hero hook, it turns the weakest section on the page (three plain cards) into the strongest, it proves "we're the tech experts" by showing software behaving rather than being described, and it reuses every existing artifact class, so it hardens the design system the other nine treatments build on.

---

## Build order and total effort

| Phase | Contents | Effort |
|---|---|---|
| 1. Foundation | Treatments 2, 9, 10 (tokens, hover/press, type, fonts) | 1.5 days |
| 2. Wow | Treatment 1 (scrolly) | 1 to 1.5 days |
| 3. Index depth | Treatments 3, 4, 5, 6 (living leaks, calculator, sheets, dip) | 2 days |
| 4. Subpages | Part 3 plans incl. treatment 8 (wire) | 3 days |
| 5. Upgrade layer + QA | Treatment 7 + full fallback matrix pass | 1 day |

QA gate for every phase: JS disabled walk-through (nothing invisible, nothing half-drawn), `prefers-reduced-motion` walk-through (final states instantly), 375px and 900px breakpoints, keyboard tab order and `:focus-visible` intact, Lighthouse CLS 0 on a cold load, and every new copy string checked against: no em-dashes, no emoji, no uncited size on a future outcome, no message template that could read as review solicitation or clinical judgement.