import React from 'react';
import { useApp } from '../../../context/AppContext';
import KPICard from '../../common/KPICard';
import Badge from '../../common/Badge';
import {
  Boxes,
  AlertTriangle,
  Clock,
  ShieldAlert,
  ArrowDownToLine,
  ArrowLeftRight,
  Warehouse,
  CheckCircle2,
  FileCheck2
} from 'lucide-react';

export default function WarehouseManagerDashboard() {
  const { batches, openModal, showToast } = useApp();

  const quarantinedBatches = batches.filter(b => b.qualityStatus === 'Quarantined');
  const nearExpiryBatches = batches.filter(b => {
    const exp = new Date(b.expiryDate).getTime();
    const now = Date.now();
    const diffDays = Math.ceil((exp - now) / (1000 * 60 * 60 * 24));
    return diffDays <= 90 && diffDays > 0;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E3E8DF]">
        <div>
          <h1 className="text-xl font-bold text-[#17372F]">Warehouse & Chemical Inventory Hub</h1>
          <p className="text-xs text-[#7A8980] mt-0.5">
            Real-time stock valuation, lot genealogy, FEFO allocation priorities, quality quarantine holds, and storage segregation.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast('Opening Stock Transfer Inter-Hub form', 'info')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-[#E3E8DF] hover:bg-[#F7F5EC] text-[#17372F] transition-colors"
          >
            <ArrowLeftRight className="w-3.5 h-3.5 text-[#7A8980]" />
            <span>Inter-Warehouse Transfer</span>
          </button>
          <button
            onClick={() => openModal('create_grn')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#075C46] text-white hover:bg-[#063F32] transition-colors"
          >
            <ArrowDownToLine className="w-3.5 h-3.5 text-[#C6A66A]" />
            <span>Receive Stock (GRN)</span>
          </button>
        </div>
      </div>

      {/* KPI Cards (Section 5.6) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Stock Valuation"
          value="₹ 1.84 Cr"
          subvalue="8 Chemical Commodities"
          icon={Boxes}
          accent={true}
        />
        <KPICard
          title="Low Stock Reorders"
          value="2 Chemicals"
          subvalue="IPA & TiO2 Below Par"
          icon={AlertTriangle}
          badgeText="Procurement Alert"
        />
        <KPICard
          title="Near Expiry Batches (<90d)"
          value={`${nearExpiryBatches.length} Batch`}
          subvalue="BAT-2026-IP-04 (IPA)"
          icon={Clock}
          badgeText="FEFO Priority #1"
        />
        <KPICard
          title="Quarantined / Hold Stock"
          value={`${quarantinedBatches.length} Batch`}
          subvalue="10 MT Titanium Dioxide"
          icon={ShieldAlert}
          badgeText="Non-Saleable"
        />
      </div>

      {/* Batch Register & FEFO Matrix */}
      <div className="bg-white rounded-xl border border-[#E3E8DF] p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E3E8DF]">
          <div>
            <h2 className="text-sm font-bold text-[#17372F]">Active Batch & Lot Register (FEFO Priority)</h2>
            <p className="text-xs text-[#7A8980] mt-0.5">
              Stock Rule: Quarantined batches are locked from allocation. Sales orders auto-allocate lowest shelf-life first.
            </p>
          </div>
          <span className="text-xs text-[#075C46] bg-[#DDE9D9] px-2.5 py-1 rounded-full font-semibold border border-[#C6A66A]/40">
            First-Expiry First-Out Enforced
          </span>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-[#F7F5EC] border-b border-[#E3E8DF] text-slate-600 font-semibold uppercase">
                <th className="py-2.5 px-3">Batch / Lot No</th>
                <th className="py-2.5 px-3">Chemical Commodity</th>
                <th className="py-2.5 px-3">Warehouse & Bay</th>
                <th className="py-2.5 px-3">Expiry Date</th>
                <th className="py-2.5 px-3">Physical Qty</th>
                <th className="py-2.5 px-3">Available</th>
                <th className="py-2.5 px-3">Reserved</th>
                <th className="py-2.5 px-3">Quality Status</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3E8DF]">
              {batches.map((batch) => {
                const isQuarantined = batch.qualityStatus === 'Quarantined';
                return (
                  <tr key={batch.batchNo} className={isQuarantined ? 'bg-red-50/40' : 'hover:bg-[#F7F5EC]'}>
                    <td className="py-3 px-3">
                      <div className="font-bold text-[#17372F] font-mono">{batch.batchNo}</div>
                      <div className="text-[10px] text-slate-500">Recvd: {batch.receivedDate}</div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-semibold text-[#17372F]">{batch.chemicalName}</div>
                      <div className="text-[10px] text-slate-500 font-mono">Mfg: {batch.mfgDate}</div>
                    </td>
                    <td className="py-3 px-3 text-slate-700">
                      <div className="flex items-center gap-1">
                        <Warehouse className="w-3 h-3 text-[#C6A66A]" />
                        <span>{batch.warehouse}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-mono font-medium">
                      {batch.expiryDate}
                      {batch.feFoPriority === 1 && (
                        <span className="block text-[10px] text-amber-700 font-bold">FEFO 1st Pick</span>
                      )}
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-[#17372F]">
                      {batch.initialQty} {batch.uom}
                    </td>
                    <td className="py-3 px-3 font-mono font-semibold text-[#0F795C]">
                      {batch.availableQty} {batch.uom}
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-600">
                      {batch.reservedQty} {batch.uom}
                    </td>
                    <td className="py-3 px-3">
                      <Badge status={batch.qualityStatus} size="xs" />
                    </td>
                    <td className="py-3 px-3 text-right">
                      {isQuarantined ? (
                        <button
                          onClick={() => openModal('quarantine_review', batch)}
                          className="px-2.5 py-1 bg-[#B7791F] text-white rounded text-xs font-semibold hover:bg-amber-700"
                        >
                          Review QC
                        </button>
                      ) : (
                        <button
                          onClick={() => openModal('view_coa', batch)}
                          className="px-2 py-1 border border-[#E3E8DF] rounded-lg text-xs font-semibold hover:bg-white text-slate-700 shadow-2xs active:scale-95 transition-all"
                          title="View Certified COA Document"
                        >
                          COA Doc
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

