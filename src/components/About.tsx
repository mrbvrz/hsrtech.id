/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  IconAward, 
  IconUsers, 
  IconShieldCheck, 
  IconClock, 
  IconCircleCheck, 
  IconTrendingUp, 
  IconServer, 
  IconTools 
} from '@tabler/icons-react';
import CtaSection from './CtaSection';

interface Milestone {
  year: string;
  title: string;
  desc: string;
}

const MILESTONES: Milestone[] = [
  {
    year: '2018',
    title: 'Awal Pendirian',
    desc: 'HSR bermula dari workshop ruko reparasi komponen level-IC berbekal standar ketelitian & kedisiplinan jepang di Tangerang.'
  },
  {
    year: '2020',
    title: 'Sertifikasi & Akreditasi',
    desc: 'Tim teknis kami berhasil meraih sertifikat resmi MikroTik, Cisco CCNA, & Hikvision Network Associate secara global.'
  },
  {
    year: '2022',
    title: 'Mitra Korporasi',
    desc: 'Memperluas layanan dengan skema Managed IT Support bulanan untuk pabrik, perkantoran, ruko, dan instansi pendidikan.'
  },
  {
    year: '2025',
    title: 'Peluncuran Aplikasi HSR Care',
    desc: 'Inovasi pelacakan tiket perbaikan real-time serta kalkulator biaya transparan guna menghilangkan keraguan transparansi konsumen.'
  }
];

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  education: string;
  desc: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Hiroshi Sato',
    role: 'Founder & Technical Advisor',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    education: 'B.Sc in Computer Science, Kyoto University',
    desc: 'Berpengalaman selama 15 tahun di industri semikonduktor Tokyo sebelum mendirikan HSR dengan visi membawa standar kerja handal jepang ke Indonesia.'
  },
  {
    name: 'Surya Pratama',
    role: 'Co-Founder & Lead Engineer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
    education: 'Teknik Informatika, Institut Teknologi Bandung (ITB)',
    desc: 'Spesialis perancangan infrastruktur server, managed service, and tata kelola jaringan korporasi multi-lokasi.'
  },
  {
    name: 'Lestari Handayani',
    role: 'Head of Customer Relations',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    education: 'Ilmu Komunikasi, Universitas Indonesia (UI)',
    desc: 'Memimpin koordinasi helpdesk 24/7 dan memastikan jaminan respon SLA di bawah 30 menit terpenuhi kepada setiap klien kontrak.'
  }
];

interface ValueProp {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export default function About() {
  const [activeYear, setActiveYear] = useState('2025');

  const values: ValueProp[] = [
    {
      icon: <IconShieldCheck className="w-6 h-6 text-emerald-600" />,
      title: 'Kualitas & Presisi Jepang',
      desc: 'Menerapkan metode perbaikan terstruktur bertahap dari diagnosis IC, penggantian preventif, hingga pengujian beban beban maksimal.'
    },
    {
      icon: <IconAward className="w-6 h-6 text-brand-blue" />,
      title: 'Teknisi Tersertifikasi Resmi',
      desc: 'Seluruh pakar teknis lapangan kami memegang sertifikat internasional aktif baik cisco, mikrotik, maupun sertifikasi safety K3.'
    },
    {
      icon: <IconClock className="w-6 h-6 text-amber-600" />,
      title: 'Transparansi Tanpa Hidden Cost',
      desc: 'Semua rincian biaya komponen terdaftar jelas di awal. Konsumen menyetujui penawaran sebelum perbaikan fisik dimulai.'
    }
  ];

  return (
    <div className="bg-white min-h-screen pt-28 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Narrative Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <motion.div 
            className="lg:col-span-7 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-brand-blue bg-blue-50 border border-blue-100 px-3 py-1 rounded-full w-fit block">
              Tentang HSR Technology
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-slate-900 tracking-tight leading-tight">
              Menghadirkan Solusi IT Standar Industri Global
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              Didirikan dengan integritas kerja beraliansi standar disiplin Jepang, HSR Technology (PT HSR Dinamika Teknologi) hadir sebagai jawaban atas rentannya sistem teknologi di perkantoran skala industri maupun menengah di Indonesia.
            </p>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              Kami menyadari bahwa crash perangkat keras secara tiba-tiba atau matinya jaringan internet selama 1 jam saja dapat mengakibatkan kerugian finansial bernilai jutaan rupiah bagi bisnis Anda. Oleh karenanya, tim kami dirancang untuk bergerak cepat (fast deployment) secara andal guna memitigasi kendala operasional Anda kapan pun & di mana pun.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
              <div>
                <span className="block font-black text-2xl sm:text-3xl text-brand-blue">1,200+</span>
                <span className="block text-slate-400 font-bold text-[10px] uppercase tracking-wider mt-1">Selesai Servis</span>
              </div>
              <div>
                <span className="block font-black text-2xl sm:text-3xl text-indigo-600">120+</span>
                <span className="block text-slate-400 font-bold text-[10px] uppercase tracking-wider mt-1">Kontrak Managed IT</span>
              </div>
              <div>
                <span className="block font-black text-2xl sm:text-3xl text-emerald-600">99.2%</span>
                <span className="block text-slate-400 font-bold text-[10px] uppercase tracking-wider mt-1">SLA Kepuasan</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="absolute inset-x-4 -inset-y-4 bg-gradient-to-tr from-blue-500/10 to-indigo-500/10 rounded-3xl blur-2xl pointer-events-none" />
            <div className="relative border border-slate-200 bg-white/50 backdrop-blur-sm p-3 rounded-3xl shadow-xl overflow-hidden aspect-square flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=600&q=80"
                alt="Kantor Lab HSR"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </motion.div>
        </div>

        {/* Brand Values Grid */}
        <div className="mb-24 py-16 bg-slate-50 rounded-[40px] px-6 sm:px-12 md:px-16 border border-slate-100">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">FILOSOFI KERJA</span>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight mt-2">
              3 Pondasi Utama Setiap Tindakan Kami
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, idx) => (
              <div 
                key={idx}
                className="bg-white border border-slate-200/60 shadow-sm p-6 sm:p-8 rounded-3xl hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center mb-6">
                  {val.icon}
                </div>
                <h3 className="font-display font-bold text-slate-900 text-base sm:text-lg mb-2">{val.title}</h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Milestone Timelines Section */}
        <div className="mb-24">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-blue bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
              Milestone Perjalanan
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight mt-4">
              Perjalanan Kami Sejak Berdiri
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">
              Klik pada tahun di bawah untuk melihat titik transformasi penting HSR Dinamika Teknologi dari masa ke masa.
            </p>
          </div>

