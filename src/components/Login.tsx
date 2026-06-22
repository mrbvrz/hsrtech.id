/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  IconUser, IconLock, IconLogin, IconLogout, IconLayoutDashboard, IconTrash, IconAdjustments, IconDatabase, 
  IconCheck, IconSearch, IconBuilding, IconShieldCheck, IconAlertCircle, IconRefresh, 
  IconSettings, IconActivity, IconFileText, IconCircleCheck, IconClock, IconCircleX, IconPlus, 
  IconArrowLeft, IconKey, IconMail, IconPhone, IconUsers, IconTool, IconChevronRight, IconChevronDown, 
  IconBell, IconHelpCircle, IconDots, IconBriefcase, IconMenu2
} from '@tabler/icons-react';
import { SERVICES } from '../data';
import { Reservation as ReservationType } from '../types';
import Logo from './Logo';
import { useLegalDrawer } from '../context/LegalDrawerContext';

interface LoginProps {
  onLoginSuccess: (role: 'admin' | 'teknisi') => void;
  onNavigateHome: () => void;
  userRole: 'admin' | 'teknisi' | null;
  onLogout: () => void;
}

export default function Login({ onLoginSuccess, onNavigateHome, userRole, onLogout }: LoginProps) {
  const { openTerms, openPrivacy } = useLegalDrawer();
  // Login Panel State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Dashboard Workspace State
  const [activeDashboardTab, setActiveDashboardTab] = useState<'queue' | 'services' | 'logs' | 'settings'>('queue');
  const [reservations, setReservations] = useState<ReservationType[]>([]);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTicket, setSelectedTicket] = useState<ReservationType | null>(null);
  
  // Technician local state to add internal support logs
  const [internalNotes, setInternalNotes] = useState('');
  const [systemLogs, setSystemLogs] = useState<string[]>([
    'Inisialisasi portal aman HSR Berhasil.',
    'Menghubungkan ke database lokal...',
    'Koneksi sinkronisasi siap.'
  ]);

  // CRM Dashboard layout states representing the mockup design
  const [selectedSubTab, setSelectedSubTab] = useState<'overview' | 'tasks' | 'notes'>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [tasksList, setTasksList] = useState<{ id: string; label: string; checked: boolean }[]>([
    { id: 't1', label: 'Verifikasi Fisik & Segel Garansi Hardware', checked: true },
    { id: 't2', label: 'Uji Diagnostik Sistem (Memtest86 & HWMonitor)', checked: true },
    { id: 't3', label: 'Pemberian Pasta Thermal Arctic MX-4 Baru', checked: false },
    { id: 't4', label: 'Instalasi Sistem Operasi & Driver Terkini', checked: false },
    { id: 't5', label: 'Benchmark Stress-Test Beban Daya (Furmark)', checked: false },
    { id: 't6', label: 'Sertifikasi Kelayakan & Label QA Passed', checked: false },
  ]);

  // Load reservations from localStorage on mount & when role changes
  useEffect(() => {
    loadReservations();
  }, [userRole]);

  // Auto-select first reservation for a fully populated CRM view similar to the mockup
  useEffect(() => {
    if (reservations.length > 0 && !selectedTicket) {
      setSelectedTicket(reservations[0]);
    }
  }, [reservations, selectedTicket]);

  const loadReservations = () => {
    const saved = localStorage.getItem('hsr_reservations');
    if (saved) {
      try {
        setReservations(JSON.parse(saved));
      } catch (err) {
        console.error("Gagal membaca reservasi", err);
      }
    } else {
      setReservations([]);
    }
  };

  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setSystemLogs(prev => [`[${time}] ${msg}`, ...prev.slice(0, 15)]);
  };

  // Handle Form Submission
  const handleFormLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    
    if (!username.trim() || !password.trim()) {
      setErrorMsg('Email dan password wajib diisi.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const u = username.toLowerCase().trim();
      const p = password.trim();

      // Support email or clean ID login
      if ((u === 'admin' || u === 'admin@hsr.com') && p === 'admin') {
        onLoginSuccess('admin');
        addLog('Administrator berhasil masuk sistem.');
        setIsLoading(false);
      } else if ((u === 'teknisi' || u === 'teknisi@hsr.com') && p === 'teknisi') {
        onLoginSuccess('teknisi');
        addLog('Teknisi Lapangan berhasil masuk sistem.');
        setIsLoading(false);
      } else {
        setErrorMsg('Email atau password salah. Gunakan kredensial demo di bawah jika sedang menguji.');
        setIsLoading(false);
      }
    }, 800);
  };

  // Google Login Simulation
  const handleGoogleSignIn = () => {
    setIsLoading(true);
    addLog('Menginisiasi gateway autentikasi mandiri Google...');
    setTimeout(() => {
      // Log in as administrator by default for simulation
      onLoginSuccess('admin');
      addLog('Masuk sukses melalui Google Account.');
      setIsLoading(false);
    }, 1000);
  };

  // Change Ticket Status (For authorized userRole)
  const handleChangeStatus = (ticketId: string, newStatus: 'pending' | 'confirmed' | 'completed' | 'cancelled') => {
    const updated = reservations.map(res => {
      if (res.id === ticketId) {
        return { ...res, status: newStatus };
      }
      return res;
    });

    setReservations(updated);
    localStorage.setItem('hsr_reservations', JSON.stringify(updated));
    addLog(`Status tiket ${ticketId} diperbarui menjadi: ${newStatus.toUpperCase()}`);
    
    // Refresh selected ticket details
    if (selectedTicket && selectedTicket.id === ticketId) {
      setSelectedTicket({ ...selectedTicket, status: newStatus });
    }
  };

  // Add Catatan Internal (Saves directly to ticket notes or logs)
  const handleSaveInternalNote = (ticketId: string) => {
    if (!internalNotes.trim()) return;

    const updated = reservations.map(res => {
      if (res.id === ticketId) {
        return { ...res, notes: `${res.notes}\n[Catatan Teknisi]: ${internalNotes}` };
      }
      return res;
    });

    setReservations(updated);
    localStorage.setItem('hsr_reservations', JSON.stringify(updated));
    setSelectedTicket(prev => prev ? { ...prev, notes: `${prev.notes}\n[Catatan Teknisi]: ${internalNotes}` } : null);
    addLog(`Menambahkan catatan internal untuk tiket ${ticketId}.`);
    setInternalNotes('');
  };

  // Move ticket to the next processing stage
  const handleMoveToNextStage = () => {
    if (!selectedTicket) return;
    let nextStatus: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    
    if (selectedTicket.status === 'pending') {
      nextStatus = 'confirmed';
    } else if (selectedTicket.status === 'confirmed') {
      nextStatus = 'completed';
    } else {
      nextStatus = 'completed'; // stays completed
    }

    handleChangeStatus(selectedTicket.id, nextStatus);
    addLog(`Tiket #${selectedTicket.id} dipindahkan ke tahap selanjutnya: ${nextStatus.toUpperCase()}`);
  };

  // Delete Ticket (Admin Only)
  const handleDeleteTicket = (ticketId: string) => {
    if (!window.confirm(`Apakah Anda yakin ingin menghapus tiket #${ticketId} secara permanen? Tindakan ini tidak bisa dibatalkan.`)) {
      return;
    }

    const filtered = reservations.filter(res => res.id !== ticketId);
    setReservations(filtered);
    localStorage.setItem('hsr_reservations', JSON.stringify(filtered));
    setSelectedTicket(null);
    addLog(`Tiket ${ticketId} telah dihapus permanen dari sistem.`);
  };

  // Create Mock Booking Ticket for testing (Admin Only)
  const handleCreateMockTicket = () => {
    const randomService = SERVICES[Math.floor(Math.random() * SERVICES.length)];
    const mockNames = ['Indra Wijaya', 'Santi Lestari', 'Agus Prayogo', 'CV Maju Bersama', 'PT Teknologi Nusantara'];
    const mockNotes = [
      'PC Kantor sering blue-screen tidak menentu saat load tinggi.',
      'Instalasi jalur kabel LAN baru di lantai 2 ruko utama.',
      'CCTV koridor belakang sering lag & rekaman terputus.',
      'Maintenance bulanan VPS server & update sertifikat SSL.',
      'Migrasi sistem pos lokal ke database cloud.'
    ];

    const randomName = mockNames[Math.floor(Math.random() * mockNames.length)];
    const mockId = `HSR-${Date.now().toString().slice(-4)}-${Math.floor(1000 + Math.random() * 9000).toString().slice(-4)}`;

    const newMock: ReservationType = {
      id: mockId,
      serviceId: randomService.id,
      serviceTitle: randomService.title,
      clientName: randomName,
      clientEmail: `${randomName.toLowerCase().replace(/\s+/g, '')}@example.com`,
      clientPhone: '0812' + Math.floor(10000000 + Math.random() * 90000000),
      companyName: randomName.startsWith('PT') || randomName.startsWith('CV') ? randomName : undefined,
      bookingDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      bookingTime: '13:00',
      notes: mockNotes[Math.floor(Math.random() * mockNotes.length)],
      status: 'pending',
      createdAt: new Date().toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    const updated = [newMock, ...reservations];
    setReservations(updated);
    localStorage.setItem('hsr_reservations', JSON.stringify(updated));
    addLog(`Tiket simulasi baru berhasil dibuat: #${mockId}`);
  };

  // Clear All Reservations for testing
  const handleClearAllTickets = () => {
    if (window.confirm('PERINGATAN: Hapus semua riwayat tiket di local storage?')) {
      localStorage.removeItem('hsr_reservations');
      setReservations([]);
      setSelectedTicket(null);
      addLog('Semua tiket di database lokal telah dihapus.');
    }
  };

  // Filter calculations
  const filteredReservations = reservations.filter(res => {
    const matchesStatus = statusFilter === 'all' || res.status === statusFilter;
    const matchesSearch = 
      res.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.serviceTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.notes.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // KPI Calculations
  const totalB = reservations.length;
  const pendingB = reservations.filter(r => r.status === 'pending').length;
  const confirmedB = reservations.filter(r => r.status === 'confirmed').length;
  const completedB = reservations.filter(r => r.status === 'completed').length;
  const cancelledB = reservations.filter(r => r.status === 'cancelled').length;

  if (userRole) {
    return (
      <div className="h-screen w-screen flex bg-[#f5f6fa] text-slate-800 overflow-hidden font-sans">
        
        {/* MOBILE SIDEBAR OVERLAY BACKGROUND */}
        {isSidebarOpen && (
          <div 
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/40 z-40 lg:hidden"
          />
        )}

        {/* 1. PERSISTENT SOLID DEEP-NAVY LEFT SIDEBAR */}
        <div className={`fixed inset-y-0 left-0 z-50 w-68 bg-[#111322] transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col justify-between shrink-0 select-none shadow-xl border-r border-slate-950/20`}>
          
          <div className="flex-1 flex flex-col pt-5 overflow-y-auto no-scrollbar">
            
            {/* Top Brand Logo - Nexus */}
            <div className="px-6 pb-6 flex items-center justify-between border-b border-slate-850/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/30 shrink-0 relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/10" />
                  <span className="text-white font-extrabold text-sm tracking-wider">H</span>
                </div>
                <div className="text-left">
                  <h2 className="text-sm font-extrabold text-slate-100 tracking-tight flex items-center gap-1 leading-none">
                    <span>HSR Nexus</span>
                    <IconChevronDown className="w-3.5 h-3.5 text-slate-450 mt-0.5 shrink-0" />
                  </h2>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5 block leading-none">Enterprise OS</span>
                </div>
              </div>
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden p-1.5 rounded-lg bg-slate-850 text-slate-400 hover:text-white"
              >
                <IconCircleX className="w-4 h-4" />
              </button>
            </div>

            {/* Sidebar Division Groups */}
            <div className="p-4 space-y-6">
              
              {/* Core Apps Group (No Header) */}
              <div className="space-y-1">
                <button
                  onClick={() => {
                    setActiveDashboardTab('queue');
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                    activeDashboardTab === 'queue'
                      ? 'bg-[#1e233b] text-white shadow-inner font-extrabold text-[#1cd27a]'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850/20'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <IconLayoutDashboard className="w-4.5 h-4.5 shrink-0" />
                    <span>Dashboard</span>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setActiveDashboardTab('queue');
                    setSelectedSubTab('tasks');
                    setIsSidebarOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-slate-400 hover:text-slate-200 hover:bg-slate-850/20 text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <IconCircleCheck className="w-4.5 h-4.5 shrink-0" />
                    <span>Task Checklist</span>
                  </div>
                  <span className="bg-rose-500 text-white font-extrabold px-1.5 py-0.5 rounded-full text-[9px] shrink-0 leading-none">
                    1
                  </span>
                </button>

                <button
                  onClick={() => {
                    setActiveDashboardTab('settings');
                    setIsSidebarOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-slate-400 hover:text-slate-200 hover:bg-slate-850/20 text-left"
                >
                  <IconClock className="w-4.5 h-4.5 text-slate-450 shrink-0" />
                  <span>Calendar Schedule</span>
                </button>
              </div>

              {/* Group Label: Sales */}
              <div className="space-y-1 text-left">
                <div className="flex items-center justify-between px-3.5 pb-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
                  <span>Sales</span>
                  <div className="flex items-center gap-1.5 text-slate-550">
                    <IconSearch className="w-3 h-3 cursor-pointer hover:text-slate-300" />
                    <IconPlus className="w-3 h-3 cursor-pointer hover:text-slate-300" />
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    setActiveDashboardTab('queue');
                    setIsSidebarOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all text-slate-400 hover:text-slate-200 hover:bg-slate-850/20 text-left"
                >
                  <IconUsers className="w-4.5 h-4.5 text-slate-450 shrink-0" />
                  <span>Leads Internal</span>
                </button>

                <button
                  onClick={() => {
                    setActiveDashboardTab('queue');
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all text-left ${
                    activeDashboardTab === 'queue'
                      ? 'bg-[#1e233b] text-white font-extrabold ring-1 ring-white/5'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850/20'
                  }`}
                >
                  <IconBriefcase className="w-4.5 h-4.5 text-slate-400 shrink-0" />
                  <span>Opportunities</span>
                </button>

                <button
                  onClick={() => {
                    setActiveDashboardTab('queue');
                    setIsSidebarOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all text-slate-400 hover:text-slate-200 hover:bg-slate-850/20 text-left"
                >
                  <IconUser className="w-4.5 h-4.5 text-slate-450 shrink-0" />
                  <span>Contacts</span>
                </button>

                <button
                  onClick={() => {
                    setActiveDashboardTab('queue');
                    setIsSidebarOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all text-slate-400 hover:text-slate-200 hover:bg-slate-850/20 text-left"
                >
                  <IconBuilding className="w-4.5 h-4.5 text-slate-450 shrink-0" />
                  <span>Companies</span>
                </button>
              </div>

              {/* Group Label: Marketing */}
              <div className="space-y-1 text-left">
                <div className="px-3.5 pb-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
                  <span>Marketing</span>
                </div>

                <button
                  onClick={() => {
                    setActiveDashboardTab('services');
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all text-left ${
                    activeDashboardTab === 'services'
                      ? 'bg-[#1e233b] text-white font-extrabold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850/20'
                  }`}
                >
                  <IconFileText className="w-4.5 h-4.5 text-slate-450 shrink-0" />
                  <span>Forms (Layanan)</span>
                </button>

                <button
                  onClick={() => {
                    setActiveDashboardTab('logs');
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all text-left ${
                    activeDashboardTab === 'logs'
                      ? 'bg-[#1e233b] text-white font-extrabold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850/20'
                  }`}
                >
                  <IconMail className="w-4.5 h-4.5 text-slate-450 shrink-0" />
                  <span>Emails (Audit Logs)</span>
                </button>

                <button
                  onClick={() => {
                    setActiveDashboardTab('logs');
                    setIsSidebarOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all text-slate-400 hover:text-slate-200 hover:bg-slate-850/20 text-left"
                >
                  <IconActivity className="w-4.5 h-4.5 text-slate-450 shrink-0" />
                  <span>Social Media Ads</span>
                </button>
              </div>

              {/* Support & Settings Links */}
              <div className="pt-2 border-t border-slate-850/10 space-y-1">
                <button
                  onClick={() => {
                    setActiveDashboardTab('settings');
                    setIsSidebarOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all text-slate-400 hover:text-slate-200 hover:bg-slate-850/20 text-leftWith"
                >
                  <IconHelpCircle className="w-4.5 h-4.5 text-slate-450 shrink-0" />
                  <span>Help and Support</span>
                </button>

                <button
                  onClick={() => {
                    setActiveDashboardTab('settings');
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all text-left ${
                    activeDashboardTab === 'settings'
                      ? 'bg-[#1e233b] text-white font-extrabold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850/20'
                  }`}
                >
                  <IconSettings className="w-4.5 h-4.5 text-slate-400 shrink-0" />
                  <span>Settings</span>
                </button>
              </div>

            </div>

          </div>

          {/* User Profile Footer Card in Sidebar - Clicking triggers Instant Session Logout */}
          <div className="p-4 border-t border-slate-850/30 bg-[#161a2e]/60">
            <div 
              onClick={onLogout}
              title="Klik untuk Keluar Portal"
              className="p-2.5 rounded-xl hover:bg-slate-850/50 flex items-center justify-between gap-3 cursor-pointer transition-all border border-transparent hover:border-slate-800"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center text-white text-xs font-black uppercase ring-1 ring-white/10 shrink-0 shadow-sm">
                  {userRole === 'admin' ? 'AD' : 'JM'}
                </div>
                <div className="min-w-0 text-left">
                  <p className="font-bold text-xs text-slate-200 truncate leading-tight">
                    {userRole === 'admin' ? 'Hasan Suryaman' : 'John Marpaung'}
                  </p>
                  <p className="text-[10px] text-slate-450 font-mono truncate tracking-wider mt-0.5">
                    {userRole === 'admin' ? 'hasan.s@hsr.com' : 'john@gmail.com'}
                  </p>
                </div>
              </div>
              <IconChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            </div>
          </div>

        </div>

        {/* 2. MAIN APP CONTENT CONTAINER AREA (Right Panel) */}
        <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#fafbfe]">
          
          {/* HEADER TOP BAR */}
          <header className="bg-white border-b border-slate-150 h-16 flex items-center justify-between px-6 shrink-0 z-30 shadow-sm shadow-slate-100/40 select-none">
            
            <div className="flex items-center gap-3">
              {/* Mobile Hamburger toggle */}
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-1.5 rounded-lg bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200 lg:hidden cursor-pointer"
              >
                <IconMenu2 className="w-4 h-4" />
              </button>
              
              {/* Back Backlink icon to web page */}
              <button 
                onClick={onNavigateHome}
                title="Kembali ke Situs Utama"
                className="w-8 h-8 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-150 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
              >
                <IconArrowLeft className="w-4 h-4" />
              </button>

              <div className="text-left hidden sm:block">
                <h1 className="text-sm font-extrabold text-slate-900">
                  {activeDashboardTab === 'queue' ? 'Opportunity Details' : 
                   activeDashboardTab === 'services' ? 'Forms Katalog Layanan' : 
                   activeDashboardTab === 'logs' ? 'Gateway Logs & Monitoring' : 'Settings / Portal Settings'}
                </h1>
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block -mt-0.5">
                  Internal Cloud Gateway
                </span>
              </div>
            </div>

            {/* Right side Action Icons */}
            <div className="flex items-center gap-3.5">
              
              {/* Bell alert */}
              <div className="relative cursor-pointer hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-150 flex items-center justify-center text-slate-600">
                  <IconBell className="w-4 h-4" />
                </div>
                {pendingB > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 animate-pulse ring-2 ring-white" />
                )}
              </div>

              {/* Help trigger */}
              <div 
                onClick={() => alert("Kredensial Demo Portal HSR:\nAdmin: admin / admin\nTeknisi: teknisi / teknisi")}
                className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-150 flex items-center justify-center text-slate-600 cursor-pointer hover:bg-slate-100 transition-colors"
                title="Bantuan Instan"
              >
                <IconHelpCircle className="w-4 h-4" />
              </div>

              {/* Green Action PLUS button */}
              {userRole === 'admin' ? (
                <button
                  onClick={handleCreateMockTicket}
                  className="px-3.5 py-1.5 rounded-lg bg-[#1cd27a] hover:bg-[#18bc6d] text-white flex items-center gap-1.5 text-xs font-bold transition-all shadow-sm shadow-emerald-500/20 cursor-pointer"
                  title="Simulasikan Tiket Reservasi Baru"
                >
                  <IconPlus className="w-4 h-4" />
                  <span className="hidden md:inline">Simulasi Tiket</span>
                </button>
              ) : (
                <button
                  onClick={() => alert("Simulasi reservasi baru dinonaktifkan untuk akun Teknisi. Silakan masuk sebagai Administrator.")}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-300 text-slate-500 flex items-center gap-1.5 text-xs font-semibold cursor-not-allowed"
                >
                  <IconPlus className="w-4 h-4" />
                  <span className="hidden md:inline">Simulasi Tiket</span>
                </button>
              )}

            </div>

          </header>

          {/* SCROLLABLE CENTRAL BODY */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
            
            {/* TAB 1: LEDGER / OPPORTUNITIES TAB */}
            {activeDashboardTab === 'queue' && (
              <div className="space-y-6 max-w-7xl mx-auto">
                {filteredReservations.length === 0 ? (
                  <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center shadow-sm">
                    <IconAdjustments className="w-12 h-12 text-slate-300 mx-auto mb-4 animate-pulse" />
                    <h3 className="font-sans font-extrabold text-sm text-slate-900">Database Ledger Kosong</h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto mt-2 leading-relaxed">
                      Catatan reservasi klien tidak ditemukan. Silakan isi order di form depan atau klik tombol "Simulasi Tiket" hijau di kanan atas (sebagai admin) untuk memicu aliran antrean.
                    </p>
                  </div>
                ) : (
                  /* THE CORE 12-COLUMN DASHBOARD GRID MATCHING THE MOCKUP */
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
                    
                    {/* LEFT CONTAINER COL (8 of 12 cols): STAGES & SPECS */}
                    <div className="lg:col-span-8 space-y-6">
                      
                      {/* Interactive Ledger Queue Mini Panel before Detail */}
                      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm flex items-center gap-3.5 select-none overflow-x-auto no-scrollbar">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 shrink-0">Aliran Berkas:</span>
                        <div className="flex items-center gap-2 shrink-0">
                          {reservations.map((item) => {
                            const isChosen = selectedTicket?.id === item.id;
                            return (
                              <button
                                key={item.id}
                                onClick={() => setSelectedTicket(item)}
                                className={`px-3 py-1 rounded-full text-xs font-bold tracking-tight transition-all cursor-pointer ${
                                  isChosen 
                                    ? 'bg-brand-blue text-white shadow-sm ring-1 ring-blue-500/15'
                                    : 'bg-slate-100 hover:bg-slate-150 text-slate-650'
                                }`}
                              >
                                {item.id}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Giant Deal Title Card */}
                      {selectedTicket && (
                        <div className="space-y-4">
                          <div className="text-left bg-transparent">
                            <span className="text-[11px] font-mono font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded">
                              {selectedTicket.id} ({selectedTicket.bookingDate})
                            </span>
                            
                            <h2 className="text-2xl font-sans font-black tracking-tight text-slate-950 mt-3 leading-tight">
                              {selectedTicket.serviceTitle}
                            </h2>

                            {/* Row subtabs - Overview, Tasks, Notes */}
                            <div className="flex gap-6 border-b border-slate-200/60 mt-5">
                              {['overview', 'tasks', 'notes'].map((tab) => (
                                <button
                                  key={tab}
                                  onClick={() => setSelectedSubTab(tab as any)}
                                  className={`pb-3 text-xs font-extrabold capitalize transition-all relative cursor-pointer ${
                                    selectedSubTab === tab 
                                      ? 'text-[#1cd27a] font-black' 
                                      : 'text-slate-400 hover:text-slate-700'
                                  }`}
                                >
                                  {tab}
                                  {selectedSubTab === tab && (
                                    <div className="absolute bottom-0 left-0 right-0 h-[3px] rounded-full bg-[#1cd27a] transition-all" />
                                  )}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* SUBTAB CONTENT FEED */}
                          <div className="transition-all duration-300">
                            
                            {/* SUBTAB 1: OVERVIEW */}
                            {selectedSubTab === 'overview' && (
                              <div className="space-y-6">
                                
                                {/* 1. STAGES PROGRESS STEPPER WIDGET */}
                                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 text-left">
                                  <div className="flex items-center justify-between">
                                    <h3 className="font-sans font-extrabold text-[#111322] text-xs uppercase tracking-wider">Stages</h3>
                                    <button
                                      onClick={handleMoveToNextStage}
                                      className="px-3.5 py-1.5 rounded-lg border border-slate-200 hover:border-slate-350 hover:bg-slate-50 transition-colors text-xs font-extrabold text-slate-700 cursor-pointer"
                                    >
                                      Move to Next Stage
                                    </button>
                                  </div>

                                  {/* Step Progress visual bar */}
                                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2 select-none">
                                    
                                    {/* STAGE 1: Prospecting / Pending review */}
                                    <div className="space-y-2 text-left">
                                      <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                                          <IconCheck className="w-3.5 h-3.5" />
                                        </div>
                                        <span className="text-xs font-bold text-slate-900 leading-none">Review Antrean</span>
                                      </div>
                                      <div className="h-1 bg-emerald-500 rounded-full" />
                                    </div>

                                    {/* STAGE 2: Kelayakan Klien */}
                                    <div className="space-y-2 text-left">
                                      <div className="flex items-center gap-2">
                                        {selectedTicket.status !== 'pending' ? (
                                          <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                                            <IconCheck className="w-3.5 h-3.5" />
                                          </div>
                                        ) : (
                                          <div className="w-5 h-5 rounded-full border-2 border-slate-200 text-slate-300 flex items-center justify-center shrink-0 text-[10px] font-bold" />
                                        )}
                                        <span className={`text-xs font-bold leading-none ${
                                          selectedTicket.status !== 'pending' ? 'text-slate-900' : 'text-slate-400'
                                        }`}>Sesi Konfirmasi</span>
                                      </div>
                                      <div className={`h-1 rounded-full ${
                                        selectedTicket.status !== 'pending' ? 'bg-emerald-500' : 'bg-slate-150'
                                      }`} />
                                    </div>

                                    {/* STAGE 3: Diagnosa Aktif */}
                                    <div className="space-y-2 text-left">
                                      <div className="flex items-center gap-2">
                                        {(selectedTicket.status === 'confirmed' || selectedTicket.status === 'completed') ? (
                                          <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 animate-pulse">
                                            <IconCheck className="w-3.5 h-3.5" />
                                          </div>
                                        ) : (
                                          <div className="w-5 h-5 rounded-full border-2 border-slate-200 text-slate-300 flex items-center justify-center shrink-0" />
                                        )}
                                        <span className={`text-xs font-bold leading-none ${
                                          (selectedTicket.status === 'confirmed' || selectedTicket.status === 'completed') ? 'text-slate-900' : 'text-slate-400'
                                        }`}>Dikerjakan</span>
                                      </div>
                                      <div className={`h-1 rounded-full ${
                                        (selectedTicket.status === 'confirmed' || selectedTicket.status === 'completed') ? 'bg-emerald-500' : 'bg-slate-150'
                                      }`} />
                                    </div>

                                    {/* STAGE 4: Testing & Uji Kelayakan */}
                                    <div className="space-y-2 text-left">
                                      <div className="flex items-center gap-2">
                                        {selectedTicket.status === 'completed' ? (
                                          <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                                            <IconCheck className="w-3.5 h-3.5" />
                                          </div>
                                        ) : (
                                          <div className="w-5 h-5 rounded-full border-2 border-dashed border-slate-300 text-slate-300 flex items-center justify-center shrink-0" />
                                        )}
                                        <span className={`text-xs font-bold leading-none ${
                                          selectedTicket.status === 'completed' ? 'text-slate-900' : 'text-slate-400'
                                        }`}>Uji Selesai</span>
                                      </div>
                                      <div className={`h-1 rounded-full ${
                                        selectedTicket.status === 'completed' ? 'bg-emerald-500' : 'bg-slate-150'
                                      }`} />
                                    </div>

                                    {/* STAGE 5: Closed / Serah Ambil */}
                                    <div className="space-y-2 text-left">
                                      <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded-full border-2 border-slate-200 text-slate-300 flex items-center justify-center shrink-0" />
                                        <span className="text-xs font-bold text-slate-400 leading-none">Siap Ambil</span>
                                      </div>
                                      <div className="h-1 bg-slate-150 rounded-full" />
                                    </div>

                                  </div>
                                </div>

                                {/* 2. OPPORTUNITY DETAILS GRID CARD */}
                                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6 text-left">
                                  <div>
                                    <h3 className="font-sans font-black text-[#111322] text-sm tracking-tight">Opportunity Details</h3>
                                  </div>

                                  {/* Grid specs */}
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-4">
                                    <div className="space-y-1">
                                      <span className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold block">Opportunity ID</span>
                                      <span className="font-mono text-xs font-bold text-slate-800">{selectedTicket.id}</span>
                                    </div>
                                    <div className="space-y-1">
                                      <span className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold block">Industry</span>
                                      <span className="text-xs font-bold text-slate-800">Technology / Komputer</span>
                                    </div>
                                    <div className="space-y-1">
                                      <span className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold block">Close Date</span>
                                      <span className="text-xs font-bold text-slate-850 font-mono">{selectedTicket.bookingDate}</span>
                                    </div>
                                    <div className="space-y-1">
                                      <span className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold block">Probability</span>
                                      <span className="text-xs font-extrabold text-blue-600">
                                        {selectedTicket.status === 'completed' ? '100%' : selectedTicket.status === 'confirmed' ? '70%' : '30%'}
                                      </span>
                                    </div>
                                  </div>

                                  {/* Group Title 2: Financials */}
                                  <div className="pt-5 border-t border-slate-150">
                                    <h4 className="font-sans font-black text-slate-900 text-xs uppercase tracking-wider mb-4">Financials</h4>
                                    
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-4">
                                      <div className="space-y-1">
                                        <span className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold block">Expected Revenue</span>
                                        <span className="text-xs font-black text-slate-800">IDR 450.000</span>
                                      </div>
                                      <div className="space-y-1">
                                        <span className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold block">Discount Offered</span>
                                        <span className="text-xs font-bold text-slate-800">10% (Privilege Member)</span>
                                      </div>
                                      <div className="space-y-1">
                                        <span className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold block">Subscription Details</span>
                                        <span className="text-xs font-semibold text-slate-800 truncate block">HSR-Sesi-Diagnostik</span>
                                      </div>
                                      <div className="space-y-1">
                                        <span className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold block">Competitor Pricing</span>
                                        <span className="text-xs font-extrabold text-emerald-600">Garansi HSR 30 Hari</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* 3. DETAILS & LIFECYCLE PROGRESS ACTIVITY */}
                                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6 text-left">
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                                    <h3 className="font-sans font-black text-slate-950 text-sm">Activity Track</h3>
                                    
                                    <div className="flex items-center gap-2 select-none">
                                      <span className="text-xs font-bold px-2.5 py-1 text-[#1cd27a] bg-emerald-50 rounded-lg shrink-0">
                                        Mulai: {selectedTicket.bookingTime}
                                      </span>
                                      <span className="text-xs font-mono font-bold text-slate-400 shrink-0">
                                        Sesi: {selectedTicket.bookingDate}
                                      </span>
                                    </div>
                                  </div>

                                  {/* Timeline visual entries */}
                                  <div className="space-y-5">
                                    
                                    {/* Timeline Node 1: Latest Technician Note */}
                                    {selectedTicket.notes && (
                                      <div className="relative pl-6 border-l-2 border-slate-150 space-y-1">
                                        <div className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-indigo-500 ring-4 ring-indigo-50" />
                                        <div className="flex items-center justify-between">
                                          <p className="text-xs font-bold text-slate-900">Kronologi / Catatan Deskripsi Awal:</p>
                                          <span className="text-[10px] font-mono text-slate-400 font-bold">{selectedTicket.createdAt}</span>
                                        </div>
                                        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs text-slate-650 leading-relaxed whitespace-pre-wrap">
                                          {selectedTicket.notes}
                                        </div>
                                      </div>
                                    )}

                                    {/* Timeline Node 2: Setup confirmation */}
                                    <div className="relative pl-6 border-l-2 border-slate-150 space-y-1.5 pb-2">
                                      <div className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-50" />
                                      <p className="text-xs font-extrabold text-slate-900">Opportunity created, diagnostics initialized.</p>
                                      <p className="text-[11px] text-slate-500 leading-relaxed">
                                        Sesi antrean #{selectedTicket.id} terbit atas nama klien {selectedTicket.clientName} dengan preferensi kedatangan rencana: {selectedTicket.bookingDate} Pukul {selectedTicket.bookingTime}.
                                      </p>
                                    </div>

                                  </div>

                                  {/* Inline quick notes input */}
                                  <div className="pt-4 border-t border-slate-150">
                                    <label htmlFor="timeline-note-field" className="block text-[10px] text-slate-450 uppercase font-black tracking-wider mb-2">Simpan Diagnosa Perangkat:</label>
                                    <div className="flex gap-2">
                                      <input
                                        id="timeline-note-field"
                                        type="text"
                                        placeholder="Tulis diagnosa... contoh: Ganti thermal grease processor"
                                        value={internalNotes}
                                        onChange={(e) => setInternalNotes(e.target.value)}
                                        className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 outline-none focus:border-indigo-400 transition-all font-mono"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => handleSaveInternalNote(selectedTicket.id)}
                                        className="px-4.5 bg-brand-blue hover:bg-indigo-700 text-white rounded-xl text-xs font-extrabold transition-colors cursor-pointer shrink-0 shadow-sm"
                                      >
                                        Simpan
                                      </button>
                                    </div>
                                  </div>

                                  {/* Danger Admin Specific Button inside detail */}
                                  {userRole === 'admin' && (
                                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                                      <span className="text-[10px] text-rose-500 font-bold leading-normal">Tindakan ini menghapus seluruh data permanen.</span>
                                      <button
                                        type="button"
                                        onClick={() => handleDeleteTicket(selectedTicket.id)}
                                        className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 font-extrabold text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                                      >
                                        <IconTrash className="w-3.5 h-3.5" />
                                        <span>Hapus Tiket</span>
                                      </button>
                                    </div>
                                  )}

                                </div>

                              </div>
                            )}

                            {/* SUBTAB 2: TASKS CHECKLISTS */}
                            {selectedSubTab === 'tasks' && (
                              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 text-left">
                                <div>
                                  <h3 className="font-sans font-black text-slate-900 text-sm">Task Checklist untuk {selectedTicket.id}</h3>
                                  <p className="text-xs text-slate-500 mt-1">Uji kelaikan perangkat sebelum rilis ke pemesan.</p>
                                </div>

                                <div className="space-y-2.5">
                                  {tasksList.map(task => (
                                    <div 
                                      key={task.id} 
                                      onClick={() => {
                                        setTasksList(tasksList.map(t => t.id === task.id ? { ...t, checked: !t.checked } : t));
                                        addLog(`Tugas reparasi [${task.label}] ditandai sebagai: ${!task.checked ? 'SELESAI' : 'BELUM'}`);
                                      }}
                                      className="flex items-center gap-3.5 p-3.5 bg-slate-50/70 hover:bg-slate-50 border border-slate-200 rounded-xl cursor-pointer select-none transition-colors"
                                    >
                                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors shrink-0 ${
                                        task.checked ? 'bg-[#1cd27a] border-emerald-500 text-white' : 'border-slate-350 bg-white'
                                      }`}>
                                        {task.checked && <IconCheck className="w-3.5 h-3.5" />}
                                      </div>
                                      <span className={`text-xs font-bold ${
                                        task.checked ? 'line-through text-slate-400 font-medium' : 'text-slate-750'
                                      }`}>
                                        {task.label}
                                      </span>
                                    </div>
                                  ))}
                                </div>

                                <div className="pt-3 border-t border-slate-150 flex justify-between items-center text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                                  <span>Jumlah Progress</span>
                                  <span className="font-bold text-slate-800">
                                    {tasksList.filter(t => t.checked).length} dari {tasksList.length} Selesai
                                  </span>
                                </div>
                              </div>
                            )}

                            {/* SUBTAB 3: EXPLICIT NOTES EDITOR */}
                            {selectedSubTab === 'notes' && (
                              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 text-left">
                                <div className="space-y-1">
                                  <h3 className="font-sans font-black text-slate-900 text-sm">Rincian Deskripsi Pemesanan</h3>
                                  <p className="text-xs text-slate-500">Pesan awal yang diinputkan oleh klien.</p>
                                </div>

                                <div className="space-y-3">
                                  <div className="p-4 bg-yellow-50/45 border border-yellow-250/20 rounded-xl text-xs font-mono text-slate-700 leading-relaxed whitespace-pre-wrap">
                                    {selectedTicket.notes}
                                  </div>
                                  
                                  <div className="pt-2">
                                    <label className="block text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-2">Simulasikan Memo Tambahan:</label>
                                    <textarea 
                                      value={internalNotes}
                                      onChange={(e) => setInternalNotes(e.target.value)}
                                      placeholder="Tulis memo teknisi tambahan..."
                                      className="w-full h-24 p-3 font-mono text-xs text-slate-900 border border-slate-200 rounded-xl outline-none focus:border-indigo-400 transition-colors bg-slate-50"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => handleSaveInternalNote(selectedTicket.id)}
                                      className="mt-2.5 px-4.5 py-1.5 bg-brand-blue hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
                                    >
                                      Tambahkan Memo
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}

                          </div>
                        </div>
                      )}

                    </div>

                    {/* RIGHT SIDEBAR PANEL COL (4 of 12 cols): CONTACTS & INDUSTRY SUMMARY CARD */}
                    <div className="lg:col-span-4 space-y-6">
                      
                      {/* 1. CONTACTS CARD COMPILATION */}
                      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5 text-left">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                          <h3 className="font-sans font-black text-slate-950 text-sm tracking-tight">Contacts</h3>
                          <span className="text-slate-400 text-xs font-bold cursor-pointer hover:text-slate-650">+</span>
                        </div>

                        {/* Connection Card Block 1: The Booking Client */}
                        <div className="space-y-3">
                          <span className="text-[9px] uppercase tracking-wider font-extrabold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded block w-fit font-mono">
                            Primary Contact
                          </span>

                          <div className="p-4 rounded-xl border border-slate-150 bg-slate-50/70 flex flex-col space-y-3">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white font-extrabold text-xs shadow-sm">
                                {selectedTicket?.clientName.slice(0, 2).toUpperCase()}
                              </div>
                              <div className="text-left min-w-0">
                                <h4 className="font-extrabold text-xs text-slate-900 truncate leading-tight">
                                  {selectedTicket?.clientName}
                                </h4>
                                <span className="text-[10px] text-slate-400 block mt-0.5">Product Manager / Client</span>
                              </div>
                            </div>

                            <div className="pt-2 border-t border-slate-150 space-y-1.5 text-[11px] font-mono text-slate-550">
                              <p className="flex items-center gap-1.5 truncate">
                                <IconMail className="w-3.5 h-3.5 text-slate-400" />
                                <span>{selectedTicket?.clientEmail}</span>
                              </p>
                              <p className="flex items-center gap-1.5">
                                <IconPhone className="w-3.5 h-3.5 text-slate-400" />
                                <span className="text-slate-800 font-extrabold">{selectedTicket?.clientPhone}</span>
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Connection Card Block 2: Key Influencer */}
                        <div className="space-y-3">
                          <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-500 bg-slate-100 border border-slate-150 px-2 py-0.5 rounded block w-fit font-mono">
                            Key Influencer
                          </span>

                          <div className="p-4 rounded-xl border border-slate-150 bg-slate-50/75 flex flex-col space-y-3">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-400 to-amber-500 flex items-center justify-center text-white font-bold text-xs ring-1 ring-white/10 shadow-xs shrink-0">
                                BS
                              </div>
                              <div className="text-left">
                                <h4 className="font-extrabold text-xs text-slate-900 leading-tight">Budi Setiawan</h4>
                                <span className="text-[10px] text-slate-450 block mt-0.5">Senior Specialist Technician</span>
                              </div>
                            </div>
                            
                            <div className="pt-2 border-t border-slate-150 text-[11px] font-mono text-slate-555">
                              <p className="flex items-center gap-1.5">
                                <IconMail className="w-3.5 h-3.5 text-slate-400" />
                                <span>budi.s@hsr.com</span>
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Connection Card Block 3: Final Approver */}
                        <div className="space-y-3">
                          <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-550 bg-slate-100 border border-slate-150 px-2 py-0.5 rounded block w-fit font-mono">
                            Final Approver
                          </span>

                          <div className="p-4 rounded-xl border border-slate-150 bg-slate-50/75 flex flex-col space-y-3">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-xs shrink-0">
                                HS
                              </div>
                              <div className="text-left">
                                <h4 className="font-extrabold text-xs text-slate-900 leading-tight">Hasan Suryaman</h4>
                                <span className="text-[10px] text-slate-450 block mt-0.5">Portal Lead Architect</span>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>

                      {/* 2. COMPANY PROFILE INFRA CARD */}
                      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 text-left">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                          <h3 className="font-sans font-black text-slate-950 text-xs uppercase tracking-wider">Company</h3>
                          <IconDots className="w-4 h-4 text-slate-400 cursor-pointer" />
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center text-white shadow-md shrink-0 relative overflow-hidden">
                            <div className="absolute inset-0 bg-white/10" />
                            <IconUsers className="w-5 h-5" />
                          </div>
                          
                          <div className="text-left min-w-0">
                            <h4 className="font-extrabold text-sm text-slate-900 truncate">
                              {selectedTicket?.companyName || "Perorangan / Mandiri"}
                            </h4>
                            <span className="text-xs text-[#1cd27a] font-extrabold">Teknologi & Servis</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-[11px] pt-2">
                          <div>
                            <span className="text-slate-400 block text-[9px] uppercase font-extrabold">Industry</span>
                            <span className="font-bold text-slate-800">Hardware Repair</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[9px] uppercase font-extrabold">Location</span>
                            <span className="font-bold text-slate-800">Indonesia</span>
                          </div>
                        </div>

                        <div className="pt-2">
                          <span className="text-slate-400 block text-[9px] uppercase font-extrabold mb-1">Employee Range</span>
                          <span className="px-2.5 py-0.5 text-[10px] font-bold text-violet-700 bg-violet-50 rounded-md border border-violet-100">
                            100K+ Clients
                          </span>
                        </div>
                      </div>

                    </div>

                  </div>
                )}
              </div>
            )}

            {/* TAB 2: SERVICES LIST CATALOG VIEW */}
            {activeDashboardTab === 'services' && (
              <div className="max-w-6xl mx-auto space-y-6 text-left">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
                  <h2 className="text-base font-black text-[#111322]">Katalog Resmi Layanan Servis HSR</h2>
                  <p className="text-xs text-slate-500 mt-1">Daftar penanganan perbaikan yang didukung sistem caching and diagnosa otomatis.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {SERVICES.map((srv) => {
                    const orderCount = reservations.filter(r => r.serviceId === srv.id).length;
                    return (
                      <div key={srv.id} className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-slate-300 transition-all shadow-xs flex flex-col justify-between space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-150 rounded px-2.5 py-0.5">
                              {srv.category}
                            </span>
                            <span className="text-[10px] font-mono text-slate-400 font-extrabold">
                              Order: {orderCount} tiket
                            </span>
                          </div>
                          <h4 className="text-sm font-black text-slate-900">{srv.title}</h4>
                          <p className="text-xs text-slate-500 leading-relaxed font-normal">{srv.description}</p>
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono">
                          <div>
                            <span className="text-slate-400 block text-[9px] uppercase font-bold">Harga Rata-Rata</span>
                            <span className="font-bold text-slate-800">{srv.basePrice}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-slate-400 block text-[9px] uppercase font-bold">Durasi Pengerjaan</span>
                            <span className="font-bold text-slate-800">{srv.estimatedTime}</span>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 3: AUDIT LOGS TERMINAL VIEW */}
            {activeDashboardTab === 'logs' && (
              <div className="max-w-6xl mx-auto space-y-6 text-left">
                
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-base font-black text-[#111322]">Sistem Log & Audit Gateway</h2>
                    <p className="text-xs text-slate-500 mt-1">Pencatatan telemetri and kronologi pergerakan status antrean.</p>
                  </div>
                  <button
                    onClick={() => setSystemLogs([`[${new Date().toLocaleTimeString('id-ID')}] Konsol dibersihkan oleh operator.`])}
                    className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-bold rounded-lg transition-colors cursor-pointer text-slate-705"
                  >
                    Kosongkan Terminal
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 select-none">
                  <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
                    <span className="text-[10px] text-slate-450 uppercase font-black tracking-wider block">Integrasi Gateway</span>
                    <span className="text-sm font-bold font-mono text-slate-900 mt-1 block">HTML5 Cache API</span>
                  </div>
                  <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
                    <span className="text-[10px] text-slate-450 uppercase font-black tracking-wider block">Status Layanan</span>
                    <span className="text-sm font-extrabold font-mono text-[#1cd27a] mt-1 block">CONNECTED</span>
                  </div>
                  <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
                    <span className="text-[10px] text-slate-450 uppercase font-black tracking-wider block">Jenis DBMS</span>
                    <span className="text-sm font-bold font-mono text-slate-900 mt-1 block">Active Caching</span>
                  </div>
                  <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
                    <span className="text-[10px] text-slate-450 uppercase font-black tracking-wider block">Total Antrean</span>
                    <span className="text-sm font-bold font-mono text-indigo-650 mt-1 block">{reservations.length} Tiket</span>
                  </div>
                </div>

                <div className="bg-[#111322] border-4 border-slate-950 p-5 rounded-2xl h-80 overflow-y-auto font-mono text-xs text-emerald-400 space-y-1.5 select-none shadow-lg no-scrollbar">
                  <p className="text-slate-500">// Memulai pelacakan log antrean aktif...</p>
                  {systemLogs.map((log, idx) => (
                    <p key={idx} className="leading-relaxed">{log}</p>
                  ))}
                </div>

              </div>
            )}

            {/* TAB 4: SETTINGS AND AUTHORIZATION */}
            {activeDashboardTab === 'settings' && (
              <div className="max-w-4xl mx-auto space-y-6 text-left">
                
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
                  <h2 className="text-base font-black text-[#111322]">Pengaturan Portal & Hak Akses</h2>
                  <p className="text-xs text-slate-500 mt-1">Konfigurasi sesi penyimpanan virtual and saring otorisasi.</p>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
                  <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">Tingkat Hak Otoritas Sesi</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                      <span className="inline-block text-[10px] font-mono font-bold text-indigo-700 bg-indigo-50 border border-indigo-150 px-2.5 py-0.5 rounded">
                        ADMINISTRATOR / PUSAT
                      </span>
                      <p className="text-xs text-slate-655 leading-relaxed font-normal">
                        Akses menyeluruh untuk simulasi antrean baru, pemecatan / penghapusan data secara massal, serta otorisasi final di seluruh data caching lokal.
                      </p>
                    </div>

                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                      <span className="inline-block text-[10px] font-mono font-bold text-amber-700 bg-amber-50 border border-amber-150 px-2.5 py-0.5 rounded">
                        TEKNISI / LAPANGAN
                      </span>
                      <p className="text-xs text-slate-655 leading-relaxed font-normal">
                        Akses penugasan perbaikan teknis. Dapat mengganti deskripsi penanganan perbaikan dan menandai status penyelesaian perbaikan.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Local Storage Database Purge area */}
                <div className="bg-rose-50/20 border border-rose-100 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5 text-left">
                  <div className="space-y-1">
                    <h4 className="text-xs font-black uppercase text-rose-700 tracking-wider">Pemeliharaan Cache Data</h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-normal">
                      Apakah Anda berniat membersihkan seluruh antrean simulated HSR? Tindakan ini akan mengosongkan seluruh cache di browser internet Anda.
                    </p>
                  </div>
                  <button
                    onClick={handleClearAllTickets}
                    className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs rounded-xl shadow-xs shrink-0 cursor-pointer transition-colors"
                  >
                    Kosongkan Semua Tiket
                  </button>
                </div>

              </div>
            )}

          </div>

          {/* Light minimal corporate footer */}
          <footer className="h-10 border-t border-slate-150 bg-white flex items-center justify-center text-[10px] font-mono text-slate-405 shrink-0 select-none">
            <span>© 2026 HSR TECHNOLOGY • INTERNAL ENTERPRISE GATEWAY</span>
          </footer>

        </div>

      </div>
    );
  }

  // ELSE: RETURN THE VISUALLY POLISHED LOGIN SCREEN
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pt-10 pb-16 relative overflow-hidden flex flex-col justify-between">
      {/* Animated Flowy Background Gradients */}
      <motion.div 
        className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-gradient-to-tr from-blue-100/40 via-sky-100/30 to-transparent rounded-full blur-3xl pointer-events-none"
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-[5%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-indigo-100/30 via-violet-50/25 to-transparent rounded-full blur-3xl pointer-events-none"
        animate={{
          x: [0, -45, 25, 0],
          y: [0, 30, -30, 0],
          scale: [1, 0.95, 1.05, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 flex-grow flex flex-col justify-center">
        
        <AnimatePresence mode="wait">
          <motion.div
            key="login-form-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="max-w-md w-full mx-auto"
          >
            {/* Backlink Logo at the Top */}
            <div className="flex flex-col items-center justify-center mb-6">
              <motion.button
                type="button"
                onClick={onNavigateHome}
                className="p-3.5 bg-white/80 hover:bg-white border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-md cursor-pointer transition-all duration-300 flex items-center justify-center"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                title="Kembali ke Beranda Utama"
              >
                <Logo />
              </motion.button>
            </div>

            {/* Clean White Card Form Wrapper */}
            <div id="login_card" className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-2xl p-8 shadow-xl relative text-left">
              
              {/* Brand Header */}
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-1.5 mb-1 bg-blue-50/50 py-1 px-3 rounded-full w-fit mx-auto border border-blue-100/40">
                  <IconShieldCheck className="w-4 h-4 text-brand-blue" />
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">HSR Portal</span>
                </div>
                <h2 className="text-2xl font-sans font-extrabold tracking-tight text-slate-900 mt-3">
                  Masuk Portal Internal
                </h2>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-normal">
                  Silakan masuk untuk mengakses dasbor admin dan pemantauan pekerjaan teknisi dengan layout multi-pane.
                </p>
              </div>

              <form onSubmit={handleFormLogin} className="space-y-4">
                
                {errorMsg && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-rose-50 border border-rose-100 text-rose-600 p-3 rounded-lg text-xs flex items-start gap-2"
                  >
                    <IconAlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
                    <span>{errorMsg}</span>
                  </motion.div>
                )}

                {/* Email Input */}
                <div>
                  <label htmlFor="email-input" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Email Pengguna
                  </label>
                  <div className="relative">
                    <IconMail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      id="email-input"
                      type="text"
                      required
                      placeholder="contoh: admin@hsr.com atau admin"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 text-xs rounded-lg bg-slate-50 border border-slate-250 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-brand-blue placeholder-slate-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label htmlFor="password-input" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Kata Sandi
                  </label>
                  <div className="relative">
                    <IconLock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      id="password-input"
                      type="password"
                      required
                      placeholder="Masukkan password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 text-xs rounded-lg bg-slate-50 border border-slate-250 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-brand-blue placeholder-slate-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-1.5 bg-brand-blue hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-lg text-xs transition-colors cursor-pointer shadow-sm disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <IconRefresh className="w-3.5 h-3.5 animate-spin" />
                      <span>Mengotentikasi Sesi...</span>
                    </>
                  ) : (
                    <>
                      <IconLogin className="w-3.5 h-3.5" />
                      <span>Masuk Sesi Internal</span>
                    </>
                  )}
                </button>

                {/* Divider */}
                <div className="relative my-4 flex items-center justify-center">
                  <div className="border-t border-slate-200 w-full" />
                  <span className="absolute bg-white px-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Atau
                  </span>
                </div>

                {/* Google Login Option */}
                <motion.button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="w-full flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-250 font-bold py-2.5 px-4 rounded-lg text-xs transition-colors cursor-pointer shadow-sm"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <span className="flex items-center justify-center w-4 h-4 shrink-0 font-display font-black text-blue-600 text-[13px] border border-slate-150 rounded-full bg-slate-50">G</span>
                  <span>Masuk dengan Google</span>
                </motion.button>

              </form>

            </div>

          </motion.div>
        </AnimatePresence>

      </div>
      
      {/* Light Clean Footer Bar */}
      <footer className="text-center text-slate-400 text-[10px] font-mono uppercase tracking-wider select-none pt-8 border-t border-slate-200/60 relative z-10 mt-8 space-y-2.5 pb-6">
        <div>© 2026 HSR Technology • Indonesia Internal Portal Service</div>
        <div className="flex items-center justify-center gap-4 text-slate-500 font-sans tracking-normal normal-case font-bold">
          <button 
            type="button"
            onClick={openTerms} 
            className="hover:text-blue-600 transition-colors cursor-pointer focus:outline-none text-[11px]"
          >
            Syarat Ketentuan
          </button>
          <span className="text-slate-200">•</span>
          <button 
            type="button"
            onClick={openPrivacy} 
            className="hover:text-blue-600 transition-colors cursor-pointer focus:outline-none text-[11px]"
          >
            Kebijakan Privasi
          </button>
        </div>
      </footer>

    </div>
  );
}
