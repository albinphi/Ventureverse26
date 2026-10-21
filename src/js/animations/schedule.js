// Schedule timeline spine scrub draw and node slide-in reveals.
// Synchronizes glowing spine height with scroll position and activates node dots.

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../utils/media.js';
import { $, $$ } from '../utils/dom.js';

export function initScheduleAnimations() {
  const section = $('#schedule');
  const spineProgress = $('.timeline-spine__progress', section);
  if (!section || !spineProgress) return;

  if (prefersReducedMotion()) {
    gsap.set(spineProgress, { scaleY: 1 });
    gsap.set('.timeline-item', { opacity: 1, x: 0 });
    return;
  }

  // Scrubbed timeline spine progress line (§7.5)
  gsap.fromTo(
    spineProgress,
    { scaleY: 0 },
    {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '.timeline-wrap',
        start: 'top 75%',
        end: 'bottom 85%',
        scrub: 0.5
      }
    }
  );

  // Staggered node reveals with alternating slide directions
  const items = $$('.timeline-item', section);
  items.forEach(item => {
    const isLeft = item.classList.contains('timeline-item--left');
    const xOffset = window.innerWidth >= 1024 ? (isLeft ? -45 : 45) : -30;

    gsap.fromTo(
      item,
      { opacity: 0, x: xOffset },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          once: true,
          onEnter: () => item.classList.add('is-active')
        }
      }
    );
  });
}
