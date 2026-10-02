import React from 'react';
import { 
  X, 
  Cpu, 
  ExternalLink, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Globe, 
  Sparkles, 
  Award, 
  UserCheck,
  ShoppingBag
} from 'lucide-react';
import { useInventory } from '../../context/InventoryContext';

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const InstagramIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  const { settings } = useInventory();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-[#111827] text-slate-100 rounded-3xl shadow-2xl max-w-xl w-full max-h-[92vh] overflow-y-auto border border-slate-800 flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header Banner */}
        <div className="bg-gradient-to-r from-[#071F2A] via-[#0D2734] to-[#133B4E] text-white p-6 sm:p-7 relative overflow-hidden border-b border-slate-800">
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#F9831F_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          <div className="relative z-10 flex items-center space-x-3.5">
            <div className="w-14 h-14 rounded-2xl bg-[#0B0F17] border border-slate-700 p-2 shadow-lg flex items-center justify-center shrink-0">
              <img
                src="./assets/brand/logo_dark_stacked.png"
                alt="Detronics ID"
                className="w-full h-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.display = 'none';
                }}
              />
            </div>
            <div>
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-brand-orange/20 border border-brand-orange/40 text-brand-orange text-[10px] font-bold tracking-wider uppercase mb-1">
                <Sparkles className="w-3 h-3" />
                <span>About Detronics ID</span>
              </div>
              <h2 className="text-xl font-extrabold text-white tracking-tight">
                {settings.storeName}
              </h2>
              <p className="text-xs text-slate-300 font-medium">
                {settings.tagline}
              </p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 text-xs text-slate-300">
          
          {/* About Overview */}
          <div className="space-y-2 leading-relaxed">
            <h3 className="font-bold text-white text-sm flex items-center">
              <Cpu className="w-4 h-4 mr-1.5 text-brand-orange" />
              Tentang Toko & Sistem Inventaris Detronics ID
            </h3>
            <p>
              <strong className="text-white">Detronics ID</strong> didirikan oleh <strong className="text-white">Tri Wahyu Handoyo</strong> sebagai platform terpadu penyedia komponen mekatronika, mikrokontroler (STM32, ESP32, Arduino, Raspberry Pi Pico), sensor robotika, dan modul daya di Yogyakarta.
            </p>
            <p>
              Platform web ini mengintegrasikan <strong className="text-white">Katalog E-Commerce Publik</strong> dengan <strong className="text-white">Sistem Manajemen Inventaris Fisik Real-Time</strong> yang terinspirasi dari standar katalog terpercaya <em>Jogja Robotika</em> dan <em>Toko Beetrona</em>. Setiap komponen dilengkapi transparansi kondisi fisik (<em>Baru, Bekas Mulus Grade A, Cabutan Tested</em>), hasil uji kelayakan (QC), pinout teknis, dan pencatatan lokasi rak fisik di toko.
            </p>
          </div>

          {/* Official Important Links */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <h4 className="font-bold uppercase tracking-wider text-[11px] text-slate-400">
              Tautan & Kanal Resmi
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Shopee Official Store */}
              <a
                href={settings.shopeeStoreUrl || "https://shopee.co.id/detronicsid"}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-[#151D2C] hover:bg-[#1A2438] border border-[#EE4D2D]/40 transition-colors group cursor-pointer"
              >
                <div className="flex items-center space-x-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#EE4D2D]/20 text-[#EE4D2D] flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block text-xs group-hover:text-[#EE4D2D] transition-colors">
                      Shopee Official Store
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      shopee.co.id/detronicsid
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#EE4D2D]" />
              </a>

              {/* Web Live / GitHub Pages */}
              <a
                href="https://triwahyu45.github.io/DetronicsID/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-[#151D2C] hover:bg-[#1A2438] border border-slate-800 transition-colors group cursor-pointer"
              >
                <div className="flex items-center space-x-2.5">
                  <div className="w-7 h-7 rounded-lg bg-sky-900/40 text-sky-400 flex items-center justify-center">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block text-xs group-hover:text-brand-orange transition-colors">
                      Web Katalog Resmi
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      triwahyu45.github.io/DetronicsID
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-orange" />
              </a>

              {/* GitHub Repository */}
              <a
                href="https://github.com/triwahyu45/DetronicsID"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-[#151D2C] hover:bg-[#1A2438] border border-slate-800 transition-colors group cursor-pointer"
              >
                <div className="flex items-center space-x-2.5">
                  <div className="w-7 h-7 rounded-lg bg-slate-800 text-white flex items-center justify-center">
                    <GithubIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block text-xs group-hover:text-brand-orange transition-colors">
                      GitHub Repository
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      github.com/triwahyu45/DetronicsID
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-orange" />
              </a>

              {/* Instagram Official */}
              <a
                href="https://www.instagram.com/detronics.id/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-[#151D2C] hover:bg-[#1A2438] border border-slate-800 transition-colors group cursor-pointer"
              >
                <div className="flex items-center space-x-2.5">
                  <div className="w-7 h-7 rounded-lg bg-rose-900/30 text-rose-400 flex items-center justify-center">
                    <InstagramIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block text-xs group-hover:text-brand-orange transition-colors">
                      Instagram Store
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      @detronics.id
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-orange" />
              </a>
            </div>
          </div>

          {/* Reference & Inspiration Links */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <h4 className="font-bold uppercase tracking-wider text-[11px] text-slate-400">
              Benchmark & Inspirasi Desain
            </h4>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <a
                href="https://jogjarobotika.com/"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-[#151D2C] hover:bg-[#1A2438] border border-slate-800 flex items-center justify-between font-medium text-slate-300"
              >
                <span>Jogja Robotika</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
              <a
                href="https://tokobeetrona.com/"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-[#151D2C] hover:bg-[#1A2438] border border-slate-800 flex items-center justify-between font-medium text-slate-300"
              >
                <span>Toko Beetrona</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Founder Section */}
          <div className="p-3.5 rounded-2xl bg-[#0B0F17] border border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-brand-orange/20 border border-brand-orange/40 flex items-center justify-center text-brand-orange shrink-0">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Developer & Store Owner
                </span>
                <span className="font-bold text-white text-xs">
                  Tri Wahyu Handoyo
                </span>
                <span className="text-[10px] text-slate-400 block">
                  Pendidikan Teknik Mekatronika UNY
                </span>
              </div>
            </div>
            
            <a
              href="https://triwahyu45.github.io/Portofolio/"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-lg bg-[#151D2C] hover:bg-[#1E293B] text-brand-orange hover:text-white border border-slate-700 text-[11px] font-bold transition-all flex items-center space-x-1 cursor-pointer"
            >
              <span>Portofolio</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

        </div>

        {/* Footer info */}
        <div className="p-4 bg-[#151D2C] border-t border-slate-800 text-center text-[10px] text-slate-400">
          Detronics ID © 2026 • Mechatronics & Robotics Component Store • Samirono, Sleman, Yogyakarta
        </div>

      </div>
    </div>
  );
};
