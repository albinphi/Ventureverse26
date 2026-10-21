// Hero entrance sequence, procedural canvas particle physics, and background parallax.
// Manages the SplitText character reveal, layered glow animation, and performance throttling.

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { splitChars } from '../utils/split.js';
import { prefersReducedMotion } from '../utils/media.js';
import { $, $$ } from '../utils/dom.js';

let heroSplitResult = null;
let hasPlayedEntrance = false;

export function initHeroAnimation() {
  initParticleCanvas();

  if (prefersReducedMotion()) return;

  // Split title characters early so the DOM is structured with zero layout flash
  const titleWordEl = $('#hero-main-title .hero__title-word') || $('#hero-main-title');
  if (titleWordEl) {
    heroSplitResult = splitChars(titleWordEl);
  }

  // Pre-position and hide all animated hero elements cleanly before the preloader lifts
  gsap.set($$('.hero__glow'), { opacity: 0, scale: 0.85 });
  gsap.set('.hero__eyebrow-wrap', { opacity: 0, y: 15 });

  if (heroSplitResult && heroSplitResult.chars && heroSplitResult.chars.length > 0) {
    gsap.set(heroSplitResult.chars, { yPercent: 110, rotate: 6, opacity: 0 });
  }

  gsap.set('.hero__title-year', { opacity: 0, scale: 0.8, y: 10 });
  gsap.set('.hero__tagline', { opacity: 0, y: 18 });
  gsap.set('.hero__desc', { opacity: 0, y: 14 });
  gsap.set($$('.fact-chip'), { opacity: 0, y: 12 });
  gsap.set(['.hero__ctas', '.hero-countdown'], { opacity: 0, y: 14 });
  gsap.set($$('.hero-tile'), { opacity: 0, x: 30 });
  gsap.set('#header-wrapper', { y: -70, opacity: 0 });
}

/**
 * Triggers the main hero entrance sequence after the preloader finishes.
 */
export function playHeroEntrance() {
  const hero = $('#hero');
  if (!hero || hasPlayedEntrance) return;
  hasPlayedEntrance = true;

  if (prefersReducedMotion()) {
    gsap.set(['#header-wrapper', '.hero__eyebrow-wrap', '.hero__title', '.hero__tagline', '.hero__desc', '.fact-chip', '.hero__ctas', '.hero-tile', '.hero-countdown'], {
      opacity: 1,
      y: 0,
      clearProps: 'all'
    });
    return;
  }

  // If split wasn't initialized yet for any reason, initialize now
  if (!heroSplitResult || !heroSplitResult.chars || heroSplitResult.chars.length === 0) {
    const titleWordEl = $('#hero-main-title .hero__title-word') || $('#hero-main-title');
    if (titleWordEl) {
      heroSplitResult = splitChars(titleWordEl);
    }
  }

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // 1. Background glows bloom in softly
  const isLight = document.documentElement.dataset.theme === 'light';
  tl.to(
    $$('.hero__glow'),
    { opacity: isLight ? 0.18 : 0.45, scale: 1, duration: 1.3, ease: 'power2.out', clearProps: 'opacity' }
  );

  // 2. Eyebrow
  tl.to(
    '.hero__eyebrow-wrap',
    { opacity: 1, y: 0, duration: 0.55 },
    '-=0.9'
  );

  // 3. Hero H1 character split reveal (§8.3)
  if (heroSplitResult && heroSplitResult.chars && heroSplitResult.chars.length > 0) {
    tl.to(
      heroSplitResult.chars,
      { yPercent: 0, rotate: 0, opacity: 1, duration: 0.85, stagger: 0.03, ease: 'power4.out' },
      '-=0.45'
    );
  }

  // 2026 accent year badge
  tl.to(
    '.hero__title-year',
    { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' },
    '-=0.55'
  );

  // 4. Tagline & Description
  tl.to(
    '.hero__tagline',
    { opacity: 1, y: 0, duration: 0.65 },
    '-=0.45'
  );

  tl.to(
    '.hero__desc',
    { opacity: 1, y: 0, duration: 0.6 },
    '-=0.4'
  );

  // 5. Fact Chips (staggered)
  tl.to(
    $$('.fact-chip'),
    { opacity: 1, y: 0, duration: 0.45, stagger: 0.07 },
    '-=0.3'
  );

  // 6. CTAs & Countdown Pill
  tl.to(
    ['.hero__ctas', '.hero-countdown'],
    { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
    '-=0.2'
  );

  // 7. Thumbnail Preview Tiles
  tl.to(
    $$('.hero-tile'),
    { opacity: 1, x: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out' },
    '-=0.35'
  );

  // 8. Header slides down smoothly into place
  tl.to(
    '#header-wrapper',
    { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out' },
    '-=0.5'
  );

  // Set up ScrollTrigger parallax for hero elements
  initHeroParallax();
}

function initHeroParallax() {
  if (prefersReducedMotion()) return;

  const hero = $('#hero');
  if (!hero) return;

  // Background ambient glows move at varying parallax speeds (§8.5)
  gsap.to('.hero__glow--purple', {
    yPercent: 30,
    ease: 'none',
    scrollTrigger: {
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

  gsap.to('.hero__glow--cyan', {
    yPercent: -20,
    ease: 'none',
    scrollTrigger: {
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

  // Parallax on thumbnail tiles
  gsap.to('.hero__thumbnails', {
    yPercent: 15,
    opacity: 0.5,
    ease: 'none',
    scrollTrigger: {
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });
}

/**
 * Lightweight procedural canvas particle generator for the hero background.
 */
function initParticleCanvas() {
  const canvas = $('#hero-particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let particles = [];
  let isRunning = true;
  let animFrameId = null;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const particleCount = prefersReducedMotion() ? 0 : (window.innerWidth < 768 ? 35 : 65);

  function resize() {
    width = canvas.parentElement.clientWidth;
    height = canvas.parentElement.clientHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.6,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        alpha: Math.random() * 0.5 + 0.1,
        color: Math.random() > 0.5 ? '#8a2be2' : '#19d3e6'
      });
    }
  }

  function loop() {
    if (!isRunning) return;

    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
    }

    ctx.globalAlpha = 1.0;
    animFrameId = requestAnimationFrame(loop);
  }

  resize();
  createParticles();
  loop();

  window.addEventListener('resize', () => {
    resize();
    createParticles();
  });

  // Pause canvas rendering when hero is scrolled offscreen (§8.10)
  ScrollTrigger.create({
    trigger: '#hero',
    start: 'top top',
    end: 'bottom top',
    onLeave: () => { isRunning = false; },
    onEnterBack: () => {
      if (!isRunning) {
        isRunning = true;
        loop();
      }
    }
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      isRunning = false;
    } else {
      isRunning = true;
      loop();
    }
  });
}
