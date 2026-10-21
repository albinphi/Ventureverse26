// Media query and device capability detection helpers.
// Handles checks for reduced motion preference, touch input, and responsive breakpoints.

export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const isTouch = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

export const isDesktop = () => {
  return window.matchMedia('(min-width: 1024px)').matches && !isTouch();
};

export const onMotionPreferenceChange = (callback) => {
  const query = window.matchMedia('(prefers-reduced-motion: reduce)');
  const handler = (e) => callback(e.matches);
  query.addEventListener('change', handler);
  return () => query.removeEventListener('change', handler);
};
