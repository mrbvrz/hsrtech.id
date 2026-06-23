/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  IconShield, IconClock, IconAward, IconCircleCheck, IconChevronLeft, IconChevronRight, 
  IconQuote, IconStar, IconSparkles, IconHeartHandshake, IconBolt, IconHelpCircle,
  IconBuildingFactory, IconPalette, IconTruck, IconGlobe, IconShoppingCart,
  IconMessageDots, IconArrowRight, IconTool, IconLock, IconCpu, IconFileText,
  IconBrandWhatsapp
} from '@tabler/icons-react';
import { TESTIMONIALS, PROCESS_STEPS } from '../data';
import figureImg from '../assets/figure.png';
import CtaSection from './CtaSection';

// Helper components for the premium Testimonials layout
const BrandLogoBadge = ({ id }: { id: string }) => {
  switch (id) {
    case 'testi-1':
      return (
        <span className="w-5 h-5 absolute right-0 bottom-0 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-orange-400 shadow-sm">
          <IconBuildingFactory className="w-3 h-3" />
        </span>
      );
    case 'testi-2':
      return (
        <span className="w-5 h-5 absolute right-0 bottom-0 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-400 shadow-sm">
          <IconPalette className="w-3 h-3" />
        </span>
      );
    case 'testi-3':
      return (
        <span className="w-5 h-5 absolute right-0 bottom-0 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-sky-400 shadow-sm">
          <IconTruck className="w-3 h-3" />
        </span>
      );
    case 'testi-4':
      return (
        <span className="w-5 h-5 absolute right-0 bottom-0 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-teal-400 shadow-sm">
          <IconGlobe className="w-3 h-3" />
        </span>
      );
    case 'testi-5':
      return (
        <span className="w-5 h-5 absolute right-0 bottom-0 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-500 shadow-sm">
          <IconShoppingCart className="w-3 h-3" />
        </span>
      );
    case 'testi-6':
      return (
        <span className="w-5 h-5 absolute right-0 bottom-0 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-rose-400 shadow-sm">
          <IconHeartHandshake className="w-3 h-3" />
        </span>
      );
    default:
      return null;
  }
};

const getRatingColorStyle = (rating: number) => {
  const clampedRating = Math.max(1, Math.min(5, rating));
  // 1 to 5 maps to 0 to 120 hue (Red to Green)
  const hue = ((clampedRating - 1) / 4) * 120;
  return {
    color: `hsl(${hue}, 88%, 44%)`,
    fill: `hsl(${hue}, 88%, 44%)`
  };
};

const getRatingTextColorStyle = (rating: number) => {
  const clampedRating = Math.max(1, Math.min(5, rating));
  const hue = ((clampedRating - 1) / 4) * 120;
  return {
    color: `hsl(${hue}, 88%, 38%)`
  };
};

const getTestimonialRating = (id: string): number => {
  const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const ratings = [4, 4.5, 5];
  return ratings[hash % ratings.length];
};

const renderStars = (rating: number) => {
  const activeStyle = getRatingColorStyle(rating);
  const stars: React.ReactNode[] = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(
        <IconStar key={i} className="w-4 h-4" style={activeStyle} />
      );
    } else if (rating === i - 0.5) {
      stars.push(
        <div key={i} className="relative w-4 h-4 shrink-0">
          <IconStar className="absolute top-0 left-0 w-4 h-4 text-slate-200 fill-slate-100" />
          <div className="absolute top-0 left-0 w-[50%] h-full overflow-hidden">
            <IconStar className="w-4 h-4 max-w-none" style={activeStyle} />
          </div>
        </div>
      );
    } else {
      stars.push(
        <IconStar key={i} className="w-4 h-4 text-slate-200 fill-slate-100" />
      );
    }
  }
  return <div className="flex items-center gap-0.5">{stars}</div>;
};

