/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  IconShield, IconSparkles, IconCircleCheck, IconArrowRight, IconDeviceLaptop, 
  IconCpu, IconNetwork, IconEye, IconActivity, IconSearch, 
  IconRefresh, IconClock, IconCheck 
} from '@tabler/icons-react';
import heroBg from '../assets/hero.webp';

export default function Hero() {
  const [currentStatus, setCurrentStatus] = useState<'pengerjaan' | 'selesai'>('pengerjaan');
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Relative mouse coordinate from center of card
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Calculate rotation angles (max 6 degrees for a gentle, subtle effect)
    const rotateX = -(mouseY / height) * 6;
    const rotateY = (mouseX / width) * 6;
    
    setTilt({ x: rotateX, y: rotateY });

    // Calculate light reflection spot position in percent
    const xPercent = ((e.clientX - rect.left) / width) * 100;
    const yPercent = ((e.clientY - rect.top) / height) * 100;
    setGlowPos({ x: xPercent, y: yPercent });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Auto transition demo state every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStatus(prev => prev === 'pengerjaan' ? 'selesai' : 'pengerjaan');
    }, 6000);
    return () => clearInterval(timer);
  }, []);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.1 
      }
    }
  } as const;

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { type: 'spring' as const, stiffness: 100, damping: 15 }
    }
  } as const;

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen pt-28 pb-16 flex items-center overflow-hidden"
    >
      {/* Background Image with subtle opacity and overlay mix with smooth parallax */}
      <div 
        className="absolute -inset-y-36 inset-x-0 bg-cover bg-center bg-no-repeat opacity-35 select-none pointer-events-none z-0"
        style={{ 
          backgroundImage: `url(${heroBg})`,
          transform: `translate3d(0, ${scrollY * 0.32}px, 0)`,
          willChange: 'transform'
        }}
      />
      
      {/* Fading gradient to ensure text readability on the left column is perfect, while background on right remains more visible */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent pointer-events-none z-0" />

      {/* Decorative blurred background blobs */}
      <div className="absolute top-20 right-10 w-72 h-72 md:w-96 md:h-96 rounded-full bg-blue-400/10 blur-3xl animate-pulse-slow z-0" />
      <div className="absolute bottom-10 left-10 w-60 h-60 md:w-80 md:h-80 rounded-full bg-brand-dark/5 blur-3xl animate-pulse-slow z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <motion.div 
            className="lg:col-span-7 flex flex-col space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Tagline Badge */}
            <motion.div 
              variants={itemVariants}
              className="inline-flex self-start items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-50 text-brand-blue border border-blue-100"
            >
              <IconSparkles className="w-3.5 h-3.5 text-brand-blue animate-bounce" />
              <span>Solusi Teknologi & IT Support Terpercaya No. 1</span>
            </motion.div>

            {/* Main Catchy Headline */}
            <motion.h1 
              variants={itemVariants}
              className="text-3xl sm:text-4xl xl:text-[46px] font-display font-bold text-brand-dark leading-tight tracking-tight"
            >
              Menjaga Bisnis Anda Tetap <span className="text-brand-blue relative inline-block">
                Terhubung & Aman
                <span className="absolute left-0 bottom-1 w-full h-[6px] bg-brand-blue/15 rounded" />
              </span>
            </motion.h1>

            {/* Body Copy Description */}
            <motion.p 
              variants={itemVariants}
              className="text-slate-600 text-base sm:text-lg max-w-xl leading-relaxed"
            >
              HSR Technology menyediakan spesialis servis komputer profesional, instalasi jaringan berkecepatan tinggi, setup CCTV pintar, managed IT support, hingga jasa pembuatan website premium sesuai kebutuhan korporasi maupun residensial.
            </motion.p>

            {/* Interactive Benefits Row */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-2 gap-4 pt-2"
            >
              <div className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                <IconCircleCheck className="w-4 h-4 text-brand-blue shrink-0" />
                <span>Teknisi Bersertifikat UI/UX</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                <IconCircleCheck className="w-4 h-4 text-brand-blue shrink-0" />
                <span>Layanan Bergaransi Resmi</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                <IconCircleCheck className="w-4 h-4 text-brand-blue shrink-0" />
                <span>Respon Darurat &lt; 2 Jam</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                <IconCircleCheck className="w-4 h-4 text-brand-blue shrink-0" />
                <span>Tanpa Biaya Terselubung</span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4"
            >
                <a
                  href="#booking"
                  onClick={(e) => handleScrollTo(e, '#booking')}
                  className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-white bg-brand-blue hover:bg-blue-700 shadow-lg shadow-blue-500/20 active:scale-95 transition-all text-center cursor-pointer"
                >
                  <span>Mulai Reservasi Layanan</span>
                  <IconArrowRight className="w-4 h-4" />
                </a>

              <a
                href="#services"
                onClick={(e) => handleScrollTo(e, '#services')}
                className="group flex items-center justify-center gap-1 text-sm font-semibold text-slate-600 hover:text-brand-blue transition-colors py-3.5 px-4 cursor-pointer"
              >
                <span>Pelajari Layanan Kami</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">&rarr;</span>
              </a>
            </motion.div>

            {/* Stats Summary Panel */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center gap-8 pt-6 border-t border-slate-100 mt-2"
            >
              <div>
                <span className="block text-2xl font-bold text-brand-dark font-display">500+</span>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Klien Ditangani</span>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div>
                <span className="block text-2xl font-bold text-brand-dark font-display">99%</span>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Kepuasan Pelanggan</span>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div>
                <span className="block text-2xl font-bold text-brand-dark font-display">24/7</span>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Keamanan Siap Siaga</span>
              </div>
            </motion.div>

          </motion.div>

          {/* Right Graphical Column: Interactive Live Repair Progress Mockup */}
          <motion.div 
            className="lg:col-span-5 relative w-full flex justify-center hidden lg:flex select-none"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 50, damping: 15, delay: 0.4 }}
          >
            {/* Main Interactive Screen Frame */}
            <div className="w-full max-w-md relative select-none [perspective:1000px]">
              {/* Decorative accent background layout (stationary, not affected by hover) */}
              <div className="absolute -top-3 -left-3 w-12 h-12 rounded-xl bg-gradient-to-br from-brand-blue to-cyan-400 z-0 shadow-lg opacity-40 blur-[2px]" />
              <div className="absolute -bottom-3 -right-3 w-16 h-16 rounded-xl bg-gradient-to-br from-brand-dark to-slate-800 z-0 shadow-lg opacity-80 blur-[2px]" />
              
              {/* Gorgeous soft colorful ambient backdrop glow strictly for glassmorphic style bleeding */}
              <div className="absolute inset-4 -right-8 -bottom-10 bg-gradient-to-tr from-blue-300/30 via-indigo-100/20 to-teal-200/30 rounded-3xl opacity-60 blur-3xl pointer-events-none" />

              <motion.div 
                className="w-full bg-white/50 backdrop-blur-xl rounded-3xl border border-white/80 p-6 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.06)] relative transition-colors duration-200 overflow-hidden z-10 text-slate-800"
                style={{
                  transformStyle: "preserve-3d",
                }}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                animate={{
                  y: isHovered ? -4 : 0,
                  rotateX: isHovered ? tilt.x : 0,
                  rotateY: isHovered ? tilt.y : 0,
                  borderColor: isHovered ? "rgba(59, 130, 246, 0.35)" : "rgba(255, 255, 255, 0.8)",
                  boxShadow: isHovered 
                    ? "0 25px 50px -12px rgba(59, 130, 246, 0.1), 0 0 25px rgba(59, 130, 246, 0.05)" 
                    : "0 25px 60px -15px rgba(15, 23, 42, 0.06)"
                }}
                transition={{ type: 'spring', stiffness: 90, damping: 20 }}
              >
                {/* Realistic dynamic light reflection spotlight */}
                <div 
                  className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-300 z-30"
                  style={{
                    opacity: isHovered ? 1 : 0,
                    background: `radial-gradient(circle 220px at ${glowPos.x}% ${glowPos.y}%, rgba(59, 130, 246, 0.12), transparent 85%)`,
                  }}
                />
              
              {/* Header lights */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/60">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                </div>
                <div className="text-[10px] font-mono text-brand-blue font-extrabold tracking-wider flex items-center gap-1.5">
                  <IconActivity className="w-3.5 h-3.5 animate-pulse text-emerald-500" />
                  <span>SISTEM_MONITORING_SERVIS</span>
                </div>
              </div>
 
              {/* Repair Progress Tracker Dashboard */}
              <div className="space-y-4">
                
                {/* Simulated Order Identity */}
                <div className="bg-white/45 border border-white/60 backdrop-blur-sm rounded-2xl p-4 flex items-center justify-between gap-3 font-sans">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[9px] font-extrabold bg-blue-50 text-blue-600 border border-blue-100 px-1.5 py-0.5 rounded uppercase tracking-wider">No. Tiket</span>
                      <span className="text-[10px] font-mono font-bold text-slate-500">#KMP-3094</span>
                    </div>
                    <p className="text-xs font-extrabold text-slate-800">Servis Laptop Asus ROG</p>
                    <p className="text-[9px] text-slate-500 mt-0.5">Keluhan: Layar Kedip & Selalu Overheat</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] block text-slate-400 font-bold uppercase">Est. Selesai</span>
                    <span className="text-xs font-bold text-brand-blue font-mono font-extrabold">Hari Ini</span>
                  </div>
                </div>
 
                {/* Main Dynamic Status Card with AnimatePresence */}
                <div className="relative overflow-hidden rounded-2xl border p-4 bg-white/45 border-white/60 backdrop-blur-sm min-h-[110px] flex flex-col justify-between">
                  <AnimatePresence mode="wait">
                    {currentStatus === 'pengerjaan' ? (
                      <motion.div
                        key="status-pengerjaan"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-50 text-amber-600 border border-amber-100 uppercase tracking-wider animate-pulse">
                            <IconRefresh className="w-3 h-3 animate-spin" />
                            Dalam Pengerjaan
                          </span>
                          <span className="text-xs font-mono font-bold text-amber-605">75% Selesai</span>
                        </div>
                        <p className="text-[11px] font-bold text-slate-700">
                          Teknisi sedang melakukan re-pasting premium thermal paste & penggantian chip regulator daya.
                        </p>
                        {/* Pulse progress line */}
                        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mt-1 relative border border-slate-100">
                          <motion.div 
                            className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full"
                            style={{ width: "75%" }}
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                          />
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="status-selesai"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-600 border border-emerald-150 uppercase tracking-wider">
                            <IconCircleCheck className="w-3 h-3 text-emerald-600 animate-bounce" />
                            Selesai Siap Jemput
                          </span>
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100 shadow-sm">Selesai</span>
                        </div>
                        <p className="text-[11px] font-bold text-slate-700 leading-relaxed">
                          Selesai dapat dilakukan penjemputan! Perangkat lulus uji stabilitas stress-test, suhu dingin optimal.
                        </p>
                        {/* Full progress line */}
                        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mt-1 border border-slate-100">
                          <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-450 rounded-full w-full shadow-[0_0_8px_rgba(16,185,129,0.2)]" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
 
                {/* Steps Visual Progress Vertical Tracker */}
                <div className="space-y-2.5 pl-1.5 font-sans">
                  
                  {/* Step 1 */}
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-[10px] text-white font-extrabold shadow-[0_0_8px_rgba(59,130,246,0.3)]">
                        ✓
                      </div>
                      <div className="w-0.5 h-6 bg-blue-500" />
                    </div>
                    <div>
                      <h5 className="text-[11px] font-extrabold text-slate-800">1. Registrasi & Diagnosa Awal</h5>
                      <p className="text-[9px] text-slate-500">Kerusakan terpetakan sistem • Pukul 09:15 WIB</p>
                    </div>
                  </div>
 
                  {/* Step 2 */}
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-[10px] text-white font-extrabold shadow-[0_0_8px_rgba(59,130,246,0.3)]">
                        ✓
                      </div>
                      <div className="w-0.5 h-6 transition-colors duration-500" style={{ backgroundColor: currentStatus === 'selesai' ? '#3b82f6' : '#cbd5e1' }} />
                    </div>
                    <div>
                      <h5 className="text-[11px] font-extrabold text-slate-800">2. Persiapan Suku Cadang</h5>
                      <p className="text-[9px] text-slate-500 font-medium">IC Regulator daya & Thermal Grizzly siap • Pukul 10:45 WIB</p>
                    </div>
                  </div>
 
                  {/* Step 3 */}
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div 
                        className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-extrabold transition-all duration-500 text-white"
                        style={{ 
                          backgroundColor: currentStatus === 'selesai' ? '#3b82f6' : '#f59e0b',
                          boxShadow: currentStatus === 'selesai' ? '0 0 8px rgba(59,130,246,0.3)' : '0 0 10px rgba(245,158,11,0.4)'
                        }}
                      >
                        {currentStatus === 'selesai' ? '✓' : '3'}
                      </div>
                      <div className="w-0.5 h-6 transition-colors duration-500" style={{ backgroundColor: currentStatus === 'selesai' ? '#10b981' : '#cbd5e1' }} />
                    </div>
                    <div>
                      <h5 className="text-[11px] font-extrabold text-slate-800 flex items-center gap-1.5">
                        <span>3. Tindakan Perbaikan Siber</span>
                        {currentStatus === 'pengerjaan' && <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />}
                      </h5>
                      <p className="text-[9px] text-slate-500 font-medium">Solder ulang sirkuit pengisi daya & penggantian thermal paste</p>
                    </div>
                  </div>
 
                  {/* Step 4 */}
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div 
                        className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-extrabold transition-all duration-500"
                        style={{ 
                          backgroundColor: currentStatus === 'selesai' ? '#10b981' : '#f1f5f9', 
                          color: currentStatus === 'selesai' ? '#ffffff' : '#94a3b8',
                          boxShadow: currentStatus === 'selesai' ? '0 0 12px rgba(16,185,129,0.4)' : 'none',
                          border: currentStatus === 'selesai' ? 'none' : '1px solid #cbd5e1'
                        }}
                      >
                        {currentStatus === 'selesai' ? '✓' : '4'}
                      </div>
                    </div>
                    <div>
                      <h5 className={`text-[11px] font-extrabold transition-all duration-500 ${currentStatus === 'selesai' ? 'text-emerald-600' : 'text-slate-400'}`}>
                        4. Selesai & Dapat Diambil
                      </h5>
                      <p className="text-[9px] text-slate-500 font-medium">
                        {currentStatus === 'selesai' ? 'Selesai dapat dilakukan penjemputan oleh klien' : 'Menunggu pengerjaan siber selesai'}
                      </p>
                    </div>
                  </div>
 
                </div>
 
                {/* Simulation Control Switcher */}
                <div className="pt-3 border-t border-white/60 flex justify-between items-center bg-white/45 p-2.5 rounded-xl border border-white/60 backdrop-blur-sm">
                  <span className="text-[9px] font-mono text-slate-500 font-semibold tracking-wide flex items-center gap-1">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    SIMULASI STATUS:
                  </span>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setCurrentStatus('pengerjaan')}
                      className={`px-2 py-1 rounded text-[9px] font-extrabold transition-all border cursor-pointer ${currentStatus === 'pengerjaan' ? 'bg-amber-50 border-amber-200 text-amber-700' : 'bg-white/80 border-slate-200 text-slate-500 hover:text-slate-800'}`}
                    >
                      Dalam Pengerjaan
                    </button>
                    <button
                      onClick={() => setCurrentStatus('selesai')}
                      className={`px-2 py-1 rounded text-[9px] font-extrabold transition-all border cursor-pointer ${currentStatus === 'selesai' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-white/80 border-slate-200 text-slate-500 hover:text-slate-800'}`}
                    >
                      Selesai Siap Jemput
                    </button>
                  </div>
                </div>
 
              </div>
 
            </motion.div>
          </div>

            {/* Glowing orb backdrop */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-blue/15 rounded-full blur-3xl -z-20 animate-pulse" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
