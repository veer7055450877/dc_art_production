import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const LoadingScreen = ({ onFinished }: { onFinished?: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate progress based on time, but the parent component controls the actual removal
    // This ensures the bar keeps moving even if data fetches fast
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
            clearInterval(timer);
            return 90; // Wait for actual data to finish
        }
        return prev + Math.random() * 10;
      });
    }, 200);

    return () => clearInterval(timer);
  }, []);

  // Force 100% when unmounting/finished signal is received
  useEffect(() => {
     return () => setProgress(100);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-primary flex flex-col items-center justify-center overflow-hidden"
      exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white tracking-wider mb-2">
            DC ART
          </h1>
          <motion.span 
            initial={{ opacity: 0, letterSpacing: "0em" }}
            animate={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ delay: 0.5, duration: 1.5 }}
            className="text-xs md:text-sm text-gold-400 uppercase font-medium block"
          >
            Production
          </motion.span>
        </motion.div>

        {/* Progress Bar */}
        <div className="w-64 h-0.5 bg-white/10 rounded-full overflow-hidden relative">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-gold-400"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 50 }}
          />
        </div>
        
        {/* Percentage Text */}
        <motion.div 
            className="mt-4 text-gold-400/50 text-xs font-mono"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
        >
            {Math.min(100, Math.round(progress))}%
        </motion.div>
      </div>

      {/* Background Texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none" />
      
      {/* Cinematic Vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/60 pointer-events-none" />
    </motion.div>
  );
};
