/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { IconMenu2, IconX, IconLogin, IconLogout, IconLayoutDashboard } from '@tabler/icons-react';
import { 
  ChevronDown, 
  Server, 
  Cpu, 
  Calendar, 
  Activity, 
  BookOpen,
  ShoppingBag 
} from 'lucide-react';
import Logo from './Logo';

interface NavbarProps {
  currentView: 'home' | 'booking' | 'login' | 'blog' | 'about' | 'tracking' | 'marketplace' | 'portfolio';
  onNavigate: (view: 'home' | 'booking' | 'login' | 'blog' | 'about' | 'tracking' | 'marketplace' | 'portfolio', sectionId?: string) => void;
  activeSection: string;
  userRole?: 'admin' | 'teknisi' | null;
  onLogout?: () => void;
  isScrolledProp?: boolean;
}

export default function Navbar({ 
  currentView, 
  onNavigate, 
  activeSection, 
  userRole, 
  onLogout,
  isScrolledProp
}: NavbarProps) {
  const [localIsScrolled, setLocalIsScrolled] = useState(false);
  const isScrolled = isScrolledProp !== undefined ? isScrolledProp : localIsScrolled;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Custom states for the submenus & toast
  const [hoveredMenu, setHoveredMenu] = useState<'solusi' | 'hsrcare' | null>(null);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<'solusi' | 'hsrcare' | null>(null);
  const [showBlogToast, setShowBlogToast] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      if (scrollPos > 20) {
        setLocalIsScrolled(true);
      } else {
        setLocalIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Closes blog toast after 4 seconds automatically
  useEffect(() => {
    if (showBlogToast) {
      const timer = setTimeout(() => {
        setShowBlogToast(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showBlogToast]);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    
    if (id === 'booking') {
      onNavigate('booking');
    } else if (id === 'reservation-tracker') {
      onNavigate('tracking');
    } else {
      onNavigate('home', id);
    }
    
    setHoveredMenu(null);
    setIsMobileMenuOpen(false);
  };

  const handleBlogClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShowBlogToast(true);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileSubmenu = (menu: 'solusi' | 'hsrcare') => {
    if (openMobileSubmenu === menu) {
      setOpenMobileSubmenu(null);
    } else {
      setOpenMobileSubmenu(menu);
    }
  };

  return (
    <>
      <header 
        id="main-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          (isScrolled || currentView !== 'home') 
            ? 'glass-nav-scrolled py-3.5' 
            : 'bg-transparent border-b border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between font-sans">
            
            {/* Logo */}
            <a href="#home" onClick={(e) => handleScrollTo(e, '#home')} className="focus:outline-none">
              <Logo size="md" />
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-1.5" aria-label="Desktop navigation">
              
              {/* Beranda */}
              <a
                href="#home"
                onClick={(e) => handleScrollTo(e, '#home')}
                className={`relative px-2.5 py-2 text-sm font-semibold transition-colors duration-200 focus:outline-none ${
                  currentView === 'home' && activeSection === 'home'
                    ? 'text-brand-blue font-bold'
                    : 'text-slate-600 hover:text-brand-blue'
                }`}
              >
                Beranda
              </a>

              {/* Blog */}
              <a
                href="#blog"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('blog');
                  setIsMobileMenuOpen(false);
                }}
                className={`relative px-2.5 py-2 text-sm font-semibold transition-colors duration-200 focus:outline-none ${
                  currentView === 'blog'
                    ? 'text-brand-blue font-bold'
                    : 'text-slate-600 hover:text-brand-blue'
                }`}
              >
                Blog
              </a>

              {/* Solusi Dropdown Menu */}
              <div 
                className="relative"
                onMouseEnter={() => setHoveredMenu('solusi')}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <button
                  className={`flex items-center gap-1 px-2.5 py-2 text-sm font-semibold transition-colors duration-200 focus:outline-none cursor-pointer ${
                    (currentView === 'home' && (activeSection === 'services' || activeSection === 'portfolio')) || currentView === 'marketplace'
                      ? 'text-brand-blue font-bold px-3 py-1 rounded-xl bg-blue-50/50 text-[#2563eb]' 
                      : 'text-slate-600 hover:text-brand-blue'
                  }`}
                >
                  <span>Solusi</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${hoveredMenu === 'solusi' ? 'rotate-180 text-brand-blue' : 'text-slate-400'}`} />
                </button>
                
                <AnimatePresence>
                  {hoveredMenu === 'solusi' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 w-[330px] bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 grid grid-cols-1 gap-1"
                    >
                      <a
                        href="#services"
                        onClick={(e) => handleScrollTo(e, '#services')}
                        className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-slate-50 transition-colors group text-left"
                      >
                        <div className="p-2.5 rounded-xl bg-blue-50 text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors duration-200 mt-0.5">
                          <Server className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <span className="block font-bold text-[13px] text-slate-800 group-hover:text-brand-blue transition-colors">Layanan</span>
                          <span className="block text-[11px] text-slate-500 mt-1 leading-normal font-medium font-sans">Penyedia managed IT support, pasang CCTV, jaringan fiber, & audio.</span>
                        </div>
                      </a>
                      
                      <a
                        href="#marketplace"
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate('marketplace');
                        }}
                        className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-slate-50 transition-colors group text-left"
                      >
                        <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-200 mt-0.5">
                          <ShoppingBag className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <span className="block font-bold text-[13px] text-slate-800 group-hover:text-emerald-600 transition-colors flex items-center gap-1.5">
                            <span>Jual Beli</span>
                            <span className="text-[8px] bg-emerald-500 text-white font-black px-1.5 py-0.5 rounded tracking-widest font-mono">LIVE</span>
                          </span>
                          <span className="block text-[11px] text-slate-500 mt-1 leading-normal font-medium font-sans">Hardware server premium, laptop refurbished & spareparts.</span>
                        </div>
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* HSR Care Dropdown Menu */}
              <div 
                className="relative"
                onMouseEnter={() => setHoveredMenu('hsrcare')}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <button
                  className={`flex items-center gap-1 px-2.5 py-2 text-sm font-semibold transition-colors duration-200 focus:outline-none cursor-pointer ${
                    currentView === 'booking' || currentView === 'tracking'
                      ? 'text-brand-blue font-bold' 
                      : 'text-slate-600 hover:text-brand-blue'
                  }`}
                >
                  <span>HSR Care</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${hoveredMenu === 'hsrcare' ? 'rotate-180 text-brand-blue' : 'text-slate-400'}`} />
                </button>
                
                <AnimatePresence>
                  {hoveredMenu === 'hsrcare' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 w-[330px] bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 grid grid-cols-1 gap-1"
                    >
                      <a
                        href="#booking"
                        onClick={(e) => handleScrollTo(e, '#booking')}
                        className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-slate-50 transition-colors group text-left"
                      >
                        <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-200 mt-0.5">
                          <Calendar className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <span className="block font-bold text-[13px] text-slate-800 group-hover:text-emerald-600 transition-colors">Reservasi</span>
                          <span className="block text-[11px] text-slate-500 mt-1 leading-normal font-medium font-sans">Booking jadwal teknisi, konsultasi kebutuhan IT, & survei lokasi.</span>
                        </div>
                      </a>
                      
                      <a
                        href="#reservation-tracker"
                        onClick={(e) => handleScrollTo(e, '#reservation-tracker')}
                        className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-slate-50 transition-colors group text-left"
                      >
                        <div className="p-2.5 rounded-xl bg-cyan-50 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white transition-colors duration-200 mt-0.5">
                          <Activity className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <span className="block font-bold text-[13px] text-slate-800 group-hover:text-cyan-600 transition-colors">Tracking</span>
                          <span className="block text-[11px] text-slate-500 mt-1 leading-normal font-medium font-sans">Pantau progress pengerjaan tiket perbaikan & posisi teknisi Anda.</span>
                        </div>
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Tentang Kami */}
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('about');
                  setIsMobileMenuOpen(false);
                }}
                className={`relative px-2.5 py-2 text-sm font-semibold transition-colors duration-200 focus:outline-none ${
                  currentView === 'about'
                    ? 'text-brand-blue font-bold'
                    : 'text-slate-600 hover:text-brand-blue'
                }`}
              >
                Tentang Kami
              </a>

            </nav>

            {/* CTAs */}
            <div className="hidden md:flex items-center space-x-3">
              {userRole ? (
                <motion.button
                  onClick={() => onNavigate('login')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold border transition-all duration-300 cursor-pointer ${
                    currentView === 'login'
                      ? 'text-white bg-brand-blue border-transparent hover:bg-brand-blue/10 hover:text-brand-blue hover:backdrop-blur-md hover:border-brand-blue/30 shadow-md shadow-blue-500/20'
                      : 'text-slate-700 bg-slate-100/80 border-transparent hover:bg-white/40 hover:text-brand-blue hover:backdrop-blur-md hover:border-slate-300/40'
                  }`}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <IconLayoutDashboard className="w-3.5 h-3.5" />
                  <span>Dashboard</span>
                </motion.button>
              ) : (
                <motion.button
                  onClick={() => onNavigate('login')}
                  className="flex items-center gap-1.5 px-4.5 py-2 rounded-lg text-xs font-bold text-white bg-brand-blue border border-transparent hover:bg-brand-blue/10 hover:text-brand-blue hover:backdrop-blur-md hover:border-brand-blue/30 shadow-sm shadow-blue-500/10 transition-all duration-300 cursor-pointer font-sans"
                  whileHover={{ scale: 1.02, y: -0.5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <IconLogin className="w-3.5 h-3.5" />
                  <span>Masuk</span>
                </motion.button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-slate-600 hover:text-brand-dark hover:bg-slate-100 z-50 focus:outline-none cursor-pointer"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <IconX className="w-6 h-6" /> : <IconMenu2 className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden bg-white/95 backdrop-blur-lg shadow-lg border-b border-slate-100 overflow-hidden absolute top-full left-0 right-0 font-sans"
            >
              <div className="px-4 pt-3 pb-6 space-y-2.5 max-h-[80vh] overflow-y-auto">
                
                {/* 1. Beranda */}
                <a
                  href="#home"
                  onClick={(e) => handleScrollTo(e, '#home')}
                  className={`block px-4 py-3 rounded-lg text-base font-semibold transition-all ${
                    currentView === 'home' && activeSection === 'home'
                      ? 'text-brand-blue bg-blue-50/50 pl-6 border-l-4 border-brand-blue'
                      : 'text-slate-600 hover:text-brand-dark hover:bg-slate-50'
                  }`}
                >
                  Beranda
                </a>

                {/* 2. Blog */}
                <a
                  href="#blog"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('blog');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block px-4 py-3 rounded-lg text-base font-semibold transition-all ${
                    currentView === 'blog'
                      ? 'text-brand-blue bg-blue-50/50 pl-6 border-l-4 border-brand-blue font-bold'
                      : 'text-slate-600 hover:text-brand-blue hover:bg-slate-50'
                  }`}
                >
                  Blog
                </a>

                {/* 3. Solusi Accordion */}
                <div className="border-b border-slate-50 pb-1.5">
                  <button
                    onClick={() => toggleMobileSubmenu('solusi')}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-base font-semibold text-slate-600 hover:text-brand-dark hover:bg-slate-50 cursor-pointer text-left"
                  >
                    <span>Solusi</span>
                    <ChevronDown className={`w-4.5 h-4.5 transition-transform duration-200 text-slate-400 ${openMobileSubmenu === 'solusi' ? 'rotate-180 text-brand-blue' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openMobileSubmenu === 'solusi' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="pl-4 pr-2 space-y-1 overflow-hidden"
                      >
                        <a
                          href="#services"
                          onClick={(e) => handleScrollTo(e, '#services')}
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50"
                        >
                          <div className="p-2 rounded-lg bg-blue-50 text-brand-blue mt-0.5">
                            <Server className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-800">Layanan</p>
                            <p className="text-[11px] text-slate-500 mt-0.5 leading-normal">Instalasi CCTV, jaringan, & audio profesional.</p>
                          </div>
                        </a>
                        <a
                          href="#marketplace"
                          onClick={(e) => {
                            e.preventDefault();
                            onNavigate('marketplace');
                            setIsMobileMenuOpen(false);
                          }}
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 cursor-pointer"
                        >
                          <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 mt-0.5">
                            <ShoppingBag className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <p className="text-sm font-bold text-slate-800">Jual Beli</p>
                              <span className="text-[8px] bg-emerald-500 text-white font-black px-1 py-0.5 rounded scale-90 tracking-widest font-mono">LIVE</span>
                            </div>
                            <p className="text-[11px] text-slate-500 mt-0.5 leading-normal">Hardware server premium, laptop refurbished & spareparts.</p>
                          </div>
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 4. HSR Care Accordion */}
                <div className="border-b border-slate-50 pb-1.5">
                  <button
                    onClick={() => toggleMobileSubmenu('hsrcare')}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-base font-semibold text-slate-600 hover:text-brand-dark hover:bg-slate-50 cursor-pointer text-left"
                  >
                    <span>HSR Care</span>
                    <ChevronDown className={`w-4.5 h-4.5 transition-transform duration-200 text-slate-400 ${openMobileSubmenu === 'hsrcare' ? 'rotate-180 text-brand-blue' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openMobileSubmenu === 'hsrcare' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="pl-4 pr-2 space-y-1 overflow-hidden"
                      >
                        <a
                          href="#booking"
                          onClick={(e) => handleScrollTo(e, '#booking')}
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50"
                        >
                          <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 mt-0.5">
                            <Calendar className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-800">Reservasi</p>
                            <p className="text-[11px] text-slate-500 mt-0.5 leading-normal">Survei on-site & booking kunjungan jadwal teknisi.</p>
                          </div>
                        </a>
                        <a
                          href="#reservation-tracker"
                          onClick={(e) => handleScrollTo(e, '#reservation-tracker')}
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50"
                        >
                          <div className="p-2 rounded-lg bg-cyan-50 text-cyan-600 mt-0.5">
                            <Activity className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-800">Tracking</p>
                            <p className="text-[11px] text-slate-500 mt-0.5 leading-normal">Pantau posisi teknisi & status kelancaran tiket live.</p>
                          </div>
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 5. Tentang Kami */}
                <a
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('about');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block px-4 py-3 rounded-lg text-base font-semibold transition-all ${
                    currentView === 'about'
                      ? 'text-brand-blue bg-blue-50/50 pl-6 border-l-4 border-brand-blue font-bold'
                      : 'text-slate-600 hover:text-brand-blue hover:bg-slate-50'
                  }`}
                >
                  Tentang Kami
                </a>
                
                {/* Mobile session indicators */}
                <div className="pt-4 border-t border-slate-100">
                  {userRole ? (
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => {
                          onNavigate('login');
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center justify-center gap-1.5 px-4 py-3 rounded-lg text-xs font-bold text-white bg-brand-blue select-none"
                      >
                        <IconLayoutDashboard className="w-4 h-4" />
                        <span>Dashboard</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        onNavigate('login');
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-center gap-1.5 px-4 py-3 rounded-lg text-sm font-bold text-white bg-slate-900 hover:bg-slate-800"
                    >
                      <IconLogin className="w-4 h-4" />
                      <span>Masuk</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Floating Global Coming Soon / Segera Hadir Notification Toast (Premium Design) */}
      <AnimatePresence>
        {showBlogToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 280, damping: 24 }}
            className="fixed top-24 right-4 sm:right-6 md:right-8 z-50 max-w-sm w-[90vw] bg-slate-900/95 backdrop-blur-md text-white rounded-2xl shadow-[0_20px_50px_-10px_rgba(15,23,42,0.6)] p-4 border border-slate-800 flex items-start gap-3.5"
          >
            <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-400 shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="font-sans">
              <h4 className="font-bold text-sm text-slate-100 flex items-center gap-1.5">
                <span>HSR Blog: Segera Hadir!</span>
                <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 font-extrabold tracking-widest font-mono">SOON</span>
              </h4>
              <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed font-medium">
                Kami sedang meramu artikel menarik seputar tutorial perbaikan sistem, tips keamanan cyber, and optimalisasi infrastruktur jaringan untuk Anda.
              </p>
            </div>
            <button 
              onClick={() => setShowBlogToast(false)}
              className="text-slate-500 hover:text-slate-300 p-1 -mt-1 ml-auto transition-colors cursor-pointer"
              aria-label="Tutup"
            >
              <IconX className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
