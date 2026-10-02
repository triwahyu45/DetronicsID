import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, StockLog, StoreSettings } from '../types/inventory';
import { DEFAULT_PRODUCTS, DEFAULT_STORE_SETTINGS } from '../data/defaultProducts';

interface InventoryContextType {
  products: Product[];
  stockLogs: StockLog[];
  settings: StoreSettings;
  cart: CartItem[];
  isAdmin: boolean;
  
  // Product CRUD
  addProduct: (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'soldCount'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  quickUpdateStock: (id: string, delta: number, notes?: string) => void;
  setStockAmount: (id: string, newStock: number, notes?: string) => void;

  // Cart Management
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemCount: number;

  // Store Settings
  updateSettings: (updates: Partial<StoreSettings>) => void;

  // Admin Auth
  loginAdmin: (pin: string) => boolean;
  logoutAdmin: () => void;

  // Backup & Reset
  exportDataToJson: () => string;
  importDataFromJson: (jsonStr: string) => boolean;
  resetToDefaultData: () => void;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'detronics_products_v1',
  SETTINGS: 'detronics_settings_v1',
  LOGS: 'detronics_stocklogs_v1',
  CART: 'detronics_cart_v1',
  ADMIN_SESSION: 'detronics_admin_session_v1',
};

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Initialize Products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load products from storage:', e);
    }
    return DEFAULT_PRODUCTS;
  });

  // 2. Initialize Settings
  const [settings, setSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load settings from storage:', e);
    }
    return DEFAULT_STORE_SETTINGS;
  });

  // 3. Initialize Stock Logs
  const [stockLogs, setStockLogs] = useState<StockLog[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LOGS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load stock logs:', e);
    }
    return [
      {
        id: 'log-init-1',
        productId: 'dt-esp32-wroom-30p',
        productName: 'ESP32 NodeMCU DevKit V1 30-Pin CP2102',
        type: 'in',
        quantity: 24,
        prevStock: 0,
        newStock: 24,
        notes: 'Inisialisasi stok awal toko',
        timestamp: new Date().toISOString(),
      }
    ];
  });

  // 4. Initialize Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load cart:', e);
    }
    return [];
  });

  // 5. Admin Authentication
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return sessionStorage.getItem(STORAGE_KEYS.ADMIN_SESSION) === 'true';
  });

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(stockLogs));
  }, [stockLogs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  // Product CRUD
  const addProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'soldCount'>): Product => {
    const now = new Date().toISOString();
    const newProduct: Product = {
      ...productData,
      id: 'dt-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6),
      soldCount: 0,
      createdAt: now,
      updatedAt: now,
    };

    setProducts(prev => [newProduct, ...prev]);

    // Log the initial stock
    if (newProduct.stock > 0) {
      const log: StockLog = {
        id: 'log-' + Date.now(),
        productId: newProduct.id,
        productName: newProduct.name,
        type: 'in',
        quantity: newProduct.stock,
        prevStock: 0,
        newStock: newProduct.stock,
        notes: 'Penambahan produk baru ke inventaris',
        timestamp: now,
      };
      setStockLogs(prev => [log, ...prev]);
    }

    return newProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(p => {
        if (p.id !== id) return p;
        const updated = {
          ...p,
          ...updates,
          updatedAt: new Date().toISOString(),
        };

        // If stock changed directly via edit form, log it
        if (updates.stock !== undefined && updates.stock !== p.stock) {
          const delta = updates.stock - p.stock;
          const log: StockLog = {
            id: 'log-' + Date.now(),
            productId: p.id,
            productName: p.name,
            type: delta > 0 ? 'in' : 'out',
            quantity: Math.abs(delta),
            prevStock: p.stock,
            newStock: updates.stock,
            notes: 'Pembaruan formulir inventaris',
            timestamp: new Date().toISOString(),
          };
          setStockLogs(l => [log, ...l]);
        }

        return updated;
      })
    );
  };

  const deleteProduct = (id: string) => {
    const target = products.find(p => p.id === id);
    if (!target) return;

    setProducts(prev => prev.filter(p => p.id !== id));
    setCart(prev => prev.filter(item => item.product.id !== id));

    const log: StockLog = {
      id: 'log-' + Date.now(),
      productId: id,
      productName: target.name,
      type: 'adjust',
      quantity: target.stock,
      prevStock: target.stock,
      newStock: 0,
      notes: 'Penghapusan produk dari inventaris',
      timestamp: new Date().toISOString(),
    };
    setStockLogs(prev => [log, ...prev]);
  };

  const quickUpdateStock = (id: string, delta: number, notes?: string) => {
    setProducts(prev =>
      prev.map(p => {
        if (p.id !== id) return p;
        const newStock = Math.max(0, p.stock + delta);
        if (newStock === p.stock) return p;

        const log: StockLog = {
          id: 'log-' + Date.now() + '-' + Math.random().toString(36).substring(2, 5),
          productId: p.id,
          productName: p.name,
          type: delta > 0 ? 'in' : 'out',
          quantity: Math.abs(delta),
          prevStock: p.stock,
          newStock,
          notes: notes || (delta > 0 ? 'Restock cepat (+)' : 'Pengurangan stok cepat (-)'),
          timestamp: new Date().toISOString(),
        };
        setStockLogs(l => [log, ...l]);

        return {
          ...p,
          stock: newStock,
          updatedAt: new Date().toISOString(),
        };
      })
    );
  };

  const setStockAmount = (id: string, newStock: number, notes?: string) => {
    setProducts(prev =>
      prev.map(p => {
        if (p.id !== id) return p;
        const targetStock = Math.max(0, newStock);
        if (targetStock === p.stock) return p;

        const log: StockLog = {
          id: 'log-' + Date.now(),
          productId: p.id,
          productName: p.name,
          type: 'adjust',
          quantity: Math.abs(targetStock - p.stock),
          prevStock: p.stock,
          newStock: targetStock,
          notes: notes || 'Stock opname / penyesuaian manual',
          timestamp: new Date().toISOString(),
        };
        setStockLogs(l => [log, ...l]);

        return {
          ...p,
          stock: targetStock,
          updatedAt: new Date().toISOString(),
        };
      })
    );
  };

  // Cart
  const addToCart = (product: Product, quantity = 1) => {
    if (product.stock <= 0) return;

    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        const newQty = Math.min(product.stock, existing.quantity + quantity);
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: newQty } : item
        );
      }
      return [...prev, { product, quantity: Math.min(product.stock, quantity) }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prev =>
      prev.map(item => {
        if (item.product.id !== productId) return item;
        const maxStock = item.product.stock;
        return {
          ...item,
          quantity: Math.min(quantity, maxStock),
        };
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Settings
  const updateSettings = (updates: Partial<StoreSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  // Admin Auth
  const loginAdmin = (pin: string): boolean => {
    if (pin.trim() === settings.adminPin.trim()) {
      setIsAdmin(true);
      sessionStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    sessionStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
  };

  // Backup & Restore
  const exportDataToJson = (): string => {
    const backupData = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      storeName: settings.storeName,
      products,
      stockLogs,
      settings,
    };
    return JSON.stringify(backupData, null, 2);
  };

  const importDataFromJson = (jsonStr: string): boolean => {
    try {
      const data = JSON.parse(jsonStr);
      if (data && Array.isArray(data.products)) {
        setProducts(data.products);
        if (Array.isArray(data.stockLogs)) {
          setStockLogs(data.stockLogs);
        }
        if (data.settings && typeof data.settings === 'object') {
          setSettings(prev => ({ ...prev, ...data.settings }));
        }
        return true;
      }
    } catch (e) {
      console.error('Import failed:', e);
    }
    return false;
  };

  const resetToDefaultData = () => {
    setProducts(DEFAULT_PRODUCTS);
    setSettings(DEFAULT_STORE_SETTINGS);
    setStockLogs([]);
    setCart([]);
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.LOGS);
    localStorage.removeItem(STORAGE_KEYS.CART);
  };

  return (
    <InventoryContext.Provider
      value={{
        products,
        stockLogs,
        settings,
        cart,
        isAdmin,
        addProduct,
        updateProduct,
        deleteProduct,
        quickUpdateStock,
        setStockAmount,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartItemCount,
        updateSettings,
        loginAdmin,
        logoutAdmin,
        exportDataToJson,
        importDataFromJson,
        resetToDefaultData,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};
