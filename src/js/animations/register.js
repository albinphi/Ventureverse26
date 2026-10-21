// Registration section booking card entrance and background glow animation.
// Implements 3D perspective settle for the high-contrast light card.

import { gsap } from 'gsap';
import { prefersReducedMotion } from '../utils/media.js';
import { $, $$ } from '../utils/dom.js';

export function initRegisterAnimations() {
  const section = $('#register');
  const bookingCard = $('.booking-card', section);
  if (!section || !bookingCard) return;

  if (prefersReducedMotion()) {
    gsap.set(bookingCard, { opacity: 1, y: 0, rotateX: 0 });
    return;
  }

  // 3D settle animation on scroll entrance (§8.6)
  gsap.fromTo(
    bookingCard,
    { opacity: 0, y: 60, rotateX: 12, transformPerspective: 1200 },
    {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 0.85,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: bookingCard,
        start: 'top 85%',
        once: true
      }
    }
  );

  // Perks list stagger
  const perks = $$('.perk-item', section);
  if (perks.length > 0) {
    gsap.fromTo(
      perks,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.register-perks',
          start: 'top 85%',
          once: true
        }
      }
    );
  }
}
