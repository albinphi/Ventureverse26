# VentureVerse 2026 — Event Landing Page: Agent Build Spec

> **Read this entire document before writing code.** It is the single source of truth. Build exactly what is described, make sensible decisions where it is silent, and document those decisions in the README.

---

## 0. TL;DR

Build a **single-page, cinematic, dark-mode event landing page** for a *fictional* event, **VentureVerse 2026 — Ideas into Action**, organised by the **Entrepreneurship Development Cell (EDC), JSS University, Noida**.

- **Stack:** Vite + vanilla JavaScript (ES modules) + plain CSS (custom properties). **GSAP** (+ ScrollTrigger, SplitText) for animation, **Lenis** for smooth scroll.
- **Look:** Dark, club/festival-poster energy: near-black backgrounds, huge bold uppercase type, one electric purple accent + one cyan accent, grain/fog texture, outline-stroke display text, image-led sections.
- **Feel:** Premium, fast, smooth. Every section reveals with purpose. Nothing is janky, nothing blocks readability.
- **Also must be:** semantic, accessible, mobile-first responsive, well-organised code, with a clear README.

This is a course assignment that will be graded (see §14), so **completeness of required sections, readability, working functionality, mobile layout, code organisation + README** all matter as much as the visual flair.

---

## 1. Event Brief (use this content verbatim)

| Field | Value |
|---|---|
| **Event name** | VentureVerse 2026 |
| **Tagline** | Ideas into Action |
| **Organiser** | Entrepreneurship Development Cell (EDC), JSS University, Noida |
| **Date** | 12 November 2026 (Thursday) |
| **Time** | 10:00 AM – 3:00 PM IST |
| **Venue** | University Auditorium, JSS University, Noida *(fictional placeholder)* |
| **Purpose** | A student-focused event about turning early ideas into ventures, learning from startup journeys, and exploring entrepreneurship on campus. |

Add a small, tasteful disclaimer in the footer: *"Fictional event created for a design/development exercise."*

### Event timezone / countdown target
`2026-11-12T10:00:00+05:30`

### Schedule (required, minimum 4 items; use all 7)

| Time | Session | Short description (write these) |
|---|---|---|
| 10:00 AM | Welcome | Doors open, registrations, and a kickoff from the EDC team. |
| 10:20 AM | From Idea to Startup | Opening keynote on how a rough idea becomes a real venture. |
| 11:15 AM | Founder Story | A candid fireside chat with a founder on wins, failures and pivots. |
| 12:00 PM | Campus Idea Sprint | Teams brainstorm and sketch a venture in a fast, hands-on round. |
| 1:15 PM | Pitching Basics | A practical workshop on structuring and delivering a clear pitch. |
| 2:15 PM | Networking and Closing | Meet speakers, mentors and peers; closing remarks and next steps. |

