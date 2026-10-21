// Site footer scroll effects and giant background wordmark parallax.
// Binds back-to-top smooth scroll trigger and scrubbed wordmark rise.

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { lenis } from '../lenis.js';
import { prefersReducedMotion } from '../utils/media.js';
import { $ } from '../utils/dom.js';

export function initFooterAnimations() {
  const footer = $('#site-footer');
  if (!footer) return;

  // Giant outline wordmark parallax rise (§7.10 & §8.5)
  const wordmark = $('.footer-giant-wordmark', footer);
  if (wordmark && !prefersReducedMotion()) {
    gsap.fromTo(
      wordmark,
      { yPercent: 30 },
      {
        yPercent: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: footer,
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: true
        }
      }
    );
  }

  // Back to top button
  const backToTopBtn = $('#btn-back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.5 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
}
