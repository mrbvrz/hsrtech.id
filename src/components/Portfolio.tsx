/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  IconBuilding, IconMapPin, IconCompass, IconArrowUpRight, IconSparkles, IconX, IconBriefcase, IconChartBar 
} from '@tabler/icons-react';
import { PORTFOLIO } from '../data';
import { PortfolioProject } from '../types';

interface PortfolioProps {
  onNavigate?: (view: 'home' | 'booking' | 'login' | 'blog' | 'about' | 'tracking' | 'marketplace' | 'portfolio') => void;
  isStandalone?: boolean;
}

export default function Portfolio({ onNavigate, isStandalone = false }: PortfolioProps) {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  const tabs = [
    { label: 'Semua Projek', value: 'all' },
    { label: 'Jaringan / Kabel', value: 'network' },
    { label: 'CCTV Guard', value: 'cctv' },
    { label: 'Website & App', value: 'website' },
    { label: 'Kontrak Bulanan', value: 'maintenance' }
  ];

  // Filter projects
  const filteredProjects = activeTab === 'all' 
    ? PORTFOLIO 
    : PORTFOLIO.filter(project => project.category === activeTab);

  const displayedProjects = isStandalone ? filteredProjects : filteredProjects.slice(0, 6);

  return (
    <section 
      id="portfolio" 
      className="py-24 bg-white relative overflow-hidden"
    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-brand-blue bg-blue-50/80 border border-blue-100/50 uppercase tracking-widest mb-3 backdrop-blur-sm"
          >
            <IconCompass className="w-3.5 h-3.5" />
            <span>Portofolio Proyek</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-display font-bold text-brand-dark tracking-tight mb-4"
          >
            Kisah Sukses Klien HSR Technology
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-600 font-medium"
          >
            Lihat bagaimana kami menghadirkan efisiensi, keamanan, dan kecepatan yang terukur di berbagai gedung perkantoran, gudang logistik, dan usaha komersial klien kami.
          </motion.p>
        </div>

        {/* Tab Filter Links */}
        <div className="flex items-center justify-center gap-2 mb-12 overflow-x-auto no-scrollbar py-2">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => {
                setActiveTab(tab.value);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs transition-all whitespace-nowrap cursor-pointer border-0 ${
                activeTab === tab.value 
                  ? 'bg-brand-blue text-white shadow-md shadow-brand-blue/15 font-black' 
                  : 'bg-slate-100/60 hover:bg-slate-100 text-slate-550 hover:text-slate-900 font-bold'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Portfolio Projects Cards */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ 
                  duration: 0.22,
                  ease: "easeInOut"
                }}
                className="bg-white rounded-2xl overflow-hidden border border-slate-100 flex flex-col justify-between shadow-[0_4px_25px_rgba(15,23,42,0.015)] hover:shadow-[0_12px_45px_rgba(15,23,42,0.045)] hover:border-slate-200 cursor-pointer group transition-all duration-300 relative"
                onClick={() => setSelectedProject(project)}
              >
                
                {/* Visual Area */}
                <div className="relative h-60 w-full overflow-hidden bg-slate-900">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
                  />
                  
                  {/* Elegant White Tint Overlay */}
                  <div className="absolute inset-0 bg-white/10 transition-colors duration-300 pointer-events-none z-10 group-hover:bg-white/20" />
                  <div className="absolute inset-0 bg-white/5 transition-colors duration-300 pointer-events-none z-10 group-hover:bg-white/0" />
                  
                  {/* Category Tag */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 rounded-lg text-[10px] font-bold text-white bg-brand-blue/90 tracking-wide backdrop-blur-md">
                      {tabs.find(t => t.value === project.category)?.label || project.category}
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-medium tracking-wide mb-2">
                      <IconBuilding className="w-3.5 h-3.5" />
                      <span className="truncate">{project.client}</span>
                    </div>

                    <h3 className="text-lg font-display font-bold text-brand-dark mb-3 leading-snug group-hover:text-brand-blue transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-4">
                      {project.description}
                    </p>
                  </div>

                  {/* Tag List - Single Line Scrollable */}
                  <div className="mt-5 flex items-center justify-between font-sans">
                    <div className="flex items-center gap-1.5 w-full overflow-x-auto no-scrollbar whitespace-nowrap py-0.5">
                      {project.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="px-2 py-0.5 bg-white text-slate-500 rounded text-[10px] font-semibold border border-slate-200/40 shrink-0">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

         {/* Navigation Button "Lihat Semua Projek" */}
        {!isStandalone && (
          <div className="flex justify-center mt-12 relative z-20">
            <button
              onClick={() => onNavigate && onNavigate('portfolio')}
              className="group inline-flex items-center gap-1.5 text-brand-blue hover:text-blue-700 font-bold text-sm transition-all cursor-pointer bg-transparent border-0 py-1"
            >
              <span>Lihat Semua Projek</span>
              <IconArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        )}

      </div>

      {/* Portfolio Detailed Modal Popup */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Dark overlay backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-white rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl relative z-10 max-h-[90vh] flex flex-col"
            >
              
              {/* Image banner area */}
              <div className="relative h-64 sm:h-80 shrink-0">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />

                {/* Close Button */}
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute right-4 top-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white cursor-pointer transition-colors"
                >
                  <IconX className="w-4 h-4" />
                </button>

                {/* Cover info panel */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end p-6 sm:p-8">
                  <div className="text-white">
                    <span className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-1.5 block">
                      Kategori: {selectedProject.category}
                    </span>
                    <h3 className="text-xl sm:text-3xl font-display font-extrabold leading-tight">
                      {selectedProject.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Scrollable Modal Content */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                
                {/* Meta details strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b border-slate-105 text-sm">
                  <div>
                    <span className="block text-slate-400 text-xs font-semibold uppercase">Nama Klien</span>
                    <span className="font-bold text-brand-dark">{selectedProject.client}</span>
                  </div>
                  <div>
                    <span className="block text-slate-400 text-xs font-semibold uppercase">Lokasi Layanan</span>
                    <span className="font-bold text-brand-dark">{selectedProject.location}</span>
                  </div>
                  <div>
                    <span className="block text-slate-400 text-xs font-semibold uppercase">Tahun Eksekusi</span>
                    <span className="font-bold text-brand-dark">{selectedProject.year}</span>
                  </div>
                  <div>
                    <span className="block text-slate-400 text-xs font-semibold uppercase">Hasil Terukur</span>
                    <span className="font-bold text-brand-blue">{selectedProject.statsRef ? selectedProject.statsRef.value : 'Sesuai SLA'}</span>
                  </div>
                </div>

                {/* Detailed Challenge & Solution splits */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <h4 className="flex items-center gap-1.5 font-bold text-brand-dark text-sm uppercase tracking-wide mb-2">
                      <IconBriefcase className="w-4 h-4 text-rose-500" />
                      <span>Kendala Awal Klien</span>
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {selectedProject.challenge}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-blue-50/20 border border-blue-50">
                    <h4 className="flex items-center gap-1.5 font-bold text-brand-dark text-sm uppercase tracking-wide mb-2">
                      <IconSparkles className="w-4 h-4 text-brand-blue" />
                      <span>Solusi HSR Technology</span>
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {selectedProject.solution}
                    </p>
                  </div>
                </div>

                {/* Bulleted Impact Points */}
                <div>
                  <h4 className="flex items-center gap-1.5 font-bold text-brand-dark text-sm uppercase tracking-wide mb-3">
                    <IconChartBar className="w-4 h-4 text-emerald-500" />
                    <span>Dampak & Hasil Terukur Pasca Tindakan</span>
                  </h4>
                  <ul className="grid grid-cols-1 gap-2" aria-label="System Impact Metrics">
                    {selectedProject.impact.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 text-sm text-slate-700">
                        <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-650 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                          {bIdx + 1}
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Detailed Tags */}
                <div>
                  <h4 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Teknologi / Perangkat Terpakai</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end shrink-0">
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="px-6 py-2 rounded-xl text-xs font-bold text-white bg-brand-dark hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Tutup detail projek
                </button>
              </div>

            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