const TestimonialCard: React.FC<{ testimonial: typeof TESTIMONIALS[0] }> = ({ testimonial }) => {
  const [cardGlowPos, setCardGlowPos] = useState({ x: 0, y: 0 });
  const [isCardHovered, setIsCardHovered] = useState(false);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCardGlowPos({ x, y });
  };

  const rating = getTestimonialRating(testimonial.id);
  const ratingTextStyle = getRatingTextColorStyle(rating);

  return (
    <div 
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
      onMouseMove={handleCardMouseMove}
      className="w-[290px] sm:w-[340px] shrink-0 bg-white/80 backdrop-blur-md rounded-2xl p-5 sm:p-6 flex flex-col justify-start transition-all duration-300 relative border border-white/70 hover:border-blue-500/20 group overflow-hidden"
    >
      {/* Dynamic light reflection spotlight inside card */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
        style={{
          opacity: isCardHovered ? 1 : 0,
          background: `radial-gradient(circle 220px at ${cardGlowPos.x}px ${cardGlowPos.y}px, rgba(59, 130, 246, 0.22), rgba(59, 130, 246, 0.04) 55%, transparent 85%)`
        }}
      />
      
      <div className="flex flex-col h-full relative z-10 pointer-events-none">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <img 
              src={testimonial.avatar} 
              alt={testimonial.name}
              referrerPolicy="no-referrer"
              className="w-12 h-12 rounded-[38%] object-cover border border-slate-100 shadow-sm"
            />
            <BrandLogoBadge id={testimonial.id} />
          </div>
          <div className="flex flex-col justify-center gap-0">
            <h4 className="font-display font-semibold text-brand-dark text-sm sm:text-base tracking-tight leading-tight">
              {testimonial.name}
            </h4>
            <span className="text-[11px] sm:text-xs font-medium text-slate-600 leading-tight mt-0.5">
              {testimonial.role}
            </span>
            <span className="text-[10px] sm:text-[11px] font-normal text-slate-400 leading-tight mt-0.5">
              {testimonial.company}
            </span>
          </div>
        </div>

        {/* Rating Stars */}
        <div className="flex items-center gap-1.5 mb-3 mt-1">
          {renderStars(rating)}
          <span 
            className="text-xs font-semibold font-mono leading-none"
            style={ratingTextStyle}
          >
            {rating.toFixed(1)}
          </span>
        </div>

        <p className="text-slate-600 text-[13px] sm:text-sm leading-relaxed font-normal">
          "{testimonial.comment}"
        </p>
      </div>
    </div>
  );
};

