# Detronics ID — Toko & Sistem Manajemen Inventaris Komponen Elektronik & Robotika

> **Platform Web Katalog E-Commerce & Sistem Manajemen Inventaris Toko Fisik Real-Time untuk Detronics ID (Yogyakarta)**  
> Terinspirasi dari standar katalog terpercaya *Jogja Robotika* & *Toko Beetrona*, dirancang khusus dengan transparansi kondisi fisik komponen (Baru, Bekas Mulus, Cabutan Tested), pencatatan lokasi rak fisik, serta integrasi pemesanan langsung via WhatsApp & QRIS.

🌐 **Web Katalog Resmi**: [https://triwahyu45.github.io/DetronicsID/](https://triwahyu45.github.io/DetronicsID/)  
📦 **GitHub Repository**: [https://github.com/triwahyu45/DetronicsID](https://github.com/triwahyu45/DetronicsID)  
📸 **Instagram**: [@detronics.id](https://www.instagram.com/detronics.id/)  
🛍️ **Shopee Official Store**: [https://shopee.co.id/detronicsid](https://shopee.co.id/detronicsid)  
👨‍💻 **Founder**: [Tri Wahyu Handoyo (Portofolio)](https://triwahyu45.github.io/Portofolio/)

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-3178C6.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0.7-646CFF.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.17-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🌟 Fitur Utama

### 1. 🛍️ Katalog Toko Publik (Customer Storefront)
- **Kategori Komponen Lengkap**: Microcontroller (ESP32, STM32, Arduino, Raspberry Pi Pico), Sensor, Driver Motor, Display OLED/LCD, Wireless & IoT, Komponen Pasif/Aktif, Baterai & Power Supply, Kabel & Header, serta Tools & Mekanik.
- **Pencarian Cepat & Filter Multifaset**:
  - Pencarian instan berdasarkan nama komponen, SKU, maupun deskripsi teknis.
  - Filter berdasarkan **Kondisi Fisik**: *Baru (New)*, *Bekas Mulus (Grade A)*, *Cabutan Tested*, dan *DIY Kit*.
  - Filter ketersediaan stok (*Hanya Ready Stock*).
  - Pengurutan dinamis (*Terbaru*, *Harga Terendah/Tertinggi*, *Nama A-Z*, *Stok Terbanyak*).
- **Detail Spesifikasi & Pinout Interaktif**:
  - Tabel parameter teknis (Tegangan kerja, Interface I2C/SPI, Clock speed, Dimensi).
  - Catatan kondisi uji kelayakan (*QC Tested*).
  - Panduan wiring / catatan pinout.
  - Link langsung ke datasheet PDF resmi pabrikan.
- **Keranjang Belanja & WhatsApp Checkout Generator**:
  - Pemilihan opsi pengambilan: **COD Area Kampus UNY/UGM**, **Ambil di Toko (Samirono)**, **Kurir Instant (GoSend/Grab)**, atau **Ekspedisi (JNE/J&T)**.
  - Pemilihan metode pembayaran: **QRIS**, **Transfer Bank (BCA/Mandiri)**, atau **Tunai COD**.
  - Menyusun format pesan WhatsApp otomatis yang rapi dan terstruktur dalam 1x klik.
- **Tampilan QRIS Resmi**:
  - Menampilkan QRIS resmi Detronics ID yang mendukung seluruh aplikasi e-wallet & mobile banking.

---

### 2. 📦 Panel Inventaris Khusus Admin (Admin Dashboard)
- **Keamanan Terproteksi PIN**: Masuk ke panel manajemen menggunakan PIN keamanan (PIN default awal: `1234`, dapat diubah di menu Pengaturan).
- **Statistik & KPI Inventaris Real-Time**:
  - Total varian SKU aktif di toko.
  - Total unit fisik seluruh komponen.
  - Estimasi Nilai Modal Aset (HPP / Harga Pokok Penjualan).
  - Estimasi Nilai Jual Retail & Proyeksi Laba Bersih.
  - Peringatan dini: **Stok Menipis** (`stok <= batas minimum`) dan **Stok Habis** (`stok = 0`).
- **Tabel Inventaris Interaktif & Stepper Stok Cepat**:
  - Penambahan & pengurangan stok fisik langsung dari tabel (`+1` / `-1` / input manual) dengan pencatatan mutasi otomatis.
  - Pencatatan **Lokasi Rak / Kotak Fisik** di toko (contoh: *Rak A-01 / Bin 2*) untuk mempermudah pencarian barang fisik di gudang/etalase toko.
  - Switch visibilitas produk (*Publik / Draft*).
- **Formulir Tambah / Edit Komponen Komprehensif**:
  - Auto-generate SKU berbasis kategori (contoh: `DT-MCU-782`, `DT-SNS-419`).
  - Input harga jual dan harga modal HPP.
  - Penambahan parameter spesifikasi dinamis tanpa batas (*key-value*).
  - Preset foto komponen cepat.
- **Log Mutasi Stok Otomatis (Stock Movement History)**:
  - Mencatat setiap histori penambahan stok (restock), pengurangan stok (terjual), dan koreksi stok opname beserta tanggal, jam, dan catatannya.
- **Pencadangan & Pemulihan Data (Zero Data Loss)**:
  - **Export Data ke JSON**: Unduh seluruh database inventaris, stok, dan pengaturan toko ke file JSON lokal dalam 1 klik.
  - **Import / Restore Data dari JSON**: Pulihkan kembali data saat berpindah perangkat atau browser.
  - **Reset ke Default Catalog**: Mengembalikan data contoh awal kapan pun dibutuhkan.

---

## 🎨 Palet Identitas Merek (Brand Identity)

Mengacu pada skema resmi *DetronicsID Brand Schemes*:
- **Primary Industrial Navy**: `#133B4E` (Latar header, aksen utama, representasi presisi teknik & ketegasan mekatronika)
- **Accent Mechatronics Orange**: `#F9831F` (Tombol aksi, sorotan stok, representasi energi elektronika & robotika)
- **Clean Surface Canvas**: `#F8FAFC` & `#FFFFFF` (Kenyamanan membaca datasheet dan navigasi katalog)
- **Tipografi**: `Plus Jakarta Sans` (UI/UX modern) dipadukan dengan `Fira Code` (SKU, harga, dan parameter teknis).

---

## 🚀 Cara Menjalankan Secara Lokal

### Prasyarat
- [Node.js](https://nodejs.org/) versi 18 atau lebih baru.
- npm / yarn / pnpm.

### Langkah Instalasi
1. Buka terminal pada folder proyek:
   ```bash
   cd "D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\Detronics"
   ```

2. Jalankan server pengembang lokal:
   ```bash
   npm run dev
   ```
   Buka peramban pada alamat `http://localhost:3000` (atau port yang ditampilkan).

3. Membangun versi produksi (*Production Build*):
   ```bash
   npm run build
   ```
   Hasil build murni statis siap saji akan berada di folder `dist/`.

---

## 🌐 Deploy ke GitHub Pages / Hosting Statis

Proyek ini dibangun menggunakan Vite dengan base path relatif (`./`), sehingga dapat di-hosting secara instan di:
- **GitHub Pages**: Cukup upload branch atau hasil `dist/` ke GitHub Pages repository `https://github.com/triwahyu45/DetronicsID`.
- **Vercel / Netlify**: Hubungkan repository dan gunakan preset `Vite` (Build command: `npm run build`, Output directory: `dist`).

---

## 📍 Informasi Toko Fisik

- **Nama Toko**: Detronics ID (Mechatronics Store)
- **Alamat**: Jl. Samirono CT VI No. 152, RT.08/RW.03, Samirono, Caturtunggal, Depok, Sleman, D.I. Yogyakarta 55281
- **Area Layanan**: COD Area Kampus UNY & UGM, Pengiriman Instant GoSend/Grab, serta Ekspedisi Seluruh Indonesia
- **Kontak WhatsApp**: +62 896-4455-9175 (Tri Wahyu Handoyo)
- **Metode Pembayaran**: QRIS (Semua E-Wallet), Transfer Bank BCA / Mandiri, Tunai COD

---

## 📄 Lisensi
Hak Cipta © 2026 **Detronics ID**. Dikembangkan oleh **Tri Wahyu Handoyo** (Pendidikan Teknik Mekatronika UNY).
