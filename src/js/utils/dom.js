// Minimal DOM selector utilities for ergonomic querying and event binding.
// Provides lightweight abstractions for document.querySelector and querySelectorAll.

export const $ = (selector, context = document) => context.querySelector(selector);
export const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));

export const on = (element, event, handler, options = {}) => {
  if (!element) return;
  element.addEventListener(event, handler, options);
  return () => element.removeEventListener(event, handler, options);
};
