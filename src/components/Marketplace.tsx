/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  IconShoppingBag, 
  IconShoppingCart, 
  IconSearch, 
  IconPlus, 
  IconMinus, 
  IconTrash, 
  IconPackage, 
  IconSparkles, 
  IconCoins, 
  IconX, 
  IconCheck, 
  IconShieldCheck, 
  IconTruck, 
  IconQrcode, 
  IconArrowRight, 
  IconInfoCircle, 
  IconEye, 
  IconArrowLeft
} from '@tabler/icons-react';

interface Product {
  id: string;
  name: string;
  category: 'networking' | 'storage' | 'computing' | 'accessories' | 'cctv';
  categoryLabel: string;
  brand: string;
  price: number;
  condition: 'baru' | 'refurbished';
  specification: string[];
  stock: number;
  image: string;
  description: string;
  warranty: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

const PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    name: 'Lenovo ThinkPad T490 (Refurbished Grade A)',
    category: 'computing',
    categoryLabel: 'Computing & Laptop',
    brand: 'Lenovo',
    price: 4850000,
    condition: 'refurbished',
    specification: [
      'Intel Core i5-8365U Quad-Core',
      '16GB DDR4 RAM (Upgradable)',
      '512GB NVMe SSD Ultra-Fast',
      'Layar 14" FHD IPS Anti-Glare',
      'OS Windows 11 Pro Original'
    ],
    stock: 3,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80',
    description: 'Unit bekas pemakaian korporasi multinasional super mulus. Fisik 95% mulus luar dalam, keyboard backlit khas ThinkPad sangat empuk, baterai tahan lama 3-5 jam tergantung pemakaian harian.',
    warranty: '3 Bulan Garansi Toko HSR'
  },
  {
    id: 'prod-02',
    name: 'Cisco Catalyst Switch WS-C2960X-24TS-L',
    category: 'networking',
    categoryLabel: 'Networking & Switch',
    brand: 'Cisco Systems',
    price: 2750000,
    condition: 'refurbished',
    specification: [
      '24 Ports 10/100/1000 Gigabit LAN',
      '4 SFP 1G Uplink Interfaces',
      'Layer 2 Managed Enterprise RouterOS',
      'Firmware Terbaru IPv6 Ready',
      'Daya Konsumsi Efisien Eco-Green'
    ],
    stock: 5,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80',
    description: 'Switch andalan untuk backbone jaringan enterprise. Unit refurbished bersih luar dalam, sirkuit diperiksa teliti secara termal, port diuji 100% transfer data stabil tanpa loss rate.',
    warranty: '6 Bulan Garansi Tukar Unit HSR'
  },
  {
    id: 'prod-03',
    name: 'Ubiquiti UniFi AC Lite AP (UAP-AC-Lite)',
    category: 'networking',
    categoryLabel: 'Networking & Access Point',
    brand: 'Ubiquiti',
    price: 1150000,
    condition: 'baru',
    specification: [
      'Dual-Band Wi-Fi 2.4 / 5 GHz',
      'Kecepatan Nirkabel s/d 867 Mbps',
      'Input PoE Listrik via Kabel LAN',
      'Desain Kubah Minimalis Tipis',
      'Manageable via UniFi Controller App'
    ],
    stock: 12,
    image: 'https://images.unsplash.com/photo-1600697395593-e9dc66797b43?auto=format&fit=crop&w=600&q=80',
    description: 'WiFi Access Point terbaik untuk kestabilan tinggi di kantor, ruko, cafe, atau gaming home setup. Mendukung integrasi seamless roaming tanpa putus saat berpindah tempat.',
    warranty: '1 Tahun Garansi Resmi Distributor'
  },
  {
    id: 'prod-04',
    name: 'Samsung 980 PRO NVMe PCIe Gen4 M.2 1TB',
    category: 'storage',
    categoryLabel: 'Storage & Drive',
    brand: 'Samsung',
    price: 1650000,
    condition: 'baru',
    specification: [
      'PCIe Gen 4.0 x4, NVMe 1.3 Interface',
      'Read speed s/d 7,000 MB/s',
      'Write speed s/d 5,000 MB/s',
      'V-NAND TLC Samsung Controller',
      'Mendukung Kompatibilitas Sony PS5'
    ],
    stock: 8,
    image: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&w=600&q=80',
    description: 'SSD kasta tertinggi untuk kebutuhan storage performa ekstrik. Ideal untuk mempercepat proses booting, pengolahan database besar, editing video resolusi tinggi, atau ekspansi library PlayStation 5.',
    warranty: '5 Tahun Garansi Resmi Samsung Indonesia'
  },
  {
    id: 'prod-05',
    name: 'Synology DiskStation DS224+ 2-Bay NAS',
    category: 'storage',
    categoryLabel: 'Storage & Server NAS',
    brand: 'Synology',
    price: 5490000,
    condition: 'baru',
    specification: [
      'Processor Intel Celeron J4125 2-Core',
      '2-Bay Hotswap HDD/SSD SATA Tray',
      'Dual Gigabit RJ-45 LAN with Failover',
      'Bisa Upgrade RAM bawaan s/d 6GB',
      'DSM OS Cloud Personal & Office Sharing'
    ],
    stock: 2,
    image: 'https://images.unsplash.com/photo-1628557118392-56c873ad9116?auto=format&fit=crop&w=600&q=80',
    description: 'Atur data digital bisnis Anda sendiri dengan aman. Solusi backup file dari laptop karyawan otomatis, server sinkronisasi sharing file anti-ransomware, dan private cloud database.',
    warranty: '2 Tahun Garansi Resmi Synology'
  },
  {
    id: 'prod-06',
    name: 'Dahua IP Bullet Camera CCTV Outdoor 4MP',
    category: 'cctv',
    categoryLabel: 'Keamanan & CCTV',
    brand: 'Dahua',
    price: 680000,
    condition: 'baru',
    specification: [
      'Resolusi Ultra-HD 4 Megapixel 2K',
      'Sertifikasi Outdoor IP67 Weatherproof',
      'Smart IR Night-vision s/d 30 Meter',
      'MicroSD Slot up to 256GB Support',
      'Codec H.265+ Kompresi Storage Super Irit'
    ],
    stock: 15,
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80',
    description: 'Kamera pengawas profesional untuk memberikan ketenangan pikiran mutlak. Tahan gempuran panas matahari langsung dan hujan lebat. Bisa dimonitor real-time via Android/iOS kapan saja.',
    warranty: '2 Tahun Garansi Dahua Resmi'
  },
  {
    id: 'prod-07',
    name: 'MikroTek Routerboard RB450Gx4 Layer 5',
    category: 'networking',
    categoryLabel: 'Networking & Router',
    brand: 'MikroTik',
    price: 1980000,
    condition: 'baru',
    specification: [
      'CPU Quad-Core IPQ-4019 716MHz',
      'RAM 1GB tangguh untuk traffic padat',
      '5 Port Gigabit Ethernet RJ-45',
      'Mendukung Power via PoE Passive / 802.3af',
      'Lisensi RouterOS Level 5 Enterprise'
    ],
    stock: 4,
    image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=600&q=80',
    description: 'Router tangguh yang didesain khusus untuk pengaturan bandwidth dinamis, billing hotspot otomatis kafe/hotel, load-balancing 2 line ISP, and firewall VPN kantor handal.',
    warranty: '1 Tahun Garansi Resmi Mikrotik'
  }
];

