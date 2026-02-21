import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Instagram } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Hash Navigation
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (href.startsWith('#')) {
      const elementId = href.substring(1);
      
      if (location.pathname === '/') {
        // We are on home page, just scroll
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // We are on another page, navigate to home then scroll
        navigate('/');
        // Wait for navigation to complete then scroll
        setTimeout(() => {
          const element = document.getElementById(elementId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    } else {
      // Normal link
      navigate(href);
    }
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={cn(
            'w-full max-w-7xl rounded-2xl transition-all duration-500 ease-in-out px-6 py-4 flex items-center justify-between',
            isScrolled || isMobileMenuOpen
                ? 'bg-primary/90 backdrop-blur-xl shadow-2xl border border-white/10' 
                : 'bg-primary/80 backdrop-blur-md shadow-lg border border-white/5'
          )}
        >
          <a href="/" onClick={(e) => handleNavClick(e, '#home')} className="relative z-50 group">
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-wider text-white transition-colors group-hover:text-gold-400">
                DC ART
              </span>
              <span className="text-[0.6rem] tracking-[0.3em] uppercase text-gold-400 group-hover:text-white transition-colors">
                Production
              </span>
            </div>
          </a>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium uppercase tracking-widest text-white hover:text-gold-400 transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-gold-400 transition-all duration-300 group-hover:w-full group-hover:left-0" />
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-5">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-white hover:text-gold-400 transition-colors transform hover:scale-110 duration-300">
                  <Instagram size={20} />
              </a>
              <div className="h-4 w-px bg-white/20" />
              <a href="tel:+919818868753" className="text-white hover:text-gold-400 transition-colors transform hover:scale-110 duration-300">
                  <Phone size={20} />
              </a>
          </div>

          <button
            className="md:hidden relative z-50 text-gold-400 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </motion.nav>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-primary/98 backdrop-blur-xl flex flex-col items-center justify-center md:hidden"
          >
            <motion.div 
              className="flex flex-col items-center space-y-8 relative z-10"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
                closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
              }}
            >
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e as any, link.href)}
                  variants={{
                    open: { y: 0, opacity: 1 },
                    closed: { y: 20, opacity: 0 }
                  }}
                  className="text-3xl font-serif text-white hover:text-gold-400 transition-colors tracking-wide"
                >
                  {link.name}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
