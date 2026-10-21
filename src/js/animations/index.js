// Central animation registry orchestrating GSAP timelines and velocity effects.
// Boots up section entrance triggers, marquee runners, and matchMedia listeners.

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { lenis } from '../lenis.js';
import { prefersReducedMotion } from '../utils/media.js';
import { initHeroAnimation, playHeroEntrance } from './hero.js';
import { initHeaderAnimations } from './header.js';
import { initAboutAnimations } from './about.js';
import { initScheduleAnimations } from './schedule.js';
import { initSpeakersAnimations } from './speakers.js';
import { initRegisterAnimations } from './register.js';
import { initFaqAnimations } from './faq.js';
import { initSocialAnimations } from './social.js';
import { initFooterAnimations } from './footer.js';
import { $$ } from '../utils/dom.js';

gsap.registerPlugin(ScrollTrigger);

export function initAnimations() {
  gsap.defaults({ ease: 'power3.out', duration: 0.9 });

  // Initialize individual section observers
  initHeroAnimation();
  initHeaderAnimations();
  initAboutAnimations();
  initScheduleAnimations();
  initSpeakersAnimations();
  initRegisterAnimations();
  initFaqAnimations();
  initSocialAnimations();
  initFooterAnimations();

  // Initialize horizontal velocity marquee
  initMarquee();
}

export { playHeroEntrance };

/**
 * Initializes continuous marquee loop that responds to scroll velocity (§8.7).
 */
function initMarquee() {
  const tracks = $$('.marquee-band__track');
  if (tracks.length === 0) return;

  if (prefersReducedMotion()) return;

  tracks.forEach(track => {
    let x = 0;
    const speed = 1.2;

    gsap.ticker.add(() => {
      // Base drift
      let currentVelocity = 0;
      if (lenis && lenis.instance && lenis.instance.velocity) {
        currentVelocity = Math.min(Math.max(lenis.instance.velocity * 0.4, -10), 10);
      }

      x -= speed + Math.abs(currentVelocity);

      // Loop point at half track width
      const halfWidth = track.scrollWidth / 2;
      if (Math.abs(x) >= halfWidth) {
        x = 0;
      }

      track.style.transform = `translate3d(${x}px, 0, 0)`;
    });
  });
}
