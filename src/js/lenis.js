// Smooth scrolling engine using Lenis integrated seamlessly with the GSAP ticker.
// Intercepts anchor links and honors accessibility prefers-reduced-motion preferences.

import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './utils/media.js';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;

export function initLenis() {
  // If reduced motion is requested, do not initialize smooth momentum scrolling
  if (prefersReducedMotion()) {
    initAnchorScrolling(null);
    return null;
  }

  lenisInstance = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.2,
  });

  lenisInstance.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    if (lenisInstance) {
      lenisInstance.raf(time * 1000);
    }
  });
  gsap.ticker.lagSmoothing(0);

  initAnchorScrolling(lenisInstance);

  // Refresh ScrollTrigger when all fonts and DOM assets are loaded
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });
  }

  return lenisInstance;
}

function initAnchorScrolling(lenisRef) {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href || href === '#' || href === '#!') return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();

    const headerHeight = 96;

    if (lenisRef) {
      lenisRef.scrollTo(target, {
        offset: -headerHeight,
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
}

export const lenis = {
  stop: () => lenisInstance && lenisInstance.stop(),
  start: () => lenisInstance && lenisInstance.start(),
  scrollTo: (target, opts) => lenisInstance ? lenisInstance.scrollTo(target, opts) : null,
  get instance() { return lenisInstance; }
};
