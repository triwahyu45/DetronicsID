import React, { useState } from 'react';
import { X, Lock, KeyRound, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { useInventory } from '../../context/InventoryContext';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { loginAdmin } = useInventory();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(pin)) {
      setError(false);
      setPin('');
      onSuccess();
      onClose();
    } else {
      setError(true);
      setPin('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-[#111827] text-slate-100 rounded-3xl shadow-2xl max-w-sm w-full border border-slate-800 p-6 space-y-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-2xl bg-[#0B0F17] border border-slate-700 flex items-center justify-center text-brand-orange mx-auto shadow-sm">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base text-white">
            Akses Panel Inventaris Toko
          </h3>
          <p className="text-xs text-slate-400">
            Masukkan PIN Keamanan Admin Toko Detronics
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 block">
              PIN Admin
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                maxLength={8}
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setError(false);
                }}
                autoFocus
                placeholder="PIN Default: 1234"
                className="w-full pl-9 pr-3 py-2.5 text-center tracking-widest font-mono text-base font-bold bg-[#0B0F17] border border-slate-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-orange"
              />
            </div>
            {error && (
              <p className="text-xs text-rose-400 flex items-center pt-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 mr-1 shrink-0" />
                PIN salah. Silakan coba kembali (default: 1234).
              </p>
            )}
          </div>

          <div className="p-2.5 rounded-xl bg-[#0B0F17] border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <div className="flex items-center text-slate-300 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-400" />
              Keamanan Panel
            </div>
            <p>
              PIN bawaan awal adalah <strong className="font-mono text-brand-orange">1234</strong>. Anda dapat mengganti PIN sewaktu-waktu di menu Pengaturan Toko.
            </p>
          </div>

          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-brand-orange hover:bg-brand-orange-hover text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center space-x-1 cursor-pointer"
            >
              <span>Masuk Panel</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
