import React, { createContext, useContext, useState } from 'react';
import { Drawer } from 'vaul';
import { IconShield, IconFileText, IconLock, IconInfoCircle, IconX } from '@tabler/icons-react';

interface LegalDrawerContextType {
  openTerms: () => void;
  openPrivacy: () => void;
}

const LegalDrawerContext = createContext<LegalDrawerContextType | undefined>(undefined);

export function useLegalDrawer() {
  const context = useContext(LegalDrawerContext);
  if (!context) {
    throw new Error('useLegalDrawer must be used within a LegalDrawerProvider');
  }
  return context;
}

export function LegalDrawerProvider({ children }: { children: React.ReactNode }) {
  const [isOpenTerms, setIsOpenTerms] = useState(false);
  const [isOpenPrivacy, setIsOpenPrivacy] = useState(false);

  const openTerms = () => {
    setIsOpenTerms(true);
    setIsOpenPrivacy(false);
  };

  const openPrivacy = () => {
    setIsOpenPrivacy(true);
    setIsOpenTerms(false);
  };

  return (
    <LegalDrawerContext.Provider value={{ openTerms, openPrivacy }}>
      {children}

      {/* SYARAT & KETENTUAN DRAWER (Full-screen Light Theme) */}
      <Drawer.Root open={isOpenTerms} onOpenChange={setIsOpenTerms}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-slate-900/40 backdrop-blur-lg z-[999] transition-all duration-300" />
          <Drawer.Content 
            id="terms-drawer-content"
            className="fixed bottom-0 left-0 right-0 z-[1000] flex h-full md:h-[67vh] flex-col bg-white outline-none text-slate-800 shadow-2xl w-full max-w-none border-t border-slate-200 rounded-t-[24px] md:rounded-t-[32px]"
          >
            <div className="mx-auto w-full max-w-7xl flex flex-col h-full overflow-hidden">
              {/* Minimal grab indicator */}
              <div className="flex justify-center pt-3 pb-1 shrink-0">
                <div className="w-12 h-1 rounded-full bg-slate-200 cursor-grab active:cursor-grabbing" />
              </div>

              {/* Header */}
              <div className="px-6 pb-4 pt-1 border-b border-slate-100 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                    <IconFileText className="w-5 h-5" />
                  </div>
                  <div>
                    <Drawer.Title className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                      Syarat & Ketentuan Layanan
                    </Drawer.Title>
                    <p className="text-xs text-slate-500">Terakhir diperbarui: Juni 2026 • HSR Technology</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpenTerms(false)}
                  className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
                  aria-label="Tutup"
                >
                  <IconX className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8 space-y-6 text-sm text-slate-650 leading-relaxed scrollbar-thin">
                <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 flex items-start gap-3">
                  <IconInfoCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-900">
                    Dengan mendaftarkan reservasi servis, menggunakan layanan IT korporasi, atau mengakses platform HSR Technology, Anda dianggap telah menyetujui, tunduk, dan terikat dengan seluruh poin kesepakatan di bawah ini.
                  </p>
                </div>

                <section className="space-y-2">
                  <h3 className="text-slate-900 font-bold text-base flex items-center gap-2">
                    <span className="text-blue-600">1.</span> Kebijakan Layanan Perbaikan & Servis
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-slate-600">
                    <li>Setiap perangkat (Laptop, PC, Server, Smart Device) yang diserahkan untuk proses diagnosis akan diperiksa secara mendalam dalam waktu 1-3 hari kerja sebelum estimasi biaya diajukan kepada pelanggan.</li>
                    <li>Pelanggan wajib memberikan informasi tentang riwayat kerusakan perangkat sejelas-jelasnya. Kerusakan tidak terduga pada komponen lain yang timbul akibat gejala bawaan yang tidak dilaporkan bukan tanggung jawab teknisi HSR.</li>
                    <li>Jika estimasi biaya ditolak oleh pelanggan setelah analisis teknis selesai, biaya manajemen/inspeksi standar sebesar Rp 50.000,- mungkin tetap dikenakan untuk diagnosis mendalam.</li>
                  </ul>
                </section>

                <section className="space-y-2">
                  <h3 className="text-slate-900 font-bold text-base flex items-center gap-2">
                    <span className="text-blue-600">2.</span> Garansi Suku Cadang & Jasa
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-slate-600">
                    <li>Semua penggantian suku cadang hardware resmi dijamin oleh garansi HSR Technology selama 30 hingga 90 hari kalender sejak serah terima kelayakan selesai.</li>
                    <li>Garansi akan hangus/tidak berlaku apabila ditemukan tanda-tanda kerusakan fisik baru akibat kelalaian pelanggan (terjatuh, terkena air, korsleting petir lokal), atau segel garansi resmi HSR rusak/terbuka.</li>
                    <li>Garansi jasa instalasi software murni hanya mencakup kestabilan konfigurasi awal; tidak mencakup infeksi ransomware baru dari aktivitas unduhan ilegal secara mandiri oleh pengguna pasca-perbaikan.</li>
                  </ul>
                </section>

                <section className="space-y-2">
                  <h3 className="text-slate-900 font-bold text-base flex items-center gap-2">
                    <span className="text-blue-600">3.</span> Hak Reservasi Online & Jam Kunjungan
                  </h3>
                  <p className="text-slate-600">
                    Sistem pemesanan/reservasi online kami dirancang untuk memprioritaskan waktu kunjungan survei Anda. 
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-slate-600">
                    <li>Reservasi berstatus "Menunggu Konfirmasi" akan divalidasi oleh helpdesk kami dalam waktu maksimal 2 jam selama jam kerja operasional (Senin - Sabtu, 09:00 - 18:00 WIB).</li>
                    <li>Penjadwalan ulang kunjungan harus diajukan setidaknya 3 jam sebelum jadwal yang disepakati guna efisiensi akomodasi tim lapangan kami.</li>
                  </ul>
                </section>

                <section className="space-y-2">
                  <h3 className="text-slate-900 font-bold text-base flex items-center gap-2">
                    <span className="text-blue-600">4.</span> Keamanan Data Pelanggan
                  </h3>
                  <p className="text-slate-600">
                    Kami sangat menghargai privasi informasi Anda. Sebelum menyerahkan perangkat penyimpanan data (HDD/SSD) untuk instalasi ulang atau perbaikan, pelanggan sangat dianjurkan untuk melakukan pencadangan data mandiri jika memungkinkan. 
                    Meskipun kami melakukan tindakan pengamanan ekstra selama masa perbaikan di laboratorium, HSR Technology tidak bertanggung jawab atas kerugian finansial atau kehilangan data non-sistemik yang terjadi akibat kerusakan fisik memori penyimpanan internal pelanggan.
                  </p>
                </section>

                <section className="space-y-2">
                  <h3 className="text-slate-900 font-bold text-base flex items-center gap-2">
                    <span className="text-blue-600">5.</span> Batas Batalkan Kendali Perjanjian (SLA)
                  </h3>
                  <p className="text-slate-600">
                    Perangkat yang sudah dinyatakan selesai di-servis dan siap diambil namun tidak diambil oleh pelanggan dalam kurun waktu 90 hari kalender tanpa ada konfirmasi tertulis tambahan, akan masuk ke penyimpanan cadangan logistik dan HSR berhak mengaturnya sesuai kebijakan penyimpanan internal kami untuk menutup biaya komponen yang telah dipasang.
                  </p>
                </section>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>

      {/* KEBIJAKAN PRIVASI DRAWER (Full-screen Light Theme) */}
      <Drawer.Root open={isOpenPrivacy} onOpenChange={setIsOpenPrivacy}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-slate-900/40 backdrop-blur-lg z-[999] transition-all duration-300" />
          <Drawer.Content 
            id="privacy-drawer-content"
            className="fixed bottom-0 left-0 right-0 z-[1000] flex h-full md:h-[67vh] flex-col bg-white outline-none text-slate-800 shadow-2xl w-full max-w-none border-t border-slate-200 rounded-t-[24px] md:rounded-t-[32px]"
          >
            <div className="mx-auto w-full max-w-7xl flex flex-col h-full overflow-hidden">
              {/* Minimal grab indicator */}
              <div className="flex justify-center pt-3 pb-1 shrink-0">
                <div className="w-12 h-1 rounded-full bg-slate-200 cursor-grab active:cursor-grabbing" />
              </div>

              {/* Header */}
              <div className="px-6 pb-4 pt-1 border-b border-slate-100 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                    <IconLock className="w-5 h-5" />
                  </div>
                  <div>
                    <Drawer.Title className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                      Kebijakan Privasi
                    </Drawer.Title>
                    <p className="text-xs text-slate-500">Terakhir diperbarui: Juni 2026 • Kebijakan Keamanan Data</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpenPrivacy(false)}
                  className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
                  aria-label="Tutup"
                >
                  <IconX className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8 space-y-6 text-sm text-slate-650 leading-relaxed scrollbar-thin">
                <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 flex items-start gap-3">
                  <IconShield className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-emerald-900">
                    HSR Technology berkomitmen penuh untuk menjaga keamanan, kerahasiaan, dan kedaulatan data pribadi para pelanggan, korporasi, serta teknisi kami demi ekosistem IT yang aman dan tepercaya.
                  </p>
                </div>

                <section className="space-y-2">
                  <h3 className="text-slate-900 font-bold text-base flex items-center gap-2">
                    <span className="text-emerald-600">1.</span> Informasi yang Kami Kumpulkan
                  </h3>
                  <p className="text-slate-600">Kami mengumpulkan data seperlunya ketika Anda membuat reservasi layanan atau berinteraksi di portal kami, meliputi:</p>
                  <ul className="list-disc pl-5 space-y-2 text-slate-600">
                    <li><strong className="text-slate-900">Data Identitas:</strong> Nama lengkap pelanggan atau narahubung korporasi.</li>
                    <li><strong className="text-slate-900">Kontak Detail:</strong> Nomor telepon seluler atau WhatsApp aktif dan alamat surat elektronik (Email).</li>
                    <li><strong className="text-slate-900">Informasi Lokasi:</strong> Alamat detail titik kunjungan perawatan IT / pemasangan sistem CCTV.</li>
                    <li><strong className="text-slate-900">Metadata Perangkat:</strong> Spesifikasi kasar laptop, PC, atau server yang sedang diservis guna pencatatan riwayat kerusakan secara spesifik.</li>
                  </ul>
                </section>

                <section className="space-y-2">
                  <h3 className="text-slate-900 font-bold text-base flex items-center gap-2">
                    <span className="text-emerald-600">2.</span> Penggunaan Data Terbimbing
                  </h3>
                  <p className="text-slate-600">Data pribadi yang dikirimkan kepada kami eksklusif digunakan untuk:</p>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600">
                    <li>Validasi dan penjadwalan kunjungan survei lapangan.</li>
                    <li>Pengiriman kuitansi digital, estimasi biaya reparasi, dan penagihan resmi (Invoice).</li>
                    <li>Menghubungi Anda perihal status perbaikan perangkat Anda melalui WhatsApp otomatis.</li>
                    <li>Audit teknisi internal untuk monitoring peningkatan kualitas layanan secara internal.</li>
                  </ul>
                  <p className="text-rose-600 font-semibold text-xs mt-2 bg-rose-50 border border-rose-100 p-2.5 rounded-lg flex items-center gap-1.5">
                    <span>⚠</span> HSR Technology MENJAMIN 100% tidak akan menjual, menyewakan, atau mendistribusikan data kontak pribadi Anda ke pihak pengiklan luar mana pun.
                  </p>
                </section>

                <section className="space-y-2">
                  <h3 className="text-slate-900 font-bold text-base flex items-center gap-2">
                    <span className="text-emerald-600">3.</span> Hak Akses File & Data di Dalam Perangkat
                  </h3>
                  <p className="text-slate-600">
                    Selama perbaikan sistem operasi (OS) atau pemindahan repositori penyimpanan, tim teknisi kami mematuhi SOP perlindungan tinggi:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-slate-600">
                    <li>Teknisi dilarang keras membuka galeri foto pribadi, dokumen sensitif, kearsipan keuangan, atau data login dari browser pelanggan yang dipasang di dalam perangkat ter-servis di luar prosedur troubleshooting diagnostik wajib.</li>
                    <li>Jika diperlukan uji coba mendalam yang membutuhkan akun/aplikasi khusus, teknisi wajib memberitahukannya terlebih dahulu dan dapat disimulasikan menggunakan profil penguji sementara (Temporary Guest Profile).</li>
                  </ul>
                </section>

                <section className="space-y-2">
                  <h3 className="text-slate-900 font-bold text-base flex items-center gap-2">
                    <span className="text-emerald-600">4.</span> Masa Penyimpanan & Keamanan Fisik
                  </h3>
                  <p className="text-slate-600">
                    Semua kredensial digital Anda dienkripsi berlapis dalam basis simpanan internal server kami dan diakses secara terbatas. Data pendaftaran reservasi online akan disimpan selama maksimal 2 tahun untuk pelacakan masa garansi, setelah itu seluruh data sisa akan dimasukkan ke mode anonim kecuali bila Anda meminta penghapusan akun instan dari sistem kami secara tertulis melalui WhatsApp Helpdesk kami.
                  </p>
                </section>

                <section className="space-y-2">
                  <h3 className="text-slate-900 font-bold text-base flex items-center gap-2">
                    <span className="text-emerald-600">5.</span> Perubahan Kebijakan
                  </h3>
                  <p className="text-slate-600">
                    Kebijakan privasi ini dapat kami sesuaikan secara bertahap seiring perkembangan pembaruan regulasi digital di Negara Kesatuan Republik Indonesia. Kami menyarankan pelanggan untuk tetap rajin berkunjung secara periodik guna memeriksa syarat kepatuhan terbaru yang aktif.
                  </p>
                </section>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </LegalDrawerContext.Provider>
  );
}
