import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Printer, Download, CheckCircle2 } from 'lucide-react';

export default function ViewPDFQuotationModal() {
  const { closeModal, modalData, showToast } = useApp();
  const q = modalData;

  if (!q) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-8 shadow-2xl border border-[#E3E8DF] my-8 max-h-[90vh] overflow-y-auto">
        {/* Modal Controls (Not Printed) */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E3E8DF] no-print">
          <div className="flex items-center gap-2">
            <span className="text-xs bg-[#DDE9D9] text-[#075C46] font-bold px-2.5 py-1 rounded border border-[#C6A66A]/30">
              Customer-Facing Formal Offer
            </span>
            <span className="text-xs text-slate-400">Excludes internal margins</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#075C46] text-white hover:bg-[#063F32] transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-[#C6A66A]" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={closeModal}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Formal Printable Document Layout */}
        <div className="mt-6 text-slate-900 space-y-6">
          {/* Letterhead */}
          <div className="flex items-start justify-between border-b-2 border-[#075C46] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-[#17372F]">ChemTrade 360</span>
                <span className="text-xs text-[#075C46] font-bold uppercase tracking-wider bg-[#DDE9D9] px-2 py-0.5 rounded border border-[#C6A66A]/30">
                  Industrial Chemicals
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 font-medium">
                ChemTrade Distribution Private Limited • Dahej Terminal Division
              </p>
              <p className="text-[11px] text-slate-500 font-mono">
                GSTIN: 24AAACD4490M1Z2 • PAN: AAACD4490M • PESO Lic: P/HQ/GJ/15/4491
              </p>
            </div>

            <div className="text-right">
              <h2 className="text-xl font-bold text-[#17372F] uppercase tracking-wide">Commercial Quotation</h2>
              <p className="font-mono text-sm font-bold text-[#075C46] mt-0.5">{q.id}</p>
              <p className="text-xs text-slate-500">Date: {q.date}</p>
              <p className="text-xs text-slate-500">Valid Until: <strong>{q.validUntil}</strong></p>
            </div>
          </div>

          {/* Customer & Terms Matrix */}
          <div className="grid grid-cols-2 gap-4 text-xs bg-[#F7F5EC] p-4 rounded-xl border border-[#E3E8DF]">
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold">Quotation To (Buyer):</p>
              <p className="font-bold text-sm text-[#17372F] mt-0.5">{q.customerName}</p>
              <p className="text-slate-600 font-medium">Attn: {q.customerContact}</p>
              <p className="text-slate-500 font-mono text-[11px] mt-0.5">Customer Ref: {q.rfqRef}</p>
            </div>

            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold">Commercial Terms:</p>
              <p className="text-slate-700 mt-0.5">Payment Terms: <strong>{q.paymentTerms}</strong></p>
              <p className="text-slate-700">Delivery Terms: <strong>{q.deliveryTerms}</strong></p>
              <p className="text-slate-700">Dispatch Hub: <strong>Dahej Liquid Terminal</strong></p>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-[#E3E8DF] rounded-lg">
              <thead className="bg-[#075C46] text-white">
                <tr>
                  <th className="py-2.5 px-3">#</th>
                  <th className="py-2.5 px-3">Commodity & Grade</th>
                  <th className="py-2.5 px-3">CAS No.</th>
                  <th className="py-2.5 px-3">Quantity</th>
                  <th className="py-2.5 px-3">Unit Price (₹)</th>
                  <th className="py-2.5 px-3">Disc %</th>
                  <th className="py-2.5 px-3 text-right">Line Total (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E3E8DF]">
                {q.items.map((it, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 text-slate-500">{idx + 1}</td>
                    <td className="py-2.5 px-3">
                      <span className="font-bold text-[#17372F]">{it.name}</span>
                      <span className="block text-[11px] text-slate-500">{it.grade}</span>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-600">{it.cas}</td>
                    <td className="py-2.5 px-3 font-mono font-semibold">{it.qty} {it.uom}</td>
                    <td className="py-2.5 px-3 font-mono">₹{it.quotedRate.toLocaleString('en-IN')}</td>
                    <td className="py-2.5 px-3 font-mono">{it.discountPercent || 0}%</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-right text-[#17372F]">
                      ₹{(it.itemTotal || (it.qty * it.quotedRate)).toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals Summary */}
          <div className="flex justify-end text-xs">
            <div className="w-72 space-y-2 bg-[#F7F5EC] p-4 rounded-xl border border-[#E3E8DF]">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal (Ex-Works):</span>
                <span className="font-mono font-semibold">₹{q.subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Freight & Handling:</span>
                <span className="font-mono">₹{q.freightCharges.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>GST Tax (18%):</span>
                <span className="font-mono">₹{q.taxTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#E3E8DF] font-bold text-sm text-[#17372F]">
                <span>Grand Total:</span>
                <span className="font-mono text-base text-[#17372F]">₹{q.grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Standard Terms & Sign-off */}
          <div className="pt-4 border-t border-[#E3E8DF] text-[10px] text-slate-500 space-y-1">
            <p className="font-bold text-slate-700">Terms & Chemical Handling Conditions:</p>
            <p>1. Prices quoted are based on current market raw material indices and valid strictly until {q.validUntil}.</p>
            <p>2. Chemical purity & specifications guaranteed as per attached standard manufacturer COA.</p>
            <p>3. Dispatch in compliant road tankers equipped with Hazchem Tremcards & approved drivers.</p>
            <p>4. Payment terms: strictly within {q.paymentTerms}. Overdue balance attracts 18% p.a. interest.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

