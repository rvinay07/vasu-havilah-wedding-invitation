export interface EventDetail {
  id: string;
  title: string;
  eyebrow: string;
  date: string; // ISO string
  displayDate: string;
  displayTime: string;
  venue: string;
  address: string;
  mapsUrl: string;
  calendarUrl: string;
  schedule: Array<{
    time: string;
    text: string;
  }>;
}

export interface StoryMilestone {
  id: string;
  status: 'completed' | 'upcoming';
  badge: string;
  title: string;
  scripture: string;
  description: string;
}

export interface GalleryPhoto {
  src: string;
  caption: string;
  alt: string;
}

export interface BibleVerse {
  quote: string;
  reference: string;
  context?: string;
}

