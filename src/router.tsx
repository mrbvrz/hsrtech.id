/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, createContext, useContext } from 'react';
import { 
  createRootRoute, 
  createRoute, 
  createRouter, 
  Outlet, 
  useNavigate, 
  useLocation
} from '@tanstack/react-router';
import { motion, AnimatePresence } from 'motion/react';
import { IconBrandWhatsapp } from '@tabler/icons-react';

// Common Providers & Styles
import { LegalDrawerProvider } from './context/LegalDrawerContext';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';

// Component layout parts
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Route views
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import WhyUs from './components/WhyUs';
import Reservation from './components/Reservation';
import Blog from './components/Blog';
import About from './components/About';
import Tracking from './components/Tracking';
import Marketplace from './components/Marketplace';
import Login from './components/Login';

// TYPE MAPPING FOR BACKWARD COMPATIBILITY
type ViewType = 'home' | 'booking' | 'login' | 'blog' | 'about' | 'tracking' | 'marketplace' | 'portfolio';

interface RouteContextType {
  userRole: 'admin' | 'teknisi' | null;
  setUserRole: React.Dispatch<React.SetStateAction<'admin' | 'teknisi' | null>>;
  handleLogout: () => void;
  handleNavigate: (view: ViewType, sectionId?: string) => void;
}

const RouteContext = createContext<RouteContextType | null>(null);

export function useRouteContext() {
  const context = useContext(RouteContext);
  if (!context) {
    throw new Error('useRouteContext must be used within RouteContext.Provider');
  }
  return context;
}

function RootComponent() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  
  const [activeSection, setActiveSection] = useState('home');
  const [userRole, setUserRole] = useState<'admin' | 'teknisi' | null>(null);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isWaHovered, setIsWaHovered] = useState(false);

  const isLoginPath = currentPath === '/login';

  // Monitor scroll height
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

  // Reset scroll to top on path changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPath]);

  // Restore logged in user role from localStorage
  useEffect(() => {
    const savedRole = localStorage.getItem('hsr_user_role');
    if (savedRole === 'admin' || savedRole === 'teknisi') {
      setUserRole(savedRole as 'admin' | 'teknisi');
    }
  }, []);

  // Centralized navigation helper to map old views into TanStack paths
  const getPathFromView = (view: ViewType): string => {
    switch (view) {
      case 'home': return '/';
      case 'login': return '/login';
      case 'blog': return '/blog';
      case 'about': return '/tentang-kami';
      case 'booking': return '/reservasi';
      case 'tracking': return '/lacak-servis';
      case 'marketplace': return '/marketplace';
      case 'portfolio': return '/portfolio';
      default: return '/';
    }
  };

  const getViewFromPath = (path: string): ViewType => {
    if (path === '/') return 'home';
    if (path === '/login') return 'login';
    if (path === '/blog') return 'blog';
    if (path === '/tentang-kami') return 'about';
    if (path === '/reservasi') return 'booking';
    if (path === '/lacak-servis') return 'tracking';
    if (path === '/marketplace') return 'marketplace';
    if (path === '/portfolio') return 'portfolio';
    return 'home';
  };

  const handleNavigate = (view: ViewType, sectionId?: string) => {
    if (view === 'home') {
      navigate({ to: '/' });
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
      navigate({ to: getPathFromView(view) });
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  const handleLogout = () => {
    setUserRole(null);
    localStorage.removeItem('hsr_user_role');
    navigate({ to: '/' });
  };

  // Viewport scroll detection for sticky navbar highlight
  useEffect(() => {
    if (currentPath !== '/') return;
    
    const sections = ['home', 'services', 'portfolio', 'process', 'booking'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px',
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
  }, [currentPath]);

  // Handle global click interceptions for custom router transitions
  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href === '#booking') {
          e.preventDefault();
          handleNavigate('booking');
        } else if (href && href.startsWith('#') && currentPath === '/reservasi') {
          e.preventDefault();
          handleNavigate('home', href.substring(1));
        }
      }
    };
    
    document.addEventListener('click', clickHandler);
    
    const handleSelectService = () => {
      handleNavigate('booking');
    };
    window.addEventListener('selectServiceInBooking', handleSelectService);

    return () => {
      document.removeEventListener('click', clickHandler);
      window.removeEventListener('selectServiceInBooking', handleSelectService);
    };
  }, [currentPath]);

  return (
    <LegalDrawerProvider>
      <div className="relative min-h-screen bg-white">
        
        {/* Sticky Navbar (with computed active tab paths) */}
        {!isLoginPath && (
          <Navbar 
            currentView={getViewFromPath(currentPath)} 
            onNavigate={handleNavigate} 
            activeSection={activeSection} 
            userRole={userRole}
            onLogout={handleLogout}
            isScrolledProp={isScrolled}
          />
        )}

        {/* Dynamic Route Outlet wrapper */}
        <main id="main-content" aria-label="Main Content">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPath}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <RouteContext.Provider value={{ userRole, setUserRole, handleLogout, handleNavigate }}>
                <Outlet />
              </RouteContext.Provider>
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer info links */}
        {!isLoginPath && <Footer onNavigate={handleNavigate} />}

        {/* Floating WhatsApp Quick Consultation link widget */}
        {!isLoginPath && (
          <motion.div 
            className="fixed bottom-6 right-6 z-40"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, type: 'spring' }}
          >
            <motion.a
              href="https://wa.me/628123456789?text=Halo%2520HSR%2520Technology,%2520saya%2520ingin%252520konsultasi%2520mengenai%2520layanan%2520IT%2520Support%252520/%252520Servis%2520komputer"
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

        <SpeedInsights />
        <Analytics />

      </div>
    </LegalDrawerProvider>
  );
}

