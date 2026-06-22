/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { IconBrandWhatsapp } from '@tabler/icons-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import WhyUs from './components/WhyUs';
import Reservation from './components/Reservation';
import Footer from './components/Footer';
import Login from './components/Login';
import Blog from './components/Blog';
import About from './components/About';
import Tracking from './components/Tracking';
import Marketplace from './components/Marketplace';
import { LegalDrawerProvider } from './context/LegalDrawerContext';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'booking' | 'login' | 'blog' | 'about' | 'tracking' | 'marketplace' | 'portfolio'>('home');
  const [activeSection, setActiveSection] = useState('home');
  const [userRole, setUserRole] = useState<'admin' | 'teknisi' | null>(null);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isWaHovered, setIsWaHovered] = useState(false);

  // Monitor scroll height for floating WhatsApp text expand/collapse and backdrop-filter scrolled style
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      setIsAtTop(scrollPos < 60);
      setIsScrolled(scrollPos > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Initialize Locomotive Scroll v5 for premium smooth scrolling
  useEffect(() => {
    let locomotiveScrollInstance: any;

    const initScroll = async () => {
      try {
        const LocomotiveScrollModule = await import('locomotive-scroll');
        const LocomotiveScroll = LocomotiveScrollModule.default;

        // Disable browser's standard scrollBehavior smooth to prevent conflict with Locomotive scroll engine
        document.documentElement.style.scrollBehavior = 'auto';

        locomotiveScrollInstance = new LocomotiveScroll({
          lenisOptions: {
            smoothWheel: true,
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            touchMultiplier: 1.5,
          },
          scrollCallback: (args: any) => {
            const scrollY = args.scroll || 0;
            setIsAtTop(scrollY < 60);
            setIsScrolled(scrollY > 20);
          }
        });

        // Trigger updates once DOM has finished rendering completely
        const resizeTimeout = setTimeout(() => {
          if (locomotiveScrollInstance) {
            window.dispatchEvent(new Event('resize'));
          }
        }, 150);

        return () => clearTimeout(resizeTimeout);
      } catch (error) {
        console.error('Failed to initialize Locomotive Scroll:', error);
      }
    };

    initScroll();

    return () => {
      if (locomotiveScrollInstance) {
        try {
          locomotiveScrollInstance.destroy();
        } catch (err) {
          console.warn('Error destroying Locomotive Scroll:', err);
        }
      }
      // Restore standard native smooth navigation transitions on cleanup
      document.documentElement.style.scrollBehavior = 'smooth';
    };
  }, [currentView]);

  // Restore logged in user role from localStorage
  useEffect(() => {
    const savedRole = localStorage.getItem('hsr_user_role');
    if (savedRole === 'admin' || savedRole === 'teknisi') {
      setUserRole(savedRole as 'admin' | 'teknisi');
    }
  }, []);

  const handleNavigate = (view: 'home' | 'booking' | 'login' | 'blog' | 'about' | 'tracking' | 'marketplace' | 'portfolio', sectionId?: string) => {
    setCurrentView(view);
    
    if (view === 'home') {
      if (sectionId) {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 120);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  const handleLogout = () => {
    setUserRole(null);
    localStorage.removeItem('hsr_user_role');
    handleNavigate('home');
  };

  // Viewport scroll detection for sticky navbar highlight
  useEffect(() => {
    if (currentView !== 'home') return;
    
    const sections = ['home', 'services', 'portfolio', 'process', 'booking'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px', // detects when section covers mid-view
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, [currentView]);

  // Handle global click interceptions for custom SPA router transitions
  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href === '#booking') {
          e.preventDefault();
          handleNavigate('booking');
        } else if (href && href.startsWith('#') && currentView === 'booking') {
          e.preventDefault();
          handleNavigate('home', href.substring(1));
        }
      }
    };
    
    document.addEventListener('click', clickHandler);
    
    // Listen to selection event from Services page to switch page view
    const handleSelectService = (e: Event) => {
      handleNavigate('booking');
    };
    window.addEventListener('selectServiceInBooking', handleSelectService);

    return () => {
      document.removeEventListener('click', clickHandler);
      window.removeEventListener('selectServiceInBooking', handleSelectService);
    };
  }, [currentView]);

  return (
    <LegalDrawerProvider>
      <div className="relative min-h-screen bg-white">
        
        {/* Sticky Glassmorphic Navbar */}
        {currentView !== 'login' && (
          <Navbar 
            currentView={currentView} 
            onNavigate={handleNavigate} 
            activeSection={activeSection} 
            userRole={userRole}
            onLogout={handleLogout}
            isScrolledProp={isScrolled}
          />
        )}

        {/* Main Multi-View SPA Layout Container with premium page transitions */}
        <main id="main-content" aria-label="Main Content">
          <AnimatePresence mode="wait">
            {currentView === 'home' ? (
              <motion.div
                key="home-page"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                {/* HERO SECTION */}
                <Hero />

                {/* SERVICES SECTION */}
                <Services />

                {/* PORTFOLIO SECTION */}
                <Portfolio onNavigate={handleNavigate} />

                {/* WHY US FACTORS / WORK PROCESS & REVIEWS SECTION */}
                <WhyUs />
              </motion.div>
             ) : currentView === 'portfolio' ? (
              <motion.div
                key="portfolio-page"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="pt-24 min-h-[70vh]"
              >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
                  <button
                    onClick={() => handleNavigate('home')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-brand-dark rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer animate-fade-in"
                  >
                    <span>← Kembali ke Halaman Utama</span>
                  </button>
                </div>

                <Portfolio isStandalone={true} onNavigate={handleNavigate} />
              </motion.div>
            ) : currentView === 'booking' ? (
              <motion.div
                key="booking-page"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="pt-24 min-h-[70vh]"
              >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
                  <button
                    onClick={() => handleNavigate('home')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-brand-dark rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer animate-fade-in"
                  >
                    <span>← Kembali ke Halaman Utama</span>
                  </button>
                </div>

                {/* BOOKING CALC ENGINE & RESERVATION SECTION */}
                <Reservation />
              </motion.div>
            ) : currentView === 'blog' ? (
              <motion.div
                key="blog-page"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <Blog onNavigateToBooking={() => handleNavigate('booking')} />
              </motion.div>
            ) : currentView === 'about' ? (
              <motion.div
                key="about-page"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <About />
              </motion.div>
            ) : currentView === 'tracking' ? (
              <motion.div
                key="tracking-page"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <Tracking />
              </motion.div>
            ) : currentView === 'marketplace' ? (
              <motion.div
                key="marketplace-page"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <Marketplace />
              </motion.div>
            ) : (
              <motion.div
                key="login-page"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <Login 
                  userRole={userRole}
                  onLoginSuccess={(role) => {
                    setUserRole(role);
                    localStorage.setItem('hsr_user_role', role);
                  }}
                  onLogout={handleLogout}
                  onNavigateHome={() => handleNavigate('home')}
                />
              </motion.div>
            )}
          </AnimatePresence>

        </main>

        {/* FOOTER & MAPS (Hidden on Login page) */}
        {currentView !== 'login' && <Footer onNavigate={handleNavigate} />}

        {/* Interactive Floating WhatsApp Widget Helper (Hidden on Login page) */}
        {currentView !== 'login' && (
          <motion.div 
            className="fixed bottom-6 right-6 z-40"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, type: 'spring' }}
          >
            <motion.a
              href="https://wa.me/628123456789?text=Halo%20HSR%20Technology,%20saya%20ingin%20konsultasi%20mengenai%20layanan%20IT%20Support%20/%20Servis%20komputer"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setIsWaHovered(true)}
              onMouseLeave={() => setIsWaHovered(false)}
              className={`flex items-center justify-center bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold h-12 shadow-[0_8px_20px_-4px_rgba(16,185,129,0.4)] relative cursor-pointer rounded-full overflow-hidden transition-all duration-300 ease-out ${
                (isAtTop || isWaHovered) ? 'w-[165px] px-3.5' : 'w-12 px-0'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Premium, gentle pulsing rings using Framer Motion (smooth fade-in/fade-out) */}
              <motion.span 
                className="absolute inset-0 rounded-full border border-emerald-500/40 pointer-events-none z-0"
                animate={{
                  scale: [1, 1.25],
                  opacity: [0, 0.6, 0]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
              />
              <motion.span 
                className="absolute inset-0 rounded-full border border-teal-400/30 pointer-events-none z-0"
                animate={{
                  scale: [1, 1.45],
                  opacity: [0, 0.4, 0]
                }}
                transition={{
                  duration: 2.5,
                  delay: 0.8,
                  repeat: Infinity,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
              />
              
              <IconBrandWhatsapp className="w-6 h-6 relative z-10 shrink-0" />
              
              <span
                className={`transition-all duration-300 ease-out overflow-hidden whitespace-nowrap text-xs font-extrabold tracking-wide relative z-10 block ${
                  (isAtTop || isWaHovered) ? 'opacity-100 max-w-[120px] ml-1.5' : 'opacity-0 max-w-0 ml-0 pointer-events-none'
                }`}
              >
                Konsultasi Gratis
              </span>
            </motion.a>
          </motion.div>
        )}

        {/* Vercel Web Analytics & Performance Core Tools */}
        <SpeedInsights />
        <Analytics />

      </div>
    </LegalDrawerProvider>
  );
}
