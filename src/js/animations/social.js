// "Follow the Buzz" social section animation and card stagger.
// Handles entry timeline for the 3 abstract platform preview cards.

import { gsap } from 'gsap';
import { prefersReducedMotion } from '../utils/media.js';
import { $, $$ } from '../utils/dom.js';

export function initSocialAnimations() {
  const section = $('#social');
  if (!section) return;

  const tiles = $$('.social-tile', section);
  if (tiles.length === 0) return;

  if (prefersReducedMotion()) {
    gsap.set(tiles, { opacity: 1, y: 0 });
    return;
  }

  gsap.fromTo(
    tiles,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.social-tiles-grid',
        start: 'top 85%',
        once: true
      }
    }
  );
}
