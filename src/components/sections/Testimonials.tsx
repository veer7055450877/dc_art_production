import React, { useState, useEffect } from 'react';
import { Section, SectionHeader } from '../ui/Section';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { api } from '../../services/api';
import { Testimonial } from '../../types';

export const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    api.getTestimonials().then(setTestimonials);
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials]);

  if (testimonials.length === 0) return null;

  return (
    <Section id="testimonials" className="bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-ivory to-white" />
      <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/flower-trail.png')] opacity-[0.03]" />

      <SectionHeader title="Love Letters" subtitle="Kind Words" />

      <div className="max-w-4xl mx-auto relative px-4 z-10">
        <div className="relative min-h-[400px]">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="w-full"
                >
                    <div className="bg-white p-8 md:p-12 rounded-lg shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-gray-100 text-center relative">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gold-400 text-white p-4 rounded-full shadow-lg">
                            <Quote size={24} fill="currentColor" />
                        </div>

                        <div className="mt-6 mb-8">
                             <div className="flex justify-center space-x-1 mb-4">
                                {[1,2,3,4,5].map(s => <Star key={s} size={16} className="text-gold-400" fill="currentColor" />)}
                             </div>
                             {/* Added Title */}
                             <h3 className="text-2xl font-serif text-charcoal mb-4 font-medium">{testimonials[currentIndex].title}</h3>
                             <p className="text-lg md:text-xl font-light text-gray-600 italic leading-relaxed">
                                "{testimonials[currentIndex].text}"
                            </p>
                        </div>

                        <div className="flex items-center justify-center space-x-4">
                            <img src={testimonials[currentIndex].image} alt={testimonials[currentIndex].name} className="w-14 h-14 rounded-full object-cover border-2 border-gold-400" />
                            <div className="text-left">
                                <h4 className="text-sm font-bold uppercase tracking-wide text-charcoal">{testimonials[currentIndex].name}</h4>
                                <p className="text-gray-400 text-xs">{testimonials[currentIndex].location}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
        
        <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, idx) => (
                <button key={idx} onClick={() => setCurrentIndex(idx)} className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentIndex ? 'bg-gold-400 w-12' : 'bg-gray-200 w-2 hover:bg-gold-400/50'}`} />
            ))}
        </div>
      </div>
    </Section>
  );
};
