import React from 'react';
import { ShoppingBag, Search, ShieldCheck, MapPin, Cpu, ExternalLink, QrCode } from 'lucide-react';
import { useInventory } from '../../context/InventoryContext';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenCart: () => void;
  onOpenAdmin: () => void;
  onOpenQRIS: () => void;
  onOpenAbout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  onSearchChange,
  onOpenCart,
  onOpenAdmin,
  onOpenQRIS,
  onOpenAbout,
}) => {
  const { cartItemCount, settings, isAdmin } = useInventory();

  return (
    <header className="sticky top-0 z-30 bg-[#0B0F17]/95 backdrop-blur-md border-b border-slate-800 shadow-lg transition-all">
      {/* Top micro bar for store info */}
      <div className="bg-[#071F2A] border-b border-slate-800/80 text-white text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="flex items-center text-slate-300">
              <MapPin className="w-3.5 h-3.5 mr-1 text-brand-orange" />
              {settings.address}
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-emerald-400 font-medium">COD Area Kampus UNY & UGM (Samirono) Fast Response</span>
          </div>
          <div className="flex items-center space-x-4">
            <a 
              href={settings.shopeeStoreUrl || "https://shopee.co.id/detronicsid"}
              target="_blank"
              rel="noreferrer"
              className="flex items-center text-[#EE4D2D] hover:text-[#FF7050] font-bold transition-colors"
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              Shopee: shopee.co.id/detronicsid
            </a>
            <span className="text-slate-700">|</span>
            <button 
              onClick={onOpenQRIS}
              className="text-brand-orange hover:text-white transition-colors cursor-pointer flex items-center"
            >
              <QrCode className="w-3.5 h-3.5 mr-1" />
              Scan QRIS Toko
            </button>
            <span className="text-slate-700">|</span>
            <button 
              onClick={onOpenAbout}
              className="text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              Tentang Toko
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo & Brand Identity */}
          <div 
            className="flex items-center space-x-3 cursor-pointer select-none group" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img 
              src="./assets/brand/logo_dark_horizontal.png" 
              alt="Detronics ID Logo" 
              className="h-9 sm:h-11 w-auto object-contain transition-transform group-hover:scale-102"
              onError={(e) => {
                // Fallback to text logo if image fails
                const target = e.target as HTMLElement;
                target.style.display = 'none';
                const fallback = document.getElementById('logo-fallback');
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            <div id="logo-fallback" className="hidden items-center space-x-2">
              <div className="w-9 h-9 rounded-xl bg-brand-orange flex items-center justify-center text-white shadow-sm">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-white">Detronics<span className="text-brand-orange">ID</span></span>
                <span className="block text-[10px] uppercase font-bold tracking-widest text-slate-400">Mechatronics Store</span>
              </div>
            </div>
          </div>

          {/* Search Box */}
          <div className="flex-1 max-w-xl mx-2">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Cari nama komponen, modul, sensor, IC, atau SKU (contoh: ESP32, L298N)..."
                className="w-full pl-10 pr-10 py-2 sm:py-2.5 text-sm bg-[#151D2C] hover:bg-[#1A2438] focus:bg-[#151D2C] border border-slate-700 focus:border-brand-orange text-white placeholder-slate-400 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-orange/20 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white font-semibold p-1"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Action buttons: Shopee, About, Cart & Admin */}
          <div className="flex items-center space-x-2 sm:space-x-2.5">
            {/* Shopee Store Link */}
            <a
              href={settings.shopeeStoreUrl || "https://shopee.co.id/detronicsid"}
              target="_blank"
              rel="noreferrer"
              className="hidden lg:flex items-center space-x-1.5 px-3 py-2 bg-[#EE4D2D]/15 hover:bg-[#EE4D2D]/25 border border-[#EE4D2D]/40 text-[#EE4D2D] rounded-full text-xs font-bold transition-all"
              title="Kunjungi Toko Shopee DetronicsID"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Shopee Store</span>
            </a>

            {/* About Button */}
            <button
              onClick={onOpenAbout}
              className="flex items-center space-x-1.5 px-3 py-2 sm:py-2.5 bg-[#151D2C] hover:bg-[#1E293B] active:scale-95 text-slate-300 hover:text-white rounded-full transition-all cursor-pointer border border-slate-800 text-xs font-semibold"
              title="Tentang Detronics ID & Link Resmi"
            >
              <Cpu className="w-4 h-4 text-brand-orange" />
              <span className="hidden sm:inline">Tentang</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center space-x-2 px-3.5 py-2 sm:py-2.5 bg-[#151D2C] hover:bg-[#1E293B] active:scale-95 text-white rounded-full transition-all cursor-pointer border border-slate-800"
              title="Lihat Keranjang Belanja"
            >
              <ShoppingBag className="w-5 h-5 text-brand-orange" />
              <span className="hidden sm:inline text-xs font-semibold">Keranjang</span>
              {cartItemCount > 0 && (
                <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold leading-none text-white bg-brand-orange rounded-full animate-pulse shadow-sm">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Admin Dashboard Entry Button */}
            <button
              onClick={onOpenAdmin}
              className={`flex items-center space-x-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer shadow-sm ${
                isAdmin 
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
              }`}
              title={isAdmin ? "Kembali ke Panel Inventaris Admin" : "Buka Panel Inventaris / Admin"}
            >
              <ShieldCheck className="w-4 h-4 text-brand-orange" />
              <span className="hidden md:inline">{isAdmin ? 'Mode Admin Aktif' : 'Inventaris'}</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
