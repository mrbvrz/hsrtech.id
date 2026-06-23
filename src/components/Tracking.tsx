/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  IconSearch, IconScan, IconDeviceComputerCamera, IconPhone, IconUser, 
  IconFileText, IconChevronRight, IconCheck, IconClock, IconMessage2, 
  IconRefresh, IconArrowLeft, IconMapPin, IconDownload, IconX, IconInfoCircle, 
  IconSend, IconActivity, IconTools, IconShieldCheck, IconReceipt, IconStar,
  IconArrowsMaximize, IconCopy, IconQrcode, IconUpload, IconCreditCard, IconDiscountCheck
} from '@tabler/icons-react';
import { SERVICES } from '../data';
import { Reservation as ReservationType } from '../types';

// Preset Demo Tickets in system
interface DemoTicket {
  id: string;
  phoneSuffix: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  serviceTitle: string;
  bookingDate: string;
  notes: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  technician: {
    name: string;
    role: string;
    avatar: string;
    status: string;
  };
  progress: number; // percentage
  diagnostic: {
    device: string;
    temperatureIdle: string;
    temperatureLoad: string;
    health: string;
    notes: string;
  };
  spareparts: { name: string; price: number }[];
  basePrice: number;
  paymentStatus: 'lunas' | 'belum_bayar' | 'dp_50%' | 'menunggu_verifikasi';
  paymentProof?: {
    method: string;
    senderName: string;
    amount: number;
    receiptImage?: string;
    uploadedAt: string;
  };
  logs: { time: string; text: string; category?: 'info' | 'process' | 'warning' | 'success' }[];
}

const DEMO_TICKETS: DemoTicket[] = [
  {
    id: 'HSR-7023-4567',
    phoneSuffix: '456789',
    clientName: 'Hasan Suryaman',
    clientPhone: '081234456789',
    clientEmail: 'hasan.suryaman@gmail.com',
    serviceTitle: 'Servis Komputer & Hardware',
    bookingDate: '20 Juni 2026',
    notes: 'Laptop Asus ROG lambat, sering mati sendiri tiap main game baru 15 menit, mohon dibersihkan thermal paste sekalian upgrade SSD',
    status: 'confirmed', // 'Dalam Proses'
    technician: {
      name: 'Rian Hidayat',
      role: 'Senior Hardware Specialist & Board Level Expert',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      status: 'Sedang repasting thermal paste & stress test CPU'
    },
    progress: 75,
    diagnostic: {
      device: 'Asus ROG Strix G15 (G513)',
      temperatureIdle: '45°C → 38°C (Pasca Pembersihan)',
      temperatureLoad: '98°C Overheat → 76°C (Stabil)',
      health: 'SSD NVMe Baru 100% / HDD Lama Bad Sector 24%',
      notes: 'Sirkulasi fan CPU tersumbat debu menggumpal. Thermal paste bawaan pabrik mengering total mengeras. Harddisk mekanis bawaan mengalami kelelahan piringan magnetik (bad sector) penyebab lag sistem. Selesai direpasting thermal paste Noctua NT-H1 & dipasang SSD Samsung 980 NVMe.'
    },
    spareparts: [
      { name: 'Thermal Paste Noctua NT-H1 Grease', price: 95000 },
      { name: 'SSD Samsung 980 NVMe M.2 512GB', price: 550000 },
      { name: 'Jasa Servis Upgrade & Deep Cleaning fisik', price: 150000 }
    ],
    basePrice: 795000,
    paymentStatus: 'dp_50%',
    logs: [
      { time: '20 Jun, 09:30', text: 'Tiket pendaftaran masuk dan terverifikasi di sistem HSR Care offline.', category: 'info' },
      { time: '20 Jun, 11:15', text: 'Perangkat fisik diterima di Workshop Utama HSR oleh admin penerima.', category: 'info' },
      { time: '20 Jun, 14:00', text: 'Senior Teknisi Rian Hidayat memulai proses diagnosis mendalam. Ditemukan temperatur kritis melampaui 98°C pada uji beban (overheat).', category: 'warning' },
      { time: '20 Jun, 15:30', text: 'Mengajukan rincian perbaikan penggantian thermal paste kering dan pemigrasian HDD bad sector ke SSD NVMe super cepat.', category: 'process' },
      { time: '21 Jun, 09:15', text: 'Persetujuan estimasi biaya dikonfirmasi oleh klien Hasan Suryaman via WhatsApp.', category: 'success' },
      { time: '21 Jun, 10:30', text: 'Pencairan suku cadang SSD Samsung 980 512GB dari gudang logistik disetujui.', category: 'info' },
      { time: '21 Jun, 11:45', text: 'Proses pembersihan menyeluruh sirkulasi kipas, perbaikan board, dan repasting Noctua selesai.', category: 'process' },
      { time: '21 Jun, 13:30', text: 'Pemasangan SSD baru dan kloning data sistem selesai. Instalasi OS bersih Windows 11 Pro beserta penyesuaian driver berjalan lancar.', category: 'process' },
      { time: '21 Jun, 14:45', text: 'Sesi Stress Benchmarking CPU & GPU sedang berlangsung selama 1 jam. Suhu stabil di kisaran 76°C beban tinggi.', category: 'process' }
    ]
  },
  {
    id: 'HSR-1092-2345',
    phoneSuffix: '654321',
    clientName: 'Citra Amelia',
    clientPhone: '081987654321',
    clientEmail: 'citra.amelia@vurnis.co.id',
    serviceTitle: 'Pembuatan Website & App',
    bookingDate: '15 June 2026',
    notes: 'Katalog interaktif 3D produk furnitur mewah PT Vurnis Studio Internasional',
    status: 'completed',
    technician: {
      name: 'Aris Setiawan',
      role: 'Lead Web Architect',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      status: 'Projek selesai diserahterimakan & rilis live'
    },
    progress: 100,
    diagnostic: {
      device: 'Cloud Hosting VPS + GitHub Repo',
      temperatureIdle: 'N/A Server Side',
      temperatureLoad: '99/100 Google PageSpeed',
      health: 'Sertifikat SSL Aktif / Cloudflare Protect Secure',
      notes: 'Situs web komersial telah berhasil dibangun menggunakan basis React TypeScript + Tailwind CSS. Integrasi database katalog kustom, optimalisasi gambar responsive ultra-ringan secepat kilat, dan tautan tombol WhatsApp Lead Generator terpasang.'
    },
    spareparts: [
      { name: 'Kerangka Dasar Kode React TS & Styling', price: 1500000 },
      { name: 'Modul CMS Katalog & SEO Web Booster', price: 450000 },
      { name: 'Registrasi Domain .co.id + SSL 1 Tahun', price: 0 } // Bundled bonus
    ],
    basePrice: 1950000,
    paymentStatus: 'lunas',
    logs: [
      { time: '15 Jun, 08:30', text: 'Tiket projek diaktifkan, pembayaran deposit termin ke-1 terdaftar.', category: 'success' },
      { time: '16 Jun, 10:00', text: 'Desain prototipe layout Wireframe Figma diserahkan dan disetujui klien.', category: 'info' },
      { time: '17 Jun, 09:00', text: 'Memulai penkodean front-end responsif dengan optimasi kompresi gambar 3D.', category: 'process' },
      { time: '19 Jun, 13:00', text: 'Penyetelan basis data katalog produk rampung. Penambatan formulir leads ke CS WhatsApp.', category: 'process' },
      { time: '20 Jun, 11:30', text: 'Deployment deploy ke server VPS CDN berbayar, setup konfigurasi sitemap Google Webmaster.', category: 'process' },
      { time: '21 Jun, 15:30', text: 'Evaluasi akhir bersama, training singkat admin cara mengubah katalog produk. Kontrak serah terima ditandatangani.', category: 'success' }
    ]
  }
];

