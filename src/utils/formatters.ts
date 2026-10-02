import { ProductCondition } from '../types/inventory';

export const formatRupiah = (value: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  } catch {
    return dateString;
  }
};

export const getConditionStyle = (condition: ProductCondition) => {
  switch (condition) {
    case 'Baru (New)':
      return {
        bg: 'bg-emerald-950/70',
        text: 'text-emerald-300',
        border: 'border-emerald-800',
        dot: 'bg-emerald-400',
        label: 'Baru (New)'
      };
    case 'Bekas Mulus (Grade A)':
      return {
        bg: 'bg-sky-950/70',
        text: 'text-sky-300',
        border: 'border-sky-800',
        dot: 'bg-sky-400',
        label: 'Bekas Grade A'
      };
    case 'Cabutan Tested':
      return {
        bg: 'bg-purple-950/70',
        text: 'text-purple-300',
        border: 'border-purple-800',
        dot: 'bg-purple-400',
        label: 'Cabutan Tested'
      };
    case 'DIY Kit':
      return {
        bg: 'bg-amber-950/70',
        text: 'text-amber-300',
        border: 'border-amber-800',
        dot: 'bg-amber-400',
        label: 'DIY Kit'
      };
    default:
      return {
        bg: 'bg-slate-900/70',
        text: 'text-slate-300',
        border: 'border-slate-700',
        dot: 'bg-slate-400',
        label: condition
      };
  }
};

export const getStockStatus = (stock: number, minStock = 5) => {
  if (stock <= 0) {
    return {
      status: 'out',
      label: 'Stok Habis',
      color: 'text-rose-300 bg-rose-950/60 border-rose-800',
      badge: 'bg-rose-500',
      canBuy: false
    };
  }
  if (stock <= minStock) {
    return {
      status: 'low',
      label: `Sisa ${stock} pcs`,
      color: 'text-amber-300 bg-amber-950/60 border-amber-800',
      badge: 'bg-amber-400',
      canBuy: true
    };
  }
  return {
    status: 'ready',
    label: `Ready ${stock} pcs`,
    color: 'text-emerald-300 bg-emerald-950/60 border-emerald-800',
    badge: 'bg-emerald-400',
    canBuy: true
  };
};
