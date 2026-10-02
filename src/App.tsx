import React, { useState, useMemo } from 'react';
import { InventoryProvider, useInventory } from './context/InventoryContext';
import { ProductCategory, Product } from './types/inventory';
import { Navbar } from './components/storefront/Navbar';
import { HeroBanner } from './components/storefront/HeroBanner';
import { CategoryFilter } from './components/storefront/CategoryFilter';
import { ConditionFilter, SortOption } from './components/storefront/ConditionFilter';
import { ProductGrid } from './components/storefront/ProductGrid';
import { Footer } from './components/storefront/Footer';

// Admin Components
import { AdminHeader } from './components/admin/AdminHeader';
import { AdminStats } from './components/admin/AdminStats';
import { InventoryTable } from './components/admin/InventoryTable';
import { StockLogTable } from './components/admin/StockLogTable';

// Modals
import { ProductDetailModal } from './components/modals/ProductDetailModal';
import { CartDrawerModal } from './components/modals/CartDrawerModal';
import { QRISModal } from './components/modals/QRISModal';
import { AdminLoginModal } from './components/modals/AdminLoginModal';
import { ProductFormModal } from './components/modals/ProductFormModal';
import { StoreSettingsModal } from './components/modals/StoreSettingsModal';
import { AboutModal } from './components/modals/AboutModal';
import { formatRupiah } from './utils/formatters';

const MainApp: React.FC = () => {
  const { products, isAdmin, settings } = useInventory();

  // Mode View (Customer vs Admin)
  const [viewMode, setViewMode] = useState<'storefront' | 'admin'>('storefront');
  const [adminTab, setAdminTab] = useState<'inventory' | 'logs'>('inventory');

  // Storefront Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('Semua');
  const [selectedCondition, setSelectedCondition] = useState<string>('ALL');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  // Modals state
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQRISOpen, setIsQRISOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Storefront Filter Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Only show published in storefront
        if (!p.isPublished) return false;

        // Search match
        const matchesSearch =
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.shortDesc && p.shortDesc.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));

        // Category match
        const matchesCategory =
          selectedCategory === 'Semua' || p.category === selectedCategory;

        // Condition match
        const matchesCondition =
          selectedCondition === 'ALL' || p.condition === selectedCondition;

        // Stock match
        const matchesStock = onlyInStock ? p.stock > 0 : true;

        return matchesSearch && matchesCategory && matchesCondition && matchesStock;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        if (sortBy === 'stock-desc') return b.stock - a.stock;
        // default newest
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [products, searchQuery, selectedCategory, selectedCondition, onlyInStock, sortBy]);

  // Handle Quick Order WA / Shopee
  const handleQuickBuyWA = (p: Product, qty = 1) => {
    if (!settings.whatsapp) {
      window.open(p.shopeeUrl || settings.shopeeStoreUrl || 'https://shopee.co.id/detronicsid', '_blank');
      return;
    }
    const text = `Halo ${settings.storeName}, saya ingin memesan:\n• *${p.name}* (SKU: ${p.sku})\n• Kondisi: ${p.condition}\n• Jumlah: ${qty} pcs\n• Harga: ${formatRupiah(p.price * qty)}\n\nApakah barang ready dan bisa COD / kirim hari ini? Terima kasih!`;
    const url = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleOpenAdmin = () => {
    if (isAdmin) {
      setViewMode('admin');
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  const handleEditProduct = (p: Product) => {
    setProductToEdit(p);
    setIsProductFormOpen(true);
  };

  const handleAddNewProduct = () => {
    setProductToEdit(null);
    setIsProductFormOpen(true);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Semua');
    setSelectedCondition('ALL');
    setOnlyInStock(false);
    setSortBy('newest');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F17] text-slate-100">
      
      {viewMode === 'admin' ? (
        /* ==================== ADMIN INVENTORY VIEW ==================== */
        <div className="flex-1 pb-16">
          <AdminHeader
            activeTab={adminTab}
            onTabChange={setAdminTab}
            onOpenAddModal={handleAddNewProduct}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onExitAdmin={() => setViewMode('storefront')}
          />

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            {/* KPI Statistics */}
            <AdminStats />

            {/* Active Tab View */}
            {adminTab === 'inventory' ? (
              <InventoryTable
                onEditProduct={handleEditProduct}
                onOpenAddModal={handleAddNewProduct}
              />
            ) : (
              <StockLogTable />
            )}
          </main>
        </div>
      ) : (
        /* ==================== STOREFRONT CUSTOMER VIEW ==================== */
        <div className="flex-1 flex flex-col">
          <Navbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onOpenCart={() => setIsCartOpen(true)}
            onOpenAdmin={handleOpenAdmin}
            onOpenQRIS={() => setIsQRISOpen(true)}
            onOpenAbout={() => setIsAboutOpen(true)}
          />

          <HeroBanner
            onOpenQRIS={() => setIsQRISOpen(true)}
            onSelectCategory={(cat) => setSelectedCategory(cat as any)}
          />

          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          <ConditionFilter
            selectedCondition={selectedCondition}
            onSelectCondition={setSelectedCondition}
            onlyInStock={onlyInStock}
            onToggleInStock={setOnlyInStock}
            sortBy={sortBy}
            onSortChange={setSortBy}
            totalFiltered={filteredProducts.length}
          />

          <main className="flex-1">
            <ProductGrid
              products={filteredProducts}
              onOpenDetail={setDetailProduct}
              onQuickBuyWA={(p) => handleQuickBuyWA(p, 1)}
              onResetFilters={handleResetFilters}
            />
          </main>

          <Footer
            onOpenAdmin={handleOpenAdmin}
            onOpenQRIS={() => setIsQRISOpen(true)}
            onOpenAbout={() => setIsAboutOpen(true)}
          />
        </div>
      )}

      {/* ==================== GLOBAL MODALS ==================== */}
      
      {/* 1. Product Detail Modal */}
      <ProductDetailModal
        product={detailProduct}
        onClose={() => setDetailProduct(null)}
        onOrderWA={(p, q) => handleQuickBuyWA(p, q)}
      />

      {/* 2. Cart Drawer Modal */}
      <CartDrawerModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onOpenQRIS={() => {
          setIsCartOpen(false);
          setIsQRISOpen(true);
        }}
      />

      {/* 3. QRIS Payment Modal */}
      <QRISModal
        isOpen={isQRISOpen}
        onClose={() => setIsQRISOpen(false)}
      />

      {/* 4. Admin PIN Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onSuccess={() => setViewMode('admin')}
      />

      {/* 5. Add / Edit Product Modal */}
      <ProductFormModal
        isOpen={isProductFormOpen}
        productToEdit={productToEdit}
        onClose={() => {
          setIsProductFormOpen(false);
          setProductToEdit(null);
        }}
      />

      {/* 6. Store Settings Modal */}
      <StoreSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      {/* 7. About Store & Official Links Modal */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

    </div>
  );
};

export function App() {
  return (
    <InventoryProvider>
      <MainApp />
    </InventoryProvider>
  );
}

export default App;
