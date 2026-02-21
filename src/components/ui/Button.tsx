import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const variants = {
      // Updated to use Primary (Teal) for main actions, Gold for text
      primary: 'bg-primary text-gold-400 hover:bg-primary-light border border-transparent', 
      outline: 'bg-transparent border border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-primary',
      ghost: 'bg-transparent text-primary hover:text-gold-400',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          'inline-flex items-center justify-center rounded-sm font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none uppercase tracking-wider',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
