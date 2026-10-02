import React, { useState, useEffect } from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  Save, 
  Cpu, 
  Wand2, 
  ExternalLink 
} from 'lucide-react';
import { Product, ProductCategory, ProductCondition } from '../../types/inventory';
import { useInventory } from '../../context/InventoryContext';

interface ProductFormModalProps {
  isOpen: boolean;
  productToEdit?: Product | null;
  onClose: () => void;
}

const PRESET_IMAGES = [
  { label: 'Microcontroller / Board', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80' },
  { label: 'Circuit / IC Component', url: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=600&q=80' },
  { label: 'Sensor / Module', url: 'https://images.unsplash.com/photo-1580983218765-f663bec07b37?auto=format&fit=crop&w=600&q=80' },
  { label: 'Motor / Actuator', url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80' },
  { label: 'Battery / Power Supply', url: 'https://images.unsplash.com/photo-1619725002198-6a689b72f41d?auto=format&fit=crop&w=600&q=80' },
];

export const ProductFormModal: React.FC<ProductFormModalProps> = ({
  isOpen,
  productToEdit,
  onClose,
}) => {
  const { addProduct, updateProduct, settings } = useInventory();

  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState<Exclude<ProductCategory, 'Semua'>>('Microcontroller');
  const [condition, setCondition] = useState<ProductCondition>('Baru (New)');
  const [conditionNotes, setConditionNotes] = useState('');
  const [price, setPrice] = useState(0);
  const [costPrice, setCostPrice] = useState(0);
  const [stock, setStock] = useState(1);
  const [minStock, setMinStock] = useState(5);
  const [location, setLocation] = useState('Rak A-01 / Box 1');
  const [image, setImage] = useState(PRESET_IMAGES[0].url);
  const [shopeeUrl, setShopeeUrl] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [description, setDescription] = useState('');
  const [pinoutNotes, setPinoutNotes] = useState('');
  const [datasheetUrl, setDatasheetUrl] = useState('');
  const [isPublished, setIsPublished] = useState(true);
  
  // Dynamic Specs
  const [specs, setSpecs] = useState<{ label: string; value: string }[]>([
    { label: 'Tegangan Kerja', value: '3.3V - 5V DC' },
    { label: 'Interface', value: 'I2C / SPI / GPIO' },
  ]);

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setSku(productToEdit.sku);
      setCategory(productToEdit.category);
      setCondition(productToEdit.condition);
      setConditionNotes(productToEdit.conditionNotes || '');
      setPrice(productToEdit.price);
      setCostPrice(productToEdit.costPrice || 0);
      setStock(productToEdit.stock);
      setMinStock(productToEdit.minStock || 5);
      setLocation(productToEdit.location || '');
      setImage(productToEdit.image || PRESET_IMAGES[0].url);
      setShopeeUrl(productToEdit.shopeeUrl || settings.shopeeStoreUrl || 'https://shopee.co.id/detronicsid');
      setShortDesc(productToEdit.shortDesc || '');
      setDescription(productToEdit.description || '');
      setPinoutNotes(productToEdit.pinoutNotes || '');
      setDatasheetUrl(productToEdit.datasheetUrl || '');
      setIsPublished(productToEdit.isPublished);
      setSpecs(productToEdit.specs && productToEdit.specs.length > 0 ? productToEdit.specs : [
        { label: 'Tegangan Kerja', value: '5V DC' }
      ]);
    } else {
      // Reset form
      setName('');
      setSku('DT-' + Date.now().toString(36).toUpperCase().slice(-5));
      setCategory('Microcontroller');
      setCondition('Baru (New)');
      setConditionNotes('');
      setPrice(35000);
      setCostPrice(25000);
      setStock(10);
      setMinStock(5);
      setLocation('Rak A-01 / Box 1');
      setImage(PRESET_IMAGES[0].url);
      setShopeeUrl(settings.shopeeStoreUrl || 'https://shopee.co.id/detronicsid');
      setShortDesc('');
      setDescription('');
      setPinoutNotes('');
      setDatasheetUrl('');
      setIsPublished(true);
      setSpecs([
        { label: 'Tegangan Kerja', value: '5V DC' },
        { label: 'Interface', value: 'Digital I/O' }
      ]);
    }
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  const handleGenerateSKU = () => {
    const prefix = 
      category === 'Microcontroller' ? 'DT-MCU' :
      category === 'Sensor' ? 'DT-SNS' :
      category === 'Motor & Driver' ? 'DT-MOT' :
      category === 'Display & Opto' ? 'DT-DSP' :
      category === 'Wireless & IoT' ? 'DT-IOT' :
      category === 'Power & Battery' ? 'DT-PWR' :
      category === 'Kabel & Header' ? 'DT-CAB' :
      'DT-GEN';
    const randNum = Math.floor(100 + Math.random() * 900);
    setSku(`${prefix}-${randNum}`);
  };

  const handleAddSpec = () => {
    setSpecs([...specs, { label: '', value: '' }]);
  };

  const handleUpdateSpec = (index: number, field: 'label' | 'value', text: string) => {
    const updated = [...specs];
    updated[index][field] = text;
    setSpecs(updated);
  };

  const handleRemoveSpec = (index: number) => {
    setSpecs(specs.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Nama komponen tidak boleh kosong.');
      return;
    }
    if (!sku.trim()) {
      alert('SKU tidak boleh kosong.');
      return;
    }

    const cleanedSpecs = specs.filter(s => s.label.trim() !== '' && s.value.trim() !== '');

    const productPayload = {
      name: name.trim(),
      sku: sku.trim().toUpperCase(),
      category,
      condition,
      conditionNotes: conditionNotes.trim(),
      price: Number(price),
      costPrice: Number(costPrice),
      stock: Number(stock),
      minStock: Number(minStock),
      location: location.trim(),
      image: image.trim() || PRESET_IMAGES[0].url,
      shopeeUrl: shopeeUrl.trim() || settings.shopeeStoreUrl || 'https://shopee.co.id/detronicsid',
      shortDesc: shortDesc.trim() || name.trim(),
      description: description.trim(),
      specs: cleanedSpecs,
      pinoutNotes: pinoutNotes.trim(),
      datasheetUrl: datasheetUrl.trim(),
      isPublished,
    };

    if (productToEdit) {
      updateProduct(productToEdit.id, productPayload);
    } else {
      addProduct(productPayload);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-[#111827] text-slate-100 rounded-3xl shadow-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto border border-slate-800 flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-[#151D2C] sticky top-0 z-10">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0B0F17] border border-slate-700 flex items-center justify-center text-brand-orange">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">
                {productToEdit ? 'Edit Data Komponen' : 'Tambah Komponen Baru ke Inventaris'}
              </h3>
              <p className="text-xs text-slate-400">
                {productToEdit ? `Mengubah data untuk SKU: ${productToEdit.sku}` : 'Lengkapi spesifikasi, stok fisik, dan detail kondisi barang'}
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Section 1: Identitas Produk */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-orange border-b border-slate-800 pb-1">
              1. Identitas & Kategori
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Nama Lengkap Komponen <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: ESP32 NodeMCU DevKit V1 30-Pin CP2102"
                  className="w-full text-xs px-3 py-2 bg-[#0B0F17] border border-slate-700 text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-orange"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1 flex items-center justify-between">
                  <span>SKU / Kode Barang</span>
                  <button
                    type="button"
                    onClick={handleGenerateSKU}
                    className="text-[10px] text-brand-orange hover:underline flex items-center cursor-pointer"
                  >
                    <Wand2 className="w-2.5 h-2.5 mr-0.5" />
                    Auto
                  </button>
                </label>
                <input
                  type="text"
                  required
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  placeholder="DT-MCU-001"
                  className="w-full text-xs font-mono font-bold px-3 py-2 bg-[#0B0F17] border border-slate-700 text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-orange uppercase"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Kategori Komponen
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full text-xs px-3 py-2 bg-[#0B0F17] border border-slate-700 text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-orange cursor-pointer"
                >
                  <option value="Microcontroller">Microcontroller</option>
                  <option value="Sensor">Sensor</option>
                  <option value="Motor & Driver">Motor & Driver</option>
                  <option value="Display & Opto">Display & Opto</option>
                  <option value="Wireless & IoT">Wireless & IoT</option>
                  <option value="Komponen Pasif & Aktif">Komponen Pasif & Aktif</option>
                  <option value="Power & Battery">Power & Battery</option>
                  <option value="Kabel & Header">Kabel & Header</option>
                  <option value="Tools & Mekanik">Tools & Mekanik</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Kondisi Fisik Barang
                </label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value as any)}
                  className="w-full text-xs px-3 py-2 bg-[#0B0F17] border border-slate-700 text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-orange cursor-pointer"
                >
                  <option value="Baru (New)">Baru (New) — Segel Pabrik / Belum Disolder</option>
                  <option value="Bekas Mulus (Grade A)">Bekas Mulus (Grade A) — Bekas Praktikum Terawat</option>
                  <option value="Cabutan Tested">Cabutan Tested — Bongkaran Medis/Alat Industri Normal</option>
                  <option value="DIY Kit">DIY Kit — Solder / Rakit Sendiri</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Catatan Khusus Kondisi (Ditampilkan ke Pembeli)
              </label>
              <input
                type="text"
                value={conditionNotes}
                onChange={(e) => setConditionNotes(e.target.value)}
                placeholder="Contoh: Sudah ditest flashing sketch Arduino, pin header bersih tanpa sisa timah"
                className="w-full text-xs px-3 py-2 bg-[#0B0F17] border border-slate-700 text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-orange"
              />
            </div>
          </div>

          {/* Section 2: Stok & Lokasi Rak */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-orange border-b border-slate-800 pb-1">
              2. Manajemen Stok Fisik & Lokasi Rak Toko
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Jumlah Stok Fisik (pcs)
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  value={stock}
                  onChange={(e) => setStock(parseInt(e.target.value) || 0)}
                  className="w-full text-xs font-mono font-bold px-3 py-2 bg-[#0B0F17] border border-slate-700 text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-orange"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Batas Peringatan Menipis (pcs)
                </label>
                <input
                  type="number"
                  min="1"
                  value={minStock}
                  onChange={(e) => setMinStock(parseInt(e.target.value) || 5)}
                  className="w-full text-xs font-mono px-3 py-2 bg-[#0B0F17] border border-slate-700 text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-orange"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Lokasi Rak / Kotak di Toko
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Contoh: Rak A-02 / Bin 3"
                  className="w-full text-xs px-3 py-2 bg-[#0B0F17] border border-slate-700 text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-orange"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Harga Jual & Harga Modal HPP */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-orange border-b border-slate-800 pb-1">
              3. Penetapan Harga (Rupiah)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Harga Jual ke Pembeli (Rp) <span className="text-rose-400">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  step="500"
                  required
                  value={price}
                  onChange={(e) => setPrice(parseInt(e.target.value) || 0)}
                  placeholder="Contoh: 35000"
                  className="w-full text-xs font-mono font-bold px-3 py-2 bg-[#0B0F17] border border-slate-700 text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-orange"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Harga Modal / HPP (Khusus Admin)
                </label>
                <input
                  type="number"
                  min="0"
                  step="500"
                  value={costPrice}
                  onChange={(e) => setCostPrice(parseInt(e.target.value) || 0)}
                  placeholder="Contoh: 25000"
                  className="w-full text-xs font-mono px-3 py-2 bg-[#0B0F17] border border-slate-700 text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-orange"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Foto Produk & Shopee Integration */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-orange border-b border-slate-800 pb-1">
              4. Media & Tautan Shopee
            </h4>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                URL Gambar Produk
              </label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full text-xs font-mono px-3 py-2 bg-[#0B0F17] border border-slate-700 text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-orange"
              />
              <div className="flex items-center space-x-2 pt-2 overflow-x-auto no-scrollbar">
                <span className="text-[10px] text-slate-400 shrink-0">Preset Foto Cepat:</span>
                {PRESET_IMAGES.map((preset, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setImage(preset.url)}
                    className="text-[10px] px-2 py-0.5 rounded bg-[#151D2C] hover:bg-[#1E293B] text-slate-300 border border-slate-800 shrink-0 cursor-pointer"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Shopee Direct Product Link */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1 flex items-center justify-between">
                <span>Tautan Beli di Shopee (detronicsid)</span>
                <span className="text-[#EE4D2D] text-[10px] font-bold">Shopee Integration</span>
              </label>
              <input
                type="text"
                value={shopeeUrl}
                onChange={(e) => setShopeeUrl(e.target.value)}
                placeholder="https://shopee.co.id/detronicsid"
                className="w-full text-xs font-mono px-3 py-2 bg-[#0B0F17] border border-slate-700 text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-[#EE4D2D]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Deskripsi Singkat (Ringkasan 1 Kalimat)
              </label>
              <input
                type="text"
                value={shortDesc}
                onChange={(e) => setShortDesc(e.target.value)}
                placeholder="Contoh: Modul IoT powerful dual-core Xtensa 32-bit dengan WiFi dan BLE."
                className="w-full text-xs px-3 py-2 bg-[#0B0F17] border border-slate-700 text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-orange"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Deskripsi Lengkap & Panduan Penggunaan
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Jelaskan fitur utama, kecocokan library Arduino/STM32, dan keunggulan komponen ini..."
                className="w-full text-xs px-3 py-2 bg-[#0B0F17] border border-slate-700 text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-orange"
              />
            </div>
          </div>

          {/* Section 5: Spesifikasi Teknis Dinamis */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                5. Spesifikasi Teknis (Key-Value Pinout/Rating)
              </h4>
              <button
                type="button"
                onClick={handleAddSpec}
                className="text-[11px] font-bold text-brand-orange hover:underline flex items-center cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 mr-0.5" />
                Tambah Baris Spek
              </button>
            </div>

            <div className="space-y-2">
              {specs.map((spec, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Nama Parameter (misal: Tegangan)"
                    value={spec.label}
                    onChange={(e) => handleUpdateSpec(index, 'label', e.target.value)}
                    className="flex-1 text-xs px-3 py-1.5 bg-[#0B0F17] border border-slate-700 text-white rounded-lg focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Nilai (misal: 3.3V - 5V DC)"
                    value={spec.value}
                    onChange={(e) => handleUpdateSpec(index, 'value', e.target.value)}
                    className="flex-1 text-xs font-mono px-3 py-1.5 bg-[#0B0F17] border border-slate-700 text-white rounded-lg focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSpec(index)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Catatan Pinout / Wiring
                </label>
                <input
                  type="text"
                  value={pinoutNotes}
                  onChange={(e) => setPinoutNotes(e.target.value)}
                  placeholder="Contoh: VCC=5V, GND=0V, TX=GPIO1, RX=GPIO3"
                  className="w-full text-xs font-mono px-3 py-2 bg-[#0B0F17] border border-slate-700 text-white rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Link PDF Datasheet (Opsional)
                </label>
                <input
                  type="url"
                  value={datasheetUrl}
                  onChange={(e) => setDatasheetUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full text-xs font-mono px-3 py-2 bg-[#0B0F17] border border-slate-700 text-white rounded-xl focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 6: Visibility Switch */}
          <div className="p-4 bg-[#151D2C] rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-white block">
                Publikasikan ke Toko Online
              </span>
              <span className="text-[11px] text-slate-400">
                Jika diaktifkan, produk ini akan muncul di katalog publik dan dapat dipesan oleh pembeli.
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </div>

          {/* Footer Submit Buttons */}
          <div className="flex gap-2.5 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-brand-orange hover:bg-brand-orange-hover text-white font-bold rounded-xl text-xs transition-all shadow-md active:scale-98 flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{productToEdit ? 'Simpan Perubahan' : 'Tambahkan ke Inventaris'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
