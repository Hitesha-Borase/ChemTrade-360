import React from 'react';
import { useApp } from '../../../context/AppContext';
import KPICard from '../../common/KPICard';
import Badge from '../../common/Badge';
import { SUPPLIER_QUOTE_COMPARISONS } from '../../../data/mockData';
import {
  FileText,
  PackagePlus,
  Truck,
  TrendingDown,
  CheckCircle2,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

export default function PurchaseManagerDashboard() {
  const { purchaseOrders, suppliers, openModal, setActiveNav, showToast } = useApp();

  const comparison = SUPPLIER_QUOTE_COMPARISONS[0];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E4E7EC]">
        <div>
          <h1 className="text-xl font-bold text-[#101828]">Procurement & Sourcing Operations</h1>
          <p className="text-xs text-[#667085] mt-0.5">
            Supplier RFQs, quote comparisons, landed cost optimization, purchase orders, and goods receipt coordination.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast('Opening Supplier RFQ builder', 'info')}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#101828] text-white hover:bg-[#101828]/90 transition-colors"
          >
            + Create Supplier RFQ
          </button>
        </div>
      </div>

      {/* KPI Cards (Section 5.5) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Active Supplier RFQs"
          value="2 Open"
          subvalue="CSL & IPA Sourcing"
          icon={FileText}
          accent={true}
        />
        <KPICard
          title="Active Purchase Orders"
          value={purchaseOrders.length.toString()}
          subvalue="₹49.4 L Order Value"
          icon={PackagePlus}
          badgeText="In Fulfillment"
        />
        <KPICard
          title="Expected Receipts (GRN)"
          value="1 Shipment Due"
          subvalue="40 MT Caustic Soda Lye"
          icon={Truck}
          badgeText="Due at Dahej"
        />
        <KPICard
          title="Reorder Alerts"
          value="2 Thresholds"
          subvalue="IPA & TiO2 Stock Low"
          icon={AlertTriangle}
          badgeText="Action Needed"
        />
      </div>

      {/* Supplier Quote Comparison Matrix (Wireframe 5.5 & 7.2) */}
      <div className="bg-white rounded-xl border border-[#E4E7EC] p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E4E7EC]">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-[#101828]">Supplier Quote Comparison Matrix</h2>
              <span className="text-xs font-mono font-semibold text-[#8C6F3B] bg-[#FAF7F0] px-2 py-0.5 rounded border border-[#C6A66B]/40">
                {comparison.rfqId}
              </span>
            </div>
            <p className="text-xs text-[#667085] mt-0.5">
              Target Commodity: <strong>{comparison.chemical}</strong> ({comparison.requiredQty} {comparison.uom}) to {comparison.deliveryLocation}
            </p>
          </div>
          <span className="text-xs text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full font-semibold border border-emerald-200">
            Landed Cost Evaluated
          </span>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-[#FAF9F6] border-b border-[#E4E7EC] text-slate-600 font-semibold uppercase">
                <th className="py-2.5 px-3">Supplier Name</th>
                <th className="py-2.5 px-3">Base Ex-Plant Rate</th>
                <th className="py-2.5 px-3">Freight to Dahej</th>
                <th className="py-2.5 px-3">Total Landed Cost</th>
                <th className="py-2.5 px-3">Payment Terms</th>
                <th className="py-2.5 px-3">Lead Time</th>
                <th className="py-2.5 px-3">QC Score</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E7EC]">
              {comparison.quotes.map((quote, idx) => (
                <tr key={idx} className={quote.recommended ? 'bg-[#FAF7F0]/60' : 'hover:bg-[#FAF9F6]'}>
                  <td className="py-3 px-3">
                    <div className="font-bold text-[#101828] flex items-center gap-1.5">
                      <span>{quote.supplierName}</span>
                      {quote.recommended && (
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">
                          Recommended
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-500 mt-0.5">{quote.notes}</p>
                  </td>
                  <td className="py-3 px-3 font-mono font-semibold">₹{quote.baseRate.toLocaleString('en-IN')}/MT</td>
                  <td className="py-3 px-3 font-mono text-slate-600">₹{quote.freightRate}/MT</td>
                  <td className="py-3 px-3 font-mono font-bold text-[#101828] text-sm">
                    ₹{quote.totalLandedCost.toLocaleString('en-IN')}/MT
                  </td>
                  <td className="py-3 px-3">{quote.creditDays} Days Credit</td>
                  <td className="py-3 px-3 font-medium">{quote.deliveryLeadDays} Days</td>
                  <td className="py-3 px-3">
                    <span className="font-semibold text-emerald-700">{quote.qualityScore}%</span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => showToast(`Generated PO draft for ${quote.supplierName}`, 'success')}
                      className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                        quote.recommended
                          ? 'bg-[#101828] text-white hover:bg-[#101828]/90'
                          : 'border border-[#E4E7EC] text-slate-700 hover:bg-white'
                      }`}
                    >
                      Issue PO
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Active Purchase Orders List */}
      <div className="bg-white rounded-xl border border-[#E4E7EC] p-5 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-[#E4E7EC]">
          <h2 className="text-sm font-bold text-[#101828]">Active Purchase Orders & Expected GRN</h2>
          <button onClick={() => setActiveNav('procurement')} className="text-xs text-[#C6A66B] font-semibold hover:underline flex items-center gap-1">
            All POs <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-[#E4E7EC] mt-3">
          {purchaseOrders.map((po) => (
            <div key={po.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#101828]">{po.id}</span>
                  <span className="text-slate-600">• {po.supplierName}</span>
                  <Badge status={po.status} size="xs" />
                </div>
                <p className="text-slate-600 mt-1">
                  Value: <strong>₹{po.totalAmount.toLocaleString('en-IN')}</strong> | Delivery Due: <span className="font-semibold">{po.deliveryDueDate}</span>
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">Destination: {po.destinationWarehouse}</p>
              </div>

              <div className="flex items-center gap-2">
                {po.status === 'Partially Received' && (
                  <span className="text-[11px] font-mono bg-blue-50 text-blue-800 px-2 py-0.5 rounded border border-blue-200">
                    GRN Linked: {po.grnRef}
                  </span>
                )}
                <button
                  onClick={() => showToast(`Inspecting PO ${po.id}`, 'info')}
                  className="px-2.5 py-1 border border-[#E4E7EC] rounded hover:bg-[#FAF9F6] text-xs font-medium"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

