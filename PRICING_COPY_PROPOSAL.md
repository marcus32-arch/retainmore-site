# Pricing tiers rewrite — proposal, 2026-08-10

Not applied. Marcus's note: the tiers do not answer "what do I get" for a
clinic owner. Three changes, no price movement, no new claims.

1. **A who-is-this-for line** so an owner self-selects in two seconds instead of
   comparing feature lists they cannot price.
2. **What happens, not what it is called.** "Flagship: cancellation waitlist
   backfill" is a mechanism name. An owner cannot picture it. A sentence about
   their Tuesday can be pictured immediately.
3. **The delivery guarantee moved up** from a footnote into the tier itself,
   because it is the strongest trust asset on the page and it is currently
   phrased as a timeline rather than a promise.

Everything below is subject-2 (our own conduct) or subject-3 (the world). No
results claims, no numbers we cannot document.

---

## Starter — $1,700 setup + $500/mo
**One to three practitioners.**

### Every enquiry gets answered, day or night.

- Someone enquires at 7pm on a Thursday. They get a real reply within minutes
  and a link to your live diary, instead of a callback on Monday after they have
  already booked somewhere else.
- Care plan and referral expiries flagged before they lapse, so patients do not
  stop coming because the paperwork quietly ran out. If your system already
  handles that, we build whichever gap yours actually has instead. The audit
  tells us which.
- Connects to the booking system you already run. Nothing to replace and nothing
  new for your team to log into.
- A monthly report: what came in, what got answered, what booked.
- **Live within 7 business days of getting access, or your setup fee back.**

## Growth — $2,800 setup + $900/mo · Most popular
**Four to eight practitioners.**

### Empty slots refill themselves.

Everything in Starter, plus:

- A patient cancels tomorrow's 12:30 at eight in the evening. Your waitlist
  hears about it that night, the first yes takes the slot, and the front desk
  finds a full book in the morning.
- Patients with a history of missing get more follow-up. Reliable ones get less.
  Nobody gets over-messaged, and it layers on top of whatever you already send.
- A check-in after discharge, and a referral request at a moment that makes
  sense rather than a blanket ask.
- Patient SMS included.

## Full Practice — $5,900 setup + $1,800/mo
**Nine or more practitioners, or more than one location.**

### See what is actually happening across the whole practice.

Everything in Growth, plus:

- Retention and growth for every location and practitioner in one view, instead
  of numbers scattered across systems that do not talk to each other.
- Which practitioners are holding their patients and which are losing them,
  month to month, so you are managing on something other than a hunch.
- A bi-monthly review of your marketing and website, with what to change and
  why.

---

# Disclosure pattern (Marcus, 2026-08-10)

Lead with the outcome, then let them open the full list. Rationale: the outcome
answers "what do I get", the list answers "is that worth nine hundred a month",
and hiding the mechanism reads as evasive to a buyer who has been sold vapour
before. With no case study to show, visible substance IS the proof.

**Use `<details>`/`<summary>`, not a JS accordion.** Native disclosure is
keyboard accessible, screen-reader announced, indexed by search engines, and
survives JS failing. No script needed.

```html
<details class="tier-detail">
  <summary>See everything that's set up and managed <span class="chev"></span></summary>
  <div class="tier-detail-body">
    ...groups below...
  </div>
</details>
```

## The rule that makes the list work: WORK DONE, not FEATURES OWNED

Every line is something a person does, not something the product has. Same
items, opposite comparison class: a list of features reads as software (where
$900/mo is outrageous), a list of work reads as staffing (where it is cheap).

Bad: "Cancellation waitlist backfill ✓"
Good: "We build your waitlist logic, connect it to your diary, and watch it
every week."

Group into four headings so it reads as scope rather than a shopping list, and
so nobody line-item shops it:

**Set up for you**
- Your booking system connected, tested against your real diary before anything
  goes live
- Every message template written to your wording and signed off by you before a
  patient sees it
- The follow-up rules built around how your clinic actually runs, not a preset

**Running every day, without you**
- Cancellations offered to your waitlist within minutes, day or night
- Enquiries answered when they arrive, including after you have closed
- Follow-up weighted by each patient's own attendance history
- Care plan and referral expiries flagged before they lapse

**Watched by a person**
- Monitored weekly, so a broken workflow is our problem to spot, not something
  you find out about from a patient
- Fixed at our cost when your booking system changes something
- One named person accountable, reachable directly, not a ticket queue

**Yours to keep an eye on**
- A monthly report of what came in, what got answered and what booked
- Live within 7 business days of access, or your setup fee back
- Month to month. No lock-in, cancel with 30 days' notice

## Two cautions

1. **Everything listed is a promise you are now on the hook for.** Each line is
   a claim about our own conduct, which is the safe category, but it must be
   true on day one of the first client. Do not list anything aspirational.
2. **Keep the flagship visually distinct from the list**, or the one thing they
   should remember drowns in the other fourteen.

---

## Notes on the changes

- **Full Practice now leads on the insight, not the dashboard.** "Cross-platform
  KPI dashboard" describes an artifact; "see what is actually happening" is what
  they want and the dashboard is how it is delivered. Same product.
- **Practitioner performance visibility** is business analytics, not clinical
  ranking, so it stays clear of the TGA line. Keep it phrased about patient
  retention, never about clinical quality or outcomes.
- **The guarantee** appears only in Starter above to avoid repetition; it should
  in fact appear in all three, or once prominently above the grid.
- **Practitioner bands are a suggestion, not a rule.** They exist so an owner
  knows where to look. If a three-practitioner clinic wants Growth, sell them
  Growth.
