// Real-time countdown timer targeting VentureVerse 2026 on 12 November 2026 IST.
// Manages ticking state changes, digit update animations, and event-day transitions.

import { gsap } from 'gsap';
import { eventData } from '../../data/event.js';
import { $ } from '../utils/dom.js';

export function initCountdown() {
  const container = $('#hero-countdown');
  if (!container) return;

  const targetTime = new Date(eventData.targetDateISO).getTime();
  const endTime = new Date(eventData.endDateISO).getTime();

  let prevDays = null;
  let prevHours = null;
  let prevMins = null;
  let prevSecs = null;
  let timerId = null;

  function update() {
    const now = Date.now();

    // Check if event has ended
    if (now >= endTime) {
      container.innerHTML = `
        <div class="hero-countdown__finished">
          <span class="hero-countdown__label">VENTUREVERSE 2026</span>
          <span class="countdown-label">Thanks for joining us!</span>
        </div>
      `;
      if (timerId) clearInterval(timerId);
      return;
    }

    // Check if event is currently happening
    if (now >= targetTime && now < endTime) {
      container.innerHTML = `
        <div class="hero-countdown__live">
          <span class="hero-countdown__pulse" style="background:#ff3d3d; box-shadow:0 0 10px #ff3d3d;"></span>
          <span class="hero-countdown__label" style="color:#ff3d3d;">HAPPENING NOW</span>
        </div>
      `;
      return;
    }

    // Still before the event
    const diff = Math.max(0, targetTime - now);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    const pad = (n) => String(n).padStart(2, '0');

    // Update Days
    if (days !== prevDays) {
      animateDigit('#count-days', pad(days));
      prevDays = days;
    }
    // Update Hours
    if (hours !== prevHours) {
      animateDigit('#count-hours', pad(hours));
      prevHours = hours;
    }
    // Update Minutes
    if (mins !== prevMins) {
      animateDigit('#count-mins', pad(mins));
      prevMins = mins;
    }
    // Update Seconds
    if (secs !== prevSecs) {
      animateDigit('#count-secs', pad(secs));
      prevSecs = secs;
    }
  }

  function animateDigit(selector, value) {
    const el = $(selector, container);
    if (!el) return;

    if (el.textContent === value) return;

    gsap.fromTo(
      el,
      { y: -6, opacity: 0.6 },
      { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }
    );
    el.textContent = value;
  }

  // Initial immediate update
  update();
  timerId = setInterval(update, 1000);

  // Re-sync on visibility change to handle background tab throttling
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      update();
    }
  });
}
