import React, { useEffect, useState } from 'react';
import { Section, SectionHeader } from '../ui/Section';
import { motion } from 'framer-motion';
import { Camera, Film, Heart, Users, Star } from 'lucide-react';
import { api } from '../../services/api';
import { Service } from '../../types';

const IconMap: Record<string, any> = {
  Camera, Film, Heart, Users, Star
};

export const Services = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    api.getServices().then(setServices);
  }, []);

  return (
    <Section id="services" dark className="bg-primary text-white relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
            style={{ backgroundImage: 'radial-gradient(#e3c29c 1px, transparent 1px)', backgroundSize: '30px 30px' }} 
        />

      <SectionHeader title="Our Premium Services" subtitle="What We Do" dark />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => {
          const Icon = IconMap[service.icon_name] || Star;
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-8 border border-white/10 hover:border-gold-400/50 bg-white/5 hover:bg-white/10 transition-all duration-300 rounded-sm text-center"
            >
              <div className="w-16 h-16 mx-auto bg-gold-400/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-gold-400 group-hover:text-primary transition-colors duration-300 text-gold-400">
                <Icon size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-serif mb-4 text-white group-hover:text-gold-400 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-300 font-light leading-relaxed text-sm">
                {service.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
};
