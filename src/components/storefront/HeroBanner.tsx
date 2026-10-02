import React from 'react';
import { Cpu, CheckCircle2, Truck, Sparkles, QrCode, ExternalLink, ShoppingBag } from 'lucide-react';
import { useInventory } from '../../context/InventoryContext';

interface HeroBannerProps {
  onOpenQRIS: () => void;
  onSelectCategory: (cat: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onOpenQRIS, onSelectCategory }) => {
  const { products, settings } = useInventory();
  
  const readyStockCount = products.filter(p => p.stock > 0).length;

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#071F2A] via-[#0B1720] to-[#0B0F17] text-white py-10 px-4 sm:px-6 lg:px-8 shadow-inner border-b border-slate-800">
      {/* Background aesthetic circuit pattern overlay */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#F9831F_1px,transparent_1px)] [background-size:20px_20px]"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Hero Copy */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-orange/20 border border-brand-orange/40 text-brand-orange text-xs font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Katalog Real-Time & Transparansi Kondisi Fisik</span>
              </div>

              <a
                href={settings.shopeeStoreUrl || "https://shopee.co.id/detronicsid"}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#EE4D2D]/20 border border-[#EE4D2D]/40 text-[#EE4D2D] hover:bg-[#EE4D2D]/30 text-xs font-bold transition-colors"
              >
                <ShoppingBag className="w-3 h-3" />
                <span>Shopee Official: detronicsid</span>
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Toko & Inventaris Komponen <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-amber-300 to-sky-400">
                Mekatronika, IoT & Robotika
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Pusat suku cadang riset elektronika mahasiswa dan praktisi di Yogyakarta. Menyediakan komponen <strong className="text-white">Baru</strong>, <strong className="text-white">Bekas Mulus (Tested)</strong>, hingga <strong className="text-white">Cabutan Praktikum/Industri</strong> dengan pinout dan spesifikasi teknis lengkap.
            </p>

            {/* Value Props Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center space-x-2.5 p-2.5 rounded-xl bg-[#151D2C]/80 border border-slate-800 backdrop-blur-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div className="text-xs">
                  <span className="font-bold text-white block">Kondisi Teruji (QC)</span>
                  <span className="text-slate-400">Semua unit dites sebelum kirim</span>
                </div>
              </div>

              <div className="flex items-center space-x-2.5 p-2.5 rounded-xl bg-[#151D2C]/80 border border-slate-800 backdrop-blur-sm">
                <Truck className="w-5 h-5 text-brand-orange shrink-0" />
                <div className="text-xs">
                  <span className="font-bold text-white block">COD Samirono / UNY</span>
                  <span className="text-slate-400">Siap Shopee, GoSend & JNE</span>
                </div>
              </div>

              <div className="flex items-center space-x-2.5 p-2.5 rounded-xl bg-[#151D2C]/80 border border-slate-800 backdrop-blur-sm">
                <Cpu className="w-5 h-5 text-sky-400 shrink-0" />
                <div className="text-xs">
                  <span className="font-bold text-white block">{readyStockCount} Komponen Ready</span>
                  <span className="text-slate-400">Stok sinkron live fisik</span>
                </div>
              </div>
            </div>

            {/* Quick Filter Pill Buttons */}
            <div className="pt-2 flex flex-wrap gap-2 items-center text-xs">
              <span className="text-slate-400 font-semibold">Paling Dicari:</span>
              {['Microcontroller', 'Motor & Driver', 'Sensor', 'Power & Battery'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className="px-3 py-1 rounded-lg bg-[#151D2C] hover:bg-brand-orange hover:text-white text-slate-300 transition-all cursor-pointer font-medium border border-slate-800"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Right Card: Quick Order & Shopee/QRIS Showcase */}
          <div className="lg:col-span-4">
            <div className="bg-[#151D2C]/90 backdrop-blur-md border border-slate-800 p-5 rounded-3xl shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-xl bg-brand-orange flex items-center justify-center font-black text-white text-sm shadow-sm">
                    DT
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">{settings.storeName}</h3>
                    <p className="text-[11px] text-slate-400">Samirono, Caturtunggal, Depok, Sleman</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Ready Stock
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Jam Operasional:</span>
                  <span className="font-medium text-white">{settings.operatingHours}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Lokasi Fisik:</span>
                  <span className="font-medium text-white">Samirono (Area UNY & UGM)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Kanal Belanja:</span>
                  <span className="font-semibold text-[#EE4D2D]">Shopee Official Store</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={settings.shopeeStoreUrl || "https://shopee.co.id/detronicsid"}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center space-x-2 py-2.5 bg-[#EE4D2D] hover:bg-[#D73211] text-white font-extrabold rounded-xl text-xs transition-colors shadow-md cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Buka Toko Shopee DetronicsID</span>
                </a>

                <button
                  onClick={onOpenQRIS}
                  className="w-full flex items-center justify-center space-x-1.5 py-2.5 bg-[#0B0F17] hover:bg-[#1A2438] text-slate-200 border border-slate-700 font-bold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  <QrCode className="w-4 h-4 text-brand-orange" />
                  <span>Scan QRIS Resmi Toko</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
