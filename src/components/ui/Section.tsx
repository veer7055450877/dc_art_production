import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  dark?: boolean;
}

export const Section: React.FC<SectionProps> = ({ id, className, children, dark = false }) => {
  return (
    <section
      id={id}
      className={cn(
        'py-20 md:py-32 px-4 md:px-8 lg:px-16 overflow-hidden',
        dark ? 'bg-charcoal text-ivory' : 'bg-ivory text-charcoal',
        className
      )}
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
};

export const SectionHeader: React.FC<{ title: string; subtitle?: string; center?: boolean; dark?: boolean }> = ({
  title,
  subtitle,
  center = true,
  dark = false
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className={cn('mb-16', center && 'text-center')}
    >
      {subtitle && (
        <span className={cn('block text-sm font-medium tracking-[0.2em] uppercase mb-3', dark ? 'text-gold-400' : 'text-gold-600')}>
          {subtitle}
        </span>
      )}
      <h2 className={cn('text-3xl md:text-5xl font-serif font-medium', dark ? 'text-white' : 'text-charcoal')}>
        {title}
      </h2>
      <div className={cn('h-1 w-20 bg-gold-400 mt-6', center && 'mx-auto')} />
    </motion.div>
  );
};
