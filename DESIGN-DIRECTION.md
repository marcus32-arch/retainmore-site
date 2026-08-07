# Site design direction

Marcus, 2026-08-06, verbatim requirement (standing, applies to every page):

> "i always see people creating websites with really cool interactive visuals
> and stuff, i dont need retainmore website to have such crazy intense stuff,
> however i do want it to be better and way more impressive than it currently is"

> "nothing kills reputation more than that's text + the style/theme that looks
> like a one prompt Claude code built website, we need images or interactive
> or something different"

## The direction: artifacts, not text blocks

The palette and type are pinned by the brand skill (warm paper, deep teal,
DM Serif Display / Inter / JetBrains Mono). Distinctiveness comes from
EXECUTION: every major section renders a real object from a clinic's day
instead of a paragraph with a heading.

The artifact language (all CSS/SVG, no stock photos - fake clinic photography
reads more templated than none):
- the appointment diary (hero) - built, animated once on load
- an SMS thread card (the late cancellation, unanswered)
- a web-enquiry form card with an "unread until Monday" status
- a did-not-attend diary row with the follow-up list line struck through
- the workflow wire: reminder -> sms -> rebook pulse (how-it-works, future)
- paper grain over the whole page, one dark deep-teal anchor band (CTA)

Interactive: the calculator (built), the diary, FAQ accordions. More welcome,
"not crazy intense": no WebGL, no parallax, reduced-motion always respected.

Rules that still bind every pixel: retainmore-brand skill (three-subjects
honesty, no em-dashes in copy, no emoji, AHPRA/TGA wording, cited sizes only).

## Rulings, 2026-08-06 (Marcus, verbatim intent)

- "the digital style text font changed, it looks very ai" - JetBrains Mono is
  RETIRED from every reader-facing surface. Utility face is letterspaced
  Inter 600; diary times use tabular numerals. Do not reintroduce monospace.
- "pop-out transitions when u scroll... headings popping out the side...
  something that doesnt look so stagnant like a pdf" - section labels and h2s
  slide in from the left (reveal-l), card grids cascade (stagger). Scroll
  choreography is a standing requirement for every new section, always with
  a reduced-motion opt-out and a no-JS fallback.
