import React from 'react';
import { MapPin, Phone, Clock, CreditCard, ShieldCheck, Cpu, ArrowUpRight, ExternalLink } from 'lucide-react';
import { useInventory } from '../../context/InventoryContext';

interface FooterProps {
  onOpenAdmin: () => void;
  onOpenQRIS: () => void;
  onOpenAbout: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onOpenQRIS, onOpenAbout }) => {
  const { settings, isAdmin } = useInventory();

  return (
    <footer className="bg-[#071F2A] text-slate-300 border-t border-slate-800 pt-12 pb-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2.5">
              <img 
                src="./assets/brand/logo_dark_horizontal.png" 
                alt="Detronics ID" 
                className="h-8 w-auto object-contain"
                onError={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.display = 'none';
                }}
              />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Toko komponen robotika, modul IoT, mekatronika, mikrokontroler STM32, Arduino, ESP32, sensor, dan driver motor terpercaya di Yogyakarta. Transparansi kondisi fisik dan uji kelayakan komponen sebelum sampai ke tangan Anda.
            </p>
            <div className="pt-1 flex flex-wrap gap-3">
              <button
                onClick={onOpenAbout}
                className="inline-flex items-center space-x-1 text-xs text-sky-400 hover:text-white font-semibold transition-colors cursor-pointer"
              >
                <span>Tentang Detronics ID</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onOpenQRIS}
                className="inline-flex items-center space-x-1 text-xs text-brand-orange hover:text-white font-semibold transition-colors cursor-pointer"
              >
                <span>Kode QRIS Toko</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Lokasi & Kanal Toko */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">Lokasi & Kanal Resmi</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                <span>{settings.address}, {settings.city} ({settings.postalCode})</span>
              </p>
              
              {/* Shopee Store Link */}
              <p className="flex items-center space-x-2">
                <ExternalLink className="w-4 h-4 text-[#EE4D2D] shrink-0" />
                <a
                  href={settings.shopeeStoreUrl || "https://shopee.co.id/detronicsid"}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#EE4D2D] hover:text-[#FF7050] font-bold"
                >
                  Shopee: detronicsid
                </a>
              </p>

              {/* Optional WhatsApp CS if configured */}
              {settings.whatsapp ? (
                <p className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <a
                    href={`https://wa.me/${settings.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-emerald-300 font-mono"
                  >
                    Customer Service WA
                  </a>
                </p>
              ) : null}

              <p className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{settings.operatingHours}</span>
              </p>
            </div>
          </div>

          {/* Layanan Pembayaran & Pengiriman */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">Pembayaran & Ekspedisi</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p className="flex items-center space-x-2">
                <CreditCard className="w-4 h-4 text-sky-400 shrink-0" />
                <span>QRIS Semua E-Wallet (GoPay, OVO, Dana, ShopeePay)</span>
              </p>
              <p className="text-slate-400">
                Transfer Bank: <strong className="text-slate-300">BCA & Mandiri</strong>
              </p>
              <p className="text-slate-400">
                Pengiriman: <strong className="text-slate-300">Shopee Express, COD Samirono / UNY / UGM</strong>, Instant GoSend & Grab, Ekspedisi JNE, J&T.
              </p>
            </div>
          </div>

          {/* Akses Admin & Navigasi Cepat */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">Portal Manajemen</h4>
            <p className="text-xs text-slate-400">
              Khusus pengelola toko untuk pencatatan stok fisik, mutasi barang, edit harga, dan export template Shopee.
            </p>
            <div>
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors cursor-pointer border border-slate-700"
              >
                <ShieldCheck className="w-4 h-4 text-brand-orange" />
                <span>{isAdmin ? 'Masuk Panel Admin' : 'Login Admin Inventaris'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>
            © {new Date().getFullYear()} {settings.storeName}. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <a
              href="https://shopee.co.id/detronicsid"
              target="_blank"
              rel="noreferrer"
              className="text-[#EE4D2D] hover:underline"
            >
              Shopee Official Store
            </a>
            <span>•</span>
            <a
              href="https://triwahyu45.github.io/Portofolio/"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
            >
              Tri Wahyu Handoyo (Developer)
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
