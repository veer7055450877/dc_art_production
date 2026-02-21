import React from 'react';
import { Section, SectionHeader } from '../ui/Section';
import { Button } from '../ui/Button';
import { Phone, MapPin, Mail, Instagram, Facebook, Youtube } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { CustomDatePicker } from '../ui/CustomDatePicker';
import { api } from '../../services/api';

export const Contact = () => {
  const { register, handleSubmit, control, formState: { errors }, reset } = useForm();

  const onSubmit = async (data: any) => {
    try {
        await api.submitBooking(data);
        alert("Thank you! Your booking request has been sent. We will contact you shortly.");
        reset();
    } catch (e) {
        alert("Something went wrong. Please try again or contact us on WhatsApp.");
    }
  };

  return (
    <Section
      id="contact"
      className="bg-primary text-white relative overflow-hidden"
      dark
    >
      <div
        className="devider"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg id='comp-m8p05ivd-top' preserveAspectRatio='xMidYMax slice' data-bbox='0 235.771 1920 64.229' viewBox='0 235.771 1920 64.229' height='100%25' width='100%25' xmlns='http://www.w3.org/2000/svg' data-type='shape'%3E%3Cdefs%3E%3Cstyle%3E%23comp-m8p05ivd-top %7B fill: %23f9f9f5; %7D%3C/style%3E%3C/defs%3E%3Cg%3E%3Cpath d='M970.29 244.628 960 235.771l-10.289 8.857a167.374 167.374 0 0 1-109.19 40.521H0V300h1920v-14.852h-840.521a167.373 167.373 0 0 1-109.189-40.52z'/%3E%3C/g%3E%3C/svg%3E\")",
        }}
      ></div>
      <div className="absolute top-0 right-0 w-2/3 h-full bg-gold-400/5 -skew-x-12 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gold-400/5 skew-x-12 pointer-events-none" />

      <SectionHeader
        title="Let's Create Magic Together"
        subtitle="Get in Touch"
        dark
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
        <div className="space-y-12">
          <div className="space-y-4">
            <h3 className="text-3xl font-serif text-white">Visit Our Studio</h3>
            <p className="text-gray-300 text-lg font-light leading-relaxed">
              We'd love to meet you over a cup of coffee and discuss your dream
              wedding.
            </p>
          </div>
          <div className="space-y-8">
            <div className="flex items-start space-x-6 group">
              <div className="bg-white/5 p-4 rounded-full text-gold-400 group-hover:bg-gold-400 group-hover:text-primary transition-all duration-300">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="text-gold-400 uppercase text-xs tracking-[0.2em] mb-2">
                  Phone
                </h4>
                <a
                  href="tel:+919818868753"
                  className="text-xl md:text-2xl font-serif hover:text-gold-400 transition-colors"
                >
                  +91 98188 68753
                </a>
              </div>
            </div>
            <div className="flex items-start space-x-6 group">
              <div className="bg-white/5 p-4 rounded-full text-gold-400 group-hover:bg-gold-400 group-hover:text-primary transition-all duration-300">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="text-gold-400 uppercase text-xs tracking-[0.2em] mb-2">
                  Studio Address
                </h4>
                <p className="text-lg text-gray-300">
                  42/1456 Madangir,
                  <br />
                  Delhi, India 110062
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-6 group">
              <div className="bg-white/5 p-4 rounded-full text-gold-400 group-hover:bg-gold-400 group-hover:text-primary transition-all duration-300">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="text-gold-400 uppercase text-xs tracking-[0.2em] mb-2">
                  Email Us
                </h4>
                <a
                  href="mailto:contact@dcartproduction.com"
                  className="text-lg text-gray-300 hover:text-gold-400 transition-colors"
                >
                  contact@dcartproduction.com
                </a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10">
            <h4 className="text-xs uppercase tracking-[0.2em] mb-6 text-gray-400">
              Follow Our Journey
            </h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center hover:bg-gold-400 hover:border-gold-400 hover:text-primary transition-all duration-300 text-gray-400"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all duration-300 text-gray-400"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center hover:bg-red-600 hover:border-red-600 hover:text-white transition-all duration-300 text-gray-400"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white/5 p-8 md:p-12 rounded-sm border border-white/10 backdrop-blur-md shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2 group">
                <label className="text-xs uppercase tracking-wider text-gray-400 group-focus-within:text-gold-400 transition-colors">
                  Name
                </label>
                <input
                  {...register("name", { required: true })}
                  className="w-full bg-transparent border-b border-gray-600 py-3 focus:border-gold-400 focus:outline-none transition-colors text-white placeholder-gray-600"
                  placeholder="Your Name"
                />
                {errors.name && (
                  <span className="text-red-400 text-xs">Required</span>
                )}
              </div>
              <div className="space-y-2 group">
                <label className="text-xs uppercase tracking-wider text-gray-400 group-focus-within:text-gold-400 transition-colors">
                  Phone
                </label>
                <input
                  {...register("phone", { required: true })}
                  className="w-full bg-transparent border-b border-gray-600 py-3 focus:border-gold-400 focus:outline-none transition-colors text-white placeholder-gray-600"
                  placeholder="Your Number"
                />
                {errors.phone && (
                  <span className="text-red-400 text-xs">Required</span>
                )}
              </div>
            </div>
            <div className="space-y-2 group">
              <label className="text-xs uppercase tracking-wider text-gray-400 group-focus-within:text-gold-400 transition-colors">
                Email
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                className="w-full bg-transparent border-b border-gray-600 py-3 focus:border-gold-400 focus:outline-none transition-colors text-white placeholder-gray-600"
                placeholder="Your Email"
              />
              {errors.email && (
                <span className="text-red-400 text-xs">Required</span>
              )}
            </div>
            <div className="space-y-2 group">
              <label className="text-xs uppercase tracking-wider text-gray-400 group-focus-within:text-gold-400 transition-colors">
                Event Date
              </label>
              <Controller
                control={control}
                name="date"
                render={({ field }) => (
                  <CustomDatePicker
                    selected={field.value}
                    onSelect={field.onChange}
                  />
                )}
              />
            </div>
            <div className="space-y-2 group">
              <label className="text-xs uppercase tracking-wider text-gray-400 group-focus-within:text-gold-400 transition-colors">
                Message
              </label>
              <textarea
                {...register("message")}
                rows={3}
                className="w-full bg-transparent border-b border-gray-600 py-3 focus:border-gold-400 focus:outline-none transition-colors text-white resize-none placeholder-gray-600"
                placeholder="Tell us about your event..."
              />
            </div>
            <Button
              type="submit"
              className="w-full mt-6 py-4 text-sm tracking-[0.2em]"
            >
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </Section>
  );
};
