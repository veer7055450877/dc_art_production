import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Services } from './components/sections/Services';
import { Portfolio } from './components/sections/Portfolio';
import { Testimonials } from './components/sections/Testimonials';
import { FAQ } from './components/sections/FAQ';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/layout/Footer';
import { Chatbot } from './components/ui/Chatbot';
import { GalleryPage } from './pages/GalleryPage';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { WhatsAppButton } from './components/ui/WhatsAppButton';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { api } from './services/api';

// Main Landing Page
const HomePage = () => (
  <main>
    <Hero />
    <About />
    <Services />
    <Portfolio />
    <Testimonials />
    <FAQ />
    <Contact />
  </main>
);

// Layout wrapper to conditionally hide Navbar/Footer for Admin
const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-ivory selection:bg-gold-400 selection:text-white font-sans">
      {!isAdmin && <Navbar />}
      {children}
      {!isAdmin && <Footer />}
      {!isAdmin && <Chatbot />}
      {/**!isAdmin && <WhatsAppButton /> */}
    </div>
  );
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Pre-fetch critical data to ensure smooth experience
    const initData = async () => {
      try {
        // We run these in parallel
        await Promise.all([
          api.getServices(),
          api.getPortfolio(),
          api.getTestimonials(),
          api.getFAQs(),
          // Add a minimum delay so the loading screen isn't too fast (feels more premium)
          new Promise(resolve => setTimeout(resolve, 2000))
        ]);
      } catch (error) {
        console.error("Failed to load initial data", error);
      } finally {
        setLoading(false);
      }
    };

    initData();
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      {!loading && (
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
          </Layout>
        </Router>
      )}
    </>
  );
}

export default App;
