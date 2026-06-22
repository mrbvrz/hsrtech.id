/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  IconDeviceLaptop, IconDisc, IconNetwork, IconEye, IconTool, IconBriefcase, IconGlobe, IconShieldCheck, 
  IconSearch, IconCheck, IconArrowRight, IconX, IconCalendar, IconInfoCircle
} from '@tabler/icons-react';
import { SERVICES } from '../data';
import { ITService } from '../types';

// Dynamic helper to match icon names to Tabler icons
function ServiceIcon({ name, className = "w-6 h-6" }: { name: string; className?: string }) {
  const sw = 1.6; // Thin premium stroke width like Tabler icons
  switch (name) {
    case 'Laptop': return <IconDeviceLaptop className={className} strokeWidth={sw} />;
    case 'Disc': return <IconDisc className={className} strokeWidth={sw} />;
    case 'Network': return <IconNetwork className={className} strokeWidth={sw} />;
    case 'Eye': return <IconEye className={className} strokeWidth={sw} />;
    case 'Wrench': return <IconTool className={className} strokeWidth={sw} />;
    case 'Briefcase': return <IconBriefcase className={className} strokeWidth={sw} />;
    case 'Globe': return <IconGlobe className={className} strokeWidth={sw} />;
    case 'ShieldCheck': return <IconShieldCheck className={className} strokeWidth={sw} />;
    default: return <IconTool className={className} strokeWidth={sw} />;
  }
}

