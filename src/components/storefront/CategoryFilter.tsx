import React from 'react';
import { 
  Layers, 
  Cpu, 
  Eye, 
  Cog, 
  Tv, 
  Wifi, 
  Activity, 
  BatteryCharging, 
  GitFork, 
  Wrench 
} from 'lucide-react';
import { ProductCategory } from '../../types/inventory';
import { useInventory } from '../../context/InventoryContext';

interface CategoryFilterProps {
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
}

export const CATEGORIES: { name: ProductCategory; icon: React.ReactNode }[] = [
  { name: 'Semua', icon: <Layers className="w-4 h-4" /> },
  { name: 'Microcontroller', icon: <Cpu className="w-4 h-4" /> },
  { name: 'Sensor', icon: <Eye className="w-4 h-4" /> },
  { name: 'Motor & Driver', icon: <Cog className="w-4 h-4" /> },
  { name: 'Display & Opto', icon: <Tv className="w-4 h-4" /> },
  { name: 'Wireless & IoT', icon: <Wifi className="w-4 h-4" /> },
  { name: 'Komponen Pasif & Aktif', icon: <Activity className="w-4 h-4" /> },
  { name: 'Power & Battery', icon: <BatteryCharging className="w-4 h-4" /> },
  { name: 'Kabel & Header', icon: <GitFork className="w-4 h-4" /> },
  { name: 'Tools & Mekanik', icon: <Wrench className="w-4 h-4" /> },
];

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const { products } = useInventory();

  // Calculate count per category
  const getCount = (catName: ProductCategory) => {
    if (catName === 'Semua') return products.filter(p => p.isPublished).length;
    return products.filter(p => p.isPublished && p.category === catName).length;
  };

  return (
    <div className="bg-[#0B0F17] border-b border-slate-800 sticky top-[61px] sm:top-[69px] z-20 shadow-sm backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 overflow-x-auto py-2.5 no-scrollbar scroll-smooth">
          {CATEGORIES.map(({ name, icon }) => {
            const isSelected = selectedCategory === name;
            const count = getCount(name);

            return (
              <button
                key={name}
                onClick={() => onSelectCategory(name)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-brand-orange text-white border-brand-orange shadow-md'
                    : 'bg-[#151D2C] text-slate-300 border-slate-800 hover:bg-[#1E293B] hover:text-white'
                }`}
              >
                <span className={isSelected ? 'text-white' : 'text-slate-400'}>
                  {icon}
                </span>
                <span>{name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-[#0B0F17] text-slate-400 border border-slate-700'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
