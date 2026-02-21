export interface Service {
  id: number;
  title: string;
  description: string;
  icon_name: string;
}

export interface PortfolioItem {
  id: number;
  type: 'photo' | 'video';
  src: string;
  poster?: string;
  category: string;
  title: string;
  hasAudio?: boolean;
}

export interface Testimonial {
  id: number;
  name: string;
  title: string; // New field
  text: string;
  location: string;
  image: string;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  is_featured: boolean;
}

export interface Booking {
  id: number;
  name: string;
  phone: string;
  email: string;
  date: string;
  message: string;
  status: 'new' | 'contacted' | 'booked';
  created_at: string;
}
