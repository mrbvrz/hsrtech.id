/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  IconMapPin, IconPhone, IconMail, IconClock, IconShieldCheck, 
  IconChevronRight, IconCircleArrowUp, IconBrandFacebook, 
  IconBrandInstagram, IconBrandLinkedin, IconBrandYoutube
} from '@tabler/icons-react';
import Logo from './Logo';
import { useLegalDrawer } from '../context/LegalDrawerContext';

interface FooterProps {
  onNavigate?: (view: 'home' | 'booking' | 'login' | 'blog' | 'about' | 'tracking', sectionId?: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const { openTerms, openPrivacy } = useLegalDrawer();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-brand-dark text-slate-350 pt-20 pb-8 border-t border-slate-850 relative overflow-hidden">
      
      {/* Background patterns */}
      <div className="absolute inset-0 grid-bg-dark opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-800">
          
          {/* Column 1: Brand details & Social Media */}
          <div className="lg:col-span-4 space-y-6">
            <Logo size="lg" variant="white" />
            <p className="text-slate-400 text-sm leading-relaxed text-left">
              HSR Technology berkomitmen memberikan standar tertinggi untuk penanganan perbaikan komputer, instalasi pengawasan CCTV, kabel jaringan terstruktur, dan pemeliharaan IT terpadu secara korporasi.
            </p>
            
            <div className="flex flex-wrap items-center gap-3">
              <span className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-emerald-450 border border-slate-700">
                <IconShieldCheck className="w-5 h-5 text-emerald-450" />
              </span>
              <div className="text-xs font-semibold text-slate-400 text-left">
                <span>Partner Resmi Solusi IT</span>
                <span className="block text-[10px] uppercase font-bold text-slate-500">Bergaransi & Tersertifikasi</span>
              </div>
            </div>

            <div className="pt-2 text-left">
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-2.5">Ikuti Kami</p>
              <div className="flex items-center gap-3">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-slate-800 hover:bg-brand-blue hover:text-white flex items-center justify-center text-slate-400 border border-slate-700 hover:border-brand-blue transition-all" aria-label="Facebook">
                  <IconBrandFacebook className="w-4.5 h-4.5" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-slate-800 hover:bg-brand-blue hover:text-white flex items-center justify-center text-slate-400 border border-slate-700 hover:border-brand-blue transition-all" aria-label="Instagram">
                  <IconBrandInstagram className="w-4.5 h-4.5" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-slate-800 hover:bg-brand-blue hover:text-white flex items-center justify-center text-slate-400 border border-slate-700 hover:border-brand-blue transition-all" aria-label="LinkedIn">
                  <IconBrandLinkedin className="w-4.5 h-4.5" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-slate-800 hover:bg-brand-blue hover:text-white flex items-center justify-center text-slate-400 border border-slate-700 hover:border-brand-blue transition-all" aria-label="YouTube">
                  <IconBrandYoutube className="w-4.5 h-4.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation map (Tautan Cepat 2 Kolom) */}
          <div className="lg:col-span-4 space-y-4 text-left">
            <h4 className="text-xs font-extrabold uppercase text-white tracking-widest">Tautan Cepat</h4>
            <div className="grid grid-cols-2 gap-4">
              
              {/* Kolom Kiri: Navigasi Menu */}
              <div className="space-y-3">
                <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Navigasi</p>
                <ul className="space-y-2.5 text-sm text-slate-400" aria-label="Footer Menu Navigasi">
                  {[
                    { name: 'Beranda', id: 'home', view: 'home' as const },
                    { name: 'Layanan', id: 'services', view: 'home' as const },
                    { name: 'Blog', id: 'blog', view: 'blog' as const },
                    { name: 'Tentang Kami', id: 'about', view: 'about' as const }
                  ].map((item) => (
                    <li key={item.name}>
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          if (item.view === 'home') {
                            onNavigate?.('home', item.id);
                          } else {
                            onNavigate?.(item.view);
                          }
                        }}
                        className="hover:text-blue-455 flex items-center gap-1 group transition-colors py-0.5 text-left w-full cursor-pointer"
                      >
                        <IconChevronRight className="w-3.5 h-3.5 text-slate-650 group-hover:text-blue-450 transition-transform group-hover:translate-x-0.5" />
                        <span>{item.name}</span>
                      </button>
                    </li>
                  ))}
                  <li>
                    <button 
                      onClick={() => onNavigate?.('booking')}
                      className="hover:text-blue-455 text-slate-400 flex items-center gap-1 group transition-colors py-0.5 text-xs font-bold uppercase tracking-wider text-left w-full cursor-pointer"
                    >
                      <IconChevronRight className="w-3.5 h-3.5 text-slate-650 group-hover:text-blue-450 transition-transform group-hover:translate-x-0.5 text-brand-blue" />
                      <span>Buat Reservasi</span>
                    </button>
                  </li>
                </ul>
              </div>

              {/* Kolom Kanan: Kebijakan & Dukungan */}
              <div className="space-y-3 border-l border-slate-800/60 pl-4">
                <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Kebijakan & ID</p>
                <ul className="space-y-2.5 text-sm text-slate-400" aria-label="Footer Menu Kebijakan">
                  <li>
                    <button 
                      onClick={openTerms}
                      className="hover:text-emerald-450 text-slate-400 flex items-center gap-1 group transition-colors py-0.5 text-left w-full cursor-pointer"
                    >
                      <IconChevronRight className="w-3.5 h-3.5 text-slate-650 group-hover:text-emerald-450 transition-transform group-hover:translate-x-0.5" />
                      <span>Syarat Layanan</span>
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={openPrivacy}
                      className="hover:text-emerald-450 text-slate-400 flex items-center gap-1 group transition-colors py-0.5 text-left w-full cursor-pointer"
                    >
                      <IconChevronRight className="w-3.5 h-3.5 text-slate-650 group-hover:text-emerald-450 transition-transform group-hover:translate-x-0.5" />
                      <span>Kebijakan Privasi</span>
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => onNavigate?.('login')}
                      className="hover:text-slate-200 text-slate-400 flex items-center gap-1 group transition-colors py-0.5 text-left w-full cursor-pointer"
                    >
                      <IconChevronRight className="w-3.5 h-3.5 text-slate-650 group-hover:text-slate-200 transition-transform group-hover:translate-x-0.5" />
                      <span>Portal Teknisi</span>
                    </button>
                  </li>
                  <li>
                    <a 
                      href="https://wa.me/628123456789?text=Halo%20HSR%20Technology,%20saya%20butuh%20bantuan%20support"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-emerald-450 flex items-center gap-1 group transition-colors py-0.5 text-left"
                    >
                      <IconChevronRight className="w-3.5 h-3.5 text-slate-650 group-hover:text-emerald-450 transition-transform group-hover:translate-x-0.5" />
                      <span>WhatsApp CS</span>
                    </a>
                  </li>
                </ul>
              </div>

            </div>
          </div>

          {/* Column 3: Jam operasional & Kontak */}
          <div className="lg:col-span-4 space-y-8 text-left">
            <div className="space-y-4">
              <h4 className="text-xs font-extrabold uppercase text-white tracking-widest">Hubungi Kami</h4>
              <div className="space-y-3.5 text-slate-400 text-sm">
                <div className="flex items-start gap-2.5">
                  <IconMapPin className="w-4.5 h-4.5 text-rose-500 shrink-0 mt-0.5" />
                  <span>Ruko Elit Blok B No. 12, Grogol, Jakarta Barat, DKI Jakarta, 11440</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <IconPhone className="w-4 h-4 text-emerald-500 shrink-0" />
                  <a href="tel:+628123456789" className="hover:text-white transition-colors">0812-3456-789</a>
                </div>
                <div className="flex items-center gap-2.5">
                  <IconMail className="w-4 h-4 text-blue-400 shrink-0" />
                  <a href="mailto:support@hsrtechnology.id" className="hover:text-white transition-colors">support@hsrtechnology.id</a>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-slate-800">
              <h4 className="text-xs font-extrabold uppercase text-white tracking-widest">Jam Operasional</h4>
              <div className="space-y-3 text-slate-400 text-sm">
                <div className="flex items-start gap-2.5">
                  <IconClock className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-white text-xs">Survei & Kunjungan Fisik:</span>
                    <span>Senin - Sabtu: 09:00 - 18:00 WIB</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <IconClock className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-white text-xs">Helpdesk Remote & Urgent:</span>
                    <span>Setiap Hari (24 Jam On-Call)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1 font-semibold text-center sm:text-left">
            <span>© {new Date().getFullYear()} @hsrtechnology-allrightsreserved. Dibuat oleh HSR.</span>
          </div>

          <div className="flex items-center gap-5 font-semibold">
            <button 
              onClick={openTerms} 
              className="hover:text-white transition-colors cursor-pointer text-left focus:outline-none"
            >
              Syarat Ketentuan
            </button>
            <button 
              onClick={openPrivacy} 
              className="hover:text-white transition-colors cursor-pointer text-left focus:outline-none"
            >
              Kebijakan Privasi
            </button>
            
            <button
              onClick={handleScrollToTop}
              className="flex items-center gap-1.5 p-1 rounded hover:text-white transition-colors font-bold cursor-pointer focus:outline-none"
              aria-label="Scroll to top"
            >
              <span>Back to Top</span>
              <IconCircleArrowUp className="w-4 h-4 text-brand-blue" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
