// Dynamic renderer for the 4 event highlight cards in the About section.
// Generates accessible HTML cards with index counters, SVG icons, and tilt attributes.

import { highlightsData } from '../../data/highlights.js';

export function renderHighlights(container) {
  if (!container) return;

  const html = highlightsData.map((item, idx) => `
    <article class="highlight-card tilt-card" data-tilt style="--accent-color: ${item.color};" tabindex="0">
      <div class="highlight-card__glare"></div>
      <div class="highlight-card__header">
        <span class="highlight-card__index">${item.index}</span>
        <div class="highlight-card__icon-wrap">
          ${getHighlightIcon(item.icon)}
        </div>
      </div>
      <div class="highlight-card__body">
        <h3 class="highlight-card__title">${item.title}</h3>
        <p class="highlight-card__desc">${item.description}</p>
      </div>
      <div class="highlight-card__footer">
        <span class="highlight-card__badge">Pillar ${idx + 1}</span>
      </div>
    </article>
  `).join('');

  container.innerHTML = html;
}

function getHighlightIcon(iconType) {
  switch (iconType) {
    case 'flame':
      return `
        <svg class="icon-svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3z"/>
        </svg>
      `;
    case 'rocket':
      return `
        <svg class="icon-svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
        </svg>
      `;
    case 'target':
      return `
        <svg class="icon-svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10"/>
          <circle cx="12" cy="12" r="6"/>
          <circle cx="12" cy="12" r="2"/>
        </svg>
      `;
    case 'network':
    default:
      return `
        <svg class="icon-svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="18" cy="5" r="3"/>
          <circle cx="6" cy="12" r="3"/>
          <circle cx="18" cy="19" r="3"/>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
        </svg>
      `;
  }
}