          {/* Interactive Timelines Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50 rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-100">
            {/* Year Selector left rail */}
            <div className="lg:col-span-3 flex lg:flex-col gap-2.5 overflow-x-auto lg:overflow-visible pb-3 lg:pb-0 scrollbar-none">
              {MILESTONES.map((stone) => (
                <button
                  key={stone.year}
                  onClick={() => setActiveYear(stone.year)}
                  className={`w-full px-5 py-4 rounded-xl text-left font-display font-extrabold text-base transition-all flex items-center justify-between cursor-pointer focus:outline-none ${
                    activeYear === stone.year
                      ? 'bg-brand-blue text-white shadow-lg shadow-blue-500/20'
                      : 'bg-white text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span>Tahun {stone.year}</span>
                  <span className={`text-[9px] uppercase px-1.5 py-0.5 rounded font-bold ${activeYear === stone.year ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-450'}`}>
                    Active
                  </span>
                </button>
              ))}
            </div>

            {/* Description display container */}
            <div className="lg:col-span-9 bg-white rounded-2xl border border-slate-150 p-6 sm:p-8 min-h-[180px] flex flex-col justify-center">
              {MILESTONES.filter(s => s.year === activeYear).map((stone) => (
                <motion.div 
                  key={stone.year}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-3"
                >
                  <span className="text-2xl sm:text-3xl font-black font-display text-brand-blue flex items-center gap-2">
                    <IconTrendingUp className="w-6 h-6" />
                    Transformasi {stone.year}
                  </span>
                  <h3 className="font-bold text-slate-900 text-lg sm:text-xl">{stone.title}</h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-sans">{stone.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-24">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-blue bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
              Struktur Kepemimpinan
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight mt-4">
              Tim Inti di Balik Layanan Terbaik Kami
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">
              HSR dipandu oleh jajaran profesional berpengalaman luar biasa yang siap menjaga kelancaran bisnis Anda sepanjang waktu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM_MEMBERS.map((member, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-3xl border border-slate-200/60 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full justify-between"
              >
                <div>
                  <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 border-b border-slate-100">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display font-extrabold text-slate-900 text-base sm:text-lg">{member.name}</h3>
                    <span className="text-brand-blue font-bold text-xs block mt-1">{member.role}</span>
                    <span className="text-[10px] text-slate-400 font-semibold block mt-1.5 font-sans leading-relaxed">{member.education}</span>
                    <p className="text-slate-500 text-xs leading-relaxed mt-3.5 font-sans">{member.desc}</p>
                  </div>
                </div>
                
                <div className="px-6 pb-6 pt-3 border-t border-slate-50 flex items-center justify-between text-slate-300 font-mono text-[9px] uppercase tracking-wider font-semibold">
                  <span>HSR CO-CORP</span>
                  <span className="flex items-center gap-1 text-emerald-600">
                    <IconCircleCheck className="w-3.5 h-3.5" />
                    Verified
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <CtaSection />

        {/* Partner & Certification Grid Footer Badge */}
        <div className="border-t border-slate-100 pt-16 text-center max-w-4xl mx-auto">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">KREDIBILITAS SERTIFIKASI GLOBAL</span>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 mt-6 opacity-60">
            <div className="flex items-center gap-2 font-display font-extrabold text-sm sm:text-base text-slate-600">
              <IconServer className="w-5 h-5 text-indigo-600" />
              <span>MikroTik Certified</span>
            </div>
            <div className="flex items-center gap-2 font-display font-extrabold text-sm sm:text-base text-slate-600">
              <IconAward className="w-5 h-5 text-blue-600" />
              <span>Cisco CCNA Scholar</span>
            </div>
            <div className="flex items-center gap-2 font-display font-extrabold text-sm sm:text-base text-slate-600">
              <IconTools className="w-5 h-5 text-emerald-600" />
              <span>Hikvision Partner</span>
            </div>
            <div className="flex items-center gap-2 font-display font-extrabold text-sm sm:text-base text-slate-600">
              <IconUsers className="w-5 h-5 text-slate-700" />
              <span>PT Dinamika Safety K3</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
