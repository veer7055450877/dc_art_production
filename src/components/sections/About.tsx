import React from 'react';
import { Section, SectionHeader } from '../ui/Section';
import { motion } from 'framer-motion';

export const About = () => {
  return (
    <Section id="about" className="relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Artistic Image Composition */}
        <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
        >
          {/* Main Image with Mask */}
          <div className="relative z-10 w-full aspect-[3/4] md:aspect-[4/5]">
             <img 
              src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1974&auto=format&fit=crop" 
              alt="Couple Moment" 
              className="w-full h-full object-cover mask-brush-1 hover:scale-105 transition-transform duration-1000"
            />
          </div>
          
          {/* Secondary Image */}
          <div className="absolute -bottom-10 -right-4 w-1/2 aspect-square z-20 hidden md:block">
             <img 
              src="https://images.unsplash.com/photo-1621621667797-e06afc217fb0?q=80&w=2070&auto=format&fit=crop" 
              alt="Wedding Details" 
              className="w-full h-full object-cover border-4 border-white shadow-2xl rounded-sm rotate-3 hover:rotate-0 transition-transform duration-500"
            />
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-10 -left-10 w-20 h-20 border-t-2 border-l-2 border-gold-400/50" />
          <div className="absolute bottom-10 -right-10 w-20 h-20 border-b-2 border-r-2 border-gold-400/50" />
        </motion.div>

        {/* Content */}
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
        >
          <SectionHeader 
            title="Capturing Real Emotions, Creating Timeless Memories" 
            subtitle="About DC Art Production" 
            center={false} 
          />
          
          <div className="space-y-6 text-gray-600 font-light leading-relaxed text-lg">
            <p>
              At <strong className="text-charcoal font-medium">DC Art Production</strong>, we believe that a wedding is not just an event; it is a tapestry of emotions, a gathering of love, and the beginning of a beautiful legacy. Based in the heart of Delhi, we are a team of passionate storytellers dedicated to preserving the magic of your special day.
            </p>
            <p>
              Our style is a blend of cinematic grandeur and candid authenticity. We don't just take pictures; we craft visual narratives that allow you to relive your laughter, your tears, and your joy for generations to come.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-8 border-t border-gray-200 pt-8">
            <div className="text-center md:text-left">
              <h4 className="text-3xl md:text-4xl font-serif text-gold-500">500+</h4>
              <p className="text-xs md:text-sm uppercase tracking-widest mt-2 text-gray-500">Weddings</p>
            </div>
            <div className="text-center md:text-left">
              <h4 className="text-3xl md:text-4xl font-serif text-gold-500">100%</h4>
              <p className="text-xs md:text-sm uppercase tracking-widest mt-2 text-gray-500">Satisfaction</p>
            </div>
            <div className="text-center md:text-left">
              <h4 className="text-3xl md:text-4xl font-serif text-gold-500">50+</h4>
              <p className="text-xs md:text-sm uppercase tracking-widest mt-2 text-gray-500">Cities</p>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};