*(The brief's schedule lists six items. Render exactly these six. Do not invent extra ones.)*

---

## 2. Required Sections (assignment checklist — all MUST exist)

1. **Header** — EDC/event name + simple nav links that scroll to sections.
2. **Hero** — event name, tagline, date, time, venue, and a clear CTA.
3. **About & Highlights** — event description + **at least 3** highlights/benefits (build 4).
4. **Schedule** — **at least 4** agenda items in a readable timeline (build 6).
5. **Speakers / Guests** — **at least 2** fictional profiles (build 4). Initials/avatars/placeholders are fine.
6. **Footer** — EDC branding + contact/social placeholders.

### Optional bonus (build these — "one working feature is better than several unfinished ones", so every one listed below must actually WORK)

- ✅ **Mobile menu** (hamburger → full-screen overlay)
- ✅ **FAQ accordion**
- ✅ **Live countdown**
- ✅ **Theme switch** (dark default ↔ light)
- ✅ **Demo registration form** (client-side validation + success state; no backend)

---

## 3. Design Reference Analysis (from the provided "Art of the Mix" screenshot)

Translate these traits to VentureVerse. **Do not copy the reference's branding, text or photos.**

| Reference trait | How to apply it |
|---|---|
| Thin **announcement bar** at very top with tiny uppercase tracking text | Top bar: `12 NOVEMBER 2026 · JSS UNIVERSITY, NOIDA · FREE ENTRY FOR STUDENTS` — letter-spaced, 11px, muted, centered, with a subtle marquee on mobile. |
| **Nav**: round logo left, text links right, **purple pill CTA** ("Book Now") | Logo mark left, links right, purple pill **"Register Now"**. Sticky with blur-on-scroll. |
| **Hero** with desaturated, foggy full-bleed image behind a dark gradient; small "WELCOME TO" eyebrow; huge bold title with a purple glow/gradient edge; short paragraph; **two small colourful thumbnails** bottom-right | Procedural/atmospheric hero background (see §6.2), eyebrow "WELCOME TO", giant title, paragraph, two small "preview" tiles bottom-right that contrast with the monochrome hero (color-pop). |
| **"WHO WE ARE"** — giant **outline-only (stroke) text** overlapping a dark panel, photo on the left, body copy on the right with a tiny rotated cyan label | "ABOUT THE EVENT" stroke-text heading, image/visual card left, copy right, vertical cyan micro-label. |
| Small **cyan section label** + big uppercase heading + one-line subcopy ("WHAT WE OFFER / TAKE YOUR EVENTS TO THE NEXT LEVEL") | Reusable `SectionHeader` pattern: cyan eyebrow → huge uppercase H2 → muted lede. Use for every section. |
| **4-column speaker grid**: portrait photo, name, cyan role line, subtext, row of tiny social icons | 4 speaker cards, same anatomy. Use generated avatar art (initials on gradient) instead of photos. |
| **White booking-widget card** floating on dark (calendar + time picker) | The registration card: a high-contrast light card on the dark page with a mini date block, details and the form. (Intentional contrast moment.) |
| **"Find Us Online"** — heading with a half-outlined word, short copy, **3 image tiles with cyan icon badges** | "Follow the Buzz" social section with 3 tiles + platform icon badges. |
| **Footer**: logo left, cyan links centre, small social icons right, tiny legal line below | Same layout; stacks on mobile. |
| Overall: lots of black, generous spacing, uppercase, high contrast, glow accents | Honour that restraint; don't clutter. |

---

## 4. Tech Stack & Setup

```
npm create vite@latest ventureverse-2026 -- --template vanilla
cd ventureverse-2026
npm i gsap lenis
```

- **Vanilla JS + ES modules.** No React. (Keeps it beginner-explainable, which is graded.)
- **GSAP** core + `ScrollTrigger` + `SplitText` (SplitText is now included free in the `gsap` package; import from `gsap/SplitText`). If SplitText import fails for any reason, fall back to a tiny custom `splitLines/splitChars` util in `src/utils/split.js`.
- **Lenis** for smooth scroll, wired into GSAP's ticker (see §8.1).
- **No other animation libs.** No jQuery, no Tailwind (plain CSS with custom properties and a clear file structure).
- Fonts via `@fontsource` (npm, self-hosted) or Google Fonts `<link>` with `display=swap`:
  - **Display:** `Kanit` (700/800/900) — wide, bold, matches the reference's feel. Alternative: `Unbounded` / `Archivo Black`.
  - **Body:** `Inter` or `DM Sans` (400/500/600).
- Icons: inline SVG sprite (`src/assets/icons.svg` or inline in HTML). No icon-font CDNs.

---

## 5. Project Structure

```
ventureverse-2026/
├─ index.html
├─ README.md
├─ package.json
├─ public/
│  ├─ favicon.svg
│  └─ og-image.png            (optional)
└─ src/
   ├─ main.js                 # entry: imports css, boots modules in order
   ├─ styles/
   │  ├─ tokens.css           # CSS variables (colors, type scale, spacing, radii)
   │  ├─ reset.css
   │  ├─ base.css             # body, typography, utilities, focus styles
   │  ├─ layout.css           # container, grid, section spacing
   │  ├─ components.css       # buttons, pills, cards, section-header
   │  └─ sections/
   │     ├─ header.css
   │     ├─ hero.css
   │     ├─ about.css
   │     ├─ schedule.css
   │     ├─ speakers.css
   │     ├─ register.css
   │     ├─ faq.css
   │     ├─ social.css
   │     └─ footer.css
   ├─ js/
   │  ├─ lenis.js             # smooth scroll init + GSAP sync + anchor handling
   │  ├─ animations/
   │  │  ├─ index.js          # registers plugins, runs all animation modules
   │  │  ├─ preloader.js
   │  │  ├─ header.js
   │  │  ├─ hero.js
   │  │  ├─ about.js
   │  │  ├─ schedule.js
   │  │  ├─ speakers.js
   │  │  ├─ register.js
   │  │  ├─ faq.js
   │  │  ├─ social.js
   │  │  └─ footer.js
   │  ├─ features/
   │  │  ├─ countdown.js
   │  │  ├─ mobileMenu.js
   │  │  ├─ faqAccordion.js
   │  │  ├─ themeSwitch.js
   │  │  ├─ registrationForm.js
   │  │  └─ cursor.js         # custom cursor (desktop only)
   │  └─ utils/
   │     ├─ split.js
   │     ├─ dom.js            # $, $$ helpers
   │     └─ media.js          # prefersReducedMotion, isTouch, matchMedia helpers
   ├─ data/
   │  ├─ event.js             # name, dates, venue, tagline (single source of truth)
   │  ├─ schedule.js
   │  ├─ speakers.js
   │  ├─ highlights.js
   │  └─ faqs.js
   └─ assets/                 # svg art, textures (noise.png), optional images
```

**Rules**
- Content lives in `src/data/*.js`; the HTML can be authored statically OR rendered from data by small render functions. **Preferred:** render Schedule, Speakers, Highlights and FAQ from data via `render*()` functions in `src/js/render/` (add this folder) so adding an item is a one-line edit. Static markup is still acceptable if time-constrained, but the data files must exist and be the source of countdown/target dates.
- One module = one responsibility. Every file starts with a 2-line comment explaining what it does (beginner-friendly).
- No inline `style=""` except for CSS-variable injection (e.g. `style="--i:2"`).
- No global variables; use ES module exports.

---

## 6. Design System

### 6.1 Tokens (`tokens.css`)

```css
:root {
  /* Color — dark default */
  --bg: #050507;
  --bg-elev-1: #0b0b10;
  --bg-elev-2: #12121a;
  --surface-light: #f4f5fb;           /* registration card */
  --text: #f2f2f7;
  --text-muted: #9a9aab;
  --text-dim: #5f5f70;
  --line: rgba(255,255,255,.09);

  --purple: #8a2be2;                  /* primary accent / CTA */
  --purple-glow: #b25cff;
  --cyan: #19d3e6;                    /* secondary accent / eyebrows / links */
  --magenta: #ff3d9a;                 /* sparing highlight in gradients */

  --grad-accent: linear-gradient(90deg, #8a2be2, #19d3e6);

  /* Type scale (fluid) */
  --fs-hero: clamp(3.2rem, 11vw, 10rem);
  --fs-h2:   clamp(2.2rem, 6vw, 5rem);
  --fs-h3:   clamp(1.25rem, 2.2vw, 1.75rem);
  --fs-body: clamp(1rem, 1.1vw, 1.125rem);
  --fs-eyebrow: .75rem;               /* tracking .3em uppercase */

  /* Layout */
  --container: 1240px;
  --gutter: clamp(1.25rem, 4vw, 3rem);
  --section-y: clamp(5rem, 12vw, 10rem);
  --radius-s: 8px; --radius-m: 16px; --radius-l: 28px; --radius-pill: 999px;

  /* Motion */
  --ease-out: cubic-bezier(.16,1,.3,1);
}

[data-theme="light"] {
  --bg: #f6f6fa; --bg-elev-1:#ffffff; --bg-elev-2:#ececf4;
  --text:#0d0d14; --text-muted:#5a5a6e; --text-dim:#8a8a9c;
  --line: rgba(0,0,0,.1);
  --surface-light:#0d0d14;            /* invert the registration card for contrast */
}
```

- Contrast: body text ≥ 4.5:1, large text ≥ 3:1 in **both** themes. Verify cyan-on-white in light theme; if it fails, darken to `#0a8fa0` in light mode.
- Add a global **film-grain overlay** (fixed, `pointer-events:none`, ~5% opacity noise PNG/SVG filter) for texture. Disable under `prefers-reduced-motion` animation only (static grain is fine).

### 6.2 Visual Language & Image Strategy

Real photos are NOT required. Create atmosphere procedurally so the page looks rich without assets:

- **Hero backdrop:** layered CSS — dark base + 2–3 large blurred radial gradients (purple, cyan, a hint of magenta) + animated fog (slow-drifting blurred blobs) + grain. Optionally a `<canvas>` of soft drifting particles (≤ 80 particles, paused when offscreen / reduced motion). Add a vignette gradient to the bottom so it blends into the next section like the reference.
- **Two hero thumbnails (bottom-right):** small rounded tiles (≈ 220×130) showing *colorful* abstract gradient art (e.g. "pitch stage glow", "idea sprint grid") with a tiny caption and play-style icon. They contrast the monochrome hero (as in the reference).
- **About visual:** tall rounded card with abstract art (concentric rings / lightbulb-to-rocket SVG line illustration with neon strokes on dark).
- **Speaker avatars:** unique gradient + large initials + subtle geometric pattern. Each speaker a different gradient pair.
- **Social tiles:** 3 gradient/abstract tiles with a cyan icon badge in the corner.
- If you *do* use photos, use only license-free ones (e.g. Unsplash), compressed, `loading="lazy"`, with meaningful `alt`. Default to procedural art.

### 6.3 Signature type treatments

- **Hero title:** `VENTUREVERSE` in `--fs-hero`, weight 800–900, uppercase, tight leading (.9), with a subtle purple text-shadow/gradient glow (`text-shadow: 0 0 40px rgba(138,43,226,.55)`); "2026" on a second line or as a smaller accent chip.
- **Outline stroke text:** `-webkit-text-stroke: 1.5px var(--text); color: transparent;` for "ABOUT THE EVENT" (and the second word of "FOLLOW THE BUZZ"). Give a fallback colour for browsers without stroke support.
- **Eyebrows:** cyan, `--fs-eyebrow`, `letter-spacing:.3em`, uppercase, often preceded by a 24px line.
- **Buttons:** pill shape. Primary = purple fill, glow on hover, arrow icon that nudges. Secondary = outlined with 1px `--line`, fills on hover.
- **Magnetic buttons** on desktop (see §8.8).

---

## 7. Page Sections — Detailed Specs

Semantic skeleton:

```html
<a class="skip-link" href="#main">Skip to content</a>
<div class="announce">…</div>
<header class="site-header">…</header>
<main id="main">
  <section id="hero">…</section>
  <section id="about">…</section>
  <section id="schedule">…</section>
  <section id="speakers">…</section>
  <section id="register">…</section>
  <section id="faq">…</section>
  <section id="social">…</section>
</main>
<footer class="site-footer">…</footer>
```

Each `<section>` has `aria-labelledby` pointing to its heading. Use real `<h1>` once (hero title), `<h2>` per section, `<h3>` for cards.

### 7.0 Preloader (short, optional-but-nice)
- Full-screen black overlay, centered logo mark + counter 0→100% (fake-progress synced to real `window.load`, max ~1.6s total), then the overlay wipes up (clip-path/translate) revealing the hero.
- Must be **skippable** and must never exceed 2s. Respect reduced-motion (instant fade).
- Lenis is **stopped** during the preloader and started after.

### 7.1 Announcement Bar
- Text: `12 NOVEMBER 2026 • 10:00 AM – 3:00 PM • UNIVERSITY AUDITORIUM, JSS UNIVERSITY NOIDA • FREE FOR STUDENTS`
- Desktop: centered static. Mobile: seamless GSAP marquee loop. Hides on scroll-down (translate up), part of header behaviour in §7.2.

### 7.2 Header (Required)
- **Left:** logo mark (SVG: circular emblem with a stylised "V" + orbit ring) + wordmark `EDC · JSS Noida` (small, two-line lockup: "EDC" bold / "JSS University, Noida" micro).
- **Right (≥ 1024px):** links → `About` `Schedule` `Speakers` `Register` `FAQ`, plus a theme-toggle icon button and a purple pill CTA **Register Now** (→ `#register`).
- **Behaviour:**
  - Sticky/fixed. Transparent at top; after 80px scroll → `backdrop-filter: blur(14px)`, translucent `--bg` at 70%, 1px bottom border.
  - Hide on scroll down, reveal on scroll up (GSAP `quickTo`/class toggle driven by Lenis scroll direction).
  - **Active-link highlight** via ScrollTrigger per section (cyan underline slides to current).
  - Nav links use Lenis `scrollTo` with offset = header height.
- **Mobile (< 1024px):** hamburger button (animated 2-line → X). Opens a **full-screen overlay menu** (see §9.2).

### 7.3 Hero (Required)
Layout: min-height `100svh`, content bottom-left aligned like the reference, thumbnails bottom-right.

Content (in order):
1. Eyebrow: `WELCOME TO`
2. **H1:** `VENTUREVERSE` (+ `2026`)
3. Tagline line (large-ish, cyan→purple gradient text): **"Ideas into Action."**
4. Paragraph (max-width 52ch): *"A student-first day of keynotes, founder stories and hands-on sprints — built to turn your early ideas into real ventures, right here on campus."*
5. **Event facts row** — three compact chips with icons (calendar / clock / pin):
   - `12 Nov 2026`
   - `10:00 AM – 3:00 PM`
   - `University Auditorium, JSS Noida`
6. **CTA group:** primary **Register Now** (→ `#register`), secondary **View Schedule** (→ `#schedule`).
7. **Mini countdown** (see §9.3) tucked under the CTAs *or* as a glass pill at the top-right of the hero. Choose whichever reads cleaner at mobile; must not crowd the title.
8. Bottom-right: two thumbnail tiles (desktop ≥ 900px; stack below CTAs or hide the second on mobile).
9. Bottom-centre: scroll hint ("SCROLL" + animated line) — hide on mobile if cramped.

Hero background is parallaxed on scroll (§8.5). Title uses SplitText char/line reveal (§8.3).

### 7.4 About & Highlights (Required)
**Layout (desktop):** two-column inside a dark rounded panel (`--bg-elev-1`, radius-l), left = visual, right = copy; huge outline text "ABOUT THE EVENT" overlapping the top edge of the panel (as "WHO WE ARE" does in the reference). Vertical rotated cyan micro-label `ABOUT US` beside the copy.

**Copy (use this, you may polish lightly):**
- Eyebrow: `ABOUT THE EVENT`
- H2 (outline + solid mix): **"WHERE CAMPUS IDEAS BECOME VENTURES"**
- Body: *"VentureVerse 2026 is the flagship entrepreneurship event of the Entrepreneurship Development Cell at JSS University, Noida. In one energetic day, students meet working founders, test their ideas in a live sprint, learn how to pitch with confidence, and connect with a community that backs builders."*
- Second short para: *"Whether you're carrying a half-formed idea, a prototype, or just curiosity — there's a seat for you."*

**Stats strip** (animated count-up on scroll, GSAP): `5 hrs of content` · `4 speakers` · `6 sessions` · `500+ students expected` *(fictional)*.

**Highlights grid (≥ 3 required; build 4)** — cards with icon, title, 1–2 line description, number index `01–04`:
1. **Founder Stories** — Hear real journeys, including the failures, from people who started from zero.
2. **Campus Idea Sprint** — Form a team and shape a venture concept in a fast, guided round.
3. **Pitching Workshop** — Learn to structure a clear, confident, investor-ready pitch.
4. **Mentor Networking** — Meet speakers, mentors and fellow student founders over the closing session.

Cards: glass surface, 1px gradient border on hover, subtle 3D tilt on desktop (§8.8), icon draws in (SVG stroke animation).

### 7.5 Schedule (Required)
Present as a **vertical timeline** (a glowing line down the centre on desktop, left-aligned on mobile).

Each item = time chip (cyan, mono-ish), session title (H3), short description, small icon, optional "duration" tag (computed from the next item; last = until 3:00 PM).

**Interaction & motion:**
- The timeline spine **draws** (scaleY 0→1) as you scroll, scrubbed (`scrub: true`).
- Each item fades/slides in from alternating sides (desktop) or from left (mobile); the dot pulses when it becomes active.
- **"Now / Next" badge:** if the current time (in IST) falls within the event window on 12 Nov 2026, highlight the live session with a pulsing `LIVE NOW` tag. Otherwise show nothing (don't fake it). Wrap in try/catch and keep it tiny.
- Optional: sticky left label "10:00 AM → 3:00 PM" on desktop.

Heading: eyebrow `THE AGENDA`, H2 **"FIVE HOURS. ONE DAY. SIX SESSIONS."** — fix count if you change items (must match data length — generate from `schedule.length`).

### 7.6 Speakers / Guests (Required)
**Fictional profiles — use exactly these (all names invented):**

| Initials | Name | Role line (cyan) | Subtext | Session |
|---|---|---|---|---|
| AM | **Aarav Mehta** | Founder & CEO, Stackly | B2B SaaS founder, ex-campus entrepreneur | From Idea to Startup (Keynote) |
| NK | **Nisha Kapoor** | Co-founder, GreenCart | Sustainable commerce, 2× founder | Founder Story |
| RS | **Rohan Sethi** | Partner, Launchpad Ventures | Early-stage investor & mentor | Pitching Basics |
| IV | **Ishita Verma** | Startup Mentor, EDC Alumni | Runs the campus idea-sprint format | Campus Idea Sprint |

Add a visible footnote: *"Speaker profiles are fictional placeholders."*

**Card anatomy (mirror reference):** tall portrait (4:5) with gradient+initials avatar → name (H3, white) → role (cyan, small) → subtext (muted) → session tag → row of 3 tiny social icons (LinkedIn, X, Instagram — `href="#"` placeholders with `aria-label`).

**Grid:** 4 cols ≥ 1100px, 2 cols ≥ 600px, 1 col below (or horizontal snap-scroll carousel on mobile — pick one; grid is simpler and safer).

**Motion:** staggered rise-in; on hover the avatar scales 1.05 with a colour-wash overlay and the social icons slide up. Subtle parallax inside the avatar on pointer move (desktop only).

### 7.7 Registration (Bonus — demo form)
A visually distinct **light card** floating on the dark page (like the white booking widget in the reference), with a faint purple glow behind it.

**Layout:** left column = pitch copy + event facts + "What you get" checklist (free entry, certificate of participation, networking access, lunch/refreshments — all fictional); right = the card.

**Card contents:**
- Header strip: `Reserve your seat` + mini date block (`12 NOV` big, `THU · 10:00 AM`).
- Form fields: **Full name** (required), **Email** (required, regex validated), **College / Year** (select: 1st/2nd/3rd/4th/Other), **What are you building? (optional, 140 chars with live counter)**, **checkbox** "I agree to receive event updates".
- Submit button **"Confirm My Seat"** (purple).
- **Validation:** inline, accessible errors (`aria-invalid`, `aria-describedby`, error text under field, focus first invalid on submit). No alerts.
- **Success state:** form fades out, replaced by a confirmation panel: animated check-mark (SVG stroke draw), "You're in, {firstName}!", a fake ticket ID like `VV26-XXXX` (random 4 chars), the event details, and a **"Add to calendar"** button that downloads a generated `.ics` file (client-side Blob) for 12 Nov 2026 10:00–15:00 IST. Plus "Register another" reset link.
- **No data leaves the browser.** Add small text: *"Demo form — no data is stored or sent."* (Optionally keep the last ticket in `localStorage` guarded by try/catch.)

### 7.8 FAQ (Bonus — accordion)
Heading: eyebrow `GOT QUESTIONS`, H2 **"GOOD TO KNOW"**.

6 items (write them; keep each answer 1–3 lines):
1. Who can attend? — Any student; open to all years and branches.
2. Is there a fee? — Free for students (fictional).
3. Do I need a startup idea to join? — No; the sprint helps you find one.
4. What should I bring? — ID card, laptop/notebook, curiosity.
5. Will I get a certificate? — Yes, participation certificate (fictional).
6. Where is it exactly? — University Auditorium (placeholder venue), JSS University, Noida.

Accordion spec in §9.4.

### 7.9 "Follow the Buzz" Social Section
Mirror the reference's "Find Us Online":
- Eyebrow `SOCIAL`, H2 **"FOLLOW THE BUZZ"** with "BUZZ" as outline text.
- One line: *"Follow EDC on social media for speaker reveals, behind-the-scenes content and campus startup updates."*
- 3 image-style tiles (gradient/abstract art) each with a cyan icon badge (YouTube, Facebook→use Instagram/LinkedIn/X; choose 3 consistent with footer) linking to `#` placeholders with `aria-label`s.
- Hover: tile lifts, badge expands to reveal the platform label.

### 7.10 Footer (Required)
Three-part layout (mirrors reference), stacks on mobile:
- **Left:** logo mark + `Entrepreneurship Development Cell` + `JSS University, Noida`.
- **Centre:** cyan nav links (`About · Schedule · Speakers · Register · FAQ`).
- **Right:** social icons (Instagram, LinkedIn, X, YouTube) → `#` placeholders.
- **Contact row:** `edc@jssuniversity.example` (mailto, clearly fake `.example` domain), `+91 00000 00000`, address placeholder: *"JSS University, Sector 62, Noida (placeholder)"*.
- **Bottom line (tiny):** `© 2026 EDC, JSS University Noida — Fictional event for a design/development exercise.` + "Back to top" button (Lenis scroll to 0).
- A **giant faded wordmark** `VENTUREVERSE` clipped at the footer bottom (outline text, 6% opacity) with a parallax rise on scroll — nice finishing flourish.

---

## 8. Motion Design (GSAP + Lenis)

### 8.1 Lenis ↔ GSAP integration (do exactly this)

```js
// src/js/lenis.js
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const lenis = new Lenis({
  duration: 1.15,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 1.2,
});

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

- Import `lenis/dist/lenis.css` (or add the recommended `html.lenis` CSS rules) in `base.css`.
- **Anchor links:** intercept `a[href^="#"]` → `lenis.scrollTo(target, { offset: -headerHeight, duration: 1.4 })`.
- **Stop/start Lenis** when the mobile menu is open, during the preloader, and on form-success modal (if any). Add `data-lenis-prevent` to any inner scroll container (e.g. the mobile menu panel).
- **Reduced motion:** if `prefers-reduced-motion: reduce`, do NOT init Lenis smoothing (`lenis.destroy()` / skip) and skip all scrubbed/parallax animations; show content immediately (set final states).
- After fonts load (`document.fonts.ready`) and after images/canvas init, call `ScrollTrigger.refresh()`.

### 8.2 Global defaults
```js
gsap.defaults({ ease: 'power3.out', duration: 0.9 });
```
Use `gsap.matchMedia()` to scope desktop-only effects:
```js
const mm = gsap.matchMedia();
mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => { /* desktop effects */ });
mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => { /* lighter mobile effects */ });
mm.add('(prefers-reduced-motion: reduce)', () => { /* set final states, no motion */ });
```
All ScrollTriggers/tweens created inside `mm.add` auto-clean up. **Never leave orphaned triggers.**

### 8.3 Text animations
- **Hero H1:** SplitText `type: 'chars'` (mask via `overflow:hidden` wrapper) → chars rise from `yPercent:110` with `rotate: 6`, stagger `0.03`, `power4.out`, after preloader completes.
- **Section H2s:** SplitText `lines` with mask; reveal on enter (`start: 'top 85%'`, `once: true`).
- **Paragraphs:** fade + translateY(24px), stagger by line/paragraph. Keep text readable — never animate opacity below legibility mid-scroll for body copy in scrub mode.
- **Eyebrows:** the leading line `scaleX 0→1` then text fades.
- After split animation completes, **revert SplitText** (`split.revert()`) where possible to keep DOM clean; handle resize by re-splitting lines (debounced) or avoid line-splitting on mobile.
- **A11y:** keep the original text accessible (SplitText `aria` handling or `aria-label` on the parent + `aria-hidden` on pieces).

### 8.4 Hero timeline (after preloader)
Sequence (single `gsap.timeline`):
1. Background glows fade/scale in (1.2s).
2. Eyebrow → H1 chars → tagline → paragraph → fact chips (stagger) → CTAs → thumbnails slide in from right (stagger) → countdown pill.
3. Header slides down from `y:-100%`.
Total ≈ 2.2s; overlap with `"<+=0.1"` offsets for fluidity.

### 8.5 Parallax & scroll-driven
- Hero background layers move at different speeds (`yPercent` ±10–25, `scrub: true`).
- Hero content fades slightly and moves up as hero leaves (`scrub`), but **only** the decorative layers/thumbnails — keep the title readable.
- About visual card: slow vertical parallax relative to text column (desktop).
- Footer giant wordmark: `yPercent: 30 → 0` scrub.
- Use `will-change: transform` sparingly and only on animated layers; use `transform`/`opacity` only (no layout-thrashing properties).

### 8.6 Section transitions
- Add subtle **section divider** scale-in lines (`scaleX 0→1`).
- **Background colour shift:** as the user moves from hero → about → schedule, tween a CSS variable (`--glow-hue`) or the radial glow position via ScrollTrigger so the ambient glow feels alive. Keep subtle.
- Registration card: slides up with slight rotateX settle (`transformPerspective: 1200`), glow pulses behind.

### 8.7 Horizontal text marquee (between sections)
A giant marquee band between About and Schedule (and optionally before footer): `IDEAS • INTO • ACTION • VENTUREVERSE • 2026 •` repeated, alternating outline/solid, scroll-velocity-reactive (speed up/skew slightly based on `lenis.velocity`, capped). Reduced motion → static.

### 8.8 Micro-interactions (desktop pointer only — guard with `(hover:hover) and (pointer:fine)`)
- **Custom cursor:** small dot + larger trailing ring (`gsap.quickTo`), ring grows on interactive elements and shows "VIEW"/"REGISTER" label on CTAs optional. Hide native cursor ONLY on elements where the custom cursor is active; never hide it in form inputs. Fully disabled on touch.
- **Magnetic buttons:** primary CTAs follow the pointer within ~40px radius (`quickTo` x/y), elastic return.
- **Card tilt:** highlight cards and speaker cards tilt ±6° based on pointer with a glare gradient following the cursor.
- **Link hover:** underline wipe (scaleX origin switch).

### 8.9 Count-up & draw animations
- Stats: `gsap.to(obj, { val: target, snap:{val:1}, onUpdate })` on enter, `once:true`.
- SVG icon strokes: `strokeDasharray/strokeDashoffset` or DrawSVG-style technique via `getTotalLength()` (DrawSVG plugin is now free in gsap too if available; otherwise the manual technique).
- Success checkmark draw in registration.

### 8.10 Performance rules
- 60fps target on a mid-range laptop. Test with CPU 4× throttle.
- Animate only `transform`, `opacity`, and `clip-path` where possible.
- Kill/pause the particle canvas when the hero is offscreen (`ScrollTrigger` `onToggle`) and on `visibilitychange`.
- Cap devicePixelRatio at 2 for canvas.
- Lazy-init heavy features (cursor, tilt) only on capable devices.
- Don't create ScrollTriggers inside scroll handlers. Batch with `ScrollTrigger.batch()` for card grids.
- Call `ScrollTrigger.refresh()` on font load and on `resize` (debounced by ScrollTrigger by default).

---

## 9. Feature Specs (the bonus items — all must work)

### 9.1 Theme Switch (dark ↔ light)
- Button in header (sun/moon icon, `aria-pressed`, `aria-label="Toggle theme"`).
- Sets `document.documentElement.dataset.theme = 'light' | 'dark'`.
- Persist in `localStorage` (try/catch). Default: respect `prefers-color-scheme`? **No — default to dark** (brand look), but honour a saved choice.
- Inline tiny script in `<head>` to apply saved theme **before paint** (avoid flash).
- Transition: smooth 300ms colour transitions on `background-color`, `color`, `border-color` only (add a temporary class during toggle so it doesn't fire on load).
- Verify every section looks good in light mode (hero fog should soften; text/strokes switch to dark; registration card inverts).

### 9.2 Mobile Menu
- Hamburger ↔ X morph (GSAP or CSS).
- Overlay: full-screen `--bg` with the grain, links stacked in huge display type (staggered slide-up reveal), CTA pill at bottom, small contact line.
- On open: `lenis.stop()`, trap focus inside menu, `aria-expanded` on button, `Esc` closes, click on link closes + scrolls to target, restore focus to the button on close.
- Prevent background scroll; menu panel gets `data-lenis-prevent`.
- Close automatically if viewport grows ≥ 1024px.

### 9.3 Countdown
- Target: `2026-11-12T10:00:00+05:30` (read from `data/event.js`).
- Shows `DD : HH : MM : SS` with labels; each digit group uses a small flip/slide tick animation (GSAP) when its value changes (only the changed unit).
- Updates every second using `setInterval` (or rAF-throttled); clear on `pageshow`/`visibilitychange` re-sync.
- State handling:
  - **Before:** countdown.
  - **During (10:00–15:00 on 12 Nov 2026):** replace with a pulsing **"HAPPENING NOW"** badge.
  - **After:** **"Thanks for joining VentureVerse 2026"** message.
- `aria-live="off"` on the ticking digits; provide one visually-hidden `<time datetime>` text that's static, so screen readers aren't spammed.
- Today is ~21 Oct 2026, so it will show ≈ 22 days — verify it renders sensibly.

### 9.4 FAQ Accordion
- Use real `<button aria-expanded aria-controls>` + panel `role="region"`.
- Animate height with GSAP (`height: 0 → auto`) + icon rotation (plus → minus), single-open behaviour (opening one closes the others) — or allow multiple; choose single-open.
- Keyboard: `Enter/Space` toggles, `ArrowUp/Down` moves between headers, `Home/End` jump. Focus ring visible.
- Call `ScrollTrigger.refresh()` after height changes (since page height changes).
- Without JS the content should still be readable (use `<details>`-style fallback or default expanded via a `no-js` class).

### 9.5 Registration Form (demo)
Covered in §7.7. Additional logic notes:
- Email regex: `/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/`.
- Name: min 2 chars, trimmed.
- Disable submit + show tiny spinner for ~900ms (fake network), then success state.
- `.ics` generator in `registrationForm.js`:
```
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//VentureVerse 2026//EDC JSS Noida//EN
BEGIN:VEVENT
UID:vv26-{ticket}@ventureverse.example
DTSTAMP:{nowUTC}
DTSTART:20261112T043000Z
DTEND:20261112T093000Z
SUMMARY:VentureVerse 2026 — Ideas into Action
LOCATION:University Auditorium, JSS University, Noida
DESCRIPTION:Fictional event — EDC, JSS University Noida
END:VEVENT
END:VCALENDAR
```
(10:00 IST = 04:30 UTC; 15:00 IST = 09:30 UTC.)

---

## 10. Responsive Behaviour (mobile-friendly is graded)

Breakpoints: `480 / 768 / 1024 / 1280`. **Design mobile-first.**

| Area | ≤ 767px | 768–1023px | ≥ 1024px |
|---|---|---|---|
| Header | Logo + hamburger | Logo + hamburger | Full nav + CTA |
| Hero | Title scales via `clamp`, CTAs stack full-width, thumbnails become a small horizontal row *below* CTAs or hidden, countdown below CTAs | Two-column facts | Content bottom-left, thumbnails bottom-right |
| About | Visual stacked above copy, outline heading smaller, stats 2×2 | Stack, stats 4-up | Two-column panel |
| Highlights | 1 col | 2 col | 4 col (or 2×2) |
| Schedule | Left rail timeline | Left rail | Centre spine alternating |
| Speakers | 1 col (or 2 col at 480+) | 2 col | 4 col |
| Register | Copy above card, card full-width | Same | Two columns |
| FAQ | Full-width | Centered 720px | Two-col (heading left, accordion right) |
| Footer | Stacked, centered | 2-col | 3-part row |

**Hard requirements**
- No horizontal scroll at 320px width. (Test `overflow-x`.) Clip decorative overflow with `overflow: clip` on wrappers, **not** on `html/body` (this breaks sticky + Lenis).
- Tap targets ≥ 44×44px. Form inputs ≥ 16px font (prevents iOS zoom).
- Use `100svh`/`dvh` for hero height to handle mobile browser chrome.
- Lighter animation on mobile: no cursor, no tilt, no magnetic, reduce parallax amplitude by 50%, smaller particle count (or none).
- Images/art sized with `aspect-ratio` to avoid layout shift.

---

## 11. Accessibility & SEO

- Semantic landmarks, one `<h1>`, logical heading order.
- Skip link, visible `:focus-visible` rings (2px cyan, offset 3px).
- All interactive elements keyboard-operable; no keyboard traps (except the intentional mobile-menu trap, which releases on close).
- `prefers-reduced-motion` honoured everywhere (see §8).
- Color contrast verified in both themes.
- `alt` text on meaningful images; decorative SVG/canvas `aria-hidden="true"`.
- Form labels tied via `for`/`id`; errors announced via `aria-live="polite"`.
- `<html lang="en">`, `<title>VentureVerse 2026 — Ideas into Action | EDC, JSS University Noida</title>`, meta description, `theme-color`, Open Graph + Twitter tags, favicon (SVG).
- JSON-LD `Event` schema in `<head>` (name, startDate `2026-11-12T10:00:00+05:30`, endDate `2026-11-12T15:00:00+05:30`, location, organizer) — mark `eventAttendanceMode` offline.

---

## 12. Copy & Tone Guidelines

- Voice: energetic, confident, student-friendly, not corporate. Short sentences. Active verbs.
- Headings in UPPERCASE display type; body in sentence case.
- Never claim anything real about JSS University beyond the brief; keep disclaimers where specified.
- All names, emails, phone numbers, handles, and numbers beyond the brief are **fictional placeholders** and should look obviously placeholder (`.example` domains, `00000` numbers, `#` links).

