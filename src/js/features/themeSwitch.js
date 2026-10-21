// Dark/Light theme toggle feature with localStorage persistence.
// Manages smooth attribute transitions without initial paint flash.

import { $ } from '../utils/dom.js';

const THEME_STORAGE_KEY = 'ventureverse_theme';

export function initThemeSwitch() {
  const toggleBtn = $('#theme-toggle');
  if (!toggleBtn) return;

  // Retrieve current theme
  const currentTheme = document.documentElement.dataset.theme || 'dark';
  updateButtonState(toggleBtn, currentTheme);

  toggleBtn.addEventListener('click', () => {
    const active = document.documentElement.dataset.theme || 'dark';
    const nextTheme = active === 'dark' ? 'light' : 'dark';

    // Apply temporary transition class
    document.documentElement.classList.add('theme-in-transition');
    document.documentElement.dataset.theme = nextTheme;

    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // Ignore private browsing storage errors
    }

    updateButtonState(toggleBtn, nextTheme);

    setTimeout(() => {
      document.documentElement.classList.remove('theme-in-transition');
    }, 320);
  });
}

function updateButtonState(btn, theme) {
  const isLight = theme === 'light';
  btn.setAttribute('aria-pressed', isLight ? 'true' : 'false');
  btn.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
}
