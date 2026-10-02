import React, { useState } from 'react';
import { 
  Search, 
  Edit3, 
  Trash2, 
  Plus, 
  Minus, 
  MapPin, 
  Eye, 
  EyeOff, 
  ArrowUpDown, 
  ExternalLink 
} from 'lucide-react';
import { Product } from '../../types/inventory';
import { useInventory } from '../../context/InventoryContext';
import { formatRupiah, getConditionStyle, getStockStatus } from '../../utils/formatters';

interface InventoryTableProps {
  onEditProduct: (product: Product) => void;
  onOpenAddModal: () => void;
}

export const InventoryTable: React.FC<InventoryTableProps> = ({
  onEditProduct,
  onOpenAddModal,
}) => {
  const { products, quickUpdateStock, setStockAmount, deleteProduct, updateProduct, settings } = useInventory();
  
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('ALL');
  const [selectedCond, setSelectedCond] = useState<string>('ALL');
  const [selectedStockStatus, setSelectedStockStatus] = useState<string>('ALL');
  const [sortField, setSortField] = useState<'name' | 'stock' | 'price' | 'sku'>('name');
  const [sortAsc, setSortAsc] = useState(true);

  // Filter logic
  const filtered = products.filter((p) => {
    const matchSearch = 
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      (p.location && p.location.toLowerCase().includes(search.toLowerCase())) ||
      (p.shortDesc && p.shortDesc.toLowerCase().includes(search.toLowerCase()));

    const matchCat = selectedCat === 'ALL' || p.category === selectedCat;
    const matchCond = selectedCond === 'ALL' || p.condition === selectedCond;
    
    let matchStock = true;
    if (selectedStockStatus === 'LOW') matchStock = p.stock > 0 && p.stock <= p.minStock;
    if (selectedStockStatus === 'OUT') matchStock = p.stock <= 0;
    if (selectedStockStatus === 'READY') matchStock = p.stock > p.minStock;

    return matchSearch && matchCat && matchCond && matchStock;
  });

  // Sort logic
  const sorted = [...filtered].sort((a, b) => {
    let res = 0;
    if (sortField === 'name') res = a.name.localeCompare(b.name);
    if (sortField === 'sku') res = a.sku.localeCompare(b.sku);
    if (sortField === 'stock') res = a.stock - b.stock;
    if (sortField === 'price') res = a.price - b.price;
    return sortAsc ? res : -res;
  });

  const handleSort = (field: 'name' | 'stock' | 'price' | 'sku') => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const handleDeleteConfirm = (id: string, name: string) => {
    if (window.confirm(`Yakin ingin menghapus komponen "${name}" dari inventaris?`)) {
      deleteProduct(id);
    }
  };

  return (
    <div className="bg-[#151D2C] rounded-3xl border border-slate-800 shadow-md overflow-hidden">
      
      {/* Table Toolbar */}
      <div className="p-4 sm:p-5 border-b border-slate-800 bg-[#0B0F17] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama, SKU, rak (contoh: ESP32, Rak A-01)..."
              className="w-full pl-10 pr-4 py-2 bg-[#151D2C] text-xs border border-slate-700 text-white placeholder-slate-400 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-orange"
            />
          </div>

          {/* Quick Add Button */}
          <button
            onClick={onOpenAddModal}
            className="flex items-center space-x-1.5 px-4 py-2 bg-brand-orange hover:bg-brand-orange-hover text-white rounded-xl text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>+ Tambah Komponen</span>
          </button>
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          
          {/* Kategori Filter */}
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="px-2.5 py-1.5 bg-[#151D2C] border border-slate-700 rounded-lg text-slate-200 font-medium focus:outline-none cursor-pointer"
          >
            <option value="ALL">Semua Kategori</option>
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

          {/* Kondisi Filter */}
          <select
            value={selectedCond}
            onChange={(e) => setSelectedCond(e.target.value)}
            className="px-2.5 py-1.5 bg-[#151D2C] border border-slate-700 rounded-lg text-slate-200 font-medium focus:outline-none cursor-pointer"
          >
            <option value="ALL">Semua Kondisi</option>
            <option value="Baru (New)">Baru (New)</option>
            <option value="Bekas Mulus (Grade A)">Bekas Mulus (Grade A)</option>
            <option value="Cabutan Tested">Cabutan Tested</option>
            <option value="DIY Kit">DIY Kit</option>
          </select>

          {/* Status Stok Filter */}
          <select
            value={selectedStockStatus}
            onChange={(e) => setSelectedStockStatus(e.target.value)}
            className="px-2.5 py-1.5 bg-[#151D2C] border border-slate-700 rounded-lg text-slate-200 font-medium focus:outline-none cursor-pointer"
          >
            <option value="ALL">Semua Status Stok</option>
            <option value="READY">Ready Aman (&gt; Min Stock)</option>
            <option value="LOW">Peringatan: Stok Menipis</option>
            <option value="OUT">Habis (0 pcs)</option>
          </select>

          <span className="text-slate-400 font-mono ml-auto">
            Menampilkan {sorted.length} dari {products.length} komponen
          </span>
        </div>
      </div>

      {/* Main Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-[#0B0F17] text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-800">
            <tr>
              <th className="py-3 px-4">Komponen & Identitas</th>
              <th className="py-3 px-3">Kategori</th>
              <th className="py-3 px-3">Kondisi Fisik</th>
              <th className="py-3 px-3">Lokasi Rak</th>
              <th className="py-3 px-3 text-center cursor-pointer select-none" onClick={() => handleSort('stock')}>
                <div className="flex items-center justify-center space-x-1">
                  <span>Stok Fisik</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-3 px-3 text-right cursor-pointer select-none" onClick={() => handleSort('price')}>
                <div className="flex items-center justify-end space-x-1">
                  <span>Harga Jual / HPP</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-3 px-3 text-center">Status Web</th>
              <th className="py-3 px-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {sorted.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-slate-500">
                  Tidak ada komponen yang cocok dengan filter.
                </td>
              </tr>
            ) : (
              sorted.map((product) => {
                const cond = getConditionStyle(product.condition);
                const stock = getStockStatus(product.stock, product.minStock);

                return (
                  <tr key={product.id} className="hover:bg-[#1E293B]/50 transition-colors">
                    
                    {/* 1. Komponen: Image, Name, SKU */}
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded-xl object-cover bg-[#0B0F17] border border-slate-700 shrink-0"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80';
                          }}
                        />
                        <div className="min-w-0 max-w-xs">
                          <span className="font-mono text-[10px] text-slate-400 block font-semibold">
                            {product.sku}
                          </span>
                          <h4 className="font-bold text-white line-clamp-1 leading-snug" title={product.name}>
                            {product.name}
                          </h4>
                          {product.conditionNotes && (
                            <span className="text-[10px] text-amber-400 italic block line-clamp-1">
                              {product.conditionNotes}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* 2. Kategori */}
                    <td className="py-3 px-3 text-slate-300 font-medium">
                      {product.category}
                    </td>

                    {/* 3. Kondisi */}
                    <td className="py-3 px-3">
                      <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${cond.bg} ${cond.text} ${cond.border}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${cond.dot}`}></span>
                        <span>{cond.label}</span>
                      </span>
                    </td>

                    {/* 4. Lokasi Rak */}
                    <td className="py-3 px-3 font-mono text-[11px]">
                      <span className="inline-flex items-center px-2 py-0.5 rounded bg-[#0B0F17] border border-slate-700 text-slate-300">
                        <MapPin className="w-2.5 h-2.5 mr-1 text-brand-orange" />
                        {product.location || 'Area Display'}
                      </span>
                    </td>

                    {/* 5. Stok Fisik dengan Stepper Interaktif */}
                    <td className="py-3 px-3 text-center">
                      <div className="inline-flex flex-col items-center space-y-1">
                        <div className="flex items-center space-x-1 border border-slate-700 rounded-xl bg-[#0B0F17] p-0.5 shadow-2xs">
                          <button
                            onClick={() => quickUpdateStock(product.id, -1)}
                            className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-slate-800 text-slate-300 transition-colors cursor-pointer"
                            title="Kurang 1 pcs"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          
                          <input
                            type="number"
                            value={product.stock}
                            onChange={(e) => setStockAmount(product.id, parseInt(e.target.value) || 0)}
                            className="w-12 text-center text-xs font-mono font-bold py-0.5 bg-[#151D2C] border border-slate-700 text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-orange"
                          />

                          <button
                            onClick={() => quickUpdateStock(product.id, 1)}
                            className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-slate-800 text-slate-300 transition-colors cursor-pointer"
                            title="Tambah 1 pcs (Restock)"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        
                        {/* Status Label */}
                        <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${stock.color}`}>
                          {stock.label}
                        </span>
                      </div>
                    </td>

                    {/* 6. Harga Jual & Modal */}
                    <td className="py-3 px-3 text-right font-mono">
                      <span className="font-black text-brand-orange block text-xs">
                        {formatRupiah(product.price)}
                      </span>
                      <span className="text-[10px] text-slate-400 block" title="Harga Modal / HPP">
                        HPP: {formatRupiah(product.costPrice)}
                      </span>
                    </td>

                    {/* 7. Status Tampil di Web */}
                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => updateProduct(product.id, { isPublished: !product.isPublished })}
                        className={`inline-flex items-center space-x-1 px-2 py-1 rounded-lg text-[10px] font-bold border transition-colors cursor-pointer ${
                          product.isPublished
                            ? 'bg-emerald-950/50 text-emerald-300 border-emerald-800 hover:bg-emerald-900/60'
                            : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
                        }`}
                        title="Klik untuk ubah status tampil di web publik"
                      >
                        {product.isPublished ? (
                          <>
                            <Eye className="w-3 h-3" />
                            <span>Publik</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3" />
                            <span>Draft</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* 8. Tombol Aksi */}
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center space-x-1.5">
                        <button
                          onClick={() => onEditProduct(product)}
                          className="p-1.5 rounded-lg bg-[#0B0F17] hover:bg-brand-orange hover:text-white text-slate-300 border border-slate-700 transition-colors cursor-pointer"
                          title="Edit Komponen"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteConfirm(product.id, product.name)}
                          className="p-1.5 rounded-lg bg-[#0B0F17] hover:bg-rose-600 hover:text-white text-slate-400 border border-slate-700 transition-colors cursor-pointer"
                          title="Hapus Komponen"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};
