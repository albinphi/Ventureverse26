// Core event data and metadata for VentureVerse 2026.
// Serves as the single source of truth for dates, venue, organiser, and countdown targets.

export const eventData = {
  name: 'VentureVerse 2026',
  tagline: 'Ideas into Action',
  edition: '2026',
  organiser: 'Entrepreneurship Development Cell (EDC), JSS University, Noida',
  organiserShort: 'EDC · JSS Noida',
  dateFormatted: '12 November 2026 (Thursday)',
  dateShort: '12 Nov 2026',
  timeFormatted: '10:00 AM – 3:00 PM IST',
  venue: 'University Auditorium, JSS University, Noida',
  venuePlaceholderNote: 'fictional placeholder',
  purpose: 'A student-focused event about turning early ideas into ventures, learning from startup journeys, and exploring entrepreneurship on campus.',
  
  // ISO-8601 timestamps in IST (+05:30)
  targetDateISO: '2026-11-12T10:00:00+05:30',
  endDateISO: '2026-11-12T15:00:00+05:30',
  
  announcementText: '12 NOVEMBER 2026 • 10:00 AM – 3:00 PM • UNIVERSITY AUDITORIUM, JSS UNIVERSITY NOIDA • FREE FOR STUDENTS',
  disclaimer: 'Fictional event created for a design/development exercise.',
  
  contact: {
    email: 'edc@jssuniversity.example',
    phone: '+91 00000 00000',
    address: 'JSS University, Sector 62, Noida (placeholder)',
  },
  
  stats: [
    { value: 5, suffix: ' hrs', label: 'of content' },
    { value: 4, suffix: '', label: 'speakers' },
    { value: 6, suffix: '', label: 'sessions' },
    { value: 500, suffix: '+', label: 'students expected' }
  ]
};
