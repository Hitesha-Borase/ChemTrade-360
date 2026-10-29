import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import KPICard from '../common/KPICard';
import Badge from '../common/Badge';
import {
  FileText,
  PackagePlus,
  Truck,
  UploadCloud,
  CheckCircle2,
  Clock,
  ArrowRight,
  Send
} from 'lucide-react';

export default function SupplierPortal() {
  const { purchaseOrders, showToast } = useApp();
  const [quoteSubmitOpen, setQuoteSubmitOpen] = useState(false);
  const [offeredRate, setOfferedRate] = useState('31200');
  const [creditDays, setCreditDays] = useState('15');

  // Active supplier perspective: GACL (Gujarat Alkalies & Chemicals Ltd)
  const supplierName = 'Gujarat Alkalies & Chemicals Ltd (GACL)';
  const supplierPos = purchaseOrders.filter(po => po.supplierName.includes('GACL'));

  const handleSendQuote = (e) => {
    e.preventDefault();
    setQuoteSubmitOpen(false);
    showToast(`Quotation submitted: ₹${Number(offeredRate).toLocaleString('en-IN')}/MT with ${creditDays} days credit. Sent to ChemTrade Sourcing Desk!`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Supplier Banner */}
      <div className="bg-gradient-to-r from-[#101828] via-[#1a2942] to-[#101828] rounded-2xl p-6 text-white border border-[#C6A66A]/30 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-[#C6A66A]/20 text-[#C6A66A] px-2.5 py-0.5 rounded-full font-bold border border-[#C6A66A]/30">
                Supplier Extranet Portal
              </span>
              <span className="text-xs text-slate-400">Vendor Code: SUPP-001 (Chlor-Alkali)</span>
            </div>
            <h1 className="text-2xl font-bold mt-1 text-white">{supplierName}</h1>
            <p className="text-xs text-slate-300 mt-1">
              Respond to published ChemTrade 360 sourcing RFQs, manage confirmed Purchase Orders, update tanker dispatch dispatches, and upload batch COA test certificates.
            </p>
          </div>
          <button
            onClick={() => setQuoteSubmitOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#C6A66A] hover:bg-[#B08E4F] text-[#17372F] text-xs font-bold rounded-xl transition-all shadow-md self-start md:self-auto"
          >
            <Send className="w-4 h-4" />
            <span>Submit Sourcing Offer</span>
          </button>
        </div>
      </div>

      {/* KPI Cards (Section 5.10) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Assigned Sourcing RFQs"
          value="1 Open"
          subvalue="Caustic Soda Lye 100 MT"
          icon={FileText}
          accent={true}
        />
        <KPICard
          title="Quotes Submitted"
          value="2 Active"
          subvalue="Under Evaluation"
          icon={Send}
          badgeText="Landed Cost Bid"
        />
        <KPICard
          title="Active Purchase Orders"
          value={supplierPos.length.toString()}
          subvalue="₹31.2 L Order Value"
          icon={PackagePlus}
          badgeText="Supplying"
        />
        <KPICard
          title="Goods Received (GRN)"
          value="60 MT Accepted"
          subvalue="40 MT Pending"
          icon={CheckCircle2}
          badgeText="GRN Verified"
        />
      </div>

      {/* Assigned Sourcing RFQs */}
      <div className="bg-white rounded-xl border border-[#E3E8DF] p-5 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-[#E3E8DF]">
          <div>
            <h2 className="text-sm font-bold text-[#17372F]">Assigned Sourcing RFQs Requiring Response</h2>
            <p className="text-xs text-[#7A8980]">Strict Privacy: Your submitted prices are strictly sealed and confidential.</p>
          </div>
          <span className="text-xs text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full font-semibold border border-amber-200">
            Due in 2 Days
          </span>
        </div>

        <div className="mt-4 p-4 rounded-xl bg-[#F7F5EC] border border-[#E3E8DF] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-[#17372F]">RFQ-PR-2026-092</span>
              <Badge status="Active Sourcing" size="xs" />
            </div>
            <p className="text-xs text-slate-700">
              Required: <strong>Caustic Soda Lye (48% Rayon Grade)</strong> • Quantity: <strong>100 MT</strong>
            </p>
            <p className="text-[11px] text-slate-500">
              Delivery Location: <strong>ChemTrade Dahej Liquid Terminal Tanks</strong> • Lead Time: Within 5 Days
            </p>
          </div>

          <button
            onClick={() => setQuoteSubmitOpen(true)}
            className="px-4 py-2 bg-[#075C46] text-white text-xs font-bold rounded-lg hover:bg-[#063F32] transition-colors self-start md:self-auto"
          >
            Submit Commercial Quotation
          </button>
        </div>
      </div>

      {/* Active Confirmed Purchase Orders */}
      <div className="bg-white rounded-xl border border-[#E3E8DF] p-5 shadow-sm">
        <h2 className="text-sm font-bold text-[#17372F] pb-3 border-b border-[#E3E8DF]">
          Active Purchase Orders & Inbound GRN Status
        </h2>

        <div className="divide-y divide-[#E3E8DF] mt-3">
          {supplierPos.map(po => (
            <div key={po.id} className="py-3.5 text-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-[#17372F] font-mono">{po.id}</span>
                  <Badge status={po.status} size="xs" />
                </div>
                <p className="text-slate-700">
                  Item: <strong>{po.items[0]?.chemicalName}</strong> (Ordered: {po.items[0]?.orderedQty} MT • Received: {po.items[0]?.receivedQty} MT • Remaining: {po.items[0]?.pendingQty} MT)
                </p>
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <span>Order Value: <strong>₹{po.totalAmount.toLocaleString('en-IN')}</strong></span>
                  <span>•</span>
                  <span>Delivery Due: {po.deliveryDueDate}</span>
                  <span>•</span>
                  <span>Destination: {po.destinationWarehouse}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => showToast('Attaching Manufacturer Certified COA...', 'info')}
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-[#E3E8DF] rounded-lg text-slate-700 hover:bg-[#F7F5EC] font-medium"
                >
                  <UploadCloud className="w-3.5 h-3.5 text-[#C6A66A]" />
                  <span>Upload COA</span>
                </button>
                <button
                  onClick={() => showToast('Dispatch update recorded for ChemTrade Dahej Hub', 'success')}
                  className="px-3 py-1.5 bg-[#0F795C] text-white rounded-lg font-bold hover:bg-[#0F795C]/90"
                >
                  Update Tanker Dispatch
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quote Submission Modal */}
      {quoteSubmitOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E3E8DF]">
            <h3 className="text-base font-bold text-[#17372F] mb-1">Submit Sourcing Quotation</h3>
            <p className="text-xs text-slate-500 mb-4">Against RFQ-PR-2026-092: 100 MT Caustic Soda Lye</p>

            <form onSubmit={handleSendQuote} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Ex-Plant Base Rate (₹ / MT)</label>
                <input
                  type="number"
                  value={offeredRate}
                  onChange={(e) => setOfferedRate(e.target.value)}
                  className="w-full p-2.5 border border-[#E3E8DF] rounded-lg text-xs font-mono font-bold"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Offered Credit Terms (Days)</label>
                <select
                  value={creditDays}
                  onChange={(e) => setCreditDays(e.target.value)}
                  className="w-full p-2.5 border border-[#E3E8DF] rounded-lg text-xs"
                >
                  <option value="15">15 Days from GRN Date</option>
                  <option value="30">30 Days Net</option>
                  <option value="0">Advance Payment against Proforma</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Estimated Dispatch Delivery Lead Time</label>
                <input
                  type="text"
                  defaultValue="3 Working Days via Pipeline / Tanker"
                  className="w-full p-2.5 border border-[#E3E8DF] rounded-lg text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setQuoteSubmitOpen(false)}
                  className="px-4 py-2 border border-[#E3E8DF] rounded-lg text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#075C46] text-white rounded-lg font-bold hover:bg-[#063F32]"
                >
                  Submit Sealed Offer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

