import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/919818868753"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 2, type: 'spring' }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-6 right-6 z-40 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors flex items-center justify-center"
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle size={28} fill="white" />
    </motion.a>
  );
};
