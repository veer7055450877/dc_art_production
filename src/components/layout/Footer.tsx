import React from 'react';
import { Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center text-center space-y-6">
        <div>
           <span className="font-serif text-2xl font-bold tracking-wider text-white">
              DC ART
            </span>
            <span className="block text-[0.6rem] tracking-[0.3em] uppercase text-gold-400">
              Production
            </span>
        </div>
        
        <p className="text-gray-500 text-sm max-w-md">
          Capturing the essence of love and celebration across India and beyond.
        </p>

        <div className="flex items-center text-xs text-gray-600 uppercase tracking-widest mt-8">
          <span>&copy; {new Date().getFullYear()} DC Art Production</span>
          <span className="mx-2">|</span>
          <span>All Rights Reserved</span>
        </div>
        
        <div className="flex items-center text-gray-700 text-xs gap-1">
            Made with <Heart size={12} className="text-red-900" /> in India
        </div>
      </div>
    </footer>
  );
};
