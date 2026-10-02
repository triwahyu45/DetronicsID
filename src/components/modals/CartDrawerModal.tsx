import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  Phone, 
  MapPin, 
  CreditCard, 
  QrCode, 
  Truck, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { useInventory } from '../../context/InventoryContext';
import { formatRupiah } from '../../utils/formatters';

interface CartDrawerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQRIS: () => void;
}

export const CartDrawerModal: React.FC<CartDrawerModalProps> = ({
  isOpen,
  onClose,
  onOpenQRIS,
}) => {
  const { cart, updateCartQuantity, removeFromCart, clearCart, cartTotal, settings } = useInventory();
  
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'COD UNY/UGM' | 'Ambil di Toko (Samirono)' | 'Kurir Instant (GoSend/Grab)' | 'JNE / J&T / SiCepat'>('COD UNY/UGM');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'QRIS' | 'Transfer Bank' | 'Tunai / COD'>('QRIS');
  const [orderNotes, setOrderNotes] = useState('');

  if (!isOpen) return null;

  const handleCheckoutWA = () => {
    if (cart.length === 0) return;
    if (!customerName.trim()) {
      alert('Mohon isi nama lengkap pemesan terlebih dahulu.');
      return;
    }

    if (!settings.whatsapp) {
      // If store owner has not configured WhatsApp, redirect to Shopee store directly
      window.open(settings.shopeeStoreUrl || 'https://shopee.co.id/detronicsid', '_blank');
      return;
    }

    // Build structured WhatsApp message
    let message = `*HALO DETRONICS ID, SAYA INGIN MEMESAN KOMPONEN:*\n`;
    message += `----------------------------------------\n`;
    
    cart.forEach((item, idx) => {
      message += `${idx + 1}. *${item.product.name}*\n`;
      message += `   SKU: ${item.product.sku} | Kondisi: ${item.product.condition}\n`;
      message += `   Jumlah: ${item.quantity} pcs x ${formatRupiah(item.product.price)} = *${formatRupiah(item.product.price * item.quantity)}*\n`;
    });

    message += `----------------------------------------\n`;
    message += `*TOTAL PESANAN: ${formatRupiah(cartTotal)}*\n\n`;
    message += `*DATA PEMESAN:*\n`;
    message += `• Nama: ${customerName}\n`;
    if (customerPhone) message += `• No. Kontak: ${customerPhone}\n`;
    message += `• Metode Pengambilan: ${deliveryMethod}\n`;
    if (customerAddress) message += `• Alamat / Titik COD: ${customerAddress}\n`;
    message += `• Rencana Pembayaran: ${paymentMethod}\n`;
    if (orderNotes) message += `• Catatan: ${orderNotes}\n`;
    message += `\nMohon konfirmasi ketersediaan dan total pembayarannya. Terima kasih! 🙏`;

    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/${settings.whatsapp}?text=${encoded}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-[#111827] text-slate-100 h-full shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-[#151D2C] sticky top-0 z-10">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-orange flex items-center justify-center text-white shadow-sm">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-extrabold text-base text-white">Keranjang Belanja</h2>
              <span className="text-xs text-slate-400 font-medium">{cart.length} macam produk dipilih</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="p-4 sm:p-5 flex-1 overflow-y-auto space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#151D2C] border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-slate-200">Keranjang Anda masih kosong</h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Silakan pilih komponen elektronika, sensor, atau modul yang Anda butuhkan di katalog toko.
              </p>
              <div className="pt-2">
                <a
                  href={settings.shopeeStoreUrl || 'https://shopee.co.id/detronicsid'}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#EE4D2D] hover:bg-[#D73211] text-white text-xs font-bold transition-all shadow-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Kunjungi Toko Shopee DetronicsID</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => (
                <div 
                  key={item.product.id}
                  className="p-3 bg-[#151D2C] border border-slate-800 rounded-2xl flex items-center space-x-3 transition-colors"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover border border-slate-800 bg-[#0B0F17] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-400">{item.product.sku}</span>
                      <span className="text-[10px] font-semibold text-brand-orange">{item.product.condition}</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-100 truncate" title={item.product.name}>
                      {item.product.name}
                    </h4>
                    <span className="text-xs font-mono font-bold text-slate-300 block">
                      {formatRupiah(item.product.price)}
                    </span>
                    
                    {/* Stepper */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-slate-700 rounded-lg overflow-hidden bg-[#0B0F17]">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 hover:bg-slate-800 text-slate-300 text-xs cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-mono font-bold bg-[#111827] text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                          className="px-2 py-0.5 hover:bg-slate-800 text-slate-300 text-xs disabled:opacity-30 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-mono font-extrabold text-white">
                          {formatRupiah(item.product.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer transition-colors"
                          title="Hapus item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              ))}

              <div className="flex justify-end pt-1">
                <button
                  onClick={clearCart}
                  className="text-[11px] text-slate-400 hover:text-rose-400 flex items-center space-x-1 cursor-pointer transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Kosongkan Semua Keranjang</span>
                </button>
              </div>

              {/* Form Data Pemesan */}
              <div className="mt-5 pt-4 border-t border-slate-800 space-y-3">
                <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-400 flex items-center space-x-1">
                  <span>Data Pemesan & Pengiriman</span>
                </h3>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Nama Pemesan <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Contoh: Budi Prasetyo"
                    className="w-full text-xs px-3 py-2 bg-[#0B0F17] border border-slate-700 text-white rounded-xl focus:bg-[#151D2C] focus:outline-none focus:ring-1 focus:ring-brand-orange"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Nomor Kontak / WhatsApp Pemesan
                  </label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Contoh: 081234567890"
                    className="w-full text-xs px-3 py-2 bg-[#0B0F17] border border-slate-700 text-white rounded-xl focus:bg-[#151D2C] focus:outline-none focus:ring-1 focus:ring-brand-orange"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Metode Pengambilan / Pengiriman
                  </label>
                  <select
                    value={deliveryMethod}
                    onChange={(e) => setDeliveryMethod(e.target.value as any)}
                    className="w-full text-xs px-3 py-2 bg-[#0B0F17] border border-slate-700 text-white rounded-xl focus:bg-[#151D2C] focus:outline-none focus:ring-1 focus:ring-brand-orange cursor-pointer"
                  >
                    <option value="COD UNY/UGM">COD Area Kampus UNY / UGM (Gratis)</option>
                    <option value="Ambil di Toko (Samirono)">Ambil Langsung di Toko (Samirono)</option>
                    <option value="Kurir Instant (GoSend/Grab)">Kurir Instant GoSend / Grab Express</option>
                    <option value="JNE / J&T / SiCepat">Ekspedisi JNE / J&T / SiCepat (Luar Kota)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Alamat Lengkap / Titik Temu COD
                  </label>
                  <input
                    type="text"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder="Contoh: Gerbang Sayap Barat UNY / Kos Samirono"
                    className="w-full text-xs px-3 py-2 bg-[#0B0F17] border border-slate-700 text-white rounded-xl focus:bg-[#151D2C] focus:outline-none focus:ring-1 focus:ring-brand-orange"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Rencana Metode Pembayaran
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['QRIS', 'Transfer Bank', 'Tunai / COD'] as const).map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setPaymentMethod(method)}
                        className={`py-2 px-2 text-center rounded-xl text-[11px] font-bold border transition-all cursor-pointer ${
                          paymentMethod === method
                            ? 'bg-brand-orange/20 border-brand-orange text-brand-orange shadow-xs'
                            : 'bg-[#0B0F17] border-slate-700 text-slate-400 hover:bg-[#151D2C]'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Catatan Tambahan (Opsional)
                  </label>
                  <input
                    type="text"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder="Contoh: Minta tolong pin header disolderkan"
                    className="w-full text-xs px-3 py-2 bg-[#0B0F17] border border-slate-700 text-white rounded-xl focus:bg-[#151D2C] focus:outline-none focus:ring-1 focus:ring-brand-orange"
                  />
                </div>
              </div>

            </div>
          )}
        </div>

        {/* Footer & Checkout Action */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-800 bg-[#151D2C] space-y-3 sticky bottom-0 z-10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Pembelian</span>
              <span className="text-xl font-black text-white font-mono">
                {formatRupiah(cartTotal)}
              </span>
            </div>

            {/* Shopee Official Direct Checkout */}
            <a
              href={settings.shopeeStoreUrl || 'https://shopee.co.id/detronicsid'}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 px-4 bg-[#EE4D2D] hover:bg-[#D73211] text-white font-extrabold rounded-xl text-xs sm:text-sm transition-all shadow-md active:scale-98 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Beli di Shopee Official (detronicsid)</span>
            </a>

            <div className="flex gap-2">
              <button
                onClick={onOpenQRIS}
                className="py-2.5 px-3 bg-[#0B0F17] border border-slate-700 hover:bg-slate-800 text-slate-200 rounded-xl text-xs font-bold transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                title="Scan QRIS"
              >
                <QrCode className="w-4 h-4 text-brand-orange" />
                <span className="hidden sm:inline">QRIS</span>
              </button>

              <button
                onClick={handleCheckoutWA}
                className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl text-xs sm:text-sm transition-all shadow-md active:scale-98 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>Pesan Cepat via WhatsApp</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            
            <p className="text-[10px] text-center text-slate-500">
              Transaksi aman & bergaransi. Anda dapat checkout langsung via Shopee atau konfirmasi COD melalui CS.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
