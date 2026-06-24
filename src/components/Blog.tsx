/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  IconSearch, 
  IconCalendar, 
  IconClock, 
  IconArrowLeft, 
  IconBook, 
  IconChevronRight, 
  IconChevronLeft,
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

const FEATURED_POST: BlogPost = {
  id: 'post-featured',
  title: 'Disaster Recovery Plan: Langkah Taktis Mengamankan Seluruh Data Server Bisnis Anda',
  category: 'Infrastruktur',
  date: '24 Juni 2026',
  readTime: '8 Menit Baca',
  excerpt: 'Kerusakan hardware server, korsleting listrik, hingga ransomware dapat melumpuhkan ruko atau kantor Anda dalam sekejap. Pelajari cara merancang pencadangan data otomatis berlapis demi keberlangsungan bisnis yang tanpa hambatan.',
  author: {
    name: 'Surya Pratama',
    role: 'Solutions Architect',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80'
  },
  imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
  content: [
    'Data operasional adalah aset paling berharga dalam bisnis modern. Bayangkan jika database transaksi kasir, daftar inventaris ruko, atau riwayat kontrak pelanggan mendadak hilang akibat server mati total atau terserang virus ransomware berbahaya. Kejadian ini tidak hanya merugikan finansial, tetapi juga merusak reputasi yang telah Anda bangun bertahun-tahun.',
    'Banyak pengusaha baru menyadari pentingnya skema pemulihan setelah bencana (Disaster Recovery Plan atau DRP) ketika musibah benar-benar terjadi. Padahal, dengan penyiapan topologi pencadangan (backup) yang terstruktur dan otomatis, downtime operasional kantor dapat dipangkas hingga di bawah 15 menit.',
    'Untuk membangun sistem pertahanan data yang antipunah, HSR Technology selalu menerapkan prinsip "Sistem Cadangan 3-2-1". Artinya, Anda wajib memiliki minimal 3 salinan data, yang disimpan di 2 jenis media penyimpanan fisik berbeda (misalnya NAS lokal dan Hard Disk server utama), dengan 1 salinan terisolasi di lokasi awan (Cloud Storage) yang aman.'
  ],
  tips: [
    'Terapkan skema backup otomatis harian di luar jam kerja aktif kantor guna meminimalkan beban bandwidth jaringan.',
    'Gunakan server NAS (Network Attached Storage) dengan konfigurasi RAID redundan agar data tetap aman walau salah satu hard disk rusak fisik.',
    'Lakukan simulasi pemulihan data (DRP Testing) berkala minimal 3 bulan sekali bersama tim teknisi tepercaya.',
    'Enkripsi seluruh file backup krusial dengan kunci password bertingkat agar tidak dapat dimodifikasi oleh malware luar.'
  ]
};

