// Fullscreen opening preloader with skippable progress counter and reveal curtain.
// Pauses Lenis smooth scrolling until initialization is complete and respects reduced motion.

import { gsap } from 'gsap';
import { lenis } from '../lenis.js';
import { prefersReducedMotion } from '../utils/media.js';
import { $ } from '../utils/dom.js';

export function initPreloader(onCompleteCallback) {
  const preloader = $('#preloader');
  const bar = $('#preloader-bar');
  const counter = $('#preloader-counter');
  const skipBtn = $('#preloader-skip');

  if (!preloader) {
    if (onCompleteCallback) onCompleteCallback();
    return;
  }

  // If user prefers reduced motion, bypass the preloader immediately
  if (prefersReducedMotion()) {
    preloader.style.display = 'none';
    if (lenis) lenis.start();
    if (onCompleteCallback) onCompleteCallback();
    return;
  }

  if (lenis) lenis.stop();

  let isDismissed = false;

  const dismiss = () => {
    if (isDismissed) return;
    isDismissed = true;

    // Trigger hero entrance sequence while the preloader curtain is lifting
    // so the hero background blooms and elements begin rising seamlessly
    const exitTl = gsap.timeline({
      onComplete: () => {
        preloader.style.display = 'none';
        if (lenis) lenis.start();
      }
    });

    // 1. Gently lift and fade out preloader emblem, counter, and bar
    exitTl
      .to(['.preloader__logo', '.preloader__bar-wrap', '.preloader__counter', '.preloader__skip-btn'], {
        opacity: 0,
        y: -15,
        duration: 0.35,
        ease: 'power2.in',
        stagger: 0.03
      })
      // 2. Smoothly slide the dark curtain up
      .to(preloader, {
        yPercent: -100,
        duration: 0.8,
        ease: 'power4.inOut'
      }, '-=0.1')
      // 3. Kick off hero entrance slightly before curtain is fully gone
      .add(() => {
        if (onCompleteCallback) onCompleteCallback();
      }, '-=0.55');
  };

  if (skipBtn) {
    skipBtn.addEventListener('click', dismiss);
  }

  // Pre-set bar transformOrigin and initial scale
  if (bar) {
    gsap.set(bar, { scaleX: 0, transformOrigin: 'left center' });
  }

  // Animate progress 0 -> 100% cleanly without layout recalculations
  const counterObj = { val: 0 };
  const loadTl = gsap.timeline({ onComplete: dismiss });

  if (bar) {
    loadTl.to(bar, {
      scaleX: 1,
      duration: 1.25,
      ease: 'power2.inOut'
    }, 0);
  }

  if (counter) {
    loadTl.to(counterObj, {
      val: 100,
      duration: 1.25,
      ease: 'power2.inOut',
      roundProps: 'val',
      onUpdate: () => {
        counter.textContent = `${counterObj.val}%`;
      }
    }, 0);
  }
}
