import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

interface DatePickerProps {
  selected?: Date;
  onSelect: (date: Date) => void;
  className?: string;
}

export const CustomDatePicker: React.FC<DatePickerProps> = ({ selected, onSelect, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const handleSelect = (date: Date) => {
    onSelect(date);
    setIsOpen(false);
  };

  return (
    <div className={cn("relative", className)} ref={containerRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 cursor-pointer border-b border-gray-600 py-2 hover:border-gold-400 transition-colors group"
      >
        <CalendarIcon size={18} className="text-gray-400 group-hover:text-gold-400 transition-colors" />
        <span className={cn("text-sm", selected ? "text-white" : "text-gray-400")}>
          {selected ? format(selected, 'PPP') : 'Select Event Date'}
        </span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 mt-2 p-4 bg-dark-900 border border-gold-400/20 rounded-md shadow-2xl z-50 w-72"
          >
            <div className="flex items-center justify-between mb-4">
              <button onClick={(e) => { e.preventDefault(); setCurrentMonth(subMonths(currentMonth, 1)); }} className="p-1 hover:bg-white/10 rounded-full text-white">
                <ChevronLeft size={16} />
              </button>
              <span className="text-white font-serif font-medium">
                {format(currentMonth, 'MMMM yyyy')}
              </span>
              <button onClick={(e) => { e.preventDefault(); setCurrentMonth(addMonths(currentMonth, 1)); }} className="p-1 hover:bg-white/10 rounded-full text-white">
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                <div key={i} className="text-center text-xs text-gray-500 font-medium">{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {days.map((day) => (
                <button
                  key={day.toString()}
                  onClick={(e) => { e.preventDefault(); handleSelect(day); }}
                  className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center text-sm transition-colors relative",
                    !isSameMonth(day, currentMonth) && "text-gray-700",
                    isSameMonth(day, currentMonth) && "text-gray-300 hover:bg-white/10",
                    selected && isSameDay(day, selected) && "bg-gold-400 text-white hover:bg-gold-500",
                    isToday(day) && !selected && "border border-gold-400 text-gold-400"
                  )}
                >
                  {format(day, 'd')}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
