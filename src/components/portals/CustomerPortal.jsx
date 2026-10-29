import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import KPICard from '../common/KPICard';
import Badge from '../common/Badge';
import {
  FileText,
  ShoppingBag,
  Download,
  Send,
  CheckCircle,
  FileCheck2,
  Clock,
  Building,
  Truck
} from 'lucide-react';

export default function CustomerPortal() {
  const { quotations, salesOrders, invoices, openModal, showToast } = useApp();
  const [rfqModalOpen, setRfqModalOpen] = useState(false);
  const [newRfqCommodity, setNewRfqCommodity] = useState('Caustic Soda Lye');
  const [newRfqQty, setNewRfqQty] = useState('50');

  // Asian Paints view (External customer perspective)
  const customerName = 'Asian Paints Ltd';
  const customerQuotes = quotations.filter(q => q.customerName.includes('Asian Paints'));
  const customerOrders = salesOrders.filter(o => o.customerName.includes('Asian Paints'));
  const customerInvoices = invoices.filter(i => i.customerName.includes('Asian Paints'));

  const handleSubmitRfq = (e) => {
    e.preventDefault();
    setRfqModalOpen(false);
    showToast(`Inquiry for ${newRfqQty} MT ${newRfqCommodity} submitted to Sales Desk!`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Customer Header */}
      <div className="bg-gradient-to-r from-[#101828] via-[#151f33] to-[#101828] rounded-2xl p-6 text-white border border-[#C6A66B]/30 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-[#C6A66B]/20 text-[#C6A66B] px-2.5 py-0.5 rounded-full font-bold border border-[#C6A66B]/30">
                Customer Self-Service Portal
              </span>
              <span className="text-xs text-slate-400">GSTIN: 27AAACA1234A1Z5</span>
            </div>
            <h1 className="text-2xl font-bold mt-1 text-white">{customerName}</h1>
            <p className="text-xs text-slate-300 mt-1">
              Welcome to your dedicated chemical procurement hub. Review quotations, track bulk tanker dispatches, and download certified COA / SDS documents.
            </p>
          </div>
          <button
            onClick={() => setRfqModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#C6A66B] hover:bg-[#B08E4F] text-[#101828] text-xs font-bold rounded-xl transition-all shadow-md self-start md:self-auto"
          >
            <Send className="w-4 h-4" />
            <span>Submit Chemical RFQ</span>
          </button>
        </div>
      </div>

      {/* KPI Cards (Section 5.9) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Active Chemical RFQs"
          value="1 Open"
          subvalue="Targeting Next Quarter"
          icon={Send}
        />
        <KPICard
          title="Quotations Received"
          value={customerQuotes.length.toString()}
          subvalue="Ready for Acceptance"
          icon={FileText}
          accent={true}
          badgeText="Commercial Offers"
        />
        <KPICard
          title="Orders In Fulfilment"
          value={customerOrders.length.toString()}
          subvalue="1 Ready for Dispatch"
          icon={ShoppingBag}
          badgeText="Active Logistics"
        />
        <KPICard
          title="Available COA / SDS"
          value="4 Documents"
          subvalue="Batch Tested"
          icon={FileCheck2}
          badgeText="Download Ready"
        />
      </div>

      {/* Commercial Quotations Received */}
      <div className="bg-white rounded-xl border border-[#E4E7EC] p-5 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-[#E4E7EC]">
          <div>
            <h2 className="text-sm font-bold text-[#101828]">Quotations Awaiting Your Response</h2>
            <p className="text-xs text-[#667085]">Review pricing, payment terms, and click to approve or request revision.</p>
          </div>
          <span className="text-xs bg-emerald-50 text-emerald-800 font-semibold px-2.5 py-1 rounded-full border border-emerald-200">
            Guaranteed Validity
          </span>
        </div>

        <div className="divide-y divide-[#E4E7EC] mt-3">
          {customerQuotes.map(q => (
            <div key={q.id} className="py-4 text-xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-base text-[#101828]">{q.id}</span>
                    <span className="text-slate-500 font-mono">Ref: {q.rfqRef}</span>
                    <Badge status={q.status} />
                  </div>
                  <p className="text-slate-500 mt-0.5">
                    Terms: <strong>{q.paymentTerms}</strong> | Delivery: <strong>{q.deliveryTerms}</strong> | Valid Until: <span className="font-semibold text-[#101828]">{q.validUntil}</span>
                  </p>
                </div>
                <div className="text-right sm:text-right">
                  <div className="text-xl font-bold font-mono text-[#101828]">
                    ₹ {q.grandTotal.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[10px] text-slate-500">Including 18% GST & Freight</span>
                </div>
              </div>

              {/* Line Items Table (strictly NO internal margin or supplier cost!) */}
              <div className="overflow-x-auto bg-[#FAF9F6] rounded-lg p-3 border border-[#E4E7EC]">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#E4E7EC] text-slate-500 uppercase font-semibold">
                      <th className="pb-1.5">Chemical Commodity</th>
                      <th className="pb-1.5">CAS No.</th>
                      <th className="pb-1.5">Quantity</th>
                      <th className="pb-1.5">Offered Rate</th>
                      <th className="pb-1.5 text-right">Line Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E4E7EC]">
                    {q.items.map((it, idx) => (
                      <tr key={idx}>
                        <td className="py-1.5 font-semibold text-[#101828]">{it.name} ({it.grade})</td>
                        <td className="py-1.5 font-mono text-slate-600">{it.cas}</td>
                        <td className="py-1.5 font-mono">{it.qty} {it.uom}</td>
                        <td className="py-1.5 font-mono">₹{it.quotedRate.toLocaleString('en-IN')}/{it.uom}</td>
                        <td className="py-1.5 font-mono font-bold text-right">₹{it.itemTotal.toLocaleString('en-IN')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-end gap-3 pt-1">
                <button
                  onClick={() => openModal('view_quote_pdf', q)}
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-[#E4E7EC] rounded-lg text-slate-700 hover:bg-[#FAF9F6] font-medium"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  <span>Download Quotation PDF</span>
                </button>
                <button
                  onClick={() => showToast(`Quotation ${q.id} accepted! Generating Sales Order.`, 'success')}
                  className="px-4 py-1.5 bg-[#16805D] text-white rounded-lg font-bold hover:bg-[#16805D]/90 transition-all shadow-sm"
                >
                  Accept & Issue PO
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Deliveries & Batch Documents */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Dispatches */}
        <div className="bg-white rounded-xl border border-[#E4E7EC] p-5 shadow-sm">
          <h2 className="text-sm font-bold text-[#101828] pb-3 border-b border-[#E4E7EC]">
            Active Orders & Tanker Dispatches
          </h2>
          <div className="divide-y divide-[#E4E7EC] mt-3">
            {customerOrders.map(order => (
              <div key={order.id} className="py-3 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#101828]">{order.id}</span>
                  <Badge status={order.status} size="xs" />
                </div>
                <p className="text-slate-600">
                  Chemical: <strong>{order.items[0]?.chemicalName}</strong> ({order.items[0]?.qty} {order.items[0]?.uom})
                </p>
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <Truck className="w-3.5 h-3.5 text-[#C6A66B]" />
                  <span>{order.transporterAssigned}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certified Batch COA & SDS Vault */}
        <div className="bg-white rounded-xl border border-[#E4E7EC] p-5 shadow-sm">
          <h2 className="text-sm font-bold text-[#101828] pb-3 border-b border-[#E4E7EC]">
            Download Certified Batch COA & SDS
          </h2>
          <div className="divide-y divide-[#E4E7EC] mt-3">
            <div className="py-2.5 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-[#101828]">Certificate of Analysis (COA) - Caustic Soda Lye</p>
                <p className="text-[11px] text-slate-500 font-mono">Batch: BAT-2026-CS-01 • Purity: 48.4% Min</p>
              </div>
              <button
                onClick={() => showToast('Downloading verified COA document (PDF)...', 'success')}
                className="flex items-center gap-1 text-xs font-semibold text-[#2E6FBB] hover:underline"
              >
                <Download className="w-3.5 h-3.5" /> PDF
              </button>
            </div>

            <div className="py-2.5 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-[#101828]">Safety Data Sheet (SDS / MSDS) 16-Section GHS</p>
                <p className="text-[11px] text-slate-500 font-mono">CAS: 1310-73-2 • Class 8 Corrosive</p>
              </div>
              <button
                onClick={() => showToast('Downloading 16-section GHS SDS (PDF)...', 'success')}
                className="flex items-center gap-1 text-xs font-semibold text-[#2E6FBB] hover:underline"
              >
                <Download className="w-3.5 h-3.5" /> PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Submitting New RFQ */}
      {rfqModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E4E7EC]">
            <h3 className="text-base font-bold text-[#101828] mb-1">Submit Chemical Requirement RFQ</h3>
            <p className="text-xs text-slate-500 mb-4">Direct notification to ChemTrade 360 sales engineering desk.</p>

            <form onSubmit={handleSubmitRfq} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Chemical Commodity</label>
                <select
                  value={newRfqCommodity}
                  onChange={(e) => setNewRfqCommodity(e.target.value)}
                  className="w-full p-2.5 border border-[#E4E7EC] rounded-lg text-xs"
                >
                  <option value="Caustic Soda Lye (48%)">Caustic Soda Lye (48%)</option>
                  <option value="Methanol Pure (99.85%)">Methanol Pure (99.85%)</option>
                  <option value="Sulfuric Acid (98%)">Sulfuric Acid (98%)</option>
                  <option value="Titanium Dioxide Rutile (R-996)">Titanium Dioxide Rutile (R-996)</option>
                  <option value="Isopropyl Alcohol (IPA 99.9%)">Isopropyl Alcohol (IPA 99.9%)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Estimated Required Quantity (MT)</label>
                <input
                  type="number"
                  value={newRfqQty}
                  onChange={(e) => setNewRfqQty(e.target.value)}
                  className="w-full p-2.5 border border-[#E4E7EC] rounded-lg text-xs font-mono"
                  placeholder="e.g. 50"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Delivery Destination Plant</label>
                <input
                  type="text"
                  defaultValue="Taloja Plant, Navi Mumbai"
                  className="w-full p-2.5 border border-[#E4E7EC] rounded-lg text-xs"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRfqModalOpen(false)}
                  className="px-4 py-2 border border-[#E4E7EC] rounded-lg text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#101828] text-white rounded-lg font-bold hover:bg-[#101828]/90"
                >
                  Submit Inquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