---

## 13. README.md (REQUIRED — it is graded)

Create `README.md` containing:

1. **Project title + one-line description** + screenshot/GIF placeholder.
2. **Live features list:** required sections ✔ + each bonus feature (mobile menu, FAQ accordion, countdown, theme switch, demo registration form).
3. **Tech stack** and *why* (Vite, vanilla JS, GSAP, Lenis — 1–2 lines each).
4. **Getting started:** `npm install`, `npm run dev`, `npm run build`, `npm run preview`.
5. **Project structure** (tree from §5 with one-line descriptions).
6. **How it works (beginner-friendly):**
   - How Lenis and GSAP are synced (explain the ticker idea in 3–4 sentences).
   - How scroll animations are organised (one file per section).
   - How to edit content (`src/data/`), colours (`tokens.css`), and the event date (`event.js`).
7. **Design decisions:** palette, typography, why dark theme, how the reference inspired the layout (without copying), accessibility and reduced-motion choices.
8. **Responsive strategy.**
9. **Known limitations / future improvements** (be honest).
10. **Credits:** fonts, libraries, "fictional event" note.

Keep it clear and skimmable; this plus code comments is the "explanation, effort, originality" evidence.

---

## 14. Grading Alignment (100 marks) — self-check before finishing

| Criterion | Marks | What the agent must ensure |
|---|---|---|
| Required sections & content | 30 | All 6 required sections present with **all** requested content: hero facts (name, tagline, date, time, venue, CTA), ≥3 highlights, ≥4 schedule items, ≥2 speakers, footer with branding + contact/social placeholders. |
| Layout, readability, visual clarity | 20 | Strong hierarchy, generous spacing, readable contrast, consistent components. Animation never hurts legibility. |
| Basic functionality & navigation | 10 | Nav links scroll to sections, CTA works, active-link highlight, bonus features all functional, no console errors. |
| Mobile-friendly layout | 10 | Works from 320px up; hamburger menu works; no horizontal scroll; tap targets OK. |
| Code organisation & README | 10 | Structure in §5, comments, clean modules, README per §13. |
| Explanation, effort, originality | 10 | README rationale, polished motion, original visual identity (not a copy of the reference). |

