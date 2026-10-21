// Main application entry point for VentureVerse 2026.
// Imports design tokens, stylesheets, executes data rendering, and boots animation loops.

// Core Stylesheets
import './styles/tokens.css';
import './styles/reset.css';
import './styles/base.css';
import './styles/layout.css';
import './styles/components.css';

// Section Stylesheets
import './styles/sections/header.css';
import './styles/sections/hero.css';
import './styles/sections/about.css';
import './styles/sections/schedule.css';
import './styles/sections/speakers.css';
import './styles/sections/register.css';
import './styles/sections/faq.css';
import './styles/sections/social.css';
import './styles/sections/footer.css';

// Data Renderers (§5)
import { renderHighlights } from './js/render/highlights.js';
import { renderSchedule } from './js/render/schedule.js';
import { renderSpeakers } from './js/render/speakers.js';
import { renderFaqs } from './js/render/faqs.js';

// Smooth Scroll & Animations
import { initLenis } from './js/lenis.js';
import { initPreloader } from './js/animations/preloader.js';
import { initAnimations, playHeroEntrance } from './js/animations/index.js';

// Interactive Features (§9)
import { initCountdown } from './js/features/countdown.js';
import { initMobileMenu } from './js/features/mobileMenu.js';
import { initFaqAccordion } from './js/features/faqAccordion.js';
import { initThemeSwitch } from './js/features/themeSwitch.js';
import { initRegistrationForm } from './js/features/registrationForm.js';
import { initCursorAndMicroInteractions } from './js/features/cursor.js';
import { $ } from './js/utils/dom.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Render dynamic data-driven sections (§5 & §1)
  renderHighlights($('#highlights-container'));
  renderSchedule($('#schedule-container'));
  renderSpeakers($('#speakers-container'));
  renderFaqs($('#faq-container'));

  // 2. Initialize smooth scrolling
  initLenis();

  // 3. Initialize interactive features
  initThemeSwitch();
  initCountdown();
  initMobileMenu();
  initFaqAccordion();
  initRegistrationForm();
  initCursorAndMicroInteractions();

  // 4. Initialize GSAP ScrollTrigger animations
  initAnimations();

  // 5. Start preloader; trigger hero entrance on dismiss (§7.0)
  initPreloader(() => {
    playHeroEntrance();
  });
});
