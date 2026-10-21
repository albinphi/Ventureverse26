// Accessible FAQ accordion controller with keyboard navigation and height tweens.
// Handles single-open behavior, Arrow key navigation, and ScrollTrigger height sync.

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { $, $$ } from '../utils/dom.js';

export function initFaqAccordion() {
  const items = $$('.faq-item');
  if (items.length === 0) return;

  const triggers = items.map(item => $('.faq-item__trigger', item)).filter(Boolean);

  items.forEach((item, index) => {
    const trigger = $('.faq-item__trigger', item);
    const panel = $('.faq-item__panel', item);
    if (!trigger || !panel) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      
      // Close all items
      items.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('is-open')) {
          closeItem(otherItem);
        }
      });

      // Toggle clicked item
      if (isOpen) {
        closeItem(item);
      } else {
        openItem(item);
      }
    });

    // Keyboard Arrow navigation among triggers (§9.4)
    trigger.addEventListener('keydown', (e) => {
      let targetIndex = -1;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        targetIndex = (index + 1) % triggers.length;
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        targetIndex = (index - 1 + triggers.length) % triggers.length;
      } else if (e.key === 'Home') {
        e.preventDefault();
        targetIndex = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        targetIndex = triggers.length - 1;
      }

      if (targetIndex >= 0 && triggers[targetIndex]) {
        triggers[targetIndex].focus();
      }
    });
  });

  function openItem(item) {
    const trigger = $('.faq-item__trigger', item);
    const panel = $('.faq-item__panel', item);
    if (!trigger || !panel) return;

    item.classList.add('is-open');
    trigger.setAttribute('aria-expanded', 'true');
    panel.removeAttribute('hidden');

    gsap.fromTo(
      panel,
      { height: 0, opacity: 0 },
      {
        height: 'auto',
        opacity: 1,
        duration: 0.35,
        ease: 'power2.out',
        onComplete: () => {
          ScrollTrigger.refresh();
        }
      }
    );
  }

  function closeItem(item) {
    const trigger = $('.faq-item__trigger', item);
    const panel = $('.faq-item__panel', item);
    if (!trigger || !panel) return;

    item.classList.remove('is-open');
    trigger.setAttribute('aria-expanded', 'false');

    gsap.to(panel, {
      height: 0,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.inOut',
      onComplete: () => {
        panel.setAttribute('hidden', '');
        ScrollTrigger.refresh();
      }
    });
  }
}
