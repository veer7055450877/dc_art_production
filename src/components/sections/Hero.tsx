import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { ChevronDown } from 'lucide-react';

export const Hero = () => {
  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Ken Burns Effect */}
      <motion.div
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
        className="absolute inset-0 z-0"
      >
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ 
            // High quality wedding image
            backgroundImage: 'url("https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop")',
          }} 
        />
      </motion.div>

      {/* Cinematic Overlay - Gradient + Texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/30 to-primary/80 z-10 mix-blend-multiply" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 z-10" />

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h2 className="text-gold-400 tracking-[0.4em] uppercase text-xs md:text-sm mb-6 font-medium border-b border-gold-400/50 pb-2 inline-block">
            Est. 2015 • Delhi, India
          </h2>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif text-white max-w-5xl leading-tight mb-8 drop-shadow-2xl"
        >
          We Capture Every <span className="italic text-gold-400">Lovely Moment</span> of Your Wedding
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="text-gray-200 max-w-2xl text-lg mb-10 font-light tracking-wide"
        >
          Creative Photographers & Cinematic Filmmakers crafting timeless visual legacies.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="flex flex-col md:flex-row gap-6"
        >
          <Button 
            size="lg" 
            className="min-w-[180px] shadow-[0_0_20px_rgba(7,54,60,0.5)]"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Book a Shoot
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-white text-white hover:bg-white hover:text-primary min-w-[180px]"
            onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View Portfolio
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 cursor-pointer"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-white/70">Scroll</span>
            <ChevronDown className="text-white animate-bounce" size={24} />
        </div>
      </motion.div>
    </section>
  );
};
