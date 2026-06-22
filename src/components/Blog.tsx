/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  IconSearch, 
  IconCalendar, 
  IconClock, 
  IconArrowLeft, 
  IconBook, 
  IconChevronRight, 
  IconBriefcase, 
  IconTag, 
  IconThumbUp, 
  IconShare 
} from '@tabler/icons-react';
import CtaSection from './CtaSection';

interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  content: string[];
  tips: string[];
  imageUrl: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Mengamankan Jaringan Wi-Fi Kantor dari Ancaman Siber',
    category: 'Keamanan Jaringan',
    date: '12 Juni 2026',
    readTime: '5 Menit Baca',
    excerpt: 'Jaringan Wi-Fi kantor sering kali menjadi celah masuk utama bagi pelaku kejahatan siber. Pelajari langkah-langkah praktis mengamankan router Anda sekarang sebelum terlambat.',
    author: {
      name: 'Rian Setiadi',
      role: 'Senior Network Engineer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    },
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    content: [
      'Di era digital saat ini, jaringan nirkabel (Wi-Fi) di lingkungan bisnis bukan lagi sekadar fasilitas pendukung, melainkan urat nadi operasional. Namun, kemudahan akses yang ditawarkan Wi-Fi sering kali dimanfaatkan oleh pihak luar yang berniat buruk untuk menyusup ke dalam server internal perusahaan.',
      'Sering kami temukan di lapangan, banyak kantor yang masih menggunakan pengaturan standar (default) bawaan pabrik dari penyedia jasa internet (ISP). Hal ini sangat berbahaya karena kata sandi admin dan tipe enkripsi yang usang sangat mudah dieksploitasi dalam hitungan menit menggunakan alat bajak nirkabel gratisan.',
      'Langkah pertama yang mutlak harus dilakukan adalah mengganti sandi admin panel router Anda dan mengubah protokol keamanan ke WPA3 (atau minimal WPA2-AES jika perangkat lama belum mendukung). Hindari penggunaan nama Wi-Fi (SSID) yang mencerminkan nama divisi sensitif seperti "DOKUMEN_KEUANGAN_HSR" atau sejenisnya, karena ini akan memancing target serangan.'
    ],
    tips: [
      'Gunakan fitur Multi-SSID / VLAN untuk memisahkan jaringan Wi-Fi staf internal dengan jaringan tamu (Guest Network).',
      'Matikan teknologi WPS (Wi-Fi Protected Setup) karena memiliki celah algoritma numerik yang sangat rapuh.',
      'Aktifkan MAC Address Filtering untuk menjamin hanya laptop dan smartphone inventaris resmi kantor yang boleh terhubung.',
      'Selalu perbarui firmware router access point secara berkala guna menambal bug keamanan yang ditemukan komunitas.'
    ]
  },
  {
    id: 'post-2',
    title: '5 Tanda Storage Server & Komputer Mulai Rusak & Cara Mengatasinya',
    category: 'Tips & Trik',
    date: '05 Juni 2026',
    readTime: '4 Menit Baca',
    excerpt: 'Deteksi dini gejala kerusakan SSD atau Hard Disk eksternal sebelum data penting operasional bisnis Anda hilang selamanya tanpa sempat di-backup.',
    author: {
      name: 'Hadi Wijaya',
      role: 'Hardware Diagnostic Specialist',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    imageUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
    content: [
      'Kehilangan data adalah salah satu mimpi buruk terbesar bagi pemilik bisnis. Baik itu berupa database pelanggan, rekapitulasi pajak, dokumen kontrak, hingga program inventory kasir yang telah berjalan bertahun-tahun.',
      'Banyak orang mengira hard disk atau Solid State Drive (SSD) hanya akan mati secara mendadak tanpa gejala. Padahal, perangkat penyimpanan hampir selalu memberikan sinyal perlambatan fisik dan logis berminggu-minggu sebelum akhirnya benar-benar mengunci diri atau mati total.',
      'Dengan mengenali gejala-gejala penurunan performa ini, Anda memiliki waktu yang cukup untuk segera melakukan kloning media penyimpanan atau menyalin dokumen krusial ke penyimpanan aman di awan (Cloud Storage).'
    ],
    tips: [
      'Pergerakan file terasa sangat lambat (transfer speed drop drastis hingga di bawah 1MB/s) bahkan untuk file dokumen teks kecil.',
      'Sering muncul pemberitahuan layar biru (Blue Screen of Death / BSOD) dengan kode error seperti "KERNEL_DATA_INPAGE_ERROR".',
      'Terdengar suara ketukan logam atau desisan konstan dari dalam casing PC/Laptop (khusus bagi pengguna tipe Hard Disk magnetik biasa).',
      'Sistem berkala meminta tindakan Chkdsk (Check Disk) otomatis setiap kali komputer baru dinyalakan di pagi hari.'
    ]
  },
  {
    id: 'post-3',
    title: 'Mengapa Managed IT Support Bulanan Lebih Hemat Dibanding Rekrut Pegawai?',
    category: 'Infrastruktur',
    date: '28 Mei 2026',
    readTime: '6 Menit Baca',
    excerpt: 'Mempekerjakan staf IT internal berdedikasi membutuhkan alokasi budget yang sangat tinggi. Temukan bagaimana model sewa jasa Managed IT Outsourcing menekan pengeluaran bulanan hingga 60%.',
    author: {
      name: 'Surya Pratama',
      role: 'Solutions Architect & Founder',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80'
    },
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    content: [
      'Bagi perusahaan skala kecil dan menengah (UMKM/Ruko/Kantor Cabang), menyediakan infrastruktur teknologi yang berjalan mulus tanpa kendala adalah kewajiban. Namun, merekrut seorang staf IT internal sering kali dinilai kurang efisien secara ekonomi.',
      'Gaji pokok seorang staf IT admin pemula saat ini berkisar di angka 5-7 Juta rupiah per bulan, belum termasuk tunjangan kesehatan, jaminan hari tua, fasilitas laptop kerja mumpuni, serta program pelatihan keahlian.',
      'Di sinilah konsep Managed IT Services (Pemeliharaan IT Berlangganan) menjadi penolong taktis. Anda cukup membayar biaya bulanan yang jauh lebih murah, namun langsung mendapatkan akses ke seluruh tim profesional yang terdiri dari network engineer, database admin, hingga security consultant.'
    ],
    tips: [
      'Responsibilitas Tinggi: Selalu carilah vendor yang menawarkan jaminan SLA (Service Level Agreement) penanganan di bawah 20 menit untuk kendala kritis.',
      'Skalabilitas Biaya: Anda hanya perlu membayar sesuai jumlah perangkat komputer atau server aktif yang butuh dipantau secara riil.',
      'Cakupan Luas: Jasa bulanan mencakup pengecekan virus berkala, pemeliharaan fisik CPU, instalasi upgrade server, hingga konsultasi pengembangan sistem harian.',
      'Sistem Cadangan: Memastikan pencadangan data penting di server lokal dijalankan otomatis di luar jam kerja aktif kantor.'
    ]
  },
  {
    id: 'post-4',
    title: 'IP Camera vs CCTV Analog: Analisis Perbedaan Mana yang Layak Dipasang',
    category: 'Sistem Keamanan',
    date: '15 Mei 2026',
    readTime: '5 Menit Baca',
    excerpt: 'Jangan salah berinvestasi! Pelajari kelebihan dan kekurangan IP Camera dan CCTV Analog konvensional dari aspek biaya kabel, resolusi gambar, hingga efisiensi penyimpanan.',
    author: {
      name: 'Andi Rustam',
      role: 'CCTV Installation Supervisor',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80'
    },
    imageUrl: 'https://images.unsplash.com/photo-1557597774-951872b3fc40?auto=format&fit=crop&w=800&q=80',
    content: [
      'Saat berencana memasang sistem pemantauan keamanan di toko, rumah, atau gudang pabrik, pertanyaan paling umum adalah memilih antara sistem CCTV IP Camera modern atau CCTV Analog HD klasik.',
      'CCTV Analog menyalurkan sinyal video mentah melalui kabel coaxial ke mesin perekam DVR. Sementara itu, sistem IP Camera bekerja dengan mengubah video langsung menjadi paket data digital di tiap kamera lalu menyebarkannya lewat kabel LAN UTP atau Wi-Fi ke NVR.',
      'Perbedaan arsitektur ini menghasilkan disparitas yang drastis pada kualitas ketajaman gambar, kelenturan instalasi masa depan, dan tentunya ketersediaan dana anggaran yang harus disiapkan.'
    ],
    tips: [
      'Ketajaman Detail: IP Camera menawarkan resolusi yang jauh lebih tinggi dan jernih, sehingga plat nomor kendaraan atau detail wajah pelaku kejahatan dapat di-zoom tanpa pecah.',
      'Kemudahan Kabel: Gunakan IP Camera dengan fitur PoE (Power over Ethernet) sehingga penarikan satu kabel LAN saja sudah cukup menyuplai daya sekaligus data video.',
      'Biaya Efektif: Bagi Anda yang membutuhkan banyak unit kamera (di atas 16 unit) dengan budget ketat, CCTV Analog HD terbaru sudah mampu memberikan performa malam hari yang cukup memadai.',
      'Penyimpanan Awan: IP Camera mendukung backup rekaman langsung ke server internet cloud secara aman meskipun alat fisik perekam di lokasi dirusak pencuri.'
    ]
  }
];

