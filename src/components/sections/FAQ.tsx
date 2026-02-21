import React, { useState, useEffect } from 'react';
import { Section, SectionHeader } from '../ui/Section';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { cn } from '../../lib/utils';
import { api } from '../../services/api';
import { FAQItem } from '../../types';

export const FAQ = () => {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    api.getFAQs().then(data => {
        // Only show featured FAQs in the section
        setFaqs(data.filter(f => f.is_featured).slice(0, 5));
    });
  }, []);

  return (
    <Section id="faq" className="bg-ivory border-t border-gray-100">
      <SectionHeader title="Common Questions" subtitle="FAQ" />
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={faq.id}
            className="border border-gray-200 rounded-sm overflow-hidden bg-white hover:border-gold-400/30 transition-colors"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
            >
              <span
                className={cn(
                  "font-serif text-lg",
                  openIndex === index ? "text-gold-600" : "text-charcoal",
                )}
              >
                {faq.question}
              </span>
              <span
                className={cn(
                  "p-1 rounded-full transition-colors",
                  openIndex === index
                    ? "bg-gold-400 text-white"
                    : "bg-gray-100 text-gray-500",
                )}
              >
                {openIndex === index ? <Minus size={16} /> : <Plus size={16} />}
              </span>
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-6 pb-6 text-gray-500 leading-relaxed font-light">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </Section>
  );
};
