// About section animations, stats count-up tween, and highlight cards staggered reveal.
// Controls the stroke-dashoffset icon draw and desktop visual card parallax.

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { eventData } from '../../data/event.js';
import { prefersReducedMotion } from '../utils/media.js';
import { $, $$ } from '../utils/dom.js';

export function initAboutAnimations() {
  const section = $('#about');
  if (!section) return;

  if (prefersReducedMotion()) return;

  // 1. Giant outline overlap heading parallax (§8.5)
  const outlineTitle = $('.about-overlap-title', section);
  if (outlineTitle) {
    gsap.to(outlineTitle, {
      yPercent: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  }

  // 2. Visual art card slow vertical parallax on desktop
  const visualCard = $('.about-visual', section);
  if (visualCard && window.innerWidth >= 1024) {
    gsap.to(visualCard, {
      yPercent: 12,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  }

  // 3. Stats Strip Count-Up (§8.9)
  const statItems = $$('.stat-item', section);
  if (statItems.length > 0) {
    ScrollTrigger.create({
      trigger: '.stats-strip',
      start: 'top 85%',
      once: true,
      onEnter: () => {
        statItems.forEach((item, idx) => {
          const numEl = $('.stat-item__num', item);
          if (!numEl) return;
          const targetVal = eventData.stats[idx]?.value || 0;
          const countObj = { val: 0 };

          gsap.to(countObj, {
            val: targetVal,
            duration: 1.8,
            ease: 'power3.out',
            snap: { val: 1 },
            onUpdate: () => {
              numEl.textContent = Math.floor(countObj.val);
            }
          });
        });
      }
    });
  }

  // 4. Highlights Grid Cards Stagger (§8.10)
  const highlightCards = $$('.highlight-card', section);
  if (highlightCards.length > 0) {
    gsap.fromTo(
      highlightCards,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.highlights-grid',
          start: 'top 85%',
          once: true
        }
      }
    );
  }
}
