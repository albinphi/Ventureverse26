// Accessible full-screen mobile menu controller with keyboard focus trap.
// Integrates smooth open/close transitions, Lenis scroll locking, and Esc dismiss.

import { gsap } from 'gsap';
import { lenis } from '../lenis.js';
import { $, $$ } from '../utils/dom.js';

export function initMobileMenu() {
  const toggleBtn = $('#mobile-menu-toggle');
  const overlay = $('#mobile-menu-overlay');
  if (!toggleBtn || !overlay) return;

  const navLinks = $$('.mobile-menu__link', overlay);
  const focusableEls = $$('a, button, input, textarea, select', overlay);
  let isOpen = false;

  function openMenu() {
    isOpen = true;
    toggleBtn.setAttribute('aria-expanded', 'true');
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');

    // Stop Lenis smooth scroll
    if (lenis) lenis.stop();
    document.body.style.overflow = 'hidden';

    // Stagger in links
    gsap.fromTo(
      navLinks,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: 'power3.out', delay: 0.1 }
    );

    // Focus first link
    if (navLinks[0]) {
      setTimeout(() => navLinks[0].focus(), 150);
    }
  }

  function closeMenu() {
    if (!isOpen) return;
    isOpen = false;
    toggleBtn.setAttribute('aria-expanded', 'false');
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');

    // Resume Lenis smooth scroll
    if (lenis) lenis.start();
    document.body.style.overflow = '';

    toggleBtn.focus();
  }

  toggleBtn.addEventListener('click', () => {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close on nav link click and scroll to target
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        closeMenu();
        const target = $(href);
        if (target) {
          setTimeout(() => {
            if (lenis) {
              lenis.scrollTo(target, { offset: -70, duration: 1.2 });
            } else {
              target.scrollIntoView({ behavior: 'smooth' });
            }
          }, 300);
        }
      }
    });
  });

  // Keyboard navigation & Focus trapping
  overlay.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMenu();
      return;
    }

    if (e.key === 'Tab') {
      if (focusableEls.length === 0) return;
      const firstEl = focusableEls[0];
      const lastEl = focusableEls[focusableEls.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    }
  });

  // Auto-close if viewport resizes to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024 && isOpen) {
      closeMenu();
    }
  });
}
