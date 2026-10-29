import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Receipt, CheckCircle2 } from 'lucide-react';

export default function InvoiceModal() {
  const { closeModal, salesOrders, addInvoice } = useApp();

  const [orderId, setOrderId] = useState(salesOrders[0]?.id || 'SO-2026-0451');
  const [customerName, setCustomerName] = useState(salesOrders[0]?.customerName || 'Asian Paints Ltd');
  const [baseAmount, setBaseAmount] = useState('2450000');
  const [dueDate, setDueDate] = useState(
    new Date(Date.now() + 45 * 86400000).toISOString().split('T')[0]
  );

  const gstAmount = Math.round(Number(baseAmount) * 0.18);
  const grandTotal = Number(baseAmount) + gstAmount;

  const handleSubmit = (e) => {
    e.preventDefault();
    const invoiceNumber = `INV-2026-0${Math.floor(692 + Math.random() * 40)}`;
    const randomHex = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

    const newInv = {
      invoiceNumber,
      salesOrderRef: orderId,
      customerName,
      customerId: 'CUST-001',
      invoiceDate: new Date().toISOString().split('T')[0],
      dueDate,
      amount: Number(baseAmount),
      gstAmount,
      grandTotal,
      irnStatus: 'Generated (NIC e-Invoice)',
      irnNumber: randomHex,
      eWayBillNo: `241908${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'Issued',
      paidAmount: 0,
      balanceDue: grandTotal
    };

    addInvoice(newInv);
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#E3E8DF]">
        <div className="flex items-center justify-between pb-3 border-b border-[#E3E8DF]">
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-[#C6A66A]" />
            <h2 className="text-base font-bold text-[#17372F]">Generate GST Tax Invoice & Push e-Invoice</h2>
          </div>
          <button onClick={closeModal} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Sales Order Source</label>
            <select
              value={orderId}
              onChange={(e) => {
                setOrderId(e.target.value);
                const matched = salesOrders.find(s => s.id === e.target.value);
                if (matched) {
                  setCustomerName(matched.customerName);
                  setBaseAmount(String(matched.totalValue));
                }
              }}
              className="w-full p-2.5 border border-[#E3E8DF] rounded-lg text-xs font-mono font-bold"
            >
              {salesOrders.map(so => (
                <option key={so.id} value={so.id}>{so.id} — {so.customerName} (₹{so.totalValue.toLocaleString('en-IN')})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Customer / Debtor</label>
            <input
              type="text"
              value={customerName}
              readOnly
              className="w-full p-2.5 border border-[#E3E8DF] rounded-lg text-xs bg-slate-50 font-semibold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Taxable Value (₹)</label>
              <input
                type="number"
                value={baseAmount}
                onChange={(e) => setBaseAmount(e.target.value)}
                className="w-full p-2.5 border border-[#E3E8DF] rounded-lg text-xs font-mono font-bold"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Credit Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full p-2.5 border border-[#E3E8DF] rounded-lg text-xs font-mono"
                required
              />
            </div>
          </div>

          <div className="p-3 bg-[#F7F5EC] rounded-xl border border-[#E3E8DF] space-y-1.5 font-mono">
            <div className="flex justify-between text-slate-600">
              <span>Taxable Value:</span>
              <span className="font-bold">₹{Number(baseAmount).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>GST Tax (18%):</span>
              <span className="font-bold">₹{gstAmount.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-[#17372F] pt-1 border-t border-[#E3E8DF]">
              <span>Grand Total:</span>
              <span>₹{grandTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="p-2.5 rounded bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
            <span>NIC E-Invoice QR code & IRN hash will be generated upon confirmation.</span>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E3E8DF]">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 border border-[#E3E8DF] rounded-lg text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#075C46] text-white rounded-lg font-bold hover:bg-[#063F32]"
            >
              Issue GST Tax Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

