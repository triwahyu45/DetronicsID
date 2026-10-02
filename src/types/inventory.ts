export type ProductCategory =
  | 'Semua'
  | 'Microcontroller'
  | 'Sensor'
  | 'Motor & Driver'
  | 'Display & Opto'
  | 'Wireless & IoT'
  | 'Komponen Pasif & Aktif'
  | 'Power & Battery'
  | 'Kabel & Header'
  | 'Tools & Mekanik';

export type ProductCondition =
  | 'Baru (New)'
  | 'Bekas Mulus (Grade A)'
  | 'Cabutan Tested'
  | 'DIY Kit';

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: Exclude<ProductCategory, 'Semua'>;
  condition: ProductCondition;
  price: number;        // Harga jual (Rp)
  costPrice: number;    // Harga modal/HPP (Rp) untuk admin
  stock: number;        // Jumlah fisik saat ini
  minStock: number;     // Batas peringatan stok menipis
  location: string;     // Lokasi rak / bin fisik, misal "Rak A-01 / Box 3"
  image: string;        // Path gambar atau URL
  shortDesc: string;    // Ringkasan 1-2 kalimat
  description: string;  // Deskripsi lengkap kegunaan & kondisi barang
  conditionNotes?: string; // Catatan khusus kondisi (misal: "Tested normal, pin sudah disolder header")
  specs: {
    label: string;
    value: string;
  }[];
  pinoutNotes?: string;
  datasheetUrl?: string;
  shopeeUrl?: string;   // Direct link to purchase on Shopee DetronicsID
  isPublished: boolean; // Tampil di katalog publik
  soldCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface StockLog {
  id: string;
  productId: string;
  productName: string;
  type: 'in' | 'out' | 'adjust';
  quantity: number;
  prevStock: number;
  newStock: number;
  notes: string;
  timestamp: string;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  whatsapp: string;
  shopeeStoreUrl: string; // Tautan toko resmi Shopee DetronicsID
  address: string;
  city: string;
  province: string;
  postalCode: string;
  operatingHours: string;
  adminPin: string;
  qrisImage: string;
  bankAccount: string;
  notes: string;
}

export interface OrderCustomer {
  name: string;
  phone: string;
  deliveryMethod: 'COD UNY/UGM' | 'Ambil di Toko (Samirono)' | 'Kurir Instant (GoSend/Grab)' | 'JNE / J&T / SiCepat';
  address: string;
  paymentMethod: 'QRIS' | 'Transfer Bank' | 'Tunai / COD';
  notes: string;
}
