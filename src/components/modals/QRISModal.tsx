import React from 'react';
import { X, QrCode, ShieldCheck } from 'lucide-react';
import { useInventory } from '../../context/InventoryContext';

interface QRISModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QRISModal: React.FC<QRISModalProps> = ({ isOpen, onClose }) => {
  const { settings } = useInventory();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-[#111827] text-slate-100 rounded-3xl shadow-2xl max-w-sm w-full border border-slate-800 p-6 space-y-4 relative text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* QRIS Header */}
        <div className="space-y-1">
          <div className="inline-flex p-2.5 rounded-2xl bg-brand-orange/20 text-brand-orange mb-1 border border-brand-orange/30">
            <QrCode className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base text-white">
            QRIS Pembayaran Resmi
          </h3>
          <p className="text-xs text-slate-400 font-medium">
            {settings.storeName} — Mechatronics Store
          </p>
        </div>

        {/* QRIS Image Container */}
        <div className="p-3 bg-white rounded-2xl border border-slate-700 flex items-center justify-center">
          <img
            src="./assets/brand/QRIS Detronics ID.png"
            alt="QRIS Detronics ID"
            className="w-full max-w-[260px] h-auto object-contain rounded-xl shadow-xs"
            onError={(e) => {
              const target = e.target as HTMLElement;
              target.style.display = 'none';
              const fb = document.getElementById('qris-fb');
              if (fb) fb.style.display = 'block';
            }}
          />
          <div id="qris-fb" className="hidden p-6 text-center text-xs text-slate-500">
            QRIS Detronics ID terdaftar
          </div>
        </div>

        {/* Supported Wallets info */}
        <div className="bg-[#151D2C] p-3 rounded-xl border border-slate-800 text-left space-y-1 text-xs text-slate-300">
          <span className="font-bold text-white block flex items-center">
            <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-400" />
            Menerima Semua E-Wallet & Mobile Banking:
          </span>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            BCA, Mandiri Livin, BRImo, BNI Mobile, GoPay, OVO, Dana, ShopeePay, LinkAja, AstraPay, dll.
          </p>
        </div>

        {/* Bank Transfer info */}
        <div className="text-left text-xs bg-[#0B0F17] p-2.5 rounded-xl border border-slate-800 text-slate-300">
          <span className="font-bold block text-brand-orange">Opsi Transfer Bank Manual:</span>
          <span className="font-mono text-[11px] block text-slate-200 mt-0.5">
            {settings.bankAccount}
          </span>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-brand-orange hover:bg-brand-orange-hover text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
        >
          Selesai / Tutup
        </button>

      </div>
    </div>
  );
};
