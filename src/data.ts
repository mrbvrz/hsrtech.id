/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ITService, PortfolioProject, Testimonial } from './types';

export const SERVICES: ITService[] = [
  {
    id: 'service-repair',
    title: 'Servis Komputer & Hardware',
    tagline: 'Perbaikan hardware PC, Laptop & Server',
    description: 'Solusi cepat untuk kendala hardware komputer lambat, hang, mati total, ganti sparepart, upgrade komponen, atau overheat.',
    longDescription: 'Infrastruktur bisnis Anda berharga, sehingga komputer yang bermasalah akan mengganggu roda produktivitas. Kami melayani perbaikan hardware komputer, laptop, dan server secara mendalam. Teknisi kami terlatih menganalisis kerusakan tingkat kapasitor hingga perbaikan fisik yang presisi.',
    features: [
      'Ganti thermal paste & pembersihan debu sirkulasi kipas pendingin',
      'Upgrade performa kencang dengan SSD NVMe & kapasitas RAM',
      'Perbaikan motherboard, modul power supply, & ganti keyboard/layar laptop',
      'Recovery data file terenkripsi, terhapus, ataupun dari media penyimpanan rusak',
      'Diagnosis hardware menyeluruh dengan laporan kesehatan kesehatan perangkat'
    ],
    iconName: 'Laptop',
    basePrice: 'Rp 150.000',
    estimatedTime: '1 - 2 Hari Kerja',
    category: 'hardware'
  },
  {
    id: 'service-reinstall',
    title: 'Install Ulang & Optimasi OS',
    tagline: 'Instalasi sistem operasi & penyetelan software optimal',
    description: 'Instalasi bersih Windows atau Linux dengan lisensi resmi, driver terbaru, utilitas produktivitas lengkap, dan proteksi malware.',
    longDescription: 'Sistem operasi lama kelamaan mengumpulkan residu file sampah dan konfigurasi registry yang rusak. Kami mengembalikan performa seperti baru dibeli dengan teknik Clean Install. Semua lisensi diaktifkan secara legal dengan konfigurasi perlindungan privasi yang aman.',
    features: [
      'Instalasi Windows 10/11 Pro atau ragam distro Linux berlisensi',
      'Backup data penting di partisi terpisah sebelum operasi berjalan',
      'Instalasi driver internal ter-update yang cocok dengan hardware Anda',
      'Penyetelan sistem startup & penonaktifan aplikasi latar belakang yang berat',
      'Paket aplikasi standar kantor lengkap (Office, Browser, PDF Reader, WinRAR)'
    ],
    iconName: 'Disc',
    basePrice: 'Rp 100.000',
    estimatedTime: '2 - 4 Jam',
    category: 'software'
  },
  {
    id: 'service-network',
    title: 'Instalasi Jaringan & Server',
    tagline: 'Koneksi LAN, Wi-Fi terdistribusi, & managed switch router',
    description: 'Desain instalasi kabel CAT6, pengaturan dual-WAN load balance, perluasan jangkauan Wi-Fi mesh, dan konfigurasi server kantor.',
    longDescription: 'Koneksi internet yang sering putus merusak kredibilitas bisnis Anda. Kami merancang arsitektur jaringan kabel terstruktur (Structure Cabling) menggunakan kabel grade industri dan manajemen router cerdas MikroTik untuk memastikan koneksi internet melaju tanpa rintangan.',
    features: [
      'Penarikan kabel jaringan LAN CAT6/Fiber Optik super rapi terlindung pipa',
      'Konfigurasi router MikroTik (Load Balance Dual ISP, QoS Bandwidth Manajemen)',
      'Akses Point terpusat (Ubiquiti UniFi, TP-Link Omada) dengan Roaming Wi-Fi',
      'Setup firewall keamanan lokal, VPN kantor cabang terenkripsi, & port filtering',
      'Instalasi Server Lokal, NAS, dan program integrasi sharing folder ber-izin'
    ],
    iconName: 'Network',
    basePrice: 'Rp 450.000',
    estimatedTime: 'Sesuai Survei Lokasi',
    category: 'network'
  },
  {
    id: 'service-cctv',
    title: 'Keamanan CCTV Sistem',
    tagline: 'Instalasi IP Camera & Analog HD pantau real-time 24 jam',
    description: 'Pemasangan paket kamera pengawas resolusi tinggi untuk rumah, ruko, gudang atau kantor dengan integrasi langsung ke smartphone.',
    longDescription: 'Pantau aset berharga Anda dari genggaman tangan di mana saja dan kapan saja. Kami melayani pemasangan CCTV andal menggunakan DVR/NVR berspesifikasi tinggi, kabel coaxial/UTP tebal, dan setup cloud internet streaming berkecepatan tinggi.',
    features: [
      'Pemasangan IP Camera / Analog HD resolusi 2 Megapixel hingga resolusi 4K',
      'Teknologi Night Vision & ColorVu untuk tangkapan warna detail di malam gelap',
      'Konfigurasi remote online ke smartphone Android, iPhone, tablet, & PC',
      'Instalasi perkabelan super rapi dengan proteksi pipa elastis (conduit)',
      'Garansi produk resmi selama 1 tahun & gratis pemeliharaan pasca-pasang'
    ],
    iconName: 'Eye',
    basePrice: 'Rp 350.000 / Titik',
    estimatedTime: '1 - 3 Hari Kerja',
    category: 'cctv'
  },
  {
    id: 'service-support',
    title: 'IT Support & Helpdesk',
    tagline: 'Dukungan bantuan teknis cepat on-demand',
    description: 'Solusi andal penanganan error harian printer macet, program crash, wifi mati melalui remote jarak jauh atau kunjungan fisik ke tempat.',
    longDescription: 'Staf Anda mengalami kendala printer bergaris, virus memblokir aplikasi kerja, atau komputer tiba-tiba kehilangan koneksi internet? Layanan on-demand IT Support kami siap bertindak dalam waktu singkat agar operasional bisnis utama Anda lekas berjalan kembali.',
    features: [
      'Helpdesk remote cepat dengan lisensi AnyDesk / TeamViewer aman',
      'Kunjungan teknisi langsung (on-site visit) dengan peralatan penunjang lengkap',
      'Pembersihan tuntas virus, malware, adware, & ransomware berbahaya',
      'Konektivitas printer network sharing, printer thermal kasir, & scanner digital',
      'Laporan penyelesaian tiket troubleshooting terdokumentasi terinci'
    ],
    iconName: 'Wrench',
    basePrice: 'Rp 200.000 / Visit',
    estimatedTime: 'Instan Remote / <2 Jam On-site',
    category: 'hardware'
  },
  {
    id: 'service-consulting',
    title: 'Konsultan IT Profesional',
    tagline: 'Panduan efisiensi teknologi & perencanaan sistem digital',
    description: 'Analisis infrastruktur IT Anda untuk meminimalkan pengeluaran biaya operasional serta merancang sistem cadangan data antipunah.',
    longDescription: 'Banyak bisnis menghamburkan modal besar pada perangkat keras yang salah spesifikasi. Kami hadir sebagai pendamping terpercaya untuk memformulasikan solusi IT taktis yang selaras dengan kapasitas anggaran dan proyeksi perkembangan bisnis Anda di masa depan.',
    features: [
      'Audit infrastruktur IT (hardware, keamanan jaringan, backup data)',
      'Dokumentasi skema topologi jaringan eksisting & rancangan usulan baru',
      'Formulasi cetak biru sistem cadangan data bencana (Disaster Recovery)',
      'Bimbingan teknis pemilihan spesifikasi server/pc budget-to-performance',
      'Laporan analisis resiko celah keamanan siber dan kebocoran data'
    ],
    iconName: 'Briefcase',
    basePrice: 'Rp 1.000.000 / Projek',
    estimatedTime: '3 - 7 Hari Kerja',
    category: 'consulting'
  },
  {
    id: 'service-web',
    title: 'Pembuatan Website & App',
    tagline: 'Desain website representatif, cepat, & ramah Google SEO',
    description: 'Pembuatan website profil perusahaan premium, landing page penjualan, e-commerce, atau sistem kustom dengan basis modern.',
    longDescription: 'Website adalah cerminan utama kredibilitas bisnis Anda di era digital. Kami merancang website premium responsif yang dibuat khusus menggunakan framework modern. Cepat diakses, optimal dalam halaman pencarian Google, dan dikonstruksi untuk memancing interaksi prospek.',
    features: [
      'Desain UI/UX eksklusif, mewah, trendi, dan dioptimalkan di segala layar',
      'Optimasi kecepatan tinggi (skor Google PageSpeed 90+), lincah tanpa lag',
      'Sistem CMS admin panel ringkas untuk kemudahan merubah teks/gambar sendiri',
      'Integrasi tombol interaksi WhatsApp marketing & formulir kontak cerdas',
      'Gratis Domain (.com/.co.id), server hosting super cepat, & ssl selama 1 tahun'
    ],
    iconName: 'Globe',
    basePrice: 'Rp 1.500.000',
    estimatedTime: '7 - 14 Hari Kerja',
    category: 'software'
  },
  {
    id: 'service-maintenance',
    title: 'Managed IT Maintenance',
    tagline: 'Perawatan berkala komputer & jaringan bulanan korporasi',
    description: 'Pastikan operasional kantor terjamin dengan kontrak perawatan berkala, backup terjadwal, dan penanganan darurat prioritas.',
    longDescription: 'Hilangkan sakit kepala akibat kendala IT dengan skema outsourcing pemeliharaan bulanan bersama HSR Technology. Komputer, server, printer, dan jaringan kantor Anda kami pantau dan pelihara rutin layaknya memiliki tim IT internal berdedikasi tinggi.',
    features: [
      'Kunjungan fisik preventif bulanan terjadwal secara periodik',
      'Pembersihan fisik hardware blower berkala dari debu pengganggu komponen',
      'Penjadwalan update patch Windows, antivirus database, & database cadangan',
      'Layanan helpdesk darurat on-call 24/7 dengan jaminan respons kilat',
      'Hemat biaya operasional hingga 60% dibanding membentuk divisi IT internal'
    ],
    iconName: 'ShieldCheck',
    basePrice: 'Rp 750.000 / Bulan',
    estimatedTime: 'Kontrak Rutin Bulanan',
    category: 'network'
  }
];

