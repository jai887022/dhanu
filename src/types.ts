export interface Project {
  id: string;
  title: string;
  boldTitle: string;
  lightTitle: string;
  subtitle: string;
  description: string;
  category: string;
  client: string;
  service: string;
  year: string;
  imagePath: string;
  indexNum: string;
  bgHex: string;
}

export interface Exhibition {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  location: string;
  description: string;
  status: 'upcoming' | 'completed';
  curator: string;
}

export interface JournalEntry {
  id: string;
  title: string;
  category: 'Theory' | 'Materials' | 'Aesthetics' | 'General';
  content: string;
  date: string;
  readsCount: number;
}

export interface RSVP {
  id: string;
  exhibitionId: string;
  name: string;
  email: string;
  timestamp: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}
