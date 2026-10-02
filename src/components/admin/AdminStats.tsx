import React from 'react';
import { 
  Package, 
  Boxes, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle, 
  XCircle 
} from 'lucide-react';
import { useInventory } from '../../context/InventoryContext';
import { formatRupiah } from '../../utils/formatters';

export const AdminStats: React.FC = () => {
  const { products } = useInventory();

  const totalSKU = products.length;
  const totalUnits = products.reduce((sum, p) => sum + p.stock, 0);
  
  // Total Valuation
  const totalCostValue = products.reduce((sum, p) => sum + (p.costPrice * p.stock), 0);
  const totalRetailValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
  const projectedProfit = totalRetailValue - totalCostValue;

  // Alerts
  const lowStockCount = products.filter(p => p.stock > 0 && p.stock <= p.minStock).length;
  const outOfStockCount = products.filter(p => p.stock <= 0).length;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 mb-6">
      
      {/* 1. Total SKU */}
      <div className="bg-[#151D2C] p-4 rounded-2xl border border-slate-800 shadow-md space-y-1">
        <div className="flex items-center justify-between text-slate-400">
          <span className="text-[11px] font-bold uppercase tracking-wider">Varian Produk</span>
          <Package className="w-4 h-4 text-brand-orange" />
        </div>
        <p className="text-xl sm:text-2xl font-black text-white font-mono">
          {totalSKU} <span className="text-xs font-normal text-slate-400">SKU</span>
        </p>
        <span className="text-[10px] text-slate-400 block">Katalog komponen aktif</span>
      </div>

      {/* 2. Total Unit Fisik */}
      <div className="bg-[#151D2C] p-4 rounded-2xl border border-slate-800 shadow-md space-y-1">
        <div className="flex items-center justify-between text-slate-400">
          <span className="text-[11px] font-bold uppercase tracking-wider">Total Fisik</span>
          <Boxes className="w-4 h-4 text-sky-400" />
        </div>
        <p className="text-xl sm:text-2xl font-black text-white font-mono">
          {totalUnits} <span className="text-xs font-normal text-slate-400">pcs</span>
        </p>
        <span className="text-[10px] text-slate-400 block">Total barang di rak toko</span>
      </div>

      {/* 3. Nilai Modal HPP */}
      <div className="bg-[#151D2C] p-4 rounded-2xl border border-slate-800 shadow-md space-y-1">
        <div className="flex items-center justify-between text-slate-400">
          <span className="text-[11px] font-bold uppercase tracking-wider">Modal Aset (HPP)</span>
          <DollarSign className="w-4 h-4 text-emerald-400" />
        </div>
        <p className="text-base sm:text-lg font-black text-emerald-400 font-mono truncate" title={formatRupiah(totalCostValue)}>
          {formatRupiah(totalCostValue)}
        </p>
        <span className="text-[10px] text-slate-400 block">Nilai modal kulakan</span>
      </div>

      {/* 4. Nilai Jual / Potensi */}
      <div className="bg-[#151D2C] p-4 rounded-2xl border border-slate-800 shadow-md space-y-1">
        <div className="flex items-center justify-between text-slate-400">
          <span className="text-[11px] font-bold uppercase tracking-wider">Potensi Omset</span>
          <TrendingUp className="w-4 h-4 text-amber-400" />
        </div>
        <p className="text-base sm:text-lg font-black text-brand-orange font-mono truncate" title={formatRupiah(totalRetailValue)}>
          {formatRupiah(totalRetailValue)}
        </p>
        <span className="text-[10px] text-emerald-400 font-medium block">
          Laba: +{formatRupiah(projectedProfit)}
        </span>
      </div>

      {/* 5. Alert Stok Menipis */}
      <div className={`p-4 rounded-2xl border shadow-md space-y-1 ${
        lowStockCount > 0 ? 'bg-amber-950/40 border-amber-800' : 'bg-[#151D2C] border-slate-800'
      }`}>
        <div className="flex items-center justify-between text-slate-400">
          <span className={`text-[11px] font-bold uppercase tracking-wider ${
            lowStockCount > 0 ? 'text-amber-300' : 'text-slate-400'
          }`}>Stok Menipis</span>
          <AlertTriangle className={`w-4 h-4 ${lowStockCount > 0 ? 'text-amber-400' : 'text-slate-500'}`} />
        </div>
        <p className={`text-xl sm:text-2xl font-black font-mono ${
          lowStockCount > 0 ? 'text-amber-400' : 'text-slate-200'
        }`}>
          {lowStockCount} <span className="text-xs font-normal text-slate-400">item</span>
        </p>
        <span className="text-[10px] text-slate-400 block">Stok &le; batas minimum</span>
      </div>

      {/* 6. Alert Stok Habis */}
      <div className={`p-4 rounded-2xl border shadow-md space-y-1 ${
        outOfStockCount > 0 ? 'bg-rose-950/40 border-rose-800' : 'bg-[#151D2C] border-slate-800'
      }`}>
        <div className="flex items-center justify-between text-slate-400">
          <span className={`text-[11px] font-bold uppercase tracking-wider ${
            outOfStockCount > 0 ? 'text-rose-300' : 'text-slate-400'
          }`}>Stok Kosong</span>
          <XCircle className={`w-4 h-4 ${outOfStockCount > 0 ? 'text-rose-400' : 'text-slate-500'}`} />
        </div>
        <p className={`text-xl sm:text-2xl font-black font-mono ${
          outOfStockCount > 0 ? 'text-rose-400' : 'text-slate-200'
        }`}>
          {outOfStockCount} <span className="text-xs font-normal text-slate-400">item</span>
        </p>
        <span className="text-[10px] text-slate-400 block">Perlu restock segera</span>
      </div>

    </div>
  );
};