// DECLARE AND EXPORT THE MAIN ROUTE TREE
const rootRoute = createRootRoute({
  component: RootComponent,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: function IndexView() {
    const { handleNavigate } = useRouteContext();
    return (
      <>
        <Hero />
        <Services />
        <Portfolio onNavigate={handleNavigate} />
        <WhyUs />
      </>
    );
  }
});

const portfolioRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/portfolio',
  component: function PortfolioView() {
    const { handleNavigate } = useRouteContext();
    return (
      <div className="pt-24 min-h-[70vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <button
            onClick={() => handleNavigate('home')}
            className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-brand-dark rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
          >
            <span>← Kembali ke Halaman Utama</span>
          </button>
        </div>
        <Portfolio isStandalone={true} onNavigate={handleNavigate} />
      </div>
    );
  }
});

const bookingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/reservasi',
  component: function BookingView() {
    const { handleNavigate } = useRouteContext();
    return (
      <div className="pt-24 min-h-[70vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <button
            onClick={() => handleNavigate('home')}
            className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-brand-dark rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
          >
            <span>← Kembali ke Halaman Utama</span>
          </button>
        </div>
        <Reservation />
      </div>
    );
  }
});

const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/blog',
  component: function BlogView() {
    const { handleNavigate } = useRouteContext();
    return <Blog onNavigateToBooking={() => handleNavigate('booking')} />;
  }
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tentang-kami',
  component: function AboutView() {
    return <About />;
  }
});

const trackingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/lacak-servis',
  component: function TrackingView() {
    return <Tracking />;
  }
});

const marketplaceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/marketplace',
  component: function MarketplaceView() {
    return <Marketplace />;
  }
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: function LoginView() {
    const { userRole, setUserRole, handleLogout, handleNavigate } = useRouteContext();
    return (
      <Login 
        userRole={userRole}
        onLoginSuccess={(role) => {
          setUserRole(role);
          localStorage.setItem('hsr_user_role', role);
        }}
        onLogout={handleLogout}
        onNavigateHome={() => handleNavigate('home')}
      />
    );
  }
});

// Construct routeTree
const routeTree = rootRoute.addChildren([
  indexRoute,
  portfolioRoute,
  bookingRoute,
  blogRoute,
  aboutRoute,
  trackingRoute,
  marketplaceRoute,
  loginRoute
]);

// Build and export router
export const router = createRouter({ 
  routeTree
});

// Register router for autocomplete typing in React files
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
