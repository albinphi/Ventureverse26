// Desktop cursor, magnetic button attraction, and 3D card tilt micro-interactions.
// Restricted strictly to fine-pointer devices with hover capability for optimal performance.

import { gsap } from 'gsap';
import { isDesktop } from '../utils/media.js';
import { $, $$ } from '../utils/dom.js';

export function initCursorAndMicroInteractions() {
  if (!isDesktop()) return;

  const cursorEl = $('#custom-cursor');
  const dotEl = $('#cursor-dot');
  const ringEl = $('#cursor-ring');
  if (!cursorEl || !dotEl || !ringEl) return;

  // Use gsap.quickTo for smooth 60fps cursor tracking
  const setDotX = gsap.quickTo(dotEl, 'x', { duration: 0.1, ease: 'power2.out' });
  const setDotY = gsap.quickTo(dotEl, 'y', { duration: 0.1, ease: 'power2.out' });
  const setRingX = gsap.quickTo(ringEl, 'x', { duration: 0.28, ease: 'power3.out' });
  const setRingY = gsap.quickTo(ringEl, 'y', { duration: 0.28, ease: 'power3.out' });

  window.addEventListener('mousemove', (e) => {
    setDotX(e.clientX);
    setDotY(e.clientY);
    setRingX(e.clientX);
    setRingY(e.clientY);
  });

  // Hover states for interactive elements (excluding text inputs)
  const hoverTargets = $$('a, button, [role="button"], .tilt-card, .faq-item__trigger');
  hoverTargets.forEach(target => {
    target.addEventListener('mouseenter', () => {
      cursorEl.classList.add('is-hovering');
    });
    target.addEventListener('mouseleave', () => {
      cursorEl.classList.remove('is-hovering');
    });
  });

  // Magnetic Button Effect (§8.8)
  const magneticBtns = $$('[data-magnetic]');
  magneticBtns.forEach(btn => {
    const xTo = gsap.quickTo(btn, 'x', { duration: 0.35, ease: 'power3.out' });
    const yTo = gsap.quickTo(btn, 'y', { duration: 0.35, ease: 'power3.out' });

    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      xTo(relX * 0.35);
      yTo(relY * 0.35);
      cursorEl.classList.add('is-magnetic');
    });

    btn.addEventListener('mouseleave', () => {
      xTo(0);
      yTo(0);
      cursorEl.classList.remove('is-magnetic');
    });
  });

  // 3D Card Tilt with Glare Gradient (§8.8)
  const tiltCards = $$('[data-tilt]');
  tiltCards.forEach(card => {
    const glare = card.querySelector('.tilt-card__glare');

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // ±6 degree tilt max
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      gsap.to(card, {
        rotateX,
        rotateY,
        transformPerspective: 900,
        duration: 0.25,
        ease: 'power2.out'
      });

      if (glare) {
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.12), transparent 60%)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.45,
        ease: 'power3.out'
      });
    });
  });
}
