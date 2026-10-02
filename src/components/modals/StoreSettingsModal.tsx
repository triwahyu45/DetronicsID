import React, { useState } from 'react';
import { 
  X, 
  Settings, 
  Save, 
  KeyRound, 
  Download, 
  Upload, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle,
  FileSpreadsheet,
  ExternalLink
} from 'lucide-react';
import { useInventory } from '../../context/InventoryContext';

interface StoreSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StoreSettingsModal: React.FC<StoreSettingsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { 
    settings, 
    products,
    updateSettings, 
    exportDataToJson, 
    importDataFromJson, 
    resetToDefaultData 
  } = useInventory();

  const [storeName, setStoreName] = useState(settings.storeName);
  const [tagline, setTagline] = useState(settings.tagline);
  const [whatsapp, setWhatsapp] = useState(settings.whatsapp);
  const [shopeeStoreUrl, setShopeeStoreUrl] = useState(settings.shopeeStoreUrl || 'https://shopee.co.id/detronicsid');
  const [address, setAddress] = useState(settings.address);
  const [operatingHours, setOperatingHours] = useState(settings.operatingHours);
  const [bankAccount, setBankAccount] = useState(settings.bankAccount);
  const [adminPin, setAdminPin] = useState(settings.adminPin);

  const [importJsonText, setImportJsonText] = useState('');
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      storeName,
      tagline,
      whatsapp: whatsapp.replace(/\D/g, ''),
      shopeeStoreUrl,
      address,
      operatingHours,
      bankAccount,
      adminPin,
    });
    setStatusMsg({ type: 'success', text: 'Pengaturan toko & Shopee berhasil diperbarui!' });
    setTimeout(() => setStatusMsg(null), 3000);
  };

  const handleExportShopeeCsv = () => {
    // Generate Shopee Mass Upload Compatible CSV format
    const headers = [
      "Kategori",
      "Nama Produk",
      "Deskripsi Produk",
      "SKU Induk",
      "Kondisi",
      "Harga",
      "Stok",
      "Lokasi Rak",
      "Link Shopee",
      "URL Foto"
    ];
    
    const rows = products.map(p => [
      `"${p.category}"`,
      `"${p.name.replace(/"/g, '""')}"`,
      `"${(p.shortDesc + ' - ' + p.description).replace(/"/g, '""')}"`,
      `"${p.sku}"`,
      `"${p.condition}"`,
      p.price,
      p.stock,
      `"${p.location || ''}"`,
      `"${p.shopeeUrl || shopeeStoreUrl || 'https://shopee.co.id/detronicsid'}"`,
      `"${p.image || ''}"`
    ]);

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DetronicsID_Shopee_MassUpload_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setStatusMsg({ type: 'success', text: 'Format Shopee Mass-Upload CSV berhasil diunduh!' });
  };

  const handleDownloadBackup = () => {
    const jsonStr = exportDataToJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DetronicsID_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setStatusMsg({ type: 'success', text: 'File backup JSON berhasil diunduh!' });
  };

  const handleImportJson = () => {
    if (!importJsonText.trim()) {
      alert('Tempelkan teks data JSON yang valid pada kotak di bawah.');
      return;
    }
    const success = importDataFromJson(importJsonText);
    if (success) {
      setStatusMsg({ type: 'success', text: 'Data inventaris berhasil dipulihkan dari backup!' });
      setImportJsonText('');
      setTimeout(() => {
        onClose();
      }, 1500);
    } else {
      setStatusMsg({ type: 'error', text: 'Format data JSON tidak valid atau rusak.' });
    }
  };

  const handleReset = () => {
    if (window.confirm('PERINGATAN: Semua perubahan produk dan stok akan dikembalikan ke katalog bawaan awal. Lanjutkan?')) {
      resetToDefaultData();
      setStatusMsg({ type: 'success', text: 'Data berhasil direset ke katalog default!' });
      setTimeout(() => {
        onClose();
      }, 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-[#111827] text-slate-100 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto border border-slate-800 flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-[#151D2C] sticky top-0 z-10">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0B0F17] border border-slate-700 flex items-center justify-center text-brand-orange">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">
                Pengaturan Toko & Integrasi Shopee
              </h3>
              <p className="text-xs text-slate-400">
                Konfigurasi Shopee detronicsid, nomor WhatsApp resmi, dan sinkronisasi data
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Status Toast */}
        {statusMsg && (
          <div className={`p-3 mx-6 mt-4 rounded-xl text-xs font-semibold flex items-center space-x-2 ${
            statusMsg.type === 'success' ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-800' : 'bg-rose-950/70 text-rose-300 border border-rose-800'
          }`}>
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{statusMsg.text}</span>
          </div>
        )}

        {/* Form Body */}
        <div className="p-6 space-y-6">
          
          {/* Section 1: Profil Toko & Shopee */}
          <form onSubmit={handleSaveSettings} className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-orange border-b border-slate-800 pb-1">
              1. Identitas Toko & Integrasi Shopee
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Nama Toko
                </label>
                <input
                  type="text"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-[#0B0F17] border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-brand-orange"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Tagline Toko
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-[#0B0F17] border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-brand-orange"
                />
              </div>
            </div>

            {/* Shopee Store URL */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1 flex items-center justify-between">
                <span>Link Toko Shopee Resmi</span>
                <span className="text-[#EE4D2D] text-[10px] font-bold">Official Store</span>
              </label>
              <input
                type="text"
                value={shopeeStoreUrl}
                onChange={(e) => setShopeeStoreUrl(e.target.value)}
                placeholder="https://shopee.co.id/detronicsid"
                className="w-full text-xs font-mono px-3 py-2 bg-[#0B0F17] border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-[#EE4D2D]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  WhatsApp Customer Service (Opsional)
                </label>
                <input
                  type="text"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="Contoh: 6281234567890"
                  className="w-full text-xs font-mono px-3 py-2 bg-[#0B0F17] border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-brand-orange"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">
                  Kosongkan jika hanya ingin mengarahkan pemesanan via Shopee.
                </span>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Jam Operasional Toko
                </label>
                <input
                  type="text"
                  value={operatingHours}
                  onChange={(e) => setOperatingHours(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-[#0B0F17] border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-brand-orange"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Alamat Fisik Toko / Titik COD
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-[#0B0F17] border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-brand-orange"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Rekening Bank Pembayaran
                </label>
                <input
                  type="text"
                  value={bankAccount}
                  onChange={(e) => setBankAccount(e.target.value)}
                  className="w-full text-xs font-mono px-3 py-2 bg-[#0B0F17] border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-brand-orange"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1 flex items-center">
                  <KeyRound className="w-3.5 h-3.5 mr-1 text-brand-orange" />
                  PIN Masuk Panel Admin
                </label>
                <input
                  type="text"
                  maxLength={8}
                  value={adminPin}
                  onChange={(e) => setAdminPin(e.target.value)}
                  className="w-full text-xs font-mono font-bold px-3 py-2 bg-[#0B0F17] border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-brand-orange"
                />
              </div>
            </div>

            <button
              type="submit"
              className="py-2.5 px-4 bg-brand-orange hover:bg-brand-orange-hover text-white rounded-xl text-xs font-bold transition-colors flex items-center space-x-1.5 cursor-pointer shadow-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Simpan Profil & Pengaturan</span>
            </button>
          </form>

          {/* Section 2: Shopee Mass Upload & Backup Data */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-1">
              2. Sinkronisasi Shopee & Cadangan Data
            </h4>
            <p className="text-xs text-slate-400">
              Ekspor seluruh katalog komponen ke template format Shopee Mass Upload untuk diunggah massal ke Seller Center Shopee, atau unduh cadangan JSON lengkap.
            </p>

            <div className="flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={handleExportShopeeCsv}
                className="flex items-center space-x-1.5 py-2.5 px-4 bg-[#EE4D2D] hover:bg-[#D73211] text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Export Format Shopee Mass Upload (CSV)</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadBackup}
                className="flex items-center space-x-1.5 py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer border border-slate-700"
              >
                <Download className="w-4 h-4 text-brand-orange" />
                <span>Unduh File Cadangan (JSON)</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="flex items-center space-x-1.5 py-2.5 px-4 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset ke Data Default</span>
              </button>
            </div>

            {/* Import JSON Area */}
            <div className="pt-2 space-y-2">
              <label className="text-xs font-semibold text-slate-300 block">
                Pulihkan / Restore dari Data JSON:
              </label>
              <textarea
                rows={3}
                value={importJsonText}
                onChange={(e) => setImportJsonText(e.target.value)}
                placeholder='Tempelkan (Paste) isi file JSON backup di sini lalu klik "Restore Data"...'
                className="w-full text-xs font-mono p-3 bg-[#0B0F17] border border-slate-700 text-white rounded-xl focus:bg-[#151D2C] focus:outline-none focus:ring-1 focus:ring-brand-orange"
              />
              <button
                type="button"
                onClick={handleImportJson}
                className="flex items-center space-x-1.5 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Restore Data Inventaris</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
