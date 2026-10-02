import React from 'react';
import { 
  Plus, 
  Layers, 
  History, 
  Settings, 
  LogOut, 
  Eye, 
  Cpu, 
  Download 
} from 'lucide-react';
import { useInventory } from '../../context/InventoryContext';

interface AdminHeaderProps {
  activeTab: 'inventory' | 'logs';
  onTabChange: (tab: 'inventory' | 'logs') => void;
  onOpenAddModal: () => void;
  onOpenSettings: () => void;
  onExitAdmin: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  activeTab,
  onTabChange,
  onOpenAddModal,
  onOpenSettings,
  onExitAdmin,
}) => {
  const { settings, logoutAdmin, exportDataToJson } = useInventory();

  const handleExportBackup = () => {
    const jsonStr = exportDataToJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DetronicsID_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <header className="bg-[#0B0F17] text-white sticky top-0 z-30 shadow-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Brand & Mode Indicator */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-brand-orange flex items-center justify-center shadow-inner">
              <Cpu className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-base tracking-tight">{settings.storeName}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-orange text-white uppercase tracking-wider">
                  Admin Panel
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Pusat Manajemen Inventaris & Stok Fisik Komponen
              </p>
            </div>
          </div>

          {/* Navigation Tabs (Inventaris vs Mutasi Stok) */}
          <div className="flex items-center bg-[#151D2C] p-1 rounded-xl border border-slate-800 self-start md:self-auto text-xs">
            <button
              onClick={() => onTabChange('inventory')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === 'inventory'
                  ? 'bg-brand-orange text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Daftar Komponen</span>
            </button>
            <button
              onClick={() => onTabChange('logs')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === 'logs'
                  ? 'bg-brand-orange text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <History className="w-4 h-4" />
              <span>Riwayat Mutasi</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onOpenAddModal}
              className="flex items-center space-x-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Komponen</span>
            </button>

            <button
              onClick={handleExportBackup}
              title="Download File Backup JSON"
              className="p-2 bg-[#151D2C] hover:bg-[#1E293B] border border-slate-800 text-slate-300 rounded-xl transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenSettings}
              title="Pengaturan Toko, Shopee & Restore Data"
              className="p-2 bg-[#151D2C] hover:bg-[#1E293B] border border-slate-800 text-slate-300 rounded-xl transition-colors cursor-pointer"
            >
              <Settings className="w-4 h-4" />
            </button>

            <button
              onClick={onExitAdmin}
              className="flex items-center space-x-1.5 px-3 py-2 bg-[#151D2C] hover:bg-[#1E293B] border border-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              title="Kembali ke Tampilan Pembeli"
            >
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">Lihat Toko</span>
            </button>

            <button
              onClick={() => {
                logoutAdmin();
                onExitAdmin();
              }}
              className="p-2 bg-rose-950/40 hover:bg-rose-900 border border-rose-800 text-rose-300 hover:text-white rounded-xl transition-colors cursor-pointer"
              title="Keluar Sesi Admin"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
