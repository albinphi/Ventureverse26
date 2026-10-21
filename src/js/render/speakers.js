// Dynamic renderer for the 4 fictional speaker profiles.
// Generates portrait cards with geometric gradient avatars, social icons, and session badges.

import { speakersData } from '../../data/speakers.js';

export function renderSpeakers(container) {
  if (!container) return;

  const cardsHtml = speakersData.map(speaker => `
    <article class="speaker-card tilt-card" data-tilt tabindex="0">
      <div class="speaker-card__media-wrap">
        <div class="speaker-card__avatar" style="--speaker-grad: ${speaker.gradient};">
          <div class="speaker-card__avatar-pattern"></div>
          <span class="speaker-card__initials">${speaker.initials}</span>
          <div class="speaker-card__overlay"></div>
        </div>
        <span class="speaker-card__tag">${speaker.session}</span>
      </div>
      
      <div class="speaker-card__content">
        <h3 class="speaker-card__name">${speaker.name}</h3>
        <p class="speaker-card__role">${speaker.role}</p>
        <p class="speaker-card__subtext">${speaker.subtext}</p>
        
        <div class="speaker-card__socials" role="list" aria-label="Social profiles for ${speaker.name}">
          <a href="${speaker.links.linkedin}" class="speaker-social-link" target="_blank" rel="noopener noreferrer" aria-label="${speaker.name} on LinkedIn">
            <svg class="icon-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect x="2" y="9" width="4" height="12"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </a>
          <a href="${speaker.links.x}" class="speaker-social-link" target="_blank" rel="noopener noreferrer" aria-label="${speaker.name} on X (Twitter)">
            <svg class="icon-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M4 4l11.733 16h4.267l-11.733 -16z"/>
              <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/>
            </svg>
          </a>
          <a href="${speaker.links.instagram}" class="speaker-social-link" target="_blank" rel="noopener noreferrer" aria-label="${speaker.name} on Instagram">
            <svg class="icon-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
          </a>
        </div>
      </div>
    </article>
  `).join('');

  container.innerHTML = `
    <div class="speakers-grid">
      ${cardsHtml}
    </div>
    <p class="speakers-footnote">
      <span class="footnote-mark">*</span> Speaker profiles and names are fictional placeholders created for this design exercise.
    </p>
  `;
}