const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Mengamankan Jaringan Wi-Fi Kantor dari Ancaman Kebocoran Data',
    category: 'Keamanan Jaringan',
    date: '22 Juni 2026',
    readTime: '5 Menit Baca',
    excerpt: 'Jaringan Wi-Fi ruko atau kantor sering menjadi titik lemah yang disusupi peretas. Kenali cara mengunci router menggunakan WPA3 dan pemisahan VLAN tamu.',
    author: {
      name: 'Rian Setiadi',
      role: 'Senior Network Engineer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    },
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    content: [
      'Di era digital, Wi-Fi bukan sekadar fasilitas pendukung melainkan urat nadi ruko dan kantor. Sayangnya, pengaturan router bawaan pabrik sering dibiarkan tanpa proteksi tambahan, menjadikannya sasaran empuk serangan brute-force.',
      'Sering kami temukan di lapangan, banyak ruko menggunakan password Wi-Fi yang sama selama bertahun-tahun tanpa pernah diganti. Hal ini mempermudah mantan karyawan atau orang luar untuk terus memantau lalu lintas data rahasia kantor.',
      'Langkah taktis yang wajib Anda lakukan adalah mengganti sandi administrator router Anda secara berkala, mematikan fitur WPS yang rapuh, dan memisahkan jaringan staf dengan jaringan tamu via Multi-SSID / VLAN.'
    ],
    tips: [
      'Ganti kata sandi admin router bawaan pabrik dengan kombinasi simbol dan angka.',
      'Aktifkan enkripsi WPA3 jika perangkat access point Anda sudah mendukung.',
      'Sediakan Guest Network terpisah agar tamu tidak bisa mengakses printer dan file server internal.'
    ]
  },
  {
    id: 'post-2',
    title: '5 Tanda Storage Server & Komputer Mulai Rusak Serta Pencegahannya',
    category: 'Tips & Trik',
    date: '20 Juni 2026',
    readTime: '4 Menit Baca',
    excerpt: 'Gejala penurunan kesehatan Hard Disk atau SSD sering kali diabaikan hingga akhirnya terkunci total. Simak panduan mendeteksi peringatan dini hardware komputer Anda.',
    author: {
      name: 'Hadi Wijaya',
      role: 'Hardware Specialist',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    imageUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
    content: [
      'Kehilangan data kerja akibat media penyimpanan yang rusak mendadak adalah mimpi buruk semua orang. Padahal, hard disk dan SSD hampir selalu memberikan tanda peringatan logis berminggu-minggu sebelum mati total.',
      'Dengan mengenali tanda-tanda kerusakan lebih awal, Anda memiliki waktu cadangan yang cukup untuk menyalin file berharga ke eksternal drive atau cloud storage.',
      'Beberapa tanda umum meliputi kecepatan salin file yang mendadak drop drastis, munculnya layar biru (BSOD) berkala, atau terciumnya aroma panas berlebih dari dalam casing.'
    ],
    tips: [
      'Gunakan aplikasi pemantau kesehatan seperti CrystalDiskInfo untuk memonitor parameter S.M.A.R.T.',
      'Segera lakukan kloning media penyimpanan jika status kesehatan menunjukkan warna kuning (Warning).',
      'Hindari guncangan keras pada komputer saat mesin dalam keadaan menyala aktif.'
    ]
  },
  {
    id: 'post-3',
    title: 'Managed IT Support Bulanan vs Rekrut Pegawai Tetap: Mana yang Paling Hemat?',
    category: 'Infrastruktur',
    date: '18 Juni 2026',
    readTime: '6 Menit Baca',
    excerpt: 'Untuk bisnis skala UMKM atau ruko, membiayai gaji bulanan pegawai IT berdedikasi bisa membebani neraca keuangan. Bandingkan dengan efisiensi biaya layanan sewa IT outsourcing eksternal.',
    author: {
      name: 'Surya Pratama',
      role: 'Solutions Architect',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80'
    },
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    content: [
      'Menyediakan infrastruktur komputer yang andal adalah keharusan untuk ruko atau kantor modern. Namun, mempekerjakan tim IT internal sering kali menguras pengeluaran bulanan yang tidak proporsional.',
      'Gaji staf IT berpengalaman kini cukup tinggi, belum ditambah asuransi kesehatan, laptop kerja, dan biaya pelatihan berkala. Sementara itu, kendala komputer di kantor tidak selalu terjadi setiap hari.',
      'Managed IT Support bulanan menawarkan solusi sewa outsourcing terjangkau di mana Anda langsung ditangani oleh sekelompok teknisi berpengalaman hanya ketika terjadi kendala.'
    ],
    tips: [
      'Pilih vendor dengan kejelasan SLA (Service Level Agreement) penanganan darurat yang cepat.',
      'Pastikan paket langganan mencakup kunjungan preventif bulanan dan remote support harian.',
      'Pilih model biaya fleksibel yang disesuaikan dengan total unit komputer kantor Anda.'
    ]
  },
  {
    id: 'post-4',
    title: 'IP Camera vs CCTV Analog: Mana yang Paling Cocok untuk Gudang Logistik?',
    category: 'Sistem Keamanan',
    date: '15 Juni 2026',
    readTime: '5 Menit Baca',
    excerpt: 'Keamanan gudang membutuhkan pengawasan tajam non-stop tanpa blindspot. Ketahui perbedaan mendasar dari kedua sistem kamera pengawas ini dari sisi kabel, resolusi, dan biaya simpan.',
    author: {
      name: 'Andi Rustam',
      role: 'CCTV Supervisor',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80'
    },
    imageUrl: 'https://images.unsplash.com/photo-1557597774-951872b3fc40?auto=format&fit=crop&w=800&q=80',
    content: [
      'Saat merancang sistem pengamanan ruko atau gudang logistik raksasa, keputusan memilih jenis kamera adalah hal krusial. Sistem analog tradisional menggunakan kabel koaksial tebal ke DVR, sedangkan IP Camera mentransmisikan data digital via kabel LAN / Wi-Fi.',
      'IP Camera modern menawarkan resolusi yang jauh lebih tajam, memungkinkan zoom detail wajah pelaku kejahatan tanpa pecah-pecah.',
      'Meskipun investasi awal IP Camera sedikit lebih tinggi, instalasinya jauh lebih ringkas berkat fitur PoE (Power-over-Ethernet) yang hanya butuh satu tarikan kabel.'
    ],
    tips: [
      'Gunakan IP Camera bersertifikasi Outdoor Rating IP67 untuk area luar ruangan gudang.',
      'Gunakan switch PoE berkecepatan Gigabit untuk mencegah transmisi video tersendat.',
      'Pilih sistem NVR yang mendukung perekaman terjadwal guna menghemat kapasitas hard disk.'
    ]
  },
  {
    id: 'post-5',
    title: 'Bahaya Menggunakan Software Bajakan di Lingkungan Kerja',
    category: 'Keamanan Jaringan',
    date: '12 Juni 2026',
    readTime: '6 Menit Baca',
    excerpt: 'Menginstal sistem operasi Windows atau Office bajakan demi memotong pengeluaran justru mengundang serangan malware Trojan dan Ransomware yang dapat melumpuhkan seluruh perangkat kerja.',
    author: {
      name: 'Rian Setiadi',
      role: 'Senior Network Engineer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    },
    imageUrl: 'https://images.unsplash.com/photo-1601597111158-2fceff270190?auto=format&fit=crop&w=800&q=80',
    content: [
      'Demi menekan anggaran operasional ruko, terkadang pengusaha mengizinkan instalasi OS atau aplikasi perkantoran bajakan. Tindakan ini sangat berisiko karena file activator software bajakan sering ditunggangi malware.',
      'Begitu komputer salah satu staf terinfeksi ransomware, malware tersebut akan dengan cepat menyebar ke seluruh komputer lain dalam satu jaringan lokal kantor Anda.',
      'Solusi terbaik adalah beralih ke lisensi original resmi atau memanfaatkan alternatif open-source berkualitas tinggi yang aman dan sepenuhnya gratis.'
    ],
    tips: [
      'Hapus semua aplikasi "crack" atau "patch" aktivator berbahaya dari komputer kerja.',
      'Manfaatkan opsi lisensi volume perusahaan (Volume Licensing) untuk memangkas biaya.',
      'Pertimbangkan sistem operasi Linux jika anggaran lisensi Windows sangat ketat.'
    ]
  },
  {
    id: 'post-6',
    title: 'Panduan Memilih Spesifikasi Komputer Kasir (POS) Sesuai Skala Ritel',
    category: 'Tips & Trik',
    date: '10 Juni 2026',
    readTime: '4 Menit Baca',
    excerpt: 'Jangan sia-siakan budget besar untuk komputer kasir berspesifikasi tinggi yang tak perlu. Berikut rekomendasi hardware komputer mini, printer thermal, dan penunjang POS yang awet.',
    author: {
      name: 'Hadi Wijaya',
      role: 'Hardware Specialist',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    content: [
      'Komputer kasir adalah ujung tombak pendapatan ruko ritel Anda. Kesalahan memilih spesifikasi komputer kasir dapat berakibat antrean panjang pembeli akibat sistem POS sering hang.',
      'Untuk kebutuhan kasir standar, komputer berspesifikasi hemat daya dengan RAM 8GB dan penyimpanan SSD sudah lebih dari cukup dibanding membeli prosesor kelas berat.',
      'Investasi terbaik justru terletak pada printer kasir termal yang tahan panas serta UPS pelindung mati listrik mendadak.'
    ],
    tips: [
      'Pilih PC berdesain ringkas (Mini PC) untuk menghemat ruang meja kasir ruko Anda.',
      'Pastikan komputer terhubung ke unit UPS cadangan daya guna mencegah kerusakan data transaksi.',
      'Pilih printer thermal bersertifikat printhead awet di atas 100km pencetakan.'
    ]
  },
  {
    id: 'post-7',
    title: 'Cara Mengatasi Komputer Overheat di Jam Kerja Padat',
    category: 'Tips & Trik',
    date: '08 Juni 2026',
    readTime: '5 Menit Baca',
    excerpt: 'Kinerja PC tiba-tiba lemot ekstrem atau mati mendadak saat merender dokumen grafis biasanya disebabkan oleh suhu prosesor (CPU) yang melonjak di luar batas wajar.',
    author: {
      name: 'Hadi Wijaya',
      role: 'Hardware Specialist',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    imageUrl: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&w=800&q=80',
    content: [
      'Ketika komputer dipaksa bekerja terus-menerus di ruangan ber-AC minim ventilasi, debu halus akan menumpuk menyumbat sirip heatsink prosesor.',
      'Hal ini membuat sirkulasi udara macet, menyebabkan kipas pendingin berputar bising dan suhu internal melonjak ekstrem melewati batas aman 85 derajat Celsius.',
      'Untuk mencegah hardware mati total akibat overheat, pemeliharaan fisik blower debu dan penggantian pasta termal (thermal paste) prosesor wajib dilakukan secara berkala.'
    ],
    tips: [
      'Lakukan deep cleaning debu casing komputer minimal setiap 6 bulan sekali.',
      'Gunakan pasta termal berkualitas dengan konduktivitas panas tinggi.',
      'Pastikan kabel di dalam casing tertata rapi agar tidak menghalangi aliran udara luar.'
    ]
  },
  {
    id: 'post-8',
    title: 'Pentingnya Kabel LAN Terstruktur di Gudang Baru',
    category: 'Infrastruktur',
    date: '05 Juni 2026',
    readTime: '5 Menit Baca',
    excerpt: 'Instalasi kabel yang acak-acakan tidak hanya mengganggu estetika tetapi juga mempersulit proses debugging saat koneksi drop. Pelajari standar penarikan kabel CAT6 berpipa conduit.',
    author: {
      name: 'Surya Pratama',
      role: 'Solutions Architect',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80'
    },
    imageUrl: 'https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&w=800&q=80',
    content: [
      'Penarikan kabel LAN di gudang logistik atau kantor cabang sering kali dikerjakan asal-asalan tanpa pelindung. Padahal, kabel yang menjuntai rawan digigit hama tikus atau terjepit pintu.',
      'Sistem perkabelan terstruktur menggunakan patch panel dan pelindung conduit PVC memastikan kabel terlindung rapi dan mudah diidentifikasi jalurnya.',
      'Dengan penataan kabel terstandar industri, fluktuasi koneksi akibat kabel longgar dapat ditekan hingga di bawah 1 persen.'
    ],
    tips: [
      'Gunakan pipa conduit elastis berkualitas tinggi untuk membungkus jalur kabel LAN utama.',
      'Labeli setiap ujung kabel LAN dengan stiker bernomor sesuai dengan port pada patch panel.',
      'Gunakan kabel LAN grade CAT6 tembaga murni untuk koneksi jaringan Gigabit stabil.'
    ]
  },
  {
    id: 'post-9',
    title: 'Mengenal Enkripsi WPA3: Lompatan Keamanan Nirkabel Generasi Terbaru',
    category: 'Keamanan Jaringan',
    date: '02 Juni 2026',
    readTime: '6 Menit Baca',
    excerpt: 'Enkripsi WPA2 dinilai kian rentan terhadap serangan brute-force nirkabel. Ketahui kelebihan WPA3 dalam membentengi jaringan komputer perusahaan Anda dari intaian orang tak dikenal.',
    author: {
      name: 'Rian Setiadi',
      role: 'Senior Network Engineer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    },
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    content: [
      'Standar enkripsi nirkabel WPA2 yang telah kita gunakan belasan tahun kini rentan terhadap metode serangan dekripsi modern. WPA3 hadir sebagai solusi perlindungan mutakhir.',
      'Keunggulan utama WPA3 adalah perlindungan tangguh terhadap pencurian sandi nirkabel secara offline, bahkan ketika kata sandi nirkabel Anda tergolong mudah ditebak.',
      'Bagi perkantoran yang rutin mengolah data transaksi finansial klien, migrasi ke access point yang mendukung WPA3 adalah langkah preventif yang tidak boleh ditunda.'
    ],
    tips: [
      'Aktifkan mode transisi WPA2/WPA3 pada router guna mengizinkan laptop lama tetap terhubung.',
      'Gunakan fitur Management Frame Protection (MFP) untuk memblokir serangan deotentikasi.',
      'Selalu update sistem firmware access point Anda demi kestabilan enkripsi nirkabel.'
    ]
  },
  {
    id: 'post-10',
    title: 'Mencegah Kebocoran Data di PC Staf Menggunakan Sistem MDM Sederhana',
    category: 'Keamanan Jaringan',
    date: '28 Mei 2026',
    readTime: '7 Menit Baca',
    excerpt: 'Kehilangan flashdisk atau laptop kerja yang menyimpan data sensitif klien bisa berakibat tuntutan hukum. Cari tahu cara mengunci perangkat dari jauh dengan teknik enkripsi storage modern.',
    author: {
      name: 'Rian Setiadi',
      role: 'Senior Network Engineer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    },
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    content: [
      'Laptop kerja staf yang sering dibawa keluar kantor berisiko tinggi hilang atau dicuri di area umum. Jika data di dalamnya tidak dilindungi enkripsi, siapa pun dapat membacanya dengan mudah.',
      'Mengaktifkan fitur enkripsi hard drive bawaan seperti BitLocker pada Windows Pro merupakan solusi instan yang sangat andal.',
      'Dengan BitLocker aktif, seluruh data di dalam penyimpanan komputer terkunci rapat dan mustahil dibuka tanpa kunci pemulihan resmi dari admin IT.'
    ],
    tips: [
      'Wajibkan staf menggunakan kata sandi login komputer yang kuat dan tidak berulang.',
      'Aktifkan BitLocker Drive Encryption pada seluruh laptop operasional divisi krusial.',
      'Simpan salinan kunci BitLocker Recovery di tempat aman terpisah dari laptop.'
    ]
  },
  {
    id: 'post-11',
    title: 'Kenapa Server Kantor Anda Wajib Menggunakan Backup Redundant RAID?',
    category: 'Infrastruktur',
    date: '25 Mei 2026',
    readTime: '5 Menit Baca',
    excerpt: 'Kerusakan satu unit hard disk tidak boleh menghentikan sistem database akuntansi Anda. Pelajari cara kerja konfigurasi RAID 1, RAID 5, dan RAID 10 untuk toleransi kerusakan hardware.',
    author: {
      name: 'Surya Pratama',
      role: 'Solutions Architect',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80'
    },
    imageUrl: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=800&q=80',
    content: [
      'Sebuah hard disk memiliki batasan masa pakai fisik. Di lingkungan server ruko yang menyala aktif 24 jam nonstop, risiko kerusakan piringan hard disk meningkat pesat.',
      'RAID (Redundant Array of Independent Disks) adalah teknologi yang menggabungkan beberapa hard disk menjadi satu kesatuan logis dengan perlindungan toleransi kerusakan.',
      'Dengan RAID 1 (mirroring) atau RAID 5, jika salah satu hard disk mati, server tetap beroperasi normal tanpa menyebabkan file terputus atau rusak.'
    ],
    tips: [
      'Gunakan hard disk berspesifikasi khusus server/NAS (seperti WD Red atau Seagate IronWolf).',
      'Pilih konfigurasi RAID 5 jika Anda membutuhkan kapasitas penyimpanan luas dengan proteksi andal.',
      'Selalu pantau kesehatan hard disk RAID Anda secara berkala lewat panel administrator.'
    ]
  },
  {
    id: 'post-12',
    title: 'Instalasi CCTV Malam Hari: Panduan Memilih Lensa ColorVu & Night Vision',
    category: 'Sistem Keamanan',
    date: '22 Mei 2026',
    readTime: '4 Menit Baca',
    excerpt: 'Sebagian besar tindak pencurian ruko terjadi di tengah gulita malam. Jangan biarkan rekaman Anda buram dan hitam-putih. Kenali teknologi lensa kamera pengawas bersensor peka cahaya.',
    author: {
      name: 'Andi Rustam',
      role: 'CCTV Supervisor',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80'
    },
    imageUrl: 'https://images.unsplash.com/photo-1557597774-951872b3fc40?auto=format&fit=crop&w=800&q=80',
    content: [
      'Rekaman CCTV malam hari yang buram sering kali menyulitkan pihak berwenang mengidentifikasi wajah pelaku kejahatan ruko atau toko.',
      'Teknologi kamera ColorVu modern menggunakan bukaan lensa ekstra lebar (F1.0) dan lampu tambahan hangat, menyajikan gambar berwarna tajam di malam gelap.',
      'Sementara itu, kamera Infrared konvensional menyajikan gambar hitam-putih. Memilih tipe kamera yang tepat bergantung pada ketersediaan pencahayaan lingkungan sekitar.'
    ],
    tips: [
      'Gunakan tipe ColorVu untuk area rawan yang minim penerangan lampu jalan.',
      'Pastikan posisi kamera tidak terhalang dahan pohon yang memicu pantulan infra merah.',
      'Pilih resolusi minimal 4 Megapixel untuk detail objek jauh yang tajam.'
    ]
  }
];

interface BlogProps {
  onNavigateToBooking: () => void;
}

export default function Blog({ onNavigateToBooking }: BlogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const categories = ['Semua', 'Keamanan Jaringan', 'Tips & Trik', 'Infrastruktur', 'Sistem Keamanan'] as const;

  // Reset page when category or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  const isSearchingOrFiltering = searchQuery !== '' || selectedCategory !== 'Semua';

  // Combine featured and regular posts if search/filter is active so users can find the featured post too
  const filteredPosts = useMemo(() => {
    const allPosts = isSearchingOrFiltering ? [FEATURED_POST, ...BLOG_POSTS] : BLOG_POSTS;
    return allPosts.filter((post) => {
      const matchCategory = selectedCategory === 'Semua' || post.category === selectedCategory;
      const matchSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [searchQuery, selectedCategory, isSearchingOrFiltering]);

  // Paginated subset of filtered posts
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    return filteredPosts.slice(startIndex, startIndex + postsPerPage);
  }, [filteredPosts, currentPage]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <div className="bg-transparent min-h-screen pt-28 pb-20 font-sans relative overflow-hidden">
      
      {/* Premium Dynamic Blurred Background Blobs on the page edges */}
      <div className="absolute top-[10%] left-0 -translate-x-1/2 w-[45rem] h-[45rem] rounded-full bg-blue-400/20 blur-[150px] pointer-events-none -z-10" />
      <div className="absolute top-[30%] right-0 translate-x-1/2 w-[45rem] h-[45rem] rounded-full bg-indigo-300/20 blur-[150px] pointer-events-none -z-10" />
      <div className="absolute top-[60%] left-0 -translate-x-1/2 w-[45rem] h-[45rem] rounded-full bg-teal-300/15 blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-[5%] right-0 translate-x-1/2 w-[50rem] h-[50rem] rounded-full bg-blue-300/20 blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <AnimatePresence mode="wait">
          {!activePost ? (
            <motion.div
              key="post-list"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header Title Centered Block - Matched from Screenshot style */}
              <div className="text-center max-w-3xl mx-auto mb-10 pt-4 relative">
                {/* Subtle top decoration */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-slate-900 tracking-tight leading-tight pt-4">
                  Blog & News
                </h1>
                <p className="text-slate-500 font-medium text-sm sm:text-base mt-4 leading-relaxed max-w-xl mx-auto">
                  Explore fresh stories, expert tips, and the newest developments in digital technology & IT infrastructure.
                </p>
              </div>

              {/* Utility Search & Filters Bar */}
              <div className="flex flex-col items-center gap-6 justify-center mb-16">
                
                {/* Categories Tab Pill Rows - Clean light rounded styling matching screenshot */}
                <div className="flex items-center justify-center gap-2 overflow-x-auto w-full max-w-4xl scrollbar-none py-1 px-4">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap border cursor-pointer ${
                        selectedCategory === cat
                          ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Search Box - Soft input border */}
                <div className="relative w-full max-w-md px-4">
                  <span className="absolute inset-y-0 left-4 flex items-center pl-3 pointer-events-none text-slate-400">
                    <IconSearch className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search technical guides, cybersecurity, tips..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 hover:border-slate-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 rounded-full text-xs font-medium text-slate-800 transition-all outline-none shadow-sm"
                  />
                </div>

              </div>

              {/* Featured Post (Visible ONLY when not searching/filtering) */}
              {!isSearchingOrFiltering && (
                <div className="mb-20">
                  <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full mb-6 inline-block">
                    Featured Article
                  </span>
                  <motion.div 
                    className="bg-white rounded-[32px] border border-slate-100/80 p-6 lg:p-8 shadow-[0_15px_50px_rgba(148,163,184,0.06)] hover:shadow-[0_25px_60px_rgba(148,163,184,0.12)] transition-all duration-300 group cursor-pointer"
                    onClick={() => setActivePost(FEATURED_POST)}
                    whileHover={{ y: -4 }}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                      <div className="lg:col-span-7 aspect-[16/10] lg:aspect-[16/9] overflow-hidden rounded-[24px] bg-slate-50 relative">
                        <img 
                          src={FEATURED_POST.imageUrl} 
                          alt={FEATURED_POST.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 text-[10px] font-bold text-white uppercase tracking-wider">
                          {FEATURED_POST.category}
                        </div>
                      </div>
                      
                      <div className="lg:col-span-5 flex flex-col justify-center">
                        <div className="flex items-center gap-2.5 text-slate-400 text-xs font-medium mb-4">
                          <span>{FEATURED_POST.date}</span>
                          <span className="text-slate-300">•</span>
                          <span>{FEATURED_POST.readTime}</span>
                        </div>
                        
                        <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight leading-tight group-hover:text-blue-600 transition-colors duration-200">
                          {FEATURED_POST.title}
                        </h2>
                        
                        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mt-4 line-clamp-4">
                          {FEATURED_POST.excerpt}
                        </p>
                        
                        {/* Compact inline Author style from screenshot */}
                        <div className="flex items-center gap-2.5 pt-6 mt-6 border-t border-slate-50">
                          <img
                            src={FEATURED_POST.author.avatar}
                            alt={FEATURED_POST.author.name}
                            referrerPolicy="no-referrer"
                            className="w-7 h-7 rounded-full object-cover border border-slate-200"
                          />
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-slate-800">{FEATURED_POST.author.name}</span>
                            <span className="text-slate-300 text-xs">•</span>
                            <span className="text-[10px] text-slate-400 font-medium">{FEATURED_POST.author.role}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}

              {/* Latest Posts Heading Section */}
              <div className="border-t border-slate-100 pt-12">
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight mb-8">
                  {isSearchingOrFiltering ? 'Search Results' : 'Latest Posts'}
                </h3>
              </div>

              {/* Grid Layout of Blogs */}
              {filteredPosts.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
                  <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 mx-auto mb-4">
                    <IconBook className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg">Tidak ada artikel ditemukan</h3>
                  <p className="text-slate-500 text-xs mt-1 max-w-sm mx-auto">
                    Kami tidak dapat menemukan hasil pencarian seputar "{searchQuery}". Coba gunakan kata kunci pencarian yang lain.
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {paginatedPosts.map((post, index) => (
                      <motion.article
                        key={post.id}
                        className="group bg-white rounded-[24px] border border-slate-100/80 p-5 shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-[0_20px_50px_rgba(148,163,184,0.1)] transition-all duration-300 flex flex-col justify-between cursor-pointer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: (index % 6) * 0.08 }}
                        onClick={() => setActivePost(post)}
                        whileHover={{ y: -4 }}
                      >
                        <div>
                          {/* Image Banner - Rounded 2xl & aspect 16/10 exactly like screenshot */}
                          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-50 mb-5">
                            <img
                              src={post.imageUrl}
                              alt={post.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                            />
                            <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-xl border border-white/5 text-[9px] font-bold text-white uppercase tracking-wider">
                              {post.category}
                            </div>
                          </div>

                          {/* Metadata - Grey thin font matching screenshot */}
                          <div className="flex items-center gap-2.5 text-slate-400 text-xs font-medium mb-2">
                            <span>{post.date}</span>
                            <span className="text-slate-300">•</span>
                            <span>{post.readTime}</span>
                          </div>

                          {/* Title - Deep slate tracking tight */}
                          <h4 className="text-slate-900 font-display font-extrabold text-lg sm:text-xl leading-snug group-hover:text-blue-600 transition-colors duration-200 mt-2">
                            {post.title}
                          </h4>

                          {/* Excerpt */}
                          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mt-2.5 line-clamp-2">
                            {post.excerpt}
                          </p>
                        </div>

                        {/* Author - Highly compressed line row with avatar matching screenshot */}
                        <div className="flex items-center gap-2.5 pt-4 mt-5 border-t border-slate-50">
                          <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            referrerPolicy="no-referrer"
                            className="w-7 h-7 rounded-full object-cover border border-slate-200"
                          />
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-slate-800">{post.author.name}</span>
                            <span className="text-slate-300 text-xs">•</span>
                            <span className="text-[10px] text-slate-400 font-medium">{post.author.role}</span>
                          </div>
                        </div>

                      </motion.article>
                    ))}
                  </div>

                  {/* Pagination Controls - Beautiful slate circular layout */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-16">
                      <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="p-2 border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed text-slate-700 hover:text-slate-900 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer h-9 w-9 flex items-center justify-center"
                      >
                        <IconChevronLeft className="w-4 h-4" />
                      </button>
                      
                      {Array.from({ length: totalPages }).map((_, idx) => {
                        const pageNum = idx + 1;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-9 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                              currentPage === pageNum
                                ? 'bg-slate-900 text-white shadow-sm'
                                : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}

                      <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed text-slate-700 hover:text-slate-900 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer h-9 w-9 flex items-center justify-center"
                      >
                        <IconChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* Consultation CTA section */}
              <div className="mt-24">
                <CtaSection />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="post-detail"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="max-w-4xl mx-auto bg-white rounded-[32px] border border-slate-100 shadow-[0_20px_50px_rgba(148,163,184,0.08)] p-6 sm:p-10 md:p-12 relative"
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
                <span className="bg-blue-50 text-blue-600 border border-blue-100 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest">
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
                  <button className="p-2 hover:bg-slate-50 text-slate-400 hover:text-slate-600 rounded-lg transition-colors cursor-pointer animate-none" title="Sukai Artikel">
                    <IconThumbUp className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-slate-50 text-slate-400 hover:text-slate-600 rounded-lg transition-colors cursor-pointer animate-none" title="Bagikan Link">
                    <IconShare className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Highlight Image Banner */}
              <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-50 mb-8 max-h-[400px]">
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
                  <span className="bg-blue-600 text-white p-1 rounded-lg">
                    <IconTag className="w-3.5 h-3.5" />
                  </span>
                  Rangkuman Solusi Praktis HSR Technology
                </h3>
                <ul className="mt-4 space-y-3.5">
                  {activePost.tips.map((tip, idx) => (
                    <li key={idx} className="flex gap-3 text-xs sm:text-sm text-slate-600">
                      <span className="text-blue-600 font-bold tracking-tight select-none mt-0.5">{idx + 1}.</span>
                      <span className="font-medium text-slate-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Call-To-Action (CTA) panel at bottom of article */}
              <div className="mt-12 bg-gradient-to-r from-slate-900 to-[#1e293b] rounded-[24px] p-6 sm:p-8 text-white relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="absolute inset-0 grid-bg-dark opacity-10 pointer-events-none" />
                <div className="relative z-10 max-w-md">
                  <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">Butuh Bantuan Instalasi &amp; Implementasi?</h4>
                  <p className="text-[11px] sm:text-xs text-slate-300 mt-1.5 leading-relaxed font-medium">
                    Serahkan semua kesulitan teknis IT infrastruktur, setup router, atau perbaikan hardware Anda kepada ahlinya di HSR Care. Pengerjaan cepat &amp; bergaransi.
                  </p>
                </div>
                
                <button
                  onClick={() => {
                    setActivePost(null);
                    onNavigateToBooking();
                  }}
                  className="relative z-10 shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 active:scale-95 text-white transition-all shadow-lg shadow-blue-500/20 cursor-pointer"
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