export default function Marketplace() {
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Navigation internal / Filtering
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCondition, setSelectedCondition] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<number>(6000000);

  // Cart logic
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sell-old-device estimation (C2B platform)
  const [sellForm, setSellForm] = useState({
    deviceType: 'laptop',
    brand: '',
    specDescription: '',
    ageYears: 1,
    physicalCondition: 'excellent', // excellent, good, fair
    originalBox: 'yes'
  });
  const [estimatedValueRange, setEstimatedValueRange] = useState<{ min: number; max: number } | null>(null);
  const [sellSuccessMsg, setSellSuccessMsg] = useState(false);

  // Detail Modal
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  
  // Checkout Modal
  const [checkoutStep, setCheckoutStep] = useState<'idle' | 'shipping' | 'qris_payment' | 'completed'>('idle');
  const [shippingForm, setShippingForm] = useState({
    fullName: '',
    phone: '',
    streetAddress: '',
    city: 'Jakarta Barat',
    postalCode: '',
    courier: 'reguler' // reguler (Rp 25.000), kilat (Rp 50.000)
  });

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const matchCondition = selectedCondition === 'all' || p.condition === selectedCondition;
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.specification.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchPrice = p.price <= maxPrice;
      
      return matchCategory && matchCondition && matchSearch && matchPrice;
    });
  }, [selectedCategory, selectedCondition, searchQuery, maxPrice]);

  // Cart operations
  const addToCart = (product: Product) => {
    setCart(prev => {
      const idx = prev.findIndex(item => item.product.id === product.id);
      if (idx > -1) {
        const updated = [...prev];
        if (updated[idx].quantity < product.stock) {
          updated[idx].quantity += 1;
        }
        return updated;
      } else {
        return [...prev, { product, quantity: 1 }];
      }
    });
    // Open dynamic panel automatically for better visibility of action progress
    setIsCartOpen(true);
  };

  const updateCartQuantity = (productId: string, diff: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.product.id === productId) {
          const newQty = item.quantity + diff;
          if (newQty <= 0) return null;
          if (newQty > item.product.stock) return item; // limit to stock
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter((item): item is CartItem => item !== null);
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  // Pricing calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const shippingCost = cart.length === 0 ? 0 : (shippingForm.courier === 'kilat' ? 50000 : 25000);
  const taxAdminCost = cart.length === 0 ? 0 : 5000; // Fixed admin fee Rp 5.000 Indonesian Rupiah
  const cartTotal = cartSubtotal + shippingCost + taxAdminCost;

  // Valuation simulation
  const handleValuationCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sellForm.brand || !sellForm.specDescription) {
      alert('Mohon lengkapi Brand dan deskripsi ringkas perangkat!');
      return;
    }

    let baseEstimate = 2000000; // Base estimate IDR
    if (sellForm.deviceType === 'server') baseEstimate = 6000000;
    if (sellForm.deviceType === 'networking') baseEstimate = 1200000;
    if (sellForm.deviceType === 'other') baseEstimate = 800000;

    // Apply depreciation based on age
    const ageMultiplier = Math.max(0.3, 1 - (sellForm.ageYears * 0.15));
    let finalBase = baseEstimate * ageMultiplier;

    // Condition influence
    if (sellForm.physicalCondition === 'excellent') finalBase *= 1.2;
    if (sellForm.physicalCondition === 'fair') finalBase *= 0.7;

    if (sellForm.originalBox === 'yes') finalBase *= 1.05;

    // Output range
    const min = Math.round((finalBase * 0.9) / 50000) * 50000;
    const max = Math.round((finalBase * 1.15) / 50000) * 50000;
    
    setEstimatedValueRange({ min, max });
    setSellSuccessMsg(false);
  };

  const submitToHSRValuation = () => {
    setSellSuccessMsg(true);
    // Auto clear after 6 seconds
    setTimeout(() => {
      setSellSuccessMsg(false);
      setEstimatedValueRange(null);
      setSellForm({
        deviceType: 'laptop',
        brand: '',
        specDescription: '',
        ageYears: 1,
        physicalCondition: 'excellent',
        originalBox: 'yes'
      });
    }, 6000);
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingForm.fullName || !shippingForm.phone || !shippingForm.streetAddress || !shippingForm.postalCode) {
      alert('Mohon lengkapi seluruh kolom alamat pengiriman!');
      return;
    }
    setCheckoutStep('qris_payment');
  };

  const handlePaymentConfirm = () => {
    setCheckoutStep('completed');
    // Clear cart
    setCart([]);
  };

  return (
    <div className="bg-transparent min-h-screen pt-24 pb-16 font-sans relative overflow-x-clip">
      {/* Premium Decorative Blur Background Blobs */}
      <div className="absolute top-[5%] left-[-15%] w-[40rem] h-[40rem] rounded-full bg-blue-300/15 blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-[35%] right-[-15%] w-[45rem] h-[45rem] rounded-full bg-teal-200/15 blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] left-[-5%] w-[35rem] h-[35rem] rounded-full bg-indigo-300/15 blur-[130px] pointer-events-none z-0" />
      <div className="absolute bottom-[5%] right-[-5%] w-[38rem] h-[38rem] rounded-full bg-purple-300/10 blur-[140px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <AnimatePresence mode="wait">
          {!activeProduct ? (
            <motion.div
              key="catalog-list"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-12"
            >
              {/* TOP INTRO BANNER */}
        <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden mb-12 shadow-[0_20px_50px_rgba(15,23,42,0.15)] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute inset-0 grid-bg-dark opacity-10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue/30 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="relative z-10 max-w-xl space-y-4">
            <div className="inline-flex items-center gap-1.5 bg-brand-blue/20 text-blue-400 px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border border-brand-blue/30">
              <IconSparkles className="w-3.5 h-3.5" />
              <span>HSR TECH HUB MARKETPLACE v2.10</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-black tracking-tight leading-tight">
              Pusat Jual Beli & Refurbished IT Hardware Premium
            </h1>
            <p className="text-xs text-slate-300 leading-relaxed font-semibold">
              Temukan Switch Enterprise, Laptop Refurbished Kantoran, Drive Storage Kencang, dan CCTV handal dengan jaminan Garansi Resmi & Garansi Toko Terpercaya dari tim Teknisi HSR. Bisa tukar tambah juga!
            </p>
            
            <div className="flex flex-wrap items-center gap-5 pt-2">
              <div className="flex items-center gap-2">
                <IconCheck className="w-4.5 h-4.5 text-emerald-400" />
                <span className="text-[11px] font-bold text-slate-200">Garansi Toko Terjamin</span>
              </div>
              <div className="flex items-center gap-2">
                <IconCheck className="w-4.5 h-4.5 text-emerald-400" />
                <span className="text-[11px] font-bold text-slate-200">QC Lolos Uji Termal & Sirkuit</span>
              </div>
              <div className="flex items-center gap-2">
                <IconCheck className="w-4.5 h-4.5 text-emerald-400" />
                <span className="text-[11px] font-bold text-slate-200">Konsultasi Sebelum Beli</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 w-full md:w-auto shrink-0">
            {/* Quick stats grid inside hero */}
            <div className="grid grid-cols-2 gap-4 bg-slate-950/60 p-6 rounded-3xl border border-white/5 backdrop-blur-sm min-w-[270px]">
              <div>
                <span className="block text-[9px] uppercase tracking-wider font-extrabold text-slate-500">PRODUK TERUJI</span>
                <span className="block text-xl font-black text-white mt-1">100% QC</span>
              </div>
              <div>
                <span className="block text-[9px] uppercase tracking-wider font-extrabold text-slate-500">PENGIRIMAN</span>
                <span className="block text-xl font-black text-emerald-400 mt-1">Sama Hari</span>
              </div>
              <div className="pt-3 border-t border-white/5">
                <span className="block text-[9px] uppercase tracking-wider font-extrabold text-slate-500">STOK SELALU</span>
                <span className="block text-xl font-black text-white mt-1">Sesuai Live</span>
              </div>
              <div className="pt-3 border-t border-white/5">
                <span className="block text-[9px] uppercase tracking-wider font-extrabold text-slate-500">MEMBER CASHBACK</span>
                <span className="block text-xl font-black text-blue-400 mt-1">Up to 10%</span>
              </div>
            </div>
          </div>
        </div>

        {/* TWO-COLUMN LAYOUT: BUY (Product listing) & SELL (Device valuation) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* SEARCH, FILTERS & PRODUCT GRID (Left Area: 8 Columns) */}
          <div className="lg:col-span-8 lg:order-last space-y-8">
            
            {/* ADVANCED SELECTION ENGINE */}
            <div className="bg-white rounded-3xl p-6 shadow-[0_15px_40px_rgba(15,23,42,0.03)] space-y-4">
              
              {/* Search Bar and Category Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <IconSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari router, NAS storage server, switch cisco, Thinkpad..."
                    className="w-full pl-10 pr-16 py-2.5 bg-slate-100/50 hover:bg-slate-100 text-slate-800 rounded-xl border-0 text-xs focus:ring-2 focus:ring-brand-blue/30 focus:bg-white focus:outline-none transition-all placeholder:text-slate-400"
                  />
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                    {!searchQuery && (
                      <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono font-extrabold text-slate-500 bg-slate-200/55 rounded-md select-none border-0">
                        <span className="text-[10px] leading-none">⌘</span>
                        <span className="text-[8px] text-slate-400 font-bold">+</span>
                        <span className="text-[10px] leading-none">K</span>
                      </kbd>
                    )}
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="text-[10px] uppercase font-black text-slate-400 hover:text-slate-700 font-mono cursor-pointer"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Condition filter */}
                <div className="flex gap-1 bg-slate-100/60 p-1 rounded-xl">
                  <button
                    onClick={() => setSelectedCondition('all')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${selectedCondition === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                  >
                    Semua Unit
                  </button>
                  <button
                    onClick={() => setSelectedCondition('baru')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${selectedCondition === 'baru' ? 'bg-white text-slate-905 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                  >
                    Baru (BNIB)
                  </button>
                  <button
                    onClick={() => setSelectedCondition('refurbished')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${selectedCondition === 'refurbished' ? 'bg-white text-slate-905 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                  >
                    Refurbished
                  </button>
                </div>
              </div>

              {/* Category tags row */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mr-2 font-mono">Kategori:</span>
                {[
                  { id: 'all', label: 'Semua Kategori' },
                  { id: 'computing', label: 'Computing' },
                  { id: 'networking', label: 'Networking' },
                  { id: 'storage', label: 'Storage' },
                  { id: 'cctv', label: 'CCTV & Sec' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all hover:scale-102 cursor-pointer border-0 ${
                      selectedCategory === cat.id 
                        ? 'bg-slate-900 text-white shadow-sm font-black' 
                        : 'bg-slate-100/60 hover:bg-slate-100 text-slate-550 hover:text-slate-900'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Price Range Slider */}
              <div className="pt-3 border-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Harga Maksimum:</span>
                  <span className="text-xs font-black font-mono text-brand-blue">
                    Rp {maxPrice.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="flex items-center gap-3 flex-1 max-w-xs">
                  <span className="text-[9px] font-bold text-slate-400 font-mono">Rp 500k</span>
                  <input
                    type="range"
                    min={500000}
                    max={6000000}
                    step={250000}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-blue"
                  />
                  <span className="text-[9px] font-bold text-slate-400 font-mono">Rp 6M+</span>
                </div>
              </div>

            </div>

            {/* PRODUCT GRID LISTINGS */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-16 text-center shadow-[0_15px_40px_rgba(15,23,42,0.03)] flex flex-col items-center justify-center space-y-4">
                <IconPackage className="w-12 h-12 text-slate-350 stroke-[1.5]" />
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800">Tidak Ada Produk yang Cocok</h3>
                  <p className="text-[11px] text-slate-500 mt-1 font-medium max-w-sm">
                    Kami tidak dapat menemukan produk yang sesuai dengan filter atau kueri pencarian Anda. Coba kurangi keyword atau naikkan batas harga.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedCondition('all');
                    setMaxPrice(6000000);
                  }}
                  className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Reset Semua Filter
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((p) => (
                    <motion.div 
                      layout
                      key={p.id}
                      id={`product-${p.id}`}
                      onClick={() => setActiveProduct(p)}
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ 
                        duration: 0.22,
                        ease: "easeInOut"
                      }}
                      whileHover={{ 
                        y: -5,
                        transition: { duration: 0.2, ease: "easeOut" }
                      }}
                      className="bg-white/70 backdrop-blur-md rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_25px_60px_rgba(15,23,42,0.07)] flex flex-col justify-between group transition-shadow duration-300 cursor-pointer relative border border-white/40"
                    >
                    
                    {/* Upper Thumbnail Area */}
                    <div className="relative h-48 overflow-hidden bg-slate-100 shrink-0">
                      
                      {/* Product dynamic category badge left */}
                      <span className="absolute top-4.5 left-4.5 z-10 px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase tracking-widest text-[#2563eb] bg-[#eff6ff] border border-blue-100 shadow-sm">
                        {p.brand}
                      </span>

                      {/* Condition badge right */}
                      <span className={`absolute top-4.5 right-4.5 z-10 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider shadow-sm ${
                        p.condition === 'baru' 
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                          : 'bg-amber-50 text-amber-600 border border-amber-100'
                      }`}>
                        {p.condition === 'baru' ? 'BARU' : 'REFURBISHED'}
                      </span>

                      <img 
                        src={p.image}
                        alt={p.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Premium Hover Details Overlay */}
                      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                        <span className="bg-white/95 text-slate-900 text-[11px] font-black px-4 py-2 rounded-xl shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-1.5 uppercase tracking-wider">
                          <IconEye className="w-3.5 h-3.5 text-brand-blue" />
                          <span>Lihat Detail</span>
                        </span>
                      </div>
                    </div>

                    {/* Lower Description Area */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      
                      <div className="space-y-1.5">
                        <span className="block text-[10px] font-bold text-slate-400 uppercase font-mono">{p.categoryLabel}</span>
                        <h4 
                          className="font-display font-bold text-slate-800 text-sm leading-snug group-hover:text-brand-blue transition-colors line-clamp-2"
                        >
                          {p.name}
                        </h4>
                        
                        {/* Specifications list (truncated previews) */}
                        <ul className="space-y-1 pt-1.5">
                          {p.specification.slice(0, 3).map((spec, sidx) => (
                            <li key={sidx} className="flex items-center gap-1.5 text-[10.5px] text-slate-550 font-medium">
                              <span className="w-1 h-1 rounded-full bg-slate-300" />
                              <span className="truncate">{spec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Price and Add button footer */}
                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="block text-[9px] text-slate-400 font-bold uppercase">Harga Pas</span>
                          <span className="block text-sm font-black text-slate-850 font-mono mt-0.5">
                            Rp {p.price.toLocaleString('id-ID')}
                          </span>
                        </div>
                        
                        {/* Interactive Buttons block */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveProduct(p);
                            }}
                            className="p-2 border border-slate-200 hover:border-slate-350 hover:bg-slate-50 rounded-xl text-slate-500 hover:text-slate-800 transition-colors cursor-pointer text-xs"
                            title="Detail Spesifikasi"
                          >
                            <IconInfoCircle className="w-4 h-4" />
                          </button>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(p);
                            }}
                            className="bg-brand-blue hover:bg-brand-blue/90 text-white font-extrabold px-3 py-2 rounded-xl text-[11px] flex items-center gap-1.5 transition-all shadow-sm shadow-blue-500/10 cursor-pointer active:scale-95"
                          >
                            <IconShoppingCart className="w-3.5 h-3.5" />
                            <span>Beli</span>
                          </button>
                        </div>
                      </div>

                    </div>

                  </motion.div>
                ))}
                </AnimatePresence>
              </div>
            )}

          </div>

          {/* RIGHT SIDEBAR: "JUAL UNIT ANDA" INSTANT VALUATION (Right Area: 4 Columns) */}
          <div className="lg:col-span-4 lg:order-first lg:sticky lg:top-28 space-y-8 self-start">
            
            {/* VALUASI MANDIRI SECTION CARD */}
            <div className="bg-white rounded-3xl p-6 shadow-[0_15px_40px_rgba(15,23,42,0.03)] border border-slate-200/50 space-y-5">
              
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1 text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded tracking-widest uppercase">
                  <IconCoins className="w-3 h-3" />
                  <span>C2B IT Trade-In</span>
                </span>
                <h3 className="font-display font-extrabold text-slate-800 text-sm tracking-wide">
                  Ingin Jual Hardware IT Bekas?
                </h3>
                <p className="text-[11px] text-slate-550 leading-relaxed font-sans font-medium">
                  HSR Technology menerima pembelian/tukar tambah server, switch Cisco, router, atau laptop bekas kantor Anda. Hitung estimasi harga beli kami di bawah secara instan!
                </p>
              </div>

              {/* Form Input calculation */}
              <form onSubmit={handleValuationCalculate} className="space-y-4 pt-1 border-t border-slate-55">
                
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1.5">Jenis Perangkat</label>
                  <select
                    value={sellForm.deviceType}
                    onChange={(e) => setSellForm(prev => ({ ...prev, deviceType: e.target.value }))}
                    className="w-full bg-slate-50 text-xs text-slate-700 p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-blue"
                  >
                    <option value="laptop">Laptop / Komputer PC</option>
                    <option value="networking">Router / Switch / AP</option>
                    <option value="server">Server Enterprise / Storage NAS</option>
                    <option value="other">CCTV / Monitor / Aksesoris</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1.5">Merek & Seri Resmi</label>
                  <input
                    type="text"
                    required
                    placeholder="misal: Lenovo ThinkPad T490, Cisco 2960"
                    value={sellForm.brand}
                    onChange={(e) => setSellForm(prev => ({ ...prev, brand: e.target.value }))}
                    className="w-full bg-slate-50 text-xs text-slate-700 p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1.5">Deskripsi Singkat Spesifikasi</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="misal: RAM 8GB, SSD 256GB, layar ada dent sedikit, baterai bocor..."
                    value={sellForm.specDescription}
                    onChange={(e) => setSellForm(prev => ({ ...prev, specDescription: e.target.value }))}
                    className="w-full bg-slate-50 text-xs text-slate-700 p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-blue resize-none leading-relaxed font-sans"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1.5">Umur Unit</label>
                    <select
                      value={sellForm.ageYears}
                      onChange={(e) => setSellForm(prev => ({ ...prev, ageYears: Number(e.target.value) }))}
                      className="w-full bg-slate-50 text-xs text-slate-700 p-2.5 rounded-xl border border-slate-200 focus:outline-none"
                    >
                      <option value={1}>Di bawah 1 Tahun</option>
                      <option value={2}>1 - 2 Tahun</option>
                      <option value={3}>2 - 3 Tahun</option>
                      <option value={5}>Di atas 4 Tahun</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1.5">Dus BOX Asli</label>
                    <select
                      value={sellForm.originalBox}
                      onChange={(e) => setSellForm(prev => ({ ...prev, originalBox: e.target.value }))}
                      className="w-full bg-slate-50 text-xs text-slate-700 p-2.5 rounded-xl border border-slate-200 focus:outline-none"
                    >
                      <option value="yes">Ada Dus & Kelengkapan</option>
                      <option value="no">Batangan / Tanpa Dus</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1.5">Kondisi Fisik Perangkat</label>
                  <div className="grid grid-cols-3 gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200">
                    {[
                      { id: 'excellent', label: 'Super Mulus' },
                      { id: 'good', label: 'Lecet Wajar' },
                      { id: 'fair', label: 'Ada Minus' }
                    ].map(cond => (
                      <button
                        key={cond.id}
                        type="button"
                        onClick={() => setSellForm(prev => ({ ...prev, physicalCondition: cond.id }))}
                        className={`py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${sellForm.physicalCondition === cond.id ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'}`}
                      >
                        {cond.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-slate-900 hover:bg-slate-850 text-white text-xs font-black rounded-xl transition-all shadow-sm cursor-pointer"
                >
                  Dapatkan Kalkulasi Penawaran
                </button>
              </form>

              {/* CALCULATION RESULTS SHOWCASE */}
              <AnimatePresence>
                {estimatedValueRange && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-slate-950 text-white rounded-2xl p-4 space-y-3.5 border border-slate-800"
                  >
                    <div>
                      <span className="block text-[9px] uppercase tracking-wider font-extrabold text-[#38bdf8] font-mono">ESTIMASI KURS CASHBACK HSR:</span>
                      <div className="flex items-baseline gap-1 mt-1 font-mono">
                        <span className="text-sm font-bold text-slate-300">Rp</span>
                        <strong className="text-xl font-black text-[#38bdf8]">{estimatedValueRange.min.toLocaleString('id-ID')}</strong>
                        <span className="text-xs text-slate-400 px-1">—</span>
                        <strong className="text-xl font-black text-rose-400">{estimatedValueRange.max.toLocaleString('id-ID')}</strong>
                      </div>
                      <p className="text-[10px] text-slate-400 leading-normal font-sans pt-1 font-medium">
                        *Estimasi bersifat indikatif berdasarkan spesifikasi masukan. Nilai final akan ditentukan oleh Teknisi HSR setelah uji fungsi fisik di workbench kami.
                      </p>
                    </div>

                    {!sellSuccessMsg ? (
                      <button
                        onClick={submitToHSRValuation}
                        className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <span>Ajukan Penjualan / Ambil Penawaran</span>
                        <IconArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-emerald-950/60 border border-emerald-800/40 p-3 rounded-xl text-center text-[10.5px] text-emerald-400 font-semibold"
                      >
                        ✓ Pengajuan Penilaian Berhasil Disimpan! CS HSR akan menghubungi Anda via WhatsApp dalam waktu maks 1 jam untuk verifikasi kelanjutan jemput perangkat.
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* QUICK CONTACT OR WHY BUY FROM US WIDGET */}
            <div className="bg-slate-900 text-white p-6 rounded-3xl relative overflow-hidden space-y-4">
              <div className="absolute inset-0 grid-bg-dark opacity-10 pointer-events-none" />
              <div className="space-y-1">
                <span className="text-[9px] uppercase tracking-widest font-extrabold text-blue-400">FAKTOR REPUTASI</span>
                <h4 className="font-bold text-sm text-white">Kenapa Belu Refurbished di HSR?</h4>
              </div>

              <div className="space-y-3 text-xs leading-relaxed">
                <div className="flex gap-3">
                  <IconShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <h5 className="font-bold text-[11px] text-slate-100">Kondisi Bersertifikasi</h5>
                    <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">Setiap sirkuit papan dan daya diuji ketat menggunakan multitester & stress-test termal.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <IconTruck className="w-5 h-5 text-indigo-400 shrink-0" />
                  <div>
                    <h5 className="font-bold text-[11px] text-slate-100">Layanan Antar-Pasang</h5>
                    <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">Khusus wilayah Jakarta Barat & sekitarnya, teknisi kami siap antar dan langsung instalasi on-site.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* EXTERNAL MARKETPLACES SECTION */}
        <div className="mt-16 bg-slate-100/60 rounded-3xl p-8 border border-slate-200/50 shadow-[0_4px_24px_rgba(15,23,42,0.01)] text-slate-800">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-black text-brand-blue bg-blue-50/50 text-[#2563eb] px-3.5 py-1 rounded-full uppercase tracking-wider border border-blue-100">
              <IconShoppingBag className="w-3.5 h-3.5" />
              <span>OFFICIAL MERCHANT PARTNERS</span>
            </span>
            <h3 className="font-display font-extrabold text-slate-850 text-lg sm:text-xl md:text-2xl mt-2 tracking-tight">
              Anda dapat temukan produk kami di marketplace
            </h3>
            <p className="text-xs text-slate-550 leading-relaxed max-w-xl mx-auto font-medium font-sans">
              Selain melalui sistem pemesanan online langsung di website kami, HSR Technology juga hadir secara resmi di berbagai e-commerce terpopuler di Indonesia untuk kemudahan transaksi Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-4xl mx-auto">
            {/* Tokopedia */}
            <a
              href="https://tokopedia.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-emerald-50/10 border border-slate-100 hover:border-emerald-500/30 p-6 rounded-2xl flex flex-col items-center text-center space-y-3.5 transition-all duration-300 group hover:-translate-y-1 shadow-[0_8px_30px_rgba(15,23,42,0.02)]"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold font-sans text-xl group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                T
              </div>
              <div>
                <span className="block font-bold text-slate-800 text-xs font-sans group-hover:text-emerald-600 transition-colors">Tokopedia</span>
                <span className="block text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-wider">HSR Tech Official</span>
              </div>
            </a>

            {/* Shopee */}
            <a
              href="https://shopee.co.id"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-orange-50/10 border border-slate-100 hover:border-orange-500/30 p-6 rounded-2xl flex flex-col items-center text-center space-y-3.5 transition-all duration-300 group hover:-translate-y-1 shadow-[0_8px_30px_rgba(15,23,42,0.02)]"
            >
              <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center font-bold font-sans text-xl group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                S
              </div>
              <div>
                <span className="block font-bold text-slate-800 text-xs font-sans group-hover:text-orange-600 transition-colors">Shopee</span>
                <span className="block text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-wider">HSR Tech Official</span>
              </div>
            </a>

            {/* Lazada */}
            <a
              href="https://lazada.co.id"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-blue-50/10 border border-slate-100 hover:border-blue-500/30 p-6 rounded-2xl flex flex-col items-center text-center space-y-3.5 transition-all duration-300 group hover:-translate-y-1 shadow-[0_8px_30px_rgba(15,23,42,0.02)]"
            >
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold font-sans text-xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                L
              </div>
              <div>
                <span className="block font-bold text-slate-800 text-xs font-sans group-hover:text-blue-600 transition-colors">Lazada</span>
                <span className="block text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-wider">HSR Technology</span>
              </div>
            </a>
          </div>

          {/* Explanation block about price differences */}
          <div className="mt-8 max-w-3xl mx-auto bg-amber-50/50 border border-amber-200/50 rounded-2xl p-5 flex gap-4 items-start">
            <div className="p-2 bg-amber-100 text-amber-700 rounded-xl shrink-0 mt-0.5">
              <IconInfoCircle className="w-4.5 h-4.5" />
            </div>
            <div className="space-y-2 text-left">
              <h5 className="font-bold text-[11px] text-amber-900 uppercase tracking-widest font-mono">PEMBERITAHUAN SELISIH HARGA PLATFORM:</h5>
              <p className="text-[11px] text-amber-850 leading-relaxed font-sans font-medium">
                Harap maklum apabila terdapat kemungkinan perbedaan penawaran harga unit antara website resmi ini dengan marketplace kami (Tokopedia, Shopee, Lazada). Perubahan estimasi atau selisih harga tersebut umumnya disebabkan oleh beberapa faktor berikut:
              </p>
              <ul className="list-disc pl-5 text-[11px] text-amber-800 leading-relaxed space-y-1.5 font-sans font-medium">
                <li>
                  <strong className="text-amber-900">Biaya Layanan Administrasi Platform:</strong> Pemotongan komisi merchant (merchant fees) atau biaya layanan overhead dari masing-masing pihak e-commerce/marketplace berkisar antara 2% hingga 6.5%.
                </li>
                <li>
                  <strong className="text-amber-900">Voucher & Diskon Eksklusif App:</strong> Adanya promosi flash sale berkala, program cashback gila-gilaan dari marketplace bersangkutan, voucher bundling dari platform, atau potongan khusus pembayaran bank tertentu.
                </li>
                <li>
                  <strong className="text-amber-900">Skema Garansi & Subsidi Ongkir:</strong> Ketentuan pengantaran cargo internal terintegrasi HSR Technology yang berbeda dengan asuransi & ekspedisi pengiriman reguler/cargo pihak ketiga di marketplace.
                </li>
              </ul>
              <div className="pt-2 border-t border-amber-200/30 text-[10.5px] text-amber-705 font-medium leading-normal">
                *Kami sangat menyarankan pembelian perangkat bernilai di atas Rp 10 Juta dilakukan langsung melalui platform internal ini atau konsultasi WhatsApp kami guna mendapatkan harga dasar korporasi (B2B Price) yang bebas biaya administrasi platform.
              </div>
            </div>
          </div>
        </div>

            </motion.div>
          ) : (
            <motion.div
              key="pdp-details"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <button
                onClick={() => setActiveProduct(null)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white text-xs font-bold text-slate-700 hover:text-brand-blue border rounded-xl shadow-[0_2px_8px_rgba(15,23,42,0.04)] hover:shadow-md transition-all cursor-pointer self-start"
              >
                <IconArrowLeft className="w-4 h-4 text-[#2563eb]" />
                <span>Kembali ke Katalog Jual Beli</span>
              </button>

              <div className="bg-white rounded-[2.5rem] p-6 sm:p-8 md:p-12 border border-slate-200/50 shadow-[0_15px_40px_rgba(15,23,42,0.03)] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                
                {/* Left aspect: image frame & trust marks */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 relative shadow-inner aspect-square flex items-center justify-center">
                    <img 
                      src={activeProduct.image}
                      alt={activeProduct.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-4 left-4 bg-slate-950 text-white text-[10px] uppercase font-black font-mono px-3.5 py-1.5 rounded-xl tracking-wider">
                      {activeProduct.categoryLabel}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-emerald-50/50 border border-emerald-100 p-2.5 rounded-2xl text-center space-y-1">
                      <IconShieldCheck className="w-5 h-5 text-emerald-600 mx-auto" />
                      <span className="block text-[9px] font-black uppercase text-emerald-800">Garansi Toko</span>
                      <span className="block text-[9.5px] font-bold text-slate-500 leading-none">{activeProduct.warranty}</span>
                    </div>
                    <div className="bg-blue-50/50 border border-blue-100 p-2.5 rounded-2xl text-center space-y-1">
                      <IconTruck className="w-5 h-5 text-blue-600 mx-auto" />
                      <span className="block text-[9px] font-black uppercase text-blue-800">Instan Delivery</span>
                      <span className="block text-[9.5px] font-bold text-slate-500 leading-none">Ready Send</span>
                    </div>
                    <div className="bg-amber-50/50 border border-amber-100 p-2.5 rounded-2xl text-center space-y-1">
                      <IconSparkles className="w-5 h-5 text-amber-600 mx-auto" />
                      <span className="block text-[9px] font-black uppercase text-amber-800">QC Level</span>
                      <span className="block text-[9.5px] font-bold text-slate-500 leading-none">Teruji 100%</span>
                    </div>
                  </div>
                </div>

                {/* Right aspect: core layout & shopping context */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                  <div className="space-y-6">
                    <div>
                      <span className="text-[10px] font-black uppercase text-[#2563eb] tracking-widest font-mono bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                        Merek Resmi: {activeProduct.brand}
                      </span>
                      <h1 className="font-display font-black text-slate-900 text-xl sm:text-2xl lg:text-3xl mt-4 tracking-tight leading-tight">
                        {activeProduct.name}
                      </h1>
                    </div>

                    <div className="border-t border-b border-dashed border-slate-200 py-5">
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans font-medium">
                        {activeProduct.description}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider font-mono">Spesifikasi Lengkap Unit:</span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-slate-50 p-5 rounded-[2rem] border border-slate-100 shadow-inner">
                        {activeProduct.specification.map((spec, sidx) => (
                          <div key={sidx} className="flex items-start gap-3 text-slate-705">
                            <div className="p-1 rounded-full bg-emerald-100 text-emerald-600 shrink-0 mt-0.5 animate-pulse">
                              <IconCheck className="w-3 h-3" />
                            </div>
                            <span className="font-semibold font-sans text-xs leading-relaxed text-slate-805">{spec}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-150">
                        <span className="block text-slate-400 text-[10px] font-bold uppercase tracking-wider font-mono">Ketentuan Garansi</span>
                        <span className="block text-slate-850 font-black text-xs sm:text-sm mt-1">{activeProduct.warranty}</span>
                      </div>
                      <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-150">
                        <span className="block text-slate-400 text-[10px] font-bold uppercase tracking-wider font-mono">Ketersediaan Stok</span>
                        <span className={`block font-black text-xs sm:text-sm mt-1 ${activeProduct.stock <= 3 ? 'text-rose-500 font-bold' : 'text-slate-850'}`}>
                          {activeProduct.stock} Unit Ready
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50 -mx-6 -mb-6 p-6 sm:-mx-8 sm:-mb-8 sm:p-8 lg:-mx-12 lg:-mb-12 lg:p-12 sm:rounded-b-[2.5rem]">
                    <div>
                      <span className="block text-[10px] text-slate-400 uppercase font-black tracking-wider font-mono">Harga Spesial (Corporate B2B Rate)</span>
                      <strong className="block text-2xl sm:text-3xl font-black text-rose-600 font-mono mt-1">
                        Rp {activeProduct.price.toLocaleString('id-ID')}
                      </strong>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          addToCart(activeProduct);
                          setIsCartOpen(true);
                        }}
                        className="flex-1 sm:flex-initial py-3.5 px-6 bg-slate-950 hover:bg-slate-850 text-white hover:text-teal-400 text-xs font-black rounded-xl transition-all shadow cursor-pointer flex items-center justify-center gap-2 active:scale-95 animate-bounce"
                      >
                        <IconShoppingCart className="w-4 h-4 text-teal-400 animate-pulse" />
                        <span>Beli & Tambah ke Keranjang</span>
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* FLOAT ACTION FLOATING CART BUTTON (Fixed bottom left/right) */}
      <div className="fixed bottom-24 right-6 z-40">
        <motion.button
          onClick={() => setIsCartOpen(true)}
          className="w-13 h-13 rounded-full bg-slate-950 text-white flex items-center justify-center relative shadow-2xl shadow-slate-950/40 border border-slate-800 transition-transform active:scale-95 cursor-pointer"
          whileHover={{ scale: 1.05 }}
        >
          <IconShoppingBag className="w-5 h-5 text-teal-400" />
          
          {/* Cart items counter overlay */}
          {cart.length > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-900 animate-bounce">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </motion.button>
      </div>



      {/* SHOPPING CART DRAWER / SLIDING PANEL (Right Drawer Overlay) */}
      <AnimatePresence>
        {isCartOpen && (
          <div 
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm"
          >
            {/* Drawer Body */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col justify-between overflow-hidden"
            >
                       {/* Drawer Title Block */}
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-slate-900 rounded-xl text-white">
                    <IconShoppingBag className="w-4 h-4 text-teal-400" />
                  </div>
                  <div>
                    <h3 className="font-display font-black text-slate-900 text-sm">Keranjang Belanja</h3>
                    <span className="block text-[10px] text-slate-505 font-bold uppercase tracking-wider mt-0.5">ESTIMATED BILLING STATEMENT</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 rounded-lg bg-white border text-slate-400 hover:text-slate-800 hover:bg-slate-50 cursor-pointer"
                >
                  <IconX className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Content Area (Scrollable items / Checkout flow) */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* CHECKOUT PROGRESS TRACKERS */}
                {cart.length > 0 && (
                  <div className="flex items-center justify-between text-[10px] uppercase font-bold text-slate-400 border-b pb-3 border-dashed">
                    <span className={checkoutStep === 'idle' ? 'text-brand-blue font-black' : 'text-emerald-500'}>1. Keranjang</span>
                    <span className="text-slate-300">→</span>
                    <span className={checkoutStep === 'shipping' ? 'text-brand-blue font-black' : (checkoutStep === 'qris_payment' || checkoutStep === 'completed' ? 'text-emerald-500' : 'text-slate-400')}>2. Alamat</span>
                    <span className="text-slate-300">→</span>
                    <span className={checkoutStep === 'qris_payment' ? 'text-brand-blue font-black' : (checkoutStep === 'completed' ? 'text-emerald-500' : 'text-slate-400')}>3. Pembayaran</span>
                    <span className="text-slate-300">→</span>
                    <span className={checkoutStep === 'completed' ? 'text-brand-blue font-black text-emerald-500' : 'text-slate-400'}>4. Selesai</span>
                  </div>
                )}

                {/* CONDITION 1: Cart is completely empty */}
                {cart.length === 0 && checkoutStep !== 'completed' && (
                  <div className="flex flex-col items-center justify-center text-center py-16 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center border border-dashed text-slate-300">
                      <IconShoppingCart className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-700 text-sm">Keranjang Anda Kosong</h4>
                      <p className="text-[11px] text-slate-400 mt-1 max-w-xs leading-normal font-sans font-medium">
                        Model perbaikan & penjualan suku cadang siap sedia. Tambahkan unit perangkat keras atau spareparts terlebih dahulu.
                      </p>
                    </div>
                  </div>
                )}

                {/* CONDITION 2: Cart has items & checkout step is IDLE (Reviewing items list) */}
                {cart.length > 0 && checkoutStep === 'idle' && (
                  <div className="space-y-4">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Review Unit Belanja</span>
                    <div className="divide-y divide-slate-100">
                      {cart.map(item => (
                        <div key={item.product.id} className="py-4.5 flex gap-4 first:pt-0 last:pb-0 font-sans">
                          <img 
                            src={item.product.image}
                            alt={item.product.name}
                            referrerPolicy="no-referrer"
                            className="w-14 h-14 object-cover rounded-xl border shrink-0 bg-slate-50"
                          />
                          <div className="flex-1 flex flex-col justify-between min-w-0">
                            <div>
                              <h5 className="font-extrabold text-slate-800 text-xs truncate">{item.product.name}</h5>
                              <p className="text-[10px] text-slate-400 uppercase font-mono mt-0.5">{item.product.brand} • {item.product.condition === 'baru' ? 'Baru' : 'Refurbished'}</p>
                            </div>
                            <div className="flex justify-between items-center pt-2">
                              <span className="font-mono text-xs font-bold text-slate-700">
                                Rp {(item.product.price * item.quantity).toLocaleString('id-ID')}
                              </span>
                              
                              {/* Quantity selection buttons */}
                              <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-150 px-2 py-0.5 rounded-lg shrink-0">
                                <button
                                  onClick={() => updateCartQuantity(item.product.id, -1)}
                                  className="p-0.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded cursor-pointer"
                                >
                                  <IconMinus className="w-3 h-3" />
                                </button>
                                <span className="font-mono font-bold text-xs text-slate-805 select-none">{item.quantity}</span>
                                <button
                                  onClick={() => updateCartQuantity(item.product.id, 1)}
                                  className="p-0.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded cursor-pointer"
                                >
                                  <IconPlus className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                          
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-slate-350 hover:text-rose-600 p-1 rounded-lg hover:bg-rose-50 cursor-pointer self-start shrink-0 transition-colors"
                          >
                            <IconTrash className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CONDITION 3: SHIPPING ADDRESS FORM */}
                {checkoutStep === 'shipping' && (
                  <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Alamat Pengiriman Cargo</span>
                    
                    <div>
                      <label className="block text-[9.5px] uppercase font-bold text-slate-500 mb-1">Nama Lengkap Penerima</label>
                      <input
                        type="text"
                        required
                        value={shippingForm.fullName}
                        onChange={(e) => setShippingForm(prev => ({ ...prev, fullName: e.target.value }))}
                        placeholder="Hasan Suryaman"
                        className="w-full bg-slate-50 text-xs text-slate-800 p-2.5 rounded-xl border focus:outline-none focus:border-brand-blue"
                      />
                    </div>

                    <div>
                      <label className="block text-[9.5px] uppercase font-bold text-slate-500 mb-1">No. Handphone Aktif</label>
                      <input
                        type="tel"
                        required
                        value={shippingForm.phone}
                        onChange={(e) => setShippingForm(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="0812-3456-7890"
                        className="w-full bg-slate-50 text-xs text-slate-800 p-2.5 rounded-xl border focus:outline-none focus:border-brand-blue font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[9.5px] uppercase font-bold text-slate-500 mb-1">Alamat Jalan Lengkap & Komplek</label>
                      <textarea
                        rows={3}
                        required
                        value={shippingForm.streetAddress}
                        onChange={(e) => setShippingForm(prev => ({ ...prev, streetAddress: e.target.value }))}
                        placeholder="Jl. Grogol Petamburan No. X, Komplek Y, RT.01/RW.02"
                        className="w-full bg-slate-50 text-xs text-slate-800 p-2.5 rounded-xl border focus:outline-none focus:border-brand-blue resize-none font-sans leading-relaxed"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9.5px] uppercase font-bold text-slate-500 mb-1">Kota / Kotamadya</label>
                        <select
                          value={shippingForm.city}
                          onChange={(e) => setShippingForm(prev => ({ ...prev, city: e.target.value }))}
                          className="w-full bg-slate-50 text-xs text-slate-800 p-2.5 rounded-xl border focus:outline-none focus:border-brand-blue"
                        >
                          <option value="Jakarta Barat">Jakarta Barat</option>
                          <option value="Jakarta Selatan">Jakarta Selatan</option>
                          <option value="Jakarta Pusat">Jakarta Pusat</option>
                          <option value="Jakarta Utara">Jakarta Utara</option>
                          <option value="Jakarta Timur">Jakarta Timur</option>
                          <option value="Tangerang">Tangerang</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[9.5px] uppercase font-bold text-slate-500 mb-1">Kode Pos</label>
                        <input
                          type="text"
                          required
                          value={shippingForm.postalCode}
                          onChange={(e) => setShippingForm(prev => ({ ...prev, postalCode: e.target.value }))}
                          placeholder="11440"
                          className="w-full bg-slate-50 text-xs text-slate-800 p-2.5 rounded-xl border focus:outline-none focus:border-brand-blue font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[9.5px] uppercase font-bold text-slate-500 mb-1.5">Layanan Kurir Cargo</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setShippingForm(prev => ({ ...prev, courier: 'reguler' }))}
                          className={`p-3 text-left rounded-xl border transition-all cursor-pointer ${
                            shippingForm.courier === 'reguler' 
                              ? 'bg-slate-900 border-slate-900 text-white' 
                              : 'bg-slate-50 border-slate-200 text-slate-700'
                          }`}
                        >
                          <span className="block font-bold text-[11px] uppercase">Cargo Reguler</span>
                          <span className="block text-[9.5px] opacity-80 mt-0.5">Rp 25.000 | 2-3 Hari Kerja</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setShippingForm(prev => ({ ...prev, courier: 'kilat' }))}
                          className={`p-3 text-left rounded-xl border transition-all cursor-pointer ${
                            shippingForm.courier === 'kilat' 
                              ? 'bg-slate-900 border-slate-900 text-white' 
                              : 'bg-slate-50 border-slate-200 text-slate-700'
                          }`}
                        >
                          <span className="block font-bold text-[11px] uppercase">Kurir Instan Kilat</span>
                          <span className="block text-[9.5px] opacity-80 mt-0.5 font-bold text-amber-500">Rp 50.000 | Hari yg Sama</span>
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="hidden" // Triggered by external button in drawer footer
                      id="submit-shipping-form-btn"
                    />

                  </form>
                )}

                {/* CONDITION 4: QRIS PAYMENT / SIMULATION CHECKOUT */}
                {checkoutStep === 'qris_payment' && (
                  <div className="space-y-6 text-center">
                    <div className="space-y-1">
                      <span className="block text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded uppercase tracking-wider inline-block">
                        OFFLINE TRANSACTION SIMULATOR
                      </span>
                      <h4 className="font-extrabold text-slate-800 text-xs">Pindai Kode QRIS HSR Technology</h4>
                      <p className="text-[10px] text-slate-500 leading-normal max-w-xs mx-auto font-medium font-sans">
                        Pindai QRIS resmi di bawah ini menggunakan GoPay, OVO, Dana, LinkAja, atau aplikasi m-Banking Anda.
                      </p>
                    </div>

                    {/* QR Code Container styled elegantly */}
                    <div className="max-w-[190px] mx-auto bg-slate-50 p-4 border rounded-3xl relative overflow-hidden shadow-sm flex flex-col items-center">
                      <div className="bg-slate-950 p-2.5 rounded-2xl relative border border-slate-800">
                        {/* Simulated QR Code matrix vectors */}
                        <IconQrcode className="w-32 h-32 text-white" />
                      </div>
                      <span className="text-[8px] font-mono font-extrabold tracking-widest text-slate-500 uppercase mt-2">NMID: HSR_OFFICIAL_QRIS</span>
                    </div>

                    {/* Bank Transfer alternative options */}
                    <div className="bg-slate-50 rounded-2xl p-4 text-left border border-slate-100 space-y-2">
                      <span className="block text-[9.5px] font-bold text-slate-400 uppercase tracking-widest font-mono">ALTERNATIF: MANUAL TRANSFER BANK</span>
                      <div className="flex justify-between items-center text-xs text-slate-707">
                        <span>Bank Central Asia (BCA)</span>
                        <strong className="font-mono text-slate-900">012-3445-6789</strong>
                      </div>
                      <div className="flex justify-between items-center text-xs text-[#dc2626] font-bold">
                        <span>Atas Nama Penerima</span>
                        <span>CV HSR UTAMA</span>
                      </div>
                    </div>

                    {/* Simulation tools reminder */}
                    <div className="p-3.5 bg-cyan-50 border border-cyan-100 rounded-2xl text-[10px] text-slate-650 font-sans leading-relaxed text-left flex gap-2">
                       <IconInfoCircle className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                      <div>
                        Ini adalah simulasi pembelian e-commerce resmi HSR. Klik <strong>"Sudah Konfirmasi Pembayaran"</strong> untuk menyelesaikan simulasi pesanan Anda dan mendapatkan rincian kuitansi pengiriman instan.
                      </div>
                    </div>
                  </div>
                )}

                {/* CONDITION 5: ORDER COMPLETED SUCCESS SHEET */}
                {checkoutStep === 'completed' && (
                  <div className="space-y-6 text-center py-12">
                    <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                      <IconCheck className="w-7 h-7" />
                    </div>

                    <div className="space-y-2 font-sans">
                      <h4 className="font-display font-black text-slate-900 text-sm">Pesanan Sukses Diterima!</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed max-w-xs mx-auto font-medium">
                        Terima kasih, <strong>{shippingForm.fullName}</strong>. Pembayaran Anda telah kami verifikasi secara otomatis. Kami sedang mempersiapkan paket dan suku cadang kargo untuk dikirim ke Alamat Anda.
                      </p>
                    </div>

                    {/* Mock shipping ticket badge */}
                    <div className="bg-slate-950 font-mono text-left p-4 rounded-2xl border border-slate-800 space-y-1.5 text-[11px]">
                      <div>
                        <span className="text-slate-550 block text-[9px] uppercase">KODE PELACAKAN (TRACKING ID)</span>
                        <span className="text-[#38bdf8] font-bold block mt-0.5">TRK-HSR{Math.floor(Math.random() * 900000 + 100000)}</span>
                      </div>
                      <div className="pt-2 border-t border-slate-900">
                        <span className="text-slate-550 block text-[9px] uppercase">ALAMAT TUJUAN EXPEDISI</span>
                        <span className="text-slate-350 block leading-normal mt-0.5">{shippingForm.streetAddress}, {shippingForm.postalCode}</span>
                      </div>
                    </div>

                    <div className="pt-4 flex flex-col gap-2">
                      <button
                        onClick={() => {
                          setCheckoutStep('idle');
                          setIsCartOpen(false);
                        }}
                        className="w-full py-2.5 bg-slate-950 text-white rounded-xl text-xs font-bold hover:bg-slate-850 cursor-pointer"
                      >
                        Kembali ke Produk
                      </button>
                    </div>
                  </div>
                )}

              </div>

              {/* Drawer Sticky Footer (Summary and CTA triggers) */}
              {cart.length > 0 && checkoutStep !== 'completed' && (
                <div className="p-6 border-t border-slate-150 bg-slate-50 space-y-4">
                  
                  {/* Detailed calculated subheadings */}
                  <div className="space-y-2 text-xs font-sans">
                    <div className="flex justify-between text-slate-550">
                      <span>Subtotal Unit Hardware</span>
                      <span className="font-mono font-bold text-slate-800">Rp {cartSubtotal.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between text-slate-550">
                      <span>Biaya Pengantaran / Cargo</span>
                      <span className="font-mono font-bold text-slate-800">Rp {shippingCost.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between text-slate-550">
                      <span>Biaya Administrasi Pajak</span>
                      <span className="font-mono font-semibold text-slate-850 font-mono">Rp {taxAdminCost.toLocaleString('id-ID')}</span>
                    </div>
                    
                    <div className="pt-3 border-t border-dashed border-slate-200 flex justify-between text-slate-900">
                      <strong className="font-extrabold text-[#1e293b]">TOTAL PEMBAYARAN</strong>
                      <span className="font-mono text-sm font-black text-rose-600">Rp {cartTotal.toLocaleString('id-ID')}</span>
                    </div>
                  </div>

                  {/* Primary context action triggers based on steps */}
                  {checkoutStep === 'idle' && (
                    <button
                      onClick={() => setCheckoutStep('shipping')}
                      className="w-full py-3 bg-slate-900 hover:bg-slate-850 text-white text-xs font-black rounded-xl transition-all shadow cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>Lanjutkan ke Alamat Pengiriman</span>
                      <IconArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {checkoutStep === 'shipping' && (
                    <div className="flex gap-3">
                      <button
                        onClick={() => setCheckoutStep('idle')}
                        className="py-3 px-4 border border-slate-300 rounded-xl text-xs font-bold bg-white text-slate-650 hover:bg-slate-50 cursor-pointer"
                      >
                        Batal
                      </button>
                      
                      <button
                        onClick={() => {
                          const submitBtn = document.getElementById('submit-shipping-form-btn');
                          if (submitBtn) submitBtn.click();
                        }}
                        className="flex-1 py-3 bg-slate-900 hover:bg-slate-850 text-white text-xs font-black rounded-xl transition-all shadow cursor-pointer text-center"
                      >
                        Simpan & Bayar Sekarang
                      </button>
                    </div>
                  )}

                  {checkoutStep === 'qris_payment' && (
                    <div className="flex gap-3">
                      <button
                        onClick={() => setCheckoutStep('shipping')}
                        className="py-3 px-4 border border-slate-300 rounded-xl text-xs font-bold bg-white text-slate-650 hover:bg-slate-50 cursor-pointer"
                      >
                        Kembali
                      </button>
                      
                      <button
                        onClick={handlePaymentConfirm}
                        className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black rounded-xl transition-all shadow cursor-pointer text-center"
                      >
                        Sudah Konfirmasi Pembayaran
                      </button>
                    </div>
                  )}

                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

// Print invoice mockup function in case needed
const handlePrintInvoice = () => {
  window.print();
};
