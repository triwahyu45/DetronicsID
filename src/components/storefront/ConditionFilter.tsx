import React from 'react';
import { Filter, ArrowUpDown } from 'lucide-react';
import { ProductCondition } from '../../types/inventory';

export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'name-asc' | 'stock-desc';

interface ConditionFilterProps {
  selectedCondition: string;
  onSelectCondition: (cond: string) => void;
  onlyInStock: boolean;
  onToggleInStock: (val: boolean) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  totalFiltered: number;
}

export const CONDITIONS: { id: string; label: string; dotColor: string }[] = [
  { id: 'ALL', label: 'Semua Kondisi', dotColor: 'bg-slate-400' },
  { id: 'Baru (New)', label: 'Baru (New)', dotColor: 'bg-emerald-400' },
  { id: 'Bekas Mulus (Grade A)', label: 'Bekas Grade A', dotColor: 'bg-sky-400' },
  { id: 'Cabutan Tested', label: 'Cabutan Tested', dotColor: 'bg-purple-400' },
  { id: 'DIY Kit', label: 'DIY Kit', dotColor: 'bg-amber-400' },
];

export const ConditionFilter: React.FC<ConditionFilterProps> = ({
  selectedCondition,
  onSelectCondition,
  onlyInStock,
  onToggleInStock,
  sortBy,
  onSortChange,
  totalFiltered,
}) => {
  return (
    <div className="bg-[#0D1522] border-b border-slate-800 py-3 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        
        {/* Condition Filter Badges */}
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-0.5">
          <span className="text-xs font-bold text-slate-400 flex items-center shrink-0 mr-1">
            <Filter className="w-3.5 h-3.5 mr-1 text-brand-orange" />
            Kondisi:
          </span>
          {CONDITIONS.map((cond) => {
            const isSelected = selectedCondition === cond.id;
            return (
              <button
                key={cond.id}
                onClick={() => onSelectCondition(cond.id)}
                className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap border ${
                  isSelected
                    ? 'bg-brand-orange/20 text-white font-bold border-brand-orange shadow-xs ring-1 ring-brand-orange/40'
                    : 'bg-[#151D2C] text-slate-300 border-slate-800 hover:bg-[#1E293B] hover:text-white'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${cond.dotColor}`}></span>
                <span>{cond.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right side controls: In Stock toggle & Sorting */}
        <div className="flex items-center justify-between sm:justify-end space-x-3 shrink-0 text-xs">
          {/* Checkbox Ready Stock Only */}
          <label className="inline-flex items-center space-x-2 cursor-pointer bg-[#151D2C] px-3 py-1.5 rounded-lg border border-slate-800 select-none hover:bg-[#1E293B] text-slate-200">
            <input
              type="checkbox"
              checked={onlyInStock}
              onChange={(e) => onToggleInStock(e.target.checked)}
              className="rounded text-brand-orange focus:ring-brand-orange w-3.5 h-3.5 bg-[#0B0F17] border-slate-700"
            />
            <span className="font-semibold text-slate-200">Hanya Ready Stock</span>
          </label>

          {/* Sort Dropdown */}
          <div className="flex items-center space-x-1 bg-[#151D2C] px-2.5 py-1.5 rounded-lg border border-slate-800">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400 font-medium">Urut:</span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="bg-transparent text-white font-bold focus:outline-none cursor-pointer text-xs"
            >
              <option value="newest" className="bg-[#151D2C] text-white">Terbaru</option>
              <option value="price-asc" className="bg-[#151D2C] text-white">Harga Terendah</option>
              <option value="price-desc" className="bg-[#151D2C] text-white">Harga Tertinggi</option>
              <option value="name-asc" className="bg-[#151D2C] text-white">Nama A-Z</option>
              <option value="stock-desc" className="bg-[#151D2C] text-white">Stok Terbanyak</option>
            </select>
          </div>

          {/* Counter info */}
          <span className="text-slate-400 font-mono hidden lg:inline">
            ({totalFiltered} produk)
          </span>
        </div>

      </div>
    </div>
  );
};
