# VentureVerse 2026 — Ideas into Action

> A cinematic, high-performance, dark-mode event landing page for **VentureVerse 2026**, organised by the **Entrepreneurship Development Cell (EDC), JSS University, Noida**.

**Live URL:** [https://ventureverse-2026-kappa.vercel.app](https://ventureverse-2026-kappa.vercel.app)

![VentureVerse 2026 Landing Page Preview](https://via.placeholder.com/1200x630/050507/19d3e6?text=VentureVerse+2026+%E2%80%94+Ideas+into+Action)

---

## 1. Live Features Checklist

### Required Sections (All Implemented)
- [x] **Announcement Bar & Sticky Header:** Top event ticker, circular "V" emblem + EDC JSS wordmark, sticky blur-on-scroll, scroll-direction reveal/hide, active-section highlight indicator, and full-screen mobile menu.
- [x] **Cinematic Hero:** Full `100svh` view, procedural canvas particles, atmospheric purple/cyan glow orbs, SplitText character entrance, live countdown pill, event fact chips, CTAs, and bottom-right preview tiles.
- [x] **About & Key Pillars:** Giant outline-stroke title overlapping the dark panel, vertical cyan micro-label, procedural neon artwork card, animated stats counter strip (`5 hrs`, `4 speakers`, `6 sessions`, `500+ students`), and 4 interactive pillar cards with 3D tilt.
- [x] **Velocity-Reactive Marquee:** Horizontal marquee band between sections that dynamically reacts to scroll velocity.
- [x] **Schedule & Agenda:** Vertical timeline with a scrubbed glowing spine, alternating session cards, live/upcoming badges, and real-time IST session checking.
- [x] **Speakers & Mentors:** 4-column responsive grid featuring 4 fictional profiles with unique geometric gradient avatars, credentials, session tags, and social links.
- [x] **Floating Registration Card:** High-contrast light card floating on the dark page with live 140-char counter, client-side validation, simulated reservation state, and downloadable `.ics` calendar invitation.
- [x] **FAQ Accordion:** Accessible collapsible accordion with keyboard Arrow navigation and height animation.
- [x] **Follow the Buzz (Social):** 3 abstract gradient platform tiles with expanding cyan icon badges.
- [x] **Site Footer:** 3-column layout, branding, quick links, social links, contact placeholders, back-to-top trigger, and a giant faded parallax background wordmark.

### Bonus Features (Fully Functional)
- [x] **Mobile Menu:** Hamburger-to-X morph button, full-screen overlay, focus trap, Esc key dismiss, and smooth navigation with Lenis scroll locking.
- [x] **Live Countdown:** Real-time countdown targeting `2026-11-12T10:00:00+05:30` with digit change animations and event-day live states.
- [x] **Theme Switch (Dark ↔ Light):** Smooth 300ms transition with `localStorage` persistence, pre-paint `<head>` script to prevent flash, and contrast-safe light mode palette.
- [x] **Demo Registration Form:** Inline validation, ticket generator (`VV26-XXXX`), and client-side `.ics` file generator.
- [x] **Desktop Micro-Interactions:** Smooth custom cursor with trailing ring, magnetic button attraction, and 3D card tilt with dynamic glare.

---

## 2. Tech Stack & Why

- **Vite:** Next-generation frontend tooling providing sub-millisecond HMR and highly optimized production bundling with zero boilerplate.
- **Vanilla JavaScript (ES Modules):** Clean, standard-compliant JavaScript without framework overhead, ensuring code is beginner-explainable, fast, and easy to maintain.
- **GSAP (GreenSock Animation Platform) + ScrollTrigger + SplitText:** Industry-standard animation engine delivering 60fps timeline reveals, scroll-driven scrubs, and character text splitting.
- **Lenis:** State-of-the-art smooth scrolling engine synchronized with GSAP's ticker for buttery momentum scrolling.
- **Vanilla CSS (Custom Properties):** Design tokens, fluid typography with `clamp()`, and scoped component styles without utility-class clutter.

---

## 3. Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm (v9+)

### Installation
```bash
# Install dependencies
npm install

# Start local development server (runs on http://localhost:5173)
npm run dev

# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 4. Project Structure

```
ventureverse-2026/
├─ index.html                 # Semantic HTML shell, SEO meta, JSON-LD schema, Google Fonts
├─ README.md                  # Complete documentation and architectural overview
├─ package.json               # Project scripts and dependencies (Vite, GSAP, Lenis)
├─ public/
│  └─ favicon.svg             # Vector orbit emblem favicon
└─ src/
   ├─ main.js                 # Application entry point: imports styles, renders data, boots modules
   ├─ styles/
   │  ├─ tokens.css           # CSS variables (colors, typography, spacing, dark/light themes)
   │  ├─ reset.css            # Modern CSS reset
   │  ├─ base.css             # Body, typography utilities, focus styles, film grain, Lenis rules
   │  ├─ layout.css           # Containers, grids, section vertical rhythm, section headers
   │  ├─ components.css       # Buttons, pills, chips, tilt cards, custom cursor, preloader, marquee
   │  └─ sections/
   │     ├─ header.css        # Announcement bar, sticky header, mobile overlay
   │     ├─ hero.css          # Full-height hero, canvas particles, glow orbs, preview tiles
   │     ├─ about.css         # Overlapping stroke text, visual card, stats strip, highlights
   │     ├─ schedule.css      # Vertical timeline, glowing scrubbed spine, alternating cards
   │     ├─ speakers.css      # 4-column speaker grid, gradient avatars, social icons
   │     ├─ register.css      # High-contrast booking card, form validation, ticket pass
   │     ├─ faq.css           # Accordion buttons, icon morphing, collapsible panels
   │     ├─ social.css        # "Follow the Buzz" gradient cards with expanding badges
   │     └─ footer.css        # 3-column footer, contact row, giant background parallax wordmark
   ├─ js/
   │  ├─ lenis.js             # Lenis smooth scroll setup, GSAP ticker sync, anchor interceptor
   │  ├─ animations/
   │  │  ├─ index.js          # Central animation orchestrator & velocity marquee
   │  │  ├─ preloader.js      # 0-100% counter preloader with curtain wipe-up
   │  │  ├─ header.js         # Header scroll-direction reveal & active link spy
   │  │  ├─ hero.js           # SplitText character reveal, particle canvas, parallax
   │  │  ├─ about.js          # Stats count-up tween & highlights cards stagger
   │  │  ├─ schedule.js       # Timeline spine scroll-scrub draw & item slide-in
   │  │  ├─ speakers.js       # Staggered speaker card rise
   │  │  ├─ register.js       # 3D perspective settle for booking card
   │  │  ├─ faq.js            # Accordion items viewport reveal
   │  │  ├─ social.js         # Social preview tiles staggered entry
   │  │  └─ footer.js         # Giant wordmark parallax rise & back-to-top handler
   │  ├─ features/
   │  │  ├─ countdown.js      # Live ticking countdown to 12 Nov 2026 IST
   │  │  ├─ mobileMenu.js     # Accessible full-screen menu overlay with focus trap
   │  │  ├─ faqAccordion.js   # Single-open accordion with Arrow key keyboard navigation
   │  │  ├─ themeSwitch.js    # Dark/light theme switcher with localStorage persistence
   │  │  ├─ registrationForm.js # Form validation, simulated submission, .ics calendar export
   │  │  └─ cursor.js         # Desktop trailing cursor, magnetic buttons, 3D card tilt
   │  ├─ render/
   │  │  ├─ highlights.js     # Dynamic renderer for 4 key pillar cards
   │  │  ├─ schedule.js       # Dynamic renderer for 6 agenda sessions & live badge
   │  │  ├─ speakers.js       # Dynamic renderer for 4 speaker profiles
   │  │  └─ faqs.js           # Dynamic renderer for 6 accessible FAQ items
   │  ├─ utils/
   │  │  ├─ dom.js            # Minimal $, $$ DOM selector utilities
   │  │  ├─ media.js          # prefersReducedMotion, isTouch, isDesktop helpers
   │  │  └─ split.js          # Text splitting with GSAP SplitText & accessible fallback
   │  └─ data/
   │     ├─ event.js          # Event date, time, venue, organiser (single source of truth)
   │     ├─ schedule.js       # Schedule session items
   │     ├─ speakers.js       # Speaker profiles and gradients
   │     ├─ highlights.js     # Highlight pillar benefits
   │     └─ faqs.js           # Questions and answers
   └─ assets/                 # Icons and vector art assets
```

---

## 5. How It Works (Beginner-Friendly Explanation)

### How Lenis and GSAP are Synced
By default, the browser handles scrolling natively on its own render thread. **Lenis** intercepts wheel and touch inputs to create smooth momentum scrolling, while **GSAP ScrollTrigger** needs to know the exact scroll position on every frame to calculate animations.

To keep them in perfect lockstep:
1. When Lenis scrolls, it fires a `scroll` event that tells `ScrollTrigger.update()` to recalculate trigger positions.
2. We plug Lenis's animation frame method (`lenis.raf`) directly into GSAP's internal ticker loop: `gsap.ticker.add((time) => lenis.raf(time * 1000))`.
3. We set `gsap.ticker.lagSmoothing(0)` so GSAP never stutters or drops frames when tabs lose focus. This ensures zero jank or mismatched animation positions.

### How Scroll Animations are Organised
Every major section has its own animation file in `src/js/animations/` (e.g. `hero.js`, `about.js`, `schedule.js`). This modular approach keeps code isolated, beginner-friendly, and maintainable. The central `index.js` file imports each module and registers them once DOM nodes are ready.

### How to Edit Content and Configuration
- **Event details & dates:** Open `src/data/event.js` to change the date, venue, or countdown target timestamp.
- **Agenda sessions:** Open `src/data/schedule.js` to add or edit timeline items.
- **Speakers:** Open `src/data/speakers.js` to adjust speaker names, roles, or gradient colours.
- **Colours & Tokens:** Open `src/styles/tokens.css` to update theme variables like `--purple`, `--cyan`, `--bg`, or typography scales.

---

## 6. Design Decisions & Rationale

- **Colour Palette:** Built around a dark atmospheric canvas (`#050507`), accented by **electric purple (`#8a2be2`)** as the primary action colour and **vibrant cyan (`#19d3e6`)** for micro-labels, dates, and active indicators. Sparing touches of magenta (`#ff3d9a`) add depth to gradients.
- **Typography:** Google Fonts **Kanit** (weights 700–900) delivers high-impact, uppercase display headlines reminiscent of contemporary festival and tech posters. **Inter** provides crisp, readable body text across all device sizes.
- **Visual Texture:** A subtle, fixed 4.5% SVG film-grain overlay softens pure CSS gradients and gives the dark interface a tactile, cinematic poster aesthetic.
- **Inverted Registration Card:** Inspired by the design reference's white booking widget floating on a dark background, our registration card intentionally uses a high-contrast light surface (`--surface-light: #f4f5fb`) to create an immediate focal point and drive student conversions. In light mode, it cleanly inverts to preserve contrast.
- **Accessibility & Reduced Motion:** All interactive elements feature high-visibility `:focus-visible` rings (2px cyan with 3px offset). When users enable `prefers-reduced-motion`, smooth scrolling is disabled, the preloader instantly dismisses, scrubbed animations are skipped, and all content renders in its final, accessible state.

---

## 7. Responsive Strategy

- **Mobile-First Breakpoints:** Styled across `480px`, `768px`, `1024px`, and `1280px`.
- **Viewport Height Safety:** Hero uses `100svh` and `100dvh` to adapt seamlessly to mobile browser URL address bars without layout jumping.
- **Touch Target Sizing:** All buttons and interactive elements maintain tap targets of at least `44×44px` with form input fonts set to `16px` to prevent iOS auto-zoom.
- **Strict Horizontal Clipping:** Decorative bleed elements use `overflow: clip` on local wrapper containers instead of `overflow-x: hidden` on `body`, which would otherwise break Lenis smooth scrolling and sticky navigation.

---

## 8. Known Limitations & Future Improvements

- **Registration Backend:** The registration form is client-side demo only. For production, this could be connected to Supabase, Firebase, or a university API endpoint to persist ticket passes in a database.
- **Offline PWA:** Service worker caching could be added to allow attendees to open their ticket offline during the event.
- **Speaker Photos:** Speaker profiles use procedural geometric gradient avatars with initials. When real speaker headshots become available, they can drop in directly using `object-fit: cover`.

---

## 9. Credits & Disclaimers

- **Fonts:** [Kanit](https://fonts.google.com/specimen/Kanit) & [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts.
- **Libraries:** [GSAP 3](https://greensock.com/gsap/) (GreenSock) and [Lenis](https://github.com/darkroomengineering/lenis) (Darkroom Engineering).
- **Disclaimer:** *VentureVerse 2026 is a fictional event created for a design and development exercise. All dates, speakers, session details, and contact placeholders are fictional.*
