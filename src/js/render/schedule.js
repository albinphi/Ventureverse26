// Dynamic renderer for the timeline schedule and agenda sessions.
// Computes active live state in IST and outputs alternating timeline nodes.

import { scheduleData } from '../../data/schedule.js';

export function renderSchedule(container) {
  if (!container) return;

  const currentLiveIndex = getCurrentLiveSessionIndex();

  const itemsHtml = scheduleData.map((item, index) => {
    const isEven = index % 2 === 0;
    const sideClass = isEven ? 'timeline-item--left' : 'timeline-item--right';
    const isLive = currentLiveIndex === index;

    return `
      <div class="timeline-item ${sideClass} ${isLive ? 'timeline-item--live' : ''}" data-index="${index}">
        <div class="timeline-item__dot">
          <span class="timeline-item__pulse"></span>
        </div>
        <article class="timeline-card">
          <div class="timeline-card__top">
            <div class="timeline-card__time-wrap">
              <span class="timeline-card__time">${item.time}</span>
              <span class="timeline-card__duration">${item.duration}</span>
            </div>
            <div class="timeline-card__tags">
              <span class="timeline-card__category">${item.category}</span>
              ${isLive ? '<span class="timeline-card__live-badge"><span class="live-dot"></span> LIVE NOW</span>' : ''}
            </div>
          </div>
          <h3 class="timeline-card__title">${item.title}</h3>
          <p class="timeline-card__desc">${item.description}</p>
        </article>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="timeline-spine">
      <div class="timeline-spine__progress"></div>
    </div>
    <div class="timeline-items">
      ${itemsHtml}
    </div>
  `;
}

/**
 * Checks whether the current real-world timestamp falls within any session on 12 Nov 2026 IST.
 */
function getCurrentLiveSessionIndex() {
  try {
    const now = new Date();
    // 12 Nov 2026 in IST (+05:30)
    const eventDateStr = '2026-11-12';
    
    // Convert current time to IST string YYYY-MM-DD
    const istOptions = { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false };
    const formatter = new Intl.DateTimeFormat('en-CA', istOptions);
    const parts = formatter.formatToParts(now);
    
    const year = parts.find(p => p.type === 'year')?.value;
    const month = parts.find(p => p.type === 'month')?.value;
    const day = parts.find(p => p.type === 'day')?.value;
    const hour = parseInt(parts.find(p => p.type === 'hour')?.value || '0', 10);
    const minute = parseInt(parts.find(p => p.type === 'minute')?.value || '0', 10);
    
    const todayIST = `${year}-${month}-${day}`;
    if (todayIST !== eventDateStr) {
      return -1;
    }
    
    const totalMinutes = hour * 60 + minute;
    // Session times in minutes from midnight IST:
    // 10:00 = 600, 10:20 = 620, 11:15 = 675, 12:00 = 720, 13:15 = 795, 14:15 = 855, 15:00 = 900
    const bounds = [
      { start: 600, end: 620 },
      { start: 620, end: 675 },
      { start: 675, end: 720 },
      { start: 720, end: 795 },
      { start: 795, end: 855 },
      { start: 855, end: 900 }
    ];
    
    return bounds.findIndex(b => totalMinutes >= b.start && totalMinutes < b.end);
  } catch {
    return -1;
  }
}
