// Dynamic renderer for the interactive FAQ accordion list.
// Outputs fully accessible button headers and controlled collapsible panel regions.

import { faqsData } from '../../data/faqs.js';

export function renderFaqs(container) {
  if (!container) return;

  const itemsHtml = faqsData.map((faq, index) => `
    <div class="faq-item" data-faq-index="${index}">
      <h3 class="faq-item__header">
        <button
          type="button"
          class="faq-item__trigger"
          id="faq-btn-${index}"
          aria-expanded="false"
          aria-controls="faq-panel-${index}"
        >
          <span class="faq-item__question">${faq.question}</span>
          <span class="faq-item__icon" aria-hidden="true">
            <svg class="faq-icon-svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line class="faq-icon-h" x1="12" y1="5" x2="12" y2="19"></line>
              <line class="faq-icon-v" x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </span>
        </button>
      </h3>
      <div
        id="faq-panel-${index}"
        class="faq-item__panel"
        role="region"
        aria-labelledby="faq-btn-${index}"
        hidden
      >
        <div class="faq-item__content">
          <p class="faq-item__answer">${faq.answer}</p>
        </div>
      </div>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="faq-accordion" role="presentation">
      ${itemsHtml}
    </div>
  `;
}
