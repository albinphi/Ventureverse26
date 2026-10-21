// Interactive registration demo form with inline validation and .ics calendar generation.
// Simulates seat reservation, issues ticket pass, and exports calendar invitations without backend.

import { gsap } from 'gsap';
import { $ } from '../utils/dom.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TICKET_STORAGE_KEY = 'ventureverse_demo_ticket';

export function initRegistrationForm() {
  const form = $('#registration-form');
  const cardBody = $('#booking-card-body');
  const counterEl = $('#idea-counter');
  const textareaEl = $('#reg-idea');
  if (!form || !cardBody) return;

  // Live 140-char counter for pitch idea
  if (textareaEl && counterEl) {
    textareaEl.addEventListener('input', () => {
      const remaining = 140 - textareaEl.value.length;
      counterEl.textContent = `${textareaEl.value.length}/140`;
      if (remaining < 0) {
        counterEl.style.color = '#e53e3e';
      } else {
        counterEl.style.color = '';
      }
    });
  }

  // Clear validation error on input
  form.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('input', () => {
      const group = input.closest('.form-group');
      if (group) {
        group.classList.remove('has-error');
        input.removeAttribute('aria-invalid');
      }
    });
  });

  // Handle submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = $('#reg-name');
    const emailInput = $('#reg-email');
    const yearSelect = $('#reg-year');
    const ideaInput = $('#reg-idea');
    const submitBtn = $('#reg-submit-btn');

    let isValid = true;
    let firstInvalid = null;

    // Validate Name
    const nameVal = nameInput?.value.trim() || '';
    if (nameVal.length < 2) {
      setError(nameInput, 'Please enter your full name (at least 2 characters).');
      isValid = false;
      if (!firstInvalid) firstInvalid = nameInput;
    }

    // Validate Email
    const emailVal = emailInput?.value.trim() || '';
    if (!EMAIL_REGEX.test(emailVal)) {
      setError(emailInput, 'Please enter a valid email address.');
      isValid = false;
      if (!firstInvalid) firstInvalid = emailInput;
    }

    // Validate Year
    const yearVal = yearSelect?.value || '';
    if (!yearVal) {
      setError(yearSelect, 'Please select your current college year.');
      isValid = false;
      if (!firstInvalid) firstInvalid = yearSelect;
    }

    if (!isValid) {
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Simulate network reservation
    submitBtn.classList.add('is-loading');

    setTimeout(() => {
      submitBtn.classList.remove('is-loading');

      const firstName = nameVal.split(' ')[0] || 'Friend';
      const randomTicketId = 'VV26-' + Math.random().toString(36).substring(2, 6).toUpperCase();

      const ticketData = {
        name: nameVal,
        firstName,
        email: emailVal,
        ticketId: randomTicketId,
        year: yearVal,
        idea: ideaInput?.value.trim() || '',
        timestamp: new Date().toISOString()
      };

      try {
        localStorage.setItem(TICKET_STORAGE_KEY, JSON.stringify(ticketData));
      } catch {
        // Safe fallback
      }

      showSuccessState(cardBody, ticketData);
    }, 900);
  });
}

function setError(input, message) {
  if (!input) return;
  const group = input.closest('.form-group');
  if (group) {
    group.classList.add('has-error');
    const errorEl = group.querySelector('.form-error');
    if (errorEl) {
      errorEl.textContent = message;
    }
    input.setAttribute('aria-invalid', 'true');
  }
}

function showSuccessState(container, ticket) {
  gsap.to(container, {
    opacity: 0,
    y: -10,
    duration: 0.3,
    ease: 'power2.in',
    onComplete: () => {
      container.innerHTML = `
        <div class="reg-success">
          <div class="reg-success__icon-wrap">
            <svg class="reg-success__check-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polyline class="reg-success__check-path" points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          
          <h3 class="reg-success__title">You're in, ${ticket.firstName}!</h3>
          <p class="reg-success__desc">Your seat has been reserved for VentureVerse 2026. Keep this ticket pass handy.</p>
          
          <div class="ticket-pass">
            <div class="ticket-pass__header">
              <div class="ticket-pass__hosts">
                <img src="/logos/jss-university-seal.png" alt="JSS University" class="ticket-pass__seal" />
                <img src="/logos/edc-logo-dark.png" alt="EDC" class="ticket-pass__edc edc-logo--dark" />
                <img src="/logos/edc-logo-light.png" alt="EDC" class="ticket-pass__edc edc-logo--light" />
                <span class="ticket-pass__badge">Student Pass</span>
              </div>
              <span class="ticket-pass__id">${ticket.ticketId}</span>
            </div>
            <div class="ticket-pass__event">VentureVerse 2026 — Ideas into Action</div>
            <div class="ticket-pass__meta">
              <span>📅 Thursday, 12 November 2026</span>
              <span>⏰ 10:00 AM – 3:00 PM IST</span>
              <span>📍 University Auditorium, JSS Noida</span>
              <span>👤 ${ticket.name} (${ticket.email})</span>
            </div>
          </div>
          
          <div class="reg-success__actions">
            <button type="button" id="btn-download-ics" class="btn btn--primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <span>Add to Calendar (.ics)</span>
            </button>
            <button type="button" id="btn-register-another" class="reg-reset-btn">Register another attendee</button>
          </div>
        </div>
      `;

      gsap.fromTo(
        container,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );

      // Bind calendar download
      const icsBtn = $('#btn-download-ics', container);
      if (icsBtn) {
        icsBtn.addEventListener('click', () => downloadIcsFile(ticket));
      }

      // Bind reset button
      const resetBtn = $('#btn-register-another', container);
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          location.reload();
        });
      }
    }
  });
}

function downloadIcsFile(ticket) {
  const nowUTC = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//VentureVerse 2026//EDC JSS Noida//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:vv26-${ticket.ticketId.toLowerCase()}@ventureverse.example`,
    `DTSTAMP:${nowUTC}`,
    'DTSTART:20261112T043000Z',
    'DTEND:20261112T093000Z',
    'SUMMARY:VentureVerse 2026 — Ideas into Action',
    'LOCATION:University Auditorium, JSS University, Noida',
    'DESCRIPTION:Flagship student entrepreneurship event by EDC, JSS University, Noida. Your Ticket ID: ' + ticket.ticketId,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `VentureVerse-2026-${ticket.ticketId}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