---

## 15. Build Order (follow this sequence)

1. **Scaffold** Vite project, install deps, create the folder structure, tokens, reset, base styles, fonts.
2. **Static HTML** for all sections with real copy and semantic markup (no animation yet). Verify it already looks decent and is fully responsive.
3. **Data + render functions** for schedule/speakers/highlights/FAQ.
4. **Lenis + GSAP sync**, anchor scrolling, `matchMedia` setup, reduced-motion handling.
5. **Preloader + header** behaviour (sticky/hide/active link).
6. **Hero** visuals (fog/particles/thumbnails) and hero timeline.
7. **Section animations** one by one (about → schedule → speakers → register → faq → social → footer).
8. **Features:** mobile menu → countdown → FAQ accordion → theme switch → registration form + `.ics`.
9. **Desktop polish:** cursor, magnetic buttons, tilt, marquee.
10. **QA pass** (§16), then **README**.

Commit-style checkpoints are encouraged; after each step, run the dev server and make sure nothing regressed.

---

## 16. QA Checklist (must all pass)

**Functional**
- [ ] Every nav link scrolls to its section with correct offset; active state updates.
- [ ] CTA buttons ("Register Now", "View Schedule") work.
- [ ] Countdown shows correct remaining time vs `2026-11-12T10:00:00+05:30`; handles live/after states (test by temporarily editing the date).
- [ ] FAQ opens/closes smoothly, keyboard works, page height refreshes.
- [ ] Theme toggle works, persists across reload, no flash of wrong theme, all sections legible in both.
- [ ] Mobile menu opens/closes, traps focus, `Esc` works, locks scroll, links navigate.
- [ ] Form validates, shows errors, success state appears, `.ics` downloads and opens with correct IST time.
- [ ] No console errors/warnings; no 404s.

