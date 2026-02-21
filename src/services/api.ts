import { Service, PortfolioItem, Testimonial, FAQItem, Booking } from '../types';

// CONFIGURATION
// Set to true to use PHP Backend, false for Mock Data
export const IS_PRODUCTION = false;
const API_BASE_URL = 'http://localhost/dc-art-backend/api.php'; // Change this to your actual PHP server URL

// MOCK DATA
const MOCK_SERVICES: Service[] = [
  { id: 1, title: "Wedding Photography", description: "Candid and traditional photography that captures the soul of your celebration.", icon_name: "Camera" },
  { id: 2, title: "Cinematic Videography", description: "High-definition wedding films edited with a storytelling approach.", icon_name: "Film" },
  { id: 3, title: "Pre-Wedding Shoots", description: "Conceptual and romantic shoots at exotic locations.", icon_name: "Heart" },
  { id: 4, title: "Event Coverage", description: "Comprehensive coverage for engagements, sangeet, and receptions.", icon_name: "Users" }
];

const MOCK_PORTFOLIO: PortfolioItem[] = [
  {
    id: 1,
    type: "photo",
    src: "https://images.unsplash.com/photo-1648328168368-3a25f2152802?q=80&w=2070&auto=format&fit=crop",
    category: "Wedding",
    title: "Royal Union",
  },
  {
    id: 2,
    type: "photo",
    src: "https://images.unsplash.com/photo-1629942878296-c2710a050d95?q=80&w=2070&auto=format&fit=crop",
    category: "Pre-Wedding",
    title: "Sunset Love",
  },
  {
    id: 3,
    type: "photo",
    src: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070&auto=format&fit=crop",
    category: "Wedding",
    title: "The Vows",
  },
  {
    id: 4,
    type: "video",
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    poster:
      "https://images.pexels.com/photos/1651411/pexels-photo-1651411.jpeg",
    category: "Films",
    title: "Cinematic Highlights",
    hasAudio: true,
  },
  {
    id: 5,
    type: "photo",
    src: "https://images.pexels.com/photos/2058070/pexels-photo-2058070.jpeg",
    category: "Details",
    title: "Golden Details",
  },
  {
    id: 6,
    type: "photo",
    src: "https://images.pexels.com/photos/725462/pexels-photo-725462.jpeg",
    category: "Wedding",
    title: "Joyful Tears",
  },
  {
    id: 7,
    type: "photo",
    src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2070&auto=format&fit=crop",
    category: "Wedding",
    title: "Eternal Bond",
  },
  {
    id: 8,
    type: "video",
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    poster:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
    category: "Films",
    title: "Silent Emotions",
    hasAudio: false,
  },
];

const MOCK_TESTIMONIALS: Testimonial[] = [
  { id: 1, name: "Aditi & Rahul", title: "A Cinematic Dream", text: "DC Art Production made our wedding look like a movie! The team was so professional and patient.", location: "Delhi", image: "https://images.unsplash.com/photo-1621621667797-e06afc217fb0?q=80&w=2070&auto=format&fit=crop" },
  { id: 2, name: "Priya & Aman", title: "Best Decision Ever", text: "We are absolutely in love with our pre-wedding shoot. The creativity they showed was unmatched.", location: "Gurgaon", image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1974&auto=format&fit=crop" },
  { id: 3, name: "Sneha & Vikram", title: "Memories for Life", text: "The cinematic film they created for us is a masterpiece. It captured the essence of our family.", location: "Noida", image: "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?q=80&w=2070&auto=format&fit=crop" }
];

const MOCK_FAQS: FAQItem[] = [
  { id: 1, question: "Do you travel for destination weddings?", answer: "Yes, we love traveling! We have covered weddings across India and internationally.", is_featured: true },
  { id: 2, question: "How far in advance should we book you?", answer: "We recommend booking at least 6-12 months in advance.", is_featured: true },
  { id: 3, question: "What is your payment policy?", answer: "We take a 25% advance to block the dates.", is_featured: true },
  { id: 4, question: "Do you provide raw footage?", answer: "We provide processed JPEGs and edited films. Raw footage is extra.", is_featured: true },
  { id: 5, question: "What equipment do you use?", answer: "We use high-end Sony and Canon mirrorless cameras with prime lenses.", is_featured: false },
  { id: 6, question: "Can we customize the package?", answer: "Yes, all packages are customizable.", is_featured: false },
  { id: 7, question: "Do you offer drone services?", answer: "Yes, drone coverage is available as an add-on.", is_featured: false },
];

const MOCK_BOOKINGS: Booking[] = [
    { id: 1, name: "John Doe", phone: "9876543210", email: "john@example.com", date: "2024-12-25", message: "Need photography for my wedding.", status: "new", created_at: "2024-01-01" }
];

// API FUNCTIONS

export const api = {
  getServices: async (): Promise<Service[]> => {
    if (!IS_PRODUCTION) return MOCK_SERVICES;
    const res = await fetch(`${API_BASE_URL}?action=get_services`);
    return res.json();
  },

  getPortfolio: async (): Promise<PortfolioItem[]> => {
    if (!IS_PRODUCTION) return MOCK_PORTFOLIO;
    const res = await fetch(`${API_BASE_URL}?action=get_portfolio`);
    return res.json();
  },

  getTestimonials: async (): Promise<Testimonial[]> => {
    if (!IS_PRODUCTION) return MOCK_TESTIMONIALS;
    const res = await fetch(`${API_BASE_URL}?action=get_testimonials`);
    return res.json();
  },

  getFAQs: async (): Promise<FAQItem[]> => {
    if (!IS_PRODUCTION) return MOCK_FAQS;
    const res = await fetch(`${API_BASE_URL}?action=get_faqs`);
    return res.json();
  },

  getBookings: async (): Promise<Booking[]> => {
    if (!IS_PRODUCTION) return MOCK_BOOKINGS;
    // In real app, verify admin token here
    return MOCK_BOOKINGS;
  },

  submitBooking: async (data: any) => {
    if (!IS_PRODUCTION) {
        console.log("Mock Booking Submitted:", data);
        MOCK_BOOKINGS.push({ ...data, id: Date.now(), status: 'new', created_at: new Date().toISOString() });
        return { success: true };
    }
    const res = await fetch(`${API_BASE_URL}?action=submit_booking`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return res.json();
  },

  // Admin Methods (Mocked for now)
  login: async (creds: any) => {
      if (!IS_PRODUCTION) {
          if (creds.username === 'admin' && creds.password === 'password') {
              return { success: true, token: 'mock-token' };
          }
          throw new Error('Invalid credentials');
      }
      const res = await fetch(`${API_BASE_URL}?action=login`, {
          method: 'POST',
          body: JSON.stringify(creds)
      });
      if (!res.ok) throw new Error('Invalid credentials');
      return res.json();
  },

  // Generic CRUD Mocks
  addService: async (service: Omit<Service, 'id'>) => {
      if(!IS_PRODUCTION) { MOCK_SERVICES.push({ ...service, id: Date.now() }); return; }
  },
  deleteService: async (id: number) => {
      if(!IS_PRODUCTION) { const idx = MOCK_SERVICES.findIndex(s => s.id === id); if(idx > -1) MOCK_SERVICES.splice(idx, 1); return; }
  }
};
