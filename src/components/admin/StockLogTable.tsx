import React from 'react';
import { History, ArrowDownLeft, ArrowUpRight, Sliders } from 'lucide-react';
import { useInventory } from '../../context/InventoryContext';
import { formatDate } from '../../utils/formatters';

export const StockLogTable: React.FC = () => {
  const { stockLogs } = useInventory();

  const getLogTypeBadge = (type: 'in' | 'out' | 'adjust') => {
    switch (type) {
      case 'in':
        return {
          icon: <ArrowDownLeft className="w-3.5 h-3.5 text-emerald-400" />,
          label: 'Stok Masuk (+)',
          color: 'bg-emerald-950/50 text-emerald-300 border-emerald-800'
        };
      case 'out':
        return {
          icon: <ArrowUpRight className="w-3.5 h-3.5 text-rose-400" />,
          label: 'Stok Keluar (-)',
          color: 'bg-rose-950/50 text-rose-300 border-rose-800'
        };
      case 'adjust':
        return {
          icon: <Sliders className="w-3.5 h-3.5 text-sky-400" />,
          label: 'Koreksi Opname',
          color: 'bg-sky-950/50 text-sky-300 border-sky-800'
        };
    }
  };

  return (
    <div className="bg-[#151D2C] rounded-3xl border border-slate-800 shadow-md overflow-hidden">
      <div className="p-4 sm:p-5 border-b border-slate-800 bg-[#0B0F17] flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-brand-orange flex items-center justify-center text-white">
            <History className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-white">
              Riwayat Mutasi & Perubahan Stok
            </h3>
            <p className="text-xs text-slate-400">
              Catatan otomatis setiap penambahan, pengurangan, atau penyesuaian stok komponen
            </p>
          </div>
        </div>
        <span className="text-xs font-mono font-bold text-slate-400">
          {stockLogs.length} Aktivitas Tercatat
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-[#0B0F17] text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-800">
            <tr>
              <th className="py-3 px-4">Waktu & Tanggal</th>
              <th className="py-3 px-3">Komponen</th>
              <th className="py-3 px-3">Jenis Mutasi</th>
              <th className="py-3 px-3 text-center">Jumlah</th>
              <th className="py-3 px-3 text-center">Stok Awal &rarr; Akhir</th>
              <th className="py-3 px-4">Keterangan / Catatan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {stockLogs.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-slate-500">
                  Belum ada catatan mutasi stok tersimpan.
                </td>
              </tr>
            ) : (
              stockLogs.map((log) => {
                const badge = getLogTypeBadge(log.type);
                return (
                  <tr key={log.id} className="hover:bg-[#1E293B]/50 transition-colors">
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                      {formatDate(log.timestamp)}
                    </td>
                    <td className="py-3 px-3 font-bold text-white">
                      {log.productName}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${badge.color}`}>
                        {badge.icon}
                        <span>{badge.label}</span>
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center font-mono font-bold text-xs text-white">
                      {log.type === 'in' ? `+${log.quantity}` : log.type === 'out' ? `-${log.quantity}` : `${log.quantity}`} pcs
                    </td>
                    <td className="py-3 px-3 text-center font-mono text-[11px]">
                      <span className="text-slate-400">{log.prevStock}</span>
                      <span className="mx-1 text-slate-500">&rarr;</span>
                      <span className="font-bold text-white">{log.newStock} pcs</span>
                    </td>
                    <td className="py-3 px-4 text-slate-400 italic">
                      {log.notes || '-'}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};
