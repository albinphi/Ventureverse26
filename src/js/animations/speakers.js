// Speaker portrait card reveal animations and desktop pointer parallax.
// Controls staggered entrance timing and avatar pattern movement on fine-pointer devices.

import { gsap } from 'gsap';
import { prefersReducedMotion } from '../utils/media.js';
import { $, $$ } from '../utils/dom.js';

export function initSpeakersAnimations() {
  const section = $('#speakers');
  if (!section) return;

  const cards = $$('.speaker-card', section);
  if (cards.length === 0) return;

  if (prefersReducedMotion()) {
    gsap.set(cards, { opacity: 1, y: 0 });
    return;
  }

  // Staggered rise-in
  gsap.fromTo(
    cards,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.speakers-grid',
        start: 'top 85%',
        once: true
      }
    }
  );
}