interface BlogProps {
  onNavigateToBooking: () => void;
}

export default function Blog({ onNavigateToBooking }: BlogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'Semua' | 'Keamanan Jaringan' | 'Tips & Trik' | 'Infrastruktur' | 'Sistem Keamanan'>('Semua');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  const categories = ['Semua', 'Keamanan Jaringan', 'Tips & Trik', 'Infrastruktur', 'Sistem Keamanan'] as const;

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchCategory = selectedCategory === 'Semua' || post.category === selectedCategory;
      const matchSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <AnimatePresence mode="wait">
          {!activePost ? (
            <motion.div
              key="post-list"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header Title Grid */}
              <div className="text-center max-w-3xl mx-auto mb-14">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-blue bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
                  Edukasi & Insight HSR
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-slate-900 tracking-tight mt-4 leading-tight">
                  Blog & Artikel Teknologi Jepang Terkini
                </h1>
                <p className="text-slate-600 font-medium text-sm sm:text-base mt-4 leading-relaxed">
                  Dapatkan kabar industri terbaru, tutorial teknis pemecahan masalah hardware komputer, hingga panduan mendalam seputar cybersecurity langsung dari tim teknisi berlisensi HSR.
                </p>
              </div>

              {/* Utility Search & Filters Bar */}
              <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm mb-10 flex flex-col md:flex-row items-center gap-4 justify-between">
                
                {/* Search Input Box */}
                <div className="relative w-full md:w-80">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                    <IconSearch className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    placeholder="Cari trik, server, CCTV..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-brand-blue focus:bg-white rounded-xl text-xs font-semibold text-slate-800 transition-all outline-none"
                  />
                </div>

                {/* Categories Tab Pill */}
                <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto scrollbar-none pb-1 md:pb-0">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                        selectedCategory === cat
                          ? 'bg-brand-blue text-white shadow-md shadow-blue-500/15'
                          : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

              </div>

              {/* Grid Layout of Blogs */}
              {filteredPosts.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
                  <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 mx-auto mb-4">
                    <IconBook className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg">Tidak ada artikel ditemukan</h3>
                  <p className="text-slate-500 text-xs mt-1 max-w-sm mx-auto">Kami tidak dapat menemukan hasil pencarian seputar "{searchQuery}". Coba masukan kata kunci pencarian yang lain.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredPosts.map((post, index) => (
                    <motion.article
                      key={post.id}
                      className="group bg-white rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -4 }}
                    >
                      <div>
                        {/* Image Banner */}
                        <div className="relative aspect-video overflow-hidden bg-slate-100">
                          <img
                            src={post.imageUrl}
                            alt={post.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 text-[10px] font-bold text-white uppercase tracking-wider">
                            {post.category}
                          </div>
                        </div>

                        {/* Article Text */}
                        <div className="p-6 sm:p-8">
                          {/* Metadata */}
                          <div className="flex items-center gap-4 text-slate-400 text-[11px] font-semibold mb-3">
                            <span className="flex items-center gap-1">
                              <IconCalendar className="w-3.5 h-3.5" />
                              {post.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <IconClock className="w-3.5 h-3.5" />
                              {post.readTime}
                            </span>
                          </div>

                          <h3 className="text-lg sm:text-xl font-display font-extrabold text-slate-900 tracking-tight leading-tight group-hover:text-brand-blue transition-colors duration-200">
                            {post.title}
                          </h3>

                          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mt-3 line-clamp-3">
                            {post.excerpt}
                          </p>
                        </div>
                      </div>

                      {/* Author + Action footer */}
                      <div className="px-6 pb-6 pt-4 border-t border-slate-50/85 flex items-center justify-between sm:-mt-2">
                        {/* Author credentials */}
                        <div className="flex items-center gap-3">
                          <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            referrerPolicy="no-referrer"
                            className="w-8.5 h-8.5 rounded-full object-cover border border-slate-200"
                          />
                          <div>
                            <span className="block font-bold text-slate-950 text-xs leading-none">{post.author.name}</span>
                            <span className="block text-[9px] text-slate-400 mt-1 font-semibold">{post.author.role}</span>
                          </div>
                        </div>

                        {/* Read Link */}
                        <button
                          onClick={() => setActivePost(post)}
                          className="flex items-center gap-1.5 text-xs font-bold text-brand-blue group-hover:gap-2.5 transition-all cursor-pointer"
                        >
                          <span>Baca Detail</span>
                          <IconChevronRight className="w-4 h-4" />
                        </button>
                      </div>

                    </motion.article>
                  ))}
                </div>
              )}

              {/* Consultation CTA section */}
              <CtaSection />
            </motion.div>
          ) : (
            <motion.div
              key="post-detail"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-150 shadow-2xl p-6 sm:p-10 md:p-12 relative"
            >
              {/* Back Button */}
              <button
                onClick={() => setActivePost(null)}
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors mb-8 cursor-pointer focus:outline-none"
              >
                <IconArrowLeft className="w-4.5 h-4.5" />
                <span>Kembali ke List Artikel</span>
              </button>

              {/* Tag & Meta */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="bg-blue-50 text-brand-blue border border-blue-100 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest">
                  {activePost.category}
                </span>
                <div className="flex items-center gap-3 text-slate-400 text-xs font-semibold">
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <IconCalendar className="w-3.5 h-3.5" />
                    {activePost.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <IconClock className="w-3.5 h-3.5" />
                    {activePost.readTime}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-slate-950 tracking-tight leading-tight">
                {activePost.title}
              </h1>

              {/* Author Banner Card */}
              <div className="flex items-center gap-4 py-4 border-y border-slate-100 my-6">
                <img
                  src={activePost.author.avatar}
                  alt={activePost.author.name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <span className="block font-bold text-slate-900 text-sm leading-none">{activePost.author.name}</span>
                  <span className="block text-[11px] text-slate-500 mt-1 font-semibold">{activePost.author.role}</span>
                </div>
                
                {/* Visual Share indicators for aesthetics */}
                <div className="ml-auto flex items-center gap-2">
                  <button className="p-2 hover:bg-slate-50 text-slate-400 hover:text-slate-600 rounded-lg transition-colors cursor-pointer" title="Sukai Artikel">
                    <IconThumbUp className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-slate-50 text-slate-400 hover:text-slate-600 rounded-lg transition-colors cursor-pointer" title="Bagikan Link">
                    <IconShare className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Highlight Image Banner */}
              <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-100 mb-8 max-h-[400px]">
                <img
                  src={activePost.imageUrl}
                  alt={activePost.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Main Text Content */}
              <div className="space-y-5 text-slate-700 text-sm sm:text-base leading-relaxed font-sans">
                {activePost.content.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {/* Tips & Actionable Steps Box */}
              <div className="mt-10 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8">
                <h3 className="font-display font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                  <span className="bg-brand-blue text-white p-1 rounded-lg">
                    <IconTag className="w-3.5 h-3.5" />
                  </span>
                  Rangkuman Solusi Praktis HSR Technology
                </h3>
                <ul className="mt-4 space-y-3.5">
                  {activePost.tips.map((tip, idx) => (
                    <li key={idx} className="flex gap-3 text-xs sm:text-sm text-slate-600">
                      <span className="text-brand-blue font-bold tracking-tight select-none mt-0.5">{idx + 1}.</span>
                      <span className="font-medium">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Call-To-Action (CTA) panel at bottom of article */}
              <div className="mt-12 bg-gradient-to-r from-slate-900 to-[#1e293b] rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="absolute inset-0 grid-bg-dark opacity-10 pointer-events-none" />
                <div className="relative z-10 max-w-md">
                  <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">Butuh Bantuan Instalasi & Implementasi?</h4>
                  <p className="text-[11px] sm:text-xs text-slate-350 mt-1.5 leading-relaxed font-medium">
                    Serahkan semua kesulitan teknis IT infrastruktur, setup router, atau perbaikan hardware Anda kepada ahlinya di HSR Care. Pengerjaan cepat & bergaransi.
                  </p>
                </div>
                
                <button
                  onClick={() => {
                    setActivePost(null);
                    onNavigateToBooking();
                  }}
                  className="relative z-10 shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold bg-brand-blue hover:bg-blue-600 active:scale-95 text-white transition-all shadow-lg shadow-blue-500/20 cursor-pointer"
                >
                  <IconBriefcase className="w-4 h-4" />
                  <span>Daftar Reservasi Servis</span>
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
        
      </div>
    </div>
  );
}