export const PORTFOLIO: PortfolioProject[] = [
  {
    id: 'project-indomakmur',
    title: 'Integrasi LAN Infrastruktur & Server Kantor Core',
    category: 'network',
    client: 'PT Indo Makmur Sejahtera',
    location: 'Grogol, Jakarta Barat',
    year: '2025',
    description: 'Pemasangan menyeluruh jaringan backbone kabel CAT6 berkualitas tinggi untuk gedung perkantoran 3 lantai, mencakup load balancing dual-WAN, pemisahan VLAN departemen via MikroTik, dan setup server active directory.',
    challenge: 'Menerapkan koneksi internet yang tidak terputus untuk 75 staf aktif yang rutin mentransfer file CAD berukuran raksasa, sembari merapikan tumpukan kabel semrawut di rak server eksisting.',
    solution: 'Melakukan penataan jalur kabel dengan conduit tebal, menginstalasi patch panel di rak server tertutup, memprogram router MikroTik dengan sistem Failover Dual-ISP otomatis, dan membagi load bandwidth menggunakan skema Queue Tree.',
    impact: [
      'Kendala koneksi internet lambat / drop ditekan hingga 100% (zero downtime)',
      'Proses transfer dokumen antar departemen melesat di kecepatan Gigabit flat',
      'Tatanan rak server modern super bersih dan rapi memudahkan identifikasi kabel',
      'Hak akses dokumen terpusat terlindungi dengan pembatasan otentikasi login'
    ],
    tags: ['MikroTik Router', 'Ubiquiti Access Points', 'Kabel LAN Belden CAT6', 'Windows Server AD', 'Fluke Cabling Test'],
    statsRef: { label: 'Kecepatan Jaringan', value: '1.0 Gbps' },
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'project-cctvharapan',
    title: 'Sistem Kamera Pengawas (IP Camera) Gudang Logistik',
    category: 'cctv',
    client: 'CV Harapan Logistik Sentosa',
    location: 'Cikupa, Tangerang',
    year: '2025',
    description: 'Instalasi jaringan 36 unit kamera pengawas IP Hikvision resolusi 4 Megapixel berbasis Power-over-Ethernet (PoE) yang dirancang untuk pengawasan luar ruangan gudang penyimpanan kargo berat.',
    challenge: 'Area operasional bongkar muat gudang yang luas dan minim lampu di malam hari berpotensi rawannya tindak kriminalitas, serta rekaman video wajib disimpan utuh selama minimal 45 hari tanpa kegagalan.',
    solution: 'Menerapkan jajaran kamera Hikvision bersensor ColorVu, mengimplementasikan 2 unit NVR tangguh berkapasitas total 24TB dengan konfigurasi RAID redundan, serta merancang skema transmisi nirkabel point-to-point untuk titik kamera terjauh.',
    impact: [
      'Rekaman malam hari tetap full-color beresolusi super tajam memudahkan identifikasi plat truk',
      'Akses pemantauan multi-user real-time lancar langsung melalui handphone supervisor',
      'NVR diletakkan aman di brankas baja tahan api dengan back-up cloud otomatis',
      'Kehilangan barang di gudang menurun drastis ke angka nol persen'
    ],
    tags: ['IP Camera 4MP', 'Hikvision ColorVu', 'PoE Gigabyte Switch', 'Outdoor Wireless P2P', 'NVR Raid Guard'],
    statsRef: { label: 'Area Blindspot Teratasi', value: '98%' },
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'project-furnitureweb',
    title: 'Elegant Corporate Web & Katalog Interaktif 3D',
    category: 'website',
    client: 'PT Vurnis Studio Internasional',
    location: 'Serpong, Tangerang Selatan',
    year: '2026',
    description: 'Pembuatan platform situs perkenalan bisnis modern bercitra internasional yang memuat katalog interaktif produk interior, berkecepatan load sangat instan, serta integrasi pemantau leads pemasaran.',
    challenge: 'Mengakomodasi tampilan katalog furnitur yang kaya akan foto visual definisi tinggi tanpa memperlambat performa responsivitas situs ketika dibuka oleh calon pembeli asing dari HP.',
    solution: 'Membangun arsitektur website satu halaman penuh berbasis React, mengompresi gambar otomatis via integrasi modern Next-Gen Image formats, serta mengintegrasikan API form cerdas ke server CS WhatsApp HSR marketing.',
    impact: [
      'Waktu pemuatan halaman halaman website stabil di bawah 1.2 detik (skor PageSpeed tinggi)',
      'Conversion rate prospek masuk naik hingga 85% dibanding website lama',
      'Tampilan antarmuka estetik memenangkan penghargaan referensi website industri lokal',
      'Kemudahan editing produk bagi staf administrasi tanpa perlu paham baris kode'
    ],
    tags: ['React TS', 'Tailwind CSS', 'Framer Motion App', 'Image CDN Optimization', 'Digital Analytics Setup'],
    statsRef: { label: 'Skor Akses Web', value: '99/100' },
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'project-maintenancebuana',
    title: 'Kontrak Managed IT Maintenance Service Perusahaan Logistik',
    category: 'maintenance',
    client: 'PT Buana Global Logistik',
    location: 'Gambir, Jakarta Pusat',
    year: '2024',
    description: 'Kesepakatan pemeliharaan terstruktur berkelanjutan untuk 50 workstation operasional admin kantor, printer kasir, sistem server internal, backup data mingguan, dan jaminan helpdesk tanggap cepat.',
    challenge: 'Sering terjadinya komputer lemot, printer thermal kasir macet, dan virus yang merusak data operasional manifest angkutan harian, mengganggu jam operasional pengiriman barang.',
    solution: 'Menerapkan kunjungan preventif rutin setiap minggu untuk pembersihan hardware dan audit software, instalasi managed antivirus terpusat, setup NAS backup otomatis, dan skema remote support instan ber-SLA.',
    impact: [
      'Kejadian komputer error berkurang hingga 90% pasca audit optimalisasi HSR',
      'Backup database berkala tersusun aman secara berkala mencegah fatal data hilang',
      'Tim admin logistik bekerja tenang tanpa kendala teknis macet mengganggu',
      'Biaya operasional anggaran IT lebih terprediksi, hemat 55% dibanding menggaji analis IT internal'
    ],
    tags: ['Antivirus Managed Guard', 'Scheduled File Backup', 'Ondemand Remote Service', 'Quarterly Physical Cleaning', 'Dedicated SLA Response'],
    statsRef: { label: 'Respon Helpdesk', value: '<15 Menit' },
    image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'project-sinarminimarket',
    title: 'Sistem Pembayaran Kasir (POS) & Keamanan Multi-CCTV Terpusat',
    category: 'cctv',
    client: 'Sinar Abadi Mart Group',
    location: 'Kalideres, Jakarta Barat',
    year: '2025',
    description: 'Instalasi terpadu CCTV pemantau koridor, jaringan internal point of sales (POS), dan setup sistem backup data penjualan otomatis harian untuk 5 cabang minimarket waralaba.',
    challenge: 'Pemilik kesulitan memantau kasir dan area rawan pencurian secara real-time dari kantor pusat, serta sistem kasir sering terputus akibat fluktuasi koneksi.',
    solution: 'Penerapan IP Camera resolusi tinggi di atas area kasir, sistem interkom pengeras suara, router penyeimbang beban (Dual-WAN), dan sinkronisasi data cloud berkala berbasis enkripsi aman.',
    impact: [
       'Kejadian kehilangan barang ditekan hingga lebih dari 95% di seluruh cabang',
       'Pemilik dapat memantau rekaman audio-visual berkualitas tinggi kapan pun lewat ponsel',
       'Proses checkout kasir tetap aman berjalan tanpa gangguan downtime koneksi server',
       'Skema rekaman terjadwal dan kompresi tingkat lanjut menghemat memori NVR'
    ],
    tags: ['IP Security Systems', 'Centralized NVR Sync', 'Dual-Internet Backup', 'Kasir System Secure Router', 'Audio Grid'],
    statsRef: { label: 'Keberhasilan Deteksi', value: '100%' },
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'project-bhaktischool',
    title: 'Sistem Manajemen Sekolah & Landing Page PPDB Interaktif',
    category: 'website',
    client: 'Yayasan Pendidikan Bhakti Utama',
    location: 'Kebon Jeruk, Jakarta Barat',
    year: '2025',
    description: 'Rancangan portal pendaftaran siswa baru (PPDB) online terpadu, sistem informasi sekolah interaktif, serta implementasi sistem pembelajaran e-learning berbasis awan.',
    challenge: 'Proses pendaftaran siswa baru masih manual menggunakan kertas, menyebabkan antrean panjang dan admin kewalahan memasukkan data ribuan pendaftar.',
    solution: 'Pengembangan landing page responsif, form pendaftaran online dengan verifikasi berkas otomatis, sistem database pendaftar, dan portal administrasi keuangan sekolah.',
    impact: [
      'Proses pendaftaran siswa baru selesai 4x lebih cepat tanpa perlu antre fisik',
      'Informasi biaya sekolah transparan dan dapat dibayar via virtual account otomatis',
      'Arsip pendaftaran digital tersimpan rapi dan mudah diolah tim tata usaha sekolah',
      'Pengalaman pendaftaran interaktif meningkatkan jumlah calon pendaftar sebesar 40%'
    ],
    tags: ['Next.js Framework', 'Fast Database System', 'PPDB Online Portal', 'Responsive Dashboard Layout', 'Cloud Storage Integration'],
    statsRef: { label: 'Peningkatan Pendaftar', value: '+40%' },
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'testi-1',
    name: 'Budi Hartono',
    role: 'Direktur Operasional',
    company: 'PT Indo Makmur Sejahtera',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    comment: 'Pekerjaan merapikan server dan jaringan internet di kantor kami sangat memuaskan. Teknisi dari HSR Technology profesional. Kabel diatur rapi, dan router disetting dengan Load Balance yang membuat internet kami stabil meskipun dipakai puluhan orang secara serempak. Sangat rekomended!',
    rating: 5
  },
  {
    id: 'testi-2',
    name: 'Citra Amelia',
    role: 'Direktur Kreatif',
    company: 'PT Vurnis Studio Internasional',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    comment: 'Kami mempercayakan pembuatan website company profile ke HSR Technology dan hasilnya melampaui ekspektasi. Website super cepat dibuka di HP, animasinya smooth dan elegan sekali. Client kami dari luar negeri juga mengapresiasi kemudahan navigasinya. Thumbs up!',
    rating: 5
  },
  {
    id: 'testi-3',
    name: 'Hadi Prasetyo',
    role: 'Kepala Gudang Kargo',
    company: 'CV Harapan Logistik Sentosa',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    comment: 'Pemasangan CCTV sebanyak 36 titik di area gudang kami berjalan lancar. Hasil gambar di malam hari luar biasa terang dan berwarna. Cara monitoring dari handphone pun dipandu dengan sabar oleh teknisinya sampai seluruh tim kami memahaminya.',
    rating: 5
  },
  {
    id: 'testi-4',
    name: 'Elvina Rosita',
    role: 'Manajer HRD',
    company: 'PT Buana Global Logistik',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
    comment: 'Sejak menggunakan jasa Managed IT Maintenance bulanan dari HSR, staf admin kami tidak pernah mengeluh lagi tentang komputer lambat atau printer bermasalah. SLA respon helpdesk mereka sangat cepat, tak sampai 15 menit sudah diremote dan beres.',
    rating: 5
  },
  {
    id: 'testi-5',
    name: 'Marcus Winata',
    role: 'Pemilik Waralaba',
    company: 'Nusantara Retail Group',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    comment: 'Solusi sistem kasir (POS), integrasi printer thermal, dan konfigurasi failover backup internet untuk 12 gerai retail kami berjalan tanpa celah. Downtime kasir kini berkurang drastis hampir nol persen.',
    rating: 5
  },
  {
    id: 'testi-6',
    name: 'Dr. Linda Wijaya',
    role: 'Kepala Layanan Medis',
    company: 'KlikKlinik Pratama',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    comment: 'Sangat terbantu oleh jasa instalasi jaringan rekam medis elektronik (SatuSehat) dan konfigurasi proteksi data pasien dari HSR Technology. Keamanan data klinis dijamin optimal dengan backup harian terenkripsi.',
    rating: 5
  }
];

export const PROCESS_STEPS = [
  {
    title: '1. Konsultasi / Reservasi',
    description: 'Pilih jenis layanan yang Anda butuhkan secara online atau konsultasi via WhatsApp. Tentukan tanggal & jam yang fleksibel bagi agenda Anda.'
  },
  {
    title: '2. Analisis & Survei Lokasi',
    description: 'Teknisi profesional kami melakukan analisis mendalam via remote, atau survei fisik ke kantor/rumah Anda untuk mengukur kebutuhan akurat.'
  },
  {
    title: '3. Penawaran & Eksekusi',
    description: 'Dapatkan transparansi biaya resmi di awal. Tindakan perbaikan atau instalasi dijalankan oleh tim handal berbekal peralatan modern.'
  },
  {
    title: '4. Testing, Serah Terima & Garansi',
    description: 'Kami melakukan uji coba fungsionalitas menyeluruh di hadapan Anda, memberikan garansi performa resmi, serta dukungan teknis lanjutan.'
  }
];