**Visual / UX**
- [ ] Tested at 320, 375, 414, 768, 1024, 1280, 1440, 1920 px.
- [ ] No horizontal scroll; no overlapping text; hero title never clips.
- [ ] Text contrast OK in both themes.
- [ ] Animations smooth; nothing "stuck" half-hidden if JS animation fails (progressive enhancement: set initial hidden states from JS, not CSS, or add a `.js` class on `<html>`).
- [ ] `prefers-reduced-motion: reduce` → page fully usable with no scrub/parallax/smooth-scroll and all content visible.
- [ ] Hard refresh mid-page: `ScrollTrigger` positions are correct (no mis-fired animations).
- [ ] Browser resize and orientation change don't break triggers.

**Code**
- [ ] File structure matches §5; every file has a brief header comment.
- [ ] No unused CSS/JS, no commented-out junk, no `console.log` left.
- [ ] `npm run build` succeeds; `npm run preview` looks identical to dev.
- [ ] Lighthouse (desktop): Performance ≥ 85, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.

---

## 17. Do / Don't Summary

**DO**
- Keep the page one cohesive, bold, dark, premium design with purple + cyan accents.
- Make every bonus feature genuinely functional.
- Progressive enhancement + reduced-motion support.
- Write helpful comments and a thorough README.
- Use fictional placeholders everywhere, clearly labelled.

**DON'T**
- Don't copy the reference's text, logo, or photography — only its *layout language and mood*.
- Don't use React/Tailwind/extra animation libraries.
- Don't hide `overflow-x` on `html/body` (breaks Lenis/sticky); don't use `position: fixed` hacks to lock scroll — use `lenis.stop()`.
- Don't animate layout properties (`top/left/width/height`) except the FAQ height tween.
- Don't make the preloader long or unskippable.
- Don't ship lorem ipsum, broken links to nowhere that throw errors, or half-finished features.

---

*End of spec. When finished, report back with: what was built, any deviations from this document and why, and how to run it.*