export default function Services() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeDetailService, setActiveDetailService] = useState<ITService | null>(null);
  
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const categories = [
    { label: 'Semua Layanan', value: 'all' },
    { label: 'Hardware & Komputer', value: 'hardware' },
    { label: 'Instalasi Jaringan', value: 'network' },
    { label: 'Software & Website', value: 'software' },
    { label: 'Konsultasi & Bisnis', value: 'consulting' },
    { label: 'Keamanan CCTV', value: 'cctv' }
  ];

  // Filter logic
  const filteredServices = SERVICES.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          service.features.some(f => f.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleBookService = (serviceId: string) => {
    setActiveDetailService(null);
    // Smooth scroll to booking
    const bookingSection = document.querySelector('#booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
    // Set custom event or trigger to select service
    const event = new CustomEvent('selectServiceInBooking', { detail: serviceId });
    window.dispatchEvent(event);
  };

  return (
    <section 
      id="services" 
      className="py-24 bg-slate-50/60 relative overflow-hidden"
    >
      {/* Decorative grids & blurred background blobs */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="absolute top-[10%] left-[-10%] w-[35rem] h-[35rem] rounded-full bg-blue-300/15 blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-[45%] right-[-15%] w-[40rem] h-[40rem] rounded-full bg-indigo-300/15 blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-[2%] left-[10%] w-[32rem] h-[32rem] rounded-full bg-sky-300/10 blur-[110px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-brand-blue bg-blue-50/70 uppercase tracking-widest mb-3 border-0"
          >
            <IconInfoCircle className="w-3.5 h-3.5" />
            <span>Spesialis Solusi IT</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-display font-bold text-brand-dark tracking-tight mb-4"
          >
            Layanan IT Terbaik Untuk Segala Kebutuhan
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-600 font-medium"
          >
            Pilihlah salah satu dedikasi layanan kami. Mulai dari penanganan komputer personal lambat, pemasangan CCTV keamanan canggih, hingga pemeliharaan jaringan korporasi bulanan.
          </motion.p>
        </div>

        {/* Search and Category Filters */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10">
          
          {/* Custom Search Box */}
          <div className="relative flex-1 max-w-md">
            <IconSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              ref={searchInputRef}
              type="text"
              placeholder="Cari layanan (misal: MikroTik, printer, Windows)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-16 py-2.5 rounded-xl border-0 bg-slate-100/50 hover:bg-slate-100 focus:bg-white text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-blue/35 transition-all font-medium placeholder-slate-400"
            />
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
              {!searchTerm && (
                <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono font-extrabold text-slate-500 bg-slate-200/55 rounded-md select-none border-0">
                  <span className="text-[10px] leading-none">⌘</span>
                  <span className="text-[8px] text-slate-400 font-bold">+</span>
                  <span className="text-[10px] leading-none">K</span>
                </kbd>
              )}
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="p-1 rounded-full text-slate-400 hover:bg-slate-100 hover:text-brand-dark cursor-pointer"
                >
                  <IconX className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Horizonal Scrollable Filters */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all whitespace-nowrap cursor-pointer border-0 ${
                  selectedCategory === cat.value 
                    ? 'bg-brand-blue text-white shadow-md shadow-brand-blue/15' 
                    : 'bg-slate-100/60 hover:bg-slate-100 text-slate-550 hover:text-slate-900 font-bold'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>

        {/* Dynamic Grid of Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service) => (
              <motion.div
                layout
                key={service.id}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ 
                  duration: 0.22,
                  ease: "easeInOut"
                }}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                className="bg-white/70 backdrop-blur-md rounded-2xl p-6 flex flex-col justify-between group cursor-pointer transition-shadow duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_25px_60px_rgba(15,23,42,0.06)] relative border border-white/40"
                onClick={() => setActiveDetailService(service)}
              >
                <div>
                  
                  {/* Service Icon with Micro Hover Background */}
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-brand-blue flex items-center justify-center mb-5 group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
                    <ServiceIcon name={service.iconName} className="w-6 h-6 transition-transform group-hover:rotate-6" />
                  </div>

                  <h3 className="text-lg font-display font-bold text-brand-dark mb-4 leading-snug group-hover:text-brand-blue transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-5">
                    {service.description}
                  </p>

                </div>

                <div className="pt-4 flex items-center justify-between mt-auto">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest font-mono">Durasi</span>
                    <span className="text-xs font-bold text-brand-dark">{service.estimatedTime}</span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-50 text-slate-600 group-hover:bg-brand-blue group-hover:text-white transition-all text-xs font-black">
                    <span>Detail</span>
                    <IconArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredServices.length === 0 && (
          <div className="text-center py-20 bg-slate-50/50 rounded-xl">
            <p className="text-slate-500 font-medium mb-1">Tidak ada layanan yang cocok dengan kata kunci Anda.</p>
            <button 
              onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }} 
              className="text-xs font-bold text-brand-blue hover:underline"
            >
              Reset Pencarian
            </button>
          </div>
        )}

      </div>

      {/* Service Details Modal Popup */}
      <AnimatePresence>
        {activeDetailService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Dark overlay backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveDetailService(null)}
              className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl relative z-10 max-h-[90vh] flex flex-col"
            >
              
              {/* Header section with brand accent line */}
              <div className="bg-brand-dark text-white p-6 relative">
                
                {/* Close Button */}
                <button 
                  onClick={() => setActiveDetailService(null)}
                  className="absolute right-4 top-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors"
                >
                  <IconX className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                    <ServiceIcon name={activeDetailService.iconName} className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-display font-extrabold">{activeDetailService.title}</h3>
                    <p className="text-slate-300 text-xs sm:text-sm mt-0.5">{activeDetailService.tagline}</p>
                  </div>
                </div>

              </div>

              {/* Scrollable Modal Content */}
              <div className="p-6 overflow-y-auto space-y-6">
                
                <div>
                  <h4 className="text-slate-800 font-bold text-sm mb-2 uppercase tracking-wide">Tentang Layanan</h4>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {activeDetailService.longDescription}
                  </p>
                </div>

                {/* Scope list / Features */}
                <div>
                  <h4 className="text-slate-800 font-bold text-sm mb-3 uppercase tracking-wide">Cakupan Pekerjaan</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3" aria-label="Service Features">
                    {activeDetailService.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                          <IconCheck className="w-3.5 h-3.5" />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Duration estimate panel */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-150">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Estimasi Durasi Layanan</span>
                      <span className="text-base font-extrabold text-brand-blue mt-0.5 block">{activeDetailService.estimatedTime}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Kelayakan Jasa</span>
                      <span className="text-xs font-bold text-slate-600 mt-0.5 block">Respon prioritas pengerjaan</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Modal Footer Actions */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveDetailService(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-brand-dark hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Tutup detail
                </button>
                
                <button
                  type="button"
                  onClick={() => handleBookService(activeDetailService.id)}
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-blue hover:bg-blue-700 shadow-lg shadow-blue-500/10 cursor-pointer"
                >
                  <IconCalendar className="w-3.5 h-3.5" />
                  <span>Pilih & Booking Sekarang</span>
                </button>
              </div>

            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
