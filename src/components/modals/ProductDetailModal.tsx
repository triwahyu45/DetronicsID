import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  MapPin, 
  ExternalLink, 
  Cpu, 
  FileText, 
  CheckCircle2, 
  Phone, 
  AlertCircle 
} from 'lucide-react';
import { Product } from '../../types/inventory';
import { formatRupiah, getConditionStyle, getStockStatus } from '../../utils/formatters';
import { useInventory } from '../../context/InventoryContext';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onOrderWA: (product: Product, qty: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onOrderWA,
}) => {
  const { addToCart, settings } = useInventory();
  const [qty, setQty] = useState(1);

  if (!product) return null;

  const condStyle = getConditionStyle(product.condition);
  const stockInfo = getStockStatus(product.stock, product.minStock);
  const shopeeTargetUrl = product.shopeeUrl || settings.shopeeStoreUrl || 'https://shopee.co.id/detronicsid';

  const handleAddToCart = () => {
    addToCart(product, qty);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-[#111827] text-slate-100 rounded-3xl shadow-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto border border-slate-800 flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer shadow-xs"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header & Content Grid */}
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          
          {/* Left Column: Image & Location */}
          <div className="space-y-4">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#0B0F17] border border-slate-800">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80';
                }}
              />
              <div className="absolute top-3 left-3">
                <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md shadow-sm ${condStyle.bg} ${condStyle.text} ${condStyle.border}`}>
                  <span className={`w-2 h-2 rounded-full ${condStyle.dot}`}></span>
                  <span>{condStyle.label}</span>
                </span>
              </div>
            </div>

            {/* Storage Bin Location & Quality Assurance */}
            <div className="bg-[#151D2C] border border-slate-800 rounded-xl p-3.5 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-300 font-medium">
                <span className="flex items-center text-slate-400">
                  <MapPin className="w-3.5 h-3.5 mr-1.5 text-brand-orange" />
                  Lokasi Rak Fisik Toko:
                </span>
                <span className="font-mono font-bold bg-[#0B0F17] text-white px-2 py-0.5 rounded border border-slate-700">
                  {product.location || 'Area Etalase Utama'}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-300 font-medium">
                <span className="flex items-center text-slate-400">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                  Quality Control (QC):
                </span>
                <span className="text-emerald-400 font-semibold">100% Tested OK</span>
              </div>
            </div>

            {/* Datasheet Link if available */}
            {product.datasheetUrl && (
              <a
                href={product.datasheetUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center space-x-2 w-full py-2.5 px-3 bg-[#151D2C] hover:bg-[#1E293B] text-slate-300 hover:text-white border border-slate-800 font-semibold rounded-xl text-xs transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4 text-brand-orange" />
                <span>Unduh / Buka Datasheet Resmi</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            )}
          </div>

          {/* Right Column: Product Info & Order actions */}
          <div className="space-y-4">
            
            {/* SKU & Category */}
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono bg-[#0B0F17] text-slate-400 px-2 py-0.5 rounded border border-slate-800">
                SKU: {product.sku}
              </span>
              <span className="text-brand-orange font-bold uppercase tracking-wider text-[11px]">
                {product.category}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-lg sm:text-xl font-extrabold text-white leading-tight">
              {product.name}
            </h2>

            {/* Price & Stock */}
            <div className="bg-[#151D2C] p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block font-medium">Harga Satuan</span>
                <span className="text-2xl font-black text-brand-orange font-mono">
                  {formatRupiah(product.price)}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block font-medium">Ketersediaan</span>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border ${stockInfo.color}`}>
                  <span className={`w-2 h-2 rounded-full mr-1.5 ${stockInfo.badge}`}></span>
                  {stockInfo.label}
                </span>
              </div>
            </div>

            {/* Condition Note Callout */}
            {product.conditionNotes && (
              <div className="p-3 bg-amber-950/40 border border-amber-800/80 rounded-xl flex items-start space-x-2 text-xs text-amber-200">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-amber-300">Catatan Kondisi Barang:</span>
                  <p className="text-amber-200">{product.conditionNotes}</p>
                </div>
              </div>
            )}

            {/* Description */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Deskripsi Produk</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {product.description || product.shortDesc}
              </p>
            </div>

            {/* Technical Specifications */}
            {product.specs && product.specs.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center">
                  <Cpu className="w-3.5 h-3.5 mr-1 text-brand-orange" />
                  Spesifikasi Teknis
                </h4>
                <div className="bg-[#151D2C] rounded-xl overflow-hidden border border-slate-800 text-xs">
                  <table className="w-full text-left">
                    <tbody>
                      {product.specs.map((spec, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-[#151D2C]' : 'bg-[#0B0F17]'}>
                          <td className="py-1.5 px-3 font-semibold text-slate-400 w-1/3 border-b border-slate-800">
                            {spec.label}
                          </td>
                          <td className="py-1.5 px-3 font-mono text-slate-200 border-b border-slate-800">
                            {spec.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Pinout Notes */}
            {product.pinoutNotes && (
              <div className="space-y-1 pt-1 text-xs">
                <span className="font-bold text-slate-400">Catatan Pinout / Wiring:</span>
                <p className="font-mono text-slate-200 bg-[#0B0F17] p-2 rounded-lg border border-slate-800 text-[11px]">
                  {product.pinoutNotes}
                </p>
              </div>
            )}

            {/* Quantity Selector & Action Buttons */}
            {stockInfo.canBuy && (
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-bold text-slate-300">Jumlah Beli:</span>
                  <div className="flex items-center border border-slate-700 rounded-xl overflow-hidden bg-[#0B0F17]">
                    <button
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="px-3 py-1.5 hover:bg-slate-800 text-slate-300 font-bold transition-colors cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-4 py-1.5 font-mono font-bold text-sm bg-[#151D2C] text-white">
                      {qty}
                    </span>
                    <button
                      onClick={() => setQty(Math.min(product.stock, qty + 1))}
                      className="px-3 py-1.5 hover:bg-slate-800 text-slate-300 font-bold transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xs text-slate-400">
                    (Maks. {product.stock} pcs)
                  </span>
                </div>

                {/* Primary Shopee Buy Button */}
                <a
                  href={shopeeTargetUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-[#EE4D2D] hover:bg-[#D73211] text-white font-extrabold rounded-xl text-xs sm:text-sm transition-all shadow-md active:scale-98 cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Beli Langsung di Shopee (detronicsid)</span>
                </a>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={handleAddToCart}
                    className="flex items-center justify-center space-x-2 py-2.5 px-4 bg-brand-orange hover:bg-brand-orange-hover text-white font-bold rounded-xl text-xs transition-all shadow-md active:scale-98 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>+ Keranjang</span>
                  </button>

                  <button
                    onClick={() => onOrderWA(product, qty)}
                    className="flex items-center justify-center space-x-2 py-2.5 px-4 bg-[#151D2C] hover:bg-[#1E293B] border border-slate-700 text-slate-200 font-bold rounded-xl text-xs transition-all shadow-md active:scale-98 cursor-pointer"
                  >
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span>Chat CS</span>
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