export default function Tracking() {
  const [ticketId, setTicketId] = useState('');
  const [phoneSuffix, setPhoneSuffix] = useState('');
  const [typedTicketId, setTypedTicketId] = useState('');
  const [typedPhone, setTypedPhone] = useState('');
  
  // Tracking screens logic
  const [activeTicket, setActiveTicket] = useState<DemoTicket | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  // Barcode / Scanner modal simulation
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [scanStatus, setScanStatus] = useState<'idle' | 'scanning' | 'success'>('idle');
  const [scanResult, setScanResult] = useState('');

  // Full-view detailed modals
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [logSearchQuery, setLogSearchQuery] = useState('');

  // Interactive Live Chat Simulator State
  const [chatMessages, setChatMessages] = useState<{ sender: 'user' | 'technician'; text: string; time: string }[]>([]);
  const [userChatMsg, setUserChatMsg] = useState('');
  const [isTechTyping, setIsTechTyping] = useState(false);

  // Manual Payment States
  const [isPaymentFormOpen, setIsPaymentFormOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'qris' | 'mandiri' | 'jago' | 'jenius' | 'bri' | null>(null);
  const [senderName, setSenderName] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [receiptFileBase64, setReceiptFileBase64] = useState<string | null>(null);
  const [receiptFileName, setReceiptFileName] = useState('');
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [paymentErrors, setPaymentErrors] = useState<{ senderName?: string; transferAmount?: string; receipt?: string }>({});

  const handleCopyAccount = (text: string, bankName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(bankName);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleReceiptFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReceiptFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setReceiptFileBase64(reader.result as string);
        if (paymentErrors.receipt) {
          setPaymentErrors(prev => ({ ...prev, receipt: undefined }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const submitPaymentConfirmation = () => {
    if (!activeTicket) return;
    
    const errors: { senderName?: string; transferAmount?: string; receipt?: string } = {};
    if (!senderName.trim()) {
      errors.senderName = 'Nama pengirim / pemilik rekening wajib diisi.';
    }
    if (!transferAmount.trim() || isNaN(Number(transferAmount)) || Number(transferAmount) <= 0) {
      errors.transferAmount = 'Nominal transfer wajib diisi dengan angka bernilai positif.';
    }
    if (!receiptFileBase64) {
      errors.receipt = 'Silakan unggah bukti transfer pembayaran Anda.';
    }

    if (Object.keys(errors).length > 0) {
      setPaymentErrors(errors);
      return;
    }

    const payload = {
      method: selectedMethod?.toUpperCase() || 'QRIS',
      senderName: senderName.trim(),
      amount: Number(transferAmount),
      receiptImage: receiptFileBase64 || undefined,
      uploadedAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) + ' ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    // 1. Update active ticket screen state
    const updatedTicket: DemoTicket = {
      ...activeTicket,
      paymentStatus: 'menunggu_verifikasi',
      paymentProof: payload
    };
    setActiveTicket(updatedTicket);

    // 2. Persist to localStorage hsr_reservations
    const savedReservationsStr = localStorage.getItem('hsr_reservations');
    if (savedReservationsStr) {
      try {
        const localReservations: ReservationType[] = JSON.parse(savedReservationsStr);
        const index = localReservations.findIndex(r => r.id === activeTicket.id);
        if (index !== -1) {
          localReservations[index].paymentStatus = 'menunggu_verifikasi';
          localReservations[index].paymentProof = payload;
          localStorage.setItem('hsr_reservations', JSON.stringify(localReservations));
        }
      } catch (err) {
        console.error("Gagal menyimpan pembayaran ke local storage", err);
      }
    }

    // 3. Persist demo ticket overrides if it was a demo ticket
    const demoOverridesStr = localStorage.getItem('hsr_demo_overrides') || '{}';
    try {
      const demoOverrides = JSON.parse(demoOverridesStr);
      demoOverrides[activeTicket.id] = {
        paymentStatus: 'menunggu_verifikasi',
        paymentProof: payload
      };
      localStorage.setItem('hsr_demo_overrides', JSON.stringify(demoOverrides));
    } catch (e) {
      console.error(e);
    }

    // 4. Trigger simulated live message from active technician after success upload
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'technician',
          text: `Halo pak ${activeTicket.clientName}! Kami telah menerima konfirmasi pembayaran manual Anda melalui [${payload.method}] sebesar Rp ${payload.amount.toLocaleString('id-ID')} atas nama "${payload.senderName}". Tim Keuangan HSR sedang memverifikasi laporan mutasi Anda. Status pengerjaan akan segera kami lanjutkan begitu pembayaran terverifikasi. Terima kasih!`,
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1500);

    // Reset Form state
    setIsPaymentFormOpen(false);
  };

  // Testimonial & Review form states
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [testimonialText, setTestimonialText] = useState('');
  const [isTestimonialSubmitted, setIsTestimonialSubmitted] = useState(false);
  const [testimonialList, setTestimonialList] = useState<{ name: string; stars: number; text: string; date: string }[]>([
    { name: 'Kunto Wibisono', stars: 5, text: 'Pelayanan kilat, pengerjaan upgrade laptop rampung dalam 2 jam dan performansi sangat stabil. Sangat disarankan!', date: '21 Juni 2026' }
  ]);

  // Trigger browser Audio Synth for realistic Barcode Scanner crisp beep
  const playBeepSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(1200, audioCtx.currentTime); // Crisp high freq sound
      gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime); // comfortable volume
      
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.12); // Short beep dur
    } catch (e) {
      console.warn("Audio Context beep error (blocked or unsupported):", e);
    }
  };

  // Automatically format ticket input: HSR-XXXX-XXXX
  const handleTicketChange = (val: string) => {
    let raw = val.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (raw.startsWith('HSR')) {
      raw = raw.substring(3);
    }
    // Limit to 8 characters for numbers/identifiers
    raw = raw.substring(0, 8);
    
    let formatted = 'HSR';
    if (raw.length > 0) {
      formatted += '-' + raw.substring(0, 4);
    }
    if (raw.length > 4) {
      formatted += '-' + raw.substring(4, 8);
    }
    setTypedTicketId(formatted);
  };

  const handlePhoneChange = (val: string) => {
    const numbersOnly = val.replace(/[^0-9]/g, '').substring(0, 6);
    setTypedPhone(numbersOnly);
  };

  // Search Ticket Database (Demo Tickets + Client Local Reservations saved in localStorage)
  const handleSearchTicket = (e?: React.FormEvent, searchId?: string, searchPhone?: string) => {
    if (e) e.preventDefault();
    
    const queryId = (searchId || typedTicketId).trim().toUpperCase();
    const queryPhone = (searchPhone || typedPhone).trim();

    if (!queryId || queryId.length < 5) {
      setErrorMsg('Silakan masukkan Nomor Tiket yang valid (Contoh: HSR-7023-4567)');
      return;
    }
    if (!queryPhone || queryPhone.length < 6) {
      setErrorMsg('Wajib memasukkan 6 nomor HP terakhir client untuk keamanan akses');
      return;
    }

    setIsSearching(true);
    setErrorMsg('');

    setTimeout(() => {
      // 1. Check Demo Tickets first
      const matchedDemo = DEMO_TICKETS.find(
        t => t.id === queryId && queryPhone === t.phoneSuffix
      );

      if (matchedDemo) {
        const overridesStr = localStorage.getItem('hsr_demo_overrides');
        let finalDemo = { ...matchedDemo };
        if (overridesStr) {
          try {
            const overrides = JSON.parse(overridesStr);
            if (overrides[queryId]) {
              finalDemo.paymentStatus = overrides[queryId].paymentStatus;
              finalDemo.paymentProof = overrides[queryId].paymentProof;
            }
          } catch (e) {
            console.error(e);
          }
        }
        setActiveTicket(finalDemo);
        setIsSearching(false);
        // Load clean messages for diagnostic support
        setChatMessages([
          { sender: 'technician', text: `Halo pak ${finalDemo.clientName}, saya ${finalDemo.technician.name} teknisi IT HSR yang menangani unit Anda. Apakah ada keluhan tambahan yang ingin ditanyakan?`, time: '13:00' }
        ]);
        return;
      }

      // 2. Check localstorage for generated tickets
      const savedReservationsStr = localStorage.getItem('hsr_reservations');
      if (savedReservationsStr) {
        try {
          const localReservations: ReservationType[] = JSON.parse(savedReservationsStr);
          const matchedLocal = localReservations.find(r => {
            const cleanId = r.id.trim().toUpperCase();
            // Get last 6 digits of saved phone
            const cleanedPhone = r.clientPhone.replace(/[^0-9]/g, '');
            const phoneEnd = cleanedPhone.substring(cleanedPhone.length - 6);
            return cleanId === queryId && queryPhone === phoneEnd;
          });

          if (matchedLocal) {
            // Transform local reservation into tracking object format
            const mockProgress = matchedLocal.status === 'completed' ? 100 : matchedLocal.status === 'confirmed' ? 50 : 25;
            const mappedTicket: DemoTicket = {
              id: matchedLocal.id,
              phoneSuffix: queryPhone,
              clientName: matchedLocal.clientName,
              clientPhone: matchedLocal.clientPhone,
              clientEmail: matchedLocal.clientEmail,
              serviceTitle: matchedLocal.serviceTitle,
              bookingDate: matchedLocal.bookingDate,
              notes: matchedLocal.notes,
              status: matchedLocal.status as any,
              technician: {
                name: 'Rian Hidayat',
                role: 'Senior Hardware Specialist & Board Level Expert',
                avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
                status: 'Sedang menganalisis kebutuhan operasional / Menunggu antrian antrian'
              },
              progress: mockProgress,
              diagnostic: {
                device: 'Perangkat Klien HSR (Sesuai Reservasi)',
                temperatureIdle: 'N/A Diagnosa Pertama',
                temperatureLoad: 'N/A Diperiksa',
                health: 'Menunggu Pemeriksaan Fisik Terjadual',
                notes: matchedLocal.notes || 'Menunggu teknisi tiba atau perangkat sampai di workshop HSR.'
              },
              spareparts: [
                { name: `Paket Jasa: ${matchedLocal.serviceTitle}`, price: 150000 }
              ],
              basePrice: 150000,
              paymentStatus: matchedLocal.paymentStatus || 'belum_bayar',
              paymentProof: matchedLocal.paymentProof,
              logs: [
                { time: matchedLocal.createdAt.split(' pukul ')[0] || 'Hari Ini', text: `Tiket Reservasi #${matchedLocal.id} berhasil diajukan online oleh klien.`, category: 'info' },
                { time: 'Masa Antrian', text: `Status tiket saat ini: [${matchedLocal.status}]. Menunggu kedatangan teknisi pada tanggal ${matchedLocal.bookingDate} pukul ${matchedLocal.bookingTime}.`, category: 'process' }
              ]
            };

            setActiveTicket(mappedTicket);
            setIsSearching(false);
            setChatMessages([
              { sender: 'technician', text: `Halo pak ${mappedTicket.clientName}, tiket reservasi Anda #${mappedTicket.id} dalam antrian pengerjaan. Saya siap membantu mengawal pengerjaan ini.`, time: 'Sekarang' }
            ]);
            return;
          }
        } catch (err) {
          console.error("Error matching local reservation:", err);
        }
      }

      // No match
      setErrorMsg('Data Tiket atau 6 Angka No HP tidak cocok di database. Silakan periksa kembali!');
      setIsSearching(false);
    }, 1000);
  };

  const handleShortcutDemo = (demo: typeof DEMO_TICKETS[0]) => {
    setTypedTicketId(demo.id);
    setTypedPhone(demo.phoneSuffix);
    handleSearchTicket(undefined, demo.id, demo.phoneSuffix);
  };

  // Simulate scanning of barcode
  const handleStartBarcodeScan = () => {
    setIsScannerOpen(true);
    setScanStatus('scanning');
    
    // Auto beep and auto decode after 2.5s for rich game-like client feel
    setTimeout(() => {
      playBeepSound();
      const randomDemo = DEMO_TICKETS[Math.floor(Math.random() * DEMO_TICKETS.length)];
      setScanResult(randomDemo.id);
      setTypedTicketId(randomDemo.id);
      setTypedPhone(randomDemo.phoneSuffix);
      setScanStatus('success');
      
      // Auto close and load after 1s
      setTimeout(() => {
        setIsScannerOpen(false);
        handleSearchTicket(undefined, randomDemo.id, randomDemo.phoneSuffix);
      }, 700);
    }, 2500);
  };

  // Dynamic user chatting simulation responses
  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userChatMsg.trim() || !activeTicket) return;

    const userTime = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    const newChatList = [
      ...chatMessages,
      { sender: 'user' as const, text: userChatMsg, time: userTime }
    ];
    setChatMessages(newChatList);
    setUserChatMsg('');
    setIsTechTyping(true);

    // Simulate smart technician replying based on keyword triggers
    setTimeout(() => {
      let reply = `Terima kasih atas informasinya pak ${activeTicket.clientName}. Segera saya catat and maksimalkan pengecekan unit ini. Ada hal lain yang perlu dikonfirmasi?`;
      const query = userChatMsg.toLowerCase();
      
      if (query.includes('lama') || query.includes('kapan') || query.includes('selesai')) {
        reply = activeTicket.status === 'completed' 
          ? `Tiket ini sudah selesai digarap pak. Unit Anda sudah siap ditest langsung di tempat atau dipaketkan kembali.`
          : `Pengerjaan unit estimasi ${SERVICES.find(s => s.title === activeTicket.serviceTitle)?.estimatedTime || '1 hari'} lagi selesai pak. Kami pastikan stress test stabil sebelum serah terima.`;
      } else if (query.includes('biaya') || query.includes('harga') || query.includes('bayar') || query.includes('sparepart')) {
        reply = `Rincian suku cadang ${activeTicket.spareparts.map(sp => sp.name).join(', ')} bernominal total Rp ${activeTicket.basePrice.toLocaleString('id-ID')}. Sesuai transparansi invoice HSR, tidak ada biaya tambahan siluman lainnya pak.`;
      } else if (query.includes('garansi') || query.includes('aman')) {
        reply = `Untuk semua penggantian hardware premium dari kami, kami memberikan garansi servis toko 30 hari + garansi distributor resmi hingga 5 tahun untuk part SSD yang dipasang pak. Kardus kemasan asli akan kami kembalikan untuk bukti klaim kelak.`;
      }

      setChatMessages(prev => [
        ...prev,
        { sender: 'technician' as const, text: reply, time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) }
      ]);
      setIsTechTyping(false);
    }, 1800);
  };

  const handleBackToLookup = () => {
    setActiveTicket(null);
    setTypedTicketId('');
    setTypedPhone('');
    setErrorMsg('');
    setIsTestimonialSubmitted(false);
    setRating(5);
  };

  const handleSubmitTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testimonialText.trim()) return;
    
    const newFeedback = {
      name: activeTicket?.clientName || 'Klien HSR',
      stars: rating,
      text: testimonialText,
      date: 'Hari ini'
    };
    
    setTestimonialList([newFeedback, ...testimonialList]);
    setIsTestimonialSubmitted(true);
    setTestimonialText('');
  };

  // Function to simulate dynamic download of invoice
  const handlePrintInvoice = () => {
    if (!activeTicket) return;
    const printContent = `
=============================================
             HSR TECHNOLOGY INVOICE
=============================================
ID Tiket/Reservasi : ${activeTicket.id}
Atas Nama Klien     : ${activeTicket.clientName}
Email               : ${activeTicket.clientEmail}
No Telepon          : ${activeTicket.clientPhone}
Layanan IT          : ${activeTicket.serviceTitle}
Tanggal Masuk       : ${activeTicket.bookingDate}

---------------------------------------------
RINCIAN BIAYA & SPAREPARTS:
${activeTicket.spareparts.map(p => `- ${p.name}: Rp ${p.price.toLocaleString('id-ID')}`).join('\n')}

=============================================
TOTAL TAGIHAN       : Rp ${activeTicket.basePrice.toLocaleString('id-ID')}
STATUS PEMBAYARAN   : ${activeTicket.paymentStatus.toUpperCase().replace('_', ' ')}
=============================================
Terima kasih telah mempercayakan perbaikan IT 
Anda pada layanan resmi HSR Technology!
=============================================
    `;
    
    const blob = new Blob([printContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Invoice_HSR_${activeTicket.id}.txt`;
    link.click();
  };

  return (
    <div className="font-sans min-h-[90vh] bg-slate-50 pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Animated Headline Gate */}
        <AnimatePresence mode="wait">
          {!activeTicket ? (
            <motion.div 
              key="lookup-gate"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-xl mx-auto"
            >
              {/* Page header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 text-brand-blue text-xs font-bold rounded-full uppercase tracking-wider mb-3">
                  <IconActivity className="w-3.5 h-3.5 animate-pulse" />
                  <span>Sistem Monitoring Servis</span>
                </div>
                <h1 className="text-3xl font-display font-extrabold text-brand-dark tracking-tight">HSR Ticket Monitoring</h1>
                <p className="text-slate-650 text-xs sm:text-sm mt-2 font-medium">
                  Pantau kemajuan pengerjaan servis laptop, jaringan, cctv, and detail diagnostik Anda secara transparan.
                </p>
              </div>

              {/* Main Credentials Card Panel */}
              <div id="tracking-login-card" className="bg-white rounded-3xl shadow-[0_25px_60px_rgba(15,23,42,0.08)] overflow-hidden p-6 sm:p-8 relative">
                
                {/* Decorative blueprint pattern background */}
                <div className="absolute inset-0 grid-bg opacity-5 pointer-events-none" />

                <h3 className="font-bold text-sm text-slate-800 uppercase tracking-widest border-b pb-4 mb-6">Autentikasi Akses Tiket</h3>

                <form onSubmit={handleSearchTicket} className="space-y-4 relative z-10">
                  <div>
                    <label htmlFor="ticket-id-field" className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">No. Tiket Reservasi *</label>
                    <div className="relative">
                      <IconFileText className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input 
                        type="text"
                        id="ticket-id-field"
                        placeholder="Contoh: HSR-7023-4567"
                        required
                        value={typedTicketId}
                        onChange={(e) => handleTicketChange(e.target.value)}
                        className="w-full pl-10 pr-20 py-3 text-sm rounded-xl border border-slate-200 bg-white outline-none focus:border-brand-blue focus:ring-2 focus:ring-blue-500/10 font-bold tracking-wide"
                      />
                      <button
                        type="button"
                        onClick={handleStartBarcodeScan}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-3 py-1.5 bg-brand-blue hover:bg-blue-700 text-white text-[10px] font-extrabold rounded-lg shadow-sm cursor-pointer transition-colors"
                        title="Scan Barcode / QR Code"
                      >
                        <IconScan className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Scan</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone-suffix-field" className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">6 Angka Terakhir No. HP Client *</label>
                    <div className="relative">
                      <IconPhone className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input 
                        type="text"
                        id="phone-suffix-field"
                        placeholder="Contoh: 456789 (Hanya Angka)"
                        required
                        value={typedPhone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        className="w-full pl-10 pr-3 py-3 text-sm rounded-xl border border-slate-200 bg-white outline-none focus:border-brand-blue focus:ring-2 focus:ring-blue-500/10 font-mono tracking-widest"
                      />
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1.5 font-medium">Bisa Anda temukan pada nomor Whatapps yang Anda daftarkan di form reservasi.</p>
                  </div>

                  {errorMsg && (
                    <div className="p-3 bg-rose-50 border border-rose-100/50 rounded-xl text-rose-600 text-xs font-bold leading-relaxed flex items-center gap-2">
                      <IconInfoCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSearching}
                    className="w-full py-3.5 rounded-xl bg-brand-blue hover:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-widest shadow-md shadow-blue-500/15 flex items-center justify-center gap-2 cursor-pointer disabled:bg-slate-300 disabled:cursor-not-allowed"
                  >
                    {isSearching ? (
                      <>
                        <IconRefresh className="w-4 h-4 animate-spin" />
                        <span>Mencari Data Tiket...</span>
                      </>
                    ) : (
                      <>
                        <IconSearch className="w-4 h-4" />
                        <span>Masuk System Monitoring</span>
                      </>
                    )}
                  </button>
                </form>

                {/* Simulated Barcode Trigger explanation */}
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Cara Menggunakan Fitur Scan Barcode:</span>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                    Setiap nota piringan perbaikan HSR menyematkan Barcode Tiket. Klik tombol <strong className="text-slate-800">Scan</strong> di atas untuk memanggil kamera pemindai simulator, atau pilih tiket demo kilat di bawah ini.
                  </p>
                </div>
              </div>

              {/* Grid of demo triggers for quick previewing */}
              <div className="mt-8 bg-white/45 backdrop-blur-md border border-white/75 rounded-3xl p-6 text-slate-800 relative overflow-hidden shadow-[0_12px_30px_rgba(15,23,42,0.03)]">
                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-1.5 h-3 bg-brand-blue rounded-full" />
                  <h4 className="font-display font-extrabold text-sm tracking-wide text-slate-800">Uji Coba Demo Instan (Disarankan)</h4>
                </div>
                
                <p className="text-[11px] text-slate-500 mb-4 font-medium leading-relaxed font-sans">
                  Tidak memiliki tiket aktif? Jangan khawatir. Klik salah satu kartu demo di bawah untuk mengisi formulir tracking secara otomatis dengan skenario servis yang realistis:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {DEMO_TICKETS.map(demo => (
                    <div 
                      key={demo.id} 
                      onClick={() => handleShortcutDemo(demo)}
                      className="bg-white/60 border border-white/80 hover:bg-white/90 p-3 rounded-xl cursor-pointer text-left transition-all duration-200 shadow-sm"
                    >
                      <div className="flex items-center justify-between text-[10px] font-bold text-brand-blue">
                        <span>{demo.id}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[8px] uppercase ${
                          demo.status === 'completed' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                        }`}>
                          {demo.status === 'completed' ? 'Selesai' : 'Dalam Proses'}
                        </span>
                      </div>
                      <h5 className="font-bold text-xs mt-1 text-slate-800 line-clamp-1">{demo.serviceTitle}</h5>
                      <div className="text-[10px] text-slate-500 mt-2 flex items-center justify-between">
                        <span>Klien: {demo.clientName}</span>
                        <span className="font-mono text-slate-400">Suffix: {demo.phoneSuffix}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          ) : (
            // ACTIVE TRACKING MONITORING SYSTEM DASHBOARD
            <motion.div
              key="monitoring-dashboard"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: 15 }}
              className="space-y-6"
            >
              {/* Back breadcrumb and Status badge */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
                <button
                  onClick={handleBackToLookup}
                  className="inline-flex items-center gap-2 p-2 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-brand-dark transition-all text-xs font-bold shadow-sm cursor-pointer"
                >
                  <IconArrowLeft className="w-4 h-4" />
                  <span>Kembali ke Pencarian</span>
                </button>

                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="flex items-center gap-2 px-3.5 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full text-emerald-600 text-xs font-extrabold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>MONITORING KELANCARAN AKTIF</span>
                  </div>

                  <span className="text-xs text-slate-400 font-bold tracking-wider uppercase bg-slate-200/50 px-2.5 py-1 rounded-lg border border-slate-300/40">
                    SISTEM TIKET HSR ONLINE v1.2
                  </span>
                </div>
              </div>

              {/* Main Bento Grid layout of Monitoring (3 Columns, Bento Style) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Column 1 (Left Column - 1/3 Width) */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                  
                  {/* General Ticket Info Card */}
                  <div className="bg-white border border-slate-200/80 text-slate-800 rounded-3xl p-6 shadow-[0_15px_40px_rgba(15,23,42,0.06)] relative overflow-hidden shrink-0">
                    <div className="absolute inset-0 grid-bg opacity-5 pointer-events-none" />
                    <div className="relative z-10 space-y-4">
                      
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Nomor Tiket</span>
                          <h2 className="text-xl font-display font-black tracking-tight mt-0.5 text-slate-900">{activeTicket.id}</h2>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                          activeTicket.status === 'completed' 
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                            : 'bg-amber-50 text-amber-600 border border-amber-100'
                        }`}>
                          {activeTicket.status === 'completed' ? 'Unit Selesai' : 'Sedang Dikerjakan'}
                        </span>
                      </div>

                      <div className="border-t border-slate-100 pt-3.5 space-y-2.5 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-500 font-medium font-sans">Pekerjaan</span>
                          <span className="font-extrabold text-slate-800 text-right max-w-[200px] line-clamp-1">{activeTicket.serviceTitle}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500 font-medium font-sans">Atas Nama Klien</span>
                          <span className="font-extrabold text-slate-800">{activeTicket.clientName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500 font-medium font-sans">Tanggal Booking</span>
                          <span className="font-extrabold text-slate-800">{activeTicket.bookingDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500 font-medium font-sans">No HP Kontrak</span>
                          <span className="font-extrabold text-slate-800">{activeTicket.clientPhone}</span>
                        </div>
                      </div>

                      {/* Progress Line */}
                      <div className="pt-3 border-t border-slate-100">
                        <div className="flex justify-between text-[11px] font-bold text-slate-500 mb-1.5 font-sans">
                          <span>Progress Pemulihan</span>
                          <span className="text-brand-blue text-xs font-black">{activeTicket.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
                          <motion.div 
                            className="bg-gradient-to-r from-blue-600 to-indigo-500 h-full rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${activeTicket.progress}%` }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                          />
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* High Fidelity Technical Milestones Step Timeline */}
                  <div className="bg-white rounded-3xl p-6 shadow-[0_15px_40px_rgba(15,23,42,0.06)] flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-display font-extrabold text-slate-800 text-sm tracking-wide mb-6 border-b pb-3 flex items-center gap-2">
                        <IconTools className="w-4 h-4 text-brand-blue" />
                        <span>Tahapan Pemulihan Sistem</span>
                      </h4>

                      {/* Milestones Vertical Pipeline */}
                      <div className="space-y-6">
                        {[
                          { title: 'Pendaftaran & Tiket Masuk', desc: 'Detail keluhan terdaftar offline di HSR Care.', state: 1 },
                          { title: 'Diagnosis Hardware & Software', desc: 'Identifikasi fisik dan stress benchmarking mula.', state: 2 },
                          { title: 'Tindakan Eksekusi Servis', desc: 'Repasting Noctua, penggantian SSD, re-install.', state: 3 },
                          { title: 'Stress Test Akhir & QA', desc: 'Pengujian performa stabil minimum 1 jam.', state: 4 },
                          { title: 'Serah Terima & Bergaransi', desc: 'Unit siap diambil / diantar dengan nota fisik.', state: 5 }
                        ].map((m, idx) => {
                          const currentStepThreshold = (idx + 1) * 20;
                          const isDone = activeTicket.progress >= currentStepThreshold;
                          const isCurrent = activeTicket.progress >= currentStepThreshold - 20 && activeTicket.progress < currentStepThreshold;

                          return (
                            <div key={idx} className="flex gap-4 relative items-start group">
                              {/* Connector line for milestones */}
                              {idx < 4 && (
                                <span className={`absolute left-3.5 top-7 bottom-0 w-0.5 -translate-x-[50%] ${
                                  activeTicket.progress > currentStepThreshold 
                                    ? 'bg-emerald-500' 
                                    : 'bg-slate-200'
                                }`} style={{ height: 'calc(100% + 5px)' }} />
                              )}

                              <span className={`w-7 h-7 rounded-full text-[10px] font-extrabold flex items-center justify-center shrink-0 z-10 transition-all ${
                                isDone 
                                  ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/20' 
                                  : isCurrent 
                                    ? 'bg-brand-blue text-white ring-4 ring-blue-500/15 animate-pulse' 
                                    : 'bg-slate-100 text-slate-400 border border-slate-200'
                              }`}>
                                {isDone ? <IconCheck className="w-4 h-4" /> : idx + 1}
                              </span>

                              <div>
                                <h5 className={`text-xs font-bold ${
                                  isDone ? 'text-slate-800 font-extrabold' : isCurrent ? 'text-brand-blue font-extrabold' : 'text-slate-400'
                                }`}>
                                  {m.title}
                                </h5>
                                <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed font-sans">{m.desc}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 text-[10px] text-slate-400 text-center uppercase tracking-widest font-mono mt-6">
                      SLA Respon Antrian Terpantau
                    </div>
                  </div>

                  {/* Technician Profile Card */}
                  <div className="bg-white rounded-3xl p-6 shadow-[0_15px_40px_rgba(15,23,42,0.06)]">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3.5">Teknisi Penanggung Jawab</span>
                    
                    <div className="flex items-center gap-3.5">
                      <img 
                        src={activeTicket.technician.avatar}
                        alt={activeTicket.technician.name}
                        referrerPolicy="no-referrer"
                        className="w-13 h-13 rounded-xl hover:scale-105 transition-transform object-cover shrink-0 border border-slate-100 shadow-sm"
                      />
                      <div>
                        <h5 className="font-extrabold text-sm text-brand-dark">{activeTicket.technician.name}</h5>
                        <p className="text-[11px] text-slate-500 leading-snug font-medium mt-0.5">{activeTicket.technician.role}</p>
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-3 mt-4 text-[11px] text-slate-600 leading-relaxed font-sans font-medium flex gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5 animate-ping" />
                      <div>
                        <span className="font-bold block text-brand-dark text-[10px] uppercase">Giat Saat Ini:</span>
                        {activeTicket.technician.status}
                      </div>
                    </div>
                  </div>

                </div>

                {/* Column 2 (Right Area - 2/3 Width) */}
                <div className="lg:col-span-8 flex flex-col gap-6">

                  {/* Realtime Action Logs Terminal Feed (SYSTEM_LOG_FEED v1.02) */}
                  <div className="bg-slate-50 border border-slate-200 font-mono text-xs text-slate-705 rounded-3xl p-5 shadow-[0_15px_40px_rgba(15,23,42,0.06)] overflow-hidden flex flex-col justify-between min-h-[300px]">
                    <div>
                      <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                          <span className="text-[10px] font-extrabold font-mono text-slate-400 uppercase tracking-widest ml-1">SYSTEM_LOG_FEED v1.02</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] uppercase font-bold text-emerald-600 tracking-wider">Secured Sync</span>
                          <button
                            onClick={() => {
                              setLogSearchQuery('');
                              setIsLogModalOpen(true);
                            }}
                            className="p-1.5 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-800 transition-colors cursor-pointer flex items-center justify-center shadow-sm"
                            title="Lihat Detail Penuh Log"
                          >
                            <IconArrowsMaximize className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-3.5 max-h-[250px] overflow-y-auto pr-1 text-[11px] leading-relaxed">
                        {activeTicket.logs.map((log, i) => (
                          <div key={i} className="flex gap-2">
                            <span className="text-slate-400 shrink-0 select-none">[{log.time}]</span>
                            <span className={`
                              ${log.category === 'warning' ? 'text-amber-600 font-bold' : ''}
                              ${log.category === 'success' ? 'text-emerald-600 font-bold' : ''}
                              ${log.category === 'info' ? 'text-blue-600' : ''}
                              text-slate-650
                            `}>
                              {log.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200 mt-4 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                      <span>CONSOLE SYNC STABLE</span>
                      <span className="text-emerald-600 font-bold animate-pulse">● FEED ACTIVE</span>
                    </div>
                  </div>

                  {/* Bento Sub-grid for Diagnostics and Map */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    
                    {/* Diagnostic Benchmarks Report Box (1 Column Inside Layout) */}
                    <div className="bg-white rounded-3xl p-6 shadow-[0_15px_40px_rgba(15,23,42,0.06)]">
                      <h4 className="font-display font-extrabold text-slate-800 text-sm tracking-wide mb-4 border-b pb-3 flex items-center gap-2">
                        <IconShieldCheck className="w-4 h-4 text-emerald-500" />
                        <span>Rincian Diagnosa & Kesehatan Hardware</span>
                      </h4>

                      <div className="grid grid-cols-1 gap-4 text-xs">
                        <div className="bg-slate-50 p-3 rounded-2xl">
                          <span className="block text-slate-400 text-[10px] uppercase font-bold tracking-wider">Perangkat Terkoneksi</span>
                          <span className="block mt-1 font-extrabold text-slate-800">{activeTicket.diagnostic.device}</span>
                        </div>

                        <div className="bg-slate-50 p-3 rounded-2xl">
                          <span className="block text-slate-400 text-[10px] uppercase font-bold tracking-wider">Kesehatan Penyimpanan</span>
                          <span className="block mt-1 font-extrabold text-blue-600">{activeTicket.diagnostic.health}</span>
                        </div>

                        <div className="bg-slate-50 p-3 rounded-2xl">
                          <span className="block text-slate-400 text-[10px] uppercase font-bold tracking-wider">Suhu Processor Idle</span>
                          <span className="block mt-1 font-extrabold text-slate-800">{activeTicket.diagnostic.temperatureIdle}</span>
                        </div>

                        <div className="bg-slate-50 p-3 rounded-2xl">
                          <span className="block text-slate-400 text-[10px] uppercase font-bold tracking-wider">Suhu Processor Stress</span>
                          <span className="block mt-1 font-extrabold text-emerald-600">{activeTicket.diagnostic.temperatureLoad}</span>
                        </div>
                      </div>

                      <div className="bg-amber-50/40 border border-amber-100 rounded-2xl p-3.5 mt-4 text-[11px] text-slate-700 leading-relaxed font-sans">
                        <strong className="text-amber-700 font-bold">Catatan Analitis Teknisi:</strong> {activeTicket.diagnostic.notes}
                      </div>
                    </div>

                    {/* Interactive Mock Map Vector Grid */}
                    <div className="bg-white/45 backdrop-blur-md border border-white/80 text-slate-800 rounded-3xl p-5 shadow-[0_15px_40px_rgba(15,23,42,0.04)] h-[490px] relative overflow-hidden flex flex-col justify-between">
                      {/* Animated blueprint map decor */}
                      <div className="absolute inset-0 grid-bg opacity-5 pointer-events-none" />
                      
                      {/* Simulated vector track streets */}
                      <div className="absolute inset-0 pointer-events-none">
                        <svg width="100%" height="100%" className="opacity-40">
                          <line x1="10%" y1="0%" x2="10%" y2="100%" stroke="#cbd5e1" strokeWidth="1.5" />
                          <line x1="45%" y1="0%" x2="45%" y2="100%" stroke="#cbd5e1" strokeWidth="1.5" />
                          <line x1="80%" y1="0%" x2="80%" y2="100%" stroke="#cbd5e1" strokeWidth="1.5" />
                          <line x1="0%" y1="35%" x2="100%" y2="35%" stroke="#cbd5e1" strokeWidth="1.5" />
                          <line x1="0%" y1="75%" x2="100%" y2="75%" stroke="#cbd5e1" strokeWidth="1.5" />
                          {/* Curved path for route of tech */}
                          <path d="M 45 75 Q 60 55 80 35" fill="none" stroke="#2563eb" strokeWidth="3" strokeDasharray="6,4" />
                        </svg>
                      </div>

                      {/* Flashing GPS dots */}
                      <div className="absolute left-[45%] top-[75%] -translate-x-[50%] -translate-y-[50%] pointer-events-none z-10 flex flex-col items-center">
                        <span className="text-[8px] bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-600 font-bold uppercase mb-1 shadow-sm">Workshop HSR</span>
                        <span className="w-3 h-3 rounded-full bg-slate-100 border border-brand-dark flex items-center justify-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-dark" />
                        </span>
                      </div>

                      <div className="absolute left-[80%] top-[35%] -translate-x-[50%] -translate-y-[50%] pointer-events-none z-10 flex flex-col items-center">
                        <span className="text-[8px] bg-brand-blue px-1.5 py-0.5 rounded text-white font-bold uppercase mb-1 animate-bounce shadow-sm">Klien</span>
                        <span className="w-4.5 h-4.5 rounded-full bg-blue-100 flex items-center justify-center border border-blue-500">
                          <span className="w-2.5 h-2.5 rounded-full bg-brand-blue animate-pulse" />
                        </span>
                      </div>

                      <div className="relative z-10 flex justify-between items-start">
                        <div>
                          <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600">Peta Lokasi Layanan</span>
                          <h4 className="font-bold text-xs text-slate-800 mt-1">Grogol Workshop → Alamat Client</h4>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full text-[9px] font-extrabold text-blue-600 bg-blue-50 border border-blue-200 shadow-sm">
                          Jarak Terpantau: 4.8 Km
                        </span>
                      </div>

                      <div className="relative z-10 flex items-center gap-3 bg-white/90 p-2.5 rounded-xl border border-slate-200 shadow-sm backdrop-blur-sm">
                        <IconMapPin className="w-4 h-4 text-indigo-600 shrink-0" />
                        <span className="text-[10px] text-slate-600 leading-normal font-sans font-medium">
                          {activeTicket.status === 'completed' 
                            ? 'Selesai: Perangkat aman disimpan siap serah terima dan pengembalian unit.'
                            : 'Monitoring Progress: Unit aktif dikerjakan di workbench teknisi HSR Grogol.'
                          }
                        </span>
                      </div>
                    </div>

                    {/* Subgrid for dynamic Invoice & Testimonial OR Estimate & Chat */}
                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                      {activeTicket.status === 'completed' ? (
                        <>
                      {/* OFFICIAL INVOICE DIGITAL CARD */}
                      <div className="bg-white rounded-3xl p-6 shadow-[0_15px_40px_rgba(15,23,42,0.06)] relative overflow-hidden space-y-4">
                        
                        {/* Realistic Paid stamp watermark */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-dashed border-emerald-500/25 text-emerald-500/80 py-2.5 px-6 font-mono font-black text-xl uppercase rounded-2xl tracking-widest -rotate-12 select-none pointer-events-none transform flex flex-col items-center justify-center">
                          <span>TELAH DIBAYAR</span>
                          <span className="text-xs font-sans mt-0.5 tracking-normal">PAID LUNAS</span>
                        </div>

                        {/* Invoice Header */}
                        <div className="flex items-center justify-between border-b pb-3.5">
                          <div>
                            <span className="text-[9px] font-black tracking-widest text-emerald-600 uppercase bg-emerald-50 px-2 py-0.5 rounded">OFFICIAL INVOICE</span>
                            <h4 className="font-display font-extrabold text-slate-800 text-xs mt-1.5 font-mono">INV/2026/VI/{activeTicket.id.split('-')[1]}</h4>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setIsInvoiceModalOpen(true)}
                              className="p-1.5 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-850 transition-colors cursor-pointer flex items-center justify-center border border-slate-200/60"
                              title="Lihat Detail Penuh Invoice"
                            >
                              <IconArrowsMaximize className="w-3.5 h-3.5" />
                            </button>
                            <IconReceipt className="w-5 h-5 text-emerald-500" />
                          </div>
                        </div>

                        <div className="space-y-3.5 text-xs">
                          {activeTicket.spareparts.map((p, i) => (
                            <div key={i} className="flex justify-between items-center text-slate-650">
                              <span className="font-medium max-w-[140px] line-clamp-1">{p.name}</span>
                              <span className="font-mono text-slate-800 font-bold">Rp {p.price.toLocaleString('id-ID')}</span>
                            </div>
                          ))}
                          
                          <div className="border-t border-dashed pt-3.5 flex justify-between font-black text-sm text-brand-dark">
                            <span>TOTAL PELUNASAN</span>
                            <span className="font-mono text-emerald-600">Rp {activeTicket.basePrice.toLocaleString('id-ID')}</span>
                          </div>
                        </div>

                        {/* Payment Statement Status Statement box requested */}
                        <div className="p-3 bg-emerald-50 rounded-2xl text-[10px] text-emerald-800 leading-normal font-sans space-y-1">
                          <p className="font-extrabold flex items-center gap-1">
                            <IconCheck className="w-3.5 h-3.5" />
                            <span>Keterangan Pembayaran: LUNAS</span>
                          </p>
                          <p className="text-[9.5px] text-emerald-700/80 font-medium">
                            Tagihan senilai Rp {activeTicket.basePrice.toLocaleString('id-ID')} telah dibayarkan penuh melalui Gateway Bank otomatis HSR Secure. Terima kasih sudah mempercayakan kami!
                          </p>
                        </div>

                        <button
                          onClick={handlePrintInvoice}
                          className="w-full py-2.5 bg-slate-900 border border-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
                        >
                          <IconDownload className="w-4 h-4 text-cyan-400" />
                          <span>Download PDF Invoice</span>
                        </button>
                      </div>

                      {/* LEAVE LIVE TESTIMONIAL STAR REVIEW WIDGET */}
                      <div className="bg-white rounded-3xl p-6 shadow-[0_15px_40px_rgba(15,23,42,0.06)] space-y-4">
                        <div className="flex items-center gap-2 border-b pb-3.5">
                          <IconStar className="w-4.5 h-4.5 text-amber-500 fill-amber-500" />
                          <h4 className="font-display font-black text-slate-800 text-xs uppercase tracking-wider">Leave Testimonial</h4>
                        </div>

                        {!isTestimonialSubmitted ? (
                          <form onSubmit={handleSubmitTestimonial} className="space-y-3.5">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Rating Bintang Anda *</label>
                              <div className="flex items-center gap-1.5">
                                {[1, 2, 3, 4, 5].map((star) => {
                                  const isLit = star <= (hoverRating || rating);
                                  return (
                                    <button
                                      type="button"
                                      key={star}
                                      onClick={() => setRating(star)}
                                      onMouseEnter={() => setHoverRating(star)}
                                      onMouseLeave={() => setHoverRating(0)}
                                      className="p-0.5 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                                      title={`Bintang ${star}`}
                                    >
                                      <IconStar className={`w-6 h-6 ${isLit ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            <div>
                              <label htmlFor="review-msg-box" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Ulasan & Testimoni Anda *</label>
                              <textarea
                                id="review-msg-box"
                                placeholder="Tuliskan pengalaman Anda menggunakan servis premium kami..."
                                required
                                value={testimonialText}
                                onChange={(e) => setTestimonialText(e.target.value)}
                                rows={3}
                                className="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium bg-slate-50 focus:bg-white focus:outline-none focus:border-brand-blue leading-normal resize-none"
                              />
                            </div>

                            <button
                              type="submit"
                              className="w-full py-2.5 bg-brand-blue hover:bg-blue-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md shadow-blue-500/10"
                            >
                              <span>Kirim Testimoni</span>
                            </button>
                          </form>
                        ) : (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-4 space-y-3"
                          >
                            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                              <IconCheck className="w-6 h-6" />
                            </div>
                            <div>
                              <h5 className="font-extrabold text-xs text-slate-800">Testimoni Terpublikasi!</h5>
                              <p className="text-[10px] text-slate-400 leading-normal mt-1 max-w-[200px] mx-auto font-sans">
                                Terima kasih, ulasan bintang {rating} Anda telah terpasang langsung pada sistem HSR.
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => setIsTestimonialSubmitted(false)}
                              className="text-[10px] text-brand-blue font-bold hover:underline cursor-pointer"
                            >
                              Tulis Ulasan Baru
                            </button>
                          </motion.div>
                        )}

                        {/* Live Feed of Testimonials right after layout */}
                        <div className="border-t border-dashed pt-3.5">
                          <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2.5">Ulasan Terbaru Kami</span>
                          <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
                            {testimonialList.map((test, index) => (
                              <div key={index} className="p-2 bg-slate-50 rounded-xl space-y-1">
                                <div className="flex justify-between items-center text-[9px] text-slate-500">
                                  <span className="font-black text-slate-700">{test.name}</span>
                                  <span>{test.date}</span>
                                </div>
                                <div className="flex items-center gap-0.5">
                                  {Array.from({ length: test.stars }).map((_, sIdx) => (
                                    <IconStar key={sIdx} className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                                  ))}
                                </div>
                                <p className="text-[10.5px] text-slate-600 leading-snug font-medium font-sans">
                                  "{test.text}"
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Financial Bill invoice statement & print */}
                      <div className="bg-white rounded-3xl p-6 shadow-[0_15px_40px_rgba(15,23,42,0.06)] space-y-4">
                        <h4 className="font-display font-bold text-slate-800 text-sm tracking-wide border-b pb-3 flex items-center gap-2">
                          <IconReceipt className="w-4 h-4 text-brand-blue" />
                          <span>Rincian Estimasi Biaya</span>
                        </h4>

                        <div className="space-y-2 text-xs">
                          {activeTicket.spareparts.map((p, i) => (
                            <div key={i} className="flex justify-between text-slate-650">
                              <span className="font-medium max-w-[150px] line-clamp-1">{p.name}</span>
                              <span className="font-mono text-slate-800">Rp {p.price.toLocaleString('id-ID')}</span>
                            </div>
                          ))}
                          
                          <div className="border-t pt-3 flex justify-between font-extrabold text-sm text-brand-dark">
                            <span>Total Tagihan</span>
                            <span className="font-mono text-brand-blue">Rp {activeTicket.basePrice.toLocaleString('id-ID')}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-400 font-bold uppercase tracking-wider">Status Bayar</span>
                          <span className={`px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px] ${
                            activeTicket.paymentStatus === 'lunas' 
                              ? 'bg-emerald-100 text-emerald-700' 
                              : activeTicket.paymentStatus === 'dp_50%'
                                ? 'bg-blue-100 text-blue-700'
                                : activeTicket.paymentStatus === 'menunggu_verifikasi'
                                  ? 'bg-amber-100 text-amber-700 animate-pulse'
                                  : 'bg-rose-100 text-rose-700'
                          }`}>
                            {activeTicket.paymentStatus === 'menunggu_verifikasi' ? 'menunggu verifikasi' : activeTicket.paymentStatus.replace('_', ' ')}
                          </span>
                        </div>

                        {/* Submitted Payment Proof Info (If waiting for verification) */}
                        {activeTicket.paymentStatus === 'menunggu_verifikasi' && activeTicket.paymentProof && (
                          <div className="p-3.5 bg-amber-50/50 border border-amber-200/60 rounded-2xl text-[11px] text-slate-700 space-y-2 mt-2">
                            <span className="font-bold text-amber-800 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                              Konfirmasi Terkirim
                            </span>
                            <p className="text-[10px] text-slate-500 leading-relaxed">
                              Bukti transfer manual sedang dikonfirmasi oleh tim keuangan HSR. Proses estimasi memerlukan waktu sekitar 10-15 menit.
                            </p>
                            <div className="grid grid-cols-2 gap-x-2 gap-y-1 border-t pt-2 font-sans">
                              <span className="text-slate-400 font-medium">Metode Transfer:</span>
                              <span className="text-slate-800 font-bold text-right">{activeTicket.paymentProof.method}</span>
                              <span className="text-slate-400 font-medium">Atas Nama:</span>
                              <span className="text-slate-800 font-bold text-right truncate">{activeTicket.paymentProof.senderName}</span>
                              <span className="text-slate-400 font-medium">Nominal:</span>
                              <span className="text-slate-800 font-bold text-right font-mono text-xs">Rp {activeTicket.paymentProof.amount.toLocaleString('id-ID')}</span>
                              <span className="text-slate-400 font-medium">Waktu Kirim:</span>
                              <span className="text-slate-800 font-bold text-right truncate text-[9px]">{activeTicket.paymentProof.uploadedAt}</span>
                            </div>
                            {activeTicket.paymentProof.receiptImage && (
                              <div className="pt-2">
                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Bukti Terlampir:</span>
                                <div className="relative group overflow-hidden rounded-lg border bg-slate-100 h-24 flex items-center justify-center">
                                  <img 
                                    src={activeTicket.paymentProof.receiptImage} 
                                    className="h-full object-contain cursor-zoom-in group-hover:scale-105 transition-all" 
                                    alt="Receipt Preview"
                                    referrerPolicy="no-referrer"
                                    onClick={() => {
                                      // Optional popup
                                      const w = window.open();
                                      if (w && activeTicket.paymentProof?.receiptImage) {
                                        w.document.write(`<img src="${activeTicket.paymentProof.receiptImage}" style="max-width:100%; height:auto;" />`);
                                      }
                                    }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        <button
                          onClick={handlePrintInvoice}
                          className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer border"
                        >
                          <IconDownload className="w-3.5 h-3.5" />
                          <span>Cetak Nota PDF</span>
                        </button>

                        {/* Pay manually button */}
                        {(activeTicket.paymentStatus === 'belum_bayar' || activeTicket.paymentStatus === 'dp_50%') && (
                          <div className="pt-2 border-t mt-2">
                            <button
                              onClick={() => {
                                setIsPaymentFormOpen(true);
                                const targetAmount = activeTicket.paymentStatus === 'dp_50%' 
                                  ? activeTicket.basePrice * 0.5 
                                  : activeTicket.basePrice;
                                setTransferAmount(targetAmount.toString());
                                setPaymentErrors({});
                                if (!selectedMethod) {
                                  setSelectedMethod('qris');
                                }
                              }}
                              className="w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 shadow-md bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white"
                            >
                              <IconCreditCard className="w-4 h-4 text-cyan-200 animate-pulse" />
                              <span>Bayar & Konfirmasi Sekarang</span>
                            </button>
                          </div>
                        )}
                      </div>

                      {/* High fidelity interactive technician support live chat widget */}
                      <div className="bg-white rounded-3xl shadow-[0_15px_40px_rgba(15,23,42,0.06)] overflow-hidden flex flex-col justify-between h-80">
                        {/* Header of widget */}
                        <div className="bg-brand-dark text-white p-3.5 px-4 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <IconMessage2 className="w-4.5 h-4.5 text-cyan-400 shrink-0" />
                            <div>
                              <h5 className="text-[11px] font-extrabold uppercase tracking-wide leading-none">{activeTicket.technician.name}</h5>
                              <span className="text-[9px] text-slate-400 font-sans font-medium">Live Konsultasi Tiket</span>
                            </div>
                          </div>
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        </div>

                        {/* Chat log body scroll */}
                        <div className="flex-1 p-3.5 space-y-3 overflow-y-auto bg-slate-50/50 flex flex-col">
                          {chatMessages.map((msg, i) => (
                            <div 
                              key={i} 
                              className={`flex flex-col max-w-[85%] text-xs ${
                                msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'
                              }`}
                            >
                              <div className={`p-2.5 rounded-2xl leading-normal font-sans font-medium shadow-sm ${
                                msg.sender === 'user' 
                                  ? 'bg-brand-blue text-white rounded-tr-none' 
                                  : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'
                              }`}>
                                {msg.text}
                              </div>
                              <span className="text-[8px] text-slate-400 mt-1 font-mono">{msg.time}</span>
                            </div>
                          ))}

                          {isTechTyping && (
                            <div className="self-start flex items-center gap-1.5 p-2 px-3 bg-white border border-slate-150 rounded-2xl rounded-tl-none">
                              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                          )}
                        </div>

                        {/* Chat dialog inputs */}
                        <form onSubmit={handleSendChat} className="border-t border-slate-150 p-2 bg-white flex gap-2">
                          <input 
                            type="text"
                            placeholder="Ketik pertanyaan tiket ke teknisi..."
                            value={userChatMsg}
                            onChange={(e) => setUserChatMsg(e.target.value)}
                            className="flex-1 px-3 py-1.5 rounded-xl border border-slate-150 text-[11px] font-medium bg-slate-50 outline-none focus:bg-white focus:border-brand-blue"
                          />
                          <button 
                            type="submit"
                            className="p-2 rounded-xl bg-brand-blue hover:bg-blue-700 text-white shadow-sm cursor-pointer shrink-0 flex items-center justify-center"
                            title="Kirim Pesan"
                          >
                            <IconSend className="w-3.5 h-3.5" />
                          </button>
                        </form>
                      </div>
                    </>
                  )}
                    </div> {/* End of dynamic conditional rendering container */}
                  </div> {/* End of Bento Sub-grid */}

                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FUTURISTIC SCANNER MODAL WITH HUD GRAPHICS */}
        <AnimatePresence>
          {isScannerOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
            >
              <motion.div 
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                className="max-w-md w-full bg-white border border-slate-200 text-slate-800 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between shadow-2xl"
              >
                {/* HUD Decor overlay */}
                <div className="absolute top-2 left-2 text-[8px] text-slate-400 font-mono">SYS_DEC: ONLINE</div>
                <div className="absolute top-2 right-2 text-[8px] text-slate-400 font-mono">FRAME_LAT: 24MS</div>

                <div className="flex justify-between items-start border-b border-slate-100 pb-3 mb-5">
                  <div>
                    <h3 className="font-display font-extrabold text-sm tracking-widest text-brand-blue uppercase flex items-center gap-1.5">
                      <IconScan className="w-4 h-4 text-brand-blue shrink-0" />
                      <span>Barcode Scanner Simulator</span>
                    </h3>
                    <p className="text-[10px] text-slate-500 mt-1 font-medium font-sans">Mendekatkan barcode tiket ke viewfinder kamera...</p>
                  </div>
                  <button 
                    onClick={() => setIsScannerOpen(false)}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer"
                  >
                    <IconX className="w-4 h-4" />
                  </button>
                </div>

                {/* Cyber Scanner HUD viewfinder with red lasers */}
                <div className="relative w-full aspect-square max-h-[300px] border border-cyan-500/20 rounded-2xl bg-black overflow-hidden flex items-center justify-center">
                  
                  {/* Neon pulsing diagnostic lines */}
                  <div className="absolute inset-0 grid-bg-dark opacity-10 pointer-events-none" />

                  {/* Interactive scanning lazer light line animated */}
                  <motion.div 
                    className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_rgba(34,211,238,0.8)] pointer-events-none"
                    animate={{
                      top: ['5%', '95%', '5%']
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  />

                  {/* Corner bounds visual HUD indicator */}
                  <div className="absolute top-6 left-6 w-8 h-8 border-t-4 border-l-4 border-cyan-400 rounded-tl pointer-events-none" />
                  <div className="absolute top-6 right-6 w-8 h-8 border-t-4 border-r-4 border-cyan-400 rounded-tr pointer-events-none" />
                  <div className="absolute bottom-6 left-6 w-8 h-8 border-b-4 border-l-4 border-cyan-400 rounded-bl pointer-events-none" />
                  <div className="absolute bottom-6 right-6 w-8 h-8 border-b-4 border-r-4 border-cyan-400 rounded-br pointer-events-none" />

                  {/* Center QR/Barcode Vector simulation */}
                  <div className="flex flex-col items-center justify-center text-center p-4 relative z-10 space-y-4">
                    {scanStatus === 'scanning' ? (
                      <div className="flex flex-col items-center gap-3">
                        {/* Interactive Rotating tech radar */}
                        <div className="relative w-20 h-20">
                          <motion.div 
                            className="absolute inset-0 rounded-full border-2 border-cyan-500/30 border-dashed"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                          />
                          <motion.div 
                            className="absolute inset-[10px] rounded-full border border-cyan-400 flex items-center justify-center"
                            animate={{ scale: [1, 1.15, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <IconDeviceComputerCamera className="w-8 h-8 text-cyan-400" />
                          </motion.div>
                        </div>
                        <span className="text-xs uppercase font-extrabold tracking-widest text-cyan-400 font-mono animate-pulse">
                          MENCOCOKKAN ALGORITMA BARCODE...
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                          <IconCheck className="w-8 h-8" />
                        </div>
                        <span className="text-xs font-black tracking-widest text-emerald-400 font-mono">
                          DECODED: {scanResult}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Subtext and interactive simulation control */}
                <div className="mt-5 space-y-3">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-blue animate-ping shrink-0" />
                    <span className="text-[10px] text-slate-600 font-medium font-sans">
                      Web Audio API diaktifkan: Membunyikan nada penganalisis "BEEP" ketika barcode valid terserap lensa pemindai.
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 text-center font-sans font-medium">
                    Tidak memiliki barcode fisik untuk discan? Anda bisa membiarkan simulator mencari kode demonstrasi secara acak dalam waktu 2 detik!
                  </p>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* DETAIL LOG MONITOR OVERLAY MODAL */}
        <AnimatePresence>
          {isLogModalOpen && activeTicket && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLogModalOpen(false)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
            >
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-2xl w-full bg-white border border-slate-200 text-slate-800 rounded-3xl p-6 relative shadow-2xl flex flex-col max-h-[85vh]"
              >
                {/* Header */}
                <div className="flex justify-between items-start border-b border-slate-100 pb-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                      <h3 className="font-mono text-xs uppercase font-extrabold text-slate-400 tracking-widest ml-1">
                        System Sync Monitor — Full View
                      </h3>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-1.5">
                      <span className="text-[9px] uppercase font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 font-mono">
                        Tiket: {activeTicket.id}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono font-medium">
                        Device: {activeTicket.diagnostic.device}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsLogModalOpen(false)}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer"
                  >
                    <IconX className="w-4 h-4" />
                  </button>
                </div>

                {/* Search Bar for Log Filtering */}
                <div className="mb-4">
                  <div className="relative">
                    <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Cari log atau keyword event (misal: 'SSD', 'thermal', 'diagnosis', dll)..."
                      className="w-full bg-slate-50 text-slate-850 text-xs pl-10 pr-12 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-blue-550/10 transition-colors font-mono font-medium"
                      value={logSearchQuery}
                      onChange={(e) => setLogSearchQuery(e.target.value)}
                    />
                    {logSearchQuery && (
                      <button 
                        onClick={() => setLogSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded text-slate-500 hover:text-slate-800 cursor-pointer text-[10px] uppercase font-bold bg-white border border-slate-200 shadow-sm"
                      >
                        Batal
                      </button>
                    )}
                  </div>
                </div>

                {/* Scrollable logs area */}
                <div className="bg-slate-50 font-mono text-xs text-slate-700 rounded-2xl p-4 overflow-y-auto flex-1 min-h-[250px] border border-slate-200 space-y-3">
                  {activeTicket.logs.filter(log => 
                    log.text.toLowerCase().includes(logSearchQuery.toLowerCase()) || 
                    log.time.toLowerCase().includes(logSearchQuery.toLowerCase())
                  ).length === 0 ? (
                    <div className="text-center py-12 text-slate-500 font-medium font-sans">
                      Tidak ada log sistem yang cocok dengan "<strong>{logSearchQuery}</strong>"
                    </div>
                  ) : (
                    activeTicket.logs.filter(log => 
                      log.text.toLowerCase().includes(logSearchQuery.toLowerCase()) || 
                      log.time.toLowerCase().includes(logSearchQuery.toLowerCase())
                    ).map((log, i) => (
                      <div key={i} className="flex gap-2 border-b border-slate-200/40 pb-2 last:border-0 last:pb-0">
                        <span className="text-slate-400 shrink-0 select-none font-bold">[{log.time}]</span>
                        <span className={`
                          ${log.category === 'warning' ? 'text-amber-600 font-bold' : ''}
                          ${log.category === 'success' ? 'text-emerald-600 font-bold' : ''}
                          ${log.category === 'info' ? 'text-blue-600' : ''}
                          text-slate-750 leading-relaxed
                        `}>
                          {log.text}
                        </span>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer Controls */}
                <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-2 text-[10px] text-slate-550 font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>SYNCHRONIZED WITH OFF-CHAIN BACKEND LOGS v1.02</span>
                  </div>
                  <button
                    onClick={() => {
                      const logStr = activeTicket.logs.map(l => `[${l.time}] (${l.category || 'info'}): ${l.text}`).join('\n');
                      const blob = new Blob([logStr], { type: 'text/plain' });
                      const link = document.createElement('a');
                      link.href = URL.createObjectURL(blob);
                      link.download = `Logs_HSR_${activeTicket.id}.txt`;
                      link.click();
                    }}
                    className="py-1.5 px-3 bg-slate-50 hover:bg-slate-100 text-slate-700 text-[11px] font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-200 shadow-sm"
                  >
                    <IconDownload className="w-3.5 h-3.5 text-blue-600" />
                    <span>Download Log Lengkap (.txt)</span>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* RETAIL DETAILED OFFICIAL INVOICE MODAL */}
        <AnimatePresence>
          {isInvoiceModalOpen && activeTicket && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsInvoiceModalOpen(false)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 overflow-y-auto"
            >
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-2xl w-full bg-white text-slate-800 rounded-3xl p-8 relative shadow-2xl my-8 overflow-hidden"
              >
                {/* Close Button */}
                <button
                  onClick={() => setIsInvoiceModalOpen(false)}
                  className="absolute top-6 right-6 p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer border border-slate-200/50"
                >
                  <IconX className="w-4 h-4" />
                </button>

                {/* Paid Lunas Stamp Watermark */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-dashed border-emerald-500/20 text-emerald-500/40 py-3.5 px-8 font-mono font-black text-3xl uppercase rounded-2xl tracking-widest -rotate-12 select-none pointer-events-none transform flex flex-col items-center justify-center z-0">
                  <span>TELAH DIBAYAR</span>
                  <span className="text-sm font-sans mt-0.5 tracking-normal">PAID LUNAS</span>
                </div>

                <div className="relative z-10 space-y-6">
                  {/* Official Letterhead Header */}
                  <div className="flex flex-col sm:flex-row justify-between items-start border-b pb-6 gap-4">
                    <div>
                      <h2 className="text-xl font-display font-black tracking-tight text-slate-900 border-b-2 border-slate-900 pb-0.5 inline-block">
                        HSR TECHNOLOGY
                      </h2>
                      <p className="text-xs text-slate-600 mt-1.5 font-bold">Official IT Support & Repair Center</p>
                      <p className="text-[10px] text-slate-500 leading-relaxed font-sans font-medium mt-1">
                        Kawasan Grogol Petamburan, Jakarta Barat, DKI Jakarta, 11440<br />
                        Email: support@hsr-technology.com | Tel: +62 812-3445-6789
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="text-[9px] font-black tracking-widest text-emerald-600 uppercase bg-emerald-100/75 px-2.5 py-0.5 rounded font-mono">
                        OFFICIAL STATEMENT OF PAYMENT
                      </span>
                      <h4 className="font-display font-black text-slate-900 text-sm mt-2 font-mono">
                        INV/2026/VI/{activeTicket.id.split('-')[1]}
                      </h4>
                      <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Tanggal Invoice: {activeTicket.bookingDate}</p>
                      <p className="text-[11px] text-emerald-600 font-semibold">Status Tagihan: LUNAS / PAID</p>
                    </div>
                  </div>

                  {/* Customer Details & Technician Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 p-4 rounded-2xl text-xs border border-slate-100">
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">INFORMASI KLIEN</span>
                      <div>
                        <span className="text-slate-400 block text-[9px] uppercase">Nama Customer</span>
                        <strong className="text-slate-800 font-bold block mt-0.5">{activeTicket.clientName}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[9px] uppercase">Kontak Hubung</span>
                        <span className="text-slate-700 font-medium block mt-0.5 text-ellipsis overflow-hidden">{activeTicket.clientEmail} • {activeTicket.clientPhone}</span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">TEKNISI PENANGGUNG JAWAB</span>
                      <div>
                        <span className="text-slate-400 block text-[9px] uppercase">Nama Teknisi</span>
                        <strong className="text-slate-800 font-bold block mt-0.5">{activeTicket.technician.name}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[9px] uppercase">Keterangan Perangkat</span>
                        <span className="text-slate-700 font-medium block mt-0.5">{activeTicket.diagnostic.device}</span>
                      </div>
                    </div>
                  </div>

                  {/* Sub-details of diagnostics notes */}
                  <div className="bg-amber-50/50 border border-amber-100 p-3.5 rounded-2xl text-[11px] text-slate-700 font-sans leading-relaxed">
                    <strong className="text-amber-800 font-bold block text-[9.5px] uppercase tracking-wider mb-1">
                      CATATAN DIAGNOSIS DAN TINDAKAN TEKNISI:
                    </strong>
                    {activeTicket.diagnostic.notes}
                  </div>

                  {/* Itemized Spareparts Table */}
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
                      RINCIAN LAYANAN & MATERIAL SPAREPARTS
                    </span>
                    <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                      <table className="w-full text-xs text-left">
                        <thead className="bg-slate-50 text-slate-500 uppercase text-[9px] font-bold tracking-wider border-b border-slate-100">
                          <tr>
                            <th className="py-3 px-4">Deskripsi Tindakan & Suku Cadang</th>
                            <th className="py-3 px-4 text-right">Harga Resmi</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                          {activeTicket.spareparts.map((p, i) => (
                            <tr key={i} className="hover:bg-slate-50/30 transition-colors">
                              <td className="py-3 px-4 text-slate-800">{p.name}</td>
                              <td className="py-3 px-4 text-right font-mono text-slate-800 font-bold">
                                Rp {p.price.toLocaleString('id-ID')}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr className="bg-emerald-50/15 font-black text-slate-900 border-t border-slate-100">
                            <td className="py-4 px-4 text-xs font-bold text-slate-650">TOTAL DIREALISASIKAN (PAYMENT COMPLETE)</td>
                            <td className="py-4 px-4 text-right text-sm font-mono text-emerald-600 font-extrabold text-base">
                              Rp {activeTicket.basePrice.toLocaleString('id-ID')}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>

                  {/* Verification Statement & Digital Seal */}
                  <div className="flex flex-col sm:flex-row items-center gap-6 justify-between pt-5 border-t border-slate-100">
                    <div className="space-y-1 text-[10px] text-slate-500 max-w-sm">
                      <p className="font-extrabold text-slate-700">Pernyataan Layanan Resmi:</p>
                      <p className="leading-relaxed font-medium">
                        Dokumen invoice ini diterbitkan secara legal oleh sistem otomasi HSR Repair Center. Kuitansi pembayaran ini sah dan mengikat legalitas garansi toko 30 hari untuk pengerjaan perbaikan hardware resmi.
                      </p>
                    </div>
                    
                    {/* Mock Signatures */}
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="p-1 px-2 border border-slate-200/80 rounded-xl bg-slate-50 select-none flex flex-col items-center">
                        <div className="w-12 h-12 flex items-center justify-center bg-white border border-slate-100 rounded-lg shadow-inner">
                          <span className="text-[9px] text-center text-slate-500 uppercase font-mono leading-tight font-black tracking-tighter">
                            HSR<br />SECURE
                          </span>
                        </div>
                        <span className="text-[7.5px] font-mono text-slate-400 mt-1 uppercase font-extrabold tracking-wider">STAMP VERIFIED</span>
                      </div>
                    </div>
                  </div>

                  {/* Print / Download Invoice Button */}
                  <div className="pt-2">
                    <button
                      onClick={handlePrintInvoice}
                      className="w-full py-3 bg-slate-900 border border-slate-900 hover:bg-slate-850 text-white text-xs font-extrabold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow"
                    >
                      <IconDownload className="w-4 h-4 text-cyan-400" />
                      <span>Download PDF Invoice</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Payment Confirmation Modal Overlay */}
        <AnimatePresence>
          {isPaymentFormOpen && activeTicket && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsPaymentFormOpen(false)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
              />
              
              {/* Modal Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh] z-10 text-left font-sans"
              >
                {/* Modal Header */}
                <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50 to-white">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                      <IconCreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-sm">Pembayaran & Konfirmasi</h3>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Tiket #{activeTicket.id}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsPaymentFormOpen(false)}
                    className="p-1 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-650 rounded-xl text-xs font-black transition-all cursor-pointer"
                  >
                    Tutup
                  </button>
                </div>

                {/* Modal Body */}
                <div className="flex-1 overflow-y-auto p-5 space-y-5 text-slate-700 text-xs">
                  
                  {/* Step 1: Choosing a payment method */}
                  <div className="space-y-2">
                    <span className="font-extrabold text-[10px] uppercase tracking-wider text-slate-400 block">Pilih Metode Pembayaran:</span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedMethod('qris')}
                        className={`p-3.5 border rounded-2xl flex flex-col items-center gap-1.5 text-center font-bold cursor-pointer transition-all ${
                          selectedMethod === 'qris' 
                            ? 'border-indigo-600 bg-indigo-50/40 text-indigo-700 shadow-xs' 
                            : 'border-slate-150 hover:bg-slate-50 text-slate-600'
                        }`}
                      >
                        <IconQrcode className="w-5 h-5 text-indigo-600" />
                        <span className="text-[10px] leading-tight block">QRIS Gopay/Dana</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedMethod('mandiri')}
                        className={`p-3.5 border rounded-2xl flex flex-col items-center gap-1.5 text-center font-bold cursor-pointer transition-all ${
                          selectedMethod === 'mandiri' 
                            ? 'border-amber-500 bg-amber-50/40 text-amber-800 shadow-xs' 
                            : 'border-slate-150 hover:bg-slate-50 text-slate-600'
                        }`}
                      >
                        <IconCreditCard className="w-5 h-5 text-amber-500" />
                        <span className="text-[10px] leading-tight block">Bank Mandiri</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedMethod('jago')}
                        className={`p-3.5 border rounded-2xl flex flex-col items-center gap-1.5 text-center font-bold cursor-pointer transition-all ${
                          selectedMethod === 'jago' 
                            ? 'border-orange-500 bg-orange-50/45 text-orange-850 shadow-xs' 
                            : 'border-slate-150 hover:bg-slate-50 text-slate-600'
                        }`}
                      >
                        <IconCreditCard className="w-5 h-5 text-orange-500" />
                        <span className="text-[10px] leading-tight block">Bank Jago</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedMethod('jenius')}
                        className={`p-3.5 border rounded-2xl flex flex-col items-center gap-1.5 text-center font-bold cursor-pointer transition-all ${
                          selectedMethod === 'jenius' 
                            ? 'border-cyan-500 bg-cyan-50/40 text-cyan-800 shadow-xs' 
                            : 'border-slate-150 hover:bg-slate-50 text-slate-600'
                        }`}
                      >
                        <IconCreditCard className="w-5 h-5 text-cyan-500" />
                        <span className="text-[10px] leading-tight block">Bank Jenius</span>
                      </button>
                    </div>
                    
                    <button
                      type="button"
                      className={`w-full p-3 border rounded-2xl flex items-center justify-center gap-3.5 text-center font-bold cursor-pointer transition-all ${
                        selectedMethod === 'bri'
                          ? 'border-blue-600 bg-blue-50/40 text-blue-800 shadow-xs'
                          : 'border-slate-150 hover:bg-slate-50 text-slate-600'
                      }`}
                      onClick={() => setSelectedMethod('bri')}
                    >
                      <IconCreditCard className="w-5 h-5 text-blue-600" />
                      <span className="text-[10px]">Bank Rakyat Indonesia (BRI)</span>
                    </button>
                  </div>

                  {/* Step 2: Payment Target details */}
                  {selectedMethod && (
                    <div className="p-4 bg-slate-50 border rounded-2xl space-y-4">
                      {selectedMethod === 'qris' ? (
                        <div className="space-y-3">
                          <p className="text-[10px] text-slate-500 font-medium text-center leading-relaxed">
                            Pindai Kode QRIS HSR Technology di bawah menggunakan e-Wallet (Gopay, OVO, Dana, LinkAja, ShopeePay) atau Mobile Banking Anda.
                          </p>
                          
                          {/* CSS-drawn high-fidelity QR */}
                          <div className="bg-white p-3 border rounded-2xl flex flex-col items-center gap-1.5 shadow-xs w-44 mx-auto font-sans">
                            <div className="bg-slate-100 p-2 rounded-xl relative">
                              <div className="w-32 h-32 flex flex-wrap gap-[1px] items-center justify-center bg-white p-1">
                                {Array.from({ length: 144 }).map((_, idx) => {
                                  const isDark = (idx % 2 === 0 && idx % 3 !== 0) || (idx % 5 === 0) || (idx < 25) || (idx > 115 && idx % 4 === 0) || (idx % 7 === 0);
                                  return (
                                    <div key={idx} className={`w-[9px] h-[9px] rounded-[1px] ${isDark ? 'bg-slate-900' : 'bg-transparent'}`} />
                                  );
                                })}
                                <div className="absolute inset-0 m-auto w-6 h-6 bg-indigo-900 ring-2 ring-white rounded-md flex items-center justify-center">
                                  <span className="text-[8px] text-white font-black tracking-tight scale-90">HSR</span>
                                </div>
                              </div>
                            </div>
                            <span className="text-[9px] font-sans font-bold text-indigo-800 tracking-widest uppercase">QRIS HSR REPAIR</span>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3 font-sans text-left">
                          <div className="flex justify-between items-start gap-2">
                            <div>
                              <span className="text-[9px] font-bold text-slate-400 block uppercase tracking-wider">
                                {selectedMethod === 'mandiri' ? 'BANK MANDIRI' :
                                 selectedMethod === 'jago' ? 'BANK JAGO' :
                                 selectedMethod === 'jenius' ? 'BANK JENIUS (BTPN)' : 'BANK BRI'}
                              </span>
                              <span className="font-mono font-bold text-slate-850 text-sm tracking-wide">
                                {selectedMethod === 'mandiri' ? '131-00-1234567-8' :
                                 selectedMethod === 'jago' ? '1002-3456-7890' :
                                 selectedMethod === 'jenius' ? '9001-2345-678' : '0012-01-001234-567'}
                              </span>
                              <span className="text-[10px] text-slate-500 block font-medium mt-1">
                                Atas Nama: <strong className="text-slate-700">HSR Technology Pratama</strong>
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                const noRek = selectedMethod === 'mandiri' ? '1310012345678' :
                                              selectedMethod === 'jago' ? '100234567890' :
                                              selectedMethod === 'jenius' ? '90012345678' : '001201001234567';
                                handleCopyAccount(noRek, selectedMethod);
                              }}
                              className="p-1 px-2.5 border border-slate-200 rounded-lg bg-white hover:bg-slate-100 font-bold transition-all flex items-center gap-1.5 cursor-pointer text-[10px] text-slate-700 shadow-2xs shrink-0"
                            >
                              {copiedText === selectedMethod ? (
                                <>
                                  <IconCheck className="w-3.5 h-3.5 text-emerald-600" />
                                  <span className="text-emerald-700">Tersalin</span>
                                </>
                              ) : (
                                <>
                                  <IconCopy className="w-3.5 h-3.5 text-slate-400" />
                                  <span>Salin</span>
                                </>
                              )}
                            </button>
                          </div>
                          <p className="text-[9px] leading-relaxed text-slate-400 italic border-t border-slate-150 pt-2 block">
                            *Mohon sertakan ID Tiket <strong className="text-slate-600 font-bold font-mono">{activeTicket.id}</strong> di kolom berita/catatan transfer Anda untuk verifikasi instan.
                          </p>
                        </div>
                      )}

                      {/* Confirmation form fields */}
                      <div className="space-y-3.5 pt-3 border-t border-slate-200">
                        {/* Sender's name */}
                        <div className="space-y-1 text-left">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">Nama Pengirim / Pemilik Rekening *</label>
                          <input
                            type="text"
                            value={senderName}
                            onChange={(e) => {
                              setSenderName(e.target.value);
                              if (paymentErrors.senderName) {
                                setPaymentErrors(prev => ({ ...prev, senderName: undefined }));
                              }
                            }}
                            placeholder="Contoh: Hasan Suryaman"
                            className={`w-full h-9 px-3 text-xs rounded-xl border font-sans text-slate-850 placeholder-slate-400 bg-white focus:outline-none focus:ring-2 transition-all ${
                              paymentErrors.senderName 
                                ? 'border-rose-400 focus:ring-rose-500/10 focus:border-rose-400' 
                                : 'border-slate-200 focus:ring-indigo-500/10 focus:border-indigo-550'
                            }`}
                          />
                          {paymentErrors.senderName && (
                            <span className="text-rose-600 text-[10px] block mt-0.5">{paymentErrors.senderName}</span>
                          )}
                        </div>

                        {/* Amount */}
                        <div className="space-y-1 text-left">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">Nominal yang Ditransfer (Rupiah) *</label>
                          <div className="relative">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[11px] font-bold text-slate-400">Rp</span>
                            <input
                              type="number"
                              value={transferAmount}
                              onChange={(e) => {
                                setTransferAmount(e.target.value);
                                if (paymentErrors.transferAmount) {
                                  setPaymentErrors(prev => ({ ...prev, transferAmount: undefined }));
                                }
                              }}
                              placeholder="Contoh: 750000"
                              className={`w-full h-9 pl-9 pr-3 text-xs rounded-xl border font-sans text-slate-850 placeholder-slate-400 bg-white focus:outline-none focus:ring-2 transition-all font-mono ${
                                paymentErrors.transferAmount 
                                  ? 'border-rose-400 focus:ring-rose-500/10 focus:border-rose-400' 
                                  : 'border-slate-200 focus:ring-indigo-500/10 focus:border-indigo-550'
                              }`}
                            />
                          </div>
                          {paymentErrors.transferAmount && (
                            <span className="text-rose-600 text-[10px] block mt-0.5">{paymentErrors.transferAmount}</span>
                          )}
                        </div>

                        {/* File upload */}
                        <div className="space-y-1 text-left">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">Unggah Bukti Transfer *</label>
                          
                          {receiptFileBase64 ? (
                            <div className="relative border rounded-xl p-2 bg-slate-50 flex items-center justify-between shadow-2xs">
                              <div className="flex items-center gap-2 truncate">
                                <div className="w-10 h-10 border bg-white rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                                  <img src={receiptFileBase64} className="h-full object-contain" alt="Receipt Preview" referrerPolicy="no-referrer" />
                                </div>
                                <div className="truncate text-left">
                                  <p className="text-[10px] font-bold text-slate-700 truncate">{receiptFileName || 'bukti.jpg'}</p>
                                  <span className="text-[9px] text-slate-400 block font-mono">Tersimpan</span>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  setReceiptFileBase64(null);
                                  setReceiptFileName('');
                                }}
                                className="text-[10px] text-slate-400 hover:text-rose-600 font-bold p-1 px-2.5 border rounded-lg bg-white hover:bg-slate-100 transition-all cursor-pointer shadow-3xs"
                              >
                                Hapus
                              </button>
                            </div>
                          ) : (
                            <div className="relative">
                              <label
                                className={`border-2 border-dashed rounded-xl p-4.5 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all ${
                                  paymentErrors.receipt 
                                    ? 'border-rose-400 bg-rose-50/10 hover:bg-rose-50/25' 
                                    : 'border-slate-200 hover:border-slate-350 hover:bg-slate-50'
                                }`}
                              >
                                <input 
                                  type="file" 
                                  accept="image/*" 
                                  onChange={handleReceiptFileChange}
                                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" 
                                />
                                <IconUpload className={`w-6 h-6 ${paymentErrors.receipt ? 'text-rose-400' : 'text-slate-400'}`} />
                                <span className="text-[10px] font-bold text-slate-650 text-center">Pilih / Tarik Foto Bukti Transfer</span>
                                <span className="text-[9px] text-slate-400 text-center font-medium font-sans">Sistem mendukung JPEG, JPG, atau PNG</span>
                              </label>
                            </div>
                          )}
                          {paymentErrors.receipt && (
                            <span className="text-rose-600 text-[10px] block mt-0.5">{paymentErrors.receipt}</span>
                          )}
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={() => {
                              submitPaymentConfirmation();
                            }}
                            className="w-full h-10 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all duration-300"
                          >
                            <IconSend className="w-4 h-4 text-emerald-100 animate-pulse" />
                            <span>Kirim Konfirmasi Pembayaran</span>
                          </button>
                        </div>

                      </div>
                    </div>
                  )}

                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
