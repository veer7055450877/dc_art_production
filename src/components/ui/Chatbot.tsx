import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';
import { api } from '../../services/api';
import { FAQItem } from '../../types';

interface Message {
  id: number;
  type: 'bot' | 'user';
  text: string;
}

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, type: 'bot', text: "Hello! I'm your AI Wedding Assistant. How can I help you plan your dream day?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    api.getFAQs().then(setFaqs);
  }, []);

  const scrollToBottom = () => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); };
  useEffect(() => { scrollToBottom(); }, [messages, isTyping, isOpen]);

  const handleOptionClick = (faq: FAQItem) => {
    setMessages(prev => [...prev, { id: Date.now(), type: 'user', text: faq.question }]);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: faq.answer }]);
    }, 800);
  };

  const handleSendCustomMessage = () => {
    if (!inputValue.trim()) return;
    const text = inputValue;
    setInputValue("");
    const whatsappUrl = `https://wa.me/919818868753?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} whileHover={{ scale: 1.1 }} onClick={() => setIsOpen(true)} className={cn("fixed z-50 bg-gradient-to-r from-gold-400 to-gold-600 text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300", isOpen ? "opacity-0 pointer-events-none" : "opacity-100 bottom-6 right-6 md:bottom-10 md:right-10")}>
        <MessageSquare size={28} fill="currentColor" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 50, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 50, scale: 0.9 }} className={cn("fixed z-[60] bg-white shadow-2xl overflow-hidden flex flex-col", "bottom-0 right-0 w-full h-full md:bottom-6 md:right-6 md:w-[380px] md:h-[600px] md:rounded-2xl border border-gray-100")}>
            <div className="bg-charcoal p-4 flex items-center justify-between border-b border-gold-400/20 shrink-0 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-gold-400/10 to-transparent pointer-events-none" />
              <div className="flex items-center space-x-3 relative z-10">
                <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center shadow-lg">
                  <Bot size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-white font-medium font-serif tracking-wide flex items-center gap-2">DC AI <Sparkles size={12} className="text-gold-400" /></h3>
                  <span className="text-[10px] text-green-400 flex items-center gap-1 uppercase tracking-wider"><span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />Online</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors bg-white/10 p-2 rounded-full relative z-10"><X size={20} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 scrollbar-hide">
              {messages.map((msg) => (
                <div key={msg.id} className={cn("flex w-full", msg.type === 'user' ? "justify-end" : "justify-start")}>
                  <div className={cn("max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm", msg.type === 'user' ? "bg-charcoal text-white rounded-br-none" : "bg-white text-gray-800 border border-gray-100 rounded-bl-none")}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start"><div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-bl-none flex space-x-1 items-center h-10"><span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} /><span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} /><span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} /></div></div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 bg-white border-t border-gray-100 shrink-0 max-h-[150px] overflow-y-auto">
              <p className="text-[10px] uppercase text-gray-400 mb-2 tracking-widest font-bold flex items-center gap-2"><Sparkles size={10} /> AI Suggestions</p>
              <div className="flex flex-wrap gap-2">
                {faqs.map(opt => (
                  <button key={opt.id} onClick={() => handleOptionClick(opt)} className="px-3 py-1.5 bg-gray-50 border border-gray-200 text-charcoal text-xs rounded-lg hover:bg-gold-400 hover:text-white hover:border-gold-400 transition-colors shadow-sm text-left">{opt.question}</button>
                ))}
              </div>
            </div>

            <div className="p-4 bg-white border-t border-gray-100 shrink-0">
              <div className="flex items-center space-x-2">
                <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendCustomMessage()} placeholder="Ask anything or chat on WhatsApp..." className="flex-1 bg-gray-100 text-charcoal px-4 py-3 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-gold-400 placeholder-gray-500" />
                <button onClick={handleSendCustomMessage} disabled={!inputValue.trim()} className="p-3 bg-green-500 text-white rounded-full hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md"><Send size={18} /></button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
