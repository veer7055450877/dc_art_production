import React from 'react';
import { Portfolio } from '../components/sections/Portfolio';

export const GalleryPage = () => {
  return (
    <main className="pt-24 min-h-screen bg-ivory">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-serif text-charcoal mb-4">Complete Collection</h1>
            <p className="text-gray-500 max-w-2xl mx-auto">Explore our entire archive of love stories, captured moments, and cinematic films.</p>
            <div className="h-1 w-20 bg-gold-400 mx-auto mt-8" />
        </div>
        <Portfolio />
      </div>
    </main>
  );
};
