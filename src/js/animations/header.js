// Sticky header behavior, scroll-direction reveal/hide, and active section spy.
// Controls the backdrop blur transition and sliding underline indicator on the desktop nav.

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { $, $$ } from '../utils/dom.js';

export function initHeaderAnimations() {
  const headerWrapper = $('#header-wrapper');
  const header = $('#site-header');
  if (!header) return;

  const targetWrapper = headerWrapper || header;
  let lastScrollY = window.scrollY;

  // Track scroll direction & blur threshold
  window.addEventListener('scroll', () => {
    const currentY = window.scrollY;

    if (currentY > 40) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }

    // Hide on downward scroll, reveal on upward scroll (past 150px)
    if (currentY > 150) {
      if (currentY > lastScrollY && !targetWrapper.classList.contains('is-hidden')) {
        targetWrapper.classList.add('is-hidden');
      } else if (currentY < lastScrollY && targetWrapper.classList.contains('is-hidden')) {
        targetWrapper.classList.remove('is-hidden');
      }
    } else {
      targetWrapper.classList.remove('is-hidden');
    }

    lastScrollY = currentY;
  }, { passive: true });

  // Active section spy for navigation links
  const sections = ['#about', '#schedule', '#speakers', '#register', '#faq'];
  const navLinks = $$('.site-nav__link');
  const indicator = $('.site-nav__indicator');

  function updateIndicator(activeLink) {
    if (!indicator || !activeLink) return;
    const parentRect = activeLink.parentElement.parentElement.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();
    const left = linkRect.left - parentRect.left;
    const width = linkRect.width;

    gsap.to(indicator, {
      left,
      width,
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out'
    });
  }

  sections.forEach(selector => {
    const section = $(selector);
    if (!section) return;

    ScrollTrigger.create({
      trigger: section,
      start: 'top 50%',
      end: 'bottom 50%',
      onEnter: () => activateLink(selector),
      onEnterBack: () => activateLink(selector)
    });
  });

  function activateLink(selector) {
    navLinks.forEach(link => {
      if (link.getAttribute('href') === selector) {
        link.classList.add('is-active');
        updateIndicator(link);
      } else {
        link.classList.remove('is-active');
      }
    });
  }
}
