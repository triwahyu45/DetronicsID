import React from 'react';
import { Product } from '../../types/inventory';
import { ProductCard } from './ProductCard';
import { SearchX, RotateCcw } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  onOpenDetail: (p: Product) => void;
  onQuickBuyWA: (p: Product) => void;
  onResetFilters: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onOpenDetail,
  onQuickBuyWA,
  onResetFilters,
}) => {
  if (products.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-[#151D2C] border border-slate-800 flex items-center justify-center mx-auto mb-4 text-slate-400">
          <SearchX className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-white mb-1">
          Tidak ada komponen yang cocok
        </h3>
        <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
          Komponen atau filter yang Anda cari tidak ditemukan. Coba ubah kata kunci pencarian, kategori, atau status kondisi.
        </p>
        <button
          onClick={onResetFilters}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold transition-colors cursor-pointer shadow-sm"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Semua Filter</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onOpenDetail={onOpenDetail}
            onQuickBuyWA={onQuickBuyWA}
          />
        ))}
      </div>
    </div>
  );
};
