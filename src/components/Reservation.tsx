/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  IconCalendar, IconClock, IconUser, IconMail, IconPhone, IconBuilding, IconFileText, IconCheck, 
  IconChevronRight, IconChevronLeft, IconSparkles, IconCircleCheck, IconRefresh, IconTrash, IconSend
} from '@tabler/icons-react';
import { SERVICES } from '../data';
import { ITService, Reservation as ReservationType } from '../types';

export default function Reservation() {
  const [step, setStep] = useState(1);
  const [selectedServiceId, setSelectedServiceId] = useState<string>(SERVICES[0].id);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('09:00');
  const [notes, setNotes] = useState('');
  
  // Local Database / ledger state
  const [myReservations, setMyReservations] = useState<ReservationType[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [newlyCreatedId, setNewlyCreatedId] = useState('');

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('hsr_reservations');
    if (saved) {
      try {
        setMyReservations(JSON.parse(saved));
      } catch (err) {
        console.error("Failed parsing reservations", err);
      }
    }

    // Listener for selection event from Services page
    const handleSelectService = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setSelectedServiceId(customEvent.detail);
        // Automatically move to step 1
        setStep(1);
      }
    };

    window.addEventListener('selectServiceInBooking', handleSelectService);
    return () => window.removeEventListener('selectServiceInBooking', handleSelectService);
  }, []);

  const activeServiceObj = SERVICES.find(s => s.id === selectedServiceId) || SERVICES[0];

  // Validation
  const isStep2Valid = () => {
    return name.trim() !== '' && 
           email.trim() !== '' && 
           phone.trim() !== '' && 
           bookingDate !== '' && 
           bookingTime !== '' &&
           notes.trim() !== '';
  };

  const handleNextStep = () => {
    if (step === 1 && selectedServiceId) {
      setStep(2);
    } else if (step === 2 && isStep2Valid()) {
      setStep(3);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStep2Valid()) return;

    setIsSubmitting(true);

    // Simulate short network speed submit
    setTimeout(() => {
      const newReservationId = `HSR-${Date.now().toString().slice(-4)}-${Math.floor(1000 + Math.random() * 9000).toString().slice(-4)}`;
      
      const newReservation: ReservationType = {
        id: newReservationId,
        serviceId: selectedServiceId,
        serviceTitle: activeServiceObj.title,
        clientName: name,
        clientEmail: email,
        clientPhone: phone,
        companyName: company || undefined,
        bookingDate,
        bookingTime,
        notes,
        status: 'pending',
        createdAt: new Date().toLocaleDateString('id-ID', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      const updatedReservations = [newReservation, ...myReservations];
      setMyReservations(updatedReservations);
      localStorage.setItem('hsr_reservations', JSON.stringify(updatedReservations));

      setNewlyCreatedId(newReservationId);
      setIsSubmitting(false);
      setBookingSuccess(true);
      setStep(3);
    }, 1200);
  };

  const handleDeleteReservation = (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin membatalkan & menghapus riwayat reservasi ini?")) {
      const filtered = myReservations.filter(r => r.id !== id);
      setMyReservations(filtered);
      localStorage.setItem('hsr_reservations', JSON.stringify(filtered));
    }
  };

  const handleResetBookingForm = () => {
    // Reset inputs
    setName('');
    setEmail('');
    setPhone('');
    setCompany('');
    setBookingDate('');
    setBookingTime('09:00');
    setNotes('');
    setBookingSuccess(false);
    setStep(1);
  };

  // Generate WhatsApp dynamic link back to company
  const generateWhatsAppWebLink = (res: ReservationType) => {
    const text = `Halo HSR Technology, saya ingin konfirmasi reservasi layanan IT.
    
📌 *Detail Tiket:*
- ID Reservasi: ${res.id}
- Layanan: ${res.serviceTitle}
- Tanggal & Waktu: ${res.bookingDate} Pukul ${res.bookingTime} WIB
- Atas Nama: ${res.clientName} ${res.companyName ? `(${res.companyName})` : ''}
- WhatsApp: ${res.clientPhone}
- Kendala/Keluhan: ${res.notes}
    
Mohon segera diproses lebih lanjut, terima kasih!`;

    return `https://wa.me/628123456789?text=${encodeURIComponent(text)}`;
  };

  return (
    <section 
      id="booking" 
      className="py-13 sm:py-24 bg-transparent relative overflow-hidden"
    >
      {/* Background gradients decor */}
      <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-brand-blue bg-blue-50 border border-blue-100 uppercase tracking-widest mb-3"
          >
            <IconCalendar className="w-3.5 h-3.5" />
            <span>Reservasi Online</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-display font-extrabold text-brand-dark tracking-tight mb-4"
          >
            Formulir Reservasi Layanan Mandiri
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-600 font-medium"
          >
            Booking jadwal kunjungan teknisi atau penjadwalan remote support secara kilat. Estimasi waktu langsung ditampilkan.
          </motion.p>
        </div>

        {/* Master Content: Split Booking engine & Current client local list */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Interactive Booking Wizard */}
          <div className="lg:col-span-7">
            <div className="bg-slate-50 border border-slate-150 rounded-3xl p-6 sm:p-8">
              
              {/* Wizard Steps indicator */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
                {[
                  { num: 1, label: 'Layanan' },
                  { num: 2, label: 'Biodata & Jadwal' },
                  { num: 3, label: 'Selesai' }
                ].map((s) => (
                  <div key={s.num} className="flex items-center gap-2">
                    <span className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-colors ${
                      step === s.num 
                        ? 'bg-brand-blue text-white shadow-md shadow-blue-500/20' 
                        : step > s.num 
                          ? 'bg-emerald-500 text-white' 
                          : 'bg-slate-200 text-slate-500'
                    }`}>
                      {step > s.num ? <IconCheck className="w-4 h-4" /> : s.num}
                    </span>
                    <span className={`text-xs font-extrabold transition-colors hidden sm:block ${
                      step === s.num ? 'text-brand-dark' : 'text-slate-400'
                    }`}>
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Step Forms */}
              <AnimatePresence mode="wait">
                
                {/* STEP 1: SERVICE CHOICE */}
                {step === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Pilih Jenis Jasa Jaminan Teknologi
                    </label>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-1">
                      {SERVICES.map((serv) => {
                        const isSelected = selectedServiceId === serv.id;
                        return (
                          <div
                            key={serv.id}
                            onClick={() => setSelectedServiceId(serv.id)}
                            className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                              isSelected 
                                ? 'bg-white border-brand-blue ring-2 ring-blue-500/10 shadow-sm' 
                                : 'bg-white hover:bg-slate-55 border-slate-150 hover:border-slate-300'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                                isSelected ? 'bg-blue-100 text-brand-blue' : 'bg-slate-100 text-slate-500'
                              }`}>
                                {serv.title.includes('Komputer') ? <IconUser className="w-4 h-4" /> : <IconCalendar className="w-4 h-4" />}
                              </span>
                              <div>
                                <h4 className="text-xs font-bold text-brand-dark">{serv.title}</h4>
                                <p className="text-[10px] text-slate-500 mt-0.5 mt-1 line-clamp-2">{serv.tagline}</p>
                              </div>
                            </div>
                            <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-4 text-[10px] font-semibold">
                              <span className="text-slate-400 uppercase">Estimasi Waktu</span>
                              <span className="text-brand-blue font-bold">{serv.estimatedTime}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Selected Service Quick Info */}
                    <div className="bg-blue-50/40 border border-blue-100 rounded-2xl p-4 mt-6">
                      <h4 className="text-xs font-bold text-brand-blue uppercase tracking-wider mb-1">Rincian Estimasi Jasa Pilihan:</h4>
                      <p className="text-slate-800 font-extrabold text-sm">{activeServiceObj.title}</p>
                      <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-blue-100/30 text-xs">
                        <div>
                          <span className="block text-slate-400">Estimasi Durasi</span>
                          <span className="font-bold text-brand-dark">{activeServiceObj.estimatedTime}</span>
                        </div>
                        <div>
                          <span className="block text-slate-400">Prioritas Layanan</span>
                          <span className="font-bold text-emerald-600 uppercase tracking-wide">High Priority / On-Demand</span>
                        </div>
                      </div>
                    </div>

                    {/* Step Controls */}
                    <div className="flex justify-end pt-6">
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-white bg-brand-blue hover:bg-blue-700 shadow-md shadow-blue-500/15 cursor-pointer"
                      >
                        <span>Langkah berikutnya</span>
                        <IconChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                  </motion.div>
                )}

                {/* STEP 2: DATA & AGENDAS */}
                {step === 2 && (
                  <form onSubmit={handleSubmitBooking} className="space-y-4">
                    
                    {/* Basic info Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Name input */}
                      <div>
                        <label htmlFor="client-name" className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Nama Lengkap *</label>
                        <div className="relative">
                          <IconUser className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input 
                            type="text"
                            id="client-name"
                            required
                            placeholder="Contoh: Hasan Suryaman"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-brand-blue outline-none"
                          />
                        </div>
                      </div>

                      {/* Phone input */}
                      <div>
                        <label htmlFor="client-phone" className="block text-[11px] font-bold text-slate-500 uppercase mb-1">No. WhatsApp *</label>
                        <div className="relative">
                          <IconPhone className="w-4 h-4 text-emerald-600 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input 
                            type="tel"
                            id="client-phone"
                            required
                            placeholder="Contoh: 08123456789"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-brand-blue outline-none"
                          />
                        </div>
                      </div>

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Email input */}
                      <div>
                        <label htmlFor="client-email" className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Alamat Email *</label>
                        <div className="relative">
                          <IconMail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input 
                            type="email"
                            id="client-email"
                            required
                            placeholder="Contoh: name@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-brand-blue outline-none"
                          />
                        </div>
                      </div>

                      {/* Company input */}
                      <div>
                        <label htmlFor="client-company" className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Nama Perusahaan (Optional)</label>
                        <div className="relative">
                          <IconBuilding className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input 
                            type="text"
                            id="client-company"
                            placeholder="Contoh: PT Sukses Mandiri"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-brand-blue outline-none"
                          />
                        </div>
                      </div>

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Date selection input */}
                      <div>
                        <label htmlFor="booking-date" className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Tanggal Kunjungan / Diagnosa *</label>
                        <div className="relative">
                          <IconCalendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input 
                            type="date"
                            id="booking-date"
                            required
                            value={bookingDate}
                            onChange={(e) => setBookingDate(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-brand-blue outline-none"
                          />
                        </div>
                      </div>

                      {/* Time selection input */}
                      <div>
                        <label htmlFor="booking-time" className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Waktu Booking *</label>
                        <div className="relative">
                          <IconClock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <select 
                            id="booking-time"
                            value={bookingTime}
                            onChange={(e) => setBookingTime(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-brand-blue outline-none"
                          >
                            <option value="09:00">09:00 WIB (Pagi)</option>
                            <option value="11:00">11:00 WIB (Siang)</option>
                            <option value="13:00">13:00 WIB (Siang)</option>
                            <option value="15:00">15:00 WIB (Sore)</option>
                            <option value="17:00">17:00 WIB (Sore)</option>
                            <option value="19:00">19:00 WIB (Malam - Urgent)</option>
                          </select>
                        </div>
                      </div>

                    </div>

                    {/* Deskripsi Keluhan / Notes input */}
                    <div>
                      <label htmlFor="booking-notes" className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Deskripsi Keluhan & Spesifikasi Perangkat *</label>
                      <div className="relative">
                        <IconFileText className="w-4 h-4 text-slate-400 absolute left-3 top-4" />
                        <textarea 
                          id="booking-notes"
                          required
                          rows={4}
                          placeholder="Jelaskan kendala secara mendalam (Contoh: Laptop Asus ROG lambat, sering mati sendiri tiap main game baru 15 menit, minta tolong dibersihkan thermal paste sekalian check SSD)"
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          className="w-full pl-9 pr-3 py-3 text-xs rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-brand-blue outline-none resize-none"
                        />
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-650 hover:bg-slate-150 transition-colors cursor-pointer"
                      >
                        <IconChevronLeft className="w-4 h-4" />
                        <span>Layanan</span>
                      </button>

                      <button
                        type="submit"
                        disabled={!isStep2Valid() || isSubmitting}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-white bg-brand-blue hover:bg-blue-700 shadow-md shadow-blue-500/15 disabled:bg-slate-300 disabled:cursor-not-allowed cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <IconRefresh className="w-4 h-4 animate-spin" />
                            <span>Mengirimkan data...</span>
                          </>
                        ) : (
                          <>
                            <span>Ajukan Reservasi</span>
                            <IconChevronRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>

                  </form>
                )}

                {/* STEP 3: RESERVATION COMPLETED */}
                {step === 3 && bookingSuccess && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-6 flex flex-col items-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mb-2">
                      <IconCircleCheck className="w-10 h-10" />
                    </div>

                    <h3 className="text-xl font-display font-extrabold text-brand-dark">Reservasi Berhasil Diajukan!</h3>
                    
                    <p className="text-slate-600 text-xs sm:text-sm max-w-sm leading-relaxed">
                      Tiket reservasi Anda telah berhasil digenerate di database sistem offline. ID Tiket Anda: <span className="font-extrabold text-brand-blue">{newlyCreatedId}</span>.
                    </p>

                    <div className="bg-white border border-slate-150 p-4 rounded-xl text-left w-full max-w-sm space-y-2 text-xs">
                      <div className="flex justify-between border-b pb-1">
                        <span className="text-slate-400">Jasa</span>
                        <span className="font-bold text-brand-dark">{activeServiceObj.title}</span>
                      </div>
                      <div className="flex justify-between border-b pb-1">
                        <span className="text-slate-400">Tanggal</span>
                        <span className="font-bold text-brand-dark">{bookingDate}</span>
                      </div>
                      <div className="flex justify-between border-b pb-1">
                        <span className="text-slate-400">Jam booking</span>
                        <span className="font-bold text-brand-dark">{bookingTime} WIB</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Klien</span>
                        <span className="font-bold text-brand-dark">{name}</span>
                      </div>
                    </div>

                    <div className="pt-6 flex flex-col sm:flex-row items-center gap-3 w-full max-w-sm">
                      <a
                        href={generateWhatsAppWebLink(myReservations[0])}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-500/10 transition-colors w-full cursor-pointer"
                      >
                        <IconSend className="w-4 h-4" />
                        <span>Konfirmasi via WhatsApp</span>
                      </a>
                      
                      <button
                        type="button"
                        onClick={handleResetBookingForm}
                        className="px-4 py-3 rounded-xl text-xs font-bold text-slate-500 hover:text-brand-dark hover:bg-slate-100 transition-colors border border-slate-200 w-full sm:w-auto cursor-pointer"
                      >
                        Booking Baru
                      </button>
                    </div>

                  </motion.div>
                )}

              </AnimatePresence>

            </div>
          </div>

          {/* Right Column: Ticket Ledger / Live Dashboard of My Reservations */}
          <div id="reservation-tracker" className="lg:col-span-5 scroll-mt-24">
            <div className="bg-brand-dark text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden h-full flex flex-col justify-between shadow-xl min-h-[450px]">
              
              <div className="absolute inset-0 grid-bg-dark opacity-10 pointer-events-none" />

              <div className="relative z-10 space-y-6 flex-1">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-blue-400">Monitoring Lokal</span>
                    <h3 className="font-display font-extrabold text-lg">Tiket Reservasi Saya</h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] bg-slate-850 font-bold text-cyan-400 border border-slate-800">
                    {myReservations.length} Aktif
                  </span>
                </div>

                {/* Queue List scroll */}
                <div className="space-y-4 max-h-[380px] overflow-y-auto no-scrollbar pr-1 flex-1">
                  {myReservations.length === 0 ? (
                    <div className="text-center py-20 text-slate-500 flex flex-col items-center space-y-3">
                      <IconCalendar className="w-10 h-10 text-slate-700" />
                      <div className="text-xs">
                        <p className="font-bold">Belum ada riwayat reservasi.</p>
                        <p className="mt-1">Isi formulir wizard di sebelah kiri untuk melihat daftar tiket atau mengonfirmasi tindakan.</p>
                      </div>
                    </div>
                  ) : (
                    myReservations.map((res) => (
                      <motion.div
                        key={res.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-slate-900 border border-slate-850 p-4 rounded-2xl flex flex-col justify-between gap-3 relative group"
                      >
                        <button
                          onClick={() => handleDeleteReservation(res.id)}
                          className="absolute right-3 top-3 p-1 rounded hover:bg-rose-950/50 text-slate-500 hover:text-rose-400 transition-colors"
                          title="Hapus / Batalkan"
                        >
                          <IconTrash className="w-3.5 h-3.5" />
                        </button>

                        <div>
                          <div className="flex items-center gap-2 text-[10px] text-blue-400 font-bold uppercase tracking-wide">
                            <span>{res.id}</span>
                            <span>•</span>
                            <span className="text-slate-500 font-normal">{res.createdAt}</span>
                          </div>

                          <h4 className="text-sm font-bold text-white mt-1 border-b border-slate-850/30 pb-2">{res.serviceTitle}</h4>

                          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 pt-2">
                            <span className="flex items-center gap-1">
                              <IconCalendar className="w-3 h-3" /> {res.bookingDate}
                            </span>
                            <span className="flex items-center gap-1">
                              <IconClock className="w-3 h-3" /> Pukul {res.bookingTime}
                            </span>
                          </div>

                          <p className="text-[11px] text-slate-400 italic line-clamp-2 mt-2 bg-black/20 p-2 rounded-lg">
                            "{res.notes}"
                          </p>
                        </div>

                        {/* Ticket Interactive Actions */}
                        <div className="flex items-center justify-between pt-3 border-t border-slate-850 mt-1">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold text-amber-400 bg-amber-400/5 border border-amber-400/10">
                            Menunggu Review HSR
                          </span>

                          <a
                            href={generateWhatsAppWebLink(res)}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[10px] font-extrabold text-emerald-400 hover:underline flex items-center gap-0.5"
                          >
                            <span>Kirim ke WhatsApp</span>
                            <IconChevronRight className="w-3 h-3 animate-pulse" />
                          </a>
                        </div>

                      </motion.div>
                    ))
                  )}
                </div>

              </div>

              {/* Bottom ledger info */}
              <div className="pt-4 border-t border-slate-800 text-[10px] text-slate-500 flex items-center justify-between relative z-10 text-right mt-4">
                <span>DATABASE RESERVASTION LOCAL ONLY</span>
                <span>SYSTEM VERSION 22.0</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
