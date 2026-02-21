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
      <div
        className="devider"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg id='comp-m8p05ivd-top' preserveAspectRatio='xMidYMax slice' data-bbox='0 235.771 1920 64.229' viewBox='0 235.771 1920 64.229' height='100%25' width='100%25' xmlns='http://www.w3.org/2000/svg' data-type='shape'%3E%3Cdefs%3E%3Cstyle%3E%23comp-m8p05ivd-top %7B fill: %23f9f9f5; %7D%3C/style%3E%3C/defs%3E%3Cg%3E%3Cpath d='M970.29 244.628 960 235.771l-10.289 8.857a167.374 167.374 0 0 1-109.19 40.521H0V300h1920v-14.852h-840.521a167.373 167.373 0 0 1-109.189-40.52z'/%3E%3C/g%3E%3C/svg%3E\")" }}
      ></div>
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#e3c29c 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
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
