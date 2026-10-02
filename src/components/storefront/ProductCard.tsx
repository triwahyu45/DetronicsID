import React from 'react';
import { ShoppingBag, Eye, MapPin, ExternalLink } from 'lucide-react';
import { Product } from '../../types/inventory';
import { formatRupiah, getConditionStyle, getStockStatus } from '../../utils/formatters';
import { useInventory } from '../../context/InventoryContext';

interface ProductCardProps {
  product: Product;
  onOpenDetail: (p: Product) => void;
  onQuickBuyWA: (p: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetail,
}) => {
  const { addToCart, settings } = useInventory();
  const condStyle = getConditionStyle(product.condition);
  const stockInfo = getStockStatus(product.stock, product.minStock);

  const shopeeTargetUrl = product.shopeeUrl || settings.shopeeStoreUrl || 'https://shopee.co.id/detronicsid';

  return (
    <div className="group bg-[#151D2C] rounded-2xl border border-slate-800 hover:border-slate-700 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* Product Image Header with Badges */}
      <div className="relative aspect-square w-full bg-[#0B0F17] overflow-hidden cursor-pointer" onClick={() => onOpenDetail(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80';
          }}
        />

        {/* Condition Badge (Top-Left) */}
        <div className="absolute top-2.5 left-2.5">
          <span className={`inline-flex items-center space-x-1 px-2.5 py-0.8 rounded-full text-[11px] font-bold border backdrop-blur-md shadow-xs ${condStyle.bg} ${condStyle.text} ${condStyle.border}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${condStyle.dot}`}></span>
            <span>{condStyle.label}</span>
          </span>
        </div>

        {/* Stock Status Badge (Top-Right) */}
        <div className="absolute top-2.5 right-2.5">
          <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold border backdrop-blur-md shadow-xs ${stockInfo.color}`}>
            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${stockInfo.badge}`}></span>
            <span>{stockInfo.label}</span>
          </span>
        </div>

        {/* Location Bin Tag (Bottom-Left) */}
        {product.location && (
          <div className="absolute bottom-2 left-2">
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-black/75 text-slate-200 text-[10px] font-mono backdrop-blur-xs border border-white/10">
              <MapPin className="w-2.5 h-2.5 text-brand-orange" />
              <span>{product.location}</span>
            </span>
          </div>
        )}
      </div>

      {/* Product Information Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        
        <div className="space-y-1.5">
          {/* SKU & Category */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>{product.sku}</span>
            <span className="text-brand-orange font-sans font-medium text-[10px] uppercase tracking-wider">{product.category}</span>
          </div>

          {/* Product Name */}
          <h3 
            onClick={() => onOpenDetail(product)}
            className="font-bold text-sm text-white line-clamp-2 hover:text-brand-orange transition-colors cursor-pointer leading-snug"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Short Specs / Highlights */}
          {product.specs && product.specs.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1">
              {product.specs.slice(0, 2).map((sp, idx) => (
                <span key={idx} className="text-[10px] bg-[#0B0F17] text-slate-300 border border-slate-800 px-1.5 py-0.5 rounded font-mono">
                  {sp.label}: {sp.value}
                </span>
              ))}
            </div>
          )}

          {/* Condition note snippet if any */}
          {product.conditionNotes && (
            <p className="text-[11px] text-slate-400 italic line-clamp-1">
              "{product.conditionNotes}"
            </p>
          )}
        </div>

        {/* Price & Action Area */}
        <div className="pt-2 border-t border-slate-800 space-y-2.5">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-xs text-slate-400 block">Harga</span>
              <span className="text-base sm:text-lg font-black text-brand-orange tracking-tight font-mono">
                {formatRupiah(product.price)}
              </span>
            </div>
            {product.soldCount > 0 && (
              <span className="text-[10px] text-slate-400 font-mono">
                Terjual {product.soldCount}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={() => onOpenDetail(product)}
              className="flex items-center justify-center space-x-1 py-2 px-2 rounded-xl bg-[#0B0F17] hover:bg-[#1E293B] text-slate-200 text-xs font-bold transition-colors cursor-pointer border border-slate-800"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Detail</span>
            </button>

            {stockInfo.canBuy ? (
              <button
                onClick={() => addToCart(product, 1)}
                className="flex items-center justify-center space-x-1 py-2 px-2 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>+ Keranjang</span>
              </button>
            ) : (
              <button
                disabled
                className="flex items-center justify-center space-x-1 py-2 px-2 rounded-xl bg-slate-800 text-slate-500 text-xs font-semibold cursor-not-allowed"
              >
                <span>Habis</span>
              </button>
            )}
          </div>

          {/* Direct Shopee Button */}
          <a
            href={shopeeTargetUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center justify-center space-x-1.5 py-1.5 px-2 rounded-xl bg-[#EE4D2D]/15 hover:bg-[#EE4D2D]/25 border border-[#EE4D2D]/40 text-[#EE4D2D] text-[11px] font-bold transition-all cursor-pointer"
          >
            <ExternalLink className="w-3 h-3" />
            <span>Beli di Shopee</span>
          </a>
        </div>

      </div>

    </div>
  );
};
