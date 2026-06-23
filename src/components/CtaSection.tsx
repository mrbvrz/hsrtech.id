/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  IconCircleCheck, 
  IconArrowRight, 
  IconBrandWhatsapp 
} from '@tabler/icons-react';
import figureImg from '../assets/figure.png';

interface CtaSectionProps {
  className?: string;
}

export default function CtaSection({ className = '' }: CtaSectionProps) {
  return (
    <div className={`mt-20 lg:mt-24 mb-16 relative z-10 ${className}`}>
      {/* Decorative Background Glows */}
      <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-blue-500/10 blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-72 h-72 rounded-full bg-emerald-500/10 blur-[90px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full rounded-3xl bg-gradient-to-br from-white via-slate-50 to-emerald-50/20 border border-slate-200 shadow-[0_30px_80px_rgba(148,163,184,0.18)] relative overflow-hidden"
      >
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end pt-5 sm:pt-6 md:pt-8 px-6 sm:px-12 md:px-16 pb-0 relative z-10">
          
          {/* Left Column: Information and Actions */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-4 sm:space-y-4.5 pb-6 sm:pb-10 md:pb-12 pt-0">
            
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold tracking-tight text-slate-900 leading-tight">
              Punya Pertanyaan atau Masalah IT yang Butuh Penanganan?
            </h3>
            
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
              Kembangkan bisnis Anda tanpa hambatan operasional komputer. Konsultasikan semua kendala IT Support, perbaikan laptop, jaringan, hingga pengadaan perangkat Anda secara gratis kepada tim ahli HSR Technology!
            </p>

            {/* Benefits List reinstated for light theme */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 w-full pt-2">
              <div className="flex items-center gap-2.5 text-slate-700">
                <IconCircleCheck className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="text-xs sm:text-sm font-medium">Respons Cepat via WhatsApp</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-700">
                <IconCircleCheck className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="text-xs sm:text-sm font-medium">Bebas Biaya Diagnosis</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-700">
                <IconCircleCheck className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="text-xs sm:text-sm font-medium">Layanan Home Service Tersedia</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-700">
                <IconCircleCheck className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="text-xs sm:text-sm font-medium">Garansi Layanan Hingga Tuntas</span>
              </div>
            </div>

            {/* Primary & Secondary Buttons aligned with Hero specs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 w-full pt-4">
              <motion.a
                href="https://wa.me/628123456789?text=Halo%20HSR%20Technology,%20saya%20ingin%20konsultasi%20mengenai%20permasalahan%20IT%20saya"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm rounded-xl transition-all duration-300 shadow-[0_8px_20px_-6px_rgba(16,185,129,0.35)] cursor-pointer text-center sm:self-start"
              >
                <IconBrandWhatsapp className="w-5 h-5" />
                <span>Hubungi via WhatsApp</span>
              </motion.a>

              <motion.a
                href="#booking"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center sm:justify-start gap-1.5 font-bold text-sm text-blue-600 hover:text-blue-700 transition-colors duration-300 group cursor-pointer relative py-1 no-underline hover:no-underline"
              >
                <span>Booking Jadwal Service</span>
                <IconArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.a>
            </div>
          </div>

          {/* Right Column: Beautiful Decorated Figure Component - Anchored fully flush to bottom */}
          <div className="lg:col-span-5 flex items-end justify-center relative self-end w-full pt-4 overflow-visible">
            {/* Visual Backdrop Rings / Effects */}
            <div className="absolute w-80 h-80 rounded-full border border-slate-200/60 pointer-events-none bottom-0" />
            <div className="absolute w-72 h-72 rounded-full border border-dashed border-emerald-500/20 pointer-events-none bottom-0" />
            
            {/* Dense backdrop blurred colored glow behind figure image */}
            <div className="absolute w-64 h-64 rounded-full bg-emerald-500/10 blur-[60px] pointer-events-none z-0 bottom-8 left-1/2 -translate-x-1/2" />
            <div className="absolute w-56 h-56 rounded-full bg-blue-500/10 blur-[80px] pointer-events-none z-0 bottom-4 left-1/2 -translate-x-1/2" />

            {/* Figure Image without floating animation */}
            <div className="relative z-10 w-full max-w-[320px] sm:max-w-[360px] md:max-w-[400px] lg:max-w-[420px] self-end flex items-end">
              <img 
                src={figureImg} 
                alt="Konsultasi IT Support HSR Technology" 
                referrerPolicy="no-referrer"
                className="w-full h-auto drop-shadow-[0_15px_35px_rgba(15,23,42,0.12)] block object-contain"
              />
              
              {/* Small floating status bubble - elevated so it sits above grid and avoids clipping bottom */}
              <div className="absolute top-1/3 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 border border-slate-250 shadow-md flex items-center gap-2.5 scale-90 sm:scale-100 pointer-events-none z-20">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] sm:text-xs font-semibold text-slate-800 leading-none">Teknisi Online</span>
                  <span className="text-[9px] text-slate-500 font-medium leading-normal mt-0.5">Siap Membantu</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
