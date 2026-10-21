// FAQ section scroll entrance and accordion item reveals.
// Manages viewport trigger initialization for the help center.

import { gsap } from 'gsap';
import { prefersReducedMotion } from '../utils/media.js';
import { $, $$ } from '../utils/dom.js';

export function initFaqAnimations() {
  const section = $('#faq');
  if (!section) return;

  const items = $$('.faq-item', section);
  if (items.length === 0) return;

  if (prefersReducedMotion()) {
    gsap.set(items, { opacity: 1, y: 0 });
    return;
  }

  gsap.fromTo(
    items,
    { opacity: 0, y: 25 },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.08,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.faq-accordion',
        start: 'top 85%',
        once: true
      }
    }
  );
}