export default function WhyUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [col1Paused, setCol1Paused] = useState(false);
  const [col2Paused, setCol2Paused] = useState(false);

  // Focus/Glow effect state for Metodologi Kerja
  const [isProcessHovered, setIsProcessHovered] = useState(false);
  const [processTilt, setProcessTilt] = useState({ x: 0, y: 0 });
  const [processGlowPos, setProcessGlowPos] = useState({ x: 50, y: 50 });
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % PROCESS_STEPS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleProcessMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isProcessHovered) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate rotation depending on mouse pos (kept subtle as it's a large card)
    const rotateY = ((x / rect.width) - 0.5) * 4;
    const rotateX = ((y / rect.height) - 0.5) * -4;
    
    setProcessTilt({ x: rotateX, y: rotateY });
    
    // Position glow relative to percentage
    setProcessGlowPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let lastTime = performance.now();
    const scrollSpeed = 60; // Increased speed for faster, smoother scrolling animation

    const animate = (time: number) => {
      if (isHovered) {
        lastTime = time;
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      const delta = (time - lastTime) / 1000;
      lastTime = time;

      container.scrollLeft += scrollSpeed * delta;

      // Wrap-around checking
      const singleSetWidth = container.scrollWidth / 3;
      if (container.scrollLeft >= singleSetWidth * 2) {
        container.scrollLeft -= singleSetWidth;
      } else if (container.scrollLeft <= 0) {
        container.scrollLeft += singleSetWidth;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Center initially for bidirectional smooth sliding space
    if (container.scrollLeft === 0) {
      const timeoutId = setTimeout(() => {
        if (container.scrollWidth) {
          container.scrollLeft = container.scrollWidth / 3;
        }
      }, 50);

      animationFrameId = requestAnimationFrame(animate);
      return () => {
        clearTimeout(timeoutId);
        cancelAnimationFrame(animationFrameId);
      };
    }

    animationFrameId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered]);

  const handleMouseDown = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;
    setIsHovered(true);

    const startX = e.pageX - container.offsetLeft;
    const scrollLeftVal = container.scrollLeft;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const x = moveEvent.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.4; // smooth swipe response multiplier
      container.scrollLeft = scrollLeftVal - walk;
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      // Brief timeout to avoid sudden jump
      setTimeout(() => {
        setIsHovered(false);
      }, 50);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const perks = [
    {
      icon: IconAward,
      title: 'Teknisi Tersertifikasi',
      description: 'Seluruh tim lapangan kami bersertifikasi industri (CCNA, MTCNA, ITIL, dll.) serta berpengalaman minimal 5 tahun di bidangnya.'
    },
    {
      icon: IconShield,
      title: 'Layanan Bergaransi Resmi',
      description: 'Kami memberikan jaminan garansi tertulis untuk setiap penggantian suku cadang hardware komputer maupun instalasi Jaringan.'
    },
    {
      icon: IconBolt,
      title: 'SLA Respon Tercepat',
      description: 'Waktu respon tanggap helpdesk darurat kami di bawah 15 menit, serta jaminan kedatangan fisik teknisi kurang dari 2 jam.'
    },
    {
      icon: IconHeartHandshake,
      title: 'Harga Jujur & Transparan',
      description: 'Cek rincian harga di awal sebelum perbaikan dikerjakan. Tanpa biaya jebakan tersembunyi, semua dihitung secara rasional.'
    },
    {
      icon: IconTool,
      title: 'Peralatan Kerja Modern',
      description: 'Menggunakan thermal imaging camera, OTDR fiber optik, serta alat kalibrasi terkini untuk menjamin ketepatan investigasi mendalam.'
    },
    {
      icon: IconLock,
      title: 'Keamanan Data Terjamin',
      description: 'Pengawasan ketat pada integritas file customer selama backup, instalasi OS baru, pemulihan, dan penggantian hardware.'
    },
    {
      icon: IconCpu,
      title: 'Suku Cadang Orisinal',
      description: 'Kami hanya menyuplai komponen hardware resmi, kabel standar industri premium, dan CCTV asli langsung bergaransi pabrik.'
    },
    {
      icon: IconFileText,
      title: 'Laporan Kerja Digital',
      description: 'Setiap setelah perbaikan selesai, klien langsung menerima dokumen laporan berita acara (BAST) dan rincian parameter pengujian.'
    }
  ];

  // Distribute 8 cards into 2 columns for the continuous vertical marquee (showing 6 cards at once: 3 per column)
  const col1 = [perks[0], perks[1], perks[2], perks[3]];
  const col2 = [perks[4], perks[5], perks[6], perks[7]];

  // Distribute testimonials across 2 horizontal marquee rows
  const row1 = [TESTIMONIALS[0], TESTIMONIALS[1], TESTIMONIALS[4]];
  const row2 = [TESTIMONIALS[2], TESTIMONIALS[3], TESTIMONIALS[5]];

  // Double render items to allow seamless infinite loops
  const row1Double = [...row1, ...row1, ...row1];
  const row2Double = [...row2, ...row2, ...row2];

  return (
    <section id="process" className="pt-0 pb-24 bg-slate-50 relative overflow-hidden">
      
      {/* Decorative grids & blurred background blobs */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      {/* Tengah bagian atas */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40rem] h-[25rem] rounded-full bg-blue-300/[0.12] blur-[120px] pointer-events-none z-0" />
      {/* Bawah kanan */}
      <div className="absolute bottom-[2%] right-[-10%] w-[35rem] h-[35rem] rounded-full bg-indigo-300/[0.12] blur-[130px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Split section: Perks & Why us factors aligned to top */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          
          <div className="lg:col-span-5 flex flex-col space-y-4 lg:sticky lg:top-28">
            <div className="inline-flex self-start items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-brand-blue bg-blue-50 border border-blue-100 uppercase tracking-widest">
              <IconShield className="w-3.5 h-3.5" />
              <span>Standar Kualitas HSR</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-brand-dark tracking-tight mb-4 leading-tight">
              Mengapa HSR Technology Menjadi Partner IT Terbaik Anda?
            </h2>
            
            <p className="text-slate-600 font-medium">
              Kami memadukan akurasi diagnosis teknis yang modern dengan dedikasi kecepatan respons harian untuk memastikan infrastruktur IT Anda berjalan lancar tanpa hambatan berarti.
            </p>

            <div className="pt-4 flex flex-col gap-3">
              <div className="flex items-start gap-2.5">
                <IconCircleCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700 font-semibold">Tanda Terdaftar Kontrak Managed SLA Resmi</span>
              </div>
              <div className="flex items-start gap-2.5">
                <IconCircleCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700 font-semibold">Transparansi Laporan Kerja & Penggunaan Hardware</span>
              </div>
              <div className="flex items-start gap-2.5">
                <IconCircleCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700 font-semibold">Dukungan Konsultasi Lanjutan Gratis Pasca Tindakan</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 h-[700px] overflow-hidden relative grid grid-cols-1 sm:grid-cols-2 gap-6 select-none -mx-2 px-2 -my-4 py-4">
            
            {/* Column 1: Vertically translating continuous scroll */}
            <div 
              className="h-full overflow-hidden relative"
              onMouseEnter={() => setCol1Paused(true)}
              onMouseLeave={() => setCol1Paused(false)}
            >
              <div 
                className="flex flex-col animate-marquee-up"
                style={{ animationPlayState: col1Paused ? 'paused' : 'running' }}
              >
                {/* Copy 1 */}
                <div className="flex flex-col gap-6 pb-6">
                  {col1.map((perk, idx) => {
                    const PerkIcon = perk.icon;
                    return (
                      <div
                        key={`col1-c1-${idx}`}
                        className="bg-white/70 backdrop-blur-md rounded-2xl p-6 flex flex-col justify-between group cursor-pointer transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_25px_60px_rgba(15,23,42,0.06)] hover:border-slate-200 border border-white/40 relative"
                      >
                        <div>
                          {/* Service-style Icon with Hover background */}
                          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-brand-blue flex items-center justify-center mb-5 group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
                            <PerkIcon className="w-6 h-6 transition-all duration-300 group-hover:rotate-6" strokeWidth={1.6} />
                          </div>
                          
                          <h3 className="text-base sm:text-lg font-display font-bold text-brand-dark mb-3 leading-snug group-hover:text-brand-blue transition-colors">
                            {perk.title}
                          </h3>
                          
                          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                            {perk.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* Copy 2 */}
                <div className="flex flex-col gap-6 pb-6">
                  {col1.map((perk, idx) => {
                    const PerkIcon = perk.icon;
                    return (
                      <div
                        key={`col1-c2-${idx}`}
                        className="bg-white/70 backdrop-blur-md rounded-2xl p-6 flex flex-col justify-between group cursor-pointer transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_25px_60px_rgba(15,23,42,0.06)] hover:border-slate-200 border border-white/40 relative"
                      >
                        <div>
                          {/* Service-style Icon with Hover background */}
                          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-brand-blue flex items-center justify-center mb-5 group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
                            <PerkIcon className="w-6 h-6 transition-all duration-300 group-hover:rotate-6" strokeWidth={1.6} />
                          </div>
                          
                          <h3 className="text-base sm:text-lg font-display font-bold text-brand-dark mb-3 leading-snug group-hover:text-brand-blue transition-colors">
                            {perk.title}
                          </h3>
                          
                          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                            {perk.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Column 2: Vertically translating continuous scroll (slightly slower/independent timing) */}
            <div 
              className="h-full overflow-hidden relative"
              onMouseEnter={() => setCol2Paused(true)}
              onMouseLeave={() => setCol2Paused(false)}
            >
              <div 
                className="flex flex-col animate-marquee-up-slow"
                style={{ animationPlayState: col2Paused ? 'paused' : 'running' }}
              >
                {/* Copy 1 */}
                <div className="flex flex-col gap-6 pb-6">
                  {col2.map((perk, idx) => {
                    const PerkIcon = perk.icon;
                    return (
                      <div
                        key={`col2-c1-${idx}`}
                        className="bg-white/70 backdrop-blur-md rounded-2xl p-6 flex flex-col justify-between group cursor-pointer transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_25px_60px_rgba(15,23,42,0.06)] hover:border-slate-200 border border-white/40 relative"
                      >
                        <div>
                          {/* Service-style Icon with Hover background */}
                          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-brand-blue flex items-center justify-center mb-5 group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
                            <PerkIcon className="w-6 h-6 transition-all duration-300 group-hover:rotate-6" strokeWidth={1.6} />
                          </div>
                          
                          <h3 className="text-base sm:text-lg font-display font-bold text-brand-dark mb-3 leading-snug group-hover:text-brand-blue transition-colors">
                            {perk.title}
                          </h3>
                          
                          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                            {perk.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* Copy 2 */}
                <div className="flex flex-col gap-6 pb-6">
                  {col2.map((perk, idx) => {
                    const PerkIcon = perk.icon;
                    return (
                      <div
                        key={`col2-c2-${idx}`}
                        className="bg-white/70 backdrop-blur-md rounded-2xl p-6 flex flex-col justify-between group cursor-pointer transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_25px_60px_rgba(15,23,42,0.06)] hover:border-slate-200 border border-white/40 relative"
                      >
                        <div>
                          {/* Service-style Icon with Hover background */}
                          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-brand-blue flex items-center justify-center mb-5 group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
                            <PerkIcon className="w-6 h-6 transition-all duration-300 group-hover:rotate-6" strokeWidth={1.6} />
                          </div>
                          
                          <h3 className="text-base sm:text-lg font-display font-bold text-brand-dark mb-3 leading-snug group-hover:text-brand-blue transition-colors">
                            {perk.title}
                          </h3>
                          
                          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                            {perk.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Gradient Fading Overlays on top and bottom of the vertically scrolling zone for high-end feel */}
            <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-slate-50 to-transparent pointer-events-none z-10" />
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none z-10" />

          </div>

        </div>

        {/* Middle section: Work flow/Process */}
        <div className="[perspective:1000px] mb-28 relative text-left">
          {/* Subtle background glow/blob for a softer look */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-3xl rounded-full bg-blue-500/5 blur-[100px] pointer-events-none z-0" />

          <motion.div 
            className="w-full rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl z-10 transition-colors duration-200"
            style={{
              borderColor: isProcessHovered ? "rgba(37, 99, 235, 0.2)" : "rgba(226, 232, 240, 0.8)",
              borderWidth: "1px",
              borderStyle: "solid",
              transformStyle: "preserve-3d",
              color: "#0f172a"
            }}
            onMouseMove={handleProcessMouseMove}
            onMouseEnter={() => setIsProcessHovered(true)}
            onMouseLeave={() => { setIsProcessHovered(false); setProcessTilt({x:0, y:0}); }}
            animate={{
              y: isProcessHovered ? -4 : 0,
              rotateX: isProcessHovered ? processTilt.x : 0,
              rotateY: isProcessHovered ? processTilt.y : 0,
              boxShadow: isProcessHovered 
                ? "0 25px 50px -12px rgba(37, 99, 235, 0.12), 0 0 40px rgba(37, 99, 235, 0.05)" 
                : "0 25px 50px -12px rgba(0, 0, 0, 0.05)"
            }}
            transition={{ type: 'spring', stiffness: 70, damping: 20 }}
          >
            {/* Background Image & Light Overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-slate-50">
              <img 
                src="/services.webp" 
                alt="Services Background" 
                className="w-full h-full object-cover opacity-[0.22]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-bl from-white/20 via-white/70 to-white/98" />
            </div>

            {/* Dynamic light reflection spotlight for the shine */}
            <div 
              className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-300 z-30"
              style={{
                opacity: isProcessHovered ? 1 : 0,
                background: `radial-gradient(circle 400px at ${processGlowPos.x}% ${processGlowPos.y}%, rgba(37, 99, 235, 0.08), transparent 70%)`,
              }}
            />
            
            <div className="max-w-xl mb-12 relative z-10">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-blue mb-2 inline-flex items-center gap-1.5 bg-blue-500/15 px-3 py-1 rounded-full border border-blue-500/20">
                <IconSparkles className="w-3.5 h-3.5" /> Metodologi Kerja
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-semibold tracking-tight mt-2 text-brand-dark">4 Langkah Alur Kerja Sistematis HSR</h3>
              <p className="text-slate-600 text-sm mt-3 leading-relaxed">Kami memastikan setiap tindakan teknis berjalan dengan kepastian hasil dan perlindungan keamanan maksimal bagi aset Anda.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {PROCESS_STEPS.map((step, idx) => {
                const isActive = activeStep === idx;
                return (
                  <div key={idx} className="flex flex-col space-y-3 relative group transition-all duration-500">
                    <div className={`h-[2px] absolute top-4 left-10 right-0 hidden lg:block transition-colors duration-500 ${isActive ? 'bg-blue-600/80 shadow-[0_0_8px_rgba(37,99,235,0.3)]' : 'bg-slate-200 group-hover:bg-brand-blue/30'}`} />
                    
                    <span className={`text-2xl font-extrabold font-display text-transparent bg-clip-text bg-gradient-to-br block transition-all duration-500 ${isActive ? 'from-blue-600 to-cyan-500 drop-shadow-[0_0_8px_rgba(37,99,235,0.2)] scale-110 origin-left' : 'from-slate-550 to-slate-400'}`}>{step.title.split('.')[0]}</span>
                    
                    <h4 className={`font-display font-bold text-base transition-colors duration-500 ${isActive ? 'text-blue-950 font-extrabold' : 'text-slate-800'}`}>{step.title.split('. ')[1]}</h4>
                    
                    <p className={`text-xs sm:text-sm leading-relaxed transition-colors duration-500 ${isActive ? 'text-slate-700 font-medium' : 'text-slate-500'}`}>{step.description}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Bottom section: High-polish, premium Wall of Testimonials */}
        <div className="relative mt-8">
          
          {/* Subtle background bubbles aligned with services system design */}
          <div className="absolute top-[-10%] left-[-10%] w-[35rem] h-[35rem] rounded-full bg-blue-300/15 blur-[120px] pointer-events-none z-0" />
          <div className="absolute bottom-[20%] right-[-10%] w-[30rem] h-[30rem] rounded-full bg-indigo-300/15 blur-[120px] pointer-events-none z-0" />

          {/* Section Header */}
          <div className="flex flex-col items-start justify-start text-left max-w-4xl mb-16 relative z-10 pl-1">
            <span className="inline-flex self-start items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-brand-blue bg-blue-50 border border-blue-100 uppercase tracking-widest mb-4">
              <IconSparkles className="w-3.5 h-3.5" />
              <span>Testimoni Klien</span>
            </span>
            <h3 className="text-3xl sm:text-4xl font-display font-bold text-brand-dark tracking-tight leading-[1.15] max-w-2xl">
              Fokus pada bisnis Anda,<br/>biar kami yang urus IT-nya.
            </h3>
          </div>

          {/* Scrolling Wall Container - Wrapper with CSS Mask for professional fading overlay into true transparency */}
          <div 
            className="relative w-full z-10 overflow-hidden"
            style={{
              maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)"
            }}
          >
            <div 
              ref={containerRef}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onMouseDown={handleMouseDown}
              className="w-full py-8 overflow-x-auto no-scrollbar select-none flex cursor-grab active:cursor-grabbing px-2 sm:px-4 relative z-10"
            >
              <div className="flex gap-8 w-max pt-2 pb-2 px-8 sm:px-16">
                {[...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].map((testimonial, idx) => (
                  <TestimonialCard key={`${testimonial.id}-${idx}`} testimonial={testimonial} />
                ))}
              </div>
            </div>
          </div>
 
          {/* Link Lihat Semua Testimoni di bawah slider */}
          <div className="flex justify-center mt-8 relative z-10">
            <motion.a 
              href="https://wa.me/628123456789?text=Halo%20HSR%20Technology,%20saya%20ingin%20melihat%20atau%20berkonsultasi%20selengkapnya%20mengenai%20testimoni%252Freviews%20klien%20lainnya."
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-1.5 font-bold text-xs sm:text-sm text-brand-blue hover:text-blue-700 transition-colors duration-300 group cursor-pointer relative py-1 no-underline hover:no-underline"
            >
              <span className="no-underline hover:no-underline">Lihat Semua Testimoni</span>
              <IconArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.a>
          </div>

        </div>

        {/* ==================== CTA CONSULTATION CARD SECTION ==================== */}
        <CtaSection />

      </div>
    </section>
  );
}
